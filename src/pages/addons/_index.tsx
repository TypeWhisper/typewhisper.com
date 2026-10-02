import { replacePageUrl } from "@/hooks/use-page-url";
import { useEffect, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import {
  categoryKeys,
  platformKeys,
  retiredSourceFilters,
  sourceFilters,
  type Plugin,
  type PluginCategory,
  type PluginPlatform,
  type PluginSource,
} from "@/data/addon-taxonomy";
import { localePath, t, type Locale } from "@/i18n/index";
import { CategoryFilter } from "@/components/addons/category-filter";
import { PlatformFilter } from "@/components/addons/platform-filter";
import { SourceFilter } from "@/components/addons/source-filter";
import { AddonCard } from "@/components/addons/addon-card";
import { getAddonCategoriesForPlatform } from "@/data/addon-edition-capabilities";
import { WaveRule } from "@/components/site/wave-rule";

interface AddonsIndexProps {
  locale?: Locale;
  allPlugins: Plugin[];
  basePath?: string;
}

const FEATURED_FALLBACK_SLUGS = new Set([
  "whisperkit",
  "parakeet",
  "apple-speech",
  "groq-whisper",
]);

export default function AddonsIndex({
  locale = "en",
  allPlugins,
  basePath = "/addons/",
}: AddonsIndexProps) {
  const defaults = {
    category: "all",
    platform: "all",
    source: "all",
    query: "",
  };
  const [filters, setFilters] = useState(defaults);
  const { category, platform, source, query } = filters;

  useEffect(() => {
    function restore() {
      const params = new URLSearchParams(location.search);
      const valid = (key: string, values: object) => {
        const value = params.get(key);
        return value && Object.hasOwn(values, value) ? value : "all";
      };
      const sourceParam = params.get("source") ?? "";
      // A link with a retired source shows all sources and loses the parameter.
      if (retiredSourceFilters.includes(sourceParam)) {
        const url = new URL(location.href);
        url.searchParams.delete("source");
        replacePageUrl(url);
      }
      setFilters({
        category: valid("category", categoryKeys),
        platform: valid("platform", platformKeys),
        source: (sourceFilters as readonly string[]).includes(sourceParam)
          ? sourceParam
          : "all",
        query: params.get("q") ?? "",
      });
    }
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);

  function updateFilters(changes: Partial<typeof defaults>) {
    const next = { ...filters, ...changes };
    const url = new URL(location.href);
    for (const [key, value] of Object.entries(next)) {
      const param = key === "query" ? "q" : key;
      if (value && value !== "all") url.searchParams.set(param, value);
      else url.searchParams.delete(param);
    }
    replacePageUrl(url);
    setFilters(next);
  }
  const setCategory = (category: string) => updateFilters({ category });
  const setPlatform = (platform: string) => updateFilters({ platform });
  const setSource = (source: string) => updateFilters({ source });
  const setQuery = (query: string) => updateFilters({ query });

  const items = allPlugins;

  const hasFilters =
    category !== "all" ||
    platform !== "all" ||
    source !== "all" ||
    query.trim() !== "";

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = items.filter((p) => {
    const matchesCategory =
      category === "all" ||
      getAddonCategoriesForPlatform(p, platform as PluginPlatform | "all")
        .includes(category as PluginCategory);
    const matchesPlatform =
      platform === "all" || p.platforms.includes(platform as PluginPlatform);
    const matchesSource = source === "all" || p.source === source;
    const matchesQuery =
      normalizedQuery === "" ||
      p.name.toLowerCase().includes(normalizedQuery) ||
      p.description.toLowerCase().includes(normalizedQuery) ||
      (p.author ?? "").toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesPlatform && matchesSource && matchesQuery;
  });

  const explicitFeatured = items.filter((p) => p.featured === true);
  const featured = (
    explicitFeatured.length > 0
      ? explicitFeatured
      : items.filter((p) => FEATURED_FALLBACK_SLUGS.has(p.slug))
  ).slice(0, 4);

  function clearAllFilters() {
    updateFilters(defaults);
  }

  return (
    <section className="site-section site-section--tight-top addon-catalog">
      <div className="site-wrap">
        <div
          className="addon-filters"
          role="search"
          aria-label={t(locale, "addons.filter.group")}
        >
          <div className="addon-search">
            <Search className="addon-search__icon" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t(locale, "addons.searchPlaceholder")}
              aria-label={t(locale, "addons.searchPlaceholder")}
              className="addon-search__input"
              data-testid="addons-search"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={t(locale, "addons.clearSearch")}
                className="addon-search__clear"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="addon-filters__rows">
            <CategoryFilter
              selected={category as PluginCategory | "all"}
              onChange={setCategory}
              locale={locale}
            />
            <PlatformFilter
              selected={platform as PluginPlatform | "all"}
              onChange={setPlatform}
              locale={locale}
            />
            <SourceFilter
              selected={source as PluginSource | "all"}
              onChange={setSource}
              locale={locale}
            />
          </div>
        </div>

        {!hasFilters && featured.length > 0 && (
          <section className="addon-group" data-testid="featured-addons">
            <div className="addon-group__head">
              <h2 className="site-label">{t(locale, "addons.featured")}</h2>
              <WaveRule seed={17} align="start" />
            </div>
            <ul className="site-index site-index--tiles site-index--open addon-index addon-index--featured">
              {featured.map((plugin) => (
                <li key={`featured-${plugin.slug}`}>
                  <AddonCard
                    plugin={plugin}
                    basePath={basePath}
                    locale={locale}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="addon-group">
          <div className="addon-group__head">
            <h2 className="site-label">
              {t(locale, hasFilters ? "addons.results" : "addons.all")}
            </h2>
            <WaveRule seed={23} align="start" />
            <p className="addon-group__count" role="status">
              {filtered.length === 1
                ? t(locale, "addons.resultCountOne")
                : t(locale, "addons.resultCount").replace(
                    "{count}",
                    String(filtered.length),
                  )}
            </p>
            {hasFilters && (
              <button
                type="button"
                className="addon-group__reset"
                onClick={clearAllFilters}
              >
                {t(locale, "addons.clearAll")}
              </button>
            )}
          </div>

          {filtered.length > 0 && (
            <ul className="site-index site-index--tiles addon-index">
              {filtered.map((plugin) => (
                <li key={plugin.slug}>
                  <AddonCard
                    plugin={plugin}
                    platform={platform as PluginPlatform | "all"}
                    basePath={basePath}
                    locale={locale}
                    showRecommended
                  />
                </li>
              ))}
            </ul>
          )}

          {filtered.length === 0 && (
            <div className="site-note addon-empty">
              <p>
                {t(
                  locale,
                  platform === "ios" ? "addons.iosEmpty" : "addons.noResults",
                )}
              </p>
              {platform === "ios" && (
                <a className="site-link" href={localePath(locale, "/docs/ios")}>
                  {t(locale, "addons.iosGuide")}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              )}
              {hasFilters && (
                <button
                  type="button"
                  className="site-button site-button--quiet site-button--small"
                  onClick={clearAllFilters}
                >
                  {t(locale, "addons.clearAll")}
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

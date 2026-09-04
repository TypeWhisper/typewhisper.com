import { useEffect, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import {
  plugins,
  categoryKeys,
  platformKeys,
  sourceKeys,
  type Plugin,
  type PluginCategory,
  type PluginPlatform,
  type PluginSource,
} from "@/data/addons";
import { t, type Locale } from "@/i18n/index";
import { CategoryFilter } from "@/components/addons/category-filter";
import { PlatformFilter } from "@/components/addons/platform-filter";
import { SourceFilter } from "@/components/addons/source-filter";
import { AddonCard } from "@/components/addons/addon-card";
import { Button } from "@/components/ui/button";

interface AddonsIndexProps {
  locale?: Locale;
  allPlugins?: Plugin[];
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
  basePath = "/addons",
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
      setFilters({
        category: valid("category", categoryKeys),
        platform: valid("platform", platformKeys),
        source: valid("source", sourceKeys),
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
    history.replaceState(history.state, "", url);
    setFilters(next);
  }
  const setCategory = (category: string) => updateFilters({ category });
  const setPlatform = (platform: string) => updateFilters({ platform });
  const setSource = (source: string) => updateFilters({ source });
  const setQuery = (query: string) => updateFilters({ query });

  const items = allPlugins ?? plugins;

  const hasFilters =
    category !== "all" ||
    platform !== "all" ||
    source !== "all" ||
    query.trim() !== "";

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = items.filter((p) => {
    const matchesCategory =
      category === "all" || p.categories.includes(category as PluginCategory);
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
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t(locale, "addons.heading")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t(locale, "addons.subtitle")}
          </p>
          <Button variant="link" asChild className="mt-2">
            <a href={`${basePath}/develop`}>
              {t(locale, "addons.buildPlugin")}{" "}
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t(locale, "addons.searchPlaceholder")}
              aria-label={t(locale, "addons.searchPlaceholder")}
              className="w-full rounded-full border bg-card py-2 pl-9 pr-9 text-sm outline-none transition-colors focus:border-primary focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              data-testid="addons-search"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={t(locale, "addons.clearSearch")}
                className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

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

        <p className="mt-6 text-sm text-muted-foreground" role="status">
          {t(locale, "addons.resultCount").replace(
            "{count}",
            String(filtered.length),
          )}
        </p>
        {!hasFilters && featured.length > 0 && (
          <section className="mt-10" data-testid="featured-addons">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t(locale, "addons.featured")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((plugin) => (
                <AddonCard
                  key={`featured-${plugin.slug}`}
                  plugin={plugin}
                  basePath={basePath}
                  locale={locale}
                />
              ))}
            </div>
          </section>
        )}

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((plugin) => (
            <AddonCard
              key={plugin.slug}
              plugin={plugin}
              basePath={basePath}
              locale={locale}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-muted-foreground">
              {t(
                locale,
                platform === "ios" ? "addons.iosEmpty" : "addons.noResults",
              )}
            </p>
            {platform === "ios" && (
              <a
                className="text-primary underline"
                href={`/${locale}/docs/ios`}
              >
                {t(locale, "addons.iosGuide")}
              </a>
            )}
            {hasFilters && (
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                {t(locale, "addons.clearAll")}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

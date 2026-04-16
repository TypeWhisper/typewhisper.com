import { useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { plugins, type Plugin, type PluginCategory, type PluginPlatform, type PluginSource } from "@/data/addons";
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

export default function AddonsIndex({ locale = "en", allPlugins, basePath = "/addons" }: AddonsIndexProps) {
  const [category, setCategory] = useState<PluginCategory | "all">("all");
  const [platform, setPlatform] = useState<PluginPlatform | "all">("all");
  const [source, setSource] = useState<PluginSource | "all">("all");
  const [query, setQuery] = useState("");

  const items = allPlugins ?? plugins;

  const hasFilters =
    category !== "all" ||
    platform !== "all" ||
    source !== "all" ||
    query.trim() !== "";

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = items.filter((p) => {
    const matchesCategory =
      category === "all" || p.categories.includes(category);
    const matchesPlatform =
      platform === "all" || p.platforms.includes(platform);
    const matchesSource = source === "all" || p.source === source;
    const matchesQuery =
      normalizedQuery === "" ||
      p.name.toLowerCase().includes(normalizedQuery) ||
      p.description.toLowerCase().includes(normalizedQuery) ||
      (p.author ?? "").toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesPlatform && matchesSource && matchesQuery;
  });

  const explicitFeatured = items.filter((p) => p.featured === true);
  const featured = (explicitFeatured.length > 0
    ? explicitFeatured
    : items.filter((p) => FEATURED_FALLBACK_SLUGS.has(p.slug))
  ).slice(0, 4);

  function clearAllFilters() {
    setCategory("all");
    setPlatform("all");
    setSource("all");
    setQuery("");
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
              {t(locale, "addons.buildPlugin")} <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>

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
                aria-label={t(locale, "addons.clearAll")}
                className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          <CategoryFilter selected={category} onChange={setCategory} locale={locale} />
          <PlatformFilter selected={platform} onChange={setPlatform} locale={locale} />
          <SourceFilter selected={source} onChange={setSource} locale={locale} />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((plugin) => (
            <AddonCard key={plugin.slug} plugin={plugin} basePath={basePath} locale={locale} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-muted-foreground">
              {t(locale, "addons.noResults")}
            </p>
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

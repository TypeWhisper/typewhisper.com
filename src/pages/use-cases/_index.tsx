import { useEffect, useMemo, useState } from "react";
import { PageHead, WaveRule } from "@/components/site";
import {
  useCaseGroups,
  type UseCaseCategory,
  type UseCaseGroup,
} from "@/components/use-cases/taxonomy";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { t, type Locale } from "@/i18n/index";
import { CategoryFilter } from "@/components/use-cases/category-filter";
import { UseCaseCTA } from "@/components/use-cases/use-case-cta";
import {
  UseCaseList,
  type UseCaseEntry,
} from "@/components/use-cases/use-case-list";

interface UseCasesIndexProps {
  locale?: Locale;
  entries: UseCaseEntry[];
  basePath?: string;
}

const groupSeeds: Record<UseCaseGroup, number> = { everyday: 7, industry: 19 };

export default function UseCasesIndex({
  locale = "en",
  entries,
  basePath = "/use-cases/",
}: UseCasesIndexProps) {
  const [category, setCategory] = useState<UseCaseCategory | "all">("all");
  const revealRoot = useScrollReveal();

  // The filter lives in the URL (`?category=app`), read after hydration.
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("category");
    if (value === "app" || value === "workflow") setCategory(value);
  }, []);

  const selectCategory = (next: UseCaseCategory | "all") => {
    setCategory(next);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", next);
    window.history.replaceState(window.history.state, "", url);
  };

  const counts = useMemo(() => {
    const next: Record<UseCaseCategory | "all", number> = {
      all: entries.length,
      app: 0,
      workflow: 0,
    };
    for (const entry of entries) next[entry.category] += 1;
    return next;
  }, [entries]);

  const groups = useCaseGroups
    .map((group) => ({
      group,
      entries: entries.filter(
        (entry) =>
          entry.group === group &&
          (category === "all" || entry.category === category),
      ),
    }))
    .filter((group) => group.entries.length > 0);

  return (
    <div
      ref={revealRoot as React.RefObject<HTMLDivElement>}
      className="site-page usecase-page"
    >
      <PageHead
        title={t(locale, "useCases.heading")}
        lede={t(locale, "useCases.description")}
      >
        <CategoryFilter
          selected={category}
          onChange={selectCategory}
          locale={locale}
          counts={counts}
        />
      </PageHead>

      <p className="sr-only" role="status">
        {t(locale, "useCases.resultCount").replace(
          "{count}",
          String(groups.reduce((sum, group) => sum + group.entries.length, 0)),
        )}
      </p>

      <div data-testid="use-case-index">
        {groups.map(({ group, entries: groupEntries }) => (
          <section
            key={group}
            className="site-section site-section--tight-top"
            data-testid={`use-case-group-${group}`}
          >
            <div className="site-wrap">
              <WaveRule
                label={t(locale, `useCases.group.${group}.label`)}
                seed={groupSeeds[group]}
              />
              <div className="site-split">
                <div className="site-split__head">
                  <h2 className="site-title site-title--start">
                    {t(locale, `useCases.group.${group}.title`)}
                  </h2>
                  <p className="site-lede site-lede--start">
                    {t(locale, `useCases.group.${group}.text`)}
                  </p>
                </div>
                <UseCaseList
                  entries={groupEntries}
                  basePath={basePath}
                  locale={locale}
                />
              </div>
            </div>
          </section>
        ))}

        {groups.length === 0 && (
          <div className="site-wrap">
            <p className="site-text usecase-empty">
              {t(locale, "useCases.emptyState")}
            </p>
          </div>
        )}
      </div>

      <UseCaseCTA
        locale={locale}
        titleKey="useCases.findCta.title"
        subtitleKey="useCases.findCta.subtitle"
      />
    </div>
  );
}

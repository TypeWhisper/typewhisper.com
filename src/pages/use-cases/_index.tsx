import { useState } from "react";
import { useCases, getUseCases, type UseCase, type UseCaseCategory } from "@/data/use-cases";
import { t, type Locale } from "@/i18n/index";
import { CategoryFilter } from "@/components/use-cases/category-filter";
import { UseCaseCard } from "@/components/use-cases/use-case-card";

interface UseCasesIndexProps {
  locale?: Locale;
  allUseCases?: UseCase[];
  basePath?: string;
}

export default function UseCasesIndex({ locale = "en", allUseCases, basePath = "/use-cases" }: UseCasesIndexProps) {
  const [category, setCategory] = useState<UseCaseCategory | "all">("all");

  const items = allUseCases ?? useCases;

  const filtered = items.filter(
    (uc) => category === "all" || uc.category === category,
  );

  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t(locale, "useCases.heading")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t(locale, "useCases.description")}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <CategoryFilter selected={category} onChange={setCategory} locale={locale} />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {filtered.map((uc) => (
            <UseCaseCard key={uc.slug} useCase={uc} basePath={basePath} locale={locale} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            {t(locale, "useCases.emptyState")}
          </p>
        )}
      </div>
    </div>
  );
}

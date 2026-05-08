import type { UseCase } from "@/data/use-cases";
import { t, type Locale } from "@/i18n/index";
import { UseCaseCard } from "@/components/use-cases/use-case-card";

interface UseCaseRelatedProps {
  currentSlug: string;
  allUseCases: UseCase[];
  basePath?: string;
  locale?: Locale;
}

export function UseCaseRelated({
  currentSlug,
  allUseCases,
  basePath = "/use-cases",
  locale = "en",
}: UseCaseRelatedProps) {
  const others = allUseCases.filter((uc) => uc.slug !== currentSlug);
  if (others.length === 0) return null;

  return (
    <section className="section-light-gray py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {t(locale, "useCases.relatedTitle")}
        </h2>

        <div className="reveal-hidden mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((uc) => (
            <UseCaseCard
              key={uc.slug}
              useCase={uc}
              basePath={basePath}
              locale={locale}
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { ArrowRight } from "lucide-react";
import { WaveRule } from "@/components/site";
import type { UseCase } from "@/data/use-cases";
import { t, type Locale } from "@/i18n/index";
import { UseCaseList } from "./use-case-list";

interface UseCaseRelatedProps {
  current: UseCase;
  allUseCases: UseCase[];
  basePath?: string;
  locale?: Locale;
}

/** The other use cases of the same group, and the way to all of them. */
export function UseCaseRelated({
  current,
  allUseCases,
  basePath = "/use-cases",
  locale = "en",
}: UseCaseRelatedProps) {
  const others = allUseCases.filter(
    (useCase) =>
      useCase.slug !== current.slug && useCase.group === current.group,
  );
  if (others.length === 0) return null;

  return (
    <section className="site-section" data-testid="use-case-related">
      <div className="site-wrap">
        <WaveRule label={t(locale, "useCases.relatedLabel")} seed={41} />
        <div className="site-split">
          <div className="site-split__head reveal-hidden">
            <h2 className="site-title site-title--start">
              {t(locale, "useCases.relatedTitle")}
            </h2>
            <a href={basePath} className="site-link usecase-related__all">
              {t(locale, "useCases.allUseCases")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          <UseCaseList
            entries={others}
            basePath={basePath}
            locale={locale}
            className="reveal-hidden"
          />
        </div>
      </div>
    </section>
  );
}

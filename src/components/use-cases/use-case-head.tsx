import { ArrowRight } from "lucide-react";
import { BarMark } from "@/components/site";
import { type UseCase, categoryKeys } from "@/data/use-cases";
import { t, type Locale } from "@/i18n/index";
import { UseCaseDownload } from "./use-case-download";

interface UseCaseHeadProps {
  useCase: UseCase;
  backHref?: string;
  locale?: Locale;
}

/**
 * Head of a use-case page. Built from the page-head primitive; the label
 * line doubles as the way back to the index.
 */
export function UseCaseHead({
  useCase,
  backHref = "/use-cases",
  locale = "en",
}: UseCaseHeadProps) {
  return (
    <div className="site-page-head" data-testid="page-head">
      <div className="site-wrap">
        <nav
          className="site-label usecase-crumb"
          aria-label={t(locale, "useCases.breadcrumb")}
        >
          <BarMark />
          <a href={backHref} className="usecase-crumb__link">
            {t(locale, "useCases.heading")}
          </a>
          <span className="usecase-crumb__slash" aria-hidden="true">
            /
          </span>
          <span className="usecase-crumb__here">
            {t(locale, categoryKeys[useCase.category])}
          </span>
        </nav>
        <h1 className="site-page-head__title">{useCase.name}</h1>
        <p className="site-page-head__lede">{useCase.description}</p>
        <p className="site-page-head__meta">
          {t(locale, "useCases.availableOn")}
        </p>
        <div className="site-actions">
          <UseCaseDownload locale={locale} />
          <a href="#how-it-works" className="site-link">
            {t(locale, "useCases.seeHowItWorks")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

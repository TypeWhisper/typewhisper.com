import { SectionHead } from "@/components/site";
import { t, type Locale } from "@/i18n/index";
import { UseCaseDownload } from "./use-case-download";

interface UseCaseCTAProps {
  locale?: Locale;
  /** Message keys of headline and lede; the index page brings its own. */
  titleKey?: string;
  subtitleKey?: string;
  reveal?: boolean;
}

/** Closing call to action: headline, one line, the download. */
export function UseCaseCTA({
  locale = "en",
  titleKey = "useCases.cta.title",
  subtitleKey = "useCases.cta.subtitle",
  reveal = true,
}: UseCaseCTAProps) {
  return (
    <section className="site-section" data-testid="use-case-cta">
      <div className="site-wrap">
        <SectionHead
          label={t(locale, "useCases.cta.label")}
          title={t(locale, titleKey)}
          lede={t(locale, subtitleKey)}
          seed={53}
          reveal={reveal}
        />
        <div className="site-actions">
          <UseCaseDownload locale={locale} />
        </div>
      </div>
    </section>
  );
}

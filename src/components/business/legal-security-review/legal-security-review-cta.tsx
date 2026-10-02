import { ArrowRight } from "lucide-react";
import { WaveRule } from "@/components/site";
import type { LegalSecurityReviewContent } from "@/data/legal-security-review";
import { salesEmail } from "@/lib/pricing";
import { localePath, t, type Locale } from "@/i18n/index";

interface LegalSecurityReviewCTAProps {
  cta: LegalSecurityReviewContent["cta"];
  locale: Locale;
  label: string;
}

export function LegalSecurityReviewCTA({
  cta,
  locale,
  label,
}: LegalSecurityReviewCTAProps) {
  return (
    <section className="site-section site-section--rule">
      <div className="site-wrap site-wrap--narrow">
        <WaveRule label={label} seed={27} align="start" />
        <div className="commercial-doc__head">
          <h2 className="site-title site-title--start">{cta.title}</h2>
          <p className="site-lede site-lede--start">{cta.subtitle}</p>
        </div>
        <div className="site-actions site-actions--start">
          <a href={`mailto:${salesEmail}`} className="site-button">
            {t(locale, "business.legalSecurityReview.cta.primary")}
          </a>
          <a href={localePath(locale, "/business")} className="site-link">
            {t(locale, "business.legalSecurityReview.cta.secondary")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

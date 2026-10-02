import { ArrowDown, ArrowLeft } from "lucide-react";
import { PageHead } from "@/components/site";
import type { LegalSecurityReviewContent } from "@/data/legal-security-review";
import { salesEmail } from "@/lib/pricing";
import { localePath, t, type Locale } from "@/i18n/index";

interface LegalSecurityReviewHeroProps {
  hero: LegalSecurityReviewContent["hero"];
  locale: Locale;
}

/** Way back to the teams page and the compact head of a reading page. */
export function LegalSecurityReviewHero({
  hero,
  locale,
}: LegalSecurityReviewHeroProps) {
  return (
    <>
      <nav className="site-wrap site-wrap--narrow commercial-back">
        <a href={localePath(locale, "/business")} className="site-link">
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t(locale, "business.legalSecurityReview.back")}
        </a>
      </nav>
      <PageHead
        label={hero.badge}
        title={hero.title}
        lede={hero.subtitle}
        wrap="narrow"
        compact
        className="commercial-back__head"
      >
        <a href={`mailto:${salesEmail}`} className="site-button">
          {t(locale, "business.legalSecurityReview.hero.ctaPrimary")}
        </a>
        <a href="#checklist" className="site-link commercial-down">
          {t(locale, "business.legalSecurityReview.hero.ctaChecklist")}
          <ArrowDown className="size-4" aria-hidden="true" />
        </a>
      </PageHead>
    </>
  );
}

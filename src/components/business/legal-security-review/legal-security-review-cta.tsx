import { Button } from "@/components/ui/button";
import type { LegalSecurityReviewContent } from "@/data/legal-security-review";
import { salesEmail } from "@/lib/pricing";
import { localePath, t, type Locale } from "@/i18n/index";

interface LegalSecurityReviewCTAProps {
  cta: LegalSecurityReviewContent["cta"];
  locale: Locale;
  color: string;
}

export function LegalSecurityReviewCTA({
  cta,
  locale,
  color,
}: LegalSecurityReviewCTAProps) {
  const businessHref = localePath(locale, "/business");

  return (
    <section className="section-dark relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
          style={{ backgroundColor: `${color}26` }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="reveal-fade-hidden text-4xl font-bold tracking-tighter sm:text-5xl">
            {cta.title}
          </h2>
          <p className="reveal-fade-hidden mt-4 text-lg text-[#86868b]">
            {cta.subtitle}
          </p>
          <div className="reveal-fade-hidden mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="pill" asChild>
              <a href={`mailto:${salesEmail}`}>
                {t(locale, "business.legalSecurityReview.cta.primary")}
              </a>
            </Button>
            <Button variant="outline" size="pill" asChild className="border-[#86868b]/40 bg-transparent text-[#f5f5f7] hover:bg-[#86868b]/10">
              <a href={businessHref}>
                {t(locale, "business.legalSecurityReview.cta.secondary")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

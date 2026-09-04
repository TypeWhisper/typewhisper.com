import { t, localePath, type Locale } from "@/i18n/index";
import { PricingHero } from "@/components/pricing/pricing-hero";
import { HonorBanner } from "@/components/pricing/honor-banner";
import { DecisionHelper } from "@/components/pricing/decision-helper";
import { PersonalVsCommercial } from "@/components/pricing/personal-vs-commercial";
import { CommercialTable } from "@/components/pricing/commercial-table";
import { SupporterSection } from "@/components/pricing/supporter-section";
import { PricingFaq } from "@/components/pricing/pricing-faq";

interface PricingIndexProps {
  locale?: Locale;
}

// Narrative: free for everyone -> honor system story -> who needs what ->
// commercial tiers -> supporter -> FAQ.
export default function PricingIndex({ locale = "en" }: PricingIndexProps) {
  return (
    <>
      <PricingHero locale={locale} />
      <CommercialTable locale={locale} />
      <PersonalVsCommercial locale={locale} />
      <DecisionHelper locale={locale} />
      <HonorBanner locale={locale} />
      <SupporterSection locale={locale} />
      <PricingFaq locale={locale} />

      <section className="pb-16 pt-4 text-center">
        <p className="mx-auto max-w-xl px-4 text-sm text-muted-foreground sm:px-6">
          {t(locale, "pricing.footerNote")}{" "}
          <a
            href={localePath(locale, "/business")}
            className="text-primary underline-offset-4 hover:underline"
          >
            {t(locale, "pricing.footerNote.link")}
          </a>
        </p>
      </section>
    </>
  );
}

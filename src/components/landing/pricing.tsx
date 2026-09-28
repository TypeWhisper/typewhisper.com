import { ArrowRight } from "lucide-react";
import { commercialTiers, currencySymbol, supporterTiers } from "@/lib/pricing";
import { localePath, t, type Locale } from "@/i18n/index";
import { SectionHead } from "@/components/site/section-head";

/** Three tiers as columns of type, all leading to the pricing page. Static markup. */
export function Pricing({ locale = "en" }: { locale?: Locale }) {
  const tiers = [
    {
      id: "free",
      price: t(locale, "pricingTeaser.free.price"),
      detail: null,
    },
    {
      id: "commercial",
      price: `${t(locale, "pricingTeaser.commercial.priceFrom")} ${currencySymbol}${commercialTiers[0].price.monthly}`,
      detail: t(locale, "pricingTeaser.commercial.priceSuffix"),
    },
    {
      id: "supporter",
      price: `${t(locale, "pricingTeaser.supporter.priceFrom")} ${currencySymbol}${supporterTiers[0].price}`,
      detail: t(locale, "pricingTeaser.supporter.priceSuffix"),
    },
  ];

  return (
    <section data-testid="pricing-teaser" className="site-section">
      <div className="site-wrap">
        <SectionHead
          label={t(locale, "pricingTeaser.label")}
          title={t(locale, "pricingTeaser.title")}
          lede={t(locale, "pricingTeaser.subtitle")}
          seed={43}
        />

        <ul className="site-tiers reveal-hidden">
          {tiers.map((tier) => (
            <li key={tier.id}>
              <a
                href={localePath(locale, "/pricing")}
                className="site-tiers__link"
                data-tier={tier.id}
              >
                <span
                  className={`site-tiers__name ${tier.id === "free" ? "site-tiers__name--accent" : ""}`}
                >
                  {t(locale, `pricingTeaser.${tier.id}.name`)}
                </span>
                <span className="site-tiers__price">
                  {tier.price}
                  {tier.detail && <small>{tier.detail}</small>}
                </span>
                <span className="site-tiers__text">
                  {t(locale, `pricingTeaser.${tier.id}.description`)}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="site-note">
          <p>{t(locale, "pricingTeaser.honor")}</p>
          <a href={localePath(locale, "/pricing")} className="site-link">
            {t(locale, "pricingTeaser.cta")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { BarMark } from "@/components/site/bar-mark";
import { t, type Locale } from "@/i18n/index";
import {
  commercialOffer,
  commercialTiers,
  type BillingPeriod,
  type CommercialTier,
  type CommercialTierId,
} from "@/lib/pricing";
import { devicesLabel, fill } from "./format";
import { Price } from "./price";

const periods: BillingPeriod[] = ["monthly", "lifetime"];

/** Promises of a tier beyond its devices, below `pricing.tiers.<id>.`. */
const extras: Record<CommercialTierId, string[]> = {
  individual: [],
  team: [],
  enterprise: ["response", "rollout"],
};

/** Billing switch and the three commercial tiers; prices and links follow the period. */
export function Plans({ locale }: { locale: Locale }) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  return (
    <div className="commercial-plans">
      <div className="commercial-plans__switch">
        <div
          className="site-switch"
          role="group"
          aria-label={t(locale, "pricing.billingPeriod")}
        >
          {periods.map((value) => (
            <button
              key={value}
              type="button"
              className="site-switch__item"
              aria-pressed={period === value}
              onClick={() => setPeriod(value)}
            >
              {t(locale, `pricing.commercial.${value}Heading`)}
            </button>
          ))}
        </div>
      </div>

      <ul className="site-tiers" data-testid="commercial-tiers">
        {commercialTiers.map((tier) => (
          <Tier key={tier.id} tier={tier} period={period} locale={locale} />
        ))}
      </ul>
    </div>
  );
}

function Tier({
  tier,
  period,
  locale,
}: {
  tier: CommercialTier;
  period: BillingPeriod;
  locale: Locale;
}) {
  // Enterprise has no lifetime option; it keeps its subscription in that view.
  const offer = commercialOffer(tier, period);
  const suffix =
    offer.period === "lifetime"
      ? t(locale, "pricing.tiers.oneTime")
      : t(locale, "pricing.tiers.perMonth");
  const tagline =
    offer.period === period
      ? fill(t(locale, `pricing.tiers.${tier.id}.tagline`), {
          count: tier.devices,
        })
      : t(locale, "pricing.tiers.subscriptionOnly");

  return (
    <li>
      <div className="site-tiers__link commercial-tier">
        <h3 className="site-tiers__name">
          {t(locale, `pricing.tiers.${tier.id}.name`)}
        </h3>
        <Price locale={locale} amount={offer.amount} suffix={suffix} from />
        <p className="site-tiers__text">{tagline}</p>
        <ul className="site-list">
          <li>
            <BarMark />
            {devicesLabel(tier, locale)}
          </li>
          <li>
            <BarMark />
            {t(locale, `pricing.tiers.${tier.id}.included`)}
          </li>
          {extras[tier.id].map((key) => (
            <li key={key}>
              <BarMark />
              {t(locale, `pricing.tiers.${tier.id}.${key}`)}
            </li>
          ))}
        </ul>
        <a
          href={offer.checkout}
          target="_blank"
          rel="noopener noreferrer"
          className="site-button site-button--small commercial-tier__action"
          data-checkout-tier={tier.id}
          data-checkout-billing-period={offer.period}
          data-tracking-placement="pricing"
          aria-label={`${t(locale, "pricing.tiers.checkout")}: ${t(locale, `pricing.tiers.${tier.id}.name`)}`}
        >
          {t(locale, "pricing.tiers.checkout")}
        </a>
      </div>
    </li>
  );
}

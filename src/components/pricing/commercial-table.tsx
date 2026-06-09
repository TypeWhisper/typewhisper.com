import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { t, type Locale } from "@/i18n/index";
import {
  commercialTiers,
  currencySymbol,
  polarCustomerPortalUrl,
  type CommercialTier,
} from "@/lib/pricing";

function tierDevicesLabel(tier: CommercialTier, locale: Locale): string {
  if (tier.devices === "unlimited") {
    return t(locale, "pricing.tiers.devicesUnlimited");
  }
  const template = t(locale, "pricing.tiers.devicesCount");
  return template.replace("{count}", String(tier.devices));
}

export function CommercialTable({ locale }: { locale: Locale }) {
  return (
    <section id="commercial-table" className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t(locale, "pricing.commercial.tableTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t(locale, "pricing.commercial.tableSubtitle")}
          </p>
        </div>

        <div className="mt-10 space-y-8">
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t(locale, "pricing.commercial.monthlyHeading")}
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {commercialTiers.map((tier) => (
                <TierCard
                  key={`m-${tier.id}`}
                  tier={tier}
                  period="monthly"
                  locale={locale}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t(locale, "pricing.commercial.lifetimeHeading")}
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {commercialTiers.map((tier) => (
                <TierCard
                  key={`l-${tier.id}`}
                  tier={tier}
                  period="lifetime"
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-2 text-center text-sm text-muted-foreground">
          <p>{t(locale, "pricing.commercial.payWhatYouWant")}</p>
          <p>
            {t(locale, "pricing.commercial.activationBefore")}{" "}
            <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              {t(locale, "pricing.commercial.activationPath")}
            </span>{" "}
            {t(locale, "pricing.commercial.activationAfter")}
          </p>
          <p>
            <a
              href={polarCustomerPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              {t(locale, "pricing.commercial.manageSubscription")}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function TierCard({
  tier,
  period,
  locale,
}: {
  tier: CommercialTier;
  period: "monthly" | "lifetime";
  locale: Locale;
}) {
  const price = tier.price[period];
  const checkout = tier.checkout[period];
  const priceSuffix =
    period === "monthly"
      ? t(locale, "pricing.tiers.perMonth")
      : t(locale, "pricing.tiers.oneTime");
  const tierLabel = t(locale, `pricing.tiers.${tier.id}.name`);
  const tagline = t(locale, `pricing.tiers.${tier.id}.tagline`);

  return (
    <Card className="flex flex-col bg-card transition-colors hover:border-primary/40">
      <CardHeader>
        <CardTitle className="text-lg">{tierLabel}</CardTitle>
        <p className="text-xs text-muted-foreground">{tagline}</p>
        <p className="mt-2 text-xs font-medium text-muted-foreground">
          {tierDevicesLabel(tier, locale)}
        </p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <p className="text-2xl font-bold">
          <span className="text-sm font-normal text-muted-foreground">
            {t(locale, "pricing.tiers.from")}{" "}
          </span>
          {price} {currencySymbol}
          <span className="ml-1 text-sm font-normal text-muted-foreground">
            {priceSuffix}
          </span>
        </p>
        <Button asChild size="sm">
          <a href={checkout} target="_blank" rel="noopener noreferrer">
            {t(locale, "pricing.tiers.checkout")}
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

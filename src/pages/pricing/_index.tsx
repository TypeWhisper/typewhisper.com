import { ArrowRight, Check, Crown, Heart, Star, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { t, localePath, type Locale } from "@/i18n/index";
import {
  commercialTiers,
  supporterTiers,
  currencySymbol,
  polarCustomerPortalUrl,
  salesEmail,
  type CommercialTier,
  type SupporterTier,
} from "@/lib/pricing";

interface PricingIndexProps {
  locale?: Locale;
}

const supporterIcons: Record<SupporterTier["iconName"], LucideIcon> = {
  heart: Heart,
  star: Star,
  crown: Crown,
};

function tierDevicesLabel(tier: CommercialTier, locale: Locale): string {
  if (tier.devices === "unlimited") {
    return t(locale, "pricing.tiers.devicesUnlimited");
  }
  const template = t(locale, "pricing.tiers.devicesCount");
  return template.replace("{count}", String(tier.devices));
}

function PricingHero({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-500/15" />
        <div className="absolute -right-32 top-24 h-[400px] w-[400px] rounded-full bg-indigo-400/10 blur-[120px] dark:bg-indigo-500/15" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h1 className="font-display text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
          {t(locale, "pricing.hero.title")}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          {t(locale, "pricing.hero.subtitle")}
        </p>
      </div>
    </section>
  );
}

function DecisionHelper({ locale }: { locale: Locale }) {
  const scenarios = [
    {
      id: "personal",
      recommend: t(locale, "pricing.decision.personal.recommend"),
      title: t(locale, "pricing.decision.personal.title"),
      examples: [
        t(locale, "pricing.decision.personal.example1"),
        t(locale, "pricing.decision.personal.example2"),
        t(locale, "pricing.decision.personal.example3"),
      ],
      targetId: "personal-plan",
      action: t(locale, "pricing.decision.action.personal"),
      tone: "emerald" as const,
    },
    {
      id: "individual",
      recommend: t(locale, "pricing.decision.individual.recommend"),
      title: t(locale, "pricing.decision.individual.title"),
      examples: [
        t(locale, "pricing.decision.individual.example1"),
        t(locale, "pricing.decision.individual.example2"),
        t(locale, "pricing.decision.individual.example3"),
      ],
      targetId: "commercial-plans",
      action: t(locale, "pricing.decision.action.commercial"),
      tone: "indigo" as const,
    },
    {
      id: "team",
      recommend: t(locale, "pricing.decision.team.recommend"),
      title: t(locale, "pricing.decision.team.title"),
      examples: [
        t(locale, "pricing.decision.team.example1"),
        t(locale, "pricing.decision.team.example2"),
      ],
      targetId: "commercial-plans",
      action: t(locale, "pricing.decision.action.commercial"),
      tone: "indigo" as const,
    },
    {
      id: "enterprise",
      recommend: t(locale, "pricing.decision.enterprise.recommend"),
      title: t(locale, "pricing.decision.enterprise.title"),
      examples: [
        t(locale, "pricing.decision.enterprise.example1"),
        t(locale, "pricing.decision.enterprise.example2"),
      ],
      targetId: "commercial-plans",
      action: t(locale, "pricing.decision.action.commercial"),
      tone: "indigo" as const,
    },
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t(locale, "pricing.decision.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t(locale, "pricing.decision.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {scenarios.map((s) => (
            <Card
              key={s.id}
              className="border bg-card/80 transition-colors hover:border-primary/40"
            >
              <CardHeader>
                <span
                  className={
                    "inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide " +
                    (s.tone === "emerald"
                      ? "border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                      : "border-indigo-500/40 text-indigo-600 dark:text-indigo-400")
                  }
                >
                  {s.recommend}
                </span>
                <CardTitle className="text-lg">{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {s.examples.map((ex) => (
                    <li key={ex} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="link-arrow" size="sm" className="self-start">
                  <a href={`#${s.targetId}`} className="inline-flex items-center gap-1">
                    {s.action}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HonorSystemBanner({ locale }: { locale: Locale }) {
  return (
    <section className="py-6">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-2xl border border-dashed border-border bg-card/60 p-6 text-center">
          <h3 className="text-base font-semibold">
            {t(locale, "pricing.honor.title")}
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            {t(locale, "pricing.honor.description")}
          </p>
        </div>
      </div>
    </section>
  );
}

function PersonalVsCommercial({ locale }: { locale: Locale }) {
  const personalFeatures = [
    t(locale, "pricing.personal.feature.allFeatures"),
    t(locale, "pricing.personal.feature.allPlatforms"),
    t(locale, "pricing.personal.feature.local"),
    t(locale, "pricing.personal.feature.community"),
    t(locale, "pricing.personal.feature.source"),
  ];

  const commercialFeatures = [
    t(locale, "pricing.commercial.feature.sameFeatures"),
    t(locale, "pricing.commercial.feature.proprietary"),
    t(locale, "pricing.commercial.feature.devices"),
    t(locale, "pricing.commercial.feature.priority"),
    t(locale, "pricing.commercial.feature.payWhatYouWant"),
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t(locale, "pricing.compare.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t(locale, "pricing.compare.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card id="personal-plan" className="border bg-card">
            <CardHeader>
              <span className="inline-flex w-fit items-center gap-1 rounded-full border border-emerald-500/40 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                {t(locale, "pricing.personal.badge")}
              </span>
              <CardTitle className="text-2xl">
                {t(locale, "pricing.personal.title")}
              </CardTitle>
              <p className="text-3xl font-bold">
                {t(locale, "pricing.personal.price")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t(locale, "pricing.personal.priceNote")}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ul className="space-y-2 text-sm">
                {personalFeatures.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline">
                <a href="#supporter">{t(locale, "pricing.personal.cta")}</a>
              </Button>
            </CardContent>
          </Card>

          <Card id="commercial-plans" className="border border-primary/40 bg-card">
            <CardHeader>
              <span className="inline-flex w-fit items-center gap-1 rounded-full border border-indigo-500/40 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                {t(locale, "pricing.commercial.badge")}
              </span>
              <CardTitle className="text-2xl">
                {t(locale, "pricing.commercial.title")}
              </CardTitle>
              <p className="text-3xl font-bold">
                {t(locale, "pricing.commercial.priceFrom")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t(locale, "pricing.commercial.priceNote")}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ul className="space-y-2 text-sm">
                {commercialFeatures.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-indigo-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild>
                <a href="#commercial-table">{t(locale, "pricing.commercial.cta")}</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function CommercialTable({ locale }: { locale: Locale }) {
  return (
    <section id="commercial-table" className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
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
    <Card className="flex flex-col border bg-card transition-colors hover:border-primary/40">
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

function SupporterSection({ locale }: { locale: Locale }) {
  return (
    <section id="supporter" className="relative py-12 sm:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-border" aria-hidden="true" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {t(locale, "supporter.eyebrow")}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t(locale, "supporter.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t(locale, "supporter.subtitle")}
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-dashed border-border bg-card/60 p-4 text-center text-sm text-muted-foreground">
          {t(locale, "supporter.disclaimer")}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {supporterTiers.map((tier) => {
            const Icon = supporterIcons[tier.iconName];
            const name = t(locale, `supporter.tier.${tier.id}.name`);
            const description = t(locale, `supporter.tier.${tier.id}.description`);
            return (
              <Card key={tier.id} className="flex flex-col border bg-card">
                <CardHeader>
                  <Icon className={"size-6 " + tier.accentColorClass} />
                  <CardTitle>{name}</CardTitle>
                  <p className="text-2xl font-bold">
                    {tier.price} {currencySymbol}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">
                      {t(locale, "supporter.oneTime")}
                    </span>
                  </p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-4">
                  <p className="text-sm text-muted-foreground">{description}</p>
                  <Button asChild variant="outline" size="sm">
                    <a href={tier.checkout} target="_blank" rel="noopener noreferrer">
                      {t(locale, "supporter.become")}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm font-medium text-foreground">
          {t(locale, "supporter.perksTitle")}
        </p>
        <ul className="mx-auto mt-3 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <li className="inline-flex items-center gap-2">
            <Check className="size-4 shrink-0 text-emerald-500" />
            <span>{t(locale, "supporter.perk.badge")}</span>
          </li>
          <li className="inline-flex items-center gap-2">
            <Check className="size-4 shrink-0 text-emerald-500" />
            <span>{t(locale, "supporter.perk.discord")}</span>
          </li>
          <li className="inline-flex items-center gap-2">
            <Check className="size-4 shrink-0 text-emerald-500" />
            <span>{t(locale, "supporter.perk.thanks")}</span>
          </li>
        </ul>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <a
            href="https://github.com/sponsors/seofood"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            {t(locale, "supporter.githubSponsors")}
          </a>
        </p>
      </div>
    </section>
  );
}

function Faq({ locale }: { locale: Locale }) {
  const items = [
    "gpl",
    "freelancer",
    "workPay",
    "upgrade",
    "supporterVsCommercial",
    "lifetimeUpdates",
    "cancel",
    "refund",
    "discounts",
    "activate",
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t(locale, "pricing.faq.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t(locale, "pricing.faq.subtitle")}
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {items.map((id) => (
            <details
              key={id}
              className="group rounded-2xl border bg-card p-5 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium">
                <span>{t(locale, `pricing.faq.${id}.q`)}</span>
                <span className="text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="mt-3 whitespace-pre-line text-sm text-muted-foreground">
                {t(locale, `pricing.faq.${id}.a`)}
              </div>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          {t(locale, "pricing.faq.contactBefore")}{" "}
          <a
            href={`mailto:${salesEmail}`}
            className="text-primary underline-offset-4 hover:underline"
          >
            {salesEmail}
          </a>
        </p>
      </div>
    </section>
  );
}

export default function PricingIndex({ locale = "en" }: PricingIndexProps) {
  return (
    <>
      <PricingHero locale={locale} />
      <DecisionHelper locale={locale} />
      <HonorSystemBanner locale={locale} />
      <PersonalVsCommercial locale={locale} />
      <CommercialTable locale={locale} />
      <SupporterSection locale={locale} />
      <Faq locale={locale} />

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

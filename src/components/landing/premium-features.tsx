import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Screenshot } from "@/components/ui/screenshot";
import { localePath, screenshotPath, t, type Locale } from "@/i18n/index";

interface PremiumFeature {
  title: string;
  description: string;
  items: string[];
}

function PremiumFeatureBlock({ feature }: { feature: PremiumFeature }) {
  return (
    <div className="flex flex-col justify-center p-6 sm:p-8">
      <h3 className="text-2xl font-semibold text-card-foreground">
        {feature.title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        {feature.description}
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-primary">
        {feature.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function PremiumFeatures({ locale = "en" }: { locale?: Locale }) {
  const features: PremiumFeature[] = [
    {
      title: t(locale, "premiumFeatures.sync.title"),
      description: t(locale, "premiumFeatures.sync.description"),
      items: [
        t(locale, "premiumFeatures.sync.item1"),
        t(locale, "premiumFeatures.sync.item2"),
        t(locale, "premiumFeatures.sync.item3"),
      ],
    },
    {
      title: t(locale, "premiumFeatures.dictionary.title"),
      description: t(locale, "premiumFeatures.dictionary.description"),
      items: [
        t(locale, "premiumFeatures.dictionary.item1"),
        t(locale, "premiumFeatures.dictionary.item2"),
        t(locale, "premiumFeatures.dictionary.item3"),
      ],
    },
  ];
  const premiumScreenshot = screenshotPath(
    locale,
    "/screenshots/mac/premium.png",
  );

  return (
    <section
      id="premium"
      data-testid="premium-features"
      className="section-dark-card py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="reveal-fade-hidden text-sm font-semibold uppercase tracking-wide text-primary">
            {t(locale, "premiumFeatures.eyebrow")}
          </p>
          <h2 className="reveal-fade-hidden mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t(locale, "premiumFeatures.title")}
          </h2>
          <p className="reveal-fade-hidden mt-4 text-lg text-muted-foreground">
            {t(locale, "premiumFeatures.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <div className="reveal-hidden flex overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-black/20">
            <Screenshot
              src={premiumScreenshot}
              alt={t(locale, "premiumFeatures.screenshotAlt")}
              className="h-full w-full rounded-xl object-contain"
              loading="lazy"
            />
          </div>

          <div className="reveal-hidden grid overflow-hidden rounded-2xl border border-border bg-card lg:grid-rows-2">
            {features.map((feature) => (
              <PremiumFeatureBlock key={feature.title} feature={feature} />
            ))}
          </div>
        </div>

        <div className="reveal-hidden mt-8 flex flex-col items-center gap-3 text-center">
          <p className="max-w-2xl text-sm text-muted-foreground">
            {t(locale, "premiumFeatures.licenseNote")}
          </p>
          <Button variant="link-arrow" asChild>
            <a
              href={localePath(locale, "/pricing")}
              className="inline-flex items-center gap-1 text-primary"
            >
              {t(locale, "premiumFeatures.cta")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

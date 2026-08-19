import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Screenshot } from "@/components/ui/screenshot";
import { localePath, screenshotPath, t, type Locale } from "@/i18n/index";
import { useSyncedLandingPlatform } from "@/hooks/use-landing-platform";
import { premiumScreenshotByPlatform } from "@/lib/landing-screenshots";

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
  const platform = useSyncedLandingPlatform();
  const isIos = platform === "ios";
  const keyPrefix = isIos ? "premiumFeatures.ios" : "premiumFeatures";
  const features: PremiumFeature[] = [
    {
      title: t(locale, `${keyPrefix}.sync.title`),
      description: t(locale, `${keyPrefix}.sync.description`),
      items: [
        t(locale, `${keyPrefix}.sync.item1`),
        t(locale, `${keyPrefix}.sync.item2`),
        t(locale, `${keyPrefix}.sync.item3`),
      ],
    },
    {
      title: t(locale, `${keyPrefix}.dictionary.title`),
      description: t(locale, `${keyPrefix}.dictionary.description`),
      items: [
        t(locale, `${keyPrefix}.dictionary.item1`),
        t(locale, `${keyPrefix}.dictionary.item2`),
        t(locale, `${keyPrefix}.dictionary.item3`),
      ],
    },
  ];
  const premiumScreenshot = screenshotPath(
    locale,
    premiumScreenshotByPlatform[platform],
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
            {t(locale, `${keyPrefix}.eyebrow`)}
          </p>
          <h2 className="reveal-fade-hidden mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t(locale, `${keyPrefix}.title`)}
          </h2>
          <p className="reveal-fade-hidden mt-4 text-lg text-muted-foreground">
            {t(locale, `${keyPrefix}.subtitle`)}
          </p>
        </div>

        <div
          className={`mt-12 grid gap-6 ${isIos ? "lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start lg:justify-center" : "lg:grid-cols-2 lg:items-stretch"}`}
        >
          <div
            data-testid={isIos ? "ios-premium-visual" : undefined}
            className={`reveal-hidden flex overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-black/20 ${isIos ? "mx-auto w-full max-w-56 sm:max-w-72" : ""}`}
          >
            <Screenshot
              src={premiumScreenshot}
              alt={t(locale, `${keyPrefix}.screenshotAlt`)}
              className={`${isIos ? "h-auto" : "h-full object-contain"} w-full rounded-xl`}
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
            {t(locale, `${keyPrefix}.licenseNote`)}
          </p>
          <Button variant="link-arrow" asChild>
            <a
              href={localePath(locale, "/pricing")}
              className="inline-flex items-center gap-1 text-primary"
            >
              {t(locale, `${keyPrefix}.cta`)}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

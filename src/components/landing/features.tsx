import { t, screenshotPath, type Locale } from "@/i18n/index";
import { Screenshot } from "@/components/ui/screenshot";
import {
  useSyncedLandingPlatform,
  type LandingPlatform,
} from "@/hooks/use-landing-platform";
import { featureScreenshotsByPlatform } from "@/lib/landing-screenshots";

interface Feature {
  title: string;
  description: string;
  screenshot?: string;
  span?: "col-span-1" | "col-span-2";
}

function FeatureCard({
  feature,
  className = "",
}: {
  feature: Feature;
  className?: string;
}) {
  return (
    <div
      className={`reveal-hidden group rounded-2xl border border-border bg-card p-6 sm:p-8 ${className}`}
    >
      <h3 className="text-xl font-semibold text-card-foreground sm:text-2xl">
        {feature.title}
      </h3>
      <p className="mt-2 max-w-lg text-muted-foreground">
        {feature.description}
      </p>
      {feature.screenshot && (
        <div className="mt-6 overflow-hidden rounded-xl">
          <Screenshot
            src={feature.screenshot}
            alt={feature.title}
            className="w-full rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}

function getFeatures(locale: Locale, platform: LandingPlatform): Feature[] {
  const screenshots = featureScreenshotsByPlatform[platform];
  const keyPrefix = platform === "ios" ? "features.ios" : "features";

  return [
    {
      title: t(locale, `${keyPrefix}.private.title`),
      description: t(locale, `${keyPrefix}.private.description`),
      span: "col-span-2",
      screenshot: screenshotPath(locale, screenshots.private),
    },
    {
      title: t(locale, `${keyPrefix}.dictation.title`),
      description: t(locale, `${keyPrefix}.dictation.description`),
      screenshot: screenshotPath(locale, screenshots.dictation),
    },
    {
      title: t(locale, `${keyPrefix}.prompts.title`),
      description: t(locale, `${keyPrefix}.prompts.description`),
      screenshot: screenshotPath(locale, screenshots.prompts),
    },
    {
      title: t(locale, `${keyPrefix}.profiles.title`),
      description: t(locale, `${keyPrefix}.profiles.description`),
      screenshot: screenshotPath(locale, screenshots.profiles),
    },
    {
      title: t(locale, `${keyPrefix}.transcription.title`),
      description: t(locale, `${keyPrefix}.transcription.description`),
      screenshot: screenshotPath(locale, screenshots.transcription),
    },
  ];
}

export function Features({ locale = "en" }: { locale?: Locale }) {
  const platform = useSyncedLandingPlatform();
  const features = getFeatures(locale, platform);
  const isIos = platform === "ios";
  const keyPrefix = isIos ? "features.ios" : "features";
  const fullWidthFeatures = features.filter(
    (feature) => feature.span === "col-span-2",
  );
  const bentoFeatures = features.filter(
    (feature) => feature.span !== "col-span-2",
  );
  const bentoColumns = [
    bentoFeatures.filter((_, i) => i % 2 === 0),
    bentoFeatures.filter((_, i) => i % 2 === 1),
  ];

  return (
    <section id="features" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t(locale, `${keyPrefix}.title`)}
        </h2>
        <p className="reveal-fade-hidden mt-4 text-center text-lg text-muted-foreground">
          {t(locale, `${keyPrefix}.subtitle`)}
        </p>

        {isIos ? (
          <div className="mt-10" data-testid="ios-feature-layout">
            <div
              className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:mx-auto sm:max-w-4xl sm:justify-center sm:overflow-visible sm:px-0"
              data-testid="ios-feature-gallery"
            >
              {features.slice(1, 4).map((feature) => (
                <div
                  key={feature.title}
                  className="reveal-scale-hidden w-[12.5rem] flex-none snap-center overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-xl shadow-black/10 sm:w-[13.5rem] lg:w-56"
                >
                  <Screenshot
                    src={feature.screenshot!}
                    alt={feature.title}
                    className="w-full rounded-xl"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="reveal-hidden rounded-2xl border border-border bg-card p-5 sm:p-6"
                >
                  <h3 className="text-lg font-semibold text-card-foreground sm:text-xl">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12 space-y-4">
            {fullWidthFeatures.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}

            <div className="grid gap-4 sm:hidden">
              {bentoFeatures.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </div>

            <div className="hidden gap-4 sm:grid sm:grid-cols-2 sm:items-start">
              {bentoColumns.map((column, i) => (
                <div key={i} className="flex flex-col gap-4">
                  {column.map((feature) => (
                    <FeatureCard key={feature.title} feature={feature} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

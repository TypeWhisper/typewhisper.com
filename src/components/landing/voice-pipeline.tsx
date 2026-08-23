import { t, type Locale } from "@/i18n/index";
import { useSyncedLandingPlatform } from "@/hooks/use-landing-platform";

const steps = ["capture", "transcribe", "shape", "deliver"] as const;

function WaveformMark() {
  const heights = [7, 14, 22, 11, 27, 17, 9, 20, 12, 6];

  return (
    <span className="flex h-7 items-center gap-1" aria-hidden="true">
      {heights.map((height, index) => (
        <span
          key={`${height}-${index}`}
          className="block w-0.5 rounded-full bg-primary"
          style={{ height }}
        />
      ))}
    </span>
  );
}

export function VoicePipeline({ locale = "en" }: { locale?: Locale }) {
  const platform = useSyncedLandingPlatform();

  return (
    <section
      className="overflow-hidden border-y border-border bg-background py-20 sm:py-28"
      data-testid="voice-pipeline"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {t(locale, "voicePipeline.eyebrow")}
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t(locale, "voicePipeline.title")}
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground lg:justify-self-end">
            {t(locale, `voicePipeline.subtitle.${platform}`)}
          </p>
        </div>

        <div className="relative mt-12 border-y border-border sm:mt-16">
          <div className="absolute left-0 right-0 top-[2.1rem] hidden h-px bg-border lg:block" />
          <div className="grid lg:grid-cols-4">
            {steps.map((step, index) => (
              <article
                key={step}
                className="relative grid grid-cols-[3rem_1fr] gap-4 border-b border-border py-7 last:border-b-0 lg:block lg:border-b-0 lg:border-r lg:px-6 lg:py-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <div className="relative z-10 flex size-10 items-center justify-center rounded-full border border-primary/30 bg-background font-mono text-xs font-semibold text-primary lg:mb-8">
                  0{index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {t(locale, `voicePipeline.${step}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(locale, `voicePipeline.${step}.description.${platform}`)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-3 font-medium text-foreground">
            <WaveformMark />
            {t(locale, `voicePipeline.platform.${platform}`)}
          </span>
          <span>{t(locale, "voicePipeline.note")}</span>
        </div>
      </div>
    </section>
  );
}

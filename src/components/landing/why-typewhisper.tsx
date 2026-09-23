import { AppWindow, Blocks, ShieldCheck, Sparkles } from "lucide-react";
import { Waveform } from "@/components/ui/waveform";
import { getPlugins } from "@/data/addons";
import { t, type Locale } from "@/i18n/index";

const pillars = [
  { key: "private", Icon: ShieldCheck },
  { key: "everywhere", Icon: AppWindow },
  { key: "finished", Icon: Sparkles },
  { key: "open", Icon: Blocks },
] as const;

/** Evergreen value proposition. Static markup, no hydration. */
export function WhyTypeWhisper({ locale = "en" }: { locale?: Locale }) {
  const addonCount = String(getPlugins(locale).length);

  return (
    <section
      data-testid="why-typewhisper"
      className="border-b border-border bg-background py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl reveal-hidden">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            <Waveform bars={10} seed={5} animated className="h-5" />
            {t(locale, "why.eyebrow")}
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t(locale, "why.title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t(locale, "why.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ key, Icon }, index) => (
            <div
              key={key}
              className={`reveal-hidden stagger-delay-${index + 1}00`}
            >
              <article className="group h-full rounded-2xl border border-border bg-card p-6 transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-primary/40">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-card-foreground">
                  {t(locale, `why.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(locale, `why.${key}.description`).replace(
                    "{count}",
                    addonCount,
                  )}
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

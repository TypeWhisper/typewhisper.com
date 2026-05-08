import type { CSSProperties } from "react";
import type { UseCaseStep } from "@/data/use-cases";
import { t, type Locale } from "@/i18n/index";

interface UseCaseHowItWorksProps {
  steps: UseCaseStep[];
  locale?: Locale;
  /** Use-case brand color used for the step number ring. */
  color?: string;
}

export function UseCaseHowItWorks({
  steps,
  locale = "en",
  color,
}: UseCaseHowItWorksProps) {
  const tint = color ?? "var(--primary)";

  return (
    <section
      id="how-it-works"
      className="section-light-gray scroll-mt-24 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {t(locale, "useCases.howItWorksTitle")}
        </h2>

        <div className="relative mt-14">
          {steps.length > 1 && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[8.333%] right-[8.333%] top-7 hidden h-px sm:block"
              style={
                {
                  background: `linear-gradient(90deg, transparent, ${color ? `${color}66` : "var(--border)"}, transparent)`,
                } satisfies CSSProperties
              }
            />
          )}

          <div className="relative grid gap-10 sm:grid-cols-3 sm:gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="reveal-hidden flex flex-col items-center text-center"
              >
                <div
                  className="relative flex size-14 items-center justify-center rounded-full bg-background text-2xl font-bold text-foreground"
                  style={
                    {
                      boxShadow: `inset 0 0 0 2px ${tint}, 0 8px 24px -10px ${color ? `${color}99` : "rgba(0,0,0,0.2)"}`,
                      color: color ?? undefined,
                    } satisfies CSSProperties
                  }
                >
                  {i + 1}
                </div>
                <h3 className="mt-5 text-xl font-semibold">{step.step}</h3>
                <p className="mt-2 max-w-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

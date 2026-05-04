import type { UseCaseStep } from "@/data/use-cases";
import { t, type Locale } from "@/i18n/index";

interface UseCaseHowItWorksProps {
  steps: UseCaseStep[];
  locale?: Locale;
}

export function UseCaseHowItWorks({ steps, locale = "en" }: UseCaseHowItWorksProps) {
  return (
    <section className="section-light-gray py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {t(locale, "useCases.howItWorksTitle")}
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="reveal-hidden text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {i + 1}
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                {step.step}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { SectionHead } from "@/components/site";
import type { UseCaseStep } from "@/data/use-cases";
import { t, type Locale } from "@/i18n/index";
import { inline } from "./inline";

interface UseCaseHowItWorksProps {
  steps: UseCaseStep[];
  locale?: Locale;
}

/** The steps side by side, counted in the utility font. */
export function UseCaseHowItWorks({
  steps,
  locale = "en",
}: UseCaseHowItWorksProps) {
  return (
    <section className="site-section" data-testid="use-case-steps">
      <div className="site-wrap">
        <SectionHead
          id="how-it-works"
          label={t(locale, "useCases.howItWorksLabel")}
          title={t(locale, "useCases.howItWorksTitle")}
          seed={23}
        />

        <ol className="usecase-steps">
          {steps.map((step, index) => (
            <li
              key={step.step}
              className={`usecase-steps__item reveal-hidden stagger-delay-${index + 1}00`}
            >
              <span className="usecase-steps__count" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="site-heading">{step.step}</h3>
              <p className="site-text">{inline(step.description)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

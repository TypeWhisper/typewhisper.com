import { BarMark, WaveRule } from "@/components/site";
import { t, type Locale } from "@/i18n/index";
import { inline } from "./inline";

interface UseCaseBenefitsProps {
  benefits: string[];
  locale?: Locale;
}

/** The benefits as rows of type on a quiet band. */
export function UseCaseBenefits({
  benefits,
  locale = "en",
}: UseCaseBenefitsProps) {
  return (
    <section
      className="site-section site-section--band"
      data-testid="use-case-benefits"
    >
      <div className="site-wrap">
        <WaveRule label={t(locale, "useCases.benefitsLabel")} seed={31} />
        <div className="site-split">
          <div className="site-split__head reveal-hidden">
            <h2 className="site-title site-title--start">
              {t(locale, "useCases.benefitsTitle")}
            </h2>
          </div>

          <ul className="usecase-benefits reveal-hidden">
            {benefits.map((benefit) => (
              <li key={benefit} className="usecase-benefits__item">
                <BarMark />
                <span>{inline(benefit)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

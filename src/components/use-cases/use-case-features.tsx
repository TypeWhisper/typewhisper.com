import { BarMark, WaveRule } from "@/components/site";
import type { UseCaseFeature } from "@/data/use-cases";
import { t, type Locale } from "@/i18n/index";
import { inline } from "./inline";

interface UseCaseFeaturesProps {
  features: UseCaseFeature[];
  locale?: Locale;
}

/** The features as a typographic list beside their headline. */
export function UseCaseFeatures({
  features,
  locale = "en",
}: UseCaseFeaturesProps) {
  return (
    <section
      className="site-section site-section--tight-top"
      data-testid="use-case-features"
    >
      <div className="site-wrap">
        <WaveRule label={t(locale, "useCases.featuresLabel")} seed={5} />
        <div className="site-split">
          <div className="site-split__head reveal-hidden">
            <h2 className="site-title site-title--start">
              {t(locale, "useCases.featuresTitle")}
            </h2>
          </div>

          <ul className="site-points">
            {features.map((feature, index) => (
              <li
                key={feature.title}
                className={`site-points__item reveal-hidden stagger-delay-${index + 1}00`}
              >
                <BarMark className="site-points__mark" />
                <div>
                  <h3 className="site-points__title">{feature.title}</h3>
                  <p className="site-points__text">
                    {inline(feature.description)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

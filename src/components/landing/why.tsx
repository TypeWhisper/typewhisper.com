import { getPlugins } from "@/data/addons";
import { t, type Locale } from "@/i18n/index";
import { BarMark } from "@/components/site/bar-mark";
import { WaveRule } from "@/components/site/wave-rule";

const pillars = ["private", "everywhere", "finished", "open"] as const;

/** The four reasons as a typographic list beside the claim. Static markup. */
export function Why({ locale = "en" }: { locale?: Locale }) {
  const addonCount = String(getPlugins(locale).length);

  return (
    <section data-testid="why-typewhisper" className="site-section">
      <div className="site-wrap">
        <WaveRule label={t(locale, "why.eyebrow")} seed={5} />
        <div className="site-split">
          <div className="site-split__head reveal-hidden">
            <h2 className="site-title site-title--start">
              {t(locale, "why.title")}
            </h2>
            <p className="site-lede site-lede--start">
              {t(locale, "why.subtitle")}
            </p>
          </div>

          <ul className="site-points">
            {pillars.map((pillar, index) => (
              <li
                key={pillar}
                className={`site-points__item reveal-hidden stagger-delay-${index + 1}00`}
              >
                <BarMark className="site-points__mark" />
                <div>
                  <h3 className="site-points__title">
                    {t(locale, `why.${pillar}.title`)}
                  </h3>
                  <p className="site-points__text">
                    {t(locale, `why.${pillar}.description`).replace(
                      "{count}",
                      addonCount,
                    )}
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

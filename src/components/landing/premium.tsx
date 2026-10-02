import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Screenshot } from "@/components/ui/screenshot";
import { useSyncedLandingPlatform } from "@/hooks/use-landing-platform";
import {
  macPremiumScreenshots,
  premiumScreenshotByPlatform,
  type PremiumFeatureKey,
} from "@/lib/landing-screenshots";
import { localePath, screenshotPath, t, type Locale } from "@/i18n/index";
import { SectionHead } from "@/components/site/section-head";
import { BarMark } from "@/components/site/bar-mark";
import { watchPanRegion } from "@/lib/pan-region";

const blocks: PremiumFeatureKey[] = ["sync", "dictionary"];
const items = ["item1", "item2", "item3"] as const;

/*
 * Rendered width of the macOS detail windows including their shadow margin:
 * natural size from 1152px, beside the text from 1024px, stacked below.
 */
const macScreenshotSizes: Record<PremiumFeatureKey, string> = {
  sync: "(min-width: 1152px) 752px, (min-width: 1024px) calc(111.6vw - 489px), (min-width: 640px) min(752px, calc(117.5vw - 75px)), calc(117.5vw - 47px)",
  dictionary:
    "(min-width: 1152px) 692px, (min-width: 1024px) calc(102.7vw - 450px), (min-width: 640px) min(692px, calc(108.1vw - 69px)), calc(108.1vw - 43px)",
};

function FeatureText({
  locale,
  prefix,
  block,
}: {
  locale: Locale;
  prefix: string;
  block: PremiumFeatureKey;
}) {
  return (
    <>
      <h3 className="landing-feature__title">
        {t(locale, `${prefix}.${block}.title`)}
      </h3>
      <p className="site-text">{t(locale, `${prefix}.${block}.description`)}</p>
      <ul className="site-list">
        {items.map((item) => (
          <li key={item}>
            <BarMark />
            {t(locale, `${prefix}.${block}.${item}`)}
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * Premium features beside real screenshots. macOS pairs each feature with its
 * own detail window; Windows and iOS show one capture beside both features.
 */
export function Premium({ locale = "en" }: { locale?: Locale }) {
  const revealRoot = useScrollReveal();
  const platform = useSyncedLandingPlatform();
  const prefix = platform === "ios" ? "premiumFeatures.ios" : "premiumFeatures";

  return (
    <section
      ref={revealRoot}
      id="premium"
      data-testid="premium-features"
      data-platform={platform}
      className="site-section site-section--band landing-premium"
    >
      <div className="site-wrap">
        <SectionHead
          label={t(locale, `${prefix}.eyebrow`)}
          title={t(locale, `${prefix}.title`)}
          lede={t(locale, `${prefix}.subtitle`)}
          seed={41}
        />

        {platform === "mac" ? (
          <div key="mac" className="landing-premium__rows">
            {blocks.map((block) => {
              const caption = t(locale, `premiumFeatures.mac.${block}.caption`);
              return (
                <div
                  key={block}
                  className="landing-premium__row reveal-hidden"
                  data-testid="premium-feature"
                >
                  <div className="landing-premium__text">
                    <FeatureText
                      locale={locale}
                      prefix={prefix}
                      block={block}
                    />
                  </div>
                  <figure
                    className={`landing-premium__figure landing-premium__figure--${block}`}
                  >
                    <div className="landing-premium__frame">
                      <Screenshot
                        src={screenshotPath(
                          locale,
                          macPremiumScreenshots[block],
                        )}
                        alt={caption}
                        loading="lazy"
                        sizes={macScreenshotSizes[block]}
                      />
                    </div>
                    <figcaption className="site-caption" aria-hidden="true">
                      {caption}
                    </figcaption>
                  </figure>
                </div>
              );
            })}
          </div>
        ) : (
          <div key="single" className="landing-premium__grid">
            <div
              ref={watchPanRegion}
              className="landing-premium__shot reveal-hidden"
              role="group"
              aria-label={t(locale, `${prefix}.screenshotAlt`)}
              data-testid={
                platform === "ios" ? "ios-premium-visual" : undefined
              }
            >
              <Screenshot
                src={screenshotPath(
                  locale,
                  premiumScreenshotByPlatform[platform],
                )}
                alt={t(locale, `${prefix}.screenshotAlt`)}
                loading="lazy"
                sizes="(max-width: 639px) 150vw, (max-width: 899px) 100vw, 640px"
              />
            </div>

            <div className="landing-premium__blocks">
              {blocks.map((block) => (
                <div
                  key={block}
                  className="landing-premium__block reveal-hidden"
                >
                  <FeatureText locale={locale} prefix={prefix} block={block} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="site-note reveal-hidden">
          <p>{t(locale, `${prefix}.licenseNote`)}</p>
          <a href={localePath(locale, "/pricing")} className="site-link">
            {t(locale, `${prefix}.cta`)}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

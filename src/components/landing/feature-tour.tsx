import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Screenshot } from "@/components/ui/screenshot";
import {
  useSyncedLandingPlatform,
  type LandingPlatform,
} from "@/hooks/use-landing-platform";
import {
  featureScreenshotsByPlatform,
  type FeatureScreenshotKey,
} from "@/lib/landing-screenshots";
import { screenshotPath, t, type Locale } from "@/i18n/index";
import { SectionHead } from "@/components/site/section-head";
import { BarMark } from "@/components/site/bar-mark";
import { watchPanRegion } from "@/lib/pan-region";

const featureKeys: FeatureScreenshotKey[] = [
  "private",
  "dictation",
  "prompts",
  "profiles",
  "transcription",
];

/*
 * Rendered width of the screenshot per platform: pinned beside the text on
 * large screens, full width on tablets, panned at 150vw on phones. The macOS
 * captures are wider than their frame because of the shadow margin. Phones
 * with three device pixels per CSS pixel count the macOS strip as one viewport
 * width: they load the 1440px variant, still more than two pixels per CSS
 * pixel, instead of the full capture.
 */
const screenshotSizes: Record<LandingPlatform, string> = {
  mac: "(min-width: 1024px) min(66vw, 940px), (min-width: 640px) calc(110vw - 70px), (min-resolution: 2.5dppx) 100vw, 165vw",
  windows:
    "(min-width: 1024px) min(60vw, 850px), (min-width: 640px) calc(100vw - 64px), 150vw",
  ios: "(min-width: 1024px) 390px, 280px",
};

interface TourStep {
  key: FeatureScreenshotKey;
  title: string;
  description: string;
  screenshot: string;
  /** Says what the screenshot really shows. */
  caption: string;
}

function getSteps(locale: Locale, platform: LandingPlatform): TourStep[] {
  const screenshots = featureScreenshotsByPlatform[platform];
  return featureKeys.map((key) => ({
    key,
    title: t(locale, `features.${platform}.${key}.title`),
    description: t(locale, `features.${platform}.${key}.description`),
    screenshot: screenshotPath(locale, screenshots[key]),
    caption: t(locale, `features.${platform}.${key}.caption`),
  }));
}

/**
 * Tour through the real app. On large screens the screenshot stays pinned and
 * crossfades to the last feature that reached the middle of the viewport,
 * while the page scrolls natively. Small screens and reduced motion get plain pairs of
 * text and figure.
 */
export function FeatureTour({ locale = "en" }: { locale?: Locale }) {
  const revealRoot = useScrollReveal();
  const platform = useSyncedLandingPlatform();
  const steps = getSteps(locale, platform);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const tourRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tour = tourRef.current;
    if (!tour) return;

    // The last text that has reached the middle of the viewport is the active
    // step. Reading positions instead of crossing events keeps the screenshot
    // right after jumps (Page Down, End, anchor links, fast flicks).
    const resolve = () => {
      const middle = window.innerHeight / 2;
      let next = 0;
      textRefs.current.forEach((text, index) => {
        if (text && text.getBoundingClientRect().top <= middle) next = index;
      });
      setActive(next);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        resolve();
      });
    };

    // Only listen while the tour is near the viewport.
    let listening = false;
    const listen = (on: boolean) => {
      if (on === listening) return;
      listening = on;
      const method = on ? "addEventListener" : "removeEventListener";
      window[method]("scroll", onScroll, { passive: true });
      window[method]("resize", onScroll);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        listen(entry.isIntersecting);
        resolve();
      },
      { rootMargin: "50% 0px 50% 0px" },
    );
    observer.observe(tour);

    return () => {
      observer.disconnect();
      listen(false);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [platform]);

  const scrollToStep = (index: number) => {
    textRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section
      ref={revealRoot}
      id="features"
      data-testid="features"
      data-platform={platform}
      className="site-section landing-section--tour"
    >
      <div className="site-wrap">
        <SectionHead
          label={t(locale, "features.label")}
          title={t(locale, `features.${platform}.title`)}
          lede={t(locale, `features.${platform}.subtitle`)}
          seed={23}
        />

        <div
          ref={tourRef}
          className="landing-tour"
          data-platform={platform}
          data-testid="feature-tour"
        >
          <ol className="landing-tour__steps">
            {steps.map((step, index) => (
              <li
                key={step.key}
                className={`landing-tour__step ${index === active ? "is-active" : ""}`}
                data-testid="feature-tour-step"
              >
                <div
                  ref={(element) => {
                    textRefs.current[index] = element;
                  }}
                  className="landing-tour__text"
                >
                  <p className="landing-tour__count">
                    <BarMark />
                    {t(locale, "features.tour.step")
                      .replace("{current}", String(index + 1))
                      .replace("{total}", String(steps.length))}
                  </p>
                  <h3 className="landing-feature__title">{step.title}</h3>
                  <p className="site-text">{step.description}</p>
                </div>

                <figure className="landing-tour__inline">
                  <div
                    ref={watchPanRegion}
                    className="landing-tour__pan"
                    role="group"
                    aria-label={step.caption}
                  >
                    <div className="landing-shot">
                      <Screenshot
                        src={step.screenshot}
                        alt={step.caption}
                        loading="lazy"
                        sizes={screenshotSizes[platform]}
                      />
                    </div>
                  </div>
                  <figcaption className="site-caption" aria-hidden="true">
                    {step.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>

          <div className="landing-tour__stage" data-testid="feature-tour-stage">
            <div className="landing-tour__figure">
              <div className="landing-tour__layers">
                {steps.map((step, index) => (
                  <div
                    key={step.key}
                    className={`landing-tour__layer landing-shot ${index === active ? "is-active" : ""}`}
                    aria-hidden={index !== active}
                    data-testid="feature-tour-layer"
                  >
                    <Screenshot
                      src={step.screenshot}
                      alt={step.caption}
                      loading="lazy"
                      sizes={screenshotSizes[platform]}
                    />
                  </div>
                ))}
              </div>

              <div className="landing-tour__meta">
                <p className="site-caption" aria-hidden="true">
                  {steps[active]?.caption}
                </p>
                <div className="landing-tour__bars">
                  {steps.map((step, index) => (
                    <button
                      key={step.key}
                      type="button"
                      className={`landing-tour__bar ${
                        index === active
                          ? "is-active"
                          : Math.abs(index - active) === 1
                            ? "is-near"
                            : ""
                      }`}
                      aria-label={t(locale, "features.tour.goToStep").replace(
                        "{number}",
                        String(index + 1),
                      )}
                      aria-current={index === active ? "step" : undefined}
                      onClick={() => scrollToStep(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

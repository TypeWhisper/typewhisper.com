import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Screenshot } from "@/components/ui/screenshot";
import { useSyncedLandingPlatform } from "@/hooks/use-landing-platform";
import { screenshotPath, t, type Locale } from "@/i18n/index";
import { SectionHead } from "@/components/site/section-head";
import { androidPreviewScreenshots } from "@/lib/landing-screenshots";

const watchScreenshots = [
  "01-ready.webp",
  "02-recording.webp",
  "03-recent.webp",
] as const;

/**
 * Android has no screen recording yet; the section shows two Google Play
 * screenshots instead. Once /android-overview-en.mp4 and -de.mp4 are in
 * public/, set this to true: the section then plays them like the iOS App
 * Preview, with the first screenshot as poster. Rewrite
 * howItWorks.android.caption for the video, and check that its aspect ratio
 * matches .site-video--phone.
 */
const androidVideoReady = false;

/** The real product video, as large as the page allows. */
export function Video({ locale = "en" }: { locale?: Locale }) {
  const revealRoot = useScrollReveal();
  const platform = useSyncedLandingPlatform();
  const windowsSetup = locale === "de" && platform === "windows";
  const iosPreview = platform === "ios";
  const android = platform === "android";
  const androidScreenshots = android && !androidVideoReady;

  let source = locale === "de" ? "/demo-de.mp4" : "/demo-en.mp4";
  let poster = `/landing/demo-poster-${locale === "de" ? "de" : "en"}.jpg`;
  let titleKey = "howItWorks.title";
  let captionKey = "howItWorks.caption";
  if (windowsSetup) {
    source = "/windows-first-setup-de.mp4";
    poster = "/windows-first-setup-de.webp";
    titleKey = "howItWorks.windows.title";
    captionKey = "howItWorks.windows.caption";
  }
  if (iosPreview) {
    source =
      locale === "de" ? "/ios-app-preview-de.mp4" : "/ios-app-preview-en.mp4";
    poster = screenshotPath(locale, "/screenshots/ios/01-recording.webp");
    titleKey = "howItWorks.ios.title";
    captionKey = "howItWorks.ios.caption";
  }
  if (android) {
    source =
      locale === "de" ? "/android-overview-de.mp4" : "/android-overview-en.mp4";
    poster = screenshotPath(locale, "/screenshots/android/01-record.webp");
    titleKey = "howItWorks.android.title";
    captionKey = "howItWorks.android.caption";
  }

  return (
    <section
      ref={revealRoot}
      data-testid="how-it-works"
      className="site-section site-section--tight-top"
    >
      <div className="site-wrap">
        <SectionHead
          label={t(
            locale,
            androidScreenshots
              ? "howItWorks.android.screenshotsLabel"
              : "howItWorks.label",
          )}
          title={t(locale, titleKey)}
          seed={17}
        />

        {androidScreenshots ? (
          <figure
            className="site-video landing-phones reveal-scale-hidden"
            data-testid="android-preview"
          >
            <div className="landing-phones__shots">
              {androidPreviewScreenshots.map((path, index) => (
                <Screenshot
                  key={path}
                  src={screenshotPath(locale, path)}
                  alt={t(
                    locale,
                    `howItWorks.android.screenshot${index + 1}Alt`,
                  )}
                  className="landing-phones__shot"
                  loading="lazy"
                  sizes="(max-width: 639px) 45vw, 280px"
                />
              ))}
            </div>
            <figcaption>{t(locale, captionKey)}</figcaption>
          </figure>
        ) : (
          <figure
            className={`site-video reveal-scale-hidden ${iosPreview || android ? "site-video--phone" : ""}`}
          >
            <video
              key={source}
              playsInline
              controls
              preload="metadata"
              poster={poster}
              data-testid="how-it-works-video"
            >
              <source src={source} type="video/mp4" />
              {windowsSetup && (
                <track
                  kind="captions"
                  src="/windows-first-setup-de.vtt"
                  srcLang="de"
                  label="Deutsch"
                  default
                />
              )}
              {t(locale, "howItWorks.videoFallback")}
            </video>
            <figcaption>{t(locale, captionKey)}</figcaption>
          </figure>
        )}

        {iosPreview && (
          <div className="landing-watch" data-testid="ios-watch-preview">
            <div className="landing-watch__text">
              <h3 className="site-subtitle">
                {t(locale, "howItWorks.ios.watch.title")}
              </h3>
              <p>{t(locale, "howItWorks.ios.watch.caption")}</p>
            </div>
            <div className="landing-watch__shots">
              {watchScreenshots.map((filename, index) => (
                <Screenshot
                  key={filename}
                  src={screenshotPath(
                    locale,
                    `/screenshots/ios/watch/${filename}`,
                  )}
                  alt={t(
                    locale,
                    `howItWorks.ios.watch.screenshot${index + 1}Alt`,
                  )}
                  className="landing-watch__shot"
                  loading="lazy"
                  sizes="(max-width: 640px) 45vw, 200px"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

import { Screenshot } from "@/components/ui/screenshot";
import { screenshotPath, t, type Locale } from "@/i18n/index";
import { useSyncedLandingPlatform } from "@/hooks/use-landing-platform";

const watchScreenshots = [
  "01-ready.webp",
  "02-recording.webp",
  "03-recent.webp",
] as const;

export function HowItWorks({ locale = "en" }: { locale?: Locale }) {
  const platform = useSyncedLandingPlatform();
  const showWindowsSetup = locale === "de" && platform === "windows";
  const showIosPreview = platform === "ios";
  let videoSrc = locale === "de" ? "/demo-de.mp4" : "/demo-en.mp4";
  let posterSrc = "/og-image.png";
  let titleKey = "howItWorks.title";
  let captionKey = "howItWorks.caption";

  if (showWindowsSetup) {
    videoSrc = "/windows-first-setup-de.mp4";
    posterSrc = "/windows-first-setup-de.webp";
    titleKey = "howItWorks.windows.title";
    captionKey = "howItWorks.windows.caption";
  }

  if (showIosPreview) {
    videoSrc =
      locale === "de" ? "/ios-app-preview-de.mp4" : "/ios-app-preview-en.mp4";
    posterSrc = screenshotPath(locale, "/screenshots/ios/01-recording.webp");
    titleKey = "howItWorks.ios.title";
    captionKey = "howItWorks.ios.caption";
  }

  return (
    <section
      className={`bg-secondary ${showIosPreview ? "py-16 sm:py-20" : "py-12 sm:py-16"}`}
      data-testid="how-it-works"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t(locale, titleKey)}
        </h2>

        <div className="mt-12 reveal-scale-hidden">
          <div
            className={`overflow-hidden rounded-2xl border border-border bg-card shadow-2xl ${showIosPreview ? "mx-auto max-w-64 sm:max-w-72" : ""}`}
          >
            <video
              key={videoSrc}
              className="w-full"
              playsInline
              controls
              preload="metadata"
              poster={posterSrc}
              data-testid="how-it-works-video"
            >
              <source src={videoSrc} type="video/mp4" />
              {showWindowsSetup && (
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
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t(locale, captionKey)}
          </p>
        </div>

        {showIosPreview && (
          <div
            className="mt-16 border-t border-border pt-12"
            data-testid="ios-watch-preview"
          >
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {t(locale, "howItWorks.ios.watch.title")}
              </h3>
              <p className="mt-3 text-muted-foreground">
                {t(locale, "howItWorks.ios.watch.caption")}
              </p>
            </div>

            <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:mx-auto sm:max-w-3xl sm:justify-center sm:overflow-visible sm:px-0">
              {watchScreenshots.map((filename, index) => (
                <div
                  key={filename}
                  className="w-[13rem] flex-none snap-center overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-xl shadow-black/10 sm:w-56"
                >
                  <Screenshot
                    src={screenshotPath(
                      locale,
                      `/screenshots/ios/watch/${filename}`,
                    )}
                    alt={t(
                      locale,
                      `howItWorks.ios.watch.screenshot${index + 1}Alt`,
                    )}
                    className="w-full rounded-xl"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

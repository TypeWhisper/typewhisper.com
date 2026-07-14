import { t, type Locale } from "@/i18n/index";
import { useSyncedLandingPlatform } from "@/hooks/use-landing-platform";

export function HowItWorks({ locale = "en" }: { locale?: Locale }) {
  const platform = useSyncedLandingPlatform();
  const showWindowsSetup = locale === "de" && platform === "windows";
  const videoSrc = showWindowsSetup
    ? "/windows-first-setup-de.mp4"
    : locale === "de"
      ? "/demo-de.mp4"
      : "/demo-en.mp4";
  const posterSrc = showWindowsSetup
    ? "/windows-first-setup-de.webp"
    : "/og-image.png";
  const titleKey = showWindowsSetup
    ? "howItWorks.windows.title"
    : "howItWorks.title";
  const captionKey = showWindowsSetup
    ? "howItWorks.windows.caption"
    : "howItWorks.caption";

  return (
    <section
      className="bg-secondary py-20 sm:py-28"
      data-testid="how-it-works"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t(locale, titleKey)}
        </h2>

        <div className="mt-12 reveal-scale-hidden">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
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
      </div>
    </section>
  );
}

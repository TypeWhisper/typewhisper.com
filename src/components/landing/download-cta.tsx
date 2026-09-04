import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPlatformDownloadTarget } from "@/lib/platform-download";
import { useSyncedLandingPlatform } from "@/hooks/use-landing-platform";
import { t, localePath, type Locale } from "@/i18n/index";

export function DownloadCTA({ locale = "en" }: { locale?: Locale }) {
  const platform = useSyncedLandingPlatform();
  const download = getPlatformDownloadTarget(platform, locale, "landing");

  return (
    <section className="bg-secondary py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="reveal-fade-hidden text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
            {t(locale, "downloadCta.title")}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {t(locale, "downloadCta.subtitle")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {download.available ? (
              <Button size="pill" asChild>
                <a
                  href={download.href}
                  target={download.opensNewTab ? "_blank" : undefined}
                  rel={download.opensNewTab ? "noopener noreferrer" : undefined}
                  data-testid="landing-footer-download"
                  data-download-social-trigger
                  data-download-platform={download.platform}
                  data-download-target={download.target}
                  data-download-version={download.version}
                  data-tracking-placement="landing"
                >
                  {download.label}
                </a>
              </Button>
            ) : (
              <Button
                size="pill"
                disabled
                data-testid="landing-footer-download"
              >
                {download.label}
              </Button>
            )}
            <Button variant="link-arrow" asChild>
              <a
                href={localePath(locale, "/release-status")}
                className="inline-flex items-center gap-1 text-primary"
              >
                {t(locale, "downloadCta.releaseStatus")}
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            {t(locale, "downloadCta.licenseNote.before")}{" "}
            <a
              href={localePath(locale, "/pricing")}
              className="text-primary underline-offset-4 hover:underline"
            >
              {t(locale, "downloadCta.licenseNote.link")}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

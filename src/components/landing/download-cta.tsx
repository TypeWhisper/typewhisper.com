import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPlatformDownloadTarget } from "@/lib/platform-download";
import { usePlatform } from "@/hooks/use-platform";
import { t, localePath, type Locale } from "@/i18n/index";

export function DownloadCTA({ locale = "en" }: { locale?: Locale }) {
  const platform = usePlatform();
  const download = getPlatformDownloadTarget(platform, locale, "landing");

  return (
    <section className="bg-secondary py-32 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="reveal-fade-hidden text-5xl font-bold tracking-tighter text-foreground lg:text-6xl">
            {t(locale, "downloadCta.title")}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {t(locale, "downloadCta.subtitle")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
            <Button variant="link-arrow" asChild>
              <a href={localePath(locale, "/release-status")} className="inline-flex items-center gap-1 text-primary">
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

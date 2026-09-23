import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { type ReactElement, type SVGProps } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Waveform } from "@/components/ui/waveform";
import {
  IOSLogo,
  MacOSLogo,
  WindowsLogo,
} from "@/components/ui/platform-logos";
import { getPlatformDownloadTarget } from "@/lib/platform-download";
import { platformVersions } from "@/lib/platform-versions";
import {
  useSyncedLandingPlatform,
  type LandingPlatform,
} from "@/hooks/use-landing-platform";
import { cn } from "@/lib/utils";
import { t, localePath, type Locale } from "@/i18n/index";

const editions: {
  platform: LandingPlatform;
  Logo: (props: SVGProps<SVGSVGElement>) => ReactElement;
}[] = [
  { platform: "mac", Logo: MacOSLogo },
  { platform: "windows", Logo: WindowsLogo },
  { platform: "ios", Logo: IOSLogo },
];

export function DownloadCTA({ locale = "en" }: { locale?: Locale }) {
  const revealRoot = useScrollReveal();
  const platform = useSyncedLandingPlatform();
  const download = getPlatformDownloadTarget(platform, locale, "landing");

  return (
    <section ref={revealRoot} className="bg-secondary py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Waveform
            bars={36}
            seed={9}
            animated
            className="mx-auto mb-8 h-10 max-w-[220px]"
          />
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
        </div>

        <div
          className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3"
          data-testid="landing-platform-grid"
        >
          {editions.map(({ platform: edition, Logo }) => {
            const target = getPlatformDownloadTarget(
              edition,
              locale,
              "landing",
            );
            if (!target.available) return null;
            return (
              <a
                key={edition}
                href={target.href}
                target={target.opensNewTab ? "_blank" : undefined}
                rel={target.opensNewTab ? "noopener noreferrer" : undefined}
                aria-label={target.label}
                data-download-social-trigger
                data-download-platform={target.platform}
                data-download-target={target.target}
                data-download-version={target.version}
                data-tracking-placement="landing-editions"
                className={cn(
                  "group flex min-w-0 items-center gap-4 rounded-2xl border bg-card p-4 text-left transition-colors hover:border-primary/40",
                  edition === platform ? "border-primary/50" : "border-border",
                )}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                  <Logo className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-card-foreground">
                    {t(locale, `hero.platformTabs.${edition}`)}{" "}
                    <span className="font-normal text-muted-foreground">
                      {platformVersions[edition]}
                    </span>
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {t(locale, `downloadCta.requirement.${edition}`)}
                  </span>
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          {t(locale, "downloadCta.licenseNote.before")}{" "}
          <a
            href={localePath(locale, "/pricing")}
            className="text-primary underline-offset-4 hover:underline"
          >
            {t(locale, "downloadCta.licenseNote.link")}
          </a>
        </p>
      </div>
    </section>
  );
}

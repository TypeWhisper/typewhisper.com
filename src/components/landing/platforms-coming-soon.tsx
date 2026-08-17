import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPlatformDownloadTarget } from "@/lib/platform-download";
import type { Platform } from "@/lib/platform-download";
import type { DownloadTarget } from "@/lib/attribution";
import { t, type Locale } from "@/i18n/index";

interface PlatformInfo {
  platform: Platform;
  name: string;
  description: string;
  status: string;
  statusClassName: string;
  downloadHref: string;
  downloadLabel: string;
  downloadTarget: DownloadTarget;
  downloadVersion?: string;
  downloadOpensNewTab: boolean;
}

function getPlatforms(locale: Locale): PlatformInfo[] {
  const macDownload = getPlatformDownloadTarget("mac", locale, "landing");
  const windowsDownload = getPlatformDownloadTarget("windows", locale, "landing");
  const iosDownload = getPlatformDownloadTarget("ios", locale, "landing");

  return [
    {
      platform: "mac",
      name: t(locale, "platforms.mac.name"),
      description: t(locale, "platforms.mac.description"),
      status: t(locale, "platforms.mac.status"),
      statusClassName: "bg-emerald-500/10 text-emerald-700",
      downloadHref: macDownload.href,
      downloadLabel: macDownload.label,
      downloadTarget: macDownload.target,
      downloadVersion: macDownload.version,
      downloadOpensNewTab: macDownload.opensNewTab,
    },
    {
      platform: "windows",
      name: t(locale, "platforms.win.name"),
      description: t(locale, "platforms.win.description"),
      status: t(locale, "platforms.win.status"),
      statusClassName: "bg-amber-500/10 text-amber-700",
      downloadHref: windowsDownload.href,
      downloadLabel: windowsDownload.label,
      downloadTarget: windowsDownload.target,
      downloadOpensNewTab: windowsDownload.opensNewTab,
    },
    {
      platform: "ios",
      name: t(locale, "platforms.ios.name"),
      description: t(locale, "platforms.ios.description"),
      status: t(locale, "platforms.ios.status"),
      statusClassName: "bg-rose-500/10 text-rose-700",
      downloadHref: iosDownload.href,
      downloadLabel: iosDownload.label,
      downloadTarget: iosDownload.target,
      downloadOpensNewTab: iosDownload.opensNewTab,
    },
  ];
}

export function AvailablePlatforms({ locale = "en" }: { locale?: Locale }) {
  const platforms = getPlatforms(locale);

  return (
    <section className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t(locale, "platforms.title")}
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground">
          {t(locale, "platforms.subtitle")}
        </p>

        <div
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
          data-testid="landing-platform-grid"
        >
          {platforms.map((p) => (
            <div
              key={p.name}
              className="reveal-hidden flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm"
            >
              <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${p.statusClassName}`}>
                {p.status}
              </span>
              <h3 className="mt-5 text-2xl font-bold text-card-foreground">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              <Button size="pill" className="mt-6" asChild>
                <a
                  href={p.downloadHref}
                  target={p.downloadOpensNewTab ? "_blank" : undefined}
                  rel={p.downloadOpensNewTab ? "noopener noreferrer" : undefined}
                  data-download-social-trigger
                  data-download-platform={p.platform}
                  data-download-target={p.downloadTarget}
                  data-download-version={p.downloadVersion}
                  data-tracking-placement="landing"
                >
                  {p.downloadLabel}
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

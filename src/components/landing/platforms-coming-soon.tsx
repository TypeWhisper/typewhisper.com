import { ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Screenshot } from "@/components/ui/screenshot";
import {
  IOSLogo,
  MacOSLogo,
  WindowsLogo,
} from "@/components/ui/platform-logos";
import {
  getPlatformDownloadTarget,
  type Platform,
  type PlatformDownloadTarget,
} from "@/lib/platform-download";
import { localePath, screenshotPath, t, type Locale } from "@/i18n/index";

interface PlatformInfo {
  platform: Platform;
  name: string;
  description: string;
  status: string;
  statusClassName: string;
  download: PlatformDownloadTarget;
  docsPath: string;
  screenshot: string;
  screenshotAlt: string;
  highlights: string[];
  Logo: typeof MacOSLogo;
}

function getPlatforms(locale: Locale): PlatformInfo[] {
  return [
    {
      platform: "mac",
      name: t(locale, "platforms.mac.name"),
      description: t(locale, "platforms.mac.description"),
      status: t(locale, "platforms.mac.status"),
      statusClassName:
        "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      download: getPlatformDownloadTarget("mac", locale, "landing"),
      docsPath: "/docs/mac",
      screenshot: screenshotPath(locale, "/screenshots/mac/workflows.webp"),
      screenshotAlt: t(locale, "platforms.mac.screenshotAlt"),
      highlights: [1, 2, 3].map((index) =>
        t(locale, `platforms.mac.highlight${index}`),
      ),
      Logo: MacOSLogo,
    },
    {
      platform: "windows",
      name: t(locale, "platforms.win.name"),
      description: t(locale, "platforms.win.description"),
      status: t(locale, "platforms.win.status"),
      statusClassName:
        "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      download: getPlatformDownloadTarget("windows", locale, "landing"),
      docsPath: "/docs/windows",
      screenshot: screenshotPath(locale, "/screenshots/windows/workflows.webp"),
      screenshotAlt: t(locale, "platforms.win.screenshotAlt"),
      highlights: [1, 2, 3].map((index) =>
        t(locale, `platforms.win.highlight${index}`),
      ),
      Logo: WindowsLogo,
    },
    {
      platform: "ios",
      name: t(locale, "platforms.ios.name"),
      description: t(locale, "platforms.ios.description"),
      status: t(locale, "platforms.ios.status"),
      statusClassName:
        "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      download: getPlatformDownloadTarget("ios", locale, "landing"),
      docsPath: "/docs/ios",
      screenshot: screenshotPath(locale, "/screenshots/ios/04-history.webp"),
      screenshotAlt: t(locale, "platforms.ios.screenshotAlt"),
      highlights: [1, 2, 3].map((index) =>
        t(locale, `platforms.ios.highlight${index}`),
      ),
      Logo: IOSLogo,
    },
  ];
}

export function AvailablePlatforms({ locale = "en" }: { locale?: Locale }) {
  const platforms = getPlatforms(locale);

  return (
    <section className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            {t(locale, "platforms.eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t(locale, "platforms.title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t(locale, "platforms.subtitle")}
          </p>
        </div>

        <div
          className="mt-12 border-y border-border"
          data-testid="landing-platform-grid"
        >
          {platforms.map((item, index) => {
            const Logo = item.Logo;
            const isIos = item.platform === "ios";

            return (
              <article
                key={item.platform}
                className="grid min-w-0 gap-8 border-b border-border py-10 last:border-b-0 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14"
              >
                <div
                  className={index % 2 === 1 ? "min-w-0 lg:order-2" : "min-w-0"}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-card">
                      <Logo className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {item.name}
                    </h3>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${item.statusClassName}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-foreground/90">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span
                          className="mt-2 block h-px w-5 shrink-0 bg-primary"
                          aria-hidden="true"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 min-w-0 flex flex-wrap items-center gap-4">
                    {item.download.available ? (
                      <Button
                        size="pill"
                        className="max-w-full whitespace-normal h-auto min-h-12 text-center"
                        asChild
                      >
                        <a
                          href={item.download.href}
                          target={
                            item.download.opensNewTab ? "_blank" : undefined
                          }
                          rel={
                            item.download.opensNewTab
                              ? "noopener noreferrer"
                              : undefined
                          }
                          data-download-social-trigger
                          data-download-platform={item.platform}
                          data-download-target={item.download.target}
                          data-download-version={item.download.version}
                          data-tracking-placement="landing"
                        >
                          {item.download.label}
                          <ArrowUpRight className="size-4" />
                        </a>
                      </Button>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground">
                        <Clock3 className="size-4" />
                        {item.download.label}
                      </span>
                    )}
                    <a
                      href={localePath(locale, item.docsPath)}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                    >
                      {t(
                        locale,
                        isIos ? "platforms.ios.docs" : "platforms.docs",
                      )}
                      <ArrowRight className="size-4" />
                    </a>
                  </div>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div
                    className={`overflow-hidden border border-border bg-card shadow-2xl shadow-black/10 ${
                      isIos
                        ? "mx-auto max-w-[15rem] rounded-[2rem] p-1.5 sm:max-w-[17rem]"
                        : "rounded-2xl"
                    }`}
                  >
                    <Screenshot
                      src={item.screenshot}
                      alt={item.screenshotAlt}
                      className={
                        isIos
                          ? "w-full rounded-[1.6rem]"
                          : "aspect-[31/20] w-full object-cover object-top"
                      }
                      loading="lazy"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

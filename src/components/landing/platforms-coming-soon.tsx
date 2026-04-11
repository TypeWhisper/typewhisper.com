import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { iosTestFlightUrl, macReleaseUrl, windowsReleaseUrl } from "@/lib/platform-download";
import { t, type Locale } from "@/i18n/index";

interface PlatformInfo {
  name: string;
  description: string;
  status: string;
  statusClassName: string;
  downloadHref: string;
  downloadLabel: string;
}

function getPlatforms(locale: Locale): PlatformInfo[] {
  return [
    {
      name: t(locale, "platforms.mac.name"),
      description: t(locale, "platforms.mac.description"),
      status: t(locale, "platforms.mac.status"),
      statusClassName: "bg-emerald-500/10 text-emerald-700",
      downloadHref: macReleaseUrl,
      downloadLabel: t(locale, "platforms.mac.download"),
    },
    {
      name: t(locale, "platforms.win.name"),
      description: t(locale, "platforms.win.description"),
      status: t(locale, "platforms.win.status"),
      statusClassName: "bg-amber-500/10 text-amber-700",
      downloadHref: windowsReleaseUrl,
      downloadLabel: t(locale, "platforms.win.download"),
    },
    {
      name: t(locale, "platforms.ios.name"),
      description: t(locale, "platforms.ios.description"),
      status: t(locale, "platforms.ios.status"),
      statusClassName: "bg-rose-500/10 text-rose-700",
      downloadHref: iosTestFlightUrl,
      downloadLabel: t(locale, "platforms.ios.download"),
    },
  ];
}

export function AvailablePlatforms({ locale = "en" }: { locale?: Locale }) {
  const platforms = getPlatforms(locale);

  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t(locale, "platforms.title")}
        </h2>
        <p className="mt-4 text-center text-lg text-muted-foreground">
          {t(locale, "platforms.subtitle")}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
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
                  target="_blank"
                  rel="noopener noreferrer"
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

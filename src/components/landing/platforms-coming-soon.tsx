import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { iosTestFlightUrl, macReleaseUrl, windowsReleaseUrl } from "@/lib/platform-download";

interface PlatformInfo {
  name: string;
  description: string;
  status: string;
  statusClassName: string;
  downloadHref: string;
  downloadLabel: string;
}

const platforms: PlatformInfo[] = [
  {
    name: "macOS",
    description: "Stable 1.0 release for daily use on your Mac.",
    status: "1.0 Stable",
    statusClassName: "bg-emerald-500/10 text-emerald-700",
    downloadHref: macReleaseUrl,
    downloadLabel: "Download for macOS",
  },
  {
    name: "Windows",
    description: "Public beta for Windows 10 and 11. Expect ongoing polish and rapid iteration.",
    status: "Beta",
    statusClassName: "bg-amber-500/10 text-amber-700",
    downloadHref: windowsReleaseUrl,
    downloadLabel: "Download Windows Beta",
  },
  {
    name: "iOS",
    description: "Early alpha preview via TestFlight for iPhone and iPad.",
    status: "Alpha",
    statusClassName: "bg-rose-500/10 text-rose-700",
    downloadHref: iosTestFlightUrl,
    downloadLabel: "Join iOS Alpha",
  },
];

export function AvailablePlatforms() {
  return (
    <section className="section-light py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight text-[#1d1d1f] sm:text-4xl">
          Available now, with clear release stages.
        </h2>
        <p className="mt-4 text-center text-lg text-[#6e6e73]">
          macOS is the supported 1.0 path. Windows and iOS remain preview releases.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="reveal-hidden flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm"
            >
              <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${p.statusClassName}`}>
                {p.status}
              </span>
              <h3 className="mt-5 text-2xl font-bold text-[#1d1d1f]">{p.name}</h3>
              <p className="mt-2 text-sm text-[#6e6e73]">{p.description}</p>
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

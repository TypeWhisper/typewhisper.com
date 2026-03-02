import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { iosTestFlightUrl, macReleaseUrl, windowsReleaseUrl } from "@/lib/platform-download";

interface PlatformInfo {
  name: string;
  description: string;
  status: string;
  downloadHref: string;
  downloadLabel: string;
}

const platforms: PlatformInfo[] = [
  {
    name: "macOS",
    description: "Full-featured desktop app for Mac.",
    status: "Available Now",
    downloadHref: macReleaseUrl,
    downloadLabel: "Download for macOS",
  },
  {
    name: "Windows",
    description: "Native app for Windows 10 and 11.",
    status: "Available Now",
    downloadHref: windowsReleaseUrl,
    downloadLabel: "Download for Windows",
  },
  {
    name: "iOS",
    description: "iPhone and iPad via TestFlight.",
    status: "Beta",
    downloadHref: iosTestFlightUrl,
    downloadLabel: "Join TestFlight",
  },
];

export function AvailablePlatforms() {
  return (
    <section className="section-light py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="reveal-fade-hidden text-center text-3xl font-bold tracking-tight text-[#1d1d1f] sm:text-4xl">
          Available on every platform.
        </h2>
        <p className="mt-4 text-center text-lg text-[#6e6e73]">
          Same local privacy everywhere.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="reveal-hidden flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm"
            >
              <h3 className="text-2xl font-bold text-[#1d1d1f]">{p.name}</h3>
              <p className="mt-1 text-sm text-[#6e6e73]">
                {p.description}
                {" "}
                <span className="text-xs text-[#86868b]">{p.status}</span>
              </p>
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

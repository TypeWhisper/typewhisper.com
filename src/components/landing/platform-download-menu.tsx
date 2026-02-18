import { ChevronDown, Download, Monitor, Smartphone } from "lucide-react";
import { macReleaseUrl, windowsReleaseUrl, iosTestFlightUrl } from "@/lib/platform-download";

export function PlatformDownloadMenu({
  label = "Choose platform",
}: {
  label?: string;
}) {
  return (
    <details className="group relative w-full sm:w-auto">
      <summary className="flex h-12 w-full cursor-pointer list-none items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent sm:w-auto [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
      </summary>

      <div className="absolute left-0 top-[calc(100%+0.5rem)] z-20 w-full min-w-[260px] overflow-hidden rounded-xl border bg-popover p-2 text-left shadow-xl sm:w-[280px]">
        <a
          href={macReleaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-popover-foreground transition-colors hover:bg-accent"
        >
          <Download className="size-4" />
          Download for macOS
        </a>
        <a
          href={windowsReleaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-popover-foreground transition-colors hover:bg-accent"
        >
          <Monitor className="size-4" />
          Download for Windows
        </a>
        <a
          href={iosTestFlightUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-popover-foreground transition-colors hover:bg-accent"
        >
          <Smartphone className="size-4" />
          iOS Beta (TestFlight)
        </a>
      </div>
    </details>
  );
}

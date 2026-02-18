import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlatform } from "@/hooks/use-platform";
import {
  macReleaseUrl,
  windowsReleaseUrl,
  iosTestFlightUrl,
} from "@/lib/platform-download";
import { PlatformDownloadMenu } from "@/components/landing/platform-download-menu";

export function DownloadCTA() {
  const platform = usePlatform();

  const primaryDownloadUrl =
    platform === "ios"
      ? iosTestFlightUrl
      : platform === "windows"
        ? windowsReleaseUrl
        : macReleaseUrl;
  const primaryDownloadLabel =
    platform === "ios"
      ? "Get TypeWhisper for iOS"
      : platform === "windows"
        ? "Get TypeWhisper for Windows"
        : platform === "mac"
          ? "Get TypeWhisper for macOS"
          : "Get TypeWhisper Free";

  return (
    <section className="py-20 sm:py-28 bg-card/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to stop typing?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get TypeWhisper free for macOS, Windows, and iOS. Open source, no
            account required.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" asChild>
              <a
                href={primaryDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="size-5" />
                {primaryDownloadLabel}
              </a>
            </Button>
            <PlatformDownloadMenu label="All downloads" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6 text-center max-w-lg mx-auto sm:grid-cols-4">
            <div>
              <p className="text-sm font-semibold">Macs from 2020+</p>
              <p className="text-xs text-muted-foreground">Intel and Apple Silicon</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Windows 10/11</p>
              <p className="text-xs text-muted-foreground">Available now</p>
            </div>
            <div>
              <p className="text-sm font-semibold">iOS (Beta)</p>
              <p className="text-xs text-muted-foreground">Via TestFlight</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Free forever</p>
              <p className="text-xs text-muted-foreground">Open source GPLv3</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Download, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePlatform } from "@/hooks/use-platform";
import {
  macReleaseUrl,
  windowsReleaseUrl,
  iosTestFlightUrl,
} from "@/lib/platform-download";
import { PlatformDownloadMenu } from "@/components/landing/platform-download-menu";

export function Hero() {
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
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6">
            Open Source &middot; GPLv3
          </Badge>

          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Stop Typing.
            <br />
            <span className="text-primary">Start Speaking.</span>
            <br />
            100% Private.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Transcribe speech with on-device AI - no cloud, no API keys, no
            subscriptions. Your voice data never leaves your device.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

            <PlatformDownloadMenu />

            <Button variant="outline" size="xl" asChild>
              <a
                href="https://github.com/TypeWhisper"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-5" />
                View on GitHub
              </a>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            macOS, Windows, and iOS (Beta) available now &middot; Choose your
            platform above
          </p>
        </div>
      </div>
    </section>
  );
}

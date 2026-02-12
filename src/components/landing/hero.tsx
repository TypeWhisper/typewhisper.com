import { Download, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
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
            Local Speech-to-Text
            <br />
            <span className="text-primary">for macOS</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Transcribe audio using on-device AI models — no cloud, no API keys,
            no subscriptions. Your voice data never leaves your Mac.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="xl" asChild>
              <a
                href="https://github.com/TypeWhisper/typewhisper-mac/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="size-5" />
                Download for macOS
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a
                href="https://github.com/TypeWhisper/typewhisper-mac"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-5" />
                View on GitHub
              </a>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Requires macOS 15.0+ &middot; Apple Silicon recommended &middot;
            Free & open source
          </p>
        </div>
      </div>
    </section>
  );
}

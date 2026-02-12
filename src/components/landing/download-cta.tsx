import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DownloadCTA() {
  return (
    <section className="py-20 sm:py-28 bg-card/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to transcribe locally?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Download TypeWhisper for free. Open source, no account required.
          </p>

          <div className="mt-8">
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
          </div>

          <div className="mt-8 grid grid-cols-3 gap-6 text-center max-w-md mx-auto">
            <div>
              <p className="text-sm font-semibold">macOS 15.0+</p>
              <p className="text-xs text-muted-foreground">Sequoia or later</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Apple Silicon</p>
              <p className="text-xs text-muted-foreground">Recommended</p>
            </div>
            <div>
              <p className="text-sm font-semibold">8 GB+ RAM</p>
              <p className="text-xs text-muted-foreground">16 GB+ ideal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { macReleaseUrl } from "@/lib/platform-download";

export function DownloadCTA() {
  return (
    <section className="section-dark py-32 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="reveal-fade-hidden text-5xl font-bold tracking-tighter lg:text-6xl">
            Ready for TypeWhisper 1.0 on macOS?
          </h2>
          <p className="mt-6 text-lg text-[#86868b]">
            Download the stable macOS release. Windows Beta and iOS Alpha remain available for preview testing.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="pill" asChild>
              <a
                href={macReleaseUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download for macOS
              </a>
            </Button>
            <Button variant="link-arrow" asChild>
              <a href="/release-status" className="inline-flex items-center gap-1 text-[#2997ff]">
                View release status
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

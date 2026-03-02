import { Button } from "@/components/ui/button";
import { macReleaseUrl } from "@/lib/platform-download";

export function DownloadCTA() {
  return (
    <section className="section-dark py-32 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="reveal-fade-hidden text-5xl font-bold tracking-tighter lg:text-6xl">
            Ready to stop typing?
          </h2>
          <p className="mt-6 text-lg text-[#86868b]">
            Free and open source for macOS, Windows, and iOS.
          </p>
          <div className="mt-10">
            <Button size="pill" asChild>
              <a
                href={macReleaseUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download for free
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

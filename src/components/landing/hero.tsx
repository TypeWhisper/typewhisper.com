import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { macReleaseUrl } from "@/lib/platform-download";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40" style={{ background: "linear-gradient(180deg, #eef2ff 0%, #f5f0ff 30%, #fbfbfd 70%)" }}>
      {/* Soft colored orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-[#818cf8]/15 blur-[100px]" />
        <div className="absolute -right-32 top-24 h-[400px] w-[400px] rounded-full bg-[#0ea5e9]/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#c084fc]/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl lg:text-7xl text-[#1d1d1f]">
            Your voice,
            <br />
            your device.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-[#6e6e73]">
            On-device speech-to-text for macOS, Windows, and iOS.
            No cloud, no subscriptions, no data collection.
          </p>

          <div className="mt-8 flex items-center justify-center gap-5">
            <Button size="pill" asChild>
              <a
                href={macReleaseUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download for free
              </a>
            </Button>

            <Button variant="link-arrow" asChild>
              <Link to="/docs" className="inline-flex items-center gap-1 text-[#0071e3]">
                Learn more
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 reveal-scale-hidden">
          <img
            src="/screenshots/mac/home.png"
            alt="TypeWhisper for macOS"
            className="mx-auto max-w-3xl w-full"
          />
        </div>
      </div>
    </section>
  );
}

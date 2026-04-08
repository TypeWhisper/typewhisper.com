import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { macReleaseUrl } from "@/lib/platform-download";
import { t, localePath, screenshotPath, type Locale } from "@/i18n/index";

export function Hero({ locale = "en" }: { locale?: Locale }) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-32 lg:py-40" style={{ background: "linear-gradient(180deg, #eef2ff 0%, #f5f0ff 30%, #fbfbfd 70%)" }}>
      {/* Soft colored orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-[#818cf8]/15 blur-[100px]" />
        <div className="absolute -right-32 top-24 h-[400px] w-[400px] rounded-full bg-[#0ea5e9]/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#c084fc]/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl lg:text-7xl text-[#1d1d1f]">
            {t(locale, "hero.title.line1")}
            <br />
            {t(locale, "hero.title.line2")}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-[#6e6e73]">
            {t(locale, "hero.subtitle")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
            <Button size="pill" asChild>
              <a
                href={macReleaseUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(locale, "hero.download")}
              </a>
            </Button>

            <Button variant="link-arrow" asChild>
              <a href={localePath(locale, "/docs/mac")} className="inline-flex items-center gap-1 text-[#0071e3]">
                {t(locale, "hero.readDocs")}
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>

          <p className="mt-4 text-sm text-[#6e6e73]">
            {t(locale, "hero.platformNotice")}
          </p>
        </div>

        <div className="mt-10 sm:mt-16 reveal-scale-hidden">
          <img
            src={screenshotPath(locale, "/screenshots/mac/home.png")}
            alt={t(locale, "hero.imgAlt")}
            className="mx-auto max-w-3xl w-full max-h-[30vh] sm:max-h-none object-contain object-top"
          />
        </div>
      </div>
    </section>
  );
}

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { macReleaseUrl } from "@/lib/platform-download";
import { t, localePath, type Locale } from "@/i18n/index";

export function DownloadCTA({ locale = "en" }: { locale?: Locale }) {
  return (
    <section className="section-dark py-32 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="reveal-fade-hidden text-5xl font-bold tracking-tighter lg:text-6xl">
            {t(locale, "downloadCta.title")}
          </h2>
          <p className="mt-6 text-lg text-[#86868b]">
            {t(locale, "downloadCta.subtitle")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="pill" asChild>
              <a
                href={macReleaseUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(locale, "downloadCta.download")}
              </a>
            </Button>
            <Button variant="link-arrow" asChild>
              <a href={localePath(locale, "/release-status")} className="inline-flex items-center gap-1 text-[#2997ff]">
                {t(locale, "downloadCta.releaseStatus")}
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

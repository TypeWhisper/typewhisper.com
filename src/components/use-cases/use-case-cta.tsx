import { Button } from "@/components/ui/button";
import { macDmgUrl } from "@/lib/platform-download";
import { t, type Locale } from "@/i18n/index";

export function UseCaseCTA({ locale = "en" }: { locale?: Locale }) {
  return (
    <section className="section-dark py-32 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="reveal-fade-hidden text-5xl font-bold tracking-tighter lg:text-6xl">
            {t(locale, "useCases.cta.title")}
          </h2>
          <p className="mt-6 text-lg text-[#86868b]">
            {t(locale, "useCases.cta.subtitle")}
          </p>
          <div className="mt-10">
            <Button size="pill" asChild>
              <a
                href={macDmgUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(locale, "useCases.cta.download")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { macDmgUrl } from "@/lib/platform-download";
import { t, type Locale } from "@/i18n/index";

interface UseCaseCTAProps {
  locale?: Locale;
  /** Use-case brand color used for the background orb. */
  color?: string;
}

export function UseCaseCTA({ locale = "en", color }: UseCaseCTAProps) {
  return (
    <section className="section-dark relative overflow-hidden py-32 sm:py-40">
      {color && (
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
            style={{ backgroundColor: `${color}26` }}
          />
        </div>
      )}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
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
                data-download-social-trigger
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

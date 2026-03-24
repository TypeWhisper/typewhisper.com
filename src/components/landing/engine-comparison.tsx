import { EngineComparisonTable } from "@/components/landing/engine-comparison-table";
import { usePlatform } from "@/hooks/use-platform";
import { t, type Locale } from "@/i18n/index";

function getSubtitle(locale: Locale, platform: string): string {
  switch (platform) {
    case "mac":
    case "other":
      return t(locale, "engineComparison.subtitle.mac");
    default:
      return t(locale, "engineComparison.subtitle.other");
  }
}

export function EngineComparison({ locale = "en" }: { locale?: Locale }) {
  const platform = usePlatform();

  return (
    <section className="section-dark py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="reveal-fade-hidden text-3xl font-bold tracking-tight sm:text-4xl">
            {t(locale, "engineComparison.title")}
          </h2>
          <p className="mt-4 text-lg text-[#86868b]">
            {getSubtitle(locale, platform)}
          </p>
        </div>

        <div className="mt-12">
          <EngineComparisonTable platform={platform} locale={locale} />
        </div>
      </div>
    </section>
  );
}

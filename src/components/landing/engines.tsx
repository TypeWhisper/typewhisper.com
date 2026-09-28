import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { EngineComparisonTable } from "@/components/landing/engine-comparison-table";
import { useSyncedLandingPlatform } from "@/hooks/use-landing-platform";
import { t, type Locale } from "@/i18n/index";

const subtitleKey = {
  mac: "engineComparison.subtitle.mac",
  windows: "engineComparison.subtitle.other",
  ios: "engineComparison.subtitle.ios",
} as const;

/** Engine comparison for the selected platform, shown inside the disclosure. */
export function Engines({ locale = "en" }: { locale?: Locale }) {
  const revealRoot = useScrollReveal();
  const platform = useSyncedLandingPlatform();

  return (
    <section ref={revealRoot} className="landing-engines__body">
      <h2 className="site-subtitle">{t(locale, "engineComparison.title")}</h2>
      <p className="landing-engines__lede">
        {t(locale, subtitleKey[platform])}
      </p>
      <EngineComparisonTable platform={platform} locale={locale} />
    </section>
  );
}

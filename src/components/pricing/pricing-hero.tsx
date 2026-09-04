import { Button } from "@/components/ui/button";
import { useSyncedLandingPlatform } from "@/hooks/use-landing-platform";
import { getPlatformDownloadTarget } from "@/lib/platform-download";
import { Waveform } from "@/components/ui/waveform";
import { t, type Locale } from "@/i18n/index";

export function PricingHero({ locale }: { locale: Locale }) {
  const download = getPlatformDownloadTarget(
    useSyncedLandingPlatform(),
    locale,
    "landing",
  );
  return (
    <section className="hero-surface relative overflow-hidden py-10 sm:py-14">
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Waveform
          bars={40}
          className="mx-auto mb-8 h-5 max-w-[200px] opacity-60"
        />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
          {t(locale, "pricing.hero.title")}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          {t(locale, "pricing.hero.subtitle")}
        </p>
        {download.available && (
          <Button asChild className="mt-6" size="pill">
            <a
              href={download.href}
              target={download.opensNewTab ? "_blank" : undefined}
              rel="noopener noreferrer"
              data-download-social-trigger
              data-download-platform={download.platform}
              data-download-target={download.target}
              data-tracking-placement="pricing"
              data-testid="pricing-free-download"
            >
              {t(locale, "pricing.decision.action.personal")}
            </a>
          </Button>
        )}
      </div>
    </section>
  );
}

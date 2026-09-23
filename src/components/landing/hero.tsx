import { type ReactElement, type SVGProps } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MacOSLogo,
  WindowsLogo,
  IOSLogo,
} from "@/components/ui/platform-logos";
import { HeroDemo } from "@/components/landing/hero-demo";
import { Waveform } from "@/components/ui/waveform";
import { getPlatformDownloadTarget } from "@/lib/platform-download";
import {
  useLandingPlatformSelection,
  type LandingPlatform,
} from "@/hooks/use-landing-platform";
import { platformVersions } from "@/lib/platform-versions";
import { cn } from "@/lib/utils";
import { t, type Locale } from "@/i18n/index";

type HeroPlatform = LandingPlatform;

const heroPlatforms: HeroPlatform[] = ["mac", "windows", "ios"];

const logoByPlatform: Record<
  HeroPlatform,
  (props: SVGProps<SVGSVGElement>) => ReactElement
> = {
  mac: MacOSLogo,
  windows: WindowsLogo,
  ios: IOSLogo,
};

const heroPoints = ["free", "local", "account"] as const;

export function Hero({ locale = "en" }: { locale?: Locale }) {
  const { selectedPlatform, selectPlatform } = useLandingPlatformSelection();
  const download = getPlatformDownloadTarget(
    selectedPlatform,
    locale,
    "landing",
  );

  return (
    <section
      data-testid="landing-hero"
      className="hero-surface relative overflow-hidden pb-24 pt-12 sm:pb-28 sm:pt-16 lg:pt-20"
    >
      <Waveform
        bars={180}
        seed={3}
        motion="calm"
        className="pointer-events-none absolute inset-x-0 bottom-2 h-16 justify-between opacity-40 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="min-w-0 text-center lg:text-left">
          <HeroPlatformSwitcher
            locale={locale}
            selected={selectedPlatform}
            onSelect={selectPlatform}
          />

          <h1 className="mt-7 text-4xl font-bold tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">
            {t(locale, `hero.title.line1.${selectedPlatform}`)}
            <br />
            {t(locale, `hero.title.line2.${selectedPlatform}`)}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:mx-0">
            {t(locale, `hero.subtitle.${selectedPlatform}`)}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-5 lg:justify-start">
            {download.available ? (
              <Button size="pill" asChild>
                <a
                  href={download.href}
                  target={download.opensNewTab ? "_blank" : undefined}
                  rel={download.opensNewTab ? "noopener noreferrer" : undefined}
                  data-testid="landing-hero-download"
                  data-download-social-trigger
                  data-download-platform={download.platform}
                  data-download-target={download.target}
                  data-download-version={download.version}
                  data-tracking-placement="hero"
                >
                  {download.label}
                </a>
              </Button>
            ) : (
              <Button size="pill" disabled data-testid="landing-hero-download">
                {download.label}
              </Button>
            )}

            <Button variant="link-arrow" asChild>
              <a
                href={`/${locale}/setup/?platform=${selectedPlatform}`}
                className="inline-flex items-center gap-1 text-primary"
              >
                {t(locale, "hero.setup")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            {t(locale, `hero.platformNotice.${selectedPlatform}`).replace(
              "{version}",
              platformVersions[selectedPlatform] ?? "",
            )}
          </p>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground lg:justify-start">
            {heroPoints.map((point) => (
              <li key={point} className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-primary" aria-hidden="true" />
                {t(locale, `hero.point.${point}`)}
              </li>
            ))}
            <li
              className="inline-flex items-center gap-1.5"
              title={t(locale, "madeInGermany.craft")}
            >
              <img
                src="/flags/de.svg"
                alt=""
                aria-hidden="true"
                className="h-3 w-auto rounded-[2px]"
              />
              {t(locale, "madeInGermany.label")}
            </li>
          </ul>
        </div>

        <HeroDemo locale={locale} />
      </div>
    </section>
  );
}

interface HeroPlatformSwitcherProps {
  locale: Locale;
  selected: HeroPlatform;
  onSelect: (platform: HeroPlatform) => void;
}

function HeroPlatformSwitcher({
  locale,
  selected,
  onSelect,
}: HeroPlatformSwitcherProps) {
  return (
    <div
      role="group"
      aria-label={t(locale, "hero.platformTabs.label")}
      className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-border/70 bg-background/70 p-1 shadow-sm backdrop-blur"
    >
      {heroPlatforms.map((platform) => {
        const Logo = logoByPlatform[platform];
        const isSelected = selected === platform;
        return (
          <button
            key={platform}
            type="button"
            aria-pressed={isSelected}
            data-testid={`landing-hero-tab-${platform}`}
            onClick={() => onSelect(platform)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-4",
              isSelected
                ? "bg-foreground text-background shadow"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Logo className="size-4" aria-hidden="true" />
            <span>{t(locale, `hero.platformTabs.${platform}`)}</span>
          </button>
        );
      })}
    </div>
  );
}

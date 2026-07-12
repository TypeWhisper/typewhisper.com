import { type ReactElement, type SVGProps } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Screenshot } from "@/components/ui/screenshot";
import { Badge } from "@/components/ui/badge";
import {
  MacOSLogo,
  WindowsLogo,
  IOSLogo,
} from "@/components/ui/platform-logos";
import { HeroDemo } from "@/components/landing/hero-demo";
import { getPlatformDownloadTarget } from "@/lib/platform-download";
import {
  useLandingPlatformSelection,
  type LandingPlatform,
} from "@/hooks/use-landing-platform";
import { heroScreenshotByPlatform } from "@/lib/landing-screenshots";
import { cn } from "@/lib/utils";
import { t, screenshotPath, localePath, type Locale } from "@/i18n/index";
import downloads from "@/data/downloads.json";

type HeroPlatform = LandingPlatform;

const heroPlatforms: HeroPlatform[] = ["mac", "windows", "ios"];

const docsPathByPlatform: Record<HeroPlatform, string> = {
  mac: "/docs/mac",
  windows: "/docs/windows",
  ios: "/docs/ios",
};

// Reduce a release version like "v1.4.0" or "1.4" to a "Major.Minor" label
// for the hero headline. Returns null when the input cannot be parsed.
function shortVersion(version: string | undefined): string | null {
  if (!version) return null;
  const match = version.replace(/^v/i, "").match(/^(\d+)\.(\d+)/);
  return match ? `${match[1]}.${match[2]}` : null;
}

// iOS has no concrete versioned download (TestFlight only), so we omit the
// version suffix in the hero headline for it.
const versionByPlatform: Record<HeroPlatform, string | null> = {
  mac: shortVersion(downloads.mac.version),
  windows: shortVersion(downloads.windows.version),
  ios: null,
};

const logoByPlatform: Record<
  HeroPlatform,
  (props: SVGProps<SVGSVGElement>) => ReactElement
> = {
  mac: MacOSLogo,
  windows: WindowsLogo,
  ios: IOSLogo,
};

export function Hero({ locale = "en" }: { locale?: Locale }) {
  const { detectedHintPlatform, selectedPlatform, selectPlatform } =
    useLandingPlatformSelection();

  function handleSelectPlatform(platform: HeroPlatform) {
    selectPlatform(platform);
  }

  const download = getPlatformDownloadTarget(
    selectedPlatform,
    locale,
    "landing",
  );

  const heroScreenshot = screenshotPath(
    locale,
    heroScreenshotByPlatform[selectedPlatform],
  );

  return (
    <section
      data-testid="landing-hero"
      className="hero-surface relative overflow-hidden py-16 sm:py-32 lg:py-40"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <HeroPlatformSwitcher
            locale={locale}
            selected={selectedPlatform}
            onSelect={handleSelectPlatform}
            detectedHint={detectedHintPlatform}
          />

          <h1 className="mt-6 text-5xl font-bold tracking-tighter text-foreground sm:text-6xl lg:text-7xl">
            {versionByPlatform[selectedPlatform]
              ? `${t(locale, "hero.title.brand")} ${versionByPlatform[selectedPlatform]},`
              : t(locale, "hero.title.brand")}
            <br />
            {t(locale, `hero.title.line2.${selectedPlatform}`)}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            {t(locale, `hero.subtitle.${selectedPlatform}`)}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
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

            <Button variant="link-arrow" asChild>
              <a
                href={localePath(locale, docsPathByPlatform[selectedPlatform])}
                className="inline-flex items-center gap-1 text-primary"
              >
                {t(locale, `hero.readDocs.${selectedPlatform}`)}
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            {t(locale, `hero.platformNotice.${selectedPlatform}`)}
          </p>

          <div className="mt-5 flex justify-center">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
              title={t(locale, "madeInGermany.craft")}
            >
              <img
                src="/flags/de.svg"
                alt=""
                aria-hidden="true"
                className="h-3 w-auto rounded-[2px]"
              />
              {t(locale, "madeInGermany.label")}
            </span>
          </div>
        </div>

        <div className="mt-10 sm:mt-14">
          <HeroDemo locale={locale} />
        </div>

        <div className="mt-10 sm:mt-14 reveal-scale-hidden">
          <Screenshot
            src={heroScreenshot}
            alt={t(locale, "hero.imgAlt")}
            className="mx-auto max-w-3xl w-full max-h-[30vh] sm:max-h-none object-contain object-top"
          />
          {selectedPlatform === "ios" && (
            <p className="mx-auto mt-3 max-w-xl text-center text-xs text-muted-foreground">
              {t(locale, "hero.shotNotice.nonMac")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

interface HeroPlatformSwitcherProps {
  locale: Locale;
  selected: HeroPlatform;
  onSelect: (platform: HeroPlatform) => void;
  detectedHint: HeroPlatform | null;
}

function HeroPlatformSwitcher({
  locale,
  selected,
  onSelect,
  detectedHint,
}: HeroPlatformSwitcherProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="tablist"
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
              role="tab"
              aria-selected={isSelected}
              data-testid={`landing-hero-tab-${platform}`}
              onClick={() => onSelect(platform)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-4 sm:py-2",
                isSelected
                  ? "bg-foreground text-background shadow"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Logo className="size-4" aria-hidden="true" />
              <span>{t(locale, `hero.platformTabs.${platform}`)}</span>
              <Badge
                variant={isSelected ? "secondary" : "outline"}
                className={cn(
                  "hidden text-[10px] uppercase tracking-wider sm:inline-flex",
                  isSelected ? "" : "border-border/70",
                )}
              >
                {t(locale, `hero.platformTabs.stage.${platform}`)}
              </Badge>
            </button>
          );
        })}
      </div>

      {detectedHint && (
        <button
          type="button"
          onClick={() => onSelect(detectedHint)}
          data-testid="landing-hero-detected-hint"
          className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {t(locale, `hero.detectedHint.${detectedHint}`)}
          <ArrowRight className="size-3" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

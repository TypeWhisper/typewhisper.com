import { useEffect, useState, type ReactElement, type SVGProps } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Screenshot } from "@/components/ui/screenshot";
import { Badge } from "@/components/ui/badge";
import {
  MacOSLogo,
  WindowsLogo,
  IOSLogo,
} from "@/components/ui/platform-logos";
import { getPlatformDownloadTarget } from "@/lib/platform-download";
import { usePlatform } from "@/hooks/use-platform";
import { cn } from "@/lib/utils";
import { t, screenshotPath, localePath, type Locale } from "@/i18n/index";
import downloads from "@/data/downloads.json";

type HeroPlatform = "mac" | "windows" | "ios";

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
  const detectedPlatform = usePlatform();
  const [selectedPlatform, setSelectedPlatform] = useState<HeroPlatform>("mac");
  const [hasUserSelectedPlatform, setHasUserSelectedPlatform] = useState(false);

  useEffect(() => {
    if (
      !hasUserSelectedPlatform &&
      (detectedPlatform === "mac" ||
        detectedPlatform === "windows" ||
        detectedPlatform === "ios")
    ) {
      setSelectedPlatform(detectedPlatform);
    }
  }, [detectedPlatform, hasUserSelectedPlatform]);

  function handleSelectPlatform(platform: HeroPlatform) {
    setHasUserSelectedPlatform(true);
    setSelectedPlatform(platform);
  }

  const download = getPlatformDownloadTarget(
    selectedPlatform,
    locale,
    "landing",
  );

  // If the visitor is actually on Windows or iOS but the active tab is still
  // the mac default, surface a small switch hint so they can flip in one click.
  const detectedHintPlatform: HeroPlatform | null =
    selectedPlatform === "mac" &&
    (detectedPlatform === "windows" || detectedPlatform === "ios")
      ? detectedPlatform
      : null;

  return (
    <section
      data-testid="landing-hero"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#eef2ff_0%,#f5f0ff_30%,#fbfbfd_70%)] py-16 dark:bg-[linear-gradient(180deg,#0b1220_0%,#111827_35%,#000000_75%)] sm:py-32 lg:py-40"
    >
      {/* Soft colored orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-[#818cf8]/15 blur-[100px] dark:bg-[#2563eb]/20" />
        <div className="absolute -right-32 top-24 h-[400px] w-[400px] rounded-full bg-[#0ea5e9]/10 blur-[100px] dark:bg-[#06b6d4]/15" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#c084fc]/10 blur-[100px] dark:bg-[#7c3aed]/15" />
      </div>

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
                target="_blank"
                rel="noopener noreferrer"
                data-testid="landing-hero-download"
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
        </div>

        <div className="mt-10 sm:mt-16 reveal-scale-hidden">
          <Screenshot
            src={screenshotPath(locale, "/screenshots/mac/home.png")}
            alt={t(locale, "hero.imgAlt")}
            className="mx-auto max-w-3xl w-full max-h-[30vh] sm:max-h-none object-contain object-top"
          />
          {selectedPlatform !== "mac" && (
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

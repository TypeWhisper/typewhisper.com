import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type SVGProps,
} from "react";
import { ArrowRight } from "lucide-react";
import {
  IOSLogo,
  MacOSLogo,
  WindowsLogo,
} from "@/components/ui/platform-logos";
import { getPlatformDownloadTarget } from "@/lib/platform-download";
import {
  useLandingPlatformSelection,
  type LandingPlatform,
} from "@/hooks/use-landing-platform";
import { platformVersions } from "@/lib/platform-versions";
import { t, type Locale } from "@/i18n/index";
import { HeroWave, type HeroWavePhase } from "./hero-wave";
import { BarMark } from "@/components/site/bar-mark";

const platforms: {
  id: LandingPlatform;
  Logo: (props: SVGProps<SVGSVGElement>) => ReactElement;
}[] = [
  { id: "mac", Logo: MacOSLogo },
  { id: "windows", Logo: WindowsLogo },
  { id: "ios", Logo: IOSLogo },
];

const points = ["free", "local", "account"] as const;

// Layout effects only exist in the browser; the server render skips them.
const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Landing hero. The headline is real markup; the canvas behind it plays the
 * waveform that assembles the headline and then hands over to the text.
 */
export function Hero({ locale = "en" }: { locale?: Locale }) {
  const { selectedPlatform, selectPlatform } = useLandingPlatformSelection();
  const download = getPlatformDownloadTarget(
    selectedPlatform,
    locale,
    "landing",
  );
  const line1 = t(locale, `hero.title.line1.${selectedPlatform}`);
  const line2 = t(locale, `hero.title.line2.${selectedPlatform}`);
  const version = platformVersions[selectedPlatform];

  const host = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const baseline = useRef<HTMLSpanElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const wave = useRef<HeroWave | null>(null);
  const [phase, setPhase] = useState<HeroWavePhase | null>(null);

  useEffect(() => {
    if (
      !host.current ||
      !canvas.current ||
      !title.current ||
      !baseline.current ||
      !line.current
    ) {
      return;
    }
    const engine = new HeroWave(
      {
        host: host.current,
        canvas: canvas.current,
        title: title.current,
        baseline: baseline.current,
        line: line.current,
      },
      setPhase,
    );
    wave.current = engine;
    void engine.start();
    return () => {
      wave.current = null;
      engine.destroy();
    };
  }, []);

  // Switching the platform plays the sequence again: with the new headline
  // where it differs, otherwise with the same one.
  const lastPlatform = useRef(selectedPlatform);
  useBrowserLayoutEffect(() => {
    const switched = lastPlatform.current !== selectedPlatform;
    lastPlatform.current = selectedPlatform;
    if (!wave.current) return;
    const retyped = wave.current.headlineChanged();
    if (switched && !retyped) wave.current.replay();
  }, [selectedPlatform, line1, line2]);

  return (
    <section
      ref={host}
      data-testid="landing-hero"
      data-phase={phase ?? undefined}
      className="landing-hero"
    >
      <canvas
        ref={canvas}
        className="landing-hero__canvas"
        aria-hidden="true"
      />

      <div className="landing-hero__inner">
        <div
          role="group"
          aria-label={t(locale, "hero.platformTabs.label")}
          className="site-switch"
        >
          {platforms.map(({ id, Logo }) => (
            <button
              key={id}
              type="button"
              aria-pressed={selectedPlatform === id}
              data-testid={`landing-hero-tab-${id}`}
              onClick={() => selectPlatform(id)}
              className="site-switch__item"
            >
              <Logo className="size-4" aria-hidden="true" />
              <span>{t(locale, `hero.platformTabs.${id}`)}</span>
            </button>
          ))}
        </div>

        <h1 ref={title} className="landing-hero__title">
          {/* The space keeps both sentences apart in the accessible name. */}
          {`${line1} `}
          <br />
          {line2}
          <span
            ref={baseline}
            className="landing-hero__baseline"
            aria-hidden="true"
          />
        </h1>

        <div ref={line} className="landing-hero__line" aria-hidden="true" />

        <p className="landing-hero__subtitle">
          {t(locale, `hero.subtitle.${selectedPlatform}`)}
        </p>

        <div className="landing-hero__actions">
          {download.available ? (
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
              className="site-button"
            >
              {download.label}
            </a>
          ) : (
            <button
              type="button"
              disabled
              data-testid="landing-hero-download"
              className="site-button"
            >
              {download.label}
            </button>
          )}
          <a
            href={`/${locale}/setup/?platform=${selectedPlatform}`}
            className="site-link"
          >
            {t(locale, "hero.setup")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <p className="landing-hero__notice">
          {version
            ? t(locale, `hero.platformNotice.${selectedPlatform}`).replace(
                "{version}",
                version,
              )
            : t(locale, `hero.platformRequirement.${selectedPlatform}`)}
        </p>

        <ul className="landing-hero__points">
          {points.map((point) => (
            <li key={point}>
              <BarMark />
              {t(locale, `hero.point.${point}`)}
            </li>
          ))}
          <li title={t(locale, "madeInGermany.craft")}>
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
    </section>
  );
}

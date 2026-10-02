import { useEffect, useRef, type ReactElement, type SVGProps } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  IOSLogo,
  MacOSLogo,
  WindowsLogo,
} from "@/components/ui/platform-logos";
import { getPlatformDownloadTarget } from "@/lib/platform-download";
import { platformVersions } from "@/lib/platform-versions";
import {
  useSyncedLandingPlatform,
  type LandingPlatform,
} from "@/hooks/use-landing-platform";
import { localePath, t, type Locale } from "@/i18n/index";
import { CtaWave } from "./cta-wave";

const editions: {
  platform: LandingPlatform;
  Logo: (props: SVGProps<SVGSVGElement>) => ReactElement;
}[] = [
  { platform: "mac", Logo: MacOSLogo },
  { platform: "windows", Logo: WindowsLogo },
  { platform: "ios", Logo: IOSLogo },
];

/** The waveform returns once more and ends in the download actions. */
export function FinalCta({ locale = "en" }: { locale?: Locale }) {
  const revealRoot = useScrollReveal();
  const canvas = useRef<HTMLCanvasElement>(null);
  const platform = useSyncedLandingPlatform();
  const download = getPlatformDownloadTarget(platform, locale, "landing");

  useEffect(() => {
    if (!canvas.current) return;
    try {
      const wave = new CtaWave(canvas.current);
      return () => wave.destroy();
    } catch {
      /* The section works without its decoration. */
    }
  }, []);

  return (
    <section ref={revealRoot} data-testid="final-cta" className="landing-final">
      <canvas ref={canvas} className="landing-final__wave" aria-hidden="true" />

      <div className="site-wrap landing-final__inner">
        <h2 className="site-title landing-final__title reveal-fade-hidden">
          {t(locale, "downloadCta.title")}
        </h2>
        <p className="site-lede">{t(locale, "downloadCta.subtitle")}</p>

        <div className="site-actions">
          {download.available ? (
            <a
              href={download.href}
              target={download.opensNewTab ? "_blank" : undefined}
              rel={download.opensNewTab ? "noopener noreferrer" : undefined}
              data-testid="landing-footer-download"
              data-download-social-trigger
              data-download-platform={download.platform}
              data-download-target={download.target}
              data-download-version={download.version}
              data-tracking-placement="landing"
              className="site-button"
            >
              {download.label}
            </a>
          ) : (
            <button
              type="button"
              disabled
              data-testid="landing-footer-download"
              className="site-button"
            >
              {download.label}
            </button>
          )}
          <a href={localePath(locale, "/release-status")} className="site-link">
            {t(locale, "downloadCta.releaseStatus")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <ul
          className="site-editions"
          aria-label={t(locale, "downloadCta.editions")}
          data-testid="landing-platform-grid"
        >
          {editions.map(({ platform: edition, Logo }) => {
            const target = getPlatformDownloadTarget(
              edition,
              locale,
              "landing",
            );
            if (!target.available) return null;
            return (
              <li key={edition}>
                <a
                  href={target.href}
                  target={target.opensNewTab ? "_blank" : undefined}
                  rel={target.opensNewTab ? "noopener noreferrer" : undefined}
                  data-download-social-trigger
                  data-download-platform={target.platform}
                  data-download-target={target.target}
                  data-download-version={target.version}
                  data-tracking-placement="landing-editions"
                  data-selected={edition === platform ? "" : undefined}
                  className="site-editions__link"
                >
                  <Logo className="size-5" aria-hidden="true" />
                  <span className="site-editions__body">
                    <span className="sr-only">{target.label}: </span>
                    <span className="site-editions__name">
                      {t(locale, `hero.platformTabs.${edition}`)}
                      {platformVersions[edition] && (
                        <span className="site-editions__version">
                          {platformVersions[edition]}
                        </span>
                      )}
                    </span>
                    <span className="site-editions__text">
                      {t(locale, `downloadCta.requirement.${edition}`)}
                    </span>
                  </span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>

        <p className="landing-final__note">
          {t(locale, "downloadCta.licenseNote.before")}{" "}
          <a href={localePath(locale, "/pricing")}>
            {t(locale, "downloadCta.licenseNote.link")}
          </a>
        </p>
      </div>
    </section>
  );
}

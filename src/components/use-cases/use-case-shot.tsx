import { WaveRule } from "@/components/site";
import { Screenshot } from "@/components/ui/screenshot";
import { screenshotPath, t, type Locale } from "@/i18n/index";

interface UseCaseShotProps {
  /** Locale-neutral path of a real screenshot. */
  src: string;
  /** Says what the screenshot shows. */
  caption: string;
  locale?: Locale;
}

/** One real screenshot of the app with its caption. */
export function UseCaseShot({ src, caption, locale = "en" }: UseCaseShotProps) {
  return (
    <section
      className="site-section site-section--tight-top"
      data-testid="use-case-shot"
    >
      <div className="site-wrap">
        <WaveRule label={t(locale, "useCases.shotLabel")} seed={17} />
        <figure className="site-shot site-shot--window usecase-shot reveal-scale-hidden">
          <div className="usecase-shot__pan">
            <Screenshot
              src={screenshotPath(locale, src)}
              alt={caption}
              loading="lazy"
              sizes="(max-width: 639px) 150vw, (max-width: 1023px) calc(100vw - 64px), 960px"
            />
          </div>
          <figcaption className="site-caption" aria-hidden="true">
            {caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

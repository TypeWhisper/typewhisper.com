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
          {/* The script of the use case page puts it into the tab order while it scrolls. */}
          <div className="usecase-shot__pan" role="group" aria-label={caption}>
            <Screenshot
              src={screenshotPath(locale, src)}
              alt={caption}
              loading="lazy"
              // Panned at 150vw on phones; as in the feature tour, phones
              // with three device pixels per CSS pixel load the 1440px variant.
              sizes="(max-width: 639px) and (min-resolution: 2.5dppx) 100vw, (max-width: 639px) 150vw, (max-width: 1023px) calc(100vw - 64px), 960px"
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

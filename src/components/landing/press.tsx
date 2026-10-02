import { ArrowUpRight } from "lucide-react";
import { testimonialQuote, testimonials } from "@/data/testimonials";
import { t, type Locale } from "@/i18n/index";
import { WaveRule } from "@/components/site/wave-rule";

/** Press quotes as large typography, each linked to its source. Static markup. */
export function Press({ locale = "en" }: { locale?: Locale }) {
  if (testimonials.length === 0) return null;
  const sourceLabel = t(locale, "wallOfLove.source");

  return (
    <section data-testid="wall-of-love" className="site-section">
      <div className="site-wrap site-wrap--narrow">
        <WaveRule label={t(locale, "wallOfLove.label")} seed={37} />
        <h2 className="sr-only">{t(locale, "wallOfLove.title")}</h2>

        <ul className="site-quotes">
          {testimonials.map((item) => (
            <li key={item.id} className="reveal-hidden">
              <figure>
                <blockquote
                  className="site-quote"
                  cite={item.href}
                  lang={item.quote[locale] ? locale : "en"}
                >
                  <p>
                    {locale === "de" ? "„" : "“"}
                    {testimonialQuote(item, locale)}
                    {locale === "de" ? "“" : "”"}
                  </p>
                </blockquote>
                <figcaption className="site-quote__source">
                  {item.id === "faz" ? (
                    <img
                      src="/brand-logos/faz/wordmark.svg"
                      alt={item.source}
                      className="site-quote__wordmark"
                      width="176"
                      height="22"
                    />
                  ) : (
                    <span className="site-quote__name">{item.author}</span>
                  )}
                  {item.href && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="site-quote__link"
                      aria-label={`${sourceLabel}: ${item.author}`}
                    >
                      {sourceLabel}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { Fragment } from "react";
import { WaveRule } from "@/components/site";
import type { UseCaseExample } from "@/data/use-cases";
import { t, type Locale } from "@/i18n/index";

interface UseCaseSpokenProps {
  example: UseCaseExample;
  locale?: Locale;
}

/**
 * What you say and what TypeWhisper types, as pure typography. The texts are
 * the examples of the landing page (`spoken.*`). Static markup.
 */
export function UseCaseSpoken({ example, locale = "en" }: UseCaseSpokenProps) {
  const fillers = t(locale, "spoken.fillers")
    .split(",")
    .map((filler) => filler.trim());
  const raw = t(locale, `spoken.${example}.raw`).split(" ");
  const lines = t(locale, `spoken.${example}.polished`).split("\n");

  return (
    <section
      className="site-section site-section--tight-top"
      data-testid="use-case-spoken"
      aria-labelledby="use-case-spoken-title"
    >
      <div className="site-wrap">
        <WaveRule label={t(locale, "spoken.label")} seed={11} />
        <h2 id="use-case-spoken-title" className="sr-only">
          {t(locale, "useCases.spokenTitle")}
        </h2>

        <div className="usecase-spoken reveal-hidden">
          <div className="usecase-spoken__said">
            <p className="usecase-spoken__label">{t(locale, "spoken.said")}</p>
            <p className="usecase-spoken__raw">
              {raw.map((word, index) => (
                <Fragment key={index}>
                  {index > 0 && " "}
                  {fillers.includes(word.toLowerCase()) ? (
                    <del>{word}</del>
                  ) : (
                    word
                  )}
                </Fragment>
              ))}
            </p>
          </div>
          <div className="usecase-spoken__typed">
            <p className="usecase-spoken__label usecase-spoken__label--typed">
              {t(locale, "spoken.typed")}
            </p>
            {lines.map((line) => (
              <p
                key={line}
                className={`usecase-spoken__text ${line.startsWith("•") ? "usecase-spoken__text--item" : ""}`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        <p className="site-footnote usecase-spoken__note">
          {t(locale, "spoken.footnote")}
        </p>
      </div>
    </section>
  );
}

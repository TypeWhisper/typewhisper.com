import { Fragment } from "react";
import { t, type Locale } from "@/i18n/index";
import { SectionHead } from "@/components/site/section-head";

const examples = ["email", "chat", "note"] as const;

/** Marks the filler words of a raw dictation so the eye sees what gets dropped. */
function RawSpeech({ text, fillers }: { text: string; fillers: string[] }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <Fragment key={index}>
          {index > 0 && " "}
          {fillers.includes(word.toLowerCase()) ? <del>{word}</del> : word}
        </Fragment>
      ))}
    </>
  );
}

/**
 * Spoken versus written, as pure typography: three examples side by side,
 * the raw dictation small and muted, the finished text larger beneath it.
 * Static markup, no hydration.
 */
export function Spoken({ locale = "en" }: { locale?: Locale }) {
  const fillers = t(locale, "spoken.fillers")
    .split(",")
    .map((filler) => filler.trim());

  return (
    <section data-testid="spoken-written" className="site-section">
      <div className="site-wrap">
        <SectionHead
          label={t(locale, "spoken.label")}
          title={t(locale, "spoken.title")}
          lede={t(locale, "spoken.lede")}
          seed={11}
        />

        <ol className="landing-spoken">
          {examples.map((example) => (
            <li key={example} className="landing-spoken__item reveal-hidden">
              <p className="landing-spoken__context">
                {t(locale, `spoken.${example}.context`)}
              </p>
              <div className="landing-spoken__pair">
                <p className="landing-spoken__label">
                  {t(locale, "spoken.said")}
                </p>
                <p className="landing-spoken__raw">
                  <RawSpeech
                    text={t(locale, `spoken.${example}.raw`)}
                    fillers={fillers}
                  />
                </p>
                <p className="landing-spoken__label landing-spoken__label--typed">
                  {t(locale, "spoken.typed")}
                </p>
                <div className="landing-spoken__result">
                  {t(locale, `spoken.${example}.polished`)
                    .split("\n")
                    .map((line) => (
                      <p
                        key={line}
                        className={`landing-spoken__typed ${line.startsWith("•") ? "landing-spoken__typed--item" : ""}`}
                      >
                        {line}
                      </p>
                    ))}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="site-footnote">{t(locale, "spoken.footnote")}</p>
      </div>
    </section>
  );
}

import { ArrowRight } from "lucide-react";
import { PageHead } from "@/components/site";
import { localePath, t, type Locale } from "@/i18n/index";

/** Reading page: says why no ranking is published. Shows no numbers. */
export default function BenchmarkIndex({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";
  return (
    <div className="site-page">
      <PageHead
        compact
        wrap="prose"
        label={t(locale, "benchmark.label")}
        title={t(locale, "benchmark.heading")}
        lede={
          isDe
            ? "Hier ist derzeit kein belastbarer Vergleich der aktuellen Modelle und Plattformen veröffentlicht."
            : "No verified comparison of current models and platforms is published here at present."
        }
      />
      <section className="site-section site-section--tight-top">
        <div className="site-wrap site-wrap--prose">
          <div className="site-prose">
            <h2>
              {isDe
                ? "Warum die frühere Rangliste fehlt"
                : "Why the previous ranking is unavailable"}
            </h2>
            <p>
              {isDe
                ? "Der frühere Datensatz stammt vom 11. März 2026. Er enthält zusammengefasste Messwerte, aber keine ausreichenden Angaben zu Aufnahmen, Referenztexten, Hardware und App-Versionen. Daraus lässt sich keine verlässliche Rangliste für die heutigen Editionen ableiten."
                : "The previous dataset dates from March 11, 2026. It contains aggregate measurements without sufficient recording, reference-transcript, hardware, or app-version information. It cannot establish a reliable ranking for today's editions."}
            </p>
            <p>
              {isDe
                ? "Ein nachvollziehbarer Vergleich braucht identische Audioeingaben, überprüfte Referenztexte, genaue Modell- und Plattformversionen sowie getrennte Angaben zu Erkennungsqualität, Formatierung, Fehlern und Wartezeit nach dem Aufnahmeende."
                : "A reproducible comparison needs identical audio inputs, verified reference transcripts, exact model and platform versions, and separate measurements for recognition quality, formatting, failures, and latency after recording stops."}
            </p>
            <p>
              {isDe
                ? "Für die Einrichtung helfen dir die dokumentierten Funktionen und Voraussetzungen der einzelnen Engines."
                : "Use each engine's documented capabilities and requirements to guide your setup."}
            </p>
          </div>
          <div className="site-actions site-actions--start utility-reading__actions">
            <a className="site-link" href={localePath(locale, "/addons")}>
              {isDe ? "Engines und Add-ons" : "Engines and add-ons"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a className="site-link" href={localePath(locale, "/setup")}>
              {isDe ? "Einrichtungshilfe" : "Setup guide"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

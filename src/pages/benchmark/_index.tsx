import { localePath, type Locale } from "@/i18n/index";

export type SortKey = "wer" | "cer" | "speed" | "cost";

export default function BenchmarkIndex({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight">Benchmark</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        {isDe
          ? "Hier ist derzeit kein belastbarer Vergleich der aktuellen Modelle und Plattformen veröffentlicht."
          : "No verified comparison of current models and platforms is published here at present."}
      </p>
      <div className="mt-8 rounded-2xl border bg-card p-6 leading-7 text-muted-foreground">
        <h2 className="font-display text-xl font-semibold text-foreground">
          {isDe ? "Warum die frühere Rangliste fehlt" : "Why the previous ranking is unavailable"}
        </h2>
        <p className="mt-3">
          {isDe
            ? "Der frühere Datensatz stammt vom 11. März 2026. Er enthält zusammengefasste Messwerte, aber keine ausreichenden Angaben zu Aufnahmen, Referenztexten, Hardware und App-Versionen. Daraus lässt sich keine verlässliche Rangliste für die heutigen Editionen ableiten."
            : "The previous dataset dates from March 11, 2026. It contains aggregate measurements without sufficient recording, reference-transcript, hardware, or app-version information. It cannot establish a reliable ranking for today's editions."}
        </p>
        <p className="mt-3">
          {isDe
            ? "Ein nachvollziehbarer Vergleich braucht identische Audioeingaben, überprüfte Referenztexte, genaue Modell- und Plattformversionen sowie getrennte Angaben zu Erkennungsqualität, Formatierung, Fehlern und Wartezeit nach dem Aufnahmeende."
            : "A reproducible comparison needs identical audio inputs, verified reference transcripts, exact model and platform versions, and separate measurements for recognition quality, formatting, failures, and latency after recording stops."}
        </p>
      </div>
      <p className="mt-6 leading-7 text-muted-foreground">
        {isDe
          ? "Für die Einrichtung helfen dir die dokumentierten Funktionen und Voraussetzungen der einzelnen Engines."
          : "Use each engine's documented capabilities and requirements to guide your setup."}
      </p>
      <div className="mt-3 flex flex-wrap gap-4">
        <a className="inline-flex min-h-11 items-center text-primary underline underline-offset-4" href={localePath(locale, "/addons")}>
          {isDe ? "Engines und Add-ons" : "Engines and add-ons"}
        </a>
        <a className="inline-flex min-h-11 items-center text-primary underline underline-offset-4" href={localePath(locale, "/setup")}>
          {isDe ? "Einrichtungshilfe" : "Setup guide"}
        </a>
      </div>
    </div>
  );
}

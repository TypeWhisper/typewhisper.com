import type { Locale } from "@/i18n/index";

export interface Testimonial {
  id: string;
  /** Quote text per locale (falls back to en). */
  quote: Partial<Record<Locale, string>> & { en: string };
  author: string;
  /** Source label, e.g. publication or community. */
  source: string;
  href?: string;
  /** Press quotes get a distinct visual treatment. */
  kind: "press" | "community";
}

/**
 * Curated quotes for the landing page "Wall of Love".
 * Only add real, verifiable quotes - press quotes need a source link.
 * Community quotes (Discord/Reddit) should be added here after curation.
 */
export const testimonials: Testimonial[] = [
  {
    id: "faz",
    quote: {
      en: "Listed among the 12 best AI apps for dictation.",
      de: "Gelistet unter den 12 besten KI-Apps f\u00fcr das Diktieren.",
    },
    author: "F.A.Z.",
    source: "Frankfurter Allgemeine Zeitung",
    href: "https://www.faz.net/premium/digitalwirtschaft/ki-akademie/wispr-flow-und-type-whisper-die-12-besten-ki-apps-fuer-das-diktieren-accg-200842482.html",
    kind: "press",
  },
  {
    id: "allthingsgeek",
    quote: {
      en: "If you regularly transcribe audio and value privacy, speed, and accuracy, TypeWhisper is worth installing immediately.",
      de: "Wer regelm\u00e4\u00dfig Audio transkribiert und Wert auf Privatsph\u00e4re, Geschwindigkeit und Genauigkeit legt, sollte TypeWhisper sofort installieren.",
    },
    author: "All Things Geek",
    source: "allthingsgeek.me",
    href: "https://allthingsgeek.me/ai-machine-learning/typewhisper-mac-transcription-review/",
    kind: "press",
  },
  {
    id: "implicator",
    quote: {
      en: "TypeWhisper emphasizes local processing, engine choice, open-source licensing, and user control.",
      de: "TypeWhisper setzt auf lokale Verarbeitung, Engine-Auswahl, Open-Source-Lizenzierung und Kontrolle durch die Nutzer.",
    },
    author: "implicator.ai",
    source: "implicator.ai",
    href: "https://www.implicator.ai/typewhisper-founder-built-his-dictation-app-after-a-stroke/",
    kind: "press",
  },
];

export function testimonialQuote(item: Testimonial, locale: Locale): string {
  return item.quote[locale] ?? item.quote.en;
}

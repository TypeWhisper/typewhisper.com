import type { Locale } from "@/i18n/index";

export type TutorialPlatform = "mac" | "ios";

interface TutorialCopy {
  title: string;
  /** One or two sentences for the index and the meta description. */
  description: string;
  /** Says what the video shows, below the player. */
  caption: string;
  steps: string[];
  notes: string[];
  /** Link text to the matching docs section. */
  docsLabel: string;
}

export interface Tutorial {
  /** URL segment under `/tutorials/`. */
  slug: string;
  /** File name in `public/videos/`, see `StudioVideo`. */
  video: string;
  /** The video also has a portrait cut for phones held upright. */
  portrait: boolean;
  platform: TutorialPlatform;
  /** Date the video went up on the site, ISO 8601. */
  published: string;
  /** App version the video was recorded with. */
  appVersion: string;
  /** Length of the video in the page language, in seconds. */
  duration: Record<Locale, number>;
  /** Docs page and section that explain the feature in full. */
  docsPath: string;
  copy: Record<Locale, TutorialCopy>;
}

/**
 * Tutorial videos rendered in the TypeWhisper Demo Studio. Each entry needs
 * the website export of its studio projects in `public/videos/`, one per
 * language. Newest first.
 */
export const tutorials: Tutorial[] = [
  {
    slug: "compare-local-writing-models",
    video: "ios-compare-local-models",
    portrait: true,
    platform: "ios",
    published: "2026-11-03",
    appVersion: "1.2.3",
    duration: { en: 82, de: 85 },
    docsPath: "/docs/ios/profiles-and-processing/#section-4",
    copy: {
      en: {
        title: "Compare the local writing models on iPhone",
        description:
          "Run the same voice memo through LFM2.5 and Gemma 4 E2B as an email in File Transcription, then keep the writing model that writes like you.",
        caption:
          "The same voice memo, written as an email on the iPhone by LFM2.5 2.6B and by Gemma 4 E2B.",
        steps: [
          "Under Settings > Writing Services > Local Models, download LFM2.5 2.6B (about 1.7 GB) and Gemma 4 E2B (about 2.8 GB).",
          "Open Settings > File Transcription and set Format to Email, Writing Service to Local Models, and Writing Model to LFM2.5 2.6B.",
          "Tap Add Audio or Video Files, choose a voice memo of how you usually dictate, and tap Transcribe All.",
          "In the file's menu, tap Open in History. The Original tab shows what you said.",
          "Back in File Transcription, set Writing Model to Gemma 4 E2B, tap Reset, add the same memo again, and tap Transcribe All.",
        ],
        notes: [
          "The Email format is part of Premium. The local models are free downloads and run entirely on the iPhone.",
          "Results depend on what you say. In the video, LFM2.5 wrote a full email, and Gemma 4 E2B kept the wording and added a subject.",
          "On iPhones that support it, Apple Intelligence is a third option. To free up space, swipe the row of the model you don't need in Writing Services.",
        ],
        docsLabel: "Writing services in the docs",
      },
      de: {
        title: "Die lokalen Schreibmodelle auf dem iPhone vergleichen",
        description:
          "Lass dasselbe Sprachmemo in der Dateitranskription einmal von LFM2.5 und einmal von Gemma 4 E2B als E-Mail schreiben und behalte das Schreibmodell, das wie du schreibt.",
        caption:
          "Dasselbe Sprachmemo, auf dem iPhone einmal von LFM2.5 2.6B und einmal von Gemma 4 E2B als E-Mail geschrieben.",
        steps: [
          "Lade unter Einstellungen > Schreibdienste > Lokale Modelle beide Modelle: LFM2.5 2.6B (etwa 1,7 GB) und Gemma 4 E2B (etwa 2,8 GB).",
          "Öffne Einstellungen > Dateitranskription und stelle Format auf „E-Mail“, Schreibdienst auf „Lokale Modelle“ und Schreibmodell auf „LFM2.5 2.6B“.",
          "Tippe auf „Audio- oder Videodateien hinzufügen“, wähle ein Sprachmemo, so wie du sonst diktierst, und tippe auf „Alles transkribieren“.",
          "Tippe im Menü der Datei auf „Im Verlauf öffnen“. Unter „Originalfassung“ steht, was du gesagt hast.",
          "Stelle in der Dateitranskription das Schreibmodell auf „Gemma 4 E2B“, tippe auf „Zurücksetzen“, füge dasselbe Memo noch einmal hinzu und tippe auf „Alles transkribieren“.",
        ],
        notes: [
          "Das Format „E-Mail“ gehört zu Premium. Die lokalen Modelle sind kostenlos und laufen vollständig auf dem iPhone.",
          "Die Ergebnisse hängen davon ab, was du sagst. Im Video schreibt LFM2.5 eine ausführliche E-Mail, Gemma 4 E2B lässt den Wortlaut stehen und ergänzt einen Betreff.",
          "Auf iPhones, die es unterstützen, ist Apple Intelligence eine dritte Möglichkeit. Platz gewinnst du, indem du in den Schreibdiensten die Zeile des Modells wegwischst, das du nicht brauchst.",
        ],
        docsLabel: "Schreibdienste in der Doku",
      },
    },
  },
  {
    slug: "translate-selected-text",
    video: "mac-translate-selection",
    portrait: true,
    platform: "mac",
    published: "2026-11-03",
    appVersion: "1.8.1",
    duration: { en: 59, de: 60 },
    docsPath: "/docs/mac/workflows/#manual-shortcut",
    copy: {
      en: {
        title: "Translate selected text with a shortcut",
        description:
          "Give a Translation workflow its own shortcut. Select text in any app, press the shortcut, and the translation replaces it, without dictating.",
        caption:
          "A Translation workflow with Apple Translate turns a German message into English in place.",
        steps: [
          "Open Settings > Workflows, click New Workflow, and choose Translation.",
          "Set Translation Mode to Apple Translate (On-Device) and choose your Target Language.",
          "Under Trigger, choose Automatic, then Hotkey, then Process Selected Text, and record a shortcut. The video uses Control-Option-T.",
          "Save the workflow. Select text in any app and press the shortcut.",
        ],
        notes: [
          "Apple Translate runs on your Mac and needs macOS 15 or later. The first time, macOS asks to download the language packs. With LLM Prompt as the mode, the workflow uses your language model instead.",
          "Process Selected Text works with every workflow, for example Cleaned Text or Summary.",
        ],
        docsLabel: "Hotkey workflows in the docs",
      },
      de: {
        title: "Markierten Text per Tastenkürzel übersetzen",
        description:
          "Gib einem Übersetzungs-Workflow ein eigenes Tastenkürzel. Text in einer beliebigen App markieren, Kürzel drücken, und die Übersetzung ersetzt ihn, ganz ohne Diktat.",
        caption:
          "Ein Übersetzungs-Workflow mit Apple Translate macht aus einer englischen Nachricht direkt an Ort und Stelle Deutsch.",
        steps: [
          "Öffne Einstellungen > Workflows, klicke auf „Neuer Workflow“ und wähle „Übersetzung“.",
          "Stelle den Übersetzungsmodus auf „Apple Translate (On-Device)“ und wähle deine Zielsprache.",
          "Wähle unter „Trigger“ erst „Automatisch“, dann „Hotkey“ und „Markierten Text verarbeiten“, und nimm ein Kürzel auf. Im Video ist es Control-Option-T.",
          "Speichere den Workflow. Markiere Text in einer beliebigen App und drücke das Kürzel.",
        ],
        notes: [
          "Apple Translate läuft auf deinem Mac und braucht macOS 15 oder neuer. Beim ersten Mal fragt macOS, ob es die Sprachpakete laden darf. Mit „LLM-Prompt“ als Modus nutzt der Workflow stattdessen dein Sprachmodell.",
          "„Markierten Text verarbeiten“ klappt mit jedem Workflow, zum Beispiel „Bereinigter Text“ oder „Zusammenfassung“.",
        ],
        docsLabel: "Hotkey-Workflows in der Doku",
      },
    },
  },
];

export function getTutorial(slug: string): Tutorial | undefined {
  return tutorials.find((tutorial) => tutorial.slug === slug);
}

/** `59` -> `0:59`, `60` -> `1:00`. */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

/** `60` -> `PT1M0S`, for VideoObject structured data. */
export function isoDuration(seconds: number): string {
  return `PT${Math.floor(seconds / 60)}M${seconds % 60}S`;
}

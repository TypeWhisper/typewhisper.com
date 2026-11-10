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
    slug: "dictate-with-the-ios-keyboard",
    video: "ios-keyboard-tour",
    portrait: true,
    platform: "ios",
    published: "2026-11-10",
    appVersion: "1.2.4",
    duration: { en: 183, de: 204 },
    docsPath: "/docs/ios/dictation-and-keyboard/#section-2",
    copy: {
      en: {
        title: "Set up the TypeWhisper keyboard and dictate into other apps",
        description:
          "Turn on the TypeWhisper keyboard on iPhone and iPad, dictate into other apps, and see why the app opens on the first dictation and how the keyboard then stays ready.",
        caption:
          "The TypeWhisper keyboard in Messages: setup with Full Access, the first dictation through the app, the next ones right in the keyboard, and Tools Only next to a hardware keyboard on iPad.",
        steps: [
          "In TypeWhisper, open Settings > Keyboard and tap Keyboard Enabled. In iOS Settings, open Keyboards, then turn on TypeWhisper and Allow Full Access.",
          "In a text field, for example in Messages, switch to TypeWhisper with the globe key.",
          "Tap the microphone. TypeWhisper opens and starts the recording. To get back, tap the previous app's name at the top left, here Messages, or swipe as the hint in TypeWhisper shows. Talk once the keyboard says Listening.",
          "Tap the microphone again. Your words are inserted at the cursor.",
          "After each dictation, the keyboard stays ready for 5 minutes: the next one starts right in the keyboard, without opening the app. You can also hold the microphone while you talk and let go to insert.",
        ],
        notes: [
          "Dictation needs Full Access: it's how the keyboard and the TypeWhisper app talk to each other. Normal typing works without it. iOS shows the same warning for every keyboard that asks for Full Access.",
          "iOS doesn't let keyboards use the microphone, so the app records for the keyboard. That's why it opens on the first dictation.",
          "Set the Ready Duration under Settings > Keyboard > Keyboard Dictation (1 to 30 minutes), or turn Keep Ready for Next Dictation off. Until the time runs out, the iOS microphone indicator can stay visible. Music and videos keep their normal volume while the keyboard stays ready.",
          "The first time, preparing a local speech model can take a few minutes. Keep TypeWhisper open until it's done.",
          "On iPad, the key at the bottom right of the keyboard hides it.",
          "With a Magic Keyboard or another hardware keyboard on iPad, TypeWhisper shows only its tools: the microphone, your formats and the globe key. Keyboard Mode under Settings > Keyboard in TypeWhisper offers Full Keyboard and Tools Only, and Tools Only with Hardware Keyboard is on by default.",
          "If TypeWhisper does not appear next to your hardware keyboard, turn on the onscreen keyboard in iPadOS Settings under Accessibility > Touch > AssistiveTouch. Without it, iPadOS hides third-party keyboards while a hardware keyboard is attached.",
        ],
        docsLabel: "The keyboard in the docs",
      },
      de: {
        title: "Die TypeWhisper-Tastatur einrichten und in andere Apps diktieren",
        description:
          "Schalte die TypeWhisper-Tastatur auf iPhone und iPad ein, diktiere in andere Apps und sieh, warum sich beim ersten Diktat die App öffnet und wie die Tastatur danach bereit bleibt.",
        caption:
          "Die TypeWhisper-Tastatur in Nachrichten: Einrichtung mit vollem Zugriff, das erste Diktat über die App, die nächsten direkt in der Tastatur und „Nur Werkzeuge“ neben einer Hardware-Tastatur am iPad.",
        steps: [
          "Öffne in TypeWhisper Einstellungen > Tastatur und tippe auf „Tastatur aktiviert“. Öffne in den iOS-Einstellungen „Tastaturen“ und schalte TypeWhisper und „Vollen Zugriff erlauben“ ein.",
          "Wechsle in einem Textfeld, etwa in Nachrichten, mit der Globustaste zu TypeWhisper.",
          "Tippe aufs Mikrofon. TypeWhisper öffnet sich und startet die Aufnahme. Um zurückzukommen, tippe oben links auf den Namen der vorherigen App, hier „Nachrichten“, oder wische wie im Hinweis von TypeWhisper. Sprich, sobald die Tastatur „Hört zu …“ zeigt.",
          "Tippe noch mal aufs Mikrofon. Deine Worte werden am Cursor eingefügt.",
          "Nach jedem Diktat bleibt die Tastatur 5 Minuten bereit: Das nächste startet direkt in der Tastatur, ohne dass sich die App öffnet. Du kannst das Mikrofon auch beim Sprechen gedrückt halten und zum Einfügen loslassen.",
        ],
        notes: [
          "Fürs Diktat braucht die Tastatur vollen Zugriff: So reden Tastatur und TypeWhisper-App miteinander. Normales Tippen geht auch ohne. Die Warnung dazu zeigt iOS bei jeder Tastatur, die vollen Zugriff möchte.",
          "iOS lässt Tastaturen nicht ans Mikrofon, deshalb nimmt die App für die Tastatur auf. Darum öffnet sie sich beim ersten Diktat.",
          "Die Bereitschaftsdauer stellst du unter Einstellungen > Tastatur > Tastatur-Diktat ein (1 bis 30 Minuten), oder du schaltest „Für nächstes Diktat bereit halten“ aus. Bis die Zeit abläuft, kann die Mikrofonanzeige von iOS sichtbar bleiben. Musik und Videos behalten ihre normale Lautstärke, solange die Tastatur bereit ist.",
          "Beim ersten Mal kann es einige Minuten dauern, bis ein lokales Sprachmodell vorbereitet ist. Lass TypeWhisper so lange geöffnet.",
          "Auf dem iPad blendet die Taste unten rechts die Tastatur aus.",
          "Mit einem Magic Keyboard oder einer anderen Hardware-Tastatur am iPad zeigt TypeWhisper nur noch seine Werkzeuge: das Mikrofon, deine Formate und die Globustaste. Unter Einstellungen > Tastatur > Tastaturmodus in TypeWhisper wählst du „Volle Tastatur“ oder „Nur Werkzeuge“, und „Nur Werkzeuge mit Hardware-Tastatur“ ist standardmäßig eingeschaltet.",
          "Erscheint TypeWhisper nicht neben deiner Hardware-Tastatur, schalte in den iPadOS-Einstellungen unter Bedienungshilfen > Tippen > AssistiveTouch die Bildschirmtastatur ein. Ohne sie blendet iPadOS Tastaturen von Drittanbietern aus, solange eine Hardware-Tastatur verbunden ist.",
        ],
        docsLabel: "Die Tastatur in der Doku",
      },
    },
  },
  {
    slug: "email-reply-workflow",
    video: "mac-email-reply-workflow",
    portrait: true,
    platform: "mac",
    published: "2026-11-04",
    appVersion: "1.8.1",
    duration: { en: 73, de: 73 },
    docsPath: "/docs/mac/workflows/#how-workflows-work",
    copy: {
      en: {
        title: "Turn spoken notes into an email reply",
        description:
          "Build your first workflow: an Email Reply workflow that runs whenever you dictate in Mail and turns rough spoken notes into a finished reply.",
        caption:
          "An Email Reply workflow turns a quick spoken note in Mail into a reply with greeting and closing.",
        steps: [
          "Open Settings > Workflows and click New Workflow.",
          "Choose the Email Reply template.",
          "Under Try It Out, click Insert Example or type a sample dictation, then click Run Test. Nothing is saved or inserted.",
          "Under Trigger, choose Automatic, then App. Select Mail and click Done.",
          "Click Save Workflow. Open a reply in Mail and say what you want to answer. TypeWhisper inserts the finished email.",
        ],
        notes: [
          "Email Reply needs a language model. In the video, Parakeet transcribes on the Mac and Groq writes the reply in the cloud. With Apple Intelligence (macOS 26) or one of the Local LLM add-ons, the text stays on your Mac.",
          "For other results, start from another template: Cleaned Text, Translation, Meeting Notes, Checklist, JSON, Summary, Dictation Only, or Custom Workflow. Instead of in an app, a workflow can also run on a website, with its own hotkey, always, or from the Workflow Palette.",
        ],
        docsLabel: "Workflows in the docs",
      },
      de: {
        title: "Aus gesprochenen Notizen eine E-Mail-Antwort machen",
        description:
          "Richte deinen ersten Workflow ein: eine E-Mail-Antwort, die immer läuft, wenn du in Mail diktierst, und aus groben Notizen eine fertige Antwort macht.",
        caption:
          "Ein Workflow „E-Mail-Antwort“ macht in Mail aus einer kurz gesprochenen Notiz eine Antwort mit Anrede und Gruß.",
        steps: [
          "Öffne Einstellungen > Workflows und klicke auf „Neuer Workflow“.",
          "Wähle die Vorlage „E-Mail-Antwort“.",
          "Klicke unter „Ausprobieren“ auf „Beispiel einfügen“ oder tippe ein eigenes Beispiel-Diktat ein, dann auf „Test starten“. Gespeichert oder eingefügt wird dabei nichts.",
          "Wähle unter „Trigger“ erst „Automatisch“, dann „App“. Wähle Mail aus und klicke auf „Fertig“.",
          "Klicke auf „Workflow speichern“. Öffne in Mail eine Antwort und sag, was du antworten willst. TypeWhisper fügt die fertige E-Mail ein.",
        ],
        notes: [
          "Die E-Mail-Antwort braucht ein Sprachmodell. Im Video transkribiert Parakeet auf dem Mac, und Groq schreibt die Antwort in der Cloud. Mit Apple Intelligence (macOS 26) oder einem der Local-LLM-Add-ons bleibt der Text auf deinem Mac.",
          "Für andere Ergebnisse gibt es weitere Vorlagen: Bereinigter Text, Übersetzung, Besprechungsnotizen, Checkliste, JSON, Zusammenfassung, Nur Diktat und Eigener Workflow. Statt in einer App kann ein Workflow auch auf einer Website laufen, per eigenem Tastenkürzel, immer oder über die Workflow-Palette.",
        ],
        docsLabel: "Workflows in der Doku",
      },
    },
  },
  {
    slug: "compare-local-writing-models",
    video: "ios-compare-local-models",
    portrait: true,
    platform: "ios",
    published: "2026-11-03",
    appVersion: "1.2.2",
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
          "Results depend on what you say. In the video, both models added a subject line. LFM2.5 also split the memo into paragraphs and smoothed the wording, while Gemma 4 E2B kept it almost word for word in one paragraph.",
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
          "Die Ergebnisse hängen davon ab, was du sagst. Im Video ergänzen beide Modelle einen Betreff. LFM2.5 gliedert das Memo außerdem in Absätze und glättet die Formulierungen, Gemma 4 E2B übernimmt es fast wörtlich in einem Absatz.",
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

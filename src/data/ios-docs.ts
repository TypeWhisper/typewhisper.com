import type { Locale } from "@/i18n/index";

export const iosDocSlugs = [
  "installation",
  "dictation-and-keyboard",
  "profiles-and-processing",
  "files-history-and-inbox",
  "dictionary-and-snippets",
  "watch-and-shortcuts",
  "privacy-and-premium",
  "troubleshooting",
] as const;

export type IosDocSlug = (typeof iosDocSlugs)[number];

export interface IosDocStep {
  title: string;
  description: string;
}

export interface IosDocImage {
  path: string;
  alt: string;
  layout?: "phone" | "tablet" | "wide";
}

export interface IosDocCallout {
  title: string;
  description: string;
}

export interface IosDocSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: IosDocStep[];
  code?: string[];
  callout?: IosDocCallout;
  image?: IosDocImage;
}

export interface IosDocPage {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  sections: IosDocSection[];
  next?: IosDocSlug;
}

const en: Record<IosDocSlug, IosDocPage> = {
  installation: {
    eyebrow: "iOS setup",
    title: "Installation and first setup",
    description:
      "Requirements, permissions, local model setup, keyboard activation, and the first test recording for TypeWhisper on iPhone and iPad.",
    intro:
      "TypeWhisper 1.0 is available from the App Store for iPhone and iPad. This guide takes you from installation through permissions, local models, keyboard setup, and your first recording.",
    sections: [
      {
        title: "Before you install",
        bullets: [
          "iOS 18 or iPadOS 18 or later",
          "watchOS 11 or later for the optional Apple Watch app",
          "Free storage for any local model you choose to download",
          "Internet access for the initial download, model downloads, and optional cloud providers",
        ],
        callout: {
          title: "Current availability",
          description:
            "Download TypeWhisper only from the official App Store page linked in this documentation. Do not install builds or profiles offered by an unofficial source.",
        },
      },
      {
        title: "Complete guided setup",
        steps: [
          {
            title: "Open TypeWhisper",
            description:
              "Follow the guided setup and review how recordings, local engines, and optional providers work.",
          },
          {
            title: "Allow microphone access",
            description:
              "TypeWhisper needs microphone access for recordings started in the app, keyboard, Shortcuts, widgets, or Apple Watch flow.",
          },
          {
            title: "Allow speech recognition when requested",
            description:
              "This permission is used by Apple Speech. Other local engines keep their own downloaded models inside the app.",
          },
          {
            title: "Choose an engine and model",
            description:
              "Start with Apple Speech for minimal setup or download a WhisperKit or Parakeet model for a fully local model-based workflow.",
          },
          {
            title: "Run a short test",
            description:
              "Record one sentence, stop, and confirm that the live preview and final result appear in History.",
          },
        ],
        image: {
          path: "/screenshots/ios/01-recording.png",
          alt: "TypeWhisper recording with live transcription on iPhone",
          layout: "phone",
        },
      },
      {
        title: "Optional setup after the first recording",
        bullets: [
          "Add the TypeWhisper keyboard if you want to dictate into other apps.",
          "Install the Watch app if you want to start recordings from your wrist.",
          "Add TypeWhisper actions in Shortcuts or assign Quick Dictation to the Action Button.",
          "Enable private result notifications if you want an alert when a background capture finishes.",
        ],
      },
    ],
    next: "dictation-and-keyboard",
  },
  "dictation-and-keyboard": {
    eyebrow: "Daily dictation",
    title: "Dictation and the voice keyboard",
    description:
      "Record in TypeWhisper, dictate into other iOS apps, enable Full Access safely, switch profiles, and understand the keyboard return flow.",
    intro:
      "You can dictate in TypeWhisper itself or use the TypeWhisper keyboard in another app. Both paths use the containing app for microphone capture and transcription.",
    sections: [
      {
        title: "Record in the app",
        steps: [
          {
            title: "Choose a profile",
            description:
              "Select the language, engine, model, translation target, and output style you need.",
          },
          {
            title: "Start recording",
            description:
              "Tap the microphone. The waveform and live text show that TypeWhisper is receiving and processing speech.",
          },
          {
            title: "Pause or stop",
            description:
              "Pause when you need a break, resume the same recording, or stop to create the final result.",
          },
          {
            title: "Review the result",
            description:
              "Compare raw and processed text, copy or share it, apply another profile, or keep it in History.",
          },
        ],
      },
      {
        title: "Add the TypeWhisper keyboard",
        steps: [
          {
            title: "Add the keyboard",
            description:
              "Open Settings > General > Keyboard > Keyboards > Add New Keyboard and choose TypeWhisper.",
          },
          {
            title: "Enable Allow Full Access",
            description:
              "Open the TypeWhisper keyboard entry and enable Full Access. Normal typing works without it, but voice dictation and the shared return state require it.",
          },
          {
            title: "Select it in a text field",
            description:
              "Open Notes or another standard text field, hold the globe key, and choose TypeWhisper.",
          },
        ],
        callout: {
          title: "Why the main app opens",
          description:
            "iOS keyboard extensions cannot capture microphone audio directly. The microphone button opens TypeWhisper, which records and transcribes, while the extension only exchanges the selected state and result through the shared app container.",
        },
        image: {
          path: "/screenshots/ios/03-keyboard.png",
          alt: "TypeWhisper voice keyboard in an iPhone text field",
          layout: "phone",
        },
      },
      {
        title: "Dictate from another app",
        steps: [
          {
            title: "Tap the keyboard microphone",
            description:
              "TypeWhisper opens and starts a keyboard recording. Use the previous-app link at the top left to return to the original text field.",
          },
          {
            title: "Speak and stop",
            description:
              "Speak while the TypeWhisper keyboard is active, then tap its microphone button again to stop.",
          },
          {
            title: "Wait for insertion",
            description:
              "The main app finishes transcription and the keyboard inserts the result into the original text field.",
          },
        ],
        bullets: [
          "Switch profiles directly from the keyboard.",
          "Use English, German, Spanish, French, or Italian typing layouts.",
          "Use normal letters, numbers, punctuation, swipe typing, suggestions, and the next-keyboard control.",
          "Expand snippets or process selected text when the selected profile supports it.",
        ],
      },
    ],
    next: "profiles-and-processing",
  },
  "profiles-and-processing": {
    eyebrow: "Recognition and output",
    title: "Profiles, engines, and processing",
    description:
      "Choose local or optional cloud recognition, create purpose-built profiles, translate on device, and refine transcripts without losing the original.",
    intro:
      "A profile keeps the recognition and writing choices for one task together. Create separate profiles for quick notes, quiet speech, meetings, translation, or structured writing.",
    sections: [
      {
        title: "Choose a speech engine",
        bullets: [
          "Apple Speech needs little setup and can provide live results through the system speech framework.",
          "WhisperKit offers downloaded Whisper models for multilingual on-device transcription.",
          "Parakeet provides a fast local model path for supported languages.",
          "Optional cloud engines are used only after you configure and select a provider.",
        ],
        callout: {
          title: "Local is the default",
          description:
            "With an on-device engine, recording and transcription stay on the device. Choosing a cloud engine sends audio to that selected provider for transcription.",
        },
      },
      {
        title: "Build a useful profile",
        steps: [
          {
            title: "Name the purpose",
            description:
              "Use a task name such as Quick Note, Meeting Notes, Translate to English, or Focused Writing.",
          },
          {
            title: "Set language, engine, and model",
            description:
              "Choose an explicit model when consistency matters, or use the automatic route when you want TypeWhisper to select a compatible option.",
          },
          {
            title: "Choose translation and Whisper Mode",
            description:
              "Set a translation target when needed. Whisper Mode is intended for quieter speech and changes how capture is handled.",
          },
          {
            title: "Choose the writing result",
            description:
              "Keep the raw transcript, apply a formatting instruction, or use an available structured writing action.",
          },
        ],
        image: {
          path: "/screenshots/ios/ipad/05-profiles.png",
          alt: "TypeWhisper profile settings on iPad",
          layout: "tablet",
        },
      },
      {
        title: "Review before you reuse",
        paragraphs: [
          "TypeWhisper keeps the original recognition result alongside processed text. That makes it possible to compare what the speech engine heard with the formatted or translated result.",
          "Apple Translate can translate dictated text on device. Premium writing features can improve a fresh transcript, learn confirmed corrections, and create reviewable email drafts with a subject and body.",
        ],
      },
    ],
    next: "files-history-and-inbox",
  },
  "files-history-and-inbox": {
    eyebrow: "Capture and review",
    title: "Files, History, and Capture Inbox",
    description:
      "Transcribe existing audio and video, search results by device, review raw and processed text, and work through background captures in Inbox.",
    intro:
      "History is the complete archive. Capture Inbox is the focused queue for recordings that arrive from another entry point or still need your attention.",
    sections: [
      {
        title: "Transcribe an audio or video file",
        steps: [
          {
            title: "Start file transcription",
            description:
              "Choose a file from the Files picker or run the Transcribe Audio File action from Shortcuts.",
          },
          {
            title: "Choose the profile",
            description:
              "Select the language, engine, model, translation, and output treatment for this file.",
          },
          {
            title: "Let TypeWhisper process it",
            description:
              "Keep the app available while a local model loads or a selected cloud provider receives the file.",
          },
          {
            title: "Review in History",
            description:
              "Open the result to play available audio, compare raw and final text, copy, share, or apply another profile.",
          },
        ],
      },
      {
        title: "Use History as the source of truth",
        bullets: [
          "Search past transcription text.",
          "Filter or browse entries by the device and capture source that created them.",
          "Open the detail view to inspect original and processed text.",
          "Append another recording, edit the result, or mark an Inbox item complete.",
        ],
        image: {
          path: "/screenshots/ios/04-history.png",
          alt: "TypeWhisper History and Capture Inbox on iPhone",
          layout: "phone",
        },
      },
      {
        title: "Work through Capture Inbox",
        paragraphs: [
          "Quick Dictations, Apple Watch recordings, calendar drafts, and failed captures that need attention appear in Inbox. A badge and optional private notification make new results visible without mixing them into an unfiltered list.",
          "On iPad, the sidebar separates Inbox, all History, and device sources. Select an item to review it, fix a failed processing route, or mark it complete.",
        ],
        image: {
          path: "/screenshots/ios/ipad/03-inbox.png",
          alt: "TypeWhisper Capture Inbox and device filters on iPad",
          layout: "tablet",
        },
      },
    ],
    next: "dictionary-and-snippets",
  },
  "dictionary-and-snippets": {
    eyebrow: "Reusable language",
    title: "Dictionary and snippets",
    description:
      "Teach TypeWhisper names and specialist terms, add trusted corrections, and expand short triggers into reusable text with live placeholders.",
    intro:
      "The dictionary improves recurring vocabulary. Snippets replace a short spoken or typed trigger with a longer block of text after transcription.",
    sections: [
      {
        title: "Build your personal dictionary",
        steps: [
          {
            title: "Add a term",
            description:
              "Add a name, product, abbreviation, or specialist term that the speech engine should recognize more reliably.",
          },
          {
            title: "Add a correction when needed",
            description:
              "Map a recurring wrong form to the exact text you want TypeWhisper to use.",
          },
          {
            title: "Test with the active engine",
            description:
              "Local engines differ in vocabulary support. Run a short test and adjust recognition strength or the correction when available.",
          },
        ],
        image: {
          path: "/screenshots/ios/06-dictionary.png",
          alt: "TypeWhisper dictionary and correction learning on iPhone",
          layout: "phone",
        },
      },
      {
        title: "Create a snippet",
        steps: [
          {
            title: "Choose a memorable trigger",
            description:
              "Use a short phrase that is unlikely to occur accidentally, such as meeting link or support signature.",
          },
          {
            title: "Write the replacement",
            description:
              "Enter the complete text and decide whether matching should be case-sensitive.",
          },
          {
            title: "Insert dynamic values",
            description:
              "Add date, time, date and time, or clipboard placeholders from the editor chips.",
          },
          {
            title: "Use it after dictation",
            description:
              "Say or type the trigger. TypeWhisper expands it after transcription or from the voice keyboard.",
          },
        ],
        code: [
          "{{DATE}}",
          "{{TIME}}",
          "{{DATETIME}}",
          "{{CLIPBOARD}}",
          "{{DATE:yyyy-MM-dd}}",
        ],
      },
      {
        title: "Sync only when you want to",
        paragraphs: [
          "Dictionary and snippets work locally without an account or subscription. Premium can sync them between signed-in TypeWhisper installations through automatic iCloud or a cloud folder selected with Apple's Files picker.",
        ],
      },
    ],
    next: "watch-and-shortcuts",
  },
  "watch-and-shortcuts": {
    eyebrow: "Capture without opening the app first",
    title: "Apple Watch, Shortcuts, widgets, and Action Button",
    description:
      "Start a focused recording from your wrist, save Quick Dictations to Inbox, and build automations from the TypeWhisper App Intents.",
    intro:
      "TypeWhisper can start from the Apple Watch, a Shortcut, widget, or Action Button. Background results are collected in Capture Inbox for later review.",
    sections: [
      {
        title: "Record from Apple Watch",
        steps: [
          {
            title: "Open TypeWhisper on the Watch",
            description:
              "Choose the available profile and confirm that the Watch has enough free storage for a new recording.",
          },
          {
            title: "Start and stop on your wrist",
            description:
              "The timer and waveform show the active capture. Stop when the thought is complete.",
          },
          {
            title: "Transfer to iPhone",
            description:
              "The Watch sends the recording to TypeWhisper on iPhone for the selected processing route.",
          },
          {
            title: "Review in Inbox",
            description:
              "Open the notification or Capture Inbox to check the transcript, retry a failed route, or mark it complete.",
          },
        ],
      },
      {
        title: "Available Shortcuts actions",
        bullets: [
          "Quick Dictation starts or stops a capture and saves the result to Inbox.",
          "Start Recording, Stop Recording, and Pause or Resume Recording control the active capture.",
          "Transcribe Audio File sends a selected file through TypeWhisper.",
          "Get Last Transcription returns the latest text to the next Shortcut action.",
          "Copy Last Transcription places the latest result on the clipboard.",
        ],
        callout: {
          title: "Action Button",
          description:
            "Create a Shortcut that runs Quick Dictation, then assign that Shortcut to the Action Button in iOS Settings. The same action can be placed in supported widgets.",
        },
      },
      {
        title: "See the Watch flow",
        image: {
          path: "/screenshots/ios/watch/02-recording.png",
          alt: "TypeWhisper recording in progress on Apple Watch",
          layout: "wide",
        },
        bullets: [
          "Private notifications can tell you when a Watch or Quick Dictation finishes processing.",
          "Recent Watch recordings remain visible on the Watch while the iPhone History holds the full result.",
          "If a transfer is delayed, keep the devices connected and open TypeWhisper on the iPhone.",
        ],
      },
    ],
    next: "privacy-and-premium",
  },
  "privacy-and-premium": {
    eyebrow: "Control and ownership",
    title: "Privacy, cloud providers, and Premium",
    description:
      "Understand what stays on the device, what a selected provider receives, why keyboard Full Access is needed, and which features require Premium.",
    intro:
      "Core local dictation, dictionary, snippets, and the keyboard do not require an account or subscription. Cloud processing and Premium are optional layers with separate data paths.",
    sections: [
      {
        title: "What stays local",
        bullets: [
          "On-device engines process recording audio on the iPhone or iPad.",
          "TypeWhisper does not include advertising or third-party tracking.",
          "Local History, dictionary, snippets, profiles, and model files remain in the app's storage unless you enable an export or sync feature.",
          "Normal keyboard typing works without Full Access.",
        ],
      },
      {
        title: "When data leaves the device",
        bullets: [
          "A cloud speech engine receives audio only when you configure and select that provider.",
          "A cloud writing provider receives the text required for the writing action you run.",
          "Keyboard Full Access lets the keyboard and main TypeWhisper app share the short-lived recording state and result. The main app performs microphone capture.",
          "Premium entitlement requests carry account, device, and purchase status, not dictionary or snippet contents.",
        ],
      },
      {
        title: "What Premium adds",
        bullets: [
          "Improve a fresh transcript and teach TypeWhisper trusted corrections.",
          "Create reviewable email drafts with a subject and body.",
          "Sync dictionary entries and snippets between signed-in iPhone and iPad installations.",
          "Optionally sync History and Inbox text and metadata. Audio sync applies only to new entries after you enable it.",
        ],
        callout: {
          title: "Your selected cloud location",
          description:
            "Choose automatic iCloud or a folder through Apple's Files picker. Synced content transfers through that location and does not pass through the TypeWhisper entitlement service.",
        },
      },
      {
        title: "Enable or remove sync",
        steps: [
          {
            title: "Open Settings > Premium",
            description:
              "Sign in with Apple, then activate or restore Premium.",
          },
          {
            title: "Choose the sync mode",
            description:
              "Use Automatic iCloud, select a cloud folder, or leave sync off.",
          },
          {
            title: "Choose History and audio scope",
            description:
              "History and Inbox sync is optional. Enabling audio affects only entries created after that setting is turned on.",
          },
          {
            title: "Disconnect or delete the sync folder",
            description:
              "Removing the cloud operations does not delete the local dictionary and snippets from the current device.",
          },
        ],
      },
    ],
    next: "troubleshooting",
  },
  troubleshooting: {
    eyebrow: "Solve the common cases",
    title: "Troubleshooting iPhone, iPad, keyboard, and Watch",
    description:
      "Fix missing permissions, model downloads, keyboard return flow, Watch transfers, cloud providers, and Premium sync.",
    intro:
      "Start with the exact entry point that failed. A recording in the app, keyboard dictation, Watch transfer, file import, and sync each have a different dependency.",
    sections: [
      {
        title: "The App Store download does not work",
        paragraphs: [
          "Open the official App Store product page from the iOS overview. If the download is unavailable, confirm that the device runs iOS 18 or iPadOS 18 or later, check that you are signed in to the App Store, and retry. Include Apple's exact message when contacting support.",
        ],
      },
      {
        title: "Recording or local transcription does not start",
        bullets: [
          "Open iOS Settings > Privacy & Security > Microphone and confirm TypeWhisper is enabled.",
          "If you selected Apple Speech, confirm Speech Recognition permission is enabled too.",
          "Open TypeWhisper's model manager and confirm the selected local model finished downloading and compiling.",
          "Check available device storage and retry a paused or failed model download on a reliable connection.",
          "Disconnect an unexpected Bluetooth audio route or select the intended microphone, then run a short test.",
        ],
      },
      {
        title: "The keyboard is missing or does not insert text",
        bullets: [
          "Add TypeWhisper under Settings > General > Keyboard > Keyboards > Add New Keyboard.",
          "Enable Allow Full Access for voice dictation and the shared result path.",
          "Open the main app once, complete its microphone and speech permissions, and run a test recording there.",
          "Use a normal text field for testing. iOS does not allow third-party keyboards in some secure fields.",
          "After tapping the keyboard microphone, return through the previous-app link and keep the TypeWhisper keyboard selected until insertion finishes.",
        ],
      },
      {
        title: "A Watch or Quick Dictation is stuck in Inbox",
        bullets: [
          "Keep the iPhone and Watch connected by Bluetooth or Wi-Fi and open TypeWhisper on the iPhone.",
          "Check free storage on the Watch before starting another long recording.",
          "Open the Inbox item to see whether recording transfer or transcription failed, then retry the failed step.",
          "Enable TypeWhisper notifications if you want a private alert when background processing completes.",
        ],
      },
      {
        title: "Cloud processing or Premium sync fails",
        bullets: [
          "Confirm the selected provider credential and network connection, then test with a short recording.",
          "Switch to an on-device engine to separate provider problems from microphone or model problems.",
          "For Premium sync, confirm Sign in with Apple, active entitlement, selected sync mode, and access to the chosen Files folder.",
          "Use Sync Now after reconnecting the folder. Re-select a folder when iOS reports that access is no longer available.",
        ],
        callout: {
          title: "Still stuck?",
          description:
            "Include the iOS version, device model, selected engine and profile, capture source, and the exact visible error when contacting hello@typewhisper.com.",
        },
      },
    ],
  },
};

const de: Record<IosDocSlug, IosDocPage> = {
  installation: {
    eyebrow: "iOS einrichten",
    title: "Installation und erste Einrichtung",
    description:
      "Voraussetzungen, Berechtigungen, lokale Modelle, Tastatur-Aktivierung und die erste Testaufnahme mit TypeWhisper auf iPhone und iPad.",
    intro:
      "TypeWhisper 1.0 ist für iPhone und iPad im App Store verfügbar. Diese Anleitung führt dich von der Installation über Berechtigungen und lokale Modelle bis zur Tastatur-Einrichtung und ersten Aufnahme.",
    sections: [
      {
        title: "Vor der Installation",
        bullets: [
          "iOS 18 oder iPadOS 18 oder neuer",
          "watchOS 11 oder neuer für die optionale Apple-Watch-App",
          "Genügend freier Speicher für heruntergeladene lokale Modelle",
          "Internetzugang für App- und Modell-Downloads sowie optionale Cloud-Anbieter",
        ],
        callout: {
          title: "Aktuelle Verfügbarkeit",
          description:
            "Lade TypeWhisper nur über die offizielle App-Store-Seite aus dieser Dokumentation. Installiere keine Builds oder Profile aus inoffiziellen Quellen.",
        },
      },
      {
        title: "Geführte Einrichtung abschließen",
        steps: [
          {
            title: "TypeWhisper öffnen",
            description:
              "Folge der geführten Einrichtung und lies, wie Aufnahmen, lokale Engines und optionale Anbieter funktionieren.",
          },
          {
            title: "Mikrofon erlauben",
            description:
              "TypeWhisper benötigt den Mikrofonzugriff für Aufnahmen aus App, Tastatur, Kurzbefehlen, Widgets und dem Watch-Ablauf.",
          },
          {
            title: "Spracherkennung erlauben",
            description:
              "Diese Berechtigung wird für Apple Speech verwendet. Andere lokale Engines verwalten ihre heruntergeladenen Modelle in der App.",
          },
          {
            title: "Engine und Modell wählen",
            description:
              "Starte mit Apple Speech ohne großen Einrichtungsaufwand oder lade ein WhisperKit- oder Parakeet-Modell für einen vollständig lokalen Modell-Ablauf.",
          },
          {
            title: "Kurzen Test durchführen",
            description:
              "Nimm einen Satz auf, stoppe und prüfe, ob Live-Text und finales Ergebnis im Verlauf erscheinen.",
          },
        ],
        image: {
          path: "/screenshots/ios/01-recording.png",
          alt: "TypeWhisper-Aufnahme mit Live-Transkription auf dem iPhone",
          layout: "phone",
        },
      },
      {
        title: "Optionale Einrichtung nach der ersten Aufnahme",
        bullets: [
          "Füge die TypeWhisper-Tastatur hinzu, wenn du in andere Apps diktieren möchtest.",
          "Installiere die Watch-App, wenn du Aufnahmen am Handgelenk starten möchtest.",
          "Lege TypeWhisper-Aktionen in Kurzbefehle oder weise Quick Dictation der Aktionstaste zu.",
          "Aktiviere private Ergebnis-Mitteilungen, wenn Hintergrundaufnahmen fertig verarbeitet sind.",
        ],
      },
    ],
    next: "dictation-and-keyboard",
  },
  "dictation-and-keyboard": {
    eyebrow: "Tägliches Diktieren",
    title: "Diktat und Diktier-Tastatur",
    description:
      "In TypeWhisper aufnehmen, in andere iOS-Apps diktieren, Vollzugriff bewusst aktivieren, Profile wechseln und den Tastatur-Rückweg verstehen.",
    intro:
      "Du kannst direkt in TypeWhisper diktieren oder die TypeWhisper-Tastatur in einer anderen App verwenden. In beiden Fällen übernimmt die Haupt-App Mikrofonaufnahme und Transkription.",
    sections: [
      {
        title: "In der App aufnehmen",
        steps: [
          {
            title: "Profil wählen",
            description:
              "Wähle Sprache, Engine, Modell, Übersetzungsziel und die gewünschte Ausgabeform.",
          },
          {
            title: "Aufnahme starten",
            description:
              "Tippe auf das Mikrofon. Wellenform und Live-Text zeigen, dass TypeWhisper Sprache empfängt und verarbeitet.",
          },
          {
            title: "Pausieren oder stoppen",
            description:
              "Pausiere für eine Unterbrechung, setze dieselbe Aufnahme fort oder stoppe für das finale Ergebnis.",
          },
          {
            title: "Ergebnis prüfen",
            description:
              "Vergleiche Rohtext und verarbeiteten Text, kopiere oder teile ihn, wende ein anderes Profil an oder behalte ihn im Verlauf.",
          },
        ],
      },
      {
        title: "TypeWhisper-Tastatur hinzufügen",
        steps: [
          {
            title: "Tastatur hinzufügen",
            description:
              "Öffne Einstellungen > Allgemein > Tastatur > Tastaturen > Tastatur hinzufügen und wähle TypeWhisper.",
          },
          {
            title: "Vollen Zugriff erlauben",
            description:
              "Öffne den TypeWhisper-Eintrag und aktiviere Vollzugriff. Normales Tippen funktioniert ohne ihn, Diktat und gemeinsamer Rückgabezustand benötigen ihn.",
          },
          {
            title: "Im Textfeld auswählen",
            description:
              "Öffne Notizen oder ein anderes normales Textfeld, halte die Globus-Taste gedrückt und wähle TypeWhisper.",
          },
        ],
        callout: {
          title: "Warum sich die Haupt-App öffnet",
          description:
            "iOS-Tastaturerweiterungen dürfen Mikrofon-Audio nicht direkt aufnehmen. Die Taste öffnet TypeWhisper für Aufnahme und Transkription; die Erweiterung tauscht nur gewählten Zustand und Ergebnis über den gemeinsamen App-Container aus.",
        },
        image: {
          path: "/screenshots/ios/03-keyboard.png",
          alt: "TypeWhisper-Diktier-Tastatur in einem iPhone-Textfeld",
          layout: "phone",
        },
      },
      {
        title: "Aus einer anderen App diktieren",
        steps: [
          {
            title: "Tastatur-Mikrofon antippen",
            description:
              "TypeWhisper öffnet sich und startet eine Tastatur-Aufnahme. Kehre über den Link zur vorherigen App oben links ins ursprüngliche Textfeld zurück.",
          },
          {
            title: "Sprechen und stoppen",
            description:
              "Sprich bei aktiver TypeWhisper-Tastatur und tippe danach erneut auf deren Mikrofon-Taste.",
          },
          {
            title: "Einfügung abwarten",
            description:
              "Die Haupt-App beendet die Transkription und die Tastatur setzt das Ergebnis ins ursprüngliche Textfeld ein.",
          },
        ],
        bullets: [
          "Profile direkt über die Tastatur wechseln.",
          "Tastaturlayouts für Deutsch, Englisch, Spanisch, Französisch und Italienisch nutzen.",
          "Normal tippen, Zahlen und Satzzeichen eingeben, wischen, Vorschläge verwenden und die Tastatur wechseln.",
          "Snippets erweitern oder ausgewählten Text mit einem passenden Profil verarbeiten.",
        ],
      },
    ],
    next: "profiles-and-processing",
  },
  "profiles-and-processing": {
    eyebrow: "Erkennung und Ausgabe",
    title: "Profile, Engines und Verarbeitung",
    description:
      "Lokale oder optionale Cloud-Erkennung wählen, zweckbezogene Profile anlegen, lokal übersetzen und Transkripte verfeinern, ohne das Original zu verlieren.",
    intro:
      "Ein Profil bündelt Erkennungs- und Schreiboptionen für eine Aufgabe. Lege getrennte Profile für schnelle Notizen, leises Sprechen, Meetings, Übersetzung oder strukturierte Texte an.",
    sections: [
      {
        title: "Sprach-Engine wählen",
        bullets: [
          "Apple Speech benötigt wenig Einrichtung und kann Live-Ergebnisse über Apples Sprachframework liefern.",
          "WhisperKit bietet heruntergeladene Whisper-Modelle für mehrsprachige lokale Transkription.",
          "Parakeet stellt einen schnellen lokalen Modellpfad für unterstützte Sprachen bereit.",
          "Optionale Cloud-Engines werden erst verwendet, wenn du einen Anbieter einrichtest und auswählst.",
        ],
        callout: {
          title: "Lokal ist Standard",
          description:
            "Mit einer lokalen Engine bleiben Aufnahme und Transkription auf dem Gerät. Bei einer Cloud-Engine wird Audio zur Transkription an den ausgewählten Anbieter gesendet.",
        },
      },
      {
        title: "Ein hilfreiches Profil bauen",
        steps: [
          {
            title: "Zweck benennen",
            description:
              "Nutze Aufgabenbezeichnungen wie Schnelle Notiz, Meeting-Notizen, Ins Englische übersetzen oder Fokussiertes Schreiben.",
          },
          {
            title: "Sprache, Engine und Modell festlegen",
            description:
              "Wähle ein festes Modell für reproduzierbare Ergebnisse oder die automatische Route für eine passende Auswahl durch TypeWhisper.",
          },
          {
            title: "Übersetzung und Flüstermodus wählen",
            description:
              "Lege bei Bedarf ein Übersetzungsziel fest. Der Flüstermodus ist für leisere Sprache gedacht und passt die Aufnahme an.",
          },
          {
            title: "Schreibergebnis wählen",
            description:
              "Behalte den Rohtext, wende eine Formatierungsanweisung an oder nutze eine verfügbare strukturierte Schreibaktion.",
          },
        ],
        image: {
          path: "/screenshots/ios/ipad/05-profiles.png",
          alt: "TypeWhisper-Profileinstellungen auf dem iPad",
          layout: "tablet",
        },
      },
      {
        title: "Vor der Weiterverwendung prüfen",
        paragraphs: [
          "TypeWhisper bewahrt das ursprüngliche Erkennungsergebnis neben dem verarbeiteten Text auf. So kannst du vergleichen, was die Sprach-Engine gehört hat und was Formatierung oder Übersetzung daraus gemacht haben.",
          "Apple Translate kann diktierten Text lokal übersetzen. Premium-Schreibfunktionen können ein frisches Transkript verbessern, bestätigte Korrekturen lernen und prüfbare E-Mail-Entwürfe mit Betreff und Text erstellen.",
        ],
      },
    ],
    next: "files-history-and-inbox",
  },
  "files-history-and-inbox": {
    eyebrow: "Erfassen und prüfen",
    title: "Dateien, Verlauf und Capture Inbox",
    description:
      "Vorhandenes Audio und Video transkribieren, Ergebnisse nach Gerät durchsuchen, Roh- und Ausgabetext prüfen und Hintergrundaufnahmen in der Inbox abarbeiten.",
    intro:
      "Der Verlauf ist das vollständige Archiv. Die Capture Inbox ist die fokussierte Warteschlange für Aufnahmen aus anderen Einstiegspunkten oder Ergebnisse, die noch Aufmerksamkeit benötigen.",
    sections: [
      {
        title: "Audio- oder Videodatei transkribieren",
        steps: [
          {
            title: "Datei-Transkription starten",
            description:
              "Wähle eine Datei über Apples Dateiauswahl oder starte die Aktion Audiodatei transkribieren in Kurzbefehle.",
          },
          {
            title: "Profil wählen",
            description:
              "Lege Sprache, Engine, Modell, Übersetzung und Ausgabeform für diese Datei fest.",
          },
          {
            title: "Verarbeitung abwarten",
            description:
              "Halte die App verfügbar, während ein lokales Modell geladen oder die Datei an einen ausgewählten Cloud-Anbieter übergeben wird.",
          },
          {
            title: "Im Verlauf prüfen",
            description:
              "Öffne das Ergebnis, spiele verfügbares Audio ab, vergleiche Roh- und finalen Text oder wende ein anderes Profil an.",
          },
        ],
      },
      {
        title: "Verlauf als zentrale Ablage nutzen",
        bullets: [
          "Vergangene Transkriptionen durchsuchen.",
          "Einträge nach Gerät und Aufnahmequelle filtern oder durchsehen.",
          "Original und verarbeiteten Text in der Detailansicht vergleichen.",
          "Eine weitere Aufnahme anhängen, den Text bearbeiten oder einen Inbox-Eintrag abschließen.",
        ],
        image: {
          path: "/screenshots/ios/04-history.png",
          alt: "TypeWhisper-Verlauf und Capture Inbox auf dem iPhone",
          layout: "phone",
        },
      },
      {
        title: "Capture Inbox abarbeiten",
        paragraphs: [
          "Quick Dictations, Apple-Watch-Aufnahmen, Kalenderentwürfe und fehlgeschlagene Aufnahmen mit Handlungsbedarf erscheinen in der Inbox. Ein Badge und optionale private Mitteilungen machen neue Ergebnisse sichtbar.",
          "Auf dem iPad trennt die Seitenleiste Inbox, gesamten Verlauf und Gerätequellen. Wähle einen Eintrag, prüfe ihn, korrigiere eine fehlgeschlagene Verarbeitung oder markiere ihn als erledigt.",
        ],
        image: {
          path: "/screenshots/ios/ipad/03-inbox.png",
          alt: "TypeWhisper Capture Inbox und Gerätefilter auf dem iPad",
          layout: "tablet",
        },
      },
    ],
    next: "dictionary-and-snippets",
  },
  "dictionary-and-snippets": {
    eyebrow: "Wiederverwendbare Sprache",
    title: "Wörterbuch und Snippets",
    description:
      "TypeWhisper Namen und Fachbegriffe beibringen, bestätigte Korrekturen anlegen und kurze Auslöser in wiederverwendbaren Text mit dynamischen Platzhaltern verwandeln.",
    intro:
      "Das Wörterbuch verbessert wiederkehrendes Vokabular. Snippets ersetzen nach der Transkription einen kurzen gesprochenen oder getippten Auslöser durch längeren Text.",
    sections: [
      {
        title: "Persönliches Wörterbuch aufbauen",
        steps: [
          {
            title: "Begriff hinzufügen",
            description:
              "Füge Namen, Produkte, Abkürzungen oder Fachbegriffe hinzu, die zuverlässiger erkannt werden sollen.",
          },
          {
            title: "Bei Bedarf Korrektur hinterlegen",
            description:
              "Ordne einer wiederkehrenden falschen Form exakt den Text zu, den TypeWhisper verwenden soll.",
          },
          {
            title: "Mit der aktiven Engine testen",
            description:
              "Lokale Engines unterscheiden sich bei der Vokabelunterstützung. Teste kurz und passe Stärke oder Korrektur an, wenn verfügbar.",
          },
        ],
        image: {
          path: "/screenshots/ios/06-dictionary.png",
          alt: "TypeWhisper-Wörterbuch und Korrektur-Lernen auf dem iPhone",
          layout: "phone",
        },
      },
      {
        title: "Snippet erstellen",
        steps: [
          {
            title: "Merkbaren Auslöser wählen",
            description:
              "Nutze eine kurze Formulierung, die selten versehentlich vorkommt, etwa Meeting-Link oder Support-Signatur.",
          },
          {
            title: "Ersetzung schreiben",
            description:
              "Trage den vollständigen Text ein und entscheide, ob Groß- und Kleinschreibung beachtet werden soll.",
          },
          {
            title: "Dynamische Werte einsetzen",
            description:
              "Füge Datum, Uhrzeit, Datum und Uhrzeit oder Zwischenablage über die Chips im Editor ein.",
          },
          {
            title: "Nach dem Diktat verwenden",
            description:
              "Sprich oder tippe den Auslöser. TypeWhisper erweitert ihn nach der Transkription oder über die Diktier-Tastatur.",
          },
        ],
        code: [
          "{{DATE}}",
          "{{TIME}}",
          "{{DATETIME}}",
          "{{CLIPBOARD}}",
          "{{DATE:yyyy-MM-dd}}",
        ],
      },
      {
        title: "Nur synchronisieren, wenn du es willst",
        paragraphs: [
          "Wörterbuch und Snippets funktionieren lokal ohne Account oder Abo. Premium kann sie zwischen angemeldeten TypeWhisper-Installationen über automatisches iCloud oder einen mit Apples Dateiauswahl gewählten Cloud-Ordner synchronisieren.",
        ],
      },
    ],
    next: "watch-and-shortcuts",
  },
  "watch-and-shortcuts": {
    eyebrow: "Erfassen, ohne zuerst die App zu öffnen",
    title: "Apple Watch, Kurzbefehle, Widgets und Aktionstaste",
    description:
      "Am Handgelenk aufnehmen, Quick Dictations in der Inbox sammeln und Automationen aus den TypeWhisper-App-Aktionen bauen.",
    intro:
      "TypeWhisper kann über Apple Watch, Kurzbefehl, Widget oder Aktionstaste starten. Ergebnisse im Hintergrund landen zur späteren Prüfung in der Capture Inbox.",
    sections: [
      {
        title: "Mit der Apple Watch aufnehmen",
        steps: [
          {
            title: "TypeWhisper auf der Watch öffnen",
            description:
              "Wähle das verfügbare Profil und prüfe, ob genug Speicher für eine neue Aufnahme vorhanden ist.",
          },
          {
            title: "Am Handgelenk starten und stoppen",
            description:
              "Timer und Wellenform zeigen die laufende Aufnahme. Stoppe, wenn der Gedanke vollständig ist.",
          },
          {
            title: "Zum iPhone übertragen",
            description:
              "Die Watch sendet die Aufnahme zur gewählten Verarbeitung an TypeWhisper auf dem iPhone.",
          },
          {
            title: "In der Inbox prüfen",
            description:
              "Öffne Mitteilung oder Capture Inbox, kontrolliere das Transkript, wiederhole einen fehlgeschlagenen Schritt oder markiere es als erledigt.",
          },
        ],
      },
      {
        title: "Verfügbare Kurzbefehle-Aktionen",
        bullets: [
          "Quick Dictation startet oder stoppt eine Aufnahme und speichert das Ergebnis in der Inbox.",
          "Aufnahme starten, Aufnahme stoppen und Aufnahme pausieren oder fortsetzen steuern die aktive Aufnahme.",
          "Audiodatei transkribieren übergibt eine gewählte Datei an TypeWhisper.",
          "Letzte Transkription abrufen gibt den Text an die nächste Kurzbefehl-Aktion weiter.",
          "Letzte Transkription kopieren legt das Ergebnis in die Zwischenablage.",
        ],
        callout: {
          title: "Aktionstaste",
          description:
            "Erstelle einen Kurzbefehl mit Quick Dictation und weise ihn anschließend in den iOS-Einstellungen der Aktionstaste zu. Dieselbe Aktion kann in unterstützten Widgets liegen.",
        },
      },
      {
        title: "Watch-Ablauf ansehen",
        image: {
          path: "/screenshots/ios/watch/02-recording.png",
          alt: "Laufende TypeWhisper-Aufnahme auf der Apple Watch",
          layout: "wide",
        },
        bullets: [
          "Private Mitteilungen können melden, wenn Watch-Aufnahme oder Quick Dictation fertig verarbeitet sind.",
          "Letzte Watch-Aufnahmen bleiben auf der Uhr sichtbar; der vollständige Eintrag liegt im iPhone-Verlauf.",
          "Bei verzögerter Übertragung beide Geräte verbunden lassen und TypeWhisper auf dem iPhone öffnen.",
        ],
      },
    ],
    next: "privacy-and-premium",
  },
  "privacy-and-premium": {
    eyebrow: "Kontrolle und Eigentum",
    title: "Datenschutz, Cloud-Anbieter und Premium",
    description:
      "Verstehen, was auf dem Gerät bleibt, was ein gewählter Anbieter erhält, warum die Tastatur Vollzugriff braucht und welche Funktionen Premium benötigen.",
    intro:
      "Lokales Diktieren, Wörterbuch, Snippets und Tastatur benötigen weder Account noch Abo. Cloud-Verarbeitung und Premium sind optionale Ebenen mit getrennten Datenwegen.",
    sections: [
      {
        title: "Was lokal bleibt",
        bullets: [
          "Lokale Engines verarbeiten Aufnahme-Audio auf iPhone oder iPad.",
          "TypeWhisper enthält keine Werbung und kein Drittanbieter-Tracking.",
          "Lokaler Verlauf, Wörterbuch, Snippets, Profile und Modelle bleiben im App-Speicher, solange du keinen Export oder Sync aktivierst.",
          "Normales Tippen mit der Tastatur funktioniert ohne Vollzugriff.",
        ],
      },
      {
        title: "Wann Daten das Gerät verlassen",
        bullets: [
          "Eine Cloud-Sprach-Engine erhält Audio nur, wenn du diesen Anbieter einrichtest und auswählst.",
          "Ein Cloud-Schreibanbieter erhält den Text, der für die von dir gestartete Schreibaktion nötig ist.",
          "Der Tastatur-Vollzugriff erlaubt Tastatur und Haupt-App, kurzlebigen Aufnahmezustand und Ergebnis zu teilen. Die Haupt-App nimmt das Mikrofon auf.",
          "Premium-Berechtigungsanfragen enthalten Account-, Geräte- und Kaufstatus, nicht Wörterbuch- oder Snippet-Inhalte.",
        ],
      },
      {
        title: "Was Premium ergänzt",
        bullets: [
          "Ein frisches Transkript verbessern und TypeWhisper bestätigte Korrekturen beibringen.",
          "Prüfbare E-Mail-Entwürfe mit Betreff und Text erstellen.",
          "Wörterbuch und Snippets zwischen angemeldeten iPhone- und iPad-Installationen synchronisieren.",
          "Optional Text und Metadaten aus Verlauf und Inbox synchronisieren. Audio-Sync gilt nur für neue Einträge nach der Aktivierung.",
        ],
        callout: {
          title: "Dein gewählter Cloud-Speicher",
          description:
            "Wähle automatisches iCloud oder einen Ordner über Apples Dateiauswahl. Synchronisierte Inhalte laufen über diesen Speicher und nicht über den TypeWhisper-Berechtigungsdienst.",
        },
      },
      {
        title: "Sync aktivieren oder entfernen",
        steps: [
          {
            title: "Einstellungen > Premium öffnen",
            description:
              "Melde dich mit Apple an und aktiviere Premium oder stelle den Kauf wieder her.",
          },
          {
            title: "Sync-Modus wählen",
            description:
              "Nutze automatisches iCloud, wähle einen Cloud-Ordner oder lasse Sync ausgeschaltet.",
          },
          {
            title: "Verlauf und Audio festlegen",
            description:
              "Verlauf- und Inbox-Sync sind optional. Audio betrifft nur Einträge, die nach dem Einschalten entstehen.",
          },
          {
            title: "Sync-Ordner trennen oder löschen",
            description:
              "Das Entfernen der Cloud-Vorgänge löscht lokale Wörterbuch- und Snippet-Daten nicht vom aktuellen Gerät.",
          },
        ],
      },
    ],
    next: "troubleshooting",
  },
  troubleshooting: {
    eyebrow: "Häufige Fälle lösen",
    title: "Fehlerbehebung für iPhone, iPad, Tastatur und Watch",
    description:
      "Fehlende Berechtigungen, Modell-Downloads, Tastatur-Rückweg, Watch-Übertragung, Cloud-Anbieter und Premium-Sync prüfen.",
    intro:
      "Beginne beim genauen Einstiegspunkt des Fehlers. App-Aufnahme, Tastatur-Diktat, Watch-Transfer, Dateiimport und Sync haben jeweils andere Voraussetzungen.",
    sections: [
      {
        title: "Der App-Store-Download funktioniert nicht",
        paragraphs: [
          "Öffne die offizielle App-Store-Produktseite über die iOS-Übersicht. Falls der Download nicht verfügbar ist, prüfe iOS 18 beziehungsweise iPadOS 18 oder neuer, die Anmeldung im App Store und versuche es erneut. Nenne beim Support die genaue Meldung von Apple.",
        ],
      },
      {
        title: "Aufnahme oder lokale Transkription startet nicht",
        bullets: [
          "Öffne iOS-Einstellungen > Datenschutz & Sicherheit > Mikrofon und prüfe, ob TypeWhisper aktiviert ist.",
          "Prüfe bei Apple Speech zusätzlich die Berechtigung für Spracherkennung.",
          "Öffne die Modellverwaltung in TypeWhisper und prüfe, ob das gewählte Modell vollständig geladen und kompiliert ist.",
          "Prüfe den freien Gerätespeicher und setze einen pausierten oder fehlgeschlagenen Download bei stabiler Verbindung fort.",
          "Trenne eine unerwartete Bluetooth-Audioquelle oder wähle das gewünschte Mikrofon und teste erneut.",
        ],
      },
      {
        title: "Tastatur fehlt oder setzt keinen Text ein",
        bullets: [
          "Füge TypeWhisper unter Einstellungen > Allgemein > Tastatur > Tastaturen > Tastatur hinzufügen hinzu.",
          "Aktiviere Vollen Zugriff für Diktat und gemeinsamen Rückgabeweg.",
          "Öffne die Haupt-App einmal, erteile Mikrofon- und Sprachberechtigung und teste dort eine Aufnahme.",
          "Teste in einem normalen Textfeld. iOS erlaubt Drittanbieter-Tastaturen in manchen sicheren Feldern nicht.",
          "Kehre nach dem Tastatur-Mikrofon über den Link zur vorherigen App zurück und lasse die TypeWhisper-Tastatur bis zur Einfügung gewählt.",
        ],
      },
      {
        title: "Watch-Aufnahme oder Quick Dictation hängt in der Inbox",
        bullets: [
          "Lasse iPhone und Watch über Bluetooth oder WLAN verbunden und öffne TypeWhisper auf dem iPhone.",
          "Prüfe vor längeren Aufnahmen den freien Speicher auf der Watch.",
          "Öffne den Inbox-Eintrag, um zu sehen, ob Übertragung oder Transkription fehlgeschlagen ist, und wiederhole diesen Schritt.",
          "Aktiviere TypeWhisper-Mitteilungen, wenn du über abgeschlossene Hintergrundverarbeitung informiert werden möchtest.",
        ],
      },
      {
        title: "Cloud-Verarbeitung oder Premium-Sync schlägt fehl",
        bullets: [
          "Prüfe Zugangsdaten und Netzwerkverbindung des gewählten Anbieters mit einer kurzen Aufnahme.",
          "Wechsle auf eine lokale Engine, um Anbieterprobleme von Mikrofon- oder Modellproblemen zu trennen.",
          "Prüfe für Premium-Sync Apple-Anmeldung, aktive Berechtigung, gewählten Modus und Zugriff auf den Cloud-Ordner.",
          "Nutze Jetzt synchronisieren nach dem erneuten Verbinden. Wähle einen Ordner neu, wenn iOS den Zugriff nicht mehr bereitstellt.",
        ],
        callout: {
          title: "Noch nicht gelöst?",
          description:
            "Nenne beim Kontakt an hello@typewhisper.com iOS-Version, Gerätemodell, Engine, Profil, Aufnahmequelle und die sichtbare Fehlermeldung.",
        },
      },
    ],
  },
};

const pages: Record<Locale, Record<IosDocSlug, IosDocPage>> = { en, de };

export function getIosDocPage(locale: Locale, slug: IosDocSlug): IosDocPage {
  return pages[locale][slug];
}

export function getIosDocTitle(locale: Locale, slug: IosDocSlug): string {
  return pages[locale][slug].title;
}

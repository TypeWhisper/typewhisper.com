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

/** A tutorial video shown in the section, with a link to its page. */
export interface IosDocTutorial {
  /** Slug in `src/data/tutorials.ts`. */
  slug: string;
  /** Link text to the tutorial page. */
  link: string;
}

export interface IosDocSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: IosDocStep[];
  code?: string[];
  callout?: IosDocCallout;
  image?: IosDocImage;
  tutorial?: IosDocTutorial;
}

export interface IosDocPage {
  eyebrow: string;
  title: string;
  description: string;
  /** May carry version placeholders; the page resolves them. */
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
      "TypeWhisper {iosVersion} is available from the App Store for iPhone and iPad. This guide takes you from installation through permissions, local models, keyboard setup, and your first recording.",
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
              "Record one sentence, stop, and check the final result in History. Live preview depends on the selected engine.",
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
          "Add the Start Recording control to Control Center, or assign it to the Action Button on supported iPhone models.",
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
      "Record in TypeWhisper, add the keyboard, dictate into other apps, get back to your text field, keep the keyboard ready, and use it next to a hardware keyboard on iPad.",
    intro:
      "You can dictate in TypeWhisper itself or use the TypeWhisper keyboard in another app. In both cases the TypeWhisper app records and transcribes.",
    sections: [
      {
        title: "Record in the app",
        steps: [
          {
            title: "Choose a format",
            description:
              "On the Record tab, the format decides what happens to the text after transcription. Dictation keeps the transcript as it is. All Formats shows the full list.",
          },
          {
            title: "Start recording",
            description:
              "Tap the record button. The waveform shows the audio level. Speech recognition with a live preview also shows the text while you speak.",
          },
          {
            title: "Pause or stop",
            description:
              "Pause and resume the same recording as often as you need. To stop, hold the stop button briefly.",
          },
          {
            title: "Review the result",
            description:
              "Copy or share the text, have it read aloud, apply another format, or find it later in History.",
          },
        ],
        bullets: [
          "The speech recognition menu on the Record tab switches the model for the next recording.",
          "Format Text on the Record tab formats pasted or typed text without a recording.",
        ],
      },
      {
        title: "Add the TypeWhisper keyboard",
        steps: [
          {
            title: "Open the keyboard settings",
            description:
              "In TypeWhisper, open Settings > Keyboard. The Setup section shows whether the keyboard is enabled and Full Access is verified.",
          },
          {
            title: "Add the keyboard",
            description:
              "Tap Keyboard Enabled. iOS Settings opens on the TypeWhisper page. Tap Keyboards there and turn on TypeWhisper. You can also add it under Settings > General > Keyboard > Keyboards > Add New Keyboard.",
          },
          {
            title: "Enable Allow Full Access",
            description:
              "Turn on Allow Full Access for the TypeWhisper keyboard. Normal typing works without it, but voice dictation requires it.",
          },
          {
            title: "Select it in a text field",
            description:
              "Open Notes or another standard text field, hold the globe key, and choose TypeWhisper. Opening the keyboard once also lets the app verify Full Access.",
          },
        ],
        callout: {
          title: "Why the main app opens",
          description:
            "iOS keyboard extensions cannot capture microphone audio directly. That is why the first dictation opens TypeWhisper. The app records and transcribes, and the keyboard inserts the result.",
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
              "The first dictation opens TypeWhisper, which starts the keyboard recording.",
          },
          {
            title: "Return to your text field",
            description:
              "TypeWhisper shows the hint Swipe up, then left at the bottom of the screen. Follow it, or tap the previous-app link at the top left.",
          },
          {
            title: "Speak and stop",
            description:
              "Speak while the TypeWhisper keyboard is in front, then tap its microphone again to stop.",
          },
          {
            title: "Wait for insertion",
            description:
              "TypeWhisper finishes the transcription and the keyboard inserts the text at the cursor.",
          },
        ],
        bullets: [
          "Instead of tapping, you can hold the microphone to talk and release it to insert the text.",
          "The undo button in the top bar removes the dictation you just inserted.",
          "iOS does not allow third-party keyboards in password fields and in some apps. Apple's keyboard appears there instead.",
        ],
      },
      {
        title: "Stay ready for the next dictation",
        paragraphs: [
          "After the first dictation, TypeWhisper stays ready in the background. Later dictations start directly from the keyboard, without opening the app again.",
        ],
        bullets: [
          "Keep Ready for Next Dictation under Settings > Keyboard > Keyboard Dictation is on by default, with a Ready Duration of 5 minutes.",
          "Set the Ready Duration to between 1 and 30 minutes, or turn the option off.",
          "The iOS microphone indicator can stay visible until that time runs out. Shorten the duration or turn the option off to end it sooner.",
          "Music and other audio keep their volume while TypeWhisper stays ready.",
          "Once the time has run out, the next dictation opens TypeWhisper again.",
        ],
      },
      {
        title: "Formats and tools in the top bar",
        bullets: [
          "Tap a format in the top bar to use it for the next dictation. More Formats shows the full list.",
          "Right after a dictation, tap a format to apply it to the text you just inserted.",
          "Select up to 4,000 characters and tap a format to rewrite the selection.",
          "Quick Fix corrects spelling and grammar in the selected text or in the paragraph before the cursor. You can undo it for 30 seconds.",
          "Type a snippet's trigger and a space to insert the snippet, or pick one with the Snippets button. Delete right after to get the trigger back.",
          "With the Email format, Reply to copied mail uses an email you copied beforehand as context for your reply.",
          "Formats that write with a downloaded local model work in the TypeWhisper app, but not in the keyboard. With your Mac as the writing service, dictation works, but rewriting text inside the keyboard needs another writing service.",
          "Change the order of the formats under Settings > Smart Formatting. Show or hide the Quick Fix and Snippets buttons under Settings > Keyboard > Top Bar.",
        ],
      },
      {
        title: "Keyboard modes, iPad, and hardware keyboards",
        bullets: [
          "On iPad, the key at the bottom right of the layout hides the TypeWhisper keyboard.",
          "Settings > Keyboard > Keyboard Mode offers Full Keyboard and Tools Only. Tools Only keeps the top bar and one row with the globe key, the microphone, delete, and return, without letter keys, for when you type with another keyboard.",
          "Tools Only with Hardware Keyboard is on by default. While a hardware keyboard such as the Magic Keyboard is connected, the TypeWhisper keyboard then shows only its tools, and the letter keys return when you detach it.",
        ],
        callout: {
          title: "Next to a hardware keyboard",
          description:
            "iPadOS hides third-party keyboards while a hardware keyboard is attached. The TypeWhisper keyboard appears next to a hardware keyboard only if the onscreen keyboard is turned on under Settings > Accessibility > Touch > AssistiveTouch.",
        },
      },
      {
        title: "Typing and keyboard options",
        paragraphs: [
          "All keyboard options are under Settings > Keyboard in TypeWhisper.",
        ],
        bullets: [
          "Keyboard Layout: Automatic, English, Deutsch, Español, Français, Italiano, or 简体中文（拼音）. The layout changes only the keys. Dictation continues to use your Input Languages.",
          "Chinese with Pinyin: type Pinyin and choose Simplified Chinese characters above the keys. Space inserts the first candidate, Return the typed letters. Words you choose come first next time and stay on the device.",
          "Key Size in Compact, Standard, or Large, and Character Preview, which enlarges each letter above your finger.",
          "Auto-Capitalization, the “.” Shortcut for a period after a double tap on the space bar, Word Suggestions, Swipe to Type with Show Swipe Trail, and Expand Snippets While Typing.",
          "Key Sounds and Haptics.",
          "With Premium, Learn Typed Words adds unfamiliar words you type with the TypeWhisper keyboard to your Dictionary.",
          "Reset Keyboard Settings returns every option on this page to its default.",
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
          "Apple Speech can provide live results through the system speech framework when on-device recognition is available for your language and device.",
          "WhisperKit offers downloaded Whisper models for multilingual on-device transcription.",
          "Parakeet provides local recognition for supported languages. It returns the transcript after processing rather than a streaming preview.",
          "Optional cloud engines, such as Meta with Muse Voice Transcribe, are used only after you configure and select a provider.",
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
      {
        title: "Choose a writing service",
        paragraphs: [
          "Formatting instructions and structured writing actions run through a writing service. Choose it under Settings > Writing Services.",
        ],
        bullets: [
          "Apple Intelligence processes writing text on the device where it is available.",
          "Downloaded local models run entirely on the device and do not require Apple Intelligence. TypeWhisper offers LFM2.5 2.6B (about 1.7 GB) and Gemma 4 E2B (about 2.8 GB). You review the model license before the download starts.",
          "Cloud services such as OpenAI, OpenRouter, and Meta with Muse Spark run under your own account with that provider. The Meta API key is shared with Meta speech recognition.",
          "Swipe the row of a local model to pause or remove its download.",
        ],
        callout: {
          title: "What a writing service receives",
          description:
            "Local models and Apple Intelligence keep writing text on the device. A cloud service receives only the text needed for the selected writing task, not audio, History, or the dictionary.",
        },
        tutorial: {
          slug: "compare-local-writing-models",
          link: "Compare the local writing models step by step",
        },
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
          alt: "TypeWhisper dictionary with terms and corrections on iPhone",
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
      {
        title: "Import and export the dictionary",
        steps: [
          {
            title: "Open the menu in the Dictionary tab",
            description:
              "Tap the menu at the top right and choose Import from Another App.",
          },
          {
            title: "Choose the file",
            description:
              "TypeWhisper reads TypeWhisper JSON, compatible JSON, Wispr Flow-compatible CSV, and plain text lists.",
          },
          {
            title: "Check the preview",
            description:
              "The preview shows the detected format, the terms and corrections that are ready to import, duplicates, invalid rows, and the first entries.",
          },
          {
            title: "Import",
            description:
              "Existing entries and duplicates stay unchanged. The import runs entirely on the device.",
          },
        ],
        bullets: [
          "Export Dictionary in the same menu saves your entries as a JSON file.",
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
      "TypeWhisper can start from the Apple Watch, Control Center, a Shortcut, a widget, or the Action Button. Background results are collected in Capture Inbox for later review.",
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
      {
        title: "Start from Control Center or the Action Button",
        paragraphs: [
          "The Start Recording control starts a new TypeWhisper recording, also when TypeWhisper is not open. TypeWhisper lists the same steps under Settings > Control Center & Action Button.",
        ],
        steps: [
          {
            title: "Add the control to Control Center",
            description:
              "Open Control Center and tap the add button. Tap Add a Control, search for TypeWhisper, then choose Start Recording.",
          },
          {
            title: "Assign it to the Action Button",
            description:
              "In iOS Settings, open Action Button and swipe to Controls. Choose Start Recording from TypeWhisper. This works on supported iPhone models.",
          },
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
          "Apple Intelligence and downloaded writing models process writing text entirely on the device.",
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
      "Fix missing permissions, model downloads and preparation, the keyboard return flow, hardware keyboards on iPad, Watch transfers, cloud providers, and Premium sync.",
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
          "Open Settings > Speech Recognition in TypeWhisper and confirm the selected local model finished downloading and preparing.",
          "Check available device storage and retry a paused or failed model download on a reliable connection.",
          "Fast Local needs at least 4 GB of memory and Live Local at least 6 GB. On devices with less, the app says so instead of loading the model.",
          "If iOS closed TypeWhisper while a local model was being prepared, the app explains the likely cause and does not load that model again on its own. Try again under Settings > Speech Recognition, or choose Apple Speech.",
          "Disconnect an unexpected Bluetooth audio route or select the intended microphone, then run a short test.",
        ],
      },
      {
        title: "Speech recognition or the keyboard seems stuck on preparing",
        bullets: [
          "The first preparation of a local speech model can take a few minutes, longer on iPad. Later starts are much faster.",
          "Open TypeWhisper and keep it open until Preparing speech recognition… is done. Settings > Speech Recognition shows the status of the model.",
          "Run a short recording in the app first, then dictate from the keyboard.",
          "If you need text right away, choose Apple Speech, which needs no download.",
        ],
      },
      {
        title: "The keyboard is missing or does not insert text",
        bullets: [
          "Add TypeWhisper under Settings > General > Keyboard > Keyboards > Add New Keyboard, or tap Keyboard Enabled under Settings > Keyboard in TypeWhisper.",
          "Enable Allow Full Access for voice dictation and the shared result path.",
          "Open the main app once, complete its microphone and speech permissions, and run a test recording there.",
          "Use a normal text field for testing. iOS does not allow third-party keyboards in some secure fields.",
          "After tapping the keyboard microphone, return with the hint Swipe up, then left or through the previous-app link, and keep the TypeWhisper keyboard selected until insertion finishes.",
          "A format marked Setup Required in the keyboard needs speech recognition or a writing service first.",
        ],
      },
      {
        title: "The keyboard is missing next to a Magic Keyboard",
        bullets: [
          "iPadOS hides third-party keyboards while a hardware keyboard is attached.",
          "Turn on the onscreen keyboard under Settings > Accessibility > Touch > AssistiveTouch. The TypeWhisper keyboard then appears next to the hardware keyboard.",
          "With a hardware keyboard connected, the TypeWhisper keyboard shows only its tools. To keep the letter keys, turn off Tools Only with Hardware Keyboard under Settings > Keyboard > Keyboard Mode.",
          "To hide the TypeWhisper keyboard on iPad, tap the key at the bottom right.",
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
          "For TypeWhisper on Mac, both devices need the same local network, TypeWhisper for Mac 1.8 or later, and access to Premium features. The Mac must allow paired devices.",
          "For Premium sync, confirm Sign in with Apple, active entitlement, selected sync mode, and access to the chosen Files folder.",
          "Use Sync Now after reconnecting the folder. Re-select a folder when iOS reports that access is no longer available.",
        ],
        callout: {
          title: "Still stuck?",
          description:
            "Include the iOS version, device model, selected speech recognition and format, capture source, and the exact visible error when contacting hello@typewhisper.com.",
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
      "TypeWhisper {iosVersion} ist für iPhone und iPad im App Store verfügbar. Diese Anleitung führt dich von der Installation über Berechtigungen und lokale Modelle bis zur Tastatur-Einrichtung und ersten Aufnahme.",
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
              "Nimm einen Satz auf, stoppe und prüfe das finale Ergebnis im Verlauf. Live-Text erscheint nur bei einer Engine mit Streaming-Unterstützung.",
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
          "Füge „Aufnahme starten“ zum Kontrollzentrum hinzu oder weise es auf unterstützten iPhone-Modellen der Aktionstaste zu.",
          "Lege TypeWhisper-Aktionen in Kurzbefehle oder weise Schnelldiktat der Aktionstaste zu.",
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
      "In TypeWhisper aufnehmen, die Tastatur hinzufügen, in andere Apps diktieren, zum Textfeld zurückkehren, die Tastatur bereit halten und sie auf dem iPad neben einer Hardware-Tastatur nutzen.",
    intro:
      "Du kannst direkt in TypeWhisper diktieren oder die TypeWhisper-Tastatur in einer anderen App verwenden. In beiden Fällen nimmt die TypeWhisper-App auf und transkribiert.",
    sections: [
      {
        title: "In der App aufnehmen",
        steps: [
          {
            title: "Format wählen",
            description:
              "Im Tab „Aufnehmen“ legt das Format fest, was nach der Transkription mit dem Text passiert. „Diktat“ lässt das Transkript unverändert. „Alle Formate“ zeigt die ganze Liste.",
          },
          {
            title: "Aufnahme starten",
            description:
              "Tippe auf die Aufnahmetaste. Die Wellenform zeigt den Audiopegel. Eine Spracherkennung mit Live-Vorschau zeigt den Text schon beim Sprechen.",
          },
          {
            title: "Pausieren oder stoppen",
            description:
              "Pausiere dieselbe Aufnahme und setze sie fort, so oft du möchtest. Zum Stoppen hältst du die Stopptaste kurz gedrückt.",
          },
          {
            title: "Ergebnis prüfen",
            description:
              "Kopiere oder teile den Text, lass ihn vorlesen, wende ein anderes Format an oder finde ihn später im Verlauf.",
          },
        ],
        bullets: [
          "Das Spracherkennungsmenü im Tab „Aufnehmen“ wechselt das Modell für die nächste Aufnahme.",
          "„Text formatieren“ im Tab „Aufnehmen“ formatiert eingefügten oder getippten Text ohne Aufnahme.",
        ],
      },
      {
        title: "TypeWhisper-Tastatur hinzufügen",
        steps: [
          {
            title: "Tastatureinstellungen öffnen",
            description:
              "Öffne in TypeWhisper Einstellungen > Tastatur. Der Abschnitt „Einrichtung“ zeigt, ob die Tastatur aktiviert und der Vollzugriff bestätigt ist.",
          },
          {
            title: "Tastatur hinzufügen",
            description:
              "Tippe auf „Tastatur aktiviert“. Die iOS-Einstellungen öffnen sich auf der TypeWhisper-Seite. Tippe dort auf „Tastaturen“ und schalte TypeWhisper ein. Alternativ fügst du sie unter Einstellungen > Allgemein > Tastatur > Tastaturen > Tastatur hinzufügen hinzu.",
          },
          {
            title: "Vollen Zugriff erlauben",
            description:
              "Schalte für die TypeWhisper-Tastatur „Vollen Zugriff erlauben“ ein. Normales Tippen funktioniert ohne ihn, das Diktieren braucht ihn.",
          },
          {
            title: "Im Textfeld auswählen",
            description:
              "Öffne Notizen oder ein anderes normales Textfeld, halte die Globustaste gedrückt und wähle TypeWhisper. Sobald du die Tastatur einmal geöffnet hast, kann die App auch den Vollzugriff bestätigen.",
          },
        ],
        callout: {
          title: "Warum sich die Haupt-App öffnet",
          description:
            "iOS-Tastaturerweiterungen dürfen Mikrofon-Audio nicht direkt aufnehmen. Deshalb öffnet das erste Diktat TypeWhisper. Die App nimmt auf und transkribiert, die Tastatur fügt das Ergebnis ein.",
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
              "Das erste Diktat öffnet TypeWhisper, und die App startet die Tastaturaufnahme.",
          },
          {
            title: "Zum Textfeld zurückkehren",
            description:
              "TypeWhisper zeigt unten den Hinweis „Nach oben, dann nach links wischen“. Folge ihm oder tippe oben links auf den Link zur vorherigen App.",
          },
          {
            title: "Sprechen und stoppen",
            description:
              "Sprich, während die TypeWhisper-Tastatur im Vordergrund ist, und tippe zum Stoppen erneut auf ihr Mikrofon.",
          },
          {
            title: "Einfügung abwarten",
            description:
              "TypeWhisper schließt die Transkription ab, und die Tastatur fügt den Text am Cursor ein.",
          },
        ],
        bullets: [
          "Statt zu tippen, kannst du das Mikrofon gedrückt halten, um zu sprechen. Beim Loslassen wird der Text eingefügt.",
          "Die Zurücknehmen-Taste in der oberen Leiste entfernt das gerade eingefügte Diktat.",
          "In Passwortfeldern und einzelnen Apps lässt iOS keine Tastaturen von Drittanbietern zu. Dort erscheint Apples Tastatur.",
        ],
      },
      {
        title: "Für das nächste Diktat bereit bleiben",
        paragraphs: [
          "Nach dem ersten Diktat bleibt TypeWhisper im Hintergrund bereit. Weitere Diktate starten dann direkt aus der Tastatur, ohne dass sich die App erneut öffnet.",
        ],
        bullets: [
          "„Für nächstes Diktat bereit halten“ unter Einstellungen > Tastatur > Tastatur-Diktat ist standardmäßig eingeschaltet, mit einer Bereitschaftsdauer von 5 Minuten.",
          "Stelle die Bereitschaftsdauer auf 1 bis 30 Minuten ein oder schalte die Option aus.",
          "Die iOS-Mikrofonanzeige kann sichtbar bleiben, bis diese Zeit abgelaufen ist. Verkürze die Dauer oder schalte die Option aus, damit sie früher verschwindet.",
          "Musik und anderes Audio behalten ihre Lautstärke, während TypeWhisper bereit bleibt.",
          "Ist die Zeit abgelaufen, öffnet das nächste Diktat wieder TypeWhisper.",
        ],
      },
      {
        title: "Formate und Werkzeuge in der oberen Leiste",
        bullets: [
          "Tippe in der oberen Leiste auf ein Format, um es für das nächste Diktat zu verwenden. „Weitere Formate“ zeigt die ganze Liste.",
          "Tippe direkt nach einem Diktat auf ein Format, um es auf den gerade eingefügten Text anzuwenden.",
          "Markiere bis zu 4.000 Zeichen und tippe auf ein Format, um die Auswahl umzuschreiben.",
          "Die Schnellkorrektur korrigiert Rechtschreibung und Grammatik im markierten Text oder im Absatz vor dem Cursor. 30 Sekunden lang kannst du sie rückgängig machen.",
          "Tippe den Auslöser eines Textbausteins und ein Leerzeichen, um ihn einzufügen, oder wähle einen über die Taste „Textbausteine“. Löschst du direkt danach, kommt der Auslöser zurück.",
          "Im Format „E-Mail“ nutzt „Auf kopierte Mail antworten“ eine zuvor kopierte E-Mail als Kontext für deine Antwort.",
          "Formate, die mit einem geladenen lokalen Modell schreiben, funktionieren in der TypeWhisper-App, aber nicht in der Tastatur. Mit deinem Mac als Schreibdienst funktioniert das Diktieren, das Umschreiben von Text in der Tastatur braucht aber einen anderen Schreibdienst.",
          "Die Reihenfolge der Formate änderst du unter Einstellungen > Intelligente Formatierung. Die Tasten „Schnellkorrektur“ und „Textbausteine“ blendest du unter Einstellungen > Tastatur > Obere Leiste ein oder aus.",
        ],
      },
      {
        title: "Tastaturmodus, iPad und Hardware-Tastaturen",
        bullets: [
          "Auf dem iPad blendet die Taste unten rechts im Layout die TypeWhisper-Tastatur aus.",
          "Unter Einstellungen > Tastatur > Tastaturmodus wählst du „Volle Tastatur“ oder „Nur Werkzeuge“. „Nur Werkzeuge“ behält die obere Leiste und eine Zeile mit Globustaste, Mikrofon, Löschtaste und Zeilenumbruch, ohne Buchstabentasten, wenn du mit einer anderen Tastatur tippst.",
          "„Nur Werkzeuge mit Hardware-Tastatur“ ist standardmäßig eingeschaltet. Solange eine Hardware-Tastatur wie das Magic Keyboard verbunden ist, zeigt die TypeWhisper-Tastatur dann nur ihre Werkzeuge, und die Buchstabentasten kommen zurück, sobald du sie abnimmst.",
        ],
        callout: {
          title: "Neben einer Hardware-Tastatur",
          description:
            "iPadOS blendet Tastaturen von Drittanbietern aus, solange eine Hardware-Tastatur verbunden ist. Neben einer Hardware-Tastatur erscheint die TypeWhisper-Tastatur nur, wenn die Bildschirmtastatur unter Einstellungen > Bedienungshilfen > Tippen > AssistiveTouch eingeschaltet ist.",
        },
      },
      {
        title: "Tippen und Tastatur-Optionen",
        paragraphs: [
          "Alle Tastatur-Optionen findest du in TypeWhisper unter Einstellungen > Tastatur.",
        ],
        bullets: [
          "Tastaturlayout: Automatisch, English, Deutsch, Español, Français, Italiano oder 简体中文（拼音）. Das Layout ändert nur die Tasten. Das Diktat verwendet weiterhin deine Eingabesprachen.",
          "Chinesisch mit Pinyin: Tippe Pinyin und wähle die vereinfachten chinesischen Schriftzeichen über den Tasten. Die Leertaste fügt den ersten Vorschlag ein, der Zeilenumbruch die getippten Buchstaben. Gewählte Wörter stehen beim nächsten Mal vorn und bleiben auf dem Gerät.",
          "Tastengröße in Kompakt, Standard oder Groß und die Zeichenvorschau, die jeden Buchstaben über deinem Finger vergrößert.",
          "Auto-Großschreibung, der Kurzbefehl „.“ für einen Punkt nach doppeltem Tippen auf die Leertaste, Wortvorschläge, „Wischen zum Tippen“ mit „Wischspur anzeigen“ und „Textbausteine beim Tippen ersetzen“.",
          "Tastentöne und Haptik.",
          "Mit Premium nimmt „Getippte Wörter lernen“ unbekannte Wörter, die du mit der TypeWhisper-Tastatur tippst, in dein Wörterbuch auf.",
          "„Tastatureinstellungen zurücksetzen“ setzt alle Optionen dieser Seite auf die Standardwerte zurück.",
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
          "Apple Speech benötigt wenig Einrichtung und kann Live-Ergebnisse über Apples Sprachframework liefern. Die lokale Verfügbarkeit hängt von Sprache und Gerät ab.",
          "WhisperKit bietet heruntergeladene Whisper-Modelle für mehrsprachige lokale Transkription.",
          "Parakeet erkennt unterstützte Sprachen lokal. Das Transkript erscheint nach der Verarbeitung; eine Streaming-Vorschau unterstützt diese iOS-Engine nicht.",
          "Optionale Cloud-Engines wie Meta mit Muse Voice Transcribe werden erst verwendet, wenn du einen Anbieter einrichtest und auswählst.",
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
      {
        title: "Schreibdienst wählen",
        paragraphs: [
          "Formatierungsanweisungen und strukturierte Schreibaktionen laufen über einen Schreibdienst. Du wählst ihn unter Einstellungen > Schreibdienste.",
        ],
        bullets: [
          "Apple Intelligence verarbeitet Text auf dem Gerät, wenn es dort verfügbar ist.",
          "Geladene lokale Modelle laufen vollständig auf dem Gerät und benötigen kein Apple Intelligence. TypeWhisper bietet LFM2.5 2.6B (etwa 1,7 GB) und Gemma 4 E2B (etwa 2,8 GB). Vor dem Download siehst du die Modelllizenz.",
          "Cloud-Dienste wie OpenAI, OpenRouter und Meta mit Muse Spark laufen über dein eigenes Konto beim Anbieter. Der Meta-API-Schlüssel gilt auch für die Meta-Spracherkennung.",
          "Wische über die Zeile eines lokalen Modells, um den Download zu pausieren oder zu entfernen.",
        ],
        callout: {
          title: "Was ein Schreibdienst erhält",
          description:
            "Lokale Modelle und Apple Intelligence behalten den Text auf dem Gerät. Ein Cloud-Dienst erhält nur den Text, der für die gewählte Schreibaufgabe nötig ist, aber weder Audio noch Verlauf oder Wörterbuch.",
        },
        tutorial: {
          slug: "compare-local-writing-models",
          link: "Lokale Schreibmodelle vergleichen, Schritt für Schritt",
        },
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
          "Schnelldiktate, Apple-Watch-Aufnahmen, Kalenderentwürfe und fehlgeschlagene Aufnahmen mit Handlungsbedarf erscheinen in der Inbox. Ein Badge und optionale private Mitteilungen machen neue Ergebnisse sichtbar.",
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
    title: "Wörterbuch und Textbausteine",
    description:
      "TypeWhisper Namen und Fachbegriffe beibringen, bestätigte Korrekturen anlegen und kurze Auslöser in wiederverwendbaren Text mit dynamischen Platzhaltern verwandeln.",
    intro:
      "Das Wörterbuch verbessert wiederkehrendes Vokabular. Textbausteine ersetzen nach der Transkription einen kurzen gesprochenen oder getippten Auslöser durch längeren Text.",
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
          alt: "TypeWhisper-Wörterbuch mit Begriffen und Korrekturen auf dem iPhone",
          layout: "phone",
        },
      },
      {
        title: "Textbaustein erstellen",
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
          "Wörterbuch und Textbausteine funktionieren lokal ohne Account oder Abo. Premium kann sie zwischen angemeldeten TypeWhisper-Installationen über automatisches iCloud oder einen mit Apples Dateiauswahl gewählten Cloud-Ordner synchronisieren.",
        ],
      },
      {
        title: "Wörterbuch importieren und exportieren",
        steps: [
          {
            title: "Menü im Tab Wörterbuch öffnen",
            description:
              "Tippe oben rechts auf das Menü und wähle „Aus anderer App importieren“.",
          },
          {
            title: "Datei wählen",
            description:
              "TypeWhisper liest TypeWhisper-JSON, kompatibles JSON, Wispr-Flow-kompatibles CSV und einfache Textlisten.",
          },
          {
            title: "Vorschau prüfen",
            description:
              "Die Vorschau zeigt das erkannte Format, die importbereiten Begriffe und Korrekturen, Duplikate, ungültige Zeilen und die ersten Einträge.",
          },
          {
            title: "Importieren",
            description:
              "Vorhandene Einträge und Duplikate bleiben unverändert. Der Import läuft vollständig auf dem Gerät.",
          },
        ],
        bullets: [
          "„Wörterbuch exportieren“ im selben Menü speichert deine Einträge als JSON-Datei.",
        ],
      },
    ],
    next: "watch-and-shortcuts",
  },
  "watch-and-shortcuts": {
    eyebrow: "Erfassen, ohne zuerst die App zu öffnen",
    title: "Apple Watch, Kurzbefehle, Widgets und Aktionstaste",
    description:
      "Am Handgelenk aufnehmen, Schnelldiktate in der Inbox sammeln und Automationen aus den TypeWhisper-App-Aktionen bauen.",
    intro:
      "TypeWhisper kann über Apple Watch, Kontrollzentrum, Kurzbefehl, Widget oder Aktionstaste starten. Ergebnisse im Hintergrund landen zur späteren Prüfung in der Capture Inbox.",
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
          "Schnelldiktat startet oder stoppt eine Aufnahme und speichert das Ergebnis in der Inbox.",
          "Aufnahme starten, Aufnahme stoppen und Aufnahme pausieren oder fortsetzen steuern die aktive Aufnahme.",
          "Audiodatei transkribieren übergibt eine gewählte Datei an TypeWhisper.",
          "Letzte Transkription abrufen gibt den Text an die nächste Kurzbefehl-Aktion weiter.",
          "Letzte Transkription kopieren legt das Ergebnis in die Zwischenablage.",
        ],
        callout: {
          title: "Aktionstaste",
          description:
            "Erstelle einen Kurzbefehl mit Schnelldiktat und weise ihn anschließend in den iOS-Einstellungen der Aktionstaste zu. Dieselbe Aktion kann in unterstützten Widgets liegen.",
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
          "Private Mitteilungen können melden, wenn Watch-Aufnahme oder Schnelldiktat fertig verarbeitet sind.",
          "Letzte Watch-Aufnahmen bleiben auf der Uhr sichtbar; der vollständige Eintrag liegt im iPhone-Verlauf.",
          "Bei verzögerter Übertragung beide Geräte verbunden lassen und TypeWhisper auf dem iPhone öffnen.",
        ],
      },
      {
        title: "Über Kontrollzentrum oder Aktionstaste starten",
        paragraphs: [
          "Das Steuerelement „Aufnahme starten“ startet eine neue TypeWhisper-Aufnahme, auch wenn TypeWhisper nicht geöffnet ist. Dieselben Schritte findest du in TypeWhisper unter Einstellungen > Kontrollzentrum & Aktionstaste.",
        ],
        steps: [
          {
            title: "Steuerelement zum Kontrollzentrum hinzufügen",
            description:
              "Öffne das Kontrollzentrum und tippe auf die Hinzufügen-Taste. Tippe auf „Steuerelement hinzufügen“, suche nach TypeWhisper und wähle „Aufnahme starten“.",
          },
          {
            title: "Der Aktionstaste zuweisen",
            description:
              "Öffne in den iOS-Einstellungen „Aktionstaste“ und streiche zu „Steuerelemente“. Wähle „Aufnahme starten“ von TypeWhisper. Das funktioniert auf unterstützten iPhone-Modellen.",
          },
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
      "Lokales Diktieren, Wörterbuch, Textbausteine und Tastatur benötigen weder Account noch Abo. Cloud-Verarbeitung und Premium sind optionale Ebenen mit getrennten Datenwegen.",
    sections: [
      {
        title: "Was lokal bleibt",
        bullets: [
          "Lokale Engines verarbeiten Aufnahme-Audio auf iPhone oder iPad.",
          "Apple Intelligence und geladene Schreibmodelle verarbeiten Text vollständig auf dem Gerät.",
          "TypeWhisper enthält keine Werbung und kein Drittanbieter-Tracking.",
          "Lokaler Verlauf, Wörterbuch, Textbausteine, Profile und Modelle bleiben im App-Speicher, solange du keinen Export oder Sync aktivierst.",
          "Normales Tippen mit der Tastatur funktioniert ohne Vollzugriff.",
        ],
      },
      {
        title: "Wann Daten das Gerät verlassen",
        bullets: [
          "Eine Cloud-Sprach-Engine erhält Audio nur, wenn du diesen Anbieter einrichtest und auswählst.",
          "Ein Cloud-Schreibanbieter erhält den Text, der für die von dir gestartete Schreibaktion nötig ist.",
          "Der Tastatur-Vollzugriff erlaubt Tastatur und Haupt-App, kurzlebigen Aufnahmezustand und Ergebnis zu teilen. Die Haupt-App nimmt das Mikrofon auf.",
          "Premium-Berechtigungsanfragen enthalten Account-, Geräte- und Kaufstatus, nicht Wörterbuch- oder Textbaustein-Inhalte.",
        ],
      },
      {
        title: "Was Premium ergänzt",
        bullets: [
          "Ein frisches Transkript verbessern und TypeWhisper bestätigte Korrekturen beibringen.",
          "Prüfbare E-Mail-Entwürfe mit Betreff und Text erstellen.",
          "Wörterbuch und Textbausteine zwischen angemeldeten iPhone- und iPad-Installationen synchronisieren.",
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
              "Das Entfernen der Cloud-Vorgänge löscht lokale Wörterbuch- und Textbaustein-Daten nicht vom aktuellen Gerät.",
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
      "Fehlende Berechtigungen, Modell-Downloads und Modellvorbereitung, Tastatur-Rückweg, Hardware-Tastaturen am iPad, Watch-Übertragung, Cloud-Anbieter und Premium-Sync prüfen.",
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
          "Öffne in TypeWhisper Einstellungen > Spracherkennung und prüfe, ob das gewählte lokale Modell vollständig geladen und vorbereitet ist.",
          "Prüfe den freien Gerätespeicher und setze einen pausierten oder fehlgeschlagenen Download bei stabiler Verbindung fort.",
          "„Schnell und lokal“ braucht mindestens 4 GB Arbeitsspeicher, „Live lokal“ mindestens 6 GB. Auf Geräten mit weniger sagt die App das, statt das Modell zu laden.",
          "Hat iOS TypeWhisper beendet, während ein lokales Modell vorbereitet wurde, erklärt die App die wahrscheinliche Ursache und lädt dieses Modell nicht von selbst neu. Versuche es unter Einstellungen > Spracherkennung erneut oder wähle Apple Speech.",
          "Trenne eine unerwartete Bluetooth-Audioquelle oder wähle das gewünschte Mikrofon und teste erneut.",
        ],
      },
      {
        title: "Spracherkennung oder Tastatur hängt scheinbar bei der Vorbereitung",
        bullets: [
          "Die erste Vorbereitung eines lokalen Sprachmodells kann einige Minuten dauern, auf dem iPad länger. Spätere Starts gehen deutlich schneller.",
          "Öffne TypeWhisper und lass die App geöffnet, bis „Spracherkennung wird vorbereitet …“ fertig ist. Unter Einstellungen > Spracherkennung siehst du den Status des Modells.",
          "Mach zuerst eine kurze Aufnahme in der App und diktiere danach über die Tastatur.",
          "Brauchst du sofort Text, wähle Apple Speech. Es braucht keinen Download.",
        ],
      },
      {
        title: "Tastatur fehlt oder setzt keinen Text ein",
        bullets: [
          "Füge TypeWhisper unter Einstellungen > Allgemein > Tastatur > Tastaturen > Tastatur hinzufügen hinzu oder tippe in TypeWhisper unter Einstellungen > Tastatur auf „Tastatur aktiviert“.",
          "Aktiviere „Vollen Zugriff erlauben“ für Diktat und gemeinsamen Rückgabeweg.",
          "Öffne die Haupt-App einmal, erteile Mikrofon- und Sprachberechtigung und teste dort eine Aufnahme.",
          "Teste in einem normalen Textfeld. iOS erlaubt Drittanbieter-Tastaturen in manchen sicheren Feldern nicht.",
          "Kehre nach dem Tastatur-Mikrofon über den Hinweis „Nach oben, dann nach links wischen“ oder den Link zur vorherigen App zurück und lasse die TypeWhisper-Tastatur bis zur Einfügung gewählt.",
          "Ein Format, das in der Tastatur mit „Einrichtung erforderlich“ markiert ist, braucht zuerst eine Spracherkennung oder einen Schreibdienst.",
        ],
      },
      {
        title: "Tastatur fehlt neben einem Magic Keyboard",
        bullets: [
          "iPadOS blendet Tastaturen von Drittanbietern aus, solange eine Hardware-Tastatur verbunden ist.",
          "Schalte die Bildschirmtastatur unter Einstellungen > Bedienungshilfen > Tippen > AssistiveTouch ein. Die TypeWhisper-Tastatur erscheint dann neben der Hardware-Tastatur.",
          "Ist eine Hardware-Tastatur verbunden, zeigt die TypeWhisper-Tastatur nur ihre Werkzeuge. Möchtest du die Buchstabentasten behalten, schalte unter Einstellungen > Tastatur > Tastaturmodus „Nur Werkzeuge mit Hardware-Tastatur“ aus.",
          "Um die TypeWhisper-Tastatur auf dem iPad auszublenden, tippe auf die Taste unten rechts.",
        ],
      },
      {
        title: "Watch-Aufnahme oder Schnelldiktat hängt in der Inbox",
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
          "Für „TypeWhisper auf dem Mac“ brauchen beide Geräte dasselbe lokale Netzwerk, TypeWhisper für Mac ab Version 1.8 und Zugang zu den Premium-Funktionen. Der Mac muss gekoppelte Geräte erlauben.",
          "Prüfe für Premium-Sync Apple-Anmeldung, aktive Berechtigung, gewählten Modus und Zugriff auf den Cloud-Ordner.",
          "Nutze „Jetzt synchronisieren“ nach dem erneuten Verbinden. Wähle einen Ordner neu, wenn iOS den Zugriff nicht mehr bereitstellt.",
        ],
        callout: {
          title: "Noch nicht gelöst?",
          description:
            "Nenne beim Kontakt an hello@typewhisper.com iOS-Version, Gerätemodell, Spracherkennung, Format, Aufnahmequelle und die sichtbare Fehlermeldung.",
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

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
      "Requirements, guided setup, permissions, speech recognition, the first model preparation, and what to set up next for TypeWhisper on iPhone and iPad.",
    intro:
      "TypeWhisper {iosVersion} is available from the App Store for iPhone and iPad. This guide takes you from installation through guided setup, permissions, and speech recognition to your first recording.",
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
              "Guided setup starts on the first launch. You can go through it again later with Run Setup Assistant Again under Settings > General.",
          },
          {
            title: "Choose your languages",
            description:
              "Pick the language you dictate in or Automatic Detection, and a translation target if you want one. This does not change the app language.",
          },
          {
            title: "Choose speech recognition",
            description:
              "Apple Speech Recognition is built into iOS and iPadOS and needs no download. Fast & Offline downloads a local model that then runs on your device.",
          },
          {
            title: "Allow microphone and speech recognition",
            description:
              "Every recording needs microphone access. Speech recognition access is needed only for Apple Speech Recognition. On the same step you can choose a writing service or continue without one.",
          },
          {
            title: "Run the test recording",
            description:
              "Say a sentence and check the text. The test recording is temporary and is not saved to History.",
          },
        ],
        callout: {
          title: "The first preparation can take a few minutes",
          description:
            "A downloaded speech model is prepared for your device before its first use. During that time the app shows Preparing speech recognition… This can take a few minutes, longer on iPad. Keep TypeWhisper open until it finishes. Later starts are much faster.",
        },
        image: {
          path: "/screenshots/ios/01-recording.png",
          alt: "TypeWhisper recording with live transcription on iPhone",
          layout: "phone",
        },
      },
      {
        title: "Optional setup after the first recording",
        bullets: [
          "Add the TypeWhisper keyboard if you want to dictate into other apps. Settings > Keyboard shows what is still missing.",
          "Install the Watch app if you want to start recordings from your wrist.",
          "Add the Start Recording control to Control Center, or assign it to the Action Button on supported iPhone models.",
          "Add TypeWhisper actions in Shortcuts or assign Quick Dictation to the Action Button.",
          "Turn on Know When Recordings Are Ready under Settings > General if you want a private notification when a Quick Dictation or Apple Watch recording finishes processing.",
          "Add the Quick Capture widget to capture a thought and work through your Inbox from the Home Screen.",
        ],
      },
      {
        title: "Find your way around the app",
        bullets: [
          "The four tabs are History, Dictionary, Record, and Settings.",
          "Settings > General holds Input Languages, Read Aloud, Whisper Mode, and Recording Storage.",
          "Settings > Appearance changes the Waveform and the Color of the Record tab. The keyboard keeps its own design.",
          "Settings > Statistics shows active days, streaks, transcriptions, words, average words per minute, and time saved for a time period. Statistics stay on the device.",
          "What’s New in TypeWhisper under Settings > General shows the highlights of the latest update again.",
          "Send Feedback prepares an email that you can still edit in your mail app.",
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
        tutorial: {
          slug: "dictate-with-the-ios-keyboard",
          link: "Set up the keyboard and dictate, step by step",
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
    title: "Formats, speech recognition, and writing services",
    description:
      "Choose local or optional cloud speech recognition, create formats for recurring tasks, format typed text, translate on device, and compare the result with the original.",
    intro:
      "Speech recognition turns your voice into a transcript. A format decides what happens next: keep the transcript, clean it up, translate it, or write an email, a note, or a summary from it. The Apple Watch app lists your formats as Profiles.",
    sections: [
      {
        title: "Choose speech recognition",
        paragraphs: [
          "Choose the default under Settings > Speech Recognition. The speech recognition menu on the Record tab switches it for the next recording.",
        ],
        bullets: [
          "Apple Speech is built in and needs no download. On iOS and iPadOS 26 and later it uses SpeechAnalyzer, Apple's newer speech recognition. iOS downloads the model for each dictation language once in the background. Until it is ready, and for languages SpeechAnalyzer does not support yet, Apple Speech uses the previous on-device recognition.",
          "Fast Local (Parakeet) recognizes 25 European languages on the device and needs at least 4 GB of memory. Fast Local Ultra is more accurate.",
          "Live Local shows the text while you speak and runs on the device. It is part of Premium and needs at least 6 GB of memory.",
          "Additional Local Models offers WhisperKit in five model sizes from about 39 to 800 MB with 99 languages and automatic detection, and Cohere Transcribe (Local) with 14 languages and downloads from about 1.5 to 2.4 GB.",
          "TypeWhisper on Mac transcribes on your paired Mac with Premium.",
          "Cloud Speech Recognition offers Groq, Soniox, Reson8, ElevenLabs, OpenAI, Meta with Muse Voice Transcribe, and Gemini, each with your own API key. Add Server connects an OpenAI-compatible server.",
          "You see a live preview while you speak with Apple Speech, WhisperKit, Live Local, Soniox, ElevenLabs, OpenAI, Meta, and Gemini. Fast Local, Cohere Transcribe (Local), TypeWhisper on Mac, Groq, and Reson8 show the text after you stop.",
        ],
        callout: {
          title: "Local is the default",
          description:
            "With an on-device engine, recording and transcription stay on the device. Choosing a cloud engine sends audio to that selected provider for transcription. API keys are stored in the iOS Keychain.",
        },
      },
      {
        title: "Create a format",
        steps: [
          {
            title: "Open Smart Formatting",
            description:
              "Go to Settings > Smart Formatting and tap Create New Format.",
          },
          {
            title: "Choose a template",
            description:
              "The templates are Dictation, Cleaned Text, Email, Message, Note, Calendar Event, Meeting Notes, Checklist, Summary, Translation, and Custom Instruction. Email and Calendar Event are part of Premium.",
          },
          {
            title: "Set the languages",
            description:
              "Use your global Input Languages or a list for this format only. Translation needs a language under Translate To. Other templates can set an Output Language.",
          },
          {
            title: "Set style and length",
            description:
              "Email, Message, and Note offer a Writing Style: Automatic, Casual, Friendly, or Professional. Meeting Notes, Summary, Note, Email, and Message offer the Length Short, Medium, or Detailed. Custom Instruction takes your own instruction.",
          },
          {
            title: "Open Advanced when needed",
            description:
              "Give the format its own name, Speech Recognition, Writing Service, and Writing Model. You can also turn on Detect Speakers with Premium and override Audio Retention and Whisper Mode.",
          },
          {
            title: "Save and sort",
            description:
              "Tap Save. Drag formats to change their order in the format lists and in the keyboard, or turn a format off with its switch.",
          },
        ],
        image: {
          path: "/screenshots/ios/ipad/05-profiles.png",
          alt: "Smart Formatting with three formats on iPad",
          layout: "tablet",
        },
      },
      {
        title: "Compare the result with the original",
        paragraphs: [
          "TypeWhisper keeps the original transcript next to the result. On iPhone, the Text Version switch shows Result or Original. On iPad, both appear side by side on the Record tab and in History, and the words the format added, changed, or removed are highlighted. In a narrow iPad window the switch is back.",
          "Apply Another Format runs a different format on the same recording. The Translation format translates on device with Apple Translate.",
          "With Premium, Improve Transcript corrects a fresh transcript before a format is applied and learns the corrections you confirm. The Email and Calendar Event formats create drafts that you review before anything is sent or saved.",
        ],
      },
      {
        title: "Choose a writing service",
        paragraphs: [
          "Formats that rewrite text run through a writing service. Choose the default under Settings > Writing Services. A format can use its own service under Advanced. Dictation and Translation need no writing service.",
        ],
        bullets: [
          "Apple Intelligence processes writing text on the device where it is available.",
          "Downloaded local models run entirely on the device and do not require Apple Intelligence. TypeWhisper offers LFM2.5 2.6B (about 1.7 GB) and Gemma 4 E2B (about 2.8 GB). You review the model license before the download starts.",
          "Your Mac writes with the language models and workflows on your paired Mac with Premium.",
          "Cloud services such as OpenAI, OpenRouter, and Meta with Muse Spark run under your own account with that provider. The Meta API key is shared with Meta speech recognition. Add Writing Service connects another OpenAI-compatible service, also one on your local network.",
          "Swipe the row of a local model to pause or remove its download.",
          "Use No Writing Service keeps dictation and translation available.",
        ],
        callout: {
          title: "What a writing service receives",
          description:
            "Local models and Apple Intelligence keep writing text on the device. A cloud service or a service on your local network receives only the text needed for the selected writing task, not audio, History, or the dictionary.",
        },
        tutorial: {
          slug: "compare-local-writing-models",
          link: "Compare the local writing models step by step",
        },
      },
      {
        title: "Format text without a recording",
        steps: [
          {
            title: "Tap Format Text",
            description:
              "The button is at the top of the Record tab while no recording is running.",
          },
          {
            title: "Choose the format",
            description:
              "The Format row shows the selected format. Your choice also applies to the next recording.",
          },
          {
            title: "Paste or type the text",
            description:
              "The line below the field counts the characters and tells you when a text is too long.",
          },
          {
            title: "Tap Format",
            description:
              "The result appears as it does after a recording. With Dictation selected, the button reads Save and the text stays unchanged.",
          },
        ],
        bullets: [
          "History lists the entry with the source Text Input and without audio.",
          "Apply Another Format works on the same text afterwards.",
          "Typed text needs no speech recognition. A format that rewrites text needs a writing service.",
        ],
      },
      {
        title: "Transcribe and write with your Mac",
        paragraphs: [
          "With Premium, a paired Mac can transcribe your recordings, write for your formats with its language models, and run its text-processing workflows. This requires TypeWhisper for Mac 1.8 or later on the same local network and access to Premium features on both devices. The iOS overview shows the pairing steps.",
        ],
        bullets: [
          "Pair under Settings > Premium > Mac or under Settings > Speech Recognition > TypeWhisper on Mac.",
          "Use for Speech Recognition sends recordings encrypted to the Mac over the local network. Under Model on the Mac, choose a model or As Selected on the Mac.",
          "Use for Writing sets up the Mac as a writing service. Each workflow on the Mac also appears as a format at the end of your formats.",
          "Files you share to TypeWhisper from another app are always transcribed on the device.",
        ],
      },
    ],
    next: "files-history-and-inbox",
  },
  "files-history-and-inbox": {
    eyebrow: "Capture and review",
    title: "Files, History, and Capture Inbox",
    description:
      "Transcribe audio and video files, share files to TypeWhisper, search and filter History, detect speakers, ask questions about a transcript, and work through the Inbox.",
    intro:
      "History is the complete archive on the History tab. Capture Inbox, shown as Inbox in the app, is the focused queue for recordings that arrive from another entry point or still need your attention.",
    sections: [
      {
        title: "Transcribe an audio or video file",
        steps: [
          {
            title: "Open File Transcription",
            description:
              "Go to Settings > File Transcription and tap Add Audio or Video Files. The Transcribe Audio File action in Shortcuts works too.",
          },
          {
            title: "Choose the settings",
            description:
              "Set Language, Format, Speech Recognition, and Writing Service for these files. With Premium, Detect Speakers shows the transcript by speaker.",
          },
          {
            title: "Tap Transcribe All",
            description:
              "Files stay queued until they finish or you remove them. If processing is interrupted, open TypeWhisper and tap Resume.",
          },
          {
            title: "Open the result",
            description:
              "A finished file offers Open in History, Copy, and Share. Copy All Text collects every result.",
          },
        ],
        bullets: [
          "Transcribe Again runs a finished file once more with the current format and models and adds a second entry to History. That way you can compare two speech recognition or writing models on the same recording.",
          "Ogg Opus voice notes, including those from WhatsApp, can be imported.",
          "Files you add here keep their audio until you remove them or tap Reset.",
        ],
      },
      {
        title: "Share files to TypeWhisper",
        bullets: [
          "Share an audio or video file from another app, for example a voice note, and choose TypeWhisper in the share sheet.",
          "The file is saved to a queue. Open TypeWhisper to transcribe it.",
          "Shared files are transcribed on the device. You can apply a format afterwards in History.",
          "The queue under Settings > File Transcription shows the progress and picks up again after an interruption.",
          "A shared file can be up to 2 GB.",
        ],
      },
      {
        title: "Use History as the source of truth",
        bullets: [
          "Search past transcription text.",
          "Filter by source and format, and browse entries by the device that created them.",
          "Open an entry to compare Result and Original, play the audio, or have the text read aloud.",
          "The menu of an entry offers Copy, Share, Read Aloud, Apply Another Format, Recording Info, Add Recording, and Delete.",
          "Edit the result or the original.",
          "Entries from Format Text have the source Text Input and no audio.",
          "Playback and Read Aloud can use AirPlay, Bluetooth, or the speaker through Apple's audio route picker.",
          "Read Aloud uses the voices installed on your device. Reading Speed and Voices are under Settings > General.",
          "Audio and Transcripts under Settings > General > Recording Storage decide how long new recordings are kept.",
        ],
        image: {
          path: "/screenshots/ios/04-history.png",
          alt: "TypeWhisper History and Capture Inbox on iPhone",
          layout: "phone",
        },
      },
      {
        title: "Speakers, questions, and corrections with Premium",
        bullets: [
          "Detect Speakers separates speakers on the device after transcription. Turn it on for a format under Advanced, in File Transcription, or start it from the menu of a History entry. Meeting Notes detects speakers by default.",
          "Name Speakers gives the speakers names. In the transcript you can assign a turn to another speaker or split it.",
          "Recognize Voice in Future Recordings saves a voice profile that suggests the name in later recordings. Voice profiles stay on the device, are not synced, and contain no audio. You manage them under Settings > Voice Profiles.",
          "Similar voices and overlapping speech can lead to wrong assignments, which you correct in the transcript.",
          "Ask About Transcript answers questions about a recording with your selected writing service. The chat shows where text is sent and is not saved.",
          "Select misrecognized text in a transcript and choose Create Correction to add a dictionary correction for future transcriptions. The saved transcript stays unchanged.",
        ],
      },
      {
        title: "Work through Capture Inbox",
        paragraphs: [
          "Quick Dictations, Apple Watch recordings, calendar drafts, and failed captures that need attention appear in Inbox. A badge and optional private notification make new results visible without mixing them into an unfiltered list.",
          "On iPad, the sidebar separates Inbox, all History, and device sources. Select an item to review it or to fix a failed processing route. A finished Quick Dictation or Watch recording leaves the Inbox once you have opened it. A calendar draft stays until you add the event or discard the draft.",
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
      "Teach TypeWhisper names and specialist terms, add trusted corrections, and expand short triggers into reusable text with live placeholders, after dictation and in the keyboard.",
    intro:
      "The dictionary improves recurring vocabulary. Snippets replace a short spoken or typed trigger with a longer block of text.",
    sections: [
      {
        title: "Build your personal dictionary",
        steps: [
          {
            title: "Add a term",
            description:
              "On the Dictionary tab, open Terms and add a name, product, abbreviation, or specialist term that speech recognition should know.",
          },
          {
            title: "Add a correction when needed",
            description:
              "Under Corrections, map a recurring wrong form to the exact text you want TypeWhisper to use.",
          },
          {
            title: "Test with the active engine",
            description:
              "Local engines differ in vocabulary support. Run a short test and adjust recognition strength or the correction when available.",
          },
        ],
        bullets: [
          "With Premium, select misrecognized text in a transcript and choose Create Correction.",
          "With Premium, Learn Typed Words under Settings > Keyboard adds unfamiliar words you type with the TypeWhisper keyboard.",
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
              "Open Settings > Snippets and tap Create Snippet. Use a short phrase that is unlikely to occur accidentally, such as meeting link or support signature.",
          },
          {
            title: "Write the replacement",
            description:
              "Enter the complete text and decide whether matching should be Case Sensitive.",
          },
          {
            title: "Insert dynamic values",
            description:
              "Add date, time, date and time, or clipboard placeholders from the editor chips.",
          },
          {
            title: "Use it after dictation",
            description:
              "Say the trigger. TypeWhisper expands it after transcription.",
          },
        ],
        bullets: [
          "In the TypeWhisper keyboard, type the trigger and a space or return to insert the snippet. Delete right after to get the trigger back.",
          "The Snippets button in the keyboard's top bar lists your snippets.",
          "Expand Snippets While Typing under Settings > Keyboard turns the replacement while typing on or off.",
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
          "Dictionary and snippets work locally without an account or subscription. Premium can sync them between signed-in TypeWhisper installations through Automatic iCloud or a cloud folder selected with Apple's Files picker.",
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
          "Delete Entire Dictionary removes all terms and corrections. With Premium sync turned on, the deletion syncs to your other devices.",
        ],
      },
    ],
    next: "watch-and-shortcuts",
  },
  "watch-and-shortcuts": {
    eyebrow: "Capture without opening the app first",
    title: "Apple Watch, Shortcuts, widgets, and Action Button",
    description:
      "Record from your wrist and follow each recording, save Quick Dictations to Inbox, build automations from the TypeWhisper actions, and use Siri, CarPlay, and widgets.",
    intro:
      "TypeWhisper can start from the Apple Watch, Control Center, a Shortcut, Siri, a widget, or the Action Button. Background results are collected in Capture Inbox for later review.",
    sections: [
      {
        title: "Record from Apple Watch",
        steps: [
          {
            title: "Open TypeWhisper on the Watch",
            description:
              "Tap the profile or turn the Digital Crown to switch it. The Watch lists the formats from your iPhone as Profiles.",
          },
          {
            title: "Start and stop on your wrist",
            description:
              "The timer and waveform show the active capture. On supported models, double tap starts and stops the recording.",
          },
          {
            title: "Follow the transfer",
            description:
              "Each recording shows its status with haptics at every step: Waiting for iPhone, Transferring, Transcribing on iPhone, and Transcription ready.",
          },
          {
            title: "Review the result",
            description:
              "Open a transcription under Recent on the Watch to read it, have it read aloud, or share it. On the iPhone, open the notification or Capture Inbox to check the transcript or retry a failed route.",
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
          "With Premium, Ask About Last Recording answers a question about your latest recording.",
          "Quick Dictation and Start Recording accept a language, a format, and a translation target.",
        ],
        callout: {
          title: "Action Button",
          description:
            "Create a Shortcut that runs Quick Dictation, then assign that Shortcut to the Action Button in iOS Settings. The same action can be placed in supported widgets.",
        },
      },
      {
        title: "Complications, Smart Stack, and Control Center on the Watch",
        image: {
          path: "/screenshots/ios/watch/02-recording.png",
          alt: "TypeWhisper recording in progress on Apple Watch",
          layout: "wide",
        },
        bullets: [
          "The Record complication starts a recording from the watch face.",
          "The Latest Transcription widget shows your newest transcription in the Smart Stack.",
          "On watchOS 26, you can add a Start Recording control to Control Center on the Watch.",
          "Private notifications can tell you when a Watch or Quick Dictation finishes processing.",
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
      {
        title: "Siri, CarPlay, and widgets",
        bullets: [
          "Siri reads your latest note aloud, for example with “Read my latest note from TypeWhisper”.",
          "With Premium, Siri answers questions about your last recording, for example with “Ask TypeWhisper about my last recording”. The answer is read aloud and nothing is saved.",
          "“Pause TypeWhisper” and “Resume TypeWhisper” pause or resume a running recording.",
          "In CarPlay, a running recording shows buttons to pause and stop it.",
          "The Quick Capture widget captures a thought on the Home Screen, shows your Inbox, and marks items as done.",
          "During a recording on iPhone, the Lock Screen and the Dynamic Island show the waveform. With Live Text Outside the App under Settings > General, the latest live transcript can appear there too.",
        ],
      },
    ],
    next: "privacy-and-premium",
  },
  "privacy-and-premium": {
    eyebrow: "Control and ownership",
    title: "Privacy, cloud providers, and Premium",
    description:
      "Understand what stays on the device, what a selected provider or your Mac receives, why keyboard Full Access is needed, which features require Premium, and how to buy, restore, or redeem it.",
    intro:
      "Core local dictation, dictionary, snippets, and the keyboard do not require an account or subscription. Cloud processing and Premium are optional layers with separate data paths.",
    sections: [
      {
        title: "What stays local",
        bullets: [
          "On-device engines process recording audio on the iPhone or iPad.",
          "Apple Intelligence and downloaded writing models process writing text entirely on the device.",
          "TypeWhisper does not include advertising or third-party tracking.",
          "Local History, dictionary, snippets, formats, and model files remain in the app's storage unless you enable an export or sync feature.",
          "Voice profiles and statistics stay on the device that created them.",
          "Normal keyboard typing works without Full Access.",
        ],
      },
      {
        title: "When data leaves the device",
        bullets: [
          "A cloud speech engine receives audio only when you configure and select that provider.",
          "A cloud writing provider receives the text required for the writing action you run.",
          "TypeWhisper on Mac sends recordings and writing text encrypted to your paired Mac over the local network. Models selected on the Mac may use the cloud providers configured there.",
          "Ask About Transcript sends the transcript and your questions to your selected writing service only when you send a question.",
          "Keyboard Full Access lets the keyboard and main TypeWhisper app share the short-lived recording state and result. The main app performs microphone capture.",
          "Premium entitlement requests carry account, device, and purchase status, not dictionary or snippet contents.",
        ],
      },
      {
        title: "What Premium adds",
        bullets: [
          "Improve a fresh transcript and teach TypeWhisper trusted corrections.",
          "Create reviewable email drafts with a subject and body, and calendar events that you check before saving.",
          "Ask About Transcript answers questions about a recording with your selected writing service.",
          "Use Your Mac transcribes and writes with the models and workflows on your paired Mac. It requires TypeWhisper for Mac 1.8 or later on the same local network and access to Premium features on both devices.",
          "Separate speakers on the device, name them, and save optional local voice profiles.",
          "Use Live Local and copy the live transcript while a recording continues.",
          "Create dictionary corrections from selected transcript text, and let the keyboard learn the words you type.",
          "Sync dictionary entries and snippets between signed-in iPhone and iPad installations.",
          "Optionally sync History and Inbox text and metadata. Audio sync applies only to new entries after you enable it.",
        ],
        callout: {
          title: "Your selected cloud location",
          description:
            "Choose Automatic iCloud or a folder through Apple's Files picker. Synced content transfers through that location and does not pass through the TypeWhisper entitlement service.",
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
              "Set Mode to Automatic iCloud, Cloud Folder, or Off. For Cloud Folder, tap Choose Cloud Folder.",
          },
          {
            title: "Choose History and audio scope",
            description:
              "Sync History & Inbox is optional and adds your existing text. Sync Audio for New Entries affects only entries created after you turn it on.",
          },
          {
            title: "Check devices and sync",
            description:
              "Devices lists the devices that have synced. Sync Now starts a sync right away.",
          },
          {
            title: "Disconnect or delete the sync folder",
            description:
              "Disconnect Folder removes the folder selection. Delete Private Sync Folder deletes TypeWhisper's sync data from the selected cloud location. Local dictionary entries and snippets stay on the current device.",
          },
        ],
      },
      {
        title: "Buy, restore, or redeem Premium",
        bullets: [
          "Open Settings > Premium and sign in with Apple. Premium access works on iPhone and iPad.",
          "The Premium page shows the monthly subscription and the Lifetime purchase with their current App Store prices.",
          "Restore App Store Purchase brings back an earlier purchase.",
          "Redeem Code opens the App Store sheet for an offer code.",
          "Connect Existing TypeWhisper License activates this iPhone or iPad as one device of a license you already own. You enter the license key only on a secure TypeWhisper web page.",
          "Under Account you find Sign Out and Delete TypeWhisper Account. Deleting the account removes the account and entitlement link. Local entries and private cloud files are not deleted.",
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
      "Voraussetzungen, geführte Einrichtung, Berechtigungen, Spracherkennung, die erste Modellvorbereitung und die nächsten Schritte für TypeWhisper auf iPhone und iPad.",
    intro:
      "TypeWhisper {iosVersion} ist für iPhone und iPad im App Store verfügbar. Diese Anleitung führt dich von der Installation über die geführte Einrichtung, Berechtigungen und Spracherkennung bis zur ersten Aufnahme.",
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
              "Die geführte Einrichtung startet beim ersten Öffnen. Später gehst du sie über „Einrichtungsassistent erneut ausführen“ unter Einstellungen > Allgemein noch einmal durch.",
          },
          {
            title: "Sprachen wählen",
            description:
              "Wähle die Sprache, in der du diktierst, oder „Automatische Erkennung“ und auf Wunsch ein Übersetzungsziel. Die App-Sprache ändert sich dadurch nicht.",
          },
          {
            title: "Spracherkennung wählen",
            description:
              "„Apple Speech Spracherkennung“ ist in iOS und iPadOS eingebaut und braucht keinen Download. „Schnell & offline“ lädt ein lokales Modell, das danach auf deinem Gerät läuft.",
          },
          {
            title: "Mikrofon und Spracherkennung erlauben",
            description:
              "Jede Aufnahme braucht den Mikrofonzugriff. Den Zugriff auf die Spracherkennung braucht nur „Apple Speech Spracherkennung“. Im selben Schritt wählst du einen Schreibdienst oder machst ohne weiter.",
          },
          {
            title: "Testaufnahme machen",
            description:
              "Sprich einen Satz und prüfe den Text. Die Testaufnahme ist temporär und landet nicht im Verlauf.",
          },
        ],
        callout: {
          title: "Die erste Vorbereitung kann einige Minuten dauern",
          description:
            "Ein heruntergeladenes Sprachmodell wird vor der ersten Nutzung für dein Gerät vorbereitet. In dieser Zeit zeigt die App „Spracherkennung wird vorbereitet …“. Das kann einige Minuten dauern, auf dem iPad länger. Lass TypeWhisper geöffnet, bis es fertig ist. Spätere Starts gehen deutlich schneller.",
        },
        image: {
          path: "/screenshots/ios/01-recording.png",
          alt: "TypeWhisper-Aufnahme mit Live-Transkription auf dem iPhone",
          layout: "phone",
        },
      },
      {
        title: "Optionale Einrichtung nach der ersten Aufnahme",
        bullets: [
          "Füge die TypeWhisper-Tastatur hinzu, wenn du in andere Apps diktieren möchtest. Unter Einstellungen > Tastatur siehst du, was noch fehlt.",
          "Installiere die Watch-App, wenn du Aufnahmen am Handgelenk starten möchtest.",
          "Füge „Aufnahme starten“ zum Kontrollzentrum hinzu oder weise es auf unterstützten iPhone-Modellen der Aktionstaste zu.",
          "Lege TypeWhisper-Aktionen in Kurzbefehle oder weise Schnelldiktat der Aktionstaste zu.",
          "Schalte unter Einstellungen > Allgemein „Erfahren, wenn Aufnahmen bereit sind“ ein, wenn du eine private Mitteilung möchtest, sobald ein Schnelldiktat oder eine Apple-Watch-Aufnahme fertig verarbeitet ist.",
          "Füge das Widget „Schnellaufnahme“ hinzu, um auf dem Home-Bildschirm einen Gedanken festzuhalten und deine Inbox abzuarbeiten.",
        ],
      },
      {
        title: "In der App zurechtfinden",
        bullets: [
          "Die vier Tabs heißen Verlauf, Wörterbuch, Aufnehmen und Einstellungen.",
          "Unter Einstellungen > Allgemein findest du Eingabesprachen, Vorlesen, Flüstermodus und Aufnahmespeicher.",
          "Einstellungen > Darstellung ändert Wellenform und Farbe im Tab „Aufnehmen“. Die Tastatur behält ihr eigenes Design.",
          "Einstellungen > Statistiken zeigt für einen Zeitraum aktive Tage, Serien, Transkriptionen, Wörter, durchschnittliche Wörter pro Minute und gesparte Zeit. Statistiken bleiben auf dem Gerät.",
          "„Neu in TypeWhisper“ unter Einstellungen > Allgemein zeigt die Highlights des letzten Updates noch einmal.",
          "„Feedback senden“ bereitet eine E-Mail vor, die du in deiner Mail-App noch bearbeiten kannst.",
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
        tutorial: {
          slug: "dictate-with-the-ios-keyboard",
          link: "Tastatur einrichten und diktieren, Schritt für Schritt",
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
    title: "Formate, Spracherkennung und Schreibdienste",
    description:
      "Lokale oder optionale Cloud-Spracherkennung wählen, Formate für wiederkehrende Aufgaben anlegen, getippten Text formatieren, lokal übersetzen und das Ergebnis mit der Originalfassung vergleichen.",
    intro:
      "Die Spracherkennung macht aus deiner Stimme ein Transkript. Ein Format legt fest, was danach passiert: das Transkript behalten, es bereinigen, übersetzen oder daraus eine E-Mail, eine Notiz oder eine Zusammenfassung schreiben. Die Apple-Watch-App führt deine Formate als „Profile“.",
    sections: [
      {
        title: "Spracherkennung wählen",
        paragraphs: [
          "Den Standard wählst du unter Einstellungen > Spracherkennung. Das Spracherkennungsmenü im Tab „Aufnehmen“ wechselt ihn für die nächste Aufnahme.",
        ],
        bullets: [
          "Apple Speech ist eingebaut und braucht keinen Download. Ab iOS und iPadOS 26 nutzt es SpeechAnalyzer, Apples neuere Spracherkennung. iOS lädt das Modell für jede Diktiersprache einmalig im Hintergrund. Bis es bereit ist und für Sprachen, die SpeechAnalyzer noch nicht unterstützt, nutzt Apple Speech die bisherige Erkennung auf dem Gerät.",
          "„Schnell und lokal“ (Parakeet) erkennt 25 europäische Sprachen auf dem Gerät und braucht mindestens 4 GB Arbeitsspeicher. „Schnell und lokal Ultra“ ist genauer.",
          "„Live lokal“ zeigt den Text schon beim Sprechen und läuft auf dem Gerät. Es gehört zu Premium und braucht mindestens 6 GB Arbeitsspeicher.",
          "„Weitere lokale Modelle“ bietet WhisperKit in fünf Modellgrößen von etwa 39 bis 800 MB mit 99 Sprachen und automatischer Erkennung sowie „Cohere Transcribe (Lokal)“ mit 14 Sprachen und Downloads von etwa 1,5 bis 2,4 GB.",
          "„TypeWhisper auf dem Mac“ transkribiert mit Premium auf deinem gekoppelten Mac.",
          "„Spracherkennung in der Cloud“ bietet Groq, Soniox, Reson8, ElevenLabs, OpenAI, Meta mit Muse Voice Transcribe und Gemini, jeweils mit deinem eigenen API-Schlüssel. „Server hinzufügen“ verbindet einen OpenAI-kompatiblen Server.",
          "Eine Live-Vorschau beim Sprechen siehst du mit Apple Speech, WhisperKit, „Live lokal“, Soniox, ElevenLabs, OpenAI, Meta und Gemini. „Schnell und lokal“, „Cohere Transcribe (Lokal)“, „TypeWhisper auf dem Mac“, Groq und Reson8 zeigen den Text nach dem Stoppen.",
        ],
        callout: {
          title: "Lokal ist Standard",
          description:
            "Mit einer lokalen Engine bleiben Aufnahme und Transkription auf dem Gerät. Bei einer Cloud-Engine wird Audio zur Transkription an den ausgewählten Anbieter gesendet. API-Schlüssel liegen im iOS-Schlüsselbund.",
        },
      },
      {
        title: "Format anlegen",
        steps: [
          {
            title: "Intelligente Formatierung öffnen",
            description:
              "Gehe zu Einstellungen > Intelligente Formatierung und tippe auf „Neues Format erstellen“.",
          },
          {
            title: "Vorlage wählen",
            description:
              "Die Vorlagen heißen Diktat, Bereinigter Text, E-Mail, Nachricht, Notiz, Kalendertermin, Besprechungsnotizen, Checkliste, Zusammenfassung, Übersetzung und Eigene Anweisung. E-Mail und Kalendertermin gehören zu Premium.",
          },
          {
            title: "Sprachen festlegen",
            description:
              "Nutze deine globalen Eingabesprachen oder eine eigene Liste nur für dieses Format. „Übersetzung“ braucht eine Sprache unter „Übersetzen nach“. Andere Vorlagen können eine Ausgabesprache festlegen.",
          },
          {
            title: "Stil und Länge festlegen",
            description:
              "E-Mail, Nachricht und Notiz bieten einen Schreibstil: Automatisch, Locker, Freundlich oder Professionell. Besprechungsnotizen, Zusammenfassung, Notiz, E-Mail und Nachricht bieten die Länge Kurz, Mittel oder Ausführlich. „Eigene Anweisung“ nimmt deine eigene Anweisung auf.",
          },
          {
            title: "Bei Bedarf „Erweitert“ öffnen",
            description:
              "Gib dem Format einen eigenen Namen, eine eigene Spracherkennung, einen Schreibdienst und ein Schreibmodell. Außerdem kannst du mit Premium „Sprecher erkennen“ einschalten und Audiospeicherung sowie Flüstermodus abweichend festlegen.",
          },
          {
            title: "Sichern und sortieren",
            description:
              "Tippe auf „Sichern“. Ziehe Formate, um ihre Reihenfolge in den Formatlisten und in der Tastatur zu ändern, oder schalte ein Format über seinen Schalter aus.",
          },
        ],
        image: {
          path: "/screenshots/ios/ipad/05-profiles.png",
          alt: "Intelligente Formatierung mit drei Formaten auf dem iPad",
          layout: "tablet",
        },
      },
      {
        title: "Ergebnis mit der Originalfassung vergleichen",
        paragraphs: [
          "TypeWhisper bewahrt das ursprüngliche Transkript neben dem Ergebnis auf. Auf dem iPhone zeigt der Schalter „Textfassung“ das Ergebnis oder die Originalfassung. Auf dem iPad stehen beide im Tab „Aufnehmen“ und im Verlauf nebeneinander, und Wörter, die das Format hinzugefügt, geändert oder entfernt hat, sind markiert. In einem schmalen iPad-Fenster erscheint wieder der Schalter.",
          "„Anderes Format anwenden“ wendet ein anderes Format auf dieselbe Aufnahme an. Das Format „Übersetzung“ übersetzt lokal mit Apple Übersetzen.",
          "Mit Premium korrigiert „Transkript verbessern“ ein frisches Transkript, bevor ein Format angewendet wird, und lernt die Korrekturen, die du bestätigst. Die Formate „E-Mail“ und „Kalendertermin“ erstellen Entwürfe, die du prüfst, bevor etwas gesendet oder gesichert wird.",
        ],
      },
      {
        title: "Schreibdienst wählen",
        paragraphs: [
          "Formate, die Text umschreiben, laufen über einen Schreibdienst. Den Standard wählst du unter Einstellungen > Schreibdienste. Unter „Erweitert“ kann ein Format einen eigenen Dienst verwenden. „Diktat“ und „Übersetzung“ brauchen keinen Schreibdienst.",
        ],
        bullets: [
          "Apple Intelligence verarbeitet Text auf dem Gerät, wenn es dort verfügbar ist.",
          "Geladene lokale Modelle laufen vollständig auf dem Gerät und benötigen kein Apple Intelligence. TypeWhisper bietet LFM2.5 2.6B (etwa 1,7 GB) und Gemma 4 E2B (etwa 2,8 GB). Vor dem Download siehst du die Modelllizenz.",
          "„Dein Mac“ schreibt mit Premium mit den Sprachmodellen und Workflows deines gekoppelten Macs.",
          "Cloud-Dienste wie OpenAI, OpenRouter und Meta mit Muse Spark laufen über dein eigenes Konto beim Anbieter. Der Meta-API-Schlüssel gilt auch für die Meta-Spracherkennung. „Schreibdienst hinzufügen“ verbindet einen weiteren OpenAI-kompatiblen Dienst, auch einen in deinem lokalen Netzwerk.",
          "Wische über die Zeile eines lokalen Modells, um den Download zu pausieren oder zu entfernen.",
          "Mit „Ohne Schreibdienst verwenden“ bleiben Diktieren und Übersetzen verfügbar.",
        ],
        callout: {
          title: "Was ein Schreibdienst erhält",
          description:
            "Lokale Modelle und Apple Intelligence behalten den Text auf dem Gerät. Ein Cloud-Dienst oder ein Dienst in deinem lokalen Netzwerk erhält nur den Text, der für die gewählte Schreibaufgabe nötig ist, aber weder Audio noch Verlauf oder Wörterbuch.",
        },
        tutorial: {
          slug: "compare-local-writing-models",
          link: "Lokale Schreibmodelle vergleichen, Schritt für Schritt",
        },
      },
      {
        title: "Text ohne Aufnahme formatieren",
        steps: [
          {
            title: "Auf „Text formatieren“ tippen",
            description:
              "Die Taste steht oben im Tab „Aufnehmen“, solange keine Aufnahme läuft.",
          },
          {
            title: "Format wählen",
            description:
              "Die Zeile „Format“ zeigt das gewählte Format. Deine Wahl gilt auch für die nächste Aufnahme.",
          },
          {
            title: "Text einfügen oder tippen",
            description:
              "Die Zeile unter dem Feld zählt die Zeichen und sagt dir, wenn ein Text zu lang ist.",
          },
          {
            title: "Auf „Formatieren“ tippen",
            description:
              "Das Ergebnis erscheint wie nach einer Aufnahme. Ist „Diktat“ gewählt, heißt die Taste „Sichern“, und der Text bleibt unverändert.",
          },
        ],
        bullets: [
          "Der Verlauf führt den Eintrag mit der Quelle „Texteingabe“ und ohne Audio.",
          "„Anderes Format anwenden“ funktioniert danach auf demselben Text.",
          "Getippter Text braucht keine Spracherkennung. Ein Format, das Text umschreibt, braucht einen Schreibdienst.",
        ],
      },
      {
        title: "Mit deinem Mac transkribieren und schreiben",
        paragraphs: [
          "Mit Premium kann ein gekoppelter Mac deine Aufnahmen transkribieren, mit seinen Sprachmodellen für deine Formate schreiben und seine Text-Workflows ausführen. Dafür brauchst du TypeWhisper für Mac ab Version 1.8 im selben lokalen Netzwerk und Zugang zu den Premium-Funktionen auf beiden Geräten. Die iOS-Übersicht zeigt die Schritte der Kopplung.",
        ],
        bullets: [
          "Du koppelst unter Einstellungen > Premium > Mac oder unter Einstellungen > Spracherkennung > TypeWhisper auf dem Mac.",
          "„Für Spracherkennung verwenden“ sendet Aufnahmen verschlüsselt über das lokale Netzwerk an den Mac. Unter „Modell auf dem Mac“ wählst du ein Modell oder „Wie auf dem Mac ausgewählt“.",
          "„Zum Schreiben verwenden“ richtet den Mac als Schreibdienst ein. Jeder Workflow des Macs erscheint außerdem als Format am Ende deiner Formate.",
          "Dateien, die du aus einer anderen App an TypeWhisper teilst, werden immer auf dem Gerät transkribiert.",
        ],
      },
    ],
    next: "files-history-and-inbox",
  },
  "files-history-and-inbox": {
    eyebrow: "Erfassen und prüfen",
    title: "Dateien, Verlauf und Capture Inbox",
    description:
      "Audio- und Videodateien transkribieren, Dateien an TypeWhisper teilen, den Verlauf durchsuchen und filtern, Sprecher erkennen, Fragen zu einem Transkript stellen und die Inbox abarbeiten.",
    intro:
      "Der Verlauf ist das vollständige Archiv im Tab „Verlauf“. Die Capture Inbox, in der App „Inbox“, ist die fokussierte Warteschlange für Aufnahmen aus anderen Einstiegspunkten oder Ergebnisse, die noch Aufmerksamkeit benötigen.",
    sections: [
      {
        title: "Audio- oder Videodatei transkribieren",
        steps: [
          {
            title: "Dateitranskription öffnen",
            description:
              "Gehe zu Einstellungen > Dateitranskription und tippe auf „Audio- oder Videodateien hinzufügen“. Die Aktion „Audiodatei transkribieren“ in Kurzbefehle funktioniert ebenfalls.",
          },
          {
            title: "Einstellungen wählen",
            description:
              "Lege Sprache, Format, Spracherkennung und Schreibdienst für diese Dateien fest. Mit Premium zeigt „Sprecher erkennen“ das Transkript nach Sprechern.",
          },
          {
            title: "Auf „Alles transkribieren“ tippen",
            description:
              "Dateien bleiben in der Warteschlange, bis sie fertig sind oder du sie entfernst. Wird die Verarbeitung unterbrochen, öffne TypeWhisper und tippe auf „Fortsetzen“.",
          },
          {
            title: "Ergebnis öffnen",
            description:
              "Eine fertige Datei bietet „Im Verlauf öffnen“, „Kopieren“ und „Teilen“. „Gesamten Text kopieren“ sammelt alle Ergebnisse.",
          },
        ],
        bullets: [
          "„Erneut transkribieren“ verarbeitet eine fertige Datei noch einmal mit dem aktuellen Format und den gewählten Modellen und legt einen zweiten Eintrag im Verlauf an. So vergleichst du zwei Spracherkennungs- oder Schreibmodelle an derselben Aufnahme.",
          "Ogg-Opus-Sprachnachrichten, etwa aus WhatsApp, lassen sich importieren.",
          "Hier hinzugefügte Dateien behalten ihr Audio, bis du sie entfernst oder auf „Zurücksetzen“ tippst.",
        ],
      },
      {
        title: "Dateien an TypeWhisper teilen",
        bullets: [
          "Teile eine Audio- oder Videodatei aus einer anderen App, zum Beispiel eine Sprachnachricht, und wähle im Teilen-Menü TypeWhisper.",
          "Die Datei wird in einer Warteschlange gesichert. Öffne TypeWhisper, um sie zu transkribieren.",
          "Geteilte Dateien werden auf dem Gerät transkribiert. Ein Format wendest du danach im Verlauf an.",
          "Die Warteschlange unter Einstellungen > Dateitranskription zeigt den Fortschritt und macht nach einer Unterbrechung weiter.",
          "Eine geteilte Datei darf bis zu 2 GB groß sein.",
        ],
      },
      {
        title: "Verlauf als zentrale Ablage nutzen",
        bullets: [
          "Vergangene Transkriptionen durchsuchen.",
          "Nach Quelle und Format filtern und Einträge nach dem Gerät durchsehen, das sie erstellt hat.",
          "Einen Eintrag öffnen, um Ergebnis und Originalfassung zu vergleichen, das Audio abzuspielen oder den Text vorlesen zu lassen.",
          "Das Menü eines Eintrags bietet „Kopieren“, „Teilen“, „Vorlesen“, „Anderes Format anwenden“, „Aufnahmeinformationen“, „Aufnahme hinzufügen“ und „Löschen“.",
          "Das Ergebnis oder die Originalfassung bearbeiten.",
          "Einträge aus „Text formatieren“ haben die Quelle „Texteingabe“ und kein Audio.",
          "Wiedergabe und Vorlesen laufen über Apples Audioausgabe-Auswahl auf AirPlay, Bluetooth oder dem Lautsprecher.",
          "Das Vorlesen nutzt die installierten Stimmen deines Geräts. „Vorlesetempo“ und „Stimmen“ findest du unter Einstellungen > Allgemein.",
          "„Audio“ und „Transkripte“ unter Einstellungen > Allgemein > Aufnahmespeicher legen fest, wie lange neue Aufnahmen aufbewahrt werden.",
        ],
        image: {
          path: "/screenshots/ios/04-history.png",
          alt: "TypeWhisper-Verlauf und Capture Inbox auf dem iPhone",
          layout: "phone",
        },
      },
      {
        title: "Sprecher, Fragen und Korrekturen mit Premium",
        bullets: [
          "„Sprecher erkennen“ unterscheidet Sprecher nach der Transkription auf dem Gerät. Schalte es für ein Format unter „Erweitert“ oder in der Dateitranskription ein oder starte es über das Menü eines Verlaufseintrags. „Besprechungsnotizen“ erkennt Sprecher standardmäßig.",
          "„Sprecher benennen“ gibt den Sprechern Namen. Im Transkript weist du eine Wortmeldung einem anderen Sprecher zu oder teilst sie auf.",
          "„Stimme in künftigen Aufnahmen erkennen“ sichert ein Sprecherprofil, das den Namen in späteren Aufnahmen vorschlägt. Sprecherprofile bleiben auf dem Gerät, werden nicht synchronisiert und enthalten kein Audio. Du verwaltest sie unter Einstellungen > Sprecherprofile.",
          "Ähnliche Stimmen und gleichzeitiges Sprechen können zu falschen Zuordnungen führen, die du im Transkript korrigierst.",
          "„Fragen zum Transkript“ beantwortet Fragen zu einer Aufnahme über deinen gewählten Schreibdienst. Der Chat zeigt an, wohin Text gesendet wird, und wird nicht gespeichert.",
          "Markiere falsch erkannten Text im Transkript und wähle „Korrektur anlegen“, um eine Wörterbuchkorrektur für künftige Transkriptionen anzulegen. Das gespeicherte Transkript bleibt unverändert.",
        ],
      },
      {
        title: "Capture Inbox abarbeiten",
        paragraphs: [
          "Schnelldiktate, Apple-Watch-Aufnahmen, Kalenderentwürfe und fehlgeschlagene Aufnahmen mit Handlungsbedarf erscheinen in der Inbox. Ein Badge und optionale private Mitteilungen machen neue Ergebnisse sichtbar.",
          "Auf dem iPad trennt die Seitenleiste Inbox, gesamten Verlauf und Gerätequellen. Wähle einen Eintrag, um ihn zu prüfen oder eine fehlgeschlagene Verarbeitung zu korrigieren. Ein fertiges Schnelldiktat oder eine fertige Watch-Aufnahme verlässt die Inbox, sobald du den Eintrag geöffnet hast. Ein Kalenderentwurf bleibt, bis du den Termin hinzufügst oder den Entwurf verwirfst.",
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
      "TypeWhisper Namen und Fachbegriffe beibringen, bestätigte Korrekturen anlegen und kurze Auslöser in wiederverwendbaren Text mit dynamischen Platzhaltern verwandeln, nach dem Diktat und in der Tastatur.",
    intro:
      "Das Wörterbuch verbessert wiederkehrendes Vokabular. Textbausteine ersetzen einen kurzen gesprochenen oder getippten Auslöser durch längeren Text.",
    sections: [
      {
        title: "Persönliches Wörterbuch aufbauen",
        steps: [
          {
            title: "Begriff hinzufügen",
            description:
              "Öffne im Tab „Wörterbuch“ den Bereich „Begriffe“ und füge Namen, Produkte, Abkürzungen oder Fachbegriffe hinzu, die die Spracherkennung kennen soll.",
          },
          {
            title: "Bei Bedarf Korrektur hinterlegen",
            description:
              "Ordne unter „Korrekturen“ einer wiederkehrenden falschen Form exakt den Text zu, den TypeWhisper verwenden soll.",
          },
          {
            title: "Mit der aktiven Engine testen",
            description:
              "Lokale Engines unterscheiden sich bei der Vokabelunterstützung. Teste kurz und passe Stärke oder Korrektur an, wenn verfügbar.",
          },
        ],
        bullets: [
          "Mit Premium markierst du falsch erkannten Text in einem Transkript und wählst „Korrektur anlegen“.",
          "Mit Premium nimmt „Getippte Wörter lernen“ unter Einstellungen > Tastatur unbekannte Wörter auf, die du mit der TypeWhisper-Tastatur tippst.",
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
              "Öffne Einstellungen > Textbausteine und tippe auf „Textbaustein erstellen“. Nutze eine kurze Formulierung, die selten versehentlich vorkommt, etwa Meeting-Link oder Support-Signatur.",
          },
          {
            title: "Ersetzung schreiben",
            description:
              "Trage den vollständigen Text ein und entscheide mit „Groß-/Kleinschreibung beachten“, ob die Schreibweise zählt.",
          },
          {
            title: "Dynamische Werte einsetzen",
            description:
              "Füge Datum, Uhrzeit, Datum und Uhrzeit oder Zwischenablage über die Chips im Editor ein.",
          },
          {
            title: "Nach dem Diktat verwenden",
            description:
              "Sprich den Auslöser. TypeWhisper ersetzt ihn nach der Transkription.",
          },
        ],
        bullets: [
          "Tippe in der TypeWhisper-Tastatur den Auslöser und ein Leerzeichen oder einen Zeilenumbruch, um den Textbaustein einzufügen. Löschst du direkt danach, kommt der Auslöser zurück.",
          "Die Taste „Textbausteine“ in der oberen Leiste der Tastatur listet deine Textbausteine auf.",
          "„Textbausteine beim Tippen ersetzen“ unter Einstellungen > Tastatur schaltet das Ersetzen beim Tippen ein oder aus.",
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
          "Wörterbuch und Textbausteine funktionieren lokal ohne Account oder Abo. Premium kann sie zwischen angemeldeten TypeWhisper-Installationen über „Automatik iCloud“ oder einen mit Apples Dateiauswahl gewählten Cloud-Ordner synchronisieren.",
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
          "„Gesamtes Wörterbuch löschen“ entfernt alle Begriffe und Korrekturen. Ist der Premium-Sync eingeschaltet, wird die Löschung auf deine anderen Geräte synchronisiert.",
        ],
      },
    ],
    next: "watch-and-shortcuts",
  },
  "watch-and-shortcuts": {
    eyebrow: "Erfassen, ohne zuerst die App zu öffnen",
    title: "Apple Watch, Kurzbefehle, Widgets und Aktionstaste",
    description:
      "Am Handgelenk aufnehmen und jede Aufnahme verfolgen, Schnelldiktate in der Inbox sammeln, Automationen aus den TypeWhisper-Aktionen bauen und Siri, CarPlay und Widgets nutzen.",
    intro:
      "TypeWhisper kann über Apple Watch, Kontrollzentrum, Kurzbefehl, Siri, Widget oder Aktionstaste starten. Ergebnisse im Hintergrund landen zur späteren Prüfung in der Capture Inbox.",
    sections: [
      {
        title: "Mit der Apple Watch aufnehmen",
        steps: [
          {
            title: "TypeWhisper auf der Watch öffnen",
            description:
              "Tippe auf das Profil oder drehe die Digital Crown, um es zu wechseln. Die Watch führt die Formate deines iPhones als „Profile“.",
          },
          {
            title: "Am Handgelenk starten und stoppen",
            description:
              "Timer und Wellenform zeigen die laufende Aufnahme. Auf unterstützten Modellen startest und stoppst du die Aufnahme mit Doppeltippen.",
          },
          {
            title: "Übertragung verfolgen",
            description:
              "Jede Aufnahme zeigt ihren Status, mit Haptik bei jedem Schritt: „Wartet auf das iPhone“, „Wird übertragen“, „Wird auf dem iPhone transkribiert“ und „Transkription fertig“.",
          },
          {
            title: "Ergebnis prüfen",
            description:
              "Öffne auf der Watch eine Transkription unter „Zuletzt“, um sie zu lesen, vorlesen zu lassen oder zu teilen. Auf dem iPhone öffnest du Mitteilung oder Capture Inbox, kontrollierst das Transkript oder wiederholst einen fehlgeschlagenen Schritt.",
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
          "Mit Premium beantwortet „Frage zur letzten Aufnahme“ eine Frage zu deiner neuesten Aufnahme.",
          "Schnelldiktat und Aufnahme starten nehmen eine Sprache, ein Format und ein Übersetzungsziel an.",
        ],
        callout: {
          title: "Aktionstaste",
          description:
            "Erstelle einen Kurzbefehl mit Schnelldiktat und weise ihn anschließend in den iOS-Einstellungen der Aktionstaste zu. Dieselbe Aktion kann in unterstützten Widgets liegen.",
        },
      },
      {
        title: "Komplikationen, Smart-Stapel und Kontrollzentrum auf der Watch",
        image: {
          path: "/screenshots/ios/watch/02-recording.png",
          alt: "Laufende TypeWhisper-Aufnahme auf der Apple Watch",
          layout: "wide",
        },
        bullets: [
          "Die Komplikation „Aufnehmen“ startet eine Aufnahme vom Zifferblatt aus.",
          "Das Widget „Letzte Transkription“ zeigt deine neueste Transkription im Smart-Stapel.",
          "Unter watchOS 26 kannst du das Steuerelement „Aufnahme starten“ zum Kontrollzentrum der Watch hinzufügen.",
          "Private Mitteilungen können melden, wenn Watch-Aufnahme oder Schnelldiktat fertig verarbeitet sind.",
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
      {
        title: "Siri, CarPlay und Widgets",
        bullets: [
          "Siri liest deine neueste Notiz vor, zum Beispiel mit „Lies meine neueste Notiz aus TypeWhisper vor“.",
          "Mit Premium beantwortet Siri Fragen zu deiner letzten Aufnahme, zum Beispiel mit „Frag TypeWhisper zu meiner letzten Aufnahme“. Die Antwort wird vorgelesen, und nichts wird gespeichert.",
          "„TypeWhisper pausieren“ und „TypeWhisper fortsetzen“ pausieren eine laufende Aufnahme oder setzen sie fort.",
          "In CarPlay zeigt eine laufende Aufnahme Tasten zum Pausieren und Stoppen.",
          "Das Widget „Schnellaufnahme“ hält auf dem Home-Bildschirm einen Gedanken fest, zeigt deine Inbox und markiert Einträge als erledigt.",
          "Während einer Aufnahme auf dem iPhone zeigen Sperrbildschirm und Dynamic Island die Wellenform. Mit „Live-Text außerhalb der App“ unter Einstellungen > Allgemein kann dort auch der neueste Live-Text erscheinen.",
        ],
      },
    ],
    next: "privacy-and-premium",
  },
  "privacy-and-premium": {
    eyebrow: "Kontrolle und Eigentum",
    title: "Datenschutz, Cloud-Anbieter und Premium",
    description:
      "Verstehen, was auf dem Gerät bleibt, was ein gewählter Anbieter oder dein Mac erhält, warum die Tastatur Vollzugriff braucht, welche Funktionen Premium benötigen und wie du Premium kaufst, wiederherstellst oder einlöst.",
    intro:
      "Lokales Diktieren, Wörterbuch, Textbausteine und Tastatur benötigen weder Account noch Abo. Cloud-Verarbeitung und Premium sind optionale Ebenen mit getrennten Datenwegen.",
    sections: [
      {
        title: "Was lokal bleibt",
        bullets: [
          "Lokale Engines verarbeiten Aufnahme-Audio auf iPhone oder iPad.",
          "Apple Intelligence und geladene Schreibmodelle verarbeiten Text vollständig auf dem Gerät.",
          "TypeWhisper enthält keine Werbung und kein Drittanbieter-Tracking.",
          "Lokaler Verlauf, Wörterbuch, Textbausteine, Formate und Modelle bleiben im App-Speicher, solange du keinen Export oder Sync aktivierst.",
          "Sprecherprofile und Statistiken bleiben auf dem Gerät, auf dem sie entstanden sind.",
          "Normales Tippen mit der Tastatur funktioniert ohne Vollzugriff.",
        ],
      },
      {
        title: "Wann Daten das Gerät verlassen",
        bullets: [
          "Eine Cloud-Sprach-Engine erhält Audio nur, wenn du diesen Anbieter einrichtest und auswählst.",
          "Ein Cloud-Schreibanbieter erhält den Text, der für die von dir gestartete Schreibaktion nötig ist.",
          "„TypeWhisper auf dem Mac“ sendet Aufnahmen und Text verschlüsselt über das lokale Netzwerk an deinen gekoppelten Mac. Auf dem Mac ausgewählte Modelle können dort eingerichtete Cloud-Anbieter nutzen.",
          "„Fragen zum Transkript“ sendet das Transkript und deine Fragen nur dann an deinen gewählten Schreibdienst, wenn du eine Frage abschickst.",
          "Der Tastatur-Vollzugriff erlaubt Tastatur und Haupt-App, kurzlebigen Aufnahmezustand und Ergebnis zu teilen. Die Haupt-App nimmt das Mikrofon auf.",
          "Premium-Berechtigungsanfragen enthalten Account-, Geräte- und Kaufstatus, nicht Wörterbuch- oder Textbaustein-Inhalte.",
        ],
      },
      {
        title: "Was Premium ergänzt",
        bullets: [
          "Ein frisches Transkript verbessern und TypeWhisper bestätigte Korrekturen beibringen.",
          "Prüfbare E-Mail-Entwürfe mit Betreff und Text erstellen und Kalendertermine, die du vor dem Sichern prüfst.",
          "„Fragen zum Transkript“ beantwortet Fragen zu einer Aufnahme über deinen gewählten Schreibdienst.",
          "„Deinen Mac nutzen“ transkribiert und schreibt mit den Modellen und Workflows deines gekoppelten Macs. Dafür brauchst du TypeWhisper für Mac ab Version 1.8 im selben lokalen Netzwerk und Zugang zu den Premium-Funktionen auf beiden Geräten.",
          "Sprecher auf dem Gerät unterscheiden, benennen und auf Wunsch lokale Sprecherprofile sichern.",
          "„Live lokal“ nutzen und den Live-Text kopieren, während die Aufnahme weiterläuft.",
          "Wörterbuchkorrekturen aus markiertem Transkripttext anlegen und die Tastatur getippte Wörter lernen lassen.",
          "Wörterbuch und Textbausteine zwischen angemeldeten iPhone- und iPad-Installationen synchronisieren.",
          "Optional Text und Metadaten aus Verlauf und Inbox synchronisieren. Audio-Sync gilt nur für neue Einträge nach der Aktivierung.",
        ],
        callout: {
          title: "Dein gewählter Cloud-Speicher",
          description:
            "Wähle „Automatik iCloud“ oder einen Ordner über Apples Dateiauswahl. Synchronisierte Inhalte laufen über diesen Speicher und nicht über den TypeWhisper-Berechtigungsdienst.",
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
              "Stelle „Modus“ auf „Automatik iCloud“, „Cloud-Ordner“ oder „Aus“. Für „Cloud-Ordner“ tippst du auf „Cloud-Ordner auswählen“.",
          },
          {
            title: "Verlauf und Audio festlegen",
            description:
              "„Verlauf und Inbox synchronisieren“ ist optional und nimmt deine vorhandenen Texte mit auf. „Audio für neue Einträge synchronisieren“ betrifft nur Einträge, die nach dem Einschalten entstehen.",
          },
          {
            title: "Geräte prüfen und synchronisieren",
            description:
              "„Geräte“ listet die Geräte auf, die synchronisiert haben. „Jetzt synchronisieren“ startet sofort einen Sync.",
          },
          {
            title: "Sync-Ordner trennen oder löschen",
            description:
              "„Ordner trennen“ hebt die Ordnerauswahl auf. „Privaten Synchronisierungsordner löschen“ löscht die Sync-Daten von TypeWhisper aus dem gewählten Cloud-Speicher. Lokale Wörterbuch- und Textbaustein-Daten bleiben auf dem aktuellen Gerät.",
          },
        ],
      },
      {
        title: "Premium kaufen, wiederherstellen oder einlösen",
        bullets: [
          "Öffne Einstellungen > Premium und melde dich mit Apple an. Dein Premium-Zugang gilt auf iPhone und iPad.",
          "Die Premium-Seite zeigt das Monatsabo und den Lifetime-Kauf mit den aktuellen App-Store-Preisen.",
          "„App Store-Kauf wiederherstellen“ holt einen früheren Kauf zurück.",
          "„Code einlösen“ öffnet das App-Store-Fenster für einen Angebotscode.",
          "„Vorhandene TypeWhisper-Lizenz verbinden“ aktiviert dieses iPhone oder iPad als ein Gerät einer Lizenz, die du schon besitzt. Den Lizenzschlüssel gibst du nur auf einer sicheren TypeWhisper-Webseite ein.",
          "Unter „Konto“ findest du „Abmelden“ und „TypeWhisper-Konto löschen“. Das Löschen entfernt die Konto- und Berechtigungsverknüpfung. Lokale Einträge und private Cloud-Dateien werden nicht gelöscht.",
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

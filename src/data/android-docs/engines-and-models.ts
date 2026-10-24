import type { IosDocPage } from "@/data/ios-docs";

export const en: IosDocPage = {
  eyebrow: "Speech recognition",
  title: "Speech engines and models",
  description:
    "Choose an on-device or cloud speech engine on Android, download and remove models, and set silence, model memory, fallback and translation options.",
  intro:
    "TypeWhisper can transcribe on your phone with downloaded models or send the recording to a cloud service with your own API key. Every choice lives under Settings → Speech recognition.",
  sections: [
    {
      title: "Choose an engine",
      paragraphs: [
        "Open Settings → Speech recognition. On this device lists the engines that run on your phone, Cloud lists the services that need your own API key. Tap an engine to use it for dictation, the keyboard, the bubble and file transcription. Parakeet is selected after installation.",
        "If the engine still needs its model, its model page opens right away. The arrow next to an on-device engine opens the model page at any time.",
      ],
      bullets: [
        "Language: Automatic or one fixed language. Parakeet, Nemotron Live and SenseVoice recognize the language by themselves. Moonshine only writes English and GigaAM only Russian. The choice still applies to other engines and to files.",
        "A profile can use its own engine and language instead of the ones in settings. See Profiles and AI writing.",
      ],
      image: {
        path: "/screenshots/android/speech-settings.png",
        alt: "Speech recognition settings in TypeWhisper for Android with on-device and cloud engines",
        layout: "phone",
      },
    },
    {
      title: "On-device engines",
      paragraphs: [
        "These engines work offline once their model is downloaded. Sizes are the one-time download shown in the app.",
      ],
      bullets: [
        "Parakeet (on device): Parakeet (about 670 MB) or Parakeet Ultra (about 630 MB), 25 European languages. Fast and accurate, detects the language itself. Ultra was retrained by Moondream and makes fewer errors with the same languages and speed. The best starting point for most people.",
        "Whisper (on device): 99 languages in five sizes. Whisper Tiny (about 104 MB) is the fastest and least accurate, Whisper Base (about 161 MB) suits short dictations, Whisper Small (about 375 MB) balances speed and accuracy, Whisper Large v3 Turbo (about 1 GB) is the most accurate and takes a few seconds per dictation. Whisper Distil Large v3 (about 980 MB) writes English only and is faster than Turbo. Whisper is slower than Parakeet.",
        "Canary (on device): Canary 180M Flash (about 207 MB) for English, German, Spanish and French. A third of Parakeet’s size and faster. It needs the dictation language; without one it uses your phone’s language, otherwise English.",
        "Nemotron Live (on device): shows the text while you speak (about 680 MB). Needs Premium.",
        "SenseVoice (on device): SenseVoice Small (about 240 MB) for Chinese, Cantonese, English, Japanese and Korean. Detects the language itself and is much faster than Whisper.",
        "Moonshine (on device): Moonshine Tiny (about 44 MB), English only. The smallest and a fast model, but less accurate than Parakeet and Whisper.",
        "GigaAM (on device): GigaAM v3 (about 232 MB) for Russian only, with punctuation.",
        "Android speech recognition: the recognizer built into Android, no download. Needs Android 13 or newer. Which languages work offline depends on the installed speech provider. Use Download selected offline language to install the language you picked.",
      ],
      callout: {
        title: "Live text",
        description:
          "Nemotron Live is the only engine that writes while you speak. All other engines return the text after you stop. The dictation bubble can show a live preview with other on-device engines; see Show live text on the dictation bubble page.",
      },
    },
    {
      title: "Download and remove models",
      steps: [
        {
          title: "Open the model page",
          description:
            "In Settings → Speech recognition, tap the arrow next to an on-device engine. Each model shows its size and “stored on this device”.",
        },
        {
          title: "Tap Download",
          description:
            "The download continues in the background and a notification shows the progress. Without a connection it waits until one is available. Cancel download keeps the downloaded parts, so Resume download continues where it stopped. After a failed download, tap Retry.",
        },
        {
          title: "Pick the model",
          description:
            "Parakeet and Whisper offer several models. Tap one to use it. Each model is downloaded separately.",
        },
        {
          title: "Remove a model you no longer need",
          description:
            "Tap the trash icon next to a downloaded model and confirm with Delete. You can download it again later.",
        },
      ],
      paragraphs: [
        "If you dictate with an engine whose model is missing, the Record screen offers Download model first. Large models can use mobile data, so start them on Wi-Fi if your data plan is limited.",
      ],
    },
    {
      title: "Advanced settings",
      paragraphs: ["Settings → Speech recognition → Advanced holds four options for all engines:"],
      bullets: [
        "Skip silence: on by default. Trims silence before and after speaking and ignores recordings without speech, so no text gets invented. Nemotron Live receives the audio unfiltered.",
        "Keep recording after stop: Off, 150 ms (default), 300 ms, 500 ms or 1000 ms, so a last word spoken while tapping stop is not cut off.",
        "Free model memory: Never, Right after dictating, after 2, 5, 10 (default) or 30 minutes, or After 1 hour. The next dictation loads the model again.",
        "Fallback engine: None by default. The engine you pick here transcribes instead when the chosen engine fails, for example without network.",
      ],
    },
    {
      title: "Translation, Chinese characters and dictionary terms",
      bullets: [
        "Translate to English: a switch under Translation on the Whisper and Canary model pages, shared by both engines. Whisper Tiny, Base and Small turn any spoken language into English text, offline; Large v3 Turbo and Distil Large v3 always write what is spoken. Canary translates German, Spanish or French into English. Set Language to the language you speak.",
        "Chinese characters: in Settings → Text clean-up, choose As recognized, Simplified, Traditional, Traditional (Taiwan) or Traditional (Hong Kong). Chinese dictations are then written in one script; Japanese stays as it is.",
        "Dictionary terms with Parakeet: the Vocabulary boost (about 132 MB) helps Parakeet recognize your terms. It appears on the Parakeet model page and downloads when you add your first term while Parakeet is selected.",
        "Dictionary terms with other engines: most cloud engines receive your terms with the recording. Engines that cannot take terms get close misspellings fixed in the text afterwards.",
      ],
    },
    {
      title: "Cloud engines",
      paragraphs: [
        "Add the API key under Settings → Cloud providers. Each provider page shows Used for, and Test checks the key. Groq, OpenAI and Meta use one key for speech recognition and AI writing. Keys are stored encrypted on your phone.",
      ],
      bullets: [
        "Groq Whisper (cloud): whisper-large-v3-turbo.",
        "OpenAI (cloud): gpt-transcribe with your dictionary terms.",
        "ElevenLabs Scribe (cloud): Scribe v2 with your dictionary terms.",
        "Soniox (cloud): stt-async-v5 with your dictionary terms. Choose the region USA, European Union or Japan on the Soniox page.",
        "Meta Muse Voice (cloud): muse-voice-transcribe-1.0 with your dictionary terms.",
        "Reson8 (cloud): TypeWhisper fixes dictionary terms in its text afterwards.",
        "Deepgram (cloud): Nova-3 with word timings.",
        "AssemblyAI (cloud): Universal-3.5 Pro with your dictionary terms, many languages.",
        "Own server: a Whisper-compatible server on your network, such as faster-whisper or LocalAI. Enter Server URL and Speech model under Cloud providers → Own server.",
      ],
      callout: {
        title: "Where your audio goes",
        description:
          "With an on-device engine, the recording and its transcription stay on your phone. With a cloud engine, the recording goes to that provider under your account, together with your dictionary terms where the engine uses them. Android speech recognition only sends audio to its speech provider if you turn on Allow online fallback. A cloud engine chosen as Fallback engine receives the recording when the main engine fails.",
      },
    },
  ],
};

export const de: IosDocPage = {
  eyebrow: "Spracherkennung",
  title: "Sprach-Engines und Modelle",
  description:
    "Wähle unter Android eine Sprach-Engine auf dem Gerät oder in der Cloud, lade Modelle und lösche sie wieder, stelle Stille, Modellspeicher und Ersatz-Engine ein.",
  intro:
    "TypeWhisper transkribiert mit heruntergeladenen Modellen direkt auf deinem Handy oder schickt die Aufnahme mit deinem eigenen API-Schlüssel an einen Cloud-Dienst. Alles dazu findest du unter Einstellungen → Spracherkennung.",
  sections: [
    {
      title: "Engine wählen",
      paragraphs: [
        "Öffne Einstellungen → Spracherkennung. Unter Auf diesem Gerät stehen die Engines, die auf deinem Handy laufen, unter Cloud die Dienste, für die du einen eigenen API-Schlüssel brauchst. Tippe auf eine Engine, dann nutzen sie Diktat, Tastatur, Bubble und Dateien. Nach der Installation ist Parakeet ausgewählt.",
        "Fehlt der Engine noch ihr Modell, öffnet sich direkt ihre Modellseite. Über den Pfeil neben einer Engine auf dem Gerät kommst du jederzeit dorthin.",
      ],
      bullets: [
        "Sprache: Automatisch oder eine feste Sprache. Parakeet, Nemotron Live und SenseVoice erkennen die Sprache selbst. Moonshine schreibt nur Englisch, GigaAM nur Russisch. Die Wahl gilt trotzdem für andere Engines und für Dateien.",
        "Ein Profil kann statt der Einstellungen eine eigene Engine und Sprache nutzen. Mehr dazu unter Profile und KI-Schreiben.",
      ],
      image: {
        path: "/screenshots/android/speech-settings.png",
        alt: "Einstellungen zur Spracherkennung in TypeWhisper für Android mit Engines auf dem Gerät und in der Cloud",
        layout: "phone",
      },
    },
    {
      title: "Engines auf dem Gerät",
      paragraphs: [
        "Diese Engines funktionieren offline, sobald ihr Modell geladen ist. Die Größen entsprechen dem einmaligen Download, den die App anzeigt.",
      ],
      bullets: [
        "Parakeet (auf dem Gerät): Parakeet (etwa 670 MB) oder Parakeet Ultra (etwa 630 MB), 25 europäische Sprachen. Schnell und genau, erkennt die Sprache selbst. Ultra wurde von Moondream nachtrainiert und macht weniger Fehler, bei gleichen Sprachen und gleichem Tempo. Für die meisten der beste Einstieg.",
        "Whisper (auf dem Gerät): 99 Sprachen in fünf Größen. Whisper Tiny (etwa 104 MB) ist am schnellsten und am ungenauesten, Whisper Base (etwa 161 MB) passt für kurze Diktate, Whisper Small (etwa 375 MB) ist ein guter Kompromiss, Whisper Large v3 Turbo (etwa 1 GB) ist am genauesten und braucht ein paar Sekunden pro Diktat. Whisper Distil Large v3 (etwa 980 MB) schreibt nur Englisch und ist schneller als Turbo. Whisper ist langsamer als Parakeet.",
        "Canary (auf dem Gerät): Canary 180M Flash (etwa 207 MB) für Englisch, Deutsch, Spanisch und Französisch. Ein Drittel so groß wie Parakeet und schneller. Canary braucht die Diktiersprache; ohne sie nimmt es die Sprache deines Handys, sonst Englisch.",
        "Nemotron Live (auf dem Gerät): zeigt den Text schon, während du sprichst (etwa 680 MB). Braucht Premium.",
        "SenseVoice (auf dem Gerät): SenseVoice Small (etwa 240 MB) für Chinesisch, Kantonesisch, Englisch, Japanisch und Koreanisch. Erkennt die Sprache selbst und ist viel schneller als Whisper.",
        "Moonshine (auf dem Gerät): Moonshine Tiny (etwa 44 MB), nur Englisch. Das kleinste Modell und schnell, aber ungenauer als Parakeet und Whisper.",
        "GigaAM (auf dem Gerät): GigaAM v3 (etwa 232 MB), nur für Russisch, mit Satzzeichen.",
        "Android-Spracherkennung: die in Android eingebaute Erkennung, ohne Download. Braucht Android 13 oder neuer. Welche Sprachen offline gehen, hängt vom installierten Sprachanbieter ab. Mit Ausgewählte Offline-Sprache laden installierst du die gewählte Sprache.",
      ],
      callout: {
        title: "Live-Text",
        description:
          "Nur Nemotron Live schreibt mit, während du sprichst. Alle anderen Engines liefern den Text, nachdem du gestoppt hast. Die Diktier-Bubble kann mit anderen Engines auf dem Gerät eine Live-Vorschau zeigen, siehe Live-Text anzeigen auf der Seite zur Diktier-Bubble.",
      },
    },
    {
      title: "Modelle laden und löschen",
      steps: [
        {
          title: "Modellseite öffnen",
          description:
            "Tippe unter Einstellungen → Spracherkennung auf den Pfeil neben einer Engine auf dem Gerät. Jedes Modell zeigt seine Größe und „auf diesem Gerät gespeichert“.",
        },
        {
          title: "Auf Herunterladen tippen",
          description:
            "Der Download läuft im Hintergrund weiter, eine Benachrichtigung zeigt den Fortschritt. Ohne Verbindung wartet er, bis wieder eine da ist. Download abbrechen behält die geladenen Teile, mit Download fortsetzen geht es dort weiter. Ist ein Download fehlgeschlagen, tippe auf Erneut versuchen.",
        },
        {
          title: "Modell auswählen",
          description:
            "Parakeet und Whisper bieten mehrere Modelle. Tippe auf eines, um es zu nutzen. Jedes Modell wird einzeln geladen.",
        },
        {
          title: "Nicht mehr gebrauchte Modelle löschen",
          description:
            "Tippe neben einem geladenen Modell auf den Papierkorb und bestätige mit Löschen. Du kannst es später erneut herunterladen.",
        },
      ],
      paragraphs: [
        "Diktierst du mit einer Engine, deren Modell fehlt, bietet dir der Aufnahme-Bildschirm zuerst Modell herunterladen an. Große Modelle laden auch über mobile Daten. Starte sie besser im WLAN, wenn dein Datenvolumen knapp ist.",
      ],
    },
    {
      title: "Erweiterte Einstellungen",
      paragraphs: ["Unter Einstellungen → Spracherkennung → Erweitert findest du vier Optionen für alle Engines:"],
      bullets: [
        "Stille überspringen: standardmäßig an. Schneidet Stille vor und nach dem Sprechen ab und verwirft Aufnahmen ohne Sprache, damit kein Text erfunden wird. Nemotron Live bekommt das Audio ungefiltert.",
        "Nach dem Stopp weiter aufnehmen: Aus, 150 ms (Standard), 300 ms, 500 ms oder 1000 ms, damit das letzte Wort beim Tippen auf Stopp nicht abgeschnitten wird.",
        "Modellspeicher freigeben: Nie, Direkt nach dem Diktat, nach 2, 5, 10 (Standard) oder 30 Minuten oder Nach 1 Stunde. Das nächste Diktat lädt das Modell wieder.",
        "Ersatz-Engine: standardmäßig Keine. Die hier gewählte Engine springt ein, wenn die eigentliche Engine fehlschlägt, zum Beispiel ohne Netz.",
      ],
    },
    {
      title: "Übersetzung, chinesische Schriftzeichen und Wörterbuch-Begriffe",
      bullets: [
        "Ins Englische übersetzen: ein Schalter unter Übersetzung auf den Modellseiten von Whisper und Canary, der für beide gilt. Whisper Tiny, Base und Small machen aus jeder gesprochenen Sprache englischen Text, offline; Large v3 Turbo und Distil Large v3 schreiben immer, was gesprochen wird. Canary übersetzt Deutsch, Spanisch oder Französisch ins Englische. Stelle unter Sprache die Sprache ein, in der du sprichst.",
        "Chinesische Schriftzeichen: Wähle unter Einstellungen → Textaufbereitung Wie erkannt, Vereinfacht, Traditionell, Traditionell (Taiwan) oder Traditionell (Hongkong). Chinesische Diktate stehen dann in einer Schrift; Japanisch bleibt unverändert.",
        "Wörterbuch-Begriffe mit Parakeet: Der Vokabular-Boost (etwa 132 MB) hilft Parakeet, deine Begriffe zu erkennen. Er steht auf der Modellseite von Parakeet und wird geladen, sobald du bei ausgewähltem Parakeet deinen ersten Begriff anlegst.",
        "Wörterbuch-Begriffe mit anderen Engines: Die meisten Cloud-Engines bekommen deine Begriffe zusammen mit der Aufnahme. Bei Engines, die keine Begriffe annehmen, korrigiert TypeWhisper ähnlich geschriebene Wörter danach im Text.",
      ],
    },
    {
      title: "Cloud-Engines",
      paragraphs: [
        "Den API-Schlüssel trägst du unter Einstellungen → Cloud-Anbieter ein. Jede Anbieterseite zeigt, wofür der Schlüssel genutzt wird, und Testen prüft ihn. Groq, OpenAI und Meta nutzen einen Schlüssel für Spracherkennung und KI-Schreiben. Schlüssel liegen verschlüsselt auf deinem Handy.",
      ],
      bullets: [
        "Groq Whisper (Cloud): whisper-large-v3-turbo.",
        "OpenAI (Cloud): gpt-transcribe mit deinen Wörterbuch-Begriffen.",
        "ElevenLabs Scribe (Cloud): Scribe v2 mit deinen Wörterbuch-Begriffen.",
        "Soniox (Cloud): stt-async-v5 mit deinen Wörterbuch-Begriffen. Die Region USA, Europäische Union oder Japan wählst du auf der Soniox-Seite.",
        "Meta Muse Voice (Cloud): muse-voice-transcribe-1.0 mit deinen Wörterbuch-Begriffen.",
        "Reson8 (Cloud): TypeWhisper korrigiert Wörterbuch-Begriffe danach im Text.",
        "Deepgram (Cloud): Nova-3 mit Wort-Zeitstempeln.",
        "AssemblyAI (Cloud): Universal-3.5 Pro mit deinen Wörterbuch-Begriffen, viele Sprachen.",
        "Eigener Server: ein Whisper-kompatibler Server im eigenen Netz, etwa faster-whisper oder LocalAI. Server-URL und Sprachmodell trägst du unter Cloud-Anbieter → Eigener Server ein.",
      ],
      callout: {
        title: "Wohin dein Audio geht",
        description:
          "Mit einer Engine auf dem Gerät bleiben Aufnahme und Transkription auf deinem Handy. Mit einer Cloud-Engine geht die Aufnahme über dein Konto an diesen Anbieter, bei Engines, die sie nutzen, zusammen mit deinen Wörterbuch-Begriffen. Die Android-Spracherkennung schickt Audio nur dann an ihren Sprachanbieter, wenn du Online-Fallback erlauben einschaltest. Ist eine Cloud-Engine als Ersatz-Engine gewählt, bekommt sie die Aufnahme, wenn die eigentliche Engine fehlschlägt.",
      },
    },
  ],
};

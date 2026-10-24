import type { IosDocPage } from "@/data/ios-docs";

export const en: IosDocPage = {
  eyebrow: "Android setup",
  title: "Installation and first setup",
  description:
    "Requirements, installing from Google Play and every step of the guided setup on Android: language, speech recognition, access, keyboard and bubble.",
  intro:
    "TypeWhisper {androidVersion} is available on Google Play for Android phones and tablets. This guide covers the requirements and walks you through the guided setup up to your first dictation.",
  sections: [
    {
      title: "Before you install",
      bullets: [
        "Android 10 or newer.",
        "A phone or tablet with a 64-bit ARM processor (arm64).",
        "About 670 MB of free storage for Parakeet, the recommended on-device speech model. Other models need their own space.",
        "Internet access to download models and to use a cloud service, if you choose one.",
        "Android speech recognition as an engine needs Android 13 or newer. Parakeet and the other on-device models work from Android 10.",
      ],
      callout: {
        title: "Install from Google Play",
        description:
          "Open the TypeWhisper page on Google Play and tap Install. If Google Play says the app is not compatible with your phone, check the Android version and processor listed above.",
      },
    },
    {
      title: "How the guided setup works",
      paragraphs: [
        "When you open TypeWhisper for the first time, the setup starts by itself. It has seven steps. The top of the screen shows where you are, for example “Step 3 of 7 · Speech recognition”.",
        "Use Continue and Back to move between steps. Later ends the setup right away. You can go through every step again at any time under Settings → Setup assistant. Nothing is deleted when you do.",
      ],
    },
    {
      title: "The seven setup steps",
      steps: [
        {
          title: "1. Welcome",
          description:
            "A short overview: on-device speech recognition keeps recordings on your phone, profiles turn dictations into messages and emails, and the TypeWhisper keyboard dictates into any text field. Tap Get started.",
        },
        {
          title: "2. Language",
          description:
            "Under “Choose how you speak”, pick the language you dictate in, or Automatic. This setting is for speech recognition only, not for the app language. You can change it later in Settings → Speech recognition.",
        },
        {
          title: "3. Speech recognition",
          description:
            "Pick one of three options. Fast & offline is recommended: Parakeet runs on your phone after a one-time download of about 670 MB. Tap Download model; the download continues in the background while you go on. Android speech recognition uses the recognizer built into Android and needs no download. Cloud service uses Groq, OpenAI, ElevenLabs or another provider with your own API key, which you add later in Settings → Cloud providers.",
        },
        {
          title: "4. Access",
          description:
            "Tap Allow next to Microphone. TypeWhisper needs it for every recording. On Android 13 and newer you can also allow Notifications. They are optional and show recording controls and finished files. If you denied the microphone before, the button reads Open app settings instead.",
        },
        {
          title: "5. Keyboard",
          description:
            "Tap Enable TypeWhisper Keyboard. Android opens its input settings, where you turn on TypeWhisper Keyboard. Android warns that keyboards can read what you type; TypeWhisper only sends audio to a cloud service when you choose one. Back in the setup, tap Switch keyboard to make TypeWhisper the active keyboard.",
        },
        {
          title: "6. Bubble (optional)",
          description:
            "The dictation bubble lets you keep your usual keyboard: a small bubble appears next to text fields in other apps, and you tap it to dictate. Tap Set up dictation bubble to read the disclosure described below, or skip this step and turn the bubble on later in Settings → Dictation bubble.",
        },
        {
          title: "7. Try it",
          description:
            "Tap the microphone, say the example sentence and tap again. The text appears below and is saved to History. If the speech model is not downloaded yet, this step shows the download instead of the microphone. Tap Finish to close the setup.",
        },
      ],
      image: {
        path: "/screenshots/android/setup.png",
        alt: "TypeWhisper's guided setup on an Android phone",
        layout: "phone",
      },
    },
    {
      title: "Turning on the dictation bubble",
      paragraphs: [
        "The bubble uses Android's accessibility service. Before anything is turned on, TypeWhisper shows the dialog “Dictation bubble: accessibility access”. It explains what the bubble reads: the name of the app you are using, in web browsers the domain of the open page, the text field you are typing in (its text, cursor position and field type) and where windows such as the keyboard are on the screen.",
        "This data is only used on your phone. It is not stored and not sent to TypeWhisper or anyone else. The microphone only starts when you tap the bubble.",
      ],
      steps: [
        {
          title: "Read the disclosure",
          description:
            "Tap Agree and enable to continue, or No thanks to leave the bubble off.",
        },
        {
          title: "Turn on the service in Android",
          description:
            "Android's accessibility settings open. Turn on Dictation bubble there and confirm Android's prompt.",
        },
        {
          title: "Check the status",
          description:
            "Back in TypeWhisper, the setup shows “The dictation bubble is on.” If the service is still off, tap Open accessibility settings.",
        },
      ],
      image: {
        path: "/screenshots/android/bubble-disclosure.png",
        alt: "The accessibility disclosure TypeWhisper shows before the dictation bubble is turned on",
        layout: "phone",
      },
    },
    {
      title: "Optional after setup",
      bullets: [
        "Add the Dictate tile to Quick Settings or the TypeWhisper widget to your home screen to start a dictation from anywhere.",
        "Touch and hold the app icon for the shortcuts Dictate, Copy last and Transcribe file.",
        "Open Settings → Assist gesture and choose TypeWhisper as the digital assistant app to dictate with the assist gesture, for example by holding the power button.",
        "Add names and jargon in the Dictionary tab so they are recognized correctly.",
        "Open Settings → AI writing and tap Set up step by step if you want profiles to turn dictations into messages, emails or translations.",
        "Choose another engine or download more on-device models in Settings → Speech recognition.",
      ],
    },
  ],
};

export const de: IosDocPage = {
  eyebrow: "Android einrichten",
  title: "Installation und erste Einrichtung",
  description:
    "Voraussetzungen, Installation über Google Play und jeder Schritt der Einrichtung unter Android: Sprache, Spracherkennung, Zugriff, Tastatur und Bubble.",
  intro:
    "TypeWhisper {androidVersion} gibt es für Android-Handys und -Tablets bei Google Play. Hier erfährst du, was dein Handy braucht, und gehst die Einrichtung bis zu deinem ersten Diktat durch.",
  sections: [
    {
      title: "Vor der Installation",
      bullets: [
        "Android 10 oder neuer.",
        "Ein Handy oder Tablet mit 64-Bit-ARM-Prozessor (arm64).",
        "Etwa 670 MB freier Speicher für Parakeet, das empfohlene Sprachmodell auf dem Gerät. Andere Modelle brauchen eigenen Platz.",
        "Eine Internetverbindung, um Modelle zu laden und, falls du einen wählst, einen Clouddienst zu nutzen.",
        "Die Android-Spracherkennung als Engine braucht Android 13 oder neuer. Parakeet und die anderen Modelle auf dem Gerät laufen ab Android 10.",
      ],
      callout: {
        title: "Über Google Play installieren",
        description:
          "Öffne die TypeWhisper-Seite bei Google Play und tippe auf Installieren. Meldet Google Play, dass die App nicht mit deinem Handy kompatibel ist, prüfe Android-Version und Prozessor wie oben beschrieben.",
      },
    },
    {
      title: "So läuft die Einrichtung ab",
      paragraphs: [
        "Beim ersten Öffnen startet die Einrichtung von selbst. Sie hat sieben Schritte. Oben siehst du, wo du gerade bist, zum Beispiel „Schritt 3 von 7 · Spracherkennung“.",
        "Mit Weiter und Zurück wechselst du zwischen den Schritten. Später beendet die Einrichtung sofort. Unter Einstellungen → Einrichtungsassistent kannst du alle Schritte jederzeit noch einmal durchgehen. Dabei wird nichts gelöscht.",
      ],
    },
    {
      title: "Die sieben Schritte",
      steps: [
        {
          title: "1. Willkommen",
          description:
            "Ein kurzer Überblick: Spracherkennung auf dem Gerät hält Aufnahmen auf deinem Handy, Profile machen aus Diktaten Nachrichten und E-Mails, und die TypeWhisper-Tastatur diktiert in jedes Textfeld. Tippe auf Los geht’s.",
        },
        {
          title: "2. Sprache",
          description:
            "Unter „Wähle, wie du sprichst“ wählst du die Sprache, in der du diktierst, oder Automatisch. Das gilt nur für die Spracherkennung, nicht für die Sprache der App. Ändern kannst du es später unter Einstellungen → Spracherkennung.",
        },
        {
          title: "3. Spracherkennung",
          description:
            "Du hast drei Möglichkeiten. Empfohlen ist Schnell und offline: Parakeet läuft nach einem einmaligen Download von etwa 670 MB auf deinem Handy. Tippe auf Modell laden; der Download läuft im Hintergrund weiter, während du fortfährst. Die Android-Spracherkennung nutzt die in Android eingebaute Erkennung und braucht keinen Download. Clouddienst nutzt Groq, OpenAI, ElevenLabs oder einen anderen Anbieter mit deinem eigenen API-Schlüssel, den du später unter Einstellungen → Cloud-Anbieter einträgst.",
        },
        {
          title: "4. Zugriff",
          description:
            "Tippe bei Mikrofon auf Erlauben. TypeWhisper braucht das Mikrofon für jede Aufnahme. Ab Android 13 kannst du außerdem Benachrichtigungen erlauben. Sie sind optional und zeigen die Aufnahmesteuerung und fertige Dateien. Hast du das Mikrofon schon einmal abgelehnt, heißt der Knopf stattdessen App-Einstellungen öffnen.",
        },
        {
          title: "5. Tastatur",
          description:
            "Tippe auf TypeWhisper-Tastatur aktivieren. Android öffnet seine Eingabe-Einstellungen, dort schaltest du die TypeWhisper-Tastatur ein. Android warnt, dass Tastaturen Eingaben lesen können; TypeWhisper schickt Audio nur an einen Clouddienst, wenn du einen auswählst. Zurück in der Einrichtung tippst du auf Tastatur wechseln und machst TypeWhisper zur aktiven Tastatur.",
        },
        {
          title: "6. Bubble (optional)",
          description:
            "Mit der Diktier-Bubble behältst du deine gewohnte Tastatur: Neben Textfeldern in anderen Apps erscheint eine kleine Bubble, die du zum Diktieren antippst. Tippe auf Diktier-Bubble einrichten, um den unten beschriebenen Hinweis zu lesen. Du kannst den Schritt auch überspringen und die Bubble später unter Einstellungen → Diktier-Bubble einschalten.",
        },
        {
          title: "7. Ausprobieren",
          description:
            "Tippe aufs Mikrofon, sprich den Beispielsatz und tippe noch einmal. Der Text erscheint darunter und landet im Verlauf. Ist das Sprachmodell noch nicht geladen, zeigt dieser Schritt statt des Mikrofons den Download. Mit Fertig schließt du die Einrichtung.",
        },
      ],
      image: {
        path: "/screenshots/android/setup.png",
        alt: "Die Einrichtung von TypeWhisper auf einem Android-Handy",
        layout: "phone",
      },
    },
    {
      title: "Diktier-Bubble einschalten",
      paragraphs: [
        "Die Bubble nutzt den Bedienungshilfedienst von Android. Bevor etwas eingeschaltet wird, zeigt TypeWhisper den Dialog „Diktier-Bubble: Zugriff über Bedienungshilfen“. Dort steht, was die Bubble liest: den Namen der App, die du gerade nutzt, in Browsern die Domain der geöffneten Seite, das Textfeld, in dem du schreibst (Text, Cursorposition und Feldtyp), und wo Fenster wie die Tastatur auf dem Bildschirm liegen.",
        "Diese Daten werden nur auf deinem Handy verwendet. Sie werden nicht gespeichert und weder an TypeWhisper noch an andere gesendet. Das Mikrofon startet erst, wenn du die Bubble antippst.",
      ],
      steps: [
        {
          title: "Hinweis lesen",
          description:
            "Tippe auf Zustimmen und aktivieren, um fortzufahren, oder auf Nein, danke, wenn die Bubble aus bleiben soll.",
        },
        {
          title: "Dienst in Android einschalten",
          description:
            "Die Android-Bedienungshilfen öffnen sich. Schalte dort Diktier-Bubble ein und bestätige die Abfrage von Android.",
        },
        {
          title: "Status prüfen",
          description:
            "Zurück in TypeWhisper zeigt die Einrichtung „Die Diktier-Bubble ist an.“ Ist der Dienst noch aus, tippe auf Bedienungshilfen öffnen.",
        },
      ],
      image: {
        path: "/screenshots/android/bubble-disclosure.png",
        alt: "Der Hinweis zu den Bedienungshilfen, den TypeWhisper vor dem Einschalten der Diktier-Bubble zeigt",
        layout: "phone",
      },
    },
    {
      title: "Optional nach der Einrichtung",
      bullets: [
        "Füge die Kachel Diktieren zu den Schnelleinstellungen oder das TypeWhisper-Widget zum Startbildschirm hinzu, um von überall ein Diktat zu starten.",
        "Halte das App-Symbol gedrückt, um die Verknüpfungen Diktieren, Letzte kopieren und Datei transkribieren zu nutzen.",
        "Öffne Einstellungen → Assistent-Geste und wähle TypeWhisper als Assistent-App, um mit der Assistent-Geste zu diktieren, zum Beispiel durch Halten der Ein-/Aus-Taste.",
        "Trag Namen und Fachbegriffe im Tab Wörterbuch ein, damit sie richtig erkannt werden.",
        "Öffne Einstellungen → KI-Schreiben und tippe auf Schritt für Schritt einrichten, wenn Profile aus Diktaten Nachrichten, E-Mails oder Übersetzungen machen sollen.",
        "Unter Einstellungen → Spracherkennung wählst du eine andere Engine oder lädst weitere Modelle auf das Gerät.",
      ],
    },
  ],
};

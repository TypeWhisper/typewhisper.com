import type { IosDocPage } from "@/data/ios-docs";

export const en: IosDocPage = {
  eyebrow: "Daily dictation",
  title: "Dictation and the TypeWhisper keyboard",
  description:
    "Record on the Record tab, turn on the TypeWhisper keyboard, dictate into any app, send by voice, rewrite selected text and keep private fields out of history.",
  intro:
    "You can dictate on the Record tab in TypeWhisper or with the TypeWhisper keyboard in any other app. Both use the same engine, profiles, dictionary and history, and the keyboard records directly without opening the app.",
  sections: [
    {
      title: "Record in the app",
      steps: [
        {
          title: "Check engine and profile",
          description:
            "The Record tab shows the current engine as “Engine: …” and a “Profile: …” chip. Tap the chip to choose Dictation (no profile) or one of your profiles. Profiles marked with a lock need Premium.",
        },
        {
          title: "Start recording",
          description:
            "Tap Start recording and speak. If the selected on-device engine still needs its model, the screen offers Download model first.",
        },
        {
          title: "Pause or stop",
          description:
            "Use Pause recording and Resume recording for a break. Tap the recording control again to stop and get the final text.",
        },
        {
          title: "Review the result",
          description:
            "The result card offers Copy and Share. Email profiles add Email draft, calendar profiles add Add to calendar. More options has Edit text, Add correction, Report AI text for profile results, Delete and, for a waiting calendar draft, Discard calendar draft.",
        },
      ],
      bullets: [
        "Live text while you speak appears only with Nemotron Live, which needs Premium. Pause and Stop then stay at the bottom of the screen. Other engines show the text after you stop.",
        "If a transcription fails and the recording was kept, Try again transcribes it with the engine from settings and copies the text.",
        "Transcribe a file on the same screen opens file transcription for existing audio and video.",
        "A connected Bluetooth headset records with its own microphone on Android 12 and newer; a short tone in the headset tells you when it listens. Wired and USB headsets work on every version.",
      ],
      image: {
        path: "/screenshots/android/01-record.png",
        alt: "TypeWhisper Record tab with engine, profile chip and recording control",
        layout: "phone",
      },
    },
    {
      title: "Turn on the TypeWhisper keyboard",
      steps: [
        {
          title: "Enable the keyboard",
          description:
            "Open Settings → Keyboard → Enable TypeWhisper Keyboard. Android's input settings open; turn on TypeWhisper Keyboard there. The Keyboard step of the guided setup does the same.",
        },
        {
          title: "Switch to it",
          description:
            "Tap Switch keyboard in Settings → Keyboard and choose TypeWhisper, or use Android's keyboard switcher in any text field.",
        },
        {
          title: "Allow the microphone",
          description:
            "The keyboard records with TypeWhisper's microphone permission. If it is missing, the keyboard shows an error; tap it to open TypeWhisper.",
        },
      ],
      callout: {
        title: "About Android's warning",
        description:
          "Android warns that keyboards can read what you type. TypeWhisper only sends audio to a cloud service when you choose one.",
      },
    },
    {
      title: "Dictate with the keyboard",
      steps: [
        {
          title: "Tap Dictate",
          description:
            "Tap the blue microphone key on the right of the toolbar. While you speak, the toolbar shows “Listening…”, a waveform, the elapsed time and Cancel, and the key turns into a red stop key.",
        },
        {
          title: "Stop",
          description:
            "Tap the stop key. Or press and hold the microphone key for more than half a second, speak, and release to stop. Cancel throws the recording away.",
        },
        {
          title: "Check the inserted text",
          description:
            "The text goes in at the cursor, with a space before it when needed. With Nemotron Live you see the text in the field while you speak.",
        },
      ],
      bullets: [
        "Undo removes the last dictation. Original replaces it with what the engine heard, before corrections and profile.",
        "The history button opens Recent transcriptions; tap one to insert it again.",
        "The screen stays on while you dictate. If the keyboard closes or the screen turns off anyway, the recording stops and is transcribed: the keyboard inserts the text when it returns to the same field and otherwise offers it with Insert here. Outside private fields it is in History too.",
        "If you switch fields while TypeWhisper is still transcribing, the keyboard shows “Your dictation is ready. Choose where to insert it.” with Insert here and Dismiss.",
        "If the engine's model is missing, the keyboard shows the download size and offers Download model.",
      ],
      image: {
        path: "/screenshots/android/08-keyboard.png",
        alt: "TypeWhisper keyboard with profile chip and dictate button in a text field",
        layout: "phone",
      },
    },
    {
      title: "Typing, layouts and sending",
      bullets: [
        "Keyboard layout in Settings → Keyboard: Automatic (system language) uses QWERTZ for German and QWERTY otherwise. You can also pick QWERTZ or QWERTY directly.",
        "?123 switches to numbers and symbols. Long-press a letter for variants such as ä, ß, é or ñ. Double-tap Shift for caps lock.",
        "The currency key on the symbol page follows your phone's region, for example $ in the US, £ in the UK and € in Germany. Press and hold it for $, €, £, ¥ and ¢.",
        "The keyboard key left of the space bar switches to your next keyboard; press and hold it to pick one from Android's list.",
        "The clipboard button in the toolbar lists text you copied in the last hour, newest first. Tap an entry to paste it, or remove entries one by one or with Clear all. The keyboard keeps up to 20 copies, only in memory, and leaves out copies that apps mark as sensitive, such as passwords. Clipboard history in Settings → Keyboard turns it off.",
        "Number and phone fields open a number pad; phone fields add +, * and #.",
        "In email and web address fields a dictated value goes in without spaces and without a final period; email addresses are also lowercased. In number fields, spaces between digits are removed and the final period is dropped.",
        "Send after dictating: Never, When you end with “send” or “senden”, or Always. The command must be a sentence of its own and is removed from the text, so “Can you send me the file?” stays a question. “Send it”, “abschicken” and “absenden” work as commands too, and so does “press enter” or “Enter drücken” at the end.",
        "Sending uses the field's own action, such as send, search or done. Fields without one get a line break.",
        "Space after dictation adds a space at the end so you can type on right away. It applies only when the cursor is at the end of the text, not in email, web or number fields, and not when the dictation is sent. The setting also applies to the dictation bubble.",
      ],
    },
    {
      title: "Profiles and rewriting",
      paragraphs: [
        "The chip on the left of the toolbar shows the profile for the next dictation. Tap it to choose Dictation or another profile; all profiles appear in place of the keys, and your choice also becomes the active profile in the app. Calendar Event profiles are not offered in the keyboard, and locked profiles open the Premium page.",
        "A profile assigned to an app under Settings → Profiles is used automatically in that app. Website profiles work in the keyboard too, but only while the dictation bubble is on, because only its accessibility service can read the browser's address bar.",
      ],
      steps: [
        {
          title: "Select text",
          description:
            "Select text in any field. The profile chip turns into Rewrite.",
        },
        {
          title: "Choose a profile",
          description:
            "Tap Rewrite and pick a profile that uses AI writing. The keyboard shows “Writing…” while it works.",
        },
        {
          title: "Get the result",
          description:
            "The rewritten text replaces the selection. If the selection changed meanwhile, the text is not inserted. Original brings back the selected text.",
        },
      ],
      callout: {
        title: "Needs a writing service",
        description:
          "Rewriting uses the writing service set up under Settings → AI writing. With any keyboard you can also select text and choose TypeWhisper in Android's text selection menu.",
      },
    },
    {
      title: "Private fields and the Android dictionary",
      bullets: [
        "Dictations into password fields and incognito fields are not saved in history, and their recording is not kept. The Recent transcriptions button is hidden there.",
        "In password fields the keyboard always dictates without a profile and does not offer Rewrite.",
        "While the TypeWhisper keyboard is your active keyboard, TypeWhisper exchanges words with Android's personal dictionary, at most every 10 minutes when the keyboard opens. Android shares this dictionary only with the active keyboard.",
        "On the Dictionary tab, Android dictionary shows the result and, while the TypeWhisper keyboard is active, offers Sync now. Words you delete in TypeWhisper are not imported again.",
      ],
    },
  ],
};

export const de: IosDocPage = {
  eyebrow: "Täglich diktieren",
  title: "Diktieren und die TypeWhisper-Tastatur",
  description:
    "Im Tab Aufnehmen diktieren, die TypeWhisper-Tastatur einschalten, in jeder App diktieren, per Sprache senden, Text umschreiben und private Felder schützen.",
  intro:
    "Du diktierst im Tab Aufnehmen in TypeWhisper oder mit der TypeWhisper-Tastatur in jeder anderen App. Beide nutzen dieselbe Engine, dieselben Profile, dasselbe Wörterbuch und denselben Verlauf. Die Tastatur nimmt direkt auf, ohne die App zu öffnen.",
  sections: [
    {
      title: "In der App aufnehmen",
      steps: [
        {
          title: "Engine und Profil prüfen",
          description:
            "Der Tab Aufnehmen zeigt die aktuelle Engine als „Engine: …“ und einen Chip „Profil: …“. Tippe auf den Chip, um Diktat (ohne Profil) oder eines deiner Profile zu wählen. Profile mit Schloss brauchen Premium.",
        },
        {
          title: "Aufnahme starten",
          description:
            "Tippe auf Aufnahme starten und sprich. Fehlt der gewählten Engine auf dem Gerät noch das Modell, bietet der Bildschirm zuerst Modell herunterladen an.",
        },
        {
          title: "Pausieren oder beenden",
          description:
            "Mit Aufnahme pausieren und Aufnahme fortsetzen legst du eine Pause ein. Tippe erneut auf die Aufnahmesteuerung, um zu beenden und den fertigen Text zu bekommen.",
        },
        {
          title: "Ergebnis prüfen",
          description:
            "Die Ergebniskarte bietet Kopieren und Teilen. E-Mail-Profile ergänzen E-Mail-Entwurf, Kalenderprofile Zum Kalender hinzufügen. Unter Weitere Optionen findest du Text bearbeiten, Korrektur hinzufügen, KI-Text melden bei Profil-Ergebnissen, Löschen und bei einem wartenden Kalender-Entwurf Kalender-Entwurf verwerfen.",
        },
      ],
      bullets: [
        "Live-Text beim Sprechen gibt es nur mit Nemotron Live, das Premium braucht. Pause und Beenden bleiben dann unten am Bildschirm. Andere Engines zeigen den Text, sobald du aufhörst.",
        "Schlägt eine Transkription fehl und wurde die Aufnahme behalten, tippe auf Erneut versuchen: TypeWhisper transkribiert sie mit der Engine aus den Einstellungen und kopiert den Text.",
        "Über Datei transkribieren auf demselben Bildschirm transkribierst du vorhandene Audio- und Videodateien.",
        "Ein verbundenes Bluetooth-Headset nimmt ab Android 12 mit seinem eigenen Mikrofon auf; ein kurzer Ton im Headset zeigt dir, wann es zuhört. Kabel- und USB-Headsets funktionieren auf jeder Version.",
      ],
      image: {
        path: "/screenshots/android/01-record.png",
        alt: "Tab Aufnehmen in TypeWhisper mit Engine, Profil-Chip und Aufnahmesteuerung",
        layout: "phone",
      },
    },
    {
      title: "TypeWhisper-Tastatur einschalten",
      steps: [
        {
          title: "Tastatur aktivieren",
          description:
            "Öffne Einstellungen → Tastatur → TypeWhisper-Tastatur aktivieren. Android öffnet seine Eingabe-Einstellungen; schalte dort die TypeWhisper-Tastatur ein. Der Schritt Tastatur im Einrichtungsassistenten führt dich ebenfalls dorthin.",
        },
        {
          title: "Zur Tastatur wechseln",
          description:
            "Tippe in Einstellungen → Tastatur auf Tastatur wechseln und wähle TypeWhisper, oder nutze in einem Textfeld die Tastaturauswahl von Android.",
        },
        {
          title: "Mikrofon erlauben",
          description:
            "Die Tastatur nimmt mit der Mikrofonberechtigung von TypeWhisper auf. Fehlt sie, zeigt die Tastatur einen Fehler; tippe darauf, um TypeWhisper zu öffnen.",
        },
      ],
      callout: {
        title: "Zur Warnung von Android",
        description:
          "Android warnt, dass Tastaturen Eingaben lesen können. TypeWhisper schickt Audio nur an einen Clouddienst, wenn du einen auswählst.",
      },
    },
    {
      title: "Mit der Tastatur diktieren",
      steps: [
        {
          title: "Auf Diktieren tippen",
          description:
            "Tippe rechts in der Leiste auf die blaue Mikrofontaste. Während du sprichst, zeigt die Leiste „Hört zu …“, eine Wellenform, die Dauer und Abbrechen, und die Taste wird zur roten Stopptaste.",
        },
        {
          title: "Beenden",
          description:
            "Tippe auf die Stopptaste. Oder halte die Mikrofontaste länger als eine halbe Sekunde gedrückt, sprich und lass los, um zu beenden. Abbrechen verwirft die Aufnahme.",
        },
        {
          title: "Eingefügten Text prüfen",
          description:
            "Der Text landet an der Cursorposition, bei Bedarf mit einem Leerzeichen davor. Mit Nemotron Live siehst du den Text schon beim Sprechen im Feld.",
        },
      ],
      bullets: [
        "Rückgängig entfernt das letzte Diktat. Original ersetzt es durch das, was die Engine gehört hat, vor Korrekturen und Profil.",
        "Die Verlaufstaste öffnet Letzte Transkriptionen; tippe auf eine, um sie erneut einzufügen.",
        "Beim Diktieren bleibt der Bildschirm an. Schließt sich die Tastatur oder geht der Bildschirm trotzdem aus, endet die Aufnahme und wird transkribiert: Kehrt die Tastatur ins selbe Feld zurück, landet der Text dort, sonst bietet sie ihn mit Hier einfügen an. Außerhalb privater Felder steht er auch im Verlauf.",
        "Wechselst du das Feld, während TypeWhisper noch transkribiert, zeigt die Tastatur „Dein Diktat ist fertig. Wähle, wo du es einfügen möchtest.“ mit Hier einfügen und Verwerfen.",
        "Fehlt das Modell der Engine, zeigt die Tastatur die Downloadgröße und bietet Modell herunterladen an.",
      ],
      image: {
        path: "/screenshots/android/08-keyboard.png",
        alt: "TypeWhisper-Tastatur mit Profil-Chip und Diktiertaste in einem Textfeld",
        layout: "phone",
      },
    },
    {
      title: "Tippen, Layouts und Senden",
      bullets: [
        "Tastaturlayout in Einstellungen → Tastatur: Automatisch (Systemsprache) nutzt QWERTZ für Deutsch und sonst QWERTY. Du kannst QWERTZ oder QWERTY auch fest wählen.",
        "?123 wechselt zu Zahlen und Zeichen. Für Varianten wie ä, ß, é oder ñ hältst du einen Buchstaben gedrückt. Tippst du zweimal schnell auf Umschalt, bleibt die Großschreibung eingeschaltet.",
        "Die Währungstaste auf der Zeichenseite richtet sich nach der Region deines Handys, zum Beispiel $ in den USA, £ in Großbritannien und € in Deutschland. Hältst du sie gedrückt, gibt es $, €, £, ¥ und ¢.",
        "Die Tastaturtaste links neben der Leertaste wechselt zur nächsten Tastatur; hältst du sie gedrückt, wählst du eine aus der Liste von Android.",
        "Die Zwischenablage-Taste in der Leiste zeigt Text, den du in der letzten Stunde kopiert hast, den neuesten zuerst. Tippe auf einen Eintrag, um ihn einzufügen, oder entferne Einträge einzeln oder mit Alle löschen. Die Tastatur behält bis zu 20 Kopien, nur im Speicher, und lässt Kopien aus, die Apps als vertraulich markieren, etwa Passwörter. Verlauf der Zwischenablage in Einstellungen → Tastatur schaltet das ab.",
        "Zahlen- und Telefonfelder öffnen einen Ziffernblock; Telefonfelder haben zusätzlich +, * und #.",
        "In E-Mail- und Webadressfeldern landet ein diktierter Wert ohne Leerzeichen und ohne Punkt am Ende; E-Mail-Adressen werden zusätzlich kleingeschrieben. In Zahlenfeldern werden Leerzeichen zwischen Ziffern entfernt, und der Punkt am Ende entfällt.",
        "Nach dem Diktat senden: Nie, Wenn du mit „senden“ oder „send“ endest, oder Immer. Der Befehl muss ein eigener Satz sein und wird aus dem Text entfernt. „Kannst du mir die Datei senden?“ bleibt also eine Frage. Auch „abschicken“, „absenden“ und „send it“ funktionieren als Befehl, am Ende außerdem „Enter drücken“ oder „press enter“.",
        "Gesendet wird mit der Aktion des Feldes, etwa Senden, Suchen oder Fertig. Felder ohne eigene Aktion bekommen einen Zeilenumbruch.",
        "Leerzeichen nach dem Diktat hängt ein Leerzeichen an, damit du direkt weitertippen kannst. Das gilt nur, wenn der Cursor am Textende steht, nicht in E-Mail-, Web- und Zahlenfeldern und nicht, wenn das Diktat gesendet wird. Die Einstellung gilt auch für die Diktier-Bubble.",
      ],
    },
    {
      title: "Profile und Umschreiben",
      paragraphs: [
        "Der Chip links in der Leiste zeigt das Profil für das nächste Diktat. Tippe darauf, um Diktat oder ein anderes Profil zu wählen; alle Profile erscheinen anstelle der Tasten, und deine Wahl wird auch zum aktiven Profil in der App. Kalendertermin-Profile bietet die Tastatur nicht an, gesperrte Profile öffnen die Premium-Seite.",
        "Ein Profil, das du unter Einstellungen → Profile einer App zuordnest, gilt in dieser App automatisch. Website-Profile wirken auch in der Tastatur, aber nur, solange die Diktier-Bubble an ist: Nur ihr Bedienungshilfedienst kann die Adressleiste des Browsers lesen.",
      ],
      steps: [
        {
          title: "Text markieren",
          description:
            "Markiere Text in einem beliebigen Feld. Aus dem Profil-Chip wird Umschreiben.",
        },
        {
          title: "Profil wählen",
          description:
            "Tippe auf Umschreiben und wähle ein Profil, das KI-Schreiben nutzt. Während der Arbeit zeigt die Tastatur „Wird umgeschrieben …“.",
        },
        {
          title: "Ergebnis übernehmen",
          description:
            "Der neue Text ersetzt die Markierung. Hat sich die Markierung inzwischen geändert, wird nichts eingefügt. Original holt den markierten Text zurück.",
        },
      ],
      callout: {
        title: "Braucht einen Schreibdienst",
        description:
          "Umschreiben nutzt den Schreibdienst, den du unter Einstellungen → KI-Schreiben eingerichtet hast. Mit jeder Tastatur kannst du auch Text markieren und im Auswahlmenü von Android TypeWhisper wählen.",
      },
    },
    {
      title: "Private Felder und das Android-Wörterbuch",
      bullets: [
        "Diktate in Passwortfeldern und Inkognito-Feldern landen nicht im Verlauf, und die Aufnahme wird nicht behalten. Die Taste für Letzte Transkriptionen ist dort ausgeblendet.",
        "In Passwortfeldern diktiert die Tastatur immer ohne Profil und bietet kein Umschreiben an.",
        "Solange die TypeWhisper-Tastatur deine aktive Tastatur ist, tauscht TypeWhisper Wörter mit dem persönlichen Wörterbuch von Android aus, höchstens alle 10 Minuten beim Öffnen der Tastatur. Android teilt dieses Wörterbuch nur mit der aktiven Tastatur.",
        "Im Tab Wörterbuch zeigt Android-Wörterbuch das Ergebnis und bietet, solange die TypeWhisper-Tastatur aktiv ist, Jetzt abgleichen an. Wörter, die du in TypeWhisper löschst, kommen nicht zurück.",
      ],
    },
  ],
};

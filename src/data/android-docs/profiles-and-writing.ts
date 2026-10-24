import type { IosDocPage } from "@/data/ios-docs";

export const en: IosDocPage = {
  eyebrow: "Writing profiles",
  title: "Profiles and AI writing",
  description:
    "Turn Android dictations into messages, emails, notes or calendar drafts, assign profiles to apps and websites, and connect your own AI writing service.",
  intro:
    "A profile tells TypeWhisper what to make of a dictation: a cleaned-up text, a message, an email, a translation or the result of your own instruction. Profiles use an AI writing service that you connect with your own key or server.",
  sections: [
    {
      title: "What a profile holds",
      paragraphs: [
        "Open Settings → Profiles. TypeWhisper starts with Email · Professional, Calendar Event, Note, Message, Cleaned Text and, unless your phone is set to English, Translation · English. Tap a profile to edit it, or tap Add profile.",
      ],
      bullets: [
        "Name (optional): without a name, the profile is named after its settings, for example “Email · Professional”.",
        "Format: what the writing service makes of your dictation.",
        "Tone (Message, Email, Note): Automatic, Casual, Friendly or Professional.",
        "Length (Email, Note, Summary): Short, Medium or Detailed.",
        "Translate into (Translation): one of 20 target languages.",
        "Custom instruction (Custom): your own instruction, for example “Translate into English and keep it short.”",
        "Use automatically in these apps and Use automatically on these websites: see below.",
        "Speech recognition and Language: As in settings, or a fixed engine and language for this profile. The model comes from that engine’s model page.",
      ],
      image: {
        path: "/screenshots/android/06-profiles.png",
        alt: "List of writing profiles in TypeWhisper for Android",
        layout: "phone",
      },
    },
    {
      title: "Formats",
      bullets: [
        "Cleaned Text: fixes punctuation, grammar, casing and spacing, and keeps your wording.",
        "Message: the exact message to paste into a chat. If you dictate “tell Alex that…”, it writes the message to Alex. No greeting or emoji unless you dictated one.",
        "Email: a complete email with greeting, body and closing, and the subject separately.",
        "Note: a short, readable note that keeps the important details.",
        "Calendar Event: a calendar draft with name, time, place and notes.",
        "Checklist: one item per line, each starting with “•”.",
        "Summary: a short, accurate summary.",
        "Translation: a faithful translation into the target language, without shortening.",
        "Custom: follows your custom instruction.",
      ],
      paragraphs: [
        "Dictation in the profile menu means no profile: the text is used as recognized, after text clean-up, dictionary and snippets. Plain dictation never goes to a writing service.",
      ],
      callout: {
        title: "Premium",
        description:
          "The Email and Calendar Event formats need Premium, as does a profile that uses Nemotron Live. Such profiles show a lock without Premium. Dictating without a profile stays free.",
      },
    },
    {
      title: "Use a profile while you dictate",
      bullets: [
        "Record screen: tap the “Profile: …” chip below the engine name and choose Dictation or a profile. It stays active until you change it.",
        "Keyboard: tap the profile chip. Your choice there also becomes the active profile. Calendar Event is not offered in the keyboard, because its result goes to the calendar app.",
        "Apps: with Use automatically in these apps, the keyboard and the dictation bubble switch to this profile in the apps you pick. Without assigned apps, they use the active profile.",
        "Websites: with Use automatically on these websites, add domains such as example.com. You can paste a full URL; only the domain is kept and subdomains are included. Websites are recognized in Chrome, Edge, Brave, Opera, Vivaldi and DuckDuckGo while the dictation bubble is on. If apps are chosen too, both must match.",
        "Order: a profile for the app and the website wins over one for the website alone, which wins over one for the app alone. Within each step, the order in the profile list decides, which is the order you created the profiles in.",
        "Text you already wrote: select it in any app, choose TypeWhisper in the selection menu, pick a profile under Rewrite with a profile and tap Replace (Copy for read-only text). In the TypeWhisper keyboard, select text and tap Rewrite.",
      ],
      callout: {
        title: "Password fields",
        description:
          "In password fields, the keyboard and the bubble insert plain dictation. The text is never sent to a writing service.",
      },
    },
    {
      title: "Connect an AI writing service",
      paragraphs: [
        "Open Settings → AI writing and tap Set up step by step (once the service is set up, the button reads Run the setup again). Every step saves right away.",
      ],
      steps: [
        {
          title: "Service",
          description:
            "Choose OpenAI, OpenRouter, Groq, Meta, Anthropic (Claude), Google Gemini or Own server for an OpenAI-compatible server such as Ollama or LM Studio.",
        },
        {
          title: "Access",
          description:
            "Paste your API key. The link Create a key at… opens the provider’s key page where one is known. The key is stored encrypted on your phone and is only sent to that service. For Own server, enter the server address including /v1: HTTPS, or HTTP on your local network. A key is only needed if your server asks for one.",
        },
        {
          title: "Model",
          description:
            "TypeWhisper loads the service’s model list and preselects a recommended model. You can change it any time.",
        },
        {
          title: "Consent",
          description:
            "Allow sending dictations with a writing profile to the service. Without your consent, TypeWhisper sends nothing there.",
        },
        {
          title: "Test",
          description:
            "TypeWhisper checks that the service answers with your settings. Later you can run Test connection on the AI writing page.",
        },
      ],
      bullets: [
        "The AI writing page also lets you change the service, the model (Load models fetches the list) and the switch Send dictations to … for rewriting.",
        "Switching to another service resets the model and your consent; a new server address resets your consent.",
        "Groq, OpenAI, Meta and Own server share one key between speech recognition and AI writing; Own server also shares its Server URL. All keys are also listed under Settings → Cloud providers.",
      ],
      image: {
        path: "/screenshots/android/writing-settings.png",
        alt: "Step-by-step setup of an AI writing service in TypeWhisper for Android",
        layout: "phone",
      },
      callout: {
        title: "What a writing service receives",
        description:
          "Only the text of dictations with a writing profile and text you choose to rewrite, after clean-up and dictionary corrections, plus the profile’s instructions and, for calendar events, the current date, time and time zone. It never receives your audio, your history or your dictionary. If the service is not set up or fails, TypeWhisper inserts the plain dictation and tells you why.",
      },
    },
    {
      title: "Email and calendar drafts",
      bullets: [
        "Email: the result shows “Subject: …” above the body. Email draft, on the Record screen and in History, opens your mail app with subject and body filled in. In the keyboard and the bubble, only the body is inserted; the subject stays in History.",
        "Calendar Event: the draft shows name, time, place and notes. Add to calendar opens your calendar app’s new-event screen with everything filled in, and you save the event there. TypeWhisper needs no calendar permission for this.",
        "The calendar app does not report back whether you saved. When you return, tap I saved the event, or Open draft again.",
        "Missing details are marked: without a date or time, the next full hour is a placeholder; without an end time, the event lasts one hour.",
        "After a quick dictation with a Calendar Event profile, the notification says Calendar draft ready and offers Add to calendar.",
        "History shows the recognized text under “Before corrections” when processing changed it. Report AI text in the ⋮ menu lets you report a bad result by email.",
      ],
    },
    {
      title: "Text clean-up",
      paragraphs: [
        "Settings → Text clean-up works without a writing service. It applies to dictations, the keyboard and imported files, before the dictionary and profiles.",
      ],
      bullets: [
        "Remove filler words (on by default): ähm, äh, uh, erm and the like; “um” only in English, “euh” only in French.",
        "Collapse stutters (on by default): a word repeated three times or more is kept once, “I, I, I think” becomes “I think”.",
        "Spoken punctuation (off by default): “comma”, “period”, “question mark”, “new line” and “new paragraph” become marks, also in German.",
        "Numbers as digits (off by default): spoken numbers from ten up become digits, “twenty three” becomes 23.",
        "Chinese characters: As recognized, Simplified, Traditional, Traditional (Taiwan) or Traditional (Hong Kong).",
        "In email, web and number fields, the keyboard never adds a final period.",
      ],
    },
  ],
};

export const de: IosDocPage = {
  eyebrow: "Schreibprofile",
  title: "Profile und KI-Schreiben",
  description:
    "Mach unter Android aus Diktaten Nachrichten, E-Mails, Notizen oder Kalender-Entwürfe, ordne Profile Apps und Websites zu und verbinde deinen Schreibdienst.",
  intro:
    "Ein Profil legt fest, was TypeWhisper aus einem Diktat macht: einen bereinigten Text, eine Nachricht, eine E-Mail, eine Übersetzung oder das Ergebnis deiner eigenen Anweisung. Dafür nutzen Profile einen KI-Dienst, den du mit deinem eigenen Schlüssel oder Server verbindest.",
  sections: [
    {
      title: "Was ein Profil festlegt",
      paragraphs: [
        "Öffne Einstellungen → Profile. Zum Start legt TypeWhisper E-Mail · Professionell, Kalendertermin, Notiz, Nachricht, Bereinigter Text und, sofern dein Handy nicht auf Englisch eingestellt ist, Übersetzung · Englisch an. Tippe auf ein Profil, um es zu bearbeiten, oder auf Profil hinzufügen.",
      ],
      bullets: [
        "Name (optional): Ohne Namen heißt das Profil nach seinen Einstellungen, zum Beispiel „E-Mail · Professionell“.",
        "Format: was der Schreibdienst aus deinem Diktat macht.",
        "Ton (Nachricht, E-Mail, Notiz): Automatisch, Locker, Freundlich oder Professionell.",
        "Länge (E-Mail, Notiz, Zusammenfassung): Kurz, Mittel oder Ausführlich.",
        "Übersetzen nach (Übersetzung): eine von 20 Zielsprachen.",
        "Eigene Anweisung (Benutzerdefiniert): deine eigene Vorgabe, zum Beispiel „Ins Englische übersetzen und kurz halten.“",
        "Automatisch in diesen Apps und Automatisch auf diesen Websites: siehe unten.",
        "Spracherkennung und Sprache: Wie in den Einstellungen oder eine feste Engine und Sprache für dieses Profil. Das Modell kommt von der Modellseite der jeweiligen Engine.",
      ],
      image: {
        path: "/screenshots/android/06-profiles.png",
        alt: "Liste der Schreibprofile in TypeWhisper für Android",
        layout: "phone",
      },
    },
    {
      title: "Formate",
      bullets: [
        "Bereinigter Text: korrigiert Satzzeichen, Grammatik, Groß- und Kleinschreibung und Abstände und lässt deine Formulierungen stehen.",
        "Nachricht: genau die Nachricht, die du in einen Chat einfügst. Diktierst du „sag Alex, dass …“, schreibt es die Nachricht an Alex. Anrede oder Emoji nur, wenn du sie diktiert hast.",
        "E-Mail: eine vollständige E-Mail mit Anrede, Text und Gruß, der Betreff steht separat.",
        "Notiz: eine kurze, gut lesbare Notiz mit allen wichtigen Details.",
        "Kalendertermin: ein Kalender-Entwurf mit Name, Zeit, Ort und Notizen.",
        "Checkliste: ein Punkt pro Zeile, jeweils mit „•“ davor.",
        "Zusammenfassung: eine knappe, sachlich genaue Zusammenfassung.",
        "Übersetzung: eine getreue Übersetzung in die Zielsprache, ohne Kürzungen.",
        "Benutzerdefiniert: folgt deiner eigenen Anweisung.",
      ],
      paragraphs: [
        "Diktat im Profilmenü heißt: kein Profil. Der Text wird so verwendet, wie er erkannt wurde, nach Textaufbereitung, Wörterbuch und Textbausteinen. Reines Diktat geht nie an einen Schreibdienst.",
      ],
      callout: {
        title: "Premium",
        description:
          "Die Formate E-Mail und Kalendertermin brauchen Premium, ebenso ein Profil, das Nemotron Live nutzt. Ohne Premium tragen solche Profile ein Schloss. Diktieren ohne Profil bleibt kostenlos.",
      },
    },
    {
      title: "Profil beim Diktieren nutzen",
      bullets: [
        "Aufnahme-Bildschirm: Tippe unter dem Namen der Engine auf den Chip „Profil: …“ und wähle Diktat oder ein Profil. Es bleibt aktiv, bis du es änderst.",
        "Tastatur: Tippe auf den Profil-Chip. Deine Wahl dort wird auch zum aktiven Profil. Kalendertermin steht in der Tastatur nicht zur Wahl, weil sein Ergebnis in die Kalender-App geht.",
        "Apps: Mit Automatisch in diesen Apps wechseln Tastatur und Diktier-Bubble in den gewählten Apps zu diesem Profil. Ohne zugeordnete Apps nutzen sie das aktive Profil.",
        "Websites: Unter Automatisch auf diesen Websites fügst du Domains wie example.com hinzu. Du kannst eine komplette URL einfügen; gespeichert wird nur die Domain, Subdomains gelten mit. Erkannt werden Websites in Chrome, Edge, Brave, Opera, Vivaldi und DuckDuckGo, solange die Diktier-Bubble an ist. Sind auch Apps gewählt, müssen beide passen.",
        "Reihenfolge: Ein Profil für App und Website geht einem nur für die Website vor, und dieses einem nur für die App. Innerhalb jeder Stufe entscheidet die Reihenfolge in der Profilliste, also die Reihenfolge, in der du die Profile angelegt hast.",
        "Schon geschriebener Text: Markiere ihn in einer beliebigen App, wähle im Auswahlmenü TypeWhisper, tippe unter Mit Profil umschreiben auf ein Profil und dann auf Ersetzen (bei schreibgeschütztem Text auf Kopieren). In der TypeWhisper-Tastatur markierst du den Text und tippst auf Umschreiben.",
      ],
      callout: {
        title: "Passwortfelder",
        description:
          "In Passwortfeldern fügen Tastatur und Bubble das reine Diktat ein. Der Text geht nie an einen Schreibdienst.",
      },
    },
    {
      title: "Schreibdienst verbinden",
      paragraphs: [
        "Öffne Einstellungen → KI-Schreiben und tippe auf Schritt für Schritt einrichten (ist der Dienst eingerichtet, heißt die Schaltfläche Einrichtung erneut durchgehen). Jeder Schritt wird sofort gespeichert.",
      ],
      steps: [
        {
          title: "Dienst",
          description:
            "Wähle OpenAI, OpenRouter, Groq, Meta, Anthropic (Claude), Google Gemini oder Eigener Server für einen OpenAI-kompatiblen Server wie Ollama oder LM Studio.",
        },
        {
          title: "Zugang",
          description:
            "Füge deinen API-Schlüssel ein. Wo die Seite des Anbieters bekannt ist, führt dich Schlüssel bei … erstellen direkt dorthin. Der Schlüssel liegt verschlüsselt auf deinem Handy und geht nur an diesen Dienst. Für einen eigenen Server gibst du die Server-Adresse inklusive /v1 ein: HTTPS, oder HTTP im eigenen Netz. Einen Schlüssel brauchst du nur, wenn dein Server einen verlangt.",
        },
        {
          title: "Modell",
          description:
            "TypeWhisper lädt die Modellliste des Dienstes und wählt ein empfohlenes Modell vor. Du kannst es jederzeit ändern.",
        },
        {
          title: "Zustimmung",
          description:
            "Erlaube, dass Diktate mit Schreibprofil an den Dienst gehen. Ohne deine Zustimmung schickt TypeWhisper dorthin nichts.",
        },
        {
          title: "Test",
          description:
            "TypeWhisper prüft, ob der Dienst mit deinen Einstellungen antwortet. Später geht das jederzeit mit Verbindung testen auf der Seite KI-Schreiben.",
        },
      ],
      bullets: [
        "Auf der Seite KI-Schreiben änderst du außerdem Schreibdienst, Modell (Modelle laden holt die Liste) und den Schalter Diktate zum Umschreiben an … senden.",
        "Wechselst du den Dienst, werden Modell und Zustimmung zurückgesetzt; bei einer neuen Server-Adresse nur die Zustimmung.",
        "Groq, OpenAI, Meta und Eigener Server nutzen einen Schlüssel für Spracherkennung und KI-Schreiben; der eigene Server teilt auch seine Server-URL. Alle Schlüssel findest du auch unter Einstellungen → Cloud-Anbieter.",
      ],
      image: {
        path: "/screenshots/android/writing-settings.png",
        alt: "Schrittweise Einrichtung eines Schreibdienstes in TypeWhisper für Android",
        layout: "phone",
      },
      callout: {
        title: "Was der Schreibdienst bekommt",
        description:
          "Nur den Text von Diktaten mit Schreibprofil und von Text, den du umschreiben lässt, nach Textaufbereitung und Wörterbuch-Korrekturen, dazu die Vorgaben des Profils und bei Kalenderterminen das aktuelle Datum mit Uhrzeit und Zeitzone. Dein Audio, deinen Verlauf und dein Wörterbuch bekommt er nie. Ist der Dienst nicht eingerichtet oder schlägt er fehl, fügt TypeWhisper das reine Diktat ein und sagt dir, warum.",
      },
    },
    {
      title: "E-Mail- und Kalender-Entwürfe",
      bullets: [
        "E-Mail: Über dem Text steht „Betreff: …“. E-Mail-Entwurf auf dem Aufnahme-Bildschirm und im Verlauf öffnet deine Mail-App mit Betreff und Text. In Tastatur und Bubble wird nur der Text eingefügt; der Betreff bleibt im Verlauf.",
        "Kalendertermin: Der Entwurf zeigt Name, Zeit, Ort und Notizen. Zum Kalender hinzufügen öffnet in deiner Kalender-App einen neuen Termin mit allen Angaben; gespeichert wird der Termin dort. TypeWhisper braucht dafür keine Kalenderberechtigung.",
        "Die Kalender-App meldet nicht zurück, ob du gespeichert hast. Tippe nach der Rückkehr auf Ich habe den Termin gespeichert oder auf Entwurf erneut öffnen.",
        "Fehlende Angaben werden markiert: Ohne Datum oder Uhrzeit steht die nächste volle Stunde als Platzhalter drin, ohne Endzeit dauert der Termin eine Stunde.",
        "Nach einem Schnelldiktat mit einem Kalendertermin-Profil meldet die Benachrichtigung Kalender-Entwurf bereit und bietet Zum Kalender hinzufügen an.",
        "Hat die Verarbeitung den Text verändert, zeigt der Verlauf das Erkannte unter „Vor den Korrekturen“. Mit KI-Text melden im ⋮-Menü meldest du ein schlechtes Ergebnis per E-Mail.",
      ],
    },
    {
      title: "Textaufbereitung",
      paragraphs: [
        "Einstellungen → Textaufbereitung funktioniert ohne Schreibdienst. Sie gilt für Diktate, die Tastatur und importierte Dateien und läuft vor Wörterbuch und Profilen.",
      ],
      bullets: [
        "Füllwörter entfernen (standardmäßig an): ähm, äh, öhm, uh, erm und Ähnliches; „um“ nur im Englischen, „euh“ nur im Französischen.",
        "Stotterer zusammenfassen (standardmäßig an): Ein Wort, das drei- oder mehrmals hintereinander kommt, bleibt einmal stehen, aus „ich, ich, ich weiß“ wird „ich weiß“.",
        "Gesprochene Satzzeichen (standardmäßig aus): „Komma“, „Punkt“, „Fragezeichen“, „neue Zeile“ und „neuer Absatz“ werden zu Zeichen, auch auf Englisch.",
        "Zahlen als Ziffern (standardmäßig aus): Gesprochene Zahlen ab zehn werden zu Ziffern, aus „dreiundzwanzig“ wird 23.",
        "Chinesische Schriftzeichen: Wie erkannt, Vereinfacht, Traditionell, Traditionell (Taiwan) oder Traditionell (Hongkong).",
        "In E-Mail-, Web- und Zahlenfeldern setzt die Tastatur nie einen Schlusspunkt.",
      ],
    },
  ],
};

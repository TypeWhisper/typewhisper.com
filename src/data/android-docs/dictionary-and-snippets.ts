import type { IosDocPage } from "@/data/ios-docs";

export const en: IosDocPage = {
  eyebrow: "Your own words",
  title: "Dictionary and snippets",
  description:
    "Teach TypeWhisper names and jargon, fix words it mishears, sync with Android's personal dictionary, and expand short spoken triggers into text.",
  intro:
    "The dictionary helps TypeWhisper write names and specialist terms correctly. Snippets replace a short spoken trigger with a longer text after transcription.",
  sections: [
    {
      title: "Terms and corrections",
      paragraphs: [
        "Open the Dictionary tab and tap Add entry. At the top of the dialog, choose one of two entry types.",
      ],
      bullets: [
        "Term: a name, product or specialist word that should be recognized, such as TypeWhisper. Terms help while your speech is being recognized.",
        "Correction: replaces a word that still comes out wrong. Enter the wrong form under Heard as and the right text under Replace with, for example Par Kit → Parakeet. Leave Replace with empty to remove the word.",
        "Case sensitive makes an entry match only with exactly the same capitalization.",
        "Corrections apply after every dictation and again to the text a writing profile returns.",
        "Entries that contain letters or digits match only whole words, so a short entry does not change parts of longer words.",
      ],
      image: {
        path: "/screenshots/android/07-dictionary.png",
        alt: "TypeWhisper Dictionary tab with corrections and terms on an Android phone",
        layout: "phone",
      },
    },
    {
      title: "How terms help recognition",
      bullets: [
        "Parakeet uses your terms through the vocabulary boost, an extra model that is downloaded once. If Parakeet is your engine, saving your first term starts the download. Until it is ready, the Dictionary tab shows Terms need the vocabulary boost.",
        "Engines that accept a word list, such as several cloud engines, receive your terms together with the recording.",
        "Engines that cannot take terms get close misspellings fixed in the text afterwards. Ordinary words that only sound similar usually stay as they are.",
        "Terms are not matched in text written in non-Latin scripts, such as Russian, Ukrainian, Greek, Chinese, Japanese or Korean (for example from GigaAM or SenseVoice). Corrections still work there.",
      ],
    },
    {
      title: "Manage, learn and back up entries",
      bullets: [
        "The switch next to an entry turns it off without deleting it. Turned-off entries are ignored until you switch them on again.",
        "Tap an entry to edit it or to delete it. Search dictionary filters the list.",
        "Learn from your edits: when you change a transcript with Edit text in the More options menu of a result or History entry, TypeWhisper offers the changed words as corrections. Pick the ones you want and tap Add corrections.",
        "Add correction in the same menu lets you tap the misheard words of a transcript and enter what you said.",
        "The More menu next to the search field offers Import (JSON, CSV or word list), Export as JSON and Export as CSV. Entries that already exist are skipped during import.",
        "To move your dictionary and snippets to another phone, use Back up settings and Restore a backup in Settings → Data and backup.",
      ],
    },
    {
      title: "Sync with Android's personal dictionary",
      paragraphs: [
        "Android keeps a personal dictionary that keyboards use for word suggestions. Android shares it only with the keyboard that is currently active. TypeWhisper can therefore sync it only while the TypeWhisper keyboard is your active keyboard.",
      ],
      bullets: [
        "The sync runs automatically when the TypeWhisper keyboard opens, at most every 10 minutes. Sync now in the Android dictionary row at the top of the Dictionary tab runs it right away.",
        "Words from Android's personal dictionary become terms in TypeWhisper. Your terms and the replacements of active corrections are added to Android's personal dictionary, so keyboards can suggest them.",
        "A word is only taken over once. If you delete a term in TypeWhisper, it does not come back, even though it stays in Android's personal dictionary.",
        "While another keyboard is active, the Android dictionary row explains that the TypeWhisper keyboard is needed.",
      ],
    },
    {
      title: "Create a snippet",
      steps: [
        {
          title: "Open Settings → Snippets",
          description: "Tap Create snippet.",
        },
        {
          title: "Choose a trigger",
          description:
            "Under When TypeWhisper hears, enter a short phrase that is unlikely to occur by accident, such as meeting link.",
        },
        {
          title: "Write the text",
          description:
            "Under Replace it with, enter the full text. The Date, Time, Date & time and Clipboard chips insert placeholders at the cursor, and Preview shows the result.",
        },
        {
          title: "Save",
          description:
            "Turn on Case sensitive if the trigger should match only with the same capitalization, then tap Save. The switch in the list turns a snippet off or on again.",
        },
      ],
      code: [
        "{{DATE}}",
        "{{TIME}}",
        "{{DATETIME}}",
        "{{CLIPBOARD}}",
        "{{DATE:yyyy-MM-dd}}",
      ],
      bullets: [
        "{{DATE}}, {{TIME}} and {{DATETIME}} insert the current date, time, or both, in the format of your language.",
        "{{CLIPBOARD}} inserts the text currently on the clipboard.",
        "Add your own pattern after a colon, such as {{DATE:yyyy-MM-dd}} or {{TIME:HH:mm}}. This works for DATE, TIME and DATETIME.",
      ],
    },
    {
      title: "Where snippets expand",
      bullets: [
        "Snippets apply after every transcription: in the app, in the TypeWhisper keyboard, with the dictation bubble, with quick dictation and for transcribed files.",
        "They expand after a writing profile has run, so the writing service does not rewrite your snippet text.",
        "Triggers that start and end with a letter or digit match only whole words, so “ok” does not fire inside “book”.",
        "Snippets react to dictated text, not to text you type.",
      ],
    },
  ],
};

export const de: IosDocPage = {
  eyebrow: "Deine eigenen Wörter",
  title: "Wörterbuch und Textbausteine",
  description:
    "Bring TypeWhisper Namen und Fachwörter bei, korrigiere falsch erkannte Wörter, gleiche mit dem persönlichen Android-Wörterbuch ab und mach aus kurzen Auslösern längere Texte.",
  intro:
    "Das Wörterbuch hilft TypeWhisper, Namen und Fachbegriffe richtig zu schreiben. Textbausteine ersetzen nach der Transkription einen kurzen gesprochenen Auslöser durch längeren Text.",
  sections: [
    {
      title: "Begriffe und Korrekturen",
      paragraphs: [
        "Öffne den Tab Wörterbuch und tippe auf Eintrag hinzufügen. Oben im Dialog wählst du eine von zwei Eintragsarten.",
      ],
      bullets: [
        "Begriff: ein Name, Produkt oder Fachwort, das erkannt werden soll, etwa TypeWhisper. Begriffe helfen schon bei der Spracherkennung.",
        "Korrektur: ersetzt ein Wort, das weiterhin falsch erkannt wird. Trag die falsche Form unter Erkannt als ein und den richtigen Text unter Ersetzen durch, zum Beispiel Par Kit → Parakeet. Lässt du Ersetzen durch leer, wird das Wort entfernt.",
        "Mit Groß- und Kleinschreibung beachten greift ein Eintrag nur bei genau gleicher Schreibweise.",
        "Korrekturen wirken nach jedem Diktat und noch einmal auf den Text, den ein Schreibprofil zurückgibt.",
        "Einträge mit Buchstaben oder Ziffern greifen nur bei ganzen Wörtern. Ein kurzer Eintrag ändert also keine Teile längerer Wörter.",
      ],
      image: {
        path: "/screenshots/android/07-dictionary.png",
        alt: "Tab Wörterbuch von TypeWhisper mit Korrekturen und Begriffen auf einem Android-Handy",
        layout: "phone",
      },
    },
    {
      title: "So helfen Begriffe bei der Erkennung",
      bullets: [
        "Parakeet nutzt deine Begriffe über den Vokabular-Boost, ein zusätzliches Modell, das einmalig geladen wird. Ist Parakeet deine Engine, startet der Download, sobald du den ersten Begriff speicherst. Bis er fertig ist, zeigt der Tab Wörterbuch den Hinweis Begriffe brauchen den Vokabular-Boost.",
        "Engines, die eine Wortliste annehmen, zum Beispiel mehrere Cloud-Engines, bekommen deine Begriffe zusammen mit der Aufnahme.",
        "Bei Engines, die keine Begriffe annehmen, werden ähnlich geschriebene Wörter danach im Text korrigiert. Normale Wörter, die nur ähnlich klingen, bleiben in der Regel unverändert.",
        "In Text mit nicht lateinischer Schrift, etwa Russisch, Ukrainisch, Griechisch, Chinesisch, Japanisch oder Koreanisch (zum Beispiel von GigaAM oder SenseVoice), werden Begriffe nicht erkannt. Korrekturen funktionieren dort trotzdem.",
      ],
    },
    {
      title: "Einträge verwalten, dazulernen und sichern",
      bullets: [
        "Mit dem Schalter neben einem Eintrag schaltest du ihn aus, ohne ihn zu löschen. Ausgeschaltete Einträge werden ignoriert, bis du sie wieder einschaltest.",
        "Tippe auf einen Eintrag, um ihn zu bearbeiten oder zu löschen. Über Wörterbuch durchsuchen filterst du die Liste.",
        "Aus Änderungen lernen: Änderst du ein Transkript mit Text bearbeiten im Menü Weitere Optionen eines Ergebnisses oder Verlaufseintrags, schlägt TypeWhisper die geänderten Wörter als Korrekturen vor. Wähl die passenden aus und tippe auf Korrekturen hinzufügen.",
        "Mit Korrektur hinzufügen im selben Menü tippst du die falsch erkannten Wörter eines Transkripts an und gibst ein, was du gesagt hast.",
        "Das Menü Mehr neben dem Suchfeld bietet Importieren (JSON, CSV oder Wortliste), Als JSON exportieren und Als CSV exportieren. Einträge, die es schon gibt, überspringt der Import.",
        "Um Wörterbuch und Textbausteine auf ein anderes Handy mitzunehmen, nutzt du Einstellungen sichern und Sicherung wiederherstellen unter Einstellungen → Daten und Sicherung.",
      ],
    },
    {
      title: "Abgleich mit dem Android-Wörterbuch",
      paragraphs: [
        "Android führt ein persönliches Wörterbuch, aus dem Tastaturen Wortvorschläge machen. Android teilt es nur mit der Tastatur, die gerade aktiv ist. TypeWhisper kann es deshalb nur abgleichen, solange die TypeWhisper-Tastatur deine aktive Tastatur ist.",
      ],
      bullets: [
        "Der Abgleich läuft automatisch, wenn sich die TypeWhisper-Tastatur öffnet, höchstens alle 10 Minuten. Jetzt abgleichen in der Zeile Android-Wörterbuch oben im Tab Wörterbuch startet ihn sofort.",
        "Wörter aus dem persönlichen Android-Wörterbuch werden in TypeWhisper zu Begriffen. Deine Begriffe und die Ersetzungen aktiver Korrekturen landen im persönlichen Android-Wörterbuch, damit Tastaturen sie vorschlagen können.",
        "Jedes Wort wird nur einmal übernommen. Löschst du einen Begriff in TypeWhisper, kommt er nicht zurück, auch wenn er im Android-Wörterbuch bleibt.",
        "Ist eine andere Tastatur aktiv, erklärt die Zeile Android-Wörterbuch, dass die TypeWhisper-Tastatur nötig ist.",
      ],
    },
    {
      title: "Textbaustein anlegen",
      steps: [
        {
          title: "Einstellungen → Textbausteine öffnen",
          description: "Tippe auf Textbaustein anlegen.",
        },
        {
          title: "Auslöser wählen",
          description:
            "Trag unter Wenn TypeWhisper hört eine kurze Wendung ein, die nicht zufällig vorkommt, etwa Meeting-Link.",
        },
        {
          title: "Text schreiben",
          description:
            "Unter Ersetzen durch gibst du den vollständigen Text ein. Die Chips Datum, Uhrzeit, Datum und Uhrzeit und Zwischenablage setzen Platzhalter an der Cursorposition ein, die Vorschau zeigt das Ergebnis.",
        },
        {
          title: "Speichern",
          description:
            "Schalte Groß- und Kleinschreibung beachten ein, wenn der Auslöser nur bei gleicher Schreibweise greifen soll, und tippe auf Speichern. Mit dem Schalter in der Liste schaltest du einen Textbaustein aus und wieder ein.",
        },
      ],
      code: [
        "{{DATE}}",
        "{{TIME}}",
        "{{DATETIME}}",
        "{{CLIPBOARD}}",
        "{{DATE:yyyy-MM-dd}}",
      ],
      bullets: [
        "{{DATE}}, {{TIME}} und {{DATETIME}} setzen das aktuelle Datum, die Uhrzeit oder beides im Format deiner Sprache ein.",
        "{{CLIPBOARD}} setzt den Text ein, der gerade in der Zwischenablage liegt.",
        "Nach einem Doppelpunkt kannst du ein eigenes Muster angeben, etwa {{DATE:dd.MM.yyyy}} oder {{TIME:HH:mm}}. Das geht bei DATE, TIME und DATETIME.",
      ],
    },
    {
      title: "Wo Textbausteine wirken",
      bullets: [
        "Textbausteine greifen nach jeder Transkription: in der App, in der TypeWhisper-Tastatur, mit der Diktier-Bubble, beim Schnelldiktat und bei transkribierten Dateien.",
        "Sie werden erst nach einem Schreibprofil eingesetzt. Der Schreibdienst formuliert deinen Textbaustein also nicht um.",
        "Auslöser, die mit einem Buchstaben oder einer Ziffer beginnen und enden, greifen nur bei ganzen Wörtern. „Tor“ löst also nicht mitten in „Motor“ aus.",
        "Textbausteine reagieren auf diktierten Text, nicht auf getippten.",
      ],
    },
  ],
};

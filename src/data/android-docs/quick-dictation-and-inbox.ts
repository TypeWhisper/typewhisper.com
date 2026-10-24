import type { IosDocPage } from "@/data/ios-docs";

export const en: IosDocPage = {
  eyebrow: "Quick capture",
  title: "Quick dictation and Inbox",
  description:
    "Dictate without opening TypeWhisper: use the quick settings tile, the home screen widget, an app shortcut or the assist gesture, then check the Inbox.",
  intro:
    "Quick dictation records without opening the app. The text is copied to the clipboard and waits in the Inbox in History until you open it.",
  sections: [
    {
      title: "How quick dictation works",
      steps: [
        {
          title: "Start recording",
          description:
            "Tap the Dictate tile in quick settings, the microphone on the widget or the Dictate app shortcut, or use the assist gesture. Recording starts right away and TypeWhisper stays in the background.",
        },
        {
          title: "Speak",
          description:
            "If notifications are allowed, a Recording notification shows a timer and the buttons Stop, Pause and Cancel.",
        },
        {
          title: "Stop",
          description:
            "Tap the tile again, the stop button on the widget or Stop in the notification. The Dictate shortcut and the assist gesture also stop a running quick dictation.",
        },
        {
          title: "Paste the text",
          description:
            "TypeWhisper transcribes with your speech recognition settings and the active profile, copies the text to the clipboard and puts it in the Inbox. Paste it wherever you need it.",
        },
      ],
      bullets: [
        "The active profile is the one shown as Profile: … on the Record screen. Choose Dictation there for plain text.",
        "Quick dictation needs microphone access. If it is missing, TypeWhisper opens instead and asks you to allow it.",
      ],
    },
    {
      title: "Add the Dictate tile to quick settings",
      steps: [
        {
          title: "Open quick settings",
          description:
            "Swipe down from the top of the screen. On most phones a second swipe shows all tiles.",
        },
        {
          title: "Edit the tiles",
          description:
            "Tap the edit button, often a pencil icon. On some phones it is in a menu behind three dots.",
        },
        {
          title: "Add Dictate",
          description:
            "Find the TypeWhisper tile named Dictate and drag it to your active tiles.",
        },
        {
          title: "Dictate",
          description:
            "Tap Dictate to start and tap it again to stop. While TypeWhisper records or transcribes, the tile is highlighted and shows Recording or Transcribing….",
        },
      ],
      callout: {
        title: "Menus differ between phones",
        description:
          "Each manufacturer names and places the edit button for quick settings a little differently. If you cannot find it, search your phone's settings or help pages for quick settings.",
      },
    },
    {
      title: "Add the TypeWhisper widget",
      steps: [
        {
          title: "Open the widget list",
          description:
            "Touch and hold an empty spot on the home screen, then tap Widgets. Some launchers use a different name for this menu.",
        },
        {
          title: "Place the widget",
          description:
            "Find TypeWhisper, touch and hold its widget and drag it to the home screen. It is one row high and about four columns wide, and you can resize it.",
        },
      ],
      bullets: [
        "The microphone button starts a quick dictation. While recording, it turns into a stop button.",
        "The status line shows Recording, Transcribing…, how many entries are open in Inbox, or Latest transcription.",
        "The text area shows the newest open Inbox entry, otherwise your latest transcription. Tap it to open the entry in History.",
        "The copy button copies the text the widget shows.",
        "While an Inbox entry is shown, a check mark button marks it as done.",
      ],
    },
    {
      title: "App shortcuts and the assist gesture",
      paragraphs: [
        "Touch and hold the TypeWhisper icon on the home screen or in the app list to see its shortcuts. Many launchers also let you drag a shortcut to the home screen as its own icon.",
      ],
      bullets: [
        "Dictate starts or stops a quick dictation.",
        "Copy last copies your latest transcription without opening the app.",
        "Transcribe file opens File transcription.",
      ],
      steps: [
        {
          title: "Open the setting",
          description:
            "In TypeWhisper, open Settings and tap Assist gesture under Tools. TypeWhisper opens the Android settings page where you choose the digital assistant app. Its name and place differ between phones.",
        },
        {
          title: "Choose TypeWhisper",
          description:
            "Select TypeWhisper as the digital assistant app. Back in TypeWhisper, the Assist gesture row then starts with On.",
        },
        {
          title: "Dictate with the gesture",
          description:
            "Use your phone's assist gesture, for example holding the power button or swiping up from a bottom corner. The same gesture stops the recording.",
        },
      ],
      callout: {
        title: "Only one assistant app",
        description:
          "While TypeWhisper is the digital assistant app, the gesture no longer opens your previous assistant. To switch back, choose another app on the same Android settings page.",
      },
    },
    {
      title: "Notifications and calendar drafts",
      paragraphs: [
        "Allow notifications to see quick dictations while they run and when they are ready. In Android's notification settings for TypeWhisper, they appear as the categories Recording and Quick dictation results.",
      ],
      bullets: [
        "Dictation copied and in Inbox appears when the text is ready. Tap it to open the entry in History.",
        "Dictation failed shows the reason. If a recording was made, it waits in Recoverable recordings in History, so you can transcribe it again.",
        "With a Calendar Event profile active, Calendar draft ready appears instead. Its Add to calendar button opens your calendar app with the event filled in.",
        "If the date, the time or the end time was missing, the draft says so and uses a placeholder you can change in the calendar app.",
      ],
      callout: {
        title: "Confirm saved events",
        description:
          "Your calendar app does not tell TypeWhisper whether you saved the event. After saving it, open the entry in History and tap I saved the event. Calendar Event is a Premium format and needs a writing service set up under AI writing.",
      },
      image: {
        path: "/screenshots/android/04-calendar.png",
        alt: "Calendar draft in TypeWhisper History with the Add to calendar button",
        layout: "phone",
      },
    },
    {
      title: "Work through the Inbox",
      paragraphs: [
        "The Inbox is a filter in History. It collects quick dictations from the tile, the widget, the Dictate shortcut and the assist gesture. Dictations from the Record screen, the keyboard and the bubble, and file transcriptions, go straight to History.",
      ],
      bullets: [
        "While entries wait, the History tab shows a badge with their number, and History opens on the Inbox filter. Tap All to see everything.",
        "Entries still in the Inbox appear in bold. Opening an entry takes it out of the Inbox and removes its notification.",
        "Opening a calendar draft does not take it out of the Inbox. It stays there until you tap I saved the event, choose Discard calendar draft from the ⋮ menu or mark it as done.",
        "Swipe an entry to the right to mark it as done, or to put a finished entry back with Move to Inbox. Swipe left to delete it.",
        "To keep an opened entry for later, choose Move to Inbox from the ⋮ menu in its detail view.",
        "Touch and hold to select several entries, then tap Mark as done.",
        "Failed quick dictations count toward the Inbox too. They wait in Recoverable recordings at the top of History, where you can try them again.",
        "If notifications are off, the Inbox shows Know when dictations are ready with an Allow button.",
      ],
      image: {
        path: "/screenshots/android/02-inbox.png",
        alt: "TypeWhisper History with the Inbox filter and open quick dictations",
        layout: "phone",
      },
    },
  ],
};

export const de: IosDocPage = {
  eyebrow: "Schnell erfassen",
  title: "Schnelldiktat und Inbox",
  description:
    "Diktieren, ohne TypeWhisper zu öffnen: per Schnelleinstellungs-Kachel, Widget, App-Verknüpfung oder Assistent-Geste. Danach wartet alles in der Inbox.",
  intro:
    "Ein Schnelldiktat nimmt auf, ohne dass du die App öffnest. Der Text landet in der Zwischenablage und wartet in der Inbox im Verlauf, bis du ihn öffnest.",
  sections: [
    {
      title: "So funktioniert ein Schnelldiktat",
      steps: [
        {
          title: "Aufnahme starten",
          description:
            "Tippe in den Schnelleinstellungen auf die Kachel „Diktieren“, im Widget auf das Mikrofon oder auf die App-Verknüpfung „Diktieren“, oder nutze die Assistent-Geste. Die Aufnahme startet sofort, TypeWhisper bleibt im Hintergrund.",
        },
        {
          title: "Sprechen",
          description:
            "Sind Benachrichtigungen erlaubt, zeigt die Benachrichtigung „Aufnahme läuft“ einen Timer und die Schaltflächen „Stopp“, „Pause“ und „Verwerfen“.",
        },
        {
          title: "Stoppen",
          description:
            "Tippe noch einmal auf die Kachel, im Widget auf die Stopp-Taste oder in der Benachrichtigung auf „Stopp“. Auch die Verknüpfung „Diktieren“ und die Assistent-Geste beenden ein laufendes Schnelldiktat.",
        },
        {
          title: "Text einfügen",
          description:
            "TypeWhisper transkribiert mit deinen Einstellungen zur Spracherkennung und dem aktiven Profil, kopiert den Text in die Zwischenablage und legt ihn in die Inbox. Füge ihn ein, wo du ihn brauchst.",
        },
      ],
      bullets: [
        "Aktiv ist das Profil, das im Tab „Aufnehmen“ als „Profil: …“ angezeigt wird. Wähle dort „Diktat“ für reinen Text.",
        "Ein Schnelldiktat braucht Zugriff aufs Mikrofon. Fehlt er, öffnet sich stattdessen TypeWhisper und bittet dich, ihn zu erlauben.",
      ],
    },
    {
      title: "Kachel „Diktieren“ hinzufügen",
      steps: [
        {
          title: "Schnelleinstellungen öffnen",
          description:
            "Wische vom oberen Bildschirmrand nach unten. Auf den meisten Handys zeigt ein zweites Wischen alle Kacheln.",
        },
        {
          title: "Kacheln bearbeiten",
          description:
            "Tippe auf die Schaltfläche zum Bearbeiten, oft ein Stift. Auf manchen Handys steckt sie in einem Menü hinter drei Punkten.",
        },
        {
          title: "„Diktieren“ hinzufügen",
          description:
            "Such die TypeWhisper-Kachel „Diktieren“ und zieh sie zu deinen aktiven Kacheln.",
        },
        {
          title: "Diktieren",
          description:
            "Tippe auf „Diktieren“, um zu starten, und noch einmal, um zu stoppen. Solange TypeWhisper aufnimmt oder transkribiert, ist die Kachel hervorgehoben und zeigt „Aufnahme läuft“ oder „Transkription läuft …“.",
        },
      ],
      callout: {
        title: "Menüs sehen je nach Handy anders aus",
        description:
          "Jeder Hersteller benennt und platziert das Bearbeiten der Schnelleinstellungen etwas anders. Findest du es nicht, such in den Einstellungen oder der Hilfe deines Handys nach „Schnelleinstellungen“.",
      },
    },
    {
      title: "TypeWhisper-Widget hinzufügen",
      steps: [
        {
          title: "Widget-Liste öffnen",
          description:
            "Halte eine freie Stelle auf dem Startbildschirm gedrückt und tippe auf „Widgets“. Manche Launcher nennen das Menü anders.",
        },
        {
          title: "Widget platzieren",
          description:
            "Such TypeWhisper, halte das Widget gedrückt und zieh es auf den Startbildschirm. Es ist eine Zeile hoch und etwa vier Spalten breit, die Größe kannst du anpassen.",
        },
      ],
      bullets: [
        "Das Mikrofon startet ein Schnelldiktat. Während der Aufnahme wird daraus eine Stopp-Taste.",
        "Die Statuszeile zeigt „Aufnahme läuft“, „Transkription läuft …“, wie viele Einträge offen in der Inbox sind, oder „Letzte Transkription“.",
        "Im Textbereich steht der neueste offene Inbox-Eintrag, sonst deine letzte Transkription. Tippst du darauf, öffnet sich der Eintrag im Verlauf.",
        "Die Kopieren-Taste kopiert den Text, den das Widget gerade zeigt.",
        "Zeigt das Widget einen Inbox-Eintrag, markiert ihn die Häkchen-Taste als erledigt.",
      ],
    },
    {
      title: "App-Verknüpfungen und Assistent-Geste",
      paragraphs: [
        "Halte das TypeWhisper-Symbol auf dem Startbildschirm oder in der App-Liste gedrückt, um die Verknüpfungen zu sehen. In vielen Launchern kannst du eine Verknüpfung auch als eigenes Symbol auf den Startbildschirm ziehen.",
      ],
      bullets: [
        "„Diktieren“ startet oder stoppt ein Schnelldiktat.",
        "„Letzte kopieren“ kopiert deine letzte Transkription, ohne die App zu öffnen.",
        "„Datei transkribieren“ öffnet „Dateien transkribieren“.",
      ],
      steps: [
        {
          title: "Einstellung öffnen",
          description:
            "Öffne in TypeWhisper die Einstellungen und tippe unter „Werkzeuge“ auf „Assistent-Geste“. TypeWhisper öffnet die Android-Seite, auf der du die Assistent-App auswählst. Wie sie heißt und wo sie liegt, hängt vom Handy ab.",
        },
        {
          title: "TypeWhisper auswählen",
          description:
            "Wähle TypeWhisper als Assistent-App. Zurück in TypeWhisper beginnt die Zeile „Assistent-Geste“ dann mit „An“.",
        },
        {
          title: "Mit der Geste diktieren",
          description:
            "Nutze die Assistent-Geste deines Handys, zum Beispiel die Ein-/Aus-Taste gedrückt halten oder aus einer unteren Ecke nach oben wischen. Dieselbe Geste stoppt die Aufnahme.",
        },
      ],
      callout: {
        title: "Nur eine Assistent-App",
        description:
          "Solange TypeWhisper die Assistent-App ist, öffnet die Geste deinen bisherigen Assistenten nicht mehr. Um zurückzuwechseln, wählst du auf derselben Android-Seite eine andere App.",
      },
    },
    {
      title: "Benachrichtigungen und Kalender-Entwürfe",
      paragraphs: [
        "Erlaube Benachrichtigungen, damit du Schnelldiktate während der Aufnahme siehst und erfährst, wann sie fertig sind. In den Android-Benachrichtigungseinstellungen für TypeWhisper heißen die Kategorien „Aufnahme“ und „Ergebnisse von Schnelldiktaten“.",
      ],
      bullets: [
        "„Diktat kopiert und in der Inbox“ erscheint, sobald der Text fertig ist. Tippst du darauf, öffnet sich der Eintrag im Verlauf.",
        "„Diktat fehlgeschlagen“ nennt den Grund. Gab es eine Aufnahme, wartet sie im Verlauf unter „Wiederherstellbare Aufnahmen“, damit du sie erneut transkribieren kannst.",
        "Ist ein Profil „Kalendertermin“ aktiv, erscheint stattdessen „Kalender-Entwurf bereit“. Die Schaltfläche „Zum Kalender hinzufügen“ öffnet deine Kalender-App mit dem ausgefüllten Termin.",
        "Fehlten Datum, Uhrzeit oder Endzeit, weist der Entwurf darauf hin und trägt einen Platzhalter ein, den du in der Kalender-App ändern kannst.",
      ],
      callout: {
        title: "Gespeicherte Termine bestätigen",
        description:
          "Deine Kalender-App meldet TypeWhisper nicht, ob du den Termin gespeichert hast. Öffne danach den Eintrag im Verlauf und tippe auf „Ich habe den Termin gespeichert“. „Kalendertermin“ ist ein Premium-Format und braucht einen eingerichteten Dienst unter „KI-Schreiben“.",
      },
      image: {
        path: "/screenshots/android/04-calendar.png",
        alt: "Kalender-Entwurf im TypeWhisper-Verlauf mit der Schaltfläche „Zum Kalender hinzufügen“",
        layout: "phone",
      },
    },
    {
      title: "Die Inbox abarbeiten",
      paragraphs: [
        "Die Inbox ist ein Filter im Verlauf. Dort sammeln sich Schnelldiktate von Kachel, Widget, Verknüpfung „Diktieren“ und Assistent-Geste. Diktate aus dem Tab „Aufnehmen“, von der Tastatur und der Bubble sowie transkribierte Dateien landen direkt im Verlauf.",
      ],
      bullets: [
        "Solange Einträge warten, zeigt der Tab „Verlauf“ ein Badge mit ihrer Anzahl, und der Verlauf öffnet sich mit dem Filter „Inbox“. Tippe auf „Alle“, um alles zu sehen.",
        "Einträge, die noch in der Inbox liegen, werden fett angezeigt. Öffnest du einen Eintrag, verlässt er die Inbox und seine Benachrichtigung verschwindet.",
        "Öffnest du einen Kalender-Entwurf, bleibt er in der Inbox, bis du „Ich habe den Termin gespeichert“ antippst, im ⋮-Menü „Kalender-Entwurf verwerfen“ wählst oder ihn als erledigt markierst.",
        "Wische einen Eintrag nach rechts, um ihn als erledigt zu markieren oder einen erledigten mit „In die Inbox legen“ zurückzuholen. Wischst du nach links, wird er gelöscht.",
        "Willst du einen geöffneten Eintrag für später aufheben, wähle in seiner Detailansicht im ⋮-Menü „In die Inbox legen“.",
        "Halte Einträge gedrückt, um mehrere auszuwählen, und tippe dann auf „Als erledigt markieren“.",
        "Auch fehlgeschlagene Schnelldiktate zählen zur Inbox. Sie warten oben im Verlauf unter „Wiederherstellbare Aufnahmen“, wo du sie erneut versuchen kannst.",
        "Sind Benachrichtigungen aus, zeigt die Inbox den Hinweis „Erfahren, wann Diktate fertig sind“ mit der Schaltfläche „Erlauben“.",
      ],
      image: {
        path: "/screenshots/android/02-inbox.png",
        alt: "TypeWhisper-Verlauf mit dem Filter „Inbox“ und offenen Schnelldiktaten",
        layout: "phone",
      },
    },
  ],
};

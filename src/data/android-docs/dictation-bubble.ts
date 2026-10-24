import type { IosDocPage } from "@/data/ios-docs";

export const en: IosDocPage = {
  eyebrow: "Dictation bubble",
  title: "Dictate into other apps with the bubble",
  description:
    "Keep your usual keyboard and dictate into other apps with the optional bubble: what it accesses, how to turn it on, its settings and app or website profiles.",
  intro:
    "The dictation bubble is an optional, small button that appears next to the text field you are typing in. Tap it to dictate while you keep using your usual keyboard.",
  sections: [
    {
      title: "What the bubble is and what it accesses",
      paragraphs: [
        "TypeWhisper uses Android's AccessibilityService API for the optional dictation bubble. TypeWhisper is not an accessibility tool. The bubble is off until you agree to the notice in the app.",
        "What it accesses: the name of the app you are using, in web browsers the domain of the open page (for example example.com), the text field you are typing in (its text, cursor position and field type) and where windows such as the keyboard are on the screen.",
        "Why: to show the bubble next to editable text fields, to insert your dictation at the cursor without overwriting existing text, to skip password fields, to use the profile you assigned to that app or website and, if you turn it on, to send with the field's enter action.",
      ],
      callout: {
        title: "Stays on your phone",
        description:
          "This data is only used on your device. It is not stored and not sent to TypeWhisper or anyone else. As with every dictation, only your recording and the dictated text go to the speech and writing services you chose. The microphone only starts when you tap the bubble.",
      },
      image: {
        path: "/screenshots/android/bubble-disclosure.png",
        alt: "TypeWhisper notice about accessibility access for the dictation bubble",
        layout: "phone",
      },
    },
    {
      title: "Turn on the bubble",
      steps: [
        {
          title: "Open the notice",
          description:
            "Tap Set up dictation bubble in the Bubble step of the guided setup, Dictate into other apps on the Record tab, or the Show dictation bubble switch in Settings → Dictation bubble.",
        },
        {
          title: "Agree",
          description:
            "Read the notice and tap Agree and enable. No thanks leaves the bubble off.",
        },
        {
          title: "Enable the service in Android",
          description:
            "Android's accessibility settings open. Turn on TypeWhisper's Dictation bubble there. While the service is still off, Settings → Dictation bubble says “Enable TypeWhisper in Android's accessibility settings.” and offers Open accessibility settings.",
        },
        {
          title: "Allow the microphone",
          description:
            "If TypeWhisper has no microphone access yet, Settings → Dictation bubble shows Allow microphone. When everything is set, it shows “Ready. Open a text field in another app to dictate.”",
        },
      ],
      callout: {
        title: "Reactivation notice",
        description:
          "Tap Allow bubble notifications in the bubble settings. If TypeWhisper is later turned off in Android's accessibility settings while the bubble is on, a notification with Reactivate takes you back.",
      },
    },
    {
      title: "Dictate with the bubble",
      steps: [
        {
          title: "Tap a text field",
          description:
            "Open a text field in another app. The bubble appears; drag it to where you want it.",
        },
        {
          title: "Tap the bubble and speak",
          description:
            "Recording starts and the bubble shows a waveform with a small stop symbol.",
        },
        {
          title: "Tap again to stop",
          description:
            "The bubble shows a spinner while TypeWhisper transcribes, then inserts the text at the cursor in the field you started in.",
        },
      ],
      bullets: [
        "The close button next to the bubble cancels the recording.",
        "If the field changed or could not accept text, the dictation waits and the bubble shows a paste symbol. Tap the bubble in a text field to insert it, or tap the close button to discard it.",
        "The bubble does not appear in TypeWhisper itself, in password and sensitive fields, on the lock screen, or while you dictate in the app or keyboard. Turning the screen off cancels a bubble recording.",
      ],
      image: {
        path: "/screenshots/android/bubble.png",
        alt: "TypeWhisper dictation bubble next to a text field in another app",
        layout: "phone",
      },
    },
    {
      title: "Bubble settings",
      paragraphs: ["All options are in Settings → Dictation bubble."],
      bullets: [
        "Send after dictating: Never, When you end with “send” or “senden”, or Always. This is separate from the keyboard's setting. Some apps only send with their own send button. Sending needs Android 11 or newer.",
        "Space after dictation: shared with the TypeWhisper keyboard.",
        "Appearance: Size Small, Medium or Large, Transparency up to 60 % and Reset position. Transparency applies while idle; recording, processing and pending text stay fully visible.",
        "While recording: Left of the bubble and Right of the bubble each show Nothing, Time, Level, Profile or Engine. A preview shows the result.",
        "Show live text shows what you say next to the bubble. Nemotron Live streams it; other engines on this device recognize the last seconds again every 3 seconds, which uses more battery. Cloud engines show no live text, so your audio is not uploaded more than once.",
        "Engine for live text: Same as for dictation, or another engine on this device that is already downloaded. Live text size: Small, Medium or Large.",
      ],
    },
    {
      title: "Profiles for apps and websites",
      paragraphs: [
        "Apps without an assigned profile use your active profile. To translate or rewrite bubble dictations automatically, open a profile under Settings → Profiles (or Profiles in the bubble settings) and set Use automatically in these apps or Use automatically on these websites.",
      ],
      bullets: [
        "Websites are recognized in Chrome, Firefox, Samsung Internet, Edge, Brave, Opera, Vivaldi and DuckDuckGo while the dictation bubble is on. Android shows TypeWhisper the address bar only through its accessibility service.",
        "You can paste a full URL; only the domain is kept. Subdomains are included, so example.com also covers docs.example.com.",
        "If a profile has both apps and websites, both must match. A profile for the app and website wins over one for the website alone, which wins over one for the app alone.",
        "The TypeWhisper keyboard uses the same assignments. Calendar Event profiles are not applied in the bubble.",
      ],
    },
    {
      title: "History, private fields and turning it off",
      bullets: [
        "Bubble dictations appear in History with a Bubble tag and follow your recording retention settings.",
        "Private input fields are not saved. If Android cannot identify a field's privacy mode (including Android 12 and older), its dictations stay out of history.",
        "Password and sensitive fields are excluded; the bubble does not appear there.",
        "To turn the bubble off, switch off Show dictation bubble in Settings → Dictation bubble. To remove the accessibility access as well, also turn TypeWhisper off in Android's accessibility settings.",
        "If the bubble settings say the accessibility service is disconnected, turn TypeWhisper off and on in Android's accessibility settings.",
      ],
    },
  ],
};

export const de: IosDocPage = {
  eyebrow: "Diktier-Bubble",
  title: "Mit der Bubble in anderen Apps diktieren",
  description:
    "Behalte deine Tastatur und diktiere mit der optionalen Bubble in anderen Apps: worauf sie zugreift, wie du sie einschaltest, Einstellungen und Profile.",
  intro:
    "Die Diktier-Bubble ist eine optionale kleine Schaltfläche, die neben dem Textfeld erscheint, in dem du gerade schreibst. Tippe darauf, um zu diktieren, und nutze weiter deine gewohnte Tastatur.",
  sections: [
    {
      title: "Was die Bubble ist und worauf sie zugreift",
      paragraphs: [
        "TypeWhisper nutzt für die optionale Diktier-Bubble die AccessibilityService-API von Android. TypeWhisper ist keine Bedienungshilfe-App. Die Bubble bleibt aus, bis du dem Hinweis in der App zustimmst.",
        "Worauf sie zugreift: den Namen der App, die du gerade nutzt, in Browsern die Domain der geöffneten Seite (zum Beispiel example.com), das Textfeld, in dem du schreibst (Text, Cursorposition und Feldtyp), und wo Fenster wie die Tastatur auf dem Bildschirm liegen.",
        "Wofür: um die Bubble neben Textfeldern anzuzeigen, dein Diktat an der Cursorposition einzufügen, ohne vorhandenen Text zu überschreiben, Passwortfelder auszulassen, das Profil zu nutzen, das du der App oder Website zugewiesen hast, und, wenn du es einschaltest, mit der Eingabetaste des Feldes zu senden.",
      ],
      callout: {
        title: "Bleibt auf deinem Handy",
        description:
          "Diese Daten werden nur auf deinem Gerät verwendet. Sie werden nicht gespeichert und weder an TypeWhisper noch an andere gesendet. Wie bei jedem Diktat gehen nur deine Aufnahme und der diktierte Text an die Sprach- und Schreibdienste, die du ausgewählt hast. Das Mikrofon startet erst, wenn du die Bubble antippst.",
      },
      image: {
        path: "/screenshots/android/bubble-disclosure.png",
        alt: "Hinweis von TypeWhisper zum Zugriff der Diktier-Bubble über die Bedienungshilfen",
        layout: "phone",
      },
    },
    {
      title: "Bubble einschalten",
      steps: [
        {
          title: "Hinweis öffnen",
          description:
            "Tippe im Einrichtungsassistenten im Schritt Bubble auf Diktier-Bubble einrichten, im Tab Aufnehmen auf In anderen Apps diktieren oder in Einstellungen → Diktier-Bubble auf den Schalter Diktier-Bubble anzeigen.",
        },
        {
          title: "Zustimmen",
          description:
            "Lies den Hinweis und tippe auf Zustimmen und aktivieren. Mit Nein, danke bleibt die Bubble aus.",
        },
        {
          title: "Dienst in Android einschalten",
          description:
            "Die Bedienungshilfen von Android öffnen sich. Schalte dort die Diktier-Bubble von TypeWhisper ein. Solange der Dienst noch aus ist, zeigt Einstellungen → Diktier-Bubble „Aktiviere TypeWhisper in den Android-Bedienungshilfen.“ und die Schaltfläche Bedienungshilfen öffnen.",
        },
        {
          title: "Mikrofon erlauben",
          description:
            "Hat TypeWhisper noch keinen Mikrofonzugriff, zeigt Einstellungen → Diktier-Bubble die Schaltfläche Mikrofon erlauben. Ist alles eingerichtet, steht dort „Bereit. Öffne ein Textfeld in einer anderen App zum Diktieren.“",
        },
      ],
      callout: {
        title: "Hinweis zum erneuten Aktivieren",
        description:
          "Tippe in den Bubble-Einstellungen auf Bubble-Benachrichtigungen erlauben. Wird TypeWhisper später in den Android-Bedienungshilfen ausgeschaltet, während die Bubble an ist, führt dich eine Benachrichtigung mit Wieder aktivieren zurück.",
      },
    },
    {
      title: "Mit der Bubble diktieren",
      steps: [
        {
          title: "Textfeld antippen",
          description:
            "Öffne ein Textfeld in einer anderen App. Die Bubble erscheint; ziehe sie an die gewünschte Position.",
        },
        {
          title: "Bubble antippen und sprechen",
          description:
            "Die Aufnahme startet, und die Bubble zeigt eine Wellenform mit einem kleinen Stopp-Symbol.",
        },
        {
          title: "Zum Beenden erneut tippen",
          description:
            "Während TypeWhisper transkribiert, dreht sich ein Ladekreis. Danach landet der Text an der Cursorposition in dem Feld, in dem du begonnen hast.",
        },
      ],
      bullets: [
        "Die Schließen-Taste neben der Bubble bricht die Aufnahme ab.",
        "Hat sich das Feld geändert oder konnte es keinen Text annehmen, wartet das Diktat, und die Bubble zeigt ein Einfügen-Symbol. Tippe in einem Textfeld auf die Bubble, um es einzufügen, oder auf die Schließen-Taste, um es zu verwerfen.",
        "Die Bubble erscheint nicht in TypeWhisper selbst, in Passwortfeldern und als sensibel markierten Feldern, auf dem Sperrbildschirm und nicht, während du in der App oder mit der Tastatur diktierst. Schaltest du den Bildschirm aus, wird eine Bubble-Aufnahme abgebrochen.",
      ],
      image: {
        path: "/screenshots/android/bubble.png",
        alt: "Diktier-Bubble von TypeWhisper neben einem Textfeld in einer anderen App",
        layout: "phone",
      },
    },
    {
      title: "Einstellungen der Bubble",
      paragraphs: ["Alle Optionen findest du unter Einstellungen → Diktier-Bubble."],
      bullets: [
        "Nach dem Diktat senden: Nie, Wenn du mit „senden“ oder „send“ endest, oder Immer. Die Einstellung ist unabhängig von der Tastatur. Manche Apps senden nur über ihre eigene Senden-Taste. Senden braucht Android 11 oder neuer.",
        "Leerzeichen nach dem Diktat: gilt gemeinsam für Bubble und TypeWhisper-Tastatur.",
        "Darstellung: Größe Klein, Mittel oder Groß, Transparenz bis 60 % und Position zurücksetzen. Die Transparenz gilt im Ruhezustand; Aufnahme, Verarbeitung und ausstehender Text bleiben vollständig sichtbar.",
        "Während der Aufnahme: Links neben der Bubble und Rechts neben der Bubble zeigen jeweils Nichts, Zeit, Pegel, Profil oder Engine. Eine Vorschau zeigt das Ergebnis.",
        "Live-Text anzeigen zeigt neben der Bubble, was du gerade sagst. Nemotron Live liefert den Text direkt; andere Engines auf diesem Gerät erkennen die letzten Sekunden alle 3 Sekunden neu, das braucht mehr Akku. Cloud-Engines zeigen keinen Live-Text, damit dein Audio nicht mehrfach hochgeladen wird.",
        "Engine für den Live-Text: Wie beim Diktat oder eine andere, bereits geladene Engine auf diesem Gerät. Größe des Live-Texts: Klein, Mittel oder Groß.",
      ],
    },
    {
      title: "Profile für Apps und Websites",
      paragraphs: [
        "Ohne App-Zuordnung gilt dein aktives Profil. Damit Bubble-Diktate automatisch übersetzt oder umgeschrieben werden, öffne ein Profil unter Einstellungen → Profile (oder über Profile in den Bubble-Einstellungen) und lege Automatisch in diesen Apps oder Automatisch auf diesen Websites fest.",
      ],
      bullets: [
        "Websites werden in Chrome, Firefox, Samsung Internet, Edge, Brave, Opera, Vivaldi und DuckDuckGo erkannt, solange die Diktier-Bubble an ist. Die Adressleiste zeigt Android TypeWhisper nur über den Bedienungshilfedienst.",
        "Du kannst eine komplette URL einfügen; gespeichert wird nur die Domain. Subdomains gelten mit, example.com deckt also auch docs.example.com ab.",
        "Hat ein Profil Apps und Websites, müssen beide passen. Ein Profil für App und Website geht vor einem nur für die Website, das wiederum vor einem nur für die App.",
        "Die TypeWhisper-Tastatur nutzt dieselben Zuordnungen. Kalendertermin-Profile wendet die Bubble nicht an.",
      ],
    },
    {
      title: "Verlauf, private Felder und Ausschalten",
      bullets: [
        "Bubble-Diktate erscheinen mit dem Tag „Bubble“ im Verlauf und folgen deinen Einstellungen für gespeicherte Aufnahmen.",
        "Private Eingabefelder werden nicht gespeichert. Kann Android den Eingabemodus eines Feldes nicht zuordnen (auch unter Android 12 und älter), bleibt das Diktat ohne Verlauf.",
        "Passwortfelder und als sensibel markierte Felder sind ausgeschlossen; dort erscheint die Bubble nicht.",
        "Zum Ausschalten deaktivierst du Diktier-Bubble anzeigen in Einstellungen → Diktier-Bubble. Willst du auch den Zugriff über die Bedienungshilfen entfernen, schalte TypeWhisper zusätzlich in den Android-Bedienungshilfen aus.",
        "Melden die Bubble-Einstellungen, dass der Bedienungshilfedienst nicht verbunden ist, schalte TypeWhisper in den Android-Bedienungshilfen aus und wieder ein.",
      ],
    },
  ],
};

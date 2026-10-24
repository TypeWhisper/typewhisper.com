import type { IosDocPage } from "@/data/ios-docs";

export const en: IosDocPage = {
  eyebrow: "Control and ownership",
  title: "Privacy, cloud providers, and Premium",
  description:
    "What stays on your phone, what cloud providers receive, how private fields and the bubble are handled, and which features need Premium on Android.",
  intro:
    "Dictation, the dictionary, snippets, the keyboard and the dictation bubble work without an account or subscription. Cloud providers and Premium are optional and use separate data paths.",
  sections: [
    {
      title: "What stays on your phone",
      bullets: [
        "Engines marked on device, such as Parakeet, Whisper and Nemotron Live, turn speech into text on the phone and also work offline.",
        "History, Inbox, dictionary, snippets, profiles, statistics, voice profiles and kept recordings stay in the app's storage. Android backup is turned off for TypeWhisper.",
        "Keep recordings in Settings → General decides how long audio is kept, from Delete after transcription to Keep forever.",
        "API keys are stored encrypted with a key from the Android Keystore. Backups and exports never include them.",
        "The app contains no advertising, analytics, crash reporting or tracking SDKs.",
        "Settings → Data and backup lets you export everything with Export all data or remove it with Delete all data. Downloaded models stay. Voice profiles are biometric data and stay out of exports.",
      ],
    },
    {
      title: "When data leaves your phone",
      bullets: [
        "A cloud speech engine receives your recording only if you select it and enter your own API key under Settings → Cloud providers. The audio goes directly from your phone to that provider. Engines that accept a word list also receive your dictionary terms.",
        "Android speech recognition stays on the phone when an offline language is installed. Allow online fallback lets Android send the recording to its speech provider if a language is missing. It is off by default. On phones without an on-device recognizer, the system recognizer may send audio to its provider, for example Google.",
        "A writing service receives text only after you turn on Send dictations to … for rewriting in Settings → AI writing. It gets dictations that use a writing profile and text you select for rewriting. Plain dictation is not sent.",
        "Model files are downloaded from Hugging Face without account or device identifiers.",
        "Premium sign-in and purchase checks go to the TypeWhisper Premium service. They carry account, device and purchase status, never your recordings, transcripts, dictionary or snippets.",
        "Feedback reaches us only as an email you send from your own mail app.",
      ],
    },
    {
      title: "Private fields, the bubble and notifications",
      bullets: [
        "In password fields, the TypeWhisper keyboard dictates without a writing profile, saves nothing to the History and cannot rewrite selected text.",
        "In incognito fields, such as a private browser tab, dictations are not saved to the History and no audio is kept. Recent dictations stay hidden in the keyboard in both kinds of fields.",
        "The dictation bubble does not appear on password fields. If Android does not report what kind of field it is, the bubble treats it as incognito.",
        "The bubble uses Android's accessibility service API only to find the text field, insert your dictation at the cursor, skip password fields and pick the profile for that app or website. This data stays on your phone and is not stored. The microphone starts only when you tap the bubble.",
        "While you record in the app, with quick dictation or with the bubble, a Recording notification is shown. For the bubble, it shows no dictated text and stays hidden on the lock screen.",
        "A finished quick dictation shows its text in a Quick dictation results notification.",
      ],
      image: {
        path: "/screenshots/android/bubble-disclosure.png",
        alt: "Disclosure dialog for the dictation bubble's accessibility access on Android",
        layout: "phone",
      },
    },
    {
      title: "What Premium adds",
      paragraphs: [
        "Dictation stays free, with every engine except Nemotron Live. Premium adds these features:",
      ],
      bullets: [
        "Email format: profiles with the Email format turn a dictation into a complete email with subject.",
        "Calendar event: profiles with the Calendar Event format turn a dictation into a calendar draft.",
        "Live transcription: Nemotron Live (on device) shows the text while you are still speaking.",
        "Speaker detection: tells speakers apart in longer recordings, for transcribed files and for History entries with kept audio.",
      ],
      callout: {
        title: "When Premium ends",
        description:
          "Your profiles, History and other data stay. Profiles with the Email or Calendar Event format are marked as locked, and dictations with them are inserted as plain text. Nemotron Live and speaker detection ask for Premium again; Parakeet keeps transcribing on the phone for free.",
      },
      image: {
        path: "/screenshots/android/premium.png",
        alt: "Premium settings in TypeWhisper for Android with features, purchase options and account",
        layout: "phone",
      },
    },
    {
      title: "Get Premium",
      steps: [
        {
          title: "Open Settings → Premium",
          description:
            "The page lists the Premium features and shows whether Premium is active.",
        },
        {
          title: "Sign in",
          description:
            "Premium is tied to an account, so it also works after reinstalling. Sign in with Apple opens the browser: use the Apple ID from your iPhone, Mac or Windows PC, and Premium works on all of them. With Sign in with Google, Premium applies only on Android.",
        },
        {
          title: "Buy or link Premium",
          description:
            "Buy Premium through Google Play as a monthly subscription (Monthly) or as a one-time purchase (Lifetime). Google Play shows the price, and a free trial for the subscription if you are eligible. If you already bought a license on typewhisper.com, tap Link Polar license under Already have a license? instead.",
        },
        {
          title: "Restore later",
          description:
            "After reinstalling or on a new phone, sign in with the same account and tap Restore purchases.",
        },
      ],
      bullets: [
        "If Google Play reports a pending payment, Premium activates once Google Play confirms it.",
        "If a purchase could not be verified, tap Restore purchases again. Do not buy Premium a second time.",
      ],
    },
    {
      title: "Sign out or delete your account",
      bullets: [
        "You only need an account for Premium. If you never signed in, there is nothing to delete.",
        "Sign out on this device ends Premium on this phone. Your local data stays.",
        "Delete account in Settings → Premium removes your TypeWhisper account. Purchases stay with your Google or Apple account and can be restored later by signing in again.",
        "Deleting the account does not cancel a subscription. Cancel it in Google Play, otherwise billing continues.",
        "The account deletion page at typewhisper.com/delete-account also explains how to delete the account on the web and what is deleted.",
      ],
    },
  ],
};

export const de: IosDocPage = {
  eyebrow: "Kontrolle und Eigentum",
  title: "Datenschutz, Cloud-Anbieter und Premium",
  description:
    "Was auf dem Handy bleibt, was Cloud-Anbieter erhalten, wie private Felder und die Bubble behandelt werden und welche Funktionen auf Android Premium brauchen.",
  intro:
    "Diktieren, Wörterbuch, Textbausteine, Tastatur und Diktier-Bubble funktionieren ohne Konto und ohne Abo. Cloud-Anbieter und Premium sind optional und haben eigene Datenwege.",
  sections: [
    {
      title: "Was auf dem Handy bleibt",
      bullets: [
        "Engines mit dem Zusatz auf dem Gerät, etwa Parakeet, Whisper und Nemotron Live, machen auf dem Handy aus Sprache Text und funktionieren auch offline.",
        "Verlauf, Inbox, Wörterbuch, Textbausteine, Profile, Statistik, Stimmprofile und behaltene Aufnahmen bleiben im Speicher der App. Die Android-Sicherung ist für TypeWhisper abgeschaltet.",
        "Unter Einstellungen → Allgemein legst du mit Aufnahmen behalten fest, wie lange Audio bleibt, von Nach der Transkription löschen bis Für immer behalten.",
        "API-Schlüssel werden mit einem Schlüssel aus dem Android Keystore verschlüsselt gespeichert. Sicherungen und Exporte enthalten sie nie.",
        "Die App enthält keine Werbung, keine Analyse, keine Absturzberichte und keine Tracking-SDKs.",
        "Unter Einstellungen → Daten und Sicherung exportierst du mit Alle Daten exportieren alles oder entfernst es mit Alle Daten löschen. Heruntergeladene Modelle bleiben. Stimmprofile sind biometrische Daten und bleiben aus Exporten draußen.",
      ],
    },
    {
      title: "Wann Daten das Handy verlassen",
      bullets: [
        "Eine Cloud-Sprach-Engine erhält deine Aufnahme nur, wenn du sie auswählst und unter Einstellungen → Cloud-Anbieter deinen eigenen API-Schlüssel einträgst. Das Audio geht direkt von deinem Handy an diesen Anbieter. Engines, die eine Wortliste annehmen, bekommen auch deine Wörterbuch-Begriffe.",
        "Die Android-Spracherkennung bleibt auf dem Handy, wenn eine Offline-Sprache installiert ist. Mit Online-Fallback erlauben darf Android die Aufnahme an seinen Spracherkennungsanbieter senden, falls eine Sprache fehlt. Das ist standardmäßig aus. Auf Handys ohne Erkennung auf dem Gerät kann die Systemerkennung Audio an ihren Anbieter senden, zum Beispiel Google.",
        "Ein Schreibdienst erhält erst Text, wenn du unter Einstellungen → KI-Schreiben Diktate zum Umschreiben an … senden einschaltest. Er bekommt Diktate mit Schreibprofil und Text, den du zum Umschreiben markierst. Reines Diktat wird nicht gesendet.",
        "Modelldateien kommen von Hugging Face, ohne Konto- oder Gerätekennungen.",
        "Anmeldung und Kaufprüfung für Premium laufen über den TypeWhisper-Premium-Dienst. Dabei gehen Konto-, Geräte- und Kaufstatus mit, nie deine Aufnahmen, Transkripte, Wörterbuch-Einträge oder Textbausteine.",
        "Feedback erreicht uns nur als E-Mail, die du aus deiner eigenen Mail-App sendest.",
      ],
    },
    {
      title: "Private Felder, Bubble und Benachrichtigungen",
      bullets: [
        "In Passwortfeldern diktiert die TypeWhisper-Tastatur ohne Schreibprofil, speichert nichts im Verlauf und kann markierten Text nicht umschreiben.",
        "In Inkognito-Feldern, etwa in einem privaten Browser-Tab, landen Diktate nicht im Verlauf und es wird kein Audio behalten. Letzte Diktate blendet die Tastatur in beiden Feldarten aus.",
        "Die Diktier-Bubble erscheint nicht an Passwortfeldern. Meldet Android nicht, um welche Art von Feld es sich handelt, behandelt die Bubble es als Inkognito-Feld.",
        "Die Bubble nutzt die Bedienungshilfen-Schnittstelle von Android nur, um das Textfeld zu finden, dein Diktat an der Cursorposition einzufügen, Passwortfelder auszulassen und das Profil für die App oder Website zu wählen. Diese Daten bleiben auf deinem Handy und werden nicht gespeichert. Das Mikrofon startet erst, wenn du die Bubble antippst.",
        "Während du in der App, per Schnelldiktat oder mit der Bubble aufnimmst, siehst du die Benachrichtigung Aufnahme. Bei der Bubble zeigt sie keinen diktierten Text und bleibt auf dem Sperrbildschirm verborgen.",
        "Ein fertiges Schnelldiktat zeigt seinen Text in einer Benachrichtigung Ergebnisse von Schnelldiktaten.",
      ],
      image: {
        path: "/screenshots/android/bubble-disclosure.png",
        alt: "Hinweisdialog zum Bedienungshilfen-Zugriff der Diktier-Bubble auf Android",
        layout: "phone",
      },
    },
    {
      title: "Was Premium bietet",
      paragraphs: [
        "Diktieren bleibt kostenlos, mit allen Engines außer Nemotron Live. Premium bietet zusätzlich:",
      ],
      bullets: [
        "E-Mail-Format: Profile mit dem Format E-Mail machen aus einem Diktat eine vollständige E-Mail mit Betreff.",
        "Kalendertermin: Profile mit dem Format Kalendertermin machen aus einem Diktat einen Terminentwurf.",
        "Live-Transkription: Nemotron Live (auf dem Gerät) zeigt den Text schon, während du sprichst.",
        "Sprechererkennung: unterscheidet Sprecher in längeren Aufnahmen, bei transkribierten Dateien und bei Verlaufseinträgen mit behaltenem Audio.",
      ],
      callout: {
        title: "Wenn Premium endet",
        description:
          "Profile, Verlauf und alle anderen Daten bleiben erhalten. Profile mit dem Format E-Mail oder Kalendertermin sind dann gesperrt, Diktate damit werden als reiner Text eingefügt. Nemotron Live und die Sprechererkennung verlangen wieder Premium; Parakeet transkribiert weiter kostenlos auf dem Handy.",
      },
      image: {
        path: "/screenshots/android/premium.png",
        alt: "Premium-Einstellungen von TypeWhisper für Android mit Funktionen, Kaufoptionen und Konto",
        layout: "phone",
      },
    },
    {
      title: "Premium bekommen",
      steps: [
        {
          title: "Einstellungen → Premium öffnen",
          description:
            "Die Seite listet die Premium-Funktionen und zeigt, ob Premium aktiv ist.",
        },
        {
          title: "Anmelden",
          description:
            "Premium gehört zu einem Konto und übersteht so auch eine Neuinstallation. Mit Apple anmelden öffnet den Browser: Nimm die Apple-ID von deinem iPhone, Mac oder Windows-PC, dann gilt Premium überall. Mit Google anmelden gilt Premium nur auf Android.",
        },
        {
          title: "Premium kaufen oder verknüpfen",
          description:
            "Kauf Premium über Google Play als Monatsabo (Monatlich) oder als Einmalkauf (Einmalig). Den Preis zeigt Google Play, beim Abo auch eine kostenlose Testphase, wenn du sie nutzen kannst. Hast du schon eine Lizenz auf typewhisper.com gekauft, tippe stattdessen unter Schon eine Lizenz? auf Polar-Lizenz verknüpfen.",
        },
        {
          title: "Später wiederherstellen",
          description:
            "Nach einer Neuinstallation oder auf einem neuen Handy meldest du dich mit demselben Konto an und tippst auf Käufe wiederherstellen.",
        },
      ],
      bullets: [
        "Meldet Google Play eine ausstehende Zahlung, wird Premium aktiv, sobald Google Play sie bestätigt.",
        "Konnte ein Kauf nicht bestätigt werden, tippe erneut auf Käufe wiederherstellen. Kauf Premium nicht ein zweites Mal.",
      ],
    },
    {
      title: "Abmelden oder Konto löschen",
      bullets: [
        "Ein Konto brauchst du nur für Premium. Hast du dich nie angemeldet, gibt es nichts zu löschen.",
        "Auf diesem Gerät abmelden beendet Premium auf diesem Handy. Deine Daten auf dem Handy bleiben.",
        "Konto löschen unter Einstellungen → Premium entfernt dein TypeWhisper-Konto. Käufe bleiben bei deinem Google- oder Apple-Konto und lassen sich später nach einer neuen Anmeldung wiederherstellen.",
        "Das Löschen des Kontos kündigt kein Abo. Kündige es in Google Play, sonst wird weiter abgerechnet.",
        "Die Seite typewhisper.com/delete-account erklärt auch, wie du das Konto im Web löschst und was dabei gelöscht wird.",
      ],
    },
  ],
};

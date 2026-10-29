import type { IosDocPage } from "@/data/ios-docs";

export const en: IosDocPage = {
  eyebrow: "Solve common problems",
  title: "Troubleshooting on Android",
  description:
    "Fix a silent microphone, stuck model downloads, a missing keyboard or dictation bubble, cloud key errors and background limits in TypeWhisper for Android.",
  intro:
    "Start with what failed: a recording in the app, the keyboard, the dictation bubble or a cloud service. Each depends on something different, and TypeWhisper usually tells you what is missing.",
  sections: [
    {
      title: "The microphone records nothing",
      bullets: [
        "“Allow microphone access in the TypeWhisper app.” means the permission is missing. Open Settings → General and tap Allow microphone access. If you denied it before, the row reads Open microphone settings; turn on Microphone there (Android Settings → Apps → TypeWhisper → Permissions → Microphone).",
        "“The microphone delivers no sound. Is access blocked, or is another app using it?” appears while recording when the microphone sends complete silence. Check that microphone access is not blocked in Quick Settings, end any call and close other apps that use the microphone.",
        "If a recording ends that way, TypeWhisper shows “The microphone delivered no sound.” instead of a transcription and does not send anything to the speech engine.",
        "“No speech heard yet. Speak closer to the microphone.” means the microphone works but hears no voice. Speak closer to the phone. If you dictate softly, turn on Whisper mode in Settings → General.",
        "“No speech detected.” after you stop means the recording contained no speech. With Skip silence turned on in Settings → Speech recognition → Advanced, recordings without speech are ignored so that no text gets invented.",
      ],
    },
    {
      title: "The speech model does not download or loads slowly",
      bullets: [
        "Model downloads run in the background and show their progress in a notification. “Queued. Starts when a connection is available.” means TypeWhisper is waiting for an internet connection.",
        "“Waiting to retry. Resumes automatically.” appears after an interrupted download. Wait, or tap Retry now.",
        "After Cancel download, the parts already downloaded are kept. Tap Resume download to continue where it stopped.",
        "“Download failed: …” shows the reason. Tap Retry on a stable connection and make sure the phone has enough free storage. Parakeet needs about 670 MB.",
        "To free storage, open Settings → Speech recognition, tap the arrow next to an engine and delete models you do not use. You can download them again later.",
        "“Download the speech model in TypeWhisper settings.” in the app, or “Speech model needed” in the keyboard, means the selected engine's model is not on the phone yet. Tap Download model right in the keyboard, or download it in settings.",
        "With Android speech recognition, “This offline language is not installed.” means Android lacks the language. Select the engine in Settings → Speech recognition and tap Download selected offline language, or choose another engine.",
        "By default, on-device models are freed from memory when you have not dictated for 10 minutes. This also happens when Android runs low on memory. The next dictation then takes a few seconds longer while the model loads. To change the delay, open Settings → Speech recognition → Advanced → Free model memory.",
      ],
      image: {
        path: "/screenshots/android/speech-settings.png",
        alt: "Engine and model selection in TypeWhisper's speech recognition settings",
        layout: "phone",
      },
    },
    {
      title: "The TypeWhisper keyboard does not appear",
      bullets: [
        "Open Settings → Keyboard and tap Enable TypeWhisper Keyboard. Android opens its input settings, where you turn on TypeWhisper Keyboard.",
        "Then tap Switch keyboard on the same page and choose TypeWhisper as the active keyboard. On the TypeWhisper keyboard itself, the globe key switches to your next keyboard.",
        "If the keyboard shows an error that needs setup, such as a missing model or API key, tap the message to open the app.",
        "“Your dictation is ready. Choose where to insert it.” appears when the text field changed while the dictation was processed. Tap Insert here in the field you want, or Dismiss.",
        "In password and incognito fields, dictation works, but nothing is saved to History or kept for recovery. In password fields, profiles are not applied.",
      ],
    },
    {
      title: "The dictation bubble does not show",
      paragraphs: [
        "Open Settings → Dictation bubble and check that Show dictation bubble is on. The page then tells you what is missing, for example “Enable TypeWhisper in Android’s accessibility settings.” Tap Open accessibility settings and turn on Dictation bubble. If it says the accessibility service is disconnected, turn Dictation bubble off and on again in Android's accessibility settings. When everything works, it reads “Ready. Open a text field in another app to dictate.”",
      ],
      bullets: [
        "The bubble needs microphone access. If it is missing, the same page shows Allow microphone. If you denied it before, the button reads Open microphone settings.",
        "The bubble only appears when you tap into an editable text field in another app. It does not show inside TypeWhisper, on the lock screen, or while a dictation from the app or the keyboard is running.",
        "Password fields and fields marked as sensitive are excluded. Some fields cannot accept text from the bubble: then you see “This field could not accept the dictation. Try another text field.”",
        "If the field changed while the dictation was processed, the text waits. Tap the paste button in a text field to insert it, or × to discard it.",
        "If TypeWhisper is turned off in Android's accessibility settings, the bubble disappears. Tap Allow bubble notifications on the bubble page: you then get the notification “Dictation bubble is off”, and Reactivate opens the accessibility settings. Android cannot deliver this notice if the app was force-stopped.",
        "Dictations in incognito fields, and in fields whose privacy mode Android cannot identify (including all fields on Android 12 and older), are inserted but not saved to History.",
      ],
    },
    {
      title: "A cloud service or AI writing fails",
      bullets: [
        "“Set up the selected speech service in TypeWhisper settings.” means the API key is missing. Open Settings → Cloud providers, choose the provider, paste the key, tap Save and then Test.",
        "“The API key was rejected.” Check that you copied the whole key and that your account with the provider is active.",
        "“Too many requests. Try again in a moment.” The provider is limiting your requests. Wait a little and dictate again.",
        "“No connection to the transcription service.” Check your network. To keep dictating without a connection, choose an on-device Fallback engine in Settings → Speech recognition → Advanced.",
        "“Inserted without the profile: set up AI writing in TypeWhisper settings.” Open Settings → AI writing and tap Set up step by step. If the service is set up but fails, TypeWhisper inserts the plain dictation instead.",
        "Failed dictations are kept on the phone for 24 hours. If Settings → General → Keep recordings is not set to Delete after transcription, the last three successful ones are kept too. When there is something to recover, Recoverable recordings appears at the top of History, where you can transcribe it again, also with another engine. Dictations in password and incognito fields are not kept.",
      ],
    },
    {
      title: "Background work stops on some phones",
      paragraphs: [
        "Some manufacturers stop apps in the background more strictly than standard Android. On Honor phones with MagicOS, for example, TypeWhisper can only check watched folders in the background when it is allowed to start by itself.",
      ],
      bullets: [
        "On Honor and Huawei phones, once you have added a watched folder, the Watched folders section on the File transcription screen shows a hint with Open App launch. Set TypeWhisper to manage manually there and keep Auto-launch and Run in background on.",
        "On other phones, if new files only show up when you open the app, allow TypeWhisper to start in the background in the phone's battery settings.",
        "Dictations you start in the app keep running in the background with an ongoing notification. Allow notifications so that you see it.",
      ],
      callout: {
        title: "Still stuck?",
        description:
          "Open Settings → Send feedback, describe what went wrong and choose what to include: App and Android version and, if available, Writing service and model and Recent errors. Send by email opens your mail app with a message to hello@typewhisper.com. API keys, server addresses and your recordings are never included.",
      },
    },
  ],
};

export const de: IosDocPage = {
  eyebrow: "Häufige Probleme lösen",
  title: "Fehlerbehebung unter Android",
  description:
    "Hilfe bei stummem Mikrofon, hängenden Modell-Downloads, fehlender Tastatur oder Bubble, Fehlern mit API-Schlüsseln und Hintergrundgrenzen unter Android.",
  intro:
    "Beginne bei dem, was nicht geklappt hat: eine Aufnahme in der App, die Tastatur, die Diktier-Bubble oder ein Clouddienst. Jedes davon hängt an etwas anderem, und meist sagt dir TypeWhisper, was fehlt.",
  sections: [
    {
      title: "Das Mikrofon nimmt nichts auf",
      bullets: [
        "„Erlaube den Mikrofonzugriff in der TypeWhisper-App.“ heißt, dass die Berechtigung fehlt. Öffne Einstellungen → Allgemein und tippe auf Mikrofonzugriff erlauben. Hast du sie schon einmal abgelehnt, heißt die Zeile Mikrofoneinstellungen öffnen; schalte dort Mikrofon ein (Android-Einstellungen → Apps → TypeWhisper → Berechtigungen → Mikrofon).",
        "„Das Mikrofon liefert keinen Ton. Ist der Zugriff blockiert oder nutzt es gerade eine andere App?“ erscheint während der Aufnahme, wenn das Mikrofon völlige Stille liefert. Prüfe, ob der Mikrofonzugriff in den Schnelleinstellungen blockiert ist, beende laufende Anrufe und schließe andere Apps, die das Mikrofon nutzen.",
        "Endet eine Aufnahme so, zeigt TypeWhisper statt eines Textes „Das Mikrofon hat keinen Ton geliefert.“ und schickt nichts an die Spracherkennung.",
        "„Noch keine Sprache zu hören. Sprich näher am Mikrofon.“ heißt: Das Mikrofon funktioniert, hört aber keine Stimme. Sprich näher am Handy. Wenn du leise diktierst, schalte unter Einstellungen → Allgemein den Flüstermodus ein.",
        "„Keine Sprache erkannt.“ nach dem Stopp heißt, dass die Aufnahme keine Sprache enthielt. Ist unter Einstellungen → Spracherkennung → Erweitert Stille überspringen an, verwirft TypeWhisper Aufnahmen ohne Sprache, damit kein Text erfunden wird.",
      ],
    },
    {
      title: "Das Sprachmodell lädt nicht oder startet langsam",
      bullets: [
        "Modelle werden im Hintergrund geladen, den Fortschritt zeigt eine Benachrichtigung. „Vorgemerkt. Startet, sobald eine Verbindung verfügbar ist.“ heißt, dass TypeWhisper auf eine Internetverbindung wartet.",
        "„Wartet auf einen neuen Versuch. Wird automatisch fortgesetzt.“ erscheint nach einem unterbrochenen Download. Warte kurz oder tippe auf Jetzt wiederholen.",
        "Nach Download abbrechen bleiben die schon geladenen Teile erhalten. Mit Download fortsetzen geht es dort weiter, wo der Download aufgehört hat.",
        "„Download fehlgeschlagen: …“ nennt den Grund. Tippe bei stabiler Verbindung auf Erneut versuchen und prüfe, ob genug Speicher frei ist. Parakeet braucht etwa 670 MB.",
        "Um Speicher freizugeben, öffne Einstellungen → Spracherkennung, tippe auf den Pfeil neben einer Engine und lösche Modelle, die du nicht brauchst. Du kannst sie später wieder laden.",
        "„Lade das Sprachmodell in den TypeWhisper-Einstellungen herunter.“ in der App oder „Sprachmodell nötig“ in der Tastatur heißt, dass das Modell der gewählten Engine noch nicht auf dem Handy ist. Tippe direkt in der Tastatur auf Modell herunterladen oder lade es in den Einstellungen.",
        "Mit der Android-Spracherkennung heißt „Diese Offline-Sprache ist nicht installiert.“, dass die Sprache in Android nicht installiert ist. Wähle die Engine unter Einstellungen → Spracherkennung und tippe auf Ausgewählte Offline-Sprache laden, oder wähle eine andere Engine.",
        "Modelle auf dem Gerät werden standardmäßig aus dem Arbeitsspeicher entfernt, wenn du 10 Minuten nicht diktiert hast. Das passiert auch, wenn Android der Speicher knapp wird. Das nächste Diktat dauert dann ein paar Sekunden länger, weil das Modell neu geladen wird. Die Wartezeit änderst du unter Einstellungen → Spracherkennung → Erweitert → Modellspeicher freigeben.",
      ],
      image: {
        path: "/screenshots/android/speech-settings.png",
        alt: "Auswahl von Engine und Modell in den Einstellungen zur Spracherkennung",
        layout: "phone",
      },
    },
    {
      title: "Die TypeWhisper-Tastatur erscheint nicht",
      bullets: [
        "Öffne Einstellungen → Tastatur und tippe auf TypeWhisper-Tastatur aktivieren. Android öffnet seine Eingabe-Einstellungen, dort schaltest du die TypeWhisper-Tastatur ein.",
        "Tippe danach auf derselben Seite auf Tastatur wechseln und wähle TypeWhisper als aktive Tastatur. Auf der TypeWhisper-Tastatur selbst wechselst du mit der Globustaste zur nächsten Tastatur.",
        "Zeigt die Tastatur einen Fehler, der eine Einrichtung braucht, etwa ein fehlendes Modell oder einen fehlenden API-Schlüssel, tippe auf die Meldung, um die App zu öffnen.",
        "„Dein Diktat ist fertig. Wähle, wo du es einfügen möchtest.“ erscheint, wenn sich das Textfeld während der Verarbeitung geändert hat. Tippe im gewünschten Feld auf Hier einfügen oder auf Verwerfen.",
        "In Passwort- und Inkognitofeldern funktioniert das Diktieren, im Verlauf wird aber nichts gespeichert und nichts zur Wiederherstellung aufbewahrt. In Passwortfeldern werden keine Profile angewendet.",
      ],
    },
    {
      title: "Die Diktier-Bubble erscheint nicht",
      paragraphs: [
        "Öffne Einstellungen → Diktier-Bubble und prüfe, ob Diktier-Bubble anzeigen an ist. Die Seite sagt dir dann, was fehlt, zum Beispiel „Aktiviere TypeWhisper in den Android-Bedienungshilfen.“ Tippe auf Bedienungshilfen öffnen und schalte Diktier-Bubble ein. Steht dort, dass der Bedienungshilfedienst nicht verbunden ist, schalte Diktier-Bubble in den Android-Bedienungshilfen aus und wieder ein. Klappt alles, steht dort „Bereit. Öffne ein Textfeld in einer anderen App zum Diktieren.“",
      ],
      bullets: [
        "Die Bubble braucht den Mikrofonzugriff. Fehlt er, zeigt dieselbe Seite Mikrofon erlauben. Hast du ihn vorher abgelehnt, heißt die Schaltfläche Mikrofoneinstellungen öffnen.",
        "Die Bubble erscheint nur, wenn du in ein bearbeitbares Textfeld einer anderen App tippst. Sie erscheint nicht in TypeWhisper selbst, nicht auf dem Sperrbildschirm und nicht, während ein Diktat aus der App oder der Tastatur läuft.",
        "Passwortfelder und als sensibel markierte Felder sind ausgeschlossen. Manche Felder nehmen keinen Text von der Bubble an; dann siehst du „Dieses Feld konnte das Diktat nicht annehmen. Versuche ein anderes Textfeld.“",
        "Hat sich das Feld während der Verarbeitung geändert, wartet der Text. Tippe in einem Textfeld auf die Einfügen-Schaltfläche, um ihn zu übernehmen, oder auf ×, um ihn zu verwerfen.",
        "Wird TypeWhisper in den Android-Bedienungshilfen ausgeschaltet, verschwindet die Bubble. Tippe auf der Bubble-Seite auf Bubble-Benachrichtigungen erlauben: Dann bekommst du die Benachrichtigung „Diktier-Bubble ist deaktiviert“, und Wieder aktivieren öffnet die Bedienungshilfen. Wurde die App zwangsweise beendet, kann Android diesen Hinweis nicht zustellen.",
        "Diktate in Inkognitofeldern und in Feldern, deren Eingabemodus Android nicht zuordnen kann (unter Android 12 und älter gilt das für alle Felder), werden eingefügt, aber nicht im Verlauf gespeichert.",
      ],
    },
    {
      title: "Clouddienst oder KI-Schreiben schlägt fehl",
      bullets: [
        "„Richte den gewählten Sprachdienst in den TypeWhisper-Einstellungen ein.“ heißt, dass der API-Schlüssel fehlt. Öffne Einstellungen → Cloud-Anbieter, wähle den Anbieter, füge den Schlüssel ein, tippe auf Speichern und dann auf Testen.",
        "„Der API-Schlüssel wurde abgelehnt.“ Prüfe, ob du den ganzen Schlüssel kopiert hast und ob dein Konto beim Anbieter aktiv ist.",
        "„Zu viele Anfragen. Versuch es gleich noch einmal.“ Der Anbieter bremst deine Anfragen. Warte kurz und diktiere erneut.",
        "„Keine Verbindung zum Transkriptionsdienst.“ Prüfe deine Netzverbindung. Damit du auch ohne Verbindung diktieren kannst, wähle unter Einstellungen → Spracherkennung → Erweitert eine Ersatz-Engine auf dem Gerät.",
        "„Ohne Profil eingefügt: Richte das KI-Schreiben in den TypeWhisper-Einstellungen ein.“ Öffne Einstellungen → KI-Schreiben und tippe auf Schritt für Schritt einrichten. Ist der Dienst eingerichtet, schlägt aber fehl, fügt TypeWhisper das reine Diktat ein.",
        "Fehlgeschlagene Diktate bleiben 24 Stunden auf dem Handy. Steht Einstellungen → Allgemein → Aufnahmen behalten nicht auf Nach der Transkription löschen, bleiben auch die letzten drei erfolgreichen erhalten. Gibt es etwas wiederherzustellen, erscheint oben im Verlauf Wiederherstellbare Aufnahmen; dort kannst du es erneut transkribieren, auch mit einer anderen Engine. Diktate in Passwort- und Inkognitofeldern werden nicht aufbewahrt.",
      ],
    },
    {
      title: "Hintergrundaufgaben stoppen auf manchen Handys",
      paragraphs: [
        "Manche Hersteller beenden Apps im Hintergrund strenger als das normale Android. Auf Honor-Handys mit MagicOS zum Beispiel kann TypeWhisper überwachte Ordner im Hintergrund nur prüfen, wenn die App selbst starten darf.",
      ],
      bullets: [
        "Auf Honor- und Huawei-Handys zeigt der Bereich Überwachte Ordner auf dem Bildschirm Dateien transkribieren einen Hinweis mit App-Start öffnen, sobald du einen Ordner hinzugefügt hast. Stelle TypeWhisper dort auf manuell verwalten und lass Auto-Start und Im Hintergrund ausführen an.",
        "Kommen auf anderen Handys neue Dateien erst beim Öffnen der App an, erlaube TypeWhisper in den Akku-Einstellungen des Handys den Start im Hintergrund.",
        "Diktate, die du in der App startest, laufen mit einer dauerhaften Benachrichtigung im Hintergrund weiter. Erlaube Benachrichtigungen, damit du sie siehst.",
      ],
      callout: {
        title: "Noch nicht gelöst?",
        description:
          "Öffne Einstellungen → Feedback senden, beschreibe, was schiefgelaufen ist, und wähle, was mitgesendet wird: App- und Android-Version und, falls vorhanden, Schreibdienst und Modell sowie Letzte Fehler. Per E-Mail senden öffnet deine Mail-App mit einer Nachricht an hello@typewhisper.com. API-Schlüssel, Serveradressen und Aufnahmen werden nie mitgesendet.",
      },
    },
  ],
};

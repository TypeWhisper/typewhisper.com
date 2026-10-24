import type { IosDocPage } from "@/data/ios-docs";

export const en: IosDocPage = {
  eyebrow: "Files and review",
  title: "Files, History and your data",
  description:
    "Transcribe audio and video files, watch folders for new recordings, search and play back History, recover failed dictations and back up your data.",
  intro:
    "File transcription turns existing recordings into text, also automatically from watched folders. History keeps every result, with playback, speakers and exports.",
  sections: [
    {
      title: "Transcribe an audio or video file",
      steps: [
        {
          title: "Open File transcription",
          description:
            "Tap Transcribe a file on the Record screen, open Settings and tap File transcription under Tools, or use the Transcribe file app shortcut. You can also share audio or video files from another app to TypeWhisper.",
        },
        {
          title: "Choose the options",
          description:
            "Set the Language (Same as dictation, Automatic or a specific language) and the Profile, or keep None (plain transcription). Turn on Keep audio to play the file back from History. The choices apply to the files you add next.",
        },
        {
          title: "Add files",
          description:
            "Tap Add audio or video files and pick one or more files. TypeWhisper takes any audio or video file whose sound Android can decode, up to 2 GB per file.",
        },
        {
          title: "Open the result",
          description:
            "When a file shows Done · tap to open, tap it to open the transcript in History, or use its copy button.",
        },
      ],
      bullets: [
        "Files use the engine from Settings → Speech recognition, unless the chosen profile sets its own.",
        "Files are transcribed one after another, in short pieces cut at pauses. Long files continue in the background with a Transcribing files notification, and an interrupted file resumes where it stopped.",
        "Pause holds the queue. Transcribe all continues paused and failed files. Clear finished removes done files from the list; their transcripts stay in History.",
        "If the app is not open when the queue finishes, a File transcription finished or File transcription failed notification appears.",
        "If a profile could not be applied, for example because it needs Premium or the writing service failed, the plain transcript is saved and the row says why.",
        "Detect speakers is a Premium option. It keeps the audio and shows the transcript by speaker. The first time it downloads about 30 MB.",
      ],
      image: {
        path: "/screenshots/android/file-transcription.png",
        alt: "TypeWhisper File transcription with options, watched folders and the file queue",
        layout: "phone",
      },
    },
    {
      title: "Watch folders for new recordings",
      steps: [
        {
          title: "Add a folder",
          description:
            "In File transcription, tap Add folder under Watched folders and choose a folder in Android's folder picker. If the recorder app from Samsung, Google, Honor or Huawei is installed, a Watch recordings from … row opens the picker right in its recordings folder.",
        },
        {
          title: "Decide about existing files",
          description:
            "Choose Only new files, or Transcribe them too to include the audio and video files already in the folder.",
        },
        {
          title: "Set the folder's options",
          description:
            "Tap the folder to give it its own Profile. Turn on Save transcript next to the file and choose under Save as: Text (.txt), Subtitles (.srt) or both. Existing files are never overwritten.",
        },
      ],
      bullets: [
        "New audio and video files, also in subfolders up to three levels deep, are transcribed with the language, speaker and audio choices above.",
        "TypeWhisper checks about every 15 minutes and whenever you open the app. Files that are still being recorded wait until they are finished.",
        "Only while charging and Cloud services only on Wi-Fi hold new files back. With on-device speech recognition, files do not wait for Wi-Fi. A transcription that has already started finishes.",
        "Each folder row shows when it was last checked or why files are waiting. Use its switch to pause watching, or the remove button to stop watching it.",
        "Results go to History, not to the Inbox.",
      ],
      callout: {
        title: "Background checks and battery settings",
        description:
          "Background checks only run when the battery is not low, and many phones stop apps in the background. If new files only show up when you open the app, allow TypeWhisper to start in the background in your phone's battery settings. On Honor and Huawei phones, tap Open App launch, set TypeWhisper to manage manually and keep Auto-launch and Run in background on.",
      },
    },
    {
      title: "Find transcriptions in History",
      bullets: [
        "Search history finds words in the text, in the original before corrections, in file names and in profile names.",
        "Filter chips show Inbox while quick dictations wait, All, and one chip for each source you have used: App, Keyboard, Bubble, File and Quick dictation.",
        "Each row shows the date, the time and the engine. An icon shows where the entry came from.",
        "The export button at the top shares all entries as Markdown (.md), Text (.txt) or JSON (.json).",
        "Touch and hold an entry to select it. Tap more entries or All, then mark them as done, export or delete them.",
        "Swipe left to delete an entry. Swipe right to mark it as done or to put it back with Move to Inbox.",
      ],
      image: {
        path: "/screenshots/android/03-history.png",
        alt: "TypeWhisper History with search, filters and transcriptions",
        layout: "phone",
      },
    },
    {
      title: "Review an entry",
      bullets: [
        "The line above the text shows the date, the engine, the length and the profile.",
        "If TypeWhisper changed the engine's text, for example with the dictionary or a profile, the original appears below as Before corrections: ….",
        "Copy and Share sit at the top. Emails written by a profile get an Email draft button, calendar drafts get Add to calendar.",
        "The ⋮ menu has Edit text, Add correction, Move to Inbox and Delete. After you edit the text, TypeWhisper offers to add the changed words as corrections.",
        "Export subtitles shares the transcript as SubRip (.srt) or WebVTT (.vtt). It is available for file transcriptions and for dictations whose recording was kept.",
        "For text written by a profile, Report AI text prepares an email to the TypeWhisper team with that text. You see it in your mail app before sending.",
      ],
    },
    {
      title: "Playback, speakers and transcribing again",
      paragraphs: [
        "Dictations keep their audio only if Keep recordings in Settings → General was set to 7 days, 30 days, 90 days or Keep forever when you recorded. The default, Delete after transcription, keeps no audio. Audio from files is kept when Keep audio or Detect speakers was on, and stays until you delete the entry.",
      ],
      bullets: [
        "With audio, the entry shows a player: play and pause, 10 seconds back or forward, and a speed button that switches between 1×, 1.25×, 1.5×, 2× and 0.75×.",
        "Transcribe again in the ⋮ menu runs the kept audio through an engine you choose. It replaces the text and the engine; the profile is not applied again, and detected speakers are reset.",
        "Detect speakers in the ⋮ menu needs Premium. Choose the Number of speakers or leave it on Automatic, then tap Detect. Detection runs on the phone.",
        "The Speakers tab shows who spoke when; the Text tab shows the plain transcript. Tap a turn to play it, or touch and hold it to assign it to another speaker.",
        "Name speakers saves names with the recording. Recognize this voice in future recordings creates a voice profile that stays on this phone. Save a voice only with the person's consent.",
      ],
      callout: {
        title: "Turn on Keep recordings first",
        description:
          "Speaker detection and Transcribe again need the recording. TypeWhisper cannot add audio to an entry afterwards, so set Keep recordings before you dictate.",
      },
    },
    {
      title: "Recover failed or interrupted recordings",
      paragraphs: [
        "TypeWhisper writes each recording to the phone while you speak. If a transcription fails, for example without a network connection, or the app is closed during a dictation, the recording is kept for 24 hours.",
      ],
      steps: [
        {
          title: "Open Recoverable recordings",
          description:
            "The row sits at the top of History and says how many failed dictations can be transcribed again.",
        },
        {
          title: "Try again",
          description:
            "Tap Again next to a recording and choose an engine. The new text is copied to the clipboard and opens in History.",
        },
      ],
      bullets: [
        "With Keep recordings on, the last three successful dictations are kept here too, so you can try them with another engine.",
        "Recovered quick dictations go back to the Inbox.",
        "The delete button removes a recording right away.",
      ],
    },
    {
      title: "Back up, export or delete your data",
      paragraphs: [
        "Open Settings and tap Data and backup under Help.",
      ],
      bullets: [
        "Back up settings saves settings, profiles, snippets and the dictionary as a JSON file. API keys are never included.",
        "Restore a backup reads that JSON file. It adds missing profiles, snippets and dictionary entries, keeps existing ones and applies the saved settings. Enter your API keys again afterwards.",
        "Export all data saves the backup plus History, speaker transcripts, kept recordings and statistics as a ZIP file.",
        "Delete all data removes History, recordings, dictionary, snippets, profiles, settings and API keys from this phone, then restarts the app. Downloaded models stay. This cannot be undone.",
        "Voice profiles are biometric data and stay out of every export and backup.",
        "In Settings under Tools, Statistics shows words, streaks, words per minute, time saved, sources, engines and usage by time of day for a week, a month or all time. It stays on this phone, and Clear statistics leaves History and recordings untouched.",
      ],
    },
  ],
};

export const de: IosDocPage = {
  eyebrow: "Dateien und Verlauf",
  title: "Dateien, Verlauf und deine Daten",
  description:
    "Audio- und Videodateien transkribieren, Ordner auf neue Aufnahmen überwachen, den Verlauf durchsuchen und abspielen, Diktate retten und Daten sichern.",
  intro:
    "Mit „Dateien transkribieren“ wird aus vorhandenen Aufnahmen Text, auf Wunsch automatisch aus überwachten Ordnern. Der Verlauf hebt jedes Ergebnis auf, mit Wiedergabe, Sprechern und Export.",
  sections: [
    {
      title: "Audio- oder Videodatei transkribieren",
      steps: [
        {
          title: "„Dateien transkribieren“ öffnen",
          description:
            "Tippe im Tab „Aufnehmen“ auf „Datei transkribieren“, öffne in den Einstellungen unter „Werkzeuge“ den Punkt „Dateien transkribieren“ oder nutze die App-Verknüpfung „Datei transkribieren“. Du kannst Audio- und Videodateien auch aus einer anderen App an TypeWhisper teilen.",
        },
        {
          title: "Einstellungen wählen",
          description:
            "Lege die „Sprache“ fest („Wie beim Diktieren“, „Automatisch“ oder eine bestimmte Sprache) und das „Profil“, oder lass „Keins (nur Transkription)“. Schalte „Audio behalten“ ein, um die Datei im Verlauf abzuspielen. Die Einstellungen gelten für die Dateien, die du als Nächstes hinzufügst.",
        },
        {
          title: "Dateien hinzufügen",
          description:
            "Tippe auf „Audio- oder Videodateien hinzufügen“ und wähle eine oder mehrere Dateien. TypeWhisper nimmt jede Audio- oder Videodatei, deren Ton Android lesen kann, bis 2 GB pro Datei.",
        },
        {
          title: "Ergebnis öffnen",
          description:
            "Steht bei einer Datei „Fertig · zum Öffnen tippen“, öffnest du mit einem Tipp das Transkript im Verlauf. Alternativ kopierst du es mit der Kopieren-Taste.",
        },
      ],
      bullets: [
        "Transkribiert wird mit der Engine aus Einstellungen → Spracherkennung, außer das gewählte Profil bringt eine eigene mit.",
        "Dateien laufen nacheinander, in kurzen Stücken, die an Sprechpausen geschnitten werden. Lange Dateien laufen mit der Benachrichtigung „Dateien werden transkribiert“ im Hintergrund weiter, und nach einer Unterbrechung geht es an der letzten Stelle weiter.",
        "„Pausieren“ hält die Warteschlange an. „Alle transkribieren“ setzt pausierte und fehlgeschlagene Dateien fort. „Fertige entfernen“ räumt erledigte Dateien aus der Liste; ihre Transkripte bleiben im Verlauf.",
        "Ist die App nicht geöffnet, wenn die Warteschlange fertig ist, meldet sich TypeWhisper mit „Dateien transkribiert“ oder „Transkription fehlgeschlagen“.",
        "Konnte ein Profil nicht angewendet werden, etwa weil es Premium braucht oder der KI-Dienst ausgefallen ist, wird das reine Transkript gespeichert, und die Zeile nennt den Grund.",
        "„Sprecher erkennen“ ist eine Premium-Option. Sie behält die Audiodatei und zeigt das Transkript nach Sprechern. Beim ersten Mal lädt TypeWhisper dafür etwa 30 MB.",
      ],
      image: {
        path: "/screenshots/android/file-transcription.png",
        alt: "„Dateien transkribieren“ in TypeWhisper mit Einstellungen, überwachten Ordnern und Warteschlange",
        layout: "phone",
      },
    },
    {
      title: "Ordner auf neue Aufnahmen überwachen",
      steps: [
        {
          title: "Ordner hinzufügen",
          description:
            "Tippe in „Dateien transkribieren“ unter „Überwachte Ordner“ auf „Ordner hinzufügen“ und wähle einen Ordner in der Ordnerauswahl von Android. Ist die Rekorder-App von Samsung, Google, Honor oder Huawei installiert, öffnet die Zeile „Aufnahmen aus … überwachen“ die Auswahl direkt in deren Aufnahmeordner.",
        },
        {
          title: "Über vorhandene Dateien entscheiden",
          description:
            "Wähle „Nur neue Dateien“ oder „Auch transkribieren“, damit auch die Audio- und Videodateien transkribiert werden, die schon im Ordner liegen.",
        },
        {
          title: "Ordner einstellen",
          description:
            "Tippe auf den Ordner, um ihm ein eigenes „Profil“ zu geben. Schalte „Transkript neben der Datei speichern“ ein und wähle unter „Speichern als“: „Text (.txt)“, „Untertitel (.srt)“ oder beides. Vorhandene Dateien werden nie überschrieben.",
        },
      ],
      bullets: [
        "Neue Audio- und Videodateien, auch in Unterordnern bis drei Ebenen tief, werden mit Sprache, Sprechererkennung und Audio-Einstellung von oben transkribiert.",
        "TypeWhisper schaut etwa alle 15 Minuten nach und jedes Mal, wenn du die App öffnest. Dateien, die gerade noch aufgenommen werden, warten, bis sie fertig sind.",
        "„Nur beim Laden“ und „Clouddienste nur im WLAN“ halten neue Dateien zurück. Mit Spracherkennung auf dem Gerät warten Dateien nicht aufs WLAN. Eine Transkription, die schon läuft, wird zu Ende gebracht.",
        "Jede Ordnerzeile zeigt, wann zuletzt geprüft wurde oder worauf Dateien warten. Mit dem Schalter pausierst du die Überwachung, mit der Entfernen-Taste beendest du sie.",
        "Die Ergebnisse landen im Verlauf, nicht in der Inbox.",
      ],
      callout: {
        title: "Prüfungen im Hintergrund und Akku-Einstellungen",
        description:
          "Im Hintergrund prüft TypeWhisper nur, wenn der Akku nicht fast leer ist, und viele Handys beenden Apps im Hintergrund. Kommen neue Dateien erst beim Öffnen der App an, erlaube TypeWhisper in den Akku-Einstellungen deines Handys den Start im Hintergrund. Auf Honor- und Huawei-Handys tippst du auf „App-Start öffnen“, stellst TypeWhisper auf manuell verwalten und lässt Auto-Start und „Im Hintergrund ausführen“ an.",
      },
    },
    {
      title: "Transkriptionen im Verlauf finden",
      bullets: [
        "„Verlauf durchsuchen“ findet Wörter im Text, im Original vor den Korrekturen, in Dateinamen und in Profilnamen.",
        "Die Filter zeigen „Inbox“, solange Schnelldiktate warten, „Alle“ und je einen Filter für jede Quelle, die du schon genutzt hast: „App“, „Tastatur“, „Bubble“, „Datei“ und „Schnelldiktat“.",
        "Jede Zeile zeigt Datum, Uhrzeit und Engine. Ein Symbol verrät, woher der Eintrag kommt.",
        "Die Export-Taste oben teilt alle Einträge als „Markdown (.md)“, „Text (.txt)“ oder „JSON (.json)“.",
        "Halte einen Eintrag gedrückt, um ihn auszuwählen. Tippe weitere Einträge oder „Alle“ an und markiere sie dann als erledigt, exportiere oder lösche sie.",
        "Nach links gewischt wird ein Eintrag gelöscht. Nach rechts gewischt markierst du ihn als erledigt oder holst ihn mit „In die Inbox legen“ zurück.",
      ],
      image: {
        path: "/screenshots/android/03-history.png",
        alt: "TypeWhisper-Verlauf mit Suche, Filtern und Transkriptionen",
        layout: "phone",
      },
    },
    {
      title: "Einen Eintrag prüfen",
      bullets: [
        "Die Zeile über dem Text zeigt Datum, Engine, Länge und Profil.",
        "Hat TypeWhisper den Text der Engine verändert, etwa durch das Wörterbuch oder ein Profil, steht das Original darunter als „Vor den Korrekturen: …“.",
        "„Kopieren“ und „Teilen“ findest du oben. E-Mails aus einem Profil bekommen die Schaltfläche „E-Mail-Entwurf“, Kalender-Entwürfe „Zum Kalender hinzufügen“.",
        "Im ⋮-Menü stehen „Text bearbeiten“, „Korrektur hinzufügen“, „In die Inbox legen“ und „Löschen“. Nach dem Bearbeiten bietet TypeWhisper an, die geänderten Wörter als Korrekturen zu übernehmen.",
        "„Untertitel exportieren“ teilt das Transkript als „SubRip (.srt)“ oder „WebVTT (.vtt)“. Das geht bei transkribierten Dateien und bei Diktaten, deren Aufnahme behalten wurde.",
        "Bei Text aus einem Profil bereitet „KI-Text melden“ eine E-Mail mit diesem Text an das TypeWhisper-Team vor. Du siehst sie vor dem Senden in deiner Mail-App.",
      ],
    },
    {
      title: "Wiedergabe, Sprecher und neu transkribieren",
      paragraphs: [
        "Diktate behalten ihre Audiodatei nur, wenn beim Aufnehmen unter Einstellungen → Allgemein → „Aufnahmen behalten“ „7 Tage“, „30 Tage“, „90 Tage“ oder „Für immer behalten“ eingestellt war. Mit der Voreinstellung „Nach der Transkription löschen“ bleibt kein Audio. Audio aus Dateien bleibt erhalten, wenn „Audio behalten“ oder „Sprecher erkennen“ an war, und zwar bis du den Eintrag löschst.",
      ],
      bullets: [
        "Mit Audio zeigt der Eintrag einen Player: Abspielen und Pause, 10 Sekunden zurück oder vor und eine Tempo-Taste, die zwischen 1×, 1,25×, 1,5×, 2× und 0,75× wechselt.",
        "„Neu transkribieren“ im ⋮-Menü schickt das behaltene Audio durch eine Engine deiner Wahl. Text und Engine werden ersetzt; das Profil wird nicht erneut angewendet, erkannte Sprecher werden zurückgesetzt.",
        "„Sprecher erkennen“ im ⋮-Menü braucht Premium. Wähle die „Anzahl der Sprecher“ oder lass „Automatisch“ stehen und tippe auf „Erkennen“. Die Erkennung läuft auf dem Handy.",
        "Der Tab „Sprecher“ zeigt, wer wann gesprochen hat; der Tab „Text“ zeigt das reine Transkript. Tippe auf einen Abschnitt, um ihn abzuspielen, oder halte ihn gedrückt, um ihn einem anderen Sprecher zuzuordnen.",
        "„Sprecher benennen“ speichert Namen mit der Aufnahme. „Diese Stimme künftig erkennen“ legt ein Stimmprofil an, das auf diesem Handy bleibt. Speichere eine Stimme nur mit Einverständnis der Person.",
      ],
      callout: {
        title: "Erst „Aufnahmen behalten“ einschalten",
        description:
          "Sprechererkennung und „Neu transkribieren“ brauchen die Aufnahme. TypeWhisper kann einem Eintrag nachträglich kein Audio hinzufügen. Stell „Aufnahmen behalten“ also ein, bevor du diktierst.",
      },
    },
    {
      title: "Fehlgeschlagene oder unterbrochene Aufnahmen retten",
      paragraphs: [
        "TypeWhisper schreibt jede Aufnahme schon während des Sprechens auf das Handy. Scheitert eine Transkription, etwa ohne Netz, oder wird die App während eines Diktats beendet, bleibt die Aufnahme 24 Stunden erhalten.",
      ],
      steps: [
        {
          title: "„Wiederherstellbare Aufnahmen“ öffnen",
          description:
            "Die Zeile steht oben im Verlauf und sagt, wie viele fehlgeschlagene Diktate du erneut transkribieren kannst.",
        },
        {
          title: "Erneut versuchen",
          description:
            "Tippe neben einer Aufnahme auf „Erneut“ und wähle eine Engine. Der neue Text landet in der Zwischenablage und öffnet sich im Verlauf.",
        },
      ],
      bullets: [
        "Ist „Aufnahmen behalten“ eingeschaltet, liegen hier auch die letzten drei erfolgreichen Diktate, damit du sie mit einer anderen Engine probieren kannst.",
        "Gerettete Schnelldiktate kommen zurück in die Inbox.",
        "Mit der Löschen-Taste entfernst du eine Aufnahme sofort.",
      ],
    },
    {
      title: "Daten sichern, exportieren oder löschen",
      paragraphs: [
        "Öffne die Einstellungen und tippe unter „Hilfe“ auf „Daten und Sicherung“.",
      ],
      bullets: [
        "„Einstellungen sichern“ speichert Einstellungen, Profile, Textbausteine und Wörterbuch als JSON-Datei. API-Schlüssel sind nie enthalten.",
        "„Sicherung wiederherstellen“ liest diese JSON-Datei. Fehlende Profile, Textbausteine und Wörterbuch-Einträge kommen dazu, vorhandene bleiben, und die gesicherten Einstellungen werden übernommen. Deine API-Schlüssel trägst du danach neu ein.",
        "„Alle Daten exportieren“ speichert die Sicherung plus Verlauf, Sprecher-Transkripte, behaltene Aufnahmen und Statistik als ZIP-Datei.",
        "„Alle Daten löschen“ entfernt Verlauf, Aufnahmen, Wörterbuch, Textbausteine, Profile, Einstellungen und API-Schlüssel von diesem Handy und startet die App neu. Heruntergeladene Modelle bleiben. Das lässt sich nicht rückgängig machen.",
        "Stimmprofile sind biometrische Daten und bleiben aus jedem Export und jeder Sicherung draußen.",
        "In den Einstellungen unter „Werkzeuge“ zeigt „Statistik“ Wörter, Serien, Wörter pro Minute, gesparte Zeit, Quellen, genutzte Spracherkennung und Nutzung nach Tageszeit für eine Woche, einen Monat oder gesamt. Sie bleibt auf diesem Handy, und „Statistik löschen“ lässt Verlauf und Aufnahmen unberührt.",
      ],
    },
  ],
};

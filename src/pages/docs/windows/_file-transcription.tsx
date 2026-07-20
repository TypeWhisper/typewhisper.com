import { Screenshot } from "@/components/ui/screenshot";
import { screenshotPath, type Locale } from "@/i18n/index";

export default function DocsWindowsFileTranscription({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";

  const formats = "WAV, MP3, M4A, AAC, OGG, FLAC, WMA, MP4, MKV, AVI, MOV, WebM";
  const steps = isDe
    ? [
        ["Engine und Modell wählen", "Nutze die globale Vorgabe oder überschreibe Engine und Modell nur für Datei-Transkriptionen."],
        ["Dateien hinzufügen", "Ziehe eine oder mehrere Audio- oder Videodateien in die Ansicht oder öffne sie über „Dateien auswählen“."],
        ["Queue verfolgen", "Dateien werden nacheinander verarbeitet. Einzelne Jobs oder die gesamte Queue lassen sich abbrechen; abgeschlossene Jobs bleiben für Kopieren und Export sichtbar."],
        ["Ergebnis exportieren", "Kopiere den Text oder speichere ihn als TXT. SRT und WebVTT sind nur verfügbar, wenn die gewählte Engine Zeitstempel-Segmente liefert."],
      ]
    : [
        ["Choose engine and model", "Use the global default or override the engine and model for file transcription only."],
        ["Add files", "Drop one or more audio or video files onto the view, or open them with Select files."],
        ["Follow the queue", "Files are processed sequentially. Cancel an individual job or the full queue; completed jobs remain available for copying and export."],
        ["Export the result", "Copy the text or save it as TXT. SRT and WebVTT are available only when the selected engine returns timestamped segments."],
      ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">
        {isDe ? "Datei-Transkription" : "File Transcription"}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {isDe
          ? "Transkribiere mehrere Audio- oder Videodateien in einer Queue oder automatisiere einen Ordner."
          : "Transcribe several audio or video files in a queue, or automate an entire folder."}
      </p>

      <Screenshot
        src={screenshotPath(locale, "/screenshots/windows/file-transcription.png")}
        alt={isDe ? "Queue für Datei-Transkriptionen in TypeWhisper" : "TypeWhisper file transcription queue"}
        className="mt-8 aspect-[31/20] w-full rounded-xl border border-border object-cover"
        loading="eager"
      />

      <div className="mt-8 space-y-6">
        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Dateien in der Queue verarbeiten" : "Process files in the queue"}
          </h2>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
            {steps.map(([title, description], index) => (
              <li key={title}>
                <strong className="text-foreground">{index + 1}. {title}</strong>
                <span className="mt-1 block">{description}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Formate und Exportgrenzen" : "Formats and export limits"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            <strong className="text-foreground">{isDe ? "Import:" : "Import:"}</strong>{" "}
            {formats}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            <strong className="text-foreground">{isDe ? "Manueller Export:" : "Manual export:"}</strong>{" "}
            {isDe
              ? "TXT ist für jedes fertige Ergebnis verfügbar. SRT und WebVTT benötigen echte Segmente mit Zeitstempeln; eine Engine, die nur Fließtext liefert, kann daraus keine Untertitel erzeugen."
              : "TXT is available for every completed result. SRT and WebVTT require real timestamped segments; an engine that returns plain text only cannot generate subtitles."}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            <strong className="text-foreground">{isDe ? "Watch Folder:" : "Watch folder:"}</strong>{" "}
            {isDe
              ? "Automatische Ausgaben unterstützen Markdown, TXT, SRT und VTT. Auch hier benötigen Untertitelformate Zeitstempel-Segmente."
              : "Automated output supports Markdown, TXT, SRT, and VTT. Subtitle formats still require timestamped segments."}
          </p>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Sprache und Nachbearbeitung" : "Language and post-processing"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Die manuelle Queue übernimmt Aufgabe, geordnete Sprachhinweise, Zahlenformatierung, Wörterbuch und die global konfigurierte Nachbearbeitung aus den Diktateinstellungen. Engine und Modell kannst du in dieser Ansicht separat überschreiben. Workflows werden für Queue-Dateien nicht automatisch anhand einer App oder Website ausgewählt."
              : "The manual queue uses the task, ordered language hints, number formatting, dictionary, and globally configured post-processing from dictation settings. You can override the engine and model in this view. App and website workflows are not selected automatically for queued files."}
          </p>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">Watch Folder</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Wähle einen Eingangsordner und optional einen getrennten Ausgabeordner. Neue unterstützte Dateien werden automatisch verarbeitet. Du kannst Sprache, Engine und Modell festlegen, die Überwachung beim App-Start aktivieren und die Quelldatei nach erfolgreicher Verarbeitung löschen lassen."
              : "Choose an input folder and optionally a separate output folder. New supported files are processed automatically. Set the language, engine, and model, start watching with the app, and optionally delete each source file after successful processing."}
          </p>
          <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
            {isDe
              ? "Aktiviere „Quelle nach Erfolg löschen“ erst, nachdem du den Ablauf mit Kopien getestet hast. Der Watch-Folder-Verlauf zeigt die letzten automatischen Jobs, ersetzt aber kein Backup."
              : "Enable Delete source after success only after testing the workflow with copies. Watch folder history shows recent automated jobs, but it is not a backup."}
          </div>
        </section>
      </div>
    </div>
  );
}

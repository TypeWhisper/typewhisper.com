import { Screenshot } from "@/components/ui/screenshot";
import { screenshotPath, type Locale } from "@/i18n/index";

export default function DocsWindowsWorkflows({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";

  const triggerRows = isDe
    ? [
        ["App", "Passt auf einen oder mehrere Windows-Prozessnamen, zum Beispiel OUTLOOK.EXE oder Code.exe."],
        ["Website", "Passt auf Domains und Wildcards in unterstützten Browsern, unabhängig vom Browserprozess."],
        ["Tastenkürzel", "Startet Diktat oder verarbeitet ausgewählten beziehungsweise kopierten Text mit genau diesem Workflow."],
        ["Always", "Globaler Fallback, wenn kein passender App- oder Website-Workflow gefunden wurde."],
        ["Manual", "Erscheint nur in der Workflow-Palette und läuft nie automatisch."],
      ]
    : [
        ["App", "Matches one or more Windows process names, such as OUTLOOK.EXE or Code.exe."],
        ["Website", "Matches domains and wildcards in supported browsers, independent of the browser process."],
        ["Hotkey", "Starts dictation or processes selected or copied text with this exact workflow."],
        ["Always", "Global fallback when no app or website workflow matches."],
        ["Manual", "Appears only in the workflow palette and never runs automatically."],
      ];

  const priority = isDe
    ? [
        "Erzwungener Workflow über sein eigenes Tastenkürzel",
        "Kombination aus App und Website",
        "Nur Website",
        "Nur App",
        "Globaler Always-Fallback",
      ]
    : [
        "Workflow explicitly forced by its own hotkey",
        "Combined app and website match",
        "Website-only match",
        "App-only match",
        "Global Always fallback",
      ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">Workflows</h1>
      <p className="mt-3 text-muted-foreground">
        {isDe
          ? "Verbinde Transkription, KI-Nachbearbeitung und Ausgabe mit einer App, Website, einem Tastenkürzel oder einem globalen Fallback."
          : "Connect transcription, AI post-processing, and output to an app, website, hotkey, or global fallback."}
      </p>

      <Screenshot
        src={screenshotPath(locale, "/screenshots/windows/workflows.png")}
        alt={isDe ? "Workflow-Verwaltung in TypeWhisper für Windows" : "TypeWhisper workflow management for Windows"}
        className="mt-8 aspect-[31/20] w-full rounded-xl border border-border object-cover"
        loading="eager"
      />

      <div className="mt-8 space-y-6">
        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Workflow erstellen" : "Create a workflow"}
          </h2>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">1. {isDe ? "Vorlage" : "Template"}</strong>
              <span className="mt-1 block">
                {isDe
                  ? "Wähle Bereinigter Text, Übersetzung, E-Mail-Antwort, Meeting-Notizen, Checkliste, JSON, Zusammenfassung oder einen benutzerdefinierten Workflow."
                  : "Choose Cleaned Text, Translation, Email Reply, Meeting Notes, Checklist, JSON, Summary, or a custom workflow."}
              </span>
            </li>
            <li>
              <strong className="text-foreground">2. {isDe ? "Trigger" : "Trigger"}</strong>
              <span className="mt-1 block">
                {isDe
                  ? "Lege fest, wann der Workflow automatisch, immer als Fallback oder nur manuell verfügbar ist."
                  : "Choose when the workflow runs automatically, always as a fallback, or manually only."}
              </span>
            </li>
            <li>
              <strong className="text-foreground">3. {isDe ? "Verhalten" : "Behavior"}</strong>
              <span className="mt-1 block">
                {isDe
                  ? "Überschreibe bei Bedarf Transkriptionsmodell, Aufgabe, geordnete Sprachhinweise, Übersetzungsziel, Whisper-Modus und KI-Anbieter."
                  : "Optionally override the transcription model, task, ordered language hints, translation target, Whisper mode, and AI provider."}
              </span>
            </li>
            <li>
              <strong className="text-foreground">4. {isDe ? "Ausgabe" : "Output"}</strong>
              <span className="mt-1 block">
                {isDe
                  ? "Füge den Text ein oder sende ihn an ein Action-Plugin; steuere Formatvorgabe, Zahlenformatierung und optionales Enter nach dem Einfügen."
                  : "Insert the text or send it to an action plugin; control the format instruction, number formatting, and optional Enter after insertion."}
              </span>
            </li>
          </ol>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Trigger" : "Triggers"}
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-5 font-semibold">{isDe ? "Typ" : "Type"}</th>
                  <th className="pb-2 font-semibold">{isDe ? "Verhalten" : "Behavior"}</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {triggerRows.map(([name, description]) => (
                  <tr key={name} className="border-b border-border/50 last:border-0">
                    <td className="py-3 pr-5 font-medium text-foreground">{name}</td>
                    <td className="py-3">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {isDe
              ? "Ein automatischer Workflow kann App-, Website- und Tastenkürzel-Komponenten kombinieren. Website-Muster unterstützen Wildcards wie *.github.com."
              : "An automatic workflow can combine app, website, and hotkey components. Website patterns support wildcards such as *.github.com."}
          </p>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Priorität bei der Auswahl" : "Matching priority"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "TypeWhisper verwendet den ersten passenden Eintrag dieser Reihenfolge:"
              : "TypeWhisper uses the first match in this order:"}
          </p>
          <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-muted-foreground">
            {priority.map((item) => <li key={item}>{item}</li>)}
          </ol>
          <p className="mt-3 text-sm text-muted-foreground">
            {isDe
              ? "Treffen mehrere Workflows derselben Stufe zu, entscheidet ihre Sortierreihenfolge; bei Gleichstand der Name. Manual-Workflows nehmen an dieser automatischen Auswahl nicht teil."
              : "If several workflows match at the same level, their sort order decides; the name breaks a tie. Manual workflows do not participate in automatic matching."}
          </p>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "KI-Nachbearbeitung und „Keine“" : "AI post-processing and None"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Vorlagen erzeugen eine passende Systemanweisung für den gewählten KI-Anbieter. Mit Feintuning-Anweisungen kannst du Ton, Struktur oder Ausgabe weiter eingrenzen. Wähle als KI-Anbieter „Keine (keine Nachbearbeitung)“, wenn der Workflow nur Transkriptions-, Sprach-, Modell- oder Ausgabeoptionen anwenden soll. Dann wird kein Text an einen LLM-Anbieter gesendet."
              : "Templates create a suitable system instruction for the selected AI provider. Fine-tuning instructions can narrow tone, structure, or output. Select None (no post-processing) when the workflow should apply only transcription, language, model, or output options. No text is then sent to an LLM provider."}
          </p>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Sprachhinweise, Aktionen und Ausgabe" : "Language hints, actions, and output"}
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              &bull; <strong className="text-foreground">{isDe ? "Sprachhinweise:" : "Language hints:"}</strong>{" "}
              {isDe
                ? "Übernimm die globale Liste, aktiviere freie automatische Erkennung oder hinterlege eine eigene geordnete Liste für diesen Workflow."
                : "Inherit the global list, use unrestricted auto-detection, or set an ordered list for this workflow."}
            </li>
            <li>
              &bull; <strong className="text-foreground">{isDe ? "Action-Plugins:" : "Action plugins:"}</strong>{" "}
              {isDe
                ? "Senden das fertige Ergebnis an eine installierte Aktion statt in das aktive Textfeld. Verfügbarkeit und Verhalten hängen vom Add-on ab."
                : "Send the final result to an installed action instead of the active text field. Availability and behavior depend on the add-on."}
            </li>
            <li>
              &bull; <strong className="text-foreground">{isDe ? "Einfügen:" : "Insertion:"}</strong>{" "}
              {isDe
                ? "Ohne Action-Plugin wird Text normal eingefügt. Optional kann TypeWhisper anschließend Enter drücken."
                : "Without an action plugin, text is inserted normally. TypeWhisper can optionally press Enter afterward."}
            </li>
            <li>
              &bull; <strong className="text-foreground">{isDe ? "Zahlen:" : "Numbers:"}</strong>{" "}
              {isDe
                ? "Übernimm die globale Zahlenformatierung oder schalte sie für den Workflow gezielt ein beziehungsweise aus."
                : "Inherit global number formatting or enable or disable it for this workflow."}
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

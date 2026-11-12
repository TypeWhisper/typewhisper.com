import {
  DocsFigure,
  DocsSection,
  DocsSteps,
  DocsTable,
} from "@/components/docs/prose";
import { localePath, screenshotPath, type Locale } from "@/i18n/index";

export function windowsWorkflowsHead(locale: Locale) {
  return {
    heading: "Workflows",
    lede:
      locale === "de"
        ? "Verbinde Transkription, KI-Nachbearbeitung und Ausgabe mit einer App, Website, einem Tastenkürzel oder einem globalen Fallback."
        : "Connect transcription, AI post-processing, and output to an app, website, hotkey, or global fallback.",
  };
}

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
    <>
      <DocsFigure
        kind="framed"
        src={screenshotPath(locale, "/screenshots/windows/workflows.png")}
        alt={isDe ? "Workflow-Verwaltung in TypeWhisper für Windows" : "TypeWhisper workflow management for Windows"}
        loading="eager"
      />

      <DocsSection
        id="create"
        title={isDe ? "Workflow erstellen" : "Create a workflow"}
      >
        <DocsSteps
          items={[
            {
              title: isDe ? "Vorlage" : "Template",
              description: isDe
                ? "Wähle Bereinigter Text, Übersetzung, E-Mail-Antwort, Meeting-Notizen, Checkliste, JSON, Zusammenfassung oder einen benutzerdefinierten Workflow."
                : "Choose Cleaned Text, Translation, Email Reply, Meeting Notes, Checklist, JSON, Summary, or a custom workflow.",
            },
            {
              title: isDe ? "Trigger" : "Trigger",
              description: isDe
                ? "Lege fest, wann der Workflow automatisch, immer als Fallback oder nur manuell verfügbar ist."
                : "Choose when the workflow runs automatically, always as a fallback, or manually only.",
            },
            {
              title: isDe ? "Verhalten" : "Behavior",
              description: isDe
                ? "Überschreibe bei Bedarf Transkriptionsmodell, Aufgabe, geordnete Sprachhinweise, Übersetzungsziel, Whisper-Modus und KI-Anbieter."
                : "Optionally override the transcription model, task, ordered language hints, translation target, Whisper mode, and AI provider.",
            },
            {
              title: isDe ? "Ausgabe" : "Output",
              description: isDe
                ? "Füge den Text ein oder sende ihn an ein Action-Plugin; steuere Formatvorgabe, Zahlenformatierung und optionales Enter nach dem Einfügen."
                : "Insert the text or send it to an action plugin; control the format instruction, number formatting, and optional Enter after insertion.",
            },
          ]}
        />
      </DocsSection>

      <DocsSection id="triggers" title={isDe ? "Trigger" : "Triggers"}>
        <DocsTable
          label={isDe ? "Trigger" : "Triggers"}
          head={[isDe ? "Typ" : "Type", isDe ? "Verhalten" : "Behavior"]}
          rows={triggerRows.map(([name, description]) => [name, description])}
        />
        <p>
          {isDe
            ? "Ein automatischer Workflow kann App-, Website- und Tastenkürzel-Komponenten kombinieren. Website-Muster unterstützen Wildcards wie *.github.com."
            : "An automatic workflow can combine app, website, and hotkey components. Website patterns support wildcards such as *.github.com."}
        </p>
      </DocsSection>

      <DocsSection
        id="priority"
        title={isDe ? "Priorität bei der Auswahl" : "Matching priority"}
      >
        <p>
          {isDe
            ? "TypeWhisper verwendet den ersten passenden Eintrag dieser Reihenfolge:"
            : "TypeWhisper uses the first match in this order:"}
        </p>
        <ol>
          {priority.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <p>
          {isDe
            ? "Treffen mehrere Workflows derselben Stufe zu, entscheidet ihre Sortierreihenfolge; bei Gleichstand der Name. Manual-Workflows nehmen an dieser automatischen Auswahl nicht teil."
            : "If several workflows match at the same level, their sort order decides; the name breaks a tie. Manual workflows do not participate in automatic matching."}
        </p>
      </DocsSection>

      <DocsSection
        id="post-processing"
        title={isDe ? "KI-Nachbearbeitung und „Keine“" : "AI post-processing and None"}
      >
        <p>
          {isDe
            ? "Vorlagen erzeugen eine passende Systemanweisung für den gewählten KI-Anbieter. Mit Feintuning-Anweisungen kannst du Ton, Struktur oder Ausgabe weiter eingrenzen. Wähle als KI-Anbieter „Keine (keine Nachbearbeitung)“, wenn der Workflow nur Transkriptions-, Sprach-, Modell- oder Ausgabeoptionen anwenden soll. Dann wird kein Text an einen LLM-Anbieter gesendet."
            : "Templates create a suitable system instruction for the selected AI provider. Fine-tuning instructions can narrow tone, structure, or output. Select None (no post-processing) when the workflow should apply only transcription, language, model, or output options. No text is then sent to an LLM provider."}
        </p>
      </DocsSection>

      <DocsSection
        id="local-text-models"
        title={isDe ? "Lokale Textmodelle" : "Local text models"}
      >
        <p>
          {isDe ? (
            <>
              Mit den Add-ons Local LLM und{" "}
              <a href={localePath(locale, "/addons/gemma-local")}>
                Gemma 3 (Local)
              </a>{" "}
              verarbeitet ein Workflow seinen Text auf deinem PC. Dafür muss ein Modell heruntergeladen und in den Arbeitsspeicher geladen sein.
            </>
          ) : (
            <>
              With the Local LLM and{" "}
              <a href={localePath(locale, "/addons/gemma-local")}>
                Gemma 3 (Local)
              </a>{" "}
              add-ons, a workflow processes its text on your PC. For that, a model has to be downloaded and loaded into memory.
            </>
          )}
        </p>
        <DocsSteps
          items={[
            {
              title: isDe ? "Herunterladen und laden" : "Download and load",
              description: isDe
                ? "Wähle auf der Seite des Add-ons in der Seitenleiste der Einstellungen „Herunterladen und laden“ neben einem Modell. Das Modell wird direkt nach dem Download geladen; die Zeile des Modells zeigt den Fortschritt, und „Abbrechen“ stoppt das Laden. Eine startende Aufnahme bricht das Laden ebenfalls ab."
                : "On the add-on's page in the Settings sidebar, select Download and load next to a model. The model loads right after its download; its row shows the progress, and Cancel stops the load. A recording that starts also cancels it.",
            },
            {
              title: isDe ? "Im Workflow auswählen" : "Choose it in a workflow",
              description: isDe
                ? "Wähle das Add-on in einem Workflow unter „Erweitert“ als „Anbieter“ und das Modell als „Modell“, oder wähle beides unter „Standard-LLM“ für Workflows ohne eigenen Anbieter."
                : "In a workflow, select the add-on as the Provider under Advanced and the model as the Model, or choose both under Default LLM for workflows without a provider of their own.",
            },
          ]}
        />
        <p>
          {isDe
            ? "Die Modellauswahl eines Workflows und der Dialog „Standard-LLM“ listen auch heruntergeladene Modelle, die noch nicht geladen sind, mit dem Hinweis „Heruntergeladen · wird bei Auswahl geladen“. Wählst du ein solches Modell, wird es sofort geladen. Fortschritt, „Abbrechen“ und Fehler erscheinen unter der Auswahl, und Speichern wartet, bis das Modell geladen ist. Nach einem Fehler lädt „Erneut versuchen“ das Modell noch einmal. Ist noch kein Modell heruntergeladen, nennt die Auswahl die Plugin-Einstellungen, in denen du eines herunterlädst."
            : "A workflow's model picker and the Default LLM dialog also list downloaded models that are not loaded yet, marked Downloaded · loads when you choose it. Choosing one loads it right away. Progress, Cancel and any error show below the picker, and Save waits until the model has loaded. After an error, Try again loads the model once more. If no model is downloaded yet, the picker points to the plugin settings where you download one."}
        </p>
        <p>
          {isDe
            ? "Jedes Add-on hält ein Modell geladen. Lädst du ein anderes, wird das bisherige freigegeben. Ein Workflow, der noch das freigegebene Modell verwendet, kann damit keinen Text verarbeiten, bis du es wieder lädst: Öffne den Workflow und wähle unter der Modellauswahl „Modell laden“. TypeWhisper merkt sich das zuletzt geladene Modell und lädt es nach einer Freigabe im Leerlauf oder einem Neustart wieder."
            : "Each add-on keeps one model loaded. Loading another model releases the previous one. A workflow that still uses the released model cannot process text with it until you load it again: open the workflow and select Load model below the model picker. TypeWhisper remembers the last loaded model and loads it again after an idle release or a restart."}
        </p>
        <p>
          {isDe
            ? "Das gilt ab TypeWhisper 1.3. In älteren Versionen heißt die Schaltfläche „Modell herunterladen“; wähle nach dem Download „Modell laden“, bevor du das Modell in einem Workflow auswählst. Bis dahin listet die Auswahl keine Modelle des Add-ons."
            : "This applies to TypeWhisper 1.3 or newer. In older versions, the button is called Download model; select Load model after the download before you choose the model in a workflow. Until then, the picker lists no models of the add-on."}
        </p>
      </DocsSection>

      <DocsSection
        id="hints-actions-output"
        title={isDe ? "Sprachhinweise, Aktionen und Ausgabe" : "Language hints, actions, and output"}
      >
        <ul>
          <li>
            <strong>{isDe ? "Sprachhinweise:" : "Language hints:"}</strong>{" "}
            {isDe
              ? "Übernimm die globale Liste, aktiviere freie automatische Erkennung oder hinterlege eine eigene geordnete Liste für diesen Workflow."
              : "Inherit the global list, use unrestricted auto-detection, or set an ordered list for this workflow."}
          </li>
          <li>
            <strong>{isDe ? "Action-Plugins:" : "Action plugins:"}</strong>{" "}
            {isDe
              ? "Senden das fertige Ergebnis an eine installierte Aktion statt in das aktive Textfeld. Verfügbarkeit und Verhalten hängen vom Add-on ab."
              : "Send the final result to an installed action instead of the active text field. Availability and behavior depend on the add-on."}
          </li>
          <li>
            <strong>{isDe ? "Einfügen:" : "Insertion:"}</strong>{" "}
            {isDe
              ? "Ohne Action-Plugin wird Text normal eingefügt. Optional kann TypeWhisper anschließend Enter drücken."
              : "Without an action plugin, text is inserted normally. TypeWhisper can optionally press Enter afterward."}
          </li>
          <li>
            <strong>{isDe ? "Zahlen:" : "Numbers:"}</strong>{" "}
            {isDe
              ? "Übernimm die globale Zahlenformatierung oder schalte sie für den Workflow gezielt ein beziehungsweise aus."
              : "Inherit global number formatting or enable or disable it for this workflow."}
          </li>
        </ul>
      </DocsSection>
    </>
  );
}

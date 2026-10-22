import { ArrowRight } from "lucide-react";
import {
  DocsCode,
  DocsSection,
  DocsSubheading,
  DocsTable,
  withCode,
} from "@/components/docs/prose";
import { localePath, type Locale } from "@/i18n/index";

type Flag = [name: string, descriptionDe: string, descriptionEn: string];

const globalFlags: Flag[] = [
  ["--port <N>", "Port überschreiben; sonst CLI-Discovery, danach Fallback 8978", "Override the port; otherwise try CLI discovery, then fallback 8978"],
  ["--api-token <token>", "Token aus Discovery und Umgebungsvariable überschreiben", "Override the discovery and environment token"],
  ["--json", "Maschinenlesbare JSON-Ausgabe", "Machine-readable JSON output"],
  ["--version", "CLI-Version ausgeben", "Print the CLI version"],
  ["--help, -h", "Hilfe anzeigen", "Show help"],
];

const transcribeFlags: Flag[] = [
  ["--language <code>", "Eine feste Quellsprache setzen", "Set one exact source language"],
  ["--language-hint <code>", "Wiederholbarer, geordneter Hinweis für Auto-Erkennung", "Repeatable ordered hint for auto-detection"],
  ["--task <task>", "transcribe oder translate", "transcribe or translate"],
  ["--translate-to <code>", "Zielsprache für Übersetzung", "Translation target language"],
  ["--engine <id>", "Engine nur für diese Anfrage überschreiben", "Override the engine for this request"],
  ["--model <id>", "Modell nur für diese Anfrage überschreiben", "Override the model for this request"],
  ["--await-download", "Auf Wiederherstellung oder Download eines lokalen Modells warten", "Wait for a local model restore or download"],
];

const modelFlags: Flag[] = [
  ["--engine <id>", "Engine, auf die sich der Befehl bezieht; immer erforderlich", "The engine to act on; always required"],
  ["--model <id>", "Modell, auf das sich der Befehl bezieht; erforderlich für load und delete, von unload ignoriert", "The model to act on; required for load and delete, ignored by unload"],
];

interface ModelCommand {
  /** Anchor of the command, `command-<id>`. */
  id: string;
  name: string;
  /** Backticks set inline code. */
  descriptionDe: string;
  descriptionEn: string;
  code: string;
  /** What the command prints without `--json`. */
  output: string;
}

const modelCommands: ModelCommand[] = [
  {
    id: "models-load",
    name: "models load",
    descriptionDe:
      "Ein Modell laden und für die Transkription auswählen. Die Engine- und Modell-IDs liefert `typewhisper models`. Der Befehl lädt nichts herunter; ein lokales Modell muss also bereits heruntergeladen sein. Er wartet, bis das Modell geladen ist, und gibt dann den Status aus. Mit `--json` erhältst du die API-Antwort.",
    descriptionEn:
      "Load a model and select it for transcription. Take the engine and model IDs from `typewhisper models`. The command does not download anything, so a local model must already be downloaded. It waits until the model is loaded and then prints its status. Add `--json` for the API response.",
    code: "typewhisper models load --engine sherpa-onnx --model parakeet-tdt-0.6b",
    output: "ready: sherpa-onnx parakeet-tdt-0.6b",
  },
  {
    id: "models-unload",
    name: "models unload",
    descriptionDe:
      "Das Modell einer Engine entladen, um Arbeitsspeicher freizugeben. Die heruntergeladenen Dateien bleiben auf deinem PC. Der Befehl braucht nur `--engine`; `--model` nimmt er an, ignoriert es aber. Nach dem Entladen von Parakeet hat TypeWhisper kein Modell bereit, bis du wieder eines lädst.",
    descriptionEn:
      "Unload an engine's model to free memory. Its downloaded files stay on your PC. The command needs only `--engine`; it accepts `--model` but ignores it. After you unload Parakeet, TypeWhisper has no model ready until you load one again.",
    code: "typewhisper models unload --engine sherpa-onnx",
    output: "unloaded: sherpa-onnx parakeet-tdt-0.6b",
  },
  {
    id: "models-delete",
    name: "models delete",
    descriptionDe:
      "Die heruntergeladenen Dateien eines Modells löschen. Das funktioniert bei lokalen Engines, deren Plugin Modelldateien entfernen kann, etwa Parakeet und whisper.cpp; bei Cloud-Engines meldet TypeWhisper einen Fehler. Das Modell, das eine Engine ausgewählt hat oder noch geladen haben könnte, löscht TypeWhisper nicht.",
    descriptionEn:
      "Delete the downloaded files of a model. This works for local engines whose plugin can remove model files, such as Parakeet and whisper.cpp; for cloud engines, TypeWhisper returns an error. TypeWhisper does not delete the model an engine has selected or may still have loaded.",
    code: "typewhisper models delete --engine sherpa-onnx --model canary-180m-flash",
    output: "deleted: sherpa-onnx canary-180m-flash",
  },
];

export function windowsCliHead(locale: Locale) {
  return locale === "de"
    ? {
        heading: "CLI-Tool",
        lede: "Nutze TypeWhisper aus PowerShell, Skripten und lokalen Automatisierungen.",
      }
    : {
        heading: "CLI Tool",
        lede: "Use TypeWhisper from PowerShell, scripts, and local automation.",
      };
}

export default function DocsWindowsCLI({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";

  const flagsTable = (label: string, flags: Flag[]) => (
    <DocsTable
      label={label}
      head={["Flag", isDe ? "Beschreibung" : "Description"]}
      rows={flags.map(([name, descriptionDe, descriptionEn]) => [
        <code>{name}</code>,
        isDe ? descriptionDe : descriptionEn,
      ])}
    />
  );
  const globalFlagsTitle = isDe ? "Globale Flags" : "Global flags";
  const transcribeFlagsTitle = isDe ? "Flags für transcribe" : "transcribe flags";
  const modelFlagsTitle = isDe ? "Flags für Modellbefehle" : "Model command flags";

  return (
    <>
      <DocsSection
        id="install"
        title={isDe ? "Installieren und vorbereiten" : "Install and prepare"}
      >
        <ol>
          <li>{isDe ? "Öffne Einstellungen > Erweitert > Kommandozeilen-Tool und klicke auf Installieren." : "Open Settings > Advanced > Command line tool and click Install."}</li>
          <li>{isDe ? "Öffne danach ein neues Terminal, damit der aktualisierte Benutzer-PATH geladen wird." : "Open a new terminal afterward so the updated user PATH is loaded."}</li>
          <li>{isDe ? "Schalte unter Einstellungen > Erweitert > API-Server „HTTP-API aktivieren“ ein und wähle „Anwenden“." : "In Settings > Advanced > API server, turn on Enable HTTP API and select Apply."}</li>
          <li>{isDe ? "Prüfe die Verbindung mit typewhisper status." : "Verify the connection with typewhisper status."}</li>
        </ol>
        <DocsCode locale={locale} lang="powershell" code="typewhisper status" />
        <p>
          {isDe
            ? "Die CLI ist ein Client der lokalen HTTP-API. TypeWhisper muss laufen und die HTTP-API muss aktiviert sein."
            : "The CLI is a client for the local HTTP API. TypeWhisper must be running and the HTTP API must be enabled."}
        </p>
      </DocsSection>

      <DocsSection
        id="discovery-and-token"
        title={isDe ? "Automatische Discovery und Token" : "Automatic discovery and token"}
      >
        <p>
          {isDe ? "Ohne " : "Without "}
          <code>--port</code>
          {isDe ? " liest die CLI die Datei " : ", the CLI reads "}
          <code>api-discovery.json</code>
          {isDe ? " im Profil der App, die sie installiert hat, danach die ältere Datei " : " in the profile of the app that installed it, then the legacy "}
          <code>api-port</code>
          {isDe ? ", und verwendet zuletzt 8978 als Fallback. Eine CLI ohne diese Bindung prüft " : " file, and finally falls back to 8978. A CLI without that binding checks "}
          <code>%LOCALAPPDATA%\TypeWhisper-WinUI</code>.
        </p>
        <p>
          {isDe
            ? "Den Token aus der Discovery-Datei verwendet die CLI nur für den dort angegebenen Port. Meldet die Discovery, dass kein Token verlangt wird, sendet sie keinen. Die Priorität lautet: --api-token, Umgebungsvariable TYPEWHISPER_API_TOKEN, Discovery."
            : "The CLI uses the token from the discovery file only for the port listed there, and sends none when discovery reports that no token is required. Priority is --api-token, the TYPEWHISPER_API_TOKEN environment variable, then discovery."}
        </p>
      </DocsSection>

      <DocsSection id="commands" title={isDe ? "Befehle" : "Commands"}>
        <DocsSubheading id="command-status">
          <code>status</code>
        </DocsSubheading>
        <p>{isDe ? "Zeigt API-, Engine- und Modellstatus." : "Shows API, engine, and model status."}</p>
        <DocsCode locale={locale} lang="powershell" code="typewhisper status" />

        <DocsSubheading id="command-models">
          <code>models</code>
        </DocsSubheading>
        <p>
          {isDe
            ? "Listet die aktuell verfügbaren lokalen und Cloud-Modelle. Die Spalten ID und ENGINE enthalten die IDs für die folgenden Befehle; ein Sternchen markiert das ausgewählte Modell."
            : "Lists the currently available local and cloud models. The ID and ENGINE columns hold the IDs for the commands below; an asterisk marks the selected model."}
        </p>
        <DocsCode locale={locale} lang="powershell" code="typewhisper models" />

        {modelCommands.map((command) => (
          <div key={command.id}>
            <DocsSubheading id={`command-${command.id}`}>
              <code>{command.name}</code>
            </DocsSubheading>
            <p>{withCode(isDe ? command.descriptionDe : command.descriptionEn)}</p>
            <DocsCode locale={locale} lang="powershell" code={command.code} />
            <DocsCode
              locale={locale}
              lang={isDe ? "Ausgabe" : "output"}
              code={command.output}
            />
          </div>
        ))}
        <p>
          {isDe ? "HTTP-API: " : "HTTP API: "}
          <a href={localePath(locale, "/docs/windows/api#model-management")}>
            {isDe ? "Modelle laden, entladen und löschen" : "Load, unload, and delete models"}
          </a>
        </p>

        <DocsSubheading id="command-transcribe">
          <code>transcribe &lt;file|-&gt;</code>
        </DocsSubheading>
        <p>{isDe ? "Transkribiert einen lokalen Dateipfad oder Raw-Audio von stdin." : "Transcribes a local file path or raw audio from stdin."}</p>
        <DocsCode
          locale={locale}
          lang="shell"
          code={`typewhisper transcribe meeting.m4a
typewhisper transcribe - < audio.wav`}
        />
      </DocsSection>

      <DocsSection id="global-flags" title={globalFlagsTitle}>
        {flagsTable(globalFlagsTitle, globalFlags)}
      </DocsSection>

      <DocsSection id="transcribe-flags" title={transcribeFlagsTitle}>
        {flagsTable(transcribeFlagsTitle, transcribeFlags)}
        <p>
          {isDe
            ? "--language und --language-hint dürfen nicht gemeinsam verwendet werden. Wiederhole --language-hint für mehrere Hinweise in gewünschter Reihenfolge."
            : "--language and --language-hint cannot be combined. Repeat --language-hint for multiple hints in the desired order."}
        </p>
      </DocsSection>

      <DocsSection id="model-flags" title={modelFlagsTitle}>
        {flagsTable(modelFlagsTitle, modelFlags)}
        <p>
          {withCode(
            isDe
              ? "Diese Flags gelten für `models load`, `models unload` und `models delete`. Die gleichnamigen Flags von `transcribe` überschreiben das Modell nur für eine Anfrage."
              : "These flags apply to `models load`, `models unload`, and `models delete`. The flags of the same name for `transcribe` override the model for one request only.",
          )}
        </p>
      </DocsSection>

      <DocsSection id="examples" title={isDe ? "Beispiele" : "Examples"}>
        <DocsCode
          locale={locale}
          lang="powershell"
          code={`typewhisper transcribe recording.wav --language de --json
typewhisper transcribe recording.wav --language-hint de --language-hint en
typewhisper transcribe recording.wav --engine <engine-id> --model <model-id>
typewhisper transcribe recording.wav --task translate --translate-to en
typewhisper transcribe recording.wav --await-download
typewhisper --port 9000 status`}
        />
        <p>
          {withCode(
            isDe
              ? "Für einen Auftrag zu einem anderen Modell wechseln und es danach entladen, um Arbeitsspeicher freizugeben. `models load` macht das Modell auch zum ausgewählten Modell in TypeWhisper. Lade danach dein übliches Modell, um zurückzuwechseln:"
              : "Switch to another model for one job and unload it afterwards to free memory. `models load` also makes it the selected model in TypeWhisper, so load your usual model again to switch back:",
          )}
        </p>
        <DocsCode
          locale={locale}
          lang="powershell"
          code={`typewhisper models
typewhisper models load --engine whisper-cpp --model large-v3-turbo
typewhisper transcribe interview.m4a
typewhisper models unload --engine whisper-cpp`}
        />
        <a href={localePath(locale, "/docs/windows/api")} className="site-link">
          {isDe ? "HTTP API und Authentifizierung" : "HTTP API and authentication"}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </DocsSection>
    </>
  );
}

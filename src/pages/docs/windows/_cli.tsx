import { ArrowRight } from "lucide-react";
import {
  DocsCallout,
  DocsCode,
  DocsSection,
  DocsSubheading,
  DocsTable,
} from "@/components/docs/prose";
import { localePath, t, type Locale } from "@/i18n/index";

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

  return (
    <>
      <DocsSection
        id="install"
        title={isDe ? "Installieren und vorbereiten" : "Install and prepare"}
      >
        <ol>
          <li>{isDe ? "Öffne Einstellungen > Erweitert > Command Line Tool und klicke auf Installieren." : "Open Settings > Advanced > Command Line Tool and click Install."}</li>
          <li>{isDe ? "Öffne danach ein neues Terminal, damit der aktualisierte Benutzer-PATH geladen wird." : "Open a new terminal afterward so the updated user PATH is loaded."}</li>
          <li>{isDe ? "Aktiviere unter Einstellungen > Erweitert > API Server den lokalen Server." : "Enable the local server in Settings > Advanced > API Server."}</li>
          <li>{isDe ? "Prüfe die Verbindung mit typewhisper status." : "Verify the connection with typewhisper status."}</li>
        </ol>
        <DocsCode locale={locale} lang="powershell" code="typewhisper status" />
        <p>
          {isDe
            ? "Die CLI ist ein Client der lokalen HTTP API. TypeWhisper muss laufen und der API-Server muss aktiviert sein."
            : "The CLI is a client for the local HTTP API. TypeWhisper must be running and the API server must be enabled."}
        </p>
      </DocsSection>

      <DocsSection
        id="discovery-and-token"
        title={isDe ? "Automatische Discovery und Token" : "Automatic discovery and token"}
      >
        <p>
          {isDe ? "Ohne " : "Without "}
          <code>--port</code>
          {isDe ? " liest die CLI zuerst " : ", the CLI first reads "}
          <code>%LOCALAPPDATA%\TypeWhisper\api-discovery.json</code>
          {isDe ? ", danach die ältere Datei " : ", then the legacy "}
          <code>api-port</code>
          {isDe ? " und verwendet zuletzt 8978 als Fallback." : " file, and finally falls back to 8978."}
        </p>
        <DocsCallout label={t(locale, "docs.callout.note")}>
          <p>
            {isDe
              ? "Hinweis zum aktuellen Stable-Client: Die App schreibt ihre Discovery-Dateien bereits nach %LOCALAPPDATA%\\TypeWhisper-UserData, die CLI prüft jedoch noch den früheren Ordner oben. Port 8978 funktioniert über den Fallback. Verwende bei einem abweichenden Port --port."
              : "Current stable client note: the app now writes its discovery files to %LOCALAPPDATA%\\TypeWhisper-UserData, but the CLI still checks the former folder shown above. Port 8978 works through the fallback. Use --port for a different port."}
          </p>
        </DocsCallout>
        <p>
          {isDe
            ? "Ein Token wird übernommen, wenn die CLI ihre Discovery-Datei findet. Setze beim aktuellen Stable-Client für Token-Schutz zuverlässig TYPEWHISPER_API_TOKEN oder --api-token. Die Priorität lautet: --api-token, Umgebungsvariable, Discovery."
            : "A token is used when the CLI finds its discovery file. With the current stable client, set TYPEWHISPER_API_TOKEN or --api-token explicitly when token protection is enabled. Priority is --api-token, environment variable, then discovery."}
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
        <p>{isDe ? "Listet die aktuell verfügbaren lokalen und Cloud-Modelle." : "Lists the currently available local and cloud models."}</p>
        <DocsCode locale={locale} lang="powershell" code="typewhisper models" />

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
        <a href={localePath(locale, "/docs/windows/api")} className="site-link">
          {isDe ? "HTTP API und Authentifizierung" : "HTTP API and authentication"}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </DocsSection>
    </>
  );
}

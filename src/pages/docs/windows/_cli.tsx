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

export default function DocsWindowsCLI({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";

  const flagsTable = (flags: Flag[]) => (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[36rem] text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="pb-2 pr-5 font-semibold">Flag</th>
            <th className="pb-2 font-semibold">{isDe ? "Beschreibung" : "Description"}</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          {flags.map(([name, descriptionDe, descriptionEn]) => (
            <tr key={name} className="border-b border-border/50 last:border-0">
              <td className="py-2.5 pr-5 font-mono text-xs text-foreground">{name}</td>
              <td className="py-2.5">{isDe ? descriptionDe : descriptionEn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">
        {isDe ? "CLI-Tool" : "CLI Tool"}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {isDe
          ? "Nutze TypeWhisper aus PowerShell, Skripten und lokalen Automatisierungen."
          : "Use TypeWhisper from PowerShell, scripts, and local automation."}
      </p>

      <div className="mt-8 space-y-6">
        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Installieren und vorbereiten" : "Install and prepare"}
          </h2>
          <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-muted-foreground">
            <li>{isDe ? "Öffne Einstellungen > Erweitert > Command Line Tool und klicke auf Installieren." : "Open Settings > Advanced > Command Line Tool and click Install."}</li>
            <li>{isDe ? "Öffne danach ein neues Terminal, damit der aktualisierte Benutzer-PATH geladen wird." : "Open a new terminal afterward so the updated user PATH is loaded."}</li>
            <li>{isDe ? "Aktiviere unter Einstellungen > Erweitert > API Server den lokalen Server." : "Enable the local server in Settings > Advanced > API Server."}</li>
            <li>{isDe ? "Prüfe die Verbindung mit typewhisper status." : "Verify the connection with typewhisper status."}</li>
          </ol>
          <div className="mt-4 overflow-x-auto rounded-md bg-background p-4 font-mono text-sm">
            typewhisper status
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {isDe
              ? "Die CLI ist ein Client der lokalen HTTP API. TypeWhisper muss laufen und der API-Server muss aktiviert sein."
              : "The CLI is a client for the local HTTP API. TypeWhisper must be running and the API server must be enabled."}
          </p>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Automatische Discovery und Token" : "Automatic discovery and token"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe ? "Ohne " : "Without "}
            <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">--port</code>
            {isDe ? " liest die CLI zuerst " : ", the CLI first reads "}
            <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">%LOCALAPPDATA%\TypeWhisper\api-discovery.json</code>
            {isDe ? ", danach die ältere Datei " : ", then the legacy "}
            <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">api-port</code>
            {isDe ? " und verwendet zuletzt 8978 als Fallback." : " file, and finally falls back to 8978."}
          </p>
          <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
            {isDe
              ? "Hinweis zum aktuellen Stable-Client: Die App schreibt ihre Discovery-Dateien bereits nach %LOCALAPPDATA%\\TypeWhisper-UserData, die CLI prüft jedoch noch den früheren Ordner oben. Port 8978 funktioniert über den Fallback. Verwende bei einem abweichenden Port --port."
              : "Current stable client note: the app now writes its discovery files to %LOCALAPPDATA%\\TypeWhisper-UserData, but the CLI still checks the former folder shown above. Port 8978 works through the fallback. Use --port for a different port."}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {isDe
              ? "Ein Token wird übernommen, wenn die CLI ihre Discovery-Datei findet. Setze beim aktuellen Stable-Client für Token-Schutz zuverlässig TYPEWHISPER_API_TOKEN oder --api-token. Die Priorität lautet: --api-token, Umgebungsvariable, Discovery."
              : "A token is used when the CLI finds its discovery file. With the current stable client, set TYPEWHISPER_API_TOKEN or --api-token explicitly when token protection is enabled. Priority is --api-token, environment variable, then discovery."}
          </p>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{isDe ? "Befehle" : "Commands"}</h2>
          <div className="mt-4 space-y-5">
            <div>
              <h3 className="text-sm font-semibold">status</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {isDe ? "Zeigt API-, Engine- und Modellstatus." : "Shows API, engine, and model status."}
              </p>
              <div className="mt-2 rounded-md bg-background p-4 font-mono text-sm">typewhisper status</div>
            </div>
            <div>
              <h3 className="text-sm font-semibold">models</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {isDe ? "Listet die aktuell verfügbaren lokalen und Cloud-Modelle." : "Lists the currently available local and cloud models."}
              </p>
              <div className="mt-2 rounded-md bg-background p-4 font-mono text-sm">typewhisper models</div>
            </div>
            <div>
              <h3 className="text-sm font-semibold">transcribe &lt;file|-&gt;</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {isDe ? "Transkribiert einen lokalen Dateipfad oder Raw-Audio von stdin." : "Transcribes a local file path or raw audio from stdin."}
              </p>
              <pre className="mt-2 overflow-x-auto rounded-md bg-background p-4 font-mono text-sm">{`typewhisper transcribe meeting.m4a
typewhisper transcribe - < audio.wav`}</pre>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{isDe ? "Globale Flags" : "Global flags"}</h2>
          {flagsTable(globalFlags)}
          <h2 className="mt-7 text-lg font-semibold">
            {isDe ? "Flags für transcribe" : "transcribe flags"}
          </h2>
          {flagsTable(transcribeFlags)}
          <p className="mt-3 text-sm text-muted-foreground">
            {isDe
              ? "--language und --language-hint dürfen nicht gemeinsam verwendet werden. Wiederhole --language-hint für mehrere Hinweise in gewünschter Reihenfolge."
              : "--language and --language-hint cannot be combined. Repeat --language-hint for multiple hints in the desired order."}
          </p>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{isDe ? "Beispiele" : "Examples"}</h2>
          <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 font-mono text-sm leading-7">{`typewhisper transcribe recording.wav --language de --json
typewhisper transcribe recording.wav --language-hint de --language-hint en
typewhisper transcribe recording.wav --engine <engine-id> --model <model-id>
typewhisper transcribe recording.wav --task translate --translate-to en
typewhisper transcribe recording.wav --await-download
typewhisper --port 9000 status`}</pre>
          <p className="mt-4 text-sm">
            <a href={localePath(locale, "/docs/windows/api")} className="text-primary hover:underline">
              {isDe ? "HTTP API und Authentifizierung" : "HTTP API and authentication"}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

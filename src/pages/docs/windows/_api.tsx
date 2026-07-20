import { Screenshot } from "@/components/ui/screenshot";
import { screenshotPath, type Locale } from "@/i18n/index";

type Endpoint = [method: string, path: string, descriptionDe: string, descriptionEn: string];

const endpoints: Endpoint[] = [
  ["GET", "/v1/status", "Server-, Engine- und Modellstatus", "Server, engine, and model status"],
  ["GET", "/v1/models", "Verfügbare lokale und Cloud-Modelle", "Available local and cloud models"],
  ["POST", "/v1/transcribe", "Multipart- oder Raw-Audio transkribieren", "Transcribe multipart or raw audio"],
  ["POST", "/v1/transcribe/local-file", "Lokalen Windows-Dateipfad transkribieren", "Transcribe a local Windows file path"],
  ["GET", "/v1/history", "Verlauf durchsuchen und seitenweise lesen", "Search and paginate history"],
  ["DELETE", "/v1/history", "Verlaufseintrag anhand seiner ID löschen", "Delete a history entry by ID"],
  ["POST", "/v1/dictation/start", "Diktataufnahme starten", "Start dictation recording"],
  ["POST", "/v1/dictation/stop", "Diktataufnahme beenden", "Stop dictation recording"],
  ["GET", "/v1/dictation/status", "Aktuellen Diktatstatus lesen", "Read current dictation state"],
  ["GET", "/v1/dictation/transcription", "Diktatergebnis über die Session-ID abrufen", "Poll a dictation result by session ID"],
  ["POST", "/v1/recorder/start", "Recorder-Sitzung starten", "Start a recorder session"],
  ["POST", "/v1/recorder/stop", "Recorder-Sitzung stoppen", "Stop a recorder session"],
  ["GET", "/v1/recorder/status", "Recorder-Status lesen", "Read recorder state"],
  ["GET", "/v1/recorder/session", "Recorder-Sitzung über ihre ID lesen", "Read a recorder session by ID"],
  ["GET", "/v1/dictionary/terms", "Aktivierte Wörterbuchbegriffe lesen", "List enabled dictionary terms"],
  ["PUT", "/v1/dictionary/terms", "Begriffe ergänzen oder ersetzen", "Append or replace dictionary terms"],
  ["DELETE", "/v1/dictionary/terms", "Einen Begriff löschen", "Delete one dictionary term"],
  ["GET", "/v1/dictionary/corrections", "Aktivierte Korrekturen lesen", "List enabled dictionary corrections"],
  ["PUT", "/v1/dictionary/corrections", "Eine Korrektur anlegen oder aktualisieren", "Create or update a correction"],
  ["DELETE", "/v1/dictionary/corrections", "Eine Korrektur löschen", "Delete a correction"],
];

export default function DocsWindowsAPI({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">HTTP API</h1>
      <p className="mt-3 text-muted-foreground">
        {isDe
          ? "Steuere Transkription, Diktat, Recorder, Verlauf und Wörterbuch über eine lokale HTTP-Schnittstelle."
          : "Control transcription, dictation, recorder, history, and dictionary through a local HTTP interface."}
      </p>

      <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground">
        <strong className="text-foreground">{isDe ? "Nur lokal:" : "Local only:"}</strong>{" "}
        {isDe
          ? "Der Server bindet ausschließlich an localhost beziehungsweise 127.0.0.1. Er ist standardmäßig deaktiviert und verwendet Port 8978."
          : "The server binds only to localhost and 127.0.0.1. It is disabled by default and uses port 8978."}
      </div>

      <div className="mt-8 space-y-6">
        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Server aktivieren" : "Enable the server"}
          </h2>
          <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-muted-foreground">
            <li>{isDe ? "Öffne Einstellungen > Erweitert > API Server." : "Open Settings > Advanced > API Server."}</li>
            <li>{isDe ? "Aktiviere den API-Server und behalte Port 8978 oder trage einen freien lokalen Port ein." : "Enable the API server and keep port 8978, or choose another available local port."}</li>
            <li>{isDe ? "Prüfe den Status in PowerShell:" : "Check the status from PowerShell:"}</li>
          </ol>
          <div className="mt-4 overflow-x-auto rounded-md bg-background p-4 font-mono text-sm">
            curl.exe http://localhost:8978/v1/status
          </div>
          <Screenshot
            src={screenshotPath(locale, "/screenshots/windows/advanced.png")}
            alt={isDe ? "API-Server-Einstellungen im Bereich Erweitert" : "API server settings in the Advanced section"}
            className="mt-5 aspect-[31/20] w-full rounded-xl border border-border object-cover"
            loading="eager"
          />
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Discovery und Token" : "Discovery and token"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe ? "Beim Start schreibt der Server zwei Discovery-Dateien nach " : "When it starts, the server writes two discovery files to "}
            <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">%LOCALAPPDATA%\TypeWhisper-UserData</code>
            {isDe ? ": " : ": "}
            <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">api-discovery.json</code>
            {" "}
            {isDe ? "mit Version, Port und Token sowie die ältere Datei " : "with version, port, and token, plus the legacy "}
            <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">api-port</code>.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 font-mono text-sm text-muted-foreground">{`{
  "version": 1,
  "port": 8978,
  "token": "..."
}`}</pre>
          <p className="mt-4 text-sm text-muted-foreground">
            {isDe
              ? "Token-Authentifizierung ist optional. Wenn „API-Token erforderlich“ aktiv ist, bleibt nur /v1/status öffentlich. Sende den Token bei allen anderen Anfragen als Bearer-Token oder im Header X-TypeWhisper-API-Token."
              : "Token authentication is optional. When Require API Token is enabled, only /v1/status remains public. Send the token with every other request as a bearer token or the X-TypeWhisper-API-Token header."}
          </p>
          <div className="mt-4 overflow-x-auto rounded-md bg-background p-4 font-mono text-xs leading-6">
            <p>$discovery = Get-Content "$env:LOCALAPPDATA\TypeWhisper-UserData\api-discovery.json" | ConvertFrom-Json</p>
            <p>curl.exe -H "Authorization: Bearer $($discovery.token)" "http://localhost:$($discovery.port)/v1/models"</p>
          </div>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Audio transkribieren" : "Transcribe audio"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Sende eine Datei als multipart/form-data. language und language_hint schließen sich gegenseitig aus; language_hint darf mehrfach und in Prioritätsreihenfolge vorkommen."
              : "Send a file as multipart/form-data. language and language_hint are mutually exclusive; language_hint may be repeated in priority order."}
          </p>
          <pre className="mt-4 overflow-x-auto rounded-md bg-background p-4 font-mono text-sm">{`curl.exe -X POST http://localhost:8978/v1/transcribe \`
  -F "file=@recording.wav" \`
  -F "language_hint=de" \`
  -F "language_hint=en" \`
  -F "response_format=verbose_json"`}</pre>
          <p className="mt-4 text-sm text-muted-foreground">
            {isDe
              ? "Weitere Felder: task (transcribe oder translate), target_language, prompt, engine und model. Mit await_download=1 wartet die Anfrage bei unterstützten lokalen Engines auf Download oder Wiederherstellung des Modells."
              : "Additional fields: task (transcribe or translate), target_language, prompt, engine, and model. Add await_download=1 to wait for a supported local engine to download or restore the model."}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {isDe
              ? "Für bereits lokale Dateien akzeptiert /v1/transcribe/local-file einen Windows-Pfad als JSON. Dadurch muss eine große Datei nicht nochmals durch den API-Prozess hochgeladen werden."
              : "For files already on this machine, /v1/transcribe/local-file accepts a Windows path as JSON. This avoids uploading a large local file through the API process."}
          </p>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Stabile Endpunkte" : "Stable endpoints"}
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[42rem] text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-4 font-semibold">{isDe ? "Methode" : "Method"}</th>
                  <th className="pb-2 pr-4 font-semibold">Route</th>
                  <th className="pb-2 font-semibold">{isDe ? "Zweck" : "Purpose"}</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {endpoints.map(([method, path, descriptionDe, descriptionEn]) => (
                  <tr key={`${method}-${path}`} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 pr-4 font-mono text-xs text-foreground">{method}</td>
                    <td className="py-2.5 pr-4 font-mono text-xs">{path}</td>
                    <td className="py-2.5">{isDe ? descriptionDe : descriptionEn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Workflow-Kompatibilitätsrouten" : "Workflow compatibility routes"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">/v1/rules</code>
            {" "}{isDe ? "und " : "and "}
            <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">/v1/profiles</code>
            {" "}
            {isDe
              ? "sowie ihre PUT-Routen /toggle bleiben für bestehende Integrationen erhalten. Beide liefern die heutige Workflow-Konfiguration; für neue Oberflächen und Dokumentation heißt das Konzept Workflows."
              : "and their PUT /toggle routes remain available for existing integrations. Both expose the current workflow configuration; new interfaces and documentation call the concept Workflows."}
          </p>
        </section>
      </div>
    </div>
  );
}

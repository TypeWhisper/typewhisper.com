import {
  DocsCallout,
  DocsCode,
  DocsFigure,
  DocsSection,
  DocsTable,
  withCode,
} from "@/components/docs/prose";
import { localePath, screenshotPath, t, type Locale } from "@/i18n/index";

type Endpoint = [method: string, path: string, descriptionDe: string, descriptionEn: string];

const endpoints: Endpoint[] = [
  ["GET", "/v1/status", "Server-, Engine- und Modellstatus", "Server, engine, and model status"],
  ["GET", "/v1/models", "Verfügbare lokale und Cloud-Modelle", "Available local and cloud models"],
  ["POST", "/v1/models/load", "Modell laden und für die Transkription auswählen, ohne Download", "Load a model and select it for transcription, without downloading"],
  ["POST", "/v1/models/unload", "Modell einer Engine entladen, heruntergeladene Dateien behalten", "Unload an engine's model and keep its downloaded files"],
  ["DELETE", "/v1/models", "Heruntergeladene Dateien eines Modells löschen", "Delete the downloaded files of a model"],
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

export function windowsApiHead(locale: Locale) {
  return {
    heading: "HTTP API",
    lede:
      locale === "de"
        ? "Steuere Transkription, Diktat, Recorder, Verlauf und Wörterbuch über eine lokale HTTP-Schnittstelle."
        : "Control transcription, dictation, recorder, history, and dictionary through a local HTTP interface.",
  };
}

export default function DocsWindowsAPI({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";

  return (
    <>
      <DocsCallout label={t(locale, "docs.callout.important")}>
        <p>
          <strong>{isDe ? "Nur lokal:" : "Local only:"}</strong>{" "}
          {isDe
            ? "Der Server bindet ausschließlich an localhost beziehungsweise 127.0.0.1. Er ist standardmäßig deaktiviert und verwendet Port 8978."
            : "The server binds only to localhost and 127.0.0.1. It is disabled by default and uses port 8978."}
        </p>
      </DocsCallout>

      <DocsSection
        id="enable"
        title={isDe ? "Server aktivieren" : "Enable the server"}
      >
        <ol>
          <li>{isDe ? "Öffne Einstellungen > Erweitert > API-Server." : "Open Settings > Advanced > API server."}</li>
          <li>{isDe ? "Schalte „HTTP-API aktivieren“ ein; der Server startet sofort. Für einen anderen Port als 8978 trägst du ihn ein und wählst „Anwenden“." : "Turn on Enable HTTP API; the server starts right away. To use a port other than 8978, enter it and select Apply."}</li>
          <li>{isDe ? "Prüfe den Status in PowerShell:" : "Check the status from PowerShell:"}</li>
        </ol>
        <DocsCode
          locale={locale}
          lang="powershell"
          code="curl.exe http://localhost:8978/v1/status"
        />
        <DocsFigure
          kind="framed"
          src={screenshotPath(locale, "/screenshots/windows/advanced.png")}
          alt={isDe ? "API-Server-Einstellungen im Bereich Erweitert" : "API server settings in the Advanced section"}
          loading="eager"
        />
      </DocsSection>

      <DocsSection
        id="discovery-and-token"
        title={isDe ? "Discovery und Token" : "Discovery and token"}
      >
        <p>
          {isDe ? "Beim Start schreibt der Server zwei Discovery-Dateien in deinen Profilordner, bei der direkten Installation " : "When it starts, the server writes two discovery files to your profile folder, which is "}
          <code>%LOCALAPPDATA%\TypeWhisper-WinUI</code>
          {isDe ? ": " : " for the direct download: "}
          <code>api-discovery.json</code>{" "}
          {isDe ? "mit Port, Token, Adresse, API-Version, Prozess-ID und der Angabe, ob ein Token verlangt wird, sowie die ältere Datei " : "with port, token, address, API version, process ID, and whether a token is required, plus the legacy "}
          <code>api-port</code>
          {isDe ? ". Wo die Microsoft-Store-Version ihr Profil ablegt, steht unter " : " file. For where the Microsoft Store edition keeps its profile, see "}
          <a href={localePath(locale, "/docs/windows/installation#data-and-uninstall")}>
            {isDe ? "Datenablage und Deinstallation" : "Data location and uninstall"}
          </a>
          .
        </p>
        <DocsCode
          locale={locale}
          lang="json"
          code={`{
  "version": 1,
  "token": "...",
  "host": "127.0.0.1",
  "port": 8978,
  "base_url": "http://127.0.0.1:8978",
  "api_version": "1.2",
  "pid": 12345,
  "requires_authentication": false
}`}
        />
        <p>
          {isDe
            ? "Token-Authentifizierung ist optional: Schalte „API-Token verlangen“ ein und wähle „Anwenden“. /v1/status bleibt dann öffentlich. Sende das Token bei allen anderen API-Anfragen als Bearer-Token oder im Header X-TypeWhisper-API-Token."
            : "Token authentication is optional: turn on Require API token and select Apply. /v1/status then stays public. Send the token with every other API request as a bearer token or the X-TypeWhisper-API-Token header."}
        </p>
        <DocsCode
          locale={locale}
          lang="powershell"
          code={`$discovery = Get-Content "$env:LOCALAPPDATA\\TypeWhisper-WinUI\\api-discovery.json" | ConvertFrom-Json
curl.exe -H "Authorization: Bearer $($discovery.token)" "http://localhost:$($discovery.port)/v1/models"`}
        />
      </DocsSection>

      <DocsSection
        id="transcribe"
        title={isDe ? "Audio transkribieren" : "Transcribe audio"}
      >
        <p>
          {isDe
            ? "Sende eine Datei als multipart/form-data. language und language_hint schließen sich gegenseitig aus; language_hint darf mehrfach und in Prioritätsreihenfolge vorkommen."
            : "Send a file as multipart/form-data. language and language_hint are mutually exclusive; language_hint may be repeated in priority order."}
        </p>
        <DocsCode
          locale={locale}
          lang="powershell"
          code={`curl.exe -X POST http://localhost:8978/v1/transcribe \`
  -F "file=@recording.wav" \`
  -F "language_hint=de" \`
  -F "language_hint=en" \`
  -F "response_format=verbose_json"`}
        />
        <p>
          {isDe
            ? "Weitere Felder: task (transcribe oder translate), target_language, prompt, engine und model. Mit await_download=1 wartet die Anfrage bei unterstützten lokalen Engines auf Download oder Wiederherstellung des Modells."
            : "Additional fields: task (transcribe or translate), target_language, prompt, engine, and model. Add await_download=1 to wait for a supported local engine to download or restore the model."}
        </p>
        <p>
          {isDe
            ? "Für bereits lokale Dateien akzeptiert /v1/transcribe/local-file einen Windows-Pfad als JSON. Dadurch muss eine große Datei nicht nochmals durch den API-Prozess hochgeladen werden."
            : "For files already on this machine, /v1/transcribe/local-file accepts a Windows path as JSON. This avoids uploading a large local file through the API process."}
        </p>
      </DocsSection>

      <DocsSection
        id="model-management"
        title={isDe ? "Modelle laden, entladen und löschen" : "Load, unload, and delete models"}
      >
        <p>
          {withCode(
            isDe
              ? "Übergib die Werte `engine` und `id` aus `GET /v1/models` als `engine` und `model`. `POST /v1/models/load` lädt das Modell und wählt es für die Transkription aus. Heruntergeladen wird dabei nichts: Lade ein lokales Modell zuerst in TypeWhisper herunter oder lass es von einer Transkriptionsanfrage mit `engine`, `model` und `await_download=1` herunterladen. Die Antwort kommt, sobald das Modell geladen ist oder das Laden fehlgeschlagen ist."
              : "Pass the `engine` and `id` values from `GET /v1/models` as `engine` and `model`. `POST /v1/models/load` loads the model and selects it for transcription. It does not download anything: download a local model in TypeWhisper first, or let a transcription request with `engine`, `model`, and `await_download=1` download it. The request returns once the model is loaded or loading has failed.",
          )}
        </p>
        <p>
          {withCode(
            isDe
              ? "Parakeet meldet die Engine `sherpa-onnx`, whisper.cpp meldet `whisper-cpp`. Als `engine` nimmt die API auch die `provider_id` des Modells oder die Paket-ID des Plugins an, etwa `com.typewhisper.sherpa-onnx`."
              : "Parakeet reports the engine `sherpa-onnx`, and whisper.cpp reports `whisper-cpp`. As `engine`, the API also accepts the model's `provider_id` or the plugin's package ID, such as `com.typewhisper.sherpa-onnx`.",
          )}
        </p>
        <p>
          {withCode(
            isDe
              ? "Die Beispiele übergeben JSON-Bodys per Pipeline an `curl.exe` (`--data-binary \"@-\"`), weil Windows PowerShell 5.1 die Anführungszeichen aus JSON entfernt, das als Argument übergeben wird:"
              : "The examples pipe JSON bodies to `curl.exe` (`--data-binary \"@-\"`), because Windows PowerShell 5.1 strips the double quotes from JSON passed as an argument:",
          )}
        </p>
        <DocsCode
          locale={locale}
          lang="powershell"
          code={`'{"engine":"sherpa-onnx","model":"parakeet-tdt-0.6b"}' |
  curl.exe -X POST http://localhost:8978/v1/models/load \`
    -H "Content-Type: application/json" --data-binary "@-"

'{"engine":"sherpa-onnx"}' |
  curl.exe -X POST http://localhost:8978/v1/models/unload \`
    -H "Content-Type: application/json" --data-binary "@-"

curl.exe -X DELETE \`
  "http://localhost:8978/v1/models?engine=sherpa-onnx&model=canary-180m-flash"`}
        />
        <DocsCode
          locale={locale}
          lang="json"
          code={`{
  "engine": "sherpa-onnx",
  "model": "parakeet-tdt-0.6b",
  "status": "ready"
}`}
        />
        <p>
          {withCode(
            isDe
              ? "Jede Route liefert `engine`, `model` und `status`; `status` ist `ready`, `unloaded` oder `deleted`, und `engine` wiederholt den Wert aus der Anfrage. `POST /v1/models/unload` braucht nur `engine` und ignoriert `model`. Die Route entlädt das Modell der Engine und behält die heruntergeladenen Dateien. In der Antwort ist `model` das Modell, das geladen war (Parakeet), oder das ausgewählte Modell der Engine (andere Engines), und `null`, wenn es keins gibt. Nach dem Entladen von Parakeet hat TypeWhisper kein Modell bereit, bis du wieder eines lädst."
              : "Each route returns `engine`, `model`, and `status`, which is `ready`, `unloaded`, or `deleted`; `engine` repeats the value from the request. `POST /v1/models/unload` needs only `engine` and ignores `model`. It unloads the engine's model and keeps the downloaded files. In its response, `model` is the model that was loaded (Parakeet) or the engine's selected model (other engines), and `null` if there is none. After you unload Parakeet, TypeWhisper has no model ready until you load one again.",
          )}
        </p>
        <p>
          {withCode(
            isDe
              ? "`DELETE /v1/models` erwartet `engine` und `model` als Query-Parameter und entfernt die heruntergeladenen Modelldateien. Das funktioniert bei lokalen Engines, deren Plugin Modelldateien entfernen kann, etwa Parakeet und whisper.cpp. Das Modell, das eine Engine ausgewählt hat oder noch geladen haben könnte, ist geschützt und ergibt 409: Lade zuerst ein anderes Modell dieser Engine und entlade bei anderen Engines als Parakeet zusätzlich die Engine."
              : "`DELETE /v1/models` takes `engine` and `model` as query parameters and removes the downloaded model files. This works for local engines whose plugin can remove model files, such as Parakeet and whisper.cpp. The model an engine has selected or may still have loaded is protected and returns 409: load another model of that engine first and, for engines other than Parakeet, unload the engine as well.",
          )}
        </p>
        <p>
          {withCode(
            isDe
              ? "Ungültiges JSON oder ein fehlendes `engine` ergibt 400, beim Laden und Löschen auch ein fehlendes `model`. Eine unbekannte Engine oder ein Modell, das die Engine nicht anbietet, ergibt 404, ebenso das Löschen eines Modells, das nicht heruntergeladen ist. Mit 409 antworten die Routen, wenn die Engine die Aktion nicht ausführen kann, wenn TypeWhisper gerade diktiert, aufnimmt, eine Datei transkribiert oder einen anderen Modellvorgang ausführt, und wenn das zu ladende Modell nicht heruntergeladen ist. Cloud-Engines haben zum Beispiel kein lokales Modell, das sich entladen oder löschen ließe. Eine Anfrage, die länger als fünf Minuten dauert, endet mit 408."
              : "Invalid JSON or a missing `engine` returns 400, and so does a missing `model` for load and delete. An unknown engine or a model the engine does not offer returns 404, and so does deleting a model that is not downloaded. The routes return 409 when the engine cannot perform the action, when TypeWhisper is dictating, recording, transcribing a file, or running another model operation, and when the model to load is not downloaded. Cloud engines, for example, have no local model to unload or delete. A request that runs longer than five minutes ends with 408.",
          )}
        </p>
        <p>
          {isDe ? "Ab TypeWhisper für Windows 1.2 können " : "From TypeWhisper for Windows 1.2, "}
          <a href={localePath(locale, "/docs/windows/managed-settings")}>
            {isDe ? "verwaltete Einstellungen" : "managed settings"}
          </a>
          {withCode(
            isDe
              ? " diese Routen mit 403 ablehnen. Alle drei antworten mit 403 für eine Engine, die die Richtlinie nicht erlaubt, etwa eine Cloud-Engine bei ausgeschalteter Cloud-Transkription oder jede andere Engine als die erzwungene. Erzwingt die Richtlinie Engine und Modell, antwortet `POST /v1/models/load` auch für jedes andere Modell dieser Engine mit 403."
              : " can refuse these routes with 403. All three answer 403 for an engine the policy does not allow, for example a cloud engine while cloud transcription is turned off, or any engine other than the enforced one. When the policy enforces an engine and model, `POST /v1/models/load` also answers 403 for any other model of that engine.",
          )}
        </p>
      </DocsSection>

      <DocsSection
        id="endpoints"
        title={isDe ? "Stabile Endpunkte" : "Stable endpoints"}
      >
        <DocsTable
              kind="endpoints"
          label={isDe ? "Stabile Endpunkte" : "Stable endpoints"}
          head={[isDe ? "Methode" : "Method", "Route", isDe ? "Zweck" : "Purpose"]}
          rows={endpoints.map(([method, path, descriptionDe, descriptionEn]) => [
            <span className="docs-table__method">{method}</span>,
            <code>{path}</code>,
            isDe ? descriptionDe : descriptionEn,
          ])}
        />
      </DocsSection>

      <DocsSection
        id="workflow-compatibility"
        title={isDe ? "Workflow-Kompatibilitätsrouten" : "Workflow compatibility routes"}
      >
        <p>
          <code>/v1/rules</code> {isDe ? "und " : "and "}
          <code>/v1/profiles</code>{" "}
          {isDe
            ? "sowie ihre PUT-Routen /toggle bleiben für bestehende Integrationen erhalten. Beide liefern die heutige Workflow-Konfiguration; für neue Oberflächen und Dokumentation heißt das Konzept Workflows."
            : "and their PUT /toggle routes remain available for existing integrations. Both expose the current workflow configuration; new interfaces and documentation call the concept Workflows."}
        </p>
      </DocsSection>
    </>
  );
}

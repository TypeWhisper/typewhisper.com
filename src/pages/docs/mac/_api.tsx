import type { ReactNode } from "react";
import { t, type Locale } from "@/i18n/index";

type Endpoint = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
};

function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">
      {children}
    </code>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="mt-3 overflow-x-auto rounded-md bg-background p-4">
      <pre className="whitespace-pre font-mono text-sm text-muted-foreground">{code}</pre>
    </div>
  );
}

function APISection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 rounded-2xl bg-card p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function EndpointTable({
  endpoints,
  methodLabel,
  endpointLabel,
  descriptionLabel,
}: {
  endpoints: Endpoint[];
  methodLabel: string;
  endpointLabel: string;
  descriptionLabel: string;
}) {
  return (
    <div className="mt-3 overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[44rem] text-left text-sm">
        <thead className="bg-background text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">{methodLabel}</th>
            <th className="px-4 py-3 font-medium">{endpointLabel}</th>
            <th className="px-4 py-3 font-medium">{descriptionLabel}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {endpoints.map((endpoint) => (
            <tr key={`${endpoint.method}-${endpoint.path}`}>
              <td className="px-4 py-3 align-top font-mono text-xs font-semibold text-primary">
                {endpoint.method}
              </td>
              <td className="px-4 py-3 align-top">
                <code className="whitespace-nowrap font-mono text-xs">{endpoint.path}</code>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{endpoint.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DocsMacAPI({ locale = "en" }: { locale?: Locale }) {
  const endpointGroups: Array<{ title: string; endpoints: Endpoint[] }> = [
    {
      title: t(locale, "docs.mac.api.overview.core"),
      endpoints: [
        { method: "GET", path: "/v1/status", description: t(locale, "docs.mac.api.endpoint.status") },
        { method: "GET", path: "/v1/models", description: t(locale, "docs.mac.api.endpoint.models") },
        { method: "POST", path: "/v1/transcribe", description: t(locale, "docs.mac.api.endpoint.transcribe") },
        { method: "POST", path: "/v1/transcribe/local-file", description: t(locale, "docs.mac.api.endpoint.transcribeLocalFile") },
      ],
    },
    {
      title: t(locale, "docs.mac.api.overview.data"),
      endpoints: [
        { method: "GET", path: "/v1/history", description: t(locale, "docs.mac.api.endpoint.historyList") },
        { method: "DELETE", path: "/v1/history?id=<uuid>", description: t(locale, "docs.mac.api.endpoint.historyDelete") },
        { method: "GET", path: "/v1/dictionary/terms", description: t(locale, "docs.mac.api.endpoint.termsList") },
        { method: "PUT", path: "/v1/dictionary/terms", description: t(locale, "docs.mac.api.endpoint.termsPut") },
        { method: "DELETE", path: "/v1/dictionary/terms", description: t(locale, "docs.mac.api.endpoint.termsDelete") },
        { method: "GET", path: "/v1/dictionary/corrections", description: t(locale, "docs.mac.api.endpoint.correctionsList") },
        { method: "PUT", path: "/v1/dictionary/corrections", description: t(locale, "docs.mac.api.endpoint.correctionsPut") },
        { method: "DELETE", path: "/v1/dictionary/corrections", description: t(locale, "docs.mac.api.endpoint.correctionsDelete") },
        { method: "GET", path: "/v1/settings/export", description: t(locale, "docs.mac.api.endpoint.settingsExport") },
        { method: "POST", path: "/v1/settings/import", description: t(locale, "docs.mac.api.endpoint.settingsImport") },
      ],
    },
    {
      title: t(locale, "docs.mac.api.overview.automation"),
      endpoints: [
        { method: "GET", path: "/v1/rules", description: t(locale, "docs.mac.api.endpoint.rulesList") },
        { method: "PUT", path: "/v1/rules/toggle?id=<uuid>", description: t(locale, "docs.mac.api.endpoint.rulesToggle") },
        { method: "GET", path: "/v1/profiles", description: t(locale, "docs.mac.api.endpoint.profilesList") },
        { method: "PUT", path: "/v1/profiles/toggle?id=<uuid>", description: t(locale, "docs.mac.api.endpoint.profilesToggle") },
        { method: "POST", path: "/v1/dictation/start", description: t(locale, "docs.mac.api.endpoint.dictationStart") },
        { method: "POST", path: "/v1/dictation/stop", description: t(locale, "docs.mac.api.endpoint.dictationStop") },
        { method: "GET", path: "/v1/dictation/status", description: t(locale, "docs.mac.api.endpoint.dictationStatus") },
        { method: "GET", path: "/v1/dictation/transcription?id=<uuid>", description: t(locale, "docs.mac.api.endpoint.dictationTranscription") },
        { method: "POST", path: "/v1/recorder/start", description: t(locale, "docs.mac.api.endpoint.recorderStart") },
        { method: "POST", path: "/v1/recorder/stop", description: t(locale, "docs.mac.api.endpoint.recorderStop") },
        { method: "GET", path: "/v1/recorder/status", description: t(locale, "docs.mac.api.endpoint.recorderStatus") },
        { method: "GET", path: "/v1/recorder/session?id=<uuid>", description: t(locale, "docs.mac.api.endpoint.recorderSession") },
      ],
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">
        {t(locale, "docs.mac.api.title")}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {t(locale, "docs.mac.api.intro1")}{" "}
        <InlineCode>/v1/*</InlineCode>{" "}
        {t(locale, "docs.mac.api.intro2")}
      </p>

      <div className="mt-4 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
        <p className="text-sm text-muted-foreground">
          <strong>{t(locale, "docs.mac.api.noteLabel")}</strong> {t(locale, "docs.mac.api.noteText")}
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <APISection id="setup-authentication" title={t(locale, "docs.mac.api.setup.title")}>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.setup.description")}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.auth.description")}
          </p>
          <CodeBlock
            code={`DISCOVERY="$HOME/Library/Application Support/TypeWhisper/api-discovery.json"
export TYPEWHISPER_API_PORT="$(jq -r '.port' "$DISCOVERY")"
export TYPEWHISPER_API_TOKEN="$(jq -r '.token' "$DISCOVERY")"

curl "http://127.0.0.1:$TYPEWHISPER_API_PORT/v1/models" \\
  -H "Authorization: Bearer $TYPEWHISPER_API_TOKEN"`}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.auth.statusPublic")}{" "}
            <InlineCode>X-TypeWhisper-API-Token</InlineCode>{" "}
            {t(locale, "docs.mac.api.auth.alternativeHeader")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.auth.discovery")}
          </p>
        </APISection>

        <APISection id="endpoint-reference" title={t(locale, "docs.mac.api.overview.title")}>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.overview.description")}
          </p>
          {endpointGroups.map((group) => (
            <div key={group.title} className="mt-6">
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <EndpointTable
                endpoints={group.endpoints}
                methodLabel={t(locale, "docs.mac.api.overview.method")}
                endpointLabel={t(locale, "docs.mac.api.overview.endpoint")}
                descriptionLabel={t(locale, "docs.mac.api.overview.purpose")}
              />
            </div>
          ))}
        </APISection>

        <APISection id="status" title={t(locale, "docs.mac.api.checkStatus.title")}>
          <CodeBlock code={`curl http://localhost:8978/v1/status`} />
          <CodeBlock
            code={`{
  "status": "ready",
  "engine": "whisper",
  "model": "openai_whisper-large-v3_turbo",
  "api_version": "1.1",
  "supports_workflow_dictation": true,
  "supports_streaming": true,
  "supports_translation": true
}`}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.checkStatus.description")}
          </p>
        </APISection>

        <APISection id="transcription" title={t(locale, "docs.mac.api.transcribe.title")}>
          <CodeBlock
            code={`curl -X POST http://localhost:8978/v1/transcribe \\
  -F "file=@recording.wav" \\
  -F "language_hint=de" \\
  -F "language_hint=en" \\
  -F "response_format=verbose_json"`}
          />
          <CodeBlock
            code={`{
  "text": "Hello, world!",
  "language": "en",
  "duration": 2.5,
  "processing_time": 0.8,
  "engine": "whisper",
  "model": "openai_whisper-large-v3_turbo",
  "segments": [
    { "start": 0, "end": 2.5, "text": "Hello, world!" }
  ]
}`}
          />
          <div className="mt-4 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
            <p className="text-sm text-muted-foreground">
              <strong>{t(locale, "docs.mac.api.transcribe.uploadLimit.title")}</strong>{" "}
              {t(locale, "docs.mac.api.transcribe.uploadLimit.description")}
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-semibold">{t(locale, "docs.mac.api.transcribe.optionalParams")}</h3>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li><InlineCode>language</InlineCode> – {t(locale, "docs.mac.api.transcribe.params.language")}</li>
              <li><InlineCode>language_hint</InlineCode> – {t(locale, "docs.mac.api.transcribe.params.languageHint")}</li>
              <li><InlineCode>task</InlineCode> – {t(locale, "docs.mac.api.transcribe.params.task")}</li>
              <li><InlineCode>target_language</InlineCode> – {t(locale, "docs.mac.api.transcribe.params.targetLanguage")}</li>
              <li><InlineCode>response_format</InlineCode> – {t(locale, "docs.mac.api.transcribe.params.responseFormat")}</li>
              <li><InlineCode>prompt</InlineCode> – {t(locale, "docs.mac.api.transcribe.params.prompt")}</li>
              <li><InlineCode>engine</InlineCode> / <InlineCode>model</InlineCode> – {t(locale, "docs.mac.api.transcribe.params.engineModel")}</li>
              <li><InlineCode>normalize_numbers</InlineCode> – {t(locale, "docs.mac.api.transcribe.params.normalizeNumbers")}</li>
              <li><InlineCode>apply_corrections</InlineCode> – {t(locale, "docs.mac.api.transcribe.params.applyCorrections")}</li>
              <li><InlineCode>?await_download=1</InlineCode> – {t(locale, "docs.mac.api.transcribe.params.awaitDownload")}</li>
            </ul>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.transcribe.rawBody")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            <InlineCode>POST /v1/transcribe/local-file</InlineCode>{" "}
            {t(locale, "docs.mac.api.transcribe.localFile")}
          </p>
        </APISection>

        <APISection id="models" title={t(locale, "docs.mac.api.listModels.title")}>
          <CodeBlock code={`curl http://localhost:8978/v1/models`} />
          <CodeBlock
            code={`{
  "models": [
    {
      "id": "openai_whisper-large-v3_turbo",
      "engine": "whisper",
      "name": "Large v3 Turbo",
      "size_description": "~800 MB",
      "language_count": 99,
      "status": "ready",
      "selected": true,
      "downloaded": true,
      "loaded": true
    }
  ]
}`}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.listModels.description")}
          </p>
        </APISection>

        <APISection id="history" title={t(locale, "docs.mac.api.history.title")}>
          <CodeBlock
            code={`curl "http://localhost:8978/v1/history?q=meeting&limit=10&offset=0"
curl -X DELETE "http://localhost:8978/v1/history?id=<uuid>"`}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.history.description")}
          </p>
        </APISection>

        <APISection id="dictionary" title={t(locale, "docs.mac.api.dictionary.title")}>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.dictionary.description")}
          </p>
          <CodeBlock
            code={`curl http://localhost:8978/v1/dictionary/terms

curl -X PUT http://localhost:8978/v1/dictionary/terms \\
  -H "Content-Type: application/json" \\
  -d '{"term_entries":[{"term":"TypeWhisper","ctc_min_similarity":0.65}],"replace":false}'

curl -X DELETE http://localhost:8978/v1/dictionary/terms \\
  -H "Content-Type: application/json" \\
  -d '{"term":"TypeWhisper"}'`}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.dictionary.termsNote")}
          </p>
          <CodeBlock
            code={`curl http://localhost:8978/v1/dictionary/corrections

curl -X PUT http://localhost:8978/v1/dictionary/corrections \\
  -H "Content-Type: application/json" \\
  -d '{"original":"teh","replacement":"the","caseSensitive":false}'

curl -X DELETE http://localhost:8978/v1/dictionary/corrections \\
  -H "Content-Type: application/json" \\
  -d '{"original":"teh"}'`}
          />
        </APISection>

        <APISection id="settings-backup" title={t(locale, "docs.mac.api.settings.title")}>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.settings.description")}
          </p>
          <CodeBlock
            code={`DISCOVERY="$HOME/Library/Application Support/TypeWhisper/api-discovery.json"
TYPEWHISPER_API_PORT="$(jq -r '.port' "$DISCOVERY")"
TYPEWHISPER_API_TOKEN="$(jq -r '.token' "$DISCOVERY")"

(
  settings_backup_tmp="$(mktemp ./typewhisper-settings.json.tmp.XXXXXX)" || exit
  trap 'rm -f "$settings_backup_tmp"' EXIT
  curl --fail --silent --show-error \\
    "http://localhost:$TYPEWHISPER_API_PORT/v1/settings/export" \\
    -H "Authorization: Bearer $TYPEWHISPER_API_TOKEN" \\
    --output "$settings_backup_tmp" && \\
    mv "$settings_backup_tmp" typewhisper-settings.json
)

curl --fail --silent --show-error -X POST \\
  "http://localhost:$TYPEWHISPER_API_PORT/v1/settings/import" \\
  -H "Authorization: Bearer $TYPEWHISPER_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  --data-binary @typewhisper-settings.json`}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.settings.importBehavior")}
          </p>
          <h3 className="mt-5 text-sm font-semibold">{t(locale, "docs.mac.api.settings.importResponse")}</h3>
          <CodeBlock
            code={`{
  "workflowsImported": 4,
  "dictionaryImported": 52,
  "dictionarySkipped": 3,
  "snippetsImported": 6,
  "snippetsSkipped": 1,
  "promptActionsImported": 2,
  "profilesImported": 2,
  "hotkeysApplied": 1,
  "hotkeysSkipped": 1,
  "pluginsInstalled": 2,
  "pluginsSkipped": 1,
  "pluginsRegistryFetchFailed": false,
  "historyImported": 120,
  "historySkippedByRetention": 8,
  "updateChannelApplied": true,
  "preferencesApplied": 27
}`}
          />
          <h3 className="mt-5 text-sm font-semibold">{t(locale, "docs.mac.api.settings.cliTitle")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.settings.cliDescription")}
          </p>
          <CodeBlock
            code={`mkdir -p ~/.config/typewhisper
typewhisper export ~/.config/typewhisper/settings.json
typewhisper import ~/.config/typewhisper/settings.json
typewhisper import ~/.config/typewhisper/settings.json --json`}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.settings.dotfilesNote")}
          </p>
        </APISection>

        <APISection id="rules" title={t(locale, "docs.mac.api.rules.title")}>
          <CodeBlock
            code={`curl http://localhost:8978/v1/rules
curl -X PUT "http://localhost:8978/v1/rules/toggle?id=<uuid>"`}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.rules.description")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.rules.legacyAlias")}
          </p>
        </APISection>

        <APISection id="dictation" title={t(locale, "docs.mac.api.dictation.title")}>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.dictation.description")}
          </p>
          <CodeBlock
            code={`curl -X POST http://localhost:8978/v1/dictation/start \\
  -H "Content-Type: application/json" \\
  -d '{"workflow_id":"<uuid>"}'

curl -X POST http://localhost:8978/v1/dictation/stop
curl http://localhost:8978/v1/dictation/status
curl "http://localhost:8978/v1/dictation/transcription?id=<uuid>"`}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.dictation.workflow")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.dictation.polling")}
          </p>
        </APISection>

        <APISection id="recorder" title={t(locale, "docs.mac.api.recorder.title")}>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.recorder.description")}
          </p>
          <CodeBlock
            code={`curl -X POST "http://localhost:8978/v1/recorder/start?mic=true&system_audio=true"
curl -X POST http://localhost:8978/v1/recorder/stop
curl http://localhost:8978/v1/recorder/status
curl "http://localhost:8978/v1/recorder/session?id=<uuid>"`}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.recorder.parameters")}
          </p>
          <CodeBlock
            code={`{
  "id": "8F8C1F45-6D03-44D2-A38C-0C4DE4F7E5F7",
  "status": "completed",
  "text": "Meeting notes from the recording.",
  "output_file": "/Users/alex/Documents/TypeWhisper Recordings/Recording.m4a"
}`}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.recorder.states")}
          </p>
        </APISection>

        <APISection id="errors" title={t(locale, "docs.mac.api.errors.title")}>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.api.errors.description")}
          </p>
          <CodeBlock
            code={`{
  "error": {
    "code": "unauthorized",
    "message": "Missing or invalid API token"
  }
}`}
          />
          <div className="mt-4">
            <h3 className="text-sm font-semibold">{t(locale, "docs.mac.api.errors.commonCodes")}</h3>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li><InlineCode>400</InlineCode> – {t(locale, "docs.mac.api.errors.400")}</li>
              <li><InlineCode>401</InlineCode> – {t(locale, "docs.mac.api.errors.401")}</li>
              <li><InlineCode>404</InlineCode> – {t(locale, "docs.mac.api.errors.404")}</li>
              <li><InlineCode>409</InlineCode> – {t(locale, "docs.mac.api.errors.409")}</li>
              <li><InlineCode>413</InlineCode> – {t(locale, "docs.mac.api.errors.413")}</li>
              <li><InlineCode>501</InlineCode> – {t(locale, "docs.mac.api.errors.501")}</li>
              <li><InlineCode>503</InlineCode> – {t(locale, "docs.mac.api.errors.503")}</li>
              <li><InlineCode>500</InlineCode> – {t(locale, "docs.mac.api.errors.500")}</li>
            </ul>
          </div>
        </APISection>
      </div>
    </div>
  );
}

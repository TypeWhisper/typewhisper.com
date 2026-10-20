import type { ReactNode } from "react";
import {
  DocsCallout,
  DocsCode,
  DocsSection,
  DocsSubheading,
  DocsTable,
  withCode,
} from "@/components/docs/prose";
import { localePath, t, type Locale } from "@/i18n/index";

type Endpoint = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  description: string;
  /** The endpoint ships with TypeWhisper 1.8. */
  since18?: boolean;
};

/** Fields of `GET /v1/settings/audio`, in response order. */
const audioFields: Array<[field: string, key: string]> = [
  ["input_devices", "docs.mac.api.audio.fields.inputDevices"],
  ["input_priority", "docs.mac.api.audio.fields.inputPriority"],
  ["active_input", "docs.mac.api.audio.fields.activeInput"],
  ["audio_ducking_enabled", "docs.mac.api.audio.fields.duckingEnabled"],
  ["audio_ducking_level", "docs.mac.api.audio.fields.duckingLevel"],
  [
    "pause_media_during_recording",
    "docs.mac.api.audio.fields.pauseMedia",
  ],
  ["sound_feedback_enabled", "docs.mac.api.audio.fields.soundFeedback"],
];

/** Fields of an entry in `GET /v1/recorder/recordings`. */
const recordingFields: Array<[fields: string[], key: string]> = [
  [["source"], "docs.mac.api.recordings.fields.source"],
  [["recording_id"], "docs.mac.api.recordings.fields.recordingId"],
  [["completion_id"], "docs.mac.api.recordings.fields.completionId"],
  [["completed_at"], "docs.mac.api.recordings.fields.completedAt"],
  [["text"], "docs.mac.api.recordings.fields.text"],
  [["audio_file", "transcript_file"], "docs.mac.api.recordings.fields.files"],
  [["markdown_file"], "docs.mac.api.recordings.fields.markdown"],
];

function InlineCode({ children }: { children: ReactNode }) {
  return <code>{children}</code>;
}

export default function DocsMacAPI({ locale = "en" }: { locale?: Locale }) {
  // Code blocks of this page, labelled by what they hold.
  const Shell = ({ code }: { code: string }) => (
    <DocsCode code={code} lang="bash" locale={locale} />
  );
  const Json = ({ code }: { code: string }) => (
    <DocsCode code={code} lang="json" locale={locale} />
  );
  // Features that ship with TypeWhisper 1.8 say so where they are described.
  const availableFrom18 = t(locale, "docs.mac.api.availableFrom18");

  const endpointGroups: Array<{
    id: string;
    title: string;
    endpoints: Endpoint[];
  }> = [
    {
      id: "endpoints-core",
      title: t(locale, "docs.mac.api.overview.core"),
      endpoints: [
        {
          method: "GET",
          path: "/v1/status",
          description: t(locale, "docs.mac.api.endpoint.status"),
        },
        {
          method: "GET",
          path: "/v1/models",
          description: t(locale, "docs.mac.api.endpoint.models"),
        },
        {
          method: "POST",
          path: "/v1/models/load",
          description: t(locale, "docs.mac.api.endpoint.modelsLoad"),
        },
        {
          method: "POST",
          path: "/v1/models/unload",
          description: t(locale, "docs.mac.api.endpoint.modelsUnload"),
        },
        {
          method: "DELETE",
          path: "/v1/models?engine=<id>&model=<id>",
          description: t(locale, "docs.mac.api.endpoint.modelsDelete"),
        },
        {
          method: "POST",
          path: "/v1/transcribe",
          description: t(locale, "docs.mac.api.endpoint.transcribe"),
        },
        {
          method: "POST",
          path: "/v1/transcribe/local-file",
          description: t(locale, "docs.mac.api.endpoint.transcribeLocalFile"),
        },
      ],
    },
    {
      id: "endpoints-data",
      title: t(locale, "docs.mac.api.overview.data"),
      endpoints: [
        {
          method: "GET",
          path: "/v1/history",
          description: t(locale, "docs.mac.api.endpoint.historyList"),
        },
        {
          method: "DELETE",
          path: "/v1/history?id=<uuid>",
          description: t(locale, "docs.mac.api.endpoint.historyDelete"),
        },
        {
          method: "GET",
          path: "/v1/dictionary/terms",
          description: t(locale, "docs.mac.api.endpoint.termsList"),
        },
        {
          method: "PUT",
          path: "/v1/dictionary/terms",
          description: t(locale, "docs.mac.api.endpoint.termsPut"),
        },
        {
          method: "DELETE",
          path: "/v1/dictionary/terms",
          description: t(locale, "docs.mac.api.endpoint.termsDelete"),
        },
        {
          method: "GET",
          path: "/v1/dictionary/corrections",
          description: t(locale, "docs.mac.api.endpoint.correctionsList"),
        },
        {
          method: "PUT",
          path: "/v1/dictionary/corrections",
          description: t(locale, "docs.mac.api.endpoint.correctionsPut"),
        },
        {
          method: "DELETE",
          path: "/v1/dictionary/corrections",
          description: t(locale, "docs.mac.api.endpoint.correctionsDelete"),
        },
        {
          method: "GET",
          path: "/v1/settings/export",
          description: t(locale, "docs.mac.api.endpoint.settingsExport"),
        },
        {
          method: "POST",
          path: "/v1/settings/import",
          description: t(locale, "docs.mac.api.endpoint.settingsImport"),
        },
        {
          method: "GET",
          path: "/v1/settings/audio",
          description: t(locale, "docs.mac.api.endpoint.audioGet"),
          since18: true,
        },
        {
          method: "PATCH",
          path: "/v1/settings/audio",
          description: t(locale, "docs.mac.api.endpoint.audioPatch"),
          since18: true,
        },
      ],
    },
    {
      id: "endpoints-automation",
      title: t(locale, "docs.mac.api.overview.automation"),
      endpoints: [
        {
          method: "GET",
          path: "/v1/rules",
          description: t(locale, "docs.mac.api.endpoint.rulesList"),
        },
        {
          method: "PUT",
          path: "/v1/rules/toggle?id=<uuid>",
          description: t(locale, "docs.mac.api.endpoint.rulesToggle"),
        },
        {
          method: "GET",
          path: "/v1/profiles",
          description: t(locale, "docs.mac.api.endpoint.profilesList"),
        },
        {
          method: "PUT",
          path: "/v1/profiles/toggle?id=<uuid>",
          description: t(locale, "docs.mac.api.endpoint.profilesToggle"),
        },
        {
          method: "POST",
          path: "/v1/dictation/start",
          description: t(locale, "docs.mac.api.endpoint.dictationStart"),
        },
        {
          method: "POST",
          path: "/v1/dictation/stop",
          description: t(locale, "docs.mac.api.endpoint.dictationStop"),
        },
        {
          method: "GET",
          path: "/v1/dictation/status",
          description: t(locale, "docs.mac.api.endpoint.dictationStatus"),
        },
        {
          method: "GET",
          path: "/v1/dictation/transcription?id=<uuid>",
          description: t(
            locale,
            "docs.mac.api.endpoint.dictationTranscription",
          ),
        },
        {
          method: "POST",
          path: "/v1/recorder/start",
          description: t(locale, "docs.mac.api.endpoint.recorderStart"),
        },
        {
          method: "POST",
          path: "/v1/recorder/stop",
          description: t(locale, "docs.mac.api.endpoint.recorderStop"),
        },
        {
          method: "GET",
          path: "/v1/recorder/status",
          description: t(locale, "docs.mac.api.endpoint.recorderStatus"),
        },
        {
          method: "GET",
          path: "/v1/recorder/session?id=<uuid>",
          description: t(locale, "docs.mac.api.endpoint.recorderSession"),
        },
        {
          method: "GET",
          path: "/v1/recorder/recordings?since=<time>",
          description: t(locale, "docs.mac.api.endpoint.recorderRecordings"),
          since18: true,
        },
      ],
    },
  ];

  return (
    <>
      <DocsCallout label={t(locale, "docs.callout.note")}>
        <p>
          <strong>{t(locale, "docs.mac.api.noteLabel")}</strong>{" "}
          {t(locale, "docs.mac.api.noteText")}
        </p>
      </DocsCallout>

      <DocsSection
        id="setup-authentication"
        title={t(locale, "docs.mac.api.setup.title")}
      >
        <p>{t(locale, "docs.mac.api.setup.description")}</p>
        <p>{t(locale, "docs.mac.api.auth.description")}</p>
        <Shell
          code={`DISCOVERY="$HOME/Library/Application Support/TypeWhisper/api-discovery.json"
export TYPEWHISPER_API_PORT="$(jq -r '.port' "$DISCOVERY")"
export TYPEWHISPER_API_TOKEN="$(jq -r '.token' "$DISCOVERY")"

curl "http://127.0.0.1:$TYPEWHISPER_API_PORT/v1/models" \\
  -H "Authorization: Bearer $TYPEWHISPER_API_TOKEN"`}
        />
        <p>
          {t(locale, "docs.mac.api.auth.statusPublic")}{" "}
          <InlineCode>X-TypeWhisper-API-Token</InlineCode>{" "}
          {t(locale, "docs.mac.api.auth.alternativeHeader")}
        </p>
        <p>{t(locale, "docs.mac.api.auth.discovery")}</p>
        <p>{t(locale, "docs.mac.api.auth.browserRequests")}</p>
      </DocsSection>

      <DocsSection
        id="endpoint-reference"
        title={t(locale, "docs.mac.api.overview.title")}
      >
        <p>{t(locale, "docs.mac.api.overview.description")}</p>
        {endpointGroups.map((group) => (
          <div key={group.id}>
            <DocsSubheading id={group.id}>{group.title}</DocsSubheading>
            <DocsTable
              kind="endpoints"
              label={group.title}
              head={[
                t(locale, "docs.mac.api.overview.method"),
                t(locale, "docs.mac.api.overview.endpoint"),
                t(locale, "docs.mac.api.overview.purpose"),
              ]}
              rows={group.endpoints.map((endpoint) => [
                <span className="docs-table__method">{endpoint.method}</span>,
                <code>
                  {endpoint.path.split("?")[0]}
                  {endpoint.path.includes("?") && (
                    <>
                      <wbr />?{endpoint.path.split("?")[1]}
                    </>
                  )}
                </code>,
                endpoint.since18
                  ? `${endpoint.description} ${availableFrom18}`
                  : endpoint.description,
              ])}
            />
          </div>
        ))}
      </DocsSection>

      <DocsSection
        id="status"
        title={t(locale, "docs.mac.api.checkStatus.title")}
      >
        <Shell code={`curl http://localhost:8978/v1/status`} />
        <Json
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
        <p>{t(locale, "docs.mac.api.checkStatus.description")}</p>
      </DocsSection>

      <DocsSection
        id="transcription"
        title={t(locale, "docs.mac.api.transcribe.title")}
      >
        <Shell
          code={`curl -X POST http://localhost:8978/v1/transcribe \\
  -F "file=@recording.wav" \\
  -F "language_hint=de" \\
  -F "language_hint=en" \\
  -F "response_format=verbose_json"`}
        />
        <Json
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
        <DocsCallout label={t(locale, "docs.callout.note")}>
          <p>
            <strong>
              {t(locale, "docs.mac.api.transcribe.uploadLimit.title")}
            </strong>{" "}
            {t(locale, "docs.mac.api.transcribe.uploadLimit.description")}
          </p>
        </DocsCallout>
        <DocsSubheading id="transcription-parameters">
          {t(locale, "docs.mac.api.transcribe.optionalParams")}
        </DocsSubheading>
        <ul>
          <li>
            <InlineCode>language</InlineCode> –{" "}
            {t(locale, "docs.mac.api.transcribe.params.language")}
          </li>
          <li>
            <InlineCode>language_hint</InlineCode> –{" "}
            {t(locale, "docs.mac.api.transcribe.params.languageHint")}
          </li>
          <li>
            <InlineCode>task</InlineCode> –{" "}
            {t(locale, "docs.mac.api.transcribe.params.task")}
          </li>
          <li>
            <InlineCode>target_language</InlineCode> –{" "}
            {t(locale, "docs.mac.api.transcribe.params.targetLanguage")}
          </li>
          <li>
            <InlineCode>response_format</InlineCode> –{" "}
            {t(locale, "docs.mac.api.transcribe.params.responseFormat")}
          </li>
          <li>
            <InlineCode>prompt</InlineCode> –{" "}
            {t(locale, "docs.mac.api.transcribe.params.prompt")}
          </li>
          <li>
            <InlineCode>engine</InlineCode> / <InlineCode>model</InlineCode> –{" "}
            {t(locale, "docs.mac.api.transcribe.params.engineModel")}
          </li>
          <li>
            <InlineCode>normalize_numbers</InlineCode> –{" "}
            {t(locale, "docs.mac.api.transcribe.params.normalizeNumbers")}
          </li>
          <li>
            <InlineCode>apply_corrections</InlineCode> –{" "}
            {t(locale, "docs.mac.api.transcribe.params.applyCorrections")}
          </li>
          <li>
            <InlineCode>?await_download=1</InlineCode> –{" "}
            {t(locale, "docs.mac.api.transcribe.params.awaitDownload")}
          </li>
        </ul>
        <p>{t(locale, "docs.mac.api.transcribe.rawBody")}</p>
        <p>
          <InlineCode>POST /v1/transcribe/local-file</InlineCode>{" "}
          {t(locale, "docs.mac.api.transcribe.localFile")}
        </p>
      </DocsSection>

      <DocsSection
        id="models"
        title={t(locale, "docs.mac.api.listModels.title")}
      >
        <Shell code={`curl http://localhost:8978/v1/models`} />
        <Json
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
        <p>{t(locale, "docs.mac.api.listModels.description")}</p>
      </DocsSection>

      <DocsSection
        id="model-management"
        title={t(locale, "docs.mac.api.manageModels.title")}
      >
        <p>{withCode(t(locale, "docs.mac.api.manageModels.description"))}</p>
        <Shell
          code={`curl -X POST http://localhost:8978/v1/models/load \\
  -H "Content-Type: application/json" \\
  -d '{"engine":"parakeet","model":"parakeet-tdt-0.6b-v3"}'

curl -X POST http://localhost:8978/v1/models/unload \\
  -H "Content-Type: application/json" \\
  -d '{"engine":"parakeet"}'

curl -X DELETE "http://localhost:8978/v1/models?engine=whisper&model=openai_whisper-large-v3_turbo"`}
        />
        <Json
          code={`{
  "engine": "parakeet",
  "model": "parakeet-tdt-0.6b-v3",
  "status": "ready"
}`}
        />
        <p>{withCode(t(locale, "docs.mac.api.manageModels.responses"))}</p>
        <p>{withCode(t(locale, "docs.mac.api.manageModels.delete"))}</p>
        <p>{withCode(t(locale, "docs.mac.api.manageModels.errors"))}</p>
        <p>{withCode(t(locale, "docs.mac.api.manageModels.managed"))}</p>
      </DocsSection>

      <DocsSection id="history" title={t(locale, "docs.mac.api.history.title")}>
        <Shell
          code={`curl "http://localhost:8978/v1/history?q=meeting&limit=10&offset=0"
curl -X DELETE "http://localhost:8978/v1/history?id=<uuid>"`}
        />
        <p>{t(locale, "docs.mac.api.history.description")}</p>
      </DocsSection>

      <DocsSection
        id="dictionary"
        title={t(locale, "docs.mac.api.dictionary.title")}
      >
        <p>{t(locale, "docs.mac.api.dictionary.description")}</p>
        <Shell
          code={`curl http://localhost:8978/v1/dictionary/terms

curl -X PUT http://localhost:8978/v1/dictionary/terms \\
  -H "Content-Type: application/json" \\
  -d '{"term_entries":[{"term":"TypeWhisper","ctc_min_similarity":0.65}],"replace":false}'

curl -X DELETE http://localhost:8978/v1/dictionary/terms \\
  -H "Content-Type: application/json" \\
  -d '{"term":"TypeWhisper"}'`}
        />
        <p>{t(locale, "docs.mac.api.dictionary.termsNote")}</p>
        <Shell
          code={`curl http://localhost:8978/v1/dictionary/corrections

curl -X PUT http://localhost:8978/v1/dictionary/corrections \\
  -H "Content-Type: application/json" \\
  -d '{"original":"teh","replacement":"the","caseSensitive":false}'

curl -X DELETE http://localhost:8978/v1/dictionary/corrections \\
  -H "Content-Type: application/json" \\
  -d '{"original":"teh"}'`}
        />
      </DocsSection>

      <DocsSection
        id="settings-backup"
        title={t(locale, "docs.mac.api.settings.title")}
      >
        <p>{t(locale, "docs.mac.api.settings.description")}</p>
        <Shell
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
) && \\
curl --fail --silent --show-error -X POST \\
  "http://localhost:$TYPEWHISPER_API_PORT/v1/settings/import" \\
  -H "Authorization: Bearer $TYPEWHISPER_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  --data-binary @typewhisper-settings.json`}
        />
        <p>{t(locale, "docs.mac.api.settings.importBehavior")}</p>
        <DocsSubheading id="settings-import-response">
          {t(locale, "docs.mac.api.settings.importResponse")}
        </DocsSubheading>
        <Json
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
        <DocsSubheading id="settings-cli">
          {t(locale, "docs.mac.api.settings.cliTitle")}
        </DocsSubheading>
        <p>{t(locale, "docs.mac.api.settings.cliDescription")}</p>
        <Shell
          code={`mkdir -p ~/.config/typewhisper
typewhisper export ~/.config/typewhisper/settings.json
typewhisper import ~/.config/typewhisper/settings.json
typewhisper import ~/.config/typewhisper/settings.json --json`}
        />
        <p>{t(locale, "docs.mac.api.settings.dotfilesNote")}</p>
      </DocsSection>

      <DocsSection
        id="audio-settings"
        title={t(locale, "docs.mac.api.audio.title")}
      >
        <p>{availableFrom18}</p>
        <p>{withCode(t(locale, "docs.mac.api.audio.description"))}</p>
        <p>{t(locale, "docs.mac.api.audio.useCase")}</p>
        <Shell
          code={`curl http://localhost:8978/v1/settings/audio

curl -X PATCH http://localhost:8978/v1/settings/audio \\
  -H "Content-Type: application/json" \\
  -d '{
    "input_priority": [{ "id": "BlackHole2ch_UID", "name": "BlackHole 2ch" }],
    "audio_ducking_enabled": false
  }'

curl -X PATCH http://localhost:8978/v1/settings/audio \\
  -H "Content-Type: application/json" \\
  -d '{"input_priority":[]}'`}
        />
        <Json
          code={`{
  "input_devices": [
    {
      "id": "BuiltInMicrophoneDevice",
      "name": "MacBook Pro Microphone",
      "is_system_default": true
    },
    {
      "id": "BlackHole2ch_UID",
      "name": "BlackHole 2ch",
      "is_system_default": false
    }
  ],
  "input_priority": [
    {
      "id": "AppleUSBAudioEngine:HyperX:QuadCast 2",
      "name": "HyperX QuadCast 2"
    }
  ],
  "active_input": {
    "id": "BuiltInMicrophoneDevice",
    "name": "MacBook Pro Microphone"
  },
  "audio_ducking_enabled": true,
  "audio_ducking_level": 0.2,
  "pause_media_during_recording": false,
  "sound_feedback_enabled": true
}`}
        />
        <DocsSubheading id="audio-settings-fields">
          {t(locale, "docs.mac.api.audio.fieldsTitle")}
        </DocsSubheading>
        <DocsTable
          label={t(locale, "docs.mac.api.audio.fieldsTitle")}
          head={[
            t(locale, "docs.mac.api.audio.fieldHeader"),
            t(locale, "docs.mac.api.audio.descriptionHeader"),
          ]}
          rows={audioFields.map(([field, key]) => [
            // Long field names break after an underscore, not inside a word.
            <code>
              {field.split("_").map((part, index) => (
                <span key={index}>
                  {index > 0 && (
                    <>
                      _<wbr />
                    </>
                  )}
                  {part}
                </span>
              ))}
            </code>,
            withCode(t(locale, key)),
          ])}
        />
        <p>{withCode(t(locale, "docs.mac.api.audio.patch"))}</p>
        <p>{withCode(t(locale, "docs.mac.api.audio.errors"))}</p>
        <DocsSubheading id="audio-settings-restore">
          {t(locale, "docs.mac.api.audio.restoreTitle")}
        </DocsSubheading>
        <p>{withCode(t(locale, "docs.mac.api.audio.restore"))}</p>
        <Shell
          code={`DISCOVERY="$HOME/Library/Application Support/TypeWhisper/api-discovery.json"
TYPEWHISPER_API_PORT="$(jq -r '.port' "$DISCOVERY")"
TYPEWHISPER_API_TOKEN="$(jq -r '.token' "$DISCOVERY")"
AUDIO_URL="http://localhost:$TYPEWHISPER_API_PORT/v1/settings/audio"

saved="$(curl --fail --silent --show-error "$AUDIO_URL" \\
  -H "Authorization: Bearer $TYPEWHISPER_API_TOKEN")"

curl --fail --silent --show-error -X PATCH "$AUDIO_URL" \\
  -H "Authorization: Bearer $TYPEWHISPER_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "input_priority": [{ "id": "BlackHole2ch_UID", "name": "BlackHole 2ch" }],
    "audio_ducking_enabled": false
  }'

# ${t(locale, "docs.mac.api.audio.restoreComment")}

jq 'del(.input_devices, .active_input)' <<<"$saved" | \\
  curl --fail --silent --show-error -X PATCH "$AUDIO_URL" \\
    -H "Authorization: Bearer $TYPEWHISPER_API_TOKEN" \\
    -H "Content-Type: application/json" \\
    --data-binary @-`}
        />
        <p>
          {t(locale, "docs.mac.api.audio.cliBefore")}{" "}
          <a href={localePath(locale, "/docs/mac/cli#command-audio")}>
            {t(locale, "docs.mac.api.audio.cliLink")}
          </a>{" "}
          {withCode(t(locale, "docs.mac.api.audio.cliAfter"))}
        </p>
      </DocsSection>

      <DocsSection id="rules" title={t(locale, "docs.mac.api.rules.title")}>
        <Shell
          code={`curl http://localhost:8978/v1/rules
curl -X PUT "http://localhost:8978/v1/rules/toggle?id=<uuid>"`}
        />
        <p>{t(locale, "docs.mac.api.rules.description")}</p>
        <p>{t(locale, "docs.mac.api.rules.legacyAlias")}</p>
      </DocsSection>

      <DocsSection
        id="dictation"
        title={t(locale, "docs.mac.api.dictation.title")}
      >
        <p>{t(locale, "docs.mac.api.dictation.description")}</p>
        <Shell
          code={`curl -X POST http://localhost:8978/v1/dictation/start \\
  -H "Content-Type: application/json" \\
  -d '{"workflow_id":"<uuid>"}'

curl -X POST http://localhost:8978/v1/dictation/stop
curl http://localhost:8978/v1/dictation/status
curl "http://localhost:8978/v1/dictation/transcription?id=<uuid>"`}
        />
        <p>{t(locale, "docs.mac.api.dictation.workflow")}</p>
        <p>{t(locale, "docs.mac.api.dictation.polling")}</p>
      </DocsSection>

      <DocsSection
        id="recorder"
        title={t(locale, "docs.mac.api.recorder.title")}
      >
        <p>{t(locale, "docs.mac.api.recorder.description")}</p>
        <Shell
          code={`curl -X POST "http://localhost:8978/v1/recorder/start?mic=true&system_audio=true"
curl -X POST http://localhost:8978/v1/recorder/stop
curl http://localhost:8978/v1/recorder/status
curl "http://localhost:8978/v1/recorder/session?id=<uuid>"`}
        />
        <p>{t(locale, "docs.mac.api.recorder.parameters")}</p>
        <Json
          code={`{
  "id": "8F8C1F45-6D03-44D2-A38C-0C4DE4F7E5F7",
  "status": "completed",
  "text": "Meeting notes from the recording.",
  "output_file": "/Users/alex/Documents/TypeWhisper Recordings/Recording.m4a"
}`}
        />
        <p>{t(locale, "docs.mac.api.recorder.states")}</p>
      </DocsSection>

      <DocsSection
        id="recorder-recordings"
        title={t(locale, "docs.mac.api.recordings.title")}
      >
        <p>{availableFrom18}</p>
        <p>{withCode(t(locale, "docs.mac.api.recordings.description"))}</p>
        <Shell
          code={`curl "http://localhost:8978/v1/recorder/recordings?since=1791100000.123456"
curl "http://localhost:8978/v1/recorder/recordings?since=2026-10-04T07:46:40Z"`}
        />
        <Json
          code={`{
  "recordings": [
    {
      "source": "recorder",
      "recording_id": "8F8C1F45-6D03-44D2-A38C-0C4DE4F7E5F7",
      "completion_id": "59CBC40C-274A-47A9-804C-8774AB504401",
      "completed_at": 1791100000.123456,
      "text": "Meeting notes from the recording.",
      "audio_file": "/Users/alex/Documents/TypeWhisper Recordings/Weekly Sync.m4a",
      "transcript_file": "/Users/alex/Documents/TypeWhisper Recordings/Weekly Sync.txt",
      "markdown_file": "/Users/alex/Documents/TypeWhisper Recordings/Weekly Sync.transcript.md"
    }
  ]
}`}
        />
        <DocsSubheading id="recorder-recordings-fields">
          {t(locale, "docs.mac.api.recordings.fieldsTitle")}
        </DocsSubheading>
        <ul>
          {recordingFields.map(([fields, key]) => (
            <li key={key}>
              {fields.map((field, index) => (
                <span key={field}>
                  {index > 0 && ", "}
                  <InlineCode>{field}</InlineCode>
                </span>
              ))}{" "}
              – {withCode(t(locale, key))}
            </li>
          ))}
        </ul>
        <p>{withCode(t(locale, "docs.mac.api.recordings.since"))}</p>
        <p>{withCode(t(locale, "docs.mac.api.recordings.cursor"))}</p>
        <p>{withCode(t(locale, "docs.mac.api.recordings.revisions"))}</p>
        <p>{withCode(t(locale, "docs.mac.api.recordings.receipts"))}</p>
        <DocsSubheading id="recorder-automation">
          {t(locale, "docs.mac.api.recordings.automationTitle")}
        </DocsSubheading>
        <p>{t(locale, "docs.mac.api.recordings.automationIntro")}</p>
        <ul>
          <li>
            <a href={localePath(locale, "/addons/webhook/macos")}>Webhook</a> –{" "}
            {t(locale, "docs.mac.api.recordings.webhook")}
          </li>
          <li>
            <a href={localePath(locale, "/addons/script-runner/macos")}>
              Script Runner
            </a>{" "}
            – {t(locale, "docs.mac.api.recordings.script")}
          </li>
          <li>
            <a href={localePath(locale, "/addons/develop#eventbus")}>
              <code>recorderTranscriptReady</code>
            </a>{" "}
            – {withCode(t(locale, "docs.mac.api.recordings.event"))}
          </li>
        </ul>
        <p>{withCode(t(locale, "docs.mac.api.recordings.bestEffort"))}</p>
      </DocsSection>

      <DocsSection id="errors" title={t(locale, "docs.mac.api.errors.title")}>
        <p>{t(locale, "docs.mac.api.errors.description")}</p>
        <Json
          code={`{
  "error": {
    "code": "unauthorized",
    "message": "Missing or invalid API token"
  }
}`}
        />
        <DocsSubheading id="error-codes">
          {t(locale, "docs.mac.api.errors.commonCodes")}
        </DocsSubheading>
        <ul>
          <li>
            <InlineCode>400</InlineCode> –{" "}
            {t(locale, "docs.mac.api.errors.400")}
          </li>
          <li>
            <InlineCode>401</InlineCode> –{" "}
            {t(locale, "docs.mac.api.errors.401")}
          </li>
          <li>
            <InlineCode>403</InlineCode> –{" "}
            {t(locale, "docs.mac.api.errors.403")}
          </li>
          <li>
            <InlineCode>404</InlineCode> –{" "}
            {t(locale, "docs.mac.api.errors.404")}
          </li>
          <li>
            <InlineCode>409</InlineCode> –{" "}
            {t(locale, "docs.mac.api.errors.409")}
          </li>
          <li>
            <InlineCode>413</InlineCode> –{" "}
            {t(locale, "docs.mac.api.errors.413")}
          </li>
          <li>
            <InlineCode>501</InlineCode> –{" "}
            {t(locale, "docs.mac.api.errors.501")}
          </li>
          <li>
            <InlineCode>503</InlineCode> –{" "}
            {t(locale, "docs.mac.api.errors.503")}
          </li>
          <li>
            <InlineCode>500</InlineCode> –{" "}
            {t(locale, "docs.mac.api.errors.500")}
          </li>
        </ul>
      </DocsSection>
    </>
  );
}

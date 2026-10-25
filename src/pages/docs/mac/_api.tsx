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

/** An error of a route: HTTP status, error codes, and what they mean. */
type RouteError = [status: number, codes: string[], key: string];

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

/** Speaker fields of a `GET /v1/history` entry, in response order. */
const historySpeakerFields: Array<[field: string, key: string]> = [
  ["recording_id", "docs.mac.api.history.speakers.fields.recordingId"],
  ["speaker_state", "docs.mac.api.history.speakers.fields.speakerState"],
  [
    "transcript_revision",
    "docs.mac.api.history.speakers.fields.transcriptRevision",
  ],
  [
    "transcript_version",
    "docs.mac.api.history.speakers.fields.transcriptVersion",
  ],
  ["speakers", "docs.mac.api.history.speakers.fields.speakers"],
  ["speaker_segments", "docs.mac.api.history.speakers.fields.speakerSegments"],
];

/** Values of `voice_state` for a speaker of a History entry. */
const voiceStates: Array<[value: string, key: string]> = [
  ["none", "docs.mac.api.history.speakers.voiceStates.none"],
  ["canEnroll", "docs.mac.api.history.speakers.voiceStates.canEnroll"],
  ["suggestion", "docs.mac.api.history.speakers.voiceStates.suggestion"],
  ["linked", "docs.mac.api.history.speakers.voiceStates.linked"],
  ["outdated", "docs.mac.api.history.speakers.voiceStates.outdated"],
];

/** Body fields of the `/v1/history/speakers/*` routes. */
const speakerRequestFields: Array<[fields: string[], key: string]> = [
  [["history_id"], "docs.mac.api.speakers.request.historyId"],
  [
    ["transcript_revision", "transcript_version"],
    "docs.mac.api.speakers.request.transcript",
  ],
  [["speaker_id"], "docs.mac.api.speakers.request.speakerId"],
  [["name"], "docs.mac.api.speakers.request.name"],
  [["profile_id"], "docs.mac.api.speakers.request.profileId"],
  [["create_profile"], "docs.mac.api.speakers.request.createProfile"],
];

const speakerErrors: RouteError[] = [
  [400, ["bad_request"], "docs.mac.api.speakers.errors.badRequest"],
  [400, ["invalid_name"], "docs.mac.api.speakers.errors.invalidName"],
  [401, ["unauthorized"], "docs.mac.api.speakers.errors.unauthorized"],
  [403, ["premium_required"], "docs.mac.api.speakers.errors.premium"],
  [
    404,
    ["history_not_found", "speaker_not_found"],
    "docs.mac.api.speakers.errors.notFound",
  ],
  [409, ["speakers_not_ready"], "docs.mac.api.speakers.errors.notReady"],
  [409, ["stale_transcript"], "docs.mac.api.speakers.errors.stale"],
  [409, ["profile_name_exists"], "docs.mac.api.speakers.errors.nameExists"],
  [
    409,
    ["profile_name_conflict"],
    "docs.mac.api.speakers.errors.nameConflict",
  ],
  [
    409,
    ["confirmation_required", "suggestion_changed"],
    "docs.mac.api.speakers.errors.suggestion",
  ],
  [409, ["sample_already_used"], "docs.mac.api.speakers.errors.sampleUsed"],
  [409, ["stale_voice_samples"], "docs.mac.api.speakers.errors.staleVoice"],
  [
    409,
    ["profile_unavailable"],
    "docs.mac.api.speakers.errors.profileUnavailable",
  ],
  [
    409,
    ["profile_model_changed"],
    "docs.mac.api.speakers.errors.modelChanged",
  ],
  [413, ["payload_too_large"], "docs.mac.api.speakers.errors.tooLarge"],
  [422, ["name_required"], "docs.mac.api.speakers.errors.nameRequired"],
  [
    422,
    ["voice_unavailable", "invalid_embedding"],
    "docs.mac.api.speakers.errors.voiceUnavailable",
  ],
  [
    500,
    ["history_unavailable", "speaker_save_failed"],
    "docs.mac.api.speakers.errors.saveFailed",
  ],
];

/** Body fields of `PUT /v1/browser/context`. */
const browserFields: Array<[field: string, key: string]> = [
  ["client_id", "docs.mac.api.browser.fields.clientId"],
  ["focused", "docs.mac.api.browser.fields.focused"],
  ["url", "docs.mac.api.browser.fields.url"],
  ["title", "docs.mac.api.browser.fields.title"],
];

const textErrors: RouteError[] = [
  [400, ["bad_request"], "docs.mac.api.text.errors.badRequest"],
  [
    403,
    ["writing_not_allowed"],
    "docs.mac.api.text.errors.writingNotAllowed",
  ],
  [403, ["forbidden"], "docs.mac.api.text.errors.forbidden"],
  [404, ["workflow_not_found"], "docs.mac.api.text.errors.notFound"],
  [
    409,
    ["workflow_disabled", "workflow_not_runnable"],
    "docs.mac.api.text.errors.workflow",
  ],
  [413, ["payload_too_large"], "docs.mac.api.text.errors.tooLarge"],
  [413, ["context_length_exceeded"], "docs.mac.api.text.errors.context"],
  [429, ["busy", "rate_limited"], "docs.mac.api.text.errors.busy"],
  [502, ["llm_failed"], "docs.mac.api.text.errors.llmFailed"],
  [503, ["llm_not_configured"], "docs.mac.api.text.errors.notConfigured"],
  [503, ["cancelled"], "docs.mac.api.text.errors.cancelled"],
  [504, ["timeout"], "docs.mac.api.text.errors.timeout"],
];

function InlineCode({ children }: { children: ReactNode }) {
  return <code>{children}</code>;
}

/** A field name that breaks after an underscore, not inside a word. */
function FieldName({ name }: { name: string }) {
  return (
    <code>
      {name.split("_").map((part, index) => (
        <span key={index}>
          {index > 0 && (
            <>
              _<wbr />
            </>
          )}
          {part}
        </span>
      ))}
    </code>
  );
}

/** Several field names, separated by commas. */
function FieldNames({ names }: { names: string[] }) {
  return (
    <>
      {names.map((name, index) => (
        <span key={name}>
          {index > 0 && ", "}
          <FieldName name={name} />
        </span>
      ))}
    </>
  );
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

  /** Field and description, one row per field. */
  const FieldTable = ({
    label,
    rows,
  }: {
    label: string;
    rows: Array<[fields: string[], key: string]>;
  }) => (
    <DocsTable
      label={label}
      head={[
        t(locale, "docs.mac.api.table.field"),
        t(locale, "docs.mac.api.table.description"),
      ]}
      rows={rows.map(([fields, key]) => [
        <FieldNames names={fields} />,
        withCode(t(locale, key)),
      ])}
    />
  );

  /** HTTP status and error codes of a route, with their meaning. */
  const ErrorTable = ({
    label,
    errors,
  }: {
    label: string;
    errors: RouteError[];
  }) => (
    <DocsTable
      label={label}
      head={[
        t(locale, "docs.mac.api.table.status"),
        t(locale, "docs.mac.api.table.meaning"),
      ]}
      rows={errors.map(([status, codes, key]) => [
        <>
          <span className="docs-table__method">{status}</span>{" "}
          <FieldNames names={codes} />
        </>,
        withCode(t(locale, key)),
      ])}
    />
  );

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
          method: "PUT",
          path: "/v1/history/speakers/name",
          description: t(locale, "docs.mac.api.endpoint.historySpeakersName"),
          since18: true,
        },
        {
          method: "POST",
          path: "/v1/history/speakers/enroll",
          description: t(
            locale,
            "docs.mac.api.endpoint.historySpeakersEnroll",
          ),
          since18: true,
        },
        {
          method: "POST",
          path: "/v1/history/speakers/confirm",
          description: t(
            locale,
            "docs.mac.api.endpoint.historySpeakersConfirm",
          ),
          since18: true,
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
          method: "PUT",
          path: "/v1/browser/context",
          description: t(locale, "docs.mac.api.endpoint.browserContext"),
          since18: true,
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
    {
      id: "endpoints-text",
      title: t(locale, "docs.mac.api.overview.text"),
      endpoints: [
        {
          method: "GET",
          path: "/v1/llm/models",
          description: t(locale, "docs.mac.api.endpoint.llmModels"),
          since18: true,
        },
        {
          method: "POST",
          path: "/v1/llm/process",
          description: t(locale, "docs.mac.api.endpoint.llmProcess"),
          since18: true,
        },
        {
          method: "GET",
          path: "/v1/workflows",
          description: t(locale, "docs.mac.api.endpoint.workflows"),
          since18: true,
        },
        {
          method: "POST",
          path: "/v1/workflows/run",
          description: t(locale, "docs.mac.api.endpoint.workflowsRun"),
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

(
  AUTH_HEADER="$(mktemp)" || exit
  trap 'rm -f "$AUTH_HEADER"' EXIT
  jq -r '"Authorization: Bearer " + .token' "$DISCOVERY" > "$AUTH_HEADER"
  curl "http://127.0.0.1:$TYPEWHISPER_API_PORT/v1/models" -H @"$AUTH_HEADER"
)`}
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
  "api_version": "1.2",
  "supports_workflow_dictation": true,
  "supports_streaming": true,
  "supports_translation": true,
  "supports_browser_context": true,
  "capabilities": ["transcribe", "llm", "workflows"],
  "remote_writing_allowed": false
}`}
        />
        <p>{t(locale, "docs.mac.api.checkStatus.description")}</p>
        <p>{withCode(t(locale, "docs.mac.api.checkStatus.since18"))}</p>
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
            {withCode(
              t(locale, "docs.mac.api.transcribe.params.applyCorrections"),
            )}
          </li>
          <li>
            <InlineCode>detect_speakers</InlineCode> – {availableFrom18}{" "}
            {withCode(
              t(locale, "docs.mac.api.transcribe.params.detectSpeakers"),
            )}
          </li>
          <li>
            <InlineCode>speaker_count</InlineCode> – {availableFrom18}{" "}
            {withCode(t(locale, "docs.mac.api.transcribe.params.speakerCount"))}
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
        <DocsSubheading id="transcription-speakers">
          {t(locale, "docs.mac.api.transcribe.speakers.title")}
        </DocsSubheading>
        <p>{availableFrom18}</p>
        <p>
          {withCode(t(locale, "docs.mac.api.transcribe.speakers.description"))}
        </p>
        <Shell
          code={`curl -X POST http://localhost:8978/v1/transcribe \\
  -F "file=@interview.m4a" \\
  -F "response_format=verbose_json" \\
  -F "detect_speakers=true" \\
  -F "speaker_count=2"`}
        />
        <Json
          code={`{
  "text": "How did the launch go? Better than we expected.",
  "language": "en",
  "duration": 5.8,
  "processing_time": 2.1,
  "engine": "parakeet",
  "model": "parakeet-tdt-0.6b-v3",
  "segments": [
    {
      "start": 0,
      "end": 1.9,
      "text": "How did the launch go?",
      "speaker": "Speaker 1",
      "speaker_confidence": 1
    },
    {
      "start": 2.3,
      "end": 5.8,
      "text": "Better than we expected.",
      "speaker": "Speaker 2",
      "speaker_confidence": 1
    }
  ]
}`}
        />
        <p>{withCode(t(locale, "docs.mac.api.transcribe.speakers.errors"))}</p>
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
      "engine_name": "WhisperKit",
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
        <p>{withCode(t(locale, "docs.mac.api.listModels.engineName"))}</p>
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
        <DocsSubheading id="history-speakers">
          {t(locale, "docs.mac.api.history.speakers.title")}
        </DocsSubheading>
        <p>{availableFrom18}</p>
        <p>{withCode(t(locale, "docs.mac.api.history.speakers.intro"))}</p>
        <Shell
          code={`curl "http://localhost:8978/v1/history?limit=10&include=speaker_segments"`}
        />
        <Json
          code={`{
  "entries": [
    {
      "id": "0B7A3C1E-2F4D-4E8A-9C61-3D5E7F9A1B2C",
      "text": "Let's start with the roadmap. Sounds good to me.",
      "raw_text": "Let's start with the roadmap. Sounds good to me.",
      "timestamp": "2026-10-14T09:30:12Z",
      "app_name": "Weekly Sync",
      "duration": 6.1,
      "language": "en",
      "engine": "parakeet",
      "model": "parakeet-tdt-0.6b-v3",
      "words_count": 9,
      "recording_id": "8F8C1F45-6D03-44D2-A38C-0C4DE4F7E5F7",
      "speaker_state": "ready",
      "transcript_revision": "6E2F8A4C-1B3D-4C5E-8F7A-9B0C1D2E3F4A",
      "transcript_version": "f74d369e3227eb16d6374c3f0f6fbccdfec89351fc3ef4023182bb86ec8ff7d6",
      "speakers": [
        {
          "id": "S1",
          "name": "Lev",
          "profile_id": "D3B07384-D113-4EC6-A3B0-1F2E3D4C5B6A",
          "voice_state": "linked"
        },
        {
          "id": "S2",
          "name": "Speaker 2",
          "suggested_name": "Mira",
          "profile_id": "A1F2C3D4-5E6F-4A7B-8C9D-0E1F2A3B4C5D",
          "voice_state": "suggestion"
        }
      ],
      "speaker_segments": [
        {
          "start": 0,
          "end": 2.4,
          "speaker": "S1",
          "text": "Let's start with the roadmap."
        },
        {
          "start": 2.9,
          "end": 6.1,
          "speaker": "S2",
          "text": "Sounds good to me."
        }
      ]
    }
  ],
  "total": 1,
  "limit": 10,
  "offset": 0
}`}
        />
        <FieldTable
          label={t(locale, "docs.mac.api.history.speakers.title")}
          rows={historySpeakerFields.map(([field, key]) => [[field], key])}
        />
        <p>{withCode(t(locale, "docs.mac.api.history.speakers.voiceStates"))}</p>
        <DocsTable
          label="voice_state"
          head={[
            t(locale, "docs.mac.api.table.value"),
            t(locale, "docs.mac.api.table.meaning"),
          ]}
          rows={voiceStates.map(([value, key]) => [
            <code>{value}</code>,
            withCode(t(locale, key)),
          ])}
        />
      </DocsSection>

      <DocsSection
        id="speaker-profiles"
        title={t(locale, "docs.mac.api.speakers.title")}
      >
        <p>{availableFrom18}</p>
        <p>{t(locale, "docs.mac.api.speakers.description")}</p>
        <p>{t(locale, "docs.mac.api.speakers.consent")}</p>
        <ol>
          {[1, 2, 3, 4].map((step) => (
            <li key={step}>
              {withCode(t(locale, `docs.mac.api.speakers.step${step}`))}
            </li>
          ))}
        </ol>
        <Shell
          code={`DISCOVERY="$HOME/Library/Application Support/TypeWhisper/api-discovery.json"
SPEAKERS_URL="http://127.0.0.1:$(jq -r '.port' "$DISCOVERY")/v1/history/speakers"

(
  AUTH_HEADER="$(mktemp)" || exit
  trap 'rm -f "$AUTH_HEADER"' EXIT
  jq -r '"Authorization: Bearer " + .token' "$DISCOVERY" > "$AUTH_HEADER"

  curl -X PUT "$SPEAKERS_URL/name" \\
    -H @"$AUTH_HEADER" \\
    -H "Content-Type: application/json" \\
    -d '{"history_id":"<history-uuid>","transcript_revision":"<revision-uuid>","transcript_version":"<version>","speaker_id":"S1","name":"Lev"}'

  curl -X POST "$SPEAKERS_URL/enroll" \\
    -H @"$AUTH_HEADER" \\
    -H "Content-Type: application/json" \\
    -d '{"history_id":"<history-uuid>","transcript_revision":"<revision-uuid>","transcript_version":"<version>","speaker_id":"S1"}'

  curl -X POST "$SPEAKERS_URL/confirm" \\
    -H @"$AUTH_HEADER" \\
    -H "Content-Type: application/json" \\
    -d '{"history_id":"<history-uuid>","transcript_revision":"<revision-uuid>","transcript_version":"<version>","speaker_id":"S2","profile_id":"<profile-uuid>"}'
)`}
        />
        <DocsSubheading id="speaker-profiles-fields">
          {t(locale, "docs.mac.api.requestFields")}
        </DocsSubheading>
        <FieldTable
          label={t(locale, "docs.mac.api.requestFields")}
          rows={speakerRequestFields}
        />
        <p>{t(locale, "docs.mac.api.speakers.body")}</p>
        <Json
          code={`{
  "history_id": "0B7A3C1E-2F4D-4E8A-9C61-3D5E7F9A1B2C",
  "transcript_revision": "6E2F8A4C-1B3D-4C5E-8F7A-9B0C1D2E3F4A",
  "transcript_version": "f74d369e3227eb16d6374c3f0f6fbccdfec89351fc3ef4023182bb86ec8ff7d6",
  "speaker_id": "S1",
  "name": "Lev",
  "profile_id": "D3B07384-D113-4EC6-A3B0-1F2E3D4C5B6A",
  "voice_state": "linked",
  "already_learned": false
}`}
        />
        <p>{withCode(t(locale, "docs.mac.api.speakers.response"))}</p>
        <DocsSubheading id="speaker-profiles-errors">
          {t(locale, "docs.mac.api.errorsTitle")}
        </DocsSubheading>
        <ErrorTable
          label={t(locale, "docs.mac.api.speakers.title")}
          errors={speakerErrors}
        />
        <p>{withCode(t(locale, "docs.mac.api.speakers.notes"))}</p>
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
        <p>{withCode(t(locale, "docs.mac.api.dictionary.regex"))}</p>
        <Shell
          code={`curl -X PUT http://localhost:8978/v1/dictionary/corrections \\
  -H "Content-Type: application/json" \\
  -d '{"original":"type ?whisper","replacement":"TypeWhisper","isRegex":true}'`}
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

(
  AUTH_HEADER="$(mktemp)" || exit
  settings_backup_tmp="$(mktemp ./typewhisper-settings.json.tmp.XXXXXX)" || exit
  trap 'rm -f "$AUTH_HEADER" "$settings_backup_tmp"' EXIT
  jq -r '"Authorization: Bearer " + .token' "$DISCOVERY" > "$AUTH_HEADER"

  curl --fail --silent --show-error \\
    "http://localhost:$TYPEWHISPER_API_PORT/v1/settings/export" \\
    -H @"$AUTH_HEADER" \\
    --output "$settings_backup_tmp" &&
    mv "$settings_backup_tmp" typewhisper-settings.json &&
    curl --fail --silent --show-error -X POST \\
      "http://localhost:$TYPEWHISPER_API_PORT/v1/settings/import" \\
      -H @"$AUTH_HEADER" \\
      -H "Content-Type: application/json" \\
      --data-binary @typewhisper-settings.json
)`}
        />
        <p>{t(locale, "docs.mac.api.settings.importBehavior")}</p>
        <p>{withCode(t(locale, "docs.mac.api.settings.replace"))}</p>
        <Shell
          code={`curl -X POST "http://localhost:8978/v1/settings/import?mode=replace" \\
  -H "Content-Type: application/json" \\
  --data-binary @typewhisper-settings.json`}
        />
        <DocsSubheading id="settings-import-response">
          {t(locale, "docs.mac.api.settings.importResponse")}
        </DocsSubheading>
        <Json
          code={`{
  "workflowsImported": 4,
  "workflowsUpdated": 0,
  "workflowsSkipped": 1,
  "dictionaryImported": 52,
  "dictionarySkipped": 3,
  "snippetsImported": 6,
  "snippetsSkipped": 1,
  "promptActionsImported": 2,
  "promptActionsUpdated": 0,
  "promptActionsSkipped": 0,
  "profilesImported": 2,
  "profilesUpdated": 0,
  "profilesSkipped": 0,
  "hotkeysApplied": 1,
  "hotkeysSkipped": 1,
  "pluginsInstalled": 2,
  "pluginsSkipped": 1,
  "pluginsRegistryFetchFailed": false,
  "historyImported": 120,
  "historySkippedByRetention": 8,
  "historySkippedAsDuplicate": 0,
  "historySkippedUnreadableDestination": 0,
  "updateChannelApplied": true,
  "preferencesApplied": 27
}`}
        />
        <p>{withCode(t(locale, "docs.mac.api.settings.importFields"))}</p>
        <DocsSubheading id="settings-cli">
          {t(locale, "docs.mac.api.settings.cliTitle")}
        </DocsSubheading>
        <p>{withCode(t(locale, "docs.mac.api.settings.cliDescription"))}</p>
        <Shell
          code={`mkdir -p ~/.config/typewhisper
typewhisper export ~/.config/typewhisper/settings.json
typewhisper import ~/.config/typewhisper/settings.json
typewhisper import ~/.config/typewhisper/settings.json --json
typewhisper import ~/.config/typewhisper/settings.json --replace`}
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
            <FieldName name={field} />,
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
AUDIO_URL="http://localhost:$TYPEWHISPER_API_PORT/v1/settings/audio"

(
  AUTH_HEADER="$(mktemp)" || exit
  trap 'rm -f "$AUTH_HEADER"' EXIT
  jq -r '"Authorization: Bearer " + .token' "$DISCOVERY" > "$AUTH_HEADER"

  saved="$(curl --fail --silent --show-error "$AUDIO_URL" -H @"$AUTH_HEADER")" || exit
  curl --fail --silent --show-error -X PATCH "$AUDIO_URL" \\
    -H @"$AUTH_HEADER" \\
    -H "Content-Type: application/json" \\
    -d '{
      "input_priority": [{ "id": "BlackHole2ch_UID", "name": "BlackHole 2ch" }],
      "audio_ducking_enabled": false
    }'

  printf '%s ' "${t(locale, "docs.mac.api.audio.restoreComment")}"
  read -r _

  jq 'del(.input_devices, .active_input)' <<<"$saved" | \\
    curl --fail --silent --show-error -X PATCH "$AUDIO_URL" \\
      -H @"$AUTH_HEADER" \\
      -H "Content-Type: application/json" \\
      --data-binary @-
)`}
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
        id="text-processing"
        title={t(locale, "docs.mac.api.text.title")}
      >
        <p>{availableFrom18}</p>
        <p>{withCode(t(locale, "docs.mac.api.text.description"))}</p>
        <DocsSubheading id="text-processing-llm">
          {t(locale, "docs.mac.api.text.llmTitle")}
        </DocsSubheading>
        <Shell
          code={`curl http://localhost:8978/v1/llm/models

curl -X POST http://localhost:8978/v1/llm/process \\
  -H "Content-Type: application/json" \\
  -d '{"system_prompt":"Rewrite the text as a short, friendly reply. Return only the reply.","text":"thanks got it will send the file tomorrow"}'`}
        />
        <Json
          code={`{
  "models": [
    {
      "provider_id": "appleIntelligence",
      "provider_name": "Apple Intelligence",
      "name": "Apple Intelligence",
      "ready": true
    },
    {
      "provider_id": "Claude",
      "provider_name": "Claude",
      "model_id": "claude-haiku-4-5",
      "name": "Claude Haiku 4.5",
      "ready": true
    }
  ]
}`}
        />
        <p>{withCode(t(locale, "docs.mac.api.text.llm"))}</p>
        <p>
          {withCode(t(locale, "docs.mac.api.text.fallbackBefore"))}{" "}
          <a
            href={localePath(
              locale,
              "/docs/mac/workflows#global-llm-fallbacks",
            )}
          >
            {t(locale, "docs.mac.api.text.fallbackLink")}
          </a>{" "}
          {t(locale, "docs.mac.api.text.fallbackAfter")}
        </p>
        <DocsSubheading id="text-processing-workflows">
          {t(locale, "docs.mac.api.text.workflowsTitle")}
        </DocsSubheading>
        <Shell
          code={`curl http://localhost:8978/v1/workflows

jq -n --rawfile text call-notes.txt \\
  '{workflow_id: "<uuid>", text: $text, language: "en"}' |
  curl -X POST http://localhost:8978/v1/workflows/run \\
    -H "Content-Type: application/json" \\
    --data-binary @- |
  jq -r .text`}
        />
        <Json
          code={`{
  "workflows": [
    {
      "id": "3C2B1A09-8F7E-4D6C-B5A4-0D1E2F3A4B5C",
      "name": "Meeting Notes",
      "template": "meetingNotes"
    }
  ]
}`}
        />
        <p>{withCode(t(locale, "docs.mac.api.text.workflows"))}</p>
        <p>{withCode(t(locale, "docs.mac.api.text.run"))}</p>
        <DocsSubheading id="text-processing-limits">
          {t(locale, "docs.mac.api.text.limitsTitle")}
        </DocsSubheading>
        <p>{withCode(t(locale, "docs.mac.api.text.limits"))}</p>
        <ErrorTable
          label={t(locale, "docs.mac.api.text.limitsTitle")}
          errors={textErrors}
        />
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
        <p>{withCode(t(locale, "docs.mac.api.dictation.latency"))}</p>
      </DocsSection>

      <DocsSection
        id="browser-context"
        title={t(locale, "docs.mac.api.browser.title")}
      >
        <p>{availableFrom18}</p>
        <p>{withCode(t(locale, "docs.mac.api.browser.description"))}</p>
        <p>
          {t(locale, "docs.mac.api.browser.extensionBefore")}{" "}
          <a href={localePath(locale, "/extensions#browser")}>
            {t(locale, "docs.mac.api.browser.extensionLink")}
          </a>{" "}
          {t(locale, "docs.mac.api.browser.extensionAfter")}
        </p>
        <Shell
          code={`curl -X PUT http://localhost:8978/v1/browser/context \\
  -H "Content-Type: application/json" \\
  -d '{"client_id":"c7d1e0f2-4b3a-4f9e-9a1d-2b6c8e0f1a3d","focused":true,"url":"https://github.com/TypeWhisper/typewhisper-mac/pulls","title":"Pull requests"}'

curl -X PUT http://localhost:8978/v1/browser/context \\
  -H "Content-Type: application/json" \\
  -d '{"client_id":"c7d1e0f2-4b3a-4f9e-9a1d-2b6c8e0f1a3d","focused":false}'`}
        />
        <Json
          code={`{
  "status": "active",
  "app_bundle_id": "com.google.Chrome",
  "url": "https://github.com/TypeWhisper/typewhisper-mac/pulls"
}`}
        />
        <DocsSubheading id="browser-context-fields">
          {t(locale, "docs.mac.api.requestFields")}
        </DocsSubheading>
        <FieldTable
          label={t(locale, "docs.mac.api.browser.title")}
          rows={browserFields.map(([field, key]) => [[field], key])}
        />
        <p>{t(locale, "docs.mac.api.browser.behavior")}</p>
        <p>{withCode(t(locale, "docs.mac.api.browser.response"))}</p>
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
          {[400, 401, 403, 404, 409, 413, 422, 429, 501, 502, 503, 504, 500].map(
            (status) => (
              <li key={status}>
                <InlineCode>{status}</InlineCode> –{" "}
                {t(locale, `docs.mac.api.errors.${status}`)}
              </li>
            ),
          )}
        </ul>
      </DocsSection>
    </>
  );
}

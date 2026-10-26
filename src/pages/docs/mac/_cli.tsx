import {
  DocsCallout,
  DocsCode,
  DocsSection,
  DocsSubheading,
  DocsTable,
  withCode,
} from "@/components/docs/prose";
import { localePath, t, type Locale } from "@/i18n/index";

interface Command {
  /** Anchor of the command, `command-<id>`. */
  id: string;
  name: string;
  key: string;
  code: string;
  /** What the command prints, shown below the example. */
  output?: string;
  /** The command ships with TypeWhisper 1.8. */
  since18?: boolean;
  /** The section of the HTTP API page that documents the same routes. */
  api?: { anchor: string; titleKey: string };
}

const commands: Command[] = [
  {
    id: "status",
    name: "status",
    key: "docs.mac.cli.commands.status",
    code: "typewhisper status",
  },
  {
    id: "models",
    name: "models",
    key: "docs.mac.cli.commands.models",
    code: "typewhisper models",
  },
  {
    id: "models-load",
    name: "models load",
    key: "docs.mac.cli.commands.modelsLoad",
    code: "typewhisper models load --engine parakeet --model parakeet-tdt-0.6b-v3",
    output: "ready: parakeet parakeet-tdt-0.6b-v3",
    since18: true,
  },
  {
    id: "models-unload",
    name: "models unload",
    key: "docs.mac.cli.commands.modelsUnload",
    code: "typewhisper models unload --engine parakeet",
    output: "unloaded: parakeet parakeet-tdt-0.6b-v3",
    since18: true,
  },
  {
    id: "models-delete",
    name: "models delete",
    key: "docs.mac.cli.commands.modelsDelete",
    code: "typewhisper models delete --engine whisper --model openai_whisper-large-v3_turbo",
    output: "deleted: whisper openai_whisper-large-v3_turbo",
    since18: true,
    api: {
      anchor: "model-management",
      titleKey: "docs.mac.api.manageModels.title",
    },
  },
  {
    id: "transcribe",
    name: "transcribe",
    key: "docs.mac.cli.commands.transcribe",
    code: "typewhisper transcribe recording.wav",
  },
  {
    id: "export",
    name: "export",
    key: "docs.mac.cli.commands.export",
    code: "typewhisper export typewhisper-settings.json",
  },
  {
    id: "import",
    name: "import",
    key: "docs.mac.cli.commands.import",
    code: "typewhisper import typewhisper-settings.json",
  },
  {
    id: "import-replace",
    name: "import --replace",
    key: "docs.mac.cli.commands.importReplace",
    code: "typewhisper import typewhisper-settings.json --replace",
    output: `Workflows: 0 imported, 1 updated, 7 skipped
Dictionary: 0 imported, 52 skipped
Snippets: 0 imported, 6 skipped
Prompt Actions: 0 imported, 0 updated, 2 skipped
Profiles: 0 imported, 0 updated, 2 skipped
Hotkeys: 1 applied, 7 skipped
Plugins: 0 installed, 2 skipped
History: 0 imported, 41 skipped as duplicates, 0 skipped by retention
Preferences: 27 applied
Update channel applied`,
    since18: true,
    api: { anchor: "settings-backup", titleKey: "docs.mac.api.settings.title" },
  },
  {
    id: "audio",
    name: "audio",
    key: "docs.mac.cli.commands.audio",
    code: "typewhisper audio",
    output: `Active input: MacBook Pro Microphone [BuiltInMicrophoneDevice]
Input priority:
  1. HyperX QuadCast 2 [AppleUSBAudioEngine:HyperX:QuadCast 2] (not connected)
Available inputs:
  MacBook Pro Microphone [BuiltInMicrophoneDevice] (system default)
  BlackHole 2ch [BlackHole2ch_UID]
Audio ducking: on (20% volume)
Pause media during recording: off
Sound feedback: on`,
    since18: true,
  },
  {
    id: "audio-set",
    name: "audio set",
    key: "docs.mac.cli.commands.audioSet",
    code: `echo '{"input_priority":[{"id":"BlackHole2ch_UID"}]}' | typewhisper audio set -`,
    since18: true,
    api: { anchor: "audio-settings", titleKey: "docs.mac.api.audio.title" },
  },
];

/** Flag, description, and whether the flag ships with TypeWhisper 1.8. */
const options: Array<[flag: string, key: string, since18?: boolean]> = [
  ["--port", "docs.mac.cli.options.port"],
  ["--api-token", "docs.mac.cli.options.apiToken"],
  ["--dev", "docs.mac.cli.options.dev"],
  ["--json", "docs.mac.cli.options.json"],
  ["--help / -h / --version", "docs.mac.cli.options.helpVersion"],
  ["--language", "docs.mac.cli.options.language"],
  ["--language-hint", "docs.mac.cli.options.languageHint"],
  ["--task", "docs.mac.cli.options.task"],
  ["--translate-to", "docs.mac.cli.options.translateTo"],
  ["--engine", "docs.mac.cli.options.engine"],
  ["--model", "docs.mac.cli.options.model"],
  ["--await-download", "docs.mac.cli.options.awaitDownload"],
  ["--no-corrections", "docs.mac.cli.options.noCorrections"],
  ["--replace", "docs.mac.cli.options.replace", true],
];

interface Example {
  key: string;
  /** Shell lines; `{comment}` becomes the localized `commentKey`. */
  code: string;
  commentKey?: string;
  /** The example needs TypeWhisper 1.8. */
  since18?: boolean;
}

const examples: Example[] = [
  {
    key: "docs.mac.cli.examples.transcribeFile",
    code: "typewhisper transcribe meeting.m4a",
  },
  {
    key: "docs.mac.cli.examples.pipeStdin",
    code: "ffmpeg -i video.mp4 -f wav - | typewhisper transcribe -",
  },
  {
    key: "docs.mac.cli.examples.jsonJq",
    code: "typewhisper transcribe --json recording.wav | jq .text",
  },
  {
    key: "docs.mac.cli.examples.translateGerman",
    code: "typewhisper transcribe --translate-to de recording.wav",
  },
  {
    key: "docs.mac.cli.examples.customPort",
    code: "typewhisper --port 9000 status",
  },
  {
    key: "docs.mac.cli.examples.backupDotfiles",
    code: "mkdir -p ~/.config/typewhisper\ntypewhisper export ~/.config/typewhisper/settings.json",
  },
  {
    key: "docs.mac.cli.examples.importJson",
    code: "typewhisper import settings.json --json",
  },
  {
    key: "docs.mac.cli.examples.importReplace",
    code: "typewhisper import ~/.config/typewhisper/settings.json --replace",
    since18: true,
  },
  {
    key: "docs.mac.cli.examples.switchModel",
    code: `typewhisper models
typewhisper models load --engine whisper \\
  --model openai_whisper-large-v3_turbo
typewhisper transcribe interview.m4a > interview.txt
typewhisper models unload --engine whisper`,
    since18: true,
  },
  {
    key: "docs.mac.cli.examples.audioRestore",
    code: `if typewhisper audio --json > audio-settings.json.tmp &&
  mv audio-settings.json.tmp audio-settings.json; then
  echo '{"input_priority":[{"id":"BlackHole2ch_UID"}],"audio_ducking_enabled":false}' |
    typewhisper audio set -
  printf '%s ' "{comment}"
  read -r _
  jq 'del(.input_devices, .active_input)' audio-settings.json |
    typewhisper audio set -
fi`,
    commentKey: "docs.mac.cli.examples.audioRestoreComment",
    since18: true,
  },
];

export default function DocsMacCLI({ locale = "en" }: { locale?: Locale }) {
  // Features that ship with TypeWhisper 1.8 say so where they are described.
  const availableFrom18 = t(locale, "docs.mac.cli.availableFrom18");

  return (
    <>
      <DocsSection
        id="installation"
        title={t(locale, "docs.mac.cli.installation.title")}
      >
        <p>
          {t(locale, "docs.mac.cli.installation.desc1")}{" "}
          <code>typewhisper</code>{" "}
          {t(locale, "docs.mac.cli.installation.desc2")}{" "}
          <code>/usr/local/bin/typewhisper</code>
          {t(locale, "docs.mac.cli.installation.desc3")}
        </p>
        <DocsCallout label={t(locale, "docs.callout.important")}>
          <p>{t(locale, "docs.mac.cli.installation.warning")}</p>
        </DocsCallout>
      </DocsSection>

      <DocsSection id="commands" title={t(locale, "docs.mac.cli.commands.title")}>
        {commands.map((command) => (
          <div key={command.id}>
            <DocsSubheading id={`command-${command.id}`}>
              <code>{command.name}</code>
            </DocsSubheading>
            {command.since18 && <p>{availableFrom18}</p>}
            <p>{withCode(t(locale, command.key))}</p>
            <DocsCode code={command.code} lang="shell" locale={locale} />
            {command.output && (
              <DocsCode
                code={command.output}
                lang={t(locale, "docs.mac.cli.outputLabel")}
                locale={locale}
              />
            )}
            {command.api && (
              <p>
                {t(locale, "docs.mac.cli.apiReference")}{" "}
                <a
                  href={localePath(
                    locale,
                    `/docs/mac/api#${command.api.anchor}`,
                  )}
                >
                  {t(locale, command.api.titleKey)}
                </a>
              </p>
            )}
          </div>
        ))}
      </DocsSection>

      <DocsSection id="file-size" title={t(locale, "docs.mac.cli.fileSize.title")}>
        <p>{t(locale, "docs.mac.cli.fileSize.localFiles")}</p>
        <p>{t(locale, "docs.mac.cli.fileSize.stdin")}</p>
      </DocsSection>

      <DocsSection
        id="settings-backup"
        title={t(locale, "docs.mac.cli.settings.title")}
      >
        <p>{t(locale, "docs.mac.cli.settings.description")}</p>
        <DocsCode
          locale={locale}
          lang="shell"
          code={`mkdir -p ~/.config/typewhisper
typewhisper export ~/.config/typewhisper/settings.json
typewhisper import ~/.config/typewhisper/settings.json
typewhisper import ~/.config/typewhisper/settings.json --json
typewhisper import ~/.config/typewhisper/settings.json --replace`}
        />
        <p>{withCode(t(locale, "docs.mac.cli.settings.behavior"))}</p>
        <DocsCallout label={t(locale, "docs.callout.important")}>
          <p>{t(locale, "docs.mac.cli.settings.warning")}</p>
        </DocsCallout>
      </DocsSection>

      <DocsSection id="options" title={t(locale, "docs.mac.cli.options.title")}>
        <DocsTable
          label={t(locale, "docs.mac.cli.options.title")}
          head={["Flag", t(locale, "docs.mac.cli.options.descHeader")]}
          rows={options.map(([flag, key, since18]) => [
            <code>{flag}</code>,
            <>
              {withCode(t(locale, key))}
              {since18 && (
                <span className="docs-table__meta">{availableFrom18}</span>
              )}
            </>,
          ])}
        />
      </DocsSection>

      <DocsSection id="examples" title={t(locale, "docs.mac.cli.examples.title")}>
        {examples.map((example) => (
          <div key={example.key}>
            <p>
              {example.since18 && `${availableFrom18} `}
              {withCode(t(locale, example.key))}
            </p>
            <DocsCode
              code={
                example.commentKey
                  ? example.code.replace(
                      "{comment}",
                      t(locale, example.commentKey),
                    )
                  : example.code
              }
              lang="shell"
              locale={locale}
            />
          </div>
        ))}
      </DocsSection>
    </>
  );
}

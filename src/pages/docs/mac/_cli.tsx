import {
  DocsCallout,
  DocsCode,
  DocsSection,
  DocsSubheading,
  DocsTable,
} from "@/components/docs/prose";
import { t, type Locale } from "@/i18n/index";

const commands: Array<[name: string, key: string, code: string]> = [
  ["status", "docs.mac.cli.commands.status", "typewhisper status"],
  ["models", "docs.mac.cli.commands.models", "typewhisper models"],
  [
    "transcribe",
    "docs.mac.cli.commands.transcribe",
    "typewhisper transcribe recording.wav",
  ],
  [
    "export",
    "docs.mac.cli.commands.export",
    "typewhisper export typewhisper-settings.json",
  ],
  [
    "import",
    "docs.mac.cli.commands.import",
    "typewhisper import typewhisper-settings.json",
  ],
];

const options: Array<[flag: string, key: string]> = [
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
];

const examples: Array<[key: string, code: string]> = [
  ["docs.mac.cli.examples.transcribeFile", "typewhisper transcribe meeting.m4a"],
  [
    "docs.mac.cli.examples.pipeStdin",
    "ffmpeg -i video.mp4 -f wav - | typewhisper transcribe -",
  ],
  [
    "docs.mac.cli.examples.jsonJq",
    "typewhisper transcribe --json recording.wav | jq .text",
  ],
  [
    "docs.mac.cli.examples.translateGerman",
    "typewhisper transcribe --translate-to de recording.wav",
  ],
  ["docs.mac.cli.examples.customPort", "typewhisper --port 9000 status"],
  [
    "docs.mac.cli.examples.backupDotfiles",
    "mkdir -p ~/.config/typewhisper\ntypewhisper export ~/.config/typewhisper/settings.json",
  ],
  [
    "docs.mac.cli.examples.importJson",
    "typewhisper import settings.json --json",
  ],
];

export default function DocsMacCLI({ locale = "en" }: { locale?: Locale }) {
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
        {commands.map(([name, key, code]) => (
          <div key={name}>
            <DocsSubheading id={`command-${name}`}>
              <code>{name}</code>
            </DocsSubheading>
            <p>{t(locale, key)}</p>
            <DocsCode code={code} lang="shell" locale={locale} />
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
typewhisper import ~/.config/typewhisper/settings.json --json`}
        />
        <p>{t(locale, "docs.mac.cli.settings.behavior")}</p>
        <DocsCallout label={t(locale, "docs.callout.important")}>
          <p>{t(locale, "docs.mac.cli.settings.warning")}</p>
        </DocsCallout>
      </DocsSection>

      <DocsSection id="options" title={t(locale, "docs.mac.cli.options.title")}>
        <DocsTable
          label={t(locale, "docs.mac.cli.options.title")}
          head={["Flag", t(locale, "docs.mac.cli.options.descHeader")]}
          rows={options.map(([flag, key]) => [
            <code>{flag}</code>,
            t(locale, key),
          ])}
        />
      </DocsSection>

      <DocsSection id="examples" title={t(locale, "docs.mac.cli.examples.title")}>
        {examples.map(([key, code]) => (
          <div key={key}>
            <p>{t(locale, key)}</p>
            <DocsCode code={code} lang="shell" locale={locale} />
          </div>
        ))}
      </DocsSection>
    </>
  );
}

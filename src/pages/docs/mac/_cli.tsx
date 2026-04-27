import { t, type Locale } from "@/i18n/index";

export default function DocsMacCLI({ locale = "en" }: { locale?: Locale }) {
  return (
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {t(locale, "docs.mac.cli.title")}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {t(locale, "docs.mac.cli.description")}
        </p>

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.cli.installation.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.cli.installation.desc1")}{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                typewhisper
              </code>{" "}
              {t(locale, "docs.mac.cli.installation.desc2")}{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                /usr/local/bin/typewhisper
              </code>
              {t(locale, "docs.mac.cli.installation.desc3")}
            </p>
            <div className="mt-4 rounded-md border border-amber-500/20 bg-amber-500/5 p-3">
              <p className="text-sm text-muted-foreground">
                {t(locale, "docs.mac.cli.installation.warning")}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.cli.commands.title")}</h2>
            <div className="mt-3 space-y-4">
              <div>
                <h3 className="text-sm font-semibold">status</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(locale, "docs.mac.cli.commands.status")}
                </p>
                <div className="mt-2 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
                  <p>typewhisper status</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold">models</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(locale, "docs.mac.cli.commands.models")}
                </p>
                <div className="mt-2 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
                  <p>typewhisper models</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold">transcribe</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(locale, "docs.mac.cli.commands.transcribe")}
                </p>
                <div className="mt-2 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
                  <p>typewhisper transcribe recording.wav</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.cli.fileSize.title")}</h2>
            <div className="mt-3 space-y-3 text-sm text-muted-foreground">
              <p>{t(locale, "docs.mac.cli.fileSize.localFiles")}</p>
              <p>{t(locale, "docs.mac.cli.fileSize.stdin")}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.cli.options.title")}</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 text-left font-semibold">Flag</th>
                    <th className="py-2 text-left font-semibold">
                      {t(locale, "docs.mac.cli.options.descHeader")}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">
                      <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                        --port
                      </code>
                    </td>
                    <td className="py-2">
                      {t(locale, "docs.mac.cli.options.port")}
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">
                      <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                        --json
                      </code>
                    </td>
                    <td className="py-2">{t(locale, "docs.mac.cli.options.json")}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">
                      <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                        --language
                      </code>
                    </td>
                    <td className="py-2">
                      {t(locale, "docs.mac.cli.options.language")}
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">
                      <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                        --task
                      </code>
                    </td>
                    <td className="py-2">
                      {t(locale, "docs.mac.cli.options.task")}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">
                      <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                        --translate-to
                      </code>
                    </td>
                    <td className="py-2">
                      {t(locale, "docs.mac.cli.options.translateTo")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.cli.examples.title")}</h2>
            <div className="mt-3 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t(locale, "docs.mac.cli.examples.transcribeFile")}
                </p>
                <div className="mt-2 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
                  <p>typewhisper transcribe meeting.m4a</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {t(locale, "docs.mac.cli.examples.pipeStdin")}
                </p>
                <div className="mt-2 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
                  <p>
                    ffmpeg -i video.mp4 -f wav - | typewhisper transcribe -
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {t(locale, "docs.mac.cli.examples.jsonJq")}
                </p>
                <div className="mt-2 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
                  <p>
                    typewhisper transcribe --json recording.wav | jq .text
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {t(locale, "docs.mac.cli.examples.translateGerman")}
                </p>
                <div className="mt-2 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
                  <p>
                    typewhisper transcribe --translate-to de recording.wav
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {t(locale, "docs.mac.cli.examples.customPort")}
                </p>
                <div className="mt-2 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
                  <p>typewhisper --port 9000 status</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

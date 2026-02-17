import { DocsLayout } from "@/components/layout/docs-layout";

export default function DocsMacCLI() {
  return (
    <DocsLayout>
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          CLI Tool
        </h1>
        <p className="mt-3 text-muted-foreground">
          A shell-friendly command-line tool that connects to the TypeWhisper API
          server for transcription from the terminal.
        </p>

        <div className="mt-8 space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Installation</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Install the CLI from the TypeWhisper app: Settings &gt; Advanced
              &gt; CLI Tool &gt; Install. This places the{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                typewhisper
              </code>{" "}
              binary at{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                /usr/local/bin/typewhisper
              </code>
              .
            </p>
            <div className="mt-4 rounded-md border border-amber-500/20 bg-amber-500/5 p-3">
              <p className="text-sm text-muted-foreground">
                The TypeWhisper app must be running with the API server enabled
                for the CLI to work.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Commands</h2>
            <div className="mt-3 space-y-4">
              <div>
                <h3 className="text-sm font-semibold">status</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Check if the API server is running and which model is loaded.
                </p>
                <div className="mt-2 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
                  <p>typewhisper status</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold">models</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  List all available models and their status.
                </p>
                <div className="mt-2 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
                  <p>typewhisper models</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold">transcribe</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Transcribe an audio file or piped audio input.
                </p>
                <div className="mt-2 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
                  <p>typewhisper transcribe recording.wav</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Options</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 text-left font-semibold">Flag</th>
                    <th className="py-2 text-left font-semibold">
                      Description
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
                      API server port (default: 8978)
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">
                      <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                        --json
                      </code>
                    </td>
                    <td className="py-2">Output full JSON response</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">
                      <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                        --language
                      </code>
                    </td>
                    <td className="py-2">
                      ISO 639-1 language code (e.g., en, de)
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">
                      <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                        --task
                      </code>
                    </td>
                    <td className="py-2">
                      transcribe (default) or translate
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">
                      <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                        --translate-to
                      </code>
                    </td>
                    <td className="py-2">
                      Target language for translation (e.g., de, fr)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Examples</h2>
            <div className="mt-3 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Transcribe a file:
                </p>
                <div className="mt-2 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
                  <p>typewhisper transcribe meeting.m4a</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Pipe audio from stdin:
                </p>
                <div className="mt-2 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
                  <p>
                    ffmpeg -i video.mp4 -f wav - | typewhisper transcribe -
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  JSON output with jq:
                </p>
                <div className="mt-2 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
                  <p>
                    typewhisper transcribe --json recording.wav | jq .text
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Translate to German:
                </p>
                <div className="mt-2 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
                  <p>
                    typewhisper transcribe --translate-to de recording.wav
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Use a custom port:
                </p>
                <div className="mt-2 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
                  <p>typewhisper --port 9000 status</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}

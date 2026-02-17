import { DocsLayout } from "@/components/layout/docs-layout";

export default function DocsWindowsAPI() {
  return (
    <DocsLayout>
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          HTTP API
        </h1>
        <p className="mt-3 text-muted-foreground">
          TypeWhisper includes a local REST API for integration with external
          tools and scripts. Enable it in Settings (default port: 9876).
        </p>

        <div className="mt-8 space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Check Status</h2>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <p className="text-muted-foreground"># Check if the API is ready</p>
              <p>curl http://localhost:9876/v1/status</p>
            </div>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-muted-foreground">{`{
  "status": "ready",
  "engine": "parakeet",
  "model": "nvidia_parakeet-tdt-0.6b-v2",
  "supports_streaming": false,
  "supports_translation": true
}`}</pre>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Transcribe Audio</h2>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <p className="text-muted-foreground">
                # Send an audio file for transcription
              </p>
              <p>curl -X POST http://localhost:9876/v1/transcribe \</p>
              <p className="pl-4">-F &quot;file=@recording.wav&quot; \</p>
              <p className="pl-4">-F &quot;language=en&quot;</p>
            </div>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-muted-foreground">{`{
  "text": "Hello, world!",
  "language": "en",
  "duration": 2.5,
  "processing_time": 0.8,
  "engine": "parakeet",
  "model": "nvidia_parakeet-tdt-0.6b-v2"
}`}</pre>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold">Optional Parameters</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                <li>
                  <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                    language
                  </code>{" "}
                  - ISO 639-1 code (e.g.,{" "}
                  <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                    en
                  </code>
                  ,{" "}
                  <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                    de
                  </code>
                  ). Omit for auto-detection.
                </li>
                <li>
                  <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                    task
                  </code>{" "}
                  -{" "}
                  <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                    transcribe
                  </code>{" "}
                  (default) or{" "}
                  <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                    translate
                  </code>
                  .
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">List Models</h2>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <p className="text-muted-foreground"># Get available models</p>
              <p>curl http://localhost:9876/v1/models</p>
            </div>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-muted-foreground">{`{
  "models": [
    {
      "id": "nvidia_parakeet-tdt-0.6b-v2",
      "engine": "parakeet",
      "downloaded": true,
      "active": true
    },
    {
      "id": "nvidia_canary-180m-flash",
      "engine": "canary",
      "downloaded": true,
      "active": false
    }
  ]
}`}</pre>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}

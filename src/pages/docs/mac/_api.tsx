export default function DocsMacAPI() {
  return (
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          HTTP API
        </h1>
        <p className="mt-3 text-muted-foreground">
          TypeWhisper includes a local REST API for automation and integration
          with external tools. In macOS 1.0, this is an advanced surface:
          documented <code className="rounded bg-background px-1.5 py-0.5 text-xs font-mono">/v1/*</code>{" "}
          endpoints are intended to remain stable across 1.x. Enable it in
          Settings &gt; Advanced (default port: 8978).
        </p>

        <div className="mt-4 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> The API is disabled by default, binds to
            localhost only, and is designed for local automation rather than
            public network access.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">Check Status</h2>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <p className="text-muted-foreground"># Check if the API is ready</p>
              <p>curl http://localhost:8978/v1/status</p>
            </div>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-muted-foreground">{`{
  "status": "ready",
  "engine": "whisper",
  "model": "openai_whisper-large-v3_turbo",
  "supports_streaming": true,
  "supports_translation": true
}`}</pre>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">Transcribe Audio</h2>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <p className="text-muted-foreground">
                # Send an audio file for transcription
              </p>
              <p>curl -X POST http://localhost:8978/v1/transcribe \</p>
              <p className="pl-4">-F &quot;file=@recording.wav&quot; \</p>
              <p className="pl-4">-F &quot;language=en&quot; \</p>
              <p className="pl-4">
                -F &quot;target_language=de&quot;
              </p>
            </div>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-muted-foreground">{`{
  "text": "Hello, world!",
  "language": "en",
  "duration": 2.5,
  "processing_time": 0.8,
  "engine": "whisper",
  "model": "openai_whisper-large-v3_turbo"
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
                  </code>{" "}
                  (to English, WhisperKit only).
                </li>
                <li>
                  <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                    target_language
                  </code>{" "}
                  - ISO 639-1 code for translation target language (e.g.,{" "}
                  <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                    de
                  </code>
                  ,{" "}
                  <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                    fr
                  </code>
                  ). Used with Apple Translate.
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">List Models</h2>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <p className="text-muted-foreground"># Get available models</p>
              <p>curl http://localhost:8978/v1/models</p>
            </div>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-muted-foreground">{`{
  "models": [
    {
      "id": "openai_whisper-large-v3_turbo",
      "engine": "whisper",
      "ready": true
    }
  ]
}`}</pre>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">History</h2>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <p className="text-muted-foreground"># Search history</p>
              <p>curl "http://localhost:8978/v1/history?q=meeting&amp;limit=10&amp;offset=0"</p>
              <p className="mt-3 text-muted-foreground"># Delete a history entry</p>
              <p>curl -X DELETE "http://localhost:8978/v1/history?id=&lt;uuid&gt;"</p>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">Profiles</h2>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <p className="text-muted-foreground"># List all profiles</p>
              <p>curl http://localhost:8978/v1/profiles</p>
              <p className="mt-3 text-muted-foreground"># Toggle a profile on or off</p>
              <p>curl -X PUT "http://localhost:8978/v1/profiles/toggle?id=&lt;uuid&gt;"</p>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">Dictation Control</h2>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <p className="text-muted-foreground"># Start dictation</p>
              <p>curl -X POST http://localhost:8978/v1/dictation/start</p>
              <p className="mt-3 text-muted-foreground"># Stop dictation</p>
              <p>curl -X POST http://localhost:8978/v1/dictation/stop</p>
              <p className="mt-3 text-muted-foreground"># Check dictation status</p>
              <p>curl http://localhost:8978/v1/dictation/status</p>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">Error Responses</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The API returns standard HTTP status codes with a JSON error body:
            </p>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-muted-foreground">{`{
  "error": "No model loaded",
  "code": "MODEL_NOT_LOADED"
}`}</pre>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold">Common Error Codes</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                <li>
                  <code className="rounded bg-background px-1.5 py-0.5 text-xs font-mono">
                    400
                  </code>{" "}
                  - Missing or invalid file input, unsupported audio format, or
                  invalid parameter value.
                </li>
                <li>
                  <code className="rounded bg-background px-1.5 py-0.5 text-xs font-mono">
                    503
                  </code>{" "}
                  - No model is currently loaded.
                </li>
                <li>
                  <code className="rounded bg-background px-1.5 py-0.5 text-xs font-mono">
                    500
                  </code>{" "}
                  - Internal transcription error. Check the app&apos;s logs or
                  diagnostics export for more detail.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
}

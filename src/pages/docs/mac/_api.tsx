import { t, type Locale } from "@/i18n/index";

export default function DocsMacAPI({ locale = "en" }: { locale?: Locale }) {
  return (
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {t(locale, "docs.mac.api.title")}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {t(locale, "docs.mac.api.intro1")}{" "}
          <code className="rounded bg-background px-1.5 py-0.5 text-xs font-mono">/v1/*</code>{" "}
          {t(locale, "docs.mac.api.intro2")}
        </p>

        <div className="mt-4 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
          <p className="text-sm text-muted-foreground">
            <strong>{t(locale, "docs.mac.api.noteLabel")}</strong> {t(locale, "docs.mac.api.noteText")}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.api.checkStatus.title")}</h2>
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
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.api.transcribe.title")}</h2>
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
              <h3 className="text-sm font-semibold">{t(locale, "docs.mac.api.transcribe.optionalParams")}</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                <li>
                  <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                    language
                  </code>{" "}
                  - {t(locale, "docs.mac.api.transcribe.params.language")}
                </li>
                <li>
                  <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                    task
                  </code>{" "}
                  - {t(locale, "docs.mac.api.transcribe.params.task")}
                </li>
                <li>
                  <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                    target_language
                  </code>{" "}
                  - {t(locale, "docs.mac.api.transcribe.params.targetLanguage")}
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.api.listModels.title")}</h2>
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
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.api.history.title")}</h2>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <p className="text-muted-foreground"># Search history</p>
              <p>curl "http://localhost:8978/v1/history?q=meeting&amp;limit=10&amp;offset=0"</p>
              <p className="mt-3 text-muted-foreground"># Delete a history entry</p>
              <p>curl -X DELETE "http://localhost:8978/v1/history?id=&lt;uuid&gt;"</p>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.api.profiles.title")}</h2>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <p className="text-muted-foreground"># List all profiles</p>
              <p>curl http://localhost:8978/v1/profiles</p>
              <p className="mt-3 text-muted-foreground"># Toggle a profile on or off</p>
              <p>curl -X PUT "http://localhost:8978/v1/profiles/toggle?id=&lt;uuid&gt;"</p>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.api.dictation.title")}</h2>
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
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.api.errors.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.api.errors.description")}
            </p>
            <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-muted-foreground">{`{
  "error": "No model loaded",
  "code": "MODEL_NOT_LOADED"
}`}</pre>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold">{t(locale, "docs.mac.api.errors.commonCodes")}</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                <li>
                  <code className="rounded bg-background px-1.5 py-0.5 text-xs font-mono">
                    400
                  </code>{" "}
                  - {t(locale, "docs.mac.api.errors.400")}
                </li>
                <li>
                  <code className="rounded bg-background px-1.5 py-0.5 text-xs font-mono">
                    503
                  </code>{" "}
                  - {t(locale, "docs.mac.api.errors.503")}
                </li>
                <li>
                  <code className="rounded bg-background px-1.5 py-0.5 text-xs font-mono">
                    500
                  </code>{" "}
                  - {t(locale, "docs.mac.api.errors.500")}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
}

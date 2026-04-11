import type { Locale } from "@/i18n/index";

export default function DocsWindowsAPI({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";

  const optionalParameters = isDe
    ? [
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            language
          </code>{" "}
          - ISO-639-1-Code (z.B.{" "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            en
          </code>
          ,{" "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            de
          </code>
          ). Weglassen für automatische Erkennung.
        </>,
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            task
          </code>{" "}
          -{" "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            transcribe
          </code>{" "}
          (Standard) oder{" "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            translate
          </code>
          .
        </>,
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            target_language
          </code>{" "}
          - ISO-639-1-Code für die Zielsprache der Übersetzung (z.B.{" "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            de
          </code>
          ,{" "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            fr
          </code>
          ). Wird mit Canary oder Marian verwendet.
        </>,
      ]
    : [
        <>
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
        </>,
        <>
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
        </>,
        <>
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
          ). Used with Canary or Marian translation.
        </>,
      ];

  const commonErrorCodes = isDe
    ? [
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            400
          </code>{" "}
          - Fehlendes oder ungültiges{" "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            file
          </code>{" "}
          -Feld, nicht unterstütztes Audioformat oder ungültiger Parameterwert.
        </>,
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            503
          </code>{" "}
          - Kein Modell ist geladen. Lade ein Modell herunter und aktiviere es
          zuerst in den Einstellungen.
        </>,
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            500
          </code>{" "}
          - Interner Fehler während der Transkription. Prüfe die App-Logs für
          Details.
        </>,
      ]
    : [
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            400
          </code>{" "}
          - Missing or invalid{" "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            file
          </code>{" "}
          field, unsupported audio format, or invalid parameter value.
        </>,
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            503
          </code>{" "}
          - No model is loaded. Download and activate a model in Settings first.
        </>,
        <>
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            500
          </code>{" "}
          - Internal error during transcription. Check the app logs for details.
        </>,
      ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">
        HTTP API
      </h1>
      <p className="mt-3 text-muted-foreground">
        {isDe
          ? "TypeWhisper enthält eine lokale REST-API für die Integration mit externen Tools und Skripten."
          : "TypeWhisper includes a local REST API for integration with external tools and scripts."}
      </p>

      <div className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
        <p className="text-sm text-muted-foreground">
          <strong>{isDe ? "Hinweis:" : "Note:"}</strong>{" "}
          {isDe
            ? "Die API ist standardmäßig deaktiviert. Aktiviere sie unter Settings > API und konfiguriere den Port (Standard: 9876). Die API akzeptiert nur Verbindungen von localhost."
            : "The API is disabled by default. Enable it in Settings > API and configure the port (default: 9876). The API only accepts connections from localhost."}
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Status prüfen" : "Check Status"}
          </h2>
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

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Audio transkribieren" : "Transcribe Audio"}
          </h2>
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
            <h3 className="text-sm font-semibold">
              {isDe ? "Optionale Parameter" : "Optional Parameters"}
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {optionalParameters.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Modelle auflisten" : "List Models"}
          </h2>
          <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
            <p className="text-muted-foreground">
              # Get available models (local + cloud)
            </p>
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
    },
    {
      "id": "whisper-large-v3",
      "engine": "groq",
      "downloaded": true,
      "active": false
    },
    {
      "id": "gpt-4o-transcribe",
      "engine": "openai",
      "downloaded": true,
      "active": false
    }
  ]
}`}</pre>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {isDe
              ? "Cloud-Modelle erscheinen, sobald du in den Einstellungen einen API-Key für den jeweiligen Anbieter konfiguriert hast."
              : "Cloud models appear once you have configured an API key for the respective provider in Settings."}
          </p>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Fehlerantworten" : "Error Responses"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Die API gibt Standard-HTTP-Statuscodes mit einem JSON-Fehlerkörper zurück:"
              : "The API returns standard HTTP status codes with a JSON error body:"}
          </p>
          <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-muted-foreground">{`{
  "error": "No model loaded",
  "code": "MODEL_NOT_LOADED"
}`}</pre>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-semibold">
              {isDe ? "Häufige Fehlercodes" : "Common Error Codes"}
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {commonErrorCodes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

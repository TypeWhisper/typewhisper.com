import { DocsLayout } from "@/components/layout/docs-layout";

export default function DocsMacFeatures() {
  return (
    <DocsLayout>
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Features
        </h1>
        <p className="mt-3 text-muted-foreground">
          A comprehensive overview of TypeWhisper&apos;s capabilities on macOS.
        </p>

        <div className="mt-8 space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">System-Wide Dictation</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Use a global hotkey to start and stop recording from any app.
              Choose between push-to-talk (hold to record), toggle mode (press
              to start/stop), or modifier-key hotkeys. Transcribed text is
              automatically pasted into the active text field.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Streaming Preview</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              With WhisperKit or Apple Speech, see partial transcription results
              in real-time as you speak. A floating overlay shows the current
              transcription progress.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">File Transcription</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Drag and drop audio or video files to transcribe them in batch.
              Supports all common formats (MP3, WAV, M4A, MP4, MOV, and more).
              Export results as SRT or WebVTT subtitles with accurate timestamps.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Whisper Mode</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Boost microphone gain for quiet speech or noisy environments.
              Toggle per-profile or globally in settings.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Translation</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Apple Translate provides on-device translation between many
              language pairs. WhisperKit can also translate speech from any
              supported language to English. Set the task to
              &quot;Translate&quot; in settings or via a profile.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Transcription History</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              All transcriptions are saved locally with timestamps, the app they
              were dictated into, and which engine/model was used. Edit
              transcriptions inline and see correction detection.
            </p>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}

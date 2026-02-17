import { DocsLayout } from "@/components/layout/docs-layout";

export default function DocsWindowsFeatures() {
  return (
    <DocsLayout>
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Features
        </h1>
        <p className="mt-3 text-muted-foreground">
          A comprehensive overview of TypeWhisper&apos;s capabilities on
          Windows.
        </p>

        <div className="mt-8 space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">System-Wide Dictation</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Use a global hotkey to start and stop recording from any app.
              Choose between Toggle mode (press to start/stop), PushToTalk mode
              (hold to record), or Hybrid mode. The default hotkey is
              Ctrl+Shift+F9. Transcribed text is automatically pasted into the
              active text field.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">File Transcription</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Transcribe audio and video files with batch processing support.
              Supports all common formats (MP3, WAV, M4A, MP4, and more). Export
              results as SRT or WebVTT subtitles with accurate timestamps.
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
              The Canary model supports on-device translation between English,
              German, French, and Spanish. For other languages, cloud-based LLM
              translation is available. Set translation options in settings or
              via a profile.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Audio Ducking</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Automatically reduces system volume while recording to minimize
              background noise and improve transcription accuracy. Enable in
              settings.
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

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
          {/* 1. System-Wide Dictation */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">System-Wide Dictation</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Use a global hotkey to start and stop recording from any app.
              Choose between push-to-talk (hold to record), toggle mode (press
              to start/stop), or modifier-key hotkeys. Transcribed text is
              automatically pasted into the active text field.
            </p>
          </div>

          {/* 2. Streaming Preview */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">Streaming Preview</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              With WhisperKit or Apple SpeechAnalyzer, see partial transcription
              results in real-time as you speak. A floating overlay shows the
              current transcription progress.
            </p>
          </div>

          {/* 3. AI Text Processing */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">AI Text Processing</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Process transcribed text with AI prompts before it gets pasted.
              TypeWhisper ships with 8 built-in presets for translation,
              formatting, summarization, and more. Open the Prompt Palette to
              quickly switch between prompts or create your own.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Connect your preferred LLM provider - Apple Intelligence
              (on-device), Groq, OpenAI, or Gemini. Each prompt can override the
              default provider, so you can mix local and cloud processing as
              needed.
            </p>
            <img
              src="/screenshots/mac/prompts.png"
              alt="AI Text Processing with Prompt Palette"
              className="mt-4 rounded-xl"
            />
          </div>

          {/* 4. Dictionary */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">Dictionary</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Teach TypeWhisper domain-specific vocabulary. Add custom terms,
              define corrections for commonly misrecognized words, and enable
              auto-learn to build your personal dictionary over time. Import
              community term packs for specialized fields like medicine, law, or
              software development.
            </p>
            <img
              src="/screenshots/mac/dictionary.png"
              alt="Dictionary with custom terms and corrections"
              className="mt-4 rounded-xl"
            />
          </div>

          {/* 5. Snippets */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">Snippets</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Define trigger phrases that expand into longer text blocks.
              Snippets support dynamic placeholders like{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                {"{{DATE}}"}
              </code>
              ,{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                {"{{TIME}}"}
              </code>
              , and{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                {"{{CLIPBOARD}}"}
              </code>{" "}
              for automatic date, time, and clipboard insertion.
            </p>
            <img
              src="/screenshots/mac/snippets.png"
              alt="Snippets with trigger phrases and placeholders"
              className="mt-4 rounded-xl"
            />
          </div>

          {/* 6. File Transcription */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">File Transcription</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Drag and drop audio or video files to transcribe them in batch.
              Supports all common formats (MP3, WAV, M4A, MP4, MOV, and more).
              Export results as SRT or WebVTT subtitles with accurate timestamps.
            </p>
          </div>

          {/* 7. Whisper Mode */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">Whisper Mode</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Boost microphone gain for quiet speech or noisy environments.
              Toggle per-profile or globally in settings.
            </p>
          </div>

          {/* 8. Translation */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">Translation</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Apple Translate provides on-device translation between many
              language pairs. WhisperKit can also translate speech from any
              supported language to English. Set the task to
              &quot;Translate&quot; in settings or via a profile.
            </p>
          </div>

          {/* 9. Transcription History */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">Transcription History</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              All transcriptions are saved locally with timestamps, the app they
              were dictated into, and which engine/model was used. Edit
              transcriptions inline and see correction detection highlighting
              what changed.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Filter by date, app, or engine. Group entries by timeline for a
              clear overview of your dictation activity. Select multiple entries
              for bulk delete or multi-format export. Open History as a
              standalone window for side-by-side reference while working.
            </p>
            <img
              src="/screenshots/mac/history.png"
              alt="Transcription History with timeline and filters"
              className="mt-4 rounded-xl"
            />
          </div>

          {/* 10. Home Dashboard */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">Home Dashboard</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The Home tab shows your usage statistics, an activity chart
              tracking dictation over time, and guided onboarding steps for new
              users. See at a glance how much time you have saved with voice
              input.
            </p>
            <img
              src="/screenshots/mac/home.png"
              alt="Home Dashboard with usage stats and activity chart"
              className="mt-4 rounded-xl"
            />
          </div>

          {/* 11. Plugin System */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">Plugin System</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Extend TypeWhisper with plugins. Four plugin types are supported:
              transcription engines, LLM providers, translation backends, and
              utility plugins. Browse and install plugins from the built-in
              marketplace or develop your own.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              See the{" "}
              <a
                href="/addons"
                className="text-primary hover:underline"
              >
                Add-ons Marketplace
              </a>{" "}
              for available plugins.
            </p>
            <img
              src="/screenshots/mac/plugins.png"
              alt="Plugin System with marketplace"
              className="mt-4 rounded-xl"
            />
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}

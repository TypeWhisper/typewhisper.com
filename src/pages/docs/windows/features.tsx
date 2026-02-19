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
            <h2 className="text-lg font-semibold">On-Device Transcription</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              All local processing runs on your CPU using ONNX Runtime with int8
              quantization - no GPU required. Two engines are available:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                &bull; <strong>Parakeet TDT 0.6B</strong> - Fast general
                transcription supporting 25+ languages. ~670 MB download.
              </li>
              <li>
                &bull; <strong>Canary 180M Flash</strong> - Multilingual model
                with built-in translation between English, German, French, and
                Spanish. ~200 MB download.
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">
              Cloud Transcription (Optional)
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              For higher accuracy or faster processing, you can optionally
              connect cloud providers. Your voice data stays on your PC unless
              you explicitly enable a cloud provider. API keys are encrypted at
              rest via DPAPI.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-2 pr-4 font-medium">Provider</th>
                    <th className="pb-2 pr-4 font-medium">Model</th>
                    <th className="pb-2 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">Groq</td>
                    <td className="py-2 pr-4 font-mono text-xs">
                      whisper-large-v3
                    </td>
                    <td className="py-2">
                      Fast cloud transcription, supports translation
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">Groq</td>
                    <td className="py-2 pr-4 font-mono text-xs">
                      whisper-large-v3-turbo
                    </td>
                    <td className="py-2">Fastest, no translation</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">OpenAI</td>
                    <td className="py-2 pr-4 font-mono text-xs">
                      gpt-4o-transcribe
                    </td>
                    <td className="py-2">Highest accuracy</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-4">OpenAI</td>
                    <td className="py-2 pr-4 font-mono text-xs">
                      gpt-4o-mini-transcribe
                    </td>
                    <td className="py-2">Lower cost, good quality</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">OpenAI</td>
                    <td className="py-2 pr-4 font-mono text-xs">whisper-1</td>
                    <td className="py-2">Classic, supports translation</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Configure cloud providers in Settings or during the Welcome
              Wizard.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">System-Wide Dictation</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Use a global hotkey to start and stop recording from any app.
              Transcribed text is automatically pasted into the active text
              field. The default hotkey is Ctrl+Shift+F9 - you can change it in
              Settings &gt; Hotkey. Three independent hotkeys can be configured:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                &bull; <strong>Hybrid</strong> - Short press toggles recording
                on/off, long press activates push-to-talk. Best of both worlds.
              </li>
              <li>
                &bull; <strong>Toggle</strong> - Press the hotkey once to start
                recording, press again to stop. Good for longer dictation where
                you want hands-free recording.
              </li>
              <li>
                &bull; <strong>Push-to-Talk</strong> - Hold the hotkey to
                record, release to stop and transcribe. Ideal for quick messages
                or when you want precise control over recording duration.
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Live Partial Results</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Silero VAD detects speech segments during recording and transcribes
              them in real time. A floating overlay shows partial transcription
              results before you stop recording, so you get immediate feedback as
              you speak.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">File Transcription</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Transcribe audio and video files directly within the app. Drag and
              drop files onto the TypeWhisper window, or use the file picker to
              select them.
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <li>
                &bull; <strong>Supported formats</strong> - WAV, MP3, M4A, AAC,
                OGG, FLAC, WMA, MP4, MKV, AVI, MOV, WebM
              </li>
              <li>
                &bull; <strong>Batch processing</strong> - Queue multiple files
                and transcribe them sequentially
              </li>
              <li>
                &bull; <strong>Export</strong> - Save results as TXT, SRT, or
                WebVTT subtitles with accurate timestamps
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Translation</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              TypeWhisper supports three translation methods:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                &bull; <strong>Canary on-device</strong> - Translation between
                English, German, French, and Spanish using the Canary 180M Flash
                model. Fully offline.
              </li>
              <li>
                &bull; <strong>Marian on-device</strong> - Local ONNX
                translation model supporting 20 target languages: EN, DE, FR,
                ES, IT, NL, PL, SV, DA, FI, CS, RU, UK, HU, JA, ZH, AR, HI,
                VI, ID. No internet required.
              </li>
              <li>
                &bull; <strong>Cloud LLM</strong> - Groq (Llama 3.3 70B) or
                OpenAI (GPT-4o-mini) for any language pair. Requires an API key.
              </li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Set translation options in Settings or configure them per-app
              using Profiles.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Dictionary</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Custom term corrections applied automatically after transcription.
              Fix names, jargon, or recurring misrecognitions. Supports regex
              patterns for advanced replacements.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              13 built-in term packs are included: Web Dev, .NET/C#, DevOps,
              Data &amp; AI, Design, Game Dev, Mobile, Security, Databases,
              Medical, Legal, Finance, and Music Production.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Snippets</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Text shortcuts that expand automatically. Define a trigger word and
              its replacement text. Supports dynamic placeholders:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <li>
                &bull;{" "}
                <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                  {"{date}"}
                </code>
                ,{" "}
                <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                  {"{time}"}
                </code>
                ,{" "}
                <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                  {"{datetime}"}
                </code>{" "}
                - Current date/time (custom formats supported, e.g.{" "}
                <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                  {"{date:dd.MM.yyyy}"}
                </code>
                )
              </li>
              <li>
                &bull;{" "}
                <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                  {"{clipboard}"}
                </code>{" "}
                - Current clipboard content
              </li>
              <li>
                &bull;{" "}
                <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                  {"{day}"}
                </code>
                ,{" "}
                <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                  {"{year}"}
                </code>{" "}
                - Current day name or year
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Whisper Mode</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Boost microphone gain for quiet speech or noisy environments. When
              enabled, TypeWhisper amplifies the microphone input so you can
              speak softly and still get accurate transcriptions - useful in
              shared offices, libraries, or late-night sessions. Toggle it
              per-profile or globally in settings.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Audio &amp; Recording</h2>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>
                &bull; <strong>Audio Ducking</strong> - Automatically reduces
                system volume while recording to minimize background noise from
                other applications.
              </li>
              <li>
                &bull; <strong>Media Pause</strong> - Automatically pauses media
                playback (music, videos) during recording and resumes when done.
              </li>
              <li>
                &bull; <strong>Audio Normalization</strong> - Automatic gain
                control for consistent input levels, regardless of how close you
                are to the microphone.
              </li>
              <li>
                &bull; <strong>Silence Detection</strong> - Automatically stops
                recording after a configurable silence period, so you
                don&apos;t have to press the hotkey again.
              </li>
              <li>
                &bull; <strong>Sound Feedback</strong> - Audio cues for
                recording start and stop, so you know when TypeWhisper is
                listening.
              </li>
              <li>
                &bull; <strong>Non-blocking Pipeline</strong> - Multiple
                recordings can be queued while transcription runs in the
                background. Start your next recording before the previous one
                finishes processing.
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">
              Dashboard &amp; History
            </h2>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>
                &bull; <strong>Dashboard</strong> - Usage statistics showing
                total words, recording duration, and number of transcriptions
                with an activity chart.
              </li>
              <li>
                &bull; <strong>Transcription History</strong> - All
                transcriptions are saved locally with timestamps, the app they
                were dictated into, and which engine/model was used. Search and
                browse your history. Edit transcriptions inline and see
                correction detection that highlights differences between the
                original and edited text.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}

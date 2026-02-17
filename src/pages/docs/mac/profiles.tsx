import { DocsLayout } from "@/components/layout/docs-layout";

export default function DocsMacProfiles() {
  return (
    <DocsLayout>
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Profiles
        </h1>
        <p className="mt-3 text-muted-foreground">
          Configure per-application transcription settings that activate
          automatically.
        </p>

        <div className="mt-8 space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">How Profiles Work</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              When you start dictating, TypeWhisper matches the active
              application&apos;s bundle ID against your profiles. For
              browser-based apps, it also matches the current domain. If a match
              is found, the profile&apos;s overrides are applied automatically.
              The active profile name is shown as a badge in the recording
              overlay.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Matching</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Profiles match using the app&apos;s bundle ID (e.g.,{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                com.apple.mail
              </code>
              ) and optionally a domain for browser tabs (e.g.,{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                github.com
              </code>
              ). Subdomain matching is supported - a rule for{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                github.com
              </code>{" "}
              also matches{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                gist.github.com
              </code>
              .
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Priority</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              When multiple profiles could match, the most specific one wins:
            </p>
            <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground list-decimal list-inside">
              <li>Bundle ID + Domain (most specific)</li>
              <li>Bundle ID only</li>
              <li>Default settings (fallback)</li>
            </ol>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Creating a Profile</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Go to Settings &gt; Profiles and click &quot;Add Profile&quot;.
              Assign one or more applications, then configure your overrides:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <li>
                &bull; <strong>Language</strong> - Override the transcription
                language
              </li>
              <li>
                &bull; <strong>Task</strong> - Transcribe or Translate
                (WhisperKit only)
              </li>
              <li>
                &bull; <strong>Engine</strong> - WhisperKit, Parakeet TDT, or
                Apple Speech (macOS 26+)
              </li>
              <li>
                &bull; <strong>Whisper Mode</strong> - Boosted microphone gain
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Example Setups</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-md bg-background p-4">
                <p className="text-sm font-semibold">Mail - German</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Language: German, Engine: WhisperKit, Model: Large v3
                </p>
              </div>
              <div className="rounded-md bg-background p-4">
                <p className="text-sm font-semibold">Slack - English</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Language: English, Engine: Parakeet TDT v3
                </p>
              </div>
              <div className="rounded-md bg-background p-4">
                <p className="text-sm font-semibold">Terminal - Whisper Mode</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Whisper Mode: Always on
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}

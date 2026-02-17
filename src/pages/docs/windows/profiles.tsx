import { DocsLayout } from "@/components/layout/docs-layout";

export default function DocsWindowsProfiles() {
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
              application&apos;s process name against your profiles. For
              browser-based apps, it also matches URL patterns. If a match is
              found, the profile&apos;s overrides are applied automatically. The
              active profile name is shown as a badge in the recording overlay.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Matching</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Profiles match using the process name (e.g.,{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                chrome.exe
              </code>
              ,{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                outlook.exe
              </code>
              ) and optionally a URL pattern for browser tabs. URL patterns
              support wildcards - for example,{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                *.github.com
              </code>{" "}
              matches all GitHub subdomains.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Priority</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              When multiple profiles could match, the most specific one wins:
            </p>
            <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground list-decimal list-inside">
              <li>Process Name + URL Pattern (most specific)</li>
              <li>Process Name only</li>
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
              </li>
              <li>
                &bull; <strong>Engine</strong> - Parakeet TDT 0.6B or Canary
                180M Flash
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
                <p className="text-sm font-semibold">Chrome - GitHub</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Process: chrome.exe, URL: *.github.com, Language: English
                </p>
              </div>
              <div className="rounded-md bg-background p-4">
                <p className="text-sm font-semibold">Outlook - German</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Process: outlook.exe, Language: German, Engine: Canary 180M
                  Flash
                </p>
              </div>
              <div className="rounded-md bg-background p-4">
                <p className="text-sm font-semibold">
                  Terminal - Whisper Mode
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Process: WindowsTerminal.exe, Whisper Mode: Always on
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Settings Location</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Profile configuration is stored in{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                %LOCALAPPDATA%\TypeWhisper\settings.json
              </code>
              .
            </p>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}

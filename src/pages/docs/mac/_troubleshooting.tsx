import { useState } from "react";
import { Copy, Check } from "lucide-react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copy}
      className="ml-4 shrink-0 text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Copy command"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </button>
  );
}

export default function DocsMacTroubleshooting() {
  return (
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Troubleshooting
        </h1>
        <p className="mt-3 text-muted-foreground">
          Common issues and how to fix them.
        </p>

        {/* Text not inserted */}
        <div className="mt-8 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            Transcription works but text is not inserted
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            If you see streaming text in the notch indicator but nothing appears
            in your target app, the issue is almost always a missing or stale{" "}
            <strong className="text-foreground">Accessibility</strong>{" "}
            permission. TypeWhisper needs two separate permissions: Microphone
            (for recording) and Accessibility (for inserting text). Many users
            only grant Microphone and miss the second one.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Another sign of this issue is that your{" "}
            <strong className="text-foreground">history stays empty</strong> -
            history entries are only saved after text insertion succeeds.
          </p>

          <h3 className="mt-5 text-sm font-semibold">How to fix</h3>
          <ol className="mt-2 space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>
              Open{" "}
              <strong className="text-foreground">
                System Settings &gt; Privacy &amp; Security &gt; Accessibility
              </strong>
            </li>
            <li>
              If TypeWhisper is listed, remove it (click the minus button)
            </li>
            <li>Restart TypeWhisper - it will re-prompt for permission</li>
          </ol>

          <p className="mt-4 text-sm text-muted-foreground">
            If that doesn't work, the TCC database entry may be stale. Reset it
            via Terminal:
          </p>
          <div className="mt-2 flex items-center justify-between rounded-md bg-background p-4 font-mono text-sm">
            <p>tccutil reset Accessibility com.typewhisper.mac</p>
            <CopyButton text="tccutil reset Accessibility com.typewhisper.mac" />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Then restart TypeWhisper and grant Accessibility permission when
            prompted.
          </p>
        </div>

        {/* Microphone permission */}
        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            Microphone permission not working
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            If TypeWhisper can't start recording, check{" "}
            <strong className="text-foreground">
              System Settings &gt; Privacy &amp; Security &gt; Microphone
            </strong>{" "}
            and make sure TypeWhisper is listed and enabled.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            On macOS 26 (Tahoe) and later, the Microphone permission dialog only
            appears once. If you denied it the first time, you need to enable it
            manually in System Settings. If toggling doesn't help, reset it:
          </p>
          <div className="mt-2 flex items-center justify-between rounded-md bg-background p-4 font-mono text-sm">
            <p>tccutil reset Microphone com.typewhisper.mac</p>
            <CopyButton text="tccutil reset Microphone com.typewhisper.mac" />
          </div>
        </div>

        {/* Permissions after reinstall */}
        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            Permissions broken after reinstall
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            macOS ties permissions to the app's code signature. After
            reinstalling or updating TypeWhisper, old permission entries can
            become stale - the toggle appears enabled but the permission doesn't
            actually work.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Fix: Remove TypeWhisper from both the Accessibility and Microphone
            lists in System Settings, restart the app, and re-grant both
            permissions.
          </p>
        </div>

        {/* Setup wizard */}
        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            Setup wizard keeps appearing
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            The setup wizard appears automatically when Microphone permission is
            not granted. Once you grant both Microphone and Accessibility
            permissions and complete the wizard, it won't appear again.
          </p>
        </div>

        {/* No audio input */}
        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">No audio input detected</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            If TypeWhisper shows "No audio input available", make sure your
            microphone is connected and selected. Go to{" "}
            <strong className="text-foreground">
              Settings &gt; Recording
            </strong>{" "}
            and pick the correct input device. If using an external microphone,
            check that it's recognized in System Settings &gt; Sound &gt; Input.
          </p>
        </div>
      </div>
  );
}

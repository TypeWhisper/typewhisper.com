import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function DocsMacInstallation() {
  const [copied, setCopied] = useState(false);

  function copyCommand() {
    navigator.clipboard.writeText(
      "brew install --cask typewhisper/tap/typewhisper",
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Installation
        </h1>
        <p className="mt-3 text-muted-foreground">
          Install the stable macOS 1.0 release.
        </p>

        <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <h2 className="text-lg font-semibold">macOS 1.0</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            macOS is the officially supported TypeWhisper 1.0 release path.
            The core workflow covers system-wide dictation, file transcription,
            prompts, profiles, history, dictionary, snippets, and bundled
            integrations.
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">System Requirements</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>&bull; macOS 14.0 (Sonoma) or later</li>
            <li>&bull; Apple Silicon recommended, Intel supported</li>
            <li>&bull; 8 GB RAM minimum, 16 GB+ recommended</li>
            <li>&bull; Apple Translate features require macOS 15+</li>
            <li>&bull; Apple Intelligence and SpeechAnalyzer require macOS 26+</li>
          </ul>
        </div>

        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">Download</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Download the latest stable DMG from{" "}
            <a
              href="https://github.com/TypeWhisper/typewhisper-mac/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              typewhisper-mac releases
            </a>
            {" "}or install via Homebrew below.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Release candidates and daily builds stay on preview channels and do
            not flow through Homebrew. For most users, the latest stable release
            is the right choice.
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">Homebrew</h2>
          <div className="mt-3 flex items-center justify-between rounded-md bg-background p-4 font-mono text-sm">
            <p>brew install --cask typewhisper/tap/typewhisper</p>
            <button
              onClick={copyCommand}
              className="ml-4 shrink-0 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Copy command"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">Build from Source</h2>
          <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm">
            <p className="text-muted-foreground"># Clone and open in Xcode</p>
            <p>git clone https://github.com/TypeWhisper/typewhisper-mac.git</p>
            <p>cd typewhisper-mac</p>
            <p className="mt-2 text-muted-foreground"># Requires Xcode 16+</p>
            <p>open TypeWhisper.xcodeproj</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">First Launch</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            TypeWhisper appears as an icon in the menu bar. Open Settings to
            download your first model, configure your hotkey, and grant
            Microphone plus Accessibility access. Once that is done, you can
            complete your first dictation immediately.
          </p>
        </div>
      </div>
  );
}

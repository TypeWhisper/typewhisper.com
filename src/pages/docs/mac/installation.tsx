import { DocsLayout } from "@/components/layout/docs-layout";
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
    <DocsLayout>
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Installation
        </h1>
        <p className="mt-3 text-muted-foreground">
          Get TypeWhisper running on macOS.
        </p>

        <div className="mt-8 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">System Requirements</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>&bull; macOS 15.0 (Sequoia) or later</li>
            <li>&bull; Intel and Apple Silicon supported</li>
            <li>&bull; 8 GB RAM minimum, 16 GB+ recommended</li>
            <li>&bull; Apple SpeechAnalyzer engine requires macOS 26+</li>
          </ul>
        </div>

        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">Download</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Download the latest build from{" "}
            <a
              href="https://github.com/TypeWhisper/typewhisper-mac/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              typewhisper-mac releases
            </a>
            .
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
            download your first model, configure your hotkey, and grant the
            required permissions (Accessibility and Microphone).
          </p>
        </div>
      </div>
    </DocsLayout>
  );
}

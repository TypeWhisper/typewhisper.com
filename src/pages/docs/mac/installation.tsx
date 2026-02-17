import { DocsLayout } from "@/components/layout/docs-layout";

export default function DocsMacInstallation() {
  return (
    <DocsLayout>
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Installation
        </h1>
        <p className="mt-3 text-muted-foreground">
          Get TypeWhisper running on macOS.
        </p>

        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">System Requirements</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>&bull; Macs from 2020 or newer</li>
            <li>&bull; Intel and Apple Silicon supported</li>
            <li>&bull; 8 GB RAM minimum, 16 GB+ recommended</li>
          </ul>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-6">
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

        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Build from Source</h2>
          <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm">
            <p className="text-muted-foreground"># Clone and open in Xcode</p>
            <p>git clone https://github.com/TypeWhisper/typewhisper-mac.git</p>
            <p>cd typewhisper-mac</p>
            <p className="mt-2 text-muted-foreground"># Requires Xcode 16+</p>
            <p>open TypeWhisper.xcodeproj</p>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-6">
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

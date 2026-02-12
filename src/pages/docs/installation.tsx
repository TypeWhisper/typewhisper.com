import { DocsLayout } from "@/components/layout/docs-layout";

export default function DocsInstallation() {
  return (
    <DocsLayout>
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Installation
        </h1>
        <p className="mt-3 text-muted-foreground">
          Get TypeWhisper running on your Mac.
        </p>

        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">System Requirements</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>&bull; macOS 15.0 (Sequoia) or later</li>
            <li>&bull; Apple Silicon (M1 or later) recommended</li>
            <li>&bull; 8 GB RAM minimum, 16 GB+ recommended for larger models</li>
          </ul>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Download</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Download the latest release from{" "}
            <a
              href="https://github.com/TypeWhisper/typewhisper-mac/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub Releases
            </a>
            . Open the DMG, drag TypeWhisper to Applications, and launch it.
          </p>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Build from Source</h2>
          <div className="mt-4 rounded-md bg-background p-4 font-mono text-sm">
            <p className="text-muted-foreground"># Clone the repository</p>
            <p>git clone https://github.com/TypeWhisper/typewhisper-mac.git</p>
            <p>cd typewhisper-mac</p>
            <p className="mt-2 text-muted-foreground"># Open in Xcode 16+</p>
            <p>open TypeWhisper.xcodeproj</p>
            <p className="mt-2 text-muted-foreground"># Build and run (Cmd+R)</p>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Swift Package dependencies (WhisperKit, FluidAudio, KeyboardShortcuts)
            resolve automatically.
          </p>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">First Launch</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            TypeWhisper appears as a menu bar icon. Open Settings to download your
            first model, configure your hotkey, and grant Accessibility permissions.
          </p>
        </div>
      </div>
    </DocsLayout>
  );
}

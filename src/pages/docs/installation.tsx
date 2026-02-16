import { DocsLayout } from "@/components/layout/docs-layout";

export default function DocsInstallation() {
  return (
    <DocsLayout>
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Installation
        </h1>
        <p className="mt-3 text-muted-foreground">
          Get TypeWhisper running on macOS or Windows.
        </p>

        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">System Requirements</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-border/80 bg-background p-4">
              <p className="text-sm font-semibold text-foreground">macOS</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>&bull; Works on Macs from 2020+</li>
                <li>&bull; Intel and Apple Silicon supported</li>
                <li>&bull; 8 GB RAM minimum, 16 GB+ recommended</li>
              </ul>
            </div>
            <div className="rounded-md border border-border/80 bg-background p-4">
              <p className="text-sm font-semibold text-foreground">Windows</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>&bull; Windows 10 or Windows 11 (64-bit)</li>
                <li>&bull; x64 and ARM64 builds available</li>
                <li>&bull; 8 GB RAM minimum, 16 GB+ recommended</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Download</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              &bull; macOS: download the latest build from{" "}
              <a
                href="https://github.com/TypeWhisper/typewhisper-mac/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                typewhisper-mac releases
              </a>
            </li>
            <li>
              &bull; Windows: download the latest build from{" "}
              <a
                href="https://github.com/TypeWhisper/typewhisper-win/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                typewhisper-win releases
              </a>
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            You can download both builds from any system.
          </p>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Build from Source</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md bg-background p-4 font-mono text-sm">
              <p className="text-muted-foreground"># macOS</p>
              <p>git clone https://github.com/TypeWhisper/typewhisper-mac.git</p>
              <p>cd typewhisper-mac</p>
              <p className="mt-2 text-muted-foreground"># Open in Xcode 16+</p>
              <p>open TypeWhisper.xcodeproj</p>
            </div>
            <div className="rounded-md bg-background p-4 font-mono text-sm">
              <p className="text-muted-foreground"># Windows</p>
              <p>git clone https://github.com/TypeWhisper/typewhisper-win.git</p>
              <p>cd typewhisper-win</p>
              <p className="mt-2 text-muted-foreground"># Build with .NET SDK</p>
              <p>dotnet build</p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">First Launch</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            On macOS, TypeWhisper appears in the menu bar. On Windows, it appears
            in the system tray. Open Settings to download your first model,
            configure your hotkey, and grant the required permissions.
          </p>
        </div>
      </div>
    </DocsLayout>
  );
}

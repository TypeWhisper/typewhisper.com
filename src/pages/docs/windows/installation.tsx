import { DocsLayout } from "@/components/layout/docs-layout";

export default function DocsWindowsInstallation() {
  return (
    <DocsLayout>
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Installation
        </h1>
        <p className="mt-3 text-muted-foreground">
          Get TypeWhisper running on Windows.
        </p>

        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">System Requirements</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>&bull; Windows 10 or Windows 11 (64-bit)</li>
            <li>&bull; x64 and ARM64 builds available</li>
            <li>&bull; 8 GB RAM minimum, 16 GB+ recommended</li>
          </ul>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Download</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Download the latest build from{" "}
            <a
              href="https://github.com/TypeWhisper/typewhisper-win/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              typewhisper-win releases
            </a>
            .
          </p>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Build from Source</h2>
          <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm">
            <p className="text-muted-foreground"># Clone and build</p>
            <p>git clone https://github.com/TypeWhisper/typewhisper-win.git</p>
            <p>cd typewhisper-win</p>
            <p className="mt-2 text-muted-foreground">
              # Requires .NET 10 SDK
            </p>
            <p>dotnet build</p>
            <p>dotnet run --project src/TypeWhisper.Windows</p>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">First Launch</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            TypeWhisper appears as an icon in the system tray. Open Settings to
            download your first model, configure your hotkey, and grant
            microphone access.
          </p>
        </div>
      </div>
    </DocsLayout>
  );
}

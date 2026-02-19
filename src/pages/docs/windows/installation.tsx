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
            <li>
              &bull; ~700 MB disk space for the Parakeet model, ~200 MB for
              Canary
            </li>
            <li>
              &bull; CPU-only inference - no dedicated GPU required. All local
              processing runs on your CPU using optimized ONNX Runtime with int8
              quantization.
            </li>
          </ul>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Download</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Download the latest{" "}
            <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
              .exe
            </code>{" "}
            installer from{" "}
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
          <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground list-decimal list-inside">
            <li>
              Download the{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                TypeWhisper-Setup.exe
              </code>{" "}
              file from the latest release.
            </li>
            <li>
              Run the installer. Windows SmartScreen may show a warning since
              the app is not code-signed yet - click &quot;More info&quot; and
              then &quot;Run anyway&quot;.
            </li>
            <li>Follow the setup wizard to complete installation.</li>
            <li>
              TypeWhisper will launch automatically and appear in your system
              tray.
            </li>
          </ol>
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
            On first launch, a Welcome Wizard guides you through setup in 5
            steps:
          </p>
          <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground list-decimal list-inside">
            <li>
              <strong>Model selection</strong> - Choose and download a local
              speech recognition model (Parakeet for general use, Canary for
              multilingual with translation).
            </li>
            <li>
              <strong>Cloud providers (optional)</strong> - Connect Groq or
              OpenAI for cloud-based transcription. You can skip this and use
              only on-device models.
            </li>
            <li>
              <strong>Microphone test</strong> - Verify your microphone works
              and grant Windows microphone permission.
            </li>
            <li>
              <strong>Hotkey setup</strong> - Configure your global hotkey. The
              default is Ctrl+Shift+F9.
            </li>
            <li>
              <strong>Try it out</strong> - Test your setup with a quick
              dictation.
            </li>
          </ol>
          <p className="mt-3 text-sm text-muted-foreground">
            After the wizard, TypeWhisper runs in the system tray (bottom-right
            corner of your taskbar). Right-click the tray icon to access
            Settings.
          </p>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Windows Autostart</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            TypeWhisper can optionally start with Windows. Enable this in
            Settings so it is always ready when you need it. The setting adds a
            registry entry to launch TypeWhisper on login.
          </p>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Update</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            TypeWhisper includes built-in auto-updates via Velopack. When a new
            version is available, you will see a notification in the app. Updates
            are downloaded and applied automatically.
          </p>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Uninstall</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Open Windows Settings &gt; Apps &gt; Installed Apps, find
            TypeWhisper, and click &quot;Uninstall&quot;. This removes the
            application. Downloaded models and settings are stored in{" "}
            <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
              %LOCALAPPDATA%\TypeWhisper
            </code>{" "}
            and can be deleted manually if you want a clean removal.
          </p>
        </div>
      </div>
    </DocsLayout>
  );
}

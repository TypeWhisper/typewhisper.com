import type { Locale } from "@/i18n/index";

export default function DocsWindowsInstallation({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";

  const requirements = isDe
    ? [
        "Windows 10 oder Windows 11 (64-Bit)",
        "x64- und ARM64-Builds verfügbar",
        "8 GB RAM Minimum, 16 GB+ empfohlen",
        "~700 MB Speicherplatz für das Parakeet-Modell, ~200 MB für Canary",
        "Nur CPU-Inferenz - keine dedizierte GPU erforderlich. Die gesamte lokale Verarbeitung läuft auf deiner CPU mit optimierter ONNX Runtime und int8-Quantisierung.",
      ]
    : [
        "Windows 10 or Windows 11 (64-bit)",
        "x64 and ARM64 builds available",
        "8 GB RAM minimum, 16 GB+ recommended",
        "~700 MB disk space for the Parakeet model, ~200 MB for Canary",
        "CPU-only inference - no dedicated GPU required. All local processing runs on your CPU using optimized ONNX Runtime with int8 quantization.",
      ];

  const downloadSteps = isDe
    ? [
        <>
          Lade die Datei{" "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            TypeWhisper-Setup.exe
          </code>{" "}
          aus dem neuesten Release herunter.
        </>,
        <>
          Starte den Installer. Windows SmartScreen kann eine Warnung anzeigen,
          da die App noch nicht code-signiert ist - klicke auf &quot;More
          info&quot; und dann auf &quot;Run anyway&quot;.
        </>,
        "Folge dem Setup-Assistenten, um die Installation abzuschließen.",
        "TypeWhisper startet danach automatisch und erscheint im System Tray.",
      ]
    : [
        <>
          Download the{" "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            TypeWhisper-Setup.exe
          </code>{" "}
          file from the latest release.
        </>,
        <>
          Run the installer. Windows SmartScreen may show a warning since the
          app is not code-signed yet - click &quot;More info&quot; and then
          &quot;Run anyway&quot;.
        </>,
        "Follow the setup wizard to complete installation.",
        "TypeWhisper will launch automatically and appear in your system tray.",
      ];

  const firstLaunchSteps = isDe
    ? [
        <>
          <strong>Modellauswahl</strong> - Wähle ein lokales
          Spracherkennungsmodell und lade es herunter (Parakeet für allgemeine
          Nutzung, Canary für mehrsprachige Nutzung mit Übersetzung).
        </>,
        <>
          <strong>Cloud-Provider (optional)</strong> - Verbinde Groq oder
          OpenAI für cloudbasierte Transkription. Du kannst diesen Schritt
          überspringen und nur On-Device-Modelle verwenden.
        </>,
        <>
          <strong>Mikrofontest</strong> - Prüfe, ob dein Mikrofon funktioniert,
          und erteile die Windows-Mikrofonberechtigung.
        </>,
        <>
          <strong>Hotkey-Setup</strong> - Konfiguriere deinen globalen Hotkey.
          Standardmäßig ist das Ctrl+Shift+F9.
        </>,
        <>
          <strong>Ausprobieren</strong> - Teste dein Setup mit einer kurzen
          Diktierprobe.
        </>,
      ]
    : [
        <>
          <strong>Model selection</strong> - Choose and download a local speech
          recognition model (Parakeet for general use, Canary for multilingual
          with translation).
        </>,
        <>
          <strong>Cloud providers (optional)</strong> - Connect Groq or OpenAI
          for cloud-based transcription. You can skip this and use only
          on-device models.
        </>,
        <>
          <strong>Microphone test</strong> - Verify your microphone works and
          grant Windows microphone permission.
        </>,
        <>
          <strong>Hotkey setup</strong> - Configure your global hotkey. The
          default is Ctrl+Shift+F9.
        </>,
        <>
          <strong>Try it out</strong> - Test your setup with a quick dictation.
        </>,
      ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">
        {isDe ? "Installation" : "Installation"}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {isDe
          ? "Bringe die aktuelle Windows-Beta zum Laufen."
          : "Get the current Windows beta up and running."}
      </p>

      <div className="mt-8 rounded-2xl bg-card p-6">
        <h2 className="text-lg font-semibold">
          {isDe ? "Systemanforderungen" : "System Requirements"}
        </h2>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          {requirements.map((item) => (
            <li key={item}>&bull; {item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-2xl bg-card p-6">
        <h2 className="text-lg font-semibold">
          {isDe ? "Download" : "Download"}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          {isDe ? "Lade den neuesten Beta-" : "Download the latest beta "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            .exe
          </code>{" "}
          {isDe ? "Installer von " : "installer from "}
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
          {downloadSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="mt-6 rounded-2xl bg-card p-6">
        <h2 className="text-lg font-semibold">
          {isDe ? "Aus Quellcode bauen" : "Build from Source"}
        </h2>
        <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm">
          <p className="text-muted-foreground"># Clone and build</p>
          <p>git clone https://github.com/TypeWhisper/typewhisper-win.git</p>
          <p>cd typewhisper-win</p>
          <p className="mt-2 text-muted-foreground"># Requires .NET 10 SDK</p>
          <p>dotnet build</p>
          <p>dotnet run --project src/TypeWhisper.Windows</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-card p-6">
        <h2 className="text-lg font-semibold">
          {isDe ? "Erster Start" : "First Launch"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isDe
            ? "Beim ersten Start führt dich ein Welcome Wizard in 5 Schritten durch die Einrichtung:"
            : "On first launch, a Welcome Wizard guides you through setup in 5 steps:"}
        </p>
        <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground list-decimal list-inside">
          {firstLaunchSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-muted-foreground">
          {isDe
            ? "Nach dem Assistenten läuft TypeWhisper im System Tray (unten rechts in deiner Taskleiste). Öffne per Rechtsklick auf das Tray-Icon die Einstellungen."
            : "After the wizard, TypeWhisper runs in the system tray (bottom-right corner of your taskbar). Right-click the tray icon to access Settings."}
        </p>
      </div>

      <div className="mt-6 rounded-2xl bg-card p-6">
        <h2 className="text-lg font-semibold">
          {isDe ? "Windows-Autostart" : "Windows Autostart"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isDe
            ? "TypeWhisper kann optional zusammen mit Windows starten. Aktiviere dies in den Einstellungen, damit die App immer bereit ist, wenn du sie brauchst. Die Einstellung legt einen Registry-Eintrag an, um TypeWhisper beim Login zu starten."
            : "TypeWhisper can optionally start with Windows. Enable this in Settings so it is always ready when you need it. The setting adds a registry entry to launch TypeWhisper on login."}
        </p>
      </div>

      <div className="mt-6 rounded-2xl bg-card p-6">
        <h2 className="text-lg font-semibold">{isDe ? "Update" : "Update"}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isDe
            ? "TypeWhisper enthält eingebaute Auto-Updates über Velopack. Wenn eine neue Version verfügbar ist, siehst du einen Hinweis in der App. Updates werden automatisch heruntergeladen und angewendet."
            : "TypeWhisper includes built-in auto-updates via Velopack. When a new version is available, you will see a notification in the app. Updates are downloaded and applied automatically."}
        </p>
      </div>

      <div className="mt-6 rounded-2xl bg-card p-6">
        <h2 className="text-lg font-semibold">
          {isDe ? "Deinstallieren" : "Uninstall"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isDe
            ? "Öffne Windows Settings > Apps > Installed Apps, suche TypeWhisper und klicke auf \"Uninstall\". Dadurch wird die Anwendung entfernt. Heruntergeladene Modelle und Einstellungen liegen unter "
            : "Open Windows Settings > Apps > Installed Apps, find TypeWhisper, and click \"Uninstall\". This removes the application. Downloaded models and settings are stored in "}
          <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
            %LOCALAPPDATA%\TypeWhisper
          </code>{" "}
          {isDe
            ? "und können manuell gelöscht werden, wenn du eine vollständige Bereinigung möchtest."
            : "and can be deleted manually if you want a clean removal."}
        </p>
      </div>
    </div>
  );
}

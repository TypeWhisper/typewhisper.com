import { Screenshot } from "@/components/ui/screenshot";
import { localePath, screenshotPath, type Locale } from "@/i18n/index";
import {
  getWindowsStoreUrl,
  windowsReleaseUrl,
  windowsSetupUrl,
} from "@/lib/platform-download";

const ARM64_SETUP_URL =
  "https://github.com/TypeWhisper/typewhisper-win/releases/latest/download/TypeWhisper-win-arm64-Setup.exe";

export default function DocsWindowsInstallation({ locale = "en" }: { locale?: Locale }) {
  const isDe = locale === "de";
  const windowsStoreUrl = getWindowsStoreUrl(locale);

  const requirements = isDe
    ? [
        "Windows 10 oder Windows 11 (64-Bit)",
        "x64- oder ARM64-Prozessor",
        "Ausreichend freier Speicher für die gewählten lokalen Modelle",
        "Optional: NVIDIA CUDA, AMD Vulkan oder AMD ROCm zur Beschleunigung unterstützter lokaler Modelle",
        "Internetverbindung für Installation, Modell- und Add-on-Downloads sowie Cloud-Engines",
      ]
    : [
        "Windows 10 or Windows 11 (64-bit)",
        "x64 or ARM64 processor",
        "Enough free disk space for your selected local models",
        "Optional: NVIDIA CUDA, AMD Vulkan, or AMD ROCm acceleration for supported local models",
        "Internet access for installation, model and add-on downloads, and cloud engines",
      ];

  const onboarding = isDe
    ? [
        ["Modelle und Erweiterungen", "Installiere eine Transkriptions-Engine, wähle ein Modell und entscheide, ob TypeWhisper mit Windows starten soll."],
        ["Mikrofon testen", "Wähle das Aufnahmegerät, erteile bei Bedarf die Windows-Mikrofonberechtigung und prüfe den Pegel."],
        ["Tastenkürzel einrichten", "Lege die globalen Tastenkürzel für Hybrid, Umschalten oder Gedrückthalten fest."],
        ["Ausprobieren", "Starte ein kurzes Testdiktat und prüfe, ob der Text im Zielfeld erscheint."],
      ]
    : [
        ["Models and extensions", "Install a transcription engine, choose a model, and decide whether TypeWhisper starts with Windows."],
        ["Test microphone", "Select the input device, grant Windows microphone permission if needed, and check the input level."],
        ["Configure hotkeys", "Set the global shortcuts for Hybrid, Toggle, or Hold mode."],
        ["Try it out", "Run a short test dictation and confirm that text appears in the target field."],
      ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">Installation</h1>
      <p className="mt-3 text-muted-foreground">
        {isDe
          ? "Installiere TypeWhisper über den Microsoft Store oder mit dem passenden GitHub-Installer und richte die App in vier Schritten ein."
          : "Install TypeWhisper from the Microsoft Store or with the matching GitHub installer, then complete the four-step setup."}
      </p>

      <Screenshot
        src={screenshotPath(locale, "/screenshots/windows/dashboard.png")}
        alt={isDe ? "TypeWhisper-Dashboard unter Windows" : "TypeWhisper dashboard on Windows"}
        className="mt-8 aspect-[31/20] w-full rounded-xl border border-border object-cover"
        loading="eager"
      />

      <div className="mt-8 space-y-6">
        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Systemanforderungen" : "System requirements"}
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {requirements.map((item) => <li key={item}>&bull; {item}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "1. App installieren" : "1. Install the app"}
          </h2>
          <h3 className="mt-4 text-sm font-semibold">
            {isDe ? "Empfohlen: Microsoft Store" : "Recommended: Microsoft Store"}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Der Store wählt die richtige Architektur, verwaltet Updates und vermeidet die bekannte SmartScreen-Warnung des direkten Installers."
              : "The Store selects the correct architecture, manages updates, and avoids the known SmartScreen warning shown for the direct installer."}
          </p>
          <a
            href={windowsStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-download-platform="windows"
            data-download-target="windows_store"
            data-tracking-placement="docs"
            className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
          >
            {isDe ? "TypeWhisper im Microsoft Store öffnen" : "Open TypeWhisper in the Microsoft Store"}
          </a>

          <h3 className="mt-6 text-sm font-semibold">
            {isDe ? "Alternative: GitHub-Installer" : "Alternative: GitHub installer"}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Wenn der Store nicht verfügbar ist, lade den Installer für deinen PC aus dem neuesten stabilen Release:"
              : "If the Store is unavailable, download the installer for your PC from the latest stable release:"}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a
              href={windowsSetupUrl}
              data-download-platform="windows"
              data-download-target="windows_github_installer"
              data-tracking-placement="docs"
              className="text-primary hover:underline"
            >
              TypeWhisper-win-x64-Setup.exe
            </a>
            <a href={ARM64_SETUP_URL} className="text-primary hover:underline">
              TypeWhisper-win-arm64-Setup.exe
            </a>
            <a href={windowsReleaseUrl} className="text-primary hover:underline">
              {isDe ? "Alle Releases" : "All releases"}
            </a>
          </div>

          <div className="mt-5 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">SmartScreen:</strong>{" "}
              {isDe
                ? "Beim direkten Installer kann Windows „Unbekannter Herausgeber“ anzeigen. Das ist für diesen Installationsweg bekannt. Fahre nur fort, wenn die Datei direkt aus dem offiziellen TypeWhisper-Release stammt und ihre SHA-256-Prüfsumme mit der beim Release veröffentlichten Prüfsumme übereinstimmt."
                : "Windows may show “Unknown publisher” for the direct installer. This is a known limitation of that installation path. Continue only when the file came directly from the official TypeWhisper release and its SHA-256 hash matches the hash published with that release."}
            </p>
            <div className="mt-3 overflow-x-auto rounded-md bg-background p-4 font-mono text-xs">
              Get-FileHash .\TypeWhisper-win-x64-Setup.exe -Algorithm SHA256
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {isDe ? "Hintergrund: " : "Background: "}
              <a
                href="https://github.com/TypeWhisper/typewhisper-win/issues/314"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub Issue #314
              </a>
            </p>
          </div>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "2. Vierstufiges Onboarding" : "2. Four-step onboarding"}
          </h2>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
            {onboarding.map(([title, description], index) => (
              <li key={title}>
                <strong className="text-foreground">{index + 1}. {title}</strong>
                <span className="block mt-1">{description}</span>
              </li>
            ))}
          </ol>
          <Screenshot
            src={screenshotPath(locale, "/screenshots/windows/onboarding.png")}
            alt={isDe ? "Vierstufiges TypeWhisper-Onboarding unter Windows" : "Four-step TypeWhisper onboarding on Windows"}
            className="mt-5 aspect-[31/20] w-full rounded-xl border border-border object-cover"
            loading="lazy"
          />
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Autostart und Updates" : "Startup and updates"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe
              ? "Bei einer neuen Installation ist „Mit Windows starten“ standardmäßig aktiviert; du kannst es im Onboarding oder später unter Einstellungen > Allgemein ändern. Store-Installationen erhalten Updates über den Microsoft Store, direkte Installationen über den integrierten Updater."
              : "For a new installation, Start with Windows is enabled by default. Change it during onboarding or later in Settings > General. Store installations update through the Microsoft Store; direct installations use the built-in updater."}
          </p>
        </section>

        <section className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {isDe ? "Datenablage und Deinstallation" : "Data location and uninstall"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isDe ? "Einstellungen, Modelle, Verlauf, Plugins und Aufnahmen liegen unter " : "Settings, models, history, plugins, and recordings are stored under "}
            <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">%LOCALAPPDATA%\TypeWhisper-UserData</code>.
            {" "}
            {isDe
              ? "Diese Nutzerdaten bleiben bei einer normalen App-Deinstallation erhalten."
              : "This user data remains after a normal app uninstall."}
          </p>
          <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-muted-foreground">
            <li>{isDe ? "Beende TypeWhisper über das Tray-Menü." : "Quit TypeWhisper from the tray menu."}</li>
            <li>{isDe ? "Öffne Windows-Einstellungen > Apps > Installierte Apps und deinstalliere TypeWhisper." : "Open Windows Settings > Apps > Installed apps and uninstall TypeWhisper."}</li>
            <li>{isDe ? "Für eine vollständige Bereinigung lösche den Ordner oben erst nach einer Sicherung wichtiger Daten." : "For a clean removal, back up anything important before deleting the folder above."}</li>
          </ol>
          <p className="mt-3 text-sm text-muted-foreground">
            <a href={localePath(locale, "/docs/windows/troubleshooting")} className="text-primary hover:underline">
              {isDe ? "Probleme bei Installation oder Start beheben" : "Troubleshoot installation or startup problems"}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

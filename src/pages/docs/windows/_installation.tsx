import { ArrowRight } from "lucide-react";
import {
  DocsCallout,
  DocsCode,
  DocsFigure,
  DocsSection,
  DocsSteps,
  DocsSubheading,
} from "@/components/docs/prose";
import { localePath, screenshotPath, t, type Locale } from "@/i18n/index";
import {
  getWindowsStoreUrl,
  windowsReleaseUrl,
  windowsSetupUrl,
} from "@/lib/platform-download";

const ARM64_SETUP_URL =
  "https://github.com/TypeWhisper/typewhisper-win/releases/latest/download/TypeWhisper-win-arm64-Setup.exe";

export function windowsInstallationHead(locale: Locale) {
  return {
    heading: "Installation",
    lede:
      locale === "de"
        ? "Installiere TypeWhisper über den Microsoft Store oder mit dem passenden GitHub-Installer und richte die App in vier Schritten ein."
        : "Install TypeWhisper from the Microsoft Store or with the matching GitHub installer, then complete the four-step setup.",
  };
}

export default function DocsWindowsInstallation({
  locale = "en",
}: {
  locale?: Locale;
}) {
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
    <>
      <DocsFigure
        kind="framed"
        src={screenshotPath(locale, "/screenshots/windows/dashboard.png")}
        alt={isDe ? "TypeWhisper-Dashboard unter Windows" : "TypeWhisper dashboard on Windows"}
        loading="eager"
      />

      <DocsSection
        id="requirements"
        title={isDe ? "Systemanforderungen" : "System requirements"}
      >
        <ul>
          {requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </DocsSection>

      <DocsSection
        id="install"
        title={isDe ? "1. App installieren" : "1. Install the app"}
      >
        <DocsSubheading id="microsoft-store">
          {isDe ? "Empfohlen: Microsoft Store" : "Recommended: Microsoft Store"}
        </DocsSubheading>
        <p>
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
          className="site-link"
        >
          {isDe ? "TypeWhisper im Microsoft Store öffnen" : "Open TypeWhisper in the Microsoft Store"}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>

        <DocsSubheading id="github-installer">
          {isDe ? "Alternative: GitHub-Installer" : "Alternative: GitHub installer"}
        </DocsSubheading>
        <p>
          {isDe
            ? "Wenn der Store nicht verfügbar ist, lade den Installer für deinen PC aus dem neuesten stabilen Release:"
            : "If the Store is unavailable, download the installer for your PC from the latest stable release:"}
        </p>
        <ul>
          <li>
            <a
              href={windowsSetupUrl}
              data-download-platform="windows"
              data-download-target="windows_github_installer"
              data-tracking-placement="docs"
            >
              TypeWhisper-win-x64-Setup.exe
            </a>
          </li>
          <li>
            <a
              href={ARM64_SETUP_URL}
              data-download-platform="windows"
              data-download-target="windows_github_installer_arm64"
              data-tracking-placement="docs"
            >
              TypeWhisper-win-arm64-Setup.exe
            </a>
          </li>
          <li>
            <a
              href={windowsReleaseUrl}
              data-download-platform="windows"
              data-download-target="windows_github_releases"
              data-tracking-placement="docs"
            >
              {isDe ? "Alle Releases" : "All releases"}
            </a>
          </li>
        </ul>

        <DocsCallout label={t(locale, "docs.callout.important")}>
          <p>
            <strong>SmartScreen:</strong>{" "}
            {isDe
              ? "Beim direkten Installer kann Windows „Unbekannter Herausgeber“ anzeigen. Das ist für diesen Installationsweg bekannt. Fahre nur fort, wenn die Datei direkt aus dem offiziellen TypeWhisper-Release stammt und ihre SHA-256-Prüfsumme mit der beim Release veröffentlichten Prüfsumme übereinstimmt."
              : "Windows may show “Unknown publisher” for the direct installer. This is a known limitation of that installation path. Continue only when the file came directly from the official TypeWhisper release and its SHA-256 hash matches the hash published with that release."}
          </p>
          <DocsCode
            locale={locale}
            lang="powershell"
            code={"Get-FileHash .\\TypeWhisper-win-x64-Setup.exe -Algorithm SHA256"}
          />
          <p>
            {isDe ? "Hintergrund: " : "Background: "}
            <a
              href="https://github.com/TypeWhisper/typewhisper-win/issues/314"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Issue #314
            </a>
          </p>
        </DocsCallout>
      </DocsSection>

      <DocsSection
        id="onboarding"
        title={isDe ? "2. Vierstufiges Onboarding" : "2. Four-step onboarding"}
      >
        <DocsSteps
          items={onboarding.map(([title, description]) => ({
            title,
            description,
          }))}
        />
        <DocsFigure
          kind="framed"
          src={screenshotPath(locale, "/screenshots/windows/onboarding.png")}
          alt={isDe ? "Vierstufiges TypeWhisper-Onboarding unter Windows" : "Four-step TypeWhisper onboarding on Windows"}
        />
      </DocsSection>

      <DocsSection
        id="startup-and-updates"
        title={isDe ? "Autostart und Updates" : "Startup and updates"}
      >
        <p>
          {isDe
            ? "Bei einer neuen Installation ist „Mit Windows starten“ standardmäßig aktiviert; du kannst es im Onboarding oder später unter Einstellungen > Allgemein ändern. Store-Installationen erhalten Updates über den Microsoft Store, direkte Installationen über den integrierten Updater."
            : "For a new installation, Start with Windows is enabled by default. Change it during onboarding or later in Settings > General. Store installations update through the Microsoft Store; direct installations use the built-in updater."}
        </p>
      </DocsSection>

      <DocsSection
        id="data-and-uninstall"
        title={isDe ? "Datenablage und Deinstallation" : "Data location and uninstall"}
      >
        <p>
          {isDe ? "Einstellungen, Modelle, Verlauf, Plugins und Aufnahmen liegen unter " : "Settings, models, history, plugins, and recordings are stored under "}
          <code>%LOCALAPPDATA%\TypeWhisper-UserData</code>.{" "}
          {isDe
            ? "Diese Nutzerdaten bleiben bei einer normalen App-Deinstallation erhalten."
            : "This user data remains after a normal app uninstall."}
        </p>
        <ol>
          <li>{isDe ? "Beende TypeWhisper über das Tray-Menü." : "Quit TypeWhisper from the tray menu."}</li>
          <li>{isDe ? "Öffne Windows-Einstellungen > Apps > Installierte Apps und deinstalliere TypeWhisper." : "Open Windows Settings > Apps > Installed apps and uninstall TypeWhisper."}</li>
          <li>{isDe ? "Für eine vollständige Bereinigung lösche den Ordner oben erst nach einer Sicherung wichtiger Daten." : "For a clean removal, back up anything important before deleting the folder above."}</li>
        </ol>
        <a
          href={localePath(locale, "/docs/windows/troubleshooting")}
          className="site-link"
        >
          {isDe ? "Probleme bei Installation oder Start beheben" : "Troubleshoot installation or startup problems"}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </DocsSection>
    </>
  );
}

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import {
  DocsCallout,
  DocsCode,
  DocsSection,
  DocsSubheading,
  DocsTable,
  withCode,
} from "@/components/docs/prose";
import { localePath, t, type Locale } from "@/i18n/index";
import { windowsLatestAssetUrl } from "@/lib/platform-download";

/*
 * Adapted from docs/enterprise/windows-managed-settings.md in typewhisper-win:
 * the installers, network hosts, microphone permission, and deployment notes.
 */

const msiUrl = windowsLatestAssetUrl("TypeWhisper-win-x64.msi");
const setupUrl = windowsLatestAssetUrl("TypeWhisper-win-x64-Setup.exe");
const dotnetUrl = "https://dotnet.microsoft.com/download/dotnet/10.0";

/** Hosts the app contacts itself: hosts, English purpose, German purpose. */
const appHosts: Array<[hosts: string[], en: string, de: string]> = [
  [
    ["api.polar.sh"],
    "Activation and validation of commercial license keys, including `ManagedLicenseKey`.",
    "Aktivierung und Prüfung kommerzieller Lizenzschlüssel, auch `ManagedLicenseKey`.",
  ],
  [
    ["app.typewhisper.com"],
    "Premium account sign-in and account status.",
    "Anmeldung beim Premium-Konto und Kontostatus.",
  ],
  [
    ["api.github.com", "github.com", "release-assets.githubusercontent.com"],
    "App update checks and downloads (unless `UpdateMode` is `0`), plugin package downloads, and the model and runtime files that some local plugins download from GitHub releases (Qwen3 ASR 0.6B, Parakeet Ultra, and the graphics card runtime of NVIDIA Parakeet).",
    "Prüfung und Download von App-Updates (außer bei `UpdateMode` `0`), Downloads von Plugin-Paketen sowie die Modell- und Laufzeitdateien, die manche lokalen Plugins aus GitHub-Releases laden (Qwen3 ASR 0.6B, Parakeet Ultra und die Grafikkarten-Laufzeit von NVIDIA Parakeet).",
  ],
  [
    ["typewhisper.github.io"],
    "The plugin catalog (`plugins-v2.json`).",
    "Der Plugin-Katalog (`plugins-v2.json`).",
  ],
  [
    ["huggingface.co", "*.hf.co"],
    "Model downloads of the local plugins: Parakeet (sherpa-onnx), dictionary boosting files, whisper.cpp, GigaAM, local text models, and local speech output. The host redirects to `*.hf.co` content hosts on several subdomain levels, such as `us.aws.cdn.hf.co` and `cas-server.xethub.hf.co`; the wildcard has to cover all of them.",
    "Modell-Downloads der lokalen Plugins: Parakeet (sherpa-onnx), Dateien für Wörterbuch-Boosting, whisper.cpp, GigaAM, lokale Textmodelle und lokale Sprachausgabe. Der Host leitet auf `*.hf.co`-Hosts über mehrere Subdomain-Ebenen weiter, etwa `us.aws.cdn.hf.co` und `cas-server.xethub.hf.co`; der Platzhalter muss alle abdecken.",
  ],
  [
    ["download.pytorch.org", "developer.download.nvidia.com", "api.nuget.org"],
    "Runtime files that some local plugins fetch while they load a model (Granite Speech, whisper.cpp with CUDA, ONNX runtimes). `AllowModelDownloads` does not cover them.",
    "Laufzeitdateien, die manche lokalen Plugins beim Laden eines Modells nachladen (Granite Speech, whisper.cpp mit CUDA, ONNX-Laufzeiten). `AllowModelDownloads` erfasst sie nicht.",
  ],
  [
    ["graph.microsoft.com", "www.googleapis.com"],
    "Calendar access for the meeting feature, only when a user connects a calendar.",
    "Kalenderzugriff für die Meeting-Funktion, nur wenn ein Benutzer einen Kalender verbindet.",
  ],
  [
    ["www.typewhisper.com"],
    "Documentation links opened in the browser.",
    "Dokumentationslinks, die im Browser geöffnet werden.",
  ],
];

/** Vendor hosts of the cloud plugins: plugin, hosts (backticks set code). */
const pluginHosts: Array<[plugin: string, en: string, de: string]> = [
  ["AssemblyAI", "`api.assemblyai.com`, `cdn.assemblyai.com`", ""],
  ["Cerebras", "`api.cerebras.ai`", ""],
  ["Claude", "`api.anthropic.com`", ""],
  ["Cloudflare ASR", "`api.cloudflare.com`", ""],
  ["Cohere", "`api.cohere.com`", ""],
  ["Deepgram", "`api.deepgram.com`", ""],
  ["ElevenLabs", "`api.elevenlabs.io`", ""],
  ["Fireworks", "`api.fireworks.ai`", ""],
  ["Gemini", "`generativelanguage.googleapis.com`", ""],
  [
    "GitHub Copilot",
    "`github.com` and `api.github.com` for sign-in, and the Copilot service hosts under `*.githubcopilot.com`; GitHub's Copilot allowlist reference lists every host",
    "`github.com` und `api.github.com` für die Anmeldung sowie die Copilot-Dienst-Hosts unter `*.githubcopilot.com`; GitHubs Copilot-Allowlist-Referenz nennt alle Hosts",
  ],
  ["Gladia", "`api.gladia.io`, `files.gladia.io`", ""],
  ["Groq", "`api.groq.com`", ""],
  ["Linear", "`api.linear.app`", ""],
  ["Meta", "`api.meta.ai`", ""],
  [
    "OpenAI",
    "`api.openai.com`; `auth.openai.com` and `chatgpt.com` for ChatGPT sign-in",
    "`api.openai.com`; `auth.openai.com` und `chatgpt.com` für die Anmeldung mit ChatGPT",
  ],
  ["OpenAI Compatible", "The configured endpoint", "Der konfigurierte Endpunkt"],
  ["OpenRouter", "`openrouter.ai`", ""],
  ["Reson8", "`api.reson8.dev`", ""],
  ["Smallest.ai", "`api.smallest.ai`", ""],
  ["Soniox", "`api.soniox.com`, `api.eu.soniox.com`, `api.jp.soniox.com`", ""],
  ["Speechmatics", "`eu1.asr.api.speechmatics.com`, `us1.asr.api.speechmatics.com`", ""],
  ["Voxtral (Mistral)", "`api.mistral.ai`", ""],
  ["xAI", "`api.x.ai`", ""],
  [
    "Authenticated CLI, Webhook, Script",
    "The command, CLI, or URL the user configures",
    "Der Befehl, die CLI oder die URL, die der Benutzer konfiguriert",
  ],
  [
    "Local plugins: Parakeet, whisper.cpp, local LLM, Gemma, Qwen, GigaAM, Cohere Transcribe, Granite Speech, Supertonic TTS",
    "`huggingface.co` and `*.hf.co` for most models, the GitHub hosts above for some; runtime hosts as above",
    "`huggingface.co` und `*.hf.co` für die meisten Modelle, für einige die GitHub-Hosts oben; Laufzeit-Hosts wie oben",
  ],
];

const msiCommands = (isDe: boolean) => `# ${isDe ? "Für alle Benutzer installieren" : "Install for all users"}
msiexec /i TypeWhisper-win-x64.msi /qn /norestart

# ${isDe ? "In einen anderen Ordner installieren" : "Install into another folder"}
msiexec /i TypeWhisper-win-x64.msi /qn /norestart VELOPACK_INSTALLDIR="D:\\Apps\\TypeWhisper"

# ${isDe ? "Mit dem Produktcode der installierten Version deinstallieren" : "Uninstall with the product code of the installed version"}
msiexec /x '{<product code>}' /qn /norestart`;

const dotnetCommands = (isDe: boolean) => `.\\dotnet-runtime-10.0.<patch>-win-x64.exe /install /quiet /norestart

# ${isDe ? "oder" : "or"}
winget install Microsoft.DotNet.Runtime.10`;

const perUserCommands = (isDe: boolean) => `# ${isDe ? "Für den aktuellen Benutzer installieren" : "Install for the current user"}
.\\TypeWhisper-win-x64-Setup.exe --silent

# ${isDe ? "Für den aktuellen Benutzer deinstallieren" : "Uninstall for the current user"}
& "$env:LOCALAPPDATA\\TypeWhisper\\Update.exe" --uninstall --silent`;

const hashCommand = `Get-FileHash .\\TypeWhisper-win-x64.msi -Algorithm SHA256`;

export function windowsDeploymentHead(locale: Locale) {
  return locale === "de"
    ? {
        heading: "Bereitstellung",
        lede: "Verteile TypeWhisper für Windows in deiner Organisation: für alle Benutzer eines Geräts oder pro Benutzer, mit Intune-Paketen, Netzwerk-Hosts für Allowlists und dem Mikrofonzugriff.",
      }
    : {
        heading: "Deployment",
        lede: "Roll out TypeWhisper for Windows across your organization: for all users of a device or per user, with Intune packages, network hosts for allowlists, and microphone access.",
      };
}

export default function DocsWindowsDeployment({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const isDe = locale === "de";
  const tx = <T extends ReactNode>(de: T, en: T) => (isDe ? de : en);
  const codeList = (values: string[]) =>
    values.map((value, index) => (
      <span key={value}>
        {index > 0 && ", "}
        <code>{value}</code>
      </span>
    ));
  const managedSettings = localePath(locale, "/docs/windows/managed-settings");

  return (
    <>
      <DocsCallout label={t(locale, "docs.callout.note")}>
        <p>
          {tx(
            "Der Installer für alle Benutzer (MSI) und die verwalteten Einstellungen gibt es ab TypeWhisper für Windows 1.2.",
            "The machine-wide installer (MSI) and managed settings are available from TypeWhisper for Windows 1.2.",
          )}
        </p>
      </DocsCallout>

      <DocsSection id="overview" title={tx("Überblick", "Overview")}>
        <p>{tx("Als Administrator legst du fest:", "As an administrator, you decide:")}</p>
        <ul>
          <li>
            {tx(
              "wie TypeWhisper installiert wird: einmal pro Gerät mit dem MSI oder pro Benutzer mit dem Setup,",
              "how TypeWhisper is installed: once per device with the MSI, or per user with the setup;",
            )}
          </li>
          <li>
            {tx("wie es eingestellt ist: Lizenz, Modelle, Cloud-Verarbeitung, Downloads, Updates und Start über ", "how it is configured: license, models, cloud processing, downloads, updates, and startup through ")}
            <a href={managedSettings}>
              {tx("verwaltete Einstellungen", "managed settings")}
            </a>
            {tx(",", ";")}
          </li>
          <li>
            {tx(
              "was es erreichen darf: die Netzwerk-Hosts unten und das Mikrofon.",
              "what it may reach: the network hosts below and the microphone.",
            )}
          </li>
        </ul>
        <p>
          {tx(
            "Jeder Windows-Benutzer behält Einstellungen, Modelle und Plugins in seinem eigenen Profil. Der Richtlinienschlüssel gilt dagegen für das ganze Gerät und damit für jeden Benutzer.",
            "Each Windows user keeps their own settings, models, and plugins in their profile. The policy key, in contrast, is device-wide and applies to every user.",
          )}
        </p>
      </DocsSection>

      <DocsSection id="installers" title={tx("Installer wählen", "Choose an installer")}>
        <DocsTable
          label={tx("Installer", "Installers")}
          head={[tx("Installer", "Installer"), tx("Geeignet für", "Suited for")]}
          rows={[
            [
              <code>TypeWhisper-win-x64.msi</code>,
              withCode(
                tx(
                  "Alle Benutzer eines Geräts. Installiert im Systemkontext nach `C:\\Program Files\\TypeWhisper` und wird über deine Softwareverteilung aktualisiert. Die richtige Wahl für gemeinsam genutzte Geräte.",
                  "All users of a device. Installs into `C:\\Program Files\\TypeWhisper` in the system context and is updated by your deployment. The right choice for shared devices.",
                ),
              ),
            ],
            [
              <code>TypeWhisper-win-x64-Setup.exe</code>,
              withCode(
                tx(
                  "Einen Windows-Benutzer. Installiert im Benutzerkontext nach `%LocalAppData%\\TypeWhisper` und aktualisiert sich selbst, solange `UpdateMode` nichts anderes vorgibt.",
                  "One Windows user. Installs into `%LocalAppData%\\TypeWhisper` in the user context and updates itself unless `UpdateMode` says otherwise.",
                ),
              ),
            ],
          ]}
        />
        <p>
          {tx(
            "Beide Dateien liegen im neuesten stabilen Release, jeweils mit einer .sha256-Datei zur Prüfung:",
            "Both files are attached to the latest stable release, each with a .sha256 file for verification:",
          )}
        </p>
        <ul>
          <li>
            <a
              href={msiUrl}
              data-download-platform="windows"
              data-download-target="windows_github_msi"
              data-tracking-placement="docs"
            >
              TypeWhisper-win-x64.msi
            </a>
          </li>
          <li>
            <a
              href={setupUrl}
              data-download-platform="windows"
              data-download-target="windows_github_installer"
              data-tracking-placement="docs"
            >
              TypeWhisper-win-x64-Setup.exe
            </a>
          </li>
        </ul>
        <DocsCode locale={locale} lang="powershell" code={hashCommand} />
        <DocsCallout label={t(locale, "docs.callout.important")}>
          <p>
            {tx(
              "Entferne Installationen pro Benutzer von den Geräten, bevor du das MSI ausrollst. Sonst sehen Benutzer zwei Einträge mit demselben Namen, und die Installation pro Benutzer aktualisiert sich weiter selbst.",
              "Remove per-user installations from the devices before you roll out the MSI. Otherwise users see two entries with the same name, and the per-user installation keeps updating itself.",
            )}
          </p>
        </DocsCallout>
      </DocsSection>

      <DocsSection
        id="msi"
        title={tx("Installation für alle Benutzer (MSI)", "Machine-wide installer (MSI)")}
      >
        <p>
          {withCode(
            tx(
              "Das MSI installiert TypeWhisper einmal für alle Benutzer eines Geräts nach `C:\\Program Files\\TypeWhisper` oder in den Ordner aus `VELOPACK_INSTALLDIR`. Es legt Verknüpfungen im Startmenü und auf dem Desktop für alle Benutzer an und registriert sich unter dem Deinstallationsschlüssel des Computers.",
              "The MSI installs TypeWhisper once for all users of a device into `C:\\Program Files\\TypeWhisper`, or into the folder given in `VELOPACK_INSTALLDIR`. It adds Start menu and desktop shortcuts for all users and registers under the machine's uninstall key.",
            ),
          )}
        </p>

        <p>
          {tx(
            "Wie das Setup ist auch das MSI von GitHub nicht codesigniert. Richtlinien zur Anwendungssteuerung, die eine Signatur verlangen, etwa App Control for Business oder AppLocker, brauchen dafür eine Ausnahme. Prüfe die Datei vorher mit ihrer SHA-256-Prüfsumme.",
            "Like the setup, the MSI from GitHub is not code-signed. Application control policies that require a signature, such as App Control for Business or AppLocker, need an exception for it. Verify the file with its SHA-256 hash first.",
          )}
        </p>

        <DocsSubheading id="dotnet">
          {tx("Voraussetzung: .NET 10 Runtime", "Prerequisite: .NET 10 Runtime")}
        </DocsSubheading>
        <p>
          {tx(
            "Das MSI braucht die .NET 10 Runtime (x64). Eine interaktive Installation bietet an, sie zu installieren; eine stille Installation tut das nicht. Verteile die Runtime daher zuerst, etwa als Abhängigkeit in Intune; dort muss sie selbst eine Win32-App sein. Den Installer gibt es bei ",
            "The MSI needs the .NET 10 Runtime (x64). An interactive installation offers to install it; a silent installation does not. Deploy the runtime first, for example as an Intune dependency, which has to be a Win32 app itself. The installer is available at ",
          )}
          <a href={dotnetUrl} target="_blank" rel="noopener noreferrer">
            dotnet.microsoft.com
          </a>
          .
        </p>
        <DocsCode locale={locale} lang="powershell" code={dotnetCommands(isDe)} />

        <DocsSubheading id="msi-commands">
          {tx("Installieren und deinstallieren", "Install and uninstall")}
        </DocsSubheading>
        <DocsCode locale={locale} lang="powershell" code={msiCommands(isDe)} />
        <p>
          {withCode(
            tx(
              "Der Produktcode ändert sich mit jeder Version. Du findest ihn in der Eigenschaft `ProductCode` des MSI oder auf einem Gerät mit installierter App im Wert `QuietUninstallString` unter `HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MSI:TypeWhisper`. Verpackst du das MSI für Intune, trägt Intune den Deinstallationsbefehl mit dem Produktcode selbst ein.",
              "The product code changes with every version. Read it from the MSI's `ProductCode` property, or on a device with the app installed from `QuietUninstallString` under `HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MSI:TypeWhisper`. When you package the MSI for Intune, Intune fills in the uninstall command with the product code.",
            ),
          )}
        </p>

        <DocsSubheading id="msi-updates">
          {tx("Updates", "Updates")}
        </DocsSubheading>
        <p>
          {withCode(
            tx(
              "Eine Installation für alle Benutzer wird über deine Softwareverteilung aktualisiert. Die App prüft nicht auf App-Updates, lädt und installiert keine, zeigt unter Einstellungen > Konto & Info „App-Updates werden über die Softwareverteilung deiner Organisation verwaltet.“ und sperrt den Update-Kanal. Dafür brauchst du kein `UpdateMode`. Setzt du es trotzdem, bleib bei `0` oder `1`: Standardbenutzer können nicht nach `Program Files` schreiben, eine aus der App gestartete Installation unter `2` schlägt daher fehl. Plugin-Updates sind nicht betroffen, weil Plugins im Benutzerprofil liegen.",
              "Your deployment updates a machine-wide installation. The app does not check for, download, or install app updates, shows “App updates are managed by your organization's deployment.” in Settings > Account & about, and locks the update channel. You don't need `UpdateMode` for this. If you set it anyway, keep it at `0` or `1`: standard users cannot write to `Program Files`, so an installation started from the app under `2` fails. Plugin updates are not affected, because plugins live in the user's profile.",
            ),
          )}
        </p>
        <p>
          {tx(
            "Für ein Upgrade verteilst du das neuere MSI auf dieselbe Weise, etwa über eine Ablösung (Supersedence) in Intune. Es ersetzt die installierte Version direkt. Ein Release Candidate zählt als niedrigere Version als das Stable-Release derselben Version.",
            "To upgrade, deploy the newer MSI the same way, for example through supersedence in Intune. It replaces the installed version in place. A Release Candidate sorts below the Stable release of the same version.",
          )}
        </p>

        <DocsSubheading id="msi-intune">
          {tx("Als Win32-App in Intune", "As an Intune Win32 app")}
        </DocsSubheading>
        <DocsTable
          label={tx("Intune-Paket für das MSI", "Intune package for the MSI")}
          head={[tx("Feld", "Item"), tx("Wert", "Value")]}
          rows={[
            [
              tx("Paket", "Package"),
              <code>IntuneWinAppUtil.exe -c &lt;folder&gt; -s TypeWhisper-win-x64.msi -o &lt;output&gt;</code>,
            ],
            [
              tx("Installationsbefehl", "Install command"),
              <code>msiexec /i TypeWhisper-win-x64.msi /qn /norestart</code>,
            ],
            [
              tx("Deinstallationsbefehl", "Uninstall command"),
              withCode(
                tx(
                  "`msiexec /x {<product code>} /qn /norestart`, von Intune vorausgefüllt",
                  "`msiexec /x {<product code>} /qn /norestart`, filled in by Intune",
                ),
              ),
            ],
            [tx("Installationsverhalten", "Install behavior"), "System"],
            [
              tx("Abhängigkeit", "Dependency"),
              tx(
                ".NET 10 Runtime (x64), als eigene Win32-App paketiert",
                ".NET 10 Runtime (x64), packaged as its own Win32 app",
              ),
            ],
            [
              tx("Erkennungsregel", "Detection rule"),
              withCode(
                tx(
                  "Registry: `HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MSI:TypeWhisper`, Wert `DisplayVersion`, Versionsvergleich „Größer als oder gleich“ der verpackten Version. Für einen Release Candidate, dessen Version ein Suffix trägt, „Gleich“. Alternativ die Datei `C:\\Program Files\\TypeWhisper\\current\\TypeWhisper.exe`.",
                  "Registry: `HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\MSI:TypeWhisper`, value `DisplayVersion`, version comparison “Greater than or equal to” the packaged version. Use “Equals” for a Release Candidate, whose version carries a suffix. Alternatively the file `C:\\Program Files\\TypeWhisper\\current\\TypeWhisper.exe`.",
                ),
              ),
            ],
            [
              tx("Upgrade", "Upgrade"),
              tx(
                "Neueres MSI auf dieselbe Weise verteilen, etwa per Ablösung",
                "Deploy the newer MSI the same way, for example through supersedence",
              ),
            ],
          ]}
        />
      </DocsSection>

      <DocsSection
        id="per-user"
        title={tx("Installation pro Benutzer", "Per-user installer")}
      >
        <p>
          {withCode(
            tx(
              "Das Setup installiert TypeWhisper für den Benutzer, der es ausführt: Es schreibt nach `%LocalAppData%\\TypeWhisper`, registriert sich unter dem Deinstallationsschlüssel des Benutzers und startet die App, wenn es fertig ist.",
              "The setup installs TypeWhisper for the user who runs it: it writes to `%LocalAppData%\\TypeWhisper`, registers under the user's uninstall key, and starts the app when it finishes.",
            ),
          )}
        </p>
        <DocsCode locale={locale} lang="powershell" code={perUserCommands(isDe)} />

        <DocsSubheading id="per-user-intune">
          {tx("Als Win32-App in Intune", "As an Intune Win32 app")}
        </DocsSubheading>
        <DocsTable
          label={tx("Intune-Paket für das Setup", "Intune package for the setup")}
          head={[tx("Feld", "Item"), tx("Wert", "Value")]}
          rows={[
            [
              tx("Paket", "Package"),
              <code>IntuneWinAppUtil.exe -c &lt;folder&gt; -s TypeWhisper-win-x64-Setup.exe -o &lt;output&gt;</code>,
            ],
            [
              tx("Installationsbefehl", "Install command"),
              <code>TypeWhisper-win-x64-Setup.exe --silent</code>,
            ],
            [
              tx("Deinstallationsbefehl", "Uninstall command"),
              withCode(
                tx(
                  "`powershell.exe -NoProfile -ExecutionPolicy Bypass -Command \"& \\\"$env:LOCALAPPDATA\\TypeWhisper\\Update.exe\\\" --uninstall --silent\"`. Intune löst in diesem Feld keine Umgebungsvariablen auf; PowerShell ermittelt den LocalAppData-Pfad des Benutzers.",
                  "`powershell.exe -NoProfile -ExecutionPolicy Bypass -Command \"& \\\"$env:LOCALAPPDATA\\TypeWhisper\\Update.exe\\\" --uninstall --silent\"`. Intune does not expand environment variables in this field; PowerShell resolves the user's LocalAppData path.",
                ),
              ),
            ],
            [tx("Installationsverhalten", "Install behavior"), tx("Benutzer", "User")],
            [
              tx("Erkennungsregel", "Detection rule"),
              withCode(
                tx(
                  "Registry: `HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\TypeWhisper`, Wert `DisplayVersion`, Versionsvergleich „Größer als oder gleich“ der verpackten Version. Alternativ die Datei `%LocalAppData%\\TypeWhisper\\current\\TypeWhisper.exe`.",
                  "Registry: `HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\TypeWhisper`, value `DisplayVersion`, version comparison “Greater than or equal to” the packaged version. Alternatively the file `%LocalAppData%\\TypeWhisper\\current\\TypeWhisper.exe`.",
                ),
              ),
            ],
            [
              tx("Upgrade", "Upgrade"),
              tx(
                "Neueres Setup auf dieselbe Weise verteilen; es aktualisiert direkt und behält die Daten des Benutzers",
                "Deploy the newer setup the same way; it upgrades in place and keeps the user's data",
              ),
            ],
          ]}
        />
        <p>
          {withCode(
            tx(
              "Mit `UpdateMode` `0` liegen Updates bei deiner Organisation: Verteile neue Installer über dieselben Werkzeuge. Mit `1` kündigt die App neue Versionen unter Einstellungen > Konto & Info an, ohne Schaltfläche zum Installieren. Auf gemeinsam genutzten Geräten nimmst du das MSI oder lässt jeden Windows-Benutzer das Setup einmal ausführen; dein Verteilungswerkzeug kann es im Kontext des Benutzers installieren.",
              "With `UpdateMode` `0` your organization owns updates: deploy new installers through the same tools. With `1` the app announces new versions in Settings > Account & about, without an install button. On shared devices, use the MSI, or let each Windows user run the setup once; your deployment tool can install it in the user's context.",
            ),
          )}
        </p>
      </DocsSection>

      <DocsSection id="network" title={tx("Netzwerk-Hosts", "Network hosts")}>
        <p>
          {tx(
            "TypeWhisper baut nur ausgehende HTTPS-Verbindungen auf und nutzt die Proxy-Einstellungen von Windows, einschließlich WPAD und PAC-Skripten; eine eigene Proxy-Konfiguration gibt es nicht. Die App selbst kontaktiert diese Hosts:",
            "TypeWhisper only makes outbound HTTPS connections and uses the Windows proxy settings, including WPAD and PAC scripts; there is no separate proxy configuration. The app itself contacts these hosts:",
          )}
        </p>
        <DocsTable
          label={tx("Hosts der App", "App hosts")}
          head={["Host", tx("Zweck", "Used for")]}
          rows={appHosts.map(([hosts, en, de]) => [
            codeList(hosts),
            withCode(tx(de, en)),
          ])}
        />
        <p>
          {withCode(
            tx(
              "Cloud-Plugins kontaktieren ihren Anbieter. Die Tabelle nennt die Hosts der Plugins im Katalog, Stand TypeWhisper für Windows 1.2. Plugins mit dem Verarbeitungsort `configurable` erreichen den Endpunkt, den der Benutzer einträgt.",
              "Cloud plugins contact their vendor. The table lists the hosts of the plugins in the catalog as of TypeWhisper for Windows 1.2. Plugins with the `configurable` locality reach whatever endpoint the user enters.",
            ),
          )}
        </p>
        <DocsTable
          label={tx("Hosts der Plugins", "Plugin hosts")}
          head={["Plugin", "Hosts"]}
          rows={pluginHosts.map(([plugin, en, de]) => [
            plugin === "Authenticated CLI, Webhook, Script"
              ? tx("Authenticated CLI, Webhook, Skript", plugin)
              : plugin.startsWith("Local plugins")
                ? tx(plugin.replace("Local plugins", "Lokale Plugins"), plugin)
                : plugin,
            withCode(isDe && de ? de : en),
          ])}
        />
      </DocsSection>

      <DocsSection
        id="microphone"
        title={tx("Mikrofon und Berechtigungen", "Microphone and permissions")}
      >
        <p>
          {tx(
            "TypeWhisper ist eine Desktop-App. Windows fragt bei Desktop-Apps nicht einzeln nach dem Mikrofonzugriff, daher gibt es nichts vorab zu genehmigen. Die App kann aufnehmen, solange unter Einstellungen > Datenschutz & Sicherheit > Mikrofon zwei Schalter eingeschaltet sind (unter Windows 10: Einstellungen > Datenschutz > Mikrofon):",
            "TypeWhisper is a desktop app. Windows does not ask for microphone access per desktop app, so there is nothing to pre-approve. The app can record as long as two switches in Settings > Privacy & security > Microphone are on (on Windows 10: Settings > Privacy > Microphone):",
          )}
        </p>
        <DocsTable
          label={tx("Mikrofon-Schalter", "Microphone switches")}
          head={[tx("Schalter", "Switch"), tx("Registry-Wert", "Registry value")]}
          rows={[
            [
              tx("Mikrofonzugriff (Gerät)", "Microphone access (device)"),
              withCode(
                tx(
                  "`HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\microphone`, `Value` = `Allow`",
                  "`HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\microphone`, `Value` = `Allow`",
                ),
              ),
            ],
            [
              tx(
                "Desktop-Apps auf Ihr Mikrofon zugreifen lassen (pro Benutzer)",
                "Let desktop apps access your microphone (per user)",
              ),
              withCode(
                "`HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\microphone\\NonPackaged`, `Value` = `Allow`",
              ),
            ],
          ]}
        />
        <p>
          {tx(
            "Die Gruppenrichtlinie „Windows-App-Zugriff auf das Mikrofon zulassen“ (englisch „Let Windows apps access the microphone“, unter Computerkonfiguration > Administrative Vorlagen > Windows-Komponenten > App-Datenschutz) gilt nur für paketierte Apps aus dem Store oder als MSIX. Sie betrifft die Microsoft-Store-Version von TypeWhisper, deren Paketfamilienname in die Liste der erzwungen zugelassenen Apps („Force Allow“) gehört, nicht aber die Installer von GitHub. Schaltet ein Benutzer einen Schalter aus, meldet TypeWhisper das fehlende Mikrofon in Status und Einrichtung, statt stumm zu scheitern.",
            "The Group Policy “Let Windows apps access the microphone” (Computer Configuration > Administrative Templates > Windows Components > App Privacy) governs packaged (Store or MSIX) apps only. It applies to the Microsoft Store version of TypeWhisper, whose package family name goes into its “Force Allow” list, and not to the GitHub installers. If a user turns a switch off, TypeWhisper reports the missing microphone in its status and setup instead of failing silently.",
          )}
        </p>
        <p>
          {tx(
            "Zum Ausführen braucht TypeWhisper keine Administratorrechte, keinen Treiber und keine Firewall-Ausnahme: Die App baut nur ausgehende Verbindungen auf, und die optionale HTTP-API lauscht nur auf der Loopback-Schnittstelle.",
            "To run, TypeWhisper needs no administrator rights, no driver, and no firewall exception: it only makes outbound connections, and the optional HTTP API listens on the loopback interface only.",
          )}
        </p>
      </DocsSection>

      <DocsSection
        id="provisioning"
        title={tx("Modelle und Plugins bereitstellen", "Provide models and plugins")}
      >
        <ul>
          <li>
            {withCode(
              tx(
                "Modelle und Plugins liegen im Profil jedes Benutzers. Schaltest du `AllowModelDownloads` oder `AllowPluginDownloads` ab, lege die benötigten Pakete und Modelldateien im Benutzerprofil ab, bevor die Einschränkung greift. Kopiere nie Einstellungen, Zugangsdaten oder mit DPAPI geschützte Daten eines anderen Benutzers.",
                "Models and plugins live in each user's profile. If you turn off `AllowModelDownloads` or `AllowPluginDownloads`, place the required packages and model files in the user's profile before the restriction applies. Never copy another user's settings, credentials, or DPAPI-protected data.",
              ),
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Manche lokalen Plugins laden beim Laden eines Modells Laufzeitdateien nach. `AllowModelDownloads` hält das nicht auf; gib die Laufzeit-Hosts aus der Tabelle oben frei oder stelle die Dateien bereit.",
                "Some local plugins fetch runtime files while they load a model. `AllowModelDownloads` does not stop that; allow the runtime hosts from the table above or provide the files.",
              ),
            )}
          </li>
          <li>
            {tx(
              "Die Richtlinie wird gelesen, bevor Plugins und Hintergrundaufgaben starten. Ist sie beim ersten Start schon vorhanden, gilt sie sofort.",
              "The policy is read before plugins and background work start. If it is present at the first launch, it applies right away.",
            )}
          </li>
        </ul>
      </DocsSection>

      <DocsSection id="pilot" title={tx("Pilottest", "Pilot checklist")}>
        <p>
          {tx(
            "Prüfe vor dem Rollout auf ein oder zwei verwalteten Geräten:",
            "Before the rollout, check on one or two managed devices:",
          )}
        </p>
        <ol>
          <li>
            {tx(
              "Installiere die .NET 10 Runtime und das MSI still und starte TypeWhisper als Standardbenutzer.",
              "Install the .NET 10 Runtime and the MSI silently, then start TypeWhisper as a standard user.",
            )}
          </li>
          <li>
            {tx("Importiere die ", "Import the ")}
            <a href={`${managedSettings}#group-policy`}>
              {tx("Gruppenrichtlinien-Vorlagen", "Group Policy templates")}
            </a>
            {tx(
              ", setze einige Einstellungen und vergleiche sie mit Einstellungen > Erweitert > Verwaltete Einstellungen.",
              ", set a few policies, and compare them with Settings > Advanced > Managed settings.",
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Verteile `ManagedLicenseKey` und prüfe Einstellungen > Premium > Lizenz in der Sitzung eines Standardbenutzers. Starte zweimal neu und stelle sicher, dass Polar keine zusätzlichen Aktivierungen zeigt. Wiederhole das mit einem zweiten Windows-Benutzer und mit einem ersten Start ohne Internet, gefolgt von „Aktivierung erneut versuchen“.",
                "Deploy `ManagedLicenseKey` and check Settings > Premium > License in a standard user's session. Restart twice and confirm that Polar shows no additional activations. Repeat with a second Windows user and with an offline first launch followed by Retry activation.",
              ),
            )}
          </li>
          <li>
            {tx(
              "Prüfe den Mikrofonzugriff und die Modelle, die deine Einrichtung braucht, besonders wenn Downloads abgeschaltet sind.",
              "Confirm microphone access and the models your setup needs, especially with downloads turned off.",
            )}
          </li>
          <li>
            {tx(
              "Aktualisiere mit dem nächsten MSI und deinstalliere es wieder.",
              "Upgrade with the next MSI and uninstall it again.",
            )}
          </li>
        </ol>
        <a href={managedSettings} className="site-link">
          {tx(
            "Alle verwalteten Einstellungen",
            "All managed settings",
          )}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </DocsSection>
    </>
  );
}

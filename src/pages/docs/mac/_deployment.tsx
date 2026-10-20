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
import { macGitHubUrl, macReleaseUrl } from "@/lib/platform-download";

/*
 * Adapted from docs/mdm/managed-settings.md and docs/mdm/README.md in
 * typewhisper-mac: installation, updates, the login item, permissions,
 * network hosts, and deployment notes.
 */

const exampleUrl = (name: string) =>
  `${macGitHubUrl}/blob/main/deployment/macos/examples/${name}`;

/** Hosts the app contacts itself: hosts, English purpose, German purpose. */
const appHosts: Array<[hosts: string[], en: string, de: string]> = [
  [
    ["api.polar.sh"],
    "Activation and validation of commercial license keys, including `ManagedLicenseKey`.",
    "Aktivierung und Prüfung kommerzieller Lizenzschlüssel, auch `ManagedLicenseKey`.",
  ],
  [
    ["app.typewhisper.com"],
    "Premium account sign-in and status, and the Improve TypeWhisper plugin.",
    "Anmeldung beim Premium-Konto und Kontostatus sowie das Plugin Improve TypeWhisper.",
  ],
  [
    ["typewhisper.github.io"],
    "App updates (`/typewhisper-mac/appcast.xml`, unless `UpdateMode` is `0`), the plugin catalog, and term packs.",
    "App-Updates (`/typewhisper-mac/appcast.xml`, außer bei `UpdateMode` `0`), der Plugin-Katalog und Begriffspakete.",
  ],
  [
    ["github.com", "release-assets.githubusercontent.com"],
    "App update and plugin downloads.",
    "Downloads von App-Updates und Plugins.",
  ],
  [
    ["huggingface.co", "*.hf.co"],
    "Model downloads of the local plugins: Parakeet, WhisperKit, Qwen3, Canary, Granite, Voxtral, Cohere Transcribe, Local LLM, Supertonic, speaker detection, and Hugging Face imports. The host redirects to `*.hf.co` content hosts on several subdomain levels; the wildcard has to cover all of them.",
    "Modell-Downloads der lokalen Plugins: Parakeet, WhisperKit, Qwen3, Canary, Granite, Voxtral, Cohere Transcribe, Local LLM, Supertonic, Sprechererkennung und Importe von Hugging Face. Der Host leitet auf `*.hf.co`-Hosts über mehrere Subdomain-Ebenen weiter; der Platzhalter muss alle abdecken.",
  ],
  [
    ["www.typewhisper.com"],
    "Documentation opened in the browser.",
    "Dokumentation, die im Browser geöffnet wird.",
  ],
];

/** Vendor hosts of the cloud plugins: plugin, hosts (backticks set code). */
const pluginHosts: Array<[plugin: string, en: string, de: string]> = [
  ["AssemblyAI", "`api.assemblyai.com`, `streaming.assemblyai.com`", ""],
  ["Cartesia", "`api.cartesia.ai`", ""],
  ["Cerebras", "`api.cerebras.ai`", ""],
  ["Claude", "`api.anthropic.com`", ""],
  ["Cohere", "`api.cohere.com`", ""],
  ["Deepgram", "`api.deepgram.com`", ""],
  ["ElevenLabs", "`api.elevenlabs.io`", ""],
  [
    "Fireworks AI",
    "`api.fireworks.ai`, `audio-prod.api.fireworks.ai`, `audio-turbo.api.fireworks.ai`",
    "",
  ],
  ["Gemini", "`generativelanguage.googleapis.com`", ""],
  ["Gladia", "`api.gladia.io`", ""],
  ["Google Cloud Speech-to-Text", "`speech.googleapis.com`, `oauth2.googleapis.com`", ""],
  ["Groq", "`api.groq.com`", ""],
  ["Linear", "`api.linear.app`", ""],
  ["Meta", "`api.meta.ai`", ""],
  [
    "Microsoft AI",
    "The configured Azure resource: `*.cognitiveservices.azure.com` or `<region>.api.cognitive.microsoft.com`",
    "Die konfigurierte Azure-Ressource: `*.cognitiveservices.azure.com` oder `<region>.api.cognitive.microsoft.com`",
  ],
  ["Mistral AI", "`api.mistral.ai`", ""],
  [
    "OpenAI / ChatGPT, OpenAI Vector Memory",
    "`api.openai.com`; `auth.openai.com` and `chatgpt.com` for ChatGPT sign-in",
    "`api.openai.com`; `auth.openai.com` und `chatgpt.com` für die Anmeldung mit ChatGPT",
  ],
  ["OpenRouter", "`openrouter.ai`", ""],
  ["Sber SaluteSpeech", "`smartspeech.sber.ru`, `ngw.devices.sberbank.ru`", ""],
  ["Smallest Pulse", "`api.smallest.ai`", ""],
  [
    "Soniox",
    "`api.soniox.com` and its `eu` and `jp` regions, `stt-rt.*` and `tts-rt.*`",
    "`api.soniox.com` und die Regionen `eu` und `jp`, `stt-rt.*` und `tts-rt.*`",
  ],
  [
    "Speechmatics",
    "The regional `*.speechmatics.com` hosts",
    "Die regionalen `*.speechmatics.com`-Hosts",
  ],
  ["Vercel AI Gateway", "`ai-gateway.vercel.sh`", ""],
  ["xAI / Grok", "`api.x.ai`", ""],
  [
    "Reson8",
    "`api.reson8.dev` or the configured endpoint",
    "`api.reson8.dev` oder der konfigurierte Endpunkt",
  ],
  [
    "MemPalace",
    "`api.mempalace.cloud` or the configured server",
    "`api.mempalace.cloud` oder der konfigurierte Server",
  ],
  [
    "OpenAI Compatible, Cloudflare ASR, MCP Client, Obsidian, Webhook, Script Runner, File Job Script, Authenticated Provider CLIs, R2T2",
    "The endpoint, command, or vault the user configures",
    "Der Endpunkt, der Befehl oder der Vault, den der Benutzer konfiguriert",
  ],
  [
    "Web Link Transcription",
    "The sites of the links users transcribe, through yt-dlp",
    "Die Websites der Links, die Benutzer transkribieren, über yt-dlp",
  ],
];

const homebrewCommand = "brew install --cask typewhisper/tap/typewhisper";
const codesignCommand = "codesign -dr - /Applications/TypeWhisper.app";

export function macDeploymentHead(locale: Locale) {
  return locale === "de"
    ? {
        heading: "Bereitstellung",
        lede: "Verteile TypeWhisper für Mac in deiner Organisation: Edition und Installation, Updates, Anmeldeobjekt, Berechtigungen und Netzwerk-Hosts für Firewall- und Proxy-Freigaben.",
      }
    : {
        heading: "Deployment",
        lede: "Roll out TypeWhisper for Mac across your organization: edition and installation, updates, the login item, permissions, and network hosts for allowlists.",
      };
}

export default function DocsMacDeployment({
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
  const managedSettings = localePath(locale, "/docs/mac/managed-settings");

  return (
    <>
      <DocsCallout label={t(locale, "docs.callout.note")}>
        <p>
          {withCode(
            tx(
              "Verwaltete Einstellungen, die Beispielprofile und die Schemas für Jamf Pro und Profil-Editoren gibt es ab TypeWhisper für Mac 1.8. Den verwalteten Lizenzschlüssel (`ManagedLicenseKey`) gibt es schon seit 1.6.1.",
              "Managed settings, the example profiles, and the schemas for Jamf Pro and profile editors are available from TypeWhisper for Mac 1.8. The managed license key (`ManagedLicenseKey`) has been available since 1.6.1.",
            ),
          )}
        </p>
      </DocsCallout>

      <DocsSection id="overview" title={tx("Überblick", "Overview")}>
        <p>{tx("Als Administrator legst du fest:", "As an administrator, you decide:")}</p>
        <ul>
          <li>
            {tx(
              "welche Edition auf die Macs kommt und wie: der Direkt-Download über dein MDM oder Homebrew, oder die Mac-App-Store-Edition über Apple Business Manager,",
              "which edition goes on the Macs and how: the direct download through your MDM or Homebrew, or the Mac App Store edition through Apple Business Manager;",
            )}
          </li>
          <li>
            {tx("wie sie eingestellt ist: Lizenz, Modelle, Cloud-Verarbeitung, Downloads, Updates und Start über ", "how it is configured: license, models, cloud processing, downloads, updates, and startup through ")}
            <a href={managedSettings}>
              {tx("verwaltete Einstellungen", "managed settings")}
            </a>
            {tx(",", ";")}
          </li>
          <li>
            {tx(
              "was sie darf und erreicht: Anmeldeobjekt, Berechtigungen und die Netzwerk-Hosts unten.",
              "what it may do and reach: the login item, permissions, and the network hosts below.",
            )}
          </li>
        </ul>
        <p>
          {tx(
            "TypeWhisper braucht macOS 14 oder neuer und zum Ausführen keine Administratorrechte. Jeder Benutzer eines Mac hat eigene Einstellungen, Modelle und Plugins in seinem Benutzerordner. Ein Geräteprofil gilt für alle Benutzer, ein Benutzerprofil nur für diesen Benutzer.",
            "TypeWhisper needs macOS 14 or later and no administrator rights to run. Each user of a Mac keeps their own settings, models, and plugins in their account. A device profile applies to every user, a user profile only to that user.",
          )}
        </p>
      </DocsSection>

      <DocsSection id="editions" title={tx("Edition wählen", "Choose an edition")}>
        <DocsTable
          label={tx("Editionen", "Editions")}
          head={[tx("Edition", "Edition"), tx("Bezug und Updates", "Source and updates")]}
          rows={[
            [
              tx("Direkt-Download", "Direct download"),
              withCode(
                tx(
                  "DMG oder ZIP aus den GitHub-Releases, mit Developer ID signiert und notarisiert, oder der Homebrew-Cask. Updates kommen über Sparkle und folgen `UpdateMode`, `UpdateChannel` und `AllowedUpdateChannels`. Nur diese Edition aktiviert `ManagedLicenseKey`.",
                  "DMG or ZIP from the GitHub releases, signed with Developer ID and notarized, or the Homebrew cask. Updates come through Sparkle and follow `UpdateMode`, `UpdateChannel`, and `AllowedUpdateChannels`. Only this edition activates `ManagedLicenseKey`.",
                ),
              ),
            ],
            [
              tx("Mac-App-Store-Edition", "Mac App Store edition"),
              tx(
                "Apple Business Manager > Apps und Bücher, zugewiesen über dein MDM. Der App Store aktualisiert sie, und ihre Plugins sind eingebaut.",
                "Apple Business Manager > Apps and Books, assigned through your MDM. The App Store updates it, and its plugins are built in.",
              ),
            ],
          ]}
        />
        <p>
          {tx(
            "Beide Editionen sind getrennte Apps mit getrennten Einstellungen; meist ist nur eine installiert. Apps-und-Bücher-Lizenzen enthalten keine In-App-Käufe. Für kommerzielle Lizenzschlüssel brauchst du daher den Direkt-Download.",
            "The two editions are separate apps with separate settings, so usually only one of them is installed. Apps and Books licenses do not include in-app purchases, so commercial license keys need the direct download.",
          )}
        </p>
      </DocsSection>

      <DocsSection
        id="install"
        title={tx("Direkt-Download installieren", "Install the direct download")}
      >
        <p>
          {withCode(
            tx(
              "Jedes Release enthält `TypeWhisper-v<version>.dmg` und eine ZIP-Datei. Die meisten MDMs installieren das DMG oder ein daraus erstelltes Paket; kopiere `TypeWhisper.app` nach `/Applications` (im Finder „Programme“). Die Dateien liegen auf der ",
              "Every release includes `TypeWhisper-v<version>.dmg` and a ZIP file. Most MDMs install the DMG or a package built from it; place `TypeWhisper.app` in `/Applications`. The files are on the ",
            ),
          )}
          <a
            href={macReleaseUrl}
            data-download-platform="mac"
            data-download-target="mac_github_releases"
            data-tracking-placement="docs"
          >
            {tx("Release-Seite auf GitHub", "GitHub releases page")}
          </a>
          {tx(". Mit Homebrew:", ". With Homebrew:")}
        </p>
        <DocsCode
          code={homebrewCommand}
          lang="bash"
          locale={locale}
          trackPlatform="mac"
          trackTarget="mac_homebrew"
        />
        <p>
          {withCode(
            tx(
              "Zum Deinstallieren beendest du die App und löschst sie aus `/Applications`. Einstellungen, Modelle und Plugins bleiben im Benutzerordner erhalten; die ",
              "To uninstall, quit the app and delete it from `/Applications`. Settings, models, and plugins stay in the user's account; the ",
            ),
          )}
          <a href={`${localePath(locale, "/docs/mac/installation")}#uninstall`}>
            {tx("Installationsseite", "installation page")}
          </a>
          {tx(
            " nennt die Pfade für eine vollständige Bereinigung. Das Löschen der App deaktiviert eine verwaltete Lizenz nicht; entferne die Aktivierung in Polar.",
            " lists the paths for a complete cleanup. Deleting the app does not deactivate a managed license; remove the activation in Polar.",
          )}
        </p>

        <DocsSubheading id="updates">{tx("Updates", "Updates")}</DocsSubheading>
        <p>
          {withCode(
            tx(
              "Der Direkt-Download aktualisiert sich mit Sparkle über `https://typewhisper.github.io/typewhisper-mac/appcast.xml`. Mit `UpdateMode` steuerst du das: `0` überlässt Updates deiner Softwareverteilung, `1` zeigt neue Versionen nur an, `2` installiert nur, wenn der Benutzer es startet. Unter `0` verteilst du neue Versionen mit deinem MDM.",
              "The direct download updates itself with Sparkle from `https://typewhisper.github.io/typewhisper-mac/appcast.xml`. `UpdateMode` controls this: `0` leaves updates to your deployment, `1` only announces new versions, and `2` installs only when the user starts it. Under `0`, deploy new versions with your MDM.",
            ),
          )}
        </p>
        <p>
          {withCode(
            tx(
              "Ein Update, das Sparkle vor einem strengeren `UpdateMode` schon für die automatische Installation geladen hat, kann beim Beenden von TypeWhisper noch installiert werden; Sparkle bietet keinen Weg, das abzubrechen. Verteile die Richtlinie deshalb zusammen mit der App.",
              "An update that Sparkle downloaded for automatic installation before a restrictive `UpdateMode` arrived can still install when TypeWhisper quits; Sparkle offers no way to cancel it. Deploy the policy together with the app to avoid that window.",
            ),
          )}
        </p>
      </DocsSection>

      <DocsSection id="login-item" title={tx("Anmeldeobjekt", "Login item")}>
        <p>
          {withCode(
            tx(
              "macOS listet TypeWhisper unter Systemeinstellungen > Allgemein > Anmeldeobjekte & Erweiterungen. Dort können Benutzer es abschalten, auch wenn `LaunchAtLogin` erzwungen ist; TypeWhisper zeigt dann unter Einstellungen > Allgemein, dass das Anmeldeobjekt eine Freigabe braucht.",
              "macOS lists TypeWhisper in System Settings > General > Login Items & Extensions, where users can turn it off even while `LaunchAtLogin` is enforced; Settings > General in TypeWhisper then shows that the item needs approval.",
            ),
          )}
        </p>
        <p>
          {withCode(
            tx(
              "Um das Anmeldeobjekt freizugeben und zu sperren, verteilst du einen Service-Management-Payload (`com.apple.servicemanagement`, ab macOS 13, über MDM) mit einer Regel für die Team-ID `2D8ALY3LCL` von TypeWhisper oder für die Bundle-ID. Das ",
              "To approve and lock the item, deploy a Service Management payload (`com.apple.servicemanagement`, macOS 13 or later, delivered by MDM) with a rule for TypeWhisper's team identifier `2D8ALY3LCL` or its bundle identifier. The ",
            ),
          )}
          <a href={exampleUrl("TypeWhisper-LoginItem.mobileconfig")} target="_blank" rel="noopener noreferrer">
            {tx("Beispiel für das Anmeldeobjekt", "login item example")}
          </a>
          {tx(
            " deckt beide Editionen ab. Eine App, die nie gestartet wurde, kann ihr Anmeldeobjekt nicht registrieren: Starte TypeWhisper nach der Installation einmal.",
            " covers both editions. An app that has never been started cannot register its login item, so launch TypeWhisper once after installation.",
          )}
        </p>
      </DocsSection>

      <DocsSection id="permissions" title={tx("Berechtigungen", "Permissions")}>
        <p>
          {withCode(
            tx(
              "TypeWhisper fragt nach diesen Berechtigungen, sobald eine Funktion sie zum ersten Mal braucht. Ein Profil mit Datenschutzeinstellungen (PPPC, `com.apple.TCC.configuration-profile-policy`), das ein MDM ausliefert, kann einige davon vorab erteilen. Das ",
              "TypeWhisper asks for these permissions when a feature first needs them. A privacy preferences profile (PPPC, `com.apple.TCC.configuration-profile-policy`) delivered by MDM can pre-approve some of them. The ",
            ),
          )}
          <a href={exampleUrl("TypeWhisper-Privacy.mobileconfig")} target="_blank" rel="noopener noreferrer">
            {tx("Datenschutz-Beispiel", "privacy example")}
          </a>
          {tx(
            " enthält Einträge für Bedienungshilfen, PostEvent, Eingabeüberwachung und Bildschirmaufnahme. Erteile nur, was deine Funktionen und deine Edition brauchen. Kalender und Automation sind optional; ergänze ihre Einträge selbst, wenn du sie vorab erteilen willst.",
            " contains entries for Accessibility, PostEvent, Input Monitoring, and Screen Recording. Pre-approve only the entries your features and edition need. Calendars and Automation are optional; add their entries yourself if you want them pre-approved.",
          )}
        </p>
        <DocsTable
          label={tx("Berechtigungen", "Permissions")}
          head={[tx("Berechtigung", "Permission"), tx("Verwendung und PPPC-Eintrag", "Used for and PPPC entry")]}
          rows={[
            [
              tx("Mikrofon", "Microphone"),
              withCode(
                tx(
                  "Diktat und Aufnahme. Lässt sich nicht vorab erteilen; Benutzer bestätigen die Abfrage. Ab macOS 27 kann die Konfiguration für App-Einstellungen es vorschlagen (`Microphone`: Allow).",
                  "Dictation and recording. Cannot be pre-approved; users approve the prompt. From macOS 27, the app settings configuration can propose it (`Microphone`: Allow).",
                ),
              ),
            ],
            [
              tx("Bedienungshilfen", "Accessibility"),
              withCode(
                tx(
                  "Direkt-Download: Diktat-Tastenkürzel, Text einfügen und den Kontext der aktiven App lesen. `Accessibility`: Allow; ab macOS 27 veraltet, dort schlägt die Konfiguration für App-Einstellungen es stattdessen vor.",
                  "Direct download: dictation shortcuts, inserting text, and reading the active app's context. `Accessibility`: Allow; deprecated from macOS 27, where the app settings configuration proposes it instead.",
                ),
              ),
            ],
            [
              tx("Bedienungshilfen (Ereignisse senden)", "Accessibility (post events)"),
              withCode(
                tx(
                  "Transkript einfügen; in der App-Store-Edition der Eintrag unter Datenschutz & Sicherheit > Bedienungshilfen (ab macOS 27 „Gerätesteuerung und Datenzugriff“). `PostEvent`: Allow.",
                  "Pasting the transcript; in the App Store edition, the entry under Privacy & Security > Accessibility (Device Control and Data Access from macOS 27). `PostEvent`: Allow.",
                ),
              ),
            ],
            [
              tx("Eingabeüberwachung", "Input Monitoring"),
              withCode(
                tx(
                  "App-Store-Edition: Diktat-Tastenkürzel. Direkt-Download: Tastenkürzel, die das System nicht registrieren kann, und Esc in anderen Apps. `ListenEvent`: nur `AllowStandardUserToSetSystemService`, damit Benutzer ohne Administratorrechte zustimmen können.",
                  "App Store edition: dictation shortcuts. Direct download: shortcuts the system cannot register, and Esc in other apps. `ListenEvent`: only `AllowStandardUserToSetSystemService`, which lets users without administrator rights approve it.",
                ),
              ),
            ],
            [
              tx("Aufnahme von Bildschirm & Systemaudio", "Screen & System Audio Recording"),
              withCode(
                tx(
                  "Systemaudio im Recorder. `ScreenCapture`: nur `AllowStandardUserToSetSystemService`.",
                  "System audio in the Recorder. `ScreenCapture`: only `AllowStandardUserToSetSystemService`.",
                ),
              ),
            ],
            [
              tx("Automation (Apple Events)", "Automation (Apple Events)"),
              withCode(
                tx(
                  "Direkt-Download: die aktuelle Browser-Adresse für Website-Workflows lesen; die App-Store-Edition nutzt dafür die Browser-Erweiterung. `AppleEvents`: Allow, mit einem Eintrag pro Browser als Empfänger.",
                  "Direct download: reading the current browser address for website workflows; the App Store edition uses the browser extension instead. `AppleEvents`: Allow, with one entry per browser as receiver.",
                ),
              ),
            ],
            [
              tx("Kalender", "Calendars"),
              withCode(
                tx(
                  "Meeting-Erinnerungen und Aufnahmen starten. `Calendar`: Allow, wenn deine Organisation das möchte.",
                  "Meeting reminders and starting recordings. `Calendar`: Allow, if your organization wants it.",
                ),
              ),
            ],
            [
              tx("Lokales Netzwerk", "Local Network"),
              withCode(
                tx(
                  "Gekoppelte iPhones und iPads, die den Mac zum Transkribieren nutzen. Nicht per PPPC einstellbar; Benutzer bestätigen die Abfrage. Ab macOS 27 kann die Konfiguration für App-Einstellungen es vorschlagen (`LocalNetwork`: Allow).",
                  "Paired iPhones and iPads that use the Mac for transcription. Not configurable through PPPC; users approve the prompt. From macOS 27, the app settings configuration can propose it (`LocalNetwork`: Allow).",
                ),
              ),
            ],
          ]}
        />
        <p>
          {tx(
            "Die Code-Anforderungen im Beispiel sind die Designated Requirements von TypeWhisper. So prüfst du sie an einer installierten App:",
            "The code requirements in the example are TypeWhisper's designated requirements. To check them against an installed app:",
          )}
        </p>
        <DocsCode locale={locale} lang="shell" code={codesignCommand} />
        <p>
          {tx(
            "macOS wendet Datenschutzeinstellungen nur an, wenn ein MDM sie über eine automatisierte Geräteregistrierung oder eine vom Benutzer genehmigte MDM-Registrierung ausliefert. Ein von Hand installiertes Profil reicht dafür nicht.",
            "macOS applies privacy preferences only when an MDM with user-approved or automated device enrollment delivers them. A profile installed by hand is not enough.",
          )}
        </p>

        <DocsSubheading id="macos-27">
          {tx("Ab macOS 27: App-Einstellungen", "From macOS 27: app settings")}
        </DocsSubheading>
        <p>
          {withCode(
            tx(
              "Ab macOS 27 ist der Eintrag `Accessibility` in einem PPPC-Profil veraltet, und die Systemeinstellungen nennen den Bereich „Gerätesteuerung und Datenzugriff“: macOS benachrichtigt den Benutzer und lässt ihn die Berechtigung dort abschalten. Apples Ersatz ist der Schlüssel `Privacy` der deklarativen Konfiguration für App-Einstellungen (`com.apple.configuration.app.settings`) für betreute Macs mit macOS 27 oder neuer. Er schlägt pro App Berechtigungen vor, erkannt an Bundle-ID und Code-Anforderung; der Benutzer bestätigt sie beim Start der App in einer einzigen Abfrage, zusammen mit der Begründung deiner Organisation. Vorschlagen lassen sich Bedienungshilfen, Mikrofon und lokales Netzwerk; still erteilt wird nichts.",
              "From macOS 27, the `Accessibility` entry in a PPPC profile is deprecated, and System Settings calls the pane Device Control and Data Access: macOS notifies the user and lets them turn the permission off there. Apple's replacement is the `Privacy` key of the declarative app settings configuration (`com.apple.configuration.app.settings`) for supervised Macs with macOS 27 or later. It sets permission defaults per app, matched by bundle identifier and code requirement, which the user confirms in one prompt when the app launches, together with your organization's justification. It can propose Accessibility, the microphone, and local network access, but never grants them silently.",
            ),
          )}
        </p>
        <ul>
          <li>
            {tx("Das ", "The ")}
            <a href={exampleUrl("TypeWhisper-AppSettings-Privacy.json")} target="_blank" rel="noopener noreferrer">
              {tx("Beispiel für die App-Einstellungen", "app settings example")}
            </a>
            {withCode(
              tx(
                " schlägt Bedienungshilfen und Mikrofon für beide Editionen vor. Passe seine `OrganizationJustification` an.",
                " proposes Accessibility and the microphone for both editions. Adapt its `OrganizationJustification`.",
              ),
            )}
          </li>
          <li>
            {tx(
              "Die Abfrage nennt nur Berechtigungen, nach denen der Benutzer noch nicht gefragt wurde, und erscheint nicht mehr, wenn er alle schon gesehen hat. Verteile die Deklaration also, bevor Benutzer TypeWhisper zum ersten Mal starten.",
              "The prompt lists only permissions the user has not been asked for yet and does not appear once they have seen all of them, so deploy the declaration before users first launch TypeWhisper.",
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Liefere sie mit einem MDM aus, das deklarative Geräteverwaltung auf dem Benutzerkanal unterstützt, weil macOS den Schlüssel `Privacy` nur für Benutzer anwendet. Gib ihr bei jeder Änderung ein neues `ServerToken`, sonst behält der Mac die vorige Version; die meisten MDMs setzen das Token selbst.",
                "Deliver it with an MDM that supports declarative device management on the user channel, because macOS applies the `Privacy` key only to users. Give it a new `ServerToken` whenever you change it, or the Mac keeps the previous version; most MDMs set the token themselves.",
              ),
            )}
          </li>
          <li>
            {tx(
              "Behalte das Datenschutzprofil für ältere macOS-Versionen und für PostEvent, Eingabeüberwachung und Bildschirmaufnahme.",
              "Keep the privacy profile for earlier macOS versions and for PostEvent, Input Monitoring, and Screen Recording.",
            )}
          </li>
        </ul>
      </DocsSection>

      <DocsSection id="network" title={tx("Netzwerk-Hosts", "Network hosts")}>
        <p>
          {tx(
            "Die App selbst kontaktiert diese Hosts über HTTPS und nutzt dabei die Proxy-Einstellungen des Systems:",
            "The app itself contacts these hosts over HTTPS, using the system proxy settings:",
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
          {tx(
            "Schaltet ein Benutzer die Verbindung für gekoppelte iPhones und iPads ein, lauscht TypeWhisper dafür im lokalen Netzwerk. Die HTTP-API lauscht nur auf der Loopback-Schnittstelle.",
            "When a user turns on the connection for paired iPhones and iPads, TypeWhisper listens on the local network for them. The HTTP API listens on the loopback interface only.",
          )}
        </p>
        <p>
          {withCode(
            tx(
              "Cloud-Plugins kontaktieren ihren Anbieter. Die Tabelle nennt die Hosts der Plugins im Katalog, Stand TypeWhisper für Mac 1.8. Plugins mit dem Verarbeitungsort `configurable` erreichen den Endpunkt, Befehl oder Dienst, den der Benutzer einträgt.",
              "Cloud plugins contact their vendor. The table lists the hosts of the plugins in the catalog as of TypeWhisper for Mac 1.8. Plugins with the `configurable` locality reach whatever endpoint, command, or service the user configures.",
            ),
          )}
        </p>
        <DocsTable
          label={tx("Hosts der Plugins", "Plugin hosts")}
          head={["Plugin", "Hosts"]}
          rows={pluginHosts.map(([plugin, en, de]) => [
            plugin,
            withCode(isDe && de ? de : en),
          ])}
        />
      </DocsSection>

      <DocsSection
        id="provisioning"
        title={tx("Modelle und Plugins bereitstellen", "Provide models and plugins")}
      >
        <ul>
          <li>
            {tx(
              "TypeWhisper liest das Profil beim Start vor allem anderen. Ein Profil, das beim ersten Start vorhanden ist, gilt also sofort. Verteile einschränkende Profile vor der App oder zusammen mit ihr.",
              "TypeWhisper reads the profile before anything else at launch, so a profile present at the first launch applies right away. Deploy restrictive profiles before or together with the app.",
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Sind `AllowModelDownloads` oder `AllowPluginDownloads` abgeschaltet, können Benutzer Modelle oder Plugins nicht selbst laden. Modelle und Plugins liegen in `~/Library/Application Support` jedes Benutzers: Lege sie dort ab, bevor die Einschränkung greift, oder erlaube Downloads für die erste Einrichtung. Kopiere nie Einstellungen oder Schlüsselbund-Einträge eines anderen Benutzers.",
                "With `AllowModelDownloads` or `AllowPluginDownloads` turned off, users cannot fetch models or plugins themselves. Models and plugins live in each user's `~/Library/Application Support`: stage them there before the restriction applies, or allow downloads for the first setup. Never copy another user's settings or Keychain items.",
              ),
            )}
          </li>
          <li>
            {tx(
              "Die Schlüssel steuern das Verhalten von TypeWhisper, nicht das Netzwerk. Kombiniere sie mit den Netzwerkkontrollen deines MDM, wo du stärkere Garantien brauchst.",
              "The keys govern TypeWhisper's behavior, not the network. Combine them with your MDM's network controls where you need stronger guarantees.",
            )}
          </li>
        </ul>
      </DocsSection>

      <DocsSection id="pilot" title={tx("Pilottest", "Pilot checklist")}>
        <p>
          {tx(
            "Prüfe vor dem Rollout auf einem verwalteten Mac mit dem Release, das du verteilst:",
            "Before the rollout, check on one managed Mac with the release you deploy:",
          )}
        </p>
        <ol>
          <li>
            {tx("Verteile das ", "Deploy the ")}
            <a href={managedSettings}>{tx("Profil", "profile")}</a>
            {tx(
              " und starte TypeWhisper als Standardbenutzer. Einstellungen > Erweitert > Verwaltete Einstellungen listet die Werte, ohne ungültige Schlüssel und ohne Probleme mit Richtlinien.",
              " and launch TypeWhisper as a standard user. Settings > Advanced > Managed Settings lists the values, with no invalid keys or policy problems.",
            )}
          </li>
          <li>
            {tx(
              "Gesperrte Einstellungen zeigen „Von deiner Organisation verwaltet“, und abgelehnte Anbieter und Plugins nennen den Grund.",
              "Locked settings show “Managed by your organization”, and refused providers and plugins show the reason.",
            )}
          </li>
          <li>
            {tx(
              "Diktiere einmal mit der vorgesehenen Engine und, falls genutzt, mit einem Workflow mit Sprachmodell.",
              "Dictate once with the intended engine and, if used, a language model workflow.",
            )}
          </li>
          <li>
            {tx(
              "Prüfe die Modelle, die deine Einrichtung braucht, besonders wenn Downloads abgeschaltet sind.",
              "Confirm the models your setup needs, especially with downloads turned off.",
            )}
          </li>
          <li>
            {tx(
              "Ändere einen Wert im MDM und prüfe, dass die App ihn nach etwa 30 Sekunden ohne Neustart übernimmt. Entferne das Profil und prüfe, dass die eigenen Einstellungen des Benutzers zurückkehren.",
              "Change a value in the MDM and confirm the app applies it within about 30 seconds without a restart. Remove the profile and confirm the user's own settings return.",
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Mit `ManagedLicenseKey`: Einstellungen > Lizenz zeigt den verwalteten Zustand und die Aktivierung. Starte TypeWhisper zweimal neu und prüfe, dass Polar keine zusätzlichen Aktivierungen zeigt. Wiederhole das mit einem zweiten Benutzer und mit einem ersten Start ohne Internet, gefolgt von „Aktivierung erneut versuchen“. Ersetze danach den Schlüssel, entferne ihn und vergleiche das Ergebnis mit dem Ablauf unter „Verwalteter Lizenzschlüssel“.",
                "With `ManagedLicenseKey`: Settings > License shows the managed state and the activation. Restart TypeWhisper twice and confirm that Polar shows no additional activations. Repeat with a second user and with an offline first launch followed by Retry Activation. Then replace the key, remove it, and compare the result with the lifecycle under Managed license key.",
              ),
            )}
          </li>
          <li>
            {tx(
              "Starte den Mac neu und prüfe, dass Anmeldeobjekt, Mikrofon und die übrigen Berechtigungen sich wie vorgesehen verhalten.",
              "Restart the Mac and confirm that the login item, the microphone, and the other permissions behave as intended.",
            )}
          </li>
          <li>
            {tx(
              "Wiederhole die Prüfung mit der Mac-App-Store-Edition, wenn du sie verteilst.",
              "Repeat with the Mac App Store edition if you deploy it.",
            )}
          </li>
        </ol>
        <a href={managedSettings} className="site-link">
          {tx("Alle verwalteten Einstellungen", "All managed settings")}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </DocsSection>
    </>
  );
}

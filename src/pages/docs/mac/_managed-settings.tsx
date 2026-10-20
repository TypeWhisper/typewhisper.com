import { Fragment, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import {
  breakable,
  DocsCallout,
  DocsCode,
  DocsSection,
  DocsSubheading,
  DocsTable,
  withCode,
} from "@/components/docs/prose";
import { localePath, t, type Locale } from "@/i18n/index";
import { macGitHubUrl } from "@/lib/platform-download";

/*
 * Adapted from docs/mdm/managed-settings.md and docs/mdm/README.md in
 * typewhisper-mac. The key names, values, and precedence match the registry
 * policies of TypeWhisper for Windows.
 */

type Scope = "enforced" | "both";
type Group = "license" | "models" | "updates" | "data";

interface PolicyKey {
  group: Group;
  /** Preference keys the setting uses. */
  names: string[];
  type: [en: string, de: string];
  scope: Scope;
  /** The Mac App Store edition ignores the key and lists it as a policy problem. */
  directDownloadOnly?: boolean;
  /** Backticks set inline code. */
  behavior: [en: string, de: string];
}

const keys: PolicyKey[] = [
  {
    group: "license",
    names: ["ManagedLicenseKey"],
    type: ["String", "String"],
    scope: "enforced",
    directDownloadOnly: true,
    behavior: [
      "Activates a commercial license for the signed-in user and manages the license controls in the app while it is set. Supporter keys are not accepted. A new, changed, or removed key applies within about 30 seconds, without a restart. See Managed license key below.",
      "Aktiviert eine kommerzielle Lizenz für den angemeldeten Benutzer und verwaltet die Lizenzsteuerung in der App, solange der Wert gesetzt ist. Supporter-Schlüssel werden nicht akzeptiert. Ein neuer, geänderter oder entfernter Schlüssel gilt nach etwa 30 Sekunden, ohne Neustart. Siehe „Verwalteter Lizenzschlüssel“ weiter unten.",
    ],
  },
  {
    group: "models",
    names: ["TranscriptionProviderId", "TranscriptionModelId"],
    type: ["String pair", "String-Paar"],
    scope: "both",
    behavior: [
      "Enforced: fixes the transcription engine and model for every entry point: dictation and its live preview, file transcription, the Recorder, watch folders, recovery, re-transcription in History, and the HTTP API. Recommended: the starting selection of a user who has not chosen an engine. Set both values at the same scope.",
      "Erzwungen: legt Transkriptions-Engine und -Modell für jeden Einstiegspunkt fest: Diktat und Live-Vorschau, Datei-Transkription, Recorder, Überwachungsordner, Wiederherstellung, erneute Transkription im Verlauf und die HTTP-API. Empfohlen: die erste Auswahl eines Benutzers, der noch keine Engine gewählt hat. Setze beide Werte auf derselben Ebene.",
    ],
  },
  {
    group: "models",
    names: ["LlmProviderId", "LlmModelId"],
    type: ["String pair", "String-Paar"],
    scope: "both",
    behavior: [
      "Enforced: replaces the provider and model of every language model call: workflows, prompts, the fallback list, translation by language model, and the text processing API. Recommended: replaces the built-in default language model of a user who has not changed it. Set both values at the same scope.",
      "Erzwungen: ersetzt Anbieter und Modell jedes Sprachmodell-Aufrufs: Workflows, Prompts, die Fallback-Liste, Übersetzung per Sprachmodell und die Textverarbeitung über die API. Empfohlen: ersetzt das eingebaute Standard-Sprachmodell eines Benutzers, der es nicht geändert hat. Setze beide Werte auf derselben Ebene.",
    ],
  },
  {
    group: "updates",
    names: ["UpdateMode"],
    type: ["Integer 0–2", "Integer 0–2"],
    scope: "enforced",
    directDownloadOnly: true,
    behavior: [
      "`0` External: no update checks, downloads, or installations; Settings says “App updates are managed by your organization.” `1` Check only: TypeWhisper checks at launch, when the policy changes, and on its regular schedule, and shows a newer version in Settings > About without installing it. `2` User-initiated: updates install only when the user chooses Check for Updates; automatic background downloads are refused. Not set: the normal update behavior. In every mode, the app does not ask whether to check automatically.",
      "`0` Extern: keine Update-Prüfungen, Downloads oder Installationen; die Einstellungen zeigen „App-Updates werden von deiner Organisation verwaltet.“ `1` Nur prüfen: TypeWhisper prüft beim Start, bei einer Änderung der Richtlinie und im regulären Rhythmus und zeigt eine neuere Version unter Einstellungen > Über an, ohne sie zu installieren. `2` Durch den Benutzer: Updates werden nur installiert, wenn der Benutzer „Nach Updates suchen …“ wählt; automatische Downloads im Hintergrund werden abgelehnt. Nicht gesetzt: normales Update-Verhalten. In keinem Modus fragt die App, ob sie automatisch prüfen soll.",
    ],
  },
  {
    group: "updates",
    names: ["UpdateChannel"],
    type: ["Integer 0–2", "Integer 0–2"],
    scope: "both",
    directDownloadOnly: true,
    behavior: [
      "`0` Stable, `1` Daily, `2` Release Candidate. Enforced fixes the channel and locks the channel picker; recommended is the channel of a user who has never chosen one.",
      "`0` Stable, `1` Daily, `2` Release Candidate. Erzwungen legt den Kanal fest und sperrt die Kanalauswahl; empfohlen ist der Kanal eines Benutzers, der nie selbst einen gewählt hat.",
    ],
  },
  {
    group: "updates",
    names: ["AllowedUpdateChannels"],
    type: ["Array", "Array"],
    scope: "enforced",
    directDownloadOnly: true,
    behavior: [
      "Entries `stable`, `daily`, `release-candidate`. The channel picker offers only these channels, and checks on any other channel are refused. An empty array, or `none` as the only entry, turns app updates off; next to a channel, `none` is ignored. An enforced `UpdateChannel` outside the list is a policy problem that turns updates off; TypeWhisper never switches channels on its own.",
      "Einträge `stable`, `daily`, `release-candidate`. Die Kanalauswahl bietet nur diese Kanäle an, und Prüfungen auf einem anderen Kanal werden abgelehnt. Ein leeres Array oder `none` als einziger Eintrag schaltet App-Updates ab; neben einem Kanal wird `none` ignoriert. Ein erzwungener `UpdateChannel` außerhalb der Liste ist ein Richtlinienproblem und schaltet Updates ab; TypeWhisper wechselt den Kanal nie eigenständig.",
    ],
  },
  {
    group: "updates",
    names: ["LaunchAtLogin"],
    type: ["Boolean", "Boolean"],
    scope: "both",
    behavior: [
      "Enforced: `true` registers TypeWhisper's login item and `false` removes it; the setting is locked, and the state from before returns when the value is removed. Recommended: applied once, to a user who has not completed setup and has not chosen. Users can still turn the login item off in System Settings unless a Service Management payload approves it; see Deployment.",
      "Erzwungen: `true` registriert das Anmeldeobjekt von TypeWhisper, `false` entfernt es; die Einstellung ist gesperrt, und der vorherige Zustand kehrt zurück, sobald der Wert entfernt wird. Empfohlen: wird einmal angewendet, bei einem Benutzer, der die Einrichtung noch nicht abgeschlossen und nichts gewählt hat. Benutzer können das Anmeldeobjekt in den Systemeinstellungen weiterhin abschalten, solange kein Service-Management-Payload es freigibt; siehe Bereitstellung.",
    ],
  },
  {
    group: "updates",
    names: ["SkipOnboardingWhenReady"],
    type: ["Boolean", "Boolean"],
    scope: "enforced",
    behavior: [
      "`true` keeps the setup wizard closed when a transcription engine is ready, the microphone and (in the direct download) Accessibility are granted, and a dictation shortcut exists. Otherwise setup opens at the first missing step instead of the welcome page. Nothing is marked as completed, so setup returns if a prerequisite goes missing or the value is removed.",
      "`true` hält den Einrichtungsassistenten geschlossen, wenn eine Transkriptions-Engine bereit ist, Mikrofon und (beim Direkt-Download) Bedienungshilfen erlaubt sind und ein Diktat-Tastenkürzel existiert. Sonst öffnet sich die Einrichtung beim ersten fehlenden Schritt statt auf der Willkommensseite. Nichts wird als abgeschlossen markiert, daher kehrt die Einrichtung zurück, wenn eine Voraussetzung wegfällt oder der Wert entfernt wird.",
    ],
  },
  {
    group: "updates",
    names: ["SuppressOptionalPrompts"],
    type: ["Boolean", "Boolean"],
    scope: "both",
    behavior: [
      "`true` hides the automatic overview of new features, the iPhone app promotion, the work-use license card on the dashboard, and the Unlock button on the Premium page. License, setup, permission, policy, and error messages stay visible, and the overview of new features stays available in Settings > About.",
      "`true` blendet die automatische Übersicht neuer Funktionen, den Hinweis auf die iPhone-App, die Lizenzkarte für berufliche Nutzung im Dashboard und die Schaltfläche zum Freischalten auf der Premium-Seite aus. Lizenz-, Einrichtungs-, Berechtigungs-, Richtlinien- und Fehlermeldungen bleiben sichtbar, und die Übersicht neuer Funktionen bleibt unter Einstellungen > Über erreichbar.",
    ],
  },
  {
    group: "data",
    names: ["AllowCloudTranscription"],
    type: ["Boolean", "Boolean"],
    scope: "enforced",
    behavior: [
      "`false` keeps audio on the Mac: only plugins whose locality is `local` transcribe. Dictation, file transcription, the Recorder, watch folders, recovery, re-transcription in History, and the HTTP API refuse with the reason instead of sending audio to a refused engine; the API answers 403.",
      "`false` hält Audio auf dem Mac: Nur Plugins mit dem Verarbeitungsort `local` transkribieren. Diktat, Datei-Transkription, Recorder, Überwachungsordner, Wiederherstellung, erneute Transkription im Verlauf und die HTTP-API lehnen mit Begründung ab, statt Audio an eine gesperrte Engine zu senden; die API antwortet mit 403.",
    ],
  },
  {
    group: "data",
    names: ["AllowCloudTextProcessing"],
    type: ["Boolean", "Boolean"],
    scope: "enforced",
    behavior: [
      "`false` keeps transcripts, prompts, dictionary terms, and context on the Mac: language models, post-processors, actions, speech output, memory plugins, and event subscribers that are not local receive nothing. Dictionary terms are not sent as prompt text to a transcription engine that is not local either.",
      "`false` hält Transkripte, Prompts, Wörterbuchbegriffe und Kontext auf dem Mac: Sprachmodelle, Nachbearbeitung, Aktionen, Sprachausgabe, Gedächtnis-Plugins und Ereignis-Empfänger, die nicht lokal arbeiten, erhalten nichts. Auch Wörterbuchbegriffe gehen nicht mehr als Prompt-Text an eine Transkriptions-Engine, die nicht lokal arbeitet.",
    ],
  },
  {
    group: "data",
    names: ["AllowedTranscriptionProviders"],
    type: ["Array", "Array"],
    scope: "enforced",
    behavior: [
      "Provider IDs that may receive audio; see Provider IDs below. Applies to every entry point, including workflow and API overrides.",
      "Anbieter-IDs, die Audio empfangen dürfen; siehe „Anbieter-IDs“ weiter unten. Gilt an jedem Einstiegspunkt, auch für Overrides in Workflows und in der API.",
    ],
  },
  {
    group: "data",
    names: ["AllowedLlmProviders"],
    type: ["Array", "Array"],
    scope: "enforced",
    behavior: [
      "Provider IDs that may receive text, including workflows, prompts, translation by language model, and memory extraction. Apple Intelligence is `com.typewhisper.apple-intelligence`.",
      "Anbieter-IDs, die Text empfangen dürfen, auch in Workflows, Prompts, Übersetzung per Sprachmodell und beim Extrahieren von Erinnerungen. Apple Intelligence ist `com.typewhisper.apple-intelligence`.",
    ],
  },
  {
    group: "data",
    names: ["AllowedPlugins"],
    type: ["Array", "Array"],
    scope: "enforced",
    behavior: [
      "Plugin IDs that may be installed, loaded, and enabled. A plugin outside the list never loads. One that is running when the list changes stops, and loads again once the list allows it.",
      "Plugin-IDs, die installiert, geladen und aktiviert werden dürfen. Ein Plugin außerhalb der Liste wird nie geladen. Ein Plugin, das läuft, wenn sich die Liste ändert, stoppt und lädt wieder, sobald die Liste es erlaubt.",
    ],
  },
  {
    group: "data",
    names: ["AllowPluginDownloads"],
    type: ["Boolean", "Boolean"],
    scope: "enforced",
    directDownloadOnly: true,
    behavior: [
      "`false` refuses installing and updating plugins from the Marketplace, from settings backups, from setup, and from files. Installed plugins keep running.",
      "`false` lehnt das Installieren und Aktualisieren von Plugins aus dem Marketplace, aus Einstellungs-Backups, aus der Einrichtung und aus Dateien ab. Installierte Plugins laufen weiter.",
    ],
  },
  {
    group: "data",
    names: ["AllowModelDownloads"],
    type: ["Boolean", "Boolean"],
    scope: "enforced",
    behavior: [
      "`false` refuses model downloads: models a plugin downloads from its settings, while loading, or when restoring, Hugging Face imports, and the speaker detection models. Installed models keep working. Requires plugin versions built for TypeWhisper 1.8.",
      "`false` lehnt Modell-Downloads ab: Modelle, die ein Plugin aus seinen Einstellungen, beim Laden oder beim Wiederherstellen lädt, Importe von Hugging Face und die Modelle der Sprechererkennung. Installierte Modelle funktionieren weiter. Setzt Plugin-Versionen voraus, die für TypeWhisper 1.8 gebaut sind.",
    ],
  },
];

const groups: Array<[id: Group, en: string, de: string]> = [
  ["license", "License", "Lizenz"],
  ["models", "Models", "Modelle"],
  ["updates", "Updates and startup", "Updates und Start"],
  ["data", "Data and plugins", "Daten und Plugins"],
];

const deploymentFilesUrl = `${macGitHubUrl}/tree/main/deployment/macos`;
const deploymentFileUrl = (path: string) =>
  `${macGitHubUrl}/blob/main/deployment/macos/${path}`;
const generatorRawUrl =
  "https://raw.githubusercontent.com/TypeWhisper/typewhisper-mac/main/deployment/macos/make-typewhisper-profile.py";
const licenseProfileUrl = `${macGitHubUrl}/blob/main/docs/mdm/TypeWhisper-License.mobileconfig`;

/** Files in deployment/macos: path, English purpose, German purpose. */
const deploymentFiles: Array<[path: string, en: string, de: string]> = [
  [
    "make-typewhisper-profile.py",
    "Builds a configuration profile from `KEY=VALUE` pairs and checks every value against the keys on this page. Python 3.9 or later, no packages.",
    "Baut ein Konfigurationsprofil aus `KEY=VALUE`-Paaren und prüft jeden Wert gegen die Schlüssel auf dieser Seite. Python 3.9 oder neuer, keine Pakete.",
  ],
  [
    "examples/TypeWhisper-LocalOnly.mobileconfig",
    "Audio and text stay on the Mac; Parakeet v3 is enforced for transcription.",
    "Audio und Text bleiben auf dem Mac; Parakeet v3 ist für die Transkription erzwungen.",
  ],
  [
    "examples/TypeWhisper-ApprovedCloud.mobileconfig",
    "Only Parakeet and OpenAI may transcribe, only OpenAI and Apple Intelligence may process text, no plugin downloads; OpenAI is recommended for transcription.",
    "Nur Parakeet und OpenAI dürfen transkribieren, nur OpenAI und Apple Intelligence dürfen Text verarbeiten, keine Plugin-Downloads; OpenAI ist für die Transkription empfohlen.",
  ],
  [
    "examples/TypeWhisper-DeploymentUpdates.mobileconfig",
    "Your deployment updates the app, TypeWhisper starts at login, setup stays closed when ready, and optional prompts are hidden.",
    "Deine Softwareverteilung aktualisiert die App, TypeWhisper startet bei der Anmeldung, die Einrichtung bleibt geschlossen, wenn alles bereit ist, und optionale Hinweise sind ausgeblendet.",
  ],
  [
    "examples/TypeWhisper-RecommendedDefaults.mobileconfig",
    "Editable defaults for both editions.",
    "Änderbare Vorgaben für beide Editionen.",
  ],
  [
    "examples/TypeWhisper-LoginItem.mobileconfig",
    "Approves the login item (Service Management payload).",
    "Gibt das Anmeldeobjekt frei (Service-Management-Payload).",
  ],
  [
    "examples/TypeWhisper-Privacy.mobileconfig",
    "Privacy preferences (PPPC); see the Deployment page.",
    "Datenschutzeinstellungen (PPPC); siehe die Seite Bereitstellung.",
  ],
  [
    "examples/TypeWhisper-AppSettings-Privacy.json",
    "Declarative app settings for macOS 27 and later that propose Accessibility and the microphone; see the Deployment page.",
    "Deklarative App-Einstellungen für macOS 27 und neuer, die Bedienungshilfen und Mikrofon vorschlagen; siehe die Seite Bereitstellung.",
  ],
  [
    "jamf/<domain>.json",
    "Jamf Pro custom schemas, one per edition. The App Store schema leaves out the keys that edition ignores.",
    "Eigene Schemas für Jamf Pro, eines pro Edition. Das Schema der App-Store-Edition lässt die Schlüssel weg, die diese Edition ignoriert.",
  ],
  [
    "ProfileManifests/<domain>.plist",
    "The same settings in the ProfileManifests format of profile editors such as iMazing Profile Editor.",
    "Dieselben Einstellungen im ProfileManifests-Format von Profil-Editoren wie dem iMazing Profile Editor.",
  ],
];

const payloadExample = `<dict>
    <key>PayloadType</key>
    <string>com.typewhisper.mac</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
    <key>PayloadIdentifier</key>
    <string>com.example.typewhisper.com.typewhisper.mac</string>
    <key>PayloadUUID</key>
    <string>0D5A3A6E-9C1B-4F3A-8E2D-6B7C1F0A2E41</string>
    <key>PayloadDisplayName</key>
    <string>TypeWhisper managed settings</string>
    <key>UpdateMode</key>
    <integer>1</integer>
    <key>AllowedUpdateChannels</key>
    <array>
        <string>stable</string>
    </array>
    <key>SuppressOptionalPrompts</key>
    <true/>
    <key>Recommended</key>
    <dict>
        <key>LaunchAtLogin</key>
        <true/>
    </dict>
</dict>`;

const generatorDownload = `curl -fsSLO ${generatorRawUrl}
chmod +x make-typewhisper-profile.py`;

const generatorQuickStart = `./make-typewhisper-profile.py \\
    --set AllowCloudTranscription=false \\
    --set AllowCloudTextProcessing=false \\
    --set TranscriptionProviderId=com.typewhisper.parakeet \\
    --set TranscriptionModelId=parakeet-tdt-0.6b-v3 \\
    --set SuppressOptionalPrompts=true \\
    --recommend LaunchAtLogin=true \\
    --domain com.typewhisper.mac \\
    --domain com.typewhisper.typewhisper-app \\
    --identifier com.example.typewhisper \\
    --organization "Example Corp" --output TypeWhisper.mobileconfig`;

const generatorExamples = (isDe: boolean) => `# ${isDe ? "Updates über die Softwareverteilung, empfohlener (änderbarer) Kanal" : "Updates through your deployment, recommended (editable) channel"}
./make-typewhisper-profile.py --set UpdateMode=external --recommend UpdateChannel=stable \\
    --identifier com.example.typewhisper --output TypeWhisper-Updates.mobileconfig

# ${isDe ? "Nur freigegebene Anbieter und Plugins, keine Plugin-Downloads" : "Approved providers and plugins only, no plugin downloads"}
./make-typewhisper-profile.py \\
    --set AllowedTranscriptionProviders=com.typewhisper.parakeet,com.typewhisper.openai \\
    --set AllowedLlmProviders=com.typewhisper.openai,com.typewhisper.apple-intelligence \\
    --set AllowPluginDownloads=false \\
    --identifier com.example.typewhisper --output TypeWhisper-Approved.mobileconfig

# ${isDe ? "Eine Liste, die nichts erlaubt" : "A list that allows nothing"}
./make-typewhisper-profile.py --set AllowedPlugins= \\
    --identifier com.example.typewhisper --output TypeWhisper-NoPlugins.mobileconfig`;

const licenseDefaults = `/usr/bin/defaults write com.typewhisper.mac ManagedLicenseKey -string 'YOUR_LICENSE_KEY'`;

export function macManagedSettingsHead(locale: Locale) {
  return locale === "de"
    ? {
        heading: "Verwaltete Einstellungen",
        lede: "Steuere Lizenz, Modelle, Cloud-Verarbeitung, Downloads, Updates und Start zentral über Konfigurationsprofile: mit Iru, Jamf Pro oder jedem MDM, das eigene Profile verteilt.",
      }
    : {
        heading: "Managed Settings",
        lede: "Control the license, models, cloud processing, downloads, updates, and startup through configuration profiles: with Iru, Jamf Pro, or any MDM that deploys custom profiles.",
      };
}

/** Preference keys of a setting, with type and scope below them. */
function KeyCell({ names, meta }: { names: string[]; meta: string }) {
  return (
    <>
      {names.map((name, index) => (
        <Fragment key={name}>
          {index > 0 && <br />}
          <code>{breakable(name, true)}</code>
        </Fragment>
      ))}
      <span className="docs-table__meta">{meta}</span>
    </>
  );
}

export default function DocsMacManagedSettings({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const isDe = locale === "de";
  const tx = <T extends ReactNode>(de: T, en: T) => (isDe ? de : en);
  const pick = ([en, de]: [string, string]) => (isDe ? de : en);
  const scopeLabel = (scope: Scope) =>
    scope === "both"
      ? tx("erzwungen oder empfohlen", "enforced or recommended")
      : tx("erzwungen", "enforced");
  const keyMeta = (key: PolicyKey) =>
    [
      pick(key.type),
      scopeLabel(key.scope),
      key.directDownloadOnly && tx("nur Direkt-Download", "direct download only"),
    ]
      .filter(Boolean)
      .join(" · ");
  const deployment = localePath(locale, "/docs/mac/deployment");
  const appStoreIgnored = keys.filter((key) => key.directDownloadOnly);

  return (
    <>
      <DocsCallout label={t(locale, "docs.callout.note")}>
        <p>
          {withCode(
            tx(
              "Verwaltete Einstellungen gibt es ab TypeWhisper für Mac 1.8. Den verwalteten Lizenzschlüssel (`ManagedLicenseKey`) gibt es schon seit 1.6.1. Ohne Profil ändert sich nichts. Wie du TypeWhisper selbst verteilst, beschreibt die Seite ",
              "Managed settings are available from TypeWhisper for Mac 1.8. The managed license key (`ManagedLicenseKey`) has been available since 1.6.1. Without a profile nothing changes. To roll out the app itself, see ",
            ),
          )}
          <a href={deployment}>{tx("Bereitstellung", "Deployment")}</a>.
        </p>
      </DocsCallout>

      <DocsSection
        id="quick-start"
        title={tx("Schnellstart", "Quick start")}
      >
        <ol>
          <li>
            {tx("Lade den ", "Download the ")}
            <a
              href={deploymentFileUrl("make-typewhisper-profile.py")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tx("Profilgenerator", "profile generator")}
            </a>
            {tx(
              " und baue ein Profil mit den Einstellungen, die du brauchst. Er prüft jeden Wert, bevor er das Profil schreibt.",
              " and build a profile with the settings you need. It checks every value before it writes the profile.",
            )}
          </li>
          <li>
            {tx(
              "Lade das Profil in dein MDM hoch, etwa als eigenes Profil in Iru oder unter Configuration Profiles in Jamf Pro, und weise es einem Test-Mac zu.",
              "Upload the profile to your MDM, for example as a custom profile in Iru or under Configuration Profiles in Jamf Pro, and assign it to a test Mac.",
            )}
          </li>
          <li>
            {tx(
              "Öffne auf dem Mac TypeWhisper > Einstellungen > Erweitert > Verwaltete Einstellungen. Dort stehen die verwalteten Werte und alle Probleme mit Richtlinien.",
              "On the Mac, open TypeWhisper > Settings > Advanced > Managed Settings. It lists the managed values and any policy problems.",
            )}
          </li>
        </ol>
        <DocsCode locale={locale} lang="shell" code={generatorDownload} />
        <DocsCode locale={locale} lang="shell" code={generatorQuickStart} />
        <p>
          {tx("Details stehen unter ", "Details are under ")}
          <a href="#generator">{tx("Profilgenerator", "Profile generator")}</a>
          {tx(", ", ", ")}
          <a href="#iru">Iru</a>
          {tx(", ", ", ")}
          <a href="#jamf-pro">Jamf Pro</a>
          {tx(" und ", ", and ")}
          <a href="#other-mdms">{tx("andere MDMs", "other MDMs")}</a>.
        </p>
      </DocsSection>

      <DocsSection
        id="how-it-works"
        title={tx(
          "So funktionieren verwaltete Einstellungen",
          "How managed settings work",
        )}
      >
        <p>
          {tx(
            "Ein Konfigurationsprofil setzt verwaltete Einstellungen für die Preference Domain der App. Das ist derselbe Weg, den Iru, Jamf und andere MDMs für App-Einstellungen nutzen. Jede Edition hat ihre eigene Domain:",
            "A configuration profile sets managed preferences for the app's preference domain, the same mechanism Iru, Jamf, and other MDMs use for app settings. Each edition has its own domain:",
          )}
        </p>
        <DocsTable
          label={tx("Preference Domains", "Preference domains")}
          head={[tx("Edition", "Edition"), "Domain"]}
          rows={[
            [
              tx("TypeWhisper (Direkt-Download)", "TypeWhisper (direct download)"),
              <code>com.typewhisper.mac</code>,
            ],
            [
              tx("TypeWhisper aus dem Mac App Store", "TypeWhisper from the Mac App Store"),
              <code>com.typewhisper.typewhisper-app</code>,
            ],
            [
              tx("Entwicklungs-Builds", "Development builds"),
              withCode(
                tx(
                  "dieselben Domains mit der Endung `.dev`, nur für Tests",
                  "the same domains with a `.dev` suffix, for testing only",
                ),
              ),
            ],
          ]}
        />
        <p>
          {withCode(
            tx(
              "Schlüssel auf der obersten Ebene des Payloads sind erzwungen: Benutzer können sie nicht ändern. Schlüssel in einem Dictionary `Recommended` sind Vorgaben der Administration: Sie gelten, bis der Benutzer selbst etwas wählt, und bleiben änderbar. Setzen mehrere Quellen einen Wert, gilt diese Reihenfolge:",
              "Keys at the top level of the payload are enforced: users cannot change them. Keys inside a `Recommended` dictionary are administrator defaults: they apply until the user makes their own choice and stay editable. When several sources set a value, this order applies:",
            ),
          )}
        </p>
        <ol>
          <li>{tx("Erzwungener Wert", "Enforced value")}</li>
          <li>{tx("Eigene Wahl des Benutzers", "The user's own choice")}</li>
          <li>{tx("Empfohlener Wert", "Recommended value")}</li>
          <li>{tx("Standard der App", "The app default")}</li>
        </ol>
        <p>
          {tx(
            "TypeWhisper schreibt diese Werte nie und speichert das wirksame Ergebnis nie über der eigenen Einstellung eines Benutzers. Wird ein Wert entfernt, gilt wieder die Einstellung des Benutzers.",
            "TypeWhisper never writes these values and never stores the effective result over a user's own setting, so removing a value brings the user's setting back.",
          )}
        </p>

        <DocsSubheading id="profile-layout">
          {tx("Aufbau des Profils", "Profile layout")}
        </DocsSubheading>
        <p>
          {withCode(
            tx(
              "Jeder Payload nennt die Domain als `PayloadType` und enthält die Einstellungen neben seinen eigenen `Payload`-Schlüsseln. Ist das Profil installiert, listen die Systemeinstellungen jede Einstellung mit ihrem Wert auf:",
              "Each payload names the domain as its `PayloadType` and holds the settings next to its own `Payload` keys. Once the profile is installed, System Settings lists every setting with its value:",
            ),
          )}
        </p>
        <DocsCode locale={locale} lang="xml" code={payloadExample} />
        <ul>
          <li>
            {tx("Das umgebende Profil ist dasselbe wie in den ", "The surrounding profile is the same as in the ")}
            <a href={`${deploymentFilesUrl}/examples`} target="_blank" rel="noopener noreferrer">
              {tx("Beispielprofilen", "example profiles")}
            </a>
            .
          </li>
          <li>
            {withCode(
              tx(
                "Der Payload für eigene Einstellungen (`com.apple.ManagedClient.preferences`) mit den Werten unter `Forced` > `mcx_preference_settings` funktioniert genauso.",
                "The custom settings payload (`com.apple.ManagedClient.preferences`) with the values under `Forced` > `mcx_preference_settings` works the same way.",
              ),
            )}
          </li>
          <li>
            {tx(
              "Geräte- und Benutzerprofile funktionieren beide. Ein Geräteprofil gilt für alle Benutzer des Mac, ein Benutzerprofil nur für diesen Benutzer.",
              "Device and user scope both work. A device profile applies to every user of the Mac, a user profile only to that user.",
            )}
          </li>
          <li>
            {withCode(
              tx(
                "macOS kopiert einige Schlüssel des Profils selbst in die Domain, etwa `PayloadUUID` und `_manualProfile`. TypeWhisper ignoriert Schlüssel, die mit `Payload` oder `_` beginnen.",
                "macOS copies some keys of the profile itself into the domain, such as `PayloadUUID` and `_manualProfile`. TypeWhisper ignores keys that start with `Payload` or `_`.",
              ),
            )}
          </li>
        </ul>

        <DocsSubheading id="value-types">
          {tx("Werttypen und Listen", "Value types and lists")}
        </DocsSubheading>
        <ul>
          <li>
            {withCode(
              tx(
                "Schalter sind Booleans: `<true/>` oder `<false/>`. `<integer>1</integer>` ist kein Boolean.",
                "Switches are Booleans: `<true/>` or `<false/>`. `<integer>1</integer>` is not a Boolean.",
              ),
            )}
          </li>
          <li>{tx("Auswahlwerte sind Integer.", "Options are integers.")}</li>
          <li>
            {tx(
              "Text ist ein String: am Anfang und Ende gekürzt, höchstens 1024 Zeichen, ohne Steuerzeichen.",
              "Text is a string: trimmed, at most 1024 characters, without control characters.",
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Listen sind Arrays mit höchstens 256 Strings. Ein leeres Array oder der einzige Eintrag `none` erlaubt nichts.",
                "Lists are arrays of at most 256 strings. An empty array, or the single entry `none`, allows nothing.",
              ),
            )}
          </li>
          <li>
            {tx(
              "Schlüsselnamen unterscheiden Groß- und Kleinschreibung. Ein Schlüssel, der sich nur darin unterscheidet, wird mit dem gemeinten Namen gemeldet und ignoriert.",
              "Key names are case-sensitive. A key that differs only in letter case is reported with the intended name and ignored.",
            )}
          </li>
        </ul>

        <DocsSubheading id="invalid-values">
          {tx("Ungültige und unbekannte Werte", "Invalid and unknown values")}
        </DocsSubheading>
        <ul>
          <li>
            {tx(
              "Ein Wert mit falschem Typ ist ungültig. Ein ungültiger erzwungener Wert sperrt seine Einstellung, bis er korrigiert ist. Er lockert nie eine Einschränkung.",
              "A value of the wrong type is invalid. An invalid enforced value blocks its setting until it is corrected. It never relaxes a restriction.",
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Eine ungültige Empfehlung und Einschränkungen unter `Recommended` meldet die App und ignoriert sie.",
                "An invalid recommendation and restrictions placed in `Recommended` are reported and ignored.",
              ),
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Werte, die mit `defaults write` geschrieben sind, kann der Benutzer selbst ändern. TypeWhisper ignoriert und meldet sie daher. Die einzige Ausnahme ist `ManagedLicenseKey`, siehe unten.",
                "Values written with `defaults write` are user-writable, so TypeWhisper ignores and reports them. The one exception is `ManagedLicenseKey`, see below.",
              ),
            )}
          </li>
        </ul>

        <DocsSubheading id="refresh">
          {tx("Wann Änderungen gelten", "When changes apply")}
        </DocsSubheading>
        <p>
          {tx(
            "TypeWhisper liest das Profil beim Start, bevor irgendeine andere Einstellung verwendet wird. Ein Profil, das beim ersten Start vorhanden ist, gilt also sofort. Danach liest die App es erneut, wenn sie aktiv wird, nach dem Ruhezustand, nach der Rückkehr in die Benutzersitzung und alle 30 Sekunden. macOS meldet Profiländerungen nicht von selbst; ein neues, ersetztes oder entferntes Profil gilt daher nach etwa 30 Sekunden, ohne Neustart.",
            "TypeWhisper reads the profile at launch, before any other setting is used, so a profile that is present at the first launch applies right away. After that, the app reads it again when it becomes active, after wake, after switching back to the user session, and every 30 seconds. macOS has no change notification for profiles, so a new, replaced, or removed profile takes effect within about 30 seconds without a restart.",
          )}
        </p>
      </DocsSection>

      <DocsSection id="reference" title={tx("Referenz der Schlüssel", "Key reference")}>
        <p>
          {withCode(
            tx(
              "Schlüsselnamen, Werte und Rangfolge entsprechen den Richtlinien von TypeWhisper für Windows; dieselben Entscheidungen gelten also auf beiden Plattformen. Schlüssel, die auch empfohlen werden können, gehören dafür in das Dictionary `Recommended`. Paare und Anbieter-IDs sind unten näher beschrieben.",
              "The key names, values, and precedence match the policies of TypeWhisper for Windows, so one set of decisions applies to both platforms. Keys that can also be recommended go into the `Recommended` dictionary for that. Pairs and provider IDs are described in more detail below.",
            ),
          )}
        </p>
        <p>
          {tx(
            "Die Mac-App-Store-Edition wird vom App Store aktualisiert und bringt ihre Plugins mit. Sie ignoriert die Schlüssel mit dem Vermerk „nur Direkt-Download“ und listet sie als Probleme mit Richtlinien: ",
            "The Mac App Store edition is updated by the App Store and has its plugins built in. It ignores the keys marked “direct download only” and lists them as policy problems: ",
          )}
          {appStoreIgnored.map((key, index) => (
            <Fragment key={key.names[0]}>
              {index > 0 &&
                (index === appStoreIgnored.length - 1 ? tx(" und ", ", and ") : ", ")}
              <code>{key.names[0]}</code>
            </Fragment>
          ))}
          .
        </p>
        {groups.map(([group, en, de]) => (
          <Fragment key={group}>
            <DocsSubheading id={`reference-${group}`}>
              {tx(de, en)}
            </DocsSubheading>
            <DocsTable
              label={tx(`Schlüssel: ${de}`, `Keys: ${en}`)}
              head={[tx("Schlüssel", "Key"), tx("Verhalten", "Behavior")]}
              rows={keys
                .filter((key) => key.group === group)
                .map((key) => [
                  <KeyCell names={key.names} meta={keyMeta(key)} />,
                  withCode(pick(key.behavior)),
                ])}
            />
          </Fragment>
        ))}
      </DocsSection>

      <DocsSection
        id="pairs"
        title={tx("Anbieter-Modell-Paare", "Provider and model pairs")}
      >
        <p>
          {withCode(
            tx(
              "Ein Paar nennt einen Anbieter über seine Anbieter-ID und ein Modell über die ID, die der Anbieter auflistet, zum Beispiel `com.typewhisper.parakeet` mit `parakeet-tdt-0.6b-v3` oder `com.typewhisper.groq` mit `whisper-large-v3`. Anbieter, die keine Modelle auflisten, übernehmen die ID wie geschrieben. Beide Werte gehören auf dieselbe Ebene. Ein Paar mit nur einem Wert ist ungültig und blockiert die Funktion, bis es vollständig ist.",
              "A pair names a provider by its provider ID and a model by the ID the provider lists, for example `com.typewhisper.parakeet` with `parakeet-tdt-0.6b-v3`, or `com.typewhisper.groq` with `whisper-large-v3`. Providers that list no models accept the ID as written. Both values belong at the same scope. A pair with only one value is invalid and blocks the feature until it is complete.",
            ),
          )}
        </p>

        <DocsSubheading id="enforced-pairs">
          {tx("Erzwungene Paare", "Enforced pairs")}
        </DocsSubheading>
        <p>
          {withCode(
            tx(
              "Ein erzwungenes Transkriptionspaar nutzen Diktat und Live-Vorschau, Datei-Transkription, Recorder, Überwachungsordner, Wiederherstellung, erneute Transkription im Verlauf und die HTTP-API, unabhängig von der gewählten Engine, von Workflow-Overrides und von Engines einzelner Funktionen. Eine API-Anfrage für eine andere Engine, ein anderes Modell oder das Laden eines anderen Modells erhält 403. Die Auswahlfelder für Engine und Modell sind gesperrt. Die eigene Auswahl des Benutzers bleibt gespeichert und gilt wieder, sobald das Paar entfernt wird.",
              "An enforced transcription pair is used by dictation and its live preview, file transcription, the Recorder, watch folders, recovery, re-transcription in History, and the HTTP API, regardless of the selected engine, workflow overrides, or per-feature engines. An API request that asks for another engine or model, or to load another model, gets 403. The engine and model pickers are locked. The user's own engine selection is kept and applies again once the pair is removed.",
            ),
          )}
        </p>
        <p>
          {tx(
            "Parakeet ab 1.5.0 und WhisperKit ab 1.3.0 nutzen das erzwungene Modell, ohne es zu speichern. Wird das Paar entfernt, kehren sie zu dem Modell zurück, das der Benutzer gewählt hatte, oder zu keinem Modell, auch wenn das Profil entfernt wurde, während TypeWhisper nicht lief. Wählt der Benutzer in der Zwischenzeit auf der Einstellungsseite der Engine ein Modell, wird es gespeichert und nach dem Entfernen des Paars verwendet. Andere Engines speichern das erzwungene Modell als ihre Auswahl; siehe „Bekannte Grenzen“.",
            "Parakeet 1.5.0 and WhisperKit 1.3.0 or later use the enforced model without saving it. Once the pair is removed, they return to the model the user had selected, or to no model, also when the profile was removed while TypeWhisper was not running. A model the user picks on the engine's settings page meanwhile is saved and used after the pair is removed. Other engines save the enforced model as their selection; see Known limits.",
          )}
        </p>
        <p>
          {tx(
            "Ein erzwungenes Sprachmodell-Paar ersetzt Anbieter und Modell jedes Sprachmodell-Aufrufs. Workflow-Editor und Fallback-Liste behalten ihre gespeicherte Auswahl, sind aber gesperrt.",
            "An enforced language model pair replaces the provider and model of every language model call. The workflow editor and the fallback list keep their saved selections but are locked.",
          )}
        </p>

        <DocsSubheading id="unavailable-ids">
          {tx("Fehlende Anbieter und Modelle", "Missing providers and models")}
        </DocsSubheading>
        <p>
          {withCode(
            tx(
              "Ein Paar, das sich nicht nutzen lässt, weicht nie auf einen anderen Anbieter aus. Ist der Anbieter nicht installiert, abgeschaltet oder durch einen anderen Schlüssel gesperrt, oder bietet er das Modell nicht an, blockiert die betroffene Funktion mit Begründung, und Einstellungen > Erweitert > Verwaltete Einstellungen listet das Problem. Steht `AllowModelDownloads` auf `false`, verteile die Modelldateien zusammen mit der App.",
              "A pair that cannot be used never falls back to another provider. If the provider is not installed, turned off, or refused by another key, or does not offer the model, the affected feature is blocked with the reason, and Settings > Advanced > Managed Settings lists the problem. With `AllowModelDownloads` set to `false`, deploy the model files with the app.",
            ),
          )}
        </p>

        <DocsSubheading id="recommended-pairs">
          {tx("Empfohlene Paare", "Recommended pairs")}
        </DocsSubheading>
        <p>
          {tx(
            "Ein empfohlenes Paar wird einmal angewendet: wenn der Benutzer noch keine Engine gewählt (oder das eingebaute Standard-Sprachmodell behalten) hat und Anbieter und Modell bereit sind. Danach kann der Benutzer es ändern.",
            "A recommended pair is applied once: when the user has not chosen an engine (or has kept the built-in default language model) and the provider and model are ready. The user can change it afterwards.",
          )}
        </p>
      </DocsSection>

      <DocsSection id="provider-ids" title={tx("Anbieter-IDs", "Provider IDs")}>
        <ul>
          <li>
            {withCode(
              tx(
                "Richtlinien nennen Anbieter über die Plugin-ID, also die `id` im Manifest des Plugins, zum Beispiel `com.typewhisper.parakeet`, `com.typewhisper.whisperkit` oder `com.typewhisper.groq`. Eine Plugin-ID umfasst alle Anbieter, die das Plugin bereitstellt.",
                "Policies name providers by plugin ID, the `id` in the plugin's manifest, for example `com.typewhisper.parakeet`, `com.typewhisper.whisperkit`, or `com.typewhisper.groq`. A plugin ID covers every provider the plugin offers.",
              ),
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Für einen einzelnen Anbieter eines Plugins mit mehreren, etwa ein Endpunkt-Profil von OpenAI Compatible, schreibst du `<Plugin-ID>:<Anbieter-ID>`.",
                "For a single provider of a plugin with several, such as one endpoint profile of OpenAI Compatible, use `<plugin ID>:<provider ID>`.",
              ),
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Apple Intelligence ist in die App eingebaut und hat die ID `com.typewhisper.apple-intelligence`.",
                "Apple Intelligence, which is built into the app, is `com.typewhisper.apple-intelligence`.",
              ),
            )}
          </li>
          <li>
            {tx(
              "Beim Vergleich zählt die Groß- und Kleinschreibung nicht.",
              "Matching ignores letter case.",
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Einige Plugin-IDs unterscheiden sich von TypeWhisper für Windows: Parakeet ist auf dem Mac `com.typewhisper.parakeet` und unter Windows `com.typewhisper.sherpa-onnx`. Gilt ein Profil für beide Plattformen, nimm beide IDs in die Listen auf.",
                "Some plugin IDs differ from TypeWhisper for Windows: Parakeet is `com.typewhisper.parakeet` on the Mac and `com.typewhisper.sherpa-onnx` on Windows. If one policy covers both platforms, put both IDs in the lists.",
              ),
            )}
          </li>
        </ul>
      </DocsSection>

      <DocsSection
        id="locality"
        title={tx(
          "Cloud-Verarbeitung und Verarbeitungsort",
          "Cloud processing and plugin locality",
        )}
      >
        <p>
          {withCode(
            tx(
              "Jedes Plugin gibt im Feld `locality` seines Manifests an, wo es Inhalte verarbeitet; der Plugin-Katalog veröffentlicht denselben Wert:",
              "Every plugin declares in the `locality` field of its manifest where it processes content; the plugin catalog publishes the same value:",
            ),
          )}
        </p>
        <ul>
          <li>
            <code>local</code>
            {tx(": Nichts verlässt den Mac.", ": nothing leaves the Mac.")}
          </li>
          <li>
            <code>cloud</code>
            {tx(": der feste Dienst des Anbieters.", ": the vendor's fixed service.")}
          </li>
          <li>
            <code>configurable</code>
            {tx(
              ": ein Endpunkt, Skript oder Befehl, den der Benutzer festlegt und den TypeWhisper nicht einordnen kann.",
              ": an endpoint, script, or command the user configures, which TypeWhisper cannot classify.",
            )}
          </li>
        </ul>
        <p>
          {withCode(
            tx(
              "Unter `AllowCloudTranscription` oder `AllowCloudTextProcessing` erhalten nur noch `local`-Plugins diese Inhalte. Plugins mit `cloud` oder `configurable` und Plugins ohne bekannten Wert werden abgelehnt.",
              "Under `AllowCloudTranscription` or `AllowCloudTextProcessing`, only `local` plugins keep receiving that content. Plugins marked `cloud` or `configurable` and plugins without a known value are refused.",
            ),
          )}
        </p>
        <DocsCallout label={t(locale, "docs.callout.important")}>
          <p>
            {withCode(
              tx(
                "Plugin-Versionen, die vor TypeWhisper 1.8 erschienen sind, haben kein Feld `locality` und werden unter diesen Schlüsseln abgelehnt, auch lokale. Aktualisiere die Plugins, bevor du die Schlüssel setzt.",
                "Plugin versions released before TypeWhisper 1.8 have no `locality` field and are refused under these keys, local ones included. Update the plugins before you apply the keys.",
              ),
            )}
          </p>
        </DocsCallout>
        <p>
          {tx(
            "Ein Plugin, das nicht lokal arbeitet und dessen Fähigkeiten (die Kategorien im Manifest) alle abgelehnt sind, wird ganz abgelehnt: Es wird weder installiert noch geladen oder aktiviert, und Marketplace und Plugin-Seite nennen den Grund. Ein Plugin mit einer erlaubten Fähigkeit läuft weiter; die abgelehnte Fähigkeit wird dort abgelehnt, wo sie genutzt wird. Abgelehnte Engines und Sprachmodelle verschwinden aus den Auswahlfeldern.",
            "A plugin that is not local and whose every capability (its manifest categories) is refused is refused as a whole: it is not installed, loaded, or enabled, and the Marketplace and its plugin page show the reason. A plugin with an allowed capability keeps running, and its refused capability is refused where it is used. Refused engines and language models disappear from the pickers.",
          )}
        </p>
        <p>
          {tx(
            "Ist die gewählte Engine abgelehnt, nutzt TypeWhisper vorübergehend eine erlaubte Engine, wie bei jeder nicht verfügbaren Engine, und behält die Wahl des Benutzers für den Fall, dass sie wieder erlaubt wird. Ist keine erlaubte Engine bereit, nennt das Diktat den Grund.",
            "When the selected engine is refused, TypeWhisper falls back to an allowed engine for the moment, as it does for any unavailable engine, and keeps the user's choice for when it is allowed again. When no allowed engine is ready, dictation reports the reason.",
          )}
        </p>

        <DocsSubheading id="limits">
          {tx("Bekannte Grenzen", "Known limits")}
        </DocsSubheading>
        <ul>
          <li>
            {tx(
              "Der Code eines Plugins, das lief, als es abgelehnt wurde, bleibt geladen, bis TypeWhisper beendet wird. Das Plugin erhält keine weiteren Aufrufe.",
              "Code of a plugin that was running when it became refused stays loaded until TypeWhisper quits. The plugin receives no further calls.",
            )}
          </li>
          <li>
            {tx(
              "Konfigurationsaktionen in den Einstellungen eines Plugins, etwa das Prüfen eines API-Schlüssels, laufen weiter. Sie übertragen Zugangsdaten, keine Transkripte.",
              "Configuration actions in a plugin's settings, such as validating an API key, still run. They carry credentials, not transcripts.",
            )}
          </li>
          <li>
            {tx(
              "Audio, das eine Streaming-Engine vor einer strengeren Richtlinie bereits empfangen hat, lässt sich nicht zurückholen. Die Richtlinie gilt wieder bei der nächsten Anfrage.",
              "Audio that a streaming engine received before a stricter policy arrived cannot be recalled. The policy applies again at the next request.",
            )}
          </li>
          <li>
            {tx(
              "Ein ganz abgelehntes Plugin läuft nie. TypeWhisper kennt seine Engine-IDs daher nur von einem früheren Start mit TypeWhisper 1.8 oder neuer. Gehört die gewählte Engine zu einem solchen Plugin und ist keine erlaubte Engine bereit, meldet das Diktat womöglich, dass keine Engine gewählt ist, statt den Grund zu nennen.",
              "A plugin refused as a whole never runs, so TypeWhisper learns its engine IDs only from an earlier launch of TypeWhisper 1.8 or later. If the selected engine belongs to such a plugin and no allowed engine is ready, dictation can report that no engine is selected instead of the reason.",
            )}
          </li>
          <li>
            {tx(
              "Hatte eine Engine vor einem erzwungenen Paar kein Modell gewählt, bleibt das erzwungene Modell nach dem Entfernen des Paars ausgewählt, weil Plugins eine Auswahl nicht löschen können. Die Engine-Wahl des Benutzers und ein selbst gewähltes Modell kehren zurück. Parakeet ab 1.5.0 und WhisperKit ab 1.3.0 sind nicht betroffen.",
              "If an engine had no model selected before an enforced pair, the enforced model stays selected after the pair is removed, because plugins cannot clear a selection. The user's engine choice and a model they had selected are restored. Parakeet 1.5.0 and WhisperKit 1.3.0 or later are not affected.",
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Ein Paar mit Apple Intelligence akzeptiert jede Modell-ID, etwa `default`, weil Apple Intelligence nur ein Systemmodell hat.",
                "An Apple Intelligence pair accepts any model ID, for example `default`, because Apple Intelligence has a single system model.",
              ),
            )}
          </li>
          <li>
            {tx(
              "Die Schlüssel steuern das Verhalten von TypeWhisper. Sie sind keine Netzwerk-Firewall: Nutze für stärkere Garantien die Netzwerkkontrollen deines MDM.",
              "These keys govern TypeWhisper's behavior. They are not a network firewall: use your MDM's network controls for stronger guarantees.",
            )}
          </li>
        </ul>
      </DocsSection>

      <DocsSection
        id="license"
        title={tx("Verwalteter Lizenzschlüssel", "Managed license key")}
      >
        <p>
          {withCode(
            tx(
              "`ManagedLicenseKey` aktiviert eine kommerzielle Lizenz in der Sitzung des angemeldeten Benutzers. Du musst Polar nicht selbst aufrufen und nicht in den Schlüsselbund der Benutzer schreiben. Leerzeichen am Anfang und Ende werden ignoriert, und Supporter-Schlüssel werden nicht akzeptiert. Den Schlüssel gibt es seit TypeWhisper 1.6.1 und nur beim Direkt-Download: Apps-und-Bücher-Lizenzen der Mac-App-Store-Edition enthalten keine In-App-Käufe.",
              "`ManagedLicenseKey` activates a commercial license in the signed-in user's session. You don't need to call Polar yourself or write to users' Keychains. Surrounding whitespace is ignored, and supporter keys are not accepted. The key has been available since TypeWhisper 1.6.1 and only in the direct download: Apps and Books licenses of the Mac App Store edition do not include in-app purchases.",
            ),
          )}
        </p>
        <p>
          {tx("Nutze das ", "Use the ")}
          <a href={licenseProfileUrl} target="_blank" rel="noopener noreferrer">
            {tx("Beispielprofil für die Lizenz", "example license profile")}
          </a>
          {tx(
            " oder setze den Schlüssel mit dem Profilgenerator. Ersetze den Platzhalter durch deinen Lizenzschlüssel und maskiere dabei Sonderzeichen für XML. Lade das Profil als eigenes Profil hoch und weise es den Macs zu. Installiere die App und starte TypeWhisper dann in der Sitzung jedes Benutzers mit Internetverbindung oder starte die App neu.",
            " or set the key with the profile generator. Replace the placeholder with your license key, escaping special characters for XML. Upload the profile as a custom profile and assign it to the intended Macs. Install the app, then launch or restart TypeWhisper in each user's session with internet access.",
          )}
        </p>

        <DocsSubheading id="license-script">
          {tx("Alternative: Skript", "Alternative: script")}
        </DocsSubheading>
        <p>
          {tx(
            "Derselbe Wert lässt sich mit defaults im Kontext des jeweiligen Benutzers schreiben:",
            "The same preference can be written with defaults in the intended user's context:",
          )}
        </p>
        <DocsCode locale={locale} lang="shell" code={licenseDefaults} />
        <p>
          {tx(
            "Das ist eine Vorgabe zur Bereitstellung, keine Zugriffskontrolle: Ein erzwungenes MDM-Profil verhindert, dass Benutzer den Wert ändern, ein normaler defaults-Wert nicht. MDM-Agenten führen Skripte meist als root aus; Einstellungen von root konfigurieren die App des angemeldeten Benutzers nicht. Nutze die Ausführung in der Benutzersitzung deines MDM und warte, bis ein Benutzer angemeldet ist. Schalte keine Shell-Protokollierung ein und halte echte Schlüssel aus Shell-Verläufen und Befehlsprotokollen heraus.",
            "This is a provisioning preference, not an access-control boundary: a forced MDM profile prevents users from editing the value, an ordinary defaults value does not. MDM agents commonly run scripts as root, and root's preferences do not configure the signed-in user's app. Use your MDM's user-session execution, and wait until a user is signed in. Do not enable shell tracing, and keep real keys out of shell history and command logs.",
          )}
        </p>

        <DocsSubheading id="license-activation">
          {tx("Aktivierung", "Activation")}
        </DocsSubheading>
        <ul>
          <li>
            {tx(
              "Die App liest den Schlüssel beim Start. Kommt er aus einem Konfigurationsprofil, liest sie ihn ab TypeWhisper 1.8 bei jeder Profiländerung erneut, sodass ein neuer, geänderter oder entfernter Schlüssel nach etwa 30 Sekunden ohne Neustart gilt. Frühere Versionen und ein mit defaults geschriebener Schlüssel brauchen nach einer Änderung einen Neustart. Einstellungen > Lizenz bietet zusätzlich „Aktivierung erneut versuchen“.",
              "The app reads the key at launch. From TypeWhisper 1.8, a key delivered by a configuration profile is read again whenever the profile changes, so a new, changed, or removed key takes effect within about 30 seconds without a restart. Earlier versions, and a key written with defaults, need a restart after a change. Settings > License also offers Retry Activation.",
            )}
          </li>
          <li>
            {tx(
              "Die App speichert Schlüssel und Polar-Aktivierung im Schlüsselbund des Benutzers und aktiviert nicht bei jedem Start neu. Mehrere Benutzer auf einem Mac haben eigene Schlüsselbund-Einträge und Aktivierungen.",
              "The app stores the key and its Polar activation in the user's Keychain and does not activate again on every launch. Several users on one Mac have separate Keychain records and activations.",
            )}
          </li>
          <li>
            {tx(
              "Die erste Aktivierung braucht eine Internetverbindung. Schlägt sie fehl, lässt sie sich unter Einstellungen > Lizenz oder beim nächsten Start wiederholen; einen Wiederholungsversuch im Hintergrund gibt es nicht. Bestehende Lizenzen behalten ihre normale Offline-Prüfung.",
              "The first activation needs internet access. If it fails, retry it in Settings > License or at the next launch; there is no retry loop in the background. Existing licenses keep their normal offline validation.",
            )}
          </li>
          <li>
            {tx(
              "Solange der Schlüssel verwaltet wird, blendet die Lizenzseite die manuelle Aktivierung und die Planauswahl aus, unterdrückt Hinweise zur Lizenzwahl und zeigt den Status ohne den Schlüssel. Mikrofonberechtigung, Modelleinrichtung und Einrichtungsassistent bleiben unverändert.",
              "While the key is managed, the License page hides manual commercial activation and the plan controls, suppresses license selection prompts, and shows the status without the key. Microphone permission, model setup, and the setup wizard are unchanged.",
            )}
          </li>
        </ul>

        <DocsSubheading id="license-changes">
          {tx("Schlüssel ändern oder entfernen", "Changing or removing the key")}
        </DocsSubheading>
        <ul>
          <li>
            {tx(
              "Ein neuer Schlüssel wird geprüft und gespeichert, bevor die alte Aktivierung deaktiviert wird. Scheitert der neue Schlüssel, bleibt der bisherige Eintrag erhalten.",
              "A new key is validated and stored before the old activation is deactivated. If the replacement fails, the old record stays intact.",
            )}
          </li>
          <li>
            {tx(
              "Scheitert das Deaktivieren der alten Aktivierung, merkt sich die App sie im Schlüsselbund und versucht es bei späteren Starts und Wiederholungen erneut: höchstens drei pro Durchgang, zuerst nach einer Stunde, dann mit doppeltem Abstand bis zu einmal am Tag. Lehnt Polar eine Anfrage dreimal endgültig ab, etwa mit HTTP 422, hört die App für diesen Eintrag auf. Die aktuelle Aktivierung wird dabei nie deaktiviert. Aktivierungen, die danach noch in Polar stehen, lassen sich dort entfernen.",
              "If deactivating the old activation fails, the app keeps it queued in the Keychain and retries on later launches and retries: at most three per pass, first after an hour, then doubling up to once a day. After three requests that Polar rejects outright, for example with HTTP 422, the app stops retrying that entry. The current activation is never deactivated by this cleanup. Activations that are still listed in Polar afterwards can be removed there.",
            )}
          </li>
          <li>
            {tx(
              "Wird der Wert entfernt, kehren die manuellen Lizenzfunktionen zurück: bei einem Profil ab TypeWhisper 1.8 sofort, sonst beim nächsten Start. Die bestehende Aktivierung bleibt bestehen: Deaktiviere sie manuell oder widerrufe die Lizenz zentral in Polar. Zentrale Änderungen bemerkt die App bei ihrer normalen Prüfung, bei einer bereits aktiven Lizenz nach bis zu sieben Tagen.",
              "Removing the value restores the manual license controls: right away for a profile from TypeWhisper 1.8, otherwise at the next launch. It does not revoke the existing activation: deactivate it manually or revoke it centrally in Polar. The app notices central changes at its normal validation, up to seven days later for an already active license.",
            )}
          </li>
          <li>
            {tx(
              "Eine widerrufene Lizenz wird nicht immer wieder aktiviert. Eine in Polar gelöschte Aktivierung kann neu entstehen, solange der konfigurierte Schlüssel gültig bleibt.",
              "A revoked license is not reactivated over and over. An activation deleted in Polar can be created again while the configured key stays valid.",
            )}
          </li>
        </ul>
        <DocsCallout
          label={t(locale, "docs.callout.important")}
          title={tx("Vertraulichkeit des Schlüssels", "Key confidentiality")}
        >
          <p>
            {tx(
              "Der verwaltete Schlüssel erspart es dir, ihn an Mitarbeitende zu verteilen. Konfigurationsprofile und lokale Einstellungen sind aber kein Geheimnisspeicher: Ausreichend privilegierte Benutzer können einen verteilten Schlüssel auslesen. Nutze die Zugriffskontrollen deines MDM und protokolliere keine Profilinhalte. In der Support-Diagnose erscheint der Schlüssel nur als „[set]“.",
              "The managed key saves you from handing the key to employees. Configuration profiles and local preferences are not secret stores, though: sufficiently privileged users can retrieve a deployed key. Use your MDM's access controls and avoid logging profile contents. Support diagnostics show the key only as “[set]”.",
            )}
          </p>
        </DocsCallout>
      </DocsSection>

      <DocsSection id="generator" title={tx("Profilgenerator", "Profile generator")}>
        <p>
          {withCode(
            tx(
              "`make-typewhisper-profile.py` baut ein Konfigurationsprofil aus `--set` (erzwungen) und `--recommend` (empfohlen) und prüft jeden Wert gegen die Referenz oben, sodass ein Tippfehler beim Bauen auffällt und nicht erst auf den Macs. Er braucht Python 3.9 oder neuer, aber keine Pakete; auf einem Mac kommt Python etwa mit den Xcode Command Line Tools.",
              "`make-typewhisper-profile.py` builds a configuration profile from `--set` (enforced) and `--recommend` (recommended) values and checks every value against the reference above, so a typo fails when you build the profile instead of on the Macs. It needs Python 3.9 or later and no packages; on a Mac, Python comes with the Xcode Command Line Tools, for example.",
            ),
          )}
        </p>
        <DocsCode locale={locale} lang="shell" code={generatorExamples(isDe)} />
        <ul>
          <li>
            {withCode(
              tx(
                "Listen sind durch Kommas getrennt; ein leerer Wert (`--set AllowedPlugins=`) erlaubt nichts. Booleans sind `true` oder `false`.",
                "Lists are comma-separated; an empty value (`--set AllowedPlugins=`) allows nothing. Booleans are `true` or `false`.",
              ),
            )}
          </li>
          <li>
            {withCode(
              tx(
                "`UpdateMode` akzeptiert `external`, `check-only` oder `user-initiated`, `UpdateChannel` akzeptiert `stable`, `daily` oder `release-candidate`, jeweils auch als Zahl.",
                "`UpdateMode` accepts `external`, `check-only`, or `user-initiated`, and `UpdateChannel` accepts `stable`, `daily`, or `release-candidate`, or their numbers.",
              ),
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Der Generator lehnt unbekannte Schlüssel ab (bei falscher Schreibweise mit dem gemeinten Namen), ebenso Einschränkungen in `--recommend` und unvollständige Paare.",
                "The generator refuses unknown keys (with the intended spelling for a key in the wrong case), restrictions passed to `--recommend`, and incomplete pairs.",
              ),
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Halte `--identifier` stabil, etwa `com.example.typewhisper`, damit ein neues Profil ein verteiltes ersetzt, statt ein zweites hinzuzufügen. Die UUIDs des Profils leiten sich aus dem Identifier ab und bleiben beim erneuten Bauen mit neuen Werten gleich.",
                "Keep `--identifier` stable, for example `com.example.typewhisper`, so a new profile replaces a deployed one instead of adding a second. The profile's UUIDs derive from the identifier, so regenerating it with new values keeps them.",
              ),
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Einschränkungen gelten nur für die Domains im Profil. Für beide Editionen nimmst du beide mit `--domain` auf oder verteilst ein Profil pro Domain; die App-Store-Edition liest nur `com.typewhisper.typewhisper-app`. Schlüssel, die diese Edition ignoriert, lässt der Generator in ihrem Payload weg und sagt das.",
                "Restrictions apply only to the domains you include. To manage both editions, add both with `--domain`, or deploy one profile per domain; the App Store edition reads only `com.typewhisper.typewhisper-app`. The generator leaves the keys that edition ignores out of its payload and says so.",
              ),
            )}
          </li>
          <li>
            {withCode(
              tx(
                "`--scope` wählt zwischen Geräte- (`System`) und Benutzerprofil (`User`), `--name` und `--organization` setzen Anzeigename und Organisation.",
                "`--scope` chooses a device (`System`) or user (`User`) profile, and `--name` and `--organization` set the display name and organization.",
              ),
            )}
          </li>
        </ul>

        <DocsSubheading id="deployment-files">
          {tx("Dateien zur Bereitstellung", "Deployment files")}
        </DocsSubheading>
        <p>
          {tx("Alle Dateien liegen im Repository unter ", "All files are in the repository under ")}
          <a href={deploymentFilesUrl} target="_blank" rel="noopener noreferrer">
            deployment/macos
          </a>
          {tx(
            ". Die Beispiele nutzen die Domain des Direkt-Downloads, sofern ihr Name nichts anderes sagt. Baue eigene Profile mit dem Generator, statt die Beispiele zu bearbeiten, damit die Werte geprüft werden.",
            ". The examples use the direct-download domain unless their name says otherwise. Build your own profiles with the generator rather than editing the examples, so the values are checked.",
          )}
        </p>
        <DocsTable
          label={tx("Dateien zur Bereitstellung", "Deployment files")}
          head={[tx("Datei", "File"), tx("Zweck", "Purpose")]}
          rows={deploymentFiles.map(([path, en, de]) => [
            path.includes("<") ? (
              <code>{path}</code>
            ) : (
              <a href={deploymentFileUrl(path)} target="_blank" rel="noopener noreferrer">
                <code>{path}</code>
              </a>
            ),
            withCode(tx(de, en)),
          ])}
        />
      </DocsSection>

      <DocsSection id="iru" title="Iru">
        <p>
          {tx(
            "Füge das gebaute Profil in der Library als eigenes Profil (Custom Profile) hinzu und weise es den Blueprints der gewünschten Macs zu. Auch die Beispiele für Anmeldeobjekt und Datenschutz sind eigene Profile. Wird das Profil von einem Mac entfernt, gelten nach etwa 30 Sekunden wieder die eigenen Einstellungen der Benutzer.",
            "Add the generated profile to the Library as a custom profile and assign it to the Blueprints of the intended Macs. The login item and privacy examples are custom profiles as well. When the profile is removed from a Mac, TypeWhisper returns to the users' own settings within about 30 seconds.",
          )}
        </p>
      </DocsSection>

      <DocsSection id="jamf-pro" title="Jamf Pro">
        <p>
          {tx(
            "Jamf Pro kann die Einstellungen über ein Formular setzen, das es aus einem Schema erzeugt:",
            "Jamf Pro can configure the settings through a form generated from a schema:",
          )}
        </p>
        <ol>
          <li>
            {tx(
              "Öffne Computers > Configuration Profiles > New, dann Application & Custom Settings > External Applications > Add > Custom Schema.",
              "Computers > Configuration Profiles > New, then Application & Custom Settings > External Applications > Add > Custom Schema.",
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Trage die Preference Domain ein, `com.typewhisper.mac` oder `com.typewhisper.typewhisper-app`, und füge den Inhalt der passenden Datei aus ",
                "Enter the preference domain, `com.typewhisper.mac` or `com.typewhisper.typewhisper-app`, and paste the content of the matching file from ",
              ),
            )}
            <a href={`${deploymentFilesUrl}/jamf`} target="_blank" rel="noopener noreferrer">
              <code>jamf/</code>
            </a>
            {tx(" ein.", ".")}
          </li>
          <li>
            {tx(
              "Konfiguriere die Eigenschaften, die du verwalten willst, und lass die übrigen auf „Not Configured“; das schreibt nichts. Empfohlene Einstellungen stehen unter „Recommended settings (users can change)“.",
              "Configure the properties you manage and leave the others at “Not Configured”, which writes nothing. Recommended settings are under “Recommended settings (users can change)”.",
            )}
          </li>
          <li>
            {tx(
              "Lege den Geltungsbereich fest und speichere. Füge bei Bedarf einen zweiten Payload für die andere Edition hinzu.",
              "Scope the profile and save. Add a second payload for the other edition if needed.",
            )}
          </li>
        </ol>
        <p>
          {tx(
            "Jamf Pro liefert die konfigurierten Werte der obersten Ebene als verwaltete Einstellungen aus; TypeWhisper behandelt sie als erzwungen. Werte unter „Recommended settings (users can change)“ sind Vorgaben, die Benutzer ändern können. Ein mit dem Generator gebautes Profil hochzuladen (Configuration Profiles > Upload) funktioniert ebenso und ist der Weg für die Beispiele zu Anmeldeobjekt und Datenschutz.",
            "Jamf Pro delivers the configured top-level values as managed preferences, which TypeWhisper treats as enforced; values under “Recommended settings (users can change)” are defaults users can change. Uploading a profile built with the generator (Configuration Profiles > Upload) works as well and is the way to deploy the login item and privacy examples.",
          )}
        </p>
        <p>
          {tx(
            "Das Schema ist noch nicht in einer Jamf-Pro-Instanz geprüft. Kontrolliere auf einem Pilot-Mac unter Einstellungen > Erweitert > Verwaltete Einstellungen, dass Eigenschaften auf „Not Configured“ nicht auftauchen, bevor du das Profil breit verteilst.",
            "The schema has not been checked in a Jamf Pro instance yet. Before a wide rollout, confirm on a pilot Mac in Settings > Advanced > Managed Settings that properties left at “Not Configured” do not appear.",
          )}
        </p>
      </DocsSection>

      <DocsSection id="other-mdms" title={tx("Andere MDMs", "Other MDMs")}>
        <p>
          {tx("Jedes MDM, das eigene Konfigurationsprofile installiert, funktioniert: Lade das gebaute .mobileconfig hoch. Für einen Profil-Editor importierst du die passende Datei aus ", "Any MDM that installs custom configuration profiles works: upload the generated .mobileconfig. For a profile editor, import the matching file from ")}
          <a href={`${deploymentFilesUrl}/ProfileManifests`} target="_blank" rel="noopener noreferrer">
            <code>ProfileManifests/</code>
          </a>
          {tx(
            " oder schreibst den Payload selbst nach dem Aufbau oben. Signiere das Profil, wenn dein MDM signierte Uploads erwartet.",
            ", or write the payload by hand following the profile layout above. Sign the profile if your MDM expects signed uploads.",
          )}
        </p>

        <DocsSubheading id="test-without-mdm">
          {tx("Ohne MDM testen", "Test without MDM")}
        </DocsSubheading>
        <p>
          {tx(
            "Öffne das Profil im Finder und installiere es unter Systemeinstellungen > Allgemein > Geräteverwaltung. Die verwalteten Einstellungen gelten dann wie in einer verwalteten Flotte. Payloads für Service Management und Datenschutz wirken dagegen nur, wenn ein MDM sie ausliefert.",
            "Open the profile in Finder and install it in System Settings > General > Device Management. The managed preferences then apply as in a managed fleet. The Service Management and privacy payloads take effect only when an MDM delivers them.",
          )}
        </p>
      </DocsSection>

      <DocsSection
        id="check"
        title={tx("Wirksame Werte prüfen", "Check the effective values")}
      >
        <ul>
          <li>
            {tx(
              "Einstellungen > Erweitert > Verwaltete Einstellungen listet die verwalteten Werte mit Geltung (erzwungen oder empfohlen), ungültige Schlüssel und „Probleme mit Richtlinien“, dazu den Zeitpunkt der letzten Prüfung und die Schaltfläche „Aktualisieren“.",
              "Settings > Advanced > Managed Settings lists the managed values with their scope (enforced or recommended), invalid keys, and Policy Problems, with the time of the last check and a Refresh button.",
            )}
          </li>
          <li>
            {tx(
              "Gesperrte Einstellungen zeigen „Von deiner Organisation verwaltet.“; abgelehnte Anbieter und Plugins nennen den Grund. Lässt sich das Profil nicht lesen, sagt der Bereich das, und verwaltete Funktionen warten, bis es wieder lesbar ist.",
              "Locked settings show “Managed by your organization.”, and refused providers and plugins show the reason. If the managed settings cannot be read, the section says so, and managed features wait until they can be read again.",
            )}
          </li>
          <li>
            {tx(
              "Die Support-Diagnose (Einstellungen > Erweitert > Support-Diagnose > „Diagnose exportieren“) enthält dieselben Angaben. Benutzer können sie an dich oder an den TypeWhisper-Support schicken.",
              "Support diagnostics (Settings > Advanced > Support Diagnostics > Export Diagnostics) contain the same information. Users can send them to you or to TypeWhisper support.",
            )}
          </li>
          <li>
            {tx(
              "Systemeinstellungen > Allgemein > Geräteverwaltung zeigt das installierte Profil mit jeder Einstellung und ihrem Wert.",
              "System Settings > General > Device Management shows the installed profile with every setting and its value.",
            )}
          </li>
        </ul>
        <a href={deployment} className="site-link">
          {tx(
            "Installation, Berechtigungen und Netzwerk-Hosts",
            "Installation, permissions, and network hosts",
          )}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </DocsSection>
    </>
  );
}

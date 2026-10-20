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
import {
  windowsGitHubUrl,
  windowsLatestAssetUrl,
} from "@/lib/platform-download";

/*
 * Adapted from docs/enterprise/windows-managed-settings.md and
 * windows-managed-license.md in typewhisper-win. Setting names follow the
 * en-US and de-DE ADML files in deployment/windows.
 */

type Scope = "enforced" | "both";
type Group = "license" | "models" | "updates" | "data";

interface PolicyKey {
  group: Group;
  /** Registry values the setting writes. */
  names: string[];
  /** Name of the Group Policy setting: English, German. */
  policy: [en: string, de: string];
  type: [en: string, de: string];
  scope: Scope;
  /** Backticks set inline code. */
  behavior: [en: string, de: string];
}

const keys: PolicyKey[] = [
  {
    group: "license",
    names: ["ManagedLicenseKey"],
    policy: ["Managed license key", "Verwalteter Lizenzschlüssel"],
    type: ["REG_SZ", "REG_SZ"],
    scope: "enforced",
    behavior: [
      "Activates a commercial license for every Windows user who starts TypeWhisper and manages the license controls in the app while it is set. Supporter keys are not accepted. Details under Managed license key below.",
      "Aktiviert eine kommerzielle Lizenz für jeden Windows-Benutzer, der TypeWhisper startet, und verwaltet die Lizenzsteuerung in der App, solange der Wert gesetzt ist. Supporter-Schlüssel werden nicht akzeptiert. Details unten unter Verwalteter Lizenzschlüssel.",
    ],
  },
  {
    group: "models",
    names: ["TranscriptionProviderId", "TranscriptionModelId"],
    policy: ["Transcription provider and model", "Transkriptionsanbieter und -modell"],
    type: ["REG_SZ pair", "REG_SZ-Paar"],
    scope: "both",
    behavior: [
      "Enforced: fixes the transcription provider and model for dictation, file transcription, recovery, training, workflows and the HTTP API. Recommended: the starting selection of a profile that has not chosen a provider. Set both values under the same key.",
      "Erzwungen: legt Transkriptionsanbieter und -modell für Diktat, Dateitranskription, Wiederherstellung, Training, Workflows und die HTTP-API fest. Empfohlen: die erste Auswahl eines Profils, das noch keinen Anbieter gewählt hat. Setze beide Werte unter demselben Schlüssel.",
    ],
  },
  {
    group: "models",
    names: ["LlmProviderId", "LlmModelId"],
    policy: ["Text model provider and model", "Textmodell-Anbieter und -Modell"],
    type: ["REG_SZ pair", "REG_SZ-Paar"],
    scope: "both",
    behavior: [
      "Enforced: fixes the text model for every workflow, translation and text processing step, including workflows with their own selection and the default workflow LLM. Recommended: the default workflow LLM of a profile that has not saved one. The pair does not turn on optional processing by itself.",
      "Erzwungen: legt das Textmodell für jeden Workflow-, Übersetzungs- und Textverarbeitungsschritt fest, auch für Workflows mit eigener Auswahl und für das Standard-Workflow-LLM. Empfohlen: das Standard-Workflow-LLM eines Profils, das noch keines gespeichert hat. Das Paar schaltet keine optionale Verarbeitung ein.",
    ],
  },
  {
    group: "updates",
    names: ["UpdateMode"],
    policy: ["Application update mode", "Update-Modus der Anwendung"],
    type: ["REG_DWORD 0–2", "REG_DWORD 0–2"],
    scope: "enforced",
    behavior: [
      "`0` External deployment: no update checks, downloads or installations; the app points to your organization's deployment. `1` Check only: the app checks for new versions and announces them but never installs them. `2` User-initiated installation: users install updates themselves; nothing installs unattended. Not set: the normal update behavior.",
      "`0` Externe Bereitstellung: keine Update-Prüfungen, Downloads oder Installationen; die App verweist auf die Softwareverteilung deiner Organisation. `1` Nur prüfen: Die App prüft auf neue Versionen und zeigt sie an, installiert sie aber nie. `2` Installation durch den Benutzer: Benutzer installieren Updates selbst; nichts wird unbeaufsichtigt installiert. Nicht gesetzt: normales Update-Verhalten.",
    ],
  },
  {
    group: "updates",
    names: ["UpdateChannel"],
    policy: ["Update channel", "Update-Kanal"],
    type: ["REG_DWORD 0–2", "REG_DWORD 0–2"],
    scope: "both",
    behavior: [
      "`0` Stable, `1` Daily, `2` Release Candidate. Enforced fixes the channel and locks the channel picker; recommended is the default for profiles without their own choice. The separate Daily installation only receives Daily builds.",
      "`0` Stable, `1` Daily, `2` Release Candidate. Erzwungen legt den Kanal fest und sperrt die Kanalauswahl; empfohlen ist die Vorgabe für Profile ohne eigene Wahl. Die separate Daily-Installation erhält nur Daily-Builds.",
    ],
  },
  {
    group: "updates",
    names: ["AllowedUpdateChannels"],
    policy: ["Allowed update channels", "Erlaubte Update-Kanäle"],
    type: ["List", "Liste"],
    scope: "enforced",
    behavior: [
      "Entries `stable`, `daily`, `release-candidate`. Update checks and installations run only on a listed channel. An empty configured list, or the single entry `none`, turns app updates off. An enforced channel outside the list blocks updates; the app never switches channels on its own.",
      "Einträge `stable`, `daily`, `release-candidate`. Update-Prüfungen und Installationen laufen nur auf einem aufgeführten Kanal. Eine konfigurierte leere Liste oder der einzige Eintrag `none` schaltet App-Updates ab. Ein erzwungener Kanal außerhalb der Liste blockiert Updates; die App wechselt den Kanal nie eigenständig.",
    ],
  },
  {
    group: "updates",
    names: ["LaunchAtLogin"],
    policy: ["Start TypeWhisper at sign-in", "TypeWhisper bei der Anmeldung starten"],
    type: ["REG_DWORD 0/1", "REG_DWORD 0/1"],
    scope: "both",
    behavior: [
      "Enforced: `1` registers the app's startup entry and `0` removes it; the setting is locked, and the user's earlier choice returns when the value is removed. Recommended: applied once to a new profile that has not completed setup and has no choice of its own. Users can still turn startup apps off in Windows Settings > Apps > Startup.",
      "Erzwungen: `1` registriert den Autostart-Eintrag der App, `0` entfernt ihn; die Einstellung ist gesperrt, und die frühere Wahl des Benutzers kehrt zurück, sobald der Wert entfernt wird. Empfohlen: wird einmal auf ein neues Profil angewendet, das die Einrichtung noch nicht abgeschlossen und keine eigene Wahl getroffen hat. Benutzer können Autostart-Apps weiterhin in den Windows-Einstellungen unter Apps > Autostart abschalten.",
    ],
  },
  {
    group: "updates",
    names: ["SkipOnboardingWhenReady"],
    policy: ["Skip initial setup when ready", "Ersteinrichtung überspringen, wenn bereit"],
    type: ["REG_DWORD 0/1", "REG_DWORD 0/1"],
    scope: "enforced",
    behavior: [
      "`1` keeps the initial setup closed when a dictation shortcut, a ready transcription model and a microphone are available; otherwise setup opens as usual. Nothing is marked as completed, and setup can still be opened from the app. `0` follows the normal rules.",
      "`1` hält die Ersteinrichtung geschlossen, wenn ein Diktat-Tastenkürzel, ein bereites Transkriptionsmodell und ein Mikrofon verfügbar sind; sonst öffnet sie sich wie gewohnt. Nichts wird als abgeschlossen markiert, und die Einrichtung lässt sich weiterhin aus der App öffnen. `0` folgt den normalen Regeln.",
    ],
  },
  {
    group: "updates",
    names: ["SuppressOptionalPrompts"],
    policy: ["Hide optional prompts", "Optionale Hinweise ausblenden"],
    type: ["REG_DWORD 0/1", "REG_DWORD 0/1"],
    scope: "both",
    behavior: [
      "`1` hides the Premium purchase prompt. Required setup, permission requests, policy problems, license errors and operational errors stay visible.",
      "`1` blendet den Premium-Kaufhinweis aus. Erforderliche Einrichtung, Berechtigungsanfragen, Richtlinienprobleme, Lizenzfehler und Betriebsfehler bleiben sichtbar.",
    ],
  },
  {
    group: "data",
    names: ["AllowCloudTranscription"],
    policy: ["Allow cloud transcription", "Cloud-Transkription erlauben"],
    type: ["REG_DWORD 0/1", "REG_DWORD 0/1"],
    scope: "enforced",
    behavior: [
      "`0` keeps audio away from every transcription plugin that is not local: cloud providers, user-configured endpoints and packages without a known locality. Dictation, file transcription, recovery, training and the HTTP API refuse with a message instead of switching providers.",
      "`0` hält Audio von jedem Transkriptions-Plugin fern, das nicht lokal arbeitet: Cloud-Anbieter, benutzerdefinierte Endpunkte und Pakete ohne bekannten Verarbeitungsort. Diktat, Dateitranskription, Wiederherstellung, Training und die HTTP-API lehnen mit einer Meldung ab, statt den Anbieter zu wechseln.",
    ],
  },
  {
    group: "data",
    names: ["AllowCloudTextProcessing"],
    policy: ["Allow cloud text processing", "Cloud-Textverarbeitung erlauben"],
    type: ["REG_DWORD 0/1", "REG_DWORD 0/1"],
    scope: "enforced",
    behavior: [
      "`0` keeps transcript, prompt and context text away from plugins that are not local: LLM providers, text processors, actions, speech output and memory sources. Dictionary terms are no longer sent as prompts to cloud transcription providers either. Workflows report the refusal; the HTTP API answers 403.",
      "`0` hält Transkript-, Prompt- und Kontexttext von Plugins fern, die nicht lokal arbeiten: LLM-Anbieter, Textprozessoren, Aktionen, Sprachausgabe und Gedächtnisquellen. Auch Wörterbuchbegriffe gehen dann nicht mehr als Prompt an Cloud-Transkriptionsanbieter. Workflows melden die Ablehnung; die HTTP-API antwortet mit 403.",
    ],
  },
  {
    group: "data",
    names: ["AllowedTranscriptionProviders"],
    policy: ["Allowed transcription providers", "Erlaubte Transkriptionsanbieter"],
    type: ["List", "Liste"],
    scope: "enforced",
    behavior: [
      "Transcription selection IDs that may receive audio: plugin IDs, or profile IDs such as `openai-compatible-<id>`. Applies to every entry point, including workflow and HTTP API overrides.",
      "Transkriptions-Auswahl-IDs, die Audio empfangen dürfen: Plugin-IDs oder Profil-IDs wie `openai-compatible-<id>`. Gilt an jedem Einstiegspunkt, auch für Workflow- und HTTP-API-Overrides.",
    ],
  },
  {
    group: "data",
    names: ["AllowedLlmProviders"],
    policy: ["Allowed text model providers", "Erlaubte Textmodell-Anbieter"],
    type: ["List", "Liste"],
    scope: "enforced",
    behavior: [
      "LLM selection IDs that may receive text, including workflows, translation and alias suggestions.",
      "LLM-Auswahl-IDs, die Text empfangen dürfen, auch in Workflows, Übersetzungen und Alias-Vorschlägen.",
    ],
  },
  {
    group: "data",
    names: ["AllowedPlugins"],
    policy: ["Allowed plugins", "Erlaubte Plugins"],
    type: ["List", "Liste"],
    scope: "enforced",
    behavior: [
      "Package IDs that may be installed, loaded, enabled and run. Packages outside the list are never loaded, and their plugin page shows the reason. A running package is unloaded when the list stops allowing it and loads again once the list allows it. The upgrade from a 1.0 profile also skips packages outside the list.",
      "Paket-IDs, die installiert, geladen, aktiviert und ausgeführt werden dürfen. Pakete außerhalb der Liste werden nie geladen; ihre Plugin-Seite nennt den Grund. Ein laufendes Paket wird entladen, sobald die Liste es nicht mehr erlaubt, und wieder geladen, wenn sie es erlaubt. Auch das Upgrade eines 1.0-Profils überspringt Pakete außerhalb der Liste.",
    ],
  },
  {
    group: "data",
    names: ["AllowPluginDownloads"],
    policy: ["Allow plugin downloads", "Plugin-Downloads erlauben"],
    type: ["REG_DWORD 0/1", "REG_DWORD 0/1"],
    scope: "enforced",
    behavior: [
      "`0` blocks plugin installations and updates from the catalog, including automatic updates and installations during setup. Installed packages keep running.",
      "`0` sperrt Installationen und Updates von Plugins aus dem Katalog, auch automatische Updates und Installationen während der Einrichtung. Installierte Pakete laufen weiter.",
    ],
  },
  {
    group: "data",
    names: ["AllowModelDownloads"],
    policy: ["Allow model downloads", "Modell-Downloads erlauben"],
    type: ["REG_DWORD 0/1", "REG_DWORD 0/1"],
    scope: "enforced",
    behavior: [
      "`0` blocks the model downloads the app starts: local transcription models, plugin models, local text models and local speech output models. Downloaded models keep working. Runtime files that some plugins fetch themselves are not covered; see the known limits below.",
      "`0` sperrt die Modell-Downloads, die die App startet: lokale Transkriptionsmodelle, Plugin-Modelle, lokale Textmodelle und lokale Sprachausgabemodelle. Heruntergeladene Modelle funktionieren weiter. Laufzeitdateien, die manche Plugins selbst laden, sind nicht erfasst; siehe die bekannten Grenzen weiter unten.",
    ],
  },
];

const groups: Array<[id: Group, en: string, de: string]> = [
  ["license", "License", "Lizenz"],
  ["models", "Models", "Modelle"],
  ["updates", "Updates and startup", "Updates und Start"],
  ["data", "Data and plugins", "Daten und Plugins"],
];

/** Recommended settings: the policy names in the subfolder of the editor. */
const recommended: Array<[value: string, en: string, de: string]> = [
  ["TranscriptionProviderId, TranscriptionModelId", "Transcription provider and model (recommended)", "Transkriptionsanbieter und -modell (empfohlen)"],
  ["LlmProviderId, LlmModelId", "Text model provider and model (recommended)", "Textmodell-Anbieter und -Modell (empfohlen)"],
  ["UpdateChannel", "Update channel (recommended)", "Update-Kanal (empfohlen)"],
  ["LaunchAtLogin", "Start TypeWhisper at sign-in (recommended)", "TypeWhisper bei der Anmeldung starten (empfohlen)"],
  ["SuppressOptionalPrompts", "Hide optional prompts (recommended)", "Optionale Hinweise ausblenden (empfohlen)"],
];

const policyTemplatesUrl = windowsLatestAssetUrl(
  "TypeWhisper-win-PolicyTemplates.zip",
);
const templatesSourceUrl = `${windowsGitHubUrl}/tree/main/deployment/windows`;

const scriptExamples = (isDe: boolean) => `# ${isDe ? "Erzwungene Werte" : "Enforced values"}
.\\Set-TypeWhisperPolicy.ps1 -Dword @{ UpdateMode = 1; LaunchAtLogin = 1; AllowCloudTranscription = 0 }
.\\Set-TypeWhisperPolicy.ps1 -String @{ TranscriptionProviderId = 'com.typewhisper.sherpa-onnx'; TranscriptionModelId = 'parakeet-tdt-0.6b' }
.\\Set-TypeWhisperPolicy.ps1 -List @{ AllowedUpdateChannels = @('stable'); AllowedPlugins = @('com.typewhisper.sherpa-onnx') }

# ${isDe ? "Empfohlene Werte" : "Recommended values"}
.\\Set-TypeWhisperPolicy.ps1 -Recommended -Dword @{ UpdateChannel = 0 }

# ${isDe ? "Richtlinie anzeigen, Werte entfernen, alles löschen" : "Show the policy, remove values, or clear it"}
.\\Set-TypeWhisperPolicy.ps1 -Show
.\\Set-TypeWhisperPolicy.ps1 -Remove AllowedPlugins, ManagedLicenseKey
.\\Set-TypeWhisperPolicy.ps1 -Clear`;

const registryExample = (isDe: boolean) => `$policy = 'HKLM:\\SOFTWARE\\Policies\\TypeWhisper'
New-Item -Path $policy -Force | Out-Null
Set-ItemProperty -Path $policy -Name UpdateMode -Value 1 -Type DWord          # ${isDe ? "nur prüfen" : "check only"}
Set-ItemProperty -Path $policy -Name LaunchAtLogin -Value 1 -Type DWord       # ${isDe ? "mit Windows starten" : "start with Windows"}
Set-ItemProperty -Path $policy -Name AllowedUpdateChannelsConfigured -Value 1 -Type DWord
New-Item -Path "$policy\\AllowedUpdateChannels" -Force | Out-Null
Set-ItemProperty -Path "$policy\\AllowedUpdateChannels" -Name 1 -Value stable -Type String
New-Item -Path "$policy\\Recommended" -Force | Out-Null
Set-ItemProperty -Path "$policy\\Recommended" -Name UpdateChannel -Value 0 -Type DWord`;

const licenseExample = `New-Item -Path 'HKLM:\\SOFTWARE\\Policies\\TypeWhisper' -Force | Out-Null
Set-ItemProperty -Path 'HKLM:\\SOFTWARE\\Policies\\TypeWhisper' -Name 'ManagedLicenseKey' -Value 'YOUR_LICENSE_KEY' -Type String`;

const omaUriInstall =
  "./Device/Vendor/MSFT/Policy/ConfigOperations/ADMXInstall/TypeWhisper/Policy/TypeWhisperAdmx";

const omaUriPolicies = `./Device/Vendor/MSFT/Policy/Config/TypeWhisper~Policy~TypeWhisper/<PolicyName>
./Device/Vendor/MSFT/Policy/Config/TypeWhisper~Policy~TypeWhisper~TypeWhisper_Recommended/<PolicyName>`;

const omaUriExamples = (isDe: boolean) => `OMA-URI  ./Device/Vendor/MSFT/Policy/Config/TypeWhisper~Policy~TypeWhisper/AllowCloudTranscription
${isDe ? "Wert   " : "Value  "}  <disabled/>

OMA-URI  ./Device/Vendor/MSFT/Policy/Config/TypeWhisper~Policy~TypeWhisper/TranscriptionSelection
${isDe ? "Wert   " : "Value  "}  <enabled/><data id="TranscriptionProviderId" value="com.typewhisper.sherpa-onnx"/><data id="TranscriptionModelId" value="parakeet-tdt-0.6b"/>`;

export function windowsManagedSettingsHead(locale: Locale) {
  return locale === "de"
    ? {
        heading: "Verwaltete Einstellungen",
        lede: "Steuere Lizenz, Modelle, Cloud-Verarbeitung, Downloads, Updates und Start zentral über Computerrichtlinien: mit Gruppenrichtlinie, Intune oder jedem Werkzeug, das die Registry schreibt.",
      }
    : {
        heading: "Managed Settings",
        lede: "Control the license, models, cloud processing, downloads, updates, and startup through machine policy: with Group Policy, Intune, or any tool that writes the registry.",
      };
}

/** Registry values of a setting, with type and scope below them. */
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

export default function DocsWindowsManagedSettings({
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

  return (
    <>
      <DocsCallout label={t(locale, "docs.callout.note")}>
        <p>
          {tx(
            "Verwaltete Einstellungen gibt es ab TypeWhisper für Windows 1.2. Ohne Richtlinienwerte ändert sich nichts. Wie du TypeWhisper selbst verteilst, beschreibt die Seite ",
            "Managed settings are available from TypeWhisper for Windows 1.2. Without policy values nothing changes. To roll out the app itself, see ",
          )}
          <a href={localePath(locale, "/docs/windows/deployment")}>
            {tx("Bereitstellung", "Deployment")}
          </a>
          .
        </p>
      </DocsCallout>

      <DocsSection
        id="how-it-works"
        title={tx(
          "So funktionieren verwaltete Einstellungen",
          "How managed settings work",
        )}
      >
        <p>
          {tx(
            "TypeWhisper liest Computerrichtlinien aus zwei Registry-Schlüsseln. Gruppenrichtlinie, Intune und andere Verwaltungswerkzeuge schreiben dieselben Werte.",
            "TypeWhisper reads machine policies from two registry keys. Group Policy, Intune, and other management tools write the same values.",
          )}
        </p>
        <DocsTable
          label={tx("Registry-Schlüssel", "Registry keys")}
          head={[tx("Schlüssel", "Key"), tx("Zweck", "Purpose")]}
          rows={[
            [
              <code>{breakable("HKLM\\SOFTWARE\\Policies\\TypeWhisper")}</code>,
              tx(
                "Erzwungene Werte. Benutzer können sie in der App nicht ändern.",
                "Enforced values. Users cannot change them in the app.",
              ),
            ],
            [
              <code>{breakable("HKLM\\SOFTWARE\\Policies\\TypeWhisper\\Recommended")}</code>,
              tx(
                "Empfohlene Werte: Vorgaben, die gelten, bis der Benutzer selbst etwas wählt. Sie bleiben in der App änderbar.",
                "Recommended values: defaults that apply until the user makes their own choice. They stay editable in the app.",
              ),
            ],
          ]}
        />
        <p>
          {tx(
            "Setzen mehrere Quellen einen Wert, gilt diese Reihenfolge:",
            "When several sources set a value, this order applies:",
          )}
        </p>
        <ol>
          <li>{tx("Erzwungene Richtlinie", "Enforced policy")}</li>
          <li>{tx("Eigene Wahl des Benutzers", "The user's own choice")}</li>
          <li>{tx("Empfohlene Richtlinie", "Recommended policy")}</li>
          <li>{tx("Standard der App", "The app default")}</li>
        </ol>
        <p>
          {withCode(
            tx(
              "Die App liest die 64-Bit-Ansicht der Registry und schreibt die Schlüssel nie. Sie liest die Richtlinie, bevor Plugins und Hintergrundaufgaben starten, daher gelten Werte, die beim ersten Start vorhanden sind, sofort. Spätere Änderungen erkennt die laufende App über eine Registry-Benachrichtigung, ersatzweise durch eine Prüfung alle 30 Sekunden, und übernimmt sie ohne Neustart. Standardbenutzer können `HKLM` nicht schreiben und erzwungene Werte daher nicht ändern.",
              "The app reads the 64-bit registry view and never writes the keys. It reads the policy before plugins and background work start, so values present at the first launch apply right away. Later changes reach the running app through a registry notification, with a check every 30 seconds as a fallback, and apply without a restart. Standard users cannot write `HKLM`, so they cannot change enforced values.",
            ),
          )}
        </p>

        <DocsSubheading id="value-types">
          {tx("Werttypen und Listen", "Value types and lists")}
        </DocsSubheading>
        <ul>
          <li>
            {withCode(
              tx(
                "Schalter sind `REG_DWORD` mit `0` oder `1`, Auswahlwerte sind `REG_DWORD`-Zahlen, Text ist `REG_SZ`.",
                "Switches are `REG_DWORD` values of `0` or `1`, options are `REG_DWORD` numbers, and text is `REG_SZ`.",
              ),
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Eine Liste ist ein Unterschlüssel mit nummerierten `REG_SZ`-Werten (`1`, `2`, …) und daneben ein `REG_DWORD` namens `<Name>Configured`. Fehlt diese Markierung oder ist sie `0`, schränkt die Liste nichts ein. Ist sie `1`, sind nur die aufgeführten Einträge erlaubt; eine leere Liste erlaubt nichts.",
                "A list is a subkey with numbered `REG_SZ` values (`1`, `2`, …) next to a `REG_DWORD` named `<Name>Configured`. Without that marker, or with `0`, the list restricts nothing. With `1`, only the listed entries are allowed; an empty list allows nothing.",
              ),
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Ein Eintrag, der auf nichts passt, etwa `none`, erlaubt ebenfalls nichts. Die Gruppenrichtlinie braucht diese Form, weil ihr Editor eine aktivierte Liste ohne Einträge nicht speichert.",
                "An entry that matches nothing, such as `none`, allows nothing as well. Group Policy needs this form, because its editor does not save an enabled list without entries.",
              ),
            )}
          </li>
        </ul>

        <DocsSubheading id="invalid-values">
          {tx("Ungültige und unbekannte Werte", "Invalid and unknown values")}
        </DocsSubheading>
        <ul>
          <li>
            {tx(
              "Ein ungültiger erzwungener Wert sperrt seine Einstellung, bis er korrigiert ist. Er lockert nie eine Einschränkung.",
              "An invalid enforced value blocks its setting until it is corrected. It never relaxes a restriction.",
            )}
          </li>
          <li>
            {tx(
              "Lässt sich der Richtlinienschlüssel nicht lesen, behält die App die zuletzt bekannten Werte und sperrt verwaltete Vorgänge.",
              "If the policy key cannot be read, the app keeps the last known values and blocks managed operations.",
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Einschränkungen unter `Recommended` und unbekannte Werte meldet die App als Richtlinienproblem und ignoriert sie.",
                "Restrictions placed under `Recommended` and unknown values are reported as policy problems and ignored.",
              ),
            )}
          </li>
          <li>
            {tx(
              "Wird ein Wert entfernt, gilt wieder die Einstellung des Benutzers. Wird der ganze Schlüssel entfernt, gelten wieder alle Einstellungen der Benutzer.",
              "Removing a value restores the user's own setting. Removing the whole key restores all of them.",
            )}
          </li>
        </ul>
      </DocsSection>

      <DocsSection id="reference" title={tx("Referenz der Werte", "Key reference")}>
        <p>
          {withCode(
            tx(
              "Alle Werte liegen unter `HKLM\\SOFTWARE\\Policies\\TypeWhisper`. Werte, die auch empfohlen werden können, stehen zusätzlich unter `Recommended`. Paare und Listen sind unten näher beschrieben.",
              "All values live under `HKLM\\SOFTWARE\\Policies\\TypeWhisper`. Values that can also be recommended go under `Recommended` as well. Pairs and lists are described in more detail below.",
            ),
          )}
        </p>
        {groups.map(([group, en, de]) => (
          <Fragment key={group}>
            <DocsSubheading id={`reference-${group}`}>
              {tx(de, en)}
            </DocsSubheading>
            <DocsTable
              label={tx(`Werte: ${de}`, `Values: ${en}`)}
              head={[tx("Wert", "Value"), tx("Verhalten", "Behavior")]}
              rows={keys
                .filter((key) => key.group === group)
                .map((key) => [
                  <KeyCell
                    names={key.names}
                    meta={`${pick(key.type)} · ${scopeLabel(key.scope)}`}
                  />,
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
          {tx(
            "Ein Paar nennt einen Anbieter über seine Auswahl-ID und ein Modell über die ID, die der Anbieter auflistet. Beide Werte gehören unter denselben Schlüssel. Ein Paar mit nur einem Wert ist ungültig; die betroffene Funktion wartet, bis es vollständig ist.",
            "A pair names a provider by its selection ID and a model by the ID the provider lists. Both values belong under the same key. A pair with only one value is invalid, and the affected function waits until the pair is complete.",
          )}
        </p>
        <ul>
          <li>
            {withCode(
              tx(
                "Lokale Parakeet-Engine: `com.typewhisper.sherpa-onnx`. Ihre Modell-IDs zeigt Diktat an, und `GET /v1/models` liefert sie als `provider_id` und `id`, zum Beispiel `parakeet-tdt-0.6b`.",
                "Local Parakeet engine: `com.typewhisper.sherpa-onnx`. Its model IDs appear in Dictation, and `GET /v1/models` returns them as `provider_id` and `id`, for example `parakeet-tdt-0.6b`.",
              ),
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Cloud-Plugins: ihre Paket-ID, etwa `com.typewhisper.groq` oder `com.typewhisper.openai`, und die Modell-IDs, die ihre Einstellungsseite auflistet, zum Beispiel `whisper-large-v3`.",
                "Cloud plugins: their package ID, such as `com.typewhisper.groq` or `com.typewhisper.openai`, and the model IDs their settings page lists, for example `whisper-large-v3`.",
              ),
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Endpunkt-Profile des Plugins OpenAI Compatible: `openai-compatible-<id>`.",
                "Endpoint profiles of the OpenAI Compatible plugin: `openai-compatible-<id>`.",
              ),
            )}
          </li>
          <li>
            {tx(
              "Textmodelle: dieselben Paket-IDs, mit den Modell-IDs, die der Workflow-Editor für diesen Anbieter anbietet.",
              "Text models: the same package IDs, with the model IDs the workflow editor offers for that provider.",
            )}
          </li>
        </ul>
        <DocsCode
          locale={locale}
          lang="powershell"
          code={`.\\Set-TypeWhisperPolicy.ps1 -String @{ TranscriptionProviderId = 'com.typewhisper.sherpa-onnx'; TranscriptionModelId = 'parakeet-tdt-0.6b' }`}
        />

        <DocsSubheading id="enforced-pairs">
          {tx("Erzwungene Paare", "Enforced pairs")}
        </DocsSubheading>
        <p>
          {withCode(
            tx(
              "Ein erzwungenes Transkriptionspaar hat Vorrang vor der Auswahl des Benutzers, vor Diktat-Workflows mit eigenem Modell, vor wartenden und wiederhergestellten Aufträgen und vor Anfragen an die HTTP-API. Eine Anfrage für eine andere Engine oder ein anderes Modell erhält `403 forbidden`. Die Auswahlfelder in Diktat und Einrichtung zeigen das Paar und sind gesperrt; die Schaltfläche Anbieter-Einstellungen bleibt für API-Schlüssel und Downloads erreichbar. Die eigene Auswahl des Benutzers bleibt gespeichert und gilt wieder, sobald das Paar entfernt wird. Hat ein Plugin eine eigene Modellauswahl, wird sie auf das erzwungene Modell gestellt und nach dem Entfernen der Richtlinie zurückgesetzt.",
              "An enforced transcription pair wins over the user's selection, dictation workflows with their own model, queued and recovered jobs, and HTTP API requests. A request for another engine or model gets `403 forbidden`. The pickers in Dictation and setup show the pair and are locked; the Provider settings button stays available for API keys and downloads. The user's own selection is kept and applies again when the pair is removed. A plugin's own model selection is switched to the enforced model and restored once the policy is removed.",
            ),
          )}
        </p>
        <p>
          {tx(
            "Ein erzwungenes Textmodell-Paar ersetzt Anbieter und Modell jedes Workflows, des Standard-Workflow-LLM und der Übersetzung über die API. Der Workflow-Editor behält gespeicherte Auswahlen, sperrt aber die Auswahlfelder und nennt das erzwungene Paar; der Dialog Standard-LLM ist schreibgeschützt. Text an einen anderen Anbieter oder ein anderes Modell wird abgelehnt.",
            "An enforced text model pair replaces the provider and model of every workflow, the default workflow LLM, and API translation. The workflow editor keeps saved selections but locks the pickers and names the enforced pair; the Default LLM dialog is read-only. Text sent to another provider or model is refused.",
          )}
        </p>

        <DocsSubheading id="unavailable-ids">
          {tx("Fehlende Anbieter und Modelle", "Missing providers and models")}
        </DocsSubheading>
        <p>
          {tx(
            "Eine unbekannte oder nicht verfügbare ID führt nie zu einem stillen Wechsel:",
            "An unknown or unavailable ID never causes a silent switch:",
          )}
        </p>
        <ul>
          <li>
            {tx(
              "Ein vorgegebener Anbieter, der nicht installiert, nicht aktiviert oder durch eine Erlaubnisliste oder einen Cloud-Schalter gesperrt ist, bleibt sichtbar ausgewählt. Diktat oder Verarbeitung werden mit Begründung blockiert.",
              "A required provider that is not installed, not enabled, or refused by an allowlist or a cloud key stays visibly selected. Dictation or processing is blocked with the reason.",
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Ein vorgegebenes Modell, das der Anbieter nicht anbietet oder das nicht heruntergeladen ist, blockiert ebenso. Ist `AllowModelDownloads` auf `0`, muss die Softwareverteilung die Modelldateien bereitstellen; sonst kann der Benutzer das Modell auf der Anbieterseite herunterladen.",
                "A required model that the provider does not offer, or that is not downloaded, blocks the same way. With `AllowModelDownloads` set to `0`, your deployment has to provide the model files; otherwise the user can download the model from the provider page.",
              ),
            )}
          </li>
          <li>
            {tx(
              "Einstellungen > Erweitert > Verwaltete Einstellungen listet diese Konflikte unter Probleme in der Richtlinie, direkt neben dem Paar.",
              "Settings > Advanced > Managed settings lists these conflicts under Policy problems, next to the pair itself.",
            )}
          </li>
        </ul>

        <DocsSubheading id="recommended-pairs">
          {tx("Empfohlene Paare", "Recommended pairs")}
        </DocsSubheading>
        <p>
          {tx(
            "Ein empfohlenes Paar ist die erste Auswahl eines Profils, das noch keinen Transkriptionsanbieter gewählt oder kein Standard-Workflow-LLM gespeichert hat. Benutzer können es ändern; eine bestehende Wahl wird nie ersetzt. Ein empfohlenes Modell, das noch nicht heruntergeladen ist, lädt der Benutzer herunter oder die Softwareverteilung stellt es bereit. Bis dahin fragt die Einrichtung wie gewohnt nach einem bereiten Modell.",
            "A recommended pair is the starting selection of a profile that has not chosen a transcription provider or saved a default workflow LLM. Users can change it, and an existing choice is never replaced. A recommended model that is not downloaded yet has to be downloaded by the user or provided by your deployment; until then, setup asks for a ready model as usual.",
          )}
        </p>
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
              "Jedes Plugin gibt im Feld `locality` an, wo es Inhalte verarbeitet; der Plugin-Katalog veröffentlicht denselben Wert:",
              "Every plugin declares in its `locality` field where it processes content; the plugin catalog publishes the same value:",
            ),
          )}
        </p>
        <ul>
          <li>
            <code>local</code>
            {tx(": Nichts verlässt das Gerät.", ": nothing leaves the device.")}
          </li>
          <li>
            <code>cloud</code>
            {tx(": der feste Dienst des Anbieters.", ": the vendor's fixed service.")}
          </li>
          <li>
            <code>configurable</code>
            {tx(
              ": ein Endpunkt, Skript oder Befehl, den der Benutzer festlegt und den die App nicht prüfen kann.",
              ": an endpoint, script, or command the user defines, which the app cannot verify.",
            )}
          </li>
        </ul>
        <p>
          {withCode(
            tx(
              "Steht `AllowCloudTranscription` oder `AllowCloudTextProcessing` auf `0`, laufen für diese Inhalte nur noch Plugins mit `local`. Plugins mit `cloud` oder `configurable` und Pakete ohne erkannten Wert werden abgelehnt. Ein Plugin ohne das Feld fällt auf sein älteres Feld `isLocal` zurück. Ein nicht lokales Paket, dessen Fähigkeiten alle abgeschaltet sind, wird ganz abgelehnt: Es wird weder installiert noch geladen oder aktiviert, und Marketplace und Plugin-Seite nennen den Grund. Auswahlfelder zeigen abgelehnte Einträge ausgegraut mit Begründung und wechseln eine Auswahl nie von selbst.",
              "With `AllowCloudTranscription` or `AllowCloudTextProcessing` set to `0`, only `local` plugins keep running for that content. Plugins marked `cloud` or `configurable` and packages without a recognized value are refused. A plugin without the field falls back to its older `isLocal` flag. A package that is not local and whose capabilities are all turned off is refused as a whole: it is not installed, loaded, or enabled, and the Marketplace and its plugin page name the reason. Pickers show refused entries grayed out with the reason and never switch a selection on their own.",
            ),
          )}
        </p>

        <DocsSubheading id="limits">
          {tx("Bekannte Grenzen", "Known limits")}
        </DocsSubheading>
        <ul>
          <li>
            {withCode(
              tx(
                "`AllowModelDownloads` erfasst die Downloads, die die App startet. Lädt ein Plugin beim Laden eines Modells Laufzeitdateien nach, etwa GPU-Laufzeiten im Transkriptionsprozess oder die Vokabeldateien des lokalen Parakeet-Plugins, hält der Schalter das nicht auf. Stelle diese Dateien mit der Softwareverteilung bereit; die Hosts stehen auf der Seite Bereitstellung.",
                "`AllowModelDownloads` covers the downloads the app starts. A plugin that fetches runtime files while it loads a model, such as GPU runtimes in the transcription worker or the vocabulary files of the local Parakeet plugin, is not stopped. Provide these files with your deployment; the hosts are listed on the Deployment page.",
              ),
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Konfigurationsaktionen wie das Prüfen eines API-Schlüssels laufen unter `AllowCloudTextProcessing` weiter; sie übertragen Zugangsdaten, keine Transkripte.",
                "Configuration actions such as validating an API key still run under `AllowCloudTextProcessing`; they carry credentials, not transcripts.",
              ),
            )}
          </li>
          <li>
            {tx(
              "Ist ein abgelehnter Anbieter noch ausgewählt, wird er bei der Nutzung mit derselben Meldung abgelehnt.",
              "A refused provider that is still selected is refused with the same message when it is used.",
            )}
          </li>
          <li>
            {tx(
              "Audio, das ein Streaming-Anbieter vor einer strengeren Richtlinie bereits empfangen hat, lässt sich nicht zurückholen. Die Richtlinie wird beim nächsten Aufruf des Anbieters erneut geprüft.",
              "Audio that a streaming provider received before a stricter policy arrived cannot be recalled. The policy is checked again at the next provider call.",
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
              "`ManagedLicenseKey` aktiviert eine kommerzielle Lizenz in der Sitzung jedes Windows-Benutzers, der TypeWhisper startet. Du musst Polar nicht selbst aufrufen und den Schlüssel nicht an Benutzer verteilen. Leerzeichen am Anfang und Ende werden ignoriert, ein leerer Wert gilt als nicht gesetzt, und Supporter-Schlüssel werden nicht akzeptiert. Die App schreibt, ändert oder entfernt den Wert nie.",
              "`ManagedLicenseKey` activates a commercial license in the session of every Windows user who starts TypeWhisper. You don't need to call Polar yourself or hand the key to users. Surrounding whitespace is ignored, an empty value counts as not set, and supporter keys are not accepted. The app never writes, changes, or removes the value.",
            ),
          )}
        </p>
        <DocsCode locale={locale} lang="powershell" code={licenseExample} />
        <p>
          {withCode(
            tx(
              "Verteile den Wert mit der Gruppenrichtlinie Verwalteter Lizenzschlüssel, einem Registry-Element in den Gruppenrichtlinien-Einstellungen (Group Policy Preferences), einem Intune-PowerShell-Skript im Systemkontext oder jedem anderen Werkzeug, das `HKLM` schreibt. Halte echte Schlüssel aus Shell-Verläufen und Skript-Logs heraus.",
              "Deploy the value with the Group Policy setting Managed license key, a registry item in Group Policy Preferences, an Intune PowerShell script that runs in the system context, or any other tool that writes `HKLM`. Keep real keys out of shell history and script logs.",
            ),
          )}
        </p>

        <DocsSubheading id="license-activation">
          {tx("Aktivierung und Plätze", "Activation and seats")}
        </DocsSubheading>
        <ul>
          <li>
            {tx(
              "Die App liest den Wert beim Start, wenn sich die Richtlinie im laufenden Betrieb ändert, und über Aktivierung erneut versuchen unter Einstellungen > Premium > Lizenz.",
              "The app reads the value at startup, when the policy changes while it runs, and through Retry activation in Settings > Premium > License.",
            )}
          </li>
          <li>
            {tx(
              "Sie speichert Schlüssel und Aktivierung in der Lizenzdatei des Benutzers, verschlüsselt mit der Windows-Datenschutz-API (DPAPI), und aktiviert nicht bei jedem Start neu.",
              "It stores the key and its activation in the user's license file, encrypted with Windows Data Protection (DPAPI), and does not activate again on every launch.",
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Jedes Windows-Benutzerkonto auf einem Gerät hat eine eigene Aktivierung; ein Gerät mit mehreren Benutzern belegt also einen Platz pro Benutzer. Die direkte Installation und die Microsoft-Store-Version haben getrennte Profile: Wer beide nutzt, belegt einen Platz pro Version. Polar benennt jede Aktivierung nach Computer und Windows-Benutzer, zum Beispiel `TYPEWHISPER (tw-user2)`.",
                "Each Windows user account on a device holds its own activation, so a device with several users uses one seat per user. The direct download and the Microsoft Store version keep separate profiles: a user who runs both takes one seat per version. Polar names each activation after the computer and the Windows user, for example `TYPEWHISPER (tw-user2)`.",
              ),
            )}
          </li>
          <li>
            {tx(
              "Die erste Aktivierung braucht eine Internetverbindung. Schlägt sie fehl, lässt sie sich auf der Lizenzseite oder beim nächsten Start wiederholen; einen automatischen Wiederholungsversuch im Hintergrund gibt es nicht. Bestehende Lizenzen behalten ihre normale Offline-Prüfung.",
              "The first activation needs internet access. If it fails, retry it on the License page or at the next launch; there is no automatic retry in the background. Existing licenses keep their normal offline validation.",
            )}
          </li>
          <li>
            {tx(
              "Solange der Schlüssel verwaltet wird, blendet die Lizenzseite Schlüsseleingabe, Gerätedeaktivierung und Kauflinks aus, unterdrückt Premium-Kaufhinweise und zeigt den Lizenzstatus ohne den Schlüssel.",
              "While the key is managed, the License page hides key entry, device deactivation, and purchase links, suppresses Premium purchase prompts, and shows the license status without the key.",
            )}
          </li>
        </ul>

        <DocsSubheading id="license-changes">
          {tx("Schlüssel ändern oder entfernen", "Changing or removing the key")}
        </DocsSubheading>
        <ul>
          <li>
            {tx(
              "Ein neuer Schlüssel wird aktiviert und gespeichert, bevor die bisherige Aktivierung deaktiviert wird. Scheitert der neue Schlüssel, bleibt die bisherige Lizenz erhalten. Scheitert die Deaktivierung der alten Aktivierung, bleibt sie in Polar gelistet und lässt sich dort entfernen.",
              "A new key is activated and stored before the previous activation is deactivated. If the new key fails, the previous license stays intact. If deactivating the old activation fails, it stays listed in Polar and can be removed there.",
            )}
          </li>
          <li>
            {tx(
              "Wird der Wert entfernt, kehren beim nächsten Start oder Aktivierungsversuch die manuellen Lizenzfunktionen zurück. Die bestehende Aktivierung bleibt bestehen: Deaktiviere das Gerät manuell oder widerrufe die Lizenz in Polar. Zentrale Änderungen bemerkt die App bei ihrer normalen Prüfung, bei einer aktiven Lizenz nach bis zu sieben Tagen.",
              "Removing the value brings back the manual license controls at the next launch or retry. It does not deactivate the existing activation: deactivate the device manually or revoke the license in Polar. The app notices central changes at its normal validation, up to seven days later for an active license.",
            )}
          </li>
          <li>
            {tx(
              "Einen Schlüssel, den Polar ablehnt, versucht die App nicht automatisch erneut. Eine in Polar gelöschte Aktivierung legt sie bei der nächsten Prüfung neu an, solange der konfigurierte Schlüssel gültig bleibt.",
              "A key that Polar rejects is not retried automatically. An activation deleted in Polar is created again at the next check while the configured key stays valid.",
            )}
          </li>
        </ul>
        <DocsCallout
          label={t(locale, "docs.callout.important")}
          title={tx("Vertraulichkeit des Schlüssels", "Key confidentiality")}
        >
          <p>
            {withCode(
              tx(
                "Richtlinien in der Registry sind kein Geheimnisspeicher: Jeder Benutzer des Geräts kann Werte unter `HKLM` lesen. Nutze die Zugriffskontrollen deines Verteilungswerkzeugs und protokolliere keine Richtlinieninhalte. TypeWhisper hält den Schlüssel aus Logs, Supportberichten, Backups und Exporten heraus; Supportberichte vermerken nur, dass der Wert gesetzt ist.",
                "Registry policies are not a secret store: every user on the device can read values under `HKLM`. Use the access controls of your deployment tool and avoid logging policy contents. TypeWhisper keeps the key out of its logs, support reports, backups, and exports; support reports only note that the value is set.",
              ),
            )}
          </p>
        </DocsCallout>
      </DocsSection>

      <DocsSection id="group-policy" title={tx("Gruppenrichtlinie", "Group Policy")}>
        <p>
          {withCode(
            tx(
              "Jedes Release enthält die Vorlagen als `TypeWhisper-win-PolicyTemplates.zip`, aufgebaut wie `PolicyDefinitions`: `TypeWhisper.admx`, die Sprachdateien für `en-US` und `de-DE` sowie `Set-TypeWhisperPolicy.ps1`. Nimm die Vorlagen aus dem Release, das du verteilst. Sie enthalten nur Computerrichtlinien und schreiben genau die Werte aus der Referenz oben.",
              "Every release includes the templates as `TypeWhisper-win-PolicyTemplates.zip`, laid out like `PolicyDefinitions`: `TypeWhisper.admx`, the `en-US` and `de-DE` language files, and `Set-TypeWhisperPolicy.ps1`. Use the templates from the release you deploy. They contain machine policies only and write exactly the values in the reference above.",
            ),
          )}
        </p>
        <ul>
          <li>
            <a href={policyTemplatesUrl}>
              TypeWhisper-win-PolicyTemplates.zip
            </a>
          </li>
          <li>
            <a href={templatesSourceUrl} target="_blank" rel="noopener noreferrer">
              {tx(
                "Vorlagen und Skript im Repository",
                "Templates and script in the repository",
              )}
            </a>
          </li>
        </ul>
        <ol>
          <li>
            {withCode(
              tx(
                "Kopiere `TypeWhisper.admx` in den zentralen Speicher `\\\\<domain>\\SYSVOL\\<domain>\\Policies\\PolicyDefinitions` und die ADML-Dateien in dessen Unterordner `en-US` und `de-DE`. Ohne zentralen Speicher nimmst du `%SystemRoot%\\PolicyDefinitions` auf dem Computer, auf dem du die Richtlinie bearbeitest.",
                "Copy `TypeWhisper.admx` to the Central Store `\\\\<domain>\\SYSVOL\\<domain>\\Policies\\PolicyDefinitions` and the ADML files into its `en-US` and `de-DE` subfolders. Without a Central Store, use `%SystemRoot%\\PolicyDefinitions` on the computer that edits the policy.",
              ),
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Öffne die Richtlinie im Gruppenrichtlinienverwaltungs-Editor, für die lokale Richtlinie mit `gpedit.msc`, unter Computerkonfiguration > Administrative Vorlagen > TypeWhisper. Empfohlene Einstellungen liegen im Unterordner Empfohlene Einstellungen (Benutzer können sie ändern).",
                "Open the policy in the Group Policy Management Editor, or `gpedit.msc` for the local policy, under Computer Configuration > Administrative Templates > TypeWhisper. Recommended settings are in the subfolder Recommended settings (users can change).",
              ),
            )}
          </li>
          <li>
            {withCode(
              tx(
                "Konfiguriere die Einstellungen. Schalter schreiben bei Aktiviert `1` und bei Deaktiviert `0`. Text-, Auswahl- und Listeneinstellungen schreiben ihre Werte, wenn sie aktiviert sind, und entfernen sie bei Deaktiviert. Nicht konfiguriert entfernt den Wert immer. Für eine Liste, die nichts erlaubt, trägst du als einzigen Eintrag `none` ein.",
                "Configure the settings. Switches write `1` when Enabled and `0` when Disabled. Text, option, and list settings write their values when Enabled and remove them when Disabled. Not Configured always removes the value. For a list that allows nothing, enter the single entry `none`.",
              ),
            )}
          </li>
          <li>
            {tx(
              "Die Richtlinie gilt nach der nächsten Aktualisierung der Gruppenrichtlinie; die laufende App übernimmt sie innerhalb von Sekunden. Sofort aktualisieren:",
              "The policy applies at the next Group Policy refresh, and the running app picks it up within seconds. To refresh right away:",
            )}
          </li>
        </ol>
        <DocsCode locale={locale} lang="powershell" code="gpupdate /target:computer" />

        <DocsSubheading id="policy-names">
          {tx("Einstellungen im Editor", "Settings in the editor")}
        </DocsSubheading>
        <p>
          {tx(
            "Jedes Paar ist eine Einstellung, daher stehen 18 Registry-Werte in 16 Einstellungen:",
            "Each pair is one setting, so 18 registry values appear as 16 settings:",
          )}
        </p>
        <DocsTable
          label={tx("Gruppenrichtlinien-Einstellungen", "Group Policy settings")}
          head={[tx("Einstellung", "Setting"), tx("Registry-Werte", "Registry values")]}
          rows={keys.map((key) => [
            pick(key.policy),
            <>
              {key.names.map((name, index) => (
                <Fragment key={name}>
                  {index > 0 && ", "}
                  <code>{breakable(name, true)}</code>
                </Fragment>
              ))}
            </>,
          ])}
        />
        <p>
          {withCode(
            tx(
              "Der Unterordner für empfohlene Einstellungen enthält fünf weitere, die dieselben Werte unter `Recommended` schreiben: ",
              "The subfolder for recommended settings holds five more, which write the same values under `Recommended`: ",
            ),
          )}
          {recommended.map(([value, en, de], index) => (
            <Fragment key={value}>
              {index > 0 && (index === recommended.length - 1 ? tx(" und ", ", and ") : ", ")}
              {tx(de, en)}
            </Fragment>
          ))}
          .
        </p>
      </DocsSection>

      <DocsSection id="intune" title="Intune">
        <DocsSubheading id="intune-import">
          {tx("ADMX-Vorlage importieren", "Import the ADMX template")}
        </DocsSubheading>
        <ol>
          <li>
            {withCode(
              tx(
                "Öffne im Intune Admin Center Geräte > Konfiguration > ADMX importieren und lade `TypeWhisper.admx` mit der ADML-Datei für `en-US` hoch. Der Import akzeptiert nur `en-US`.",
                "In the Intune admin center, open Devices > Configuration > Import ADMX and upload `TypeWhisper.admx` with the `en-US` ADML file. The import accepts `en-US` only.",
              ),
            )}
          </li>
          <li>
            {tx(
              "Erstelle aus der importierten Vorlage ein Konfigurationsprofil, setze die Einstellungen und weise das Profil Gerätegruppen zu.",
              "Create a configuration profile from the imported template, configure the settings, and assign the profile to device groups.",
            )}
          </li>
        </ol>
        <p>
          {tx(
            "Entfernst du eine Einstellung aus dem Profil oder hebst die Zuweisung auf, steht der Wert wieder auf Nicht konfiguriert. Die App behandelt das als Entfernen: Erzwungene Werte verschwinden, und die eigenen Einstellungen der Benutzer gelten wieder. Microsoft führt den Import eigener ADMX-Vorlagen als öffentliche Vorschau; teste ihn zuerst in einem Pilot-Mandanten.",
            "Removing a setting from the profile, or unassigning the profile, returns the value to Not Configured. The app treats that as removal: enforced values disappear and the users' own settings apply again. Microsoft lists the import of custom ADMX templates as a public preview; test it in a pilot tenant first.",
          )}
        </p>

        <DocsSubheading id="intune-oma-uri">
          {tx("Alternative: OMA-URI", "Alternative: OMA-URI")}
        </DocsSubheading>
        <p>
          {tx(
            "In Mandanten ohne diesen Import nimmst du die ADMX über ein benutzerdefiniertes OMA-URI-Profil auf. Installiere die Vorlage mit ihrem Dateiinhalt als Zeichenfolge:",
            "In tenants without the import, ingest the ADMX through a custom OMA-URI profile. Install the template with its file content as a string value:",
          )}
        </p>
        <DocsCode locale={locale} lang="text" code={omaUriInstall} />
        <p>
          {withCode(
            tx(
              "Danach sprichst du jede Einstellung über ihren Namen in `TypeWhisper.admx` an, etwa `AllowCloudTranscription` oder `TranscriptionSelection`, mit `<enabled/>` oder `<disabled/>` und den `<data id=\"…\" value=\"…\"/>`-Elementen der Richtlinie. Empfohlene Einstellungen liegen unter der zweiten Kategorie:",
              "Then address each setting by its name in `TypeWhisper.admx`, such as `AllowCloudTranscription` or `TranscriptionSelection`, with `<enabled/>` or `<disabled/>` and the `<data id=\"…\" value=\"…\"/>` elements of the policy. Recommended settings use the second category:",
            ),
          )}
        </p>
        <DocsCode locale={locale} lang="text" code={omaUriPolicies} />
        <DocsCode locale={locale} lang={tx("Beispiele", "Examples")} code={omaUriExamples(isDe)} />
        <p>
          {tx(
            "Prüfe die genauen URIs auf einem Pilotgerät, bevor du sie ausrollst.",
            "Check the exact URIs on a pilot device before you roll them out.",
          )}
        </p>
      </DocsSection>

      <DocsSection id="script" title={tx("Registry und Skripte", "Registry and scripts")}>
        <p>
          {withCode(
            tx(
              "`Set-TypeWhisperPolicy.ps1` schreibt dieselben Werte aus einer PowerShell-Sitzung mit Administratorrechten: für Gruppenrichtlinien-Einstellungen (Group Policy Preferences), Intune-Skripte, andere Verwaltungswerkzeuge und Tests. Das Skript läuft in Windows PowerShell 5.1 und PowerShell 7 und legt Listen so an, wie App und Vorlage sie erwarten.",
              "`Set-TypeWhisperPolicy.ps1` writes the same values from an elevated PowerShell session: for Group Policy Preferences, Intune scripts, other management tools, and tests. It runs in Windows PowerShell 5.1 and PowerShell 7 and writes lists the way the app and the template expect them.",
            ),
          )}
        </p>
        <DocsCode locale={locale} lang="powershell" code={scriptExamples(isDe)} />
        <p>
          {tx(
            "Ohne das Skript erreichst du dasselbe mit einfachen Registry-Befehlen:",
            "Without the script, plain registry commands do the same:",
          )}
        </p>
        <DocsCode locale={locale} lang="powershell" code={registryExample(isDe)} />
      </DocsSection>

      <DocsSection
        id="check"
        title={tx("Wirksame Werte prüfen", "Check the effective values")}
      >
        <ul>
          <li>
            {withCode(
              tx(
                "Einstellungen > Erweitert > Verwaltete Einstellungen zeigt die auf dem Gerät wirksamen Werte und unter Probleme in der Richtlinie alles, was nicht passt: ungültige Werte, unvollständige Paare, fehlende Anbieter oder Modelle und Einschränkungen unter `Recommended`.",
                "Settings > Advanced > Managed settings shows the values in effect on the device and, under Policy problems, everything that does not fit: invalid values, incomplete pairs, missing providers or models, and restrictions placed under `Recommended`.",
              ),
            )}
          </li>
          <li>
            {tx(
              "Gesperrte Einstellungen sagen in der App, dass deine Organisation sie verwaltet. Lässt sich die Richtlinie nicht lesen, meldet der Bereich das, und die App behält die zuletzt bekannten Werte.",
              "Locked settings say in the app that your organization manages them. If the policy cannot be read, the section says so and the app keeps the last known values.",
            )}
          </li>
          <li>
            {tx(
              "Der Supportbericht unter Einstellungen > Erweitert > Support-Diagnose > Supportbericht exportieren enthält denselben Abschnitt. Benutzer können ihn an dich oder an den TypeWhisper-Support schicken.",
              "The support report from Settings > Advanced > Support diagnostics > Export support report contains the same section. Users can send it to you or to TypeWhisper support.",
            )}
          </li>
          <li>
            {withCode(
              tx(
                "`Set-TypeWhisperPolicy.ps1 -Show` zeigt, was in der Registry steht.",
                "`Set-TypeWhisperPolicy.ps1 -Show` prints what is in the registry.",
              ),
            )}
          </li>
        </ul>
        <a href={localePath(locale, "/docs/windows/deployment")} className="site-link">
          {tx(
            "Installer, Netzwerk-Hosts und Mikrofonzugriff",
            "Installers, network hosts, and microphone access",
          )}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </DocsSection>
    </>
  );
}

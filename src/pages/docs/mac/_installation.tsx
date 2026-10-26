import { ArrowRight, Plus } from "lucide-react";
import {
  DocsCallout,
  DocsCode,
  DocsSection,
  withCode,
} from "@/components/docs/prose";
import { StudioVideo } from "@/components/ui/studio-video";
import { localePath, t, type Locale } from "@/i18n/index";
import { macDmgUrl } from "@/lib/platform-download";

export default function DocsMacInstallation({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const isDe = locale === "de";

  const uninstallNotes = isDe
    ? [
        "Der CLI-Pfad ist nur relevant, wenn du das Tool über Einstellungen > Erweitert > Kommandozeilen-Tool installiert hast.",
        "Der Documents-Ordner ist optional und betrifft nur exportierte Aufnahmen oder Dateien, die du ebenfalls löschen möchtest.",
        "Öffne zusätzlich den macOS-Schlüsselbund, suche nach `com.typewhisper.mac.apikey` und entferne passende Einträge, einschließlich Lizenzdaten unter `com.typewhisper.mac.apikey.license`.",
        "Wenn `~/Library` im Finder ausgeblendet ist, nutze Finder > Gehe zu > Gehe zum Ordner und füge den jeweiligen Pfad ein.",
        "Starte den Mac nach der Bereinigung neu und installiere anschließend die neueste Version erneut.",
      ]
    : [
        "The CLI path only matters if you installed the tool from Settings > Advanced > Command Line Tool.",
        "The Documents folder is optional and only affects exported recordings or files you also want to remove.",
        "Also open macOS Keychain Access, search for `com.typewhisper.mac.apikey`, and remove matching entries, including license items under `com.typewhisper.mac.apikey.license`.",
        "If `~/Library` is hidden in Finder, use Finder > Go > Go to Folder and paste the path you need.",
        "Restart your Mac after cleanup, then install the latest version again.",
      ];

  return (
    <>
      <DocsSection
        id="requirements"
        title={t(locale, "docs.mac.installation.requirements.title")}
      >
        <ul>
          <li>{t(locale, "docs.mac.installation.requirements.macos")}</li>
          <li>{t(locale, "docs.mac.installation.requirements.chip")}</li>
          <li>{t(locale, "docs.mac.installation.requirements.ram")}</li>
          <li>{t(locale, "docs.mac.installation.requirements.translate")}</li>
          <li>
            {t(locale, "docs.mac.installation.requirements.intelligence")}
          </li>
        </ul>
      </DocsSection>

      <DocsSection
        id="download"
        title={t(locale, "docs.mac.installation.download.title")}
      >
        <p>
          {t(locale, "docs.mac.installation.download.descBefore")}{" "}
          <a
            href={macDmgUrl}
            data-download-social-trigger
            data-download-platform="mac"
            data-download-target="mac_dmg"
            data-tracking-placement="docs"
          >
            {t(locale, "docs.mac.installation.download.linkText")}
          </a>{" "}
          {t(locale, "docs.mac.installation.download.descAfter")}
        </p>
        <p>{t(locale, "docs.mac.installation.download.channels")}</p>
      </DocsSection>

      <DocsSection
        id="homebrew"
        title={t(locale, "docs.mac.installation.homebrew.title")}
      >
        <DocsCode
          code="brew install --cask typewhisper/tap/typewhisper"
          lang="bash"
          locale={locale}
          trackPlatform="mac"
          trackTarget="mac_homebrew"
        />
      </DocsSection>

      <DocsSection
        id="first-launch"
        title={t(locale, "docs.mac.installation.firstLaunch.title")}
      >
        <p>{t(locale, "docs.mac.installation.firstLaunch.desc")}</p>
        <p>{t(locale, "docs.mac.installation.firstLaunch.language")}</p>
      </DocsSection>

      <DocsSection
        id="iphone"
        title={isDe ? "iPhone und iPad koppeln" : "Pair an iPhone or iPad"}
      >
        <p>
          {isDe
            ? "Ab TypeWhisper 1.8 transkribiert ein gekoppeltes iPhone oder iPad mit TypeWhisper für iOS 1.2 über das lokale Netzwerk mit den Modellen dieses Macs. Wenn du es erlaubst, nutzt es auch die Sprachmodelle und Workflows des Macs. Beides gehört zu Premium und ist standardmäßig aus."
            : "From TypeWhisper 1.8, a paired iPhone or iPad running TypeWhisper for iOS 1.2 transcribes with this Mac's models over the local network. If you allow it, it also uses the Mac's language models and workflows. Both are part of Premium and off by default."}
        </p>
        <StudioVideo
          slug="mac-ios-release"
          locale={locale}
          label={
            isDe
              ? "TypeWhisper 1.8 für den Mac und 1.2 fürs iPhone"
              : "TypeWhisper 1.8 for Mac and 1.2 for iPhone"
          }
          caption={
            isDe
              ? "Mac App Store, Kopplung mit Code, Diktat auf dem iPhone und ein Mac-Workflow. 67 Sekunden, mit Untertiteln."
              : "Mac App Store, pairing with a code, dictating on iPhone, and a Mac workflow. 67 seconds, with captions."
          }
        />
        <ol>
          <li>
            {isDe
              ? "Öffne auf dem Mac Einstellungen > Premium > iPhone und iPad, schalte „Gekoppelte Geräte im lokalen Netzwerk erlauben“ ein und klicke auf „Gerät koppeln …“."
              : "On the Mac, open Settings > Premium > iPhone and iPad, turn on Allow Paired Devices on the Local Network, and click Pair Device…"}
          </li>
          <li>
            {isDe
              ? "Öffne TypeWhisper auf dem iPhone oder iPad, gehe zu Einstellungen > Mac und wähle deinen Mac unter „Macs in diesem Netzwerk“."
              : "On the iPhone or iPad, open TypeWhisper, go to Settings > Mac, and choose your Mac under Macs on This Network."}
          </li>
          <li>
            {isDe
              ? "Beide Geräte zeigen denselben sechsstelligen Code. Tippe auf dem iPhone auf „Die Codes stimmen überein“ und klicke auf dem Mac auf „Bestätigen“."
              : "Both devices show the same six-digit code. Tap The Codes Match on the iPhone and click Approve on the Mac."}
          </li>
          <li>
            {isDe
              ? "Tippe auf „Für Spracherkennung verwenden“. Das iPhone transkribiert dann mit dem Modell, das du unter „Modell auf dem Mac“ wählst."
              : "Tap Use for Speech Recognition. The iPhone then transcribes with the model you choose under Model on the Mac."}
          </li>
        </ol>
        <p>
          {isDe
            ? "Für Sprachmodelle und Workflows schaltest du auf dem Mac zusätzlich „Schreiben mit diesem Mac erlauben“ ein. Jeder Workflow erscheint dann als Format am Ende der Formatliste auf dem iPhone."
            : "For language models and workflows, also turn on Allow Writing with This Mac. Each workflow then appears as a format at the end of the iPhone's format list."}
        </p>
        <DocsCallout label={t(locale, "docs.callout.important")}>
          <p>
            {isDe
              ? "Die Verbindung ist verschlüsselt, und der Mac nimmt nur gekoppelte Geräte an. Ist auf dem Mac ein Cloud-Modell gewählt, sendet der Mac Audio oder Text weiterhin an diesen Anbieter. Bleibt der Mac auf dem iPhone unsichtbar, erlaube TypeWhisper in den Systemeinstellungen unter Datenschutz & Sicherheit > Lokales Netzwerk."
              : "The connection is encrypted, and the Mac accepts only paired devices. If a cloud model is selected on the Mac, the Mac still sends audio or text to that provider. If the Mac stays invisible on the iPhone, allow TypeWhisper in System Settings under Privacy & Security > Local Network."}
          </p>
        </DocsCallout>
        <a href={localePath(locale, "/docs/ios#mac")} className="site-link">
          {isDe
            ? "Den Mac auf dem iPhone nutzen"
            : "Use your Mac from the iPhone"}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </DocsSection>

      <DocsSection
        id="organizations"
        title={isDe ? "Für Organisationen" : "For organizations"}
      >
        <p>
          {isDe
            ? "Administratoren verteilen TypeWhisper mit einem MDM wie Iru oder Jamf Pro und steuern es ab Version 1.8 über Konfigurationsprofile. Editionen, Updates, Berechtigungen und Netzwerk-Hosts beschreibt die Seite Bereitstellung."
            : "Administrators roll out TypeWhisper with an MDM such as Iru or Jamf Pro and, from version 1.8, control it through configuration profiles. Editions, updates, permissions, and network hosts are described on the Deployment page."}
        </p>
        <a
          href={localePath(locale, "/docs/mac/deployment")}
          className="site-link"
        >
          {isDe
            ? "TypeWhisper in der Organisation verteilen"
            : "Roll out TypeWhisper in your organization"}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </DocsSection>

      <details id="upgrade" className="site-disclosure docs-disclosure docs-anchor-target">
        <summary>
          {t(locale, "docs.mac.installation.upgradeDetails")}
          <Plus className="size-5" aria-hidden="true" />
        </summary>
        <div className="site-disclosure__body">
          <h2>{t(locale, "docs.mac.installation.release.title")}</h2>
          <p>{t(locale, "docs.mac.installation.release.desc")}</p>

          <h2>{t(locale, "docs.mac.installation.highlights.title")}</h2>
          <ul>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <li key={item}>
                {t(locale, `docs.mac.installation.highlights.item${item}`)}
              </li>
            ))}
          </ul>

          <h2>{t(locale, "docs.mac.installation.upgrade.title")}</h2>
          <p>{t(locale, "docs.mac.installation.upgrade.desc")}</p>

          <DocsCallout
            label={t(locale, "docs.callout.important")}
            title={t(locale, "docs.mac.installation.sync.title")}
          >
            <p>{t(locale, "docs.mac.installation.sync.desc")}</p>
          </DocsCallout>
        </div>
      </details>

      <DocsSection
        id="build-from-source"
        title={t(locale, "docs.mac.installation.buildFromSource.title")}
      >
        <DocsCode
          locale={locale}
          lang="shell"
          code={
            "git clone https://github.com/TypeWhisper/typewhisper-mac.git\ncd typewhisper-mac\n# Requires Xcode 16+\nopen TypeWhisper.xcodeproj"
          }
        />
      </DocsSection>

      <DocsSection id="uninstall" title={isDe ? "Deinstallieren" : "Uninstall"}>
        <p>
          {isDe
            ? "Wenn du TypeWhisper auf macOS vollständig entfernen und mit einer sauberen Installation neu starten willst, reicht das Löschen der App oft nicht aus. Die offiziellen Release-Builds speichern zusätzlich lokale Daten, Widget-Status und Secrets in ~/Library und im Schlüsselbund."
            : "If you want to remove TypeWhisper completely on macOS and reinstall from a clean slate, deleting the app alone is often not enough. Official release builds also store local state, widget data, and secrets in ~/Library and Keychain."}
        </p>

        <DocsCode
          locale={locale}
          lang="shell"
          code={`# ${
            isDe
              ? "Optional bei Homebrew-Installationen"
              : "Optional if installed via Homebrew"
          }\nbrew uninstall --cask typewhisper`}
        />

        <p>
          {isDe
            ? "Danach TypeWhisper beenden und die folgenden Pfade entfernen:"
            : "After that, quit TypeWhisper and remove the following paths:"}
        </p>

        <DocsCode
          locale={locale}
          lang="shell"
          code={`rm -rf /Applications/TypeWhisper.app
rm -rf "$HOME/Library/Application Support/TypeWhisper"
rm -f "$HOME/Library/Preferences/com.typewhisper.mac.plist"
rm -rf "$HOME/Library/Group Containers/2D8ALY3LCL.com.typewhisper.mac"
rm -f /usr/local/bin/typewhisper
rm -rf "$HOME/Documents/TypeWhisper Recordings"`}
        />

        <ul>
          {uninstallNotes.map((note) => (
            <li key={note}>{withCode(note)}</li>
          ))}
        </ul>
      </DocsSection>
    </>
  );
}

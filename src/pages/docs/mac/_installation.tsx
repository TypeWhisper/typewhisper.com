import { Plus } from "lucide-react";
import {
  DocsCallout,
  DocsCode,
  DocsSection,
  withCode,
} from "@/components/docs/prose";
import { t, type Locale } from "@/i18n/index";
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

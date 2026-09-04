import { CodeBlock } from "@/components/ui/code-block";
import { t, type Locale } from "@/i18n/index";
import { macDmgUrl } from "@/lib/platform-download";

export default function DocsMacInstallation({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const isDe = locale === "de";

  function trackHomebrewCopy() {
    window.plausible?.("Download", {
      props: {
        platform: "mac",
        target: "mac_homebrew",
        placement: "docs",
        locale,
      },
    });
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">
        {t(locale, "docs.mac.installation.title")}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {t(locale, "docs.mac.installation.subtitle")}
      </p>

      <div className="mt-6 rounded-2xl bg-card p-6">
        <h2 className="text-lg font-semibold">
          {t(locale, "docs.mac.installation.requirements.title")}
        </h2>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          <li>
            &bull; {t(locale, "docs.mac.installation.requirements.macos")}
          </li>
          <li>&bull; {t(locale, "docs.mac.installation.requirements.chip")}</li>
          <li>&bull; {t(locale, "docs.mac.installation.requirements.ram")}</li>
          <li>
            &bull; {t(locale, "docs.mac.installation.requirements.translate")}
          </li>
          <li>
            &bull;{" "}
            {t(locale, "docs.mac.installation.requirements.intelligence")}
          </li>
        </ul>
      </div>

      <div className="mt-6 rounded-2xl bg-card p-6">
        <h2 className="text-lg font-semibold">
          {t(locale, "docs.mac.installation.download.title")}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          {t(locale, "docs.mac.installation.download.descBefore")}{" "}
          <a
            href={macDmgUrl}
            data-download-social-trigger
            data-download-platform="mac"
            data-download-target="mac_dmg"
            data-tracking-placement="docs"
            className="text-primary hover:underline"
          >
            {t(locale, "docs.mac.installation.download.linkText")}
          </a>{" "}
          {t(locale, "docs.mac.installation.download.descAfter")}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {t(locale, "docs.mac.installation.download.channels")}
        </p>
      </div>

      <div className="mt-6 rounded-2xl bg-card p-6">
        <h2 className="text-lg font-semibold">
          {t(locale, "docs.mac.installation.homebrew.title")}
        </h2>
        <div className="mt-3">
          <CodeBlock
            code="brew install --cask typewhisper"
            lang="bash"
            locale={locale}
            onCopy={trackHomebrewCopy}
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-card p-6">
        <h2 className="text-lg font-semibold">
          {t(locale, "docs.mac.installation.firstLaunch.title")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t(locale, "docs.mac.installation.firstLaunch.desc")}
        </p>
      </div>

      <details className="mt-8 rounded-2xl border border-border p-5">
        <summary className="cursor-pointer text-lg font-semibold">
          {t(locale, "docs.mac.installation.upgradeDetails")}
        </summary>
        <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <h2 className="text-lg font-semibold">
            {t(locale, "docs.mac.installation.release.title")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.installation.release.desc")}
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {t(locale, "docs.mac.installation.highlights.title")}
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {[1, 2, 3, 4].map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true">&bull;</span>
                <span>
                  {t(locale, `docs.mac.installation.highlights.item${item}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">
              {t(locale, "docs.mac.installation.upgrade.title")}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.installation.upgrade.desc")}
            </p>
          </div>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
            <h2 className="text-lg font-semibold">
              {t(locale, "docs.mac.installation.sync.title")}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.installation.sync.desc")}
            </p>
          </div>
        </div>
      </details>

      <div className="mt-6 rounded-2xl bg-card p-6">
        <h2 className="text-lg font-semibold">
          {t(locale, "docs.mac.installation.buildFromSource.title")}
        </h2>
        <div className="mt-3">
          <CodeBlock
            locale={locale}
            lang="shell"
            code={
              "git clone https://github.com/TypeWhisper/typewhisper-mac.git\ncd typewhisper-mac\n# Requires Xcode 16+\nopen TypeWhisper.xcodeproj"
            }
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-card p-6">
        <h2 className="text-lg font-semibold">
          {isDe ? "Deinstallieren" : "Uninstall"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isDe
            ? "Wenn du TypeWhisper auf macOS vollständig entfernen und mit einer sauberen Installation neu starten willst, reicht das Löschen der App oft nicht aus. Die offiziellen Release-Builds speichern zusätzlich lokale Daten, Widget-Status und Secrets in ~/Library und im Schlüsselbund."
            : "If you want to remove TypeWhisper completely on macOS and reinstall from a clean slate, deleting the app alone is often not enough. Official release builds also store local state, widget data, and secrets in ~/Library and Keychain."}
        </p>

        <div className="mt-4 rounded-md bg-background p-4 font-mono text-sm">
          <p className="text-muted-foreground">
            #{" "}
            {isDe
              ? "Optional bei Homebrew-Installationen"
              : "Optional if installed via Homebrew"}
          </p>
          <p>brew uninstall --cask typewhisper</p>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          {isDe
            ? "Danach TypeWhisper beenden und die folgenden Pfade entfernen:"
            : "After that, quit TypeWhisper and remove the following paths:"}
        </p>

        <div className="mt-3">
          <CodeBlock
            locale={locale}
            lang="shell"
            code={`rm -rf /Applications/TypeWhisper.app
rm -rf "$HOME/Library/Application Support/TypeWhisper"
rm -f "$HOME/Library/Preferences/com.typewhisper.mac.plist"
rm -rf "$HOME/Library/Group Containers/2D8ALY3LCL.com.typewhisper.mac"
rm -f /usr/local/bin/typewhisper
rm -rf "$HOME/Documents/TypeWhisper Recordings"`}
          />
        </div>

        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>
            &bull;{" "}
            {isDe
              ? "Der CLI-Pfad ist nur relevant, wenn du das Tool über Einstellungen > Erweitert > CLI Tool installiert hast."
              : "The CLI path only matters if you installed the tool from Settings > Advanced > CLI Tool."}
          </li>
          <li>
            &bull;{" "}
            {isDe
              ? "Der Documents-Ordner ist optional und betrifft nur exportierte Aufnahmen oder Dateien, die du ebenfalls löschen möchtest."
              : "The Documents folder is optional and only affects exported recordings or files you also want to remove."}
          </li>
          <li>
            &bull;{" "}
            {isDe
              ? "Öffne zusätzlich den macOS-Schlüsselbund, suche nach `com.typewhisper.mac.apikey` und entferne passende Einträge, einschließlich Lizenzdaten unter `com.typewhisper.mac.apikey.license`."
              : "Also open macOS Keychain Access, search for `com.typewhisper.mac.apikey`, and remove matching entries, including license items under `com.typewhisper.mac.apikey.license`."}
          </li>
          <li>
            &bull;{" "}
            {isDe
              ? "Wenn `~/Library` im Finder ausgeblendet ist, nutze Finder > Gehe zu > Gehe zum Ordner und füge den jeweiligen Pfad ein."
              : "If `~/Library` is hidden in Finder, use Finder > Go > Go to Folder and paste the path you need."}
          </li>
          <li>
            &bull;{" "}
            {isDe
              ? "Starte den Mac nach der Bereinigung neu und installiere anschließend die neueste Version erneut."
              : "Restart your Mac after cleanup, then install the latest version again."}
          </li>
        </ul>
      </div>
    </div>
  );
}

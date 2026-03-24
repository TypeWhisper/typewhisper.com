import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { t, type Locale } from "@/i18n/index";

export default function DocsMacInstallation({ locale = "en" }: { locale?: Locale }) {
  const [copied, setCopied] = useState(false);

  function copyCommand() {
    navigator.clipboard.writeText(
      "brew install --cask typewhisper/tap/typewhisper",
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {t(locale, "docs.mac.installation.title")}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {t(locale, "docs.mac.installation.subtitle")}
        </p>

        <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.installation.release.title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.installation.release.desc")}
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.installation.requirements.title")}</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>&bull; {t(locale, "docs.mac.installation.requirements.macos")}</li>
            <li>&bull; {t(locale, "docs.mac.installation.requirements.chip")}</li>
            <li>&bull; {t(locale, "docs.mac.installation.requirements.ram")}</li>
            <li>&bull; {t(locale, "docs.mac.installation.requirements.translate")}</li>
            <li>&bull; {t(locale, "docs.mac.installation.requirements.intelligence")}</li>
          </ul>
        </div>

        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.installation.download.title")}</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.installation.download.descBefore")}{" "}
            <a
              href="https://github.com/TypeWhisper/typewhisper-mac/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {t(locale, "docs.mac.installation.download.linkText")}
            </a>
            {" "}{t(locale, "docs.mac.installation.download.descAfter")}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.installation.download.channels")}
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.installation.homebrew.title")}</h2>
          <div className="mt-3 flex items-center justify-between rounded-md bg-background p-4 font-mono text-sm">
            <p>brew install --cask typewhisper/tap/typewhisper</p>
            <button
              onClick={copyCommand}
              className="ml-4 shrink-0 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Copy command"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.installation.buildFromSource.title")}</h2>
          <div className="mt-3 rounded-md bg-background p-4 font-mono text-sm">
            <p className="text-muted-foreground"># Clone and open in Xcode</p>
            <p>git clone https://github.com/TypeWhisper/typewhisper-mac.git</p>
            <p>cd typewhisper-mac</p>
            <p className="mt-2 text-muted-foreground"># Requires Xcode 16+</p>
            <p>open TypeWhisper.xcodeproj</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.installation.firstLaunch.title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.installation.firstLaunch.desc")}
          </p>
        </div>
      </div>
  );
}

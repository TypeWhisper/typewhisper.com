import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { t, type Locale } from "@/i18n/index";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copy}
      className="ml-4 shrink-0 text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Copy command"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </button>
  );
}

export default function DocsMacTroubleshooting({ locale = "en" }: { locale?: Locale }) {
  return (
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {t(locale, "docs.mac.troubleshooting.title")}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {t(locale, "docs.mac.troubleshooting.subtitle")}
        </p>

        {/* Text not inserted */}
        <div className="mt-8 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {t(locale, "docs.mac.troubleshooting.textInsert.title")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.troubleshooting.textInsert.desc1a")}{" "}
            <strong className="text-foreground">{t(locale, "docs.mac.troubleshooting.textInsert.accessibility")}</strong>{" "}
            {t(locale, "docs.mac.troubleshooting.textInsert.desc1b")}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.troubleshooting.textInsert.desc2a")}{" "}
            <strong className="text-foreground">{t(locale, "docs.mac.troubleshooting.textInsert.historyEmpty")}</strong>{" "}
            {t(locale, "docs.mac.troubleshooting.textInsert.desc2b")}
          </p>

          <h3 className="mt-5 text-sm font-semibold">{t(locale, "docs.mac.troubleshooting.howToFix")}</h3>
          <ol className="mt-2 space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>
              {t(locale, "docs.mac.troubleshooting.textInsert.fix1a")}{" "}
              <strong className="text-foreground">
                {t(locale, "docs.mac.troubleshooting.textInsert.fix1Path")}
              </strong>
            </li>
            <li>
              {t(locale, "docs.mac.troubleshooting.textInsert.fix2")}
            </li>
            <li>{t(locale, "docs.mac.troubleshooting.textInsert.fix3")}</li>
          </ol>

          <p className="mt-4 text-sm text-muted-foreground">
            {t(locale, "docs.mac.troubleshooting.textInsert.tccDesc")}
          </p>
          <div className="mt-2 flex items-center justify-between rounded-md bg-background p-4 font-mono text-sm">
            <p>tccutil reset Accessibility com.typewhisper.mac</p>
            <CopyButton text="tccutil reset Accessibility com.typewhisper.mac" />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.troubleshooting.textInsert.tccAfter")}
          </p>
        </div>

        {/* Microphone permission */}
        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {t(locale, "docs.mac.troubleshooting.microphone.title")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.troubleshooting.microphone.desc1a")}{" "}
            <strong className="text-foreground">
              {t(locale, "docs.mac.troubleshooting.microphone.desc1Path")}
            </strong>{" "}
            {t(locale, "docs.mac.troubleshooting.microphone.desc1b")}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.troubleshooting.microphone.desc2")}
          </p>
          <div className="mt-2 flex items-center justify-between rounded-md bg-background p-4 font-mono text-sm">
            <p>tccutil reset Microphone com.typewhisper.mac</p>
            <CopyButton text="tccutil reset Microphone com.typewhisper.mac" />
          </div>
        </div>

        {/* Permissions after reinstall */}
        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {t(locale, "docs.mac.troubleshooting.reinstall.title")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.troubleshooting.reinstall.desc1")}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.troubleshooting.reinstall.desc2")}
          </p>
        </div>

        {/* Setup wizard */}
        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {t(locale, "docs.mac.troubleshooting.setupWizard.title")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.troubleshooting.setupWizard.desc")}
          </p>
        </div>

        {/* No audio input */}
        <div className="mt-6 rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.troubleshooting.noAudio.title")}</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.troubleshooting.noAudio.desc1a")}{" "}
            <strong className="text-foreground">
              {t(locale, "docs.mac.troubleshooting.noAudio.settingsPath")}
            </strong>{" "}
            {t(locale, "docs.mac.troubleshooting.noAudio.desc1b")}
          </p>
        </div>
      </div>
  );
}

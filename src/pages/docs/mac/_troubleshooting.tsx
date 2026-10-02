import { DocsCode, DocsSection, DocsSubheading } from "@/components/docs/prose";
import { t, type Locale } from "@/i18n/index";

export default function DocsMacTroubleshooting({
  locale = "en",
}: {
  locale?: Locale;
}) {
  return (
    <>
      <DocsSection
        id="text-not-inserted"
        title={t(locale, "docs.mac.troubleshooting.textInsert.title")}
      >
        <p>
          {t(locale, "docs.mac.troubleshooting.textInsert.desc1a")}{" "}
          <strong>
            {t(locale, "docs.mac.troubleshooting.textInsert.accessibility")}
          </strong>{" "}
          {t(locale, "docs.mac.troubleshooting.textInsert.desc1b")}
        </p>
        <p>
          {t(locale, "docs.mac.troubleshooting.textInsert.desc2a")}{" "}
          <strong>
            {t(locale, "docs.mac.troubleshooting.textInsert.historyEmpty")}
          </strong>{" "}
          {t(locale, "docs.mac.troubleshooting.textInsert.desc2b")}
        </p>

        <DocsSubheading id="text-not-inserted-fix">
          {t(locale, "docs.mac.troubleshooting.howToFix")}
        </DocsSubheading>
        <ol>
          <li>
            {t(locale, "docs.mac.troubleshooting.textInsert.fix1a")}{" "}
            <strong>
              {t(locale, "docs.mac.troubleshooting.textInsert.fix1Path")}
            </strong>
          </li>
          <li>{t(locale, "docs.mac.troubleshooting.textInsert.fix2")}</li>
          <li>{t(locale, "docs.mac.troubleshooting.textInsert.fix3")}</li>
        </ol>

        <p>{t(locale, "docs.mac.troubleshooting.textInsert.tccDesc")}</p>
        <DocsCode
          code="tccutil reset Accessibility com.typewhisper.mac"
          lang="shell"
          locale={locale}
        />
        <p>{t(locale, "docs.mac.troubleshooting.textInsert.tccAfter")}</p>
      </DocsSection>

      <DocsSection
        id="microphone"
        title={t(locale, "docs.mac.troubleshooting.microphone.title")}
      >
        <p>
          {t(locale, "docs.mac.troubleshooting.microphone.desc1a")}{" "}
          <strong>
            {t(locale, "docs.mac.troubleshooting.microphone.desc1Path")}
          </strong>{" "}
          {t(locale, "docs.mac.troubleshooting.microphone.desc1b")}
        </p>
        <p>{t(locale, "docs.mac.troubleshooting.microphone.desc2")}</p>
        <DocsCode
          code="tccutil reset Microphone com.typewhisper.mac"
          lang="shell"
          locale={locale}
        />
      </DocsSection>

      <DocsSection
        id="permissions-after-reinstall"
        title={t(locale, "docs.mac.troubleshooting.reinstall.title")}
      >
        <p>{t(locale, "docs.mac.troubleshooting.reinstall.desc1")}</p>
        <p>{t(locale, "docs.mac.troubleshooting.reinstall.desc2")}</p>
      </DocsSection>

      <DocsSection
        id="setup-wizard"
        title={t(locale, "docs.mac.troubleshooting.setupWizard.title")}
      >
        <p>{t(locale, "docs.mac.troubleshooting.setupWizard.desc")}</p>
      </DocsSection>

      <DocsSection
        id="live-transcript"
        title={t(locale, "docs.mac.troubleshooting.liveTranscript.title")}
      >
        <p>{t(locale, "docs.mac.troubleshooting.liveTranscript.desc")}</p>

        <DocsSubheading id="live-transcript-fix">
          {t(locale, "docs.mac.troubleshooting.howToFix")}
        </DocsSubheading>
        <ol>
          <li>
            {t(locale, "docs.mac.troubleshooting.liveTranscript.fix1a")}{" "}
            <strong>
              {t(locale, "docs.mac.troubleshooting.liveTranscript.fix1Path")}
            </strong>
          </li>
          <li>{t(locale, "docs.mac.troubleshooting.liveTranscript.fix2")}</li>
          <li>{t(locale, "docs.mac.troubleshooting.liveTranscript.fix3")}</li>
        </ol>
      </DocsSection>

      <DocsSection
        id="no-audio"
        title={t(locale, "docs.mac.troubleshooting.noAudio.title")}
      >
        <p>
          {t(locale, "docs.mac.troubleshooting.noAudio.desc1a")}{" "}
          <strong>
            {t(locale, "docs.mac.troubleshooting.noAudio.settingsPath")}
          </strong>{" "}
          {t(locale, "docs.mac.troubleshooting.noAudio.desc1b")}
        </p>
      </DocsSection>
    </>
  );
}

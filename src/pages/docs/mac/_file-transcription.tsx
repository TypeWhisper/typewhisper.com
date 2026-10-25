import { DocsCallout, DocsFigure, DocsSection } from "@/components/docs/prose";
import { screenshotPath, t, type Locale } from "@/i18n/index";

export default function DocsMacFileTranscription({
  locale = "en",
}: {
  locale?: Locale;
}) {
  return (
    <>
      <DocsSection
        id="manual"
        title={t(locale, "docs.mac.fileTranscription.manual.title")}
      >
        <p>{t(locale, "docs.mac.fileTranscription.manual.desc1")}</p>
        <p>{t(locale, "docs.mac.fileTranscription.manual.desc2")}</p>
        <DocsFigure
          src={screenshotPath(locale, "/screenshots/mac/file-transcription.png")}
          alt={t(locale, "docs.mac.fileTranscription.imgAlt")}
          loading="eager"
        />
      </DocsSection>

      <DocsSection
        id="watch-folder"
        title={t(locale, "docs.mac.fileTranscription.watchFolder.title")}
      >
        <p>{t(locale, "docs.mac.fileTranscription.watchFolder.desc1")}</p>
        <p>{t(locale, "docs.mac.fileTranscription.watchFolder.desc2")}</p>
      </DocsSection>

      <DocsSection
        id="output"
        title={t(locale, "docs.mac.fileTranscription.output.title")}
      >
        <p>{t(locale, "docs.mac.fileTranscription.output.desc1")}</p>
        <p>{t(locale, "docs.mac.fileTranscription.output.desc2")}</p>
      </DocsSection>

      <DocsSection
        id="delete-source"
        title={t(locale, "docs.mac.fileTranscription.deleteSource.title")}
      >
        <p>{t(locale, "docs.mac.fileTranscription.deleteSource.desc1")}</p>
        <p>{t(locale, "docs.mac.fileTranscription.deleteSource.desc2")}</p>
        <p>{t(locale, "docs.mac.fileTranscription.deleteSource.desc3")}</p>
        <DocsCallout label={t(locale, "docs.callout.important")}>
          <p>{t(locale, "docs.mac.fileTranscription.deleteSource.warning")}</p>
        </DocsCallout>
      </DocsSection>

      <DocsSection
        id="setup"
        title={t(locale, "docs.mac.fileTranscription.setup.title")}
      >
        <ol>
          <li>{t(locale, "docs.mac.fileTranscription.setup.step1")}</li>
          <li>{t(locale, "docs.mac.fileTranscription.setup.step2")}</li>
          <li>{t(locale, "docs.mac.fileTranscription.setup.step3")}</li>
          <li>{t(locale, "docs.mac.fileTranscription.setup.step4")}</li>
        </ol>
      </DocsSection>
    </>
  );
}

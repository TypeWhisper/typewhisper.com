import {
  DocsFigure,
  DocsSection,
  DocsSubheading,
  DocsTerms,
} from "@/components/docs/prose";
import { t, screenshotPath, localePath, type Locale } from "@/i18n/index";

export default function DocsMacFeatures({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const boosting: Array<[name: string, key: string]> = [
    ["Auto", "docs.mac.features.dictionary.boostingAuto"],
    ["Strong (0.50)", "docs.mac.features.dictionary.boostingStrong"],
    ["Balanced (0.65)", "docs.mac.features.dictionary.boostingBalanced"],
    ["Precise (0.80)", "docs.mac.features.dictionary.boostingPrecise"],
    ["Advanced (0.40–0.95)", "docs.mac.features.dictionary.boostingAdvanced"],
  ];

  return (
    <>
      <DocsSection
        id="dictation"
        title={t(locale, "docs.mac.features.dictation.title")}
      >
        <p>{t(locale, "docs.mac.features.dictation.desc")}</p>
      </DocsSection>

      <DocsSection
        id="streaming"
        title={t(locale, "docs.mac.features.streaming.title")}
      >
        <p>{t(locale, "docs.mac.features.streaming.desc")}</p>
      </DocsSection>

      <DocsSection id="workflows" title={t(locale, "docs.mac.features.ai.title")}>
        <p>{t(locale, "docs.mac.features.ai.desc1")}</p>
        <p>{t(locale, "docs.mac.features.ai.desc2")}</p>
        <p>
          <a href={localePath(locale, "/docs/mac/workflows")}>
            {t(locale, "docs.mac.features.ai.learn")}
          </a>
        </p>
        <DocsFigure
          src={screenshotPath(locale, "/screenshots/mac/workflows.png")}
          alt={t(locale, "docs.mac.features.ai.imgAlt")}
          loading="eager"
        />
      </DocsSection>

      <DocsSection
        id="dictionary"
        title={t(locale, "docs.mac.features.dictionary.title")}
      >
        <p>{t(locale, "docs.mac.features.dictionary.desc")}</p>
        <p>{t(locale, "docs.mac.features.dictionary.desc2")}</p>
        <p>{t(locale, "docs.mac.features.dictionary.desc3")}</p>

        <DocsSubheading id="vocabulary-boosting">
          {t(locale, "docs.mac.features.dictionary.boostingTitle")}
        </DocsSubheading>
        <p>{t(locale, "docs.mac.features.dictionary.boostingDesc")}</p>
        <DocsTerms
          items={boosting.map(([name, key]) => ({
            title: <code>{name}</code>,
            description: t(locale, key),
          }))}
        />
        <p>{t(locale, "docs.mac.features.dictionary.boostingExample")}</p>
        <p>{t(locale, "docs.mac.features.dictionary.boostingNote")}</p>

        <DocsSubheading id="automatic-correction-learning">
          {t(locale, "docs.mac.features.dictionary.autoLearnTitle")}
        </DocsSubheading>
        <p>{t(locale, "docs.mac.features.dictionary.autoLearnDesc")}</p>
        <p>{t(locale, "docs.mac.features.dictionary.autoLearnFeedback")}</p>

        <DocsSubheading id="test-correction-learning">
          {t(locale, "docs.mac.features.dictionary.autoLearnTestTitle")}
        </DocsSubheading>
        <p>{t(locale, "docs.mac.features.dictionary.autoLearnTest")}</p>
        <DocsFigure
          src={screenshotPath(locale, "/screenshots/mac/dictionary.png")}
          alt={t(locale, "docs.mac.features.dictionary.imgAlt")}
        />
      </DocsSection>

      <DocsSection
        id="snippets"
        title={t(locale, "docs.mac.features.snippets.title")}
      >
        <p>
          {t(locale, "docs.mac.features.snippets.descBefore")}{" "}
          <code>{"{{DATE}}"}</code>, <code>{"{{TIME}}"}</code>,{" "}
          {t(locale, "docs.mac.features.snippets.descAnd")}{" "}
          <code>{"{{CLIPBOARD}}"}</code>{" "}
          {t(locale, "docs.mac.features.snippets.descAfter")}
        </p>
        <DocsFigure
          src={screenshotPath(locale, "/screenshots/mac/snippets.png")}
          alt={t(locale, "docs.mac.features.snippets.imgAlt")}
        />
      </DocsSection>

      <DocsSection
        id="file-transcription"
        title={t(locale, "docs.mac.features.fileTranscription.title")}
      >
        <p>{t(locale, "docs.mac.features.fileTranscription.desc")}</p>
        <DocsFigure
          src={screenshotPath(locale, "/screenshots/mac/file-transcription.png")}
          alt={t(locale, "docs.mac.fileTranscription.imgAlt")}
        />
      </DocsSection>

      <DocsSection
        id="whisper-mode"
        title={t(locale, "docs.mac.features.whisperMode.title")}
      >
        <p>{t(locale, "docs.mac.features.whisperMode.desc")}</p>
      </DocsSection>

      <DocsSection
        id="translation"
        title={t(locale, "docs.mac.features.translation.title")}
      >
        <p>{t(locale, "docs.mac.features.translation.desc")}</p>
      </DocsSection>

      <DocsSection
        id="history"
        title={t(locale, "docs.mac.features.history.title")}
      >
        <p>{t(locale, "docs.mac.features.history.desc1")}</p>
        <p>{t(locale, "docs.mac.features.history.desc2")}</p>
        <DocsFigure
          src={screenshotPath(locale, "/screenshots/mac/history.png")}
          alt={t(locale, "docs.mac.features.history.imgAlt")}
        />
      </DocsSection>

      <DocsSection
        id="home-dashboard"
        title={t(locale, "docs.mac.features.home.title")}
      >
        <p>{t(locale, "docs.mac.features.home.desc")}</p>
        <DocsFigure
          src={screenshotPath(locale, "/screenshots/mac/home-dashboard.png")}
          alt={t(locale, "docs.mac.features.home.imgAlt")}
        />
      </DocsSection>

      <DocsSection
        id="integrations"
        title={t(locale, "docs.mac.features.plugins.title")}
      >
        <p>{t(locale, "docs.mac.features.plugins.desc")}</p>
        <p>
          {t(locale, "docs.mac.features.plugins.seeBefore")}{" "}
          <a href={localePath(locale, "/addons")}>
            {t(locale, "docs.mac.features.plugins.addonsLink")}
          </a>{" "}
          {t(locale, "docs.mac.features.plugins.seeAfter")}
        </p>
        <DocsFigure
          src={screenshotPath(locale, "/screenshots/mac/plugins.png")}
          alt={t(locale, "docs.mac.features.plugins.imgAlt")}
        />
      </DocsSection>
    </>
  );
}

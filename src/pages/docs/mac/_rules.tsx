import {
  DocsCode,
  DocsFigure,
  DocsSection,
  DocsSubheading,
  DocsTerms,
} from "@/components/docs/prose";
import { StudioVideo } from "@/components/ui/studio-video";
import { getTutorial } from "@/data/tutorials";
import { localePath, t, screenshotPath, type Locale } from "@/i18n/index";

const fields = [
  "apps",
  "websites",
  "language",
  "task",
  "translationMode",
  "engine",
  "prompt",
  "promptProvider",
  "effort",
  "manualShortcut",
  "autoSubmit",
  "inlineCommands",
  "priority",
];

const formats = ["none", "auto", "markdown", "html", "plainText", "code"];

const formattingExamples = ["obsidian", "mail", "codeApp", "unknown"];

const setups = ["mail", "github", "translation", "languageHotkeys", "fallback"];

const paletteExamples = ["input", "instruction", "output"];

const questions = [1, 2, 3, 4, 5, 6];

/** A tutorial video in a section, with a link to its page. */
function SectionTutorial({
  locale,
  slug,
  link,
}: {
  locale: Locale;
  slug: string;
  link: string;
}) {
  const tutorial = getTutorial(slug);
  if (!tutorial) {
    throw new Error(`Unknown tutorial "${slug}" in the Mac workflow docs.`);
  }
  const copy = tutorial.copy[locale];
  return (
    <>
      <StudioVideo
        slug={tutorial.video}
        locale={locale}
        label={copy.title}
        caption={copy.caption}
        portrait={tutorial.portrait}
      />
      <p>
        <a href={localePath(locale, `/tutorials/${tutorial.slug}`)}>{link}</a>
      </p>
    </>
  );
}

export default function DocsMacRules({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <DocsSection id="how-workflows-work" title={t(locale, "docs.mac.rules.howWork.title")}>
        <p>{t(locale, "docs.mac.rules.howWork.desc")}</p>
        <SectionTutorial
          locale={locale}
          slug="email-reply-workflow"
          link={t(locale, "docs.mac.rules.howWork.tutorialLink")}
        />
      </DocsSection>

      <DocsSection id="quick-start" title={t(locale, "docs.mac.rules.palette.title")}>
        <p>{t(locale, "docs.mac.rules.palette.desc")}</p>
        <ol>
          {[1, 2, 3, 4].map((step) => (
            <li key={step}>{t(locale, `docs.mac.rules.palette.step${step}`)}</li>
          ))}
        </ol>
        {paletteExamples.map((example) => (
          <DocsCode
            key={example}
            kind="text"
            locale={locale}
            lang={t(locale, `docs.mac.rules.palette.${example}Label`)}
            code={t(locale, `docs.mac.rules.palette.${example}`)}
          />
        ))}
        <p>
          {t(locale, "docs.mac.rules.palette.help")}{" "}
          <a href="#faq">{t(locale, "docs.mac.rules.palette.helpLink")}</a>
        </p>
      </DocsSection>

      <DocsSection id="matching" title={t(locale, "docs.mac.rules.matching.title")}>
        <DocsTerms
          items={[
            {
              title: t(locale, "docs.mac.rules.matching.siteOnly.title"),
              description: (
                <>
                  {t(locale, "docs.mac.rules.matching.siteOnly.desc1")}{" "}
                  <code>github.com</code>{" "}
                  {t(locale, "docs.mac.rules.matching.siteOnly.desc2")}{" "}
                  <code>gist.github.com</code>
                  {t(locale, "docs.mac.rules.matching.siteOnly.desc3")}
                </>
              ),
            },
            ...["appOnly", "hotkey", "manual", "fallback"].map((kind) => ({
              title: t(locale, `docs.mac.rules.matching.${kind}.title`),
              description: t(locale, `docs.mac.rules.matching.${kind}.desc`),
            })),
          ]}
        />
      </DocsSection>

      <DocsSection id="priority" title={t(locale, "docs.mac.rules.priority.title")}>
        <p>{t(locale, "docs.mac.rules.priority.desc")}</p>
        <ol>
          <li>{t(locale, "docs.mac.rules.priority.item1")}</li>
          <li>{t(locale, "docs.mac.rules.priority.item2")}</li>
          <li>{t(locale, "docs.mac.rules.priority.item3")}</li>
        </ol>
        <p>{t(locale, "docs.mac.rules.priority.manualHotkeyNote")}</p>
      </DocsSection>

      <DocsSection id="creating" title={t(locale, "docs.mac.rules.creating.title")}>
        <p>{t(locale, "docs.mac.rules.creating.desc")}</p>
        <DocsTerms
          items={fields.map((field) => ({
            title: t(locale, `docs.mac.rules.creating.${field}.label`),
            description: t(locale, `docs.mac.rules.creating.${field}.desc`),
          }))}
        />
        <p>{t(locale, "docs.mac.rules.creating.tryItOut")}</p>
        <DocsFigure
          src={screenshotPath(locale, "/screenshots/mac/workflows.png")}
          alt={t(locale, "docs.mac.rules.creating.imgAlt")}
          loading="eager"
        />
      </DocsSection>

      <DocsSection id="manual-shortcut" title={t(locale, "docs.mac.rules.manualShortcut.title")}>
        <p>{t(locale, "docs.mac.rules.manualShortcut.desc")}</p>
        <SectionTutorial
          locale={locale}
          slug="translate-selected-text"
          link={t(locale, "docs.mac.rules.manualShortcut.tutorialLink")}
        />
      </DocsSection>

      <DocsSection
        id="language-and-engine-hotkeys"
        title={t(locale, "docs.mac.rules.languageEngineHotkeys.title")}
      >
        <p>{t(locale, "docs.mac.rules.languageEngineHotkeys.desc")}</p>
        <ol>
          <li>{t(locale, "docs.mac.rules.languageEngineHotkeys.step1")}</li>
          <li>{t(locale, "docs.mac.rules.languageEngineHotkeys.step2")}</li>
          <li>{t(locale, "docs.mac.rules.languageEngineHotkeys.step3")}</li>
          <li>{t(locale, "docs.mac.rules.languageEngineHotkeys.step4")}</li>
        </ol>
        <p>{t(locale, "docs.mac.rules.languageEngineHotkeys.note")}</p>
      </DocsSection>

      <DocsSection id="prompt-override" title={t(locale, "docs.mac.rules.promptOverride.title")}>
        <p>{t(locale, "docs.mac.rules.promptOverride.intro")}</p>
        <p>{t(locale, "docs.mac.rules.promptOverride.templates")}</p>
        <p>{t(locale, "docs.mac.rules.promptOverride.desc")}</p>
      </DocsSection>

      <DocsSection
        id="global-llm-fallbacks"
        title={t(locale, "docs.mac.rules.globalLLMFallbacks.title")}
      >
        <p>{t(locale, "docs.mac.rules.globalLLMFallbacks.desc1")}</p>
        <p>{t(locale, "docs.mac.rules.globalLLMFallbacks.desc2")}</p>
        <p>{t(locale, "docs.mac.rules.globalLLMFallbacks.desc3")}</p>
        <p>{t(locale, "docs.mac.rules.globalLLMFallbacks.effort")}</p>
      </DocsSection>

      <DocsSection id="multiple-engines" title={t(locale, "docs.mac.rules.multipleEngines.title")}>
        <p>{t(locale, "docs.mac.rules.multipleEngines.desc")}</p>
      </DocsSection>

      <DocsSection id="formatting" title={t(locale, "docs.mac.rules.formatting.title")}>
        <p>{t(locale, "docs.mac.rules.formatting.desc1")}</p>
        <p>{t(locale, "docs.mac.rules.formatting.desc2")}</p>
        <DocsTerms
          items={formats.map((format) => ({
            title: t(locale, `docs.mac.rules.formatting.${format}.label`),
            description: t(locale, `docs.mac.rules.formatting.${format}.desc`),
          }))}
        />

        <DocsSubheading id="formatting-examples">
          {t(locale, "docs.mac.rules.formatting.examples.title")}
        </DocsSubheading>
        {formattingExamples.map((example) => (
          <div key={example}>
            <h4>{t(locale, `docs.mac.rules.formatting.examples.${example}.title`)}</h4>
            <p>{t(locale, `docs.mac.rules.formatting.examples.${example}.desc`)}</p>
            <DocsCode
              locale={locale}
              lang={t(locale, "docs.example")}
              code={t(locale, `docs.mac.rules.formatting.examples.${example}.code`)}
            />
          </div>
        ))}

        <DocsSubheading id="formatting-limitations">
          {t(locale, "docs.mac.rules.formatting.limitations.title")}
        </DocsSubheading>
        <ul>
          {[1, 2, 3, 4, 5].map((item) => (
            <li key={item}>
              {t(locale, `docs.mac.rules.formatting.limitations.item${item}`)}
            </li>
          ))}
        </ul>
      </DocsSection>

      <DocsSection id="examples" title={t(locale, "docs.mac.rules.examples.title")}>
        <DocsTerms
          items={setups.map((setup) => ({
            title: t(locale, `docs.mac.rules.examples.${setup}.title`),
            description: t(locale, `docs.mac.rules.examples.${setup}.desc`),
          }))}
        />
      </DocsSection>

      <DocsSection id="faq" title={t(locale, "docs.mac.rules.faq.title")}>
        <DocsTerms
          stacked
          items={questions.map((item) => ({
            title: t(locale, `docs.mac.rules.faq.q${item}.question`),
            description: t(locale, `docs.mac.rules.faq.q${item}.answer`),
          }))}
        />
      </DocsSection>
    </>
  );
}

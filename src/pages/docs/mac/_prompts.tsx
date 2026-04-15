import { Screenshot } from "@/components/ui/screenshot";
import { t, screenshotPath, localePath, type Locale } from "@/i18n/index";

export default function DocsMacPrompts({ locale = "en" }: { locale?: Locale }) {
  const faqItems = [
    {
      question: t(locale, "docs.mac.prompts.faq.q1.question"),
      answer: t(locale, "docs.mac.prompts.faq.q1.answer"),
    },
    {
      question: t(locale, "docs.mac.prompts.faq.q2.question"),
      answer: t(locale, "docs.mac.prompts.faq.q2.answer"),
    },
    {
      question: t(locale, "docs.mac.prompts.faq.q3.question"),
      answer: t(locale, "docs.mac.prompts.faq.q3.answer"),
    },
    {
      question: t(locale, "docs.mac.prompts.faq.q4.question"),
      answer: t(locale, "docs.mac.prompts.faq.q4.answer"),
    },
    {
      question: t(locale, "docs.mac.prompts.faq.q5.question"),
      answer: t(locale, "docs.mac.prompts.faq.q5.answer"),
    },
    {
      question: t(locale, "docs.mac.prompts.faq.q6.question"),
      answer: t(locale, "docs.mac.prompts.faq.q6.answer"),
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">
        {t(locale, "docs.mac.prompts.title")}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {t(locale, "docs.mac.prompts.subtitle")}
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.prompts.intro.title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.prompts.intro.desc1")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.prompts.intro.desc2")}
          </p>
          <div className="mt-4 rounded-xl border border-border bg-background p-4">
            <p className="text-sm font-semibold">{t(locale, "docs.mac.prompts.intro.calloutTitle")}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.prompts.intro.calloutDesc")}
            </p>
          </div>
          <div className="mt-4 rounded-xl border border-border bg-background p-4">
            <p className="text-sm font-semibold">{t(locale, "docs.mac.prompts.intro.cleanupTitle")}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.prompts.intro.cleanupDesc")}{" "}
              <a href={localePath(locale, "/docs/mac/profiles")} className="text-primary hover:underline">
                {t(locale, "docs.mac.prompts.intro.cleanupLink")}
              </a>
            </p>
          </div>
          <Screenshot
            src={screenshotPath(locale, "/screenshots/mac/prompts.png")}
            alt={t(locale, "docs.mac.prompts.intro.imgAlt")}
            className="mt-4 rounded-xl"
          />
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.prompts.quickStart.title")}</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>{t(locale, "docs.mac.prompts.quickStart.step1")}</li>
            <li>{t(locale, "docs.mac.prompts.quickStart.step2")}</li>
            <li>{t(locale, "docs.mac.prompts.quickStart.step3")}</li>
          </ol>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t(locale, "docs.mac.prompts.quickStart.exampleInputLabel")}
              </p>
              <p className="mt-2 text-sm text-foreground">
                {t(locale, "docs.mac.prompts.quickStart.exampleInput")}
              </p>
            </div>
            <div className="rounded-xl bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t(locale, "docs.mac.prompts.quickStart.exampleOutputLabel")}
              </p>
              <p className="mt-2 whitespace-pre-line text-sm text-foreground">
                {t(locale, "docs.mac.prompts.quickStart.exampleOutput")}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.prompts.custom.title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.prompts.custom.desc")}
          </p>

          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>&bull; {t(locale, "docs.mac.prompts.custom.item1")}</li>
            <li>&bull; {t(locale, "docs.mac.prompts.custom.item2")}</li>
            <li>&bull; {t(locale, "docs.mac.prompts.custom.item3")}</li>
            <li>&bull; {t(locale, "docs.mac.prompts.custom.item4")}</li>
            <li>&bull; {t(locale, "docs.mac.prompts.custom.item5")}</li>
          </ul>

          <div className="mt-4 rounded-xl bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t(locale, "docs.mac.prompts.custom.exampleLabel")}
            </p>
            <code className="mt-2 block whitespace-pre-wrap text-sm text-foreground">
              {t(locale, "docs.mac.prompts.custom.examplePrompt")}
            </code>
          </div>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.prompts.faq.title")}</h2>
          <div className="mt-4 space-y-4">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-xl bg-background p-4">
                <h3 className="text-sm font-semibold">{item.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.prompts.advanced.title")}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-background p-4">
              <h3 className="text-sm font-semibold">{t(locale, "docs.mac.prompts.advanced.profiles.title")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(locale, "docs.mac.prompts.advanced.profiles.desc")}
              </p>
              <a href={localePath(locale, "/docs/mac/profiles")} className="mt-3 inline-block text-sm text-primary hover:underline">
                {t(locale, "docs.mac.prompts.advanced.profiles.link")}
              </a>
            </div>
            <div className="rounded-xl bg-background p-4">
              <h3 className="text-sm font-semibold">{t(locale, "docs.mac.prompts.advanced.actions.title")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(locale, "docs.mac.prompts.advanced.actions.desc")}
              </p>
              <a href={localePath(locale, "/addons")} className="mt-3 inline-block text-sm text-primary hover:underline">
                {t(locale, "docs.mac.prompts.advanced.actions.link")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

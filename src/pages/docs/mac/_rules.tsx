import { Screenshot } from "@/components/ui/screenshot";
import { t, screenshotPath, localePath, type Locale } from "@/i18n/index";

export default function DocsMacRules({ locale = "en" }: { locale?: Locale }) {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">
        {t(locale, "docs.mac.rules.title")}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {t(locale, "docs.mac.rules.subtitle")}
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.rules.howWork.title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.rules.howWork.desc")}
          </p>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.rules.matching.title")}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-background p-4">
              <p className="text-sm font-semibold">{t(locale, "docs.mac.rules.matching.appAndSite.title")}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(locale, "docs.mac.rules.matching.appAndSite.desc")}
              </p>
            </div>
            <div className="rounded-xl bg-background p-4">
              <p className="text-sm font-semibold">{t(locale, "docs.mac.rules.matching.siteOnly.title")}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(locale, "docs.mac.rules.matching.siteOnly.desc1")}{" "}
                <code className="rounded bg-card px-1.5 py-0.5 text-xs font-mono">github.com</code>{" "}
                {t(locale, "docs.mac.rules.matching.siteOnly.desc2")}{" "}
                <code className="rounded bg-card px-1.5 py-0.5 text-xs font-mono">gist.github.com</code>
                {t(locale, "docs.mac.rules.matching.siteOnly.desc3")}
              </p>
            </div>
            <div className="rounded-xl bg-background p-4">
              <p className="text-sm font-semibold">{t(locale, "docs.mac.rules.matching.appOnly.title")}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(locale, "docs.mac.rules.matching.appOnly.desc")}
              </p>
            </div>
            <div className="rounded-xl bg-background p-4">
              <p className="text-sm font-semibold">{t(locale, "docs.mac.rules.matching.fallback.title")}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(locale, "docs.mac.rules.matching.fallback.desc")}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.rules.priority.title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.rules.priority.desc")}
          </p>
          <ol className="mt-3 list-decimal list-inside space-y-1.5 text-sm text-muted-foreground">
            <li>{t(locale, "docs.mac.rules.priority.item1")}</li>
            <li>{t(locale, "docs.mac.rules.priority.item2")}</li>
            <li>{t(locale, "docs.mac.rules.priority.item3")}</li>
            <li>{t(locale, "docs.mac.rules.priority.item4")}</li>
          </ol>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.rules.creating.title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.rules.creating.desc")}
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>
              &bull; <strong>{t(locale, "docs.mac.rules.creating.apps.label")}</strong> - {t(locale, "docs.mac.rules.creating.apps.desc")}
            </li>
            <li>
              &bull; <strong>{t(locale, "docs.mac.rules.creating.websites.label")}</strong> - {t(locale, "docs.mac.rules.creating.websites.desc")}
            </li>
            <li>
              &bull; <strong>{t(locale, "docs.mac.rules.creating.language.label")}</strong> - {t(locale, "docs.mac.rules.creating.language.desc")}
            </li>
            <li>
              &bull; <strong>{t(locale, "docs.mac.rules.creating.task.label")}</strong> - {t(locale, "docs.mac.rules.creating.task.desc")}
            </li>
            <li>
              &bull; <strong>{t(locale, "docs.mac.rules.creating.engine.label")}</strong> - {t(locale, "docs.mac.rules.creating.engine.desc")}
            </li>
            <li>
              &bull; <strong>{t(locale, "docs.mac.rules.creating.prompt.label")}</strong> - {t(locale, "docs.mac.rules.creating.prompt.desc")}
            </li>
            <li>
              &bull; <strong>{t(locale, "docs.mac.rules.creating.promptProvider.label")}</strong> - {t(locale, "docs.mac.rules.creating.promptProvider.desc")}
            </li>
            <li>
              &bull; <strong>{t(locale, "docs.mac.rules.creating.manualShortcut.label")}</strong> - {t(locale, "docs.mac.rules.creating.manualShortcut.desc")}
            </li>
            <li>
              &bull; <strong>{t(locale, "docs.mac.rules.creating.autoSubmit.label")}</strong> - {t(locale, "docs.mac.rules.creating.autoSubmit.desc")}
            </li>
            <li>
              &bull; <strong>{t(locale, "docs.mac.rules.creating.priority.label")}</strong> - {t(locale, "docs.mac.rules.creating.priority.desc")}
            </li>
          </ul>
          <Screenshot
            src={screenshotPath(locale, "/screenshots/mac/rules.png")}
            alt={t(locale, "docs.mac.rules.creating.imgAlt")}
            className="mt-4 rounded-xl"
          />
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.rules.manualShortcut.title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.rules.manualShortcut.desc")}
          </p>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.rules.promptOverride.title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.rules.promptOverride.desc")}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            <a href={localePath(locale, "/docs/mac/prompts")} className="text-primary hover:underline">
              {t(locale, "docs.mac.rules.promptOverride.learn")}
            </a>
          </p>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.rules.multipleEngines.title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.rules.multipleEngines.desc")}
          </p>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.rules.formatting.title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(locale, "docs.mac.rules.formatting.desc1")}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {t(locale, "docs.mac.rules.formatting.desc2")}
          </p>

          <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
            <li>
              &bull; <strong>{t(locale, "docs.mac.rules.formatting.none.label")}</strong> - {t(locale, "docs.mac.rules.formatting.none.desc")}
            </li>
            <li>
              &bull; <strong>{t(locale, "docs.mac.rules.formatting.auto.label")}</strong> - {t(locale, "docs.mac.rules.formatting.auto.desc")}
            </li>
            <li>
              &bull; <strong>{t(locale, "docs.mac.rules.formatting.markdown.label")}</strong> - {t(locale, "docs.mac.rules.formatting.markdown.desc")}
            </li>
            <li>
              &bull; <strong>{t(locale, "docs.mac.rules.formatting.html.label")}</strong> - {t(locale, "docs.mac.rules.formatting.html.desc")}
            </li>
            <li>
              &bull; <strong>{t(locale, "docs.mac.rules.formatting.plainText.label")}</strong> - {t(locale, "docs.mac.rules.formatting.plainText.desc")}
            </li>
            <li>
              &bull; <strong>{t(locale, "docs.mac.rules.formatting.code.label")}</strong> - {t(locale, "docs.mac.rules.formatting.code.desc")}
            </li>
          </ul>

          <h3 className="mt-6 text-sm font-semibold">{t(locale, "docs.mac.rules.formatting.examples.title")}</h3>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-md bg-background p-4">
              <p className="text-sm font-semibold">{t(locale, "docs.mac.rules.formatting.examples.obsidian.title")}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t(locale, "docs.mac.rules.formatting.examples.obsidian.desc")}
              </p>
              <div className="mt-3 rounded-md bg-card p-4 font-mono text-sm overflow-x-auto">
                <pre className="whitespace-pre-wrap text-muted-foreground">{t(locale, "docs.mac.rules.formatting.examples.obsidian.code")}</pre>
              </div>
            </div>
            <div className="rounded-md bg-background p-4">
              <p className="text-sm font-semibold">{t(locale, "docs.mac.rules.formatting.examples.mail.title")}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t(locale, "docs.mac.rules.formatting.examples.mail.desc")}
              </p>
              <div className="mt-3 rounded-md bg-card p-4 font-mono text-sm overflow-x-auto">
                <pre className="whitespace-pre-wrap text-muted-foreground">{t(locale, "docs.mac.rules.formatting.examples.mail.code")}</pre>
              </div>
            </div>
            <div className="rounded-md bg-background p-4">
              <p className="text-sm font-semibold">{t(locale, "docs.mac.rules.formatting.examples.codeApp.title")}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t(locale, "docs.mac.rules.formatting.examples.codeApp.desc")}
              </p>
              <div className="mt-3 rounded-md bg-card p-4 font-mono text-sm overflow-x-auto">
                <pre className="whitespace-pre-wrap text-muted-foreground">{t(locale, "docs.mac.rules.formatting.examples.codeApp.code")}</pre>
              </div>
            </div>
            <div className="rounded-md bg-background p-4">
              <p className="text-sm font-semibold">{t(locale, "docs.mac.rules.formatting.examples.unknown.title")}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t(locale, "docs.mac.rules.formatting.examples.unknown.desc")}
              </p>
              <div className="mt-3 rounded-md bg-card p-4 font-mono text-sm overflow-x-auto">
                <pre className="whitespace-pre-wrap text-muted-foreground">{t(locale, "docs.mac.rules.formatting.examples.unknown.code")}</pre>
              </div>
            </div>
          </div>

          <h3 className="mt-6 text-sm font-semibold">{t(locale, "docs.mac.rules.formatting.limitations.title")}</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>&bull; {t(locale, "docs.mac.rules.formatting.limitations.item1")}</li>
            <li>&bull; {t(locale, "docs.mac.rules.formatting.limitations.item2")}</li>
            <li>&bull; {t(locale, "docs.mac.rules.formatting.limitations.item3")}</li>
            <li>&bull; {t(locale, "docs.mac.rules.formatting.limitations.item4")}</li>
            <li>&bull; {t(locale, "docs.mac.rules.formatting.limitations.item5")}</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">{t(locale, "docs.mac.rules.examples.title")}</h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-md bg-background p-4">
              <p className="text-sm font-semibold">{t(locale, "docs.mac.rules.examples.mail.title")}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t(locale, "docs.mac.rules.examples.mail.desc")}
              </p>
            </div>
            <div className="rounded-md bg-background p-4">
              <p className="text-sm font-semibold">{t(locale, "docs.mac.rules.examples.github.title")}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t(locale, "docs.mac.rules.examples.github.desc")}
              </p>
            </div>
            <div className="rounded-md bg-background p-4">
              <p className="text-sm font-semibold">{t(locale, "docs.mac.rules.examples.fallback.title")}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t(locale, "docs.mac.rules.examples.fallback.desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

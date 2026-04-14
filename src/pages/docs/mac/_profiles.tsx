import { Screenshot } from "@/components/ui/screenshot";
import { t, screenshotPath, localePath, type Locale } from "@/i18n/index";

export default function DocsMacProfiles({ locale = "en" }: { locale?: Locale }) {
  return (
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {t(locale, "docs.mac.profiles.title")}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {t(locale, "docs.mac.profiles.subtitle")}
        </p>

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.profiles.howWork.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.profiles.howWork.desc")}
            </p>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.profiles.matching.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.profiles.matching.desc1")}{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                com.apple.mail
              </code>
              {t(locale, "docs.mac.profiles.matching.desc2")}{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                github.com
              </code>
              {t(locale, "docs.mac.profiles.matching.desc3")}{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                github.com
              </code>{" "}
              {t(locale, "docs.mac.profiles.matching.desc4")}{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                gist.github.com
              </code>
              {t(locale, "docs.mac.profiles.matching.desc5")}
            </p>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.profiles.priority.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.profiles.priority.desc")}
            </p>
            <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground list-decimal list-inside">
              <li>{t(locale, "docs.mac.profiles.priority.item1")}</li>
              <li>{t(locale, "docs.mac.profiles.priority.item2")}</li>
              <li>{t(locale, "docs.mac.profiles.priority.item3")}</li>
            </ol>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.profiles.creating.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.profiles.creating.desc")}
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <li>
                &bull; <strong>{t(locale, "docs.mac.profiles.creating.language.label")}</strong> - {t(locale, "docs.mac.profiles.creating.language.desc")}
              </li>
              <li>
                &bull; <strong>{t(locale, "docs.mac.profiles.creating.task.label")}</strong> - {t(locale, "docs.mac.profiles.creating.task.desc")}
              </li>
              <li>
                &bull; <strong>{t(locale, "docs.mac.profiles.creating.engine.label")}</strong> - {t(locale, "docs.mac.profiles.creating.engine.desc")}
              </li>
              <li>
                &bull; <strong>{t(locale, "docs.mac.profiles.creating.whisperMode.label")}</strong> - {t(locale, "docs.mac.profiles.creating.whisperMode.desc")}
              </li>
              <li>
                &bull; <strong>{t(locale, "docs.mac.profiles.creating.hotkey.label")}</strong> - {t(locale, "docs.mac.profiles.creating.hotkey.desc")}
              </li>
              <li>
                &bull; <strong>{t(locale, "docs.mac.profiles.creating.prompt.label")}</strong> - {t(locale, "docs.mac.profiles.creating.prompt.desc")}
              </li>
              <li>
                &bull; <strong>{t(locale, "docs.mac.profiles.creating.promptProvider.label")}</strong> - {t(locale, "docs.mac.profiles.creating.promptProvider.desc")}
              </li>
            </ul>
            <Screenshot
              src={screenshotPath(locale, "/screenshots/mac/profiles.png")}
              alt={t(locale, "docs.mac.profiles.creating.imgAlt")}
              className="mt-4 rounded-xl"
            />
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.profiles.hotkeys.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.profiles.hotkeys.desc")}
            </p>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.profiles.promptOverride.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.profiles.promptOverride.desc")}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <a href={localePath(locale, "/docs/mac/prompts")} className="text-primary hover:underline">
                {t(locale, "docs.mac.profiles.promptOverride.learn")}
              </a>
            </p>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.profiles.multipleEngines.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.profiles.multipleEngines.desc")}
            </p>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.profiles.examples.title")}</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-md bg-background p-4">
                <p className="text-sm font-semibold">{t(locale, "docs.mac.profiles.examples.mail.title")}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t(locale, "docs.mac.profiles.examples.mail.desc")}
                </p>
              </div>
              <div className="rounded-md bg-background p-4">
                <p className="text-sm font-semibold">{t(locale, "docs.mac.profiles.examples.slack.title")}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t(locale, "docs.mac.profiles.examples.slack.desc")}
                </p>
              </div>
              <div className="rounded-md bg-background p-4">
                <p className="text-sm font-semibold">{t(locale, "docs.mac.profiles.examples.terminal.title")}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t(locale, "docs.mac.profiles.examples.terminal.desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

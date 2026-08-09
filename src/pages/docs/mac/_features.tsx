import { Screenshot } from "@/components/ui/screenshot";
import { t, screenshotPath, localePath, type Locale } from "@/i18n/index";

export default function DocsMacFeatures({ locale = "en" }: { locale?: Locale }) {
  return (
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {t(locale, "docs.mac.features.title")}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {t(locale, "docs.mac.features.subtitle")}
        </p>

        <div className="mt-8 space-y-6">
          {/* 1. System-Wide Dictation */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.features.dictation.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.dictation.desc")}
            </p>
          </div>

          {/* 2. Streaming Preview */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.features.streaming.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.streaming.desc")}
            </p>
          </div>

          {/* 3. AI Text Processing */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.features.ai.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.ai.desc1")}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.ai.desc2")}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <a href={localePath(locale, "/docs/mac/workflows")} className="text-primary hover:underline">
                {t(locale, "docs.mac.features.ai.learn")}
              </a>
            </p>
            <Screenshot
              src={screenshotPath(locale, "/screenshots/mac/workflows.png")}
              alt={t(locale, "docs.mac.features.ai.imgAlt")}
              className="mt-4 rounded-xl"
            />
          </div>

          {/* 4. Dictionary */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.features.dictionary.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.dictionary.desc")}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.dictionary.desc2")}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.dictionary.desc3")}
            </p>
            <div className="mt-4 rounded-xl border border-border/70 bg-background p-4">
              <h3 className="text-sm font-semibold">
                {t(locale, "docs.mac.features.dictionary.boostingTitle")}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(locale, "docs.mac.features.dictionary.boostingDesc")}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <code className="rounded bg-card px-1.5 py-0.5 text-xs font-mono">Auto</code>{" "}
                  {t(locale, "docs.mac.features.dictionary.boostingAuto")}
                </li>
                <li>
                  <code className="rounded bg-card px-1.5 py-0.5 text-xs font-mono">Strong (0.50)</code>{" "}
                  {t(locale, "docs.mac.features.dictionary.boostingStrong")}
                </li>
                <li>
                  <code className="rounded bg-card px-1.5 py-0.5 text-xs font-mono">Balanced (0.65)</code>{" "}
                  {t(locale, "docs.mac.features.dictionary.boostingBalanced")}
                </li>
                <li>
                  <code className="rounded bg-card px-1.5 py-0.5 text-xs font-mono">Precise (0.80)</code>{" "}
                  {t(locale, "docs.mac.features.dictionary.boostingPrecise")}
                </li>
                <li>
                  <code className="rounded bg-card px-1.5 py-0.5 text-xs font-mono">Advanced (0.40–0.95)</code>{" "}
                  {t(locale, "docs.mac.features.dictionary.boostingAdvanced")}
                </li>
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">
                {t(locale, "docs.mac.features.dictionary.boostingExample")}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(locale, "docs.mac.features.dictionary.boostingNote")}
              </p>
            </div>
            <h3 className="mt-4 text-sm font-semibold">
              {t(locale, "docs.mac.features.dictionary.autoLearnTitle")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.dictionary.autoLearnDesc")}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.dictionary.autoLearnFeedback")}
            </p>
            <h3 className="mt-4 text-sm font-semibold">
              {t(locale, "docs.mac.features.dictionary.autoLearnTestTitle")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.dictionary.autoLearnTest")}
            </p>
            <Screenshot
              src={screenshotPath(locale, "/screenshots/mac/dictionary.png")}
              alt={t(locale, "docs.mac.features.dictionary.imgAlt")}
              className="mt-4 rounded-xl"
            />
          </div>

          {/* 5. Snippets */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.features.snippets.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.snippets.descBefore")}{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                {"{{DATE}}"}
              </code>
              ,{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                {"{{TIME}}"}
              </code>
              , {t(locale, "docs.mac.features.snippets.descAnd")}{" "}
              <code className="text-xs bg-background px-1.5 py-0.5 rounded font-mono">
                {"{{CLIPBOARD}}"}
              </code>{" "}
              {t(locale, "docs.mac.features.snippets.descAfter")}
            </p>
            <Screenshot
              src={screenshotPath(locale, "/screenshots/mac/snippets.png")}
              alt={t(locale, "docs.mac.features.snippets.imgAlt")}
              className="mt-4 rounded-xl"
            />
          </div>

          {/* 6. File Transcription */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.features.fileTranscription.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.fileTranscription.desc")}
            </p>
            <Screenshot
              src={screenshotPath(locale, "/screenshots/mac/watch-folder.png")}
              alt={t(locale, "docs.mac.fileTranscription.imgAlt")}
              className="mt-4 rounded-xl"
            />
          </div>

          {/* 7. Whisper Mode */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.features.whisperMode.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.whisperMode.desc")}
            </p>
          </div>

          {/* 8. Translation */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.features.translation.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.translation.desc")}
            </p>
          </div>

          {/* 9. Transcription History */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.features.history.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.history.desc1")}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.history.desc2")}
            </p>
            <Screenshot
              src={screenshotPath(locale, "/screenshots/mac/history.png")}
              alt={t(locale, "docs.mac.features.history.imgAlt")}
              className="mt-4 rounded-xl"
            />
          </div>

          {/* 10. Home Dashboard */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.features.home.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.home.desc")}
            </p>
            <Screenshot
              src={screenshotPath(locale, "/screenshots/mac/home-dashboard.png")}
              alt={t(locale, "docs.mac.features.home.imgAlt")}
              className="mt-4 rounded-xl"
            />
          </div>

          {/* 11. Plugin System */}
          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">{t(locale, "docs.mac.features.plugins.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.plugins.desc")}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(locale, "docs.mac.features.plugins.seeBefore")}{" "}
              <a
                href={localePath(locale, "/addons")}
                className="text-primary hover:underline"
              >
                {t(locale, "docs.mac.features.plugins.addonsLink")}
              </a>{" "}
              {t(locale, "docs.mac.features.plugins.seeAfter")}
            </p>
            <Screenshot
              src={screenshotPath(locale, "/screenshots/mac/plugins.png")}
              alt={t(locale, "docs.mac.features.plugins.imgAlt")}
              className="mt-4 rounded-xl"
            />
          </div>
        </div>
      </div>
  );
}

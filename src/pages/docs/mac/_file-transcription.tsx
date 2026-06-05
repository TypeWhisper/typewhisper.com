import { Screenshot } from "@/components/ui/screenshot";
import { screenshotPath, t, type Locale } from "@/i18n/index";

export default function DocsMacFileTranscription({ locale = "en" }: { locale?: Locale }) {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">
        {t(locale, "docs.mac.fileTranscription.title")}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {t(locale, "docs.mac.fileTranscription.subtitle")}
      </p>

      <div className="mt-8 space-y-6">
        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {t(locale, "docs.mac.fileTranscription.manual.title")}
          </h2>
          <div className="mt-3 space-y-3 text-sm text-muted-foreground">
            <p>{t(locale, "docs.mac.fileTranscription.manual.desc1")}</p>
            <p>{t(locale, "docs.mac.fileTranscription.manual.desc2")}</p>
          </div>
          <Screenshot
            src={screenshotPath(locale, "/screenshots/mac/watch-folder.png")}
            alt={t(locale, "docs.mac.fileTranscription.imgAlt")}
            className="mt-4 rounded-xl"
          />
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {t(locale, "docs.mac.fileTranscription.watchFolder.title")}
          </h2>
          <div className="mt-3 space-y-3 text-sm text-muted-foreground">
            <p>{t(locale, "docs.mac.fileTranscription.watchFolder.desc1")}</p>
            <p>{t(locale, "docs.mac.fileTranscription.watchFolder.desc2")}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {t(locale, "docs.mac.fileTranscription.output.title")}
          </h2>
          <div className="mt-3 space-y-3 text-sm text-muted-foreground">
            <p>{t(locale, "docs.mac.fileTranscription.output.desc1")}</p>
            <p>{t(locale, "docs.mac.fileTranscription.output.desc2")}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {t(locale, "docs.mac.fileTranscription.deleteSource.title")}
          </h2>
          <div className="mt-3 space-y-3 text-sm text-muted-foreground">
            <p>{t(locale, "docs.mac.fileTranscription.deleteSource.desc1")}</p>
            <p>{t(locale, "docs.mac.fileTranscription.deleteSource.desc2")}</p>
            <p>{t(locale, "docs.mac.fileTranscription.deleteSource.desc3")}</p>
          </div>
          <div className="mt-4 rounded-md border border-amber-500/20 bg-amber-500/5 p-3">
            <p className="text-sm text-muted-foreground">
              {t(locale, "docs.mac.fileTranscription.deleteSource.warning")}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-card p-6">
          <h2 className="text-lg font-semibold">
            {t(locale, "docs.mac.fileTranscription.setup.title")}
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>{t(locale, "docs.mac.fileTranscription.setup.step1")}</li>
            <li>{t(locale, "docs.mac.fileTranscription.setup.step2")}</li>
            <li>{t(locale, "docs.mac.fileTranscription.setup.step3")}</li>
            <li>{t(locale, "docs.mac.fileTranscription.setup.step4")}</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

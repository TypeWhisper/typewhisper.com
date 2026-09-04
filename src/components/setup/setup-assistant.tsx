import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  isLandingPlatform,
  selectLandingPlatform,
  useSyncedLandingPlatform,
} from "@/hooks/use-landing-platform";
import { getPlatformDownloadTarget } from "@/lib/platform-download";
import { t, type Locale } from "@/i18n/index";

type Task = "dictation" | "files" | "workflows";
export function SetupAssistant({ locale }: { locale: Locale }) {
  const platform = useSyncedLandingPlatform();
  const [processing, setProcessing] = useState<"local" | "cloud">("local");
  const [task, setTask] = useState<Task>("dictation");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const restore = () => {
      const params = new URLSearchParams(location.search);
      setProcessing(params.get("processing") === "cloud" ? "cloud" : "local");
      const value = params.get("task");
      setTask(value === "files" || value === "workflows" ? value : "dictation");
      setReady(true);
    };
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  useEffect(() => {
    if (!ready) return;
    const url = new URL(location.href);
    url.searchParams.set("platform", platform);
    url.searchParams.set("processing", processing);
    url.searchParams.set("task", task);
    history.replaceState(history.state, "", url);
  }, [platform, processing, task, ready]);
  const download = getPlatformDownloadTarget(platform, locale, "landing");
  const docs = `/${locale}/docs/${platform}`;
  const guide =
    platform === "ios"
      ? `${docs}/${task === "files" ? "files-history-and-inbox" : task === "workflows" ? "profiles-and-processing" : "dictation-and-keyboard"}`
      : `${docs}/${task === "files" ? "file-transcription" : task === "workflows" ? "workflows" : "features"}`;
  const engines =
    processing === "cloud" && platform !== "ios"
      ? `/${locale}/addons/?platform=${platform}&category=transcription`
      : `${docs}/${platform === "ios" ? "profiles-and-processing" : "features"}`;
  return (
    <div className="mt-8" data-testid="setup-assistant">
      <div className="grid gap-5 sm:grid-cols-3">
        <label className="grid gap-2 text-sm font-medium">
          {t(locale, "setup.platform")}
          <select
            value={platform}
            onChange={(e) => {
              if (isLandingPlatform(e.target.value))
                selectLandingPlatform(e.target.value);
            }}
            className="rounded-xl border bg-card px-3 py-3"
          >
            <option value="mac">macOS</option>
            <option value="windows">Windows</option>
            <option value="ios">iOS</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          {t(locale, "setup.processing")}
          <select
            value={processing}
            onChange={(e) => setProcessing(e.target.value as "local" | "cloud")}
            className="rounded-xl border bg-card px-3 py-3"
          >
            <option value="local">{t(locale, "setup.local")}</option>
            <option value="cloud">{t(locale, "setup.cloud")}</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          {t(locale, "setup.task")}
          <select
            value={task}
            onChange={(e) => setTask(e.target.value as Task)}
            className="rounded-xl border bg-card px-3 py-3"
          >
            {(["dictation", "files", "workflows"] as const).map((value) => (
              <option key={value} value={value}>
                {t(locale, `setup.${value}`)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div
        className="mt-8 rounded-2xl border bg-card p-6 sm:p-8"
        aria-live="polite"
      >
        <h2 className="text-2xl font-semibold">{t(locale, "setup.result")}</h2>
        <p className="mt-3 text-muted-foreground">
          {t(locale, `setup.${processing}Note`)}
        </p>
        <ol className="mt-6 list-decimal space-y-5 pl-5">
          <li>
            <a
              href={`${docs}/installation`}
              className="font-medium text-primary underline"
            >
              {t(locale, "setup.install")}
            </a>
            <p className="mt-1 text-sm text-muted-foreground">
              {t(locale, "setup.installHint")}
            </p>
          </li>
          <li>
            <a href={engines} className="font-medium text-primary underline">
              {t(
                locale,
                processing === "local"
                  ? "setup.localEngine"
                  : "setup.cloudEngine",
              )}
            </a>
          </li>
          <li>
            <a href={guide} className="font-medium text-primary underline">
              {t(locale, `setup.first.${task}`)}
            </a>
            <p className="mt-1 text-sm text-muted-foreground">
              {t(locale, "setup.testHint")}
            </p>
          </li>
        </ol>
        {download.available && (
          <Button asChild className="mt-8" size="pill">
            <a
              href={download.href}
              target={download.opensNewTab ? "_blank" : undefined}
              rel="noopener noreferrer"
              data-download-social-trigger
              data-download-platform={download.platform}
              data-download-target={download.target}
              data-tracking-placement="setup"
            >
              {download.label}
            </a>
          </Button>
        )}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        {t(locale, "setup.share")}
      </p>
    </div>
  );
}

import { replacePageUrl } from "@/hooks/use-page-url";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { WaveRule } from "@/components/site";
import {
  isLandingPlatform,
  selectLandingPlatform,
  useSyncedLandingPlatform,
} from "@/hooks/use-landing-platform";
import { getPlatformDownloadTarget } from "@/lib/platform-download";
import { t, type Locale } from "@/i18n/index";

type Task = "dictation" | "files" | "workflows";

function Field({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="utility-field">
      <span className="utility-field__label">{label}</span>
      <span className="utility-field__control">
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {children}
        </select>
        <ChevronDown className="size-4" aria-hidden="true" />
      </span>
    </label>
  );
}

function Step({
  href,
  title,
  hint,
}: {
  href: string;
  title: string;
  hint?: string;
}) {
  return (
    <li className="site-steps__item">
      <div>
        <a href={href} className="utility-step">
          <span className="site-heading">{title}</span>
          <ArrowRight className="size-5" aria-hidden="true" />
        </a>
        {hint && <p className="site-text utility-step__hint">{hint}</p>}
      </div>
    </li>
  );
}

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
    replacePageUrl(url);
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
    <div className="utility-setup" data-testid="setup-assistant">
      <div
        className="utility-setup__choices"
        role="group"
        aria-label={t(locale, "setup.choices")}
      >
        <Field
          label={t(locale, "setup.platform")}
          value={platform}
          onChange={(value) => {
            if (isLandingPlatform(value)) selectLandingPlatform(value);
          }}
        >
          <option value="mac">macOS</option>
          <option value="windows">Windows</option>
          <option value="ios">iOS</option>
        </Field>
        <Field
          label={t(locale, "setup.processing")}
          value={processing}
          onChange={(value) => setProcessing(value as "local" | "cloud")}
        >
          <option value="local">{t(locale, "setup.local")}</option>
          <option value="cloud">{t(locale, "setup.cloud")}</option>
        </Field>
        <Field
          label={t(locale, "setup.task")}
          value={task}
          onChange={(value) => setTask(value as Task)}
        >
          {(["dictation", "files", "workflows"] as const).map((value) => (
            <option key={value} value={value}>
              {t(locale, `setup.${value}`)}
            </option>
          ))}
        </Field>
      </div>

      <WaveRule label={t(locale, "setup.stepsLabel")} seed={17} />

      <div className="site-split utility-setup__result" aria-live="polite">
        <div className="site-split__head">
          <h2 className="site-title site-title--start">
            {t(locale, "setup.result")}
          </h2>
          <p className="site-lede site-lede--start">
            {t(locale, `setup.${processing}Note`)}
          </p>
          {download.available && (
            <div className="site-actions site-actions--start">
              <a
                href={download.href}
                target={download.opensNewTab ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="site-button"
                data-download-social-trigger
                data-download-platform={download.platform}
                data-download-target={download.target}
                data-tracking-placement="setup"
              >
                {download.label}
              </a>
            </div>
          )}
        </div>
        <ol className="site-steps">
          <Step
            href={`${docs}/installation`}
            title={t(locale, "setup.install")}
            hint={t(locale, "setup.installHint")}
          />
          <Step
            href={engines}
            title={t(
              locale,
              processing === "local"
                ? "setup.localEngine"
                : "setup.cloudEngine",
            )}
          />
          <Step
            href={guide}
            title={t(locale, `setup.first.${task}`)}
            hint={t(locale, "setup.testHint")}
          />
        </ol>
      </div>
      <p className="site-footnote">{t(locale, "setup.share")}</p>
    </div>
  );
}

import { ChevronDown, Clock3, Download, Monitor } from "lucide-react";
import { getPlatformDownloadTarget } from "@/lib/platform-download";
import { t, type Locale } from "@/i18n/index";

export function PlatformDownloadMenu({
  locale = "en",
  label,
}: {
  locale?: Locale;
  label?: string;
}) {
  const resolvedLabel = label ?? t(locale, "platformMenu.label");
  const macDownload = getPlatformDownloadTarget("mac", locale, "landing");
  const windowsDownload = getPlatformDownloadTarget("windows", locale, "landing");

  if (!macDownload.available || !windowsDownload.available) return null;

  return (
    <details className="group relative w-full sm:w-auto">
      <summary className="flex h-12 w-full cursor-pointer list-none items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent sm:w-auto [&::-webkit-details-marker]:hidden">
        {resolvedLabel}
        <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
      </summary>

      <div className="absolute left-0 top-[calc(100%+0.5rem)] z-20 w-full min-w-[260px] overflow-hidden rounded-xl border bg-popover p-2 text-left shadow-xl sm:w-[280px]">
        <a
          href={macDownload.href}
          target={macDownload.opensNewTab ? "_blank" : undefined}
          rel={macDownload.opensNewTab ? "noopener noreferrer" : undefined}
          data-download-social-trigger
          data-download-platform={macDownload.platform}
          data-download-target={macDownload.target}
          data-download-version={macDownload.version}
          data-tracking-placement="platform_menu"
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-popover-foreground transition-colors hover:bg-accent"
        >
          <Download className="size-4" />
          {t(locale, "platformMenu.mac")}
        </a>
        <a
          href={windowsDownload.href}
          target={windowsDownload.opensNewTab ? "_blank" : undefined}
          rel={windowsDownload.opensNewTab ? "noopener noreferrer" : undefined}
          data-download-social-trigger
          data-download-platform={windowsDownload.platform}
          data-download-target={windowsDownload.target}
          data-tracking-placement="platform_menu"
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-popover-foreground transition-colors hover:bg-accent"
        >
          <Monitor className="size-4" />
          {t(locale, "platformMenu.win")}
        </a>
        <span
          aria-disabled="true"
          className="flex cursor-not-allowed items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground"
        >
          <Clock3 className="size-4" />
          {t(locale, "platformMenu.ios")}
        </span>
      </div>
    </details>
  );
}

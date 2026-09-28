import { ArrowRight } from "lucide-react";
import { useSyncedLandingPlatform } from "@/hooks/use-landing-platform";
import { getPlatformDownloadTarget } from "@/lib/platform-download";
import { localePath, t, type Locale } from "@/i18n/index";

interface FreeDownloadProps {
  locale: Locale;
  /** `site-button`, `site-button site-button--quiet`, or `site-link`. */
  className?: string;
  testId?: string;
  /** Text links carry the arrow of `site-link`. */
  arrow?: boolean;
}

/** Download of the free app for the platform the visitor chose; hydrated. */
export function FreeDownload({
  locale,
  className = "site-button",
  testId,
  arrow = false,
}: FreeDownloadProps) {
  const download = getPlatformDownloadTarget(
    useSyncedLandingPlatform(),
    locale,
    "landing",
  );
  const label = t(locale, "pricing.decision.action.personal");

  if (!download.available) {
    return (
      <a href={localePath(locale, "/")} className={className}>
        {label}
        {arrow && <ArrowRight className="size-4" aria-hidden="true" />}
      </a>
    );
  }

  return (
    <a
      href={download.href}
      target={download.opensNewTab ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={className}
      data-download-social-trigger
      data-download-platform={download.platform}
      data-download-target={download.target}
      data-tracking-placement="pricing"
      data-testid={testId}
    >
      {label}
      {arrow && <ArrowRight className="size-4" aria-hidden="true" />}
    </a>
  );
}

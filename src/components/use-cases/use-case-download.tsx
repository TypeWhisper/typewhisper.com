import { macDmgUrl } from "@/lib/platform-download";
import { t, type Locale } from "@/i18n/index";

/** The download action of the use-case pages, with its tracking attributes. */
export function UseCaseDownload({ locale = "en" }: { locale?: Locale }) {
  return (
    <a
      href={macDmgUrl}
      data-download-social-trigger
      data-download-platform="mac"
      data-download-target="mac_dmg"
      data-tracking-placement="use_case"
      className="site-button"
    >
      {t(locale, "useCases.cta.download")}
    </a>
  );
}

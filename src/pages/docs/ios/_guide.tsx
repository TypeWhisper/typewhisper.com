import { DocsGuidePage } from "@/components/docs/guide-page";
import { getIosDocPage, type IosDocSlug } from "@/data/ios-docs";
import type { Locale } from "@/i18n/index";

export default function DocsIOSGuide({
  locale = "en",
  slug,
}: {
  locale?: Locale;
  slug: IosDocSlug;
}) {
  return <DocsGuidePage locale={locale} page={getIosDocPage(locale, slug)} />;
}

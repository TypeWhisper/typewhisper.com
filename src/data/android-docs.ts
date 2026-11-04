import type { Locale } from "@/i18n/index";
import type { IosDocPage } from "@/data/ios-docs";
import * as installation from "./android-docs/installation";
import * as dictationAndKeyboard from "./android-docs/dictation-and-keyboard";
import * as dictationBubble from "./android-docs/dictation-bubble";
import * as enginesAndModels from "./android-docs/engines-and-models";
import * as profilesAndWriting from "./android-docs/profiles-and-writing";
import * as quickDictationAndInbox from "./android-docs/quick-dictation-and-inbox";
import * as filesAndHistory from "./android-docs/files-and-history";
import * as dictionaryAndSnippets from "./android-docs/dictionary-and-snippets";
import * as privacyAndPremium from "./android-docs/privacy-and-premium";
import * as troubleshooting from "./android-docs/troubleshooting";

/**
 * The Android guide. Each page lives in its own file under ./android-docs/
 * with an English and a German version; the order here is the reading order.
 * Pages share the structure of the iOS guide.
 */
const modules = {
  installation,
  "dictation-and-keyboard": dictationAndKeyboard,
  "dictation-bubble": dictationBubble,
  "engines-and-models": enginesAndModels,
  "profiles-and-writing": profilesAndWriting,
  "quick-dictation-and-inbox": quickDictationAndInbox,
  "files-and-history": filesAndHistory,
  "dictionary-and-snippets": dictionaryAndSnippets,
  "privacy-and-premium": privacyAndPremium,
  troubleshooting,
} satisfies Record<string, Record<Locale, IosDocPage>>;

export type AndroidDocSlug = keyof typeof modules;

export const androidDocSlugs = Object.keys(modules) as AndroidDocSlug[];

export function getAndroidDocPage(
  locale: Locale,
  slug: AndroidDocSlug,
): IosDocPage {
  return modules[slug][locale];
}

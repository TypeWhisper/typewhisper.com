import { localePath, t, type Locale } from "@/i18n/index";

export type DocsPlatform = "mac" | "windows" | "ios";

export interface DocsNavLink {
  href: string;
  label: string;
}

export const docsPlatforms: DocsPlatform[] = ["mac", "windows", "ios"];

/** Pages of a platform in reading order: [path below the platform, label key]. */
const pages: Record<DocsPlatform, Array<[path: string, labelKey: string]>> = {
  mac: [
    ["", "docs.sidebar.overview"],
    ["/installation", "docs.sidebar.installation"],
    ["/features", "docs.sidebar.features"],
    ["/file-transcription", "docs.sidebar.fileTranscription"],
    ["/workflows", "docs.sidebar.workflows"],
    ["/api", "docs.sidebar.httpApi"],
    ["/cli", "docs.sidebar.cliTool"],
    ["/troubleshooting", "docs.sidebar.troubleshooting"],
  ],
  windows: [
    ["", "docs.sidebar.overview"],
    ["/installation", "docs.sidebar.installation"],
    ["/features", "docs.sidebar.features"],
    ["/file-transcription", "docs.sidebar.fileTranscription"],
    ["/workflows", "docs.sidebar.workflows"],
    ["/api", "docs.sidebar.httpApi"],
    ["/cli", "docs.sidebar.cliTool"],
    ["/troubleshooting", "docs.sidebar.troubleshooting"],
  ],
  ios: [
    ["", "docs.sidebar.overview"],
    ["/installation", "docs.sidebar.installation"],
    ["/dictation-and-keyboard", "docs.sidebar.dictationKeyboard"],
    ["/profiles-and-processing", "docs.sidebar.profilesProcessing"],
    ["/files-history-and-inbox", "docs.sidebar.filesHistoryInbox"],
    ["/dictionary-and-snippets", "docs.sidebar.dictionarySnippets"],
    ["/watch-and-shortcuts", "docs.sidebar.watchShortcuts"],
    ["/privacy-and-premium", "docs.sidebar.privacyPremium"],
    ["/troubleshooting", "docs.sidebar.troubleshooting"],
  ],
};

const platformTitleKeys: Record<DocsPlatform, string> = {
  mac: "docs.mac.title",
  windows: "docs.win.title",
  ios: "docs.ios.title",
};

export function docsPlatformTitle(locale: Locale, platform: DocsPlatform) {
  return t(locale, platformTitleKeys[platform]);
}

export function docsPlatformPath(locale: Locale, platform: DocsPlatform) {
  return localePath(locale, `/docs/${platform}`);
}

/** Navigation of a platform, which is also the reading order of its pages. */
export function getDocsNav(
  locale: Locale,
  platform: DocsPlatform,
): DocsNavLink[] {
  return pages[platform].map(([path, labelKey]) => ({
    href: localePath(locale, `/docs/${platform}${path}`),
    label: t(locale, labelKey),
  }));
}

export const normalizeDocsPath = (path: string) =>
  path.replace(/\/$/, "") || "/";

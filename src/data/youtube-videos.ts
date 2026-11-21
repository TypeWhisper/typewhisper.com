import type { Locale } from "@/i18n/index";

/** A studio video's upload on the TypeWhisper YouTube channel. */
export interface YoutubeVideo {
  /** YouTube video ID. */
  id: string;
}

/**
 * The YouTube uploads of the studio videos in `public/videos/`, keyed by the
 * `slug` of `StudioVideo` and the page language. A listed video plays from
 * YouTube, so its views count there; the YouTube player loads only after a
 * click on play. List a video only once it is public on YouTube: a scheduled
 * or private upload shows "Video unavailable" in the player.
 */
export const youtubeVideos: Record<string, Partial<Record<Locale, YoutubeVideo>>> = {
  "ios-record-in-keyboard": {
    en: { id: "mjVX8kwjNWA" },
    de: { id: "oty3LuAxOuo" },
  },
  "ios-keyboard-tour": {
    en: { id: "vcQg_UooAXM" },
    de: { id: "jtz06QRlu08" },
  },
  "mac-email-reply-workflow": {
    en: { id: "u-v3FrgiFQU" },
    de: { id: "X8kpSPzWlM0" },
  },
  "ios-compare-local-models": {
    en: { id: "kvEXlkoWuCw" },
    de: { id: "gl4XlY8Q0K8" },
  },
  "mac-translate-selection": {
    en: { id: "yne1dhjyxnk" },
    de: { id: "GH42MUwdnu0" },
  },
  "mac-ios-release": {
    en: { id: "MhctZnluuJk" },
    de: { id: "gpe6U_rYQYM" },
  },
};

export function getYoutubeVideo(slug: string, locale: Locale): YoutubeVideo | undefined {
  return youtubeVideos[slug]?.[locale];
}

import type { Locale } from "@/i18n/index";

/** A studio video's upload on the TypeWhisper YouTube channel. */
export interface YoutubeVideo {
  /** YouTube video ID. */
  id: string;
  /**
   * When the video is public on YouTube, ISO 8601. Until then the site plays
   * its own file, so a scheduled upload can be listed ahead of time.
   */
  publicFrom: string;
}

/**
 * The YouTube uploads of the studio videos in `public/videos/`, keyed by the
 * `slug` of `StudioVideo` and the page language. A listed video plays from
 * YouTube once it is public, so its views count there; the YouTube player
 * loads only after a click on play.
 */
export const youtubeVideos: Record<string, Partial<Record<Locale, YoutubeVideo>>> = {
  "ios-keyboard-tour": {
    en: { id: "vcQg_UooAXM", publicFrom: "2026-11-10T12:00:00+01:00" },
    de: { id: "invORvr1_HU", publicFrom: "2026-11-11T16:00:00+01:00" },
  },
  "mac-email-reply-workflow": {
    en: { id: "u-v3FrgiFQU", publicFrom: "2026-11-04T00:00:00+01:00" },
    de: { id: "X8kpSPzWlM0", publicFrom: "2026-11-04T00:00:00+01:00" },
  },
  "ios-compare-local-models": {
    en: { id: "fzhRAIOxGZk", publicFrom: "2026-11-17T16:00:00+01:00" },
    de: { id: "zn3MY4EMeAE", publicFrom: "2026-11-17T16:00:00+01:00" },
  },
  "mac-translate-selection": {
    en: { id: "yne1dhjyxnk", publicFrom: "2026-11-03T00:00:00+01:00" },
    de: { id: "GH42MUwdnu0", publicFrom: "2026-11-03T00:00:00+01:00" },
  },
  "mac-ios-release": {
    en: { id: "MhctZnluuJk", publicFrom: "2026-10-26T00:00:00+01:00" },
    de: { id: "gpe6U_rYQYM", publicFrom: "2026-10-26T00:00:00+01:00" },
  },
};

export function getYoutubeVideo(slug: string, locale: Locale): YoutubeVideo | undefined {
  return youtubeVideos[slug]?.[locale];
}

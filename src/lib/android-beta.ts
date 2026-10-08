/**
 * Links of the Android closed beta on Google Play. Testers join the group
 * first; Play only lets group members opt in.
 */
export const androidBeta = {
  googleGroupUrl: "https://groups.google.com/g/typewhisper-android-beta",
  playOptInUrl: "https://play.google.com/apps/testing/com.typewhisper.android",
  feedbackEmail: "hello@typewhisper.com",
  /**
   * Whether the footer and the release status link the beta page and the page offers the Play
   * opt-in. The closed test is published on Google Play since 2026-10-08.
   */
  listed: true,
} as const;

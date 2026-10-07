/**
 * Links of the Android closed beta on Google Play. Testers join the group
 * first; Play only lets group members opt in.
 */
export const androidBeta = {
  googleGroupUrl: "https://groups.google.com/g/typewhisper-android-beta",
  playOptInUrl: "https://play.google.com/apps/testing/com.typewhisper.android",
  feedbackEmail: "hello@typewhisper.com",
  /**
   * Whether the footer and the release status link the beta page. Stays false until the closed
   * test is published on Google Play; before that the opt-in link leads nowhere.
   */
  listed: false,
} as const;

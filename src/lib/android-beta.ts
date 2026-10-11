/**
 * Links of the Android beta on Google Play. It is an open test: anyone with a Google account
 * opts in on the testing page and installs the app from its Play listing.
 */
export const androidBeta = {
  playOptInUrl: "https://play.google.com/apps/testing/com.typewhisper.android",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.typewhisper.android",
  feedbackEmail: "hello@typewhisper.com",
  /**
   * Whether the footer and the release status link the beta page and search engines may index it.
   * The beta is published on Google Play since 2026-10-08.
   */
  listed: true,
} as const;

import type { LandingPlatform } from "@/hooks/use-landing-platform";

export type FeatureScreenshotKey =
  "private" | "dictation" | "prompts" | "profiles" | "transcription";

const macFeatureScreenshots: Record<FeatureScreenshotKey, string> = {
  private: "/screenshots/mac/home.png",
  dictation: "/screenshots/mac/recording.png",
  prompts: "/screenshots/mac/workflows.png",
  profiles: "/screenshots/mac/integrations-available.png",
  transcription: "/screenshots/mac/file-transcription.png",
};

export const featureScreenshotsByPlatform: Record<
  LandingPlatform,
  Record<FeatureScreenshotKey, string>
> = {
  mac: macFeatureScreenshots,
  windows: {
    private: "/screenshots/windows/dashboard.png",
    dictation: "/screenshots/windows/dictation.png",
    prompts: "/screenshots/windows/workflows.png",
    profiles: "/screenshots/windows/integrations-installed.png",
    transcription: "/screenshots/windows/file-transcription.png",
  },
  ios: {
    private: "/screenshots/ios/01-recording.png",
    dictation: "/screenshots/ios/03-keyboard.png",
    prompts: "/screenshots/ios/02-smart-edit.png",
    profiles: "/screenshots/ios/05-profiles.png",
    transcription: "/screenshots/ios/04-history.png",
  },
};

/** Windows and iOS show one capture beside both Premium features. */
export const premiumScreenshotByPlatform: Record<
  Exclude<LandingPlatform, "mac">,
  string
> = {
  windows: "/screenshots/windows/premium-active.png",
  ios: "/screenshots/ios/06-dictionary.png",
};

export type PremiumFeatureKey = "sync" | "dictionary";

/** macOS shows the detail window of each Premium feature beside its text. */
export const macPremiumScreenshots: Record<PremiumFeatureKey, string> = {
  sync: "/screenshots/mac/premium-sync.png",
  dictionary: "/screenshots/mac/premium-learning.png",
};

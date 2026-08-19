import type { LandingPlatform } from "@/hooks/use-landing-platform";

export type FeatureScreenshotKey =
  "private" | "dictation" | "prompts" | "profiles" | "transcription";

const macFeatureScreenshots: Record<FeatureScreenshotKey, string> = {
  private: "/screenshots/mac/home.png",
  dictation: "/screenshots/mac/recording.png",
  prompts: "/screenshots/mac/workflows.png",
  profiles: "/screenshots/mac/plugins.png",
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

export const heroScreenshotByPlatform: Record<LandingPlatform, string> = {
  mac: "/screenshots/mac/home.png",
  windows: "/screenshots/windows/dashboard.png",
  ios: "/screenshots/ios/01-recording.png",
};

export const premiumScreenshotByPlatform: Record<LandingPlatform, string> = {
  mac: "/screenshots/mac/premium.png",
  windows: "/screenshots/windows/premium-active.png",
  ios: "/screenshots/ios/06-dictionary.png",
};

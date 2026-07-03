import { useEffect, useState } from "react";
import { usePlatform } from "@/hooks/use-platform";
import type { Platform } from "@/lib/platform-download";

export type LandingPlatform = "mac" | "windows" | "ios";

const landingPlatformEvent = "typewhisper:landing-platform";

function isLandingPlatform(platform: unknown): platform is LandingPlatform {
  return platform === "mac" || platform === "windows" || platform === "ios";
}

function publishLandingPlatform(platform: LandingPlatform) {
  if (typeof window === "undefined") return;

  document.documentElement.dataset.landingPlatform = platform;
  window.dispatchEvent(
    new CustomEvent<LandingPlatform>(landingPlatformEvent, {
      detail: platform,
    }),
  );
}

function getDocumentLandingPlatform(): LandingPlatform | null {
  if (typeof document === "undefined") return null;

  const platform = document.documentElement.dataset.landingPlatform;
  return isLandingPlatform(platform) ? platform : null;
}

export function useLandingPlatformSelection() {
  const detectedPlatform = usePlatform();
  const [selectedPlatform, setSelectedPlatform] =
    useState<LandingPlatform>("mac");
  const [hasUserSelectedPlatform, setHasUserSelectedPlatform] = useState(false);

  useEffect(() => {
    if (!hasUserSelectedPlatform && isLandingPlatform(detectedPlatform)) {
      setSelectedPlatform(detectedPlatform);
    }
  }, [detectedPlatform, hasUserSelectedPlatform]);

  useEffect(() => {
    publishLandingPlatform(selectedPlatform);
  }, [selectedPlatform]);

  function selectPlatform(platform: LandingPlatform) {
    setHasUserSelectedPlatform(true);
    setSelectedPlatform(platform);
  }

  const detectedHintPlatform: LandingPlatform | null =
    selectedPlatform === "mac" &&
    (detectedPlatform === "windows" || detectedPlatform === "ios")
      ? detectedPlatform
      : null;

  return {
    detectedHintPlatform,
    selectedPlatform,
    selectPlatform,
  };
}

export function useSyncedLandingPlatform() {
  const detectedPlatform = usePlatform();
  const [platform, setPlatform] = useState<LandingPlatform>("mac");

  useEffect(() => {
    const documentPlatform = getDocumentLandingPlatform();
    if (documentPlatform) {
      setPlatform(documentPlatform);
      return;
    }

    if (isLandingPlatform(detectedPlatform as Platform)) {
      setPlatform(detectedPlatform as LandingPlatform);
    }
  }, [detectedPlatform]);

  useEffect(() => {
    const handlePlatformChange = (event: Event) => {
      const nextPlatform = (event as CustomEvent<LandingPlatform>).detail;
      if (isLandingPlatform(nextPlatform)) {
        setPlatform(nextPlatform);
      }
    };

    window.addEventListener(landingPlatformEvent, handlePlatformChange);
    return () => {
      window.removeEventListener(landingPlatformEvent, handlePlatformChange);
    };
  }, []);

  return platform;
}

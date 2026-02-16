import { useEffect, useState } from "react";
import { detectPlatform, type Platform } from "@/lib/platform-download";

export function usePlatform() {
  const [platform, setPlatform] = useState<Platform>("other");

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  return platform;
}

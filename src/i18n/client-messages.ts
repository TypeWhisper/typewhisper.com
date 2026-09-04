import en from "./locales/en/index";
import de from "./locales/de/index";
import type { Locale } from "./index";

/** Only serialize messages needed by this page's interactive islands. */
export function getClientMessages(
  locale: Locale,
  pathname: string,
): Record<string, string> {
  const route = pathname.replace(/^\/(en|de)/, "").replace(/\/$/, "") || "/";
  const prefixes = new Set([
    "nav",
    "platforms",
    "platformMenu",
    "downloadCta",
    "madeInGermany",
    "releaseStage",
  ]);
  if (route === "/")
    for (const key of [
      "hero",
      "heroDemo",
      "voicePipeline",
      "features",
      "premiumFeatures",
      "howItWorks",
      "engineComparison",
      "addons",
      "setup",
    ])
      prefixes.add(key);
  if (route.startsWith("/pricing"))
    for (const key of ["pricing", "supporter"]) prefixes.add(key);
  if (route.startsWith("/addons")) prefixes.add("addons");
  if (route.startsWith("/docs"))
    for (const key of ["docs", "setup"]) prefixes.add(key);
  if (route.startsWith("/setup")) prefixes.add("setup");
  if (route.startsWith("/use-cases")) prefixes.add("useCases");
  if (route.startsWith("/benchmark")) prefixes.add("benchmark");
  if (route.startsWith("/changelog")) prefixes.add("changelog");
  const messages = locale === "de" ? { ...en, ...de } : en;
  return Object.fromEntries(
    Object.entries(messages).filter(
      ([key]) =>
        prefixes.has(key.split(".")[0]) ||
        key.startsWith("docs.copy") ||
        key === "docs.copied",
    ),
  );
}

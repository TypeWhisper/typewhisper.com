import en from "./locales/en/index";
import de from "./locales/de/index";
import { resolveVersions } from "../data/versions";
import type { Locale } from "./index";

/** The header island and the download target it resolves, on every page. */
const everywhere = ["nav", "platforms"];
const codeBlock = ["docs.copyCommand", "docs.copyFailed", "docs.copied"];

/**
 * Key prefixes that the hydrated islands of a route read, including the
 * modules they import. A static page needs none: its text is already HTML.
 * An island that reads a key missing here shows the raw key after hydration;
 * tests/client-messages.spec.ts looks for that.
 */
function routePrefixes(route: string): string[] {
  if (route === "/")
    return [
      "hero",
      "madeInGermany",
      "howItWorks",
      "features",
      "engineComparison",
      "premiumFeatures",
      "downloadCta",
    ];
  if (route === "/pricing")
    return [
      "pricing.tiers",
      "pricing.billingPeriod",
      "pricing.commercial.monthlyHeading",
      "pricing.commercial.lifetimeHeading",
      "pricing.decision.action.personal",
    ];
  if (route === "/addons") return ["addons"];
  // Community add-ons load their readme; the developer guide has code blocks.
  if (route.startsWith("/addons/")) return ["addons.community", ...codeBlock];
  if (route === "/docs/search")
    return [
      "docs.search",
      "docs.allPlatforms",
      "docs.searchShortcut",
      "setup.platform",
    ];
  if (route === "/setup") return ["setup"];
  if (route === "/use-cases") return ["useCases"];
  if (route === "/changelog")
    return ["changelog.month", "changelog.status", "changelog.pre.loading"];
  return [];
}

/** Only serialize messages needed by this page's interactive islands. */
export function getClientMessages(
  locale: Locale,
  pathname: string,
): Record<string, string> {
  const route = pathname.replace(/^\/(en|de)/, "").replace(/\/$/, "") || "/";
  const prefixes = [...everywhere, ...routePrefixes(route)];
  const messages = locale === "de" ? { ...en, ...de } : en;
  // Version placeholders are resolved here, so the client needs no version data.
  return Object.fromEntries(
    Object.entries(messages)
      .filter(([key]) =>
        prefixes.some(
          (prefix) => key === prefix || key.startsWith(`${prefix}.`),
        ),
      )
      .map(([key, text]) => [key, resolveVersions(text)]),
  );
}

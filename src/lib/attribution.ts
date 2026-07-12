export const campaignParameterNames = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
] as const;

export type CampaignParameterName = (typeof campaignParameterNames)[number];
export type CampaignAttribution = Partial<Record<CampaignParameterName, string>>;

export type DownloadTarget =
  | "mac_dmg"
  | "mac_github_releases"
  | "mac_homebrew"
  | "windows_github_installer"
  | "windows_github_releases"
  | "windows_store"
  | "ios_testflight";

export type TrackingPlacement =
  | "business"
  | "docs"
  | "header"
  | "hero"
  | "landing"
  | "platform_menu"
  | "pricing"
  | "release_status"
  | "use_case";

export type DownloadPlatform = "mac" | "windows" | "ios";

export interface CheckoutAttribution {
  tier: string;
  billingPeriod: "monthly" | "lifetime" | "one_time";
  placement: TrackingPlacement;
}

export interface AttributionStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

const storageKey = "typewhisper.campaign-attribution";
const maximumCampaignValueLength = 200;

function normalizedCampaignValue(value: string | null): string | undefined {
  const normalized = value?.trim();
  if (!normalized) return undefined;
  return normalized.slice(0, maximumCampaignValueLength);
}

export function campaignAttributionFromSearch(search: string): CampaignAttribution {
  const params = new URLSearchParams(search);
  const attribution: CampaignAttribution = {};

  for (const name of campaignParameterNames) {
    const value = normalizedCampaignValue(params.get(name));
    if (value) attribution[name] = value;
  }

  return attribution;
}

export function readCampaignAttribution(
  storage: AttributionStorage,
): CampaignAttribution {
  try {
    const raw = storage.getItem(storageKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const attribution: CampaignAttribution = {};

    for (const name of campaignParameterNames) {
      const value = parsed[name];
      if (typeof value === "string") {
        const normalized = normalizedCampaignValue(value);
        if (normalized) attribution[name] = normalized;
      }
    }

    return attribution;
  } catch {
    return {};
  }
}

export function captureInitialCampaignAttribution(
  search: string,
  storage: AttributionStorage,
): CampaignAttribution {
  const existing = readCampaignAttribution(storage);
  if (Object.keys(existing).length > 0) return existing;

  const attribution = campaignAttributionFromSearch(search);
  if (Object.keys(attribution).length === 0) return attribution;

  try {
    storage.setItem(storageKey, JSON.stringify(attribution));
  } catch {
    // Attribution must never interfere with navigation or checkout.
  }

  return attribution;
}

export function buildPolarCheckoutURL(
  baseURL: string,
  attribution: CampaignAttribution,
  checkout: CheckoutAttribution,
): string {
  const url = new URL(baseURL);
  url.searchParams.set(
    "utm_source",
    attribution.utm_source ?? "typewhisper_website",
  );
  url.searchParams.set("utm_medium", attribution.utm_medium ?? "web");

  for (const name of ["utm_campaign", "utm_term"] as const) {
    const value = attribution[name];
    if (value) url.searchParams.set(name, value);
  }

  url.searchParams.set(
    "utm_content",
    `website_${checkout.placement}_${checkout.tier}_${checkout.billingPeriod}`,
  );
  return url.toString();
}

type PlausibleEventName = "Download" | "Checkout Started";
type PlausibleProps = Record<string, string>;

declare global {
  interface Window {
    plausible?: (
      eventName: PlausibleEventName,
      options?: { props: PlausibleProps },
    ) => void;
  }
}

function sendPlausibleEvent(eventName: PlausibleEventName, props: PlausibleProps) {
  try {
    window.plausible?.(eventName, { props });
  } catch {
    // Tracking is deliberately best-effort.
  }
}

export function initializeAttributionTracking(): void {
  try {
    captureInitialCampaignAttribution(window.location.search, window.sessionStorage);
  } catch {
    // Session storage can be unavailable in hardened browser contexts.
  }

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const element = event.target.closest<HTMLElement>(
      "[data-download-target], [data-checkout-tier]",
    );
    if (!element) return;

    if (element.dataset.downloadTarget) {
      const props: PlausibleProps = {
        platform: element.dataset.downloadPlatform ?? "unknown",
        target: element.dataset.downloadTarget,
        placement: element.dataset.trackingPlacement ?? "unknown",
        locale: document.documentElement.lang || "unknown",
      };
      if (element.dataset.downloadVersion) {
        props.version = element.dataset.downloadVersion;
      }
      sendPlausibleEvent("Download", props);
      return;
    }

    if (!(element instanceof HTMLAnchorElement)) return;
    const tier = element.dataset.checkoutTier;
    const billingPeriod = element.dataset.checkoutBillingPeriod;
    const placement = element.dataset.trackingPlacement;
    if (!tier || !billingPeriod || !placement) return;

    const checkout: CheckoutAttribution = {
      tier,
      billingPeriod: billingPeriod as CheckoutAttribution["billingPeriod"],
      placement: placement as TrackingPlacement,
    };
    let attribution: CampaignAttribution = {};
    try {
      attribution = readCampaignAttribution(window.sessionStorage);
    } catch {
      // Fall back to website attribution when session storage is unavailable.
    }
    element.href = buildPolarCheckoutURL(element.href, attribution, checkout);
    sendPlausibleEvent("Checkout Started", {
      tier,
      billing_period: billingPeriod,
      placement,
      locale: document.documentElement.lang || "unknown",
    });
  });
}

import { t, type Locale } from "@/i18n/index";
import {
  commercialTiers,
  currencySymbol,
  type CommercialTier,
  type CommercialTierId,
} from "@/lib/pricing";

/** Replaces `{name}` placeholders of a translation with values. */
export function fill(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in values ? String(values[name]) : match,
  );
}

/** Amount with the currency symbol in the order of the locale. */
export function formatPrice(locale: Locale, amount: number): string {
  return locale === "de"
    ? `${amount} ${currencySymbol}`
    : `${currencySymbol}${amount}`;
}

export function commercialTier(id: CommercialTierId): CommercialTier {
  const tier = commercialTiers.find((entry) => entry.id === id);
  if (!tier) throw new Error(`Unknown commercial tier: ${id}`);
  return tier;
}

export function devicesLabel(tier: CommercialTier, locale: Locale): string {
  if (tier.devices === "unlimited") {
    return t(locale, "pricing.tiers.devicesUnlimited");
  }
  return fill(t(locale, "pricing.tiers.devicesCount"), {
    count: tier.devices,
  });
}

/** "from €5 /mo" as one line of text, for meta lines. */
export function priceFromLabel(tier: CommercialTier, locale: Locale): string {
  return [
    t(locale, "pricing.tiers.from"),
    formatPrice(locale, tier.price.monthly),
    t(locale, "pricing.tiers.perMonth"),
  ].join(" ");
}

// Single source of truth for TypeWhisper pricing on the website.
// Mirrors `AppConstants.Polar` in typewhisper-mac/TypeWhisper/App/AppConstants.swift.
// When the Mac app changes prices/URLs, update this file as well (or add a build-time sync later).

export type CommercialTierId = "individual" | "team" | "enterprise";
export type SupporterTierId = "bronze" | "silver" | "gold";
export type BillingPeriod = "monthly" | "yearly" | "lifetime";

export interface CommercialTier {
  id: CommercialTierId;
  name: string;
  devices: number | "unlimited";
  /** Every tier has both subscriptions; tiers without `lifetime` are sold as a subscription only. */
  price: {
    monthly: number;
    yearly: number;
    lifetime?: number;
  };
  checkout: {
    monthly: string;
    yearly: string;
    lifetime?: string;
  };
}

export interface SupporterTier {
  id: SupporterTierId;
  name: string;
  price: number;
  checkout: string;
  accentColorClass: string;
  iconName: "heart" | "star" | "crown";
}

export const currency = "EUR" as const;
export const currencySymbol = "\u20AC";

export const polarOrganizationUrl = "https://polar.sh/typewhisper";
export const polarCustomerPortalUrl = "https://polar.sh/typewhisper/portal";
export const salesEmail = "hello@typewhisper.com";

/** A year of the yearly subscription costs this many monthly prices. */
export const yearlyPaidMonths = 10;

export const commercialTiers: CommercialTier[] = [
  {
    id: "individual",
    name: "Individual",
    devices: 3,
    price: { monthly: 5, yearly: 50, lifetime: 99 },
    checkout: {
      monthly:
        "https://buy.polar.sh/polar_cl_Yfw7BSIXSNFESlrNPL0fNG8GHPqX9qhmxGce32wZfYJ",
      yearly:
        "https://buy.polar.sh/polar_cl_lnRsYNgI93u4CRXftmZU8JPn5EIGnbcbzGqLi3VBfzK",
      lifetime:
        "https://buy.polar.sh/polar_cl_Uiv5AnvLoQjx4JowO3gGciT7MLOovY4oY4ESz3PIxgI",
    },
  },
  {
    id: "team",
    name: "Team",
    devices: 10,
    price: { monthly: 19, yearly: 190, lifetime: 299 },
    checkout: {
      monthly:
        "https://buy.polar.sh/polar_cl_kSqGfvss0Ces3W7R4xw7hr5NdgvEbPbhhUGRH4ad3Hj",
      yearly:
        "https://buy.polar.sh/polar_cl_1MgHf8OcRjqEoxOvw3sorOKSPfAi6OIHVj3aN0nXytG",
      lifetime:
        "https://buy.polar.sh/polar_cl_GjG4jf1fT9HGQn051cgN6xsWH9Xm6Z7oe0Ke71xq6Po",
    },
  },
  {
    // Subscription only, because it includes ongoing support. Enterprise
    // Lifetime licenses sold earlier stay valid; the product is archived.
    id: "enterprise",
    name: "Enterprise",
    devices: "unlimited",
    price: { monthly: 199, yearly: 1990 },
    checkout: {
      monthly:
        "https://buy.polar.sh/polar_cl_uzCNIsF0vY9gx2peWljyJU7JQoEzxHUueCPTA0MoOQe",
      yearly:
        "https://buy.polar.sh/polar_cl_LZkXVmog2aWoQqfWhIp19yEsaZNqHc0r3jU020T2oRi",
    },
  },
];

export const supporterTiers: SupporterTier[] = [
  {
    id: "bronze",
    name: "Bronze",
    price: 10,
    checkout:
      "https://buy.polar.sh/polar_cl_yilyo1V90RnuUX59V2PyLUIg45FpzYI8aMhG824wYn8",
    accentColorClass: "text-amber-700 dark:text-amber-500",
    iconName: "heart",
  },
  {
    id: "silver",
    name: "Silver",
    price: 25,
    checkout:
      "https://buy.polar.sh/polar_cl_lXFAqnanhrrPd1RZ95SCb2L05L3lNrUQIkYVd0ZmK5b",
    accentColorClass: "text-slate-400 dark:text-slate-300",
    iconName: "star",
  },
  {
    id: "gold",
    name: "Gold",
    price: 50,
    checkout:
      "https://buy.polar.sh/polar_cl_FpojMlLmyF73gOqpXLihSE0lNYnoQoaMxGp724IIor4",
    accentColorClass: "text-yellow-500 dark:text-yellow-400",
    iconName: "crown",
  },
];

export const entryCommercialPrice = commercialTiers[0].price.monthly;

export interface CommercialOffer {
  period: BillingPeriod;
  amount: number;
  checkout: string;
}

/**
 * Price and checkout of a tier for the chosen billing period. A tier without
 * a lifetime option offers its yearly subscription instead.
 */
export function commercialOffer(
  tier: CommercialTier,
  period: BillingPeriod,
): CommercialOffer {
  if (period === "lifetime") {
    const amount = tier.price.lifetime;
    const checkout = tier.checkout.lifetime;
    if (amount !== undefined && checkout !== undefined) {
      return { period, amount, checkout };
    }
    return {
      period: "yearly",
      amount: tier.price.yearly,
      checkout: tier.checkout.yearly,
    };
  }
  return {
    period,
    amount: tier.price[period],
    checkout: tier.checkout[period],
  };
}

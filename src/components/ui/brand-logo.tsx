import type { ComponentType } from "react";
import brandLogoData from "@/data/brand-logos.generated.json";
import { type BrandLogoContext, type BrandLogoId, brandLogoById } from "@/data/brand-logos";
import { DiscordIcon } from "@/components/ui/discord-icon";
import { GitHubIcon } from "@/components/ui/github-icon";
import { KofiIcon } from "@/components/ui/kofi-icon";
import { cn } from "@/lib/utils";

type ThemeAsset = {
  light: string;
  dark: string;
};

type BrandLogoAsset = string | ThemeAsset;

interface GeneratedBrandLogoEntry {
  hasLogo: boolean;
  hasWordmark: boolean;
  hasThemeVariants: boolean;
  logo?: BrandLogoAsset;
  wordmark?: BrandLogoAsset;
  brandUrl?: string | null;
  sourceUrl?: string | null;
}

interface GeneratedBrandLogoData {
  generatedAt: string | null;
  brands: Partial<Record<BrandLogoId, GeneratedBrandLogoEntry>>;
}

interface BrandLogoProps {
  brand: BrandLogoId;
  context: BrandLogoContext;
  variant?: "logo" | "wordmark";
  className?: string;
  alt?: string;
}

const generated = brandLogoData as unknown as GeneratedBrandLogoData;

const customFallbackIcons: Record<string, ComponentType<{ className?: string }>> = {
  DiscordIcon,
  GitHubIcon,
  KofiIcon,
};

function isThemeAsset(asset: BrandLogoAsset | undefined): asset is ThemeAsset {
  return typeof asset === "object" && asset !== null && "light" in asset && "dark" in asset;
}

function renderAsset(asset: BrandLogoAsset, alt: string, className?: string) {
  if (isThemeAsset(asset)) {
    return (
      <>
        <img
          src={asset.light}
          alt={alt}
          className={cn("block dark:hidden", className)}
          data-theme="light"
        />
        <img
          src={asset.dark}
          alt={alt}
          className={cn("hidden dark:block", className)}
          data-theme="dark"
        />
      </>
    );
  }

  return <img src={asset} alt={alt} className={className} />;
}

export function canRenderBrandLogo(
  brand: BrandLogoId,
  context: BrandLogoContext,
  variant?: "logo" | "wordmark",
) {
  const definition = brandLogoById[brand];
  if (!definition || !definition.contexts.includes(context)) {
    return false;
  }

  const entry = generated.brands[brand];
  const desiredVariant =
    variant ?? (definition.preferWordmark && entry?.hasWordmark ? "wordmark" : "logo");
  const asset = desiredVariant === "wordmark" ? entry?.wordmark : entry?.logo;

  return Boolean(asset && (context === "addon" || isThemeAsset(asset)));
}

export function BrandLogo({
  brand,
  context,
  variant,
  className,
  alt,
}: BrandLogoProps) {
  const definition = brandLogoById[brand];
  if (!definition || !definition.contexts.includes(context)) {
    return null;
  }

  const entry = generated.brands[brand];
  const desiredVariant =
    variant ?? (definition.preferWordmark && entry?.hasWordmark ? "wordmark" : "logo");
  const asset = desiredVariant === "wordmark" ? entry?.wordmark : entry?.logo;

  if (asset && canRenderBrandLogo(brand, context, variant)) {
    return renderAsset(asset, alt ?? definition.expectedTitle, className);
  }

  if (definition.fallback === "custom" && definition.fallbackComponent) {
    const FallbackIcon = customFallbackIcons[definition.fallbackComponent];
    if (FallbackIcon) {
      return <FallbackIcon className={className} />;
    }
  }

  return null;
}

import { BrandLogo, canRenderBrandLogo } from "@/components/ui/brand-logo";
import { BarMark } from "@/components/site/bar-mark";
import type { Plugin } from "@/data/addon-taxonomy";
import { brandLogoById } from "@/data/brand-logos";
import { addonIcons } from "./addon-icons";

interface AddonMarkProps {
  plugin: Pick<Plugin, "brandLogo" | "iconUrl" | "iconUrlDark" | "icon">;
  /** Empty inside a link that already carries the name. */
  alt?: string;
  /** Lazy in lists; the head of an add-on page loads its mark at once. */
  loading?: "lazy" | "eager";
}

/** Brand logo, then the add-on's own icon, then the named lucide icon. */
export function AddonMark({
  plugin,
  alt = "",
  loading = "lazy",
}: AddonMarkProps) {
  if (plugin.brandLogo && canRenderBrandLogo(plugin.brandLogo, "addon")) {
    return (
      <BrandLogo
        brand={plugin.brandLogo}
        context="addon"
        className={
          brandLogoById[plugin.brandLogo].unclipped
            ? "site-index__logo addon-logo--unclipped"
            : "site-index__logo"
        }
        alt={alt}
        loading={loading}
      />
    );
  }
  if (plugin.iconUrl && plugin.iconUrlDark) {
    return (
      <>
        <img
          src={plugin.iconUrl}
          alt={alt}
          className="site-index__logo block dark:hidden"
          data-theme="light"
          loading={loading}
          decoding="async"
        />
        <img
          src={plugin.iconUrlDark}
          alt={alt}
          className="site-index__logo hidden dark:block"
          data-theme="dark"
          loading={loading}
          decoding="async"
        />
      </>
    );
  }
  if (plugin.iconUrl) {
    return (
      <img
        src={plugin.iconUrl}
        alt={alt}
        className="site-index__logo"
        loading={loading}
        decoding="async"
      />
    );
  }
  const Icon = addonIcons[plugin.icon];
  if (Icon) return <Icon className="site-index__icon" aria-hidden="true" />;
  return <BarMark className="site-index__logo" />;
}

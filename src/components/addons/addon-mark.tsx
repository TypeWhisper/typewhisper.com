import { BrandLogo, canRenderBrandLogo } from "@/components/ui/brand-logo";
import { BarMark } from "@/components/site/bar-mark";
import type { Plugin } from "@/data/addon-taxonomy";
import { brandLogoById } from "@/data/brand-logos";
import { addonIcons } from "./addon-icons";

interface AddonMarkProps {
  plugin: Pick<Plugin, "brandLogo" | "iconUrl" | "iconUrlDark" | "icon">;
  /** Empty inside a link that already carries the name. */
  alt?: string;
}

/** Brand logo, then the add-on's own icon, then the named lucide icon. */
export function AddonMark({ plugin, alt = "" }: AddonMarkProps) {
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
        />
        <img
          src={plugin.iconUrlDark}
          alt={alt}
          className="site-index__logo hidden dark:block"
          data-theme="dark"
        />
      </>
    );
  }
  if (plugin.iconUrl) {
    return <img src={plugin.iconUrl} alt={alt} className="site-index__logo" />;
  }
  const Icon = addonIcons[plugin.icon];
  if (Icon) return <Icon className="site-index__icon" aria-hidden="true" />;
  return <BarMark className="site-index__logo" />;
}

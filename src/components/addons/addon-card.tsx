import {
  type Plugin,
  type PluginCategory,
  type PluginPlatform,
  categoryKeys,
  platformKeys,
  sourceKeys,
} from "@/data/addon-taxonomy";
import { t, type Locale } from "@/i18n/index";
import { getAddonCategoriesForPlatform } from "@/data/addon-edition-capabilities";
import { AddonMark } from "./addon-mark";

interface AddonCardProps {
  plugin: Plugin;
  basePath?: string;
  locale?: Locale;
  platform?: PluginPlatform | "all";
  /** Marks recommended add-ons inside the full list. */
  showRecommended?: boolean;
}

/** One entry of the add-on index: tile, name, author, description, meta line. */
export function AddonCard({
  plugin,
  basePath = "/addons/",
  locale = "en",
  platform = "all",
  showRecommended = false,
}: AddonCardProps) {
  const categories = getAddonCategoriesForPlatform(plugin, platform);
  const platforms = platform === "all" ? plugin.platforms : [platform];

  return (
    <a
      href={`${basePath}${plugin.slug}/`}
      className="site-index__link addon-entry"
      data-testid="addon-card"
      data-slug={plugin.slug}
    >
      <span className="site-index__mark" aria-hidden="true">
        <AddonMark plugin={plugin} />
      </span>
      <div className="site-index__body">
        <div className="addon-entry__head">
          <h3 className="site-index__name">{plugin.name}</h3>
          {plugin.author && (
            <span className="addon-entry__author">{plugin.author}</span>
          )}
        </div>
        <p className="site-index__text">{plugin.description}</p>
        <div className="addon-entry__meta">
          <p className="site-index__meta addon-entry__line addon-entry__line--roles">
            {showRecommended && plugin.featured === true && (
              <span className="site-index__accent">
                {t(locale, "addons.recommended")}
              </span>
            )}
            <span className="addon-entry__group">
              {categories.map((category: PluginCategory) => (
                <span key={category}>{t(locale, categoryKeys[category])}</span>
              ))}
            </span>
          </p>
          <p className="site-index__meta addon-entry__line">
            <span className="addon-entry__group">
              {platforms.map((item: PluginPlatform) => (
                <span key={item}>{t(locale, platformKeys[item])}</span>
              ))}
            </span>
            <span className="addon-entry__group addon-entry__source">
              <span>{t(locale, sourceKeys[plugin.source])}</span>
            </span>
          </p>
        </div>
      </div>
    </a>
  );
}

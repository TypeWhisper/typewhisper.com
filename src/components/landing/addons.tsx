import { ArrowRight } from "lucide-react";
import { addonIcons } from "@/components/addons/addon-icons";
import { BrandLogo, canRenderBrandLogo } from "@/components/ui/brand-logo";
import { getPlugins, platformKeys, type Plugin } from "@/data/addons";
import { localePath, t, type Locale } from "@/i18n/index";
import { SectionHead } from "@/components/site/section-head";
import { BarMark } from "@/components/site/bar-mark";

// Display order: local engines, cloud speech and AI, then tools. Recommended
// add-ons (`featured` in their frontmatter) always show; the rest of this
// list fills the grid.
const showcaseOrder = [
  "whisperkit",
  "parakeet",
  "whisper-cpp",
  "reson8",
  "groq",
  "openai",
  "claude",
  "obsidian",
  "mcp-client",
];
const showcaseSize = 9;

function pickShowcase(all: Plugin[]): Plugin[] {
  const rank = (plugin: Plugin) => {
    const index = showcaseOrder.indexOf(plugin.slug);
    return index === -1 ? showcaseOrder.length : index;
  };
  const recommended = all.filter((plugin) => plugin.featured === true);
  const fill = showcaseOrder
    .map((slug) => all.find((plugin) => plugin.slug === slug))
    .filter((plugin) => plugin !== undefined)
    .filter((plugin) => !recommended.includes(plugin));
  return [...recommended, ...fill]
    .slice(0, showcaseSize)
    .sort((a, b) => rank(a) - rank(b));
}

function AddonMark({ plugin }: { plugin: Plugin }) {
  if (plugin.brandLogo && canRenderBrandLogo(plugin.brandLogo, "addon")) {
    return (
      <BrandLogo
        brand={plugin.brandLogo}
        context="addon"
        className="site-index__logo"
        alt=""
      />
    );
  }
  if (plugin.iconUrl && plugin.iconUrlDark) {
    return (
      <>
        <img
          src={plugin.iconUrl}
          alt=""
          className="site-index__logo block dark:hidden"
          data-theme="light"
        />
        <img
          src={plugin.iconUrlDark}
          alt=""
          className="site-index__logo hidden dark:block"
          data-theme="dark"
        />
      </>
    );
  }
  if (plugin.iconUrl) {
    return <img src={plugin.iconUrl} alt="" className="site-index__logo" />;
  }
  const Icon = addonIcons[plugin.icon];
  if (Icon) return <Icon className="site-index__icon" />;
  return <BarMark className="site-index__logo" />;
}

/** The open ecosystem: the recommended add-ons by name, the rest one link away. */
export function Addons({ locale = "en" }: { locale?: Locale }) {
  const all = getPlugins(locale);
  const showcase = pickShowcase(all);
  if (showcase.length === 0) return null;

  return (
    <section data-testid="addons-showcase" className="site-section">
      <div className="site-wrap">
        <SectionHead
          label={t(locale, "addonsShowcase.label")}
          title={t(locale, "addonsShowcase.title")}
          lede={t(locale, "addonsShowcase.subtitle").replace(
            "{count}",
            String(all.length),
          )}
          seed={31}
        />

        <ul className="site-index site-index--tiles landing-addons reveal-hidden">
          {showcase.map((plugin) => (
            <li key={plugin.slug}>
              <a
                href={localePath(locale, `/addons/${plugin.slug}`)}
                className="site-index__link"
                data-testid="addon-card"
                data-slug={plugin.slug}
              >
                <span className="site-index__mark" aria-hidden="true">
                  <AddonMark plugin={plugin} />
                </span>
                <span className="site-index__body">
                  <span className="site-index__name">{plugin.name}</span>
                  <span className="site-index__text">{plugin.description}</span>
                  <span className="site-index__meta">
                    {plugin.featured === true && (
                      <span className="site-index__accent">
                        {t(locale, "addonsShowcase.recommended")}
                      </span>
                    )}
                    {plugin.platforms
                      .map((platform) => t(locale, platformKeys[platform]))
                      .join(" · ")}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="site-actions">
          <a
            href={localePath(locale, "/addons")}
            className="site-button site-button--quiet"
          >
            {t(locale, "addonsShowcase.browseAll")}
          </a>
          <a href={localePath(locale, "/addons/develop")} className="site-link">
            {t(locale, "addonsShowcase.buildYourOwn")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

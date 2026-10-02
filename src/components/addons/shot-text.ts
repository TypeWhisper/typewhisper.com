import { platformKeys, type PluginPlatform } from "@/data/addons";
import { t, type Locale } from "@/i18n/index";

interface ShotTextOptions {
  name: string;
  /** Platform the capture was taken on; left out when the text names none. */
  platform?: PluginPlatform;
  /** Specific texts from the frontmatter; they replace the template. */
  alt?: string;
  caption?: string;
}

const withoutStop = (text: string) => text.trim().replace(/[.!?]$/, "");
const asSentence = (text: string) =>
  /[.!?]$/.test(text.trim()) ? text.trim() : `${text.trim()}.`;

/** Alternative text and caption of an add-on screenshot. */
export function addonShotText(
  locale: Locale,
  { name, platform, alt, caption }: ShotTextOptions,
) {
  const template = platform
    ? t(locale, "addons.shot.settingsOnPlatform")
        .replace("{name}", name)
        .replace("{platform}", t(locale, platformKeys[platform]))
    : t(locale, "addons.shot.settings").replace("{name}", name);
  const shotAlt = alt?.trim() || template;
  const shotCaption = asSentence(caption?.trim() || shotAlt);

  return {
    alt: shotAlt,
    caption: shotCaption,
    /** A caption that repeats the alternative text is hidden from screen readers. */
    captionRepeatsAlt: withoutStop(shotCaption) === withoutStop(shotAlt),
  };
}

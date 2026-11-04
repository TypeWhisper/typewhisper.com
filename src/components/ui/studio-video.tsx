import { t, type Locale } from "@/i18n/index";

interface StudioVideoProps {
  /**
   * Name of the clip in `public/videos/`. Each language needs
   * `<slug>-<locale>.mp4`, `<slug>-<locale>-poster.jpg` and `<slug>-<locale>.vtt`,
   * taken from the `-web.mp4`, `-poster.jpg` and `.vtt` of a Demo Studio export.
   */
  slug: string;
  locale: Locale;
  /** Accessible name of the player: what the video is about. */
  label: string;
  /** Says what the video shows, below the player. */
  caption?: string;
  /**
   * The clip also has a portrait cut: `<slug>-<locale>-portrait.mp4` and
   * `<slug>-<locale>-portrait-poster.jpg`, taken from the `-portrait.mp4` and
   * `-thumbnail-portrait.jpg` of the Shorts export. Phones held upright show
   * it instead of the wide cut; both share the captions. Pages that use it
   * load `watchStudioVideoOrientation` from `@/lib/studio-video`.
   */
  portrait?: boolean;
  className?: string;
}

const captionLabels: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
};

/**
 * A wide product video rendered in the TypeWhisper Demo Studio, in the
 * language of the page. The file loads only when someone starts it, and the
 * voice-over comes with captions.
 */
export function StudioVideo({
  slug,
  locale,
  label,
  caption,
  portrait = false,
  className = "",
}: StudioVideoProps) {
  const base = `/videos/${slug}-${locale}`;
  const track = (
    <track
      kind="captions"
      src={`${base}.vtt`}
      srcLang={locale}
      label={captionLabels[locale]}
    />
  );
  const classes = [
    "site-video",
    portrait ? "site-video--adaptive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={classes} data-studio-video={portrait ? "" : undefined}>
      <video
        className={portrait ? "site-video__wide" : undefined}
        playsInline
        controls
        preload="none"
        poster={`${base}-poster.jpg`}
        aria-label={label}
        data-testid="studio-video"
      >
        <source src={`${base}.mp4`} type="video/mp4" />
        {track}
        {t(locale, "howItWorks.videoFallback")}
      </video>
      {portrait && (
        <video
          className="site-video__portrait"
          playsInline
          controls
          preload="none"
          poster={`${base}-portrait-poster.jpg`}
          aria-label={label}
          data-testid="studio-video-portrait"
        >
          <source src={`${base}-portrait.mp4`} type="video/mp4" />
          {track}
          {t(locale, "howItWorks.videoFallback")}
        </video>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

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
  className = "",
}: StudioVideoProps) {
  const base = `/videos/${slug}-${locale}`;

  return (
    <figure className={`site-video ${className}`.trim()}>
      <video
        playsInline
        controls
        preload="none"
        poster={`${base}-poster.jpg`}
        aria-label={label}
        data-testid="studio-video"
      >
        <source src={`${base}.mp4`} type="video/mp4" />
        <track
          kind="captions"
          src={`${base}.vtt`}
          srcLang={locale}
          label={captionLabels[locale]}
        />
        {t(locale, "howItWorks.videoFallback")}
      </video>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

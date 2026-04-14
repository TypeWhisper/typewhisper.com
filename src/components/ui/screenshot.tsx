import { webpPath } from "@/i18n/index";

type ScreenshotProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
};

export function Screenshot({ src, alt, className, loading }: ScreenshotProps) {
  return (
    <picture>
      <source srcSet={webpPath(src)} type="image/webp" />
      <img src={src} alt={alt} className={className} loading={loading} />
    </picture>
  );
}

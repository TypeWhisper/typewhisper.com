import { webpPath } from "@/i18n/index";
import imageSizes from "@/data/screenshot-sizes.json";

type ScreenshotProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  sizes?: string;
};

export function Screenshot({
  src,
  alt,
  className,
  loading,
  sizes = "(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 80vw, 768px",
}: ScreenshotProps) {
  const metadata = (
    imageSizes as Record<
      string,
      { width: number; height: number; srcSet: string }
    >
  )[webpPath(src)];
  return (
    <picture>
      <source
        srcSet={metadata?.srcSet ?? webpPath(src)}
        sizes={metadata ? sizes : undefined}
        type="image/webp"
      />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        width={metadata?.width}
        height={metadata?.height}
        decoding="async"
      />
    </picture>
  );
}

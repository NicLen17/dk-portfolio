"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { SanityImage as SanityImageType } from "@/sanity/types";

interface SanityImageProps {
  image: SanityImageType;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  quality?: number;
}

export function SanityImage({
  image,
  alt: customAlt,
  width,
  height,
  fill,
  sizes,
  priority = false,
  className,
  quality = 85,
}: SanityImageProps) {
  if (!image?.asset) return null;

  const resolvedAlt = customAlt ?? image.alt ?? "DKGRFX Artwork";
  const lqip = image.asset.metadata?.lqip;

  // Custom loader delegating resizing and format conversion (WebP/AVIF) directly to Sanity CDN
  const sanityLoader = ({ width: targetWidth, quality: targetQuality }: { width: number; quality?: number }) => {
    return urlFor(image)
      .width(targetWidth)
      .auto("format")
      .quality(targetQuality ?? quality)
      .fit("crop")
      .url();
  };

  const defaultUrl = urlFor(image)
    .auto("format")
    .quality(quality)
    .fit("crop")
    .url();

  if (fill) {
    return (
      <Image
        loader={sanityLoader}
        src={defaultUrl}
        alt={resolvedAlt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        placeholder={lqip ? "blur" : "empty"}
        blurDataURL={lqip}
      />
    );
  }

  const calculatedWidth = width ?? image.asset.metadata?.dimensions?.width ?? 800;
  const calculatedHeight =
    height ??
    (image.asset.metadata?.dimensions
      ? Math.round(calculatedWidth / image.asset.metadata.dimensions.aspectRatio)
      : Math.round(calculatedWidth * 0.75));

  return (
    <Image
      loader={sanityLoader}
      src={defaultUrl}
      alt={resolvedAlt}
      width={calculatedWidth}
      height={calculatedHeight}
      sizes={sizes}
      priority={priority}
      className={className}
      placeholder={lqip ? "blur" : "empty"}
      blurDataURL={lqip}
    />
  );
}

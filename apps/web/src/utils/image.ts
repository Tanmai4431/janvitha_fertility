import { urlFor } from './sanity';

export interface SanityImageSource {
  asset: {
    _ref: string;
    [key: string]: any;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  [key: string]: any;
}

/**
 * Parses Sanity Image Dimensions from the Asset Reference ID.
 * Example asset ref: image-giapn04l-1200x800-jpg
 */
export function getImageDimensions(source: SanityImageSource) {
  const assetRef = source?.asset?._ref || '';
  const parts = assetRef.split('-');
  if (parts.length >= 3) {
    const dimensions = parts[2];
    const [widthStr, heightStr] = dimensions.split('x');
    const width = parseInt(widthStr, 10);
    const height = parseInt(heightStr, 10);
    if (!isNaN(width) && !isNaN(height)) {
      return { width, height, aspectRatio: width / height };
    }
  }
  return null;
}

/**
 * Returns optimized image attributes for responsive sizes and next-gen formats.
 */
export function getSanityImageProps(source: SanityImageSource, maxWidth = 1200) {
  if (!source || !source.asset) return null;

  const dimensions = getImageDimensions(source);
  
  // Calculate aspect ratio constraints to prevent layout shifts
  const width = dimensions?.width || 800;
  const height = dimensions?.height || 600;
  const aspectRatio = dimensions?.aspectRatio || 4/3;

  // Build responsive widths
  const srcWidths = [400, 600, 800, 1000, 1200, 1600];
  const activeWidths = srcWidths.filter((w) => w <= width);
  if (activeWidths.indexOf(width) === -1 && width <= maxWidth) {
    activeWidths.push(width);
  }

  // Generate SrcSet with auto(format) WebP/AVIF conversions
  const srcset = activeWidths
    .map((w) => `${urlFor(source).width(w).auto('format').fit('max').url()} ${w}w`)
    .join(', ');

  // Standard fallback src
  const src = urlFor(source).width(Math.min(maxWidth, width)).auto('format').fit('max').url();

  return {
    src,
    srcset,
    width: Math.min(maxWidth, width),
    height: Math.round(Math.min(maxWidth, width) / aspectRatio),
    aspectRatio,
  };
}

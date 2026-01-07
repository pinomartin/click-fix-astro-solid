import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

export async function optimizeImage(image: ImageMetadata) {
  const optimized = await getImage({
    src: image,
    width: 600,
    height: 400,
    format: "webp",
    quality: 80,
  });

  return optimized.src;
}

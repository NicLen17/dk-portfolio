import { createImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset } from "./env";
import type { SanityImage } from "./types";

// Helper builder initialized with project credentials
const builder = createImageUrlBuilder({
  projectId: projectId || "1nddltrp",
  dataset: dataset || "production",
});

export function urlFor(source: SanityImage | string | object) {
  return builder.image(source);
}

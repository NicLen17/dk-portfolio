import { sanityFetch } from "@/sanity/fetch";
import { ABOUT_SETTINGS_QUERY } from "@/sanity/queries";
import type { SanityAboutSettings } from "@/sanity/types";
import { AboutPreviewContent } from "./AboutPreviewContent";

// Server Component fetching About preview settings from Sanity
export async function AboutPreviewSection() {
  const data = await sanityFetch<SanityAboutSettings>({
    query: ABOUT_SETTINGS_QUERY,
    tags: ["aboutSettings"],
    revalidate: 60,
  });

  return <AboutPreviewContent data={data} />;
}

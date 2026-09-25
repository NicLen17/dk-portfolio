import { sanityFetch } from "@/sanity/fetch";
import { HERO_SETTINGS_QUERY } from "@/sanity/queries";
import type { SanityHeroSettings } from "@/sanity/types";
import { HeroContent } from "./HeroContent";

// Server Component fetching hero settings from Sanity with ISR
export async function HeroSection() {
  const heroSettings = await sanityFetch<SanityHeroSettings>({
    query: HERO_SETTINGS_QUERY,
    tags: ["heroSettings"],
    revalidate: 60,
  });

  return <HeroContent heroSettings={heroSettings} />;
}

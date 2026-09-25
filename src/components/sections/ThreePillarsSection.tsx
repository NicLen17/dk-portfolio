import { sanityFetch } from "@/sanity/fetch";
import { PRACTICE_PILLARS_QUERY } from "@/sanity/queries";
import type { SanityPracticePillar } from "@/sanity/types";
import { ThreePillarsGrid } from "./ThreePillarsGrid";

// Server Component fetching the 3 homepage visual pillars from Sanity
export async function ThreePillarsSection() {
  const pillars = await sanityFetch<SanityPracticePillar[]>({
    query: PRACTICE_PILLARS_QUERY,
    tags: ["practicePillar"],
    revalidate: 60,
  });

  return <ThreePillarsGrid pillars={pillars} />;
}

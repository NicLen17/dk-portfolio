import { sanityFetch } from "@/sanity/fetch";
import { COMMISSIONS_SETTINGS_QUERY } from "@/sanity/queries";
import type { SanityCommissionsSettings } from "@/sanity/types";
import { CommissionsContent } from "./CommissionsContent";

// Server Component fetching Commissions showcase settings from Sanity
export async function CommissionsSection() {
  const data = await sanityFetch<SanityCommissionsSettings>({
    query: COMMISSIONS_SETTINGS_QUERY,
    tags: ["commissionsSettings"],
    revalidate: 60,
  });

  return <CommissionsContent data={data} />;
}

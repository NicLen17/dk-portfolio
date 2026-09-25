import { sanityFetch } from "@/sanity/fetch";
import { PROJECTS_QUERY } from "@/sanity/queries";
import type { SanityProjectListItem } from "@/sanity/types";
import { SelectedWorkGallery } from "./SelectedWorkGallery";

// Server Component: Performs data fetching from Sanity CDN on the server
export async function SelectedWorkSection() {
  const projects = await sanityFetch<SanityProjectListItem[]>({
    query: PROJECTS_QUERY,
    tags: ["project"],
    revalidate: 60,
  });

  return <SelectedWorkGallery projects={projects} />;
}

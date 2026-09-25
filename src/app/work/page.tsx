import type { Metadata } from "next";
import { WorkPageClient } from "@/components/work/WorkPageClient";
import { sanityFetch } from "@/sanity/fetch";
import { PROJECTS_QUERY } from "@/sanity/queries";
import type { SanityProjectListItem } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Portfolio & Selected Works",
  description:
    "Explore the visual portfolio of DKGRFX across sports photography, digital art commissions, and high-impact graphic design.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Portfolio & Selected Works | DKGRFX",
    description:
      "Explore the visual portfolio of DKGRFX across sports photography, digital art commissions, and high-impact graphic design.",
    url: "https://dkgrfx.com/work",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio & Selected Works | DKGRFX",
    description:
      "Explore the visual portfolio of DKGRFX across sports photography, digital art commissions, and high-impact graphic design.",
  },
};

export default async function WorkPage() {
  const sanityProjects = await sanityFetch<SanityProjectListItem[]>({
    query: PROJECTS_QUERY,
    tags: ["project"],
    revalidate: 60,
  });

  return <WorkPageClient sanityProjects={sanityProjects} />;
}

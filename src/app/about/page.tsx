import { sanityFetch } from "@/sanity/fetch";
import { ABOUT_SETTINGS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { SanityAboutSettings, SanitySiteSettings } from "@/sanity/types";
import { AboutContent } from "@/components/about/AboutContent";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the Artist & Practice",
  description:
    "DKGRFX is an independent visual art and design practice by Darwin. Turning real moments, ideas, people, and stories into lasting visual work. REAL MOMENTS → ART.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About the Artist & Practice | DKGRFX",
    description:
      "DKGRFX is an independent visual art and design practice by Darwin. Turning real moments, ideas, people, and stories into lasting visual work.",
    url: "https://dkgrfx.com/about",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About the Artist & Practice | DKGRFX",
    description:
      "DKGRFX is an independent visual art and design practice by Darwin. Turning real moments, ideas, people, and stories into lasting visual work.",
  },
};

export default async function AboutPage() {
  const [aboutData, siteData] = await Promise.all([
    sanityFetch<SanityAboutSettings>({
      query: ABOUT_SETTINGS_QUERY,
      tags: ["aboutSettings"],
      revalidate: 60,
    }),
    sanityFetch<SanitySiteSettings>({
      query: SITE_SETTINGS_QUERY,
      tags: ["siteSettings"],
      revalidate: 60,
    }),
  ]);

  return <AboutContent aboutData={aboutData} siteData={siteData} />;
}

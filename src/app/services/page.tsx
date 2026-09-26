import { sanityFetch } from "@/sanity/fetch";
import { SERVICES_QUERY, PRINTS_QUERY } from "@/sanity/queries";
import type { SanityService, SanityPrintArtwork } from "@/sanity/types";
import { ServicesContent } from "@/components/services/ServicesContent";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Custom Commissions",
  description:
    "Professional sports photography, digital illustration commissions, and graphic design packages by DKGRFX. Book a photoshoot or commission custom art.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services & Custom Commissions | DKGRFX",
    description:
      "Professional sports photography, digital illustration commissions, and graphic design packages by DKGRFX. Book a photoshoot or commission custom art.",
    url: "https://dkgrfx.com/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Custom Commissions | DKGRFX",
    description:
      "Professional sports photography, digital illustration commissions, and graphic design packages by DKGRFX.",
  },
};

export default async function ServicesPage() {
  const [sanityServices, sanityPrints] = await Promise.all([
    sanityFetch<SanityService[]>({
      query: SERVICES_QUERY,
      tags: ["service"],
      revalidate: 60,
    }),
    sanityFetch<SanityPrintArtwork[]>({
      query: PRINTS_QUERY,
      tags: ["printArtwork"],
      revalidate: 60,
    }),
  ]);

  return <ServicesContent services={sanityServices} prints={sanityPrints} />;
}

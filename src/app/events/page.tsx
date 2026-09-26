import { sanityFetch } from "@/sanity/fetch";
import { EVENTS_QUERY } from "@/sanity/queries";
import type { SanityEventListItem } from "@/sanity/types";
import { EventsContent } from "@/components/events/EventsContent";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Event Galleries",
  description:
    "Browse live event photography galleries by DKGRFX. Find your photos, preview high-resolution images, and inquire to purchase your moments.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Client Event Galleries | DKGRFX",
    description:
      "Browse live event photography galleries by DKGRFX. Find your photos, preview high-resolution images, and acquire your moments.",
    url: "https://dkgrfx.com/events",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Event Galleries | DKGRFX",
    description:
      "Browse live event photography galleries by DKGRFX. Find your photos and preview your moments.",
  },
};

export default async function EventsPage() {
  const sanityEvents = await sanityFetch<SanityEventListItem[]>({
    query: EVENTS_QUERY,
    tags: ["galleryEvent"],
    revalidate: 60,
  });

  return <EventsContent events={sanityEvents} />;
}

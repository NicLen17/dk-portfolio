import { sanityFetch } from "@/sanity/fetch";
import { EVENTS_QUERY } from "@/sanity/queries";
import type { SanityEventListItem } from "@/sanity/types";
import { EventGalleriesGrid } from "./EventGalleriesGrid";

// Server Component fetching event galleries from Sanity
export async function EventGalleriesSection() {
  const events = await sanityFetch<SanityEventListItem[]>({
    query: EVENTS_QUERY,
    tags: ["galleryEvent"],
    revalidate: 60,
  });

  return <EventGalleriesGrid events={events} />;
}

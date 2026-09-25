import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEventBySlug, events } from "@/data/events";
import { EventGalleryClient } from "@/components/events/EventGalleryClient";
import { sanityFetch } from "@/sanity/fetch";
import { EVENT_BY_SLUG_QUERY, EVENTS_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import type { SanityEventDetail, SanityEventListItem } from "@/sanity/types";
import type { GalleryEvent } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function resolveEvent(slug: string): Promise<GalleryEvent | null> {
  const sanityDoc = await sanityFetch<SanityEventDetail>({
    query: EVENT_BY_SLUG_QUERY,
    params: { slug },
    tags: ["galleryEvent"],
    revalidate: 60,
  });

  if (sanityDoc && sanityDoc.title) {
    const coverImageUrl = sanityDoc.coverImage?.asset
      ? urlFor(sanityDoc.coverImage).auto("format").quality(90).url()
      : "/images/events/event-volleyball-hero.jpg";

    const photos = (sanityDoc.photos || [])
      .filter((p) => Boolean(p?.asset))
      .map((p, idx) => {
        const fullSrc = urlFor(p).auto("format").quality(90).url();
        const thumbSrc = urlFor(p).width(600).auto("format").quality(80).url();
        return {
          id: p._key || `photo-${idx}`,
          src: fullSrc,
          thumbnailSrc: thumbSrc,
          alt: p.alt || `${sanityDoc.title} photo ${idx + 1}`,
        };
      });

    return {
      id: sanityDoc._id,
      slug: sanityDoc.slug,
      title: sanityDoc.title,
      date: sanityDoc.date,
      location: sanityDoc.location,
      photoCount: photos.length,
      coverImage: coverImageUrl,
      description: sanityDoc.description,
      photos,
    };
  }

  return getEventBySlug(slug) || null;
}

export async function generateStaticParams() {
  const sanityEvents = await sanityFetch<SanityEventListItem[]>({
    query: EVENTS_QUERY,
    tags: ["galleryEvent"],
  });

  if (sanityEvents && sanityEvents.length > 0) {
    return sanityEvents.map((e) => ({ slug: e.slug }));
  }

  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await resolveEvent(slug);

  if (!event) {
    return { title: "Event Not Found" };
  }

  const title = `${event.title} — Event Photo Gallery`;
  const description = `${event.photoCount} photos from ${event.title} in ${event.location}. Preview and acquire your moment.`;
  const url = `https://dkgrfx.com/events/${event.slug}`;

  return {
    title,
    description,
    keywords: [
      event.title,
      event.location,
      "event photography",
      "sports event gallery",
      "DKGRFX",
      "action photography",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${event.title} | Event Gallery | DKGRFX`,
      description,
      url,
      type: "article",
      images: [
        {
          url: event.coverImage,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | Event Gallery | DKGRFX`,
      description,
      images: [event.coverImage],
    },
  };
}

export default async function EventGalleryPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await resolveEvent(slug);

  if (!event) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: event.title,
    description: event.description,
    locationCreated: {
      "@type": "Place",
      name: event.location,
    },
    datePublished: event.date,
    author: {
      "@type": "Person",
      name: "DKGRFX",
      url: "https://dkgrfx.com",
    },
    image: event.coverImage.startsWith("http")
      ? event.coverImage
      : `https://dkgrfx.com${event.coverImage}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EventGalleryClient event={event} />
    </>
  );
}

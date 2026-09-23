import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEventBySlug, events } from "@/data/events";
import { EventGalleryClient } from "@/components/events/EventGalleryClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

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
  const event = getEventBySlug(slug);

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

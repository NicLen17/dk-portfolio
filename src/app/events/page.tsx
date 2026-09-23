import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { events } from "@/data/events";

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

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pt-16 md:pt-24 pb-12">
        <SectionLabel className="mb-4">Client Galleries</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end">
          <SectionHeading className="text-[clamp(2.25rem,4.2vw,4rem)] text-white">
            {"FIND YOUR EVENT."}
          </SectionHeading>
          <p className="text-base text-neutral-400 leading-relaxed max-w-md">
            Browse an event, find your photos, and preview every image before purchasing. High-resolution delivery will be available in the next phase.
          </p>
        </div>
      </div>

      {/* Events grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="group relative block overflow-hidden bg-neutral-900"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs font-body uppercase tracking-[0.2em] text-neutral-400 mb-1">
                    {event.photoCount} Photos · {event.location}
                  </p>
                  <h2 className="font-heading font-bold uppercase text-2xl md:text-3xl text-white leading-none tracking-tight">
                    {event.title}
                  </h2>
                  <p className="mt-2 text-xs font-body text-neutral-500">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

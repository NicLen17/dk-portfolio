"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { events } from "@/data/events";

export function EventGalleriesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section className="py-24 md:py-36 bg-black" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-20">
          <div>
            <SectionLabel className="mb-4">Event Galleries</SectionLabel>
            <SectionHeading className="text-[clamp(1.75rem,3.2vw,3.25rem)] text-white">
              {["FIND YOUR MOMENT.", "OWN YOUR PHOTO."]}
            </SectionHeading>
          </div>
          <div className="flex flex-col justify-end gap-6">
            <motion.p
              className="text-base text-neutral-400 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
              After an event, find your photos, preview every image, and get in touch to acquire your moment. High-resolution delivery coming soon.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            >
              <Button href="/events" size="md">
                OPEN EVENTS
              </Button>
              <Button href="/events" variant="secondary" size="md">
                PREVIEW GALLERY
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Event cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <Link
                href={`/events/${event.slug}`}
                className="group relative block overflow-hidden aspect-[3/4] bg-neutral-900"
              >
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
                    {event.photoCount} Photos
                  </p>
                  <h3 className="font-heading font-bold uppercase text-xl md:text-2xl text-white leading-none tracking-tight">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-xs font-body text-neutral-500">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

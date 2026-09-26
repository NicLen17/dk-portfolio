"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { events as fallbackEvents } from "@/data/events";
import { SanityImage } from "@/components/ui/SanityImage";
import type { SanityEventListItem } from "@/sanity/types";
import { useLanguage } from "@/i18n/LanguageContext";
import { resolveLocale } from "@/lib/locale";

interface EventsContentProps {
  events?: SanityEventListItem[] | null;
}

export function EventsContent({ events }: EventsContentProps) {
  const { lang } = useLanguage();
  const hasSanityEvents = Boolean(events && events.length > 0);

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pt-16 md:pt-24 pb-12">
        <SectionLabel className="mb-4">
          {lang === "ES" ? "Galerías de Clientes" : "Client Galleries"}
        </SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end">
          <SectionHeading className="text-[clamp(2.25rem,4.2vw,4rem)] text-white">
            {lang === "ES" ? "ENCUENTRA TU EVENTO." : "FIND YOUR EVENT."}
          </SectionHeading>
          <p className="text-base text-neutral-400 leading-relaxed max-w-md">
            {lang === "ES"
              ? "Explora un evento, encuentra tus fotos y previsualiza cada captura. Entrega en alta resolución disponible directamente."
              : "Browse an event, find your photos, and preview every image before purchasing. High-resolution delivery available directly."}
          </p>
        </div>
      </div>

      {/* Events grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {hasSanityEvents && events
            ? events.map((event) => {
                const title = resolveLocale(event.title, lang);
                const location = resolveLocale(event.location, lang);
                return (
                  <Link
                    key={event._id}
                    href={`/events/${event.slug}`}
                    className="group relative block overflow-hidden bg-neutral-900 border border-white/10 rounded-xl"
                  >
                    <div className="relative aspect-[3/4]">
                      <SanityImage
                        image={event.coverImage}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-1">
                          {event.photoCount} {lang === "ES" ? "Fotos" : "Photos"} · {location}
                        </p>
                        <h2 className="font-heading font-bold uppercase text-2xl md:text-3xl text-white leading-none tracking-tight">
                          {title}
                        </h2>
                        <p className="mt-2 text-xs font-mono text-neutral-500">
                          {new Date(event.date).toLocaleDateString(
                            lang === "ES" ? "es-ES" : "en-US",
                            { year: "numeric", month: "long" }
                          )}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            : fallbackEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="group relative block overflow-hidden bg-neutral-900 border border-white/10 rounded-xl"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={event.coverImage}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-1">
                        {event.photoCount} {lang === "ES" ? "Fotos" : "Photos"} · {event.location}
                      </p>
                      <h2 className="font-heading font-bold uppercase text-2xl md:text-3xl text-white leading-none tracking-tight">
                        {event.title}
                      </h2>
                      <p className="mt-2 text-xs font-mono text-neutral-500">
                        {new Date(event.date).toLocaleDateString(
                          lang === "ES" ? "es-ES" : "en-US",
                          { year: "numeric", month: "long" }
                        )}
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

"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Lightbox } from "@/components/ui/Lightbox";
import type { GalleryEvent, EventPhoto } from "@/types";

import { useLanguage } from "@/i18n/LanguageContext";

interface EventGalleryClientProps {
  event: GalleryEvent;
}

export function EventGalleryClient({ event }: EventGalleryClientProps) {
  const { lang } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState<EventPhoto | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openPhoto = useCallback((photo: EventPhoto, index: number) => {
    setSelectedPhoto(photo);
    setSelectedIndex(index);
  }, []);

  const closePhoto = useCallback(() => setSelectedPhoto(null), []);

  const prevPhoto = useCallback(() => {
    const newIndex =
      (selectedIndex - 1 + event.photos.length) % event.photos.length;
    setSelectedIndex(newIndex);
    setSelectedPhoto(event.photos[newIndex]);
  }, [selectedIndex, event.photos]);

  const nextPhoto = useCallback(() => {
    const newIndex = (selectedIndex + 1) % event.photos.length;
    setSelectedIndex(newIndex);
    setSelectedPhoto(event.photos[newIndex]);
  }, [selectedIndex, event.photos]);

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pt-16 md:pt-24 pb-10">
        <Link
          href="/events"
          className="text-xs font-body uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors duration-200 mb-8 inline-block"
        >
          {lang === "ES" ? "← Todos los Eventos" : "← All Events"}
        </Link>
        <SectionLabel className="mb-3">
          {event.location} ·{" "}
          {new Date(event.date).toLocaleDateString(lang === "ES" ? "es-ES" : "en-US", {
            year: "numeric",
            month: "long",
          })}
        </SectionLabel>
        <h1 className="font-heading font-bold uppercase text-[clamp(2rem,4.5vw,4rem)] leading-none text-white tracking-tight">
          {event.title}
        </h1>
        <p className="mt-4 text-sm text-neutral-400">
          {event.photoCount} {lang === "ES" ? "Fotos" : "Photos"} · {event.description}
        </p>
        <p className="mt-2 text-xs text-neutral-600">
          {lang === "ES"
            ? "Haz clic en cualquier foto para ver a pantalla completa y adquirir tu captura."
            : "Click any photo to preview full-size and acquire your moment."}
        </p>
      </div>

      {/* Photo grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
          {event.photos.map((photo, i) => (
            <button
              key={photo.id}
              onClick={() => openPhoto(photo, i)}
              className="group relative aspect-square overflow-hidden bg-neutral-900 cursor-pointer"
            >
              <Image
                src={photo.thumbnailSrc}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Watermark overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
                {event.watermark?.imageUrl ? (
                  <div className="relative w-3/5 h-3/5 opacity-30">
                    <Image
                      src={event.watermark.imageUrl}
                      alt="Watermark"
                      fill
                      className="object-contain select-none"
                    />
                  </div>
                ) : (
                  <p
                    style={{ transform: "rotate(-20deg)" }}
                    className="font-heading font-black uppercase text-white/20 text-xl md:text-2xl tracking-widest select-none text-center"
                  >
                    {event.watermark?.text || "DKGRFX"}
                  </p>
                )}
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end justify-start p-3">
                <p className="text-xs font-body text-white/0 group-hover:text-white/60 transition-colors duration-200">
                  #{photo.id}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        photo={selectedPhoto}
        event={event}
        onClose={closePhoto}
        onPrev={prevPhoto}
        onNext={nextPhoto}
        currentIndex={selectedIndex}
        total={event.photos.length}
      />
    </div>
  );
}

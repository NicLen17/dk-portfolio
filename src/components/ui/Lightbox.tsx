"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { EventPhoto, GalleryEvent } from "@/types";
import { buildPhotoRequestMessage } from "@/lib/whatsapp";

interface LightboxProps {
  photo: EventPhoto | null;
  event: GalleryEvent;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  total: number;
}

export function Lightbox({
  photo,
  event,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  total,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (photo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [photo]);

  if (!photo) return null;

  const waURL = buildPhotoRequestMessage(event.title, photo.id);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div>
              <p className="text-xs font-body uppercase tracking-[0.2em] text-neutral-500">
                {event.title}
              </p>
              <p className="text-xs font-body text-neutral-600 mt-0.5">
                {currentIndex + 1} / {total}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white transition-colors duration-200"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Image area */}
          <div
            className="flex-1 relative flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
          >
            {/* Prev button */}
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 md:left-8 z-10 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Previous photo"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Photo with watermark */}
            <motion.div
              key={photo.id}
              className="relative max-w-4xl w-full max-h-[70vh] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1200}
                height={800}
                className="object-contain max-h-[70vh] w-full"
                priority
              />
              {/* Dual Watermark Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6 z-10">
                {event.watermark?.imageUrl ? (
                  <div className="relative w-1/2 h-1/2 opacity-30">
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
                    className="font-heading font-black uppercase text-white/20 text-3xl md:text-5xl lg:text-6xl tracking-widest select-none text-center drop-shadow-lg"
                  >
                    {event.watermark?.text || "DKGRFX"}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 md:right-8 z-10 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Next photo"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Footer — CTA */}
          <div className="px-6 py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-body text-neutral-500">Photo ID: #{photo.id}</p>
              <p className="text-xs font-body text-neutral-600 mt-0.5">
                Preview with watermark · High-res available via purchase
              </p>
            </div>
            <Button href={waURL} variant="primary" size="md" isExternal>
              GET THIS PHOTO →
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

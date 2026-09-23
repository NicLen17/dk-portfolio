"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface PhotoStoryGalleryProps {
  images: string[];
  projectTitle: string;
}

export function PhotoStoryGallery({
  images,
  projectTitle,
}: PhotoStoryGalleryProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! + 1) % images.length);
  }, [activePhotoIndex, images.length]);

  const handlePrev = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! - 1 + images.length) % images.length);
  }, [activePhotoIndex, images.length]);

  const handleClose = useCallback(() => {
    setActivePhotoIndex(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    if (activePhotoIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePhotoIndex, handleClose, handleNext, handlePrev]);

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {images.map((img, i) => (
          <div
            key={img + i}
            onClick={() => setActivePhotoIndex(i)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 group cursor-pointer transition-transform duration-300"
          >
            <Image
              src={img}
              alt={`${projectTitle} — Frame ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest bg-black/80 backdrop-blur-md border border-neutral-700 text-neutral-300 rounded">
                FRAME 0{i + 1}
              </span>
            </div>

            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-white text-black font-bold rounded">
                EXPAND
              </span>
            </div>

            <div className="absolute bottom-3 left-3 z-10">
              <p className="text-xs font-heading font-black uppercase text-white tracking-wider">
                {projectTitle} — Frame 0{i + 1}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex flex-col justify-between select-none"
          onClick={handleClose}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="text-xs font-heading font-black uppercase tracking-widest text-neutral-300">
                {projectTitle}
              </p>
              <p className="text-[11px] font-mono text-neutral-500">
                FRAME {activePhotoIndex + 1} OF {images.length}
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              ✕
            </button>
          </div>

          {/* Center Image */}
          <div
            className="flex-1 relative flex items-center justify-center p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {images.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 md:left-8 z-20 w-12 h-12 rounded-full bg-black/80 border border-neutral-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
                aria-label="Previous Photo"
              >
                ←
              </button>
            )}

            <div className="relative max-w-6xl w-full max-h-[75vh] h-full flex items-center justify-center">
              <Image
                src={images[activePhotoIndex]}
                alt={`${projectTitle} — Full Preview`}
                fill
                priority
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {images.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 md:right-8 z-20 w-12 h-12 rounded-full bg-black/80 border border-neutral-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
                aria-label="Next Photo"
              >
                →
              </button>
            )}
          </div>

          {/* Footer Navigation Tip */}
          <div
            className="px-6 py-4 border-t border-white/10 bg-neutral-950 flex items-center justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-mono text-neutral-400">
              {projectTitle} — High Resolution Gallery
            </p>
            <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
              USE ← → ARROWS · ESC TO CLOSE
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

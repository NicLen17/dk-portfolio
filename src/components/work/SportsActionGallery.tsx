"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export interface SportsPhotoItem {
  src: string;
  alt: string;
  title: string;
  shutter: string;
  aperture: string;
  iso: string;
  focalLength: string;
  syncTag?: string;
  description?: string;
}

interface SportsActionGalleryProps {
  photos: SportsPhotoItem[];
  projectTitle: string;
  bookingUrl: string;
  cameraBody?: string;
  cameraLens?: string;
}

export function SportsActionGallery({
  photos,
  projectTitle,
  bookingUrl,
  cameraBody = "SONY ALPHA 7 IV",
  cameraLens = "FE 70-200MM F/2.8 GM OSS II",
}: SportsActionGalleryProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const activePhoto = activePhotoIndex !== null ? photos[activePhotoIndex] : null;

  const handleNext = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! + 1) % photos.length);
  }, [activePhotoIndex, photos.length]);

  const handlePrev = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! - 1 + photos.length) % photos.length);
  }, [activePhotoIndex, photos.length]);

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
    <div className="w-full space-y-8">
      {/* High-Energy Camera HUD Specs Banner */}
      <div className="relative p-5 sm:p-6 rounded-2xl border border-neutral-800 bg-neutral-950/90 backdrop-blur-md overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Viewfinder indicator & Gear */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-red-500 uppercase font-black">
                  [ HIGH-SPEED SYNC // SPORTS CAPTURE ]
                </span>
                <span className="text-[10px] font-mono text-neutral-600">● 10 FPS RAW</span>
              </div>
              <p className="text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mt-0.5">
                {cameraBody} // {cameraLens}
              </p>
            </div>
          </div>

          {/* Right: Technical Shutter & ISO Tag Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1 rounded bg-neutral-900 border border-neutral-700/60 text-[11px] font-mono text-neutral-300">
              <span className="text-neutral-500 mr-1.5">SHUTTER:</span>
              <span className="text-white font-bold">1/2000s – 1/2500s</span>
            </div>
            <div className="px-3 py-1 rounded bg-neutral-900 border border-neutral-700/60 text-[11px] font-mono text-neutral-300">
              <span className="text-neutral-500 mr-1.5">APERTURE:</span>
              <span className="text-white font-bold">f/2.8 GM</span>
            </div>
            <div className="px-3 py-1 rounded bg-neutral-900 border border-neutral-700/60 text-[11px] font-mono text-neutral-300">
              <span className="text-neutral-500 mr-1.5">ISO:</span>
              <span className="text-white font-bold">1250 – 1600</span>
            </div>
            <div className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-400 font-bold">
              HIGH-SPEED SYNC
            </div>
          </div>
        </div>
      </div>

      {/* Action Grid (High-Energy Dynamic Masonry) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {photos.map((item, index) => {
          const isFeatured = index === 0;
          return (
            <div
              key={item.src + index}
              onClick={() => setActivePhotoIndex(index)}
              className={`relative rounded-xl overflow-hidden bg-neutral-950 group cursor-pointer transition-transform duration-300 ${
                isFeatured ? "md:col-span-2 aspect-[16/10] sm:aspect-[21/10]" : "aspect-[4/3] sm:aspect-[3/2]"
              }`}
            >
              {/* Photo */}
              <Image
                src={item.src}
                alt={item.alt}
                fill
                priority={index < 2}
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes={isFeatured ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Top Camera Metadata Pill */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-neutral-700 text-[11px] font-mono text-neutral-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {item.shutter} · {item.aperture} · ISO {item.iso}
                </span>
              </div>

              {/* Hover Lightbox Indicator */}
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white text-black text-[10px] font-mono font-bold uppercase tracking-wider">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  EXPAND
                </span>
              </div>

              {/* Bottom Caption & Action Title */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h4 className="font-heading font-black uppercase text-xl sm:text-2xl text-white tracking-wide">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-neutral-400 font-body max-w-lg mt-0.5 line-clamp-1 sm:line-clamp-none">
                      {item.description}
                    </p>
                  )}
                </div>
                <span className="text-[11px] font-mono text-neutral-400 self-start sm:self-auto">
                  {item.focalLength}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex flex-col justify-between select-none"
          onClick={handleClose}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <div>
                <p className="text-xs font-heading font-black uppercase tracking-widest text-neutral-300">
                  {projectTitle} // {activePhoto.title}
                </p>
                <p className="text-[11px] font-mono text-neutral-500">
                  FRAME {(activePhotoIndex ?? 0) + 1} OF {photos.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                href={bookingUrl}
                variant="primary"
                size="sm"
                isExternal
              >
                BOOK A SPORTS SESSION →
              </Button>

              <button
                type="button"
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Center: Image & Controls */}
          <div
            className="flex-1 relative flex items-center justify-center p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 md:left-8 z-20 w-12 h-12 rounded-full bg-black/80 border border-neutral-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
              aria-label="Previous Photo"
            >
              ←
            </button>

            {/* Active Image */}
            <div className="relative max-w-6xl w-full max-h-[75vh] h-full flex items-center justify-center">
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                priority
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 md:right-8 z-20 w-12 h-12 rounded-full bg-black/80 border border-neutral-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
              aria-label="Next Photo"
            >
              →
            </button>
          </div>

          {/* Footer EXIF Bar */}
          <div
            className="px-6 py-4 border-t border-white/10 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
              <span className="text-white font-bold">{activePhoto.title}</span>
              <span className="text-neutral-600">|</span>
              <span>⚡ {activePhoto.shutter}</span>
              <span className="text-neutral-600">|</span>
              <span>{activePhoto.aperture}</span>
              <span className="text-neutral-600">|</span>
              <span>ISO {activePhoto.iso}</span>
              <span className="text-neutral-600">|</span>
              <span>{activePhoto.focalLength}</span>
            </div>

            <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
              USE ← → ARROW KEYS TO NAVIGATE · ESC TO CLOSE
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

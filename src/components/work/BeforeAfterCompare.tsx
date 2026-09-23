"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterCompareProps {
  originalImage: string;
  artworkImage: string;
  title: string;
  originalLabel?: string;
  artworkLabel?: string;
  className?: string;
}

export function BeforeAfterCompare({
  originalImage,
  artworkImage,
  title,
  originalLabel = "ORIGINAL REFERENCE PHOTO",
  artworkLabel = "DKGRFX ART COMMISSION",
  className = "",
}: BeforeAfterCompareProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"slider" | "split">("slider");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percent = Math.round((clampedX / rect.width) * 100);
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleDragEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleDragEnd]);

  return (
    <div className={`w-full ${className}`}>
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          {/* 100% Hand Drawn Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-700/80 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-heading font-black tracking-widest text-neutral-200 uppercase">
              100% HAND-DRAWN DIGITAL ART
            </span>
          </div>

          <span className="hidden sm:inline-block text-neutral-600 text-xs font-mono">
            // NO AI FILTERS
          </span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-neutral-900 border border-neutral-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("slider")}
            className={`px-3 py-1 text-xs font-body uppercase tracking-wider rounded transition-all duration-200 cursor-pointer ${
              viewMode === "slider"
                ? "bg-white text-black font-semibold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Interactive Slider
          </button>
          <button
            type="button"
            onClick={() => setViewMode("split")}
            className={`px-3 py-1 text-xs font-body uppercase tracking-wider rounded transition-all duration-200 cursor-pointer ${
              viewMode === "split"
                ? "bg-white text-black font-semibold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Side By Side
          </button>
        </div>
      </div>

      {/* Mode 1: Interactive Drag Slider */}
      {viewMode === "slider" ? (
        <div className="space-y-3">
          <div
            ref={containerRef}
            className="relative w-full aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9] max-h-[700px] overflow-hidden rounded-xl bg-neutral-950 select-none cursor-ew-resize group"
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              handleMove(e.touches[0].clientX);
            }}
          >
            {/* Right side background: DKGRFX ART COMMISSION */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={artworkImage}
                alt={`${title} - Hand-Drawn Art`}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
              <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
                <span className="inline-block px-3 py-1 text-[11px] font-heading font-black tracking-widest uppercase bg-black/80 backdrop-blur-md border border-neutral-700 text-white rounded">
                  {artworkLabel}
                </span>
              </div>
            </div>

            {/* Left side overlay (clipped): ORIGINAL REFERENCE PHOTO */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="relative w-full h-full min-w-full">
                {/* Fixed inner width matching outer container */}
                <div
                  className="absolute inset-0"
                  style={{
                    width: containerRef.current
                      ? `${containerRef.current.clientWidth}px`
                      : "100%",
                  }}
                >
                  <Image
                    src={originalImage}
                    alt={`${title} - Original Reference Photo`}
                    fill
                    priority
                    className="object-cover object-center filter grayscale-[15%]"
                    sizes="(max-width: 1280px) 100vw, 1200px"
                  />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                <span className="inline-block px-3 py-1 text-[11px] font-heading font-black tracking-widest uppercase bg-neutral-950/85 backdrop-blur-md border border-neutral-700 text-neutral-300 rounded">
                  {originalLabel}
                </span>
              </div>
            </div>

            {/* Draggable Divider Handle Line */}
            <div
              className="absolute top-0 bottom-0 z-20 w-1 bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.4)] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-black shadow-xl flex items-center justify-center border-2 border-black">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 9l-4 3 4 3m8-6l4 3-4 3"
                  />
                </svg>
              </div>
            </div>

            {/* Slider hint overlay on initial load */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-80 group-hover:opacity-30 transition-opacity duration-300">
              <span className="px-3 py-1 text-[10px] font-mono tracking-widest uppercase bg-black/70 backdrop-blur-sm border border-white/20 text-neutral-300 rounded-full">
                ↔ DRAG TO COMPARE
              </span>
            </div>
          </div>

          {/* Quick preset buttons below slider */}
          <div className="flex items-center justify-between text-xs text-neutral-500 font-mono pt-1">
            <button
              type="button"
              onClick={() => setSliderPosition(100)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              ← Reveal 100% Original Photo
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(50)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Center 50/50
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(0)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Reveal 100% DK Artwork →
            </button>
          </div>
        </div>
      ) : (
        /* Mode 2: Side By Side View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left: Original Reference Photo */}
          <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden bg-neutral-950 group">
            <Image
              src={originalImage}
              alt={`${title} - Original Reference Photo`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-block px-3 py-1 text-[11px] font-heading font-black tracking-widest uppercase bg-black/85 backdrop-blur-md border border-neutral-700 text-neutral-300 rounded">
                {originalLabel}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <p className="text-xs text-neutral-400 font-body">
                Candid client photo provided as source reference.
              </p>
            </div>
          </div>

          {/* Right: DKGRFX Art Commission */}
          <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden bg-neutral-950 group">
            <Image
              src={artworkImage}
              alt={`${title} - DKGRFX Digital Artwork`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-block px-3 py-1 text-[11px] font-heading font-black tracking-widest uppercase bg-white text-black font-black rounded shadow-md">
                {artworkLabel}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
              <p className="text-xs text-white font-body">
                100% Hand-drawn digital illustration by DKGRFX.
              </p>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded">
                Verified Hand-Drawn
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/components/ui/SanityImage";
import type { SanityHeroSettings, SanityImage as SanityImageType } from "@/sanity/types";

const fallbackSlides = [
  {
    src: "/images/photo-volleyball-jump.jpg",
    alt: "DKGRFX — Sports Photography",
  },
  {
    src: "/images/dk-streetwear-character-foster.jpg",
    alt: "DKGRFX — Digital Art & Character Illustration",
  },
  {
    src: "/images/art-smooch-satt.jpg",
    alt: "DKGRFX — Custom Art Commission",
  },
  {
    src: "/images/photo-jungle-moment.jpg",
    alt: "DKGRFX — Documentary & Lifestyle Photography",
  },
];

interface HeroContentProps {
  heroSettings?: SanityHeroSettings | null;
}

export function HeroContent({ heroSettings }: HeroContentProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sanitySlides = (heroSettings?.slides || []).filter((s) => Boolean(s?.asset));
  const hasSanitySlides = sanitySlides.length > 0;
  const slideCount = hasSanitySlides ? sanitySlides.length : fallbackSlides.length;

  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 6000);
    return () => clearInterval(timer);
  }, [slideCount]);

  const scrollToWork = () => {
    const el = document.getElementById("selected-work");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const headline = heroSettings?.headline || "MAKE THE MOMENT\nFEEL BIGGER.";
  const subheading =
    heroSettings?.subheading || "TURNING MOMENTS, IDEAS & STORIES INTO VISUAL WORK.";
  const badge = heroSettings?.badge || "REAL MOMENTS → ART";
  const tags = heroSettings?.categoryTags?.length
    ? heroSettings.categoryTags
    : ["ART", "DESIGN", "PHOTO"];
  const primaryCta = heroSettings?.primaryCtaText || "EXPLORE THE WORK →";
  const secondaryCta = heroSettings?.secondaryCtaText || "SERVICES & COMMISSIONS";
  const secondaryLink = heroSettings?.secondaryCtaLink || "/services";
  const footerTagline =
    heroSettings?.footerTagline || "ART • DESIGN • PHOTO — ONE CREATIVE IDENTITY";

  return (
    <section className="relative w-full h-screen min-h-[650px] flex items-end overflow-hidden bg-black">
      {/* Background Carousel with Continuous Ken Burns Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div
              key={`zoom-${currentSlide}`}
              className="relative w-full h-full origin-center hero-ken-burns"
            >
              {hasSanitySlides ? (
                <SanityImage
                  image={sanitySlides[currentSlide]}
                  alt={sanitySlides[currentSlide].alt || "DKGRFX Visual Art & Photography"}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="100vw"
                />
              ) : (
                <Image
                  src={fallbackSlides[currentSlide].src}
                  alt={fallbackSlides[currentSlide].alt}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="100vw"
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pb-16 md:pb-24">
        {/* Category tags */}
        <motion.div
          className="flex items-center gap-3 mb-5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {tags.map((tag, i) => (
            <span
              key={tag}
              className="text-xs font-body font-bold uppercase tracking-[0.25em] text-white/90"
            >
              {i > 0 && <span className="mr-3 text-white/40">•</span>}
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Hero Heading */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-heading font-bold uppercase text-[clamp(2.25rem,5.2vw,5rem)] leading-[0.95] text-white max-w-4xl tracking-tight whitespace-pre-line"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
          >
            {headline}
          </motion.h1>
        </div>

        {/* Sub text & CTAs row */}
        <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            className="flex flex-col gap-2 max-w-lg"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className="text-base md:text-lg font-body text-white/90 leading-relaxed font-medium">
              {subheading}
            </p>
            <p className="text-xs font-mono tracking-widest uppercase text-neutral-400">
              {badge}
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <Button onClick={scrollToWork} variant="primary" size="lg">
              {primaryCta}
            </Button>
            <Button href={secondaryLink} variant="secondary" size="lg">
              {secondaryCta}
            </Button>
          </motion.div>
        </div>

        {/* Bottom row: Slide indicators & tagline */}
        <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            {Array.from({ length: slideCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1 transition-all duration-500 rounded-full cursor-pointer ${
                  currentSlide === idx
                    ? "w-8 bg-white"
                    : "w-3 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-white/60 hidden sm:block">
            {footerTagline}
          </p>
        </div>
      </div>
    </section>
  );
}

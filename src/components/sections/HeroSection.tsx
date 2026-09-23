"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

const HERO_SLIDES = [
  {
    src: "/images/photo-volleyball-jump.jpg",
    alt: "DKGRFX — Volleyball Spike Jump",
  },
  {
    src: "/images/photo-jungle-moment.jpg",
    alt: "DKGRFX — Documentary Moment in the Jungle",
  },
  {
    src: "/images/photo-volleyball-blur.jpg",
    alt: "DKGRFX — Sports Action Volleyball",
  },
  {
    src: "/images/photo-beach-lifestyle.jpg",
    alt: "DKGRFX — Lifestyle Portrait Photography",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById("selected-work");
    el?.scrollIntoView({ behavior: "smooth" });
  };

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
              <Image
                src={HERO_SLIDES[currentSlide].src}
                alt={HERO_SLIDES[currentSlide].alt}
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
              />
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
          {["SPORTS", "PORTRAITS", "STORIES"].map((tag, i) => (
            <span
              key={tag}
              className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-white/70"
            >
              {i > 0 && <span className="mr-3 text-white/30">·</span>}
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Hero Heading — Matching reference verbatim */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-heading font-bold uppercase text-[clamp(2.25rem,5.2vw,5rem)] leading-[0.95] text-white max-w-4xl tracking-tight"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
          >
            MAKE THE MOMENT<br />FEEL BIGGER.
          </motion.h1>
        </div>

        {/* Sub text & CTAs row */}
        <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.p
            className="text-base md:text-lg font-body text-white/75 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Bold, high-energy photography built around movement, people, and the moments you don&apos;t get twice.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <Button href="/events" size="lg">
              BROWSE EVENTS →
            </Button>
            <Button onClick={scrollToWork} variant="secondary" size="lg">
              EXPLORE THE WORK
            </Button>
          </motion.div>
        </div>

        {/* Bottom row: Slide indicator indicators & tagline */}
        <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
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

          <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-white/40 hidden sm:block">
            Visual Artist · Designer · Photographer
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

interface WorkCardData {
  id: string;
  index: string;
  title: string;
  category: string;
  meta: string;
  slug: string;
  src: string;
  alt: string;
  aspectClass: string;
  priority?: boolean;
}

// 11 100% UNIQUE assets from the assets directory, arranged for organic visual balance
const galleryWorks: WorkCardData[] = [
  // ── Flow 1: Top left anchors ──
  {
    id: "smooch-satt",
    index: "01",
    title: "Smooch & Satt",
    category: "Art Commission",
    meta: "DIGITAL FINE ART",
    slug: "smooch-and-satt",
    src: "/images/gallery/asset-03-smooch-satt.jpg",
    alt: "Smooch & Satt digital art commission",
    aspectClass: "aspect-[16/11]",
    priority: true,
  },
  {
    id: "dk-streetwear",
    index: "02",
    title: "DK Streetwear",
    category: "Character Art",
    meta: "VECTOR & GRAFFITI",
    slug: "dk-character-art",
    src: "/images/gallery/asset-05-dk-character.jpg",
    alt: "DK character art streetwear illustration",
    aspectClass: "aspect-[3/4]",
    priority: true,
  },
  {
    id: "event-smiles",
    index: "03",
    title: "Event Smiles",
    category: "Events",
    meta: "CANDID MOMENT",
    slug: "event-portraits",
    src: "/images/gallery/asset-02-event-smile.jpg",
    alt: "Candid joyful smile captured at an event",
    aspectClass: "aspect-[4/3]",
  },

  // ── Flow 2: Mid-left athletic & art ──
  {
    id: "fingertip-apex",
    index: "04",
    title: "Fingertip Apex",
    category: "Sports Action",
    meta: "1/2000s HIGH SPEED",
    slug: "volleyball-championship",
    src: "/images/gallery/asset-09-volleyball-setting.jpg",
    alt: "Volleyball setter frozen at peak fingertip release",
    aspectClass: "aspect-[4/5]",
    priority: true,
  },
  {
    id: "father-son-art",
    index: "05",
    title: "Father & Son Art",
    category: "Fine Art Commission",
    meta: "HEIRLOOM PIECE",
    slug: "father-and-son",
    src: "/images/gallery/asset-07-father-son-art.jpg",
    alt: "Father and son art commission illustration",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: "kinetic-blur",
    index: "06",
    title: "Kinetic Motion",
    category: "Sports Photography",
    meta: "MOTION PAN",
    slug: "volleyball-championship",
    src: "/images/gallery/asset-10-volleyball-blur.jpg",
    alt: "Volleyball dynamic kinetic motion blur pan",
    aspectClass: "aspect-[3/4]",
  },

  // ── Flow 3: Documentary & reference ──
  {
    id: "field-stories",
    index: "07",
    title: "Field Stories",
    category: "Documentary",
    meta: "NATURAL LIGHT",
    slug: "field-stories",
    src: "/images/gallery/asset-01-jungle.jpg",
    alt: "Cinematic portrait in jungle light",
    aspectClass: "aspect-[16/11]",
    priority: true,
  },
  {
    id: "father-son-photo",
    index: "08",
    title: "Candid Reference",
    category: "Reference Photo",
    meta: "ORIGINAL MOMENT",
    slug: "father-and-son",
    src: "/images/gallery/asset-06-father-son-photo.jpg",
    alt: "Candid reference photograph of father and son",
    aspectClass: "aspect-[9/16]",
  },
  {
    id: "the-wall",
    index: "09",
    title: "The Wall",
    category: "Sports Action",
    meta: "NET CONTEST",
    slug: "volleyball-championship",
    src: "/images/gallery/asset-11-volleyball-block.jpg",
    alt: "Volleyball net block defense contest",
    aspectClass: "aspect-[4/5]",
  },

  // ── Flow 4: Vertical athletic power & lifestyle ──
  {
    id: "the-attack",
    index: "10",
    title: "The Attack",
    category: "Sports Photography",
    meta: "PEAK VERTICAL",
    slug: "volleyball-championship",
    src: "/images/gallery/asset-08-volleyball-jump.jpg",
    alt: "Volleyball player spike jump mid-air",
    aspectClass: "aspect-[4/5]",
  },
  {
    id: "coastal-rhythm",
    index: "11",
    title: "Coastal Rhythm",
    category: "Lifestyle",
    meta: "DOCUMENTARY",
    slug: "field-stories",
    src: "/images/gallery/asset-04-beach.jpg",
    alt: "Beach lifestyle documentary portrait",
    aspectClass: "aspect-[3/4]",
  },
];

export function SelectedWorkSection() {
  return (
    <section
      id="selected-work"
      className="relative pt-24 pb-8 md:pt-36 md:pb-12 bg-black overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12 md:mb-16 items-end">
          <div>
            <SectionLabel className="mb-4">Selected Work</SectionLabel>
            <SectionHeading className="text-[clamp(1.75rem,3.6vw,3.25rem)] text-white">
              {["THE FRAME AFTER", "THE MOMENT."]}
            </SectionHeading>
          </div>
          <div className="flex flex-col justify-end">
            <motion.p
              className="text-base text-neutral-400 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
              A curated lookbook spanning high-speed sports photography, hand-drawn
              digital art commissions, and raw documentary stories.
            </motion.p>
          </div>
        </div>

        {/* Masonry Showcase Container with strict overflow-hidden clipping */}
        <div className="relative max-h-[760px] sm:max-h-[850px] lg:max-h-[920px] overflow-hidden">
          {/* Multi-column Staggered Masonry (Columns layout without blank gaps) */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 md:gap-5 [column-fill:_balance]">
            {galleryWorks.map((work, i) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                  delay: Math.min(i * 0.05, 0.3),
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="break-inside-avoid mb-4 md:mb-5"
              >
                <Link
                  href={`/work/${work.slug}`}
                  aria-label={`${work.title} — ${work.category}`}
                  className={`group relative block w-full ${work.aspectClass} overflow-hidden bg-neutral-950 transition-transform duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`}
                >
                  {/* Photo / Artwork Asset */}
                  <Image
                    src={work.src}
                    alt={work.alt}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={work.priority}
                  />

                  {/* Ambient Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-75 group-hover:opacity-95 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300" />

                  {/* Top Metadata Pill */}
                  <div className="absolute top-0 inset-x-0 p-3 sm:p-3.5 flex items-center justify-between z-10 pointer-events-none">
                    <span className="font-mono text-[9px] sm:text-[10px] text-neutral-400 group-hover:text-white transition-colors tracking-widest">
                      {work.index} //
                    </span>
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-neutral-300">
                      {work.meta}
                    </span>
                  </div>

                  {/* Bottom Typography Label */}
                  <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 flex flex-col justify-end z-10">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                        {work.category}
                      </p>
                      <span
                        className="text-neutral-400 group-hover:text-white text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </div>

                    <h3 className="font-heading font-black uppercase text-base sm:text-lg lg:text-xl text-white leading-tight tracking-tight">
                      {work.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Absolute bottom fade gradient: seamlessly transitions into solid black at the container's lower edge */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 sm:h-80 md:h-96 bg-gradient-to-t from-black from-35% via-black/90 via-65% to-transparent z-10" />

          {/* CTA Button placed directly over the pure-black base of the fade */}
          <div className="absolute inset-x-0 bottom-8 sm:bottom-12 z-20 flex flex-col items-center justify-center pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <Button
                href="/work"
                variant="secondary"
                size="lg"
                className="bg-black/90 backdrop-blur-md border border-white hover:bg-white hover:text-black shadow-[0_10px_40px_rgba(0,0,0,0.95)] px-10 sm:px-14 py-4 text-xs sm:text-sm font-heading font-black tracking-widest transition-all duration-300"
              >
                VIEW ALL WORK →
              </Button>
              <p className="mt-3 text-[10px] sm:text-[11px] font-body uppercase tracking-[0.25em] text-neutral-400 text-center px-4">
                Explore photography, art & design archive
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

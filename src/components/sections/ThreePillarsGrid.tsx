"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SanityImage } from "@/components/ui/SanityImage";
import type { SanityPracticePillar } from "@/sanity/types";

const fallbackPillars = [
  {
    label: "ART",
    description:
      "Original artwork and custom illustrations that turn real moments and character ideas into visual art.",
    items: [
      "Digital Art",
      "Custom Illustrations",
      "Character Art",
      "Original Artwork",
      "Commissions",
    ],
    image: "/images/art-smooch-satt.jpg",
    href: "/work?category=art",
    tag: "Digital Art · Commissions",
  },
  {
    label: "DESIGN",
    description:
      "High-impact graphic design built for sports, brands, events, and visual campaigns.",
    items: [
      "Sports Graphics",
      "Campaigns",
      "Posters",
      "Social Media",
      "Branding",
      "Event Graphics",
    ],
    image: "/images/photo-volleyball-block.jpg",
    href: "/work?category=design",
    tag: "Graphics · Campaigns · Branding",
  },
  {
    label: "PHOTO",
    description:
      "High-energy photography capturing action, movement, people, and genuine candid moments.",
    items: [
      "Sports",
      "Events",
      "Portraits",
      "Documentary",
      "Lifestyle",
    ],
    image: "/images/photo-beach-lifestyle.jpg",
    href: "/work?category=photo",
    tag: "Sports · Events · Portraits",
  },
];

import { useLanguage } from "@/i18n/LanguageContext";
import { resolveLocale } from "@/lib/locale";

interface ThreePillarsGridProps {
  pillars?: SanityPracticePillar[] | null;
}

export function ThreePillarsGrid({ pillars }: ThreePillarsGridProps) {
  const { lang, t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  useInView(ref, { once: true, margin: "-15%" });

  const dynamicFallbackPillars = [
    {
      label: t.pillars.artTitle,
      description: t.pillars.artDesc,
      items: t.pillars.artItems,
      image: "/images/art-smooch-satt.jpg",
      href: "/work?category=art",
      tag: t.pillars.artTag,
    },
    {
      label: t.pillars.designTitle,
      description: t.pillars.designDesc,
      items: t.pillars.designItems,
      image: "/images/photo-volleyball-block.jpg",
      href: "/work?category=design",
      tag: t.pillars.designTag,
    },
    {
      label: t.pillars.photoTitle,
      description: t.pillars.photoDesc,
      items: t.pillars.photoItems,
      image: "/images/photo-beach-lifestyle.jpg",
      href: "/work?category=photo",
      tag: t.pillars.photoTag,
    },
  ];

  const hasSanityPillars = Boolean(pillars && pillars.length > 0);

  return (
    <section className="py-24 md:py-36 bg-neutral-950" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionLabel className="mb-12 md:mb-16">{t.pillars.sectionLabel}</SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {hasSanityPillars && pillars
            ? pillars.map((pillar, i) => {
                const title = resolveLocale(pillar.title, lang) || (pillar.category || "art").toUpperCase();
                const tagline = resolveLocale(pillar.tagline, lang);
                const description = resolveLocale(pillar.description, lang);
                const label = (pillar.category || "art").toUpperCase();
                const href = `/work?category=${pillar.category}`;
                return (
                  <motion.div
                    key={pillar._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                  >
                    <Link href={href} className="group flex flex-col bg-black h-full">
                      {/* Image */}
                      <div className="relative overflow-hidden aspect-[4/3]">
                        {pillar.image ? (
                          <SanityImage
                            image={pillar.image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-900" />
                        )}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-1">
                            {label}
                          </p>
                          <h3 className="font-heading font-bold uppercase text-2xl sm:text-3xl lg:text-3xl text-white tracking-tight">
                            {title}
                          </h3>
                        </div>
                      </div>

                      {/* Text */}
                      <div className="p-6 md:p-8 flex flex-col gap-4 flex-1">
                        {tagline && (
                          <p className="text-xs font-body uppercase tracking-[0.2em] text-neutral-500">
                            {tagline}
                          </p>
                        )}
                        <p className="text-sm font-body text-neutral-400 leading-relaxed">
                          {description}
                        </p>
                        <p className="mt-auto text-xs font-body font-semibold uppercase tracking-[0.15em] text-white/60 group-hover:text-white transition-colors duration-200">
                          {t.pillars.exploreLink} {label} →
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })
            : dynamicFallbackPillars.map((pillar, i) => (
                <motion.div
                  key={pillar.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                >
                  <Link href={pillar.href} className="group flex flex-col bg-black h-full">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <Image
                        src={pillar.image}
                        alt={pillar.label}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-heading font-bold uppercase text-2xl sm:text-3xl lg:text-3xl text-white tracking-tight">
                          {pillar.label}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col gap-4 flex-1">
                      <p className="text-xs font-body uppercase tracking-[0.2em] text-neutral-500">
                        {pillar.tag}
                      </p>
                      <p className="text-sm font-body text-neutral-400 leading-relaxed">
                        {pillar.description}
                      </p>

                      {/* Explicit Items List */}
                      <ul className="space-y-1.5 pt-2 border-t border-white/10">
                        {pillar.items.map((item) => (
                          <li key={item} className="text-xs text-neutral-300 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-white/40" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <p className="mt-auto pt-4 text-xs font-body font-semibold uppercase tracking-[0.15em] text-white/60 group-hover:text-white transition-colors duration-200">
                        EXPLORE {pillar.label} →
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

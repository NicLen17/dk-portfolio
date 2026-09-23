"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

const pillars = [
  {
    label: "ART",
    description:
      "Custom illustrations, character art, digital commissions, and original artwork — turning real moments into visual stories.",
    image: "/images/art-smooch-satt.jpg",
    href: "/work?category=art",
    tag: "Illustrations · Commissions",
  },
  {
    label: "DESIGN",
    description:
      "Sports graphics, campaigns, posters, and social media visuals — combining photography with bold graphic design.",
    image: "/images/photo-volleyball-block.jpg",
    href: "/work?category=design",
    tag: "Sports · Campaigns · Branding",
  },
  {
    label: "PHOTO",
    description:
      "High-energy photography built around movement, people, and the moments you don't get twice.",
    image: "/images/photo-beach-lifestyle.jpg",
    href: "/work?category=photo",
    tag: "Sports · Events · Portraits",
  },
];

export function ThreePillarsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section className="py-24 md:py-36 bg-neutral-950" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionLabel className="mb-12 md:mb-16">The Practice</SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <Link
                href={pillar.href}
                className="group flex flex-col bg-black h-full"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={pillar.image}
                    alt={pillar.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                  {/* Pillar label overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading font-bold uppercase text-2xl sm:text-3xl lg:text-3xl text-white tracking-tight">
                      {pillar.label}
                    </h3>
                  </div>
                </div>

                {/* Text */}
                <div className="p-6 md:p-8 flex flex-col gap-3 flex-1">
                  <p className="text-xs font-body uppercase tracking-[0.2em] text-neutral-500">
                    {pillar.tag}
                  </p>
                  <p className="text-sm font-body text-neutral-400 leading-relaxed">
                    {pillar.description}
                  </p>
                  <p className="mt-auto text-xs font-body font-semibold uppercase tracking-[0.15em] text-white/60 group-hover:text-white transition-colors duration-200">
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

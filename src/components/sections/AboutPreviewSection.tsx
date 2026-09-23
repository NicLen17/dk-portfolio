"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { buildGeneralWhatsAppURL } from "@/lib/whatsapp";

const PRACTICE_WORDS = [
  {
    text: "ART.",
    className:
      "font-heading font-black italic text-[clamp(3.5rem,11vw,6rem)] tracking-[0.12em] sm:tracking-[0.16em] leading-[0.82]",
  },
  {
    text: "DESIGN.",
    className:
      "font-body font-semibold text-[clamp(2.15rem,6.8vw,4.15rem)] tracking-[0.18em] sm:tracking-[0.32em] leading-[0.9] text-white/85 pl-4 sm:pl-10",
  },
  {
    text: "PHOTO.",
    className:
      "font-heading font-extrabold text-[clamp(2.85rem,8.4vw,5.15rem)] tracking-[0.16em] sm:tracking-[0.24em] leading-[0.84]",
  },
] as const;

const lineVariant = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function AboutPreviewSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section className="py-24 md:py-36 bg-black" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-6 min-w-0">
            <SectionLabel className="mb-6">About DKGRFX</SectionLabel>
            <motion.h2
              className="uppercase text-white"
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
              }}
            >
              {PRACTICE_WORDS.map((word) => (
                <span key={word.text} className="block overflow-hidden">
                  <motion.span className={`block ${word.className}`} variants={lineVariant}>
                    {word.text}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
          </div>

          <motion.div
            className="lg:col-span-6 flex flex-col gap-6 lg:pt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
              DKGRFX is an independent visual art and design practice built around one idea: turning moments, ideas, people, and stories into visual work.
            </p>
            <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
              Working across photography, digital art, and graphic design, DKGRFX explores different mediums without being limited to one style. From capturing the intensity of a game to creating an illustration or designing a campaign — every project is an opportunity to create something worth remembering.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <Button href="/about" variant="secondary" size="md">
                ABOUT DKGRFX
              </Button>
              <Button
                href={buildGeneralWhatsAppURL()}
                variant="ghost"
                size="md"
                isExternal
              >
                WORK WITH ME
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { buildServiceInquiryMessage } from "@/lib/whatsapp";

const commissionInputs = [
  "📸 A Photograph",
  "💡 An Idea or Concept",
  "👥 Person / Couple / Family",
  "🧢 Character Concept",
  "⚡ A Sports Moment",
];

const steps = [
  { number: "01", label: "Send your reference photo, idea, or sports moment" },
  { number: "02", label: "Select style, format, and custom details" },
  { number: "03", label: "DKGRFX reviews and crafts line art & digital coloring" },
  { number: "04", label: "Receive your custom 100% hand-drawn digital artwork" },
];

export function CommissionsSection() {
  const ref = useRef<HTMLDivElement>(null);
  useInView(ref, { once: true, margin: "-15%" });

  return (
    <section className="py-24 md:py-36 bg-neutral-950 border-t border-white/10" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Images: Reference Photo -> Art Commission Transformation */}
          <motion.div
            className="grid grid-cols-2 gap-4 md:gap-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          >
            {/* Reference photo */}
            <div className="relative aspect-[3/4] overflow-hidden group border border-white/10 rounded-xl">
              <Image
                src="/images/commission-photo-father-son.jpg"
                alt="Client reference photo — Father and Son"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-neutral-300">
                  REFERENCE PHOTO
                </span>
              </div>
            </div>

            {/* Final artwork */}
            <div className="relative aspect-[3/4] overflow-hidden group border border-white/20 rounded-xl mt-8 shadow-2xl">
              <Image
                src="/images/commission-art-father-son.jpg"
                alt="Finished DKGRFX digital illustration — Father and Son"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute top-3 left-3 bg-white text-black px-3 py-1 rounded-full font-bold shadow-lg">
                <span className="text-[10px] font-body uppercase tracking-[0.2em]">
                  DKGRFX ART
                </span>
              </div>
            </div>
          </motion.div>

          {/* Text & Interactive Options */}
          <div>
            <SectionLabel className="mb-4">Custom Artwork & Commissions</SectionLabel>
            <SectionHeading className="text-[clamp(1.75rem,3.2vw,3.25rem)] text-white mb-6">
              {["TURN YOUR MOMENT", "INTO ART."]}
            </SectionHeading>

            <motion.p
              className="text-base text-neutral-300 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
              Custom artwork is a central part of DKGRFX. You bring the reference or idea — DKGRFX turns it into lasting digital illustration with signature style.
            </motion.p>

            {/* What you can bring grid */}
            <div className="mb-8">
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                YOU CAN SEND ME:
              </p>
              <div className="flex flex-wrap gap-2">
                {commissionInputs.map((input) => (
                  <span
                    key={input}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-body text-neutral-200"
                  >
                    {input}
                  </span>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-4 mb-10 border-t border-white/10 pt-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                >
                  <span className="font-heading text-xl font-black text-neutral-500 flex-shrink-0 w-8">
                    {step.number}
                  </span>
                  <p className="text-sm font-body text-neutral-300 leading-relaxed pt-0.5">
                    {step.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            >
              <Button
                href={buildServiceInquiryMessage("Art Commission")}
                variant="primary"
                size="lg"
                isExternal
              >
                START A CUSTOM COMMISSION →
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

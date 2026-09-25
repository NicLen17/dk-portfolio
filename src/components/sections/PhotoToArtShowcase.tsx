"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/components/ui/SanityImage";
import type { SanityCreativeSignature, SanityImage as SanityImageType } from "@/sanity/types";

interface ProcessStepData {
  id: "photo" | "sketch" | "art";
  stepNumber: string;
  badge: string;
  title: string;
  description: string;
  tagline: string;
  staticImage?: string;
  sanityImage?: SanityImageType;
}

const defaultSteps: ProcessStepData[] = [
  {
    id: "photo",
    stepNumber: "01",
    badge: "STEP 1: REFERENCE PHOTO",
    title: "Real Photograph / Moment",
    description:
      "Every piece starts with reality — a candid photograph, a sports action shot, a family moment, or an idea provided by the client.",
    staticImage: "/images/commission-photo-father-son.jpg",
    tagline: "The Reference Point",
  },
  {
    id: "sketch",
    stepNumber: "02",
    badge: "STEP 2: SKETCH & LINEWORK",
    title: "Digital Sketch & Linework",
    description:
      "Defining the silhouette, expressive lines, composition, and dynamic elements. Translating real physics into hand-drawn digital vectors.",
    staticImage: "/images/commission-art-father-son.jpg",
    tagline: "The Creative Translation",
  },
  {
    id: "art",
    stepNumber: "03",
    badge: "STEP 3: FINAL ARTWORK",
    title: "100% Hand-Drawn DK Artwork",
    description:
      "Applying vibrant coloring, lighting, textures, and the signature DKGRFX identity. A lasting piece of visual art built from a real moment.",
    staticImage: "/images/commission-art-father-son.jpg",
    tagline: "REAL MOMENTS → ART",
  },
];

interface PhotoToArtShowcaseProps {
  data?: SanityCreativeSignature | null;
}

export function PhotoToArtShowcase({ data }: PhotoToArtShowcaseProps) {
  const [activeStep, setActiveStep] = useState<"photo" | "sketch" | "art">("art");

  const sectionLabel = data?.sectionLabel || "Creative Signature";
  const headingLine1 = data?.headingLine1 || "PHOTO → SKETCH →";
  const headingLine2 = data?.headingLine2 || "FINAL ART";
  const sectionDescription =
    data?.description ||
    "Taking real moments, sports highlights, portraits, or raw ideas and transforming them into signature digital artwork.";

  const ctaText = data?.ctaText || "COMMISSION YOUR MOMENT →";
  const ctaLink = data?.ctaLink || "/services";

  // Build resolved steps with Sanity or default data
  const steps: ProcessStepData[] = [
    {
      id: "photo",
      stepNumber: "01",
      badge: data?.step1?.badge || defaultSteps[0].badge,
      title: data?.step1?.title || defaultSteps[0].title,
      tagline: data?.step1?.tagline || defaultSteps[0].tagline,
      description: data?.step1?.description || defaultSteps[0].description,
      sanityImage: data?.step1?.image?.asset ? data.step1.image : undefined,
      staticImage: defaultSteps[0].staticImage,
    },
    {
      id: "sketch",
      stepNumber: "02",
      badge: data?.step2?.badge || defaultSteps[1].badge,
      title: data?.step2?.title || defaultSteps[1].title,
      tagline: data?.step2?.tagline || defaultSteps[1].tagline,
      description: data?.step2?.description || defaultSteps[1].description,
      sanityImage: data?.step2?.image?.asset ? data.step2.image : undefined,
      staticImage: defaultSteps[1].staticImage,
    },
    {
      id: "art",
      stepNumber: "03",
      badge: data?.step3?.badge || defaultSteps[2].badge,
      title: data?.step3?.title || defaultSteps[2].title,
      tagline: data?.step3?.tagline || defaultSteps[2].tagline,
      description: data?.step3?.description || defaultSteps[2].description,
      sanityImage: data?.step3?.image?.asset ? data.step3.image : undefined,
      staticImage: defaultSteps[2].staticImage,
    },
  ];

  const current = steps.find((s) => s.id === activeStep) || steps[2];

  return (
    <section className="py-24 md:py-36 bg-black border-t border-white/10 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header with 2-line balanced typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <SectionLabel className="mb-4">{sectionLabel}</SectionLabel>
            <SectionHeading className="text-[clamp(1.75rem,3.2vw,3.25rem)] text-white tracking-tight">
              {[headingLine1, headingLine2]}
            </SectionHeading>
          </div>
          <p className="text-sm md:text-base text-neutral-400 max-w-md leading-relaxed">
            {sectionDescription}
          </p>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-12 border-b border-white/10 pb-6">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 p-3 md:p-4 rounded-xl transition-all duration-300 text-left cursor-pointer border ${
                  isActive
                    ? "bg-white/10 border-white/30 text-white shadow-lg"
                    : "bg-neutral-950/50 border-white/5 text-neutral-500 hover:text-neutral-300 hover:border-white/15"
                }`}
              >
                <span
                  className={`font-heading font-black text-xl md:text-2xl ${
                    isActive ? "text-white" : "text-neutral-600"
                  }`}
                >
                  {step.stepNumber}
                </span>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider font-bold">
                    {step.id.toUpperCase()}
                  </p>
                  <p className="text-[11px] text-neutral-400 hidden sm:block">
                    {step.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Showcase Interactive Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-950 border border-white/10 rounded-2xl p-6 md:p-10">
          {/* Image Display */}
          <div className="lg:col-span-7 relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-xl bg-black border border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full"
              >
                {current.sanityImage ? (
                  <SanityImage
                    image={current.sanityImage}
                    alt={current.title}
                    fill
                    className={`object-cover ${
                      activeStep === "sketch"
                        ? "filter contrast-150 grayscale invert opacity-90"
                        : activeStep === "photo"
                        ? "filter grayscale-[20%]"
                        : ""
                    }`}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority
                  />
                ) : current.staticImage ? (
                  <Image
                    src={current.staticImage}
                    alt={current.title}
                    fill
                    className={`object-cover ${
                      activeStep === "sketch"
                        ? "filter contrast-150 grayscale invert opacity-90"
                        : activeStep === "photo"
                        ? "filter grayscale-[20%]"
                        : ""
                    }`}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-900" />
                )}
                <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase">
                    {current.badge}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Text Description */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                // {current.tagline}
              </span>
              <h3 className="font-heading font-bold text-2xl md:text-4xl text-white uppercase mt-1 tracking-tight">
                {current.title}
              </h3>
            </div>

            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              {current.description}
            </p>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                100% Hand-Drawn Digital Illustration Process
              </div>
              <div className="flex items-center gap-3">
                <Button href={ctaLink} variant="primary" size="md">
                  {ctaText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

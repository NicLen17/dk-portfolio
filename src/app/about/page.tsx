import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { buildGeneralWhatsAppURL } from "@/lib/whatsapp";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the Artist & Practice",
  description:
    "DKGRFX is an independent visual art and design practice by Darwin. Turning real moments, ideas, people, and stories into lasting visual work. REAL MOMENTS → ART.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About the Artist & Practice | DKGRFX",
    description:
      "DKGRFX is an independent visual art and design practice by Darwin. Turning real moments, ideas, people, and stories into lasting visual work.",
    url: "https://dkgrfx.com/about",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About the Artist & Practice | DKGRFX",
    description:
      "DKGRFX is an independent visual art and design practice by Darwin. Turning real moments, ideas, people, and stories into lasting visual work.",
  },
};

export default function AboutPage() {
  const waURL = buildGeneralWhatsAppURL();

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pt-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left — Big heading */}
          <div>
            <SectionLabel className="mb-6">About DKGRFX</SectionLabel>
            <SectionHeading
              className="text-[clamp(2.5rem,5vw,5rem)] text-white"
            >
              {["ART.", "DESIGN.", "PHOTO."]}
            </SectionHeading>
            <p className="mt-4 text-xs font-mono tracking-widest uppercase text-neutral-400">
              MANY MEDIUMS — ONE CREATIVE IDENTITY
            </p>
          </div>

          {/* Right — Bio */}
          <div className="flex flex-col gap-6 md:pt-8">
            <p className="text-base md:text-lg text-neutral-200 leading-relaxed font-medium">
              DKGRFX is an independent creative practice working across photography, graphic design, and custom artwork.
            </p>
            <p className="text-base text-neutral-400 leading-relaxed">
              I don&apos;t want to be boxed into just one medium. Whether it&apos;s capturing an intense sports play, designing a matchday campaign, or crafting a custom digital illustration, everything carries the same creative identity and standard of visual excellence.
            </p>
            <p className="text-base text-neutral-400 leading-relaxed">
              Working internationally — with strong roots in Bolivia, Latin America, and worldwide client projects — DKGRFX is built around taking real moments, ideas, and stories, and elevating them into lasting visual work.
            </p>

            <blockquote className="border-l border-white/30 pl-5 my-4">
              <p className="font-heading text-2xl font-bold uppercase text-white tracking-tight">
                REAL MOMENTS → ART
              </p>
            </blockquote>

            <div className="flex flex-wrap gap-3 mt-4">
              <Button href={waURL} variant="primary" size="lg" isExternal>
                WORK WITH ME →
              </Button>
              <Button
                href="https://www.instagram.com/dkgrfx"
                variant="secondary"
                size="lg"
                isExternal
              >
                @DKGRFX
              </Button>
            </div>
          </div>
        </div>

        {/* What DKGRFX does */}
        <div className="py-24 md:py-32 border-t border-white/10 mt-20">
          <SectionLabel className="mb-12">The Three Pillars</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {[
              {
                label: "ART",
                desc: "Digital art, custom illustrations, character design, original artwork, and commissions. Transforming photographs and ideas into fine digital art.",
              },
              {
                label: "DESIGN",
                desc: "Sports graphics, game-day posters, brand campaigns, social media graphics, and event identity systems built for maximum visual impact.",
              },
              {
                label: "PHOTO",
                desc: "Action sports, tournaments, portraits, documentary, and lifestyle photography centered on human energy and authentic moments.",
              },
            ].map((pillar) => (
              <div key={pillar.label} className="flex flex-col gap-3">
                <h3 className="font-heading font-bold uppercase text-2xl md:text-3xl lg:text-4xl text-white tracking-tight">
                  {pillar.label}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle Equipment & Setup Note */}
        <div className="py-12 border-t border-white/10 bg-neutral-950/60 rounded-xl p-8 my-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                // SUBTLE GEAR & CREATIVE SETUP
              </p>
              <h4 className="font-heading font-bold text-lg text-white uppercase">
                TOOLS OF THE CRAFT
              </h4>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-neutral-300">
              <div>
                <span className="text-neutral-500 block text-[10px]">CAMERA BODY</span>
                Sony ZV-E10 II
              </div>
              <div className="h-6 w-px bg-white/10 hidden sm:block" />
              <div>
                <span className="text-neutral-500 block text-[10px]">PRIMARY LENS</span>
                Tamron 17-70mm F/2.8
              </div>
              <div className="h-6 w-px bg-white/10 hidden sm:block" />
              <div>
                <span className="text-neutral-500 block text-[10px]">DIGITAL CANVAS</span>
                Hand-Drawn Vector Stylus & Suite
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="font-heading font-bold uppercase text-2xl md:text-3xl lg:text-4xl text-white tracking-tight">
            LET'S CREATE SOMETHING.
          </h2>
          <Button href={waURL} variant="primary" size="lg" isExternal>
            GET IN TOUCH →
          </Button>
        </div>

        <div className="pb-16" />
      </div>
    </div>
  );
}

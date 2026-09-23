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
          </div>

          {/* Right — Bio */}
          <div className="flex flex-col gap-6 md:pt-16">
            <p className="text-base md:text-lg text-neutral-300 leading-relaxed">
              DKGRFX is an independent visual art and design practice built around one idea: turning moments, ideas, people, and stories into visual work.
            </p>
            <p className="text-base text-neutral-400 leading-relaxed">
              Working across photography, digital art, and graphic design, DKGRFX explores different mediums without being limited to one style.
            </p>
            <p className="text-base text-neutral-400 leading-relaxed">
              From capturing the intensity of a game to creating an illustration, designing a campaign, or developing an original artwork — every project is an opportunity to create something worth remembering.
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
                desc: "Illustration, digital artwork, character art, commissions, and original pieces. Real photographs transformed into lasting visual art.",
              },
              {
                label: "DESIGN",
                desc: "Sports graphics, posters, campaigns, social media visuals. Bold design that combines photography with graphic impact.",
              },
              {
                label: "PHOTO",
                desc: "Sports, events, portraits, lifestyle, documentary. Photography built around movement, people, and the moments you don't get twice.",
              },
            ].map((pillar) => (
              <div key={pillar.label}>
                <h3 className="font-heading font-bold uppercase text-2xl md:text-3xl lg:text-4xl text-white mb-4 tracking-tight">
                  {pillar.label}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
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

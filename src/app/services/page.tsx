import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/components/ui/SanityImage";
import { services as fallbackServices } from "@/data/services";
import { prints as fallbackPrints } from "@/data/prints";
import {
  buildServiceInquiryMessage,
  buildBookingMessage,
  buildPrintInquiryMessage,
} from "@/lib/whatsapp";
import { sanityFetch } from "@/sanity/fetch";
import { SERVICES_QUERY, PRINTS_QUERY } from "@/sanity/queries";
import type { SanityService, SanityPrintArtwork } from "@/sanity/types";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Custom Commissions",
  description:
    "Professional sports photography, digital illustration commissions, and graphic design packages by DKGRFX. Book a photoshoot or commission custom art.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services & Custom Commissions | DKGRFX",
    description:
      "Professional sports photography, digital illustration commissions, and graphic design packages by DKGRFX. Book a photoshoot or commission custom art.",
    url: "https://dkgrfx.com/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Custom Commissions | DKGRFX",
    description:
      "Professional sports photography, digital illustration commissions, and graphic design packages by DKGRFX.",
  },
};

import { resolveLocale } from "@/lib/locale";

export default async function ServicesPage() {
  const sanityServices = await sanityFetch<SanityService[]>({
    query: SERVICES_QUERY,
    tags: ["service"],
    revalidate: 60,
  });

  const sanityPrints = await sanityFetch<SanityPrintArtwork[]>({
    query: PRINTS_QUERY,
    tags: ["printArtwork"],
    revalidate: 60,
  });

  const displayServices =
    sanityServices && sanityServices.length > 0
      ? sanityServices.map((s) => ({
          id: s._id,
          title: resolveLocale(s.title, "EN"),
          category: s.category,
          description: resolveLocale(s.description, "EN"),
          items: (s.items || []).map((item) => resolveLocale(item, "EN")),
          cta: resolveLocale(s.cta, "EN") || "START A PROJECT",
          ctaService: s.ctaService || resolveLocale(s.title, "EN"),
        }))
      : fallbackServices;

  const hasSanityPrints = Boolean(sanityPrints && sanityPrints.length > 0);

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pt-16 md:pt-24 pb-16">
        <SectionLabel className="mb-4">Services</SectionLabel>
        <SectionHeading className="text-[clamp(2.25rem,4.2vw,4rem)] text-white">
          {"WHAT DKGRFX DOES."}
        </SectionHeading>
      </div>

      {/* Services Grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 mb-24">
          {displayServices.map((service) => (
            <div key={service.id} className="bg-black p-8 md:p-10 flex flex-col gap-6">
              <div>
                <SectionLabel className="mb-3">
                  {service.category.toUpperCase()}
                </SectionLabel>
                <h2 className="font-heading font-bold uppercase text-2xl md:text-3xl text-white leading-none tracking-tight">
                  {service.title}
                </h2>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {service.description}
              </p>
              {service.items && service.items.length > 0 && (
                <ul className="flex flex-col gap-2">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm font-body text-neutral-400"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto pt-4">
                <Button
                  href={
                    service.category === "photo" && service.id.startsWith("s1")
                      ? buildBookingMessage(service.title)
                      : buildServiceInquiryMessage(service.ctaService)
                  }
                  variant="primary"
                  size="md"
                  isExternal
                >
                  {service.cta} →
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Art Prints (Own the Art) */}
        <div className="py-24 border-t border-white/10">
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end">
            <div>
              <SectionLabel className="mb-4">Art Prints</SectionLabel>
              <SectionHeading className="text-[clamp(1.75rem,3.2vw,3.25rem)] text-white">
                {"OWN THE ART."}
              </SectionHeading>
            </div>
            <p className="text-base text-neutral-400 leading-relaxed">
              Original DKGRFX artworks available as high-quality prints. Commission a custom piece or choose from existing works. Worldwide shipping coming soon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {hasSanityPrints && sanityPrints
              ? sanityPrints.map((print) => {
                  const title = resolveLocale(print.title, "EN");
                  const badge = resolveLocale(print.badge, "EN");
                  const description = resolveLocale(print.description, "EN");
                  return (
                    <div key={print._id} className="group">
                      <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-neutral-900">
                        {print.image ? (
                          <SanityImage
                            image={print.image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-900" />
                        )}
                        {badge && (
                          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full">
                            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-300">
                              {badge}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="font-heading font-bold uppercase text-xl text-white tracking-tight">
                          {title}
                        </h3>
                        {print.sizes && print.sizes.length > 0 && (
                          <p className="text-xs text-neutral-500">
                            {print.sizes.join(" · ")}
                          </p>
                        )}
                        <p className="text-sm text-neutral-400 leading-relaxed">
                          {description}
                        </p>
                        <div className="mt-3">
                          <Button
                            href={buildPrintInquiryMessage(title)}
                            variant="secondary"
                            size="sm"
                            isExternal
                          >
                            GET PRINT →
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : fallbackPrints.map((print) => (
                  <div key={print.id} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-neutral-900">
                      <Image
                        src={print.image}
                        alt={print.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      {print.badge && (
                        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full">
                          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-300">
                            {print.badge}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-heading font-bold uppercase text-xl text-white tracking-tight">
                        {print.title}
                      </h3>
                      <p className="text-xs text-neutral-500">
                        {print.sizes.join(" · ")}
                      </p>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {print.description}
                      </p>
                      <div className="mt-3">
                        <Button
                          href={buildPrintInquiryMessage(print.title)}
                          variant="secondary"
                          size="sm"
                          isExternal
                        >
                          GET PRINT →
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Book Photography CTA */}
        <div className="py-24 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <SectionLabel className="mb-4">Photography Booking</SectionLabel>
              <SectionHeading className="text-[clamp(1.75rem,3.2vw,3.25rem)] text-white">
                {"BOOK DKGRFX."}
              </SectionHeading>
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-base text-neutral-400 leading-relaxed">
                Sports events, tournaments, portraits, community events, lifestyle sessions. High-energy photography that captures real moments.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  href={buildBookingMessage("Photography Session")}
                  variant="primary"
                  size="lg"
                  isExternal
                >
                  BOOK NOW →
                </Button>
                <Button href="/work?category=photo" variant="secondary" size="lg">
                  VIEW PHOTO WORK
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-16" />
      </div>
    </div>
  );
}

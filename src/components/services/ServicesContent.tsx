"use client";

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
import type { SanityService, SanityPrintArtwork } from "@/sanity/types";
import { useLanguage } from "@/i18n/LanguageContext";
import { resolveLocale } from "@/lib/locale";

interface ServicesContentProps {
  services?: SanityService[] | null;
  prints?: SanityPrintArtwork[] | null;
}

export function ServicesContent({ services, prints }: ServicesContentProps) {
  const { lang, t } = useLanguage();

  const displayServices =
    services && services.length > 0
      ? services.map((s) => ({
          id: s._id,
          title: resolveLocale(s.title, lang),
          category: s.category,
          description: resolveLocale(s.description, lang),
          items: (s.items || []).map((item) => resolveLocale(item, lang)),
          cta: resolveLocale(s.cta, lang) || (lang === "ES" ? "INICIAR UN PROYECTO" : "START A PROJECT"),
          ctaService: s.ctaService || resolveLocale(s.title, lang),
        }))
      : fallbackServices.map((s) => ({
          ...s,
          title: s.title,
          description: s.description,
          items: s.items,
        }));

  const hasSanityPrints = Boolean(prints && prints.length > 0);

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pt-16 md:pt-24 pb-16">
        <SectionLabel className="mb-4">
          {lang === "ES" ? "Servicios" : "Services"}
        </SectionLabel>
        <SectionHeading className="text-[clamp(2.25rem,4.2vw,4rem)] text-white">
          {lang === "ES" ? "LO QUE DKGRFX HACE." : "WHAT DKGRFX DOES."}
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
                  {service.items.map((item, idx) => (
                    <li
                      key={idx}
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
                    service.category === "photo" && service.id.includes("photo")
                      ? buildBookingMessage(service.title, lang)
                      : buildServiceInquiryMessage(service.ctaService, lang)
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
              <SectionLabel className="mb-4">
                {lang === "ES" ? "Láminas de Arte & Merch" : "Art Prints"}
              </SectionLabel>
              <SectionHeading className="text-[clamp(1.75rem,3.2vw,3.25rem)] text-white">
                {lang === "ES" ? "CONSERVA EL ARTE." : "OWN THE ART."}
              </SectionHeading>
            </div>
            <p className="text-base text-neutral-400 leading-relaxed">
              {lang === "ES"
                ? "Obras de arte originales de DKGRFX disponibles como impresiones de alta calidad. Encarga una pieza personalizada o elige obras existentes. Envíos a todo el mundo."
                : "Original DKGRFX artworks available as high-quality prints. Commission a custom piece or choose from existing works. Worldwide shipping coming soon."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {hasSanityPrints && prints
              ? prints.map((print) => {
                  const title = resolveLocale(print.title, lang);
                  const badge = resolveLocale(print.badge, lang);
                  const description = resolveLocale(print.description, lang);
                  return (
                    <div key={print._id} className="group">
                      <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-neutral-900 border border-white/10 rounded-lg">
                        {print.image ? (
                          <SanityImage
                            image={print.image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 25vw"
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
                        <h3 className="font-heading font-bold uppercase text-lg text-white tracking-tight">
                          {title}
                        </h3>
                        {print.sizes && print.sizes.length > 0 && (
                          <p className="text-xs text-neutral-500 font-mono">
                            {print.sizes.join(" · ")}
                          </p>
                        )}
                        <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3">
                          {description}
                        </p>
                        <div className="mt-2">
                          <Button
                            href={buildPrintInquiryMessage(title, lang)}
                            variant="secondary"
                            size="sm"
                            isExternal
                          >
                            {lang === "ES" ? "PEDIR LÁMINA →" : "GET PRINT →"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : fallbackPrints.map((print) => (
                  <div key={print.id} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-neutral-900 border border-white/10 rounded-lg">
                      <Image
                        src={print.image}
                        alt={print.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 25vw"
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
                      <h3 className="font-heading font-bold uppercase text-lg text-white tracking-tight">
                        {print.title}
                      </h3>
                      <p className="text-xs text-neutral-500 font-mono">
                        {print.sizes.join(" · ")}
                      </p>
                      <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3">
                        {print.description}
                      </p>
                      <div className="mt-2">
                        <Button
                          href={buildPrintInquiryMessage(print.title, lang)}
                          variant="secondary"
                          size="sm"
                          isExternal
                        >
                          {lang === "ES" ? "PEDIR LÁMINA →" : "GET PRINT →"}
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
              <SectionLabel className="mb-4">
                {lang === "ES" ? "Reservas de Fotografía" : "Photography Booking"}
              </SectionLabel>
              <SectionHeading className="text-[clamp(1.75rem,3.2vw,3.25rem)] text-white">
                {lang === "ES" ? "RESERVA DKGRFX." : "BOOK DKGRFX."}
              </SectionHeading>
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-base text-neutral-400 leading-relaxed">
                {lang === "ES"
                  ? "Eventos deportivos, torneos, retratos, eventos comunitarios, sesiones de estilo de vida. Fotografía de alta energía que captura momentos reales."
                  : "Sports events, tournaments, portraits, community events, lifestyle sessions. High-energy photography that captures real moments."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  href={buildBookingMessage("Photography Session", lang)}
                  variant="primary"
                  size="lg"
                  isExternal
                >
                  {lang === "ES" ? "RESERVAR AHORA →" : "BOOK NOW →"}
                </Button>
                <Button href="/work?category=photo" variant="secondary" size="lg">
                  {lang === "ES" ? "VER FOTOGRAFÍAS" : "VIEW PHOTO WORK"}
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

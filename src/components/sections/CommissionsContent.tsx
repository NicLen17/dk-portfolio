"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/components/ui/SanityImage";
import { useLanguage } from "@/i18n/LanguageContext";
import { resolveLocale } from "@/lib/locale";
import { buildCommissionMessage } from "@/lib/whatsapp";
import type { SanityCommissionsSettings } from "@/sanity/types";

interface CommissionsContentProps {
  data?: SanityCommissionsSettings | null;
}

export function CommissionsContent({ data }: CommissionsContentProps) {
  const { lang, t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  useInView(ref, { once: true, margin: "-15%" });

  const sectionLabel = resolveLocale(data?.sectionLabel, lang) || t.commissions.sectionLabel;
  const headline = resolveLocale(data?.headline, lang) || `${t.commissions.titleLine1} ${t.commissions.titleLine2}`;
  const description = resolveLocale(data?.description, lang) || t.commissions.desc;

  const referencePhotoLabel = resolveLocale(data?.referencePhotoLabel, lang) || (lang === "ES" ? "FOTO DE REFERENCIA" : "REFERENCE PHOTO");
  const finalArtworkLabel = resolveLocale(data?.finalArtworkLabel, lang) || (lang === "ES" ? "ENCARGO DE ARTE DKGRFX" : "DKGRFX ART COMMISSION");
  const trustBadge = resolveLocale(data?.trustBadge, lang) || (lang === "ES" ? "100% Dibujado a Mano · Cero Filtros IA" : "100% Hand-Drawn Digital Art — Zero AI, Zero Filters");
  const ctaText = resolveLocale(data?.ctaText, lang) || t.commissions.ctaBtn;

  const inputs = data?.commissionInputs?.length 
    ? data.commissionInputs.map(item => resolveLocale(item, lang))
    : t.commissions.inputs;

  const steps = data?.steps?.length
    ? data.steps.map(s => ({ number: s.number, label: resolveLocale(s.label, lang) }))
    : t.commissions.steps;

  const handleCtaClick = () => {
    const url = buildCommissionMessage({
      name: "Cliente Landing",
      email: "N/A",
      artworkType: lang === "ES" ? "Encargo Personalizado" : "Custom Commission",
      description: lang === "ES" ? "Hola! Quiero iniciar una consulta sobre un encargo personalizado." : "Hi! I want to start an inquiry about a custom art commission."
    }, lang);
    window.open(url, "_blank");
  };

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
            <div className="relative aspect-[3/4] overflow-hidden group border border-white/10 rounded-xl bg-neutral-900">
              {data?.referencePhoto?.asset ? (
                <SanityImage
                  image={data.referencePhoto}
                  alt="Client reference photo"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <Image
                  src="/images/commission-photo-father-son.jpg"
                  alt="Client reference photo — Father and Son"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              )}
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.2em] text-neutral-300">
                  {referencePhotoLabel}
                </span>
              </div>
            </div>

            {/* Final artwork */}
            <div className="relative aspect-[3/4] overflow-hidden group border border-white/20 rounded-xl mt-8 shadow-2xl bg-neutral-900">
              {data?.finalArtwork?.asset ? (
                <SanityImage
                  image={data.finalArtwork}
                  alt="Finished DKGRFX digital illustration"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <Image
                  src="/images/commission-art-father-son.jpg"
                  alt="Finished DKGRFX digital illustration — Father and Son"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              )}
              <div className="absolute top-3 left-3 bg-white text-black px-3 py-1 rounded-full font-bold shadow-lg">
                <span className="text-[10px] font-body uppercase tracking-[0.2em]">
                  {finalArtworkLabel}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Text & Interactive Options */}
          <div>
            <SectionLabel className="mb-4">{sectionLabel}</SectionLabel>
            <SectionHeading className="text-[clamp(1.75rem,3.2vw,3.25rem)] text-white mb-6">
              {headline}
            </SectionHeading>

            <motion.p
              className="text-base text-neutral-300 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
              {description}
            </motion.p>

            {/* What you can bring grid */}
            <div className="mb-8">
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                // {t.commissions.sendPrompt}
              </p>
              <div className="flex flex-wrap gap-2">
                {inputs.map((input) => (
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
                onClick={handleCtaClick}
                variant="primary"
                size="lg"
                isExternal
              >
                {ctaText}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

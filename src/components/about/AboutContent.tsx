"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/components/ui/SanityImage";
import { buildGeneralWhatsAppURL } from "@/lib/whatsapp";
import type { SanityAboutSettings, SanitySiteSettings } from "@/sanity/types";
import { useLanguage } from "@/i18n/LanguageContext";
import { resolveLocale } from "@/lib/locale";

interface AboutContentProps {
  aboutData?: SanityAboutSettings | null;
  siteData?: SanitySiteSettings | null;
}

const defaultParagraphs = {
  EN: [
    "DKGRFX is an independent creative practice working across photography, graphic design, and custom artwork.",
    "I don't want to be boxed into just one medium. Whether it's capturing an intense sports play, designing a matchday campaign, or crafting a custom digital illustration, everything carries the same creative identity and standard of visual excellence.",
    "Working internationally — with strong roots in Bolivia, Latin America, and worldwide client projects — DKGRFX is built around taking real moments, ideas, and stories, and elevating them into lasting visual work.",
  ],
  ES: [
    "DKGRFX es una práctica creativa independiente que abarca fotografía, diseño gráfico y arte personalizado.",
    "No me limito a un solo medio. Ya sea capturar una jugada deportiva de alta intensidad, diseñar una campaña de día de partido o crear una ilustración digital personalizada, todo lleva la misma identidad creativa y estándar de excelencia visual.",
    "Con alcance internacional — y fuertes raíces en Bolivia, Latinoamérica y proyectos para clientes en todo el mundo — DKGRFX toma momentos, ideas e historias reales para elevarlos a arte visual duradero.",
  ],
};

export function AboutContent({ aboutData, siteData }: AboutContentProps) {
  const { lang, t } = useLanguage();

  const waURL = buildGeneralWhatsAppURL();
  const instagramUrl = siteData?.instagramUrl || "https://www.instagram.com/dkgrfx";
  const instagramHandle = siteData?.instagramHandle || "@DKGRFX";

  const paragraphs =
    aboutData?.fullBioParagraphs && aboutData.fullBioParagraphs.length > 0
      ? aboutData.fullBioParagraphs.map((p) => resolveLocale(p, lang))
      : defaultParagraphs[lang];

  const words = aboutData?.previewWords?.length
    ? aboutData.previewWords
    : ["ART.", "DESIGN.", "PHOTO."];

  const badgeText =
    resolveLocale(aboutData?.previewBadge, lang) ||
    (lang === "ES"
      ? "MUCHOS MEDIOS — UNA SOLA IDENTIDAD CREATIVA"
      : "MANY MEDIUMS — ONE CREATIVE IDENTITY");

  const pillarsList = [
    {
      label: lang === "ES" ? "ARTE" : "ART",
      desc:
        lang === "ES"
          ? "Arte digital, ilustraciones personalizadas, diseño de personajes, obras de autor y encargos. Transformando fotografías e ideas en arte digital fino."
          : "Digital art, custom illustrations, character design, original artwork, and commissions. Transforming photographs and ideas into fine digital art.",
    },
    {
      label: lang === "ES" ? "DISEÑO" : "DESIGN",
      desc:
        lang === "ES"
          ? "Gráfica deportiva, pósters de día de partido, campañas de marca, gráficos para redes y sistemas de identidad visual para eventos creados con máximo impacto."
          : "Sports graphics, game-day posters, brand campaigns, social media graphics, and event identity systems built for maximum visual impact.",
    },
    {
      label: lang === "ES" ? "FOTOGRAFÍA" : "PHOTO",
      desc:
        lang === "ES"
          ? "Deportes de acción, torneos, retratos, fotografía documental y estilo de vida centrados en la energía humana y momentos genuinos."
          : "Action sports, tournaments, portraits, documentary, and lifestyle photography centered on human energy and authentic moments.",
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pt-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left — Big heading */}
          <div>
            <SectionLabel className="mb-6">
              {lang === "ES" ? "Sobre DKGRFX" : "About DKGRFX"}
            </SectionLabel>
            <SectionHeading className="text-[clamp(2.5rem,5vw,5rem)] text-white">
              {words}
            </SectionHeading>
            <p className="mt-4 text-xs font-mono tracking-widest uppercase text-neutral-400">
              {badgeText}
            </p>

            {aboutData?.profileImage?.asset && (
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 mt-8 max-w-sm">
                <SanityImage
                  image={aboutData.profileImage}
                  alt={aboutData.profileImage.alt || "DKGRFX"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>

          {/* Right — Bio */}
          <div className="flex flex-col gap-6 md:pt-8">
            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={`text-base leading-relaxed ${
                  idx === 0 ? "md:text-lg text-neutral-200 font-medium" : "text-neutral-400"
                }`}
              >
                {p}
              </p>
            ))}

            <blockquote className="border-l border-white/30 pl-5 my-4">
              <p className="font-heading text-2xl font-bold uppercase text-white tracking-tight">
                REAL MOMENTS → ART
              </p>
            </blockquote>

            <div className="flex flex-wrap gap-3 mt-4">
              <Button href={waURL} variant="primary" size="lg" isExternal>
                {lang === "ES" ? "TRABAJA CONMIGO →" : "WORK WITH ME →"}
              </Button>
              <Button href={instagramUrl} variant="secondary" size="lg" isExternal>
                {instagramHandle}
              </Button>
            </div>
          </div>
        </div>

        {/* What DKGRFX does */}
        <div className="py-24 md:py-32 border-t border-white/10 mt-20">
          <SectionLabel className="mb-12">
            {lang === "ES" ? "Los Tres Pilares" : "The Three Pillars"}
          </SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {pillarsList.map((pillar) => (
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

        {/* Stats & Highlights if configured */}
        {aboutData?.stats && aboutData.stats.length > 0 && (
          <div className="py-12 border-t border-white/10 bg-neutral-950/60 rounded-xl p-8 my-8 border border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {aboutData.stats.map((stat, i) => (
                <div key={i}>
                  <p className="font-heading font-black text-2xl md:text-3xl text-white">
                    {stat.number}
                  </p>
                  <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-1">
                    {resolveLocale(stat.label, lang)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="py-16 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="font-heading font-bold uppercase text-2xl md:text-3xl lg:text-4xl text-white tracking-tight">
            {lang === "ES" ? "¿CREAMOS ALGO JUNTOS?" : "LET'S CREATE SOMETHING."}
          </h2>
          <Button href={waURL} variant="primary" size="lg" isExternal>
            {lang === "ES" ? "CONTACTAR →" : "GET IN TOUCH →"}
          </Button>
        </div>

        <div className="pb-16" />
      </div>
    </div>
  );
}

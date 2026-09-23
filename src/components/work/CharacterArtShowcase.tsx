"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface ColorSwatch {
  name: string;
  hex: string;
  bgClass: string;
  borderClass?: string;
  textDark?: boolean;
}

const PALETTE: ColorSwatch[] = [
  { name: "Deep Black", hex: "#0B0B0B", bgClass: "bg-[#0B0B0B]", borderClass: "border-neutral-700" },
  { name: "Hot Orange", hex: "#FF5500", bgClass: "bg-[#FF5500]", borderClass: "border-orange-500" },
  { name: "Neon White", hex: "#FFFFFF", bgClass: "bg-[#FFFFFF]", borderClass: "border-neutral-300", textDark: true },
  { name: "Street Grey", hex: "#52525B", bgClass: "bg-[#52525B]", borderClass: "border-neutral-600" },
];

interface FeatureDetail {
  id: string;
  title: string;
  kicker: string;
  description: string;
  tags: string[];
  icon: string;
}

const DETAILS: FeatureDetail[] = [
  {
    id: "streetwear",
    kicker: "01 // FIT & SILHOUETTE",
    title: "Streetwear Styling",
    description:
      "Engineered with authentic streetwear anatomy—oversized boxy hoodie proportions, realistic heavy-cotton drape, drop-shoulder creases, and layered urban garments rooted in Atlanta & NYC skate-hiphop culture.",
    tags: ["Oversized Hoodie", "Drop Shoulders", "Cotton Drape", "Streetwear Fit"],
    icon: "🧥",
  },
  {
    id: "graffiti",
    kicker: "02 // URBAN LETTERING",
    title: "Graffiti Tag Elements",
    description:
      "Hand-drawn aerosol calligraphy and signature street tags woven directly into the composition. Features organic paint drips, fine mist overspray textures, and bold marker chiseled strokes that give raw identity.",
    tags: ["Handstyle Tag", "Aerosol Drips", "Chisel Marker", "Raw Street Art"],
    icon: "🎨",
  },
  {
    id: "sneakers",
    kicker: "03 // KICK CULTURE",
    title: "Custom Sneaker Art",
    description:
      "True sneakerhead obsession rendered stroke by stroke. Crisp sole tread grooves, custom colorway blocking, signature ankle collar geometry, and dynamic lace physics that make the kicks pop off the canvas.",
    tags: ["Custom Colorway", "Sole Tread Inking", "Lace Physics", "Grail Silhouette"],
    icon: "👟",
  },
  {
    id: "inking",
    kicker: "04 // DIGITAL INK",
    title: "Vector Inking & Cel-Shading",
    description:
      "Multi-weight ink outlines tuned for maximum punch. High-contrast comic cel-shading combined with modern digital gradients creates a hyper-stylized look that stays razor sharp at billboard scale.",
    tags: ["Dynamic Line Weight", "High-Contrast Cel", "Vector Sharp", "300 DPI Ready"],
    icon: "⚡",
  },
];

interface CharacterArtShowcaseProps {
  image: string;
  title: string;
  orderUrl: string;
}

export function CharacterArtShowcase({
  image,
  title,
  orderUrl,
}: CharacterArtShowcaseProps) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<string>("streetwear");

  const copyToClipboard = (hex: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 2000);
    }
  };

  const activeFeature = DETAILS.find((d) => d.id === selectedDetail) || DETAILS[0];

  return (
    <div className="w-full space-y-12">
      {/* Visual Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Artwork Showcase Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-950 group">
            <Image
              src={image}
              alt={title}
              fill
              priority
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            {/* Dark vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
              <span className="px-3 py-1 text-[11px] font-heading font-black tracking-widest uppercase bg-black/85 backdrop-blur-md border border-neutral-700 text-white rounded">
                DKGRFX ORIGINAL CHARACTER
              </span>
              <span className="px-3 py-1 text-[10px] font-mono tracking-widest uppercase bg-orange-600/90 text-white font-bold rounded">
                STREET EDITION
              </span>
            </div>

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <p className="text-xs font-mono uppercase tracking-widest text-orange-400 mb-1">
                ORIGINAL VECTOR ARTWORK
              </p>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white uppercase tracking-tight">
                {title}
              </h3>
            </div>
          </div>

          {/* Color Palette Swatches */}
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-heading font-black uppercase tracking-[0.2em] text-neutral-400">
                  CHARACTER COLOR PALETTE
                </p>
                <p className="text-xs text-neutral-500">
                  Curated street color scheme. Click any swatch to copy HEX.
                </p>
              </div>
              {copiedHex && (
                <span className="text-[11px] font-mono font-bold text-orange-400 bg-orange-950/80 border border-orange-700/50 px-2.5 py-1 rounded animate-fade-in">
                  COPIED {copiedHex}!
                </span>
              )}
            </div>

            {/* Swatches Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PALETTE.map((swatch) => (
                <button
                  key={swatch.name}
                  type="button"
                  onClick={() => copyToClipboard(swatch.hex)}
                  className="flex items-center gap-3 p-2.5 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:border-neutral-600 transition-all text-left cursor-pointer group"
                >
                  <span
                    className={`w-7 h-7 rounded-full flex-shrink-0 border shadow-sm transition-transform group-hover:scale-110 ${swatch.bgClass} ${swatch.borderClass || "border-neutral-700"}`}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-heading font-black uppercase text-white truncate">
                      {swatch.name}
                    </p>
                    <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider group-hover:text-orange-400 transition-colors">
                      {swatch.hex}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Breakdown Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-orange-500 font-semibold">
              ARTWORK ANATOMY
            </span>
            <h2 className="font-heading font-bold uppercase text-2xl sm:text-3xl text-white tracking-tight">
              CRAFTED IN EVERY DETAIL
            </h2>
            <p className="text-sm font-body text-neutral-400 leading-relaxed">
              Every DKGRFX character piece merges contemporary streetwear aesthetics, urban graffiti culture, and high-precision digital inking.
            </p>
          </div>

          {/* Interactive Feature Selectors */}
          <div className="grid grid-cols-2 gap-2">
            {DETAILS.map((detail) => (
              <button
                key={detail.id}
                type="button"
                onClick={() => setSelectedDetail(detail.id)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  selectedDetail === detail.id
                    ? "bg-neutral-900 border-orange-500 shadow-md shadow-orange-950/30"
                    : "bg-neutral-950 border-neutral-800 hover:border-neutral-700 text-neutral-400"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{detail.icon}</span>
                  <span className={`text-[10px] font-mono tracking-wider uppercase font-semibold ${selectedDetail === detail.id ? "text-orange-400" : "text-neutral-500"}`}>
                    {detail.kicker}
                  </span>
                </div>
                <h4 className="text-xs font-heading font-black uppercase text-white tracking-wide">
                  {detail.title}
                </h4>
              </button>
            ))}
          </div>

          {/* Active Detail Spotlight Card */}
          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-950 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{activeFeature.icon}</span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400">
                  {activeFeature.kicker}
                </span>
                <h3 className="text-lg sm:text-xl font-heading font-bold uppercase text-white tracking-tight">
                  {activeFeature.title}
                </h3>
              </div>
            </div>

            <p className="text-sm font-body text-neutral-300 leading-relaxed">
              {activeFeature.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {activeFeature.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-400 uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick CTA Banner */}
          <div className="relative p-6 sm:p-8 rounded-2xl border border-orange-500/30 bg-gradient-to-br from-neutral-950 via-orange-950/20 to-neutral-950 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl pointer-events-none rounded-full" />

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 text-orange-400 text-[11px] font-mono font-semibold uppercase">
                <span>🔥</span> CUSTOM CHARACTER COMMISSIONS OPEN
              </div>

              <div>
                <h4 className="font-heading font-bold uppercase text-xl text-white tracking-tight">
                  WANT YOUR OWN CUSTOM CHARACTER?
                </h4>
                <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                  Turn yourself, your alter ego, your brand persona, or a loved one into a full DKGRFX streetwear character with custom sneakers, outfits, and graffiti tags.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  href={orderUrl}
                  variant="primary"
                  size="md"
                  isExternal
                  className="w-full sm:w-auto"
                >
                  ORDER A CUSTOM CHARACTER →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Project } from "@/types";

export const projects: Project[] = [
  // ── PHOTO ─────────────────────────────────────────────
  {
    id: "p1",
    slug: "field-stories",
    title: "Field Stories",
    category: "photo",
    subcategory: "Documentary",
    description:
      "Real people, real moments. A documentary series capturing human connection in natural environments — the kind of moments you don't get twice.",
    coverImage: "/images/photo-jungle-moment.jpg",
    images: [
      "/images/photo-jungle-moment.jpg",
      "/images/photo-beach-lifestyle.jpg",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["Documentary", "Portrait", "Lifestyle"],
    isCaseStudy: false,
    year: "2026",
  },
  {
    id: "p2",
    slug: "volleyball-championship",
    title: "Volleyball Championship",
    category: "photo",
    subcategory: "Sports",
    description:
      "Capturing the intensity and grace of competitive volleyball. Every jump, every block, every serve — frozen in a moment that tells the whole story.",
    coverImage: "/images/photo-volleyball-setting.jpg",
    images: [
      "/images/photo-volleyball-blur.jpg",
      "/images/photo-volleyball-block.jpg",
      "/images/photo-volleyball-jump.jpg",
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["Sports", "Volleyball", "Action"],
    isCaseStudy: false,
    year: "2026",
  },
  {
    id: "p3",
    slug: "event-portraits",
    title: "Event Portraits",
    category: "photo",
    subcategory: "Events",
    description:
      "Community, energy, and genuine moments from events. Photography that goes beyond documentation — it captures the feeling of being there.",
    coverImage: "/images/photo-smiles-event.jpg",
    images: [
      "/images/photo-smiles-event.jpg",
      "/images/photo-dad-son-event.jpg",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["Events", "Portrait", "Community"],
    isCaseStudy: false,
    year: "2026",
  },
  // ── ART ───────────────────────────────────────────────
  {
    id: "a1",
    slug: "smooch-and-satt",
    title: "Smooch & Satt",
    category: "art",
    subcategory: "Commission",
    description:
      "A custom digital illustration commission turning a real photograph into illustrated artwork. Hand-drawn lines, digital coloring, and a personal touch that makes the moment timeless.",
    coverImage: "/images/art-smooch-satt.jpg",
    images: [
      "/images/photo-smiles-event.jpg",
      "/images/art-smooch-satt.jpg",
    ],
    tags: ["Commission", "Portrait", "Couple", "Digital Art"],
    isCaseStudy: true,
    caseStudy: {
      summary:
        "From a real photo to an illustrated artwork — this is the DKGRFX commission process.",
      phases: [
        {
          title: "Reference Photo",
          description:
            "The client shares the reference photograph — a candid moment captured at an event.",
          images: ["/images/photo-smiles-event.jpg"],
        },
        {
          title: "Final Artwork",
          description:
            "The photograph is transformed into a digital illustration with hand-drawn lines, digital coloring, and DKGRFX style.",
          images: ["/images/art-smooch-satt.jpg"],
        },
      ],
    },
    year: "2026",
  },
  {
    id: "a2",
    slug: "dk-character-art",
    title: "DK Character Art",
    category: "art",
    subcategory: "Character Illustration & Streetwear",
    description:
      "An original streetwear character design blending hip-hop culture, graffiti typography, custom sneaker illustrations, and bold vector linework.",
    coverImage: "/images/dk-streetwear-character-foster.jpg",
    images: [
      "/images/dk-streetwear-character-foster.jpg",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: [
      "Streetwear",
      "Character Design",
      "Graffiti Art",
      "Digital Illustration",
      "Monochrome & Neon",
    ],
    isCaseStudy: true,
    caseStudy: {
      summary: "From concept sketch to finished digital streetwear character.",
      phases: [
        {
          title: "Concept & Line Art",
          description:
            "Drafting the character silhouette, graffiti lettering, and exaggerated cartoon features.",
          images: ["/images/dk-streetwear-character-foster.jpg"],
        },
        {
          title: "Digital Coloring & Shading",
          description:
            "Applying lighting, color accents, and the iconic @DKGRFX signature tag.",
          images: ["/images/dk-streetwear-character-foster.jpg"],
        },
      ],
    },
    year: "2026",
  },
  {
    id: "a3",
    slug: "father-and-son",
    title: "Father & Son",
    category: "art",
    subcategory: "Commission",
    description:
      "A custom commission capturing the bond between a father and son through the DKGRFX illustration style — bold lines, digital coloring, and vibrant personality.",
    coverImage: "/images/commission-art-father-son.jpg",
    images: [
      "/images/commission-photo-father-son.jpg",
      "/images/commission-art-father-son.jpg",
    ],
    tags: ["Commission", "Family", "Portrait", "Digital Art"],
    isCaseStudy: true,
    caseStudy: {
      summary: "A real moment transformed into a lasting illustration.",
      phases: [
        {
          title: "Reference Moment",
          description:
            "A candid moment between father and son captured at an indoor sports venue.",
          images: ["/images/commission-photo-father-son.jpg"],
        },
        {
          title: "Digital Art Commission",
          description:
            "Transformed into a signature DKGRFX cartoon-style digital illustration with custom line art, warm coral background, and distinctive personal details.",
          images: ["/images/commission-art-father-son.jpg"],
        },
      ],
    },
    year: "2026",
  },
  // ── DESIGN ────────────────────────────────────────────
  {
    id: "d1",
    slug: "volleyball-campaign",
    title: "Volleyball Campaign",
    category: "design",
    subcategory: "Sports Graphics",
    description:
      "A complete visual campaign for a competitive volleyball event — combining action photography with bold graphic design. From the court to the campaign.",
    coverImage: "/images/photo-volleyball-setting.jpg",
    images: [
      "/images/photo-volleyball-block.jpg",
      "/images/photo-volleyball-blur.jpg",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["Sports Design", "Campaign", "Volleyball", "Poster"],
    isCaseStudy: false,
    year: "2026",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(
  category: string
): Project[] {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
}

import type { PrintArtwork } from "@/types";

export const prints: PrintArtwork[] = [
  {
    id: "pr1",
    slug: "smooch-and-satt-print",
    title: "Smooch & Satt",
    description:
      "A couple's moment, turned into a timeless illustration. Available as a high-quality print.",
    image: "/images/art-smooch-satt.jpg",
    sizes: ['8\" × 10\"', '11\" × 14\"', '16\" × 20\"'],
    tags: ["Couple", "Commission", "Portrait"],
  },
  {
    id: "pr2",
    slug: "dk-character-print",
    title: "DK Character",
    description:
      "Original DKGRFX character art — streetwear, style, and attitude. Limited edition print.",
    image: "/images/dk-streetwear-character-foster.jpg",
    sizes: ['8\" × 10\"', '11\" × 14\"'],
    tags: ["Character", "Original", "Limited"],
  },
  {
    id: "pr3",
    slug: "father-son-print",
    title: "Father & Son",
    description:
      "A bond captured in illustration. The DKGRFX family portrait style — bold, warm, and personal.",
    image: "/images/art-family-portrait.jpg",
    sizes: ['8\" × 10\"', '11\" × 14\"', '16\" × 20\"'],
    tags: ["Family", "Commission", "Portrait"],
  },
];

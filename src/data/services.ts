import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "s1",
    title: "Photography",
    description:
      "High-energy photography built around movement, people, and the moments you don't get twice. Sports, events, portraits, lifestyle — documented with intent.",
    category: "photo",
    items: [
      "Sports Events",
      "Volleyball & Tournaments",
      "Event Coverage",
      "Portraits",
      "Lifestyle & Documentary",
      "Community Events",
    ],
    cta: "BOOK DKGRFX",
    ctaService: "Photography Booking",
  },
  {
    id: "s2",
    title: "Graphic Design",
    description:
      "Sports graphics, campaigns, and visual systems that make people stop scrolling. From game-day graphics to full creative campaigns — combining photography with bold design.",
    category: "design",
    items: [
      "Sports Graphics",
      "Game-Day Graphics",
      "Posters & Flyers",
      "Social Media Campaigns",
      "Event Graphics",
      "Branding & Identity",
    ],
    cta: "START A PROJECT",
    ctaService: "Graphic Design",
  },
  {
    id: "s3",
    title: "Custom Artwork",
    description:
      "Turn real moments into art. Custom illustrations and commissions in the DKGRFX style — hand-drawn lines, digital coloring, character art, and personal moments made permanent.",
    category: "art",
    items: [
      "Custom Portrait Illustrations",
      "Character Art",
      "Couple Commissions",
      "Family Portraits",
      "Sports Art",
      "Original Artworks",
    ],
    cta: "START A COMMISSION",
    ctaService: "Custom Artwork",
  },
];

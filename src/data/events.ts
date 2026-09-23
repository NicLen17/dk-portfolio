import type { GalleryEvent } from "@/types";

const volleyballNightImages = [
  "/images/photo-volleyball-blur.jpg",
  "/images/photo-volleyball-setting.jpg",
  "/images/photo-volleyball-jump.jpg",
  "/images/photo-volleyball-block.jpg",
  "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80",
];

const powerChampionshipImages = [
  "/images/photo-volleyball-block.jpg",
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80",
  "/images/photo-volleyball-setting.jpg",
  "/images/photo-volleyball-jump.jpg",
  "/images/photo-volleyball-blur.jpg",
];

const fieldStoriesImages = [
  "/images/photo-jungle-moment.jpg",
  "/images/photo-beach-lifestyle.jpg",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
];

export const events: GalleryEvent[] = [
  {
    id: "e1",
    slug: "volleyball-night",
    title: "Volleyball Night",
    date: "2026-08-15",
    location: "Atlanta, GA",
    photoCount: 47,
    coverImage: "/images/photo-volleyball-blur.jpg",
    description:
      "An intense evening of competitive volleyball captured in full. Every serve, spike, and block — documented.",
    photos: Array.from({ length: 12 }, (_, i) => ({
      id: `VN-${String(i + 1).padStart(3, "0")}`,
      src: volleyballNightImages[i % volleyballNightImages.length],
      thumbnailSrc: volleyballNightImages[i % volleyballNightImages.length],
      alt: `Volleyball Night — Photo ${i + 1}`,
    })),
  },
  {
    id: "e2",
    slug: "power-championship",
    title: "Power Championship",
    date: "2026-07-22",
    location: "Atlanta, GA",
    photoCount: 63,
    coverImage: "/images/photo-volleyball-block.jpg",
    description:
      "The Power Championship brought the best teams together. High energy, fierce competition, and unforgettable moments.",
    photos: Array.from({ length: 12 }, (_, i) => ({
      id: `PC-${String(i + 1).padStart(3, "0")}`,
      src: powerChampionshipImages[i % powerChampionshipImages.length],
      thumbnailSrc: powerChampionshipImages[i % powerChampionshipImages.length],
      alt: `Power Championship — Photo ${i + 1}`,
    })),
  },
  {
    id: "e3",
    slug: "field-stories-documentary",
    title: "Field Stories",
    date: "2026-06-10",
    location: "On Location",
    photoCount: 34,
    coverImage: "/images/photo-jungle-moment.jpg",
    description:
      "A documentary photography session capturing real people in real environments. No staging — just moments.",
    photos: Array.from({ length: 12 }, (_, i) => ({
      id: `FS-${String(i + 1).padStart(3, "0")}`,
      src: fieldStoriesImages[i % fieldStoriesImages.length],
      thumbnailSrc: fieldStoriesImages[i % fieldStoriesImages.length],
      alt: `Field Stories — Photo ${i + 1}`,
    })),
  },
];

export function getEventBySlug(slug: string): GalleryEvent | undefined {
  return events.find((e) => e.slug === slug);
}

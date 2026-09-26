// ── Category Types ────────────────────────────────────────
export type Category = "art" | "design" | "photo";

// ── Project Types ─────────────────────────────────────────
export interface CaseStudyPhase {
  title: string;
  description: string;
  images: string[];
}

export interface CaseStudy {
  summary: string;
  phases: CaseStudyPhase[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: Category;
  subcategory: string;
  description: string;
  coverImage: string;
  images: string[];
  tags: string[];
  isCaseStudy: boolean;
  caseStudy?: CaseStudy;
  year: string;
}

// ── Event / Gallery Types ──────────────────────────────────
export interface EventPhoto {
  id: string;
  src: string;
  thumbnailSrc: string;
  alt: string;
}

export interface WatermarkConfig {
  imageUrl?: string;
  text?: string;
}

export interface GalleryEvent {
  id: string;
  slug: string;
  title: string;
  date: string;
  location: string;
  photoCount: number;
  coverImage: string;
  description: string;
  photos: EventPhoto[];
  watermark?: WatermarkConfig;
}

// ── Service Types ─────────────────────────────────────────
export interface Service {
  id: string;
  title: string;
  description: string;
  category: Category;
  items: string[];
  cta: string;
  ctaService: string;
}

// ── Print & Shop Types ────────────────────────────────────
export interface PrintArtwork {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  sizes: string[];
  tags: string[];
  productType?: "print" | "poster" | "sticker" | "merch";
  badge?: string;
}

// ── Contact / Form Types ──────────────────────────────────
export type ServiceOption =
  | "Photography"
  | "Graphic Design"
  | "Custom Artwork"
  | "Art Commission"
  | "Event Coverage"
  | "Prints"
  | "Other";

export interface ContactFormData {
  name: string;
  email: string;
  services: ServiceOption[];
  projectDetails: string;
  referenceFile?: File | null;
}

export interface CommissionFormData {
  name: string;
  email: string;
  artworkType: string;
  description: string;
  referenceFile?: File | null;
}

// ── Navigation Types ──────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "instagram" | "linktree" | "whatsapp" | "linkedin" | "email" | "tiktok";
}

export interface SanityImageAsset {
  _id: string;
  url: string;
  metadata?: {
    lqip?: string;
    dimensions?: {
      width: number;
      height: number;
      aspectRatio: number;
    };
  };
}

export interface SanityImage {
  asset: SanityImageAsset;
  alt?: string | null;
  hotspot?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SanityHeroSettings {
  _id?: string;
  headline?: string;
  subheading?: string;
  badge?: string;
  categoryTags?: string[];
  primaryCtaText?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  footerTagline?: string;
  slides?: SanityImage[];
}

export interface SanityProcessStep {
  badge?: string;
  title?: string;
  tagline?: string;
  description?: string;
  image?: SanityImage;
}

export interface SanityCreativeSignature {
  _id?: string;
  sectionLabel?: string;
  headingLine1?: string;
  headingLine2?: string;
  description?: string;
  step1?: SanityProcessStep;
  step2?: SanityProcessStep;
  step3?: SanityProcessStep;
  ctaText?: string;
  ctaLink?: string;
}

export type Category = "art" | "design" | "photo";

export interface SanityProjectListItem {
  _id: string;
  title: string;
  slug: string;
  category: Category;
  subcategory: string;
  description: string;
  year: string;
  tags?: string[];
  isCaseStudy?: boolean;
  coverImage: SanityImage;
}

export interface SanityCaseStudyPhase {
  _key: string;
  title: string;
  description: string;
  images?: SanityImage[];
}

export interface SanityProjectDetail extends SanityProjectListItem {
  images?: SanityImage[];
  caseStudy?: {
    summary: string;
    phases: SanityCaseStudyPhase[];
  };
}

export interface SanityPracticePillar {
  _id: string;
  title: string;
  category: Category;
  tagline: string;
  description: string;
  image: SanityImage;
}

export interface SanityService {
  _id: string;
  title: string;
  description: string;
  category: Category;
  items: string[];
  cta: string;
  ctaService: string;
}

export interface SanityPrintArtwork {
  _id: string;
  title: string;
  slug: string;
  badge?: string;
  sizes?: string[];
  description: string;
  productType?: string;
  tags?: string[];
  image: SanityImage;
}

export interface SanityGalleryPhoto extends SanityImage {
  _key: string;
}

export interface SanityEventListItem {
  _id: string;
  title: string;
  slug: string;
  date: string;
  location: string;
  description: string;
  coverImage: SanityImage;
  photoCount: number;
}

export interface SanityEventDetail extends Omit<SanityEventListItem, "photoCount"> {
  photos?: SanityGalleryPhoto[];
}

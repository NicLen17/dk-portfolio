import type { LocaleString, LocaleText } from "@/lib/locale";

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
  headline?: LocaleText;
  subheading?: LocaleString;
  badge?: LocaleString;
  categoryTags?: string[];
  primaryCtaText?: LocaleString;
  secondaryCtaText?: LocaleString;
  secondaryCtaLink?: string;
  footerTagline?: LocaleString;
  slides?: SanityImage[];
}

export interface SanityProcessStep {
  badge?: LocaleString;
  title?: LocaleString;
  tagline?: LocaleString;
  description?: LocaleText;
  image?: SanityImage;
}

export interface SanityCreativeSignature {
  _id?: string;
  sectionLabel?: LocaleString;
  headingLine1?: LocaleString;
  headingLine2?: LocaleString;
  description?: LocaleText;
  step1?: SanityProcessStep;
  step2?: SanityProcessStep;
  step3?: SanityProcessStep;
  ctaText?: LocaleString;
  ctaLink?: string;
}

export interface SanityCommissionStep {
  number: string;
  label: LocaleString;
}

export interface SanityCommissionsSettings {
  _id?: string;
  sectionLabel?: LocaleString;
  headline?: LocaleString;
  description?: LocaleText;
  referencePhoto?: SanityImage;
  referencePhotoLabel?: LocaleString;
  finalArtwork?: SanityImage;
  finalArtworkLabel?: LocaleString;
  commissionInputs?: LocaleString[];
  steps?: SanityCommissionStep[];
  trustBadge?: LocaleString;
  ctaText?: LocaleString;
  ctaSubject?: LocaleString;
}

export interface SanityAboutStat {
  number: string;
  label: LocaleString;
}

export interface SanityAboutSettings {
  _id?: string;
  sectionLabel?: LocaleString;
  previewWords?: string[];
  previewBadge?: LocaleString;
  subheadline?: LocaleString;
  previewBio?: LocaleText;
  fullBioHeading?: LocaleString;
  fullBioParagraphs?: LocaleText[];
  profileImage?: SanityImage;
  actionImage?: SanityImage;
  stats?: SanityAboutStat[];
}

export interface SanitySiteSettings {
  _id?: string;
  siteTitle?: string;
  artistName?: string;
  location?: LocaleString;
  whatsappNumber?: string;
  contactEmail?: string;
  instagramHandle?: string;
  instagramUrl?: string;
  footerTagline?: LocaleText;
  copyrightText?: LocaleString;
}

export type Category = "art" | "design" | "photo";

export interface SanityProjectListItem {
  _id: string;
  title: LocaleString;
  slug: string;
  category: Category;
  subcategory: LocaleString;
  description: LocaleText;
  year: string;
  tags?: string[];
  isCaseStudy?: boolean;
  coverImage: SanityImage;
}

export interface SanityCaseStudyPhase {
  _key: string;
  title: LocaleString;
  description: LocaleText;
  images?: SanityImage[];
}

export interface SanityProjectDetail extends Omit<SanityProjectListItem, "title" | "subcategory" | "description"> {
  title: LocaleString;
  subcategory: LocaleString;
  description: LocaleText;
  images?: SanityImage[];
  caseStudy?: {
    summary: LocaleText;
    phases: SanityCaseStudyPhase[];
  };
}

export interface SanityPracticePillar {
  _id: string;
  title: LocaleString;
  category: Category;
  tagline: LocaleString;
  description: LocaleText;
  items?: LocaleString[];
  image: SanityImage;
}

export interface SanityService {
  _id: string;
  title: LocaleString;
  description: LocaleText;
  category: Category;
  items: LocaleString[];
  cta: LocaleString;
  ctaService: string;
}

export interface SanityPrintArtwork {
  _id: string;
  title: LocaleString;
  slug: string;
  badge?: LocaleString;
  sizes?: string[];
  description: LocaleText;
  productType?: string;
  tags?: string[];
  image: SanityImage;
}

export interface SanityGalleryPhoto extends SanityImage {
  _key: string;
}

export interface SanityEventListItem {
  _id: string;
  title: LocaleString;
  slug: string;
  date: string;
  location: LocaleString;
  description: LocaleText;
  coverImage: SanityImage;
  photoCount: number;
}

export interface SanityEventDetail extends Omit<SanityEventListItem, "photoCount"> {
  photos?: SanityGalleryPhoto[];
}

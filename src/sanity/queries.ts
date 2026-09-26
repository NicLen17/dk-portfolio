import { defineQuery } from "next-sanity";

// Reusable fragment for image projection with dimensions and LQIP placeholder
export const imageFragment = /* groq */ `
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions {
        width,
        height,
        aspectRatio
      }
    }
  },
  alt,
  hotspot,
  crop
`;

// Hero Settings (Homepage banner singleton)
export const HERO_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "heroSettings"][0] {
    _id,
    headline,
    subheading,
    badge,
    categoryTags,
    primaryCtaText,
    secondaryCtaText,
    secondaryCtaLink,
    footerTagline,
    slides[] {
      ${imageFragment}
    }
  }
`);

// Creative Signature / Photo to Art Process (Homepage singleton)
export const CREATIVE_SIGNATURE_QUERY = defineQuery(/* groq */ `
  *[_type == "creativeSignature"][0] {
    _id,
    sectionLabel,
    headingLine1,
    headingLine2,
    description,
    step1 {
      badge,
      title,
      tagline,
      description,
      image {
        ${imageFragment}
      }
    },
    step2 {
      badge,
      title,
      tagline,
      description,
      image {
        ${imageFragment}
      }
    },
    step3 {
      badge,
      title,
      tagline,
      description,
      image {
        ${imageFragment}
      }
    },
    ctaText,
    ctaLink
  }
`);

// Commissions Section (Homepage singleton)
export const COMMISSIONS_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "commissionsSettings"][0] {
    _id,
    sectionLabel,
    headline,
    description,
    referencePhoto {
      ${imageFragment}
    },
    referencePhotoLabel,
    finalArtwork {
      ${imageFragment}
    },
    finalArtworkLabel,
    commissionInputs,
    steps[] {
      number,
      label
    },
    trustBadge,
    ctaText,
    ctaSubject
  }
`);

// About Settings (Landing page preview & /about page singleton)
export const ABOUT_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "aboutSettings"][0] {
    _id,
    sectionLabel,
    previewWords,
    previewBadge,
    subheadline,
    previewBio,
    fullBioHeading,
    fullBioParagraphs,
    profileImage {
      ${imageFragment}
    },
    actionImage {
      ${imageFragment}
    },
    stats[] {
      number,
      label
    }
  }
`);

// Global Site Settings (Contact, WhatsApp, Instagram, Location)
export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0] {
    _id,
    siteTitle,
    artistName,
    location,
    whatsappNumber,
    contactEmail,
    instagramHandle,
    instagramUrl,
    footerTagline,
    copyrightText,
    defaultWatermarkImage {
      ${imageFragment}
    },
    defaultWatermarkText
  }
`);

// Selected work / projects for landing page & work directory
export const PROJECTS_QUERY = defineQuery(/* groq */ `
  *[_type == "project" && defined(slug.current)] | order(year desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    subcategory,
    description,
    year,
    tags,
    isCaseStudy,
    coverImage {
      ${imageFragment}
    }
  }
`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    subcategory,
    description,
    year,
    tags,
    isCaseStudy,
    coverImage {
      ${imageFragment}
    },
    images[] {
      ${imageFragment}
    },
    caseStudy {
      summary,
      phases[] {
        _key,
        title,
        description,
        images[] {
          ${imageFragment}
        }
      }
    }
  }
`);

// The Practice (Homepage visual 3-pillar banner grid)
export const PRACTICE_PILLARS_QUERY = defineQuery(/* groq */ `
  *[_type == "practicePillar"] | order(orderRank asc, _createdAt asc) {
    _id,
    title,
    category,
    tagline,
    description,
    items,
    image {
      ${imageFragment}
    }
  }
`);

// Services page (/services) — text descriptions, features, and WhatsApp inquiry CTA
export const SERVICES_QUERY = defineQuery(/* groq */ `
  *[_type == "service"] | order(orderRank asc, _createdAt asc) {
    _id,
    title,
    description,
    category,
    items,
    cta,
    ctaService
  }
`);

// Art prints and merch for /services page ("Own the Art")
export const PRINTS_QUERY = defineQuery(/* groq */ `
  *[_type == "printArtwork"] | order(orderRank asc, _createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    badge,
    sizes,
    description,
    productType,
    tags,
    image {
      ${imageFragment}
    }
  }
`);

// Event galleries for landing page
export const EVENTS_QUERY = defineQuery(/* groq */ `
  *[_type == "galleryEvent" && defined(slug.current)] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    location,
    description,
    coverImage {
      ${imageFragment}
    },
    watermarkImage {
      ${imageFragment}
    },
    watermarkText,
    "photoCount": count(photos)
  }
`);

export const EVENT_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "galleryEvent" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    date,
    location,
    description,
    coverImage {
      ${imageFragment}
    },
    watermarkImage {
      ${imageFragment}
    },
    watermarkText,
    photos[] {
      _key,
      ${imageFragment}
    }
  }
`);

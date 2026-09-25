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

// Selected work / projects for landing page & work directory
export const PROJECTS_QUERY = defineQuery(/* groq */ `
  *[_type == "project" && defined(slug.current)] | order(year desc, _createdAt desc) {
    _id,
    "title": coalesce(title[$lang], title.en, title),
    "slug": slug.current,
    category,
    "subcategory": coalesce(subcategory[$lang], subcategory.en, subcategory),
    "description": coalesce(description[$lang], description.en, description),
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
    "title": coalesce(title[$lang], title.en, title),
    "slug": slug.current,
    category,
    "subcategory": coalesce(subcategory[$lang], subcategory.en, subcategory),
    "description": coalesce(description[$lang], description.en, description),
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
      "summary": coalesce(summary[$lang], summary.en, summary),
      phases[] {
        _key,
        "title": coalesce(title[$lang], title.en, title),
        "description": coalesce(description[$lang], description.en, description),
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
    "title": coalesce(title[$lang], title.en, title),
    category,
    "tagline": coalesce(tagline[$lang], tagline.en, tagline),
    "description": coalesce(description[$lang], description.en, description),
    image {
      ${imageFragment}
    }
  }
`);

// Services page (/services) — text descriptions, features, and WhatsApp inquiry CTA
export const SERVICES_QUERY = defineQuery(/* groq */ `
  *[_type == "service"] | order(orderRank asc, _createdAt asc) {
    _id,
    "title": coalesce(title[$lang], title.en, title),
    "description": coalesce(description[$lang], description.en, description),
    category,
    items,
    "cta": coalesce(cta[$lang], cta.en, cta),
    ctaService
  }
`);

// Art prints and merch for /services page ("Own the Art")
export const PRINTS_QUERY = defineQuery(/* groq */ `
  *[_type == "printArtwork"] | order(orderRank asc, _createdAt asc) {
    _id,
    "title": coalesce(title[$lang], title.en, title),
    "slug": slug.current,
    badge,
    sizes,
    "description": coalesce(description[$lang], description.en, description),
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
    photos[] {
      _key,
      ${imageFragment}
    }
  }
`);

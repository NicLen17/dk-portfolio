# DKGRFX — Photography, Digital Art & Graphic Design Portfolio

A high-performance, dynamic portfolio and CMS-driven platform for **DKGRFX** (Darwin), an independent visual artist and photographer based in Atlanta, GA.

Built with **Next.js 15 (App Router)**, **TypeScript 5.8**, **Tailwind CSS v4**, **Framer Motion**, and **Sanity.io** as the Headless CMS.

---

## 🚀 Live Links & Architecture

- **Live Production Website:** [https://dkgrfx-portfolio.vercel.app](https://dkgrfx-portfolio.vercel.app)
- **Sanity Studio (CMS Cloud):** [https://dkgrfx.sanity.studio](https://dkgrfx.sanity.studio)
- **Local Studio Dev:** `http://localhost:3333`
- **Local Web Dev:** `http://localhost:3000`
- **Admin Gateway:** `/admin` (Redirects team/client to the Sanity Studio)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15.5+ (App Router, React 19) |
| **Language** | TypeScript 5.8 (Strict mode, zero `any`) |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion 12 |
| **Headless CMS** | Sanity.io (Content Lake, Standalone Studio v3 on Vite) |
| **Image CDN** | `@sanity/image-url` with automatic WebP/AVIF formatting, LQIP blur placeholders & custom Next.js loader |
| **Type Generation** | Sanity TypeGen (`@sanity/cli`) |
| **Hosting** | Vercel (Next.js) + Sanity Cloud Hosting (Studio) |

---

## 📁 Repository & Project Structure

The project follows a decoupled monorepo architecture:

```text
c:\Users\Wako\Desktop\Proyectos/
├── DK-Portfolio/                          # Next.js 15 Frontend Web Application
│   ├── .env.local                         # Sanity project credentials
│   ├── next.config.ts                     # Remote image patterns (cdn.sanity.io)
│   ├── PRD.md                             # Product Requirements Document
│   ├── STATUS.md                          # Current Status & Roadmap
│   ├── README.md                          # Project documentation
│   └── src/
│       ├── app/
│       │   ├── page.tsx                   # Homepage (Server Component)
│       │   ├── work/                      # Portfolio directory (/work)
│       │   │   ├── page.tsx               # All projects with interactive category filter
│       │   │   └── [slug]/page.tsx        # Dynamic project case study & bespoke showcases
│       │   ├── services/                  # Services & packages (/services)
│       │   ├── events/                    # Client event galleries (/events)
│       │   │   ├── page.tsx               # All event galleries list
│       │   │   └── [slug]/page.tsx        # Event photo album with full-screen Lightbox
│       │   ├── about/                     # About the artist page (/about)
│       │   ├── admin/                     # Admin gateway page (/admin)
│       │   └── api/revalidate/            # On-Demand cache revalidation webhook
│       ├── components/
│       │   ├── sections/                  # Server Component / Client Component split sections
│       │   │   ├── SelectedWorkSection.tsx # Server Component (fetches projects)
│       │   │   ├── SelectedWorkGallery.tsx # Client Component (masonry grid & animations)
│       │   │   ├── ThreePillarsSection.tsx # Server Component (fetches practice pillars)
│       │   │   ├── ThreePillarsGrid.tsx    # Client Component (pillar cards)
│       │   │   ├── EventGalleriesSection.tsx # Server Component (fetches event albums)
│       │   │   └── EventGalleriesGrid.tsx  # Client Component (event cards)
│       │   ├── ui/                        # Reusable UI components
│       │   │   ├── SanityImage.tsx        # Optimized Sanity CDN + next/image component
│       │   │   ├── ImageCard.tsx          # Interactive hover cards
│       │   │   ├── Lightbox.tsx           # Full-screen touch/keyboard image preview
│       │   │   └── ...
│       ├── sanity/
│       │   ├── client.ts                  # Sanity Client with environment-aware caching
│       │   ├── env.ts                     # Configuration and environment variables
│       │   ├── fetch.ts                   # Type-safe sanityFetch helper with ISR
│       │   ├── image.ts                   # @sanity/image-url builder with hotspot support
│       │   ├── queries.ts                 # GROQ queries with projection fragments
│       │   ├── types.ts                   # Strict manual interfaces
│       │   └── sanity.types.ts            # Auto-generated Sanity TypeGen types
│       └── lib/
│           ├── utils.ts                   # Class merging (clsx + tailwind-merge)
│           └── whatsapp.ts                # Direct WhatsApp chat inquiry generator
│
└── studio-dk-landing/                     # Standalone Sanity Studio v3 (Vite-powered)
    ├── sanity.config.ts                   # Studio workspace configuration
    ├── sanity.cli.ts                      # CLI config, appId & TypeGen paths
    ├── structure.ts                       # Custom organized sidebar hierarchy
    └── schemaTypes/
        ├── siteSettings.ts                # Global contact info, WhatsApp, Instagram & socials
        ├── heroSettings.ts                # Homepage hero banner headline, slides & CTAs
        ├── creativeSignature.ts           # Creative signature 3-step process & images
        ├── commissionsSettings.ts         # Custom artwork before/after showcase & 4-step workflow
        ├── aboutSettings.ts               # Artist bio, manifesto, stats & portrait photos
        ├── project.ts                     # Portfolio projects schema (hotspot, case study)
        ├── practicePillar.ts              # The Practice homepage visual pillars schema
        ├── service.ts                     # /services structured text packages schema
        ├── printArtwork.ts                # Art prints & merchandise schema
        ├── galleryEvent.ts                # Event galleries & photo albums schema
        └── index.ts                       # Schema registration index
```

---

## ⚡ Getting Started (Local Development)

### 1. Prerequisites
- Node.js 18.18+ or 20+
- npm 9+

### 2. Configure Environment Variables
In `DK-Portfolio/.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=1nddltrp
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-09-25
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333
SANITY_ORGANIZATION_ID=oeuyfg7dj

# Optional secret for on-demand webhook revalidation
# SANITY_REVALIDATE_SECRET=
```

### 3. Run the Frontend (Next.js)
```bash
cd DK-Portfolio
npm install --legacy-peer-deps
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 4. Run the CMS Studio (Sanity)
In a separate terminal:
```bash
cd studio-dk-landing
npm install
npm run dev
```
Open [http://localhost:3333](http://localhost:3333) to access the visual editor.

---

## 📝 Content Management (Sanity Studio)

The Studio navigation is split into dedicated folders for ease of use:

```text
📁 Content
│
├── 🏠 Landing Page (Home)
│   ├── ⚡ Hero Section (Banner, Slides & CTAs)       ← Singleton: Headline, Ken Burns Slides & Buttons
│   ├── ✨ Creative Signature (Photo → Sketch → Art)  ← Singleton: 3 Process Steps & Images
│   ├── 🖼️ Selected Work (Featured Projects)
│   ├── 🏛️ The Practice (3 Visual Pillars with Images)
│   ├── ✍️ Commissions Process (Showcase & Steps)      ← Singleton: Before/After & 4-Step Workflow
│   ├── 👤 About Darwin (Preview Bio & Manifest)       ← Singleton: Kinetic Words & Short Bio
│   └── 📅 Event Highlights (Featured Albums)
│
├── 📁 Inner Pages
│   ├── 🖼️ /work Page (All Portfolio Projects)
│   ├── 📋 /services Page (Packages, Text Descriptions & Checklist)
│   ├── 🎨 /services Page — Art Prints & Merch (Own the Art)
│   ├── 👤 /about Page (Full Bio, Stats & Portrait Photos)
│   └── 📅 /events Page (All Client Galleries)
│
└── ⚙️ Global Site Settings
    └── 🌐 Contact & Social Links                     ← Singleton: WhatsApp, Email, Instagram
```

### Type Generation
Whenever you modify schemas or add new GROQ queries:
```bash
cd studio-dk-landing
npm run typegen
```
This re-extracts the schema and regenerates types into `DK-Portfolio/src/sanity/sanity.types.ts`.

---

## 🚢 Deployment & Production

### Frontend Deployment (Vercel)
Deploy `DK-Portfolio` on Vercel:
- Root directory: `DK-Portfolio`
- Build command: `next build`
- Output directory: `.next`
- Add environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`).

### Studio Cloud Deployment (Sanity Hosting)
Deploy updates to `https://dkgrfx.sanity.studio` with a single command:
```bash
cd studio-dk-landing
npm run deploy
```

---

## 📄 License & Credits
© 2026 DKGRFX (Darwin). All rights reserved.
Developed with performance, UX, and autonomy as top priorities.

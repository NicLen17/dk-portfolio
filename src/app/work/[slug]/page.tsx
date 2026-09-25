import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, projects } from "@/data/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppURL } from "@/lib/whatsapp";
import { BeforeAfterCompare } from "@/components/work/BeforeAfterCompare";
import { CharacterArtShowcase } from "@/components/work/CharacterArtShowcase";
import {
  SportsActionGallery,
  type SportsPhotoItem,
} from "@/components/work/SportsActionGallery";
import { PhotoStoryGallery } from "@/components/work/PhotoStoryGallery";
import {
  WorkProjectTopNav,
  WorkProjectBottomNav,
} from "@/components/work/WorkProjectNav";
import { sanityFetch } from "@/sanity/fetch";
import { PROJECT_BY_SLUG_QUERY, PROJECTS_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import type { SanityProjectDetail, SanityProjectListItem } from "@/sanity/types";
import type { Project } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function resolveProject(slug: string): Promise<Project | null> {
  const sanityDoc = await sanityFetch<SanityProjectDetail>({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug },
    tags: ["project"],
    revalidate: 60,
  });

  if (sanityDoc && sanityDoc.title) {
    const coverImageUrl = sanityDoc.coverImage?.asset
      ? urlFor(sanityDoc.coverImage).auto("format").quality(90).url()
      : "/images/gallery/asset-01-jungle.jpg";

    const galleryImageUrls = (sanityDoc.images || [])
      .filter((img) => Boolean(img?.asset))
      .map((img) => urlFor(img).auto("format").quality(90).url());

    return {
      id: sanityDoc._id,
      slug: sanityDoc.slug,
      title: sanityDoc.title,
      category: sanityDoc.category,
      subcategory: sanityDoc.subcategory || "",
      description: sanityDoc.description,
      coverImage: coverImageUrl,
      images: galleryImageUrls.length > 0 ? galleryImageUrls : [coverImageUrl],
      tags: sanityDoc.tags || [],
      year: sanityDoc.year || new Date().getFullYear().toString(),
      isCaseStudy: Boolean(sanityDoc.isCaseStudy),
    };
  }

  return getProjectBySlug(slug) || null;
}

export async function generateStaticParams() {
  const sanityProjects = await sanityFetch<SanityProjectListItem[]>({
    query: PROJECTS_QUERY,
    tags: ["project"],
  });

  if (sanityProjects && sanityProjects.length > 0) {
    return sanityProjects.map((p) => ({ slug: p.slug }));
  }

  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await resolveProject(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const title = `${project.title} — ${project.subcategory}`;
  const description = project.description;
  const url = `https://dkgrfx.com/work/${project.slug}`;
  const keywords = [
    project.title,
    project.category,
    project.subcategory,
    ...(project.tags || []),
    "DKGRFX",
    "visual artist",
    "sports photography",
    "digital art commission",
    "Atlanta photography",
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${project.title} | DKGRFX`,
      description,
      url,
      type: "article",
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | DKGRFX`,
      description,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await resolveProject(slug);

  if (!project) notFound();

  // Find previous and next projects for carousel / footer navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextIndex = (currentIndex + 1) % projects.length;
  const previousProject = projects[prevIndex];
  const nextProject = projects[nextIndex];

  // Classify project type
  const isSmooch = slug === "smooch-and-satt";
  const isFatherSon = slug === "father-and-son";
  const isCommission =
    isSmooch ||
    isFatherSon ||
    (project.category === "art" &&
      project.subcategory.toLowerCase().includes("commission"));

  const isCharacterArt = slug === "dk-character-art";
  const isSports =
    slug === "volleyball-championship" ||
    slug === "volleyball-campaign" ||
    project.subcategory.toLowerCase().includes("sports");

  // WhatsApp Messages tailored per project
  let waMessage = `Hola DKGRFX! Me interesa el proyecto "${project.title}". ¿Podemos hablar de una cotización?`;
  let ctaButtonText = "GET IN TOUCH →";
  let ctaHeading = "INTERESTED IN A PROJECT LIKE THIS?";
  let ctaSubheading = "Let's bring your vision to life. Chat directly on WhatsApp.";

  if (isCommission) {
    waMessage = `Hola DKGRFX! Vi tu comisión de arte "${project.title}" y me gustaría encargar una pieza personalizada a partir de una foto de referencia.`;
    ctaButtonText = "COMMISSION A PIECE LIKE THIS →";
    ctaHeading = "READY TO TURN YOUR MOMENT INTO ART?";
    ctaSubheading =
      "Send your reference photo and let's craft a 100% hand-drawn fine art commission.";
  } else if (isCharacterArt) {
    waMessage = `Hola DKGRFX! Me encantó el estilo streetwear y graffiti de "${project.title}". Quiero ordenar una ilustración de personaje personalizada.`;
    ctaButtonText = "ORDER A CUSTOM CHARACTER →";
    ctaHeading = "WANT A BESPOKE STREETWEAR CHARACTER?";
    ctaSubheading =
      "Get yourself, your brand, or an original concept illustrated in signature DK style.";
  } else if (isSports) {
    waMessage = `Hola DKGRFX! Vi la serie deportiva "${project.title}" y quiero reservar una sesión de fotos / cobertura de torneo.`;
    ctaButtonText = "BOOK A SPORTS SESSION →";
    ctaHeading = "LOOKING FOR HIGH-IMPACT SPORTS PHOTOGRAPHY?";
    ctaSubheading =
      "Freeze peak athletic moments at 1/2000s shutter speeds. Available for tournaments, matches, and athletes.";
  }

  const waURL = buildWhatsAppURL(waMessage);

  // Commission metadata
  const commissionConfig = {
    originalImage: isSmooch
      ? "/images/photo-smiles-event.jpg"
      : "/images/commission-photo-father-son.jpg",
    artworkImage: isSmooch
      ? "/images/art-smooch-satt.jpg"
      : "/images/commission-art-father-son.jpg",
    clientLabel: isSmooch
      ? "Smooch & Satt — Couple Commission"
      : "Father & Son — Legacy Commission",
    leadStory: isSmooch
      ? "A treasured candid moment captured live at an event, brought into the DKGRFX universe. Every strand of hair, fabric crease, and joyful smile was freehand-illustrated in Procreate, combining razor-sharp line art with rich street-culture coloring."
      : "Honoring an unbreakable family bond. This commission transformed a proud, candid moment between father and son into an iconic fine art illustration, preserving their genuine smiles, headwear, and natural camaraderie with bold contemporary graphic treatment.",
    phases: isSmooch
      ? [
          {
            step: "01",
            title: "Candid Reference Study",
            description:
              "Client provided a natural, unposed event snapshot. We analyzed facial proportions, ambient lighting angles, and emotional connection.",
          },
          {
            step: "02",
            title: "100% Hand-Drawn Inking",
            description:
              "Stroke-by-stroke digital inking on iPad Pro with custom brush textures. Zero automated filters, zero AI—100% artisanal line work.",
          },
          {
            step: "03",
            title: "Skin Tones & Street Lighting",
            description:
              "Layering rich skin undertones, vibrant warm highlights, and DKGRFX signature streetwear contrast cel-shading.",
          },
          {
            step: "04",
            title: "Museum Print Export",
            description:
              "Delivered in ultra-high resolution (300 DPI CMYK fine art canvas print file + social-ready digital formats).",
          },
        ]
      : [
          {
            step: "01",
            title: "Authentic Moment Selection",
            description:
              "Selecting the definitive photo capturing relaxed confidence and joy between father and son.",
          },
          {
            step: "02",
            title: "Millimeter Line Anatomy",
            description:
              "Careful freehand line work defining caps, clothing folds, posture, and expressive smiles with striking likeness.",
          },
          {
            step: "03",
            title: "Dynamic Shading & Tone",
            description:
              "Harmonizing warm skin tones with punchy highlights and modern dark-mode aesthetic.",
          },
          {
            step: "04",
            title: "Fine Art Heirloom Ready",
            description:
              "Crafted as a museum-quality digital piece ready for large-format physical wall framing.",
          },
        ],
  };

  // Sports shots configuration
  const sportsPhotos: SportsPhotoItem[] =
    slug === "volleyball-campaign"
      ? [
          {
            src: "/images/photo-volleyball-setting.jpg",
            alt: "Volleyball Campaign Hero Visual",
            title: "CAMPAIGN KEY VISUAL",
            shutter: "1/2000s",
            aperture: "f/2.8",
            iso: "1600",
            focalLength: "135mm",
            description:
              "Hero visual anchoring the tournament poster campaign with crisp focal tracking on the setter.",
          },
          {
            src: "/images/photo-volleyball-jump.jpg",
            alt: "Matchday Poster Art",
            title: "MATCHDAY POSTER ART",
            shutter: "1/2500s",
            aperture: "f/2.8",
            iso: "1250",
            focalLength: "200mm",
            description:
              "High-contrast action crop engineered for social matchday promotional graphics.",
          },
          {
            src: "/images/photo-volleyball-block.jpg",
            alt: "Defense Promo Graphic",
            title: "DEFENSE PROMO GRAPHIC",
            shutter: "1/2000s",
            aperture: "f/2.8",
            iso: "1600",
            focalLength: "70mm",
            description:
              "Dramatic defensive contest at the tape illuminated with high-speed sync strobes.",
          },
        ]
      : [
          {
            src: "/images/photo-volleyball-setting.jpg",
            alt: "Volleyball Setter at Peak Jump",
            title: "THE SET — FINGERTIP APEX",
            shutter: "1/2000s",
            aperture: "f/2.8",
            iso: "1600",
            focalLength: "135mm",
            description:
              "Frozen at the microsecond of ball release. Razor-sharp hand position and intense concentration.",
          },
          {
            src: "/images/photo-volleyball-jump.jpg",
            alt: "Volleyball Hitter Spike Attack",
            title: "THE ATTACK — PEAK VERTICAL",
            shutter: "1/2500s",
            aperture: "f/2.8",
            iso: "1250",
            focalLength: "200mm",
            description:
              "Full airborne vertical extension frozen mid-flight against stadium lighting.",
          },
          {
            src: "/images/photo-volleyball-block.jpg",
            alt: "Volleyball Two-Player Block Contest",
            title: "THE WALL — NET CONTEST",
            shutter: "1/2000s",
            aperture: "f/2.8",
            iso: "1600",
            focalLength: "70mm",
            description:
              "Above-the-tape contest with high-speed strobe sync isolating the players from the background.",
          },
          {
            src: "/images/photo-volleyball-blur.jpg",
            alt: "Kinetic Motion Court Action",
            title: "KINETIC ENERGY — MOTION PAN",
            shutter: "1/60s",
            aperture: "f/4.0",
            iso: "400",
            focalLength: "24mm",
            description:
              "Intentional kinetic motion blur capturing the explosive speed and raw court physics.",
          },
        ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": project.category === "art" ? "VisualArtwork" : "CreativeWork",
    name: project.title,
    headline: `${project.title} — ${project.subcategory}`,
    description: project.description,
    image: project.coverImage.startsWith("http")
      ? project.coverImage
      : `https://dkgrfx.com${project.coverImage}`,
    author: {
      "@type": "Person",
      name: "DKGRFX",
      url: "https://dkgrfx.com",
    },
    genre: project.subcategory,
    keywords: project.tags.join(", "),
    dateCreated: project.year || "2026",
  };

  return (
    <div className="min-h-screen bg-black pt-16 md:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Sticky Top Back Navigation Bar */}
      <WorkProjectTopNav currentProject={project} />

      {/* Hero Banner Section */}
      <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[72vh] overflow-hidden bg-neutral-950">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover object-center scale-100 filter brightness-90"
          priority
          sizes="100vw"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

        {/* Hero Overlay Details */}
        <div className="absolute bottom-8 sm:bottom-12 left-0 right-0">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest bg-white text-black rounded-full">
                {project.category.toUpperCase()}
              </span>
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-widest bg-black/70 backdrop-blur-md border border-neutral-700 text-neutral-300 rounded-full">
                {project.subcategory}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                // {project.year}
              </span>
              {isCommission && (
                <span className="px-3 py-1 text-[11px] font-heading font-black tracking-widest bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 uppercase rounded-full">
                  100% HAND-DRAWN DIGITAL ART
                </span>
              )}
              {isSports && (
                <span className="px-3 py-1 text-[11px] font-mono tracking-widest bg-red-950/80 border border-red-500/40 text-red-400 uppercase rounded-full">
                  ⚡ 1/2000s HIGH-SPEED SYNC
                </span>
              )}
            </div>

            <h1 className="font-heading font-bold uppercase text-[clamp(2rem,4.5vw,4.25rem)] leading-none text-white tracking-tight drop-shadow-md">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Project Header Info & Description */}
        <div className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 border-b border-neutral-900">
          <div className="lg:col-span-5 space-y-4">
            <SectionLabel>PROJECT BRIEF</SectionLabel>
            <h2 className="font-heading font-bold uppercase text-2xl sm:text-3xl text-white leading-tight tracking-tight">
              {isCommission
                ? "TURNING A REAL PHOTO INTO TIMELESS ART."
                : isCharacterArt
                ? "STREETWEAR ATTITUDE IN MOTION."
                : isSports
                ? "FREEZING PEAK ACTION AT THE NET."
                : "CAPTURING AUTHENTIC HUMAN STORIES."}
            </h2>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-neutral-900/80 border border-neutral-800 text-neutral-400 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <p className="text-base sm:text-lg text-neutral-300 font-body leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button href={waURL} variant="primary" size="md" isExternal>
                {ctaButtonText}
              </Button>
              <Link
                href="/work"
                className="text-xs font-heading font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
              >
                ← BACK TO WORK
              </Link>
            </div>
          </div>
        </div>

        {/* ── BESPOKE EXPERIENCE 1: COMMISSIONS & ARTWORKS ── */}
        {isCommission && (
          <div className="py-16 md:py-24 space-y-20 border-b border-neutral-900">
            {/* Interactive Before / After Comparison */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    INTERACTIVE COMMISSION COMPARISON
                  </div>
                  <h3 className="font-heading font-bold uppercase text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                    REFERENCE PHOTO VS. DKGRFX ART
                  </h3>
                </div>
                <p className="text-xs sm:text-sm font-body text-neutral-400 max-w-md">
                  Slide or toggle to compare the candid client photograph with
                  the finalized 100% hand-drawn digital artwork.
                </p>
              </div>

              {/* Draggable Slider Component */}
              <BeforeAfterCompare
                originalImage={commissionConfig.originalImage}
                artworkImage={commissionConfig.artworkImage}
                title={project.title}
                originalLabel="ORIGINAL REFERENCE PHOTO"
                artworkLabel="DKGRFX ART COMMISSION"
              />
            </div>

            {/* Clear Narrative: How This Commission Was Brought to Life */}
            <div className="p-8 sm:p-12 rounded-3xl border border-neutral-800 bg-neutral-950 space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-3">
                  <SectionLabel>THE CREATIVE PROCESS</SectionLabel>
                  <h3 className="font-heading font-bold uppercase text-2xl sm:text-3xl text-white leading-tight tracking-tight">
                    HOW THIS COMMISSION WAS BROUGHT TO LIFE
                  </h3>
                  <p className="text-sm font-body text-neutral-400 leading-relaxed">
                    {commissionConfig.leadStory}
                  </p>

                  {/* Trust badges */}
                  <div className="pt-4 flex flex-col gap-2.5">
                    <div className="flex items-center gap-3 text-xs font-mono text-neutral-300">
                      <span className="text-emerald-400">✓</span>
                      <span>100% Hand-drawn in Procreate on iPad Pro</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono text-neutral-300">
                      <span className="text-emerald-400">✓</span>
                      <span>Zero AI generators or automatic filter traces</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono text-neutral-300">
                      <span className="text-emerald-400">✓</span>
                      <span>Fine art 300 DPI canvas print master included</span>
                    </div>
                  </div>
                </div>

                {/* 4-Step Process Breakdown Grid */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {commissionConfig.phases.map((phase) => (
                    <div
                      key={phase.step}
                      className="p-6 rounded-2xl border border-neutral-900 bg-neutral-900/40 space-y-3"
                    >
                      <span className="font-heading font-black text-3xl text-neutral-700 block">
                        {phase.step}
                      </span>
                      <h4 className="font-heading font-black uppercase text-lg text-white">
                        {phase.title}
                      </h4>
                      <p className="text-xs font-body text-neutral-400 leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commission Specs Card */}
              <div className="pt-8 border-t border-neutral-900 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                    MEDIUM
                  </span>
                  <span className="text-xs sm:text-sm font-heading font-black uppercase text-white">
                    Digital Freehand
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                    TURNAROUND
                  </span>
                  <span className="text-xs sm:text-sm font-heading font-black uppercase text-white">
                    5–7 Business Days
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                    RESOLUTION
                  </span>
                  <span className="text-xs sm:text-sm font-heading font-black uppercase text-white">
                    300 DPI Fine Art
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                    PROOFING
                  </span>
                  <span className="text-xs sm:text-sm font-heading font-black uppercase text-white">
                    100% Client Approval
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── BESPOKE EXPERIENCE 2: CHARACTER ART ── */}
        {isCharacterArt && (
          <div className="py-16 md:py-24 border-b border-neutral-900">
            <CharacterArtShowcase
              image={project.coverImage}
              title={project.title}
              orderUrl={waURL}
            />
          </div>
        )}

        {/* ── BESPOKE EXPERIENCE 3: SPORTS PHOTOGRAPHY ── */}
        {isSports && (
          <div className="py-16 md:py-24 space-y-12 border-b border-neutral-900">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-500/30 text-red-400 text-xs font-mono uppercase mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  HIGH-SPEED SPORTS GALLERY
                </div>
                <h3 className="font-heading font-bold uppercase text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  ACTION GALLERY & CAMERA METADATA
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-body text-neutral-400 max-w-md">
                Click any action shot to open the high-res lightbox with full
                EXIF shutter speed and camera telemetry.
              </p>
            </div>

            {/* Action Grid with Lightbox */}
            <SportsActionGallery
              photos={sportsPhotos}
              projectTitle={project.title}
              bookingUrl={waURL}
            />

            {/* Sports Photography Coverage Features */}
            <div className="p-8 sm:p-10 rounded-2xl border border-neutral-800 bg-neutral-950 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <span className="text-xl mb-2 block">⚡</span>
                <h4 className="font-heading font-black uppercase text-base text-white mb-1">
                  1/2000s Freeze
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  No motion blur on fast ball spikes, fingertip sets, or dive
                  saves.
                </p>
              </div>
              <div>
                <span className="text-xl mb-2 block">🎯</span>
                <h4 className="font-heading font-black uppercase text-base text-white mb-1">
                  Court-Side Access
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Low-angle dynamic perspectives that bring viewers directly into
                  the arena clash.
                </p>
              </div>
              <div>
                <span className="text-xl mb-2 block">🚀</span>
                <h4 className="font-heading font-black uppercase text-base text-white mb-1">
                  Rapid Turnaround
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Select matchday highlight reels delivered same-day for social
                  media drops.
                </p>
              </div>
              <div>
                <span className="text-xl mb-2 block">🎨</span>
                <h4 className="font-heading font-black uppercase text-base text-white mb-1">
                  Poster & Campaign Ready
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Color-graded and cropped for print banners, rosters, and team
                  graphics.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── BESPOKE EXPERIENCE 4: DOCUMENTARY & EVENT GALLERIES ── */}
        {!isCommission && !isCharacterArt && !isSports && project.images.length > 0 && (
          <div className="py-16 md:py-24 space-y-8 border-b border-neutral-900">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <SectionLabel className="mb-2">EDITORIAL GALLERY</SectionLabel>
                <h3 className="font-heading font-black uppercase text-3xl sm:text-4xl text-white">
                  SELECTED FRAMES
                </h3>
              </div>
              <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                PRIME OPTICS // NATURAL LIGHT // CANDID MOMENTS
              </p>
            </div>

            <PhotoStoryGallery
              images={project.images}
              projectTitle={project.title}
            />
          </div>
        )}

        {/* Direct WhatsApp CTA Section */}
        <div className="py-16 md:py-24 border-b border-neutral-900">
          <div className="relative p-8 sm:p-14 rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-950 via-neutral-900/90 to-neutral-950 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 right-10 -translate-y-1/2 w-64 h-64 bg-white/5 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
                  // LET'S COLLABORATE
                </span>
                <h2 className="font-heading font-bold uppercase text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  {ctaHeading}
                </h2>
                <p className="text-sm sm:text-base font-body text-neutral-300 leading-relaxed">
                  {ctaSubheading}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-shrink-0 w-full lg:w-auto">
                <Button
                  href={waURL}
                  variant="primary"
                  size="lg"
                  isExternal
                  className="w-full sm:w-auto"
                >
                  {ctaButtonText}
                </Button>
                <Button
                  href="/services"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  VIEW ALL SERVICES →
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Project Navigation Switcher */}
        <WorkProjectBottomNav
          previousProject={previousProject}
          nextProject={nextProject}
        />
      </div>
    </div>
  );
}

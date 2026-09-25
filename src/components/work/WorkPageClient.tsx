"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageCard } from "@/components/ui/ImageCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjectsByCategory, projects as fallbackProjects } from "@/data/projects";
import type { Category } from "@/types";
import type { SanityProjectListItem } from "@/sanity/types";

const FILTERS = [
  { label: "ALL", value: "all" },
  { label: "ART", value: "art" },
  { label: "DESIGN", value: "design" },
  { label: "PHOTO", value: "photo" },
] as const;

interface WorkPageClientProps {
  sanityProjects?: SanityProjectListItem[] | null;
}

export function WorkPageClient({ sanityProjects }: WorkPageClientProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | Category>("all");

  const hasSanityProjects = Boolean(sanityProjects && sanityProjects.length > 0);

  const filteredSanity = hasSanityProjects && sanityProjects
    ? activeFilter === "all"
      ? sanityProjects
      : sanityProjects.filter((p) => p.category === activeFilter)
    : [];

  const filteredStatic = getProjectsByCategory(activeFilter);

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pt-16 md:pt-24 pb-12">
        <SectionLabel className="mb-4">Portfolio</SectionLabel>
        <SectionHeading className="text-[clamp(2.25rem,4.2vw,4rem)] text-white mb-12">
          {"THE WORK."}
        </SectionHeading>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value as "all" | Category)}
              className={`px-5 py-2 text-xs font-body font-semibold uppercase tracking-[0.2em] rounded-full border transition-all duration-200 ${
                activeFilter === f.value
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-neutral-400 border-neutral-700 hover:border-white hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {hasSanityProjects
              ? filteredSanity.map((project, i) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                  >
                    <ImageCard
                      sanityImage={project.coverImage}
                      alt={project.title}
                      title={project.title}
                      subtitle={`${project.category.toUpperCase()} · ${project.subcategory}`}
                      href={`/work/${project.slug}`}
                      aspectRatio="portrait"
                      priority={i < 3}
                    />
                  </motion.div>
                ))
              : filteredStatic.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                  >
                    <ImageCard
                      src={project.coverImage}
                      alt={project.title}
                      title={project.title}
                      subtitle={`${project.category.toUpperCase()} · ${project.subcategory}`}
                      href={`/work/${project.slug}`}
                      aspectRatio="portrait"
                      priority={i < 3}
                    />
                  </motion.div>
                ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

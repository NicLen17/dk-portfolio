import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types";

interface WorkProjectNavProps {
  currentProject: Project;
  previousProject: Project;
  nextProject: Project;
}

export function WorkProjectTopNav({ currentProject }: { currentProject: Project }) {
  return (
    <div className="w-full border-b border-neutral-800/80 bg-black/60 backdrop-blur-md sticky top-16 md:top-20 z-30">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 py-3.5 flex items-center justify-between gap-4">
        {/* Back Link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-heading font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors duration-200 group"
        >
          <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">
            ←
          </span>
          BACK TO ALL WORK
        </Link>

        {/* Breadcrumb Info */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider">
          <span>PORTFOLIO</span>
          <span className="text-neutral-700">/</span>
          <span className="text-neutral-400">{currentProject.category}</span>
          <span className="text-neutral-700">/</span>
          <span className="text-white truncate max-w-[200px]">{currentProject.title}</span>
        </div>

        {/* Category Badge */}
        <span className="px-2.5 py-1 text-[10px] font-heading font-black tracking-widest uppercase bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-full">
          {currentProject.subcategory}
        </span>
      </div>
    </div>
  );
}

export function WorkProjectBottomNav({
  previousProject,
  nextProject,
}: {
  previousProject: Project;
  nextProject: Project;
}) {
  return (
    <div className="w-full border-t border-neutral-900 pt-12 pb-20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <p className="text-xs font-heading font-black uppercase tracking-[0.25em] text-neutral-500">
          EXPLORE MORE WORK
        </p>
        <Link
          href="/work"
          className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
        >
          VIEW FULL ARCHIVE [→]
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Previous Project Card */}
        <Link
          href={`/work/${previousProject.slug}`}
          className="group relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl border border-neutral-800/80 bg-neutral-950/60 hover:border-neutral-600 hover:bg-neutral-900/60 transition-all duration-300"
        >
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={previousProject.coverImage}
              alt={previousProject.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="96px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">
              ← PREVIOUS PROJECT
            </span>
            <h4 className="font-heading font-bold uppercase text-lg sm:text-xl text-white truncate group-hover:translate-x-1 transition-transform tracking-tight">
              {previousProject.title}
            </h4>
            <p className="text-xs font-body text-neutral-400 uppercase tracking-wider mt-0.5">
              {previousProject.category} · {previousProject.subcategory}
            </p>
          </div>
        </Link>

        {/* Next Project Card */}
        <Link
          href={`/work/${nextProject.slug}`}
          className="group relative flex items-center justify-between text-right gap-4 p-4 sm:p-5 rounded-2xl border border-neutral-800/80 bg-neutral-950/60 hover:border-neutral-600 hover:bg-neutral-900/60 transition-all duration-300"
        >
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">
              NEXT PROJECT →
            </span>
            <h4 className="font-heading font-bold uppercase text-lg sm:text-xl text-white truncate group-hover:-translate-x-1 transition-transform tracking-tight">
              {nextProject.title}
            </h4>
            <p className="text-xs font-body text-neutral-400 uppercase tracking-wider mt-0.5">
              {nextProject.category} · {nextProject.subcategory}
            </p>
          </div>
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={nextProject.coverImage}
              alt={nextProject.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="96px"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

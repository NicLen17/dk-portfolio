"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  href?: string;
  className?: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "wide";
  priority?: boolean;
}

const aspectRatios = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

export function ImageCard({
  src,
  alt,
  title,
  subtitle,
  href,
  className,
  aspectRatio = "portrait",
  priority = false,
}: ImageCardProps) {
  const content = (
    <motion.div
      className={cn(
        "relative overflow-hidden group cursor-pointer",
        aspectRatios[aspectRatio],
        className
      )}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
      />
      {(title || subtitle) && (
        <div className="absolute inset-0 gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          {subtitle && (
            <p className="text-xs font-body uppercase tracking-[0.2em] text-neutral-300 mb-1">
              {subtitle}
            </p>
          )}
          {title && (
            <p className="font-heading font-black uppercase text-2xl text-white leading-none">
              {title}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

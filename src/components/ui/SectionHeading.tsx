"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: string | string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  animate?: boolean;
}

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
  animate = true,
}: SectionHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const lines = Array.isArray(children) ? children : [children];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const lineVariant = {
    hidden: { y: "100%", opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };


  if (!animate) {
    return (
      <Tag
        className={cn(
          "font-heading font-bold uppercase leading-[0.95] tracking-tight",
          className
        )}
      >
        {lines.join(" ")}
      </Tag>
    );
  }

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="overflow-hidden"
    >
      <Tag
        className={cn(
          "font-heading font-bold uppercase leading-[0.95] tracking-tight",
          className
        )}
      >
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span className="block" variants={lineVariant}>
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}

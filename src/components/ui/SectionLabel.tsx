import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: string | string[];
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-xs font-body font-semibold uppercase tracking-[0.25em] text-neutral-400",
        className
      )}
    >
      {children}
    </p>
  );
}

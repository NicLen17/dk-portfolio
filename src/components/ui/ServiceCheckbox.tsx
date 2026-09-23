"use client";

import { cn } from "@/lib/utils";
import type { ServiceOption } from "@/types";

interface ServiceCheckboxProps {
  label: ServiceOption;
  checked: boolean;
  onChange: (label: ServiceOption, checked: boolean) => void;
}

export function ServiceCheckbox({ label, checked, onChange }: ServiceCheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(label, e.target.checked)}
      />
      <div
        className={cn(
          "w-5 h-5 border rounded-sm flex items-center justify-center transition-all duration-200 flex-shrink-0",
          checked
            ? "bg-white border-white"
            : "bg-transparent border-neutral-500 group-hover:border-white"
        )}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <span
        className={cn(
          "font-body text-sm uppercase tracking-wider transition-colors duration-200 select-none",
          checked ? "text-white" : "text-neutral-400 group-hover:text-white"
        )}
      >
        {label}
      </span>
    </label>
  );
}

"use client";

import { cn } from "@/lib/utils";

export type PillOption<T extends string> = { value: T; label: string };

export function PillToggleGroup<T extends string>({
  options,
  value,
  onValueChange,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: {
  options: readonly PillOption<T>[];
  value: T;
  onValueChange: (v: T) => void;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onValueChange(opt.value)}
            className={cn(
              "inline-flex h-10 shrink-0 items-center justify-center rounded-full px-4 text-base font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              selected
                ? "border-[1.5px] border-[#125B3A] bg-[#E0F5EC] text-[#125B3A]"
                : "border-app border-border-subtle bg-sidebar text-foreground hover:bg-nav-active",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

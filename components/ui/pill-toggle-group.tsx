"use client";

import { cn } from "@/lib/utils";

export type PillOption<T extends string> = { value: T; label: string };

export function PillToggleGroup<T extends string>({
  options,
  value,
  onValueChange,
  className,
  "aria-label": ariaLabel,
}: {
  options: readonly PillOption<T>[];
  value: T;
  onValueChange: (v: T) => void;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
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
              "rounded-full border-app border-border-subtle px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
              selected
                ? "bg-foreground text-surface dark:bg-white dark:text-neutral-900"
                : "bg-sidebar text-foreground hover:bg-nav-active",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

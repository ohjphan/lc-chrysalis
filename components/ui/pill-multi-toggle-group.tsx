"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type PillMultiOption<T extends string> = { value: T; label: string };

export function PillMultiToggleGroup<T extends string>({
  options,
  value,
  onValueChange,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: {
  options: readonly PillMultiOption<T>[];
  value: readonly T[];
  onValueChange: (next: T[]) => void;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}) {
  const selected = new Set(value);

  function toggle(v: T) {
    const next = new Set(selected);
    if (next.has(v)) next.delete(v);
    else next.add(v);
    onValueChange([...next] as T[]);
  }

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {options.map((opt) => {
        const isOn = selected.has(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={isOn}
            onClick={() => toggle(opt.value)}
            className={cn(
              "inline-flex h-[length:var(--control-height)] shrink-0 items-center justify-center rounded-[var(--radius-sm)] px-4 text-base font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isOn
                ? "border-[1.5px] border-[#1DB470] bg-[rgba(29,180,112,0.06)] font-medium text-foreground"
                : "border-app border-border-subtle bg-sidebar text-nav-link-idle hover:bg-nav-active hover:text-[#242423] dark:hover:text-foreground",
            )}
          >
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

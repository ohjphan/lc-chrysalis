"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { PillVariant } from "@/components/ui/pill-toggle-group";

export type PillMultiOption<T extends string> = { value: T; label: string };

export function PillMultiToggleGroup<T extends string>({
  options,
  value,
  onValueChange,
  variant = "default",
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: {
  options: readonly PillMultiOption<T>[];
  value: readonly T[];
  onValueChange: (next: T[]) => void;
  variant?: PillVariant;
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
              "group inline-flex h-10 shrink-0 items-center justify-center rounded-[4px] px-4 text-base font-normal transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              variant === "darkIndicator"
                ? isOn
                  ? "border-app border-charcoal bg-charcoal font-medium text-white"
                  : "border-app border-border-subtle bg-sidebar text-nav-link-idle hover:bg-nav-active hover:text-heading dark:hover:text-foreground"
                : variant === "borderless"
                ? isOn
                  ? "bg-[#199E62] font-medium text-white"
                  : "bg-sidebar text-nav-link-idle hover:bg-nav-active hover:text-heading dark:hover:text-foreground"
                : isOn
                  ? "border-solid border-[length:var(--border-stroke)] border-[#1DB470] bg-[rgba(29,180,112,0.06)] font-medium text-foreground"
                  : "border-app border-border-subtle bg-sidebar text-nav-link-idle hover:bg-nav-active hover:text-heading dark:hover:text-foreground",
            )}
          >
            <span
              className={cn(
                "relative inline-flex -translate-y-px items-center justify-center transition-[padding,transform] duration-200 ease-in-out",
                variant === "darkIndicator" &&
                  (isOn
                    ? "pl-3.5"
                    : "group-hover:pl-3.5 group-focus-visible:pl-3.5"),
              )}
            >
              {variant === "darkIndicator" ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 size-1.5 rounded-full transition-all duration-200 ease-in-out",
                    isOn
                      ? "scale-100 bg-accent-green opacity-100"
                      : "scale-75 bg-gray-1 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100",
                  )}
                />
              ) : null}
              <span>{opt.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

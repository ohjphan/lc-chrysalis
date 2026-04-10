"use client";

import { cn } from "@/lib/utils";

export type PillOption<T extends string> = { value: T; label: string };
export type PillVariant = "default" | "borderless" | "darkIndicator";

export function PillToggleGroup<T extends string>({
  options,
  value,
  onValueChange,
  variant = "darkIndicator",
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: {
  options: readonly PillOption<T>[];
  value: T;
  onValueChange: (v: T) => void;
  variant?: PillVariant;
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
              "group inline-flex h-10 shrink-0 items-center justify-center rounded-[4px] px-4 text-base font-normal transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              variant === "darkIndicator"
                ? selected
                  ? "border-app border-border-subtle bg-nav-active font-medium text-charcoal"
                  : "border-app border-border-subtle bg-background text-nav-link-idle hover:bg-sidebar hover:text-heading dark:hover:text-foreground"
                : variant === "borderless"
                ? selected
                  ? "bg-[#199E62] font-medium text-white"
                  : "bg-sidebar text-nav-link-idle hover:bg-nav-active hover:text-heading dark:hover:text-foreground"
                : selected
                  ? "border-solid border-[length:var(--border-stroke)] border-[#1DB470] bg-[rgba(29,180,112,0.06)] font-medium text-foreground"
                  : "border-app border-border-subtle bg-sidebar text-nav-link-idle hover:bg-nav-active hover:text-heading dark:hover:text-foreground",
            )}
          >
            <span
              className={cn(
                "relative inline-flex -translate-y-px items-center justify-center transition-[padding,transform] duration-200 ease-in-out",
                variant === "darkIndicator" &&
                  (selected
                    ? "pl-3.5"
                    : "group-hover:pl-3.5 group-focus-visible:pl-3.5"),
              )}
            >
              {variant === "darkIndicator" ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 size-1.5 rounded-full transition-all duration-200 ease-in-out",
                    selected
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

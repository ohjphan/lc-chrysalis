"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectableCardOption<T extends string> = {
  value: T;
  label: React.ReactNode;
  description?: React.ReactNode;
};

export type SelectableCardGroupVariant = "green" | "dark";

export function SelectableCardGroup<T extends string>({
  options,
  value,
  onValueChange,
  className,
  scrollable = false,
  variant = "green",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: {
  options: readonly SelectableCardOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  className?: string;
  scrollable?: boolean;
  variant?: SelectableCardGroupVariant;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}) {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  React.useEffect(() => {
    if (!scrollable) return;

    const node = scrollRef.current;
    if (!node) return;

    const updateScrollState = () => {
      const maxScrollLeft = node.scrollWidth - node.clientWidth;
      setCanScrollLeft(node.scrollLeft > 0);
      setCanScrollRight(maxScrollLeft - node.scrollLeft > 1);
    };

    updateScrollState();
    node.addEventListener("scroll", updateScrollState, { passive: true });

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(node);

    return () => {
      node.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [scrollable, options]);

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        role="radiogroup"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={cn(
          scrollable
            ? "flex w-full flex-nowrap gap-2 overflow-x-auto pb-4 pr-16"
            : "flex w-full flex-wrap gap-2",
          className,
        )}
      >
        {options.map((option) => {
          const selected = option.value === value;
          const selectedCardClass =
            variant === "dark"
              ? "border-solid border-[length:var(--border-stroke)] border-charcoal bg-charcoal shadow-none"
              : "border-solid border-[length:var(--border-stroke)] border-border-subtle bg-nav-active shadow-none";
          const selectedTitleClass =
            variant === "dark" ? "text-white" : "text-charcoal";
          const selectedDescriptionClass =
            variant === "dark" ? "text-white/75" : "text-[#3A3A37]";

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onValueChange(option.value)}
              className={cn(
                "group relative flex min-h-10 min-w-0 flex-col items-stretch justify-start gap-1.5 rounded-md bg-background p-4 text-left transition-[border-color,box-shadow,background-color] duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                scrollable ? "w-[17rem] flex-none" : "flex-1",
                selected
                  ? selectedCardClass
                  : "border-app border-border-subtle hover:border-border-subtle hover:bg-sidebar",
              )}
            >
              {selected ? (
                <span className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-accent-green text-white">
                  <Check className="size-3" strokeWidth={2.5} aria-hidden />
                </span>
              ) : null}
              <span
                className={cn(
                  "pr-8 text-base font-[550] text-foreground",
                  selected && selectedTitleClass,
                )}
              >
                {option.label}
              </span>
              {option.description ? (
                <span
                  className={cn(
                    "text-[13px] font-normal leading-snug text-muted-foreground",
                    selected && selectedDescriptionClass,
                  )}
                >
                  {option.description}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      {scrollable ? (
        <>
          {canScrollLeft ? (
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background via-background/85 to-transparent" />
          ) : null}
          {canScrollRight ? (
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background via-background/90 to-transparent" />
          ) : null}
        </>
      ) : null}
    </div>
  );
}

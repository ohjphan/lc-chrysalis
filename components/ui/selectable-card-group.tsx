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
export type SelectableCardIndicatorStyle = "radio" | "check" | "none";

export type GreenInsetBorderColor = "accent-green" | "gray-5";

export function SelectableCardGroup<T extends string>({
  options,
  value,
  onValueChange,
  className,
  scrollable = false,
  variant = "green",
  indicatorStyle = "radio",
  /**
   * When set with `greenInsetBorderColor: "accent-green"`, selected green cards
   * use a green outer border and 1px green inset. Use with `activeTopAccent={false}`
   * if you also need the Gray 5+inset layout without the top bar.
   */
  greenInsetBorder = false,
  /**
   * Only with `greenInsetBorder`: `"accent-green"` = green line treatment;
   * `"gray-5"` matches the default look.
   */
  greenInsetBorderColor = "gray-5",
  /**
   * Top accent row (`h-1`), modal-style. When unselected, warm top bar on hover/focus.
   * @default true — product default. Pass `false` for Gray 5 border + 1px inset
   * on light beige (no top bar).
   */
  activeTopAccent = true,
  /**
   * When false (and default Gray 5 path), the selected state uses the same
   * Gray 5 outer border + light beige fill, but no 1px inner inset. Default true.
   */
  innerInsetOnSelected = true,
  /**
   * Replaces the default `border-[var(--gray-5)]` on the selected card when
   * using the Gray 5+inset path (`activeTopAccent={false}`, not accent-green inset).
   * E.g. `border-[#CCC9C6]`.
   */
  selectedOuterBorderClassName,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: {
  options: readonly SelectableCardOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  className?: string;
  scrollable?: boolean;
  variant?: SelectableCardGroupVariant;
  indicatorStyle?: SelectableCardIndicatorStyle;
  greenInsetBorder?: boolean;
  greenInsetBorderColor?: GreenInsetBorderColor;
  activeTopAccent?: boolean;
  innerInsetOnSelected?: boolean;
  selectedOuterBorderClassName?: string;
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
              ? cn(
                  "border-solid border-[length:var(--border-stroke)] border-charcoal bg-charcoal",
                  !greenInsetBorder && "shadow-none",
                )
              : activeTopAccent
                ? cn(
                    "border-solid border-[length:var(--border-stroke)] border-border-subtle bg-sidebar",
                    "shadow-none",
                  )
                : greenInsetBorder && greenInsetBorderColor === "accent-green"
                  ? "border-solid border-[length:var(--border-stroke)] border-[var(--accent-green)] bg-sidebar"
                  : cn(
                      "border-solid border-[length:var(--border-stroke)] bg-sidebar",
                      selectedOuterBorderClassName ?? "border-[var(--gray-5)]",
                      !innerInsetOnSelected && "shadow-none",
                    );
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
                "group relative flex min-h-10 min-w-0 flex-col items-stretch justify-start rounded-[var(--radius-md)] bg-background text-left transition-[border-color,box-shadow,background-color] duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                activeTopAccent
                  ? "overflow-hidden p-0"
                  : "gap-1.5 p-4",
                scrollable ? "w-[17rem] flex-none" : "flex-1",
                selected
                  ? selectedCardClass
                  : cn(
                      "border-app border-border-subtle hover:border-border-subtle",
                      !activeTopAccent && "hover:bg-sidebar",
                    ),
                selected &&
                  variant === "green" &&
                  !activeTopAccent &&
                  innerInsetOnSelected &&
                  (greenInsetBorder && greenInsetBorderColor === "accent-green"
                    ? "shadow-[inset_0_0_0_1px_var(--accent-green)]"
                    : "shadow-[inset_0_0_0_1px_var(--gray-5)]"),
              )}
            >
              {activeTopAccent ? (
                <div
                  className={cn(
                    "h-1 w-full shrink-0 transition-colors",
                    selected
                      ? "bg-accent-green"
                      : "bg-transparent group-focus-visible:bg-nav-active group-hover:bg-nav-active",
                  )}
                  aria-hidden
                />
              ) : null}
              <div
                className={cn(
                  "min-w-0",
                  activeTopAccent
                    ? "flex flex-1 flex-col gap-1.5 p-4"
                    : "contents",
                )}
              >
                {indicatorStyle === "radio" ? (
                  <span
                    className={cn(
                      "absolute right-3 top-3 flex size-5 items-center justify-center rounded-full border-app border-border-subtle bg-background",
                      selected && "border-accent-green bg-accent-green",
                    )}
                    aria-hidden
                  >
                    <span
                      className={cn(
                        "size-2 rounded-full transition-opacity",
                        selected ? "bg-white opacity-100" : "opacity-0",
                      )}
                    />
                  </span>
                ) : indicatorStyle === "check" && selected ? (
                  <span
                    className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-accent-green text-white"
                    aria-hidden
                  >
                    <Check className="size-3 translate-y-[0.5px]" strokeWidth={2.5} />
                  </span>
                ) : null}
                <span
                  className={cn(
                    "text-base font-[550] text-foreground",
                    indicatorStyle !== "none" && "pr-8",
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
              </div>
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

import * as React from "react";
import { BRAND_AVATAR_BADGES_FOR_DOCS } from "@/lib/brand-avatar-colors";
import { cn } from "@/lib/utils";

export const colorBadgeShellClass =
  "inline-flex items-center justify-center rounded-[4px] px-2.5 pt-[4px] pb-[2px] font-nav-eyebrow text-[11px] font-medium uppercase leading-none";

const colorBadgeVariants = {
  green: "bg-[rgba(29,180,112,0.2)] text-charcoal/80",
  pink: "bg-[rgba(252,189,189,0.2)] text-charcoal/80",
  yellow: "bg-[rgba(253,209,81,0.2)] text-charcoal/80",
  beige: "bg-[rgba(239,235,231,0.2)] text-charcoal/80",
  blue: "bg-[rgba(29,78,216,0.2)] text-charcoal/80",
  gray: "bg-[#EFEBE7B3] text-gray-4",
} as const;

export type ColorBadgeVariant = keyof typeof colorBadgeVariants;

export type SecondaryPaletteBadgeSwatch =
  (typeof BRAND_AVATAR_BADGES_FOR_DOCS)[number];

/** Secondary / avatar palette: 20% swatch fill + charcoal text @ 80% (same as `ColorBadge` non-gray). */
export function SecondaryPaletteBadge({
  swatch,
  className,
  children,
}: {
  swatch: SecondaryPaletteBadgeSwatch;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <span
      className={cn(colorBadgeShellClass, swatch.badgeClass, className)}
    >
      {children ?? swatch.label}
    </span>
  );
}

export function ColorBadge({
  variant,
  className,
  children,
}: {
  variant: ColorBadgeVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        colorBadgeShellClass,
        colorBadgeVariants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

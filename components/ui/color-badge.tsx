import * as React from "react";
import { BRAND_AVATAR_BADGES_FOR_DOCS } from "@/lib/brand-avatar-colors";
import { cn } from "@/lib/utils";

export const colorBadgeShellClass =
  "inline-flex items-center rounded-[4px] px-2.5 py-0.5 font-nav-eyebrow text-[11px] font-medium uppercase";

const colorBadgeVariants = {
  green: "bg-[rgba(29,180,112,0.2)] text-[#242423]",
  pink: "bg-[rgba(252,189,189,0.2)] text-[#242423]",
  yellow: "bg-[rgba(253,209,81,0.2)] text-[#242423]",
  beige: "bg-[rgba(239,235,231,0.2)] text-[#242423]",
  blue: "bg-[rgba(29,78,216,0.2)] text-[#242423]",
  gray: "bg-[rgba(204,201,198,0.2)] text-[#242423]",
} as const;

export type ColorBadgeVariant = keyof typeof colorBadgeVariants;

export type SecondaryPaletteBadgeSwatch =
  (typeof BRAND_AVATAR_BADGES_FOR_DOCS)[number];

/** Secondary / avatar palette: 20% swatch fill + #242423 text (same as `ColorBadge`). */
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

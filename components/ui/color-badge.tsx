import * as React from "react";
import { cn } from "@/lib/utils";

const colorBadgeVariants = {
  green: "bg-[#E0F5EC] text-[#125B3A]",
  pink: "bg-[#FCF0F0] text-[#7C2D12]",
  yellow: "bg-[#FEF9E7] text-[#A16207]",
  beige: "bg-[#EFEBE7] text-[#44403C]",
  blue: "bg-[#EEF7FF] text-[#1D4ED8]",
} as const;

export type ColorBadgeVariant = keyof typeof colorBadgeVariants;

const colorBadgeBaseClass =
  "inline-flex items-center rounded-full px-2.5 py-0.5 font-nav-eyebrow text-[11px] font-medium uppercase";

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
      className={cn(colorBadgeBaseClass, colorBadgeVariants[variant], className)}
    >
      {children}
    </span>
  );
}

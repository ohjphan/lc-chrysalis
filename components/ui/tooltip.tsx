"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipArrow = TooltipPrimitive.Arrow;

const tooltipContentVariants = {
  dark: "border-app border-charcoal bg-charcoal text-white shadow-md",
  lightBeige:
    "border-app border-border-subtle bg-surface text-foreground shadow-md",
} as const;

const tooltipCloseButtonVariants = {
  dark:
    "text-white/70 hover:bg-white/10 hover:text-white focus-visible:ring-white/30",
  lightBeige:
    "text-muted-foreground hover:bg-nav-active hover:text-foreground focus-visible:ring-border-subtle",
} as const;

export type TooltipContentVariant = keyof typeof tooltipContentVariants;

export function tooltipCloseButtonClass(variant: TooltipContentVariant = "dark") {
  return cn(
    "absolute right-2 top-2 inline-flex size-5 items-center justify-center rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2",
    tooltipCloseButtonVariants[variant],
  );
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    variant?: TooltipContentVariant;
  }
>(({ className, sideOffset = 6, variant = "dark", ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-w-xs rounded-md p-4 text-[14px] animate-in fade-in-0 zoom-in-95",
        tooltipContentVariants[variant],
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, TooltipArrow };

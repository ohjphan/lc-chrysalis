"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
  variant?: "circle" | "boxy" | "boxyDark" | "boxyDarkSimple";
};

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant = "circle", ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer group relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center border-app border-border-subtle bg-nav-active transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50",
      variant === "boxyDark" || variant === "boxyDarkSimple"
        ? "rounded-[4px] data-[state=checked]:border-charcoal data-[state=checked]:bg-charcoal"
        : "data-[state=checked]:border-accent-green data-[state=checked]:bg-accent-green",
      variant === "boxy" || variant === "boxyDark" || variant === "boxyDarkSimple"
        ? "rounded-[4px]"
        : "rounded-full",
      className,
    )}
    {...props}
    ref={ref}
  >
    {variant === "boxyDark" ? (
      <span
        aria-hidden
        className="pointer-events-none absolute left-[6px] top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-gray-1 transition-[background-color,left,right] duration-200 ease-in-out group-data-[state=unchecked]:left-auto group-data-[state=unchecked]:right-[6px] group-data-[state=checked]:bg-accent-green"
      />
    ) : null}
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none z-10 block size-[20px] translate-x-[2px] bg-surface shadow-lg ring-0 transition-transform",
        variant === "boxy" ||
          variant === "boxyDark" ||
          variant === "boxyDarkSimple"
          ? "rounded-[2px] data-[state=checked]:translate-x-[19px]"
          : "rounded-full data-[state=checked]:translate-x-[19.5px]",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

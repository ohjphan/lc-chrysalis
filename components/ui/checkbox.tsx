"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  "peer size-5 shrink-0 rounded border-app border-border-subtle bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        green:
          "data-[state=checked]:border-accent-green data-[state=checked]:bg-accent-green data-[state=checked]:text-white",
        darkGreen:
          "data-[state=checked]:border-charcoal data-[state=checked]:bg-charcoal data-[state=checked]:text-accent-green",
      },
    },
    defaultVariants: {
      variant: "green",
    },
  },
);

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
    VariantProps<typeof checkboxVariants>
>(({ className, variant, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ variant }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="size-3.5 stroke-[3]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

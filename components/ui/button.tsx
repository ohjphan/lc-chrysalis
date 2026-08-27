import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] text-center text-[14px] font-sans font-medium leading-none -translate-y-px transition-[color,background-color,border-color,opacity,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_.lc-material-symbol]:translate-y-px",
  {
    variants: {
      variant: {
        primary: "bg-charcoal text-white hover:opacity-90",
        secondary:
          "border-app border-border-subtle bg-surface hover:bg-nav-active",
        ghost: "hover:bg-nav-active dark:hover:bg-nav-link-active",
        destructive: "bg-[#9D1F18] text-white hover:opacity-90",
      },
      size: {
        default: "h-9 px-4 py-0",
        sm: "px-4 py-2 text-[12px] font-medium",
        /** Composite rows (`h-10` + `items-center`): override global `-translate-y-px` for optical centering. */
        embed:
          "h-8 rounded-[2px] px-3 text-[12px] font-medium translate-y-[0.5px] [&_.lc-material-symbol]:translate-y-[0.5px]",
        lg: "h-10 px-6 py-0",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

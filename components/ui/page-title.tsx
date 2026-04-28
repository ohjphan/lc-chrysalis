import * as React from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variantClass = {
  default: "font-page-title text-heading text-balance",
  /** Landing hero: JetBrains Mono, caps — matches legacy dashboard page title look */
  heroMono:
    "font-mono text-[28px] font-light uppercase leading-tight tracking-[0.04em] text-heading text-balance",
  /** Sign up / profile setup: JetBrains Mono, caps, 5% tracking */
  authBranded:
    "font-mono text-[28px] font-light uppercase leading-tight tracking-[5%] text-heading text-balance",
  /** Onboarding wizard: Parabolica, sentence case, matches profile flow mocks */
  onboarding: "font-page-title text-heading text-balance",
} as const;

export type PageTitleProps = {
  className?: string;
  children: ReactNode;
  variant?: keyof typeof variantClass;
  /** Renders after the title on the same row; vertically centered with the heading text. */
  trailing?: ReactNode;
  /**
   * Use `h2` in dialogs (with Radix `DialogTitle asChild`) so the page keeps a single `h1`.
   * @default "h1"
   */
  as?: "h1" | "h2";
} & Omit<React.HTMLAttributes<HTMLHeadingElement>, "className" | "children" | "ref">;

export const PageTitle = React.forwardRef<HTMLHeadingElement, PageTitleProps>(
  function PageTitle(
    { className, children, variant = "default", trailing, as = "h1", ...rest },
    ref,
  ) {
    const H = (as === "h2" ? "h2" : "h1") as "h1" | "h2";
    const heading = (
      <H
        ref={ref}
        className={cn(variantClass[variant], className)}
        {...rest}
      >
        {children}
      </H>
    );

    if (!trailing) {
      return heading;
    }

    return (
      <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
        {heading}
        <span className="inline-flex shrink-0 translate-y-[4px] items-center">
          {trailing}
        </span>
      </div>
    );
  },
);
PageTitle.displayName = "PageTitle";

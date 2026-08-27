import * as React from "react";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  XCircle,
} from "@/lib/lucide-svg";
import { cn } from "@/lib/utils";

export type CalloutVariant = "neutral" | "success" | "warning" | "destructive";

export interface CalloutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  variant?: CalloutVariant;
  bordered?: boolean;
  hideIcon?: boolean;
  headline: React.ReactNode;
  description: React.ReactNode;
}

const variantClass: Record<CalloutVariant, string> = {
  neutral: "bg-callout-neutral-bg border-callout-neutral-border",
  success: "bg-callout-success-bg border-callout-success-border",
  warning: "bg-callout-warning-bg border-callout-warning-border",
  destructive: "bg-callout-destructive-bg border-callout-destructive-border",
};

const borderlessVariantClass: Record<CalloutVariant, string> = {
  neutral: "bg-[var(--callout-neutral-bg-strong)]",
  success: "bg-[var(--callout-success-bg-strong)]",
  warning: "bg-[var(--callout-warning-bg-strong)]",
  destructive: "bg-[var(--callout-destructive-bg-strong)]",
};

/** Leading glyphs only; icons match toast notifications. */
function CalloutIcon({ variant }: { variant: CalloutVariant }) {
  const iconClass = "size-[18px] shrink-0 block";
  switch (variant) {
    case "neutral":
      return (
        <Info
          className={cn(
            iconClass,
            "text-[#55554E] dark:text-[#a3a3a3]",
          )}
          strokeWidth={2.5}
          aria-hidden
        />
      );
    case "success":
      return (
        <CheckCircle2
          className={cn(iconClass, "text-accent-green")}
          strokeWidth={2.5}
          aria-hidden
        />
      );
    case "warning":
      return (
        <XCircle
          className={cn(iconClass, "text-[#FDD151]")}
          strokeWidth={2.5}
          aria-hidden
        />
      );
    case "destructive":
      return (
        <AlertCircle
          className={cn(iconClass, "text-[#FF554C]")}
          strokeWidth={2.5}
          aria-hidden
        />
      );
  }
}

export function Callout({
  className,
  variant = "neutral",
  bordered = true,
  hideIcon = false,
  headline,
  description,
  ...props
}: CalloutProps) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-[4px] p-4 text-foreground",
        bordered && "border-app",
        bordered ? variantClass[variant] : borderlessVariantClass[variant],
        className,
      )}
      {...props}
    >
      {hideIcon ? null : (
        <span className="mt-0.5 shrink-0" aria-hidden>
          <CalloutIcon variant={variant} />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="text-base font-medium leading-normal text-charcoal dark:text-foreground">
          {headline}
        </div>
        <div className="mt-1 text-base font-normal leading-normal text-muted-foreground">
          {description}
        </div>
      </div>
    </div>
  );
}

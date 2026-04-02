import * as React from "react";
import { AlertTriangle, Check, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalloutVariant = "neutral" | "success" | "warning" | "destructive";

export interface CalloutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  variant?: CalloutVariant;
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

/** Leading glyph only (no filled circle); hues match callout borders / toast accents. */
function CalloutIcon({ variant }: { variant: CalloutVariant }) {
  const iconClass = "size-[18px] shrink-0 block";
  switch (variant) {
    case "neutral":
      return (
        <Info
          className={cn(iconClass, "text-border-subtle")}
          strokeWidth={2.5}
          aria-hidden
        />
      );
    case "success":
      return (
        <Check
          className={cn(iconClass, "text-accent-green")}
          strokeWidth={2.5}
          aria-hidden
        />
      );
    case "warning":
      return (
        <AlertTriangle
          className={cn(iconClass, "text-accent-yellow")}
          strokeWidth={2.5}
          aria-hidden
        />
      );
    case "destructive":
      return (
        <X
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
  hideIcon = false,
  headline,
  description,
  ...props
}: CalloutProps) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-md border-app p-4 text-foreground",
        variantClass[variant],
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
        <div className="text-base font-medium leading-normal text-foreground">
          {headline}
        </div>
        <div className="mt-1 text-base font-normal leading-normal text-muted-foreground">
          {description}
        </div>
      </div>
    </div>
  );
}

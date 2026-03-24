import * as React from "react";
import { cn } from "@/lib/utils";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "warning" | "destructive";
}

export function Callout({
  className,
  variant = "default",
  ...props
}: CalloutProps) {
  return (
    <div
      role="note"
      className={cn(
        "rounded-md border-app border-border-subtle p-4 text-base font-normal",
        variant === "default" && "bg-surface text-foreground",
        variant === "warning" &&
          "bg-amber-50 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100",
        variant === "destructive" && "bg-destructive-muted text-destructive",
        className,
      )}
      {...props}
    />
  );
}

"use client";

import { colorBadgeShellClass } from "@/components/ui/color-badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const EARLY_RELEASE_TOOLTIP_COPY =
  "The server is evolving, and breaking changes may occur. Email support@learningcommons.org with your feedback or issues.";

export function EarlyReleaseBadge({ className }: { className?: string }) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label="Show early release details"
            className={cn(
              colorBadgeShellClass,
              "bg-[rgba(29,180,112,0.2)] text-charcoal/80 transition-colors hover:bg-[rgba(29,180,112,0.26)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              className,
            )}
          >
            Early release
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="center"
          className="max-w-[22rem] text-left normal-case leading-relaxed"
        >
          {EARLY_RELEASE_TOOLTIP_COPY}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

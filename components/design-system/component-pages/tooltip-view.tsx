"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  type TooltipContentVariant,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function ClickTooltipExample({
  variant = "dark",
  forceOpen = false,
  withIndicator = false,
}: {
  variant?: TooltipContentVariant;
  forceOpen?: boolean;
  withIndicator?: boolean;
}) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={forceOpen ? true : undefined}>
        <TooltipTrigger asChild>
          <Button variant="secondary">
            Open tooltip
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="start"
          sideOffset={withIndicator ? 10 : 6}
          variant={variant}
          className={cn(
            "max-w-[22rem] text-left normal-case leading-relaxed",
            withIndicator && "relative",
          )}
        >
          {withIndicator ? (
            <span
              aria-hidden
              className={cn(
                "absolute left-5 top-0 size-3 -translate-y-1/2 rotate-45",
                variant === "lightBeige"
                  ? "border-app-l border-app-t border-border-subtle bg-surface"
                  : "bg-charcoal",
              )}
            />
          ) : null}
          Tooltips can reveal concise supporting details without changing the
          surrounding layout.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function TooltipView() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">Tooltip</h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Compact, anchored guidance for supporting context. The charcoal tooltip
          is the default surface used by shared product tooltips.
        </p>
      </div>

      <div className="space-y-4">
        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Charcoal with indicator
            </h3>
            <p className="text-base font-normal text-muted-foreground">
              Dark tooltip surface with a visible pointer coming from the trigger.
            </p>
          </div>
          <div className="flex min-h-[7rem] items-start">
            <ClickTooltipExample forceOpen withIndicator />
          </div>
        </section>
      </div>
    </div>
  );
}

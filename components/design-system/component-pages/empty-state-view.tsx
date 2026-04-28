"use client";

import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";

export function EmptyStateView() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">
          Empty state
        </h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Use <code className="font-mono text-sm text-foreground">Empty</code> to
          communicate blank, first-run, or no-results states with a concise
          action.
        </p>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Illustration is currently a placeholder. The illustration is using a
          16:9 ratio.
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="space-y-8">
          <Empty
            icon={
              <img
                src="/scene-computer-finished.svg"
                alt=""
                className="h-auto w-[141.5px] max-w-full"
                aria-hidden
              />
            }
            title="No Dataset found"
            description="No dataset match your search criteria."
            action={<Button variant="primary">Clear search</Button>}
            iconContainerClassName="size-auto rounded-none border-0 bg-transparent p-0"
          />
        </div>
      </div>
    </div>
  );
}

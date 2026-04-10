"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Empty({
  icon,
  title,
  description,
  action,
  className,
  iconContainerClassName,
}: {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
  iconContainerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-4 px-8 py-10 text-center",
        className,
      )}
    >
      {icon ? (
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-md border-app border-border-subtle bg-sidebar text-charcoal dark:text-foreground",
            iconContainerClassName,
          )}
        >
          {icon}
        </div>
      ) : null}
      <div className="flex flex-col items-center gap-8">
        <div>
          <h3 className="font-page-h3 leading-[1.35] text-heading dark:text-foreground">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 max-w-md text-base font-normal text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { PaginationButtonGroup } from "@/components/ui/pagination";

export function PaginationView() {
  const [defaultPage, setDefaultPage] = React.useState(4);
  const [densePage, setDensePage] = React.useState(11);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">
          Pagination
        </h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Grouped pagination controls for moving through paged results, tables, or
          long record sets without leaving the current view context.
        </p>
      </div>

      <div className="space-y-10">
        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Default
            </h3>
            <p className="text-base font-normal text-muted-foreground">
              Standard button-group pagination with previous, next, and visible page
              numbers.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <PaginationButtonGroup
              page={defaultPage}
              totalPages={12}
              onPageChange={setDefaultPage}
            />
            <p className="font-nav-sidebar-eyebrow uppercase text-eyebrow">
              Page {defaultPage} of 12
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Large range
            </h3>
            <p className="text-base font-normal text-muted-foreground">
              Collapses distant pages into ellipses when the page range gets longer.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <PaginationButtonGroup
              page={densePage}
              totalPages={24}
              onPageChange={setDensePage}
            />
            <p className="font-nav-sidebar-eyebrow uppercase text-eyebrow">
              Page {densePage} of 24
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

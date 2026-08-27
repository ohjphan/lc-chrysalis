"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Lock } from "lucide-react";
import {
  RequestAccessModal,
  type DatasetRequestTarget,
} from "@/components/dataset/request-access-modal";
import {
  CollectionGatedPill,
  CollectionProductPill,
  CollectionProviderAvatar,
  MetaPill,
  childToRequestTarget,
} from "@/components/dataset/explorations/collection-presentational";
import {
  CollectionSidebar,
  RelatedDatasetCardTile,
} from "@/components/dataset/explorations/dataset-split-shared";
import { DatasetExplorationShell } from "@/components/dataset/explorations/exploration-shell";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ResolvedDatasetSubjectEntry } from "@/lib/dataset/collection-subject-index";
import type { SubjectSlug } from "@/lib/dataset/subject-slugs";
import { subjectLabel } from "@/lib/dataset/subject-slugs";
import { toastSuccess } from "@/lib/toast-variants";
import { cn } from "@/lib/utils";

export function DatasetSplitDetailExplorationView({
  subject,
  entry,
}: {
  subject: SubjectSlug;
  entry: ResolvedDatasetSubjectEntry;
}) {
  const { collection: c, child, detail } = entry;
  const [requestOpen, setRequestOpen] = React.useState(false);
  const [modalTarget, setModalTarget] =
    React.useState<DatasetRequestTarget | null>(null);

  function openModal(target: DatasetRequestTarget) {
    setModalTarget(target);
    setRequestOpen(true);
  }

  return (
    <>
      <DatasetExplorationShell directionLabel="Split view">
        <nav
          className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <Link
            href="/dataset-4"
            className="font-medium underline-offset-4 hover:text-foreground hover:underline"
          >
            Dataset collections
          </Link>
          <span aria-hidden className="text-border-subtle">
            /
          </span>
          <Link
            href={`/dataset-4/${subject}`}
            className="font-medium underline-offset-4 hover:text-foreground hover:underline"
          >
            {subjectLabel(subject)}
          </Link>
          <span aria-hidden className="text-border-subtle">
            /
          </span>
          <span className="min-w-0 truncate text-foreground">
            {child.title}
          </span>
        </nav>

        <div
          className={cn(
            "flex flex-col gap-8",
            "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(14rem,18.5rem)] lg:items-start lg:gap-8 xl:gap-10",
          )}
        >
          <div className="min-w-0 space-y-8">
            <div className="rounded-[var(--radius-md)] border-app border-border-subtle bg-sidebar dark:bg-field-bg">
              <div className="border-app-b border-border-subtle px-5 py-5 md:px-6 md:py-6">
                <Link
                  href="/dataset"
                  className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Datasets
                </Link>
                <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <CollectionProviderAvatar
                      collection={c}
                      className="size-11"
                    />
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">
                        {c.providerName}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <h1 className="font-page-h3 text-heading dark:text-foreground">
                          {child.title}
                        </h1>
                        {child.gated ? <CollectionGatedPill /> : null}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {c.collectionName}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    {child.action === "get_data" ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            type="button"
                            variant="secondary"
                            className="h-9 gap-1.5 border-border-subtle bg-transparent [&_svg]:size-4"
                          >
                            Get data
                            <ChevronDown className="size-4 opacity-70" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52">
                          <DropdownMenuLabel className="font-nav-eyebrow text-[10px] uppercase">
                            Format
                          </DropdownMenuLabel>
                          {(child.downloadFormats ?? ["JSONL", "CSV"]).map(
                            (fmt) => (
                              <DropdownMenuItem
                                key={fmt}
                                onSelect={() =>
                                  toastSuccess({
                                    message:
                                      "Exploration only — wire Get data to your pipeline.",
                                  })
                                }
                              >
                                {fmt}
                              </DropdownMenuItem>
                            ),
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Button
                        type="button"
                        variant="secondary"
                        className="h-9 gap-1.5 bg-field-bg text-muted-foreground hover:bg-field-bg [&_svg]:size-4 dark:bg-background"
                        onClick={() =>
                          openModal(childToRequestTarget(c, child))
                        }
                      >
                        <Lock className="size-4 opacity-80" aria-hidden />
                        Request
                      </Button>
                    )}
                  </div>
                </div>
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
                  {child.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <CollectionProductPill product={c.product} />
                  <MetaPill>Grades {c.gradeRange}</MetaPill>
                </div>
              </div>

              {detail.relatedDatasets.length > 0 ? (
                <section className="border-app-t border-border-subtle px-5 py-6 md:px-6">
                  <h2 className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
                    Related datasets
                  </h2>
                  <ul className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    {detail.relatedDatasets.map((rel) => (
                      <li key={`${rel.refId}-${rel.title}`}>
                        <RelatedDatasetCardTile card={rel} />
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          </div>

          <CollectionSidebar
            meta={detail.sidebar}
            className="lg:sticky lg:top-6"
          />
        </div>
      </DatasetExplorationShell>

      <RequestAccessModal
        open={requestOpen}
        onOpenChange={(open) => {
          setRequestOpen(open);
          if (!open) setModalTarget(null);
        }}
        dataset={modalTarget ?? childToRequestTarget(c, child)}
      />
    </>
  );
}

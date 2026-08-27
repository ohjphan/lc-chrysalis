"use client";

import * as React from "react";
import Link from "next/link";
import {
  CollectionGatedPill,
  CollectionProductPill,
  CollectionProviderAvatar,
  MetaPill,
} from "@/components/dataset/explorations/collection-presentational";
import { DatasetExplorationShell } from "@/components/dataset/explorations/exploration-shell";
import type { DatasetSubjectEntry } from "@/lib/dataset/collection-subject-index";
import {
  getEntriesForSubject,
  getSubjectsWithDatasetCounts,
} from "@/lib/dataset/collection-subject-index";
import type { SubjectSlug } from "@/lib/dataset/subject-slugs";
import { SUBJECT_NAV } from "@/lib/dataset/subject-slugs";
import { cn } from "@/lib/utils";

function SubjectNavLink({
  slug,
  label,
  count,
  active,
}: {
  slug: SubjectSlug;
  label: string;
  count: number;
  active: boolean;
}) {
  return (
    <Link
      href={`/dataset-4/${slug}`}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-3 text-left transition-colors",
        active
          ? "bg-nav-active dark:bg-nav-link-active"
          : "hover:bg-sidebar/80 dark:hover:bg-field-bg/80",
      )}
    >
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
        {label}
      </span>
      <span className="shrink-0 tabular-nums font-nav-eyebrow text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {count}
      </span>
    </Link>
  );
}

function DatasetSplitDatasetCard({
  subject,
  entry,
}: {
  subject: SubjectSlug;
  entry: DatasetSubjectEntry;
}) {
  const { collection: c, child, routeKey } = entry;
  const href = `/dataset-4/${subject}/${routeKey}`;

  return (
    <Link
      href={href}
      className="block rounded-[var(--radius-md)] border-app border-border-subtle bg-sidebar transition-colors hover:bg-nav-active/50 dark:bg-field-bg dark:hover:bg-nav-link-active/40"
    >
      <div className="flex flex-col p-5 md:p-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-page-h3 text-heading dark:text-foreground">
              {child.title}
            </span>
            {child.gated ? <CollectionGatedPill /> : null}
          </div>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {child.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <CollectionProductPill product={c.product} />
            <MetaPill>Grades {c.gradeRange}</MetaPill>
            <MetaPill>{c.collectionName}</MetaPill>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 border-app-t border-border-subtle/80 pt-4">
          <CollectionProviderAvatar
            collection={c}
            className="size-7 shrink-0 opacity-75"
          />
          <span className="text-[11px] leading-snug text-muted-foreground/80">
            {c.providerName}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function DatasetSplitSubjectListView({
  subject,
}: {
  subject: SubjectSlug;
}) {
  const entries = React.useMemo(
    () => getEntriesForSubject(subject),
    [subject],
  );
  const nav = React.useMemo(() => getSubjectsWithDatasetCounts(), []);
  const blurb = SUBJECT_NAV.find((s) => s.slug === subject)?.description;

  return (
    <DatasetExplorationShell directionLabel="Split view">
      <div
        className={cn(
          "flex flex-col gap-8",
          "lg:grid lg:grid-cols-[12.5rem_minmax(0,1fr)] lg:items-start lg:gap-8 xl:gap-10",
        )}
      >
        <div className="flex min-h-0 flex-col lg:max-w-none">
          <p
            id="split-subject-nav-label"
            className="mb-2 font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground"
          >
            Subjects
          </p>
          <ul
            className="max-h-[min(22rem,48vh)] space-y-1 overflow-y-auto rounded-[var(--radius-md)] border-app border-border-subtle bg-field-bg p-1 dark:bg-background lg:max-h-[min(36rem,70vh)] lg:border-0 lg:bg-transparent lg:p-0"
            aria-labelledby="split-subject-nav-label"
          >
            {nav.map((item) => (
              <li key={item.slug}>
                <SubjectNavLink
                  slug={item.slug}
                  label={item.label}
                  count={item.count}
                  active={item.slug === subject}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 space-y-6 lg:min-h-0">
          <header className="space-y-2">
            <h2 className="font-page-h3 text-heading dark:text-foreground">
              {SUBJECT_NAV.find((s) => s.slug === subject)?.label ?? subject}
            </h2>
            {blurb ? (
              <p className="max-w-2xl text-sm text-muted-foreground">
                {blurb}
              </p>
            ) : null}
            <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
              {entries.length} dataset{entries.length === 1 ? "" : "s"}
            </p>
          </header>

          <div className="flex flex-col gap-4">
            {entries.map((e) => (
              <DatasetSplitDatasetCard
                key={e.routeKey}
                subject={subject}
                entry={e}
              />
            ))}
          </div>
        </div>
      </div>
    </DatasetExplorationShell>
  );
}

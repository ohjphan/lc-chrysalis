"use client";

import * as React from "react";
import Link from "next/link";
import { PageContainer } from "@/components/dashboard/page-container";
import { Button } from "@/components/ui/button";
import { ColorBadge } from "@/components/ui/color-badge";
import { MaterialSymbol } from "@/components/ui/material-symbols";
import { PageTitle } from "@/components/ui/page-title";
import {
  SelectableCardGroup,
  type SelectableCardOption,
} from "@/components/ui/selectable-card-group";
import { cn } from "@/lib/utils";

type CsyncOptionValue = "single-page" | "separate-pages";

const CSYNC_STEPS = [
  {
    number: 1,
    title: "Add courses",
    detail: "4 courses",
    status: "complete",
  },
  {
    number: 2,
    title: "Organize teacher materials",
    detail: "In a separate course",
    status: "complete",
  },
  {
    number: 3,
    title: "Organize student materials",
    detail: "Choose the delivery structure",
    status: "current",
  },
  {
    number: 4,
    title: "Review and submit",
    detail: "Confirm the sync setup",
    status: "upcoming",
  },
] as const;

function StepRail() {
  return (
    <aside className="rounded-md border-app border-border-subtle bg-background px-6 py-7">
      <ol className="space-y-6">
        {CSYNC_STEPS.map((step, index) => {
          const isLast = index === CSYNC_STEPS.length - 1;
          const bulletClass =
            step.status === "complete"
              ? "border-accent-green bg-accent-green text-white"
              : step.status === "current"
                ? "border-accent-green bg-[rgba(29,180,112,0.12)] text-charcoal"
                : "border-border-subtle bg-background text-muted-foreground";
          const lineClass =
            step.status === "complete"
              ? "bg-accent-green/45"
              : "bg-border-subtle";

          return (
            <li key={step.number} className="relative flex items-start gap-3">
              {!isLast ? (
                <span
                  className={cn(
                    "absolute left-3 top-6 h-[calc(100%+1.5rem)] w-px -translate-x-1/2",
                    lineClass,
                  )}
                  aria-hidden
                />
              ) : null}
              <span
                className={cn(
                  "relative z-10 mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border-app text-[11px] font-nav-eyebrow font-medium",
                  bulletClass,
                )}
              >
                {step.status === "complete" ? (
                  <MaterialSymbol icon="check" className="size-3 text-white" aria-hidden />
                ) : (
                  step.number
                )}
              </span>
              <div className="min-w-0 space-y-1">
                <p
                  className={cn(
                    "text-base leading-tight",
                    step.status === "upcoming"
                      ? "text-foreground"
                      : "font-medium text-heading",
                  )}
                >
                  {step.title}
                </p>
                <p className="text-sm leading-snug text-muted-foreground">
                  {step.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}

function CsyncDiagram({
  variant,
}: {
  variant: CsyncOptionValue;
}) {
  const lessonRows =
    variant === "single-page"
      ? ["Component 1, 2, 3", "Assignment", "Assignment", "Lesson 2"]
      : ["Component 1", "Component 2", "Component 3", "Assignment"];

  return (
    <div className="flex justify-center">
      <div className="relative w-[156px]">
        <div className="absolute left-0 top-0 flex h-5 w-8 items-center justify-center rounded-tl-[4px] border-app border-border-subtle bg-[#8FC7FF] text-[9px] text-charcoal">
          <span className="flex gap-[2px]">
            <span className="size-[2px] rounded-full bg-charcoal" />
            <span className="size-[2px] rounded-full bg-charcoal" />
            <span className="size-[2px] rounded-full bg-charcoal" />
          </span>
        </div>
        <div className="ml-5 rounded-t-[4px] border-app border-border-subtle bg-[#8FC7FF] px-3 py-1 text-center text-[10px] font-medium text-charcoal">
          Unit 1
        </div>
        <div className="ml-5 rounded-b-[4px] border-x border-b border-border-subtle bg-background">
          <div className="flex items-center gap-1 border-b border-border-subtle bg-[#F3F1EF] px-2 py-1 text-[9px] text-charcoal">
            <MaterialSymbol icon="chevron_right" className="size-2.5 text-muted-foreground" />
            <span>Lesson 1</span>
          </div>
          {lessonRows.map((row) => (
            <div
              key={row}
              className="border-b border-border-subtle px-2 py-[3px] text-[8px] leading-tight text-muted-foreground last:border-b-0"
            >
              {row}
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-start gap-2">
          <div className="mt-3 flex h-5 w-8 items-center justify-center rounded-[4px] border-app border-border-subtle bg-[#F3F1EF] text-[9px] text-charcoal">
            <span className="flex gap-[2px]">
              <span className="size-[2px] rounded-full bg-muted-foreground" />
              <span className="size-[2px] rounded-full bg-muted-foreground" />
              <span className="size-[2px] rounded-full bg-muted-foreground" />
            </span>
          </div>
          <div className="flex-1 rounded-[4px] border-app border-border-subtle bg-background">
            <div className="border-b border-border-subtle bg-[#F3F1EF] px-2 py-1 text-[9px] text-charcoal">
              Lesson 2
            </div>
            <div className="px-2 py-[3px] text-[8px] leading-tight text-muted-foreground">
              Component 1, 2, 3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProsConsList({
  title,
  items,
  icon,
}: {
  title: string;
  items: string[];
  icon: "+" | "-";
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-[0.04em] text-muted-foreground">
        {title}
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
            <span className="mt-[1px] shrink-0 text-muted-foreground">{icon}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CsyncOptionCard({
  title,
  variant,
  pros,
  cons,
  recommended = false,
}: {
  title: string;
  variant: CsyncOptionValue;
  pros: string[];
  cons: string[];
  recommended?: boolean;
}) {
  return (
    <div className="space-y-5">
      <div className="rounded-md border-app border-border-subtle bg-surface p-5">
        <CsyncDiagram variant={variant} />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-page-h2 text-heading dark:text-foreground">
            {title}
          </h3>
        </div>
        <div className="grid gap-4">
          <ProsConsList title="Pros" items={pros} icon="+" />
          <ProsConsList title="Cons" items={cons} icon="-" />
        </div>
        {recommended ? <ColorBadge variant="green">Recommended</ColorBadge> : null}
      </div>
    </div>
  );
}

const CSYNC_OPTIONS: readonly SelectableCardOption<CsyncOptionValue>[] = [
  {
    value: "single-page",
    label: (
      <CsyncOptionCard
        title="Most lesson pieces on one page"
        variant="single-page"
        pros={[
          "Easier for new Canvas users to follow",
          "Faster in-class load time",
        ]}
        cons={[
          "Harder for teachers to rearrange lesson content",
        ]}
        recommended
      />
    ),
  },
  {
    value: "separate-pages",
    label: (
      <CsyncOptionCard
        title="Lesson pieces on separate pages"
        variant="separate-pages"
        pros={[
          "Easier to rearrange and customize lessons",
        ]}
        cons={[
          "More control over what is published to students",
          "Slower in-class load time",
        ]}
      />
    ),
  },
] as const;

export function CsyncView() {
  const [selection, setSelection] =
    React.useState<CsyncOptionValue>("single-page");

  return (
    <PageContainer className="space-y-4 pb-6">
      <section className="rounded-md bg-charcoal px-8 py-5 text-white">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className="font-page-title text-white transition-opacity hover:opacity-85"
          >
            Curriculum Sync
          </Link>
          <div className="flex items-center gap-8 text-sm text-white/85">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <Link href="/signup" className="transition-colors hover:text-white">
              Sign Out
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)]">
        <StepRail />

        <div className="rounded-md border-app border-border-subtle bg-background">
          <div className="flex min-h-[660px] flex-col">
            <div className="flex-1 px-8 py-8">
              <div className="max-w-4xl space-y-8">
                <div className="space-y-2">
                  <PageTitle variant="onboarding">Organize student materials</PageTitle>
                  <p className="max-w-2xl text-base text-muted-foreground">
                    Use the pros and cons to help decide which option best meets your
                    school&apos;s needs.
                  </p>
                </div>

                <SelectableCardGroup
                  aria-label="Curriculum Sync student materials options"
                  value={selection}
                  onValueChange={setSelection}
                  options={CSYNC_OPTIONS}
                  className="gap-4"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-app-t border-border-subtle px-8 py-6">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                aria-label="Go back"
              >
                <MaterialSymbol icon="arrow_back" className="size-4" aria-hidden />
              </Button>

              <Button type="button" variant="secondary" disabled>
                Next
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-end gap-x-8 gap-y-2 px-2 text-xs text-muted-foreground">
        <Link href="/support" className="transition-colors hover:text-foreground">
          Support
        </Link>
        <Link href="/terms-of-use" className="transition-colors hover:text-foreground">
          Terms of Use
        </Link>
        <Link href="/privacy-policy" className="transition-colors hover:text-foreground">
          Privacy policy
        </Link>
        <Link href="/" className="transition-colors hover:text-foreground">
          Community Guidelines
        </Link>
      </div>
    </PageContainer>
  );
}

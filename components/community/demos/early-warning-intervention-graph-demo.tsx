"use client";

import * as React from "react";
import { DemoPlaygroundLayout } from "@/components/demo-experience/demo-playground-layout";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { SUPPORT_DOCS_URL } from "@/lib/support-links";
import { brandAvatarClassesForId } from "@/lib/brand-avatar-colors";
import {
  EARLY_WARNING_MOCK_ROSTER,
  earlyWarningDefaultSelectedId,
  type EarlyWarningDemoStudent,
} from "@/lib/community/demos/early-warning-intervention/mock-roster";
import { cn } from "@/lib/utils";

const KG_ABOUT_PATH =
  "/knowledge-graph/understanding-knowledge-graph/about-knowledge-graph";
const KG_ABOUT_URL = `${SUPPORT_DOCS_URL}${KG_ABOUT_PATH}`;

function AtRiskBadge() {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border-app border-[color:color-mix(in_srgb,var(--destructive)_35%,transparent)] bg-callout-destructive-bg px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-foreground">
      At risk
    </span>
  );
}

function PathChips() {
  const steps = ["Student", "Signals", "Risk", "Intervention"] as const;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] font-medium text-muted-foreground">
      {steps.map((label, i) => (
        <React.Fragment key={label}>
          {i > 0 ? (
            <span className="text-border-subtle" aria-hidden>
              →
            </span>
          ) : null}
          <span className="rounded-md border-app border-border-subtle bg-field-bg px-2 py-0.5 text-foreground dark:bg-background">
            {label}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h3 className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
        {title}
      </h3>
      <div className="text-sm font-normal leading-relaxed text-foreground">
        {children}
      </div>
    </section>
  );
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function studentResultPayload(student: EarlyWarningDemoStudent) {
  return {
    studentId: student.id,
    name: student.name,
    atRisk: student.atRisk,
    signals: student.signals,
    riskTitle: student.riskTitle,
    interventionTitle: student.interventionTitle,
  };
}

export function EarlyWarningInterventionGraphDemo({
  integrationJson,
}: {
  integrationJson: string;
}) {
  const [selectedId, setSelectedId] = React.useState(() =>
    earlyWarningDefaultSelectedId(EARLY_WARNING_MOCK_ROSTER),
  );
  const [loading, setLoading] = React.useState(false);
  const [queryReady, setQueryReady] = React.useState(true);

  const selected = React.useMemo(() => {
    return EARLY_WARNING_MOCK_ROSTER.find((s) => s.id === selectedId);
  }, [selectedId]);

  async function runQuery() {
    setLoading(true);
    setQueryReady(false);
    await delay(300);
    setQueryReady(true);
    setLoading(false);
  }

  const requestJson = React.useMemo(() => {
    let integration: unknown = integrationJson;
    try {
      integration = JSON.parse(integrationJson) as unknown;
    } catch {
      /* keep string */
    }
    return JSON.stringify(
      {
        integration,
        query: {
          graph: "early-warning-v1",
          studentId: selectedId,
          traversals: ["signals", "risk", "suggestedIntervention"],
        },
      },
      null,
      2,
    );
  }, [integrationJson, selectedId]);

  const resultsJson =
    selected && queryReady && !loading
      ? JSON.stringify(studentResultPayload(selected), null, 2)
      : null;

  return (
    <DemoPlaygroundLayout
      requestJson={requestJson}
      resultsJson={resultsJson}
      inputs={
        <>
          <div className="flex min-h-0 flex-col">
            <p
              id="ew-roster-label"
              className="mb-2 font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground"
            >
              Select student
            </p>
            <ul
              className="max-h-[min(18rem,40vh)] space-y-1 overflow-y-auto rounded-md border-app border-border-subtle bg-field-bg p-1 dark:bg-background"
              aria-labelledby="ew-roster-label"
            >
              {EARLY_WARNING_MOCK_ROSTER.map((s) => (
                <li key={s.id}>
                  <StudentRow
                    student={s}
                    selected={s.id === selectedId}
                    onSelect={() => {
                      setSelectedId(s.id);
                      setQueryReady(true);
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
          <Button
            type="button"
            variant="primary"
            className="h-9"
            disabled={loading || !selectedId}
            onClick={() => void runQuery()}
          >
            {loading ? "Running query…" : "Run query"}
          </Button>
        </>
      }
      output={
        loading ? (
          <p className="text-sm text-muted-foreground">Running graph query…</p>
        ) : selected ? (
          <StudentDetail student={selected} />
        ) : (
          <p className="text-sm text-muted-foreground">Select a student.</p>
        )
      }
    />
  );
}

function StudentRow({
  student,
  selected,
  onSelect,
}: {
  student: EarlyWarningDemoStudent;
  selected: boolean;
  onSelect: () => void;
}) {
  const { bgClass, textClass } = brandAvatarClassesForId(student.id);
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-3 text-left transition-colors",
        selected
          ? "bg-nav-active dark:bg-nav-link-active"
          : "hover:bg-sidebar/80 dark:hover:bg-field-bg/80",
        !student.atRisk && !selected && "opacity-90",
      )}
    >
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-md text-xs font-semibold",
          bgClass,
          textClass,
        )}
        aria-hidden
      >
        {student.initials}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate font-medium text-foreground">
            {student.name}
          </span>
          {student.atRisk ? <AtRiskBadge /> : null}
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {student.gradeLabel}
        </p>
      </div>
    </button>
  );
}

function StudentDetail({ student }: { student: EarlyWarningDemoStudent }) {
  return (
    <div className="flex min-h-0 flex-col gap-6">
      <div>
        <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
          Profile
        </p>
        <h3 className="mt-1 font-page-h3 text-heading dark:text-foreground">
          {student.name}
        </h3>
        <p className="text-sm text-muted-foreground">{student.gradeLabel}</p>
        <PathChips />
      </div>

      {student.atRisk ? (
        <>
          <DetailBlock title="Signals">
            <ul className="list-inside list-disc space-y-1.5 text-muted-foreground">
              {student.signals.map((sig) => (
                <li key={sig}>{sig}</li>
              ))}
            </ul>
          </DetailBlock>
          <DetailBlock title="Risk">
            <p className="font-medium text-foreground">{student.riskTitle}</p>
            <p className="mt-2 text-muted-foreground">
              {student.riskDescription}
            </p>
          </DetailBlock>
          <DetailBlock title="Intervention">
            <p className="font-medium text-foreground">
              {student.interventionTitle}
            </p>
            <p className="mt-2 text-muted-foreground">
              {student.interventionDescription}
            </p>
          </DetailBlock>
        </>
      ) : (
        <DetailBlock title="Status">
          <p className="text-muted-foreground">{student.notAtRiskNote}</p>
        </DetailBlock>
      )}

      <Callout
        variant="neutral"
        bordered
        headline="Knowledge Graph context"
        description={
          <>
            In production, entities (students, signals, interventions, etc.)
            and directed relationships are modeled as{" "}
            <strong className="font-medium text-foreground">nodes and edges</strong>{" "}
            (triples), often with stable identifiers—see{" "}
            <a
              href={KG_ABOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
            >
              About Knowledge Graph
            </a>{" "}
            for how LC structures datasets and access patterns.
          </>
        }
      />
    </div>
  );
}

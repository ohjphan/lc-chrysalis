"use client";

import * as React from "react";
import { DemoPlaygroundLayout } from "@/components/demo-experience/demo-playground-layout";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { SUPPORT_DOCS_URL } from "@/lib/support-links";
import { brandAvatarClassesForId } from "@/lib/brand-avatar-colors";
import {
  PATHWAY_MOCK_ROSTER,
  pathwayDefaultSelectedId,
  type PathwayDemoGraphEdgeKind,
  type PathwayDemoLearner,
} from "@/lib/community/demos/personalized-learning-pathway/mock-pathway";
import { cn } from "@/lib/utils";

const KG_ABOUT_PATH =
  "/knowledge-graph/understanding-knowledge-graph/about-knowledge-graph";
const KG_ABOUT_URL = `${SUPPORT_DOCS_URL}${KG_ABOUT_PATH}`;

function pathStatusLabel(status: PathwayDemoLearner["pathStatus"]): string {
  switch (status) {
    case "in_progress":
      return "Path in progress";
    case "current":
      return "Up to date";
    case "complete":
      return "Path complete";
    default:
      return "";
  }
}

function PathStatusBadge({ status }: { status: PathwayDemoLearner["pathStatus"] }) {
  const label = pathStatusLabel(status);
  const isComplete = status === "complete";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border-app px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
        isComplete
          ? "border-border-subtle bg-field-bg text-muted-foreground"
          : "border-border-subtle bg-nav-active text-foreground dark:bg-nav-link-active",
      )}
    >
      {label}
    </span>
  );
}

function PathChips() {
  const steps = ["Learner", "Skills & resources", "Next step"] as const;
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

function edgeLabelText(edge: PathwayDemoGraphEdgeKind): string {
  return edge === "prerequisite_of" ? "prerequisite_of" : "next_best_step";
}

function StaticPathDiagram({ learner }: { learner: PathwayDemoLearner }) {
  const { steps, edges } = learner.miniGraph;
  return (
    <div className="rounded-[var(--radius-md)] border-app border-border-subtle bg-sidebar/50 p-4 dark:bg-background/50">
      <p className="mb-3 font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
        Static pathway (sample graph strip)
      </p>
      <div
        className="flex flex-wrap items-start justify-center gap-x-2 gap-y-6 md:flex-nowrap md:justify-start"
        aria-label="Skill and resource nodes connected by typed edges"
      >
        {steps.map((step, i) => (
          <React.Fragment key={`${step.nodeLabel}-${i}`}>
            {i > 0 ? (
              <div className="flex min-w-[4.5rem] flex-col items-center justify-start gap-1 px-1 pt-2 md:pt-6">
                <span className="text-border-subtle" aria-hidden>
                  →
                </span>
                <span className="max-w-[7rem] text-center font-mono text-[9px] font-normal leading-tight text-muted-foreground">
                  {edgeLabelText(edges[i - 1]!)}
                </span>
              </div>
            ) : null}
            <div className="flex max-w-[10rem] flex-col items-stretch">
              <div
                className={cn(
                  "rounded-md border-app px-3 py-2 text-center text-xs font-medium leading-snug text-foreground",
                  step.kind === "skill"
                    ? "border-border-subtle bg-field-bg dark:bg-field-bg"
                    : "border-dashed border-border-subtle bg-sidebar dark:bg-background",
                )}
              >
                <span className="block text-[9px] font-normal uppercase tracking-wide text-muted-foreground">
                  {step.kind === "skill" ? "Skill" : "Resource"}
                </span>
                {step.nodeLabel}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
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

function learnerResultPayload(learner: PathwayDemoLearner) {
  return {
    learnerId: learner.id,
    name: learner.name,
    pathStatus: learner.pathStatus,
    missingPrerequisite: learner.missingPrerequisite,
    nextSkillLabel: learner.nextSkillLabel,
    nextResourceLabel: learner.nextResourceLabel,
    miniGraph: learner.miniGraph,
  };
}

export function PersonalizedLearningPathwayGraphDemo({
  integrationJson,
}: {
  integrationJson: string;
}) {
  const [selectedId, setSelectedId] = React.useState(() =>
    pathwayDefaultSelectedId(PATHWAY_MOCK_ROSTER),
  );
  const [loading, setLoading] = React.useState(false);
  const [queryReady, setQueryReady] = React.useState(true);

  const selected = React.useMemo(() => {
    return PATHWAY_MOCK_ROSTER.find((l) => l.id === selectedId);
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
          graph: "learning-pathway-v1",
          learnerId: selectedId,
          traversals: ["missingPrerequisite", "nextBestStep"],
        },
      },
      null,
      2,
    );
  }, [integrationJson, selectedId]);

  const resultsJson =
    selected && queryReady && !loading
      ? JSON.stringify(learnerResultPayload(selected), null, 2)
      : null;

  return (
    <DemoPlaygroundLayout
      requestJson={requestJson}
      resultsJson={resultsJson}
      inputs={
        <>
          <div className="flex min-h-0 flex-col">
            <p
              id="pathway-roster-label"
              className="mb-2 font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground"
            >
              Select learner
            </p>
            <ul
              className="max-h-[min(18rem,40vh)] space-y-1 overflow-y-auto rounded-md border-app border-border-subtle bg-field-bg p-1 dark:bg-background"
              aria-labelledby="pathway-roster-label"
            >
              {PATHWAY_MOCK_ROSTER.map((l) => (
                <li key={l.id}>
                  <LearnerRow
                    learner={l}
                    selected={l.id === selectedId}
                    onSelect={() => {
                      setSelectedId(l.id);
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
          <LearnerDetail learner={selected} />
        ) : (
          <p className="text-sm text-muted-foreground">Select a learner.</p>
        )
      }
    />
  );
}

function LearnerRow({
  learner,
  selected,
  onSelect,
}: {
  learner: PathwayDemoLearner;
  selected: boolean;
  onSelect: () => void;
}) {
  const { bgClass, textClass } = brandAvatarClassesForId(learner.id);
  const mutedRow = learner.pathStatus === "complete" && !selected;
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
        mutedRow && "opacity-90",
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
        {learner.initials}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate font-medium text-foreground">
            {learner.name}
          </span>
          <PathStatusBadge status={learner.pathStatus} />
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {learner.gradeLabel}
        </p>
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
          {learner.rosterHint}
        </p>
      </div>
    </button>
  );
}

function LearnerDetail({ learner }: { learner: PathwayDemoLearner }) {
  const prereq = learner.missingPrerequisite;
  const isComplete = learner.pathStatus === "complete";

  return (
    <div className="flex min-h-0 flex-col gap-6">
      <div>
        <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
          Pathway focus
        </p>
        <h3 className="mt-1 font-page-h3 text-heading dark:text-foreground">
          {learner.name}
        </h3>
        <p className="text-sm text-muted-foreground">{learner.gradeLabel}</p>
        <PathChips />
      </div>

      <StaticPathDiagram learner={learner} />

      <DetailBlock title="What prerequisite is missing?">
        {prereq ? (
          <>
            <p className="font-medium text-foreground">{prereq.skillLabel}</p>
            <p className="mt-2 text-muted-foreground">{prereq.explanation}</p>
          </>
        ) : isComplete ? (
          <p className="text-muted-foreground">
            None in this unit scope—requirements for the culminating milestone
            are satisfied in the mock graph slice.
          </p>
        ) : (
          <p className="text-muted-foreground">
            None — the learner state satisfies incoming{" "}
            <span className="font-mono text-xs">prerequisite_of</span> checks for
            the suggested next skill.
          </p>
        )}
      </DetailBlock>

      <DetailBlock title="What should this learner do next?">
        {isComplete ? (
          <p className="text-muted-foreground">{learner.completeNote}</p>
        ) : (
          <>
            <p>
              <span className="font-medium text-foreground">Skill: </span>
              {learner.nextSkillLabel}
            </p>
            <p className="mt-2">
              <span className="font-medium text-foreground">Resource: </span>
              {learner.nextResourceLabel}
            </p>
            {learner.nextStepDetail ? (
              <p className="mt-2 text-muted-foreground">{learner.nextStepDetail}</p>
            ) : null}
          </>
        )}
      </DetailBlock>

      <Callout
        variant="neutral"
        bordered
        headline="Knowledge Graph context"
        description={
          <>
            In production, skills, concepts, and learning resources are typically{" "}
            <strong className="font-medium text-foreground">nodes</strong>, with
            directed relationships such as{" "}
            <span className="font-mono text-xs">prerequisite_of</span> and{" "}
            <span className="font-mono text-xs">next_best_step</span> as{" "}
            <strong className="font-medium text-foreground">edges</strong> (triples).
            See{" "}
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

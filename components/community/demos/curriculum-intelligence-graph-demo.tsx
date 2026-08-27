"use client";

import * as React from "react";
import { DemoPlaygroundLayout } from "@/components/demo-experience/demo-playground-layout";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { SUPPORT_DOCS_URL } from "@/lib/support-links";
import { brandAvatarClassesForId } from "@/lib/brand-avatar-colors";
import {
  CURRICULUM_INTEL_MOCK_ROSTER,
  curriculumIntelDefaultSelectedId,
  type CurriculumIntelDemoStudent,
  type CurriculumIntelInsightLevel,
} from "@/lib/community/demos/curriculum-intelligence/mock-roster";
import { cn } from "@/lib/utils";

const KG_ABOUT_PATH =
  "/knowledge-graph/understanding-knowledge-graph/about-knowledge-graph";
const KG_ABOUT_URL = `${SUPPORT_DOCS_URL}${KG_ABOUT_PATH}`;

function insightBadgeLabel(level: CurriculumIntelInsightLevel): string {
  switch (level) {
    case "gaps":
      return "Skill gaps";
    case "on_track":
      return "On track";
    case "strong":
      return "Strong";
    default:
      return "";
  }
}

function InsightLevelBadge({ level }: { level: CurriculumIntelInsightLevel }) {
  const label = insightBadgeLabel(level);
  const subtle = level === "strong";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border-app px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
        subtle
          ? "border-border-subtle bg-field-bg text-muted-foreground"
          : "border-border-subtle bg-nav-active text-foreground dark:bg-nav-link-active",
      )}
    >
      {label}
    </span>
  );
}

function PathChips() {
  const steps = ["Student", "Skills", "Lessons / assessments"] as const;
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

function StripNodeCard({
  label,
  kind,
}: {
  label: string;
  kind: "lesson" | "skill" | "assessment";
}) {
  const kindLabel =
    kind === "lesson" ? "Lesson" : kind === "skill" ? "Skill" : "Assessment";
  const isSkill = kind === "skill";
  return (
    <div
      className={cn(
        "max-w-[10rem] rounded-md border-app px-3 py-2 text-center text-xs font-medium leading-snug text-foreground",
        isSkill
          ? "border-border-subtle bg-field-bg dark:bg-field-bg"
          : "border-dashed border-border-subtle bg-sidebar dark:bg-background",
      )}
    >
      <span className="block text-[9px] font-normal uppercase tracking-wide text-muted-foreground">
        {kindLabel}
      </span>
      {label}
    </div>
  );
}

function StaticCurriculumStrip({ student }: { student: CurriculumIntelDemoStudent }) {
  const [lesson, skill, assessment] = student.miniGraph.strip;
  return (
    <div className="rounded-[var(--radius-md)] border-app border-border-subtle bg-sidebar/50 p-4 dark:bg-background/50">
      <p className="mb-3 font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
        Static slice (teaches · assesses · mastered_by)
      </p>
      <div
        className="flex flex-wrap items-start justify-center gap-x-1 gap-y-4 md:flex-nowrap md:justify-start"
        aria-label="Lesson, skill, and assessment nodes with typed edges"
      >
        <StripNodeCard label={lesson.label} kind="lesson" />
        <div className="flex min-w-[4.5rem] flex-col items-center justify-start gap-1 px-0.5 pt-2 md:pt-6">
          <span className="text-border-subtle" aria-hidden>
            →
          </span>
          <span className="max-w-[7rem] text-center font-mono text-[9px] font-normal leading-tight text-muted-foreground">
            teaches
          </span>
        </div>
        <StripNodeCard label={skill.label} kind="skill" />
        <div className="flex min-w-[4.5rem] flex-col items-center justify-start gap-1 px-0.5 pt-2 md:pt-6">
          <span className="text-border-subtle" aria-hidden>
            ←
          </span>
          <span className="max-w-[7rem] text-center font-mono text-[9px] font-normal leading-tight text-muted-foreground">
            assesses
          </span>
        </div>
        <StripNodeCard label={assessment.label} kind="assessment" />
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">Student–skill: </span>
        {student.miniGraph.masteryCaption}
      </p>
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

function studentResultPayload(student: CurriculumIntelDemoStudent) {
  return {
    studentId: student.id,
    name: student.name,
    insightLevel: student.insightLevel,
    strugglingSkills: student.strugglingSkills,
    targetLessons: student.targetLessons,
    miniGraph: student.miniGraph,
  };
}

export function CurriculumIntelligenceGraphDemo({
  integrationJson,
}: {
  integrationJson: string;
}) {
  const [selectedId, setSelectedId] = React.useState(() =>
    curriculumIntelDefaultSelectedId(CURRICULUM_INTEL_MOCK_ROSTER),
  );
  const [loading, setLoading] = React.useState(false);
  const [queryReady, setQueryReady] = React.useState(true);

  const selected = React.useMemo(() => {
    return CURRICULUM_INTEL_MOCK_ROSTER.find((s) => s.id === selectedId);
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
          graph: "curriculum-skills-assessment-v1",
          studentId: selectedId,
          traversals: [
            "strugglingSkills",
            "lessonsTargetingWeakSkills",
          ],
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
              id="ci-roster-label"
              className="mb-2 font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground"
            >
              Select student
            </p>
            <ul
              className="max-h-[min(18rem,40vh)] space-y-1 overflow-y-auto rounded-md border-app border-border-subtle bg-field-bg p-1 dark:bg-background"
              aria-labelledby="ci-roster-label"
            >
              {CURRICULUM_INTEL_MOCK_ROSTER.map((s) => (
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
          <StudentInsightDetail student={selected} />
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
  student: CurriculumIntelDemoStudent;
  selected: boolean;
  onSelect: () => void;
}) {
  const { bgClass, textClass } = brandAvatarClassesForId(student.id);
  const muted = student.insightLevel === "strong" && !selected;
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
        muted && "opacity-90",
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
          <span className="truncate font-medium text-foreground">{student.name}</span>
          <InsightLevelBadge level={student.insightLevel} />
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {student.gradeLabel}
        </p>
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
          {student.rosterHint}
        </p>
      </div>
    </button>
  );
}

function StudentInsightDetail({ student }: { student: CurriculumIntelDemoStudent }) {
  const hasGaps = student.strugglingSkills.length > 0;

  return (
    <div className="flex min-h-0 flex-col gap-6">
      <div>
        <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
          Learner profile
        </p>
        <h3 className="mt-1 font-page-h3 text-heading dark:text-foreground">
          {student.name}
        </h3>
        <p className="text-sm text-muted-foreground">{student.gradeLabel}</p>
        <PathChips />
      </div>

      <StaticCurriculumStrip student={student} />

      <DetailBlock title="Which skills is this student struggling with?">
        {hasGaps ? (
          <ul className="list-inside list-disc space-y-1.5 text-muted-foreground">
            {student.strugglingSkills.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">
            {student.noGapNote ??
              "No struggling skills flagged in this sample—traversals return an empty list for deficit-focused insights."}
          </p>
        )}
      </DetailBlock>

      <DetailBlock title="Which lessons target weak skills?">
        {hasGaps && student.targetLessons.length > 0 ? (
          <ul className="space-y-3">
            {student.targetLessons.map((lesson) => (
              <li key={`${lesson.title}-${lesson.skillFocus}`}>
                <p className="font-medium text-foreground">{lesson.title}</p>
                <p className="text-xs text-muted-foreground">
                  Teaches: {lesson.skillFocus}
                </p>
              </li>
            ))}
          </ul>
        ) : !hasGaps && student.targetLessons.length > 0 ? (
          <ul className="space-y-3">
            {student.targetLessons.map((lesson) => (
              <li key={`${lesson.title}-${lesson.skillFocus}`}>
                <p className="font-medium text-foreground">{lesson.title}</p>
                <p className="text-xs text-muted-foreground">
                  Forward pacing · {lesson.skillFocus}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">
            No deficit-matched lessons in this profile—graph queries would surface
            enrichment or adjacent pathways instead.
          </p>
        )}
      </DetailBlock>

      {student.assessmentBlurb ? (
        <DetailBlock title="Assessments in the graph">
          <p className="text-muted-foreground">{student.assessmentBlurb}</p>
        </DetailBlock>
      ) : null}

      <Callout
        variant="neutral"
        bordered
        headline="Knowledge Graph context"
        description={
          <>
            In production, curriculum intelligence rests on{" "}
            <strong className="font-medium text-foreground">nodes and directed edges</strong>{" "}
            (triples)—for example Lesson–Skill–Assessment–Student relationships typed as{" "}
            <span className="font-mono text-xs">teaches</span>,{" "}
            <span className="font-mono text-xs">assesses</span>, and{" "}
            <span className="font-mono text-xs">mastered_by</span>. See{" "}
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

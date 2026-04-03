"use client";

import * as React from "react";
import {
  ChevronDown,
  Info,
  Trash2,
  X,
} from "lucide-react";
import { PageContainer } from "@/components/dashboard/page-container";
import { StickyTableProvider } from "@/components/dashboard/sticky-table-provider";
import { Button } from "@/components/ui/button";
import { ColorBadge } from "@/components/ui/color-badge";
import { Label } from "@/components/ui/label";
import { PageTitle } from "@/components/ui/page-title";
import { Textarea } from "@/components/ui/textarea";
import { LogomarkLoadingAnimation } from "@/components/design-system/logomark-loading-animation";
import { ProgressBar } from "@/components/ui/progress-bar";
import { tableHeadStickyCellClasses } from "@/lib/table-styles";
import { cn } from "@/lib/utils";

const EVALUATOR_OPTIONS = [
  { value: "", label: "Select an option" },
  { value: "literacy", label: "Literacy evaluation" },
  { value: "math-alignment", label: "Math standards alignment" },
  { value: "cross", label: "Cross-curricular alignment" },
] as const;

const GRADE_OPTIONS = [
  { value: "", label: "Select an option" },
  { value: "K", label: "Kindergarten" },
  { value: "1", label: "Grade 1" },
  { value: "2", label: "Grade 2" },
  { value: "3", label: "Grade 3" },
  { value: "4", label: "Grade 4" },
  { value: "5", label: "Grade 5" },
  { value: "6", label: "Grade 6" },
  { value: "7", label: "Grade 7" },
  { value: "8", label: "Grade 8" },
] as const;

const CCSS_ADD_OPTIONS = [
  { value: "3.OA.A.3", label: "3.OA.A.3" },
  { value: "3.OA.A.4", label: "3.OA.A.4" },
  { value: "3.OA.B.5", label: "3.OA.B.5" },
  { value: "3.NBT.A.1", label: "3.NBT.A.1" },
] as const;

/** Parabolica + medium (500) for CCSS codes in the overview table. */
const CCSS_TABLE_CODE_CLASS =
  "font-parabolica text-base font-medium text-foreground";

/** Parabolica + 550 at 18px for CCSS result section headings. */
const CCSS_CODE_HEADING_CLASS =
  "font-parabolica text-[18px] font-[550] leading-[1.12] text-foreground";

const EXAMPLE_QUESTION =
  "A school has 48 students going on a field trip. Each van holds 8 students. How many vans are needed? Show your reasoning using division and explain what the remainder means if there is one.";

function selectClassName() {
  return cn(
    "box-border flex h-[length:var(--control-height)] w-full rounded-md border-app border-border-subtle bg-field-bg px-3 py-2 text-base font-normal text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  );
}

type OverviewRow = {
  id: string;
  standard: string;
  stencil: string;
  scoreCurrent: number;
  scoreMax: number;
};

const OVERVIEW_ROWS: OverviewRow[] = [
  {
    id: "1",
    standard: "3.OA.A.3",
    stencil: "Standard definition",
    scoreCurrent: 2,
    scoreMax: 2,
  },
  {
    id: "2",
    standard: "3.OA.A.4",
    stencil: "Standard definition",
    scoreCurrent: 1,
    scoreMax: 2,
  },
  {
    id: "3",
    standard: "3.OA.B.5",
    stencil: "Standard definition",
    scoreCurrent: 1,
    scoreMax: 2,
  },
];

type AlignmentItem = {
  id: string;
  title: string;
  aligned: boolean;
  reasoning: string;
  feedback: string;
};

type AlignmentGroup = {
  code: string;
  items: AlignmentItem[];
};

const ALIGNMENT_GROUPS: AlignmentGroup[] = [
  {
    code: "3.OA.A.3",
    items: [
      {
        id: "a1",
        title:
          "Apply understanding of 3.OA.A.2 to solve a mathematical problem in context.",
        aligned: true,
        reasoning:
          "The response correctly interprets the division situation and connects the quotient to equal groups, consistent with expectations for this standard.",
        feedback:
          "Strong alignment. Consider prompting students to verbalize the unit (e.g., vans vs. students) to reinforce structure.",
      },
      {
        id: "a2",
        title:
          "Represent the situation with an equation and justify the operation choice.",
        aligned: true,
        reasoning:
          "An equation is implied; the student’s steps match the intended operation for the task.",
        feedback:
          "Encourage explicit equation writing in future drafts for clarity.",
      },
    ],
  },
  {
    code: "3.OA.A.4",
    items: [
      {
        id: "b1",
        title:
          "Determine the unknown whole number in a multiplication or division equation.",
        aligned: false,
        reasoning:
          "The work addresses a related skill but does not fully demonstrate determining an unknown in an equation as stated.",
        feedback:
          "Add a follow-up item that asks for the unknown explicitly in equation form.",
      },
    ],
  },
  {
    code: "3.OA.B.5",
    items: [
      {
        id: "c1",
        title:
          "Apply properties of operations as strategies to multiply and divide.",
        aligned: false,
        reasoning:
          "Properties are not clearly named or used as strategies in the student work shown.",
        feedback:
          "Model one property (e.g., distributive) with a parallel example before reassessment.",
      },
    ],
  },
];

export function PlaygroundView() {
  const [evaluatorType, setEvaluatorType] = React.useState("");
  const [grade, setGrade] = React.useState("");
  const [standards, setStandards] = React.useState<string[]>([]);
  const [addStandard, setAddStandard] = React.useState("");
  const [text, setText] = React.useState("");
  const [expanded, setExpanded] = React.useState<Set<string>>(
    () => new Set(["a1"]),
  );
  const [evaluationStatus, setEvaluationStatus] = React.useState<
    "idle" | "loading" | "complete"
  >("idle");
  const evaluationFinishTimerRef = React.useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  React.useEffect(() => {
    return () => {
      if (evaluationFinishTimerRef.current) {
        clearTimeout(evaluationFinishTimerRef.current);
      }
    };
  }, []);

  const canEvaluate =
    evaluatorType !== "" && grade !== "" && text.trim().length > 0;

  const canClearAll = text.trim().length > 0;

  function toggleAccordion(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function removeStandard(code: string) {
    setStandards((s) => s.filter((x) => x !== code));
  }

  function addStandardFromPicker() {
    if (!addStandard || standards.includes(addStandard)) return;
    setStandards((s) => [...s, addStandard]);
    setAddStandard("");
  }

  function useExampleQuestion() {
    setEvaluatorType("math-alignment");
    setGrade("3");
    setStandards(["3.OA.A.3", "3.OA.A.4", "3.OA.B.5"]);
    setText(EXAMPLE_QUESTION);
  }

  function clearAll() {
    if (evaluationFinishTimerRef.current) {
      clearTimeout(evaluationFinishTimerRef.current);
      evaluationFinishTimerRef.current = null;
    }
    setEvaluationStatus("idle");
    setEvaluatorType("");
    setGrade("");
    setStandards([]);
    setText("");
    setAddStandard("");
  }

  function evaluate() {
    if (!canEvaluate) return;
    if (evaluationFinishTimerRef.current) {
      clearTimeout(evaluationFinishTimerRef.current);
      evaluationFinishTimerRef.current = null;
    }
    setEvaluationStatus("loading");
    evaluationFinishTimerRef.current = setTimeout(() => {
      evaluationFinishTimerRef.current = null;
      setExpanded(new Set(["a1"]));
      setEvaluationStatus("complete");
    }, 2200);
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-[8px]">
        <PageTitle>Evaluators playground</PageTitle>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Test the quality and alignment of your educational content.
        </p>
      </div>

      <div className="relative mt-6 max-w-2xl">
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="stack-field min-w-0">
            <Label htmlFor="playground-evaluator">Evaluator type</Label>
            <div className="relative">
              <select
                id="playground-evaluator"
                className={cn(
                  selectClassName(),
                  "cursor-pointer appearance-none pr-10",
                  evaluatorType === "" && "text-muted-foreground",
                )}
                value={evaluatorType}
                onChange={(e) => setEvaluatorType(e.target.value)}
              >
                {EVALUATOR_OPTIONS.map((o) => (
                  <option key={o.value || "placeholder"} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
            </div>
          </div>

          <div className="stack-field min-w-0">
            <Label htmlFor="playground-grade">Target grade level</Label>
            <div className="relative">
              <select
                id="playground-grade"
                className={cn(
                  selectClassName(),
                  "cursor-pointer appearance-none pr-10",
                  grade === "" && "text-muted-foreground",
                )}
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                {GRADE_OPTIONS.map((o) => (
                  <option key={o.value || "placeholder"} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
            </div>
          </div>

          <div className="stack-field min-w-0 sm:col-span-2">
            <Label id="playground-ccss-label">CCSS standards to test against</Label>
            <div className="relative">
              <select
                id="playground-ccss-add"
                className={cn(
                  selectClassName(),
                  "cursor-pointer appearance-none pr-10",
                  !addStandard && "text-muted-foreground",
                )}
                value={addStandard}
                onChange={(e) => {
                  const v = e.target.value;
                  setAddStandard(v);
                  if (v && !standards.includes(v)) {
                    setStandards((s) => [...s, v]);
                    setAddStandard("");
                  }
                }}
              >
                <option value="">Add a standard…</option>
                {CCSS_ADD_OPTIONS.filter((o) => !standards.includes(o.value)).map(
                  (o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ),
                )}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
            </div>
            {standards.length > 0 ? (
              <div
                className="flex flex-wrap gap-2 pt-1"
                role="list"
                aria-labelledby="playground-ccss-label"
              >
                {standards.map((code) => (
                  <span
                    key={code}
                    role="listitem"
                    className="inline-flex items-center gap-1.5 rounded-full border-app border-border-subtle bg-sidebar px-3 py-1 text-base font-normal text-foreground"
                  >
                    {code}
                    <button
                      type="button"
                      className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-nav-active hover:text-foreground"
                      aria-label={`Remove ${code}`}
                      onClick={() => removeStandard(code)}
                    >
                      <X className="size-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="stack-field min-w-0 sm:col-span-2">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <Label htmlFor="playground-text">Math question or problem</Label>
              <button
                type="button"
                onClick={useExampleQuestion}
                className="shrink-0 text-sm font-normal text-foreground underline underline-offset-4 hover:opacity-90"
              >
                Use example question
              </button>
            </div>
            <Textarea
              id="playground-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter a question or problem to evaluate against your selected standards."
              rows={6}
              className="min-h-[160px] resize-y"
            />
            <p className="flex gap-2 text-sm font-normal text-muted-foreground">
              <Info
                className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <span>
                Please do not enter any personally identifiable information
                (PII).
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
            <Button
              type="button"
              variant="primary"
              size="lg"
              disabled={!canEvaluate}
              onClick={evaluate}
            >
              Evaluate
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              disabled={!canClearAll}
              onClick={clearAll}
            >
              <Trash2 className="size-4" aria-hidden />
              Clear all
            </Button>
          </div>
        </section>
      </div>

      {evaluationStatus !== "idle" ? (
        <div className="relative mt-10 max-w-5xl">
          {evaluationStatus === "loading" ? (
            <div
              className="flex justify-center py-6"
              role="status"
              aria-live="polite"
              aria-busy="true"
            >
              <LogomarkLoadingAnimation />
            </div>
          ) : (
            <div className="space-y-16">
              <section className="space-y-6">
                <div className="space-y-6">
                  <h2 className="font-page-h2 text-heading dark:text-foreground">
                    Standards alignment overview
                  </h2>
                  <p className="text-base font-normal text-muted-foreground">
                    Summary scores per standard for this run (demo data).
                  </p>
                </div>

                <div className="overflow-hidden border-app-t border-border-subtle bg-transparent">
                  <StickyTableProvider>
                    <table className="min-w-[640px] w-full border-collapse text-base">
                      <caption className="sr-only">
                        Standards alignment overview: standard, stencil label,
                        score
                      </caption>
                      <thead>
                        <tr>
                          <th className={tableHeadStickyCellClasses()}>
                            Standards
                          </th>
                          <th className={tableHeadStickyCellClasses()}>
                            Stencil
                          </th>
                          <th
                            className={tableHeadStickyCellClasses(
                              "min-w-[200px]",
                            )}
                          >
                            Score
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {OVERVIEW_ROWS.map((row) => (
                          <tr
                            key={row.id}
                            className="border-app-b border-border-subtle [&>td]:align-middle"
                          >
                            <td className="px-4 py-6">
                              <span className={CCSS_TABLE_CODE_CLASS}>
                                {row.standard}
                              </span>
                            </td>
                            <td className="px-4 py-6 text-muted-foreground">
                              {row.stencil}
                            </td>
                            <td className="px-4 py-6">
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <span className="text-sm tabular-nums text-muted-foreground">
                                  {row.scoreCurrent}/{row.scoreMax}
                                </span>
                                <ProgressBar
                                  value={row.scoreCurrent}
                                  max={row.scoreMax}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </StickyTableProvider>
                </div>
              </section>

              <section className="space-y-6">
                <div className="space-y-8">
                  <h2 className="font-page-h2 text-heading dark:text-foreground">
                    Standards alignment results
                  </h2>
                  <p className="text-base font-normal text-muted-foreground">
                    Yes means match standards alignment.
                  </p>
                </div>

                <div className="space-y-12">
                  {ALIGNMENT_GROUPS.map((group) => (
                    <div key={group.code} className="space-y-0">
                      <h3
                        className={cn(
                          "border-app-b border-border-subtle pb-3",
                          CCSS_CODE_HEADING_CLASS,
                        )}
                      >
                        {group.code}
                      </h3>
                      <ul className="divide-y divide-border-subtle border-app-b border-border-subtle">
                        {group.items.map((item) => {
                          const isOpen = expanded.has(item.id);
                          return (
                            <li key={item.id}>
                              <button
                                type="button"
                                onClick={() => toggleAccordion(item.id)}
                                className="flex w-full items-start gap-4 py-6 text-left transition-colors hover:bg-nav-active/40 dark:hover:bg-nav-active/20"
                                aria-expanded={isOpen}
                              >
                                <span className="min-w-0 flex-1 text-base font-normal leading-snug text-foreground">
                                  {item.title}
                                </span>
                                <span className="flex shrink-0 items-center gap-3">
                                  <ColorBadge
                                    variant={item.aligned ? "green" : "pink"}
                                  >
                                    {item.aligned ? "Yes" : "No"}
                                  </ColorBadge>
                                  <ChevronDown
                                    className={cn(
                                      "size-5 shrink-0 text-muted-foreground transition-transform duration-200",
                                      isOpen && "rotate-180",
                                    )}
                                    aria-hidden
                                  />
                                </span>
                              </button>
                              {isOpen ? (
                                <div className="border-app-t border-border-subtle bg-field-bg/50 px-8 py-8 dark:bg-field-bg/30">
                                  <div className="space-y-8">
                                    <div>
                                      <p className="font-nav-eyebrow text-[11px] font-medium uppercase tracking-[0.04em] text-muted-foreground">
                                        Reasoning
                                      </p>
                                      <p className="mt-3 text-base font-normal leading-relaxed text-foreground">
                                        {item.reasoning}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="font-nav-eyebrow text-[11px] font-medium uppercase tracking-[0.04em] text-muted-foreground">
                                        Feedback
                                      </p>
                                      <p className="mt-3 text-base font-normal leading-relaxed text-foreground">
                                        {item.feedback}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      ) : null}
    </PageContainer>
  );
}

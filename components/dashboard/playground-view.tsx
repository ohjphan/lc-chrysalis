"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Info,
  Trash2,
  X,
} from "lucide-react";
import { PageContainer } from "@/components/dashboard/page-container";
import { StickyTableProvider } from "@/components/dashboard/sticky-table-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MultiSelectField } from "@/components/ui/multi-select-field";
import { PageTitle } from "@/components/ui/page-title";
import { SelectableCardGroup } from "@/components/ui/selectable-card-group";
import { Textarea } from "@/components/ui/textarea";
import { SimpleRingLoader } from "@/components/ui/loading-indicators";
import { ProgressBar } from "@/components/ui/progress-bar";
import { tableHeadStickyCellClasses } from "@/lib/table-styles";
import { cn } from "@/lib/utils";

const EVALUATOR_OPTIONS = [
  {
    value: "literacy",
    label: "Literacy evaluation",
    description: "Review reading and writing prompts for literacy-focused quality signals.",
  },
  {
    value: "math-alignment",
    label: "Math standards alignment",
    description: "Check how well a question aligns to targeted math standards and skills.",
  },
  {
    value: "cross",
    label: "Cross-curricular alignment",
    description: "Evaluate connections across subjects for integrated instructional use.",
  },
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

const EXAMPLE_QUESTION =
  "A school has 48 students going on a field trip. Each van holds 8 students. How many vans are needed? Show your reasoning using division and explain what the remainder means if there is one.";

function selectClassName() {
  return cn(
    "box-border flex h-[length:var(--control-height)] w-full rounded-md border-app border-border-subtle bg-field-bg px-3.5 py-2.5 text-base font-normal text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  );
}

type AlignmentItem = {
  id: string;
  title: string;
  aligned: boolean;
  reasoning: string;
  feedback: string;
};

type AlignmentResult = {
  id: string;
  standard: string;
  stencil: string;
  scoreCurrent: number;
  scoreMax: number;
  items: AlignmentItem[];
};

type ReasoningDetail = {
  standard: string;
  item: AlignmentItem;
};

const ALIGNMENT_RESULTS: AlignmentResult[] = [
  {
    id: "1",
    standard: "3.OA.A.3",
    stencil: "Standard definition",
    scoreCurrent: 2,
    scoreMax: 2,
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
    id: "2",
    standard: "3.OA.A.4",
    stencil: "Standard definition",
    scoreCurrent: 1,
    scoreMax: 2,
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
    id: "3",
    standard: "3.OA.B.5",
    stencil: "Standard definition",
    scoreCurrent: 1,
    scoreMax: 2,
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
  const [text, setText] = React.useState("");
  const [expandedStandards, setExpandedStandards] = React.useState<Set<string>>(
    () => new Set(),
  );
  const [activeReasoningItem, setActiveReasoningItem] =
    React.useState<ReasoningDetail | null>(null);
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

  function toggleStandard(id: string) {
    setExpandedStandards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
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
    setExpandedStandards(new Set());
    setActiveReasoningItem(null);
    setEvaluationStatus("idle");
    setEvaluatorType("");
    setGrade("");
    setStandards([]);
    setText("");
  }

  function evaluate() {
    if (!canEvaluate) return;
    if (evaluationFinishTimerRef.current) {
      clearTimeout(evaluationFinishTimerRef.current);
      evaluationFinishTimerRef.current = null;
    }
    setActiveReasoningItem(null);
    setEvaluationStatus("loading");
    evaluationFinishTimerRef.current = setTimeout(() => {
      evaluationFinishTimerRef.current = null;
      setExpandedStandards(new Set());
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

      <div className="mt-6 space-y-10">
        <div className="relative min-w-0">
          <section className="space-y-6">
            <div className="stack-field min-w-0">
              <Label id="playground-evaluator-label">Evaluator type</Label>
              <SelectableCardGroup
                aria-labelledby="playground-evaluator-label"
                value={evaluatorType}
                onValueChange={setEvaluatorType}
                options={EVALUATOR_OPTIONS}
                className="w-full"
              />
            </div>

            <AnimatePresence initial={false}>
              {evaluatorType ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start"
                >
                  <div className="space-y-6 lg:col-span-4">
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

                    <div className="stack-field min-w-0">
                      <Label id="playground-ccss-label">
                        CCSS standards to test against
                      </Label>
                      <MultiSelectField
                        id="playground-ccss-add"
                        ariaLabelledBy="playground-ccss-label"
                        value={standards}
                        onValueChange={setStandards}
                        options={CCSS_ADD_OPTIONS.map((option) => ({
                          value: option.value,
                          label: option.label,
                        }))}
                        placeholder="Add a standard…"
                      />
                    </div>
                  </div>

                  <div className="stack-field min-w-0 lg:col-span-8">
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
                      rows={5}
                      className="min-h-[140px] resize-y"
                    />
                    <div className="flex flex-col gap-3 pt-1 md:flex-row md:items-center md:justify-between">
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
                      <div className="flex flex-wrap items-center justify-end gap-3">
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
                        <Button
                          type="button"
                          variant="primary"
                          size="lg"
                          disabled={!canEvaluate}
                          onClick={evaluate}
                        >
                          Evaluate
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </section>
        </div>

        {evaluationStatus !== "idle" ? (
          <div className="relative min-w-0">
            {evaluationStatus === "loading" ? (
              <div
                className="flex justify-center py-6"
                role="status"
                aria-live="polite"
                aria-busy="true"
              >
                <SimpleRingLoader size="lg" />
              </div>
            ) : (
              <div className="space-y-6">
                <section className="space-y-6">
                  <div className="space-y-6">
                    <h2 className="font-page-h2 text-heading dark:text-foreground">
                      Standards alignment overview
                    </h2>
                    <p className="text-base font-normal text-muted-foreground">
                      Summary scores per standard for this run (demo data). Expand
                      a row to review the criteria behind each score.
                    </p>
                  </div>

                  <div className="overflow-hidden bg-transparent">
                    <StickyTableProvider>
                      <table className="min-w-[560px] w-full border-collapse text-base">
                        <caption className="sr-only">
                          Standards alignment overview with expandable rows for
                          detailed results
                        </caption>
                        <thead>
                          <tr>
                            <th className={tableHeadStickyCellClasses()}>
                              Standards
                            </th>
                            <th
                              className={tableHeadStickyCellClasses(
                                "min-w-[180px]",
                              )}
                            >
                              <div className="ml-auto w-[72%] max-w-[240px] min-w-[132px] text-left">
                                Score
                              </div>
                            </th>
                            <th
                              className={tableHeadStickyCellClasses(
                                "w-14 px-2 text-right",
                              )}
                            >
                              <span className="sr-only">Expand row</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {ALIGNMENT_RESULTS.map((row) => {
                            const isOpen = expandedStandards.has(row.id);

                            return (
                              <React.Fragment key={row.id}>
                                <tr
                                  className={cn(
                                    "[&>td]:align-middle",
                                    isOpen
                                      ? "border-b-0"
                                      : "border-app-b border-border-subtle transition-colors hover:bg-nav-active/20",
                                  )}
                                >
                                  <td className="px-4 py-6">
                                    <div className="space-y-1.5">
                                      <span className={CCSS_TABLE_CODE_CLASS}>
                                        {row.standard}
                                      </span>
                                      <p className="text-sm font-normal text-muted-foreground">
                                        {row.stencil}
                                      </p>
                                    </div>
                                  </td>
                                  <td className="px-4 py-6">
                                    <div className="flex w-full min-w-0 items-center justify-end">
                                      <ProgressBar
                                        value={row.scoreCurrent}
                                        max={row.scoreMax}
                                        className="w-[72%] max-w-[240px] min-w-[132px] shrink-0 gap-2"
                                        labelClassName="w-[2.5rem] font-mono text-muted-foreground"
                                      />
                                    </div>
                                  </td>
                                  <td className="px-2 py-4 text-right">
                                    <button
                                      type="button"
                                      onClick={() => toggleStandard(row.id)}
                                      className="inline-flex size-9 items-center justify-center rounded-[4px] text-muted-foreground transition-colors hover:bg-background/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                      aria-expanded={isOpen}
                                      aria-controls={`playground-standard-details-${row.id}`}
                                      aria-label={`${isOpen ? "Collapse" : "Expand"} details for ${row.standard}`}
                                    >
                                      <ChevronDown
                                        className={cn(
                                          "size-5 transition-transform duration-200",
                                          isOpen && "rotate-180",
                                        )}
                                        aria-hidden
                                      />
                                    </button>
                                  </td>
                                </tr>
                                {isOpen ? (
                                  <tr
                                    id={`playground-standard-details-${row.id}`}
                                    className="border-app-b border-border-subtle"
                                  >
                                    <td colSpan={3} className="bg-background px-0 py-0">
                                      <ul>
                                        {row.items.map((item) => (
                                          <li
                                            key={item.id}
                                            className="last:border-b-0"
                                          >
                                            <div className="px-4 py-5">
                                              <div className="flex min-w-0 items-start gap-3">
                                                <span
                                                  className={cn(
                                                    "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full",
                                                    item.aligned
                                                      ? "bg-accent-green text-white"
                                                      : "bg-destructive text-white",
                                                  )}
                                                  aria-hidden
                                                >
                                                  {item.aligned ? (
                                                    <Check className="size-3.5" />
                                                  ) : (
                                                    <X className="size-3.5" />
                                                  )}
                                                </span>
                                                <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
                                                  <p className="min-w-0 flex-1 text-base font-normal leading-relaxed text-foreground">
                                                    {item.title}
                                                  </p>
                                                  <button
                                                    type="button"
                                                    onClick={() =>
                                                      setActiveReasoningItem({
                                                        standard: row.standard,
                                                        item,
                                                      })
                                                    }
                                                    className="shrink-0 text-sm font-normal text-foreground underline underline-offset-4 transition-opacity hover:opacity-80"
                                                  >
                                                    Reasoning
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    </td>
                                  </tr>
                                ) : null}
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </StickyTableProvider>
                  </div>
                </section>

                <Dialog
                  open={activeReasoningItem !== null}
                  onOpenChange={(open) => {
                    if (!open) setActiveReasoningItem(null);
                  }}
                >
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {activeReasoningItem?.item.title ?? "Reasoning"}
                      </DialogTitle>
                      <DialogDescription>
                        {activeReasoningItem
                          ? `${activeReasoningItem.standard} ${activeReasoningItem.item.aligned ? "matches" : "does not match"} the intended standards alignment for this run.`
                          : "Review the evaluator reasoning and suggested feedback."}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-8 px-9 pb-9 pt-1">
                      <div>
                        <p className="font-nav-eyebrow text-[11px] font-medium uppercase tracking-[0.04em] text-eyebrow">
                          Reasoning
                        </p>
                        <p className="mt-2 text-base font-normal leading-relaxed text-foreground">
                          {activeReasoningItem?.item.reasoning}
                        </p>
                      </div>
                      <div>
                        <p className="font-nav-eyebrow text-[11px] font-medium uppercase tracking-[0.04em] text-eyebrow">
                          Feedback
                        </p>
                        <p className="mt-2 text-base font-normal leading-relaxed text-foreground">
                          {activeReasoningItem?.item.feedback}
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </PageContainer>
  );
}

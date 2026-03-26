"use client";

import * as React from "react";
import { ChevronDown, Info, Trash2 } from "lucide-react";
import { PageContainer } from "@/components/dashboard/page-container";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Label } from "@/components/ui/label";
import { PageTitle } from "@/components/ui/page-title";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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
  { value: "9", label: "Grade 9" },
  { value: "10", label: "Grade 10" },
  { value: "11", label: "Grade 11" },
  { value: "12", label: "Grade 12" },
] as const;

const EXAMPLE_TEXT =
  "Water moves through Earth's oceans, atmosphere, and land in a continuous cycle. When the sun warms the surface of a lake, some of the water evaporates into water vapor. The vapor rises, cools, and can form clouds. Eventually the water falls back to the ground as precipitation, such as rain or snow.";

function selectClassName() {
  return cn(
    "flex h-10 w-full rounded-md border-app border-border-subtle bg-field-bg px-3 py-2 text-base font-normal text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  );
}

export function PlaygroundView() {
  const [grade, setGrade] = React.useState("");
  const [text, setText] = React.useState("");
  const [demoResult, setDemoResult] = React.useState<string | null>(null);

  const canEvaluate = grade !== "" && text.trim().length > 0;

  function useExampleText() {
    setGrade("4");
    setText(EXAMPLE_TEXT);
    setDemoResult(null);
  }

  function clearAll() {
    setGrade("");
    setText("");
    setDemoResult(null);
  }

  function evaluate() {
    if (!canEvaluate) return;
    setDemoResult(
      "Demo only: in a live build, results would include scores and explanations for grade-level appropriateness, sentence structure, and vocabulary complexity.",
    );
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-[8px]">
        <PageTitle>Evaluator Playground</PageTitle>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Test passages against a target grade with demo scores and explanations.
        </p>
      </div>

      <div className="mt-10 max-w-2xl space-y-8">
        <section className="space-y-8">
          <div className="flex flex-col gap-[8px]">
            <h2 className="font-page-h2">Literacy evaluation</h2>
            <p className="text-base font-normal text-muted-foreground">
              Assess the appropriateness of informational text for a specific grade
              level. The evaluation returns scores and explanations for
              grade-level appropriateness, sentence structure, and vocabulary
              complexity.
            </p>
          </div>

          <div className="stack-field">
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
                onChange={(e) => {
                  setGrade(e.target.value);
                  setDemoResult(null);
                }}
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
            <p className="text-sm font-normal text-muted-foreground">
              Choose the intended grade level for the text. Sentence structure and
              vocabulary evaluations are currently only available for grades 3 and
              4.
            </p>
          </div>

          <div className="stack-field">
            <Label htmlFor="playground-text">Your text</Label>
            <Textarea
              id="playground-text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setDemoResult(null);
              }}
              placeholder="Paste the informational text you want to evaluate"
              rows={10}
              className="min-h-[220px] resize-y"
            />
            <p className="flex gap-2 text-sm font-normal text-muted-foreground">
              <Info
                className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <span>
                Please do not enter any personally identifiable information (PII).
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={useExampleText}
            >
              Use example text
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={clearAll}
            >
              <Trash2 />
              Clear all
            </Button>
          </div>

          <div>
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

          {demoResult ? (
            <Callout className="text-muted-foreground">{demoResult}</Callout>
          ) : null}
        </section>
      </div>
    </PageContainer>
  );
}

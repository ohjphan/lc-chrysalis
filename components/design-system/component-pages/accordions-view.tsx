"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { ColorBadge } from "@/components/ui/color-badge";
import { cn } from "@/lib/utils";

type AccordionItem = {
  id: string;
  title: string;
  status: "yes" | "no";
  reasoning: string;
  feedback: string;
};

const DEMO_ITEMS: AccordionItem[] = [
  {
    id: "a",
    title: "Apply understanding of the standard in a grade-level context.",
    status: "yes",
    reasoning:
      "The prompt asks the learner to show reasoning and connects directly to the target standard.",
    feedback:
      "Strong fit overall. Keep the prompt language concise so students focus on the intended skill.",
  },
  {
    id: "b",
    title: "Provide enough structure for evidence-based responses.",
    status: "no",
    reasoning:
      "The task hints at justification, but it does not clearly ask students to cite or show supporting evidence.",
    feedback:
      "Consider adding a sentence frame or explicit instruction so the expected evidence is clearer.",
  },
  {
    id: "c",
    title: "Reflect the intended cognitive demand of the task.",
    status: "yes",
    reasoning:
      "The activity asks learners to explain their thinking instead of only selecting an answer, which better matches the target rigor.",
    feedback:
      "Keep the reasoning prompt, and consider adding an example response if teachers need a model for grading.",
  },
  {
    id: "d",
    title: "Stay tightly focused on one standard per prompt.",
    status: "no",
    reasoning:
      "The item starts from the target standard, but the final question introduces an additional skill that may confuse scoring.",
    feedback:
      "Split the task into two prompts or remove the extra skill check so the evaluator can return clearer alignment signals.",
  },
];

export function AccordionsView() {
  const [expanded, setExpanded] = React.useState<Set<string>>(() => new Set());

  function toggleAccordion(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">
          Accordions
        </h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Expandable rows for dense content, reasoning, and supporting detail
          without leaving the current page.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-[2px]">
          <h3 className="font-page-h3 text-heading dark:text-foreground">
            Default
          </h3>
        </div>

        <ul className="divide-y divide-border-subtle border-app-y border-border-subtle">
          {DEMO_ITEMS.map((item) => {
            const isOpen = expanded.has(item.id);
            const positive = item.status === "yes";

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  className="flex w-full items-start gap-4 py-6 text-left transition-colors hover:bg-nav-active/40 dark:hover:bg-nav-active/20"
                  aria-expanded={isOpen}
                >
                  <span className="min-w-0 flex-1 text-base font-medium leading-snug text-charcoal dark:text-foreground">
                    {item.title}
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    <ColorBadge variant={positive ? "green" : "pink"}>
                      {positive ? "Yes" : "No"}
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
                  <div className="bg-field-bg/50 pb-8 pt-4 dark:bg-field-bg/30">
                    <div className="space-y-8">
                      <div>
                        <p className="font-nav-eyebrow text-[11px] font-medium uppercase tracking-[0.04em] text-eyebrow">
                          Reasoning
                        </p>
                        <p className="mt-2 text-base font-normal leading-relaxed text-foreground">
                          {item.reasoning}
                        </p>
                      </div>
                      <div>
                        <p className="font-nav-eyebrow text-[11px] font-medium uppercase tracking-[0.04em] text-eyebrow">
                          Feedback
                        </p>
                        <p className="mt-2 text-base font-normal leading-relaxed text-foreground">
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
    </div>
  );
}

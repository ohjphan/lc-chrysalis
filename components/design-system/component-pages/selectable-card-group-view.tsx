"use client";

import * as React from "react";
import { SelectableCardGroup } from "@/components/ui/selectable-card-group";

const BASIC_OPTIONS = [
  {
    value: "a",
    label: "Mapping concepts and skills to standards",
    description:
      "See concepts and skills students need to master in a given state for a standard.",
  },
  {
    value: "b",
    label: "Connecting prior learning to a standard",
    description:
      "See prior standards that a specific standard builds on top of.",
  },
  {
    value: "c",
    label: "Finding lessons addressing a standard",
    description:
      "See which lessons and materials support a specific standard.",
  },
] as const;

export function SelectableCardGroupView() {
  const [value, setValue] = React.useState<
    (typeof BASIC_OPTIONS)[number]["value"]
  >("a");

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">
          Selectable cards
        </h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Single-select grouped cards for longer option labels and richer
          descriptions than pills or tabs allow. Selected cards use the
          modal-style green top bar; unselected cards use a warm top bar on hover
          and focus. No extra props—this is the default (
          <code className="rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">
            indicatorStyle=&quot;none&quot;
          </code>
          ,{" "}
          <code className="rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">
            activeTopAccent
          </code>{" "}
          defaults to{" "}
          <code className="rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">
            true
          </code>
          ).
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-[2px]">
          <h3 className="font-page-h3 text-heading dark:text-foreground">
            Default: modal top accent
          </h3>
          <p className="max-w-2xl text-base font-normal text-muted-foreground">
            Green top bar on the selected card, warm top on hover or focus when
            unselected, subtle border, and sidebar fill—only your options and
            radiogroup a11y.
          </p>
        </div>
        <SelectableCardGroup
          aria-label="Selectable cards, default modal top accent"
          value={value}
          onValueChange={setValue}
          options={BASIC_OPTIONS}
          indicatorStyle="none"
        />
      </section>
    </div>
  );
}

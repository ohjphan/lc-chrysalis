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
  const [basicValue, setBasicValue] = React.useState<
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
          descriptions than pills or tabs allow.
        </p>
      </div>

      <div className="space-y-10">
        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Default
            </h3>
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              Default stacked-card selection with supporting description text.
            </p>
          </div>
          <SelectableCardGroup
            aria-label="Standard selectable cards"
            value={basicValue}
            onValueChange={setBasicValue}
            options={BASIC_OPTIONS}
          />
        </section>
      </div>
    </div>
  );
}

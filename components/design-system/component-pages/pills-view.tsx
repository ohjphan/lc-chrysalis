"use client";

import * as React from "react";
import { PillToggleGroup } from "@/components/ui/pill-toggle-group";

export function PillsView() {
  const [value, setValue] = React.useState<"a" | "b" | "c">("a");
  const [borderlessValue, setBorderlessValue] = React.useState<"a" | "b" | "c">(
    "a",
  );
  const [darkIndicatorValue, setDarkIndicatorValue] = React.useState<
    "a" | "b" | "c"
  >("a");

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">Pills</h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Single-select pill group for compact choices (e.g. filters or mode).
        </p>
      </div>
      <div className="space-y-10">
        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Option 1: Border
            </h3>
          </div>
          <PillToggleGroup
            aria-label="Default pill group"
            value={value}
            onValueChange={setValue}
            options={[
              { value: "a", label: "Option A" },
              { value: "b", label: "Option B" },
              { value: "c", label: "Option C" },
            ]}
          />
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Option 2: No border
            </h3>
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              Removes the outline and uses a darker selected green fill.
            </p>
          </div>
          <PillToggleGroup
            aria-label="Borderless pill group"
            variant="borderless"
            value={borderlessValue}
            onValueChange={setBorderlessValue}
            options={[
              { value: "a", label: "Option A" },
              { value: "b", label: "Option B" },
              { value: "c", label: "Option C" },
            ]}
          />
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Option 3: Dark selected
            </h3>
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              Uses a charcoal selected state with a green dot indicator, and
              reveals a Gray 1 dot on hover for unselected pills.
            </p>
          </div>
          <PillToggleGroup
            aria-label="Dark selected pill group"
            variant="darkIndicator"
            value={darkIndicatorValue}
            onValueChange={setDarkIndicatorValue}
            options={[
              { value: "a", label: "Option A" },
              { value: "b", label: "Option B" },
              { value: "c", label: "Option C" },
            ]}
          />
        </section>
      </div>
    </div>
  );
}

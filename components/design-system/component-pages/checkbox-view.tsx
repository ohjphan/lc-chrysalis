"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function CheckboxView() {
  const [greenDefaultChecked, setGreenDefaultChecked] = React.useState(false);
  const [greenSelectedChecked, setGreenSelectedChecked] = React.useState(true);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">
          Checkbox
        </h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Use for independent multi-select choices, acknowledgements, and partial
          selection states.
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-[2px]">
          <h3 className="font-page-h3 text-heading dark:text-foreground">
            Default
          </h3>
        </div>
        <div className="max-w-md space-y-4">
          <div className="flex items-center gap-3">
            <Checkbox
              id="ds-checkbox-default"
              checked={greenDefaultChecked}
              onCheckedChange={setGreenDefaultChecked}
            />
            <Label htmlFor="ds-checkbox-default">Unchecked by default</Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="ds-checkbox-selected"
              checked={greenSelectedChecked}
              onCheckedChange={setGreenSelectedChecked}
            />
            <Label htmlFor="ds-checkbox-selected">Checked by default</Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox id="ds-checkbox-disabled" disabled />
            <Label
              htmlFor="ds-checkbox-disabled"
              className="text-muted-foreground"
            >
              Disabled
            </Label>
          </div>
        </div>
      </section>
    </div>
  );
}

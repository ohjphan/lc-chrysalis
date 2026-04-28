"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function CheckboxView() {
  const [greenDefaultChecked, setGreenDefaultChecked] = React.useState(false);
  const [greenSelectedChecked, setGreenSelectedChecked] = React.useState(true);
  const [describedChecked, setDescribedChecked] = React.useState(true);

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
            <Label htmlFor="ds-checkbox-default" className="-translate-y-[1.5px]">
              Unchecked by default
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="ds-checkbox-selected"
              checked={greenSelectedChecked}
              onCheckedChange={setGreenSelectedChecked}
            />
            <Label htmlFor="ds-checkbox-selected" className="-translate-y-[1.5px]">
              Checked by default
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox id="ds-checkbox-disabled" disabled />
            <Label
              htmlFor="ds-checkbox-disabled"
              className="-translate-y-[1.5px] text-muted-foreground"
            >
              Disabled
            </Label>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-[2px]">
          <h3 className="font-page-h3 text-heading dark:text-foreground">
            With description
          </h3>
          <p className="max-w-2xl text-base font-normal text-muted-foreground">
            Use a stacked label block when a checkbox needs supporting context
            below the main label.
          </p>
        </div>
        <div className="max-w-md">
          <div className="flex items-start gap-3">
            <Checkbox
              id="ds-checkbox-description"
              checked={describedChecked}
              onCheckedChange={setDescribedChecked}
              className="mt-0.5"
            />
            <div className="-translate-y-[1.5px] space-y-1">
              <Label htmlFor="ds-checkbox-description">
                Enable curriculum sync
              </Label>
              <p className="text-sm font-normal leading-relaxed text-muted-foreground">
                Automatically keep lesson metadata aligned with the latest
                standards updates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

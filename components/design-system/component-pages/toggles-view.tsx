"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function TogglesView() {
  const [circleEnabled, setCircleEnabled] = React.useState(true);
  const [circleDisabled, setCircleDisabled] = React.useState(false);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">Toggles</h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Switch control for binary settings; pair with a label for accessible
          naming.
        </p>
      </div>
      <div className="space-y-10">
        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Option 1: Circle
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Switch
                checked={circleEnabled}
                onCheckedChange={setCircleEnabled}
                id="demo-switch-circle-enabled"
              />
              <Label htmlFor="demo-switch-circle-enabled">
                Enabled by default
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={circleDisabled}
                onCheckedChange={setCircleDisabled}
                id="demo-switch-circle-disabled"
              />
              <Label htmlFor="demo-switch-circle-disabled">
                Off by default
              </Label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

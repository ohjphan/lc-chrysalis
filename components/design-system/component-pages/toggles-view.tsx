"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function TogglesView() {
  const [circleEnabled, setCircleEnabled] = React.useState(true);
  const [circleDisabled, setCircleDisabled] = React.useState(false);
  const [boxyEnabled, setBoxyEnabled] = React.useState(true);
  const [boxyDisabled, setBoxyDisabled] = React.useState(false);
  const [boxyDarkEnabled, setBoxyDarkEnabled] = React.useState(true);
  const [boxyDarkDisabled, setBoxyDarkDisabled] = React.useState(false);
  const [boxyDarkSimpleEnabled, setBoxyDarkSimpleEnabled] = React.useState(true);
  const [boxyDarkSimpleDisabled, setBoxyDarkSimpleDisabled] =
    React.useState(false);

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

        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Option 2: Boxy
            </h3>
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              Uses a 4px radius on the track and thumb.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Switch
                variant="boxy"
                checked={boxyEnabled}
                onCheckedChange={setBoxyEnabled}
                id="demo-switch-boxy-enabled"
              />
              <Label htmlFor="demo-switch-boxy-enabled">
                Enabled by default
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                variant="boxy"
                checked={boxyDisabled}
                onCheckedChange={setBoxyDisabled}
                id="demo-switch-boxy-disabled"
              />
              <Label htmlFor="demo-switch-boxy-disabled">
                Off by default
              </Label>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Option 3: Boxy Dark Simple
            </h3>
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              Uses the boxy dark treatment without the green or gray indicator dot.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Switch
                variant="boxyDarkSimple"
                checked={boxyDarkSimpleEnabled}
                onCheckedChange={setBoxyDarkSimpleEnabled}
                id="demo-switch-boxy-dark-simple-enabled"
              />
              <Label htmlFor="demo-switch-boxy-dark-simple-enabled">
                Enabled by default
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                variant="boxyDarkSimple"
                checked={boxyDarkSimpleDisabled}
                onCheckedChange={setBoxyDarkSimpleDisabled}
                id="demo-switch-boxy-dark-simple-disabled"
              />
              <Label htmlFor="demo-switch-boxy-dark-simple-disabled">
                Off by default
              </Label>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Option 4: Boxy Dark Stylized
            </h3>
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              Uses the boxy shape with charcoal for the enabled state plus the indicator dot treatment.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Switch
                variant="boxyDark"
                checked={boxyDarkEnabled}
                onCheckedChange={setBoxyDarkEnabled}
                id="demo-switch-boxy-dark-enabled"
              />
              <Label htmlFor="demo-switch-boxy-dark-enabled">
                Enabled by default
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                variant="boxyDark"
                checked={boxyDarkDisabled}
                onCheckedChange={setBoxyDarkDisabled}
                id="demo-switch-boxy-dark-disabled"
              />
              <Label htmlFor="demo-switch-boxy-dark-disabled">
                Off by default
              </Label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

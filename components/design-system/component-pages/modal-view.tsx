"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ModalView() {
  const [openProgressive, setOpenProgressive] = React.useState(false);
  const [openSingle, setOpenSingle] = React.useState(false);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">Modal</h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Shared overlay, surface, header, and footer. Backdrop uses{" "}
          <code className="font-mono text-sm text-foreground">backdrop-blur-lg</code>{" "}
          for a frosted-glass scrim. Two variants follow.
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-[2px]">
          <h3 className="font-page-h3 text-heading dark:text-foreground">
            Progressive modal
          </h3>
          <ul className="max-w-2xl list-outside list-disc space-y-1.5 pl-5 text-base font-normal text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">When:</span> several
              steps in one dialog (setup, wizards, create → review).
            </li>
            <li>
              <span className="font-medium text-foreground">Surface:</span>{" "}
              <code className="font-mono text-sm text-foreground">
                variant=&quot;progressive&quot;
              </code>
              , green top bar. Full width by default;{" "}
              <code className="font-mono text-sm text-foreground">
                accentProgress
              </code>{" "}
              0–100 per step. Primary actions are usually Continue / Next until the
              last step.
            </li>
          </ul>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={() => setOpenProgressive(true)}
        >
          Open progressive modal
        </Button>

        <Dialog open={openProgressive} onOpenChange={setOpenProgressive}>
          <DialogContent variant="progressive" accentProgress={50}>
            <DialogHeader>
              <DialogTitle>Verify your organization</DialogTitle>
              <DialogDescription>
                Confirm your organization details to finish setup. You can update
                this information later from workspace settings.
              </DialogDescription>
            </DialogHeader>

            <div className="px-9 pb-2 pt-1">
              <div className="rounded-md bg-sidebar px-4 py-4 text-base font-normal text-muted-foreground">
                Demo:{" "}
                <code className="font-mono text-sm text-foreground">
                  accentProgress={"{"}50{"}"}
                </code>
                . Omit the prop or use{" "}
                <code className="font-mono text-sm text-foreground">
                  accentProgress={"{"}100{"}"}
                </code>{" "}
                for a full bar.
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpenProgressive(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={() => setOpenProgressive(false)}
              >
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-[2px]">
          <h3 className="font-page-h3 text-heading dark:text-foreground">
            Single-step modal
          </h3>
          <ul className="max-w-2xl list-outside list-disc space-y-1.5 pl-5 text-base font-normal text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">When:</span> one screen
              only—confirms, destructive actions, simple forms, alerts. Skip if
              there is no real step sequence (a progress bar would read wrong).
            </li>
            <li>
              <span className="font-medium text-foreground">Surface:</span>{" "}
              <code className="font-mono text-sm text-foreground">
                variant=&quot;single&quot;
              </code>{" "}
              on{" "}
              <code className="font-mono text-sm text-foreground">DialogContent</code>
              : no green bar; same header and footer pattern as progressive.
            </li>
          </ul>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={() => setOpenSingle(true)}
        >
          Open single-step modal
        </Button>

        <Dialog open={openSingle} onOpenChange={setOpenSingle}>
          <DialogContent variant="single">
            <DialogHeader>
              <DialogTitle>Delete organization</DialogTitle>
              <DialogDescription>
                This will remove the organization from your workspace in this
                demo. Are you sure?
              </DialogDescription>
            </DialogHeader>

            <div className="px-9 pb-2 pt-1">
              <div className="rounded-md bg-sidebar px-4 py-4 text-base font-normal text-muted-foreground">
                Demo uses{" "}
                <code className="font-mono text-sm text-foreground">
                  variant=&quot;single&quot;
                </code>{" "}
                for a calm destructive confirm—no top accent.
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpenSingle(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => setOpenSingle(false)}
              >
                Delete organization
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}

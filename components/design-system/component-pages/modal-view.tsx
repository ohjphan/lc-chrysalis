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
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">Modal</h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Modals use the shared dialog primitives for the overlay, surface,
          header, body, and footer actions. The dimmed backdrop uses a lighter
          scrim with <code className="font-mono text-sm text-foreground">backdrop-blur-lg</code>{" "}
          so the page behind reads as frosted glass rather than a flat wash. Use
          them for focused tasks that need temporary interruption without leaving
          the current page.
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-[2px]">
          <h3 className="font-page-h3 text-heading dark:text-foreground">
            Default
          </h3>
          <p className="max-w-2xl text-base font-normal text-muted-foreground">
            Standard product modal with the shared green top accent, close
            button, and right-aligned footer actions.
          </p>
        </div>

        <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
          Open modal
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite a teammate</DialogTitle>
              <DialogDescription>
                Send an invitation without leaving the current workflow. Use the
                modal body for supporting details, form fields, or a short task
                summary.
              </DialogDescription>
            </DialogHeader>

            <div className="px-9 pb-2 pt-1">
              <div className="rounded-md bg-sidebar px-4 py-4 text-base font-normal text-muted-foreground">
                This example keeps the modal content simple, but uses the same
                shared surface, spacing, and footer structure as the product
                dialogs.
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" variant="primary" onClick={() => setOpen(false)}>
                Send invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}

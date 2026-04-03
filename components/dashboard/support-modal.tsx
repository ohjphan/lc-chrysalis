"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { SupportPanel } from "@/components/dashboard/support-panel";

export function SupportModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0">
        <VisuallyHidden.Root>
          <DialogTitle>Support</DialogTitle>
          <DialogDescription>
            Have a question? Contact Learning Commons support or visit our docs.
          </DialogDescription>
        </VisuallyHidden.Root>
        <SupportPanel onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}

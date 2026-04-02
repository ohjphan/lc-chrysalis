"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** Demo only: any 6-digit code succeeds. */
function isValidDemoCode(code: string): boolean {
  return /^\d{6}$/.test(code.trim());
}

export type VerifySecondaryEmailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  onVerified: () => void;
};

export function VerifySecondaryEmailDialog({
  open,
  onOpenChange,
  email,
  onVerified,
}: VerifySecondaryEmailDialogProps) {
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open) {
      setCode("");
      setError(null);
    }
  }, [open]);

  function handleOpenChange(next: boolean) {
    if (!next) {
      setCode("");
      setError(null);
    }
    onOpenChange(next);
  }

  function submit() {
    const trimmed = code.trim();
    if (!isValidDemoCode(trimmed)) {
      setError("Enter the 6-digit code from your email.");
      return;
    }
    setError(null);
    onVerified();
    handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify secondary email</DialogTitle>
          <DialogDescription>
            We sent a verification code to{" "}
            <span className="font-medium text-foreground">{email}</span>.
            Check your inbox and enter the code below.
          </DialogDescription>
        </DialogHeader>
        <div className="px-9 pb-2">
          <Label htmlFor="secondary-email-verify-code" className="sr-only">
            Verification code
          </Label>
          <Input
            id="secondary-email-verify-code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
              setError(null);
            }}
            inputMode="numeric"
            maxLength={6}
            autoComplete="one-time-code"
            placeholder="000000"
            className="font-mono text-base tracking-[0.2em]"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "verify-code-error" : undefined}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
          />
          {error ? (
            <p
              id="verify-code-error"
              className="mt-2 text-base font-normal text-destructive"
            >
              {error}
            </p>
          ) : null}
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" variant="primary" onClick={submit}>
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

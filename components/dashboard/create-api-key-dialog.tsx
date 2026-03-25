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

const STEPS = 2;

const modalInputClass =
  "dark:border-zinc-600 dark:bg-zinc-950/80 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:ring-offset-zinc-900 dark:focus-visible:border-zinc-500 dark:focus-visible:ring-zinc-500";

function generateApiKeySecret(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let tail = "";
  for (let i = 0; i < 24; i++) {
    tail += chars[Math.floor(Math.random() * chars.length)];
  }
  return `lc_live_${tail}`;
}

export type CreateApiKeyPayload = {
  name: string;
  fullSecret: string;
};

type CreateApiKeyDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (payload: CreateApiKeyPayload) => void;
};

export function CreateApiKeyDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateApiKeyDialogProps) {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [keyName, setKeyName] = React.useState("");
  const [generatedSecret, setGeneratedSecret] = React.useState<string | null>(
    null,
  );
  const [copied, setCopied] = React.useState(false);

  function reset() {
    setStep(1);
    setKeyName("");
    setGeneratedSecret(null);
    setCopied(false);
  }

  React.useEffect(() => {
    if (open) {
      reset();
    }
  }, [open]);

  function handleOpenChange(next: boolean) {
    if (!next) {
      reset();
    }
    onOpenChange(next);
  }

  const trimmedName = keyName.trim();
  const canContinue = trimmedName.length > 0;

  function goToStep2() {
    if (!canContinue) return;
    setGeneratedSecret(generateApiKeySecret());
    setStep(2);
  }

  async function copySecret() {
    if (!generatedSecret) return;
    try {
      await navigator.clipboard.writeText(generatedSecret);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function handleDone() {
    if (!generatedSecret || !trimmedName) return;
    onCreated({ name: trimmedName, fullSecret: generatedSecret });
    handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="gap-0 overflow-hidden">
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEPS}
          aria-valuenow={step}
          aria-valuetext={`Step ${step} of ${STEPS}`}
          aria-label="Create API key progress"
          className="h-1.5 w-full shrink-0 overflow-hidden bg-nav-active dark:bg-zinc-800"
        >
          <div
            className="h-full bg-accent-green transition-[width] duration-300 ease-out"
            style={{ width: `${(step / STEPS) * 100}%` }}
          />
        </div>

        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle>Create API key</DialogTitle>
              <DialogDescription>
                Choose a label so you can recognize this key later. You can’t
                change it after the key is created.
              </DialogDescription>
            </DialogHeader>
            <div className="px-6 pb-6">
              <div className="stack-field">
                <label
                  htmlFor="create-api-key-name"
                  className="text-sm font-medium text-foreground"
                >
                  Key name
                </label>
                <Input
                  id="create-api-key-name"
                  autoFocus
                  autoComplete="off"
                  placeholder="e.g. Production, Staging"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  className={modalInputClass}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canContinue) {
                      e.preventDefault();
                      goToStep2();
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter className="border-border-subtle dark:border-zinc-700/80">
              <Button
                type="button"
                variant="secondary"
                className="dark:border-zinc-600 dark:bg-transparent dark:text-zinc-200 dark:hover:bg-zinc-800"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                disabled={!canContinue}
                onClick={goToStep2}
              >
                Continue
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Copy your key</DialogTitle>
              <DialogDescription>
                This secret is shown only once. Store it somewhere safe—you
                won’t be able to see it again after you close this dialog.
              </DialogDescription>
            </DialogHeader>
            <div className="px-6 pb-6">
              <div className="flex h-10 w-full items-center gap-2 rounded-md border-app border-border-subtle bg-field-bg pl-3 pr-1 dark:border-zinc-600 dark:bg-zinc-950/80">
                <input
                  readOnly
                  value={generatedSecret ?? ""}
                  aria-label="API key secret"
                  className="min-w-0 flex-1 border-0 bg-transparent font-mono text-sm font-normal text-foreground outline-none focus:outline-none dark:text-zinc-100"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="h-8 shrink-0 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                  onClick={copySecret}
                >
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>
            <DialogFooter className="border-border-subtle dark:border-zinc-700/80">
              <Button
                type="button"
                variant="primary"
                onClick={handleDone}
                disabled={!generatedSecret}
              >
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type DatasetRequestTarget = {
  id: string;
  /** Small caps label above dataset title, e.g. OPENS / OPENSTAX */
  providerKey: string;
  datasetName: string;
  license: string;
  initials: string;
  avatarClassName: string;
};

const ORG_SIZE_OPTIONS = [
  { value: "", label: "Select a range" },
  { value: "1-10", label: "1 – 10" },
  { value: "11-50", label: "11 – 50" },
  { value: "51-200", label: "51 – 200" },
  { value: "200+", label: "200+" },
];

function ModalFieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-zinc-500">
      {children}
    </label>
  );
}

function modalInputClass(extra?: string) {
  return cn(
    "w-full rounded-md border-app border-border-subtle bg-[#141414] px-3 py-2.5 text-base font-normal text-zinc-100 placeholder:text-zinc-600 focus:border-border-subtle focus:outline-none focus:ring-1 focus:ring-border-subtle",
    extra,
  );
}

export function RequestAccessModal({
  open,
  onOpenChange,
  dataset,
  orgName = "Magic School",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dataset: DatasetRequestTarget | null;
  orgName?: string;
}) {
  const [step, setStep] = React.useState(0);
  const [orgLegalName, setOrgLegalName] = React.useState("");
  const [orgUrl, setOrgUrl] = React.useState("");
  const [orgSize, setOrgSize] = React.useState("");
  const [orgDescription, setOrgDescription] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [useCase, setUseCase] = React.useState("");
  const [agreed, setAgreed] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      const t = window.setTimeout(() => {
        setStep(0);
        setOrgLegalName("");
        setOrgUrl("");
        setOrgSize("");
        setOrgDescription("");
        setPhone("");
        setUseCase("");
        setAgreed(false);
      }, 200);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  const progressPct = step === 0 ? 38 : step === 1 ? 72 : 100;

  if (!dataset) return null;

  const canNextStep0 =
    orgLegalName.trim() &&
    orgUrl.trim() &&
    orgSize &&
    orgDescription.trim();
  const canSubmit = useCase.trim() && agreed;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(90dvh,720px)] overflow-y-auto sm:max-w-[480px]">
        <div className="h-1 w-full bg-zinc-800">
          <div
            className="h-full bg-accent-green transition-[width] duration-300 ease-in-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {step < 2 ? (
          <>
            <DialogHeader>
              <DialogTitle>Requesting access</DialogTitle>
              <DialogDescription>
                {step === 0
                  ? "Please provide the following information to verify your organization."
                  : "Share how you plan to use this dataset so we can review your request."}
              </DialogDescription>
            </DialogHeader>

            <div className="px-6 pb-2">
              <div className="mb-6 flex items-start gap-3 rounded-md border-app border-border-subtle bg-[#141414] p-4">
                <div
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white",
                    dataset.avatarClassName,
                  )}
                >
                  {dataset.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.04em] text-zinc-500">
                    {dataset.providerKey}
                  </p>
                  <p className="mt-0.5 text-base font-medium text-white">
                    {dataset.datasetName}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-zinc-500">
                  {dataset.license}
                </span>
              </div>

              {step === 0 ? (
                <div className="space-y-4">
                  <div className="stack-field">
                    <ModalFieldLabel>Organization name</ModalFieldLabel>
                    <input
                      className={modalInputClass()}
                      placeholder="Your organization"
                      value={orgLegalName}
                      onChange={(e) => setOrgLegalName(e.target.value)}
                      autoComplete="organization"
                    />
                  </div>
                  <div className="stack-field">
                    <ModalFieldLabel>Organization URL</ModalFieldLabel>
                    <div className="flex rounded-md border-app border-border-subtle bg-[#141414] focus-within:border-border-subtle focus-within:ring-1 focus-within:ring-border-subtle">
                      <span className="flex shrink-0 items-center border-app-r border-border-subtle px-3 text-xs text-zinc-500">
                        https://
                      </span>
                      <input
                        className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-base font-normal text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
                        placeholder="yoursite.com"
                        value={orgUrl}
                        onChange={(e) => setOrgUrl(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="stack-field">
                    <ModalFieldLabel>Org count</ModalFieldLabel>
                    <select
                      className={modalInputClass("cursor-pointer appearance-none bg-[#141414]")}
                      value={orgSize}
                      onChange={(e) => setOrgSize(e.target.value)}
                    >
                      {ORG_SIZE_OPTIONS.map((o) => (
                        <option key={o.value || "empty"} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="stack-field">
                    <ModalFieldLabel>Short description</ModalFieldLabel>
                    <textarea
                      className={modalInputClass("min-h-[100px] resize-y")}
                      placeholder="A brief description of your organization."
                      value={orgDescription}
                      onChange={(e) => setOrgDescription(e.target.value)}
                    />
                  </div>
                  <div className="stack-field">
                    <ModalFieldLabel>
                      Contact phone number (optional)
                    </ModalFieldLabel>
                    <input
                      className={modalInputClass()}
                      type="tel"
                      placeholder="+1 …"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="stack-field">
                    <ModalFieldLabel>How do you plan to use this?</ModalFieldLabel>
                    <textarea
                      className={modalInputClass("min-h-[120px] resize-y")}
                      placeholder="Describe how your org plans to use this dataset."
                      value={useCase}
                      onChange={(e) => setUseCase(e.target.value)}
                    />
                  </div>
                  <label className="flex cursor-pointer gap-3 pt-1">
                    <Checkbox
                      checked={agreed}
                      onCheckedChange={(v) => setAgreed(Boolean(v))}
                      className="mt-0.5"
                    />
                    <span className="text-base font-normal leading-snug text-zinc-400">
                      I agree on behalf of{" "}
                      <span className="text-zinc-200">{orgName}</span> to the{" "}
                      <span className="text-zinc-200">{dataset.datasetName}</span>{" "}
                      terms.
                    </span>
                  </label>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                className="text-zinc-300 hover:bg-zinc-800 hover:text-white"
                onClick={() =>
                  step === 0 ? onOpenChange(false) : setStep(0)
                }
              >
                {step === 0 ? "Cancel" : "Back"}
              </Button>
              <Button
                type="button"
                variant="primary"
                disabled={step === 0 ? !canNextStep0 : !canSubmit}
                onClick={() => {
                  if (step === 0) setStep(1);
                  else setStep(2);
                }}
              >
                {step === 0 ? "Next" : "Submit request"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Request submitted</DialogTitle>
              <DialogDescription>
                Your request was made. You&apos;ll receive an email on next
                steps.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center px-6 pb-2 pt-2">
              <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-accent-green/15 ring-4 ring-accent-green/10">
                <div className="flex size-10 items-center justify-center rounded-full bg-accent-green text-white">
                  <Check className="size-6 stroke-[2.5]" />
                </div>
              </div>
              <p className="max-w-sm text-center text-base font-normal leading-relaxed text-zinc-300">
                We&apos;ve received your access request for{" "}
                <span className="text-white">{dataset.datasetName}</span>.
                Watch your inbox for updates.
              </p>
            </div>
            <DialogFooter className="justify-center sm:justify-center">
              <Button
                type="button"
                variant="primary"
                className="min-w-[120px]"
                onClick={() => onOpenChange(false)}
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

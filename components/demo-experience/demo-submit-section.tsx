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
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageTitle } from "@/components/ui/page-title";
import { toastError, toastSuccess } from "@/lib/toast-variants";
import { cn } from "@/lib/utils";

const MAX_VIDEO_BYTES = 100 * 1024 * 1024;

/** Tileable grain — same pattern as demo cards; sits on dark CTA veil. */
const CTA_NOISE_DATA_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const CTA_DOT_PATTERN_CLASSES =
  "[background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:14px_14px]";

/** Static backdrop (~SpotlightBackground at rest): bitmap + radial edge falloff, no pointer tracking. */
function DemoCtaStaticBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-[url('/bitmap.svg')] bg-cover bg-center opacity-[0.48]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_78%_at_50%_40%,transparent_0%,rgb(9,9,11)_62%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_42%_at_50%_36%,rgba(255,255,255,0.07)_0%,transparent_58%)]"
        aria-hidden
      />
    </>
  );
}

function SubmitDemoDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [videoFile, setVideoFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  function reset() {
    setName("");
    setCompany("");
    setEmail("");
    setDescription("");
    setVideoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleOpenChange(next: boolean) {
    if (!next) reset();
    onOpenChange(next);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setVideoFile(f);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const tName = name.trim();
    const tCompany = company.trim();
    const tEmail = email.trim();
    const tDesc = description.trim();

    if (!tName) {
      toastError({ message: "Please enter your name." });
      return;
    }
    if (!tCompany) {
      toastError({ message: "Please enter your company." });
      return;
    }
    if (!tEmail) {
      toastError({ message: "Please enter your work email." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tEmail)) {
      toastError({ message: "Please enter a valid email address." });
      return;
    }
    if (!tDesc) {
      toastError({ message: "Please describe your tool or demo." });
      return;
    }
    if (videoFile && videoFile.size > MAX_VIDEO_BYTES) {
      toastError({
        message: `Video must be under ${MAX_VIDEO_BYTES / (1024 * 1024)}MB.`,
      });
      return;
    }

    toastSuccess({
      message:
        "Thanks — we will review submissions soon. This preview does not store your files yet.",
    });
    handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        variant="single"
        className="max-h-[min(90vh,44rem)] overflow-y-auto sm:max-w-lg"
      >
        <DialogHeader>
          <DialogTitle>Submit your demo</DialogTitle>
          <DialogDescription>
            Tell us about your Learning Commons integration. Optional screen
            recording helps us understand your flow (not uploaded in this MVP).
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="contents">
          <div className="space-y-4 px-9">
            <Field id="submit-demo-name" label="Name" className="min-w-0">
              <Input
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </Field>
            <Field id="submit-demo-company" label="Company" className="min-w-0">
              <Input
                name="organization"
                autoComplete="organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company or organization"
              />
            </Field>
            <Field
              id="submit-demo-email"
              label="Work email"
              className="min-w-0"
            >
              <Input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />
            </Field>
            <Field
              id="submit-demo-description"
              label="Tool description"
              className="min-w-0"
            >
              <Textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does your demo do, which APIs or patterns does it use, and who is it for?"
                className="min-h-[120px] resize-y"
              />
            </Field>
            <Field
              id="submit-demo-video"
              label="Demo video"
              description={`Optional. ${MAX_VIDEO_BYTES / (1024 * 1024)}MB max. Accepted for validation only—files are not sent to a server in this preview.`}
              optional
              className="min-w-0"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={onFileChange}
                className="block w-full cursor-pointer rounded-md border-app border-border-subtle bg-field-bg px-3 py-2 text-sm text-foreground file:mr-3 file:rounded-[4px] file:border-0 file:bg-nav-active file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-foreground hover:file:opacity-90"
              />
            </Field>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DemoSubmitSection() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <section
        className="relative left-1/2 z-0 mb-10 mt-12 w-[100vw] max-w-[100vw] -translate-x-1/2 scroll-mt-8"
        aria-labelledby="demo-submit-heading"
      >
        <div className="relative w-full overflow-hidden bg-zinc-950">
          <DemoCtaStaticBackdrop />
          <div className="relative flex min-h-[min(320px,50dvh)] flex-col justify-center overflow-hidden py-10 md:min-h-[340px] md:py-14">
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-repeat opacity-[0.28] mix-blend-soft-light"
              style={{
                backgroundImage: `url("${CTA_NOISE_DATA_URL}")`,
                backgroundSize: "128px 128px",
              }}
              aria-hidden
            />
            <div
              className={cn(
                "pointer-events-none absolute inset-y-0 right-0 z-[1] w-[min(45%,280px)] opacity-[0.35]",
                CTA_DOT_PATTERN_CLASSES,
              )}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-1/2 top-6 z-[1] size-2 -translate-x-1/2 rounded-full bg-blue-500"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-8 left-1/2 z-[1] size-3 -translate-x-1/2 rounded-full border border-white/50 bg-transparent"
              aria-hidden
            />

            <div className="relative z-10 flex w-full flex-col items-center px-6 text-center md:px-10">
              <PageTitle
                id="demo-submit-heading"
                variant="heroMono"
                as="h2"
                className="text-white"
              >
                Share your demo
              </PageTitle>
              <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 md:text-lg">
                Built something with Evaluators or Knowledge Graph? Submit your
                demo to share with other developers.
              </p>
              <Button
                type="button"
                variant="primary"
                className="mt-8 h-11 bg-white text-charcoal ring-offset-zinc-950 hover:opacity-90 focus-visible:ring-offset-2"
                onClick={() => setDialogOpen(true)}
              >
                Submit your demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      <SubmitDemoDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}

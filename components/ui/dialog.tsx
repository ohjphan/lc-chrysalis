"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-sidebar/60 backdrop-blur-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-black/40 dark:backdrop-blur-lg",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    showClose?: boolean;
    /**
     * **Progressive** — green top progress accent (multi-step flows, wizard CTAs).
     * **Single** — no accent bar (confirmations, simple one-screen tasks).
     * @default "progressive"
     */
    variant?: "progressive" | "single";
    /**
     * Fill ratio for the progressive top accent (0–100). Ignored when `variant` is `"single"`.
     * Use values under 100 for mid-flow steps; defaults to a full bar.
     * @default 100
     */
    accentProgress?: number;
  }
>(
  (
    {
      className,
      children,
      showClose = true,
      variant = "progressive",
      accentProgress = 100,
      ...props
    },
    ref,
  ) => {
    const showAccent = variant === "progressive";
    const accentPct = Math.min(
      100,
      Math.max(0, Number.isFinite(accentProgress) ? accentProgress : 100),
    );
    return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          // Platform-wide modal width; override with className when a dialog must differ.
          "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-0 rounded-lg border-app border-border-subtle bg-background p-0 text-foreground shadow-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 dark:bg-modal-bg dark:text-zinc-100 sm:max-w-xl",
          showAccent && "overflow-hidden",
          className,
        )}
        {...props}
      >
        {showAccent ? (
          accentPct >= 100 ? (
            <div
              className="h-1 w-full shrink-0 bg-accent-green"
              aria-hidden
            />
          ) : (
            <div
              className="flex h-1 w-full shrink-0 bg-border-subtle dark:bg-zinc-700"
              aria-hidden
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={accentPct}
            >
              <div
                className="h-full shrink-0 bg-accent-green transition-[width] duration-300 ease-out"
                style={{ width: `${accentPct}%` }}
              />
            </div>
          )
        ) : null}
        {showClose ? (
          <DialogPrimitive.Close
            className="absolute right-6 top-6 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none"
            aria-label="Close"
          >
            <X className="size-[20px] text-muted-foreground dark:text-zinc-500" />
          </DialogPrimitive.Close>
        ) : null}
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
  },
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        /* px-9 matches modal body sections (inputs, etc.) for left alignment */
        "flex flex-col gap-[12px] px-9 pb-4 pt-6 text-left",
        className,
      )}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col-reverse gap-3 px-9 py-7.5 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "font-page-h2 text-heading text-balance shrink-0 text-left pr-10 dark:text-foreground",
      className,
    )}
    {...props}
  >
    {children}
  </DialogPrimitive.Title>
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "pr-10 text-base font-normal leading-relaxed text-muted-foreground dark:text-zinc-400",
      className,
    )}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};

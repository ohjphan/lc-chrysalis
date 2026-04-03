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
      "fixed inset-0 z-50 bg-sidebar/88 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-black/55 dark:backdrop-blur-md",
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
     * Full-width green top bar (same fill as a completed progress segment).
     * Set `false` when the dialog renders its own progress bar (multi-step flows).
     * @default true
     */
    topAccent?: boolean;
  }
>(
  (
    {
      className,
      children,
      showClose = true,
      topAccent = true,
      ...props
    },
    ref,
  ) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          // Platform-wide modal width; override with className when a dialog must differ.
          "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-0 rounded-lg border-app border-border-subtle bg-background p-0 text-foreground shadow-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 dark:bg-modal-bg dark:text-zinc-100 sm:max-w-xl",
          topAccent && "overflow-hidden",
          className,
        )}
        {...props}
      >
        {topAccent ? (
          <div
            className="h-1 w-full shrink-0 bg-accent-green"
            aria-hidden
          />
        ) : null}
        {showClose ? (
          <DialogPrimitive.Close
            className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-border-subtle disabled:pointer-events-none"
            aria-label="Close"
          >
            <X className="size-[20px] text-muted-foreground dark:text-zinc-500" />
          </DialogPrimitive.Close>
        ) : null}
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
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
        "flex flex-col gap-1.5 px-9 pb-4 pt-6 text-left",
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
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "font-page-h2 text-heading dark:text-foreground pr-10",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

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

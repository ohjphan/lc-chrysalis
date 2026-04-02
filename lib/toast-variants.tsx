"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, Check, Info, X } from "lucide-react";
import { toast } from "sonner";

const DEFAULT_DURATION = 6000;

/** Filled circle + Lucide glyph; grid + block svg avoids baseline / Sonner flex-start drift. */
const badgeClass =
  "grid size-[22px] shrink-0 place-items-center rounded-full leading-none";

const glyphClass = "size-[14px] shrink-0 text-white block";

export type ToastLeadingVariant = "neutral" | "success" | "warning" | "error";

/** Same leading badge as Sonner toasts; safe to use in docs / trigger buttons. */
export function ToastLeadingIcon({ variant }: { variant: ToastLeadingVariant }) {
  switch (variant) {
    case "neutral":
      return (
        <span className={cn(badgeClass, "bg-[#CCC9C6]")}>
          <Info
            className="size-[14px] shrink-0 text-[#242423] block"
            strokeWidth={2.5}
            aria-hidden
          />
        </span>
      );
    case "success":
      return (
        <span className={cn(badgeClass, "bg-accent-green")}>
          <Check className={glyphClass} strokeWidth={2.5} aria-hidden />
        </span>
      );
    case "warning":
      return (
        <span className={cn(badgeClass, "bg-accent-yellow")}>
          <AlertTriangle
            className="size-[14px] shrink-0 text-[#242423] block"
            strokeWidth={2.5}
            aria-hidden
          />
        </span>
      );
    case "error":
      return (
        <span className={cn(badgeClass, "bg-[#FF554C]")}>
          <X className={glyphClass} strokeWidth={2.5} aria-hidden />
        </span>
      );
  }
}

function neutralIcon() {
  return <ToastLeadingIcon variant="neutral" />;
}

function successIcon() {
  return <ToastLeadingIcon variant="success" />;
}

function warningIcon() {
  return <ToastLeadingIcon variant="warning" />;
}

function errorIcon() {
  return <ToastLeadingIcon variant="error" />;
}

type ToastVariantOpts = {
  message?: string;
  description?: string;
  duration?: number;
};

/** Default title (and optional description) per variant — single source for `toast*()` and static previews. */
export const TOAST_VARIANT_DEFAULT_COPY: Record<
  ToastLeadingVariant,
  { message: string; description?: string }
> = {
  neutral: { message: "Neutral — general updates and context." },
  success: { message: "Success — your changes were saved." },
  warning: { message: "Warning — review before you continue." },
  error: { message: "Error — something went wrong. Try again." },
};

/** Neutral — filled #CCC9C6 circle + #242423 info (general / informational). */
export function toastNeutral({
  message = TOAST_VARIANT_DEFAULT_COPY.neutral.message,
  description = TOAST_VARIANT_DEFAULT_COPY.neutral.description,
  duration = DEFAULT_DURATION,
}: ToastVariantOpts = {}) {
  toast(message, {
    description,
    icon: neutralIcon(),
    duration,
  });
}

/** Success — filled #1DB470 (accent) circle + white check. */
export function toastSuccess({
  message = TOAST_VARIANT_DEFAULT_COPY.success.message,
  description = TOAST_VARIANT_DEFAULT_COPY.success.description,
  duration = DEFAULT_DURATION,
}: ToastVariantOpts = {}) {
  toast(message, {
    description,
    icon: successIcon(),
    duration,
  });
}

/** Warning — filled accent yellow (#FDD151) circle + #242423 triangle (dark glyph for contrast). */
export function toastWarning({
  message = TOAST_VARIANT_DEFAULT_COPY.warning.message,
  description = TOAST_VARIANT_DEFAULT_COPY.warning.description,
  duration = DEFAULT_DURATION,
}: ToastVariantOpts = {}) {
  toast(message, {
    description,
    icon: warningIcon(),
    duration,
  });
}

/** Error — filled #FF554C circle + white X. */
export function toastError({
  message = TOAST_VARIANT_DEFAULT_COPY.error.message,
  description = TOAST_VARIANT_DEFAULT_COPY.error.description,
  duration = DEFAULT_DURATION,
}: ToastVariantOpts = {}) {
  toast(message, {
    description,
    icon: errorIcon(),
    duration,
  });
}

"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, Check, Info, X } from "lucide-react";
import { toast } from "sonner";

const DEFAULT_DURATION = 6000;
const LIGHT_TOAST_CLASS = "toast-light";

/** Filled circle + Lucide glyph; grid + block svg avoids baseline / Sonner flex-start drift. */
const badgeClass =
  "grid size-[22px] shrink-0 place-items-center rounded-full leading-none";

const glyphClass = "size-[14px] shrink-0 text-white block";

export type ToastVariant =
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "lightNeutral"
  | "lightSuccess"
  | "lightWarning"
  | "lightError";

export type ToastLeadingVariant = "neutral" | "success" | "warning" | "error";

export function toastUsesLightSurface(variant: ToastVariant) {
  return variant.startsWith("light");
}

/** Same leading badge as Sonner toasts; safe to use in docs / trigger buttons. */
export function ToastLeadingIcon({ variant }: { variant: ToastLeadingVariant }) {
  switch (variant) {
    case "neutral":
      return (
        <span className={cn(badgeClass, "bg-[#CCC9C6]")}>
          <Info
            className="size-[14px] shrink-0 text-[#55554E] block"
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
            className="size-[14px] shrink-0 text-charcoal block"
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

function iconForVariant(variant: ToastVariant) {
  switch (variant) {
    case "neutral":
    case "lightNeutral":
      return neutralIcon();
    case "success":
    case "lightSuccess":
      return successIcon();
    case "warning":
    case "lightWarning":
      return warningIcon();
    case "error":
    case "lightError":
      return errorIcon();
  }
}

type ToastVariantOpts = {
  message?: string;
  description?: string;
  duration?: number;
};

type ToastActionOpts = ToastVariantOpts & {
  actionLabel?: string;
};

/** Default title (and optional description) per variant — single source for `toast*()` and static previews. */
export const TOAST_VARIANT_DEFAULT_COPY: Record<
  ToastVariant,
  { message: string; description?: string }
> = {
  neutral: { message: "Neutral — general updates and context." },
  success: { message: "Success — your changes were saved." },
  warning: { message: "Warning — review before you continue." },
  error: { message: "Error — something went wrong. Try again." },
  lightNeutral: { message: "Light neutral — general updates and context." },
  lightSuccess: { message: "Light success — your changes were saved." },
  lightWarning: { message: "Light warning — review before you continue." },
  lightError: { message: "Light error — something went wrong. Try again." },
};

/** Neutral — filled border-subtle + charcoal info (general / informational). */
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

/** Neutral with action — informational toast with a right-side undo action. */
export function toastNeutralUndo({
  message = "Neutral — general updates and context.",
  description,
  duration = DEFAULT_DURATION,
  actionLabel = "Undo",
}: ToastActionOpts = {}) {
  toast(message, {
    description,
    icon: neutralIcon(),
    duration,
    closeButton: false,
    action: {
      label: actionLabel,
      onClick: () => {},
    },
  });
}

/** Light neutral — same informational icon, but rendered on a white toast surface. */
export function toastLight({
  message = TOAST_VARIANT_DEFAULT_COPY.lightNeutral.message,
  description = TOAST_VARIANT_DEFAULT_COPY.lightNeutral.description,
  duration = DEFAULT_DURATION,
}: ToastVariantOpts = {}) {
  toast(message, {
    description,
    icon: iconForVariant("lightNeutral"),
    duration,
    className: LIGHT_TOAST_CLASS,
  });
}

/** Light neutral with action — white-surface informational toast with a right-side undo action. */
export function toastLightUndo({
  message = "Light neutral — general updates and context.",
  description,
  duration = DEFAULT_DURATION,
  actionLabel = "Undo",
}: ToastActionOpts = {}) {
  toast(message, {
    description,
    icon: iconForVariant("lightNeutral"),
    duration,
    className: LIGHT_TOAST_CLASS,
    closeButton: false,
    action: {
      label: actionLabel,
      onClick: () => {},
    },
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

/** Light success — accent-green icon on a white toast surface. */
export function toastLightSuccess({
  message = TOAST_VARIANT_DEFAULT_COPY.lightSuccess.message,
  description = TOAST_VARIANT_DEFAULT_COPY.lightSuccess.description,
  duration = DEFAULT_DURATION,
}: ToastVariantOpts = {}) {
  toast(message, {
    description,
    icon: iconForVariant("lightSuccess"),
    duration,
    className: LIGHT_TOAST_CLASS,
  });
}

/** Warning — filled accent yellow (#FDD151) circle + charcoal triangle (dark glyph for contrast). */
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

/** Light warning — accent-yellow icon on a white toast surface. */
export function toastLightWarning({
  message = TOAST_VARIANT_DEFAULT_COPY.lightWarning.message,
  description = TOAST_VARIANT_DEFAULT_COPY.lightWarning.description,
  duration = DEFAULT_DURATION,
}: ToastVariantOpts = {}) {
  toast(message, {
    description,
    icon: iconForVariant("lightWarning"),
    duration,
    className: LIGHT_TOAST_CLASS,
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

/** Light error — red X icon on a white toast surface. */
export function toastLightError({
  message = TOAST_VARIANT_DEFAULT_COPY.lightError.message,
  description = TOAST_VARIANT_DEFAULT_COPY.lightError.description,
  duration = DEFAULT_DURATION,
}: ToastVariantOpts = {}) {
  toast(message, {
    description,
    icon: iconForVariant("lightError"),
    duration,
    className: LIGHT_TOAST_CLASS,
  });
}

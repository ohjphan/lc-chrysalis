"use client";

import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  XCircle,
} from "@/lib/lucide-svg";
import { toast } from "sonner";

const DEFAULT_DURATION = 6000;
const LIGHT_TOAST_CLASS = "toast-light";

const toastIconClass = "size-[22px] shrink-0 block";

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

/** Leading icons only (no badge); hues match callouts. Pass `light` for white-surface toasts. */
export function ToastLeadingIcon({
  variant,
  light = false,
}: {
  variant: ToastLeadingVariant;
  light?: boolean;
}) {
  const stroke = 2.5;
  switch (variant) {
    case "neutral":
      return (
        <Info
          className={cn(
            toastIconClass,
            light ? "text-[#55554E]" : "text-[#a3a3a3]",
          )}
          strokeWidth={stroke}
          aria-hidden
        />
      );
    case "success":
      return (
        <CheckCircle2
          className={cn(toastIconClass, "text-accent-green")}
          strokeWidth={stroke}
          aria-hidden
        />
      );
    case "warning":
      return (
        <XCircle
          className={cn(
            toastIconClass,
            light ? "text-charcoal" : "text-[#fdd151]",
          )}
          strokeWidth={stroke}
          aria-hidden
        />
      );
    case "error":
      return (
        <AlertCircle
          className={cn(toastIconClass, "text-[#FF554C]")}
          strokeWidth={stroke}
          aria-hidden
        />
      );
  }
}

const VARIANT_TO_LEADING: Record<ToastVariant, ToastLeadingVariant> = {
  neutral: "neutral",
  lightNeutral: "neutral",
  success: "success",
  lightSuccess: "success",
  warning: "warning",
  lightWarning: "warning",
  error: "error",
  lightError: "error",
};

function iconForVariant(variant: ToastVariant) {
  return (
    <ToastLeadingIcon
      variant={VARIANT_TO_LEADING[variant]}
      light={toastUsesLightSurface(variant)}
    />
  );
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

/** Neutral — Info icon (no badge). */
export function toastNeutral({
  message = TOAST_VARIANT_DEFAULT_COPY.neutral.message,
  description = TOAST_VARIANT_DEFAULT_COPY.neutral.description,
  duration = DEFAULT_DURATION,
}: ToastVariantOpts = {}) {
  toast(message, {
    description,
    icon: iconForVariant("neutral"),
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
    icon: iconForVariant("neutral"),
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

/** Success — CheckCircle2 (Lucide circle + check). */
export function toastSuccess({
  message = TOAST_VARIANT_DEFAULT_COPY.success.message,
  description = TOAST_VARIANT_DEFAULT_COPY.success.description,
  duration = DEFAULT_DURATION,
}: ToastVariantOpts = {}) {
  toast(message, {
    description,
    icon: iconForVariant("success"),
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

/** Warning — XCircle (cancel-style). */
export function toastWarning({
  message = TOAST_VARIANT_DEFAULT_COPY.warning.message,
  description = TOAST_VARIANT_DEFAULT_COPY.warning.description,
  duration = DEFAULT_DURATION,
}: ToastVariantOpts = {}) {
  toast(message, {
    description,
    icon: iconForVariant("warning"),
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

/** Error — AlertCircle. */
export function toastError({
  message = TOAST_VARIANT_DEFAULT_COPY.error.message,
  description = TOAST_VARIANT_DEFAULT_COPY.error.description,
  duration = DEFAULT_DURATION,
}: ToastVariantOpts = {}) {
  toast(message, {
    description,
    icon: iconForVariant("error"),
    duration,
  });
}

/** Light error — AlertCircle on a white toast surface. */
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

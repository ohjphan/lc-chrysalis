"use client";

import * as React from "react";
import { X } from "lucide-react";
import { toastCloseButtonClass } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import {
  TOAST_VARIANT_DEFAULT_COPY,
  ToastLeadingIcon,
  toastUsesLightSurface,
  type ToastVariant,
} from "@/lib/toast-variants";

const ariaLabels: Record<ToastVariant, string> = {
  neutral: "Show live neutral toast",
  success: "Show live success toast",
  warning: "Show live warning toast",
  error: "Show live error toast",
  lightNeutral: "Show live light neutral toast",
  lightSuccess: "Show live light success toast",
  lightWarning: "Show live light warning toast",
  lightError: "Show live light error toast",
};

function leadingIconVariant(variant: ToastVariant) {
  switch (variant) {
    case "neutral":
    case "lightNeutral":
      return "neutral";
    case "success":
    case "lightSuccess":
      return "success";
    case "warning":
    case "lightWarning":
      return "warning";
    case "error":
    case "lightError":
      return "error";
  }
}

export function ToastVariantPreview({
  variant,
  onShow,
  actionLabel,
}: {
  variant: ToastVariant;
  onShow: () => void;
  actionLabel?: string;
}) {
  const { message, description } = TOAST_VARIANT_DEFAULT_COPY[variant];

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onShow();
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={ariaLabels[variant]}
      data-components-toast-preview=""
      className={cn(
        "max-w-full cursor-pointer rounded-[4px] outline-none",
        "transition-[box-shadow,opacity] focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
      onClick={onShow}
      onKeyDown={onKeyDown}
    >
      <div
        data-sonner-toast=""
        data-styled="true"
        data-mounted="true"
        data-visible="true"
        data-expanded="true"
        data-front="true"
        data-y-position="bottom"
        data-x-position="right"
        data-type="default"
        className={cn(
          "w-full max-w-full",
          toastUsesLightSurface(variant) && "toast-light",
        )}
      >
        {actionLabel ? null : (
          <span
            data-close-button=""
            aria-hidden
            className={toastCloseButtonClass}
          >
            <X className="size-[20px]" aria-hidden />
          </span>
        )}
        <div data-icon="">
          <ToastLeadingIcon
            variant={leadingIconVariant(variant)}
            light={toastUsesLightSurface(variant)}
          />
        </div>
        <div data-content="">
          <div data-title="">{message}</div>
          {description != null && description !== "" ? (
            <div data-description="">{description}</div>
          ) : null}
        </div>
        {actionLabel ? <button data-button="">{actionLabel}</button> : null}
      </div>
    </div>
  );
}

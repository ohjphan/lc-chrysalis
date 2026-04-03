"use client";

import { ToastVariantPreview } from "@/components/design-system/toast-variant-preview";
import {
  toastError,
  toastLight,
  toastLightError,
  toastLightSuccess,
  toastLightWarning,
  toastNeutral,
  toastSuccess,
  toastWarning,
} from "@/lib/toast-variants";

export function ToastsView() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">Toasts</h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Sonner toasts with shared leading icons. Use{" "}
          <code className="font-mono text-sm text-foreground">toastNeutral</code>,{" "}
          <code className="font-mono text-sm text-foreground">toastLight</code>,{" "}
          <code className="font-mono text-sm text-foreground">
            toastLightSuccess
          </code>
          ,{" "}
          <code className="font-mono text-sm text-foreground">
            toastLightWarning
          </code>
          , and{" "}
          <code className="font-mono text-sm text-foreground">
            toastLightError
          </code>
          , plus{" "}
          <code className="font-mono text-sm text-foreground">toastSuccess</code>,{" "}
          <code className="font-mono text-sm text-foreground">toastWarning</code>,
          and{" "}
          <code className="font-mono text-sm text-foreground">toastError</code> from{" "}
          <code className="font-mono text-sm text-foreground">
            lib/toast-variants.tsx
          </code>
          .
        </p>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Each row below matches the live toast. Click or press Enter / Space to
          show it: it animates in at the{" "}
          <span className="text-foreground">bottom-right</span> of the viewport
          (Sonner).
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-[2px]">
          <h3 className="font-page-h3 text-heading dark:text-foreground">
            Option 1: Dark
          </h3>
          <p className="text-base font-normal text-muted-foreground">
            Default toast surface used across the product today.
          </p>
        </div>
        <div className="flex w-full max-w-[356px] flex-col gap-3">
          <ToastVariantPreview variant="neutral" onShow={() => toastNeutral()} />
          <ToastVariantPreview variant="success" onShow={() => toastSuccess()} />
          <ToastVariantPreview variant="warning" onShow={() => toastWarning()} />
          <ToastVariantPreview variant="error" onShow={() => toastError()} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-[2px]">
          <h3 className="font-page-h3 text-heading dark:text-foreground">
            Option 2: Light
          </h3>
          <p className="text-base font-normal text-muted-foreground">
            White-surface toasts for lower-contrast or lighter notification
            moments.
          </p>
        </div>
        <div className="flex w-full max-w-[356px] flex-col gap-3">
          <ToastVariantPreview variant="lightNeutral" onShow={() => toastLight()} />
          <ToastVariantPreview
            variant="lightSuccess"
            onShow={() => toastLightSuccess()}
          />
          <ToastVariantPreview
            variant="lightWarning"
            onShow={() => toastLightWarning()}
          />
          <ToastVariantPreview
            variant="lightError"
            onShow={() => toastLightError()}
          />
        </div>
      </section>
    </div>
  );
}

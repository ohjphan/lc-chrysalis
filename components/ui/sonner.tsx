"use client";

import { X } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { cn } from "@/lib/utils";

/** Matches `DialogPrimitive.Close` + X in [components/ui/dialog.tsx](components/ui/dialog.tsx). */
export const toastCloseButtonClass = cn(
  "!h-auto !w-auto rounded-sm border-0 bg-transparent p-0 shadow-none",
  "text-zinc-500 opacity-70 ring-offset-charcoal transition-opacity hover:opacity-100",
  "focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2",
);

export function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      position="bottom-right"
      closeButton
      icons={{
        close: <X className="size-[20px]" aria-hidden />,
      }}
      toastOptions={{
        closeButton: true,
        closeButtonAriaLabel: "Dismiss notification",
        classNames: {
          closeButton: toastCloseButtonClass,
        },
      }}
    />
  );
}

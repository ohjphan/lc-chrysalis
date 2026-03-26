import { cn } from "@/lib/utils";

/**
 * Table shells: use `border-app-t` (not `border-app-y`) on the scroll wrapper so
 * the last row’s `border-app-b` isn’t doubled with an outer bottom border.
 */

export type TableHeadStickyOptions = {
  /** CSS custom property for `top` (e.g. `--datasets-sticky-controls-height`). */
  stickyTopVar?: string;
  /** Replaces default `bg-sidebar` (e.g. frosted header). */
  surfaceClass?: string;
  /** z-index for stacking under/over other sticky layers. */
  zClass?: string;
};

/** Sticky `<th>` — small caps, JetBrains mono, matches reference tables */
export function tableHeadStickyCellClasses(
  extra?: string,
  options?: TableHeadStickyOptions,
) {
  const topClass = options?.stickyTopVar
    ? `top-[length:var(${options.stickyTopVar},0px)]`
    : "top-0";
  const surface = options?.surfaceClass ?? "bg-sidebar";
  const z = options?.zClass ?? "z-10";
  return cn(
    "sticky border-app-b border-border-subtle px-4 py-4 text-left font-nav-eyebrow text-[11px] font-medium uppercase tracking-[0.04em] text-muted-foreground",
    topClass,
    z,
    surface,
    extra,
  );
}

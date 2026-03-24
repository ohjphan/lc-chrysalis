import { cn } from "@/lib/utils";

/** Sticky `<th>` — small caps, JetBrains mono, matches reference tables */
export function tableHeadStickyCellClasses(extra?: string) {
  return cn(
    "sticky top-0 z-10 border-app-b border-border-subtle bg-sidebar px-4 py-4 text-left font-nav-eyebrow text-[11px] font-medium uppercase tracking-[0.04em] text-muted-foreground",
    extra,
  );
}

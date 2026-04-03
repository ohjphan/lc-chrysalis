"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  colorSwatchEntryKey,
  type ColorSwatchEntry,
} from "@/components/design-system/color-swatch-entry";

export type { ColorSwatchEntry };
export { colorSwatchEntryKey };

function entryCodeLine(e: ColorSwatchEntry): string {
  return "varName" in e ? `var(${e.varName})` : e.reference;
}

function cssColorToHex(css: string): string {
  const t = css.trim();
  if (!t || t === "transparent" || t === "rgba(0, 0, 0, 0)") return "—";
  const m = t.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/,
  );
  if (!m) return "—";
  const r = Number(m[1]);
  const g = Number(m[2]);
  const b = Number(m[3]);
  const a = m[4] !== undefined ? Number(m[4]) : 1;
  const h = (n: number) =>
    Math.min(255, Math.max(0, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  if (a < 1) {
    const alpha = Math.round(a * 255)
      .toString(16)
      .padStart(2, "0");
    return `#${h(r)}${h(g)}${h(b)}${alpha}`.toUpperCase();
  }
  return `#${h(r)}${h(g)}${h(b)}`.toUpperCase();
}

export function ColorSwatchCard({
  title,
  entries,
  footnote,
  swatchOnly = false,
}: {
  title: string;
  entries: ColorSwatchEntry[];
  footnote?: string;
  /**
   * When true: swatch + title + one monospace line per entry (reference / var) — no “Fill”-style
   * labels and no second hex line from computed styles (avoids duplicate hex rows).
   */
  swatchOnly?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [hex, setHex] = React.useState("");
  const swatchClass = entries[0]?.className ?? "";

  React.useLayoutEffect(() => {
    if (swatchOnly) return;
    const el = ref.current;
    if (!el) return;
    const bg = getComputedStyle(el).backgroundColor;
    setHex(cssColorToHex(bg));
  }, [resolvedTheme, swatchClass, swatchOnly]);

  const first = entries[0];
  const swatchUses =
    first && ("varName" in first ? first.varName : first.reference);

  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-lg border-app border-border-subtle bg-background">
      <div
        ref={ref}
        className={cn("h-14 w-full border-app-b border-border-subtle", swatchClass)}
        aria-hidden
      />
      <div className="px-3 pb-3">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {swatchOnly ? (
          <div className="mt-2 space-y-1">
            {entries.map((e) => (
              <p
                key={colorSwatchEntryKey(e)}
                className="font-mono text-xs tabular-nums text-muted-foreground"
              >
                {entryCodeLine(e)}
              </p>
            ))}
          </div>
        ) : (
          <>
            <div className="mt-2 space-y-2">
              {entries.map((e) => (
                <div key={colorSwatchEntryKey(e)}>
                  <p className="text-xs font-medium text-foreground">{e.label}</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {entryCodeLine(e)}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-2 font-mono text-xs tabular-nums text-foreground">
              {hex || "—"}
            </p>
            {entries.length > 1 ? (
              <p className="mt-1 text-xs text-muted-foreground">
                Swatch uses{" "}
                <code className="font-mono text-[11px]">{swatchUses}</code>.
              </p>
            ) : null}
          </>
        )}
        {footnote ? (
          <p className="mt-2 text-xs leading-snug text-muted-foreground">
            {footnote}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export type ColorSwatchEntry =
  | { label: string; className: string; varName: string }
  | { label: string; className: string; reference: string };

export function colorSwatchEntryKey(e: ColorSwatchEntry): string {
  return "varName" in e ? e.varName : e.reference;
}

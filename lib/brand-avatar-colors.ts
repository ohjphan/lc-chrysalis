/**
 * Solid fills for initials avatars (datasets, team members, etc.).
 * Order matches the product brand palette.
 */
const BRAND_AVATAR_SWATCHES = [
  {
    label: "Green",
    hex: "#1DB470",
    bg: "bg-[#1DB470]",
    text: "text-white",
  },
  {
    label: "Yellow",
    hex: "#FFFA55",
    bg: "bg-[#FFFA55]",
    text: "text-charcoal",
  },
  {
    label: "Red",
    hex: "#FF554C",
    bg: "bg-[#FF554C]",
    text: "text-white",
  },
  {
    label: "Light blue",
    hex: "#98CDFF",
    bg: "bg-[#98CDFF]",
    text: "text-charcoal",
  },
  {
    label: "Dark blue",
    hex: "#5C76F3",
    bg: "bg-[#5C76F3]",
    text: "text-white",
  },
  {
    label: "Orange",
    hex: "#F97248",
    bg: "bg-[#F97248]",
    text: "text-white",
  },
  {
    label: "Pink",
    hex: "#FCBDBD",
    bg: "bg-[#FCBDBD]",
    text: "text-charcoal",
  },
  {
    label: "Berry",
    hex: "#CF92EC",
    bg: "bg-[#CF92EC]",
    text: "text-white",
  },
  {
    label: "Dark purple",
    hex: "#8A80FF",
    bg: "bg-[#8A80FF]",
    text: "text-white",
  },
  {
    label: "Light purple",
    hex: "#B7B5FF",
    bg: "bg-[#B7B5FF]",
    text: "text-charcoal",
  },
  {
    label: "Dark green",
    hex: "#125B3A",
    bg: "bg-[#125B3A]",
    text: "text-white",
  },
] as const;

/** Solid fills for morphing / accent shapes; excludes primary LC green (`#1DB470`). */
export const BRAND_SECONDARY_PALETTE_HEX: readonly string[] =
  BRAND_AVATAR_SWATCHES.filter((s) => s.hex !== "#1DB470").map((s) => s.hex);

/**
 * Tailwind classes (literals for JIT). Same order as `BRAND_AVATAR_SWATCHES`.
 * Each swatch: 20% fill + charcoal label at 80% opacity (gray `ColorBadge` is separate).
 */
const BRAND_AVATAR_BADGE_FILL_TEXT = [
  "bg-[rgba(29,180,112,0.2)] text-charcoal/80",
  "bg-[rgba(255,250,85,0.2)] text-charcoal/80",
  "bg-[rgba(255,85,76,0.2)] text-charcoal/80",
  "bg-[rgba(152,205,255,0.2)] text-charcoal/80",
  "bg-[rgba(92,118,243,0.2)] text-charcoal/80",
  "bg-[rgba(249,114,72,0.2)] text-charcoal/80",
  "bg-[rgba(252,189,189,0.2)] text-charcoal/80",
  "bg-[rgba(207,146,236,0.2)] text-charcoal/80",
  "bg-[rgba(138,128,255,0.2)] text-charcoal/80",
  "bg-[rgba(183,181,255,0.2)] text-charcoal/80",
  "bg-[rgba(18,91,58,0.2)] text-charcoal/80",
] as const;

/** Components gallery / docs: secondary palette badges (see `BRAND_AVATAR_BADGE_FILL_TEXT`). */
export const BRAND_AVATAR_BADGES_FOR_DOCS = BRAND_AVATAR_SWATCHES.map(
  (s, i) => ({
    label: s.label,
    hex: s.hex,
    badgeClass: BRAND_AVATAR_BADGE_FILL_TEXT[i]!,
  }),
);

/** For Foundations and docs; same order as runtime avatar assignment. */
export const BRAND_AVATAR_PALETTE_FOR_DOCS: readonly {
  label: string;
  hex: string;
  bgClass: string;
}[] = BRAND_AVATAR_SWATCHES.map((s) => ({
  label: s.label,
  hex: s.hex,
  bgClass: s.bg,
}));

export const BRAND_AVATAR_BG_CLASSES = BRAND_AVATAR_SWATCHES.map((s) => s.bg);

function hashStringToIndex(id: string, modulo: number): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (Math.imul(31, h) + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % modulo;
}

/** Stable index into `BRAND_AVATAR_SWATCHES` (0–11); same input as `brandAvatarClassForId`. */
export function brandAvatarSwatchIndexForId(id: string): number {
  return hashStringToIndex(id, BRAND_AVATAR_SWATCHES.length);
}

export function brandAvatarHexForId(id: string): string {
  return BRAND_AVATAR_SWATCHES[brandAvatarSwatchIndexForId(id)].hex;
}

/** Another palette hex for multi-stop meshes (offset in swatch ring, same base index as avatar). */
export function brandAvatarSwatchHexAt(id: string, ringOffset: number): string {
  const i = brandAvatarSwatchIndexForId(id);
  const n = BRAND_AVATAR_SWATCHES.length;
  const j = ((i + ringOffset) % n + n) % n;
  return BRAND_AVATAR_SWATCHES[j].hex;
}

export function brandAvatarClassForId(id: string): string {
  return BRAND_AVATAR_SWATCHES[brandAvatarSwatchIndexForId(id)].bg;
}

export function brandAvatarTextClassForId(id: string): string {
  return BRAND_AVATAR_SWATCHES[brandAvatarSwatchIndexForId(id)].text;
}

export function brandAvatarClassesForId(id: string): {
  bgClass: string;
  textClass: string;
} {
  const i = brandAvatarSwatchIndexForId(id);
  const s = BRAND_AVATAR_SWATCHES[i];
  return { bgClass: s.bg, textClass: s.text };
}

const BERRY_SWATCH_INDEX = 7;
const RED_SWATCH_INDEX = 2;
const ORANGE_SWATCH_INDEX = 5;

/**
 * Opaque /demos project tiles: Red (#FF554C) maps to Berry (#CF92EC).
 * Intervention / early-warning is pinned to Orange (#F97248).
 */
export function brandAvatarClassesForDemosCard(slug: string): {
  bgClass: string;
  textClass: string;
} {
  if (slug === "intervention-early-warning-graph") {
    const s = BRAND_AVATAR_SWATCHES[ORANGE_SWATCH_INDEX];
    return { bgClass: s.bg, textClass: s.text };
  }
  let i = brandAvatarSwatchIndexForId(slug);
  if (i === RED_SWATCH_INDEX) {
    i = BERRY_SWATCH_INDEX;
  }
  const s = BRAND_AVATAR_SWATCHES[i];
  return { bgClass: s.bg, textClass: s.text };
}

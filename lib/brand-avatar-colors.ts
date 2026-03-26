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
    text: "text-[#242423]",
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
    text: "text-[#242423]",
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
    text: "text-[#242423]",
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
    text: "text-[#242423]",
  },
  {
    label: "Dark green",
    hex: "#125B3A",
    bg: "bg-[#125B3A]",
    text: "text-white",
  },
] as const;

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

export function brandAvatarClassForId(id: string): string {
  return BRAND_AVATAR_SWATCHES[
    hashStringToIndex(id, BRAND_AVATAR_SWATCHES.length)
  ].bg;
}

export function brandAvatarTextClassForId(id: string): string {
  return BRAND_AVATAR_SWATCHES[
    hashStringToIndex(id, BRAND_AVATAR_SWATCHES.length)
  ].text;
}

export function brandAvatarClassesForId(id: string): {
  bgClass: string;
  textClass: string;
} {
  const i = hashStringToIndex(id, BRAND_AVATAR_SWATCHES.length);
  const s = BRAND_AVATAR_SWATCHES[i];
  return { bgClass: s.bg, textClass: s.text };
}

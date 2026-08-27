/** Subject taxonomy — shared with main Datasets catalog and dataset-4 exploration. */
export type SubjectSlug =
  | "math"
  | "english"
  | "science"
  | "social-studies"
  | "cross-curricular";

export const SUBJECT_NAV_ORDER: readonly SubjectSlug[] = [
  "math",
  "english",
  "science",
  "social-studies",
  "cross-curricular",
] as const;

export const SUBJECT_NAV: readonly {
  slug: SubjectSlug;
  label: string;
  description: string;
}[] = [
  {
    slug: "math",
    label: "Mathematics",
    description: "Math curricula, standards, and learning component graphs.",
  },
  {
    slug: "english",
    label: "English Language Arts",
    description: "Literacy, ELA standards, and evaluator packs.",
  },
  {
    slug: "science",
    label: "Science",
    description: "NGSS-aligned curriculum and science standards.",
  },
  {
    slug: "social-studies",
    label: "Social Studies",
    description: "Civics, history, geography, and economics standards.",
  },
  {
    slug: "cross-curricular",
    label: "Cross-curricular",
    description: "Bundles spanning multiple subject areas.",
  },
] as const;

export function subjectLabel(slug: SubjectSlug): string {
  const row = SUBJECT_NAV.find((n) => n.slug === slug);
  return row?.label ?? slug;
}

export function isSubjectSlug(s: string): s is SubjectSlug {
  return (SUBJECT_NAV_ORDER as readonly string[]).includes(s);
}

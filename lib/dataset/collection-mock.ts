import { SUPPORT_DOCS_URL } from "@/lib/support-links";
import type { SubjectSlug } from "@/lib/dataset/subject-slugs";

/** Product surface for a dataset collection (exploration / marketing copy). */
export type DatasetProduct = "knowledge-graph" | "evaluator";

/** A single dataset inside a collection (split / detail main column). */
export type CollectionChildDataset = {
  id: string;
  /** Primary subject for dataset-4 exploration grouping. */
  subject: SubjectSlug;
  title: string;
  description: string;
  gated?: boolean;
  /** `get_data` → Get data + format menu; `request` → Request CTA. */
  action: "get_data" | "request";
  /** Shown in Get data dropdown; default JSONL + CSV if omitted. */
  downloadFormats?: readonly string[];
};

export type RelatedDatasetCard = {
  /** Stable id for avatar swatch (`brandAvatarClassesForId`). */
  refId: string;
  providerName: string;
  providerInitials: string;
  title: string;
};

/** Right-rail metadata (split view), aligned with collection detail spec. */
export type CollectionSidebarMeta = {
  categories: readonly string[];
  providerAbout: string;
  licenseNote: string;
  formats: readonly string[];
  documentationLabel: string;
  documentationHref: string;
};

export type DatasetCollectionDetail = {
  childDatasets: readonly CollectionChildDataset[];
  relatedDatasets: readonly RelatedDatasetCard[];
  sidebar: CollectionSidebarMeta;
};

export type DatasetCollection = {
  id: string;
  collectionName: string;
  providerName: string;
  /** Short label for modals and compact UI (e.g. 1EDTECH, IM). */
  providerKey: string;
  providerInitials: string;
  gradeRange: string;
  datasetCount: number;
  product: DatasetProduct;
  description: string;
  gated?: boolean;
  /** Shown in request-access flows; defaults derived in helpers if omitted. */
  license?: string;
  /** Rich split-view body + sidebar; when absent, UI synthesizes minimal placeholders. */
  detail?: DatasetCollectionDetail;
};

export const DATASET_COLLECTION_MOCK: readonly DatasetCollection[] = [
  {
    id: "coll-1edtech-academic-standards",
    collectionName: "Academic Standards",
    providerName: "1EdTech",
    providerKey: "1EDTECH",
    providerInitials: "1E",
    gradeRange: "K–12",
    datasetCount: 5,
    product: "knowledge-graph",
    description:
      "K-12 academic standards across core subjects including mathematics, science, English Language Arts, and social studies.",
    gated: false,
    license: "CC BY 4.0",
    detail: {
      childDatasets: [
        {
          id: "math-std",
          subject: "math",
          title: "Math Academic Standards",
          description:
            "K-12 mathematics standards with granular statements and cross-grade connections.",
          action: "get_data",
          downloadFormats: ["JSONL", "CSV", "REST export"],
        },
        {
          id: "science-std",
          subject: "science",
          title: "Science Academic Standards",
          description:
            "Three-dimensional science standards with practice and core idea tags.",
          action: "get_data",
        },
        {
          id: "ela-std",
          subject: "english",
          title: "ELA Academic Standards",
          description:
            "Reading, writing, speaking, and listening expectations by grade band.",
          action: "get_data",
        },
        {
          id: "ss-std",
          subject: "social-studies",
          title: "Social Studies Academic Standards",
          description:
            "Civics, history, geography, and economics progressions for K-12.",
          action: "get_data",
        },
        {
          id: "other-std",
          subject: "cross-curricular",
          title: "Other Academic Standards",
          description:
            "Arts, health, world languages, and supplementary strands from member states.",
          action: "get_data",
        },
      ],
      relatedDatasets: [
        {
          refId: "coll-achieve-math-components",
          providerName: "Achievement Network",
          providerInitials: "AN",
          title: "Math Learning Components",
        },
        {
          refId: "coll-lc-literacy-components",
          providerName: "Learning Commons",
          providerInitials: "LC",
          title: "Literacy Learning Components",
        },
      ],
      sidebar: {
        categories: [
          "Knowledge Graph",
          "Academic standards",
          "K–12",
          "Math",
          "Science",
          "ELA",
          "Social studies",
        ],
        providerAbout:
          "1EdTech is a nonprofit edtech community that helps districts and suppliers integrate data and curriculum safely and at scale.",
        licenseNote: "CC BY 4.0 for open standards nodes in this bundle.",
        formats: ["JSONL", "CSV"],
        documentationLabel: "Knowledge graph reference",
        documentationHref:
          "https://docs.learningcommons.org/knowledge-graph/understanding-knowledge-graph/about-knowledge-graph",
      },
    },
  },
  {
    id: "coll-im-360",
    collectionName: "IM 360",
    providerName: "Illustrative Mathematics",
    providerKey: "IM",
    providerInitials: "IM",
    gradeRange: "K–12",
    datasetCount: 3,
    product: "knowledge-graph",
    description:
      "Illustrative Mathematics' IM 360 K-12 math curriculum — from open scope and sequence to full gated instructional materials.",
    gated: true,
    license: "Gated",
    detail: {
      childDatasets: [
        {
          id: "im-scope",
          subject: "math",
          title: "IM 360 Scope & Sequence",
          description:
            "Scope and sequence for Illustrative Mathematics' IM 360 K-12 math curriculum, outlining unit progression and standards alignment.",
          action: "get_data",
          downloadFormats: ["JSONL", "CSV"],
        },
        {
          id: "im-instructional",
          subject: "math",
          title: "IM 360 Instructional Materials",
          description:
            "Complete IM 360 instructional materials including lesson plans, unit overviews, and practice problems across K-12.",
          gated: true,
          action: "request",
        },
        {
          id: "im-assessment",
          subject: "math",
          title: "IM 360 Assessment Materials",
          description:
            "IM 360 assessment items, rubrics, and formative check-ins aligned to the instructional scope and sequence.",
          gated: true,
          action: "request",
        },
      ],
      relatedDatasets: [
        {
          refId: "coll-1edtech-academic-standards",
          providerName: "1EdTech",
          providerInitials: "1E",
          title: "Math Academic Standards",
        },
      ],
      sidebar: {
        categories: ["Knowledge Graph", "Curriculum", "K–12", "Math"],
        providerAbout:
          "Illustrative Mathematics is a nonprofit creating problem-based K-12 math curricula used by millions of students, focused on deep mathematical understanding.",
        licenseNote: "Varies by dataset.",
        formats: ["JSONL", "CSV"],
        documentationLabel: "Knowledge graph reference",
        documentationHref:
          "https://docs.learningcommons.org/knowledge-graph/understanding-knowledge-graph/about-knowledge-graph",
      },
    },
  },
  {
    id: "coll-openscied-curriculum",
    collectionName: "OpenSciEd Curriculum",
    providerName: "OpenSciEd",
    providerKey: "OPENSCIED",
    providerInitials: "OS",
    gradeRange: "K–12",
    datasetCount: 3,
    product: "knowledge-graph",
    description:
      "Full K-12 science curriculum from OpenSciEd, designed around NGSS performance expectations across elementary, middle, and high school grade bands.",
    gated: true,
    license: "Gated",
    detail: {
      childDatasets: [
        {
          id: "os-ms",
          subject: "science",
          title: "Middle School Units Bundle",
          description:
            "Phenomena-driven units with DCIs, SEPs, and CCC coverage for grades 6–8.",
          action: "request",
          gated: true,
        },
        {
          id: "os-hs",
          subject: "science",
          title: "High School Course Pathways",
          description:
            "Course-based graphs for biology, chemistry, and physics with storyline coherence.",
          action: "request",
          gated: true,
        },
        {
          id: "os-elem",
          subject: "science",
          title: "Elementary Anchoring Events",
          description:
            "Bundled instructional segments with formative sense-making checkpoints.",
          action: "get_data",
          downloadFormats: ["JSONL", "CSV"],
        },
      ],
      relatedDatasets: [
        {
          refId: "coll-1edtech-academic-standards",
          providerName: "1EdTech",
          providerInitials: "1E",
          title: "Science Academic Standards",
        },
      ],
      sidebar: {
        categories: ["Knowledge Graph", "Curriculum", "K–12", "Science", "NGSS"],
        providerAbout:
          "OpenSciEd develops free, high-quality science instructional materials aligned to the Next Generation Science Standards.",
        licenseNote: "Varies by unit; instructional assets may be gated.",
        formats: ["JSONL", "CSV"],
        documentationLabel: "Knowledge graph reference",
        documentationHref:
          "https://docs.learningcommons.org/knowledge-graph/understanding-knowledge-graph/about-knowledge-graph",
      },
    },
  },
  {
    id: "coll-achieve-math-components",
    collectionName: "Math Learning Components",
    providerName: "Achievement Network",
    providerKey: "ACHIEVEMENT NETWORK",
    providerInitials: "AN",
    gradeRange: "K–12",
    datasetCount: 4,
    product: "knowledge-graph",
    description:
      "Structured learning components mapped to math academic standards, providing granular skill-level alignment.",
    gated: false,
    license: "CC BY 4.0",
    detail: {
      childDatasets: [
        {
          id: "an-elem",
          subject: "math",
          title: "Elementary learning components",
          description:
            "Lesson-sized component nodes mapped to priority standards and fluencies.",
          action: "get_data",
        },
        {
          id: "an-ms",
          subject: "math",
          title: "Middle school components",
          description:
            "Algebraic reasoning clusters with prerequisite edges for placement tools.",
          action: "get_data",
        },
        {
          id: "an-hs",
          subject: "math",
          title: "High school components",
          description:
            "Functions, geometry, and statistics subgraphs with assessment tagging.",
          action: "get_data",
        },
        {
          id: "an-assess",
          subject: "math",
          title: "Checkpoint item alignments",
          description:
            "Assessment items linked to component nodes for mastery coverage views.",
          action: "request",
          gated: true,
        },
      ],
      relatedDatasets: [
        {
          refId: "coll-1edtech-academic-standards",
          providerName: "1EdTech",
          providerInitials: "1E",
          title: "Math Academic Standards",
        },
      ],
      sidebar: {
        categories: ["Knowledge Graph", "K–12", "Math", "Curriculum alignment"],
        providerAbout:
          "Achievement Network (ANet) partners with schools to improve instruction and equity through quality instructional materials and data.",
        licenseNote: "Open components CC BY 4.0; some assessment linkages gated.",
        formats: ["JSONL", "CSV"],
        documentationLabel: "Knowledge graph reference",
        documentationHref:
          "https://docs.learningcommons.org/knowledge-graph/understanding-knowledge-graph/about-knowledge-graph",
      },
    },
  },
  {
    id: "coll-lc-literacy-components",
    collectionName: "Literacy Learning Components",
    providerName: "Learning Commons",
    providerKey: "LEARNING COMMONS",
    providerInitials: "LC",
    gradeRange: "K–12",
    datasetCount: 6,
    product: "knowledge-graph",
    description:
      "Structured learning components mapped to ELA academic standards for reading and writing skills.",
    gated: false,
    license: "CC BY 4.0",
    detail: {
      childDatasets: [
        {
          id: "lc-reading",
          subject: "english",
          title: "Reading foundations graph",
          description:
            "Phonics, fluency, and comprehension nodes with progression edges.",
          action: "get_data",
        },
        {
          id: "lc-writing",
          subject: "english",
          title: "Writing modes & genres",
          description:
            "Argument, informative, and narrative clusters with mentor-text tags.",
          action: "get_data",
        },
        {
          id: "lc-lang",
          subject: "english",
          title: "Language conventions bundle",
          description:
            "Grammar and usage subgraph referenced by grade-level expectations.",
          action: "get_data",
        },
        {
          id: "lc-spk",
          subject: "english",
          title: "Speaking & listening skills",
          description:
            "Discussion and presentation criteria cross-walked to standards.",
          action: "get_data",
        },
        {
          id: "lc-vocab",
          subject: "english",
          title: "Academic vocabulary tiers",
          description:
            "Word networks and text complexity anchors for cross-content literacy.",
          action: "get_data",
        },
        {
          id: "lc-assess",
          subject: "english",
          title: "Rubric-linked performance descriptors",
          description:
            "Trait-level descriptors aligned to common rubric scales for reporting.",
          action: "request",
          gated: true,
        },
      ],
      relatedDatasets: [
        {
          refId: "coll-1edtech-academic-standards",
          providerName: "1EdTech",
          providerInitials: "1E",
          title: "ELA Academic Standards",
        },
      ],
      sidebar: {
        categories: ["Knowledge Graph", "K–12", "ELA", "Literacy"],
        providerAbout:
          "Learning Commons curates interoperable curriculum and assessment graphs for publishers and platforms.",
        licenseNote: "CC BY 4.0 for open literacy component nodes.",
        formats: ["JSONL", "CSV"],
        documentationLabel: "Knowledge graph reference",
        documentationHref:
          "https://docs.learningcommons.org/knowledge-graph/understanding-knowledge-graph/about-knowledge-graph",
      },
    },
  },
  {
    id: "coll-synthetic-ela-rubrics",
    collectionName: "ELA rubric-aligned evaluator pack",
    providerName: "LC Curriculum Lab",
    providerKey: "LC LAB",
    providerInitials: "LC",
    gradeRange: "6–12",
    datasetCount: 2,
    product: "evaluator",
    description:
      "Evaluator-ready prompts and trait definitions for argument and evidence dimensions—paired with sample item banks for integration testing.",
    gated: false,
    license: "CC BY 4.0",
    detail: {
      childDatasets: [
        {
          id: "eval-arguments",
          subject: "english",
          title: "Argument writing evaluator schema",
          description:
            "Versioned rubric traits, anchors, and JSON schema for scoring pipelines.",
          action: "get_data",
          downloadFormats: ["JSON", "YAML"],
        },
        {
          id: "eval-evidence",
          subject: "english",
          title: "Evidence use calibration set",
          description:
            "Sample responses with human-adjudicated labels for drift monitoring.",
          action: "request",
          gated: true,
        },
      ],
      relatedDatasets: [
        {
          refId: "coll-lc-literacy-components",
          providerName: "Learning Commons",
          providerInitials: "LC",
          title: "Writing modes & genres",
        },
      ],
      sidebar: {
        categories: ["Evaluators", "6–12", "ELA", "Assessment"],
        providerAbout:
          "LC Curriculum Lab ships reference evaluator configs and sample corpora for integration testing.",
        licenseNote: "Open schema CC BY 4.0; calibration bundles may be gated.",
        formats: ["JSON", "YAML"],
        documentationLabel: "Evaluators overview",
        documentationHref: "https://docs.learningcommons.org/evaluators",
      },
    },
  },
];

const KG_DOCS_ABOUT = `${SUPPORT_DOCS_URL}/knowledge-graph/understanding-knowledge-graph/about-knowledge-graph`;
const EVAL_DOCS = `${SUPPORT_DOCS_URL}/evaluators`;

/** Fallback body when `detail` is omitted (keeps split view usable for new mock rows). */
export function resolveCollectionDetail(
  c: DatasetCollection,
): DatasetCollectionDetail {
  if (c.detail) return c.detail;
  const n = Math.min(Math.max(c.datasetCount, 1), 5);
  const childDatasets: CollectionChildDataset[] = Array.from(
    { length: n },
    (_, i) => ({
      id: `placeholder-${c.id}-${i}`,
      subject: "cross-curricular" as SubjectSlug,
      title: `Bundle ${i + 1}`,
      description:
        "Placeholder dataset row. Add a `detail` object on this collection in `collection-mock.ts` for copy that matches the product.",
      action: "get_data" as const,
      downloadFormats: ["JSONL", "CSV"],
    }),
  );
  return {
    childDatasets,
    relatedDatasets: [],
    sidebar: {
      categories: [
        c.product === "knowledge-graph" ? "Knowledge Graph" : "Evaluators",
        c.gradeRange,
      ],
      providerAbout: `Add detail.sidebar.providerAbout for a richer description of ${c.providerName}.`,
      licenseNote:
        c.license ?? (c.gated ? "Varies by dataset." : "See provider terms."),
      formats: ["JSONL", "CSV"],
      documentationLabel:
        c.product === "knowledge-graph"
          ? "Knowledge graph reference"
          : "Evaluators overview",
      documentationHref:
        c.product === "knowledge-graph" ? KG_DOCS_ABOUT : EVAL_DOCS,
    },
  };
}

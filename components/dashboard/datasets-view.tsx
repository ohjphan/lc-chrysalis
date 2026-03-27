"use client";

import * as React from "react";
import {
  ChevronDown,
  Download,
  Lock,
  Search,
} from "lucide-react";
import {
  RequestAccessModal,
  type DatasetRequestTarget,
} from "@/components/dataset/request-access-modal";
import { PageContainer } from "@/components/dashboard/page-container";
import { StickyTableProvider } from "@/components/dashboard/sticky-table-provider";
import { Button } from "@/components/ui/button";
import { ColorBadge } from "@/components/ui/color-badge";
import { Input } from "@/components/ui/input";
import { PageTitle } from "@/components/ui/page-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { brandAvatarClassesForId } from "@/lib/brand-avatar-colors";
import { tableHeadStickyCellClasses } from "@/lib/table-styles";
import { cn } from "@/lib/utils";

export type DatasetScope = "all" | "downloaded" | "pending";
export type AccessFilterValue = "all" | "open" | "gated";

export type SubjectSlug =
  | "math"
  | "english"
  | "science"
  | "social-studies"
  | "cross-curricular";

export const SUBJECT_LABELS: Record<SubjectSlug, string> = {
  math: "Math",
  english: "English",
  science: "Science",
  "social-studies": "Social studies",
  "cross-curricular": "Cross-curricular",
};

export const SUBJECT_SLUGS: SubjectSlug[] = [
  "math",
  "english",
  "science",
  "social-studies",
  "cross-curricular",
];

export type DatasetType = "knowledge-graph" | "evaluator";

export type DatasetRow = {
  id: string;
  providerKey: string;
  providerName: string;
  initials: string;
  datasetName: string;
  description: string;
  type: DatasetType;
  primaryAction: "download" | "request";
  fileFormat: string;
  version: string;
  license: string;
  subjects: readonly SubjectSlug[];
  downloadFormats?: readonly string[];
};

const MOCK_DATASETS: DatasetRow[] = [
  {
    id: "1",
    providerKey: "Illustrative Math",
    providerName: "Illustrative Mathematics",
    initials: "IM",
    datasetName: "Grade 6–8 Curriculum Graph",
    description:
      "Full dependency graph for IM middle school units, lessons, and standards alignment.",
    type: "knowledge-graph",
    primaryAction: "download",
    fileFormat: "JSON bundle",
    version: "3.2.0",
    license: "CC-BY-4.0",
    subjects: ["math"],
    downloadFormats: ["REST API", "CSV", "JSON", "GraphQL"],
  },
  {
    id: "2",
    providerKey: "OpenSciEd",
    providerName: "OpenSciEd",
    initials: "OS",
    datasetName: "Middle School Science Units",
    description:
      "Bundled phenomena-driven units with DCIs, SEPs, and CCC crosswalks.",
    type: "knowledge-graph",
    primaryAction: "request",
    fileFormat: "REST API",
    version: "1.4.2",
    license: "CC-BY-4.0",
    subjects: ["science"],
  },
  {
    id: "3",
    providerKey: "EL Education",
    providerName: "EL Education",
    initials: "EL",
    datasetName: "ELA Skills Progression",
    description:
      "Lexile-banded progression map across modules and performance tasks.",
    type: "evaluator",
    primaryAction: "download",
    fileFormat: "JSON bundle",
    version: "2.0.1",
    license: "CC-BY-4.0",
    subjects: ["english"],
    downloadFormats: ["REST API", "JSON"],
  },
  {
    id: "4",
    providerKey: "Achieve",
    providerName: "Achieve the Core",
    initials: "AC",
    datasetName: "Coherence Map Export",
    description:
      "Standards coherence graph with prerequisite links for math and ELA.",
    type: "knowledge-graph",
    primaryAction: "request",
    fileFormat: "GraphQL",
    version: "0.9.8",
    license: "Gated",
    subjects: ["cross-curricular"],
  },
  {
    id: "5",
    providerKey: "NWEA",
    providerName: "NWEA",
    initials: "NW",
    datasetName: "MAP Growth Skills Map",
    description: "Evaluator-ready item skill graph for MAP Growth.",
    type: "evaluator",
    primaryAction: "request",
    fileFormat: "REST API",
    version: "2025.01",
    license: "Gated",
    subjects: ["math", "english"],
  },
  {
    id: "6",
    providerKey: "Amplify",
    providerName: "Amplify",
    initials: "AM",
    datasetName: "CKLA Unit Sequences",
    description: "Sequenced knowledge units for CKLA with vocabulary checkpoints.",
    type: "knowledge-graph",
    primaryAction: "download",
    fileFormat: "JSON bundle",
    version: "3.0.2",
    license: "CC-BY-4.0",
    subjects: ["english"],
    downloadFormats: ["JSON", "CSV"],
  },
  {
    id: "7",
    providerKey: "Khan Academy",
    providerName: "Khan Academy",
    initials: "KA",
    datasetName: "Practice Skills Taxonomy",
    description:
      "Hierarchical skill tree linking exercises to standards and prerequisite chains.",
    type: "knowledge-graph",
    primaryAction: "download",
    fileFormat: "GraphQL",
    version: "2024.12",
    license: "CC-BY-NC-SA-4.0",
    subjects: ["math", "science"],
    downloadFormats: ["GraphQL", "JSON"],
  },
  {
    id: "8",
    providerKey: "Core Knowledge",
    providerName: "Core Knowledge Foundation",
    initials: "CK",
    datasetName: "History & Geography Scope",
    description:
      "Year-by-year content sequence with cross-grade vocabulary and concept links.",
    type: "knowledge-graph",
    primaryAction: "request",
    fileFormat: "JSON bundle",
    version: "2.3.0",
    license: "Gated",
    subjects: ["social-studies", "english"],
  },
  {
    id: "9",
    providerKey: "ACT",
    providerName: "ACT",
    initials: "AT",
    datasetName: "College Readiness Benchmark Graph",
    description:
      "Evaluator graph tying subject scores to college course placement bands.",
    type: "evaluator",
    primaryAction: "request",
    fileFormat: "REST API",
    version: "2025.03",
    license: "Gated",
    subjects: ["cross-curricular"],
  },
  {
    id: "13",
    providerKey: "Carnegie Learning",
    providerName: "Carnegie Learning",
    initials: "CL",
    datasetName: "MATHia Skill Object Graph",
    description:
      "Fine-grained mastery objects with workspace and hint policy metadata.",
    type: "evaluator",
    primaryAction: "request",
    fileFormat: "REST API",
    version: "4.1.0",
    license: "Gated",
    subjects: ["math"],
  },
  {
    id: "14",
    providerKey: "Fishtank Learning",
    providerName: "Fishtank Learning",
    initials: "FS",
    datasetName: "Unit Anchor Text Graph",
    description:
      "ELA units with text complexity, standards tags, and paired writing tasks.",
    type: "knowledge-graph",
    primaryAction: "request",
    fileFormat: "JSON bundle",
    version: "1.8.4",
    license: "CC-BY-4.0",
    subjects: ["english"],
  },
  {
    id: "15",
    providerKey: "Newsela",
    providerName: "Newsela",
    initials: "NL",
    datasetName: "Lexile-Adjusted Article Corpus",
    description:
      "Parallel corpus of articles at multiple Lexile levels with topic and standard tags.",
    type: "knowledge-graph",
    primaryAction: "download",
    fileFormat: "CSV",
    version: "2025.01",
    license: "CC-BY-4.0",
    subjects: ["english", "social-studies"],
    downloadFormats: ["CSV", "JSON", "REST API"],
  },
  {
    id: "16",
    providerKey: "LabXchange",
    providerName: "LabXchange (Harvard)",
    initials: "LX",
    datasetName: "Pathway Learning Graph",
    description:
      "Interactive pathway nodes for biology and chemistry lab simulations.",
    type: "knowledge-graph",
    primaryAction: "request",
    fileFormat: "GraphQL",
    version: "0.4.2",
    license: "Gated",
    subjects: ["science"],
  },
  {
    id: "17",
    providerKey: "iCivics",
    providerName: "iCivics",
    initials: "IC",
    datasetName: "Civic Literacy Competency Map",
    description:
      "Game-linked competencies aligned to state civics standards and case studies.",
    type: "evaluator",
    primaryAction: "request",
    fileFormat: "REST API",
    version: "1.0.0",
    license: "CC-BY-NC-4.0",
    subjects: ["social-studies"],
  },
  {
    id: "18",
    providerKey: "Great Minds",
    providerName: "Great Minds",
    initials: "GM",
    datasetName: "Eureka Math Module DAG",
    description:
      "Directed graph of modules, topics, and lessons with fluency dependencies.",
    type: "knowledge-graph",
    primaryAction: "download",
    fileFormat: "JSON bundle",
    version: "5.0.0",
    license: "Gated",
    subjects: ["math"],
    downloadFormats: ["JSON", "CSV"],
  },
  {
    id: "19",
    providerKey: "Pivot Interactives",
    providerName: "Pivot Interactives",
    initials: "PI",
    datasetName: "Phenomenon Video Graph",
    description:
      "Linked video investigations with variable probes and three-dimensional SEP tags.",
    type: "evaluator",
    primaryAction: "request",
    fileFormat: "REST API",
    version: "2.2.1",
    license: "Gated",
    subjects: ["science", "cross-curricular"],
  },
];

const MOCK_DOWNLOADED_DATASET_IDS = new Set(["1", "3", "6", "7", "15", "18"]);
const MOCK_PENDING_REQUEST_DATASET_IDS = new Set([
  "2",
  "4",
  "5",
  "8",
  "13",
  "16",
]);

function TypeBadge({ type }: { type: DatasetType }) {
  const kg = type === "knowledge-graph";
  return (
    <ColorBadge variant="beige">
      {kg ? "Knowledge graph" : "Evaluator"}
    </ColorBadge>
  );
}

function DatasetAccessDropdown({
  value,
  onValueChange,
}: {
  value: AccessFilterValue;
  onValueChange: (v: AccessFilterValue) => void;
}) {
  const label =
    value === "all"
      ? "Access"
      : value === "open"
        ? "Access (Open)"
        : "Access (Gated)";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="h-10 gap-2 border-border-subtle bg-transparent px-3"
          aria-label="Filter by access"
        >
          {label}
          <ChevronDown className="size-4 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Access</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(v) => onValueChange(v as AccessFilterValue)}
        >
          <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="open">Open datasets</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="gated">Gated datasets</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DatasetFilterDropdown({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: readonly { value: string; label: string }[];
  selected: ReadonlySet<string>;
  onToggle: (value: string, checked: boolean) => void;
}) {
  const count = selected.size;
  const trigger = count === 0 ? label : `${label} (${count})`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="h-10 gap-2 border-border-subtle bg-transparent px-3"
          aria-label={label}
        >
          {trigger}
          <ChevronDown className="size-4 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        {options.map((opt) => (
          <DropdownMenuCheckboxItem
            key={opt.value}
            checked={selected.has(opt.value)}
            onCheckedChange={(c) => onToggle(opt.value, Boolean(c))}
            onSelect={(e) => e.preventDefault()}
          >
            {opt.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Uniform row height (tbody); keeps title + description `line-clamp` + actions aligned. */
const DATASET_TABLE_ROW_TD_HEIGHT = "h-[8.5rem]";
const td = cn(
  "border-app-b border-border-subtle px-4 py-6 overflow-hidden",
  DATASET_TABLE_ROW_TD_HEIGHT,
);

/** Frosted bar (inner layer — not on the `position: sticky` node). */
const DATASETS_FROSTED_STICKY_BG =
  "bg-white/85 backdrop-blur-lg supports-[backdrop-filter]:bg-white/70 dark:bg-background/85 dark:backdrop-blur-lg dark:supports-[backdrop-filter]:bg-background/70";

/** Sticky `<th>`: same `bg-sidebar` as API keys / team tables (`#faf9f8` light). */
const DATASETS_TABLE_HEAD_STICKY: Parameters<
  typeof tableHeadStickyCellClasses
>[1] = {
  stickyTopVar: "--datasets-sticky-controls-height",
  surfaceClass: "bg-sidebar",
  zClass: "z-[15]",
};

type DatasetsTabPanelProps = {
  scope: DatasetScope;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  accessFilter: AccessFilterValue;
  selectedSubjects: Set<string>;
  selectedFormats: Set<string>;
  selectedProviders: Set<string>;
  openRequest: (row: DatasetRow) => void;
};

function DatasetsTabPanel({
  scope,
  query,
  setQuery,
  accessFilter,
  selectedSubjects,
  selectedFormats,
  selectedProviders,
  openRequest,
}: DatasetsTabPanelProps) {
  const scopedDatasets = React.useMemo(() => {
    if (scope === "all") return MOCK_DATASETS;
    if (scope === "downloaded")
      return MOCK_DATASETS.filter((d) => MOCK_DOWNLOADED_DATASET_IDS.has(d.id));
    return MOCK_DATASETS.filter((d) =>
      MOCK_PENDING_REQUEST_DATASET_IDS.has(d.id),
    );
  }, [scope]);

  const rows = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return scopedDatasets.filter((d) => {
      if (
        q &&
        !d.providerName.toLowerCase().includes(q) &&
        !d.datasetName.toLowerCase().includes(q) &&
        !d.description.toLowerCase().includes(q)
      ) {
        return false;
      }
      if (accessFilter === "open" && d.primaryAction !== "download")
        return false;
      if (accessFilter === "gated" && d.primaryAction !== "request")
        return false;
      if (
        selectedSubjects.size > 0 &&
        !d.subjects.some((s) => selectedSubjects.has(s))
      ) {
        return false;
      }
      if (selectedFormats.size > 0 && !selectedFormats.has(d.fileFormat)) {
        return false;
      }
      if (
        selectedProviders.size > 0 &&
        !selectedProviders.has(d.providerName)
      ) {
        return false;
      }
      return true;
    });
  }, [
    scopedDatasets,
    query,
    accessFilter,
    selectedSubjects,
    selectedFormats,
    selectedProviders,
  ]);

  return (
    <div>
      <div className="overflow-hidden border-app-t border-border-subtle">
        <StickyTableProvider>
          <table className="min-w-[960px] w-full border-collapse text-base">
            <caption className="sr-only">
              Dataset catalog with actions
            </caption>
            <thead>
              <tr>
                <th
                  className={tableHeadStickyCellClasses(
                    "min-w-[320px]",
                    DATASETS_TABLE_HEAD_STICKY,
                  )}
                >
                  Dataset
                </th>
                <th className={tableHeadStickyCellClasses(undefined, DATASETS_TABLE_HEAD_STICKY)}>
                  Type
                </th>
                <th
                  className={tableHeadStickyCellClasses(
                    "text-right",
                    DATASETS_TABLE_HEAD_STICKY,
                  )}
                >
                  Version
                </th>
                <th
                  className={tableHeadStickyCellClasses(
                    "text-right",
                    DATASETS_TABLE_HEAD_STICKY,
                  )}
                >
                  License
                </th>
                <th
                  className={tableHeadStickyCellClasses(
                    "text-right",
                    DATASETS_TABLE_HEAD_STICKY,
                  )}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const { bgClass, textClass } = brandAvatarClassesForId(row.id);
                return (
                <tr
                  key={row.id}
                  className="border-app-b border-border-subtle [&>td]:align-middle"
                >
                  <td className={cn(td, "max-w-md")}>
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-md text-xs font-semibold",
                          bgClass,
                          textClass,
                        )}
                      >
                        {row.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.04em] text-muted-foreground">
                          {row.providerName}
                        </p>
                        <p className="mt-1 line-clamp-2 font-[550] text-foreground">
                          {row.datasetName}
                        </p>
                        <p className="mt-1.5 line-clamp-3 text-muted-foreground">
                          {row.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={td}>
                    <TypeBadge type={row.type} />
                  </td>
                  <td className={cn(td, "text-right text-muted-foreground")}>
                    {row.version}
                  </td>
                  <td className={cn(td, "text-right text-muted-foreground")}>
                    {row.license}
                  </td>
                  <td className={cn(td, "text-right")}>
                    {row.primaryAction === "download" ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            className="h-9 gap-1.5 [&_svg]:size-3.5 hover:brightness-110 data-[state=open]:brightness-110"
                          >
                            <Download className="size-3.5" />
                            Download
                            <ChevronDown className="size-3.5 opacity-70" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel className="font-nav-eyebrow text-[10px] uppercase">
                            Format
                          </DropdownMenuLabel>
                          {(row.downloadFormats ?? [row.fileFormat]).map(
                            (fmt) => (
                              <DropdownMenuItem key={fmt}>{fmt}</DropdownMenuItem>
                            ),
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="h-9 gap-1.5 [&_svg]:size-3.5"
                        onClick={() => openRequest(row)}
                      >
                        <Lock className="size-3.5" />
                        Request access
                      </Button>
                    )}
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </StickyTableProvider>
      </div>

      {rows.length === 0 ? (
        <p className="text-center text-base font-normal text-muted-foreground">
          No datasets match your filters.
        </p>
      ) : null}
    </div>
  );
}

export function DatasetsView() {
  const [scope, setScope] = React.useState<DatasetScope>("all");
  const [query, setQuery] = React.useState("");
  const [accessFilter, setAccessFilter] =
    React.useState<AccessFilterValue>("all");
  const [selectedSubjects, setSelectedSubjects] = React.useState<Set<string>>(
    () => new Set(),
  );
  const [selectedFormats, setSelectedFormats] = React.useState<Set<string>>(
    () => new Set(),
  );
  const [selectedProviders, setSelectedProviders] = React.useState<
    Set<string>
  >(() => new Set());

  const [requestOpen, setRequestOpen] = React.useState(false);
  const [requestTarget, setRequestTarget] =
    React.useState<DatasetRequestTarget | null>(null);

  const formatOptions = React.useMemo(() => {
    const u = [...new Set(MOCK_DATASETS.map((d) => d.fileFormat))].sort();
    return u.map((v) => ({ value: v, label: v }));
  }, []);

  const providerOptions = React.useMemo(() => {
    const u = [...new Set(MOCK_DATASETS.map((d) => d.providerName))].sort();
    return u.map((v) => ({ value: v, label: v }));
  }, []);

  const subjectOptions = SUBJECT_SLUGS.map((s) => ({
    value: s,
    label: SUBJECT_LABELS[s],
  }));

  const hasActiveFilters =
    accessFilter !== "all" ||
    selectedSubjects.size > 0 ||
    selectedFormats.size > 0 ||
    selectedProviders.size > 0;

  function clearFilters() {
    setAccessFilter("all");
    setSelectedSubjects(new Set());
    setSelectedFormats(new Set());
    setSelectedProviders(new Set());
  }

  function openRequest(row: DatasetRow) {
    setRequestTarget({
      id: row.id,
      providerKey: row.providerKey.toUpperCase(),
      datasetName: row.datasetName,
      license: row.license,
      initials: row.initials,
    });
    setRequestOpen(true);
  }

  const datasetStickySentinelRef = React.useRef<HTMLDivElement>(null);
  const datasetStickyControlsRef = React.useRef<HTMLDivElement>(null);
  const [datasetStickyControlsHeight, setDatasetStickyControlsHeight] =
    React.useState(0);
  const [datasetStickyBarStuck, setDatasetStickyBarStuck] =
    React.useState(false);

  React.useLayoutEffect(() => {
    const el = datasetStickyControlsRef.current;
    if (!el) return;
    const measure = () => setDatasetStickyControlsHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const sentinel = datasetStickySentinelRef.current;
    if (!sentinel) return;
    function updateStuck() {
      setDatasetStickyBarStuck(sentinel.getBoundingClientRect().top < 0);
    }
    updateStuck();
    window.addEventListener("scroll", updateStuck, { passive: true });
    window.addEventListener("resize", updateStuck);
    return () => {
      window.removeEventListener("scroll", updateStuck);
      window.removeEventListener("resize", updateStuck);
    };
  }, []);

  const sharedPanelProps = {
    query,
    setQuery,
    accessFilter,
    selectedSubjects,
    selectedFormats,
    selectedProviders,
    openRequest,
  } as const;

  return (
    <>
      <PageContainer>
        <div className="flex flex-col gap-[8px]">
          <PageTitle>Datasets</PageTitle>
          <p className="max-w-2xl text-base font-normal text-muted-foreground">
            Browse datasets—open downloads or gated access requests.
          </p>
        </div>

        <div
          style={
            {
              "--datasets-sticky-controls-height": `${datasetStickyControlsHeight}px`,
            } as React.CSSProperties
          }
        >
          <Tabs
            value={scope}
            onValueChange={(v) => setScope(v as DatasetScope)}
            className="mt-8"
          >
            {/* Sentinel above sticky bar: when it scrolls past the viewport top, the bar is sticky. */}
            <div
              ref={datasetStickySentinelRef}
              className="pointer-events-none h-px w-full shrink-0"
              aria-hidden
            />
            {/* Outer: sticky only — `backdrop-filter` on the same node breaks sticking in Chromium/WebKit. */}
            <div
              ref={datasetStickyControlsRef}
              className="sticky top-0 z-20 -mx-6 md:-mx-8"
            >
              <div
                className={cn(
                  "border-app-b px-8 pb-4 pt-3 transition-[border-color] duration-300 ease-out md:px-10 md:pt-4",
                  datasetStickyBarStuck
                    ? "border-border-subtle"
                    : "border-b-transparent",
                  DATASETS_FROSTED_STICKY_BG,
                )}
              >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <TabsList
                  aria-label="Dataset scope"
                  className="h-auto min-h-10 w-full flex-wrap justify-start gap-1 rounded-md bg-nav-active/50 p-1 dark:bg-nav-active/30 lg:w-auto [&>button]:font-[550]"
                >
                  <TabsTrigger value="all">All datasets</TabsTrigger>
                  <TabsTrigger value="downloaded" className="gap-1.5">
                    Downloaded
                    <ColorBadge
                      variant="beige"
                      className="shrink-0 tabular-nums normal-case"
                    >
                      {MOCK_DOWNLOADED_DATASET_IDS.size}
                    </ColorBadge>
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="gap-1.5">
                    Pending requests
                    <ColorBadge
                      variant="beige"
                      className="shrink-0 tabular-nums normal-case"
                    >
                      {MOCK_PENDING_REQUEST_DATASET_IDS.size}
                    </ColorBadge>
                  </TabsTrigger>
                </TabsList>
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <DatasetAccessDropdown
                    value={accessFilter}
                    onValueChange={setAccessFilter}
                  />
                  <DatasetFilterDropdown
                    label="Subjects"
                    options={subjectOptions}
                    selected={selectedSubjects}
                    onToggle={(v, c) => {
                      setSelectedSubjects((prev) => {
                        const next = new Set(prev);
                        if (c) next.add(v);
                        else next.delete(v);
                        return next;
                      });
                    }}
                  />
                  <DatasetFilterDropdown
                    label="Formats"
                    options={formatOptions}
                    selected={selectedFormats}
                    onToggle={(v, c) => {
                      setSelectedFormats((prev) => {
                        const next = new Set(prev);
                        if (c) next.add(v);
                        else next.delete(v);
                        return next;
                      });
                    }}
                  />
                  <DatasetFilterDropdown
                    label="Providers"
                    options={providerOptions}
                    selected={selectedProviders}
                    onToggle={(v, c) => {
                      setSelectedProviders((prev) => {
                        const next = new Set(prev);
                        if (c) next.add(v);
                        else next.delete(v);
                        return next;
                      });
                    }}
                  />
                  {hasActiveFilters ? (
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-10 text-muted-foreground"
                      onClick={clearFilters}
                    >
                      Clear filters
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="relative mt-4 max-w-full">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-11 border-app border-border-subtle pl-9"
                  placeholder="Search datasets…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search datasets"
                />
              </div>
              </div>
            </div>

            <TabsContent value="all" className="mt-4 focus-visible:outline-none">
              <DatasetsTabPanel scope="all" {...sharedPanelProps} />
            </TabsContent>
            <TabsContent
              value="downloaded"
              className="mt-4 focus-visible:outline-none"
            >
              <DatasetsTabPanel scope="downloaded" {...sharedPanelProps} />
            </TabsContent>
            <TabsContent
              value="pending"
              className="mt-4 focus-visible:outline-none"
            >
              <DatasetsTabPanel scope="pending" {...sharedPanelProps} />
            </TabsContent>
          </Tabs>
        </div>
      </PageContainer>

      <RequestAccessModal
        open={requestOpen}
        onOpenChange={setRequestOpen}
        dataset={requestTarget}
        orgName="Magic School"
      />
    </>
  );
}

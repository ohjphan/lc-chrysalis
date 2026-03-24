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
import { Input } from "@/components/ui/input";
import { PageTitle } from "@/components/ui/page-title";
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
  avatarClassName: string;
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
    avatarClassName: "bg-gradient-to-br from-violet-500 to-purple-700",
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
    avatarClassName: "bg-gradient-to-br from-sky-500 to-cyan-600",
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
    avatarClassName: "bg-gradient-to-br from-emerald-500 to-teal-700",
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
    avatarClassName: "bg-gradient-to-br from-orange-500 to-amber-600",
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
    avatarClassName: "bg-gradient-to-br from-blue-600 to-indigo-800",
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
    avatarClassName: "bg-gradient-to-br from-pink-500 to-rose-600",
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
];

const MOCK_DOWNLOADED_DATASET_IDS = new Set(["1", "3", "6"]);
const MOCK_PENDING_REQUEST_DATASET_IDS = new Set(["2", "4", "5"]);

function TypeBadge({ type }: { type: DatasetType }) {
  const kg = type === "knowledge-graph";
  return (
    <span
      className={cn(
        "inline-flex rounded-md border-app border-border-subtle px-2 py-1 font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.04em]",
        kg
          ? "bg-nav-active text-foreground"
          : "bg-nav-active text-foreground",
      )}
    >
      {kg ? "Knowledge graph" : "Evaluator"}
    </span>
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
      avatarClassName: row.avatarClassName,
    });
    setRequestOpen(true);
  }

  const td =
    "border-app-b border-border-subtle px-4 py-6 align-top";

  const tabBtn = (value: DatasetScope, label: React.ReactNode) => (
    <button
      type="button"
      role="tab"
      aria-selected={scope === value}
      onClick={() => setScope(value)}
      className={cn(
        "border-app-b pb-2.5 font-nav-eyebrow text-xs font-medium uppercase tracking-[0.04em] transition-colors",
        scope === value
          ? "border-foreground text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </button>
  );

  return (
    <>
      <PageContainer>
        <div className="flex flex-col gap-[12px]">
          <PageTitle>Datasets</PageTitle>
          <p className="max-w-2xl text-base font-normal text-muted-foreground">
            Browse datasets—open downloads or gated access requests.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div
            className="flex flex-wrap gap-6"
            role="tablist"
            aria-label="Dataset scope"
          >
            {tabBtn("all", "All datasets")}
            {tabBtn(
              "downloaded",
              <>Downloaded ({MOCK_DOWNLOADED_DATASET_IDS.size})</>,
            )}
            {tabBtn(
              "pending",
              <>Pending requests ({MOCK_PENDING_REQUEST_DATASET_IDS.size})</>,
            )}
          </div>
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

        <div className="mt-6 space-y-4" role="tabpanel">
          <div className="relative max-w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-11 border-border-subtle bg-transparent pl-9"
              placeholder="Search datasets…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search datasets"
            />
          </div>

          <div className="overflow-hidden border-app-y border-border-subtle">
            <StickyTableProvider>
              <table className="min-w-[960px] w-full border-collapse text-base">
                <caption className="sr-only">
                  Dataset catalog with actions
                </caption>
                <thead>
                  <tr>
                    <th className={tableHeadStickyCellClasses()}>Dataset</th>
                    <th className={tableHeadStickyCellClasses("min-w-[220px]")}>
                      Description
                    </th>
                    <th className={tableHeadStickyCellClasses()}>Type</th>
                    <th className={tableHeadStickyCellClasses()}>Version</th>
                    <th className={tableHeadStickyCellClasses()}>License</th>
                    <th className={tableHeadStickyCellClasses("text-right")}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-app-b border-border-subtle"
                    >
                      <td className={td}>
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "flex size-10 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white",
                              row.avatarClassName,
                            )}
                          >
                            {row.initials}
                          </div>
                          <div className="min-w-0">
                            <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.04em] text-muted-foreground">
                              {row.providerName}
                            </p>
                            <p className="mt-1 font-medium text-foreground">
                              {row.datasetName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className={cn(td, "max-w-xs text-muted-foreground")}>
                        <span className="line-clamp-3">{row.description}</span>
                      </td>
                      <td className={td}>
                        <TypeBadge type={row.type} />
                      </td>
                      <td className={cn(td, "font-mono text-xs text-muted-foreground")}>
                        {row.version}
                      </td>
                      <td className={cn(td, "font-nav-eyebrow text-[10px] uppercase text-muted-foreground")}>
                        {row.license}
                      </td>
                      <td className={cn(td, "text-right")}>
                        {row.primaryAction === "download" ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                className="h-9 gap-1.5 border-border-subtle bg-transparent"
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
                              {(row.downloadFormats ?? [
                                row.fileFormat,
                              ]).map((fmt) => (
                                <DropdownMenuItem key={fmt}>
                                  {fmt}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            className="h-9 gap-1.5"
                            onClick={() => openRequest(row)}
                          >
                            <Lock className="size-3.5" />
                            Request access
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
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

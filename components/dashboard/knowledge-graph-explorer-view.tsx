"use client";

import * as React from "react";
import { PageContainer } from "@/components/dashboard/page-container";
import { EarlyReleaseBadge } from "@/components/ui/early-release-badge";
import { Label } from "@/components/ui/label";
import { PageTitle } from "@/components/ui/page-title";
import { SelectableCardGroup } from "@/components/ui/selectable-card-group";
import { cn } from "@/lib/utils";

const EXPLORER_SEGMENTS = [
  {
    id: "a",
    label: "Mapping concepts and skills to standards",
    description:
      "See concepts and skills students need to master in a given state for a standard.",
    query:
      "Which concepts and skills map to Common Core 8.EE.A.2 in my state?",
  },
  {
    id: "b",
    label: "Connecting prior learning to a standard",
    description:
      "See prior standards that a specific standard builds on top of.",
    query: "What standards does Common Core 8.EE.A.2 build on?",
  },
  {
    id: "c",
    label: "Adjusting content for another state",
    description:
      "See how content aligned to a state standard can be adapted for another state.",
    query:
      "How could Common Core 8.EE.A.2 be adapted for a different state standard?",
  },
  {
    id: "d",
    label: "Finding lessons addressing a standard",
    description:
      "See which Illustrative Math lessons support a specific standard.",
    query: "Which lessons address Common Core 8.EE.A.2?",
  },
  {
    id: "e",
    label: "Comparing standards across grade bands",
    description:
      "See how a concept develops across adjacent grades and related standards.",
    query:
      "How does the concept in Common Core 8.EE.A.2 connect to earlier and later grade bands?",
  },
  {
    id: "f",
    label: "Identifying prerequisite gaps",
    description:
      "See which prerequisite standards may be missing when students struggle with a target standard.",
    query:
      "Which prerequisite standards might explain gaps in readiness for Common Core 8.EE.A.2?",
  },
] as const;

type ExplorerSegmentId = (typeof EXPLORER_SEGMENTS)[number]["id"];

function ExplorerGraphCanvas({ query }: { query: string }) {
  return (
    <div className="relative -mx-6 min-h-0 w-[calc(100%+3rem)] max-w-none md:-mx-8 md:w-[calc(100%+4rem)]">
      <div
        className={cn(
          "relative min-h-[min(52vh,520px)] w-full px-8 py-4 pb-24 md:px-10 md:py-6 md:pb-28",
          "bg-background",
          "[background-image:radial-gradient(circle_at_center,rgba(0,0,0,0.13)_1px,transparent_1px)]",
          "[background-size:14px_14px]",
          "dark:[background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.11)_1px,transparent_1px)]",
        )}
      >
        <KnowledgeGraphIllustration />
        <FloatingGraphQuery query={query} />
      </div>
    </div>
  );
}

/** Static illustrative graph — placeholder until real graph data + renderer ship. */
function KnowledgeGraphIllustration() {
  const filterUid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const filterId = `explorer-graph-shadow-${filterUid}`;

  return (
    <svg
      viewBox="0 0 920 440"
      className="h-auto w-full max-h-[min(52vh,520px)] text-foreground"
      aria-hidden
    >
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="2"
            floodOpacity="0.08"
          />
        </filter>
      </defs>
      {/* edges */}
      <g
        stroke="var(--border-subtle, #e4e4e2)"
        strokeWidth="1.25"
        fill="none"
      >
        <path d="M 460 210 L 280 120" />
        <path d="M 460 210 L 640 115" />
        <path d="M 460 210 L 200 240" />
        <path d="M 460 210 L 720 230" />
        <path d="M 460 210 L 340 330" />
        <path d="M 460 210 L 580 340" />
        <path d="M 280 120 L 160 80" />
        <path d="M 640 115 L 780 95" />
      </g>
      <g
        className="fill-muted-foreground font-sans text-[10px] font-medium"
        textAnchor="middle"
      >
        <text x="360" y="155">
          builds towards
        </text>
        <text x="560" y="155">
          supports
        </text>
        <text x="320" y="210">
          has child
        </text>
        <text x="600" y="255">
          has Educational Alignment
        </text>
        <text x="400" y="290">
          supports
        </text>
        <text x="520" y="300">
          has child
        </text>
      </g>
      {/* nodes */}
      <g filter={`url(#${filterId})`}>
        {/* center — dark green */}
        <circle cx="460" cy="210" r="44" fill="#125B3A" />
        <text
          x="460"
          y="198"
          textAnchor="middle"
          className="fill-white font-sans text-[9px] font-semibold uppercase tracking-wide"
        >
          LOREM
        </text>
        <text
          x="460"
          y="214"
          textAnchor="middle"
          className="fill-white font-sans text-[8px] font-medium"
        >
          HSF-BF.B.3
        </text>
        <circle cx="460" cy="238" r="9" fill="#111" />
        <text
          x="460"
          y="241"
          textAnchor="middle"
          className="fill-white font-sans text-[8px] font-bold"
        >
          1
        </text>

        {/* black emphasis node */}
        <circle cx="280" cy="120" r="38" fill="var(--charcoal)" />
        <text
          x="280"
          y="112"
          textAnchor="middle"
          className="fill-white font-sans text-[8px] font-semibold uppercase"
        >
          LOREM
        </text>
        <text
          x="280"
          y="126"
          textAnchor="middle"
          className="fill-white font-sans text-[7px]"
        >
          HSF-BF.A.1
        </text>
        <circle cx="280" cy="142" r="8" fill="#333" />
        <text
          x="280"
          y="145"
          textAnchor="middle"
          className="fill-white font-sans text-[7px] font-bold"
        >
          1
        </text>

        {/* gray nodes */}
        {[
          { cx: 640, cy: 115, code: "8.EE.A.1" },
          { cx: 200, cy: 240, code: "7.RP.A.2" },
          { cx: 720, cy: 230, code: "6.NS.B.4" },
          { cx: 340, cy: 330, code: "5.OA.A.1" },
          { cx: 580, cy: 340, code: "4.NF.B.3" },
          { cx: 160, cy: 80, code: "3.MD.C.7" },
          { cx: 780, cy: 95, code: "2.G.A.1" },
        ].map((n) => (
          <g key={n.code}>
            <circle cx={n.cx} cy={n.cy} r="34" fill="#f4f4f3" stroke="#e0e0de" />
            <text
              x={n.cx}
              y={n.cy - 6}
              textAnchor="middle"
              className="fill-foreground font-sans text-[8px] font-semibold uppercase"
            >
              LOREM
            </text>
            <text
              x={n.cx}
              y={n.cy + 6}
              textAnchor="middle"
              className="fill-muted-foreground font-sans text-[7px]"
            >
              {n.code}
            </text>
            <circle cx={n.cx} cy={n.cy + 18} r="7" fill="#111" />
            <text
              x={n.cx}
              y={n.cy + 21}
              textAnchor="middle"
              className="fill-white font-sans text-[7px] font-bold"
            >
              1
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function FloatingGraphQuery({ query }: { query: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center px-4">
      <div
        className="pointer-events-auto max-w-[min(100%,560px)] rounded-full border-app border-border-subtle bg-background px-5 py-3 text-center shadow-md dark:shadow-black/20"
      >
        <p className="text-sm font-normal leading-snug text-foreground">{query}</p>
      </div>
    </div>
  );
}

export function KnowledgeGraphExplorerView() {
  const [selectedScenario, setSelectedScenario] =
    React.useState<ExplorerSegmentId>(EXPLORER_SEGMENTS[0].id);

  const activeScenario =
    EXPLORER_SEGMENTS.find((segment) => segment.id === selectedScenario) ??
    EXPLORER_SEGMENTS[0];

  return (
    <PageContainer>
      <div className="flex flex-col gap-[8px]">
        <PageTitle trailing={<EarlyReleaseBadge />}>
          Knowledge Graph Explorer
        </PageTitle>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Explore how standards, skills, and curriculum materials connect and
          build on each other.
        </p>
      </div>

      <div className="mt-8">
        <section
          aria-labelledby="explorer-segments-heading"
          className="flex flex-col gap-3"
        >
          <Label
            id="explorer-segments-heading"
            className="block"
          >
            Select a scenario
          </Label>
          <SelectableCardGroup
            aria-labelledby="explorer-segments-heading"
            scrollable
            indicatorStyle="none"
            value={selectedScenario}
            onValueChange={setSelectedScenario}
            options={EXPLORER_SEGMENTS.map((seg) => ({
              value: seg.id,
              label: seg.label,
              description: seg.description,
            }))}
          />
          <div className="mt-6">
            <ExplorerGraphCanvas query={activeScenario.query} />
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

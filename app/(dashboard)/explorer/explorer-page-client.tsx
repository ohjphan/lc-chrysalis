"use client";

import dynamic from "next/dynamic";
import { PageContainer } from "@/components/dashboard/page-container";

/**
 * Radix Tabs + Next SSR can disagree on auto-generated DOM ids on first paint.
 * `ssr: false` must live in a Client Component (not the Server `page.tsx`).
 */
const KnowledgeGraphExplorerView = dynamic(
  () =>
    import("@/components/dashboard/knowledge-graph-explorer-view").then(
      (mod) => mod.KnowledgeGraphExplorerView,
    ),
  {
    ssr: false,
    loading: () => (
      <PageContainer>
        <div className="flex flex-col gap-4">
          <div className="h-8 w-[min(100%,28rem)] animate-pulse rounded bg-nav-active/30" />
          <div className="h-4 w-full max-w-xl animate-pulse rounded bg-nav-active/25" />
          <div className="h-4 w-full max-w-lg animate-pulse rounded bg-nav-active/20" />
          <div className="mt-6 h-32 w-full animate-pulse rounded-lg bg-nav-active/20" />
        </div>
      </PageContainer>
    ),
  },
);

export function ExplorerPageClient() {
  return <KnowledgeGraphExplorerView />;
}

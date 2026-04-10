"use client";

import dynamic from "next/dynamic";
import { PageContainer } from "@/components/dashboard/page-container";
import { SimpleRingLoader } from "@/components/ui/loading-indicators";

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
        <div
          className="flex min-h-[min(60vh,28rem)] min-w-0 flex-col items-center justify-center py-12"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <SimpleRingLoader size="lg" />
        </div>
      </PageContainer>
    ),
  },
);

export function ExplorerPageClient() {
  return <KnowledgeGraphExplorerView />;
}

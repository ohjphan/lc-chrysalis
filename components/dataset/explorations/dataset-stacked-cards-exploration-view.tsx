import { DATASET_COLLECTION_MOCK } from "@/lib/dataset/collection-mock";
import {
  CollectionGatedPill,
  CollectionProductPill,
  CollectionProviderAvatar,
  MetaPill,
} from "@/components/dataset/explorations/collection-presentational";
import { DatasetExplorationShell } from "@/components/dataset/explorations/exploration-shell";

export function DatasetStackedCardsExplorationView() {
  return (
    <DatasetExplorationShell directionLabel="Stacked cards">
      <div className="flex flex-col gap-4">
        {DATASET_COLLECTION_MOCK.map((c) => (
          <article
            key={c.id}
            className="rounded-[var(--radius-md)] border-app border-border-subtle bg-sidebar px-5 py-5 dark:bg-field-bg md:px-6 md:py-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-app-b border-border-subtle pb-4">
              <div className="flex min-w-0 items-center gap-3">
                <CollectionProviderAvatar collection={c} className="size-10" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{c.providerName}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <h2 className="font-page-h3 text-heading dark:text-foreground">
                      {c.collectionName}
                    </h2>
                    {c.gated ? <CollectionGatedPill /> : null}
                  </div>
                </div>
              </div>
              <CollectionProductPill product={c.product} />
            </div>
            <p className="mt-4 text-base font-normal leading-relaxed text-muted-foreground">
              {c.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <MetaPill>Grade {c.gradeRange}</MetaPill>
              <MetaPill>
                {c.datasetCount} dataset{c.datasetCount === 1 ? "" : "s"}
              </MetaPill>
            </div>
          </article>
        ))}
      </div>
    </DatasetExplorationShell>
  );
}

import { DATASET_COLLECTION_MOCK } from "@/lib/dataset/collection-mock";
import {
  CollectionGatedPill,
  CollectionProductPill,
  CollectionProviderAvatar,
  datasetProductLabel,
} from "@/components/dataset/explorations/collection-presentational";
import { DatasetExplorationShell } from "@/components/dataset/explorations/exploration-shell";
import { StickyTableProvider } from "@/components/dashboard/sticky-table-provider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DatasetTableExplorationView() {
  return (
    <DatasetExplorationShell directionLabel="Table">
      <StickyTableProvider className="rounded-[var(--radius-md)] border-app border-border-subtle">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="min-w-[12rem]">Provider</TableHead>
              <TableHead className="min-w-[14rem]">Collection</TableHead>
              <TableHead className="whitespace-nowrap">Product</TableHead>
              <TableHead className="whitespace-nowrap">Grade range</TableHead>
              <TableHead className="whitespace-nowrap text-right">
                Datasets
              </TableHead>
              <TableHead className="min-w-[18rem]">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DATASET_COLLECTION_MOCK.map((c) => (
              <TableRow key={c.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <CollectionProviderAvatar collection={c} />
                    <span className="font-medium text-foreground">
                      {c.providerName}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-foreground">
                      {c.collectionName}
                    </span>
                    {c.gated ? <CollectionGatedPill /> : null}
                  </div>
                </TableCell>
                <TableCell>
                  <span title={datasetProductLabel(c.product)}>
                    <CollectionProductPill product={c.product} />
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {c.gradeRange}
                </TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">
                  {c.datasetCount}
                </TableCell>
                <TableCell>
                  <p
                    className="line-clamp-2 max-w-xl text-muted-foreground"
                    title={c.description}
                  >
                    {c.description}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StickyTableProvider>
    </DatasetExplorationShell>
  );
}

import { StickyTableProvider } from "@/components/dashboard/sticky-table-provider";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DEMO_ROWS = [
  { name: "Alpha dataset", status: "Ready", updated: "Mar 12, 2026" },
  { name: "Beta evaluators", status: "Processing", updated: "Mar 11, 2026" },
  { name: "Gamma exports", status: "Ready", updated: "Mar 9, 2026" },
  { name: "Delta content graph", status: "Queued", updated: "Mar 7, 2026" },
  { name: "Epsilon reports", status: "Ready", updated: "Mar 5, 2026" },
];

export function TableView() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">Table</h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Data tables use{" "}
          <code className="font-mono text-sm text-foreground">Table</code>,{" "}
          <code className="font-mono text-sm text-foreground">TableHeader</code>,{" "}
          <code className="font-mono text-sm text-foreground">TableBody</code>,{" "}
          <code className="font-mono text-sm text-foreground">TableRow</code>,{" "}
          <code className="font-mono text-sm text-foreground">TableHead</code>, and{" "}
          <code className="font-mono text-sm text-foreground">TableCell</code> from{" "}
          <code className="font-mono text-sm text-foreground">
            components/ui/table.tsx
          </code>
          . Sticky headers use{" "}
          <code className="font-mono text-sm text-foreground">
            tableHeadStickyCellClasses
          </code>{" "}
          via <code className="font-mono text-sm text-foreground">TableHead</code>.
          Wrap wide tables in{" "}
          <code className="font-mono text-sm text-foreground">
            StickyTableProvider
          </code>{" "}
          (
          <code className="font-mono text-sm text-foreground">
            components/dashboard/sticky-table-provider.tsx
          </code>
          ) and an outer{" "}
          <code className="font-mono text-sm text-foreground">
            overflow-hidden border-app-t border-border-subtle
          </code>{" "}
          shell so horizontal scroll stays predictable.
        </p>
      </div>

      <div className="space-y-10">
        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Option 1: Borders
            </h3>
          </div>
          <div className="overflow-hidden border-app-t border-border-subtle bg-transparent">
            <StickyTableProvider>
              <Table className="min-w-[640px]">
                <TableCaption className="sr-only">
                  Example datasets: name, status, last updated
                </TableCaption>
                <TableHeader>
                  <TableRow className="border-0 hover:bg-transparent">
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Last updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DEMO_ROWS.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="font-parabolica font-[550] text-foreground">
                        {row.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.status}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {row.updated}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StickyTableProvider>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Option 2: Borderless
            </h3>
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              Uses alternating white and light beige rows without internal borders.
            </p>
          </div>
          <div className="overflow-hidden bg-transparent">
            <StickyTableProvider>
              <Table className="min-w-[640px]">
                <TableCaption className="sr-only">
                  Borderless example datasets: name, status, last updated
                </TableCaption>
                <TableHeader>
                  <TableRow className="border-0 bg-background hover:bg-background">
                    <TableHead className="border-0 bg-background">Name</TableHead>
                    <TableHead className="border-0 bg-background">Status</TableHead>
                    <TableHead className="border-0 bg-background text-right">
                      Last updated
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DEMO_ROWS.map((row, index) => (
                    <TableRow
                      key={row.name}
                      className={
                        index % 2 === 0
                          ? "border-0 bg-sidebar hover:bg-sidebar"
                          : "border-0 bg-background hover:bg-background"
                      }
                    >
                      <TableCell className="border-0 font-parabolica font-[550] text-foreground">
                        {row.name}
                      </TableCell>
                      <TableCell className="border-0 text-muted-foreground">
                        {row.status}
                      </TableCell>
                      <TableCell className="border-0 text-right text-muted-foreground">
                        {row.updated}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StickyTableProvider>
          </div>
        </section>
      </div>
    </div>
  );
}

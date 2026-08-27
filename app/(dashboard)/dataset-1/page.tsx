import type { Metadata } from "next";
import { DatasetTableExplorationView } from "@/components/dataset/explorations/dataset-table-exploration-view";

export const metadata: Metadata = {
  title: "Datasets · Table exploration",
  description:
    "Developer exploration: dataset collections in a dense table layout.",
};

export default function Dataset1Page() {
  return <DatasetTableExplorationView />;
}

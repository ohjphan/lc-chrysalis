import type { Metadata } from "next";
import { DatasetGridExplorationView } from "@/components/dataset/explorations/dataset-grid-exploration-view";

export const metadata: Metadata = {
  title: "Datasets · Grid exploration",
  description:
    "Developer exploration: dataset collections in a responsive card grid.",
};

export default function Dataset3Page() {
  return <DatasetGridExplorationView />;
}

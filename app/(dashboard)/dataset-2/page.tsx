import type { Metadata } from "next";
import { DatasetStackedCardsExplorationView } from "@/components/dataset/explorations/dataset-stacked-cards-exploration-view";

export const metadata: Metadata = {
  title: "Datasets · Stacked cards exploration",
  description:
    "Developer exploration: dataset collections as full-width stacked cards.",
};

export default function Dataset2Page() {
  return <DatasetStackedCardsExplorationView />;
}

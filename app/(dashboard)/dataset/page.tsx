import type { Metadata } from "next";
import { DatasetsView } from "@/components/dashboard/datasets-view";

export const metadata: Metadata = {
  title: "Datasets",
};

export default function DatasetPage() {
  return <DatasetsView />;
}
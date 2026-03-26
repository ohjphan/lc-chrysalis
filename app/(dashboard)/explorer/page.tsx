import type { Metadata } from "next";
import { ExplorerPageClient } from "./explorer-page-client";

export const metadata: Metadata = {
  title: "Knowledge Graph Explorer",
  description:
    "Explore standards relationships in the knowledge graph. Early release preview.",
};

export default function ExplorerPage() {
  return <ExplorerPageClient />;
}

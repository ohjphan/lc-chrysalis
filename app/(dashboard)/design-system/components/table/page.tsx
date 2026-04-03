import type { Metadata } from "next";
import { TableView } from "@/components/design-system/component-pages/table-view";

export const metadata: Metadata = {
  title: "Table",
};

export default function DesignSystemTablePage() {
  return <TableView />;
}

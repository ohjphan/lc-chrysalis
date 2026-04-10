import type { Metadata } from "next";
import { PaginationView } from "@/components/design-system/component-pages/pagination-view";

export const metadata: Metadata = {
  title: "Pagination",
};

export default function DesignSystemPaginationPage() {
  return <PaginationView />;
}

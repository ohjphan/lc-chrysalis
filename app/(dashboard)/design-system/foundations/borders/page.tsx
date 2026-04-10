import type { Metadata } from "next";
import { FoundationsBordersView } from "@/components/design-system/foundations-borders-view";

export const metadata: Metadata = {
  title: "Borders",
};

export default function DesignSystemFoundationsBordersPage() {
  return <FoundationsBordersView />;
}

import type { Metadata } from "next";
import { FoundationsView } from "@/components/design-system/foundations-view";

export const metadata: Metadata = {
  title: "Foundations",
};

export default function FoundationsPage() {
  return <FoundationsView />;
}

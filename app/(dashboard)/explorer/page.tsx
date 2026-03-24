import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export const metadata: Metadata = {
  title: "Explorer",
};

export default function ExplorerPage() {
  return (
    <PlaceholderPage
      title="Explorer"
      description="Browse graph structures and evaluator assets. This page is a placeholder for upcoming explorer tooling."
    />
  );
}

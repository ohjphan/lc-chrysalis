import type { Metadata } from "next";
import { FoundationsColorView } from "@/components/design-system/foundations-color-view";

export const metadata: Metadata = {
  title: "Color",
};

export default function DesignSystemFoundationsColorPage() {
  return <FoundationsColorView />;
}

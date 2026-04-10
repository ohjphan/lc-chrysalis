import type { Metadata } from "next";
import { CalloutsView } from "@/components/design-system/component-pages/callouts-view";

export const metadata: Metadata = {
  title: "Page Notifications",
};

export default function DesignSystemCalloutsPage() {
  return <CalloutsView />;
}

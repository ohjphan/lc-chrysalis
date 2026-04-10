import type { Metadata } from "next";
import { DropdownView } from "@/components/design-system/component-pages/dropdown-view";

export const metadata: Metadata = {
  title: "Menu",
};

export default function DesignSystemDropdownPage() {
  return <DropdownView />;
}

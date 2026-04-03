import type { Metadata } from "next";
import { FieldsView } from "@/components/design-system/component-pages/fields-view";

export const metadata: Metadata = {
  title: "Fields",
};

export default function DesignSystemFieldsPage() {
  return <FieldsView />;
}

import type { Metadata } from "next";
import { SelectableCardGroupView } from "@/components/design-system/component-pages/selectable-card-group-view";

export const metadata: Metadata = {
  title: "Selectable cards",
};

export default function DesignSystemSelectableCardsPage() {
  return <SelectableCardGroupView />;
}

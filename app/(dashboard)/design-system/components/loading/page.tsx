import type { Metadata } from "next";
import { LoadingView } from "@/components/design-system/component-pages/loading-view";

export const metadata: Metadata = {
  title: "Loading Indicator",
};

export default function DesignSystemLoadingPage() {
  return <LoadingView />;
}

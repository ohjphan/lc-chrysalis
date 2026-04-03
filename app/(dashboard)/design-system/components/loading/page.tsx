import type { Metadata } from "next";
import { LoadingView } from "@/components/design-system/component-pages/loading-view";

export const metadata: Metadata = {
  title: "Loading",
};

export default function DesignSystemLoadingPage() {
  return <LoadingView />;
}

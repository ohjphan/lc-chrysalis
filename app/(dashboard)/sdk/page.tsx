import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export const metadata: Metadata = {
  title: "SDK",
};

export default function SdkPage() {
  return (
    <PlaceholderPage
      title="SDK"
      description="SDK integration guides and quickstarts are coming soon. In the meantime, use API keys and the playground to explore evaluator workflows."
    />
  );
}

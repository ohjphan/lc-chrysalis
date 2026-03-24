import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export const metadata: Metadata = {
  title: "Playground",
};

export default function PlaygroundPage() {
  return (
    <PlaceholderPage
      title="Playground"
      description="Try API calls and inspect responses in a safe sandbox. This route is a UI stub until the playground is wired up."
    />
  );
}

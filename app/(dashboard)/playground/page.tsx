import type { Metadata } from "next";
import { PlaygroundView } from "@/components/dashboard/playground-view";

export const metadata: Metadata = {
  title: "Evaluator Playground",
};

export default function PlaygroundPage() {
  return <PlaygroundView />;
}

import type { Metadata } from "next";
import { EvaluatorsView } from "@/components/dashboard/evaluators-view";

export const metadata: Metadata = {
  title: "Evaluator",
};

export default function EvaluatorsPage() {
  return <EvaluatorsView />;
}

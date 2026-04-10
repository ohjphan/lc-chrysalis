import type { Metadata } from "next";
import { ErrorPagePreview } from "@/components/dashboard/error-page-preview";

export const metadata: Metadata = {
  title: "Error page",
};

export default function ErrorPage() {
  return <ErrorPagePreview />;
}

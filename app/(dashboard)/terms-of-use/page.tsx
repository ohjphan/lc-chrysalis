import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export const metadata: Metadata = {
  title: "Terms of use",
};

export default function TermsPage() {
  return (
    <PlaceholderPage
      title="Terms of use"
      description="Placeholder for terms of use."
    />
  );
}

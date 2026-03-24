import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export const metadata: Metadata = {
  title: "Organization",
};

export default function OrganizationPage() {
  return (
    <PlaceholderPage
      title="Organization"
      description="Manage organization profile, domains, and billing contacts. Stub route for UI exploration."
    />
  );
}

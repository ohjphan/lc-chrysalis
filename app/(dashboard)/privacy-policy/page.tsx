import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export const metadata: Metadata = {
  title: "Privacy policy",
};

export default function PrivacyPolicyPage() {
  return (
    <PlaceholderPage
      title="Privacy policy"
      description="Placeholder for your privacy policy copy."
    />
  );
}

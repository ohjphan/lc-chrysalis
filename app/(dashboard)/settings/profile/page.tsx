import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfileSettingsPage() {
  return (
    <PlaceholderPage
      title="Profile settings"
      description="Update your name, email visibility, and security preferences."
    />
  );
}

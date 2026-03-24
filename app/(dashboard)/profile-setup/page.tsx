import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export const metadata: Metadata = {
  title: "Profile setup",
};

export default function ProfileSetupPage() {
  return (
    <PlaceholderPage
      title="Profile setup"
      description="Complete your profile to finish onboarding. This route is a UI placeholder."
    />
  );
}

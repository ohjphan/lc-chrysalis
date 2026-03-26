import type { Metadata } from "next";
import { ProfileSetupView } from "@/components/dashboard/profile-setup-view";

export const metadata: Metadata = {
  title: "Profile setup",
};

export default function ProfileSetupPage() {
  return <ProfileSetupView />;
}

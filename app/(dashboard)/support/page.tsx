import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export const metadata: Metadata = {
  title: "Support",
};

export default function SupportPage() {
  return (
    <PlaceholderPage
      title="Support"
      description="Get help from the Learning Commons team. This is a UI placeholder — link your ticketing system when ready."
    />
  );
}

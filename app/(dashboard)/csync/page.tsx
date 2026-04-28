import type { Metadata } from "next";
import { CsyncView } from "@/components/dashboard/csync-view";

export const metadata: Metadata = {
  title: "Csync",
};

export default function CsyncPage() {
  return <CsyncView />;
}

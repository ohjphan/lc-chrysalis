import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { defaultSubjectSlug } from "@/lib/dataset/collection-subject-index";

export const metadata: Metadata = {
  title: "Datasets · Split view exploration",
  description:
    "Developer exploration: dataset collections grouped by subject with detail pages.",
};

export default function Dataset4Page() {
  const slug = defaultSubjectSlug();
  if (!slug) {
    redirect("/dataset");
  }
  redirect(`/dataset-4/${slug}`);
}

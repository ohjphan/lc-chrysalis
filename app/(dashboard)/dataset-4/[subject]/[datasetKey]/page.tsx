import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DatasetSplitDetailExplorationView } from "@/components/dataset/explorations/dataset-split-detail-view";
import {
  generateStaticDatasetDetailParams,
  getDatasetDetailEntry,
} from "@/lib/dataset/collection-subject-index";
import { isSubjectSlug } from "@/lib/dataset/subject-slugs";

export function generateStaticParams() {
  return generateStaticDatasetDetailParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; datasetKey: string }>;
}): Promise<Metadata> {
  const { subject, datasetKey } = await params;
  if (!isSubjectSlug(subject)) {
    return { title: "Dataset" };
  }
  const entry = getDatasetDetailEntry(subject, datasetKey);
  if (!entry) {
    return { title: "Dataset" };
  }
  return {
    title: `${entry.child.title} · ${entry.collection.providerName}`,
    description: entry.child.description,
  };
}

export default async function Dataset4DetailPage({
  params,
}: {
  params: Promise<{ subject: string; datasetKey: string }>;
}) {
  const { subject: subjectParam, datasetKey } = await params;
  if (!isSubjectSlug(subjectParam)) {
    notFound();
  }
  const entry = getDatasetDetailEntry(subjectParam, datasetKey);
  if (!entry) {
    notFound();
  }

  return (
    <DatasetSplitDetailExplorationView subject={subjectParam} entry={entry} />
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DatasetSplitSubjectListView } from "@/components/dataset/explorations/dataset-split-subject-list-view";
import {
  generateStaticSubjectParams,
  getEntriesForSubject,
} from "@/lib/dataset/collection-subject-index";
import { isSubjectSlug, subjectLabel } from "@/lib/dataset/subject-slugs";

export function generateStaticParams() {
  return generateStaticSubjectParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  if (!isSubjectSlug(subject)) {
    return { title: "Subject" };
  }
  return {
    title: `${subjectLabel(subject)} · Split view`,
    description: `Dataset collections for ${subjectLabel(subject)} (exploration).`,
  };
}

export default async function Dataset4SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectParam } = await params;
  if (!isSubjectSlug(subjectParam)) {
    notFound();
  }
  if (getEntriesForSubject(subjectParam).length === 0) {
    notFound();
  }

  return <DatasetSplitSubjectListView subject={subjectParam} />;
}

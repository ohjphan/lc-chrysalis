import {
  DATASET_COLLECTION_MOCK,
  resolveCollectionDetail,
  type CollectionChildDataset,
  type DatasetCollection,
} from "@/lib/dataset/collection-mock";
import {
  type SubjectSlug,
  SUBJECT_NAV_ORDER,
  subjectLabel,
} from "@/lib/dataset/subject-slugs";

export type DatasetSubjectEntry = {
  collection: DatasetCollection;
  child: CollectionChildDataset;
  routeKey: string;
};

export function encodeDatasetRouteKey(
  collectionId: string,
  childId: string,
): string {
  return `${collectionId}__${childId}`;
}

export function parseDatasetRouteKey(
  key: string,
): { collectionId: string; childId: string } | null {
  const idx = key.indexOf("__");
  if (idx <= 0 || idx >= key.length - 2) return null;
  return {
    collectionId: key.slice(0, idx),
    childId: key.slice(idx + 2),
  };
}

export function getEntriesForSubject(subject: SubjectSlug): DatasetSubjectEntry[] {
  const out: DatasetSubjectEntry[] = [];
  for (const c of DATASET_COLLECTION_MOCK) {
    const detail = resolveCollectionDetail(c);
    for (const child of detail.childDatasets) {
      if (child.subject === subject) {
        out.push({
          collection: c,
          child,
          routeKey: encodeDatasetRouteKey(c.id, child.id),
        });
      }
    }
  }
  return out;
}

export type ResolvedDatasetSubjectEntry = DatasetSubjectEntry & {
  detail: ReturnType<typeof resolveCollectionDetail>;
};

export function getDatasetDetailEntry(
  subject: SubjectSlug,
  routeKey: string,
): ResolvedDatasetSubjectEntry | null {
  const parsed = parseDatasetRouteKey(routeKey);
  if (!parsed) return null;
  const c = DATASET_COLLECTION_MOCK.find((x) => x.id === parsed.collectionId);
  if (!c) return null;
  const detail = resolveCollectionDetail(c);
  const child = detail.childDatasets.find((ch) => ch.id === parsed.childId);
  if (!child || child.subject !== subject) return null;
  return { collection: c, child, routeKey, detail };
}

export function defaultSubjectSlug(): SubjectSlug | null {
  for (const slug of SUBJECT_NAV_ORDER) {
    if (getEntriesForSubject(slug).length > 0) return slug;
  }
  return null;
}

export function getSubjectsWithDatasetCounts(): {
  slug: SubjectSlug;
  label: string;
  count: number;
}[] {
  return SUBJECT_NAV_ORDER.map((slug) => ({
    slug,
    label: subjectLabel(slug),
    count: getEntriesForSubject(slug).length,
  })).filter((x) => x.count > 0);
}

export function generateStaticSubjectParams(): { subject: string }[] {
  return getSubjectsWithDatasetCounts().map(({ slug }) => ({ subject: slug }));
}

export function generateStaticDatasetDetailParams(): {
  subject: string;
  datasetKey: string;
}[] {
  const out: { subject: string; datasetKey: string }[] = [];
  for (const slug of SUBJECT_NAV_ORDER) {
    for (const e of getEntriesForSubject(slug)) {
      out.push({ subject: slug, datasetKey: e.routeKey });
    }
  }
  return out;
}

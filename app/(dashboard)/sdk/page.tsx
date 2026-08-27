import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/dashboard/page-container";
import { PageTitle } from "@/components/ui/page-title";
import { SUPPORT_DOCS_URL } from "@/lib/support-links";

export const metadata: Metadata = {
  title: "SDK",
};

const EVALUATORS_DOCS = `${SUPPORT_DOCS_URL}/evaluators`;
const KNOWLEDGE_GRAPH_DOCS = `${SUPPORT_DOCS_URL}/knowledge-graph`;
const EVALUATORS_SDK_README =
  "https://github.com/learning-commons-org/evaluators/blob/main/sdks/typescript/README.md";

export default function SdkPage() {
  return (
    <PageContainer>
      <div className="max-w-2xl space-y-6">
        <PageTitle>SDK &amp; integration docs</PageTitle>
        <p className="text-base text-muted-foreground">
          Use the public docs and TypeScript SDK README to integrate Evaluators
          and Knowledge Graph. In-app quickstarts for this dashboard are coming
          later—start with the links below and API keys when you are ready to
          call live endpoints.
        </p>
        <ul className="space-y-3 text-sm">
          <li>
            <a
              href={EVALUATORS_DOCS}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
            >
              Evaluators documentation
            </a>
          </li>
          <li>
            <a
              href={KNOWLEDGE_GRAPH_DOCS}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
            >
              Knowledge Graph documentation
            </a>
          </li>
          <li>
            <a
              href={EVALUATORS_SDK_README}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
            >
              Evaluators TypeScript SDK (GitHub README)
            </a>
          </li>
          <li>
            <Link
              href="/api-keys"
              className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
            >
              Create API keys
            </Link>
          </li>
          <li>
            <Link
              href="/demos"
              className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
            >
              Interactive demos
            </Link>
          </li>
        </ul>
      </div>
    </PageContainer>
  );
}

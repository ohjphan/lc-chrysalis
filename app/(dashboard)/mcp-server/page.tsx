import type { Metadata } from "next";
import Link from "next/link";
import { McpHttpEndpointField } from "@/components/dashboard/mcp-http-endpoint-field";
import { PageContainer } from "@/components/dashboard/page-container";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PageTitle } from "@/components/ui/page-title";

export const metadata: Metadata = {
  title: "MCP server",
};

export default function McpServerPage() {
  return (
    <PageContainer>
      <div className="flex flex-wrap items-center gap-3">
        <PageTitle>MCP server</PageTitle>
        <span className="inline-flex items-center rounded-full border-app border-border-subtle bg-accent-green-muted px-2.5 py-0.5 font-nav-eyebrow text-[11px] font-medium uppercase text-accent-green">
          Early release
        </span>
      </div>
      <div className="mt-8 max-w-2xl space-y-10">
        <section className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-2">
            <h2 className="font-page-h2">Connect your app</h2>
            <p className="text-base font-normal text-muted-foreground">
              Use this URL to connect your app to the MCP server.
            </p>
          </div>
          <div className="stack-field">
            <Label htmlFor="mcp-http-endpoint">HTTP endpoint</Label>
            <McpHttpEndpointField />
          </div>
        </section>

        <section className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-2">
            <h2 className="font-page-h2">Authenticate</h2>
            <p className="text-base font-normal text-muted-foreground">
              If you don&apos;t have an API key, create one now to authenticate your
              app.
            </p>
          </div>
          <div>
            <Button variant="secondary" className="h-10 px-4" asChild>
              <Link href="/api-keys">Get a key</Link>
            </Button>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

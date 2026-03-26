import type { Metadata } from "next";
import Link from "next/link";
import { McpHttpEndpointField } from "@/components/dashboard/mcp-http-endpoint-field";
import { PageContainer } from "@/components/dashboard/page-container";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { EarlyReleaseBadge } from "@/components/ui/early-release-badge";
import { PageTitle } from "@/components/ui/page-title";

export const metadata: Metadata = {
  title: "MCP server",
};

export default function McpServerPage() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-[8px]">
        <div className="flex flex-wrap items-center gap-3">
          <PageTitle>MCP server</PageTitle>
          <EarlyReleaseBadge />
        </div>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Connect to the Learning Commons MCP server with an API key.
        </p>
      </div>
      <div className="mt-10 max-w-2xl">
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-[8px]">
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

        <section className="mt-10 flex flex-col gap-[12px] border-app-t border-border-subtle pt-10">
          <div className="flex flex-col gap-[8px]">
            <h2 className="font-page-h2">Authenticate</h2>
            <p className="text-base font-normal text-muted-foreground">
              If you don&apos;t have an API key, create one now to authenticate your
              app.
            </p>
          </div>
          <div>
            <Button variant="primary" asChild>
              <Link href="/api-keys">Get a key</Link>
            </Button>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

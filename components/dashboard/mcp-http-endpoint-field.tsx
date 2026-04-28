"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { MaterialSymbol } from "@/components/ui/material-symbols";
import { MCP_HTTP_ENDPOINT_URL } from "@/lib/mcp-server";

export function McpHttpEndpointField() {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(MCP_HTTP_ENDPOINT_URL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex h-[length:var(--control-height)] w-full max-w-xl items-center gap-2 rounded-md border-app border-border-subtle bg-field-bg pl-3.5 pr-1.5 focus-within:ring-2 focus-within:ring-border-subtle focus-within:ring-offset-2 focus-within:ring-offset-background">
      <input
        id="mcp-http-endpoint"
        readOnly
        value={MCP_HTTP_ENDPOINT_URL}
        aria-label="MCP HTTP endpoint URL"
        className="min-w-0 flex-1 border-0 bg-transparent text-base font-normal text-foreground outline-none focus:outline-none"
      />
      <Button
        type="button"
        variant="secondary"
        size="embed"
        className="shrink-0"
        onClick={copy}
      >
        <MaterialSymbol icon="content_copy" className="size-4" aria-hidden />
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}

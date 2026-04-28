"use client";

import * as React from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import { CreateApiKeyDialog } from "@/components/dashboard/create-api-key-dialog";
import { PageContainer } from "@/components/dashboard/page-container";
import { StickyTableProvider } from "@/components/dashboard/sticky-table-provider";
import { Button } from "@/components/ui/button";
import { ColorBadge } from "@/components/ui/color-badge";
import { Empty } from "@/components/ui/empty";
import { EarlyReleaseBadge } from "@/components/ui/early-release-badge";
import { PageTitle } from "@/components/ui/page-title";
import { tableHeadStickyCellClasses } from "@/lib/table-styles";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type KeyRow = {
  id: string;
  name: string;
  masked: string;
  createdByName: string;
  createdByEmail: string;
  created: string;
  lastUsed: string;
  disabled: boolean;
};

const CURRENT_USER_IS_ADMIN = true;

function maskedFromFullSecret(fullSecret: string): string {
  const tail = fullSecret.slice(-4);
  return `lc_live_••••••••${tail}`;
}

export function ApiKeysView() {
  const [rows, setRows] = React.useState<KeyRow[]>([]);
  const [createKeyOpen, setCreateKeyOpen] = React.useState(false);

  function appendKeyFromDialog(payload: {
    name: string;
    fullSecret: string;
  }) {
    setRows((r) => {
      const n = r.length + 1;
      return [
        ...r,
        {
          id: String(n),
          name: payload.name,
          masked: maskedFromFullSecret(payload.fullSecret),
          createdByName: "You",
          createdByEmail: "you@magicschool.edu",
          created: new Date().toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          lastUsed: "Never",
          disabled: false,
        },
      ];
    });
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-[8px]">
          <PageTitle trailing={<EarlyReleaseBadge />}>API keys</PageTitle>
          <p className="max-w-xl text-base font-normal text-muted-foreground">
            Use the API to access standards, learning components, and learning
            progressions in Knowledge Graph and to connect to the MCP server.
          </p>
        </div>
        <Button
          type="button"
          variant="primary"
          className="h-10 shrink-0 gap-2 px-4"
          onClick={() => setCreateKeyOpen(true)}
        >
          <Plus className="size-4" />
          Create new key
        </Button>
      </div>

      <CreateApiKeyDialog
        open={createKeyOpen}
        onOpenChange={setCreateKeyOpen}
        onCreated={appendKeyFromDialog}
      />

      {rows.length === 0 ? (
        <div className="mt-10 w-full rounded-lg border-app border-border-subtle">
          <Empty
            icon={
              <img
                src="/scene-computer-finished.svg"
                alt=""
                className="h-auto w-[141.5px] max-w-full"
                aria-hidden
              />
            }
            title="There are no keys"
            description="Create a key to authenticate requests to Learning Commons APIs."
            action={
              <Button type="button" variant="primary" onClick={() => setCreateKeyOpen(true)}>
                <Plus className="size-4" />
                Create key
              </Button>
            }
            className="py-20"
            iconContainerClassName="size-auto rounded-none border-0 bg-transparent p-0"
          />
        </div>
      ) : (
        <div className="mt-10 overflow-hidden bg-transparent">
          <StickyTableProvider>
            <table className="min-w-[900px] w-full border-collapse text-base">
              <caption className="sr-only">
                API keys: masked secret, creator, dates, actions
              </caption>
              <thead>
                <tr>
                  <th className={tableHeadStickyCellClasses()}>Key</th>
                  <th className={tableHeadStickyCellClasses()}>Created by</th>
                  <th className={tableHeadStickyCellClasses()}>Created</th>
                  <th className={tableHeadStickyCellClasses()}>Last used</th>
                  {CURRENT_USER_IS_ADMIN ? (
                    <th className={tableHeadStickyCellClasses("w-12 text-right")} />
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      "border-app-b border-[color:var(--nav-active)] [&>td]:align-middle",
                      row.disabled && "opacity-60",
                    )}
                  >
                    <td className="px-4 py-8">
                      <div className="flex flex-wrap items-center gap-2">
                        <div>
                          <p className="line-clamp-2 font-parabolica text-base font-[550] text-foreground">
                            {row.name}
                          </p>
                          <p className="mt-1 font-mono text-base font-normal text-gray-4">
                            {row.masked}
                          </p>
                        </div>
                        {row.disabled ? (
                          <ColorBadge variant="beige">Disabled</ColorBadge>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-4 py-8">
                      <p className="text-base font-normal text-gray-4">
                        {row.createdByName}
                      </p>
                      <p className="mt-1 text-base font-normal lowercase text-gray-4">
                        {row.createdByEmail}
                      </p>
                    </td>
                    <td className="px-4 py-8 text-muted-foreground">
                      {row.created}
                    </td>
                    <td className="px-4 py-8 text-muted-foreground">
                      {row.lastUsed}
                    </td>
                    {CURRENT_USER_IS_ADMIN ? (
                      <td className="px-4 py-8 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-9 hover:bg-nav-active data-[state=open]:bg-nav-active dark:hover:bg-nav-link-active dark:data-[state=open]:bg-nav-link-active"
                              aria-label="Row actions"
                            >
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onSelect={() =>
                                setRows((prev) =>
                                  prev.map((k) =>
                                    k.id === row.id
                                      ? { ...k, disabled: !k.disabled }
                                      : k,
                                  ),
                                )
                              }
                            >
                              {row.disabled ? "Re-enable key" : "Disable key"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive data-[highlighted]:text-destructive"
                              onSelect={() =>
                                setRows((prev) =>
                                  prev.filter((k) => k.id !== row.id),
                                )
                              }
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </StickyTableProvider>
        </div>
      )}
    </PageContainer>
  );
}

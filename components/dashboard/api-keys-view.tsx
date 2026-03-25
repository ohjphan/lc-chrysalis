"use client";

import * as React from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import { CreateApiKeyDialog } from "@/components/dashboard/create-api-key-dialog";
import { PageContainer } from "@/components/dashboard/page-container";
import { StickyTableProvider } from "@/components/dashboard/sticky-table-provider";
import { Button } from "@/components/ui/button";
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

const SEED: KeyRow[] = [
  {
    id: "1",
    name: "Production",
    masked: "lc_live_••••••••8f3a",
    createdByName: "Sam Rivera",
    createdByEmail: "sam@magicschool.edu",
    created: "Mar 12, 2025",
    lastUsed: "2 hours ago",
    disabled: false,
  },
  {
    id: "2",
    name: "Staging",
    masked: "lc_test_••••••••91bc",
    createdByName: "Jessica Phan",
    createdByEmail: "jphan@magicschool.edu",
    created: "Feb 3, 2025",
    lastUsed: "Never",
    disabled: true,
  },
];

function maskedFromFullSecret(fullSecret: string): string {
  const tail = fullSecret.slice(-4);
  return `lc_live_••••••••${tail}`;
}

export function ApiKeysView() {
  const [rows, setRows] = React.useState<KeyRow[]>(SEED);
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
        <div className="flex flex-col gap-[12px]">
          <PageTitle>API keys</PageTitle>
          <p className="max-w-xl text-base font-normal text-muted-foreground">
            Authenticate requests to Learning Commons APIs.
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

      <div className="mt-10 overflow-hidden border-app-y border-border-subtle bg-transparent">
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
                    "border-app-b border-border-subtle",
                    row.disabled && "opacity-60",
                  )}
                >
                  <td className="px-4 py-8 align-top">
                    <div className="flex flex-wrap items-center gap-2">
                      <div>
                        <p className="font-nav-eyebrow text-[11px] font-medium uppercase tracking-[0.04em] text-muted-foreground">
                          {row.name}
                        </p>
                        <p className="mt-1 font-mono text-base font-normal text-foreground">
                          {row.masked}
                        </p>
                      </div>
                      {row.disabled ? (
                        <span className="inline-flex rounded-full border-app border-border-subtle bg-nav-active px-2 py-0.5 font-nav-eyebrow text-[10px] font-medium uppercase text-muted-foreground">
                          Disabled
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-8 align-top">
                    <p className="font-nav-eyebrow text-[11px] font-medium uppercase tracking-[0.04em] text-foreground">
                      {row.createdByName}
                    </p>
                    <p className="mt-1 text-base font-normal lowercase text-muted-foreground">
                      {row.createdByEmail}
                    </p>
                  </td>
                  <td className="px-4 py-8 align-top text-muted-foreground">
                    {row.created}
                  </td>
                  <td className="px-4 py-8 align-top text-muted-foreground">
                    {row.lastUsed}
                  </td>
                  {CURRENT_USER_IS_ADMIN ? (
                    <td className="px-4 py-8 text-right align-top">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-9"
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
                            className="text-destructive focus:text-destructive"
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
    </PageContainer>
  );
}

"use client";

import * as React from "react";
import {
  ArrowDown,
  ArrowUp,
  MoreHorizontal,
  Plus,
  Search,
  UserPlus,
} from "lucide-react";
import { PageContainer } from "@/components/dashboard/page-container";
import { StickyTableProvider } from "@/components/dashboard/sticky-table-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

type Status = "active" | "pending";

type Member = {
  id: string;
  name: string;
  email: string;
  status: Status;
  joined: string;
};

const MOCK_MEMBERS: Member[] = [
  {
    id: "1",
    name: "Jessica Phan",
    email: "jessica@example.com",
    status: "active",
    joined: "Mar 1, 2024",
  },
  {
    id: "2",
    name: "Alex Rivera",
    email: "alex@example.com",
    status: "pending",
    joined: "—",
  },
  {
    id: "3",
    name: "Sam Okonkwo",
    email: "sam@example.com",
    status: "active",
    joined: "Jan 18, 2024",
  },
  {
    id: "4",
    name: "Taylor Chen",
    email: "taylor@example.com",
    status: "pending",
    joined: "—",
  },
  {
    id: "5",
    name: "Jordan Lee",
    email: "jordan@example.com",
    status: "active",
    joined: "Nov 4, 2023",
  },
];

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 font-nav-eyebrow text-[11px] font-medium uppercase",
        status === "active"
          ? "bg-accent-green-muted text-accent-green"
          : "bg-nav-active text-muted-foreground",
      )}
    >
      {status}
    </span>
  );
}

export function TeamMembersView() {
  const [query, setQuery] = React.useState("");
  const [statusSort, setStatusSort] = React.useState<"asc" | "desc">("asc");

  const members = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = MOCK_MEMBERS.filter(
      (m) =>
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q),
    );
    const rank = (s: Status) => (s === "active" ? 0 : 1);
    list = [...list].sort((a, b) =>
      statusSort === "asc"
        ? rank(a.status) - rank(b.status)
        : rank(b.status) - rank(a.status),
    );
    return list;
  }, [query, statusSort]);

  return (
    <PageContainer>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-[12px]">
          <PageTitle>Team members</PageTitle>
          <p className="max-w-xl text-base font-normal text-muted-foreground">
            Invite colleagues and manage access to this organization.
          </p>
        </div>
        <Button type="button" variant="primary" className="shrink-0 gap-2">
          <UserPlus className="size-4" />
          Invite member
        </Button>
      </div>

      <div className="relative mt-8 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search by name or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search members"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border-app border-border-subtle bg-sidebar">
        <StickyTableProvider>
          <table className="min-w-[800px] w-full border-collapse text-base">
            <thead>
              <tr>
                <th className={tableHeadStickyCellClasses()}>Name</th>
                <th className={tableHeadStickyCellClasses()}>Email</th>
                <th className={tableHeadStickyCellClasses()}>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 hover:bg-nav-link-active"
                    onClick={() =>
                      setStatusSort((s) => (s === "asc" ? "desc" : "asc"))
                    }
                    aria-sort={
                      statusSort === "asc" ? "ascending" : "descending"
                    }
                  >
                    Status
                    {statusSort === "asc" ? (
                      <ArrowUp className="size-3.5" />
                    ) : (
                      <ArrowDown className="size-3.5" />
                    )}
                  </button>
                </th>
                <th className={tableHeadStickyCellClasses()}>Join date</th>
                <th className={tableHeadStickyCellClasses("text-right")}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => (
                <tr
                  key={m.id}
                  className={cn(
                    i % 2 === 0 ? "bg-sidebar" : "bg-surface/60",
                  )}
                >
                  <td className="border-app-b border-border-subtle px-3 py-3 font-medium">
                    {m.name}
                  </td>
                  <td className="border-app-b border-border-subtle px-3 py-3 text-muted-foreground">
                    {m.email}
                  </td>
                  <td className="border-app-b border-border-subtle px-3 py-3">
                    <StatusBadge status={m.status} />
                  </td>
                  <td className="border-app-b border-border-subtle px-3 py-3 text-muted-foreground">
                    {m.joined}
                  </td>
                  <td className="border-app-b border-border-subtle px-3 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Actions">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {m.status === "pending" ? (
                          <DropdownMenuItem>
                            <Plus className="size-4" />
                            Reinvite
                          </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Remove member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </StickyTableProvider>
      </div>
    </PageContainer>
  );
}

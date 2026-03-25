"use client";

import * as React from "react";
import {
  ArrowDown,
  ArrowUp,
  Ban,
  MoreHorizontal,
  Plus,
  Search,
  UserPlus,
} from "lucide-react";
import { PageContainer } from "@/components/dashboard/page-container";
import { StickyTableProvider } from "@/components/dashboard/sticky-table-provider";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PageTitle } from "@/components/ui/page-title";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { tableHeadStickyCellClasses } from "@/lib/table-styles";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type MemberRow =
  | {
      kind: "member";
      id: string;
      name: string;
      email: string;
      joined: string;
    }
  | {
      kind: "invite";
      id: string;
      email: string;
      invitedAt: string;
      role: string;
    };

const SEED_ROWS: MemberRow[] = [
  {
    kind: "member",
    id: "1",
    name: "Jessica Phan",
    email: "jessica@example.com",
    joined: "Mar 1, 2024",
  },
  {
    kind: "invite",
    id: "2",
    email: "alex@example.com",
    invitedAt: "Mar 18, 2025",
    role: "Member",
  },
  {
    kind: "member",
    id: "3",
    name: "Sam Okonkwo",
    email: "sam@example.com",
    joined: "Jan 18, 2024",
  },
  {
    kind: "invite",
    id: "4",
    email: "taylor@example.com",
    invitedAt: "Mar 10, 2025",
    role: "Member",
  },
  {
    kind: "member",
    id: "5",
    name: "Jordan Lee",
    email: "jordan@example.com",
    joined: "Nov 4, 2023",
  },
  {
    kind: "invite",
    id: "6",
    email: "casey@example.com",
    invitedAt: "Mar 22, 2025",
    role: "Admin",
  },
];

type StatusFilter = "all" | "active" | "pending";

function rowStatus(row: MemberRow): "active" | "pending" {
  return row.kind === "member" ? "active" : "pending";
}

function StatusBadge({ status }: { status: "active" | "pending" }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 font-nav-eyebrow text-[11px] font-medium uppercase",
        status === "active"
          ? "bg-accent-green-muted text-accent-green"
          : "bg-nav-active text-muted-foreground",
      )}
    >
      {status === "active" ? "Active" : "Pending"}
    </span>
  );
}

function selectClassName() {
  return cn(
    "flex h-10 w-full rounded-md border-app border-border-subtle bg-field-bg px-3 py-2 text-base font-normal text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  );
}

let inviteIdSeq = 100;

export function TeamMembersView() {
  const [rows, setRows] = React.useState<MemberRow[]>(SEED_ROWS);
  const [query, setQuery] = React.useState("");
  const [statusSort, setStatusSort] = React.useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("all");

  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [inviteRole, setInviteRole] = React.useState("Member");

  const [removeTarget, setRemoveTarget] = React.useState<MemberRow | null>(
    null,
  );

  const pendingCount = rows.filter((r) => r.kind === "invite").length;

  const members = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = rows.filter((r) => {
      if (statusFilter === "active" && r.kind !== "member") return false;
      if (statusFilter === "pending" && r.kind !== "invite") return false;
      if (!q) return true;
      if (r.kind === "member") {
        return (
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q)
        );
      }
      return r.email.toLowerCase().includes(q);
    });
    const rank = (s: "active" | "pending") => (s === "active" ? 0 : 1);
    list = [...list].sort((a, b) =>
      statusSort === "asc"
        ? rank(rowStatus(a)) - rank(rowStatus(b))
        : rank(rowStatus(b)) - rank(rowStatus(a)),
    );
    return list;
  }, [query, statusSort, statusFilter, rows]);

  function openInvite() {
    setInviteEmail("");
    setInviteRole("Member");
    setInviteOpen(true);
  }

  function submitInvite(e: React.FormEvent) {
    e.preventDefault();
    const email = inviteEmail.trim();
    if (!email) return;
    inviteIdSeq += 1;
    const today = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date());
    setRows((prev) => [
      ...prev,
      {
        kind: "invite",
        id: `invite-${inviteIdSeq}`,
        email,
        invitedAt: today,
        role: inviteRole,
      },
    ]);
    setInviteOpen(false);
  }

  function cancelInvite(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  function reinvite(id: string) {
    const today = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date());
    setRows((prev) =>
      prev.map((r) =>
        r.kind === "invite" && r.id === id ? { ...r, invitedAt: today } : r,
      ),
    );
  }

  function confirmRemove() {
    if (!removeTarget || removeTarget.kind !== "member") return;
    setRows((prev) => prev.filter((r) => r.id !== removeTarget.id));
    setRemoveTarget(null);
  }

  return (
    <PageContainer className="py-0">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-[12px]">
          <PageTitle>Team members</PageTitle>
          <p className="max-w-xl text-base font-normal text-muted-foreground">
            Invite colleagues and manage access to this organization.
            {pendingCount > 0 ? (
              <>
                {" "}
                <span className="text-foreground">
                  {pendingCount} pending invitation
                  {pendingCount === 1 ? "" : "s"}.
                </span>
              </>
            ) : null}
          </p>
        </div>
        <Button
          type="button"
          variant="primary"
          className="shrink-0 gap-2"
          onClick={openInvite}
        >
          <UserPlus className="size-4" />
          Invite member
        </Button>
      </div>

      <div
        className="mt-6 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by status"
      >
        {(
          [
            { key: "all" as const, label: "All" },
            { key: "active" as const, label: "Active" },
            { key: "pending" as const, label: "Pending" },
          ] as const
        ).map(({ key, label }) => (
          <Button
            key={key}
            type="button"
            size="sm"
            variant={statusFilter === key ? "primary" : "secondary"}
            className="rounded-full"
            onClick={() => setStatusFilter(key)}
          >
            {label}
          </Button>
        ))}
      </div>

      <div className="relative mt-6 max-w-md">
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
                <th className={tableHeadStickyCellClasses()}>Role</th>
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
                <th className={tableHeadStickyCellClasses()}>Join / invited</th>
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
                    {m.kind === "member" ? (
                      m.name
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="border-app-b border-border-subtle px-3 py-3 text-muted-foreground">
                    {m.email}
                  </td>
                  <td className="border-app-b border-border-subtle px-3 py-3 text-muted-foreground">
                    {m.kind === "member" ? "Member" : m.role}
                  </td>
                  <td className="border-app-b border-border-subtle px-3 py-3">
                    <StatusBadge status={rowStatus(m)} />
                  </td>
                  <td className="border-app-b border-border-subtle px-3 py-3 text-muted-foreground">
                    {m.kind === "member" ? m.joined : m.invitedAt}
                  </td>
                  <td className="border-app-b border-border-subtle px-3 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Actions">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {m.kind === "invite" ? (
                          <>
                            <DropdownMenuItem onClick={() => reinvite(m.id)}>
                              <Plus className="size-4" />
                              Reinvite
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => cancelInvite(m.id)}
                            >
                              <Ban className="size-4" />
                              Cancel invitation
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setRemoveTarget(m)}
                          >
                            Remove member
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </StickyTableProvider>
      </div>

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <form onSubmit={submitInvite}>
            <DialogHeader>
              <DialogTitle>Invite member</DialogTitle>
              <DialogDescription>
                Send a mock invitation. No email is delivered in this demo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 px-6 pb-6 pt-2">
              <Field id="invite-email" label="Email">
                <Input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="name@organization.com"
                  autoComplete="email"
                  required
                />
              </Field>
              <div className="stack-field">
                <label
                  htmlFor="invite-role"
                  className="text-base font-medium text-[#242423] dark:text-foreground"
                >
                  Role
                </label>
                <select
                  id="invite-role"
                  className={selectClassName()}
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                >
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <DialogFooter className="border-border-subtle dark:border-zinc-700/80">
              <Button
                type="button"
                variant="secondary"
                className="dark:border-zinc-600 dark:bg-transparent dark:text-zinc-200 dark:hover:bg-zinc-800"
                onClick={() => setInviteOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Send invite
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={removeTarget !== null}
        onOpenChange={(open) => !open && setRemoveTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove member</DialogTitle>
            <DialogDescription>
              {removeTarget?.kind === "member"
                ? `${removeTarget.name} will lose access to this organization in this demo.`
                : null}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="border-border-subtle dark:border-zinc-700/80">
            <Button
              type="button"
              variant="secondary"
              className="dark:border-zinc-600 dark:bg-transparent dark:text-zinc-200 dark:hover:bg-zinc-800"
              onClick={() => setRemoveTarget(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={confirmRemove}
            >
              Remove member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}

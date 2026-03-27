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
import { ColorBadge } from "@/components/ui/color-badge";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { brandAvatarClassesForId } from "@/lib/brand-avatar-colors";
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
  {
    kind: "member",
    id: "m5",
    name: "Priya Sharma",
    email: "priya@example.com",
    joined: "Feb 12, 2024",
  },
  {
    kind: "member",
    id: "m6",
    name: "Marcus Chen",
    email: "marcus@example.com",
    joined: "Aug 3, 2023",
  },
  {
    kind: "member",
    id: "m7",
    name: "Elena Vasquez",
    email: "elena@example.com",
    joined: "Sep 20, 2024",
  },
  {
    kind: "member",
    id: "m8",
    name: "Noah Andersen",
    email: "noah@example.com",
    joined: "Jul 7, 2024",
  },
  {
    kind: "member",
    id: "m9",
    name: "Amara Osei",
    email: "amara@example.com",
    joined: "Dec 1, 2023",
  },
];

function rowStatus(row: MemberRow): "active" | "pending" {
  return row.kind === "member" ? "active" : "pending";
}

function StatusBadge({ status }: { status: "active" | "pending" }) {
  if (status === "active") {
    return <ColorBadge variant="green">Active</ColorBadge>;
  }
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 font-nav-eyebrow text-[11px] font-medium uppercase",
        "bg-nav-active text-muted-foreground",
      )}
    >
      Pending
    </span>
  );
}

function selectClassName() {
  return cn(
    "flex h-10 w-full rounded-md border-app border-border-subtle bg-field-bg px-3 py-2 text-base font-normal text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  );
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) {
    const w = parts[0];
    if (!w) return "?";
    return w.length >= 2
      ? w.slice(0, 2).toUpperCase()
      : (w[0] + w[0]).toUpperCase();
  }
  const first = parts[0][0] ?? "";
  const last = parts[parts.length - 1][0] ?? "";
  return (first + last).toUpperCase();
}

function initialsFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  const cleaned = local.replace(/[^a-zA-Z0-9]/g, "");
  if (cleaned.length >= 2) return cleaned.slice(0, 2).toUpperCase();
  if (cleaned.length === 1) return (cleaned[0] + cleaned[0]).toUpperCase();
  return "??";
}

function memberRowInitials(row: MemberRow): string {
  return row.kind === "member"
    ? initialsFromName(row.name)
    : initialsFromEmail(row.email);
}

function memberRowDisplayName(row: MemberRow): string {
  if (row.kind === "member") return row.name;
  const local = row.email.split("@")[0];
  return local || row.email;
}

let inviteIdSeq = 100;

export function TeamMembersView() {
  const [rows, setRows] = React.useState<MemberRow[]>(SEED_ROWS);
  const [query, setQuery] = React.useState("");
  const [statusSort, setStatusSort] = React.useState<"asc" | "desc">("asc");

  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [inviteRole, setInviteRole] = React.useState("Member");

  const [removeTarget, setRemoveTarget] = React.useState<MemberRow | null>(
    null,
  );

  const members = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = rows.filter((r) => {
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
  }, [query, statusSort, rows]);

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
        <div className="flex flex-col gap-[8px]">
          <h2 className="font-page-h2 text-heading dark:text-foreground">
            Team members
          </h2>
          <p className="max-w-xl text-base font-normal text-muted-foreground">
            Invite colleagues and manage access to this organization.
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

      <div className="relative mt-6 w-full">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="w-full pl-9"
          placeholder="Search by name or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search members"
        />
      </div>

      <div className="mt-6 overflow-hidden border-app-t border-border-subtle bg-transparent">
        <StickyTableProvider>
          <table className="min-w-[720px] w-full border-collapse text-base">
            <thead>
              <tr>
                <th className={tableHeadStickyCellClasses()}>Member</th>
                <th className={tableHeadStickyCellClasses()}>Role</th>
                <th className={tableHeadStickyCellClasses()}>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 font-nav-eyebrow text-[11px] font-medium uppercase tracking-[0.04em] text-muted-foreground hover:bg-nav-link-active"
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
              {members.map((m) => {
                const { bgClass, textClass } = brandAvatarClassesForId(m.id);
                return (
                <tr
                  key={m.id}
                  className="border-app-b border-border-subtle [&>td]:align-middle"
                >
                  <td className="border-app-b border-border-subtle px-4 py-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold leading-none",
                          bgClass,
                          textClass,
                        )}
                      >
                        {memberRowInitials(m)}
                      </div>
                      <div className="min-w-0">
                        <p className="line-clamp-2 font-parabolica text-base font-[550] text-foreground">
                          {memberRowDisplayName(m)}
                        </p>
                        <p className="mt-1 text-base font-normal lowercase text-[#6A6A69]">
                          {m.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-app-b border-border-subtle px-4 py-6 text-muted-foreground">
                    {m.kind === "member" ? "Member" : m.role}
                  </td>
                  <td className="border-app-b border-border-subtle px-4 py-6">
                    <StatusBadge status={rowStatus(m)} />
                  </td>
                  <td className="border-app-b border-border-subtle px-4 py-6 text-muted-foreground">
                    {m.kind === "member" ? m.joined : m.invitedAt}
                  </td>
                  <td className="border-app-b border-border-subtle px-4 py-6 text-right">
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
                );
              })}
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
            <div className="grid gap-4 px-9 pb-9 pt-3">
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
            <DialogFooter>
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
          <DialogFooter>
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

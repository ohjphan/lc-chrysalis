import type { NavItem } from "@/lib/nav-config";

export const SETTINGS_NAV: NavItem[] = [
  { href: "/settings/profile", label: "Profile" },
  { href: "/settings/organization", label: "Organization" },
  { href: "/settings/members", label: "Team Members" },
] as const;

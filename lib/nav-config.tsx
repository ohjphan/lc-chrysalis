import type { LucideIcon } from "lucide-react";
import {
  Beaker,
  Compass,
  Database,
  Home,
  KeyRound,
  Layers,
  Palette,
  Server,
  UserCircle,
  UserPlus,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type NavGroup = {
  /** Section eyebrow in the sidebar; omit for the first block if no label is desired. */
  label?: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    items: [
      { href: "/", label: "Home", icon: Home },
      { href: "/dataset", label: "Datasets", icon: Database },
      { href: "/api-keys", label: "API keys", icon: KeyRound },
    ],
  },
  {
    label: "Evaluators",
    items: [{ href: "/playground", label: "Playground", icon: Beaker }],
  },
  {
    label: "Knowledge graph",
    items: [
      { href: "/explorer", label: "Explorer", icon: Compass },
      { href: "/mcp-server", label: "MCP server", icon: Server },
    ],
  },
  {
    label: "Design system",
    items: [
      { href: "/foundations", label: "Foundations", icon: Palette },
      { href: "/components", label: "Components", icon: Layers },
    ],
  },
  {
    label: "Misc",
    items: [
      { href: "/signup", label: "Sign up", icon: UserPlus },
      { href: "/profile-setup", label: "Profile setup", icon: UserCircle },
    ],
  },
];

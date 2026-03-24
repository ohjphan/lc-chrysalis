import type { LucideIcon } from "lucide-react";
import {
  Beaker,
  Compass,
  Database,
  Home,
  KeyRound,
  Layers,
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
  label: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      { href: "/api-keys", label: "API keys", icon: KeyRound },
      { href: "/dataset", label: "Dataset", icon: Database },
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
    label: "Misc",
    items: [
      { href: "/signup", label: "Sign up", icon: UserPlus },
      { href: "/profile-setup", label: "Profile setup", icon: UserCircle },
      { href: "/", label: "Landing", icon: Home },
      { href: "/components", label: "Components", icon: Layers },
    ],
  },
];

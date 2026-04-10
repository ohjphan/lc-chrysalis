export type NavItem = {
  href: string;
  label: string;
};

export type NavGroup = {
  /** Section eyebrow in the sidebar; omit for the first block if no label is desired. */
  label?: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    items: [
      { href: "/", label: "Home" },
      { href: "/dataset", label: "Datasets" },
      { href: "/api-keys", label: "API keys" },
    ],
  },
  {
    label: "Evaluators",
    items: [{ href: "/playground", label: "Playground" }],
  },
  {
    label: "Knowledge graph",
    items: [
      { href: "/explorer", label: "Explorer" },
      { href: "/mcp-server", label: "MCP server" },
    ],
  },
  {
    label: "More",
    items: [
      { href: "/design-system", label: "Design System" },
      { href: "/signup", label: "Sign up" },
      { href: "/profile-setup", label: "Profile setup" },
      { href: "/error-page", label: "Error Page" },
    ],
  },
];

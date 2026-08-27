import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  FileText,
  HelpCircle,
  ImageUp,
  Info,
  Key,
  LayoutGrid,
  Lock,
  Mail,
  Menu,
  Moon,
  MoreHorizontal,
  Plus,
  Search,
  Sun,
  UserPlus,
  Wrench,
  X,
} from "lucide-react";
import {
  GitHubMark,
  GoogleMark,
  LinkedInSolidIcon,
} from "@/components/ui/app-brand-icons";

const PRODUCT_ICONS: Array<{ name: string; Icon: LucideIcon }> = [
  { name: "Check", Icon: Check },
  { name: "X", Icon: X },
  { name: "ChevronDown", Icon: ChevronDown },
  { name: "ChevronLeft", Icon: ChevronLeft },
  { name: "ChevronRight", Icon: ChevronRight },
  { name: "Plus", Icon: Plus },
  { name: "Copy", Icon: Copy },
  { name: "Download", Icon: Download },
  { name: "Search", Icon: Search },
  { name: "Menu", Icon: Menu },
  { name: "MoreHorizontal", Icon: MoreHorizontal },
  { name: "ArrowLeft", Icon: ArrowLeft },
  { name: "ArrowUpRight", Icon: ArrowUpRight },
  { name: "ExternalLink", Icon: ExternalLink },
  { name: "FileText", Icon: FileText },
  { name: "HelpCircle", Icon: HelpCircle },
  { name: "Info", Icon: Info },
  { name: "AlertTriangle", Icon: AlertTriangle },
  { name: "Lock", Icon: Lock },
  { name: "Mail", Icon: Mail },
  { name: "Key", Icon: Key },
  { name: "LayoutGrid", Icon: LayoutGrid },
  { name: "UserPlus", Icon: UserPlus },
  { name: "Wrench", Icon: Wrench },
  { name: "ImageUp", Icon: ImageUp },
  { name: "Moon", Icon: Moon },
  { name: "Sun", Icon: Sun },
];

function IconTile({
  name,
  children,
  swatchClassName = "bg-background",
}: {
  name: string;
  children: ReactNode;
  swatchClassName?: string;
}) {
  return (
    <div className="rounded-md border-app border-border-subtle bg-background">
      <div
        className={`flex h-24 items-center justify-center rounded-t-md border-b border-border-subtle ${swatchClassName}`}
      >
        {children}
      </div>
      <div className="px-3 py-2">
        <p className="truncate font-mono text-xs text-muted-foreground">{name}</p>
      </div>
    </div>
  );
}

export function IconsView() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">Icons</h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Core icons used across the product. Product UI icons now use Google{" "}
          <code className="font-mono text-sm text-foreground">
            Material Symbols Rounded
          </code>{" "}
          with a default weight of{" "}
          <code className="font-mono text-sm text-foreground">300</code>. Stroke
          thickness is controlled by the{" "}
          <code className="font-mono text-sm text-foreground">weight</code> prop
          (and matching{" "}
          <code className="font-mono text-sm text-foreground">@font-face</code>{" "}
          files)—not by{" "}
          <code className="font-mono text-sm text-foreground">strokeWidth</code>{" "}
          (that Lucide prop is ignored here). Icons inherit{" "}
          <code className="font-mono text-sm text-foreground">currentColor</code>
          .
          Custom brand marks remain reserved for partner and auth surfaces.
        </p>
        <div className="flex max-w-xl flex-wrap items-end gap-8 rounded-md border-app border-border-subtle bg-surface px-4 py-4">
          <div className="flex flex-col items-center gap-2">
            <Search className="size-10 text-foreground" aria-hidden />
            <span className="text-center text-xs font-normal text-muted-foreground">
              Default (300)
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Search
              className="size-10 text-foreground"
              weight={400}
              aria-hidden
            />
            <span className="text-center text-xs font-normal text-muted-foreground">
              weight 400
            </span>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-[2px]">
          <h3 className="font-page-h3 text-heading dark:text-foreground">
            Brand icons
          </h3>
          <p className="max-w-2xl text-base font-normal text-muted-foreground">
            Custom marks used for third-party identity and external brand references.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <IconTile name="GoogleMark">
            <GoogleMark className="size-8" />
          </IconTile>
          <IconTile name="GitHubMark" swatchClassName="bg-charcoal text-white">
            <GitHubMark className="size-8" />
          </IconTile>
          <IconTile name="LinkedInSolidIcon" swatchClassName="bg-charcoal text-white">
            <LinkedInSolidIcon className="size-8" />
          </IconTile>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-[2px]">
          <h3 className="font-page-h3 text-heading dark:text-foreground">
            Product icons
          </h3>
          <p className="max-w-2xl text-base font-normal text-muted-foreground">
            Shared Material Symbols used for navigation, actions, feedback, and
            utility states in the app.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT_ICONS.map(({ name, Icon }) => (
            <IconTile key={name} name={name}>
              <Icon className="size-5 text-foreground" aria-hidden />
            </IconTile>
          ))}
        </div>
      </section>
    </div>
  );
}

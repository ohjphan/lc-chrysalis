import * as React from "react";
import { GitHubMark } from "@/components/ui/app-brand-icons";
import { cn } from "@/lib/utils";

const MATERIAL_SYMBOL_DEFAULT_WEIGHT = 400;
const MATERIAL_SYMBOL_DEFAULT_OPTICAL_SIZE = 24;
const MATERIAL_SYMBOL_SIZE_SCALE = 1.125;

const TAILWIND_SIZE_MAP: Record<string, string> = {
  "2.5": "0.625rem",
  "3": "0.75rem",
  "3.5": "0.875rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
  "14": "3.5rem",
  "16": "4rem",
};

const MATERIAL_SYMBOL_MAP = {
  AlertTriangle: "warning",
  ArrowDown: "arrow_downward",
  ArrowLeft: "arrow_back",
  ArrowUp: "arrow_upward",
  ArrowUpRight: "arrow_outward",
  Ban: "block",
  Check: "check",
  ChevronDown: "expand_more",
  ChevronLeft: "chevron_left",
  ChevronRight: "chevron_right",
  Copy: "content_copy",
  Download: "download",
  ExternalLink: "open_in_new",
  FileText: "article",
  HelpCircle: "help",
  ImageUp: "add_photo_alternate",
  Info: "info",
  Key: "key",
  LayoutGrid: "grid_view",
  Lock: "lock",
  Mail: "mail",
  Menu: "menu",
  Moon: "dark_mode",
  MoreHorizontal: "more_horiz",
  Plus: "add",
  Search: "search",
  Sun: "light_mode",
  Trash2: "delete",
  User: "person",
  UserPlus: "person_add",
  AccountCircle: "account_circle",
  Wrench: "build",
  X: "close",
} as const;

export type MaterialSymbolName = (typeof MATERIAL_SYMBOL_MAP)[keyof typeof MATERIAL_SYMBOL_MAP];

export type LucideProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> & {
  size?: number | string;
  color?: string;
  fill?: boolean;
  grade?: number;
  /**
   * Material Symbols axis (1–1000). Lighter (e.g. 300) for modal list rows, etc. Use with matching `@font-face` in `app/globals.css`.
   * @default 400
   */
  weight?: number;
  opticalSize?: number;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
};

export type LucideIcon = React.ForwardRefExoticComponent<
  LucideProps & React.RefAttributes<HTMLSpanElement>
>;

function extractSymbolSize(className?: string) {
  if (!className) return undefined;

  const arbitraryMatch = className.match(
    /(?:^|\s)(?:size|h|w|text)-\[(.+?)\](?=\s|$)/,
  );
  if (arbitraryMatch) return arbitraryMatch[1];

  const scaleMatch = className.match(
    /(?:^|\s)(?:size|h|w|text)-([0-9]+(?:\.[05])?)(?=\s|$)/,
  );
  if (scaleMatch) return TAILWIND_SIZE_MAP[scaleMatch[1]];

  return undefined;
}

function symbolVariationSettings({
  fill,
  grade,
  opticalSize,
  weight = MATERIAL_SYMBOL_DEFAULT_WEIGHT,
}: {
  fill: boolean;
  grade: number;
  opticalSize: number;
  weight?: number;
}) {
  return `"FILL" ${fill ? 1 : 0}, "wght" ${weight}, "GRAD" ${grade}, "opsz" ${opticalSize}`;
}

function scaleIconSize(size: string) {
  return `calc(${size} * ${MATERIAL_SYMBOL_SIZE_SCALE})`;
}

function MaterialSymbolBase(
  {
    icon,
    className,
    style,
    size,
    color,
    fill = false,
    grade = 0,
    weight = MATERIAL_SYMBOL_DEFAULT_WEIGHT,
    opticalSize = MATERIAL_SYMBOL_DEFAULT_OPTICAL_SIZE,
    strokeWidth,
    absoluteStrokeWidth,
    ...props
  }: LucideProps & { icon: MaterialSymbolName },
  ref: React.ForwardedRef<HTMLSpanElement>,
) {
  void strokeWidth;
  void absoluteStrokeWidth;

  const resolvedSize =
    typeof size === "number"
      ? `${size}px`
      : size ?? extractSymbolSize(className) ?? "1em";

  return (
    <span
      ref={ref}
      className={cn(
        "lc-material-symbol notranslate inline-flex shrink-0 items-center justify-center align-middle leading-none",
        className,
      )}
      style={{
        color,
        fontSize: scaleIconSize(resolvedSize),
        /* Pick correct static @font-face; pairs with "wght" in variation */
        fontWeight: weight,
        fontVariationSettings: symbolVariationSettings({
          fill,
          grade,
          opticalSize,
          weight,
        }),
        ...style,
      }}
      {...props}
    >
      {icon}
    </span>
  );
}

function createMaterialSymbol(
  displayName: keyof typeof MATERIAL_SYMBOL_MAP,
  icon: MaterialSymbolName,
) {
  const Component = React.forwardRef<HTMLSpanElement, LucideProps>(
    (props, ref) => <MaterialSymbolBase ref={ref} icon={icon} {...props} />,
  );

  Component.displayName = displayName;
  return Component;
}

export const MaterialSymbol = React.forwardRef<
  HTMLSpanElement,
  LucideProps & { icon: MaterialSymbolName }
>((props, ref) => <MaterialSymbolBase ref={ref} {...props} />);

MaterialSymbol.displayName = "MaterialSymbol";

export const AlertTriangle = createMaterialSymbol(
  "AlertTriangle",
  MATERIAL_SYMBOL_MAP.AlertTriangle,
);
export const ArrowDown = createMaterialSymbol(
  "ArrowDown",
  MATERIAL_SYMBOL_MAP.ArrowDown,
);
export const ArrowLeft = createMaterialSymbol(
  "ArrowLeft",
  MATERIAL_SYMBOL_MAP.ArrowLeft,
);
export const ArrowUp = createMaterialSymbol("ArrowUp", MATERIAL_SYMBOL_MAP.ArrowUp);
export const ArrowUpRight = createMaterialSymbol(
  "ArrowUpRight",
  MATERIAL_SYMBOL_MAP.ArrowUpRight,
);
export const Ban = createMaterialSymbol("Ban", MATERIAL_SYMBOL_MAP.Ban);
export const Check = createMaterialSymbol("Check", MATERIAL_SYMBOL_MAP.Check);
export const ChevronDown = createMaterialSymbol(
  "ChevronDown",
  MATERIAL_SYMBOL_MAP.ChevronDown,
);
export const ChevronLeft = createMaterialSymbol(
  "ChevronLeft",
  MATERIAL_SYMBOL_MAP.ChevronLeft,
);
export const ChevronRight = createMaterialSymbol(
  "ChevronRight",
  MATERIAL_SYMBOL_MAP.ChevronRight,
);
export const Copy = createMaterialSymbol("Copy", MATERIAL_SYMBOL_MAP.Copy);
export const Download = createMaterialSymbol(
  "Download",
  MATERIAL_SYMBOL_MAP.Download,
);
export const ExternalLink = createMaterialSymbol(
  "ExternalLink",
  MATERIAL_SYMBOL_MAP.ExternalLink,
);
export const FileText = createMaterialSymbol(
  "FileText",
  MATERIAL_SYMBOL_MAP.FileText,
);
export const HelpCircle = createMaterialSymbol(
  "HelpCircle",
  MATERIAL_SYMBOL_MAP.HelpCircle,
);
export const ImageUp = createMaterialSymbol(
  "ImageUp",
  MATERIAL_SYMBOL_MAP.ImageUp,
);
export const Info = createMaterialSymbol("Info", MATERIAL_SYMBOL_MAP.Info);
export const Key = createMaterialSymbol("Key", MATERIAL_SYMBOL_MAP.Key);
export const LayoutGrid = createMaterialSymbol(
  "LayoutGrid",
  MATERIAL_SYMBOL_MAP.LayoutGrid,
);
export const Lock = createMaterialSymbol("Lock", MATERIAL_SYMBOL_MAP.Lock);
export const Mail = createMaterialSymbol("Mail", MATERIAL_SYMBOL_MAP.Mail);
export const Menu = createMaterialSymbol("Menu", MATERIAL_SYMBOL_MAP.Menu);
export const Moon = createMaterialSymbol("Moon", MATERIAL_SYMBOL_MAP.Moon);
export const MoreHorizontal = createMaterialSymbol(
  "MoreHorizontal",
  MATERIAL_SYMBOL_MAP.MoreHorizontal,
);
export const Plus = createMaterialSymbol("Plus", MATERIAL_SYMBOL_MAP.Plus);
export const Search = createMaterialSymbol("Search", MATERIAL_SYMBOL_MAP.Search);
export const Sun = createMaterialSymbol("Sun", MATERIAL_SYMBOL_MAP.Sun);
export const Trash2 = createMaterialSymbol("Trash2", MATERIAL_SYMBOL_MAP.Trash2);
export const User = createMaterialSymbol("User", MATERIAL_SYMBOL_MAP.User);
export const UserPlus = createMaterialSymbol(
  "UserPlus",
  MATERIAL_SYMBOL_MAP.UserPlus,
);
export const AccountCircle = createMaterialSymbol(
  "AccountCircle",
  MATERIAL_SYMBOL_MAP.AccountCircle,
);
export const Wrench = createMaterialSymbol("Wrench", MATERIAL_SYMBOL_MAP.Wrench);
export const X = createMaterialSymbol("X", MATERIAL_SYMBOL_MAP.X);

export const Github = React.forwardRef<HTMLSpanElement, LucideProps>(
  ({ className, size, color, style, ...props }, ref) => {
    const resolvedSize =
      typeof size === "number"
        ? `${size}px`
        : size ?? extractSymbolSize(className) ?? "1em";

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex shrink-0 items-center justify-center align-middle leading-none",
          className,
        )}
        style={{
          color,
          fontSize: scaleIconSize(resolvedSize),
          ...style,
        }}
        {...props}
      >
        <GitHubMark className="size-[1em]" />
      </span>
    );
  },
);

Github.displayName = "Github";

export const MATERIAL_SYMBOL_COMPONENT_NAMES = Object.keys(
  MATERIAL_SYMBOL_MAP,
) as Array<keyof typeof MATERIAL_SYMBOL_MAP>;

declare module "lucide-react/dist/esm/lucide-react.js" {
  import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

  type Icon = ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>
  >;

  export const AlertCircle: Icon;
  export const Bookmark: Icon;
  export const CheckCircle2: Icon;
  export const GitBranch: Icon;
  export const Heart: Icon;
  export const Info: Icon;
  export const Share2: Icon;
  export const XCircle: Icon;
}

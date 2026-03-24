import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  optional?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, optional, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-base font-medium text-[#242423] dark:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
      {optional ? (
        <span className="ml-1 font-normal text-muted-foreground">(optional)</span>
      ) : null}
    </label>
  ),
);
Label.displayName = "Label";

export { Label };

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export interface FieldProps {
  id: string;
  label: string;
  description?: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactElement<{ id?: string }>;
}

export function Field({
  id,
  label,
  description,
  error,
  optional,
  className,
  children,
}: FieldProps) {
  const control = React.cloneElement(children, { id });
  return (
    <div className={cn("stack-field", className)}>
      <div className="space-y-1">
        <Label htmlFor={id} optional={optional}>
          {label}
        </Label>
        {description ? (
          <p className="text-base font-normal text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {control}
      {error ? <p className="text-base font-normal text-destructive">{error}</p> : null}
    </div>
  );
}

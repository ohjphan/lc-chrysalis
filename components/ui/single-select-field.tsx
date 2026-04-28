"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type SingleSelectFieldOption = {
  value: string;
  label: string;
};

export interface SingleSelectFieldProps {
  id?: string;
  value: string;
  onValueChange: (next: string) => void;
  options: SingleSelectFieldOption[];
  placeholder?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  disabled?: boolean;
  className?: string;
}

export function SingleSelectField({
  id,
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  ariaLabel,
  ariaLabelledBy,
  disabled = false,
  className,
}: SingleSelectFieldProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value],
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <div
          id={id}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-disabled={disabled || undefined}
          className={cn(
            "relative box-border flex min-h-[length:var(--control-height)] w-full items-center gap-2 rounded-md border-app border-border-subtle bg-field-bg px-3.5 pr-10 py-2.5 text-base font-normal text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-border-subtle focus:ring-offset-2 focus:ring-offset-background",
            disabled && "cursor-not-allowed opacity-50",
            !disabled && "cursor-pointer",
            className,
          )}
        >
          <span
            className={cn(
              "min-w-0 flex-1 truncate",
              selectedOption === null && "text-muted-foreground",
            )}
          >
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronDown
            className={cn(
              "pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-[var(--radix-dropdown-menu-trigger-width)] p-1"
      >
        <DropdownMenuPrimitive.RadioGroup
          value={value}
          onValueChange={onValueChange}
        >
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <DropdownMenuPrimitive.RadioItem
                key={option.value}
                value={option.value}
                className="relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-base font-normal outline-none transition-colors data-[highlighted]:bg-nav-active dark:data-[highlighted]:bg-nav-link-active data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded-full border-app border-border-subtle bg-background",
                    selected && "border-accent-green bg-accent-green",
                  )}
                  aria-hidden
                >
                  <span
                    className={cn(
                      "size-2 rounded-full transition-opacity",
                      selected ? "bg-white opacity-100" : "opacity-0",
                    )}
                  />
                </span>
                <span className="truncate">{option.label}</span>
              </DropdownMenuPrimitive.RadioItem>
            );
          })}
        </DropdownMenuPrimitive.RadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

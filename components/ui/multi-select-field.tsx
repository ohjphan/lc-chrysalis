"use client";

import * as React from "react";
import { ChevronDown, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type MultiSelectFieldOption = {
  value: string;
  label: string;
};

export interface MultiSelectFieldProps {
  id?: string;
  value: string[];
  onValueChange: (next: string[]) => void;
  options: MultiSelectFieldOption[];
  placeholder?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  disabled?: boolean;
  className?: string;
}

export function MultiSelectField({
  id,
  value,
  onValueChange,
  options,
  placeholder = "Select options",
  ariaLabel,
  ariaLabelledBy,
  disabled = false,
  className,
}: MultiSelectFieldProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOptions = React.useMemo(
    () => options.filter((option) => value.includes(option.value)),
    [options, value],
  );

  function toggleValue(nextValue: string) {
    if (value.includes(nextValue)) {
      onValueChange(value.filter((item) => item !== nextValue));
      return;
    }
    onValueChange([...value, nextValue]);
  }

  function removeValue(valueToRemove: string) {
    onValueChange(value.filter((item) => item !== valueToRemove));
  }

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
            "relative box-border flex min-h-[length:var(--control-height)] w-full items-center gap-2 rounded-md border-app border-border-subtle bg-field-bg pl-1.5 pr-10 py-1.5 text-base font-normal text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-border-subtle focus:ring-offset-2 focus:ring-offset-background",
            disabled && "cursor-not-allowed opacity-50",
            !disabled && "cursor-pointer",
            className,
          )}
        >
          <div
            className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5 pl-px"
            role={selectedOptions.length > 0 ? "list" : undefined}
            aria-labelledby={selectedOptions.length > 0 ? ariaLabelledBy : undefined}
          >
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option) => (
                <span
                  key={option.value}
                  role="listitem"
                  className="inline-flex items-center gap-1.5 rounded-[2px] border-app border-border-subtle bg-sidebar pl-2.5 pr-[6px] py-1 text-sm font-normal text-foreground"
                >
                  <span className="truncate">{option.label}</span>
                  <button
                    type="button"
                    className="rounded-[2px] p-0.5 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                    aria-label={`Remove ${option.label}`}
                    onPointerDown={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      removeValue(option.value);
                    }}
                  >
                    <X className="size-3.5" aria-hidden />
                  </button>
                </span>
              ))
            ) : (
              <span className="pl-1 text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronDown
            className={cn(
              "pointer-events-none absolute right-3 size-4 -translate-y-1/2 shrink-0 text-muted-foreground transition-transform duration-200",
              open && "rotate-180",
            )}
            style={{ top: "calc(var(--control-height) / 2)" }}
            aria-hidden
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[var(--radix-dropdown-menu-trigger-width)] p-1"
      >
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={value.includes(option.value)}
            onCheckedChange={() => toggleValue(option.value)}
            onSelect={(event) => event.preventDefault()}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

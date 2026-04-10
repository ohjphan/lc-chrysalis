"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const RADIO_OPTIONS = [
  { value: "product", label: "Product feedback" },
  { value: "bug", label: "Bug report" },
  { value: "question", label: "General question" },
] as const;

type RadioVariant = "green" | "darkGreen";

function RadioRow({
  id,
  name,
  label,
  checked,
  variant = "green",
  disabled = false,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  variant?: RadioVariant;
  disabled?: boolean;
  onChange: () => void;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-center gap-3",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
      )}
    >
      <input
        id={id}
        type="radio"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border-app border-border-subtle bg-background transition-[border-color,background-color]",
          !disabled && "peer-focus-visible:ring-2 peer-focus-visible:ring-border-subtle",
          checked &&
            (variant === "green"
              ? "border-accent-green bg-accent-green"
              : "border-charcoal bg-charcoal"),
        )}
        aria-hidden
      >
        <span
          className={cn(
            "size-2.5 -translate-y-[0.5px] rounded-full transition-opacity",
            checked && variant === "green" ? "bg-white" : "bg-accent-green",
            checked ? "opacity-100" : "opacity-0",
          )}
        />
      </span>
      <Label htmlFor={id}>{label}</Label>
    </label>
  );
}

export function RadioButtonsView() {
  const [selectedGreen, setSelectedGreen] =
    React.useState<(typeof RADIO_OPTIONS)[number]["value"]>("product");

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">
          Radio buttons
        </h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Use for single-select choices where users should choose exactly one
          option from a list.
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-[2px]">
          <h3 className="font-page-h3 text-heading dark:text-foreground">
            Default
          </h3>
        </div>
        <div
          className="max-w-md space-y-4"
          role="radiogroup"
          aria-label="Radio button example"
        >
          {RADIO_OPTIONS.map((option) => (
            <RadioRow
              key={option.value}
              id={`ds-radio-${option.value}`}
              name="design-system-radio"
              label={option.label}
              checked={selectedGreen === option.value}
              onChange={() => setSelectedGreen(option.value)}
            />
          ))}

          <RadioRow
            id="ds-radio-disabled"
            name="design-system-radio-disabled"
            label="Disabled"
            checked={false}
            disabled
            onChange={() => {}}
          />
        </div>
      </section>
    </div>
  );
}

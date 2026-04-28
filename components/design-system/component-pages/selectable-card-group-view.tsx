"use client";

import * as React from "react";
import { SelectableCardGroup } from "@/components/ui/selectable-card-group";

const BASIC_OPTIONS = [
  {
    value: "a",
    label: "Mapping concepts and skills to standards",
    description:
      "See concepts and skills students need to master in a given state for a standard.",
  },
  {
    value: "b",
    label: "Connecting prior learning to a standard",
    description:
      "See prior standards that a specific standard builds on top of.",
  },
  {
    value: "c",
    label: "Finding lessons addressing a standard",
    description:
      "See which lessons and materials support a specific standard.",
  },
] as const;

export function SelectableCardGroupView() {
  const [defaultLookValue, setDefaultLookValue] = React.useState<
    (typeof BASIC_OPTIONS)[number]["value"]
  >("a");
  const [legacyGrayValue, setLegacyGrayValue] = React.useState<
    (typeof BASIC_OPTIONS)[number]["value"]
  >("a");
  const [checkValue, setCheckValue] = React.useState<
    (typeof BASIC_OPTIONS)[number]["value"]
  >("a");
  const [radioValue, setRadioValue] = React.useState<
    (typeof BASIC_OPTIONS)[number]["value"]
  >("a");
  const [accentInsetValue, setAccentInsetValue] = React.useState<
    (typeof BASIC_OPTIONS)[number]["value"]
  >("a");

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">
          Selectable cards
        </h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Single-select grouped cards for longer option labels and richer
          descriptions than pills or tabs allow. The default is the modal-style
          green top bar, subtle border, and warm top stroke on unselected
          cards—no extra props. Pass{" "}
          <code className="rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">
            activeTopAccent=&#123;false&#125;
          </code>{" "}
          for the older Gray 5 border + 1px inset look (used in examples below
          that need that treatment).
        </p>
      </div>

      <div className="space-y-10">
        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Default: modal top accent
            </h3>
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              Out of the box: green top bar on the selected card, warm top on
              hover/focus when unselected, and only your options plus a11y. No
              <code className="mx-1 rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">
                greenInsetBorder
              </code>{" "}
              and no
              <code className="mx-1 rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">
                activeTopAccent
              </code>{" "}
              prop (default is
              <code className="mx-1 rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">
                true
              </code>
              ).
            </p>
          </div>
          <SelectableCardGroup
            aria-label="Selectable cards, default modal top accent"
            value={defaultLookValue}
            onValueChange={setDefaultLookValue}
            options={BASIC_OPTIONS}
            indicatorStyle="none"
          />
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Legacy: Gray 5 border and 1px inset
            </h3>
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              Selected cards use
              <code className="mx-1 rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">
                --gray-5
              </code>
              for the outer border and the inset,{" "}
              <code className="rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">
                bg-sidebar
              </code>{" "}
              for the fill, and no top bar. Pass{" "}
              <code className="rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">
                activeTopAccent=&#123;false&#125;
              </code>
              .
            </p>
          </div>
          <SelectableCardGroup
            aria-label="Selectable cards, legacy gray-inset look"
            value={legacyGrayValue}
            onValueChange={setLegacyGrayValue}
            options={BASIC_OPTIONS}
            indicatorStyle="none"
            activeTopAccent={false}
          />
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Option 1: Checkmark with circle
            </h3>
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              Stacked-card selection with the previous green circle checkmark
              treatment on the selected card. Selected state uses a{" "}
              <code className="rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">
                border-stroke
              </code>{" "}
              outer border in{" "}
              <code className="rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">
                #CCC9C6
              </code>{" "}
              and light beige fill, without the 1px inner inset.{" "}
              <code className="rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">
                innerInsetOnSelected=&#123;false&#125;
              </code>
              . Pass{" "}
              <code className="rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">
                selectedOuterBorderClassName
              </code>{" "}
              to set the color.
            </p>
          </div>
          <SelectableCardGroup
            aria-label="Selectable cards with checkmark indicator"
            value={checkValue}
            onValueChange={setCheckValue}
            options={BASIC_OPTIONS}
            indicatorStyle="check"
            activeTopAccent={false}
            innerInsetOnSelected={false}
            selectedOuterBorderClassName="border-[#CCC9C6]"
          />
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Option 2: Radio buttons
            </h3>
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              Stacked-card selection with visible radio controls on every card and
              the selected card using the radio-filled state. Same selected border
              and fill as Option 1 (outer border{" "}
              <code className="rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">
                #CCC9C6
              </code>
              ), no 1px inner inset,{" "}
              <code className="rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">
                innerInsetOnSelected=&#123;false&#125;
              </code>
              .
            </p>
          </div>
          <SelectableCardGroup
            aria-label="Selectable cards with radio indicator"
            value={radioValue}
            onValueChange={setRadioValue}
            options={BASIC_OPTIONS}
            indicatorStyle="radio"
            activeTopAccent={false}
            innerInsetOnSelected={false}
            selectedOuterBorderClassName="border-[#CCC9C6]"
          />
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Accent green border + 1px inset (exploration)
            </h3>
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              Set{" "}
              <code className="rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">
                greenInsetBorder
              </code>{" "}
              and{" "}
              <code className="rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">
                greenInsetBorderColor=&quot;accent-green&quot;
              </code>{" "}
              to swap the default Gray 5 for accent green on the border and
              inset. <code className="rounded bg-field-bg px-1 py-0.5 font-mono text-[13px] text-foreground">activeTopAccent=&#123;false&#125;</code> keeps the same layout as
              the legacy variant without the modal top bar.
            </p>
          </div>
          <SelectableCardGroup
            aria-label="Selectable cards with accent green inset border on selected"
            value={accentInsetValue}
            onValueChange={setAccentInsetValue}
            options={BASIC_OPTIONS}
            indicatorStyle="none"
            activeTopAccent={false}
            greenInsetBorder
            greenInsetBorderColor="accent-green"
          />
        </section>
      </div>
    </div>
  );
}

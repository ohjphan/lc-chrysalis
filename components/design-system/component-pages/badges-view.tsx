import {
  ColorBadge,
  SecondaryPaletteBadge,
} from "@/components/ui/color-badge";
import { BRAND_AVATAR_BADGES_FOR_DOCS } from "@/lib/brand-avatar-colors";

export function BadgesView() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">Tags</h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Color tags for status and labels, plus secondary palette swatches used
          for avatars and accents.
        </p>
      </div>

      <div className="space-y-10">
        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Primary
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <ColorBadge variant="gray">Gray</ColorBadge>
            <ColorBadge variant="green">Green</ColorBadge>
            <ColorBadge variant="yellow">Yellow</ColorBadge>
            <ColorBadge variant="pink">Red</ColorBadge>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Secondary
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {BRAND_AVATAR_BADGES_FOR_DOCS.filter(
              (swatch) =>
                swatch.label !== "Green" &&
                swatch.label !== "Yellow" &&
                swatch.label !== "Red" &&
                swatch.label !== "Dark purple",
            ).map((swatch) => (
              <SecondaryPaletteBadge key={swatch.hex} swatch={swatch} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

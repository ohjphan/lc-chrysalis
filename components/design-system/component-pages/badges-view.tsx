import {
  ColorBadge,
  SecondaryPaletteBadge,
} from "@/components/ui/color-badge";
import { BRAND_AVATAR_BADGES_FOR_DOCS } from "@/lib/brand-avatar-colors";

export function BadgesView() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">Badges</h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Color badges for status and labels, plus secondary palette swatches used
          for avatars and accents.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <ColorBadge variant="gray">Gray</ColorBadge>
        {BRAND_AVATAR_BADGES_FOR_DOCS.map((swatch) => (
          <SecondaryPaletteBadge key={swatch.hex} swatch={swatch} />
        ))}
      </div>
    </div>
  );
}

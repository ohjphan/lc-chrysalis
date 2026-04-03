import { LogomarkLoadingAnimation } from "@/components/design-system/logomark-loading-animation";

export function LoadingView() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">
          Loading
        </h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Sequence: diamond and square morphs with the rotating radial arc. The
          first fill uses{" "}
          <code className="font-mono text-sm text-foreground">accent-green</code>
          , then cycles through the secondary palette while skipping yellow and
          red (see{" "}
          <code className="font-mono text-sm text-foreground">
            BRAND_SECONDARY_PALETTE_HEX
          </code>
          ). Use{" "}
          <code className="font-mono text-sm text-foreground">size=&quot;sm&quot;</code>{" "}
          or{" "}
          <code className="font-mono text-sm text-foreground">size=&quot;md&quot;</code>{" "}
          without status text;{" "}
          <code className="font-mono text-sm text-foreground">size=&quot;lg&quot;</code>{" "}
          (default) includes the label.
        </p>
      </div>
      <div className="flex flex-wrap items-end gap-10 gap-y-8">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Small</span>
          <LogomarkLoadingAnimation size="sm" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Medium</span>
          <LogomarkLoadingAnimation size="md" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Large</span>
          <LogomarkLoadingAnimation size="lg" />
        </div>
      </div>
    </div>
  );
}

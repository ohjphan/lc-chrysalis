import { Callout } from "@/components/ui/callout";

export function CalloutsView() {
  return (
    <div className="space-y-10">
      <div className="space-y-8">
        <div className="flex flex-col gap-[8px]">
          <h2 className="font-page-h2 text-heading dark:text-foreground">
            Page Notifications
          </h2>
          <p className="max-w-2xl text-base font-normal text-muted-foreground">
            Inline notices with semantic variants: neutral context, success,
            warning, and destructive.
          </p>
        </div>
        <div className="flex flex-col gap-[8px]">
          <h3 className="font-page-h3 text-heading dark:text-foreground">
            Default
          </h3>
          <p className="max-w-2xl text-base font-normal text-muted-foreground">
            The default bordered treatment for the full semantic set.
          </p>
        </div>
        <div className="grid max-w-xl gap-3">
          <Callout
            variant="neutral"
            headline="Neutral"
            description="General updates and context for this screen or flow."
          />
          <Callout
            variant="success"
            headline="Success"
            description="Your changes were saved and are available everywhere."
          />
          <Callout
            variant="warning"
            headline="Warning"
            description="Review the details below before you continue-this may affect billing."
          />
          <Callout
            variant="destructive"
            headline="Something went wrong"
            description="We couldn't complete that action. Try again or contact support if it keeps happening."
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-lg font-medium text-foreground">Something went wrong</h2>
      <p className="max-w-md text-center text-sm text-muted-foreground">
        {error.digest
          ? "An error occurred. You can try again."
          : error.message || "An unexpected error occurred."}
      </p>
      <button
        type="button"
        className="rounded-md border border-border-subtle bg-field-bg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-nav-active"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}

"use client";

import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-full bg-background font-sans text-base font-normal text-foreground antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
          <h1 className="text-lg font-medium">Something went wrong</h1>
          <p className="max-w-md text-center text-sm text-muted-foreground">
            {error.message || "A critical error occurred in the application shell."}
          </p>
          <button
            type="button"
            className="rounded-md border-app border-border-subtle bg-field-bg px-4 py-2 text-sm font-medium transition-colors hover:bg-nav-active"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Helpful for debugging during development
    console.error("Global error boundary caught:", error);
  }, [error]);

  const message =
    typeof error?.message === "string" && error.message.trim()
      ? error.message
      : "Something went wrong while loading this page.";

  return (
    <main className="bg-base-cream">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-3xl border border-base-depth bg-base-light p-10">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 shrink-0 rounded-2xl border border-base-depth bg-muted/70" />
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold text-warmTwo break-words">
                We hit an unexpected error
              </h1>
              <p className="mt-2 text-sm text-warmTwo/85 break-words">
                {message}
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => reset()}
                  className="btn rounded-2xl border border-base-depth bg-mint text-warmTwo hover:bg-muted"
                >
                  Try Again
                </button>

                <Link
                  href="/"
                  className="btn rounded-2xl border border-base-depth bg-warm text-warmTwo hover:bg-muted"
                >
                  Go Home
                </Link>
              </div>

              <details className="mt-6 rounded-2xl border border-base-depth bg-base-cream p-4">
                <summary className="cursor-pointer text-sm font-semibold text-warmTwo">
                  Technical details
                </summary>
                <pre className="mt-3 whitespace-pre-wrap break-words text-xs text-warmTwo/80">
                  {error?.stack || "No stack trace available."}
                </pre>
              </details>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

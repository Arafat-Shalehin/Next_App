import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-base-cream">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-3xl border border-base-depth bg-base-light p-10 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-2xl border border-base-depth bg-mint/60" />
          <h1 className="text-2xl font-semibold text-warmTwo">
            Page not found
          </h1>
          <p className="mt-2 text-sm text-warmTwo/80">
            The page you’re trying to reach doesn’t exist, or the URL is
            incorrect.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="btn rounded-2xl border border-base-depth bg-mint text-warmTwo hover:bg-muted"
            >
              Go Home
            </Link>
            <Link
              href="/all-page"
              className="btn rounded-2xl border border-base-depth bg-warm text-warmTwo hover:bg-muted"
            >
              Browse Items
            </Link>
          </div>

          <p className="mt-6 text-xs text-warmTwo/70">
            If you followed a broken link, try starting from the homepage.
          </p>
        </div>
      </div>
    </main>
  );
}

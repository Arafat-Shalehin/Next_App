import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-base-cream">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-3xl border border-base-depth bg-base-light p-10 text-center">
          <h1 className="text-2xl font-semibold text-warmTwo">
            Item not found
          </h1>
          <p className="mt-2 text-sm text-warmTwo/80">
            The item you’re looking for doesn’t exist or the link is invalid.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/all-page"
              className="btn rounded-2xl border border-base-depth bg-mint text-warmTwo hover:bg-muted"
            >
              Back to All Items
            </Link>
            <Link
              href="/"
              className="btn rounded-2xl border border-base-depth bg-warm text-warmTwo hover:bg-muted"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

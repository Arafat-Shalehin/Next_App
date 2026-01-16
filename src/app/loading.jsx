function Line({ className = "" }) {
  return (
    <div
      className={["animate-pulse rounded-xl bg-warmTwo/15", className].join(
        " "
      )}
      aria-hidden="true"
    />
  );
}

export default function Loading() {
  return (
    <main className="bg-base-cream">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-3xl border border-base-depth bg-base-light p-8 sm:p-10">
          <Line className="h-6 w-48" />
          <Line className="mt-3 h-10 w-2/3 max-w-[520px]" />
          <Line className="mt-4 h-4 w-full max-w-[680px]" />
          <Line className="mt-2 h-4 w-11/12 max-w-[640px]" />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl border border-base-depth bg-base-cream p-6"
              >
                <Line className="h-6 w-28" />
                <Line className="mt-3 h-5 w-3/4" />
                <Line className="mt-4 h-4 w-full" />
                <Line className="mt-2 h-4 w-10/12" />
                <div className="mt-5 flex items-center justify-between gap-3">
                  <Line className="h-9 w-24 rounded-2xl" />
                  <Line className="h-9 w-28 rounded-2xl bg-mint/60" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-sm text-warmTwo/70">Loading content…</div>
        </div>
      </div>
    </main>
  );
}

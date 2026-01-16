function SkeletonLine({ className = "" }) {
  return (
    <div
      className={["animate-pulse rounded-xl bg-base-depth/50", className].join(
        " "
      )}
      aria-hidden="true"
    />
  );
}

function SkeletonCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-base-depth bg-base-light p-5 sm:p-6">
      {/* Decorative notches */}
      <div
        className="pointer-events-none absolute -left-3 top-10 h-6 w-6 rounded-full border border-base-depth bg-base-cream"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-3 bottom-10 h-6 w-6 rounded-full border border-base-depth bg-base-cream"
        aria-hidden="true"
      />

      {/* Accent rail */}
      <div
        className="absolute left-0 top-0 h-full w-1.5 bg-mint/70"
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <SkeletonLine className="h-6 w-24 bg-warmTwo/15" />
          <SkeletonLine className="mt-3 h-6 w-2/3 bg-warmTwo/15" />
        </div>
        <SkeletonLine className="h-10 w-24 rounded-2xl bg-warmTwo/15" />
      </div>

      <div className="my-4 border-t border-base-depth/70 border-dashed" />

      <SkeletonLine className="h-4 w-full bg-warmTwo/15" />
      <SkeletonLine className="mt-2 h-4 w-11/12 bg-warmTwo/15" />
      <SkeletonLine className="mt-2 h-4 w-8/12 bg-warmTwo/15" />

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex gap-2">
          <SkeletonLine className="h-7 w-16 rounded-full bg-warmTwo/15" />
          <SkeletonLine className="h-7 w-20 rounded-full bg-warmTwo/15" />
        </div>
        <SkeletonLine className="h-10 w-28 rounded-2xl bg-mint/60" />
      </div>
    </div>
  );
}

export default function AllItemsSkeleton() {
  return (
    <main className="bg-base-cream">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Toolbar skeleton */}
        <div className="rounded-3xl border border-base-depth bg-base-light p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <SkeletonLine className="h-8 w-40 bg-warmTwo/15" />
              <SkeletonLine className="mt-3 h-4 w-96 max-w-full bg-warmTwo/15" />
            </div>

            <div className="flex items-center gap-2">
              <SkeletonLine className="h-10 w-28 rounded-2xl bg-mint/60" />
              <SkeletonLine className="h-10 w-28 rounded-2xl bg-warmTwo/15" />
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-12">
            <div className="md:col-span-6">
              <SkeletonLine className="h-4 w-20 bg-warmTwo/15" />
              <SkeletonLine className="mt-2 h-12 w-full rounded-2xl bg-warmTwo/15" />
            </div>
            <div className="md:col-span-3">
              <SkeletonLine className="h-4 w-20 bg-warmTwo/15" />
              <SkeletonLine className="mt-2 h-12 w-full rounded-2xl bg-warmTwo/15" />
            </div>
            <div className="md:col-span-3">
              <SkeletonLine className="h-4 w-16 bg-warmTwo/15" />
              <SkeletonLine className="mt-2 h-12 w-full rounded-2xl bg-warmTwo/15" />
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <SkeletonLine className="h-4 w-64 max-w-full bg-warmTwo/15" />
            <SkeletonLine className="h-10 w-28 rounded-2xl bg-mint/60" />
          </div>
        </div>

        {/* Summary skeleton */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <SkeletonLine className="h-4 w-52 bg-warmTwo/15" />
          <SkeletonLine className="h-4 w-28 bg-warmTwo/15" />
        </div>

        {/* Cards skeleton */}
        <section className="mt-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

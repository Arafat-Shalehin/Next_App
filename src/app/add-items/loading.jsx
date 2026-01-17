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

function Field() {
  return (
    <div>
      <Line className="h-4 w-24" />
      <Line className="mt-2 h-12 w-full rounded-2xl" />
    </div>
  );
}

function CardPreviewSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-base-depth bg-base-light p-6">
      <div
        className="absolute left-0 top-0 h-full w-1.5 bg-mint/60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full border border-base-depth bg-base-cream/70"
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <Line className="h-7 w-24 rounded-full" />
          <Line className="mt-3 h-6 w-2/3" />
        </div>
        <Line className="h-10 w-24 rounded-2xl" />
      </div>

      <div className="my-4 border-t border-base-depth/70 border-dashed" />

      <Line className="h-4 w-full" />
      <Line className="mt-2 h-4 w-11/12" />
      <Line className="mt-2 h-4 w-9/12" />

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex gap-2">
          <Line className="h-7 w-16 rounded-full" />
          <Line className="h-7 w-20 rounded-full" />
        </div>
        <Line className="h-4 w-20" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main className="bg-base-cream">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Form skeleton */}
          <section className="lg:col-span-7">
            <div className="rounded-[2rem] border border-base-depth bg-base-light p-6 sm:p-8">
              <Line className="h-8 w-56" />
              <Line className="mt-3 h-4 w-10/12 max-w-[520px]" />

              <div className="mt-6 space-y-4">
                <Field />
                <div>
                  <Line className="h-4 w-28" />
                  <Line className="mt-2 h-36 w-full rounded-2xl" />
                  <Line className="mt-2 h-4 w-20" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field />
                  <Field />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field />
                  <Field />
                </div>

                <Field />

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Line className="h-11 w-40 rounded-2xl bg-mint/60" />
                  <Line className="h-11 w-28 rounded-2xl" />
                </div>
              </div>
            </div>
          </section>

          {/* Preview skeleton */}
          <aside className="lg:col-span-5">
            <div className="rounded-[2rem] border border-base-depth bg-base-cream p-6 sm:p-8">
              <Line className="h-6 w-32" />
              <Line className="mt-2 h-4 w-11/12 max-w-[420px]" />

              <div className="mt-5">
                <CardPreviewSkeleton />
              </div>

              <div className="mt-6 border-t border-base-depth/70 pt-5">
                <Line className="h-4 w-10/12 max-w-[380px]" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

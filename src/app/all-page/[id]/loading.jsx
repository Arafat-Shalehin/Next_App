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

function Card() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-base-depth bg-base-light p-6 sm:p-8">
      <div
        className="absolute left-0 top-0 h-full w-1.5 bg-mint/60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full border border-base-depth bg-base-cream/70"
        aria-hidden="true"
      />

      <div className="flex flex-wrap gap-2">
        <Line className="h-7 w-24 rounded-full" />
        <Line className="h-7 w-28 rounded-full" />
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div className="flex-1">
          <Line className="h-4 w-16" />
          <Line className="mt-2 h-10 w-40" />
        </div>
        <Line className="h-16 w-48 rounded-3xl" />
      </div>

      <div className="my-7 border-t border-base-depth/70 border-dashed" />

      <Line className="h-6 w-40" />
      <Line className="mt-3 h-4 w-full" />
      <Line className="mt-2 h-4 w-11/12" />
      <Line className="mt-2 h-4 w-9/12" />

      <div className="mt-7">
        <Line className="h-5 w-20" />
        <div className="mt-3 flex gap-2 flex-wrap">
          <Line className="h-7 w-16 rounded-full" />
          <Line className="h-7 w-20 rounded-full" />
          <Line className="h-7 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main className="bg-base-cream">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Line className="h-4 w-56" />
        <Line className="mt-3 h-10 w-2/3 max-w-[520px]" />

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Card />
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-[2rem] border border-base-depth bg-base-light p-6 sm:p-7">
              <Line className="h-6 w-40" />
              <Line className="mt-2 h-4 w-56" />
              <div className="mt-5 grid gap-3">
                <Line className="h-16 w-full rounded-2xl" />
                <Line className="h-16 w-full rounded-2xl" />
                <Line className="h-16 w-full rounded-2xl" />
              </div>
              <div className="mt-6 border-t border-base-depth/70 pt-5">
                <Line className="h-10 w-full rounded-2xl bg-mint/60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

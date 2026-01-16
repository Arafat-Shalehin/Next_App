import Link from "next/link";

export default function ItemsToolbar({
  q = "",
  category = "",
  sort = "newest",
  categories = [],
}) {
  const hasFilters = Boolean(q || category || (sort && sort !== "newest"));

  return (
    <div className="rounded-3xl border border-base-depth bg-base-light p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-semibold text-warmTwo">
            All Items
          </h1>
          <p className="mt-1 text-sm text-warmTwo/85">
            Browse the full collection. Use search and filters to narrow
            results.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/add-items"
            className="btn rounded-2xl border border-base-depth bg-mint text-warmTwo hover:bg-muted"
          >
            Add Item
          </Link>

          {hasFilters ? (
            <Link
              href="/all-page"
              className="btn rounded-2xl border border-base-depth bg-warm text-warmTwo hover:bg-muted"
            >
              Clear Filters
            </Link>
          ) : null}
        </div>
      </div>

      <form method="GET" action="/all-page" className="mt-5">
        <input type="hidden" name="page" value="1" />
        <div className="grid gap-3 md:grid-cols-12">
          {/* Search */}
          <label className="md:col-span-6">
            <span className="block text-xs font-semibold text-warmTwo mb-1">
              Search
            </span>
            <input
              name="q"
              defaultValue={q}
              placeholder="Search by name or description..."
              className="w-full rounded-2xl border border-base-depth bg-warm px-4 py-3 text-sm text-warmTwo placeholder:text-warmTwo/60 focus:outline-none focus:ring-2 focus:ring-muted"
            />
          </label>

          {/* Category */}
          <label className="md:col-span-3">
            <span className="block text-xs font-semibold text-warmTwo mb-1">
              Category
            </span>
            <select
              name="category"
              defaultValue={category}
              className="w-full rounded-2xl border border-base-depth bg-warm px-4 py-3 text-sm text-warmTwo focus:outline-none focus:ring-2 focus:ring-muted"
            >
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          {/* Sort */}
          <label className="md:col-span-3">
            <span className="block text-xs font-semibold text-warmTwo mb-1">
              Sort
            </span>
            <select
              name="sort"
              defaultValue={sort}
              className="w-full rounded-2xl border border-base-depth bg-warm px-4 py-3 text-sm text-warmTwo focus:outline-none focus:ring-2 focus:ring-muted"
            >
              <option value="newest">Newest</option>
              <option value="name-asc">Name (A–Z)</option>
              <option value="price-asc">Price (Low → High)</option>
              <option value="price-desc">Price (High → Low)</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-warmTwo/75">
            Tip: Use short keywords like “mug”, “vintage”, “candle”.
          </p>

          <button
            type="submit"
            className="btn rounded-2xl border border-base-depth bg-mint text-warmTwo hover:bg-muted"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
}

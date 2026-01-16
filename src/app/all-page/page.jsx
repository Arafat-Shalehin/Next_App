import Link from "next/link";
import ItemsToolbar from "@/components/items/ItemsToolbar";
import ItemCard from "@/components/items/ItemCard";
import { getItems } from "@/server/items";

// IMPORTANT: ensures query-based UI (search/pagination) always updates
export const dynamic = "force-dynamic";
export const revalidate = 0;

function pickFirst(v) {
  // Handles: string | string[] | undefined
  if (Array.isArray(v)) return v[0] ?? "";
  return v ?? "";
}

function safeStr(v) {
  return String(pickFirst(v)).trim();
}

function toInt(v, fallback) {
  const n = parseInt(pickFirst(v), 10);
  return Number.isFinite(n) ? n : fallback;
}

function normalizeSort(sort) {
  const allowed = new Set(["newest", "name-asc", "price-asc", "price-desc"]);
  return allowed.has(sort) ? sort : "newest";
}

function sortItems(items, sort) {
  const arr = [...items];

  if (sort === "name-asc") {
    arr.sort((a, b) => safeStr(a?.name).localeCompare(safeStr(b?.name)));
  } else if (sort === "price-asc") {
    arr.sort((a, b) => Number(a?.price || 0) - Number(b?.price || 0));
  } else if (sort === "price-desc") {
    arr.sort((a, b) => Number(b?.price || 0) - Number(a?.price || 0));
  } else {
    // newest
    arr.sort((a, b) => {
      const da = new Date(a?.createdAt || 0).getTime();
      const db = new Date(b?.createdAt || 0).getTime();
      return db - da;
    });
  }

  return arr;
}

function filterItems(items, { q, category }) {
  let arr = [...items];

  if (q) {
    const qq = q.toLowerCase();
    arr = arr.filter((it) => {
      const name = safeStr(it?.name).toLowerCase();
      const desc = safeStr(it?.description).toLowerCase();
      return name.includes(qq) || desc.includes(qq);
    });
  }

  if (category) {
    arr = arr.filter((it) => safeStr(it?.category) === category);
  }

  return arr;
}

function buildPageLink({ q, category, sort, page }) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  if (sort) params.set("sort", sort);
  if (page && page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/all-page?${qs}` : "/all-page";
}

function EmptyState({ q, category }) {
  return (
    <div className="rounded-3xl border border-base-depth bg-base-light p-10 text-center">
      <h2 className="text-xl font-semibold text-warmTwo">
        No items match your filters
      </h2>
      <p className="mt-2 text-sm text-warmTwo/80">
        Try a different search term or clear filters to see everything.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/all-page"
          className="btn rounded-2xl border border-base-depth bg-mint text-warmTwo hover:bg-muted"
        >
          Clear Filters
        </Link>
        <Link
          href="/"
          className="btn rounded-2xl border border-base-depth bg-warm text-warmTwo hover:bg-muted"
        >
          Back to Home
        </Link>
      </div>

      {q || category ? (
        <p className="mt-5 text-xs text-warmTwo/70">
          Active filters:{" "}
          {q ? <span className="font-semibold">q="{q}" </span> : null}
          {category ? (
            <span className="font-semibold">category="{category}"</span>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}

export default async function AllItemsPage({ searchParams }) {
  // Fix: support Next 15/16 where searchParams may be async in some setups
  const sp = await Promise.resolve(searchParams);

  const q = safeStr(sp?.q);
  const category = safeStr(sp?.category);
  const sort = normalizeSort(safeStr(sp?.sort) || "newest");

  const page = Math.max(1, toInt(sp?.page, 1));
  const pageSize = 9;

  const items = await getItems();
  const all = Array.isArray(items) ? items : [];

  const categories = Array.from(
    new Set(all.map((it) => safeStr(it?.category)).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  const filtered = filterItems(all, { q, category });
  const sorted = sortItems(filtered, sort);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const paged = sorted.slice(start, start + pageSize);

  return (
    <main className="bg-base-cream">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <ItemsToolbar
          q={q}
          category={category}
          sort={sort}
          categories={categories}
        />

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-warmTwo/85">
            Showing{" "}
            <span className="font-semibold text-warmTwo">{paged.length}</span>{" "}
            of <span className="font-semibold text-warmTwo">{total}</span> items
          </p>

          <div className="text-xs text-warmTwo/70">
            Page <span className="font-semibold">{safePage}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </div>
        </div>

        <section className="mt-6">
          {paged.length === 0 ? (
            <EmptyState q={q} category={category} />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {paged.map((item) => (
                <ItemCard
                  key={item._id || item.id}
                  item={item}
                  detailsBasePath="/all-page"
                />
              ))}
            </div>
          )}
        </section>

        {totalPages > 1 ? (
          <nav
            aria-label="Pagination"
            className="mt-10 flex items-center justify-center gap-2"
          >
            <Link
              href={buildPageLink({
                q,
                category,
                sort,
                page: Math.max(1, safePage - 1),
              })}
              className={[
                "btn btn-sm rounded-2xl border border-base-depth",
                "bg-warm text-warmTwo hover:bg-muted",
                safePage === 1 ? "btn-disabled opacity-60" : "",
              ].join(" ")}
              aria-disabled={safePage === 1}
              tabIndex={safePage === 1 ? -1 : 0}
            >
              Prev
            </Link>

            <Link
              href={buildPageLink({
                q,
                category,
                sort,
                page: Math.min(totalPages, safePage + 1),
              })}
              className={[
                "btn btn-sm rounded-2xl border border-base-depth",
                "bg-mint text-warmTwo hover:bg-muted",
                safePage === totalPages ? "btn-disabled opacity-60" : "",
              ].join(" ")}
              aria-disabled={safePage === totalPages}
              tabIndex={safePage === totalPages ? -1 : 0}
            >
              Next
            </Link>
          </nav>
        ) : null}
      </div>
    </main>
  );
}

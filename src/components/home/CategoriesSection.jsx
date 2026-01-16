import Link from "next/link";
import SectionHeader from "./SectionHeader";
import { getItems } from "@/server/items";

function safeStr(v) {
  return String(v ?? "").trim();
}

export default async function CategoriesSection() {
  const items = await getItems();
  const all = Array.isArray(items) ? items : [];

  // Build counts by category
  const map = new Map();
  for (const it of all) {
    const cat = safeStr(it?.category) || "Uncategorized";
    map.set(cat, (map.get(cat) || 0) + 1);
  }

  const categories = Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <section className="bg-base-light">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            title="Browse by category"
            subtitle="Jump straight into a section of the catalog. Counts update from your database."
          />
          <Link
            href="/all-page"
            className="btn rounded-2xl border border-base-depth bg-mint text-warmTwo hover:bg-muted"
          >
            Explore All
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.length === 0 ? (
            <div className="rounded-3xl border border-base-depth bg-base-cream p-10 text-center">
              <h3 className="text-lg font-semibold text-warmTwo">
                No categories yet
              </h3>
              <p className="mt-2 text-sm text-warmTwo/80">
                Add items to your database to see categories appear here.
              </p>
              <div className="mt-5">
                <Link
                  href="/add-items"
                  className="btn rounded-2xl border border-base-depth bg-warm text-warmTwo hover:bg-muted"
                >
                  Add an Item
                </Link>
              </div>
            </div>
          ) : (
            categories.map((c, idx) => (
              <Link
                key={c.name}
                href={`/all-page?category=${encodeURIComponent(c.name)}`}
                className="group rounded-3xl border border-base-depth bg-base-cream p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-warmTwo break-words">
                      {c.name}
                    </h3>
                    <p className="mt-2 text-sm text-warmTwo/80">
                      {c.count} item{c.count === 1 ? "" : "s"}
                    </p>
                  </div>

                  <div
                    className={[
                      "h-10 w-10 rounded-2xl border border-base-depth",
                      idx % 2 === 0 ? "bg-mint/70" : "bg-muted/70",
                      "group-hover:bg-muted transition-colors",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-5 text-sm font-medium text-warmTwo group-hover:text-muted">
                  View category →
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

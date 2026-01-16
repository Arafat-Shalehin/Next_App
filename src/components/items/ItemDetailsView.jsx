import Link from "next/link";

function formatPrice(price, currency = "USD") {
  const num = Number(price);
  if (!Number.isFinite(num)) return "—";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(num);
  } catch {
    return `$${num.toFixed(2)}`;
  }
}

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function InfoPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-base-depth bg-base-cream px-4 py-3">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-warmTwo/70">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-warmTwo wrap-break-word">
        {value ?? "—"}
      </div>
    </div>
  );
}

export default function ItemDetailsView({ item }) {
  const id = item?._id || item?.id || "—";
  const name = (item?.name || "Untitled item").toString();
  const description = (
    item?.description || "No description provided."
  ).toString();
  const category = (item?.category || "Uncategorized").toString();
  const currency = (item?.currency || "USD").toString();

  const priceLabel = formatPrice(item?.price, currency);

  const tags = Array.isArray(item?.tags) ? item.tags.filter(Boolean) : [];
  const stock = Number.isFinite(Number(item?.stock))
    ? Number(item.stock)
    : null;
  const rating = Number.isFinite(Number(item?.rating))
    ? Number(item.rating)
    : null;

  const createdAtLabel = formatDate(item?.createdAt);
  const status = (item?.status || "active").toString();

  const stockLabel =
    stock === null ? "—" : stock === 0 ? "Out of stock" : `${stock} available`;

  const ratingLabel = rating === null ? "—" : `${rating.toFixed(1)} / 5`;

  return (
    <main className="bg-base-cream">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Top bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs text-warmTwo/70">
              <Link href="/" className="hover:text-muted">
                Home
              </Link>
              <span className="px-2">/</span>
              <Link href="/all-page" className="hover:text-muted">
                All Items
              </Link>
              <span className="px-2">/</span>
              <span className="text-warmTwo/90">Details</span>
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-warmTwo wrap-break-word">
              {name}
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href="/all-page"
              className="btn rounded-2xl border border-base-depth bg-warm text-warmTwo hover:bg-muted"
            >
              ← Back to All Items
            </Link>
            <Link
              href="/login"
              className="btn rounded-2xl border border-base-depth bg-mint text-warmTwo hover:bg-muted"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Layout */}
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Main “dossier” */}
          <section className="lg:col-span-8">
            <article className="relative overflow-hidden rounded-4xl border border-base-depth bg-base-light">
              {/* Accent rail */}
              <div
                className="absolute left-0 top-0 h-full w-1.5 bg-mint"
                aria-hidden="true"
              />

              {/* Decorative stamp */}
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full border border-base-depth bg-base-cream/70"
                aria-hidden="true"
              />

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-base-depth bg-warm px-3 py-1 text-xs text-warmTwo">
                    {category}
                  </span>
                  <span className="rounded-full border border-base-depth bg-base-cream px-3 py-1 text-xs text-warmTwo/85">
                    Status: {status}
                  </span>
                  {stock === 0 ? (
                    <span className="rounded-full bg-muted px-3 py-1 text-xs text-warmTwo">
                      Out of stock
                    </span>
                  ) : null}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-warmTwo/70">
                      Price
                    </p>
                    <p className="mt-1 text-3xl font-semibold text-warmTwo">
                      {priceLabel}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-base-depth bg-base-cream px-5 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-warmTwo/70">
                      Item Reference
                    </p>
                    <p className="mt-1 text-sm font-semibold text-warmTwo break-all">
                      {id}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-7 border-t border-base-depth/70 border-dashed" />

                <div>
                  <h2 className="text-lg font-semibold text-warmTwo">
                    Description
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-warmTwo/90 whitespace-pre-wrap wrap-break-word">
                    {description}
                  </p>
                </div>

                {/* Tags */}
                <div className="mt-7">
                  <h3 className="text-sm font-semibold text-warmTwo">Tags</h3>

                  {tags.length === 0 ? (
                    <p className="mt-2 text-sm text-warmTwo/70">
                      No tags for this item.
                    </p>
                  ) : (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-base-depth bg-base-cream px-3 py-1 text-xs text-warmTwo/85"
                        >
                          {String(t)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          </section>

          {/* Side panel */}
          <aside className="lg:col-span-4">
            <div className="rounded-4xl border border-base-depth bg-base-light p-6 sm:p-7">
              <h2 className="text-lg font-semibold text-warmTwo">
                Quick Details
              </h2>
              <p className="mt-1 text-sm text-warmTwo/80">
                Key information at a glance.
              </p>

              <div className="mt-5 grid gap-3">
                <InfoPill label="Availability" value={stockLabel} />
                <InfoPill label="Rating" value={ratingLabel} />
                <InfoPill label="Created" value={createdAtLabel} />
                <InfoPill label="Currency" value={currency} />
              </div>

              <div className="mt-6 border-t border-base-depth/70 pt-5">
                <Link
                  href="/all-page"
                  className="btn w-full rounded-2xl border border-base-depth bg-warm text-warmTwo hover:bg-muted"
                >
                  Browse More Items
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

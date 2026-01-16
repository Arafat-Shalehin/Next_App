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

export default function ItemCard({ item, detailsBasePath = "/all-page" }) {
  const id = item?._id || item?.id;
  const name = (item?.name || "Untitled item").toString();
  const description = (
    item?.description || "No description available."
  ).toString();
  const category = (item?.category || "Uncategorized").toString();
  const currency = (item?.currency || "USD").toString();
  const priceLabel = formatPrice(item?.price, currency);

  const tags = Array.isArray(item?.tags) ? item.tags.slice(0, 3) : [];
  const stock = Number.isFinite(Number(item?.stock))
    ? Number(item.stock)
    : null;

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-base-depth bg-base-light">
      {/* Decorative “ticket” notches */}
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
        className="absolute left-0 top-0 h-full w-1.5 bg-mint group-hover:bg-muted transition-colors"
        aria-hidden="true"
      />

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-base-depth bg-warm px-3 py-1 text-xs text-warmTwo">
                {category}
              </span>

              {stock === 0 ? (
                <span className="rounded-full bg-muted px-3 py-1 text-xs text-warmTwo">
                  Out of stock
                </span>
              ) : null}
            </div>

            <h3 className="mt-3 text-lg font-semibold text-warmTwo break-words">
              {name}
            </h3>
          </div>

          <div className="shrink-0">
            <div className="rounded-2xl border border-base-depth bg-base-cream px-4 py-2 text-sm font-semibold text-warmTwo">
              {priceLabel}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-base-depth/70 border-dashed" />

        <p className="text-sm leading-relaxed text-warmTwo/90 overflow-hidden max-h-[4.8rem]">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-base-depth bg-base-cream px-3 py-1 text-xs text-warmTwo/85"
              >
                {String(t)}
              </span>
            ))}
          </div>

          {id ? (
            <Link
              href={`${detailsBasePath}/${id}`}
              className="inline-flex items-center gap-2 rounded-2xl border border-base-depth bg-mint px-4 py-2 text-sm font-medium text-warmTwo hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted focus-visible:ring-offset-2 focus-visible:ring-offset-base-light"
            >
              Details <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <span className="text-xs text-warmTwo/70">No details link</span>
          )}
        </div>
      </div>
    </article>
  );
}

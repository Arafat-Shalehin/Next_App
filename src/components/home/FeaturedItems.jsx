import Link from "next/link";
import { getItems } from "@/server/items";
import formatPrice from "../edgeCases/formatPrice";
import FeaturedItemsEmpty from "../edgeCases/FeaturedItemsEmpty";

function ItemCardCompact({ item, detailsBasePath = "/all-page" }) {
  const id = item?._id || item?.id; // supports Mongo _id or your custom id
  const name = (item?.name || "Untitled item").toString();
  const description = (
    item?.description || "No description provided."
  ).toString();
  const category = (item?.category || "Uncategorized").toString();
  const currency = (item?.currency || "USD").toString();
  const priceLabel = formatPrice(item?.price, currency);

  const stock = Number.isFinite(Number(item?.stock))
    ? Number(item.stock)
    : null;
  const rating = Number.isFinite(Number(item?.rating))
    ? Number(item.rating)
    : null;

  return (
    <article
      className={[
        "group relative overflow-hidden",
        "rounded-3xl border border-base-depth bg-base-light",
        "p-5 sm:p-6",
        "transition-shadow duration-200",
        "hover:shadow-md",
      ].join(" ")}
    >
      {/* Accent rail */}
      <div
        className="absolute left-0 top-0 h-full w-1.5 bg-mint group-hover:bg-muted transition-colors"
        aria-hidden="true"
      />

      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2">
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

      {/* Description (controlled height to avoid layout break) */}
      <p className="mt-3 text-sm leading-relaxed text-warmTwo/90 overflow-hidden max-h-[4.6rem]">
        {description}
      </p>

      {/* Meta row */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 text-xs text-warmTwo/80">
          {rating !== null ? (
            <span className="rounded-full border border-base-depth bg-base-cream px-3 py-1">
              Rating: {rating.toFixed(1)}
            </span>
          ) : null}

          {stock !== null ? (
            <span className="rounded-full border border-base-depth bg-base-cream px-3 py-1">
              Stock: {stock}
            </span>
          ) : null}
        </div>

        {id ? (
          <Link
            href={`${detailsBasePath}/${id}`}
            className={[
              "inline-flex items-center gap-2 rounded-2xl",
              "border border-base-depth bg-mint px-4 py-2 text-sm font-medium text-warmTwo",
              "hover:bg-muted",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted focus-visible:ring-offset-2 focus-visible:ring-offset-base-light",
            ].join(" ")}
          >
            View Details
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        ) : (
          <span className="text-xs text-warmTwo/70">No details link</span>
        )}
      </div>

      {/* Subtle corner stamp (unique visual touch) */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full border border-base-depth bg-base-cream/60"
        aria-hidden="true"
      />
    </article>
  );
}

export default async function FeaturedItems({
  title = "Featured items",
  subtitle = "A small preview from the collection. Clean cards, no images — just the essentials.",
  detailsBasePath = "/all-page", // adjust if your details route is different
}) {
  const items = await getItems();
  const topThree = Array.isArray(items) ? items.slice(0, 3) : [];

  return (
    <section className="bg-base-cream">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold text-warmTwo">
              {title} ({topThree.length})
            </h2>
            <p className="mt-1 text-sm text-warmTwo/85">{subtitle}</p>
          </div>

          <Link
            href="/all-page"
            className="btn rounded-2xl border border-base-depth bg-warm text-warmTwo hover:bg-muted"
          >
            See All Items
          </Link>
        </div>

        <div className="mt-8">
          {topThree.length === 0 ? (
            <FeaturedItemsEmpty />
          ) : (
            <div className="grid gap-5 md:grid-cols-3">
              {topThree.map((item) => (
                <ItemCardCompact
                  key={item._id || item.id}
                  item={item}
                  detailsBasePath={detailsBasePath}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

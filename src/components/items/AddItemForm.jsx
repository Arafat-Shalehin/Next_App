"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createItem } from "@/server/items";

function formatPrice(price, currency = "USD") {
  const num = Number(price);
  if (!Number.isFinite(num)) return "—";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(num);
  } catch {
    return `$${num.toFixed(2)}`;
  }
}

function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="toast toast-top toast-end z-[60]">
      <div className="alert border border-base-depth bg-base-light text-warmTwo shadow">
        <span className="text-sm">{message}</span>
        <button
          type="button"
          onClick={onClose}
          className="btn btn-xs rounded-xl border border-base-depth bg-warm text-warmTwo hover:bg-muted"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function PreviewCard({ form }) {
  const name = (form.name || "Untitled item").toString();
  const description = (
    form.description || "Write a short description to preview it here."
  ).toString();
  const category = (form.category || "Uncategorized").toString();
  const currency = (form.currency || "USD").toString();
  const priceLabel = formatPrice(form.price, currency);

  const tags = (form.tags || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 3);

  const stock = form.stock === "" ? 0 : Number(form.stock);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-base-depth bg-base-light p-6">
      <div
        className="absolute left-0 top-0 h-full w-1.5 bg-mint"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full border border-base-depth bg-base-cream/70"
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="rounded-full border border-base-depth bg-warm px-3 py-1 text-xs text-warmTwo">
            {category}
          </span>
          <h3 className="mt-3 text-lg font-semibold text-warmTwo break-words">
            {name}
          </h3>
        </div>
        <div className="rounded-2xl border border-base-depth bg-base-cream px-4 py-2 text-sm font-semibold text-warmTwo">
          {priceLabel}
        </div>
      </div>

      <div className="my-4 border-t border-base-depth/70 border-dashed" />

      <p className="text-sm leading-relaxed text-warmTwo/90 whitespace-pre-wrap break-words max-h-[7rem] overflow-hidden">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-base-depth bg-base-cream px-3 py-1 text-xs text-warmTwo/85"
            >
              {t}
            </span>
          ))}
          {tags.length === 0 ? (
            <span className="text-xs text-warmTwo/70">No tags</span>
          ) : null}
        </div>

        <span className="text-xs text-warmTwo/80">
          Stock:{" "}
          <span className="font-semibold">
            {Number.isFinite(stock) ? stock : "—"}
          </span>
        </span>
      </div>
    </div>
  );
}

export default function AddItemForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "0",
    category: "",
    currency: "USD",
    tags: "",
  });

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      form.description.trim().length >= 10 &&
      form.price !== "" &&
      Number(form.price) >= 0
    );
  }, [form]);

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function resetForm() {
    setForm({
      name: "",
      description: "",
      price: "",
      stock: "0",
      category: "",
      currency: "USD",
      tags: "",
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    setToast("");

    startTransition(async () => {
      const res = await createItem(form);

      if (!res?.ok) {
        setError(res?.error || "Failed to create item.");
        if (res?.status === 401) {
          // session expired edge case
          router.push(`/login?next=${encodeURIComponent("/add-items")}`);
        }
        return;
      }

      setToast("Item created successfully.");
      const newId = res.id;

      // optional: reset after success
      resetForm();

      // redirect to item details
      setTimeout(() => {
        router.push(`/all-page/${newId}`);
        router.refresh();
      }, 600);
    });
  }

  return (
    <>
      <Toast message={toast} onClose={() => setToast("")} />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Form */}
        <section className="lg:col-span-7">
          <div className="rounded-[2rem] border border-base-depth bg-base-light p-6 sm:p-8">
            <h1 className="text-2xl font-semibold text-warmTwo">
              Add a new item
            </h1>
            <p className="mt-2 text-sm text-warmTwo/80">
              Create an item card (no image). Keep the description readable and
              concise.
            </p>

            {error ? (
              <div className="mt-5 rounded-2xl border border-base-depth bg-warm p-4 text-sm text-warmTwo">
                {error}
              </div>
            ) : null}

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="block text-xs font-semibold text-warmTwo mb-1">
                  Name *
                </span>
                <input
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className="w-full rounded-2xl border border-base-depth bg-warm px-4 py-3 text-sm text-warmTwo focus:outline-none focus:ring-2 focus:ring-muted"
                  placeholder="e.g. Mint Glass Vase"
                  maxLength={80}
                />
              </label>

              <label className="block">
                <span className="block text-xs font-semibold text-warmTwo mb-1">
                  Description *
                </span>
                <textarea
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  className="min-h-[140px] w-full rounded-2xl border border-base-depth bg-warm px-4 py-3 text-sm text-warmTwo focus:outline-none focus:ring-2 focus:ring-muted"
                  placeholder="Write a helpful description (min 10 characters)..."
                  maxLength={600}
                />
                <p className="mt-1 text-xs text-warmTwo/70">
                  {form.description.length}/600
                </p>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="block text-xs font-semibold text-warmTwo mb-1">
                    Price *
                  </span>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setField("price", e.target.value)}
                    className="w-full rounded-2xl border border-base-depth bg-warm px-4 py-3 text-sm text-warmTwo focus:outline-none focus:ring-2 focus:ring-muted"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </label>

                <label className="block">
                  <span className="block text-xs font-semibold text-warmTwo mb-1">
                    Stock
                  </span>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setField("stock", e.target.value)}
                    className="w-full rounded-2xl border border-base-depth bg-warm px-4 py-3 text-sm text-warmTwo focus:outline-none focus:ring-2 focus:ring-muted"
                    min="0"
                    step="1"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="block text-xs font-semibold text-warmTwo mb-1">
                    Category
                  </span>
                  <input
                    value={form.category}
                    onChange={(e) => setField("category", e.target.value)}
                    className="w-full rounded-2xl border border-base-depth bg-warm px-4 py-3 text-sm text-warmTwo focus:outline-none focus:ring-2 focus:ring-muted"
                    placeholder="e.g. Home Decor"
                    maxLength={40}
                  />
                </label>

                <label className="block">
                  <span className="block text-xs font-semibold text-warmTwo mb-1">
                    Currency
                  </span>
                  <select
                    value={form.currency}
                    onChange={(e) => setField("currency", e.target.value)}
                    className="w-full rounded-2xl border border-base-depth bg-warm px-4 py-3 text-sm text-warmTwo focus:outline-none focus:ring-2 focus:ring-muted"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="BDT">BDT</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="block text-xs font-semibold text-warmTwo mb-1">
                  Tags (comma separated)
                </span>
                <input
                  value={form.tags}
                  onChange={(e) => setField("tags", e.target.value)}
                  className="w-full rounded-2xl border border-base-depth bg-warm px-4 py-3 text-sm text-warmTwo focus:outline-none focus:ring-2 focus:ring-muted"
                  placeholder="vintage, minimal, gift"
                />
              </label>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isPending || !canSubmit}
                  className="btn rounded-2xl border border-base-depth bg-mint text-warmTwo hover:bg-muted disabled:opacity-60"
                >
                  {isPending ? "Creating..." : "Create Item"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isPending}
                  className="btn rounded-2xl border border-base-depth bg-warm text-warmTwo hover:bg-muted disabled:opacity-60"
                >
                  Reset
                </button>
              </div>

              {!canSubmit ? (
                <p className="text-xs text-warmTwo/70">
                  Fill name (2+ chars), description (10+ chars), and a valid
                  price to enable submit.
                </p>
              ) : null}
            </form>
          </div>
        </section>

        {/* Preview */}
        <aside className="lg:col-span-5">
          <div className="rounded-[2rem] border border-base-depth bg-base-cream p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-warmTwo">Live preview</h2>
            <p className="mt-1 text-sm text-warmTwo/80">
              This is roughly how your card will look on the list page.
            </p>

            <div className="mt-5">
              <PreviewCard form={form} />
            </div>

            <div className="mt-6 border-t border-base-depth/70 pt-5">
              <p className="text-xs text-warmTwo/70">
                Tip: Keep the first sentence meaningful—cards show a short
                excerpt.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

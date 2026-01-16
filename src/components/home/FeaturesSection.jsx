import SectionHeader from "./SectionHeader";

const FEATURES = [
  {
    title: "Simple browsing",
    desc: "Clean list layout with quick filters and clear item metadata—no clutter.",
  },
  {
    title: "Full item details",
    desc: "Dedicated detail pages designed for readability (even with long descriptions).",
  },
  {
    title: "Mock auth ready",
    desc: "Cookie-based mock login flow with route protection for Add Item (optional feature).",
  },
  {
    title: "Express + MongoDB",
    desc: "Data fetched from an API/JSON source and stored in MongoDB for persistence.",
  },
];

function FeatureCard({ title, desc, index }) {
  const accent = index % 2 === 0 ? "bg-mint" : "bg-muted";

  return (
    <div className="rounded-3xl border border-base-depth bg-base-cream p-6">
      <div className="flex items-start gap-4">
        <div
          className={`h-10 w-10 rounded-2xl ${accent} border border-base-depth`}
        />
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-warmTwo break-words">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-warmTwo/85 break-words">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection({ items = FEATURES }) {
  const list = Array.isArray(items) ? items : [];

  return (
    <section className="bg-base-light">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader
          title="Built for clarity"
          subtitle="A small app that focuses on clean UI, predictable navigation, and a calm vintage palette."
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {list.length === 0 ? (
            <div className="rounded-3xl border border-base-depth bg-base-cream p-8 text-center text-warmTwo/80">
              No features to display.
            </div>
          ) : (
            list
              .slice(0, 4)
              .map((f, idx) => (
                <FeatureCard
                  key={idx}
                  index={idx}
                  title={f.title}
                  desc={f.desc}
                />
              ))
          )}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import Image from "next/image";

const DEFAULTS = {
  badge: "Simple catalog • Next.js + Express",
  title: "Browse items with a calm, vintage feel.",
  highlight: "Item Box",
  subtitle:
    "Explore a curated list of items, view full details, and (optionally) add new items after login. Fast, clean, and easy to navigate.",
  primaryCta: { href: "/all-page", label: "Browse All Items" },
  secondaryCta: { href: "/login", label: "Login to Add Items" },
  image: {
    src: "https://thumbs.dreamstime.com/z/discover-stunning-array-vintage-antiques-exquisitely-crafted-objects-your-home-decor-curated-collection-step-back-time-383889470.jpg",
    alt: "A calm vintage-style collection of items",
  },
  stats: [
    { label: "Public item list", value: "Open" },
    { label: "Details pages", value: "Included" },
    { label: "Mock login", value: "Cookies" },
  ],
};

function Stat({ value, label }) {
  if (!value && !label) return null;
  return (
    <div className="rounded-2xl border border-base-depth bg-base-light px-4 py-3">
      <div className="text-sm font-semibold text-warmTwo wrap-break-word">
        {value}
      </div>
      <div className="text-xs text-warmTwo/80 wrap-break-word">{label}</div>
    </div>
  );
}

function HeroImage({ image }) {
  const src = image?.src;
  const alt = image?.alt || "Hero image";

  if (!src) {
    return (
      <div className="relative h-65 sm:h-80 lg:h-105 w-full overflow-hidden rounded-3xl border border-base-depth bg-base-light grid place-items-center">
        <p className="text-sm text-warmTwo/70">No image provided</p>
      </div>
    );
  }

  return (
    <div
      className="
        relative
        w-full
        h-65
        sm:h-80
        lg:h-105
        xl:h-115
        overflow-hidden
        rounded-3xl
        border
        border-base-depth
        bg-base-light
      "
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 520px"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-base-cream/60 via-transparent to-transparent" />
    </div>
  );
}

export default function Hero(props) {
  const {
    badge,
    title,
    highlight,
    subtitle,
    primaryCta,
    secondaryCta,
    image,
    stats,
  } = {
    ...DEFAULTS,
    ...props,
  };

  return (
    <section className="bg-base-cream">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-18">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* LEFT: CONTENT */}
          <div className="min-w-0">
            {badge && (
              <div className="inline-flex items-center gap-2 rounded-full border border-base-depth bg-base-light px-4 py-2 text-xs text-warmTwo">
                <span className="h-2 w-2 rounded-full bg-muted" />
                <span className="truncate">{badge}</span>
              </div>
            )}

            <h1 className="mt-5 text-3xl sm:text-5xl font-semibold leading-tight tracking-tight text-warmTwo">
              <span className="text-mint">{highlight}</span>{" "}
              <span>{title}</span>
            </h1>

            {subtitle && (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-warmTwo/90">
                {subtitle}
              </p>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              {primaryCta?.href && (
                <Link
                  href={primaryCta.href}
                  className="btn rounded-2xl border border-base-depth bg-mint text-warmTwo hover:bg-muted"
                >
                  {primaryCta.label}
                </Link>
              )}

              {secondaryCta?.href && (
                <Link
                  href={secondaryCta.href}
                  className="btn rounded-2xl border border-base-depth bg-warm text-warmTwo hover:bg-muted"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>

            {Array.isArray(stats) && stats.length > 0 && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {stats.slice(0, 3).map((s, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-base-depth bg-base-light px-4 py-3"
                  >
                    <div className="text-sm font-semibold text-warmTwo">
                      {s.value}
                    </div>
                    <div className="text-xs text-warmTwo/80">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: VISUAL */}
          <div className="relative">

            <HeroImage image={image} />

            <div className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-base-depth bg-base-light px-4 py-2 text-xs text-warmTwo">
              <span className="h-2 w-2 rounded-full bg-mint" />
              Express API powered items (JSON)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

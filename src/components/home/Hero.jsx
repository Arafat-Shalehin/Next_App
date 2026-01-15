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

  // Edge case: missing image -> render a tasteful placeholder
  if (!src) {
    return (
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-base-depth bg-base-light">
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center px-6">
            <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-mint/50 grid place-items-center border border-base-depth">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="fill-current text-warmTwo"
                aria-hidden="true"
              >
                <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2Zm-2 0H5V5h14v14ZM8 15l2.5-3 2 2.5L16 11l3 4H8Z" />
              </svg>
            </div>
            <p className="text-sm text-warmTwo/80">
              Add{" "}
              <code className="px-1 rounded bg-warm/70">/public/hero.jpg</code>{" "}
              to show an image here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:block relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-base-depth bg-base-light">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 520px"
        className="object-cover"
      />
      {/* subtle overlay for text contrast if needed */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-base-cream/60 via-transparent to-transparent" />
    </div>
  );
}

export default function Hero(props) {
  const badge = props.badge ?? DEFAULTS.badge;
  const title = props.title ?? DEFAULTS.title;
  const highlight = props.highlight ?? DEFAULTS.highlight;
  const subtitle = props.subtitle ?? DEFAULTS.subtitle;
  const primaryCta = props.primaryCta ?? DEFAULTS.primaryCta;
  const secondaryCta = props.secondaryCta ?? DEFAULTS.secondaryCta;
  const image = props.image ?? DEFAULTS.image;
  const stats = Array.isArray(props.stats) ? props.stats : DEFAULTS.stats;

  return (
    <section className="bg-base-cream">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-18">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Copy */}
          <div className="min-w-0">
            {/* Badge */}
            {badge ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-base-depth bg-base-light px-4 py-2 text-xs text-warmTwo">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-muted"
                  aria-hidden="true"
                />
                <span className="truncate">{badge}</span>
              </div>
            ) : null}

            {/* Title */}
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-warmTwo sm:text-5xl leading-tight wrap-break-word">
              <span className="text-mint">{highlight}</span>{" "}
              <span className="text-warmTwo">{title}</span>
            </h1>

            {/* Subtitle */}
            {subtitle ? (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-warmTwo/90 wrap-break-word">
                {subtitle}
              </p>
            ) : null}

            {/* CTAs */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              {primaryCta?.href && primaryCta?.label ? (
                <Link
                  href={primaryCta.href}
                  className={[
                    "btn rounded-2xl border border-base-depth",
                    "bg-mint text-warmTwo",
                    "hover:bg-muted",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted focus-visible:ring-offset-2 focus-visible:ring-offset-base-cream",
                  ].join(" ")}
                >
                  {primaryCta.label}
                </Link>
              ) : null}

              {secondaryCta?.href && secondaryCta?.label ? (
                <Link
                  href={secondaryCta.href}
                  className={[
                    "btn rounded-2xl border border-base-depth",
                    "bg-warm text-warmTwo",
                    "hover:bg-muted",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted focus-visible:ring-offset-2 focus-visible:ring-offset-base-cream",
                  ].join(" ")}
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>

            {/* Stats (optional) */}
            {Array.isArray(stats) && stats.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {stats.slice(0, 3).map((s, idx) => (
                  <Stat key={idx} value={s.value} label={s.label} />
                ))}
              </div>
            ) : null}

            {/* Small helper text */}
            <p className="mt-5 text-xs text-warmTwo/70">
              Tip: “Add Items” can be protected by cookie auth (redirects
              unauthenticated users to Login).
            </p>
          </div>

          {/* Visual */}
          <div className="lg:justify-self-end *:hidden *:md:block">
            <div className="relative">
              {/* Decorative card behind */}
              <div
                className="hidden sm:block absolute -inset-4 rounded-4xl bg-base-light border border-base-depth -z-10"
                aria-hidden="true"
              />
              <HeroImage image={image} />

              {/* Small floating label */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-base-depth bg-base-light px-4 py-2 text-xs text-warmTwo">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-mint"
                  aria-hidden="true"
                />
                Express API powered items (JSON)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import SectionHeader from "./SectionHeader";

const STEPS = [
  {
    step: "01",
    title: "Browse items",
    desc: "Visit the All Items page to explore the catalog with search + filters.",
    href: "/all-page",
    cta: "Open All Items",
  },
  {
    step: "02",
    title: "Open details",
    desc: "Each item has its own detail view for full description and key info.",
    href: "/all-page",
    cta: "View an Item",
  },
  {
    step: "03",
    title: "Login (optional) & add",
    desc: "Use mock credentials to unlock protected routes like Add Items.",
    href: "/login",
    cta: "Go to Login",
  },
];

function StepCard({ step, title, desc, href, cta }) {
  return (
    <div className="rounded-3xl border border-base-depth bg-base-light p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-2xl border border-base-depth bg-base-cream px-4 py-2 text-sm font-semibold text-warmTwo">
          {step}
        </div>
        <div
          className="h-10 w-10 rounded-2xl border border-base-depth bg-mint/70"
          aria-hidden="true"
        />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-warmTwo break-words">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-warmTwo/85 break-words">
        {desc}
      </p>

      {href && cta ? (
        <div className="mt-5">
          <Link
            href={href}
            className="btn rounded-2xl border border-base-depth bg-warm text-warmTwo hover:bg-muted"
          >
            {cta}
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default function HowItWorksSection({ steps = STEPS }) {
  const list = Array.isArray(steps) ? steps : [];

  return (
    <section className="bg-base-cream">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader
          title="How it works"
          subtitle="A straightforward flow—browse publicly, view details, and optionally log in to add items."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {list.length === 0 ? (
            <div className="rounded-3xl border border-base-depth bg-base-light p-8 text-center text-warmTwo/80">
              No steps available.
            </div>
          ) : (
            list.slice(0, 3).map((s) => <StepCard key={s.step} {...s} />)
          )}
        </div>
      </div>
    </section>
  );
}

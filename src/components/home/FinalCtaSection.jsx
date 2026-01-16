import Link from "next/link";
import SectionHeader from "./SectionHeader";

export default function FinalCtaSection() {
  return (
    <section className="bg-base-light">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-[2rem] border border-base-depth bg-base-cream p-8 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="min-w-0">
              <SectionHeader
                title="Ready to explore the catalog?"
                subtitle="Browse items publicly, open detailed pages, and log in when you want to add new items."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/all-page"
                className="btn rounded-2xl border border-base-depth bg-mint text-warmTwo hover:bg-muted"
              >
                Browse Items
              </Link>
              <Link
                href="/login"
                className="btn rounded-2xl border border-base-depth bg-warm text-warmTwo hover:bg-muted"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="mt-7 border-t border-base-depth/70 pt-6 text-sm text-warmTwo/80">
            <p>
              Designed with a calm palette:{" "}
              <span className="font-semibold">mint</span> for primary actions,{" "}
              <span className="font-semibold">warm beige</span> for secondary,
              and soft neutrals for layout depth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

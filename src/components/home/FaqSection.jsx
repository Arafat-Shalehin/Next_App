import SectionHeader from "./SectionHeader";

const FAQS = [
  {
    q: "Is the Items page public?",
    a: "Yes. Item listing and item details are publicly accessible by default.",
  },
  {
    q: "How does authentication work?",
    a: "Mock login uses a hardcoded email/password and stores an auth flag in cookies. Protected routes redirect unauthenticated users.",
  },
  {
    q: "Where does item data come from?",
    a: "Items are fetched from your backend (Express/API/JSON) and can be stored in MongoDB (recommended).",
  },
  {
    q: "What happens if an item ID is invalid?",
    a: "The details page returns a clean “Not Found” UI and doesn’t crash—this is handled as an edge case.",
  },
];

export default function FaqSection({ faqs = FAQS }) {
  const list = Array.isArray(faqs) ? faqs : [];

  return (
    <section className="bg-base-cream">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader
          title="FAQ"
          subtitle="Quick answers about routing, authentication, and data handling."
          align="center"
        />

        <div className="mt-8 mx-auto max-w-3xl space-y-3">
          {list.length === 0 ? (
            <div className="rounded-3xl border border-base-depth bg-base-light p-8 text-center text-warmTwo/80">
              No FAQs available.
            </div>
          ) : (
            list.map((f, idx) => (
              <div
                key={idx}
                className="collapse collapse-arrow rounded-3xl border border-base-depth bg-base-light"
              >
                <input
                  type="radio"
                  name="faq-accordion"
                  defaultChecked={idx === 0}
                />
                <div className="collapse-title text-warmTwo font-semibold">
                  {f.q}
                </div>
                <div className="collapse-content text-sm text-warmTwo/85 leading-relaxed">
                  <p>{f.a}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

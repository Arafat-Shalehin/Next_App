import Link from "next/link";
import Login from "../buttons/Login";
import NavLinkItem from "../edgeCases/Navlinks";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/all-page", label: "All Items" },
  { href: "/add-items", label: "Add Items" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-base-depth bg-base-cream">
      <div className="navbar mx-auto max-w-6xl px-4">
        {/* Left */}
        <div className="navbar-start">
          <div className="dropdown">
            <button
              type="button"
              tabIndex={0}
              aria-label="Open menu"
              className="btn btn-ghost lg:hidden text-warmTwo hover:bg-base-light"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            {/* Mobile menu */}
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 w-56 rounded-2xl border border-base-depth bg-base-light p-2 shadow"
            >
              {NAV_ITEMS.map((item) => (
                <NavLinkItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </ul>
          </div>

          <Link
            href="/"
            className="rounded-xl px-2 py-1 text-lg font-semibold tracking-tight text-warmTwo hover:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted focus-visible:ring-offset-2 focus-visible:ring-offset-base-cream"
          >
            Item Box
          </Link>
        </div>

        {/* Center (desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            {NAV_ITEMS.map((item) => (
              <NavLinkItem
                key={item.href}
                href={item.href}
                label={item.label}
              />
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end">
          <Login></Login>
        </div>
      </div>
    </header>
  );
}

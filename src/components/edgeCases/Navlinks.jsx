"use client";
const { default: Link } = require("next/link");
const { usePathname } = require("next/navigation");

function NavLinkItem({ href, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={[
          "rounded-xl px-3 py-2 text-sm font-medium",
          "text-warmTwo",
          "hover:bg-base-light hover:text-warmTwo",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted focus-visible:ring-offset-2 focus-visible:ring-offset-base-cream",
          isActive
            ? "bg-base-light border border-base-depth"
            : "border border-transparent",
        ].join(" ")}
      >
        {label}
      </Link>
    </li>
  );
}

export default NavLinkItem;

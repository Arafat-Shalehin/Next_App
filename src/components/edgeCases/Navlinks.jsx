"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinkItem({
  href,
  label,
  exact = false, // Home should use exact=true
  ringOffsetClass = "ring-offset-base-cream",
}) {
  const pathname = usePathname();

  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <li>
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={[
          "rounded-xl px-3 py-2 text-sm font-medium",
          "text-warmTwo",
          "hover:bg-base-light hover:text-warmTwo",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted focus-visible:ring-offset-2",
          ringOffsetClass,
          "border",
          isActive ? "bg-base-light border-base-depth" : "border-transparent",
        ].join(" ")}
      >
        {label}
      </Link>
    </li>
  );
}

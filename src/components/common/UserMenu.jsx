"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useMemo, useState } from "react";

function getInitials(nameOrEmail) {
  const s = (nameOrEmail || "").toString().trim();
  if (!s) return "U";

  const parts = s.split(" ").filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return s.slice(0, 2).toUpperCase();
}

export default function UserMenu({ user }) {
  const [busy, setBusy] = useState(false);

  const displayName = useMemo(() => {
    const name = user?.name?.toString().trim();
    const email = user?.email?.toString().trim();
    return name || email || "Account";
  }, [user]);

  const initials = useMemo(() => getInitials(displayName), [displayName]);

  async function handleLogout() {
    setBusy(true);
    await signOut({ callbackUrl: "/" });
  }

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        tabIndex={0}
        className="btn rounded-2xl border border-base-depth bg-base-light text-warmTwo hover:bg-base-depth"
        aria-label="Open user menu"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-base-depth bg-mint/70 text-warmTwo font-semibold">
          {initials}
        </span>
        <span className="max-w-[140px] truncate text-sm font-semibold">
          {displayName}
        </span>
      </button>

      <ul className="menu dropdown-content mt-3 w-56 rounded-2xl border border-base-depth bg-base-light p-2 shadow">
        <li>
          <Link href="/all-page" className="text-warmTwo">
            All Items
          </Link>
        </li>
        <li>
          <Link href="/add-items" className="text-warmTwo">
            Add Items
          </Link>
        </li>

        <div className="my-2 border-t border-base-depth/70" />

        <li>
          <button
            type="button"
            onClick={handleLogout}
            disabled={busy}
            className="text-warmTwo disabled:opacity-60"
          >
            {busy ? "Logging out..." : "Logout"}
          </button>
        </li>
      </ul>
    </div>
  );
}

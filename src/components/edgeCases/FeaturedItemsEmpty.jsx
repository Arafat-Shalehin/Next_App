import Link from "next/link";
import React from "react";

function FeaturedItemsEmpty() {
  return (
    <div className="rounded-3xl border border-base-depth bg-base-light p-8 text-center">
      <h3 className="text-lg font-semibold text-warmTwo">No items found</h3>
      <p className="mt-2 text-sm text-warmTwo/80">
        Add a few items to your database, then refresh this page.
      </p>
      <div className="mt-5">
        <Link
          href="/add-items"
          className="btn rounded-2xl border border-base-depth bg-mint text-warmTwo hover:bg-muted"
        >
          Add an Item
        </Link>
      </div>
    </div>
  );
}

export default FeaturedItemsEmpty;

"use client";
import Link from "next/link";
import React from "react";

function Login() {
  return (
    <div>
      <Link
        href="/login"
        className={[
          "btn rounded-2xl border border-base-depth",
          "bg-mint text-warmTwo",
          "hover:bg-muted hover:border-base-depth",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted focus-visible:ring-offset-2 focus-visible:ring-offset-base-cream",
        ].join(" ")}
      >
        Login
      </Link>
    </div>
  );
}

export default Login;

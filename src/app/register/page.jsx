"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const nextUrl = sp.get("next") || "/all-page";

  const [form, setForm] = useState({
    nid: "",
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [okMsg, setOkMsg] = useState("");

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setOkMsg("");

    if (
      !form.nid ||
      !form.name ||
      !form.email ||
      !form.contact ||
      !form.password
    ) {
      setError("All fields are required.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nid: form.nid,
          name: form.name,
          email: form.email,
          contact: form.contact,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Registration failed.");
        setLoading(false);
        return;
      }

      setOkMsg("Account created. Redirecting to login...");
      setTimeout(() => {
        router.push(`/login?registered=1&next=${encodeURIComponent(nextUrl)}`);
      }, 700);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="bg-base-cream">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-xl rounded-3xl border border-base-depth bg-base-light p-7 sm:p-10">
          <h1 className="text-2xl font-semibold text-warmTwo">
            Create account
          </h1>
          <p className="mt-2 text-sm text-warmTwo/80">
            Register with your details, then log in to continue.
          </p>

          {error ? (
            <div className="mt-5 rounded-2xl border border-base-depth bg-warm p-4 text-sm text-warmTwo">
              {error}
            </div>
          ) : null}

          {okMsg ? (
            <div className="mt-5 rounded-2xl border border-base-depth bg-base-cream p-4 text-sm text-warmTwo">
              {okMsg}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="block text-xs font-semibold text-warmTwo mb-1">
                  NID
                </span>
                <input
                  value={form.nid}
                  onChange={(e) => setField("nid", e.target.value)}
                  className="w-full rounded-2xl border border-base-depth bg-warm px-4 py-3 text-sm text-warmTwo focus:outline-none focus:ring-2 focus:ring-muted"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-semibold text-warmTwo mb-1">
                  Contact
                </span>
                <input
                  value={form.contact}
                  onChange={(e) => setField("contact", e.target.value)}
                  className="w-full rounded-2xl border border-base-depth bg-warm px-4 py-3 text-sm text-warmTwo focus:outline-none focus:ring-2 focus:ring-muted"
                />
              </label>
            </div>

            <label className="block">
              <span className="block text-xs font-semibold text-warmTwo mb-1">
                Name
              </span>
              <input
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                className="w-full rounded-2xl border border-base-depth bg-warm px-4 py-3 text-sm text-warmTwo focus:outline-none focus:ring-2 focus:ring-muted"
              />
            </label>

            <label className="block">
              <span className="block text-xs font-semibold text-warmTwo mb-1">
                Email
              </span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                className="w-full rounded-2xl border border-base-depth bg-warm px-4 py-3 text-sm text-warmTwo focus:outline-none focus:ring-2 focus:ring-muted"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="block text-xs font-semibold text-warmTwo mb-1">
                  Password
                </span>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setField("password", e.target.value)}
                  className="w-full rounded-2xl border border-base-depth bg-warm px-4 py-3 text-sm text-warmTwo focus:outline-none focus:ring-2 focus:ring-muted"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-semibold text-warmTwo mb-1">
                  Confirm
                </span>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setField("confirmPassword", e.target.value)}
                  className="w-full rounded-2xl border border-base-depth bg-warm px-4 py-3 text-sm text-warmTwo focus:outline-none focus:ring-2 focus:ring-muted"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full rounded-2xl border border-base-depth bg-mint text-warmTwo hover:bg-muted disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-warmTwo/80">
            Already have an account?{" "}
            <Link
              href={`/login?next=${encodeURIComponent(nextUrl)}`}
              className="font-semibold hover:text-muted"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

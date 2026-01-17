"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useMemo, useState } from "react";

function getNiceError(error) {
  if (!error) return "";
  const map = {
    CredentialsSignin: "Invalid email or password.",
    OAuthAccountNotLinked:
      "This email is already registered with a different sign-in method.",
    AccessDenied: "Access denied.",
    Configuration: "Auth configuration error. Check env variables.",
  };
  return map[error] || "Login failed. Please try again.";
}

export default function LoginPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const nextUrl = sp.get("next") || "/all-page";
  const urlError = sp.get("error");
  const registered = sp.get("registered");

  const demoEmail = process.env.NEXT_PUBLIC_MOCK_EMAIL || "demo@itembox.com";
  const demoPassword = process.env.NEXT_PUBLIC_MOCK_PASSWORD || "Demo1234";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [info, setInfo] = useState("");

  const friendlyUrlError = useMemo(() => getNiceError(urlError), [urlError]);

  async function onSubmit(e) {
    e.preventDefault();
    setFormError("");
    setInfo("");

    if (!email || !password) {
      setFormError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: nextUrl,
      });

      if (!res || res.error) {
        setFormError(getNiceError(res?.error || "CredentialsSignin"));
        setLoading(false);
        return;
      }

      router.push(res.url || nextUrl);
      router.refresh();
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    await signIn("google", { callbackUrl: nextUrl });
  }

  function useDemo() {
    setFormError("");
    setInfo("Demo credentials filled. Click Sign In.");
    setEmail(demoEmail);
    setPassword(demoPassword);
  }

  async function copyDemo() {
    const text = `Email: ${demoEmail}\nPassword: ${demoPassword}`;
    try {
      await navigator.clipboard.writeText(text);
      setInfo("Demo credentials copied.");
    } catch {
      // Edge case: clipboard blocked
      setInfo(
        "Copy failed (browser blocked). You can manually copy from the box.",
      );
    }
  }

  return (
    <main className="bg-base-cream">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-xl rounded-3xl border border-base-depth bg-base-light p-7 sm:p-10">
          <h1 className="text-2xl font-semibold text-warmTwo">Login</h1>
          <p className="mt-2 text-sm text-warmTwo/80">
            Sign in to access protected actions like adding items.
          </p>

          {/* Demo Login Panel */}
          <div className="mt-5 rounded-3xl border border-base-depth bg-base-cream p-5">
            <p className="text-sm font-semibold text-warmTwo">
              Demo (Mock) Login
            </p>
            <p className="mt-1 text-xs text-warmTwo/75">
              Use this to quickly verify websites features
            </p>

            <div className="mt-3 grid gap-2 text-sm text-warmTwo">
              <div className="rounded-2xl border border-base-depth bg-base-light px-4 py-3">
                <span className="text-xs text-warmTwo/70">Email</span>
                <div className="font-semibold break-all">{demoEmail}</div>
              </div>
              <div className="rounded-2xl border border-base-depth bg-base-light px-4 py-3">
                <span className="text-xs text-warmTwo/70">Password</span>
                <div className="font-semibold break-all">{demoPassword}</div>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={useDemo}
                disabled={loading}
                className="btn rounded-2xl border border-base-depth bg-mint text-warmTwo hover:bg-muted disabled:opacity-60"
              >
                Use Demo
              </button>
              <button
                type="button"
                onClick={copyDemo}
                disabled={loading}
                className="btn rounded-2xl border border-base-depth bg-warm text-warmTwo hover:bg-muted disabled:opacity-60"
              >
                Copy
              </button>
            </div>
          </div>

          {registered ? (
            <div className="mt-5 rounded-2xl border border-base-depth bg-base-cream p-4 text-sm text-warmTwo">
              Account created successfully. Please log in.
            </div>
          ) : null}

          {friendlyUrlError ? (
            <div className="mt-5 rounded-2xl border border-base-depth bg-warm p-4 text-sm text-warmTwo">
              {friendlyUrlError}
            </div>
          ) : null}

          {formError ? (
            <div className="mt-5 rounded-2xl border border-base-depth bg-warm p-4 text-sm text-warmTwo">
              {formError}
            </div>
          ) : null}

          {info ? (
            <div className="mt-5 rounded-2xl border border-base-depth bg-base-cream p-4 text-sm text-warmTwo">
              {info}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="block text-xs font-semibold text-warmTwo mb-1">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-base-depth bg-warm px-4 py-3 text-sm text-warmTwo placeholder:text-warmTwo/60 focus:outline-none focus:ring-2 focus:ring-muted"
                autoComplete="email"
              />
            </label>

            <label className="block">
              <span className="block text-xs font-semibold text-warmTwo mb-1">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-base-depth bg-warm px-4 py-3 text-sm text-warmTwo placeholder:text-warmTwo/60 focus:outline-none focus:ring-2 focus:ring-muted"
                autoComplete="current-password"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full rounded-2xl border border-base-depth bg-mint text-warmTwo hover:bg-muted disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="my-6 border-t border-base-depth/70" />

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="btn w-full rounded-2xl border border-base-depth bg-base-cream text-warmTwo hover:bg-base-light disabled:opacity-60"
          >
            Continue with Google
          </button>

          <p className="mt-6 text-sm text-warmTwo/80">
            Don’t have an account?{" "}
            <Link
              href={`/register?next=${encodeURIComponent(nextUrl)}`}
              className="font-semibold hover:text-muted"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

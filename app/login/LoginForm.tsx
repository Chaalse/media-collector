"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { loginWithEmail } from "@/lib/auth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await loginWithEmail(trimmedEmail);

      if (result.success) {
        router.push("/");
      } else {
        setError(result.error);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-4 px-6"
      noValidate
    >
      <h1 className="sr-only">Sign in</h1>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-text-primary"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={isLoading}
          aria-describedby={error ? "email-error" : undefined}
          aria-invalid={error ? true : undefined}
          className="h-12 rounded-lg border border-border-primary bg-surface-primary px-4 text-base text-text-primary placeholder:text-text-muted focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-focus-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      {error && (
        <p
          id="email-error"
          role="alert"
          className="text-sm text-error-text"
        >
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="flex h-12 items-center justify-center rounded-lg bg-primary px-5 text-base font-medium text-on-primary transition-colors hover:bg-primary-hover active:bg-primary-active focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Signing in\u2026" : "Sign in"}
      </button>
    </form>
  );
}

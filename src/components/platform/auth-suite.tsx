"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Braces,
  Code2,
  Eye,
  EyeOff,
  GitBranch,
  KeyRound,
  Mail,
  Medal,
  Terminal,
  Timer,
  Trophy
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { setDemoUser } from "@/lib/demo-auth";
import { cn } from "@/lib/utils";

type AuthMode = "signin" | "signup" | "forgot";
type AccountType = "user" | "admin";
type FormState = {
  handle: string;
  email: string;
  password: string;
  secretCode: string;
};

const emptyState: FormState = {
  handle: "",
  email: "",
  password: "",
  secretCode: ""
};

const copy = {
  signin: {
    title: "Welcome back",
    subtitle: "Sign in to continue solving problems, joining contests, and tracking your progress.",
    action: "Sign in",
    success: "Signed in successfully. Opening your dashboard..."
  },
  signup: {
    title: "Create your account",
    subtitle: "Start practicing, competing, and building your competitive programming profile.",
    action: "Create account",
    success: "Account created. You can now start your practice journey."
  },
  forgot: {
    title: "Reset your password",
    subtitle: "Enter your email and we will send a secure password reset link.",
    action: "Send reset link",
    success: "Password reset request accepted. Check your inbox for the next step."
  }
};

const arenaSignals = [
  { label: "Contests", value: "Rated rounds", icon: Trophy },
  { label: "Practice", value: "Curated sets", icon: Braces },
  { label: "Ratings", value: "Live growth", icon: Medal },
  { label: "Judge", value: "Fast verdicts", icon: Timer }
];

export function AuthSuite() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>("user");
  const [mode, setMode] = useState<AuthMode>("signin");
  const [form, setForm] = useState<FormState>(emptyState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const passwordScore = useMemo(() => {
    let score = 0;
    if (form.password.length >= 8) score += 1;
    if (/[A-Z]/.test(form.password)) score += 1;
    if (/[0-9]/.test(form.password)) score += 1;
    if (/[^A-Za-z0-9]/.test(form.password)) score += 1;
    return score;
  }, [form.password]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!form.email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    if (mode === "signup" && form.handle.trim().length < 3) {
      setError("Choose a handle with at least 3 characters.");
      return;
    }

    if (accountType === "admin" && mode === "forgot") {
      setError("Admin password recovery should be handled by the platform owner.");
      return;
    }

    if (accountType === "admin" && mode === "signup" && form.secretCode !== "153723") {
      setError("Enter the correct admin secret code.");
      return;
    }

    if (mode !== "forgot" && form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);

    const endpoint =
      accountType === "admin"
        ? mode === "signin"
          ? "/api/v1/auth/admin-login"
          : "/api/v1/auth/admin-signup"
        : mode === "signin"
          ? "/api/v1/auth/login"
          : mode === "signup"
            ? "/api/v1/auth/signup"
            : "/api/v1/auth/forgot-password";

    const payload =
      mode === "forgot"
        ? { email: form.email }
        : mode === "signin"
          ? { email: form.email, password: form.password }
          : {
              handle: form.handle,
              email: form.email,
              password: form.password,
              secretCode: form.secretCode
            };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = (await response.json()) as { error?: string; user?: { role?: "USER" | "ADMIN" } };

      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setMessage(copy[mode].success);

      if (mode === "signin") {
        const role = data.user?.role === "ADMIN" ? "ADMIN" : "USER";
        setDemoUser(form.email, role);
        window.setTimeout(() => router.push(role === "ADMIN" ? "/admin" : "/dashboard"), 450);
      }
    } catch {
      setError("Could not reach the auth service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setError(null);
    setMessage(null);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-ink-950 text-white">
      <div className="absolute inset-0 bg-radial-grid bg-[length:24px_24px] opacity-[0.16]" />
      <div className="absolute left-[12%] top-[8%] h-72 w-72 rounded-full bg-mint-300/10 blur-3xl" />
      <div className="absolute bottom-[12%] right-[10%] h-80 w-80 rounded-full bg-amberline-300/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between">
          <Link className="focus-ring flex items-center gap-3 rounded-md" href="/">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-premium-line text-ink-950">
              <Code2 className="h-5 w-5" />
            </span>
            <span className="font-semibold">NimbleJudge</span>
          </Link>
          <Link className="focus-ring inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white/62 hover:bg-white/[0.06] hover:text-white" href="/">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </header>

        <section className="grid flex-1 place-items-center py-10">
          <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_460px] lg:items-center">
            <div className="hidden lg:block">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-md border border-mint-300/20 bg-mint-300/10 px-3 py-2 text-sm text-mint-300">
                  <Terminal className="h-4 w-4" />
                  Competitive programming arena
                </div>
                <h1 className="mt-6 text-balance text-5xl font-semibold leading-tight">
                  Practice, compete, and improve from one polished workspace.
                </h1>
                <p className="mt-5 text-lg leading-8 text-white/62">
                  Your account connects problem solving, contest history, submissions,
                  editor preferences, and learning analytics.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {arenaSignals.map((signal) => (
                    <div className="rounded-md border border-white/10 bg-white/[0.055] p-5 backdrop-blur" key={signal.label}>
                      <div className="grid h-12 w-12 place-items-center rounded-md bg-mint-300/10 text-mint-300">
                        <signal.icon className="h-6 w-6" />
                      </div>
                      <div className="mt-4 text-lg font-semibold">{signal.label}</div>
                      <div className="mt-1 text-sm text-white/48">{signal.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-md border border-white/10 bg-white/[0.07] p-5 shadow-panel backdrop-blur-xl sm:p-7">
              <div className="mb-4 grid grid-cols-2 rounded-md border border-white/10 bg-ink-900 p-1">
                {[
                  ["user", "User"],
                  ["admin", "Admin"]
                ].map(([key, label]) => (
                  <button
                    className={cn(
                      "focus-ring h-10 rounded-md text-sm font-semibold text-white/56 transition",
                      accountType === key && "bg-mint-300 text-ink-950"
                    )}
                    key={key}
                    onClick={() => {
                      setAccountType(key as AccountType);
                      setMode("signin");
                      setError(null);
                      setMessage(null);
                    }}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 rounded-md border border-white/10 bg-ink-900 p-1">
                {[
                  ["signin", "Sign in"],
                  ["signup", "Sign up"],
                  ["forgot", "Reset"]
                ].filter(([key]) => !(accountType === "admin" && key === "forgot")).map(([key, label]) => (
                  <button
                    className={cn(
                      "focus-ring h-10 rounded-md text-sm font-semibold text-white/56 transition",
                      mode === key && "bg-white text-ink-950"
                    )}
                    key={key}
                    onClick={() => switchMode(key as AuthMode)}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="text-3xl font-semibold">{copy[mode].title}</h2>
                <p className="mt-3 leading-7 text-white/58">{copy[mode].subtitle}</p>
              </div>

              <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
                {mode === "signup" && (
                  <label className="grid gap-2 text-sm font-medium text-white/68">
                    Handle
                    <input
                      autoComplete="username"
                      className="focus-ring h-12 rounded-md border border-white/10 bg-ink-900 px-3 text-white placeholder:text-white/28"
                      onChange={(event) => setForm((current) => ({ ...current, handle: event.target.value }))}
                      placeholder="tourist_mode"
                      value={form.handle}
                    />
                  </label>
                )}

                {accountType === "admin" && mode === "signup" && (
                  <label className="grid gap-2 text-sm font-medium text-white/68">
                    Admin secret code
                    <input
                      autoComplete="off"
                      className="focus-ring h-12 rounded-md border border-white/10 bg-ink-900 px-3 text-white placeholder:text-white/28"
                      onChange={(event) => setForm((current) => ({ ...current, secretCode: event.target.value }))}
                      placeholder="Enter secret code"
                      value={form.secretCode}
                    />
                  </label>
                )}

                <label className="grid gap-2 text-sm font-medium text-white/68">
                  Email
                  <input
                    autoComplete="email"
                    className="focus-ring h-12 rounded-md border border-white/10 bg-ink-900 px-3 text-white placeholder:text-white/28"
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    placeholder="you@example.com"
                    type="email"
                    value={form.email}
                  />
                </label>

                {mode !== "forgot" && (
                  <label className="grid gap-2 text-sm font-medium text-white/68">
                    Password
                    <div className="relative">
                      <input
                        autoComplete={mode === "signin" ? "current-password" : "new-password"}
                        className="focus-ring h-12 w-full rounded-md border border-white/10 bg-ink-900 px-3 pr-12 text-white placeholder:text-white/28"
                        onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                        placeholder="Minimum 8 characters"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                      />
                      <button
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="focus-ring absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-md text-white/46 hover:bg-white/[0.06] hover:text-white"
                        onClick={() => setShowPassword((current) => !current)}
                        type="button"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </label>
                )}

                {mode === "signup" && (
                  <div>
                    <div className="grid grid-cols-4 gap-2">
                      {[0, 1, 2, 3].map((item) => (
                        <span
                          className={cn(
                            "h-2 rounded-full bg-white/[0.08]",
                            passwordScore > item && "bg-mint-300"
                          )}
                          key={item}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-white/42">
                      Use 8+ characters with uppercase, number, and symbol for a stronger password.
                    </p>
                  </div>
                )}

                {message && (
                  <div className="rounded-md border border-mint-300/20 bg-mint-300/10 p-3 text-sm leading-6 text-mint-300">
                    {message}
                  </div>
                )}
                {error && (
                  <div className="rounded-md border border-coral-400/20 bg-coral-400/10 p-3 text-sm leading-6 text-coral-300">
                    {error}
                  </div>
                )}

                <Button className="w-full" size="lg" type="submit">
                  <KeyRound className="h-5 w-5" />
                  {isSubmitting ? "Please wait..." : copy[mode].action}
                </Button>
              </form>

              {mode !== "forgot" && (
                <>
                  <div className="my-6 flex items-center gap-3 text-xs text-white/36">
                    <span className="h-px flex-1 bg-white/10" />
                    or continue with
                    <span className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button className="w-full" type="button" variant="secondary">
                      <GitBranch className="h-4 w-4" />
                      GitHub
                    </Button>
                    <Button className="w-full" type="button" variant="secondary">
                      <Mail className="h-4 w-4" />
                      Google
                    </Button>
                  </div>
                </>
              )}

              <div className="mt-6 text-center text-sm text-white/52">
                {mode === "signin" && (
                  <>
                    {accountType === "admin" ? "Need admin access?" : "New here?"}{" "}
                    <button className="text-mint-300 hover:text-mint-200" onClick={() => switchMode("signup")} type="button">
                      {accountType === "admin" ? "Create admin account" : "Create an account"}
                    </button>
                    {accountType === "user" && (
                      <>
                        <span className="mx-2 text-white/24">|</span>
                        <button className="text-mint-300 hover:text-mint-200" onClick={() => switchMode("forgot")} type="button">
                          Forgot password?
                        </button>
                      </>
                    )}
                  </>
                )}
                {mode === "signup" && (
                  <>
                    Already have an account?{" "}
                    <button className="text-mint-300 hover:text-mint-200" onClick={() => switchMode("signin")} type="button">
                      Sign in
                    </button>
                  </>
                )}
                {mode === "forgot" && (
                  <>
                    Remembered your password?{" "}
                    <button className="text-mint-300 hover:text-mint-200" onClick={() => switchMode("signin")} type="button">
                      Sign in
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

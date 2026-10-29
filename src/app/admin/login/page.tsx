"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, KeyRound, AlertCircle, CheckCircle2, Loader2, Eye, EyeOff } from "lucide-react";
import { authApi, ApiError } from "@/lib/api-client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const res = await authApi.login(email, password);
      if (res.success) {
        setSuccess("Authentication verified. Redirecting to admin portal...");
        const redirectParam = searchParams.get("redirect");
        const destination =
          redirectParam &&
          redirectParam.startsWith("/admin") &&
          redirectParam !== "/admin/login"
            ? redirectParam
            : "/admin";
        setTimeout(() => {
          router.push(destination);
        }, 600);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.issues && err.issues.length > 0) {
          setError(err.issues.map((i) => i.message).join(". "));
        } else {
          setError(err.message);
        }
      } else {
        setError(err instanceof Error ? err.message : "An unexpected authentication error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md my-auto">
      {/* Terminal Card Window */}
      <div className="rounded-xl bg-[#0b0f19] border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d121f] border-b border-slate-800 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-xs text-slate-400">
              $ auth --owner-login
            </span>
          </div>
          <span className="font-mono text-[11px] text-emerald-400/90 font-medium">
            TLS Encrypted
          </span>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mx-auto text-emerald-400 mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
              Owner Authentication
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Sign in to manage portfolio content, security & account settings.
            </p>
          </div>

          {/* Feedback Alerts */}
          {error && (
            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs sm:text-sm animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-medium text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mehedi.dev"
                  autoComplete="email"
                  className="w-full pl-9 pr-3 py-2 bg-slate-900/90 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full pl-9 pr-10 py-2 bg-slate-900/90 border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600/50 text-slate-950 font-semibold font-mono text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Authenticate & Sign In</span>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800 text-center">
            <span className="text-[11px] font-mono text-slate-500">
              Protected portfolio administrator area.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="w-full max-w-md my-auto flex items-center justify-center p-8 text-slate-400 font-mono text-xs">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
        </div>
      }
    >
      <LoginForm />
    </React.Suspense>
  );
}

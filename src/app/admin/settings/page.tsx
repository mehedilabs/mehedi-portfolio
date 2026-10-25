"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  KeyRound,
  Mail,
  LogOut,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Database,
  User,
  Clock,
  RefreshCw,
} from "lucide-react";
import { authApi, publicApi, ApiError, AuthUser } from "@/lib/api-client";

export default function AdminSettingsPage() {
  const router = useRouter();

  // Active User State
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [isVerifying, setIsVerifying] = React.useState(true);

  // Change Password Form State
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordLoading, setPasswordLoading] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = React.useState<string | null>(null);

  // Change Email Form State
  const [newEmail, setNewEmail] = React.useState("");
  const [emailAuthPassword, setEmailAuthPassword] = React.useState("");
  const [emailLoading, setEmailLoading] = React.useState(false);
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [emailSuccess, setEmailSuccess] = React.useState<string | null>(null);

  // System Health State
  const [systemHealth, setSystemHealth] = React.useState<Record<string, unknown> | null>(null);
  const [healthLoading, setHealthLoading] = React.useState(false);

  // Manual refresh for health probe
  const fetchHealth = React.useCallback(async () => {
    setHealthLoading(true);
    try {
      const data = await publicApi.getReadiness();
      setSystemHealth(data as Record<string, unknown>);
    } catch {
      setSystemHealth({ status: "offline", database: { connected: false } });
    } finally {
      setHealthLoading(false);
    }
  }, []);

  // Verify Active Session on Mount
  React.useEffect(() => {
    let active = true;

    authApi
      .getMe()
      .then((res) => {
        if (!active) return;
        if (res.success && res.user) {
          setUser(res.user);
        } else {
          router.push("/admin/login");
        }
      })
      .catch(() => {
        if (active) router.push("/admin/login");
      })
      .finally(() => {
        if (active) setIsVerifying(false);
      });

    publicApi
      .getReadiness()
      .then((data) => {
        if (active) setSystemHealth(data as Record<string, unknown>);
      })
      .catch(() => {
        if (active) setSystemHealth({ status: "offline", database: { connected: false } });
      });

    return () => {
      active = false;
    };
  }, [router]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore network errors during logout
    } finally {
      router.push("/admin/login");
    }
  };

  // Handle Change Password Submit
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await authApi.changePassword(currentPassword, newPassword);
      if (res.success) {
        setPasswordSuccess(res.message || "Password changed successfully.");
        setCurrentPassword("");
        setNewPassword("");
        if (confirmPassword) setConfirmPassword("");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setPasswordError(err.message);
      } else {
        setPasswordError("Failed to update password. Please check your credentials.");
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  // Handle Change Email Submit
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setEmailSuccess(null);

    setEmailLoading(true);
    try {
      const res = await authApi.changeEmail(emailAuthPassword, newEmail);
      if (res.success) {
        setEmailSuccess(res.message || "Email updated successfully.");
        if (res.user) {
          setUser(res.user);
        }
        setNewEmail("");
        setEmailAuthPassword("");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setEmailError(err.message);
      } else {
        setEmailError("Failed to change email address.");
      }
    } finally {
      setEmailLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-400 font-mono text-sm gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
        <span>Verifying active security session...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl space-y-8 py-4">
      {/* Top Profile & Session Summary Banner */}
      <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white font-mono">{user?.name || "Owner"}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                {user?.role || "Owner"}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{user?.email}</p>
            {user?.lastLogin && (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono mt-1">
                <Clock className="w-3 h-3" />
                <span>Last login: {new Date(user.lastLogin).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleLogout}
          type="button"
          className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-rose-950/40 border border-slate-700/80 hover:border-rose-500/50 text-slate-300 hover:text-rose-400 font-mono text-xs flex items-center gap-2 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Change Password */}
        <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
              <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                Change Password
              </h2>
            </div>

            <p className="text-xs text-slate-400">
              Verify your current password and specify a strong new password. Updating this will invalidate all other active sessions.
            </p>

            {passwordError && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-3.5 pt-1">
              <div className="space-y-1">
                <label className="block text-xs font-mono text-slate-300">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono text-slate-300">
                  New Password (min 8 chars)
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 chars with number/symbol"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono text-slate-300">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full mt-2 py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600/50 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-2 transition-all"
              >
                {passwordLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <span>Update Password & Invalidate Sessions</span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Card 2: Change Login Email */}
        <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
              <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400">
                <Mail className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                Change Login Email
              </h2>
            </div>

            <p className="text-xs text-slate-400">
              Update the primary login email. You must provide your current password for cryptographic reauthentication.
            </p>

            {emailError && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{emailError}</span>
              </div>
            )}

            {emailSuccess && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{emailSuccess}</span>
              </div>
            )}

            <form onSubmit={handleEmailSubmit} className="space-y-3.5 pt-1">
              <div className="space-y-1">
                <label className="block text-xs font-mono text-slate-400">
                  Current Email
                </label>
                <input
                  type="text"
                  disabled
                  value={user?.email || ""}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-500 cursor-not-allowed font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono text-slate-300">
                  New Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="new-admin@mehedi.dev"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono text-slate-300">
                  Verify Current Password
                </label>
                <input
                  type="password"
                  required
                  value={emailAuthPassword}
                  onChange={(e) => setEmailAuthPassword(e.target.value)}
                  placeholder="Current password verification"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={emailLoading}
                className="w-full mt-2 py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600/50 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-2 transition-all"
              >
                {emailLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying & Updating...</span>
                  </>
                ) : (
                  <span>Verify Password & Update Email</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Card 3: Backend & Database Connection Health */}
      <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400">
              <Database className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
              Backend API & MongoDB Atlas Status
            </h2>
          </div>

          <button
            onClick={fetchHealth}
            disabled={healthLoading}
            type="button"
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Refresh Health Probe"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${healthLoading ? "animate-spin text-emerald-400" : ""}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-500 block text-[11px] mb-1">API SERVICE</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-semibold">
                {String(systemHealth?.status || "Checking...").toUpperCase()}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-500 block text-[11px] mb-1">MONGODB ATLAS</span>
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  (systemHealth?.database as Record<string, unknown>)?.connected
                    ? "bg-emerald-400"
                    : "bg-amber-400"
                }`}
              />
              <span className="text-white font-semibold">
                {(systemHealth?.database as Record<string, unknown>)?.connected
                  ? "Connected (Atlas)"
                  : "Graceful Fallback Mode"}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-500 block text-[11px] mb-1">SECURITY ENGINE</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-white font-semibold">JWT / Argon / Bcrypt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

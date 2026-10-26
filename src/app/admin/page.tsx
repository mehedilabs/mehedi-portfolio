"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Code2,
  FileText,
  MessageSquare,
  Image as ImageIcon,
  ShieldCheck,
  Video,
  Layers,
  ArrowRight,
  Loader2,
  Clock,
  RefreshCw,
} from "lucide-react";
import { adminApi, authApi, AuthUser } from "@/lib/api-client";

interface OverviewStats {
  projects: number;
  skills: number;
  posts: number;
  unreadMessages: number;
  auditLogs: number;
  mediaAssets: number;
}

interface AuditLogItem {
  _id?: string;
  action: string;
  resource: string;
  userId?: string;
  userEmail?: string;
  ipAddress?: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [stats, setStats] = React.useState<OverviewStats | null>(null);
  const [auditLogs, setAuditLogs] = React.useState<AuditLogItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshIndex, setRefreshIndex] = React.useState(0);

  React.useEffect(() => {
    let isMounted = true;

    authApi
      .getMe()
      .then((userRes) => {
        if (!isMounted) return;
        if (!userRes.success || !userRes.user) {
          router.push("/admin/login");
          return;
        }
        setUser(userRes.user);
        return Promise.all([adminApi.getOverview(), adminApi.getAuditLogs(8)]);
      })
      .then((results) => {
        if (!isMounted || !results) return;
        const [overviewRes, logsRes] = results;
        if (overviewRes.success) {
          setStats(overviewRes.stats);
        }
        if (logsRes.success && Array.isArray(logsRes.data)) {
          setAuditLogs(logsRes.data as AuditLogItem[]);
        }
      })
      .catch(() => {
        if (isMounted) router.push("/admin/login");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [router, refreshIndex]);

  const handleRefresh = () => {
    setLoading(true);
    setRefreshIndex((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-slate-400 font-mono text-xs gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
        <span>Loading live database metrics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white font-mono">
              Welcome back, {user?.name || "Administrator"}
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              {user?.role}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Connected to real MongoDB Atlas instance. All modifications persist live.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          type="button"
          className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Projects */}
        <Link
          href="/admin/projects"
          className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800 hover:border-emerald-500/40 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 group-hover:text-emerald-400 mb-2">
            <Briefcase className="w-4 h-4" />
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {stats?.projects ?? 0}
          </div>
          <div className="text-xs text-slate-400 font-mono mt-0.5">Projects</div>
        </Link>

        {/* Skills */}
        <Link
          href="/admin/skills"
          className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800 hover:border-emerald-500/40 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 group-hover:text-emerald-400 mb-2">
            <Code2 className="w-4 h-4" />
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {stats?.skills ?? 0}
          </div>
          <div className="text-xs text-slate-400 font-mono mt-0.5">Skills</div>
        </Link>

        {/* Blog Posts */}
        <Link
          href="/admin/blog"
          className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800 hover:border-emerald-500/40 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 group-hover:text-emerald-400 mb-2">
            <FileText className="w-4 h-4" />
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {stats?.posts ?? 0}
          </div>
          <div className="text-xs text-slate-400 font-mono mt-0.5">Blog Posts</div>
        </Link>

        {/* Unread Inquiries */}
        <Link
          href="/admin/messages"
          className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800 hover:border-emerald-500/40 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 group-hover:text-emerald-400 mb-2">
            <MessageSquare className="w-4 h-4" />
            {(stats?.unreadMessages ?? 0) > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {stats?.unreadMessages ?? 0}
          </div>
          <div className="text-xs text-slate-400 font-mono mt-0.5">Unread Inquiries</div>
        </Link>

        {/* Media Assets */}
        <Link
          href="/admin/media"
          className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800 hover:border-emerald-500/40 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 group-hover:text-emerald-400 mb-2">
            <ImageIcon className="w-4 h-4" />
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {stats?.mediaAssets ?? 0}
          </div>
          <div className="text-xs text-slate-400 font-mono mt-0.5">Media Files</div>
        </Link>
      </div>

      {/* Critical Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section Management Card */}
        <div className="p-6 rounded-xl bg-[#0b0f19] border border-slate-800 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold font-mono text-white">
                Section Visibility & Order
              </h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Show, hide, or reorder public website sections. Hiding a section removes its nav link and closes layout gaps cleanly without deleting database content.
            </p>
          </div>
          <div className="pt-4 mt-2">
            <Link
              href="/admin/sections"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs transition-colors"
            >
              <span>Manage Sections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Video Showcase Card */}
        <div className="p-6 rounded-xl bg-[#0b0f19] border border-slate-800 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Video className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold font-mono text-white">
                Video Showcase (Google Drive)
              </h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Configure the showcase video by pasting a Google Drive sharing link (&quot;Anyone with the link&quot;). No large video uploads needed.
            </p>
          </div>
          <div className="pt-4 mt-2">
            <Link
              href="/admin/video"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs transition-colors"
            >
              <span>Configure Video Link</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Security Audit Activity Stream */}
      <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
              Recent System & Security Events
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-500">Live Audit Trail</span>
        </div>

        {auditLogs.length === 0 ? (
          <div className="py-8 text-center text-xs font-mono text-slate-500">
            No audit events recorded yet.
          </div>
        ) : (
          <div className="space-y-2">
            {auditLogs.map((log, index) => (
              <div
                key={log._id || index}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800/60 text-xs font-mono"
              >
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-slate-200">{log.action}</span>
                  <span className="text-slate-500">on {log.resource}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                  {log.ipAddress && <span>{log.ipAddress}</span>}
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(log.createdAt).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

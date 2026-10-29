"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Shield,
  ArrowLeft,
  LayoutDashboard,
  Layers,
  User,
  Video,
  Briefcase,
  GraduationCap,
  Code2,
  FileText,
  MessageSquare,
  HelpCircle,
  Image as ImageIcon,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { authApi } from "@/lib/api-client";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Section Visibility", href: "/admin/sections", icon: Layers, badge: "Priority" },
  { label: "Profile & Resume", href: "/admin/profile", icon: User },
  { label: "Video Showcase", href: "/admin/video", icon: Video },
  { label: "Projects & Cases", href: "/admin/projects", icon: Briefcase },
  { label: "Experience CMS", href: "/admin/experience", icon: Briefcase },
  { label: "Academics & Certs", href: "/admin/education", icon: GraduationCap },
  { label: "Skills & Stack", href: "/admin/skills", icon: Code2 },
  { label: "Blog CMS", href: "/admin/blog", icon: FileText },
  { label: "Contact Inbox", href: "/admin/messages", icon: MessageSquare },
  { label: "Assistant Q&A", href: "/admin/assistant", icon: HelpCircle },
  { label: "Media Library", href: "/admin/media", icon: ImageIcon },
  { label: "Account Security", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userRole, setUserRole] = React.useState<string>("owner");

  const isLoginPage = pathname === "/admin/login";
  const [authChecked, setAuthChecked] = React.useState(isLoginPage);

  React.useEffect(() => {
    if (!isLoginPage) {
      let isMounted = true;
      const redirectToLogin = () => {
        const redirectUrl =
          pathname && pathname !== "/admin" && pathname !== "/admin/login"
            ? `/admin/login?redirect=${encodeURIComponent(pathname)}`
            : "/admin/login";
        router.push(redirectUrl);
      };

      authApi
        .getMe()
        .then((res) => {
          if (!isMounted) return;
          if (res.success && res.user) {
            setUserRole(res.user.role);
            setAuthChecked(true);
          } else {
            redirectToLogin();
          }
        })
        .catch(() => {
          if (isMounted) {
            redirectToLogin();
          }
        });

      return () => {
        isMounted = false;
      };
    }
  }, [isLoginPage, pathname, router]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {}
    router.push("/admin/login");
  };

  if (!authChecked && !isLoginPage) {
    return (
      <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col items-center justify-center p-4 font-mono text-xs gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
        <span className="text-slate-400">Verifying administrator session...</span>
      </div>
    );
  }

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/25 selection:text-emerald-300">
        <header className="border-b border-slate-800/80 bg-[#070a13]/90 backdrop-blur-md px-6 py-3 flex items-center justify-between">
          <Link
            href="/en"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Public Website</span>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-sm font-semibold text-white">
              mehedi<span className="text-emerald-400">.admin</span>
            </span>
          </div>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/25 selection:text-emerald-300">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#070a13]/95 backdrop-blur-md px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Shield className="w-4 h-4" />
            </div>
            <span className="font-mono text-sm font-bold tracking-tight text-white">
              mehedi<span className="text-emerald-400">.cms</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 ml-1">
              {userRole}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <Link
            href="/en"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-emerald-400 transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            type="button"
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/40 text-slate-300 hover:text-rose-400 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Workspace with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 border-r border-slate-800/80 bg-[#080c16] flex-col justify-between p-4 shrink-0">
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-colors ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-400">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
            Database-backed CMS v3.0
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 top-[53px] z-50 md:hidden bg-[#070a13]/95 backdrop-blur-lg p-4 overflow-y-auto">
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-mono transition-colors ${
                      isActive
                        ? "bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30"
                        : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

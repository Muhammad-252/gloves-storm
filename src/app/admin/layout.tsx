"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/lib/auth/adminAuth";
import {
  LayoutDashboard,
  Box,
  Layers,
  FolderGit2,
  Quote,
  BookOpen,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  Loader2,
  Lock,
  Sliders,
  KeyRound,
  Mail,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

const sidebarNav = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Inquiries (CRM)", href: "/admin/inquiries", icon: Inbox },
  { name: "Customizer", href: "/admin/customizer", icon: Sliders },
  { name: "Products", href: "/admin/products", icon: Box },
  { name: "Categories", href: "/admin/categories", icon: Layers },
  { name: "Previous Work", href: "/admin/projects", icon: FolderGit2 },
  { name: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { name: "Blog / Journal", href: "/admin/blog", icon: BookOpen },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, userEmail, login, logout, resetPassword } = useAdminAuth();
  const pathname = usePathname();

  const [authMode, setAuthMode] = useState<"login" | "forgot_password">("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState<string | null>(null);
  const [forgotError, setForgotError] = useState<string | null>(null);

  // Loading state during auth check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center text-amber-600">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Not logged in -> Show sleek luxury light login or forgot password form
  if (!isAuthenticated) {
    const handleLoginSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoginLoading(true);
      setLoginError(null);

      const res = await login(loginEmail, loginPassword);
      if (!res.success) {
        setLoginError(res.error || "Invalid credentials.");
      }
      setLoginLoading(false);
    };

    const handleForgotSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setForgotLoading(true);
      setForgotError(null);
      setForgotSuccess(null);

      const res = await resetPassword(forgotEmail);
      if (res.success) {
        setForgotSuccess(res.message || "Password recovery instructions have been sent.");
      } else {
        setForgotError(res.error || "Unable to send password reset request.");
      }
      setForgotLoading(false);
    };

    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md bg-white border border-neutral-200 rounded-3xl p-8 sm:p-10 shadow-xl relative">
          {authMode === "forgot_password" ? (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-50 border border-amber-200 rounded-2xl text-amber-600 mb-4">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-black uppercase tracking-tight text-[#0f172a] mb-2">
                  Reset Password
                </h1>
                <p className="text-xs text-neutral-500">
                  Enter your registered administrator email to receive secure password recovery instructions.
                </p>
              </div>

              {forgotSuccess && (
                <div className="p-3.5 mb-6 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                  <div className="leading-relaxed">{forgotSuccess}</div>
                </div>
              )}

              {forgotError && (
                <div className="p-3 mb-6 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                  {forgotError}
                </div>
              )}

              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                    Administrator Email
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <Mail className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="admin@glovesstorm.com"
                      value={forgotEmail}
                      onChange={(e) => {
                        setForgotEmail(e.target.value);
                        if (forgotError) setForgotError(null);
                      }}
                      className="w-full bg-white border border-neutral-300 rounded-xl focus:border-amber-600 text-[#0f172a] pl-9 pr-3.5 py-2.5 text-xs outline-none focus:ring-1 focus:ring-amber-500/20"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full bg-[#0f172a] hover:bg-neutral-800 disabled:opacity-50 text-white rounded-full py-3.5 font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer shadow-sm"
                >
                  {forgotLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Instructions...</span>
                    </>
                  ) : (
                    <span>Send Reset Instructions</span>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-neutral-200 text-center flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setForgotError(null);
                    setForgotSuccess(null);
                  }}
                  className="text-xs font-semibold uppercase tracking-wider text-amber-700 hover:text-amber-800 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </button>

                <Link
                  href="/"
                  className="text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-[#0f172a] transition-colors font-medium"
                >
                  Main Website
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-50 border border-amber-200 rounded-2xl text-amber-600 mb-4">
                  <Lock className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-black uppercase tracking-tight text-[#0f172a] mb-2">
                  GLOVES STORM CMS
                </h1>
                <p className="text-xs text-neutral-500">
                  Secure administrative access for product and order management.
                </p>
              </div>

              {loginError && (
                <div className="p-3 mb-6 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="username"
                    placeholder="admin@glovesstorm.com"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      if (loginError) setLoginError(null);
                    }}
                    className="w-full bg-white border border-neutral-300 rounded-xl focus:border-amber-600 text-[#0f172a] px-3.5 py-2.5 text-xs outline-none focus:ring-1 focus:ring-amber-500/20"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotEmail(loginEmail);
                        setAuthMode("forgot_password");
                        setForgotError(null);
                        setForgotSuccess(null);
                      }}
                      className="text-[11px] font-semibold text-amber-700 hover:text-amber-800 hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      if (loginError) setLoginError(null);
                    }}
                    className="w-full bg-white border border-neutral-300 rounded-xl focus:border-amber-600 text-[#0f172a] px-3.5 py-2.5 text-xs outline-none focus:ring-1 focus:ring-amber-500/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-[#0f172a] hover:bg-neutral-800 disabled:opacity-50 text-white rounded-full py-3.5 font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer shadow-sm"
                >
                  {loginLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <span>Sign In to Dashboard</span>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
                <Link
                  href="/"
                  className="text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-[#0f172a] transition-colors font-medium"
                >
                  ← Return to Main Website
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard Layout
  return (
    <div className="min-h-screen bg-neutral-50 flex text-[#0f172a]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col justify-between shrink-0 hidden md:flex">
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-neutral-200">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-lg text-[#0f172a] uppercase flex items-center gap-1.5">
                GLOVES STORM
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              </span>
            </Link>
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mt-0.5">
              Production CMS
            </span>
          </div>

          {/* Navigation links */}
          <nav className="p-4 space-y-1">
            {sidebarNav.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "bg-amber-50 text-amber-700 border-l-2 border-amber-600 rounded-r-xl"
                      : "text-neutral-600 hover:text-[#0f172a] hover:bg-neutral-100 rounded-xl"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile & Actions */}
        <div className="p-4 border-t border-neutral-200 space-y-3">
          <div className="px-3.5 py-2 bg-neutral-100 border border-neutral-200 rounded-xl">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500">
              Active Operator
            </span>
            <span className="text-xs text-[#0f172a] truncate block font-medium">
              {userEmail || "admin@glovesstorm.com"}
            </span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 text-xs text-neutral-600 hover:text-[#0f172a] transition-colors"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-3.5 py-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Admin Header */}
        <header className="md:hidden bg-white border-b border-neutral-200 p-4 flex items-center justify-between">
          <span className="font-bold text-sm uppercase text-[#0f172a]">GLOVES STORM CMS</span>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-amber-600 font-bold">
              View Site
            </Link>
            <button onClick={logout} className="text-xs text-red-600 font-bold">
              Logout
            </button>
          </div>
        </header>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto p-3 bg-neutral-100 border-b border-neutral-200 scrollbar-none text-[11px] font-bold uppercase">
          {sidebarNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
                pathname === item.href ? "bg-amber-500 text-neutral-950" : "text-neutral-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Content Viewport */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

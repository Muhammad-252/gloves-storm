"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SiteSettings } from "@/types/database";
import { saveSiteSettings } from "@/lib/data/clientStore";
import { useToast } from "@/components/ui/Toast";
import {
  Save,
  Loader2,
  CheckCircle,
  ExternalLink,
  RefreshCw,
  Key,
  Code,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/SocialIcons";

interface AdminSettingsClientProps {
  initialSettings: SiteSettings;
}

export default function AdminSettingsClient({ initialSettings }: AdminSettingsClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testingIg, setTestingIg] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings]);

  const handleTestInstagram = async () => {
    setTestingIg(true);
    setTestResult(null);
    try {
      // First persist current token so the API can read it
      await saveSiteSettings(settings);
      const res = await fetch("/api/instagram/feed?test=true");
      const data = await res.json();
      if (res.ok && data.connected) {
        setTestResult({
          success: true,
          message: data.message || `Connected! Fetched ${data.mediaCount || 0} media items.`,
        });
      } else {
        setTestResult({
          success: false,
          message: data.error || data.hint || "Failed to connect to Instagram Graph API.",
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || "Network error while validating Instagram token.",
      });
    } finally {
      setTestingIg(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const toastId = toast.loading("Saving Settings...", "Applying global site configurations");
    try {
      const updated = await saveSiteSettings(settings);
      setSettings(updated);
      setSaved(true);
      toast.dismiss(toastId);
      toast.success("Settings Saved", "Global configurations updated and synchronized.");
      router.refresh();
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error("Save Failed", err?.message || "Could not save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 rounded-xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Site settings successfully updated and synchronized.</span>
        </div>
      )}

      {/* Company Contact Information */}
      <div className="p-6 sm:p-8 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b border-neutral-100 pb-3">
          Company & Contact Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
              Company Legal Name
            </label>
            <input
              type="text"
              value={settings.company_name}
              onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
              className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
              Official Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
              Phone Number
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
              WhatsApp Number (With Country Code)
            </label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
            Factory Address
          </label>
          <input
            type="text"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
          />
        </div>
      </div>

      {/* Social Media Links */}
      <div className="p-6 sm:p-8 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b border-neutral-100 pb-3">
          Social Channels
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
              Instagram URL
            </label>
            <input
              type="url"
              value={settings.instagram || ""}
              onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
              className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
              LinkedIn URL
            </label>
            <input
              type="url"
              value={settings.linkedin || ""}
              onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
              className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
              Facebook URL
            </label>
            <input
              type="url"
              value={settings.facebook || ""}
              onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
              className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
              YouTube URL
            </label>
            <input
              type="url"
              value={settings.youtube || ""}
              onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
              className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Instagram Live Feed & Widget Management */}
      <div className="p-6 sm:p-8 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf] text-white flex items-center justify-center shadow-xs">
              <InstagramIcon className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a]">
                Instagram Live Feed & Widget
              </h2>
              <p className="text-[11px] text-neutral-500">
                Display your real Instagram posts & reels automatically on the &ldquo;Previous Work&rdquo; page
              </p>
            </div>
          </div>

          <a
            href="/previous-work"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800"
          >
            <span>Preview Page</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Integration Mode Switcher */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-2 font-semibold">
            Choose Connection Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSettings({ ...settings, instagram_feed_mode: "api" })}
              className={`p-4 rounded-2xl border text-left transition-all ${
                (settings.instagram_feed_mode || "api") === "api"
                  ? "border-amber-600 bg-amber-50/50 shadow-xs ring-1 ring-amber-600"
                  : "border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Key className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-neutral-900">
                  Instagram Graph API (Direct Token)
                </span>
              </div>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Connect via Meta User Access Token. Renders inside our luxury custom grid with instant fullscreen video modals.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSettings({ ...settings, instagram_feed_mode: "widget" })}
              className={`p-4 rounded-2xl border text-left transition-all ${
                settings.instagram_feed_mode === "widget"
                  ? "border-pink-600 bg-pink-50/50 shadow-xs ring-1 ring-pink-600"
                  : "border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Code className="w-4 h-4 text-pink-600" />
                <span className="text-xs font-bold text-neutral-900">
                  Third-Party Widget (Like WordPress)
                </span>
              </div>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Paste an embed snippet from Elfsight, Behold.so, or SnapWidget. Easiest setup with 1-click Instagram login.
              </p>
            </button>
          </div>
        </div>

        {/* API Token Mode Fields */}
        {(settings.instagram_feed_mode || "api") === "api" && (
          <div className="space-y-4 pt-2 border-t border-neutral-100">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] uppercase tracking-wider text-neutral-600 font-semibold">
                  Instagram User Access Token
                </label>
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="text-[11px] text-neutral-500 hover:text-black flex items-center gap-1 font-mono"
                >
                  {showToken ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showToken ? "Hide" : "Show"}</span>
                </button>
              </div>

              <div className="relative">
                <input
                  type={showToken ? "text" : "password"}
                  placeholder="IGQWR... or EAAB..."
                  value={settings.instagram_access_token || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, instagram_access_token: e.target.value })
                  }
                  className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2.5 text-xs font-mono outline-none transition-colors pr-24"
                />
                <button
                  type="button"
                  onClick={handleTestInstagram}
                  disabled={testingIg || !settings.instagram_access_token}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-[#0f172a] hover:bg-neutral-800 disabled:opacity-40 text-white text-[10px] font-mono uppercase font-bold transition-all flex items-center gap-1.5"
                >
                  {testingIg ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3 h-3" />
                  )}
                  <span>Test Sync</span>
                </button>
              </div>
              <span className="text-[11px] text-neutral-500 block mt-1">
                Can also be set in <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded">.env.local</code> as <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded">INSTAGRAM_ACCESS_TOKEN</code>.
              </span>
            </div>

            {/* Test connection result banner */}
            {testResult && (
              <div
                className={`p-3.5 rounded-xl border text-xs font-mono flex items-center gap-2.5 ${
                  testResult.success
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-red-50 border-red-200 text-red-900"
                }`}
              >
                {testResult.success ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <span>{testResult.message}</span>
              </div>
            )}

            {/* Quick Helper Box */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 space-y-1.5">
              <span className="font-bold text-neutral-900 block font-mono text-[11px] uppercase tracking-wider">
                How to get your Instagram Access Token:
              </span>
              <p>
                1. Go to <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline font-semibold">Meta for Developers</a> and create an app with <strong>Instagram Basic Display</strong>.
              </p>
              <p>
                2. Add your Instagram account (@glovesstorm) under <em>User Token Generator</em>, authorize the account, and generate a long-lived access token.
              </p>
              <p>
                3. Paste the token above and click <strong>Test Sync</strong>, then <strong>Save Settings</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Widget Mode Fields */}
        {settings.instagram_feed_mode === "widget" && (
          <div className="space-y-4 pt-2 border-t border-neutral-100">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                Widget Embed Snippet / Script Code
              </label>
              <textarea
                rows={4}
                placeholder={'<script src="https://static.elfsight.com/platform/platform.js" async></script>\n<div class="elfsight-app-..." data-elfsight-app-lazy></div>'}
                value={settings.instagram_widget_code || ""}
                onChange={(e) =>
                  setSettings({ ...settings, instagram_widget_code: e.target.value })
                }
                className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-pink-600 text-[#0f172a] rounded-xl p-3 text-xs font-mono outline-none transition-colors"
              />
            </div>

            <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-200/80 text-xs text-neutral-700 space-y-2">
              <span className="font-bold text-pink-950 block font-mono text-[11px] uppercase tracking-wider">
                Recommended Free Widget Services (WordPress Style):
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="https://elfsight.com/instagram-feed-widget/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-pink-200 text-pink-700 font-bold hover:bg-pink-100 transition-colors shadow-xs"
                >
                  <span>Elfsight Instagram Feed</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://behold.so"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-pink-200 text-pink-700 font-bold hover:bg-pink-100 transition-colors shadow-xs"
                >
                  <span>Behold.so (Zero Expiry)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://snapwidget.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-pink-200 text-pink-700 font-bold hover:bg-pink-100 transition-colors shadow-xs"
                >
                  <span>SnapWidget</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-[11px] text-neutral-500 pt-1">
                Simply sign up, connect @glovesstorm, copy their embed code, and paste it in the box above!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Hero Headline Configuration */}
      <div className="p-6 sm:p-8 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b border-neutral-100 pb-3">
          Homepage Hero Customization
        </h2>

        <div>
          <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
            Hero Headline
          </label>
          <input
            type="text"
            value={settings.hero_title}
            onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
            className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
            Hero Supporting Description
          </label>
          <textarea
            rows={2}
            value={settings.hero_description}
            onChange={(e) => setSettings({ ...settings, hero_description: e.target.value })}
            className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-[#0f172a] hover:bg-neutral-800 disabled:opacity-50 text-white rounded-full px-8 py-3 font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Updating Settings...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

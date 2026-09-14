"use client";

import { useState } from "react";
import { SiteSettings } from "@/types/database";
import { saveSiteSettings } from "@/lib/data/store";
import { Save, Loader2, CheckCircle } from "lucide-react";

interface AdminSettingsClientProps {
  initialSettings: SiteSettings;
}

export default function AdminSettingsClient({ initialSettings }: AdminSettingsClientProps) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const updated = await saveSiteSettings(settings);
    setSettings(updated);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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

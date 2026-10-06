"use client";

import { useState } from "react";
import { Testimonial } from "@/types/database";
import { saveTestimonial, deleteTestimonial } from "@/lib/data/clientStore";
import { Plus, Edit2, Trash2, Star, X } from "lucide-react";

interface AdminTestimonialsClientProps {
  initialTestimonials: Testimonial[];
}

export default function AdminTestimonialsClient({
  initialTestimonials,
}: AdminTestimonialsClientProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleOpenNew = () => {
    setEditingItem({
      client_name: "",
      company: "",
      country: "United States",
      role: "Founder",
      testimonial: "",
      rating: 5,
      featured: true,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setEditingItem({ ...t });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete testimonial from "${name}"?`)) {
      await deleteTestimonial(id);
      setTestimonials(testimonials.filter((t) => t.id !== id));
      setNotice("Testimonial deleted.");
      setTimeout(() => setNotice(null), 3000);
    }
  };

  const handleToggleFeatured = async (t: Testimonial) => {
    const updated = await saveTestimonial({
      id: t.id,
      featured: !t.featured,
    });
    setTestimonials(testimonials.map((item) => (item.id === t.id ? updated : item)));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.client_name) return;
    setSaving(true);

    const saved = await saveTestimonial(editingItem);
    if (editingItem.id) {
      setTestimonials(testimonials.map((t) => (t.id === saved.id ? saved : t)));
      setNotice("Testimonial updated.");
    } else {
      setTestimonials([saved, ...testimonials]);
      setNotice("Testimonial created.");
    }

    setSaving(false);
    setIsModalOpen(false);
    setEditingItem(null);
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="space-y-6">
      {notice && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-xs font-mono text-amber-800 rounded-xl">
          {notice}
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-500">
          {testimonials.length} Client Endorsements
        </span>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 bg-[#0f172a] hover:bg-neutral-800 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/80 border-b border-neutral-200 text-[10px] font-mono uppercase text-neutral-500">
              <tr>
                <th className="py-3.5 px-4">Client</th>
                <th className="py-3.5 px-4">Company & Country</th>
                <th className="py-3.5 px-4">Testimonial Quote</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#0f172a]">
                    {t.client_name}
                    <span className="block text-[10px] font-normal text-neutral-500">
                      {t.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600">
                    {t.company} ({t.country})
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 max-w-sm truncate italic">
                    &ldquo;{t.testimonial}&rdquo;
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-600">
                    {t.rating} / 5 ★
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleFeatured(t)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        t.featured ? "text-amber-500" : "text-neutral-300 hover:text-amber-500"
                      }`}
                    >
                      <Star className={`w-4 h-4 ${t.featured ? "fill-current" : ""}`} />
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenEdit(t)}
                        className="p-1.5 text-neutral-400 hover:text-[#0f172a] rounded-lg hover:bg-neutral-100 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id, t.client_name)}
                        className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-[#0f172a] p-1 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold uppercase tracking-tight text-[#0f172a] mb-6">
              {editingItem.id ? "Edit Testimonial" : "Add Testimonial"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.client_name || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, client_name: e.target.value })
                    }
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                    Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.company || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, company: e.target.value })
                    }
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                    Country
                  </label>
                  <input
                    type="text"
                    value={editingItem.country || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, country: e.target.value })
                    }
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={editingItem.role || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, role: e.target.value })
                    }
                    placeholder="Founder, Operations Director..."
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                  Testimonial Quote *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.testimonial || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, testimonial: e.target.value })
                  }
                  className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                  Avatar / Photo URL
                </label>
                <input
                  type="url"
                  value={editingItem.photo_url || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, photo_url: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-neutral-500 hover:text-[#0f172a] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#0f172a] hover:bg-neutral-800 text-white rounded-full px-6 py-2.5 font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                >
                  {saving ? "Saving..." : "Save Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

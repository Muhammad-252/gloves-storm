"use client";

import { useState } from "react";
import { Category } from "@/types/database";
import { saveCategory, deleteCategory } from "@/lib/data/store";
import { slugify } from "@/lib/utils";
import {
  Plus,
  Edit2,
  Trash2,
  Layers,
  ArrowUpDown,
  CheckCircle,
  X,
  Loader2,
} from "lucide-react";
import ImageUploadField from "./ImageUploadField";

interface AdminCategoriesClientProps {
  initialCategories: Category[];
}

export default function AdminCategoriesClient({
  initialCategories,
}: AdminCategoriesClientProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editingCat, setEditingCat] = useState<Partial<Category> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const parentCategories = categories.filter((c) => !c.parent_id);

  const handleOpenNew = () => {
    setEditingCat({
      name: "",
      slug: "",
      description: "",
      image_url: "",
      parent_id: null,
      sort_order: categories.length + 1,
      is_active: true,
      featured_in_menu: true,
      menu_badge: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCat({
      ...cat,
      featured_in_menu: cat.featured_in_menu ?? true,
      menu_badge: cat.menu_badge || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete category "${name}"?`)) {
      await deleteCategory(id);
      setCategories(categories.filter((c) => c.id !== id));
      setNotice(`Category "${name}" deleted.`);
      setTimeout(() => setNotice(null), 3000);
    }
  };

  const handleToggleActive = async (cat: Category) => {
    const updated = await saveCategory({
      id: cat.id,
      is_active: !cat.is_active,
    });
    setCategories(categories.map((c) => (c.id === cat.id ? updated : c)));
  };

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCat?.name) return;
    setSaving(true);

    const saved = await saveCategory({
      ...editingCat,
      slug: editingCat.slug || slugify(editingCat.name),
    });

    if (editingCat.id) {
      setCategories(categories.map((c) => (c.id === saved.id ? saved : c)));
      setNotice(`Category "${saved.name}" updated.`);
    } else {
      setCategories([...categories, saved]);
      setNotice(`New category "${saved.name}" created.`);
    }

    setSaving(false);
    setIsModalOpen(false);
    setEditingCat(null);
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="space-y-6">
      {notice && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-xs font-mono text-amber-800 rounded-xl">
          {notice}
        </div>
      )}

      {/* Control Bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-neutral-500">
            {categories.length} Total Divisions ({parentCategories.length} Main Parents)
          </span>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 bg-[#0f172a] hover:bg-neutral-800 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Category Table */}
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/80 border-b border-neutral-200 text-[10px] font-mono uppercase text-neutral-500">
              <tr>
                <th className="py-3.5 px-4">Order</th>
                <th className="py-3.5 px-4">Category Name</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Mega Menu</th>
                <th className="py-3.5 px-4">Slug</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {categories.map((cat) => {
                const parentObj = categories.find((c) => c.id === cat.parent_id);

                return (
                  <tr key={cat.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-neutral-400">
                      #{cat.sort_order}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {cat.image_url ? (
                          <div
                            className="w-10 h-10 rounded-xl bg-cover bg-center shrink-0 border border-neutral-200"
                            style={{ backgroundImage: `url(${cat.image_url})` }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-400 shrink-0 border border-neutral-200">
                            <Layers className="w-4 h-4" />
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-[#0f172a] block">
                            {cat.name}
                          </span>
                          <span className="text-[10px] text-neutral-500 line-clamp-1 max-w-xs">
                            {cat.description || "No description"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {parentObj ? (
                        <span className="text-neutral-600 text-[11px]">
                          Subcategory of <strong className="text-[#0f172a]">{parentObj.name}</strong>
                        </span>
                      ) : (
                        <span className="text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2 py-0.5 font-mono uppercase text-[10px] font-bold">
                          Parent Division
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold ${
                            cat.featured_in_menu !== false
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-neutral-100 text-neutral-500"
                          }`}
                        >
                          {cat.featured_in_menu !== false ? "In Menu" : "Hidden"}
                        </span>
                        {cat.menu_badge && (
                          <span className="text-[9px] font-mono bg-neutral-900 text-white px-1.5 py-0.5 rounded">
                            {cat.menu_badge}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-neutral-400">
                      /{cat.slug}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleActive(cat)}
                        className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full border ${
                          cat.is_active
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-neutral-100 text-neutral-500 border-neutral-200"
                        }`}
                      >
                        {cat.is_active ? "Active" : "Disabled"}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(cat)}
                          className="p-1.5 text-neutral-400 hover:text-[#0f172a] rounded-lg hover:bg-neutral-100 transition-colors"
                          title="Edit Category"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id, cat.name)}
                          className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Edit/Create Modal */}
      {isModalOpen && editingCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-[#0f172a] p-1 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 block mb-1">
                Category Builder
              </span>
              <h2 className="text-xl font-bold uppercase tracking-tight text-[#0f172a]">
                {editingCat.id ? `Edit: ${editingCat.name}` : "Create New Category"}
              </h2>
            </div>

            <form onSubmit={handleSaveSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingCat.name || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditingCat({
                      ...editingCat,
                      name: val,
                      slug: editingCat.id ? editingCat.slug : slugify(val),
                    });
                  }}
                  className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                  placeholder="e.g. Boxing, Streetwear, Gym Wear"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={editingCat.slug || ""}
                  onChange={(e) =>
                    setEditingCat({ ...editingCat, slug: slugify(e.target.value) })
                  }
                  className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none font-mono transition-colors"
                  placeholder="boxing"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                  Parent Category (Leave empty for top-level)
                </label>
                <select
                  value={editingCat.parent_id || ""}
                  onChange={(e) =>
                    setEditingCat({
                      ...editingCat,
                      parent_id: e.target.value === "" ? null : e.target.value,
                    })
                  }
                  className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                >
                  <option value="">None (Top-Level Parent Category)</option>
                  {parentCategories
                    .filter((c) => c.id !== editingCat.id)
                    .map((parent) => (
                      <option key={parent.id} value={parent.id}>
                        {parent.name}
                      </option>
                    ))}
                </select>
              </div>

              <ImageUploadField
                label="Category Cover Image"
                value={editingCat.image_url || ""}
                onChange={(url) => setEditingCat({ ...editingCat, image_url: url })}
                folder="categories"
                placeholder="https://images.unsplash.com/... or upload from computer"
                helperText="Upload category cover image directly from your device, or enter an image URL."
              />

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                  Sort Order Number
                </label>
                <input
                  type="number"
                  value={editingCat.sort_order ?? 1}
                  onChange={(e) =>
                    setEditingCat({ ...editingCat, sort_order: Number(e.target.value) })
                  }
                  className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingCat.description || ""}
                  onChange={(e) =>
                    setEditingCat({ ...editingCat, description: e.target.value })
                  }
                  className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                  placeholder="Bespoke manufacturing summary for this category..."
                />
              </div>

              {/* Mega Menu Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/80">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id="featuredInMenuToggle"
                    checked={editingCat.featured_in_menu ?? true}
                    onChange={(e) =>
                      setEditingCat({ ...editingCat, featured_in_menu: e.target.checked })
                    }
                    className="w-4 h-4 text-amber-600 rounded border-neutral-300 focus:ring-amber-500"
                  />
                  <label htmlFor="featuredInMenuToggle" className="text-xs font-semibold text-neutral-800 cursor-pointer">
                    Show in Header Mega Menu
                    <span className="block text-[10px] font-mono text-neutral-500">
                      Highlighted in desktop & mobile menu
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                    Menu Badge (e.g. Popular, Top Drop)
                  </label>
                  <input
                    type="text"
                    value={editingCat.menu_badge || ""}
                    onChange={(e) =>
                      setEditingCat({ ...editingCat, menu_badge: e.target.value })
                    }
                    placeholder="e.g. Popular"
                    className="w-full bg-white border border-neutral-300 focus:border-amber-600 text-[#0f172a] rounded-xl px-3 py-1.5 text-xs outline-none font-mono"
                  />
                </div>
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
                  {saving ? "Saving..." : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

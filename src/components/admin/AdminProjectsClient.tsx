"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Project, Category, ProjectImage } from "@/types/database";
import { saveProject, deleteProject } from "@/lib/data/clientStore";
import { slugify } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import {
  Plus,
  Edit2,
  Trash2,
  Star,
  X,
  Loader2,
  ExternalLink,
  Layers,
  Image as ImageIcon,
  CheckCircle,
  Eye,
  Sparkles,
  Upload,
} from "lucide-react";
import Link from "next/link";

interface AdminProjectsClientProps {
  initialProjects: Project[];
  categories: Category[];
}

export default function AdminProjectsClient({
  initialProjects,
  categories,
}: AdminProjectsClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>("all");
  const [editingProj, setEditingProj] = useState<Partial<Project> | null>(null);
  const [imagesList, setImagesList] = useState<string[]>([]);
  const [newImageInput, setNewImageInput] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Helper to extract image URLs from a project
  const extractImages = (proj: Partial<Project>): string[] => {
    const list: string[] = [];
    if (proj.featured_image) {
      list.push(proj.featured_image);
    }
    if (Array.isArray(proj.images)) {
      for (const img of proj.images) {
        const url = typeof img === "string" ? img : img?.image_url;
        if (url && !list.includes(url)) {
          list.push(url);
        }
      }
    }
    return list;
  };

  const handleOpenNew = () => {
    const defaultCategory = categories[0] || null;
    const initialImgs = ["/images/products/boxing-gloves-black.png"];
    setEditingProj({
      title: "",
      slug: "",
      category_id: defaultCategory?.id || null,
      industry: defaultCategory?.name || "Boxing Equipment",
      description: "",
      featured_image: initialImgs[0],
      featured: false,
      is_active: true,
    });
    setImagesList(initialImgs);
    setNewImageInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj: Project) => {
    const extracted = extractImages(proj);
    setEditingProj({ ...proj });
    setImagesList(extracted.length > 0 ? extracted : [proj.featured_image]);
    setNewImageInput("");
    setIsModalOpen(true);
  };

  const handleAddImage = (urlToAdd?: string) => {
    const url = (urlToAdd || newImageInput).trim();
    if (!url) return;
    if (!imagesList.includes(url)) {
      setImagesList([...imagesList, url]);
    }
    if (!urlToAdd) setNewImageInput("");
  };

  const handleFileUpload = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "projects");

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.success && data.url) {
          setImagesList((prev) => [...prev, data.url]);
        }
      } catch (err) {
        console.error("Project image upload error:", err);
      }
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updated = imagesList.filter((_, idx) => idx !== indexToRemove);
    setImagesList(updated);
  };

  const handleSetCover = (index: number) => {
    if (index === 0) return;
    const target = imagesList[index];
    const rest = imagesList.filter((_, idx) => idx !== index);
    setImagesList([target, ...rest]);
  };

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete previous work item "${title}"?`)) return;

    const toastId = toast.loading("Deleting...", `Removing "${title}"`);
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.dismiss(toastId);
      toast.success("Item Deleted", `"${title}" has been deleted.`);
      router.refresh();
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error("Delete Failed", err?.message || "Could not delete item.");
    }
  };

  const handleToggleFeatured = async (proj: Project) => {
    try {
      const updated = await saveProject({
        id: proj.id,
        featured: !proj.featured,
      });
      setProjects((prev) => prev.map((p) => (p.id === proj.id ? updated : p)));
      toast.info("Status Updated", `"${proj.title}" featured state changed.`);
      router.refresh();
    } catch (err: any) {
      toast.error("Update Failed", err?.message || "Could not toggle featured.");
    }
  };

  const handleToggleActive = async (proj: Project) => {
    try {
      const updated = await saveProject({
        id: proj.id,
        is_active: !proj.is_active,
      });
      setProjects((prev) => prev.map((p) => (p.id === proj.id ? updated : p)));
      toast.info("Status Updated", `"${proj.title}" is now ${updated.is_active ? "Published" : "Hidden"}.`);
      router.refresh();
    } catch (err: any) {
      toast.error("Update Failed", err?.message || "Could not toggle active state.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProj?.title?.trim()) {
      toast.error("Validation Error", "Project title is required.");
      return;
    }
    if (imagesList.length === 0) {
      toast.error("Validation Error", "Please add at least one work image.");
      return;
    }

    setSaving(true);
    const toastId = toast.loading("Saving Item...", `Saving "${editingProj.title}"`);

    try {
      const coverImage = imagesList[0];
      const formattedImages: ProjectImage[] = imagesList.map((url, idx) => ({
        id: `img-${Date.now()}-${idx}`,
        project_id: editingProj.id || "new",
        image_url: url,
        alt_text: `${editingProj.title} photo ${idx + 1}`,
        sort_order: idx + 1,
      }));

      const saved = await saveProject({
        ...editingProj,
        slug: editingProj.slug || slugify(editingProj.title),
        featured_image: coverImage,
        images: formattedImages,
      });

      if (editingProj.id) {
        setProjects((prev) => prev.map((p) => (p.id === saved.id ? saved : p)));
        toast.dismiss(toastId);
        toast.success("Updated Successfully", `Previous work "${saved.title}" updated.`);
      } else {
        setProjects((prev) => [saved, ...prev]);
        toast.dismiss(toastId);
        toast.success("Created Successfully", `New work item "${saved.title}" created.`);
      }

      setIsModalOpen(false);
      setEditingProj(null);
      router.refresh();
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error("Save Failed", err?.message || "Could not save work item.");
    } finally {
      setSaving(false);
    }
  };

  // Filtered projects by category
  const filteredProjects = projects.filter((p) => {
    if (selectedFilterCategory === "all") return true;
    return p.category_id === selectedFilterCategory;
  });

  return (
    <div className="space-y-6">
      {notice && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-xs font-mono text-amber-800 rounded-xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-amber-600" />
          <span>{notice}</span>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedFilterCategory("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedFilterCategory === "all"
                ? "bg-[#0f172a] text-white shadow-xs font-bold"
                : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            All Work ({projects.length})
          </button>
          {categories.map((cat) => {
            const count = projects.filter((p) => p.category_id === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedFilterCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedFilterCategory === cat.id
                    ? "bg-[#0f172a] text-white shadow-xs font-bold"
                    : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center justify-center gap-2 bg-[#0f172a] hover:bg-neutral-800 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Previous Work</span>
        </button>
      </div>

      {/* Table of Previous Work Items */}
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/80 border-b border-neutral-200 text-[10px] font-mono uppercase text-neutral-500">
              <tr>
                <th className="py-3.5 px-4">Product Work</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-center">Images</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-neutral-400 font-mono">
                    No work items found in this category. Click &quot;Add Previous Work&quot; to add your first item.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((proj) => {
                  const imgs = extractImages(proj);
                  const cat = categories.find((c) => c.id === proj.category_id);
                  return (
                    <tr key={proj.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                            <Image
                              src={proj.featured_image || "/images/products/boxing-gloves-black.png"}
                              alt={proj.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                            {imgs.length > 1 && (
                              <span className="absolute bottom-0 right-0 bg-black/70 text-[9px] font-mono text-white px-1 rounded-tl-sm">
                                +{imgs.length - 1}
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 max-w-xs">
                            <span className="font-bold text-[#0f172a] block truncate">
                              {proj.title}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-400 block truncate">
                              /{proj.slug}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200/60">
                          {cat ? cat.name : proj.industry || "General"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md">
                          <Layers className="w-3 h-3 text-neutral-400" />
                          {imgs.length} {imgs.length === 1 ? "image" : "images"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleToggleFeatured(proj)}
                          title={proj.featured ? "Featured on homepage" : "Not featured"}
                          className={`p-1.5 rounded-lg transition-colors ${
                            proj.featured ? "text-amber-500" : "text-neutral-300 hover:text-amber-500"
                          }`}
                        >
                          <Star className={`w-4 h-4 ${proj.featured ? "fill-current" : ""}`} />
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleToggleActive(proj)}
                          className={`px-2 py-0.5 text-[10px] font-mono uppercase font-bold rounded-full ${
                            proj.is_active
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-neutral-100 text-neutral-500 border border-neutral-200"
                          }`}
                        >
                          {proj.is_active ? "Active" : "Hidden"}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href="/previous-work"
                            target="_blank"
                            title="Preview on Previous Work Page"
                            className="p-1.5 text-neutral-400 hover:text-[#0f172a] rounded-lg hover:bg-neutral-100 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleOpenEdit(proj)}
                            title="Edit"
                            className="p-1.5 text-neutral-400 hover:text-[#0f172a] rounded-lg hover:bg-neutral-100 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(proj.id, proj.title)}
                            title="Delete"
                            className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && editingProj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-[#0f172a] p-1 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-600 font-bold block mb-1">
                Portfolio Item
              </span>
              <h2 className="text-xl font-bold uppercase tracking-tight text-[#0f172a]">
                {editingProj.id ? "Edit Previous Work" : "Add Previous Work"}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Category & Product Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                    Category *
                  </label>
                  <select
                    required
                    value={editingProj.category_id || ""}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const selectedCat = categories.find((c) => c.id === selectedId);
                      setEditingProj({
                        ...editingProj,
                        category_id: selectedId,
                        industry: selectedCat ? selectedCat.name : "General",
                      });
                    }}
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                  >
                    <option value="" disabled>
                      Select a Category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                    Product / Work Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 16oz Metallic Sparring Gloves"
                    value={editingProj.title || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditingProj({
                        ...editingProj,
                        title: val,
                        slug: editingProj.id ? editingProj.slug : slugify(val),
                      });
                    }}
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Multiple Images Section */}
              <div className="border border-neutral-200 rounded-2xl p-4 sm:p-5 bg-neutral-50/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-700 font-bold">
                      Work Images ({imagesList.length}) *
                    </label>
                    <span className="text-[10px] text-neutral-500">
                      Add multiple images of this product. The first image is the cover photo.
                    </span>
                  </div>
                </div>

                {/* Add Image Input & Direct Upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                />

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter image URL or path (e.g. /images/products/boxing-gloves-red.png)"
                    value={newImageInput}
                    onChange={(e) => setNewImageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddImage();
                      }
                    }}
                    className="flex-1 bg-white border border-neutral-200 focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddImage()}
                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-[#0f172a] rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer"
                  >
                    Add URL
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-4 py-2 bg-[#0f172a] hover:bg-neutral-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold whitespace-nowrap transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {isUploading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>Upload Image</span>
                  </button>
                </div>

                {/* Preset Suggestions for Quick Fill */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-mono text-neutral-400">Quick presets:</span>
                  {[
                    { label: "+ Boxing Red", url: "/images/products/boxing-gloves-red.png" },
                    { label: "+ Basketball Kit", url: "/images/products/basketball-uniform.jpg" },
                    { label: "+ Black Hoodie", url: "/images/products/hoodie-black.png" },
                    { label: "+ Gym Leggings", url: "/images/products/gym-leggings.jpg" },
                    { label: "+ Focus Pads", url: "/images/products/boxing-focuspads.jpg" },
                    { label: "+ Board Shorts", url: "/images/products/board-shorts.jpg" },
                  ].map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => handleAddImage(preset.url)}
                      className="px-2 py-0.5 rounded-md bg-white border border-neutral-200 hover:border-amber-500 text-[10px] font-mono text-neutral-600 hover:text-amber-800 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Image Thumbnails List */}
                {imagesList.length === 0 ? (
                  <div className="py-6 text-center text-xs text-neutral-400 border border-dashed border-neutral-200 rounded-xl bg-white">
                    No images added yet. Add at least one image URL above.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {imagesList.map((url, idx) => (
                      <div
                        key={idx}
                        className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-200 border border-neutral-300 shadow-xs"
                      >
                        <Image
                          src={url}
                          alt={`Upload ${idx + 1}`}
                          fill
                          sizes="150px"
                          className="object-cover"
                        />
                        {/* Cover Badge */}
                        {idx === 0 ? (
                          <span className="absolute top-1.5 left-1.5 bg-amber-500 text-neutral-950 font-bold text-[9px] uppercase px-2 py-0.5 rounded-full shadow-xs">
                            Cover
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSetCover(idx)}
                            className="absolute top-1.5 left-1.5 bg-black/75 hover:bg-black text-white text-[9px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Set Cover
                          </button>
                        )}
                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1.5 right-1.5 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {/* Number Index */}
                        <span className="absolute bottom-1.5 right-1.5 bg-black/60 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                          #{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                  Manufacturing Notes / Description (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 1.2mm AAA full-grain leather, calibrated multi-layer foam, custom foil logo."
                  value={editingProj.description || ""}
                  onChange={(e) =>
                    setEditingProj({ ...editingProj, description: e.target.value })
                  }
                  className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700">
                  <input
                    type="checkbox"
                    checked={editingProj.featured || false}
                    onChange={(e) =>
                      setEditingProj({ ...editingProj, featured: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700">
                  <input
                    type="checkbox"
                    checked={editingProj.is_active ?? true}
                    onChange={(e) =>
                      setEditingProj({ ...editingProj, is_active: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Active &amp; Visible in Gallery</span>
                </label>
              </div>

              {/* Buttons */}
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
                  className="bg-[#0f172a] hover:bg-neutral-800 text-white rounded-full px-6 py-2.5 font-bold text-xs uppercase tracking-wider shadow-sm transition-all inline-flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{saving ? "Saving..." : "Save Work Item"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Project } from "@/types/database";
import { saveProject, deleteProject } from "@/lib/data/store";
import { slugify } from "@/lib/utils";
import { Plus, Edit2, Trash2, Star, X, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";

interface AdminProjectsClientProps {
  initialProjects: Project[];
}

export default function AdminProjectsClient({ initialProjects }: AdminProjectsClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingProj, setEditingProj] = useState<Partial<Project> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleOpenNew = () => {
    setEditingProj({
      title: "",
      slug: "",
      industry: "Combat & Boxing",
      description: "",
      challenge: "",
      approach: "",
      solution: "",
      outcome: "",
      featured_image:
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
      featured: false,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj: Project) => {
    setEditingProj({ ...proj });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Delete case study "${title}"?`)) {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
      setNotice(`Project "${title}" deleted.`);
      setTimeout(() => setNotice(null), 3000);
    }
  };

  const handleToggleFeatured = async (proj: Project) => {
    const updated = await saveProject({
      id: proj.id,
      featured: !proj.featured,
    });
    setProjects(projects.map((p) => (p.id === proj.id ? updated : p)));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProj?.title) return;
    setSaving(true);

    const saved = await saveProject({
      ...editingProj,
      slug: editingProj.slug || slugify(editingProj.title),
    });

    if (editingProj.id) {
      setProjects(projects.map((p) => (p.id === saved.id ? saved : p)));
      setNotice(`Project "${saved.title}" updated.`);
    } else {
      setProjects([saved, ...projects]);
      setNotice(`New project "${saved.title}" created.`);
    }

    setSaving(false);
    setIsModalOpen(false);
    setEditingProj(null);
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
        <span className="text-xs text-neutral-500">{projects.length} Total Case Studies</span>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 bg-[#0f172a] hover:bg-neutral-800 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Case Study</span>
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/80 border-b border-neutral-200 text-[10px] font-mono uppercase text-neutral-500">
              <tr>
                <th className="py-3.5 px-4">Case Study</th>
                <th className="py-3.5 px-4">Industry</th>
                <th className="py-3.5 px-4">Outcome Snippet</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl bg-cover bg-center shrink-0 border border-neutral-200"
                        style={{ backgroundImage: `url(${proj.featured_image})` }}
                      />
                      <div>
                        <span className="font-bold text-[#0f172a] block truncate max-w-xs">
                          {proj.title}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">
                          /{proj.slug}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 font-medium">
                    {proj.industry}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500 max-w-sm truncate">
                    {proj.outcome || "N/A"}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleFeatured(proj)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        proj.featured ? "text-amber-500" : "text-neutral-300 hover:text-amber-500"
                      }`}
                    >
                      <Star className={`w-4 h-4 ${proj.featured ? "fill-current" : ""}`} />
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/projects/${proj.slug}`}
                        target="_blank"
                        className="p-1.5 text-neutral-400 hover:text-[#0f172a] rounded-lg hover:bg-neutral-100 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 text-neutral-400 hover:text-[#0f172a] rounded-lg hover:bg-neutral-100 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id, proj.title)}
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

      {/* Modal */}
      {isModalOpen && editingProj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-[#0f172a] p-1 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold uppercase tracking-tight text-[#0f172a] mb-6">
              {editingProj.id ? "Edit Case Study" : "Create Case Study"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
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
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                    Industry / Sector *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProj.industry || ""}
                    onChange={(e) =>
                      setEditingProj({ ...editingProj, industry: e.target.value })
                    }
                    placeholder="e.g. Boxing, Streetwear, Soccer"
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                  Featured Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={editingProj.featured_image || ""}
                  onChange={(e) =>
                    setEditingProj({ ...editingProj, featured_image: e.target.value })
                  }
                  className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                  Summary Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingProj.description || ""}
                  onChange={(e) =>
                    setEditingProj({ ...editingProj, description: e.target.value })
                  }
                  className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                    The Challenge
                  </label>
                  <textarea
                    rows={2}
                    value={editingProj.challenge || ""}
                    onChange={(e) =>
                      setEditingProj({ ...editingProj, challenge: e.target.value })
                    }
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                    The Engineering Approach
                  </label>
                  <textarea
                    rows={2}
                    value={editingProj.approach || ""}
                    onChange={(e) =>
                      setEditingProj({ ...editingProj, approach: e.target.value })
                    }
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                    The Solution
                  </label>
                  <textarea
                    rows={2}
                    value={editingProj.solution || ""}
                    onChange={(e) =>
                      setEditingProj({ ...editingProj, solution: e.target.value })
                    }
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                    The Outcome
                  </label>
                  <textarea
                    rows={2}
                    value={editingProj.outcome || ""}
                    onChange={(e) =>
                      setEditingProj({ ...editingProj, outcome: e.target.value })
                    }
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
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
                  {saving ? "Saving..." : "Save Case Study"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { BlogPost } from "@/types/database";
import { saveBlogPost, deleteBlogPost } from "@/lib/data/store";
import { slugify, formatDate } from "@/lib/utils";
import { Plus, Edit2, Trash2, X, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";
import ImageUploadField from "./ImageUploadField";

interface AdminBlogClientProps {
  initialPosts: BlogPost[];
}

export default function AdminBlogClient({ initialPosts }: AdminBlogClientProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleOpenNew = () => {
    setEditingPost({
      title: "",
      slug: "",
      category: "Manufacturing",
      author: "GLOVES STORM Engineering",
      excerpt: "",
      content: "",
      featured_image:
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
      is_published: true,
      seo_title: "",
      seo_description: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: BlogPost) => {
    setEditingPost({ ...p });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Delete article "${title}"?`)) {
      await deleteBlogPost(id);
      setPosts(posts.filter((p) => p.id !== id));
      setNotice("Article deleted.");
      setTimeout(() => setNotice(null), 3000);
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    const updated = await saveBlogPost({
      id: post.id,
      is_published: !post.is_published,
    });
    setPosts(posts.map((p) => (p.id === post.id ? updated : p)));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost?.title) return;
    setSaving(true);

    const saved = await saveBlogPost({
      ...editingPost,
      slug: editingPost.slug || slugify(editingPost.title),
    });

    if (editingPost.id) {
      setPosts(posts.map((p) => (p.id === saved.id ? saved : p)));
      setNotice("Article updated.");
    } else {
      setPosts([saved, ...posts]);
      setNotice("Article published.");
    }

    setSaving(false);
    setIsModalOpen(false);
    setEditingPost(null);
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
        <span className="text-xs text-neutral-500">{posts.length} Technical Guides</span>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 bg-[#0f172a] hover:bg-neutral-800 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/80 border-b border-neutral-200 text-[10px] font-mono uppercase text-neutral-500">
              <tr>
                <th className="py-3.5 px-4">Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#0f172a] max-w-sm truncate">
                    {post.title}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold inline-block">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600">
                    {post.author}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-400 font-mono">
                    {post.published_at ? formatDate(post.published_at) : "N/A"}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleTogglePublish(post)}
                      className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full border ${
                        post.is_published
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-neutral-100 text-neutral-500 border-neutral-200"
                      }`}
                    >
                      {post.is_published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/journal/${post.slug}`}
                        target="_blank"
                        className="p-1.5 text-neutral-400 hover:text-[#0f172a] rounded-lg hover:bg-neutral-100 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(post)}
                        className="p-1.5 text-neutral-400 hover:text-[#0f172a] rounded-lg hover:bg-neutral-100 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
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

      {isModalOpen && editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 w-full max-w-3xl shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-[#0f172a] p-1 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold uppercase tracking-tight text-[#0f172a] mb-6">
              {editingPost.id ? "Edit Journal Article" : "Write Journal Article"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingPost.title || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditingPost({
                      ...editingPost,
                      title: val,
                      slug: editingPost.id ? editingPost.slug : slugify(val),
                    });
                  }}
                  className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                    Category *
                  </label>
                  <select
                    value={editingPost.category || "Manufacturing"}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, category: e.target.value })
                    }
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                  >
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Streetwear">Streetwear</option>
                    <option value="Boxing">Boxing</option>
                    <option value="Sportswear">Sportswear</option>
                    <option value="Product Development">Product Development</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                    Author
                  </label>
                  <input
                    type="text"
                    value={editingPost.author || ""}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, author: e.target.value })
                    }
                    className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Featured Cover Image"
                value={editingPost.featured_image || ""}
                onChange={(url) => setEditingPost({ ...editingPost, featured_image: url })}
                folder="blog"
                placeholder="https://images.unsplash.com/... or upload from computer"
                helperText="Upload blog cover image directly from your device, or enter an image URL."
              />

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                  Article Excerpt
                </label>
                <textarea
                  rows={2}
                  value={editingPost.excerpt || ""}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, excerpt: e.target.value })
                  }
                  className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold">
                  Content (Markdown / Text) *
                </label>
                <textarea
                  rows={8}
                  required
                  value={editingPost.content || ""}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, content: e.target.value })
                  }
                  className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-amber-600 text-[#0f172a] rounded-xl p-3.5 text-xs outline-none font-mono transition-colors"
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
                  {saving ? "Saving..." : "Save Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Product, Category } from "@/types/database";
import { deleteProduct, saveProduct } from "@/lib/data/clientStore";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Copy,
  Star,
  CheckCircle,
  XCircle,
  ExternalLink,
} from "lucide-react";

interface AdminProductsClientProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function AdminProductsClient({
  initialProducts,
  categories,
}: AdminProductsClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    const matchesCat =
      selectedCategory === "all" || p.category_id === selectedCategory;
    const matchesSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      setActionMessage(`Product "${name}" deleted.`);
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const handleDuplicate = async (product: Product) => {
    const newSlug = `${product.slug}-copy-${Date.now().toString().slice(-4)}`;
    const duplicatePayload: Partial<Product> = {
      name: `${product.name} (Copy)`,
      slug: newSlug,
      category_id: product.category_id,
      short_description: product.short_description,
      description: product.description,
      materials: product.materials,
      features: product.features,
      customization_options: product.customization_options,
      moq: product.moq,
      lead_time: product.lead_time,
      featured: false,
      is_active: false,
      seo_title: product.seo_title,
      seo_description: product.seo_description,
    };

    const created = await saveProduct(duplicatePayload);
    setProducts([created, ...products]);
    setActionMessage(`Product duplicated as "${created.name}".`);
    setTimeout(() => setActionMessage(null), 4000);
  };

  const handleToggleActive = async (product: Product) => {
    const updated = await saveProduct({
      id: product.id,
      is_active: !product.is_active,
    });
    setProducts(products.map((p) => (p.id === product.id ? { ...p, is_active: updated.is_active } : p)));
  };

  const handleToggleFeatured = async (product: Product) => {
    const updated = await saveProduct({
      id: product.id,
      featured: !product.featured,
    });
    setProducts(products.map((p) => (p.id === product.id ? { ...p, featured: updated.featured } : p)));
  };

  return (
    <div className="space-y-6">
      {/* Action Notification */}
      {actionMessage && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs font-mono text-amber-800 animate-in fade-in">
          {actionMessage}
        </div>
      )}

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products by name or slug..."
              className="w-full bg-white border border-neutral-300 rounded-xl text-[#0f172a] pl-9 pr-3 py-2 text-xs outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500/20"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-neutral-300 rounded-xl text-neutral-700 text-xs px-3 py-2 outline-none focus:border-amber-600 cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 bg-[#0f172a] hover:bg-neutral-800 text-white rounded-full px-5 py-2.5 font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Product</span>
        </Link>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-neutral-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-200 text-[10px] font-mono uppercase text-neutral-500">
              <tr>
                <th className="py-3.5 px-4">Item</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">MOQ</th>
                <th className="py-3.5 px-4">Wholesale Price Deals</th>
                <th className="py-3.5 px-4">Lead Time</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((prod) => {
                const categoryObj = categories.find((c) => c.id === prod.category_id);
                const primaryImg =
                  prod.images?.[0]?.image_url ||
                  "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=400&auto=format&fit=crop";

                const tiers = prod.pricing_tiers || [];
                const priceRange =
                  tiers.length > 0
                    ? `$${Math.min(...tiers.map((t) => t.unit_price)).toFixed(2)} - $${Math.max(...tiers.map((t) => t.unit_price)).toFixed(2)}`
                    : prod.sample_price
                    ? `Sample: $${prod.sample_price}`
                    : "Standard Tiers";

                return (
                  <tr key={prod.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 bg-cover bg-center shrink-0 rounded-xl border border-neutral-200"
                          style={{ backgroundImage: `url(${primaryImg})` }}
                        />
                        <div>
                          <span className="font-bold text-[#0f172a] block">
                            {prod.name}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-500">
                            /{prod.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600">
                      {categoryObj?.name || "Uncategorized"}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-amber-700 font-bold">
                      {prod.moq} pcs
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-mono text-xs font-bold text-neutral-900">
                          {priceRange}
                        </span>
                        <span className="text-[9px] font-mono text-neutral-500">
                          {tiers.length > 0 ? `${tiers.length} Active Tiers` : "Default Tiers"}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600">
                      {prod.lead_time || "2-4 Wks"}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleActive(prod)}
                        className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 uppercase rounded-full cursor-pointer ${
                          prod.is_active
                            ? "text-emerald-800 bg-emerald-50 border border-emerald-200 font-bold"
                            : "text-neutral-600 bg-neutral-100 border border-neutral-200"
                        }`}
                      >
                        {prod.is_active ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleFeatured(prod)}
                        className={`p-1 cursor-pointer transition-colors ${
                          prod.featured ? "text-amber-500" : "text-neutral-300 hover:text-amber-500"
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className={`w-4 h-4 ${prod.featured ? "fill-current" : ""}`} />
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/products/${categoryObj?.slug || "general"}/${prod.slug}`}
                          target="_blank"
                          title="View on Live Site"
                          className="p-1.5 text-neutral-400 hover:text-[#0f172a] transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDuplicate(prod)}
                          title="Duplicate Product"
                          className="p-1.5 text-neutral-400 hover:text-amber-600 transition-colors cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <Link
                          href={`/admin/products/${prod.id}`}
                          title="Edit Product"
                          className="p-1.5 text-neutral-400 hover:text-[#0f172a] transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(prod.id, prod.name)}
                          title="Delete Product"
                          className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
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
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product, Category, ProductImage } from "@/types/database";
import { saveProduct } from "@/lib/data/store";
import { slugify } from "@/lib/utils";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Star,
  Loader2,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

interface ProductEditorFormProps {
  initialProduct?: Product | null;
  categories: Category[];
}

export default function ProductEditorForm({
  initialProduct,
  categories,
}: ProductEditorFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialProduct);

  const [name, setName] = useState(initialProduct?.name || "");
  const [slug, setSlug] = useState(initialProduct?.slug || "");
  const [categoryId, setCategoryId] = useState(
    initialProduct?.category_id || categories[0]?.id || ""
  );
  const [shortDesc, setShortDesc] = useState(initialProduct?.short_description || "");
  const [description, setDescription] = useState(initialProduct?.description || "");

  // Materials, Features, Customizations as newline separated strings
  const stringifyArray = (val: unknown): string => {
    if (!val) return "";
    if (Array.isArray(val)) return val.join("\n");
    try {
      const parsed = JSON.parse(val as string);
      if (Array.isArray(parsed)) return parsed.join("\n");
    } catch {}
    return String(val);
  };

  const [materials, setMaterials] = useState(stringifyArray(initialProduct?.materials));
  const [features, setFeatures] = useState(stringifyArray(initialProduct?.features));
  const [customization, setCustomization] = useState(
    stringifyArray(initialProduct?.customization_options)
  );

  const [moq, setMoq] = useState(initialProduct?.moq || 50);
  const [leadTime, setLeadTime] = useState(initialProduct?.lead_time || "2-4 Weeks");
  const [isActive, setIsActive] = useState(initialProduct?.is_active ?? true);
  const [featured, setFeatured] = useState(initialProduct?.featured ?? false);

  const [seoTitle, setSeoTitle] = useState(initialProduct?.seo_title || "");
  const [seoDesc, setSeoDesc] = useState(initialProduct?.seo_description || "");
  const [primaryKeyword, setPrimaryKeyword] = useState(initialProduct?.primary_keyword || "");
  const [secondaryKeywords, setSecondaryKeywords] = useState(initialProduct?.secondary_keywords || "");

  // Images state
  const [images, setImages] = useState<ProductImage[]>(
    initialProduct?.images || [
      {
        id: "img-init",
        product_id: initialProduct?.id || "",
        image_url:
          "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
        alt_text: initialProduct?.name || "Product Image",
        sort_order: 1,
        is_primary: true,
        created_at: "",
      },
    ]
  );
  const [newImageUrl, setNewImageUrl] = useState("");

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Auto-generate slug if creating new
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!isEditing) {
      setSlug(slugify(newName));
    }
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    const newImg: ProductImage = {
      id: `img-${Date.now()}`,
      product_id: initialProduct?.id || "",
      image_url: newImageUrl.trim(),
      alt_text: name || "Product Angle",
      sort_order: images.length + 1,
      is_primary: images.length === 0,
      created_at: new Date().toISOString(),
    };
    setImages([...images, newImg]);
    setNewImageUrl("");
  };

  const handleSetPrimary = (index: number) => {
    setImages(
      images.map((img, i) => ({
        ...img,
        is_primary: i === index,
      }))
    );
  };

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    if (updated.length > 0 && !updated.some((img) => img.is_primary)) {
      updated[0].is_primary = true;
    }
    setImages(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload: Partial<Product> = {
      id: initialProduct?.id,
      name,
      slug: slug || slugify(name),
      category_id: categoryId,
      short_description: shortDesc,
      description,
      materials: materials.split("\n").map((s) => s.trim()).filter(Boolean),
      features: features.split("\n").map((s) => s.trim()).filter(Boolean),
      customization_options: customization.split("\n").map((s) => s.trim()).filter(Boolean),
      moq: Number(moq) || 50,
      lead_time: leadTime,
      is_active: isActive,
      featured,
      seo_title: seoTitle || null,
      seo_description: seoDesc || null,
      primary_keyword: primaryKeyword || null,
      secondary_keywords: secondaryKeywords || null,
      images,
    };

    await saveProduct(payload);
    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => {
      router.push("/admin/products");
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 bg-white border border-neutral-200 rounded-xl text-neutral-500 hover:text-[#0f172a] transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-600 font-bold block">
              {isEditing ? "Modify Specification" : "Add New Item"}
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-[#0f172a]">
              {isEditing ? `Edit: ${initialProduct?.name}` : "Create Manufacturing Product"}
            </h1>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-[#0f172a] hover:bg-neutral-800 disabled:opacity-50 text-white rounded-full px-6 py-2.5 font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : savedSuccess ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Product</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Main Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* General Info */}
          <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b border-neutral-100 pb-3">
              General Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={handleNameChange}
                  className="w-full bg-white border border-neutral-300 rounded-xl focus:border-amber-600 text-[#0f172a] px-3.5 py-2.5 text-xs outline-none focus:ring-1 focus:ring-amber-500/20"
                  placeholder="e.g. Pro Apex Lace-Up Boxing Gloves"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-xl focus:border-amber-600 text-[#0f172a] px-3.5 py-2.5 text-xs outline-none font-mono focus:ring-1 focus:ring-amber-500/20"
                  placeholder="pro-apex-boxing-gloves"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                Short Description
              </label>
              <textarea
                rows={2}
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-xl focus:border-amber-600 text-[#0f172a] px-3.5 py-2 text-xs outline-none focus:ring-1 focus:ring-amber-500/20"
                placeholder="High-level summary for product cards and preview grids..."
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                Full Technical Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-xl focus:border-amber-600 text-[#0f172a] px-3.5 py-2 text-xs outline-none focus:ring-1 focus:ring-amber-500/20"
                placeholder="In-depth construction details, foam sandwich specifications, seam types..."
              />
            </div>
          </div>

          {/* Specifications Breakdown */}
          <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b border-neutral-100 pb-3">
              Materials & Construction (1 per line)
            </h2>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                Materials List
              </label>
              <textarea
                rows={3}
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-xl focus:border-amber-600 text-[#0f172a] px-3.5 py-2 text-xs outline-none font-mono focus:ring-1 focus:ring-amber-500/20"
                placeholder="100% Genuine Full-Grain Cowhide Leather&#10;5-Layer Handcrafted Latex Foam&#10;Water-Repellent Satin Silk Lining"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                Key Features
              </label>
              <textarea
                rows={3}
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-xl focus:border-amber-600 text-[#0f172a] px-3.5 py-2 text-xs outline-none font-mono focus:ring-1 focus:ring-amber-500/20"
                placeholder="Anatomical thumb lock positioning&#10;Dual-contour wrist channel for lace tensioning&#10;Laser-cut ventilation perforations"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                Customization Options
              </label>
              <textarea
                rows={3}
                value={customization}
                onChange={(e) => setCustomization(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-xl focus:border-amber-600 text-[#0f172a] px-3.5 py-2 text-xs outline-none font-mono focus:ring-1 focus:ring-amber-500/20"
                placeholder="Custom brand leather debossing&#10;High-density 3D puff silicone printing&#10;Custom woven wrist tag and care labels"
              />
            </div>
          </div>

          {/* Product Gallery Manager */}
          <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b border-neutral-100 pb-3">
              Product Images Gallery
            </h2>

            {/* Add Image by URL */}
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://example.com/product-image.jpg"
                className="flex-1 bg-white border border-neutral-300 rounded-xl focus:border-amber-600 text-[#0f172a] px-3.5 py-2 text-xs outline-none focus:ring-1 focus:ring-amber-500/20"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="bg-neutral-100 hover:bg-neutral-200 text-[#0f172a] border border-neutral-200 rounded-xl px-4 py-2 text-xs uppercase font-bold tracking-wider shrink-0 transition-colors cursor-pointer"
              >
                Add Image
              </button>
            </div>

            {/* Gallery Preview List */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {images.map((img, idx) => (
                <div
                  key={img.id || idx}
                  className={`relative aspect-square rounded-2xl border overflow-hidden group ${
                    img.is_primary
                      ? "border-amber-600 ring-2 ring-amber-500/30"
                      : "border-neutral-200"
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${img.image_url})` }}
                  />

                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => handleSetPrimary(idx)}
                        title="Set Primary Image"
                        className={`p-1 cursor-pointer ${
                          img.is_primary ? "text-amber-400" : "text-white/70 hover:text-white"
                        }`}
                      >
                        <Star className={`w-4 h-4 ${img.is_primary ? "fill-current" : ""}`} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        title="Remove Image"
                        className="p-1 text-red-400 hover:text-red-300 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {img.is_primary && (
                      <span className="text-[9px] font-mono text-amber-300 uppercase tracking-wider font-bold">
                        Primary
                      </span>
                    )}
                  </div>

                  {/* Angle Label Badge */}
                  <div className="absolute bottom-2 left-2 z-10 pointer-events-none bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-mono text-white/90 uppercase font-bold">
                    {["01 Hero", "02 Detail", "03 Branding", "04 Lifestyle"][idx] || `Image ${idx + 1}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Category, Production Settings, SEO */}
        <div className="lg:col-span-4 space-y-6">
          {/* Classification & Status */}
          <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b border-neutral-100 pb-3">
              Classification
            </h2>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                Category *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-xl text-[#0f172a] px-3.5 py-2.5 text-xs outline-none focus:border-amber-600 cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-neutral-800 font-medium">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 accent-amber-600"
                />
                <span>Active in Public Catalog</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-neutral-800 font-medium">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 accent-amber-600"
                />
                <span>Feature on Homepage Showcase</span>
              </label>
            </div>
          </div>

          {/* Production Settings */}
          <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b border-neutral-100 pb-3">
              Production Specifications
            </h2>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                Minimum Order Quantity (MOQ)
              </label>
              <input
                type="number"
                min={1}
                value={moq}
                onChange={(e) => setMoq(Number(e.target.value))}
                className="w-full bg-white border border-neutral-300 rounded-xl text-[#0f172a] px-3.5 py-2.5 text-xs outline-none focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                Production Lead Time
              </label>
              <input
                type="text"
                value={leadTime}
                onChange={(e) => setLeadTime(e.target.value)}
                placeholder="e.g. 2-4 Weeks"
                className="w-full bg-white border border-neutral-300 rounded-xl text-[#0f172a] px-3.5 py-2.5 text-xs outline-none focus:border-amber-600"
              />
            </div>
          </div>

          {/* Technical SEO */}
          <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b border-neutral-100 pb-3">
              Search Engine Optimization (SEO)
            </h2>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                Meta SEO Title
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Custom OEM Boxing Gloves | GLOVES STORM"
                className="w-full bg-white border border-neutral-300 rounded-xl text-[#0f172a] px-3.5 py-2 text-xs outline-none focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                Primary SEO Keyword
              </label>
              <input
                type="text"
                value={primaryKeyword}
                onChange={(e) => setPrimaryKeyword(e.target.value)}
                placeholder="e.g. custom boxing gloves"
                className="w-full bg-white border border-neutral-300 rounded-xl text-[#0f172a] px-3.5 py-2 text-xs outline-none focus:border-amber-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                Secondary Keywords (Comma Separated)
              </label>
              <input
                type="text"
                value={secondaryKeywords}
                onChange={(e) => setSecondaryKeywords(e.target.value)}
                placeholder="e.g. OEM manufacturing, private label boxing equipment, custom manufacturer"
                className="w-full bg-white border border-neutral-300 rounded-xl text-[#0f172a] px-3.5 py-2 text-xs outline-none focus:border-amber-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={seoDesc}
                onChange={(e) => setSeoDesc(e.target.value)}
                placeholder="Summary for Google and social previews..."
                className="w-full bg-white border border-neutral-300 rounded-xl text-[#0f172a] px-3.5 py-2 text-xs outline-none focus:border-amber-600"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

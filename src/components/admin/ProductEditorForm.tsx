"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Product, Category, ProductImage, PriceTier } from "@/types/database";
import { saveProduct } from "@/lib/data/clientStore";
import { slugify } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Star,
  Loader2,
  CheckCircle,
  DollarSign,
  Sparkles,
  RefreshCw,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
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
  const { toast } = useToast();
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

  // Alibaba Wholesale Price Deals State
  const [samplePrice, setSamplePrice] = useState<number | string>(
    initialProduct?.sample_price || 35
  );
  const [showPricing, setShowPricing] = useState<boolean>(
    initialProduct?.show_pricing ?? true
  );
  const [pricingTiers, setPricingTiers] = useState<PriceTier[]>(
    initialProduct?.pricing_tiers && initialProduct.pricing_tiers.length > 0
      ? initialProduct.pricing_tiers
      : [
          { min_quantity: 1, max_quantity: 49, unit_price: 35, label: "Sample (1 pc)" },
          { min_quantity: 50, max_quantity: 499, unit_price: 18.5, label: "MOQ Batch" },
          { min_quantity: 500, max_quantity: 999, unit_price: 14.2, label: "Volume Deal" },
          { min_quantity: 1000, max_quantity: null, unit_price: 11.0, label: "Enterprise Bulk" },
        ]
  );

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
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

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

  const handleDirectFileUpload = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setIsUploadingImage(true);
    setUploadError(null);

    const newAddedImages: ProductImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "products");

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.success && data.url) {
          newAddedImages.push({
            id: `img-${Date.now()}-${i}`,
            product_id: initialProduct?.id || "",
            image_url: data.url,
            alt_text: name || "Product Angle",
            sort_order: images.length + newAddedImages.length + 1,
            is_primary: images.length === 0 && newAddedImages.length === 0,
            created_at: new Date().toISOString(),
          });
        } else {
          setUploadError(data.error || "Failed to upload one or more images");
        }
      } catch (err: any) {
        setUploadError(err?.message || "Upload failed. Please check network connection.");
      }
    }

    if (newAddedImages.length > 0) {
      setImages((prev) => [...prev, ...newAddedImages]);
    }
    setIsUploadingImage(false);
    if (galleryFileInputRef.current) {
      galleryFileInputRef.current.value = "";
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

  const handleAddTier = () => {
    const lastTier = pricingTiers[pricingTiers.length - 1];
    const newMin =
      lastTier && lastTier.max_quantity
        ? lastTier.max_quantity + 1
        : lastTier
        ? lastTier.min_quantity + 500
        : 100;
    setPricingTiers([
      ...pricingTiers,
      {
        min_quantity: newMin,
        max_quantity: null,
        unit_price: lastTier
          ? Math.max(1, Math.round(lastTier.unit_price * 0.85 * 100) / 100)
          : 15,
        label: `Tier ${pricingTiers.length + 1}`,
      },
    ]);
  };

  const handleUpdateTier = (index: number, field: keyof PriceTier, value: any) => {
    const updated = [...pricingTiers];
    updated[index] = { ...updated[index], [field]: value };
    setPricingTiers(updated);
  };

  const handleRemoveTier = (index: number) => {
    setPricingTiers(pricingTiers.filter((_, i) => i !== index));
  };

  const handleLoadStandardTemplate = () => {
    const baseSample = Number(samplePrice) || 35;
    const currentMoq = Number(moq) || 50;
    setPricingTiers([
      {
        min_quantity: 1,
        max_quantity: Math.max(1, currentMoq - 1),
        unit_price: baseSample,
        label: "Sample (1 pc)",
      },
      {
        min_quantity: currentMoq,
        max_quantity: Math.max(currentMoq, 499),
        unit_price: Math.round(baseSample * 0.52 * 100) / 100,
        label: "Standard MOQ",
      },
      {
        min_quantity: 500,
        max_quantity: 999,
        unit_price: Math.round(baseSample * 0.4 * 100) / 100,
        label: "Volume Deal",
      },
      {
        min_quantity: 1000,
        max_quantity: null,
        unit_price: Math.round(baseSample * 0.32 * 100) / 100,
        label: "Enterprise Bulk",
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Validation Error", "Product name/title is required.");
      return;
    }

    if (!categoryId) {
      toast.error("Validation Error", "Please select a category for this product.");
      return;
    }

    setSaving(true);
    const savingToastId = toast.loading(
      isEditing ? "Updating Product..." : "Creating Product...",
      `Saving changes for "${name}"`
    );

    try {
      const payload: Partial<Product> = {
        id: initialProduct?.id,
        name: name.trim(),
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
        pricing_tiers: pricingTiers.map((t) => ({
          min_quantity: Number(t.min_quantity) || 1,
          max_quantity: t.max_quantity ? Number(t.max_quantity) : null,
          unit_price: Number(t.unit_price) || 0,
          currency: "$",
          label: t.label || "",
        })),
        sample_price: Number(samplePrice) || null,
        show_pricing: showPricing,
        seo_title: seoTitle || null,
        seo_description: seoDesc || null,
        primary_keyword: primaryKeyword || null,
        secondary_keywords: secondaryKeywords || null,
        images,
      };

      const saved = await saveProduct(payload);
      toast.dismiss(savingToastId);
      toast.success(
        "Product Saved Successfully",
        `"${saved.name}" has been saved and synced across live catalog.`
      );
      setSavedSuccess(true);
      router.refresh();
      setTimeout(() => {
        router.push("/admin/products");
        router.refresh();
      }, 1000);
    } catch (err: any) {
      toast.dismiss(savingToastId);
      toast.error("Save Failed", err?.message || "An error occurred while saving the product.");
    } finally {
      setSaving(false);
    }
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

          {/* Alibaba-Style Wholesale Volume Deals & Price Tiers */}
          <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-700">
                  <DollarSign className="w-4 h-4" />
                </span>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a]">
                    Alibaba-Style Wholesale Price Tiers & Volume Deals
                  </h2>
                  <span className="text-[10px] font-mono text-neutral-500">
                    Configured volume tiers shown on public product page and catalog cards
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLoadStandardTemplate}
                  className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3 text-amber-700" />
                  <span>Apply Standard Template</span>
                </button>
              </div>
            </div>

            {/* Display and Sample Price Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="showPricingToggle"
                  checked={showPricing}
                  onChange={(e) => setShowPricing(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded border-neutral-300 focus:ring-amber-500"
                />
                <label htmlFor="showPricingToggle" className="text-xs font-medium text-neutral-800 cursor-pointer">
                  Show Wholesale Tiers Publicly
                  <span className="block text-[10px] font-mono text-neutral-500">
                    If disabled, product displays "Request Bespoke Quote"
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                  Sample Prototype Unit Price ($ USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 font-mono">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={samplePrice}
                    onChange={(e) => setSamplePrice(e.target.value)}
                    placeholder="35.00"
                    className="w-full bg-white border border-neutral-300 rounded-xl pl-7 pr-3 py-2 text-xs font-mono font-bold text-[#0f172a] focus:border-amber-600 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Tiers Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 font-mono">
                  Configured Volume Tiers ({pricingTiers.length})
                </span>
                <button
                  type="button"
                  onClick={handleAddTier}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 font-mono cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Tier Bracket</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-100 border-b border-neutral-200 text-[10px] font-mono uppercase text-neutral-600">
                    <tr>
                      <th className="py-2.5 px-3">Tier Label</th>
                      <th className="py-2.5 px-3">Min Qty</th>
                      <th className="py-2.5 px-3">Max Qty (Blank for +)</th>
                      <th className="py-2.5 px-3">FOB Unit Price ($ USD)</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {pricingTiers.map((tier, idx) => (
                      <tr key={idx} className="bg-white hover:bg-neutral-50/50">
                        <td className="py-2 px-3">
                          <input
                            type="text"
                            value={tier.label || ""}
                            onChange={(e) => handleUpdateTier(idx, "label", e.target.value)}
                            placeholder={`Tier ${idx + 1}`}
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs text-neutral-900 focus:bg-white focus:border-amber-600 outline-none"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <input
                            type="number"
                            min="1"
                            value={tier.min_quantity}
                            onChange={(e) => handleUpdateTier(idx, "min_quantity", parseInt(e.target.value) || 1)}
                            className="w-24 bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs font-mono text-neutral-900 focus:bg-white focus:border-amber-600 outline-none"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <input
                            type="number"
                            min="1"
                            value={tier.max_quantity ?? ""}
                            onChange={(e) =>
                              handleUpdateTier(
                                idx,
                                "max_quantity",
                                e.target.value === "" ? null : parseInt(e.target.value) || null
                              )
                            }
                            placeholder="Unlimited (+)"
                            className="w-28 bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs font-mono text-neutral-900 focus:bg-white focus:border-amber-600 outline-none"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <div className="relative w-28">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 font-mono text-xs">$</span>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={tier.unit_price}
                              onChange={(e) =>
                                handleUpdateTier(idx, "unit_price", parseFloat(e.target.value) || 0)
                              }
                              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-6 pr-2 py-1.5 text-xs font-mono font-bold text-neutral-900 focus:bg-white focus:border-amber-600 outline-none"
                            />
                          </div>
                        </td>
                        <td className="py-2 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleRemoveTier(idx)}
                            disabled={pricingTiers.length <= 1}
                            className="p-1.5 text-neutral-400 hover:text-red-600 disabled:opacity-30 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Product Gallery Manager */}
          <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a]">
                  Product Images Gallery ({images.length})
                </h2>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Directly upload product photos from your device or add external image URLs.
                </p>
              </div>

              <button
                type="button"
                onClick={() => galleryFileInputRef.current?.click()}
                disabled={isUploadingImage}
                className="inline-flex items-center gap-2 bg-[#0f172a] hover:bg-neutral-800 disabled:opacity-50 text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
              >
                {isUploadingImage ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Upload className="w-3.5 h-3.5" />
                )}
                <span>Upload Photos</span>
              </button>
            </div>

            {/* Hidden multi-file input */}
            <input
              ref={galleryFileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && handleDirectFileUpload(e.target.files)}
            />

            {/* Drag & Drop Upload Zone */}
            <div
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingImage(false);
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  handleDirectFileUpload(e.dataTransfer.files);
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingImage(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDraggingImage(false);
              }}
              onClick={() => !isUploadingImage && galleryFileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDraggingImage
                  ? "border-amber-600 bg-amber-50/50 scale-[0.99]"
                  : "border-neutral-200 hover:border-amber-500 bg-neutral-50/50 hover:bg-neutral-50"
              } ${isUploadingImage ? "pointer-events-none opacity-80" : ""}`}
            >
              {isUploadingImage ? (
                <div className="py-2 flex flex-col items-center justify-center gap-2 text-amber-600">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-xs font-semibold">Uploading photos from device...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 shadow-xs">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-800">
                      Click to upload photos <span className="text-neutral-500 font-normal">or drag & drop here</span>
                    </p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">
                      Select multiple images at once (PNG, JPG, WEBP, up to 15MB each).
                    </p>
                  </div>
                </div>
              )}
            </div>

            {uploadError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                {uploadError}
              </div>
            )}

            {/* Optional URL Input Alternative */}
            <div className="pt-1">
              <label className="block text-[10px] uppercase font-mono tracking-wider text-neutral-500 mb-1.5 font-semibold">
                Or Add Image via URL:
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                    <LinkIcon className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://example.com/product-image.jpg"
                    className="w-full bg-white border border-neutral-300 rounded-xl focus:border-amber-600 text-[#0f172a] pl-9 pr-3.5 py-2 text-xs outline-none focus:ring-1 focus:ring-amber-500/20"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="bg-neutral-100 hover:bg-neutral-200 text-[#0f172a] border border-neutral-200 rounded-xl px-4 py-2 text-xs uppercase font-bold tracking-wider shrink-0 transition-colors cursor-pointer"
                >
                  Add URL
                </button>
              </div>
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

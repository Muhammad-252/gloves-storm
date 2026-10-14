"use client";

import { useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Product,
  Category,
  ProductImage,
  PriceTier,
  ProductSpecifications,
  SizeChartData,
  ProductFaq,
} from "@/types/database";
import { saveProduct } from "@/lib/data/clientStore";
import { slugify } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import { SIZE_CHART_TEMPLATES } from "@/lib/data/sizeChartTemplates";
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
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Table,
  Eye,
  Sliders,
  MoveUp,
  MoveDown,
  Layers,
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

  const [moq, setMoq] = useState(initialProduct?.moq || 30);
  const [leadTime, setLeadTime] = useState(initialProduct?.lead_time || "2–3 Weeks");
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
          { min_quantity: 1, max_quantity: 29, unit_price: 35, label: "Sample (1 pc)" },
          { min_quantity: 30, max_quantity: 99, unit_price: 18.5, label: "MOQ Batch" },
          { min_quantity: 100, max_quantity: 499, unit_price: 14.2, label: "Volume Deal" },
          { min_quantity: 500, max_quantity: null, unit_price: 11.0, label: "Enterprise Bulk" },
        ]
  );

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState(initialProduct?.seo_title || "");
  const [seoDesc, setSeoDesc] = useState(initialProduct?.seo_description || "");
  const [primaryKeyword, setPrimaryKeyword] = useState(initialProduct?.primary_keyword || "");
  const [secondaryKeywords, setSecondaryKeywords] = useState(
    initialProduct?.secondary_keywords || ""
  );
  const [canonicalUrl, setCanonicalUrl] = useState(initialProduct?.canonical_url || "");
  const [noindex, setNoindex] = useState(initialProduct?.noindex ?? false);
  const [ogTitle, setOgTitle] = useState(initialProduct?.og_title || "");
  const [ogDesc, setOgDesc] = useState(initialProduct?.og_description || "");
  const [ogImage, setOgImage] = useState(initialProduct?.og_image || "");

  // Technical Specifications
  const initialSpecs = (initialProduct?.specifications || {}) as ProductSpecifications;
  const [specFabric, setSpecFabric] = useState(
    initialSpecs.fabric || "100% Polyester Performance Micro-Mesh / Interlock"
  );
  const [specGsm, setSpecGsm] = useState(initialSpecs.gsm_range || "160–220 GSM");
  const [specFit, setSpecFit] = useState(initialSpecs.fit || "Athletic / Regular Cut");
  const [specDecoration, setSpecDecoration] = useState(
    Array.isArray(initialSpecs.decoration_methods)
      ? initialSpecs.decoration_methods.join(", ")
      : initialSpecs.decoration_methods || "Digital Dye Sublimation, 3D Silicone, Tackle Twill"
  );
  const [specColors, setSpecColors] = useState(
    Array.isArray(initialSpecs.colors)
      ? initialSpecs.colors.join(", ")
      : initialSpecs.colors || "Custom Pantone Color Matching"
  );
  const [specSizes, setSpecSizes] = useState(
    Array.isArray(initialSpecs.sizes)
      ? initialSpecs.sizes.join(", ")
      : initialSpecs.sizes || "XS, S, M, L, XL, 2XL, 3XL, 4XL, 5XL"
  );
  const [specSampleTime, setSpecSampleTime] = useState(
    initialSpecs.sample_time || "5–7 Business Days"
  );
  const [specLeadTime, setSpecLeadTime] = useState(
    initialSpecs.lead_time || "2–3 Weeks After Approval"
  );
  const [specPackaging, setSpecPackaging] = useState(
    initialSpecs.packaging || "Individual Polybag with Barcode & Master Carton"
  );
  const [specLabels, setSpecLabels] = useState(
    initialSpecs.labels || "Custom Woven Neck Labels & Care Tags"
  );

  // Size Chart State
  const [sizeChart, setSizeChart] = useState<SizeChartData>(
    initialProduct?.size_chart || SIZE_CHART_TEMPLATES.mens_top
  );
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>(
    initialProduct?.size_chart?.template_key || "mens_top"
  );

  // FAQs State
  const [faqs, setFaqs] = useState<ProductFaq[]>(
    initialProduct?.faqs && initialProduct.faqs.length > 0
      ? initialProduct.faqs
      : [
          {
            question: "What is the minimum order quantity (MOQ)?",
            answer:
              "Our starting MOQ is 30 pieces/kits with flexible size distribution across your squad or brand roster.",
          },
          {
            question: "How long does sample prototyping take?",
            answer:
              "Master pre-production samples are completed in 5–7 business days and shipped via DHL Express or FedEx.",
          },
          {
            question: "Can we include custom logos, player names, and numbers?",
            answer:
              "Yes. We offer all-over Italian dye sublimation, 3D silicone badges, and embroidery. Player names and numbers are included at no extra cost.",
          },
        ]
  );

  // Images state
  const [images, setImages] = useState<ProductImage[]>(
    initialProduct?.images && initialProduct.images.length > 0
      ? initialProduct.images
      : [
          {
            id: "img-init",
            product_id: initialProduct?.id || "",
            image_url:
              "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
            alt_text: initialProduct?.name || "Product Image Front",
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

  const handleApplySizeChartTemplate = (key: string) => {
    const template = SIZE_CHART_TEMPLATES[key];
    if (template) {
      setSizeChart(template);
      setSelectedTemplateKey(key);
      toast.info("Template Applied", `Loaded "${key}" size chart measurements.`);
    }
  };

  const handleAddFaq = () => {
    setFaqs([
      ...faqs,
      {
        question: "New Product Question?",
        answer: "Detailed answer describing specifications, lead times, or customization.",
      },
    ]);
  };

  const handleUpdateFaq = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
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
            alt_text: `${name || "Custom Apparel"} angle ${images.length + newAddedImages.length + 1}`,
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
      alt_text: `${name || "Product"} view ${images.length + 1}`,
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

  const handleMoveImage = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= images.length) return;
    const reordered = [...images];
    const temp = reordered[index];
    reordered[index] = reordered[targetIdx];
    reordered[targetIdx] = temp;
    // update sort_order
    setImages(reordered.map((img, i) => ({ ...img, sort_order: i + 1 })));
  };

  const handleUpdateImageAlt = (index: number, alt: string) => {
    const updated = [...images];
    updated[index] = { ...updated[index], alt_text: alt };
    setImages(updated);
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
        ? lastTier.min_quantity + 50
        : 30;
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

  // Live SEO Checklist Calculation
  const seoChecklist = useMemo(() => {
    const titleLen = (seoTitle || "").length;
    const descLen = (seoDesc || "").length;
    const pKey = (primaryKeyword || "").trim().toLowerCase();

    const titleOk = titleLen >= 45 && titleLen <= 65;
    const descOk = descLen >= 120 && descLen <= 165;
    const pKeyPresent = pKey.length > 0;
    const pKeyInTitle = pKeyPresent && (seoTitle || "").toLowerCase().includes(pKey);
    const pKeyInH1 = pKeyPresent && name.toLowerCase().includes(pKey);
    const pKeyInDesc = pKeyPresent && (seoDesc || "").toLowerCase().includes(pKey);
    const altsOk =
      images.length > 0 &&
      images.every((img) => img.alt_text && img.alt_text.trim().length > 3);
    const sizeChartOk = Boolean(
      sizeChart &&
        sizeChart.columns?.length > 0 &&
        (sizeChart.rows_cm?.length > 0 || sizeChart.rows_in?.length > 0)
    );
    const specsOk = Boolean(specFabric && specGsm && specFit);
    const faqsOk = Boolean(faqs && faqs.length >= 2);

    const items = [
      {
        label: "Meta Title Length (50–60 chars)",
        pass: titleOk,
        status: `${titleLen}/60 chars`,
      },
      {
        label: "Meta Description Length (140–155 chars)",
        pass: descOk,
        status: `${descLen}/155 chars`,
      },
      {
        label: "Primary Keyword Specified",
        pass: pKeyPresent,
        status: pKeyPresent ? `"${primaryKeyword}"` : "Missing",
      },
      {
        label: "Primary Keyword in Meta Title",
        pass: pKeyInTitle,
        status: pKeyInTitle ? "Present" : "Missing",
      },
      {
        label: "Primary Keyword in H1 / Product Name",
        pass: pKeyInH1,
        status: pKeyInH1 ? "Present" : "Missing",
      },
      {
        label: "Primary Keyword in Meta Description",
        pass: pKeyInDesc,
        status: pKeyInDesc ? "Present" : "Missing",
      },
      {
        label: "Descriptive Alt Text on All Images",
        pass: altsOk,
        status: `${images.filter((i) => i.alt_text && i.alt_text.length > 3).length}/${images.length}`,
      },
      {
        label: "Dynamic Size Chart Configured",
        pass: sizeChartOk,
        status: sizeChartOk ? `${sizeChart.template_key}` : "Missing",
      },
      {
        label: "Technical Specs Completed",
        pass: specsOk,
        status: specsOk ? "Complete" : "Missing fields",
      },
      {
        label: "B2B FAQs for Schema (min 2)",
        pass: faqsOk,
        status: `${faqs.length} FAQs`,
      },
    ];

    const passedCount = items.filter((i) => i.pass).length;
    const totalCount = items.length;
    const score = Math.round((passedCount / totalCount) * 100);

    return { items, passedCount, totalCount, score };
  }, [
    seoTitle,
    seoDesc,
    primaryKeyword,
    name,
    images,
    sizeChart,
    specFabric,
    specGsm,
    specFit,
    faqs,
  ]);

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
      const specificationsPayload: ProductSpecifications = {
        fabric: specFabric,
        gsm_range: specGsm,
        fit: specFit,
        decoration_methods: specDecoration
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        colors: specColors
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        sizes: specSizes
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        moq: Number(moq) || 30,
        sample_time: specSampleTime,
        lead_time: specLeadTime,
        packaging: specPackaging,
        labels: specLabels,
      };

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
        moq: Number(moq) || 30,
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
        canonical_url: canonicalUrl || null,
        noindex,
        og_title: ogTitle || null,
        og_description: ogDesc || null,
        og_image: ogImage || null,
        specifications: specificationsPayload,
        size_chart: sizeChart,
        faqs,
        images,
      };

      const saved = await saveProduct(payload);
      toast.dismiss(savingToastId);
      toast.success(
        "Product Saved Successfully",
        `"${saved.name}" has been saved and synchronized across catalog.`
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
    <form onSubmit={handleSubmit} className="space-y-8 max-w-6xl pb-24">
      {/* Top Header & Save Bar */}
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
        {/* Left Column (8 cols): Content, Specs, Size Chart, FAQs, Gallery */}
        <div className="lg:col-span-8 space-y-6">
          {/* General Information */}
          <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b border-neutral-100 pb-3 flex items-center justify-between">
              <span>General Information</span>
              <span className="text-[10px] font-mono text-neutral-400 font-normal">Step 1 of 5</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                  Product Name (H1) *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={handleNameChange}
                  className="w-full bg-white border border-neutral-300 rounded-xl focus:border-amber-600 text-[#0f172a] px-3.5 py-2.5 text-xs outline-none focus:ring-1 focus:ring-amber-500/20"
                  placeholder="e.g. Custom Sublimated Soccer Jerseys"
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
                  placeholder="custom-soccer-jerseys"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                Short Description (~40 words for catalog cards)
              </label>
              <textarea
                rows={2}
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-xl focus:border-amber-600 text-[#0f172a] px-3.5 py-2 text-xs outline-none focus:ring-1 focus:ring-amber-500/20"
                placeholder="High-level commercial summary for cards and search snippets..."
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                Full Technical Description (250–400 words)
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-xl focus:border-amber-600 text-[#0f172a] px-3.5 py-2 text-xs outline-none focus:ring-1 focus:ring-amber-500/20 leading-relaxed"
                placeholder="Comprehensive description covering fabrics, GSM, decoration methods, custom names/numbers, target buyers, MOQ, sampling and shipping."
              />
            </div>
          </div>

          {/* Technical Specifications Table Editor (Phase 3 Mandate) */}
          <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b border-neutral-100 pb-3 flex items-center justify-between">
              <span>Technical Specifications Table</span>
              <span className="text-[10px] font-mono text-amber-700 font-bold">Editable Data Table</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-neutral-600 mb-1 font-semibold">
                  Fabric Type
                </label>
                <input
                  type="text"
                  value={specFabric}
                  onChange={(e) => setSpecFabric(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl text-xs px-3 py-2 text-[#0f172a] outline-none focus:border-amber-600"
                  placeholder="100% Polyester Micro-Mesh / Interlock"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-neutral-600 mb-1 font-semibold">
                  GSM Weight Range
                </label>
                <input
                  type="text"
                  value={specGsm}
                  onChange={(e) => setSpecGsm(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl text-xs px-3 py-2 text-[#0f172a] outline-none focus:border-amber-600"
                  placeholder="160–220 GSM"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-neutral-600 mb-1 font-semibold">
                  Fit &amp; Cut Style
                </label>
                <input
                  type="text"
                  value={specFit}
                  onChange={(e) => setSpecFit(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl text-xs px-3 py-2 text-[#0f172a] outline-none focus:border-amber-600"
                  placeholder="Athletic Fit, Regular Cut, Contoured"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-neutral-600 mb-1 font-semibold">
                  Decoration Methods (Comma separated)
                </label>
                <input
                  type="text"
                  value={specDecoration}
                  onChange={(e) => setSpecDecoration(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl text-xs px-3 py-2 text-[#0f172a] outline-none focus:border-amber-600"
                  placeholder="Sublimation, 3D Silicone, Screen Print"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-neutral-600 mb-1 font-semibold">
                  Colors Available
                </label>
                <input
                  type="text"
                  value={specColors}
                  onChange={(e) => setSpecColors(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl text-xs px-3 py-2 text-[#0f172a] outline-none focus:border-amber-600"
                  placeholder="Custom Pantone Matching"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-neutral-600 mb-1 font-semibold">
                  Size Range
                </label>
                <input
                  type="text"
                  value={specSizes}
                  onChange={(e) => setSpecSizes(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl text-xs px-3 py-2 text-[#0f172a] outline-none focus:border-amber-600"
                  placeholder="XS to 5XL, Youth Curves"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-neutral-600 mb-1 font-semibold">
                  Sample Lead Time
                </label>
                <input
                  type="text"
                  value={specSampleTime}
                  onChange={(e) => setSpecSampleTime(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl text-xs px-3 py-2 text-[#0f172a] outline-none focus:border-amber-600"
                  placeholder="5–7 Business Days"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-wider text-neutral-600 mb-1 font-semibold">
                  Bulk Lead Time
                </label>
                <input
                  type="text"
                  value={specLeadTime}
                  onChange={(e) => setSpecLeadTime(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl text-xs px-3 py-2 text-[#0f172a] outline-none focus:border-amber-600"
                  placeholder="2–3 Weeks"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Size Chart Editor (Phase 4 Mandate) */}
          <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 flex-wrap gap-2">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] flex items-center gap-2">
                  <Table className="w-4 h-4 text-amber-600" />
                  <span>Dynamic Size Chart Editor</span>
                </h2>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Select a template or edit measurement rows (displayed on product page).
                </p>
              </div>

              {/* Template Picker */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedTemplateKey}
                  onChange={(e) => handleApplySizeChartTemplate(e.target.value)}
                  className="bg-neutral-50 border border-neutral-300 rounded-xl text-xs px-3 py-1.5 font-mono text-neutral-800 outline-none focus:border-amber-600 cursor-pointer"
                >
                  <option value="mens_top">Template: Men&apos;s Tops / Jerseys</option>
                  <option value="womens_top">Template: Women&apos;s Tops / Jerseys</option>
                  <option value="youth_kids">Template: Youth / Kids Sizes</option>
                  <option value="shorts_pants">Template: Shorts &amp; Pants</option>
                  <option value="tracksuit_jacket">Template: Tracksuit &amp; Jackets</option>
                  <option value="unisex">Template: Unisex Standard</option>
                </select>
              </div>
            </div>

            {/* Size Chart Preview Info */}
            <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-800">
                  Active Template: <span className="font-mono text-amber-700">{sizeChart.template_key}</span>
                </span>
                <span className="font-mono text-neutral-500 text-[11px]">
                  Columns: {sizeChart.columns.map((c) => c.label).join(", ")}
                </span>
              </div>
              <div className="text-[11px] text-neutral-600 flex items-center gap-2">
                <span className="font-bold text-neutral-700">Tolerance:</span>
                <input
                  type="text"
                  value={sizeChart.tolerance}
                  onChange={(e) => setSizeChart({ ...sizeChart, tolerance: e.target.value })}
                  className="bg-white border border-neutral-300 rounded-lg px-2 py-1 text-xs font-mono text-neutral-900 flex-1 outline-none focus:border-amber-600"
                />
              </div>
            </div>

            {/* Quick Preview Table */}
            <div className="overflow-x-auto border border-neutral-200 rounded-xl">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-neutral-100 text-neutral-700 border-b border-neutral-200">
                  <tr>
                    {sizeChart.columns.map((col) => (
                      <th key={col.key} className="py-2 px-3 text-[10px] uppercase font-bold">
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                  {sizeChart.rows_cm.slice(0, 5).map((row, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50">
                      {sizeChart.columns.map((col) => (
                        <td key={col.key} className="py-1.5 px-3">
                          {String(row[col.key] || "")} cm
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-neutral-400 font-mono text-right">
              Showing first 5 of {sizeChart.rows_cm.length} rows (CM &amp; Inches generated automatically).
            </p>
          </div>

          {/* B2B FAQ Editor (Phase 3 & 6 Mandate) */}
          <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>Product B2B FAQs &amp; Schema ({faqs.length})</span>
                </h2>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  These feed FAQ structured data (JSON-LD) for Google rich search results.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddFaq}
                className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-[#0f172a] px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-amber-700" />
                <span>Add FAQ</span>
              </button>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-amber-700 font-bold uppercase">
                      Q{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFaq(idx)}
                      className="text-neutral-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                      title="Remove FAQ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleUpdateFaq(idx, "question", e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-neutral-900 outline-none focus:border-amber-600"
                    placeholder="Question..."
                  />
                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) => handleUpdateFaq(idx, "answer", e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-1.5 text-xs text-neutral-700 outline-none focus:border-amber-600 leading-relaxed"
                    placeholder="Answer for buyer..."
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Gallery & Alt Text Manager */}
          <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a]">
                  Product Images Gallery ({images.length})
                </h2>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Upload photos, set primary hero, and customize SEO alt text per image.
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
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 shadow-xs">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-800">
                    Click to upload photos <span className="text-neutral-500 font-normal">or drag & drop</span>
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">
                    Front, back, side &amp; fabric close-up angles (PNG, JPG, WEBP).
                  </p>
                </div>
              </div>
            </div>

            {uploadError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                {uploadError}
              </div>
            )}

            {/* Images Grid with Alt Text Inputs & Ordering */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {images.map((img, idx) => (
                <div
                  key={img.id || idx}
                  className={`p-3 rounded-2xl border bg-white space-y-2.5 transition-all ${
                    img.is_primary
                      ? "border-amber-600 ring-2 ring-amber-500/20"
                      : "border-neutral-200"
                  }`}
                >
                  <div className="flex gap-3 items-start">
                    <div
                      className="w-20 h-20 rounded-xl bg-cover bg-center border border-neutral-200 shrink-0"
                      style={{ backgroundImage: `url(${img.image_url})` }}
                    />
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase">
                          {img.is_primary ? "★ Primary Hero" : `Angle #${idx + 1}`}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveImage(idx, "up")}
                            disabled={idx === 0}
                            title="Move Up"
                            className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-20 cursor-pointer"
                          >
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveImage(idx, "down")}
                            disabled={idx === images.length - 1}
                            title="Move Down"
                            className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-20 cursor-pointer"
                          >
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetPrimary(idx)}
                            title="Set Primary Hero"
                            className={`p-1 cursor-pointer ${
                              img.is_primary ? "text-amber-500" : "text-neutral-400 hover:text-amber-500"
                            }`}
                          >
                            <Star className={`w-3.5 h-3.5 ${img.is_primary ? "fill-current" : ""}`} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            title="Delete Image"
                            className="p-1 text-neutral-400 hover:text-red-500 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <label className="block text-[9px] font-mono uppercase text-neutral-400">
                        Image Alt Text (SEO):
                      </label>
                      <input
                        type="text"
                        value={img.alt_text || ""}
                        onChange={(e) => handleUpdateImageAlt(idx, e.target.value)}
                        placeholder="Descriptive keyword alt text..."
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1 text-xs text-neutral-900 outline-none focus:border-amber-600 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): SEO Audit Checklist, SERP Preview, SEO Inputs */}
        <div className="lg:col-span-4 space-y-6">
          {/* Live SEO Audit Checklist Card (Phase 5 Mandate) */}
          <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>SEO Quality Score</span>
              </h2>
              <span
                className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-full ${
                  seoChecklist.score >= 80
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : seoChecklist.score >= 50
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {seoChecklist.passedCount}/{seoChecklist.totalCount} ({seoChecklist.score}%)
              </span>
            </div>

            <div className="space-y-2">
              {seoChecklist.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-1.5 truncate">
                    {item.pass ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    )}
                    <span
                      className={`truncate text-[11px] ${
                        item.pass ? "text-neutral-700" : "text-neutral-500"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 shrink-0">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Google SERP Search Snippet Preview (Phase 5 Mandate) */}
          <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b border-neutral-100 pb-3 flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span>Google SERP Preview</span>
            </h2>

            <div className="bg-white p-3.5 rounded-2xl border border-neutral-200 space-y-1 font-sans">
              <div className="text-[11px] text-neutral-600 flex items-center gap-1 truncate font-mono">
                <span className="text-neutral-900 font-semibold">glovesstorm.com</span>
                <span>›</span>
                <span>products</span>
                <span>›</span>
                <span className="truncate">{slug || "product-slug"}</span>
              </div>
              <div className="text-sm font-medium text-[#1a0dab] line-clamp-1 hover:underline cursor-pointer">
                {seoTitle || `${name || "Product Name"} | Gloves Storm`}
              </div>
              <div className="text-[11px] text-[#4d5156] line-clamp-2 leading-relaxed">
                {seoDesc ||
                  shortDesc ||
                  "Provide a meta description to preview how this product listing will rank in Google search results."}
              </div>
            </div>
          </div>

          {/* Technical SEO Metadata Inputs with Live Counters */}
          <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b border-neutral-100 pb-3">
              Search Engine Optimization (SEO)
            </h2>

            {/* Meta Title with 60 Char Counter */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-700">
                  Meta SEO Title *
                </label>
                <span
                  className={`text-[10px] font-mono ${
                    seoTitle.length >= 45 && seoTitle.length <= 60
                      ? "text-emerald-600 font-bold"
                      : seoTitle.length > 60
                      ? "text-red-500 font-bold"
                      : "text-neutral-400"
                  }`}
                >
                  {seoTitle.length} / 60
                </span>
              </div>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Custom Sublimated Soccer Jerseys Manufacturer | Gloves Storm"
                className="w-full bg-white border border-neutral-300 rounded-xl text-[#0f172a] px-3.5 py-2 text-xs outline-none focus:border-amber-600"
              />
            </div>

            {/* Primary SEO Keyword */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                Primary SEO Keyword *
              </label>
              <input
                type="text"
                value={primaryKeyword}
                onChange={(e) => setPrimaryKeyword(e.target.value)}
                placeholder="custom soccer jerseys manufacturer"
                className="w-full bg-white border border-neutral-300 rounded-xl text-[#0f172a] px-3.5 py-2 text-xs outline-none focus:border-amber-600 font-mono"
              />
            </div>

            {/* Secondary Keywords */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                Secondary Keywords (Comma Separated)
              </label>
              <input
                type="text"
                value={secondaryKeywords}
                onChange={(e) => setSecondaryKeywords(e.target.value)}
                placeholder="soccer team uniforms, sublimation football jerseys, OEM kits"
                className="w-full bg-white border border-neutral-300 rounded-xl text-[#0f172a] px-3.5 py-2 text-xs outline-none focus:border-amber-600 font-mono"
              />
            </div>

            {/* Meta Description with 155 Char Counter */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-700">
                  Meta Description *
                </label>
                <span
                  className={`text-[10px] font-mono ${
                    seoDesc.length >= 135 && seoDesc.length <= 155
                      ? "text-emerald-600 font-bold"
                      : seoDesc.length > 155
                      ? "text-red-500 font-bold"
                      : "text-neutral-400"
                  }`}
                >
                  {seoDesc.length} / 155
                </span>
              </div>
              <textarea
                rows={3}
                value={seoDesc}
                onChange={(e) => setSeoDesc(e.target.value)}
                placeholder="Custom soccer jerseys & team uniforms manufacturer in Sialkot. Sublimation printing, low MOQ 30 pcs. Ships to USA & UK. Free quote."
                className="w-full bg-white border border-neutral-300 rounded-xl text-[#0f172a] px-3.5 py-2 text-xs outline-none focus:border-amber-600 leading-relaxed"
              />
            </div>

            {/* Canonical URL */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-700 mb-1">
                Canonical URL Override (Optional)
              </label>
              <input
                type="url"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                placeholder="https://www.glovesstorm.com/products/..."
                className="w-full bg-white border border-neutral-300 rounded-xl text-[#0f172a] px-3.5 py-2 text-xs outline-none focus:border-amber-600 font-mono"
              />
            </div>

            {/* NoIndex Toggle */}
            <div className="pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-neutral-800 font-medium">
                <input
                  type="checkbox"
                  checked={noindex}
                  onChange={(e) => setNoindex(e.target.checked)}
                  className="w-4 h-4 accent-amber-600"
                />
                <span>Exclude from Google Index (noindex)</span>
              </label>
            </div>
          </div>

          {/* Classification & Status */}
          <div className="p-6 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b border-neutral-100 pb-3">
              Catalog Classification
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

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-neutral-800 font-medium">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 accent-amber-600"
                />
                <span>Published in Live Catalog</span>
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
        </div>
      </div>
    </form>
  );
}

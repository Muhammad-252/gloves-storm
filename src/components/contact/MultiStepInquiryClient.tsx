"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Category, Product, Inquiry } from "@/types/database";
import { createInquiry } from "@/lib/data/clientStore";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Upload,
  FileText,
  X,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Layers,
  Box,
  Clock,
  Building2,
  Mail,
  Phone,
  Globe,
  Edit2,
  CheckCircle,
  Loader2,
} from "lucide-react";
import GooeyButton from "../ui/GooeyButton";
import MagneticElement from "../ui/MagneticElement";
import InquirySuccessScreen from "./InquirySuccessScreen";

interface MultiStepInquiryClientProps {
  categories: Category[];
  products: Product[];
}

const CATEGORY_CARDS = [
  { id: "sportswear", name: "Sportswear & Teamwear", desc: "Sublimated match kits, training shirts, rugby jerseys, shorts, tracksuits", icon: "⚽" },
  { id: "gym-wear", name: "Gym & Activewear", desc: "Squat-proof leggings, sports bras, seamless sets, compression gear", icon: "💪" },
  { id: "streetwear", name: "Streetwear & Hoodies", desc: "450–500 GSM French Terry hoodies, boxy tees, joggers, sweatpants", icon: "⚡" },
  { id: "varsity", name: "Varsity & Outerwear", desc: "Melton wool jackets, genuine leather sleeves, coach jackets, bombers", icon: "🧥" },
  { id: "private-label", name: "Private Label Packaging", desc: "Damask woven labels, embossed hang tags, barcoded custom polybags", icon: "🏷️" },
  { id: "custom", name: "Custom Cut & Sew Apparel", desc: "Completely bespoke prototype from technical drawings & CAD tech packs", icon: "📐" },
  { id: "commercial-export", name: "Commercial Apparel Export", desc: "High-volume OEM contracts, distributor supply, container orders", icon: "🌐" },
  { id: "other", name: "Other Inquiries", desc: "Bulk sourcing, distributor partnerships, tenders", icon: "📦" },
];

const QUANTITY_OPTIONS = [
  { label: "Sample Prototype", sub: "Pre-production sample run (35–50 pcs)", val: 35 },
  { label: "50 – 100 Units", sub: "Brand collection launch", val: 100 },
  { label: "100 – 300 Units", sub: "Core retail inventory run", val: 300 },
  { label: "300 – 500 Units", sub: "Commercial wholesale batch", val: 500 },
  { label: "500 – 1,000 Units", sub: "National club / distributor", val: 750 },
  { label: "1,000+ Units", sub: "High-volume OEM contract", val: 1500 },
  { label: "Not Sure Yet", sub: "Need factory guidance", val: 50 },
];

const TIMELINE_OPTIONS = [
  { label: "ASAP", sub: "Urgent deadline / rush sample" },
  { label: "Within 1 Month", sub: "Immediate production slot" },
  { label: "1 – 3 Months", sub: "Standard seasonal delivery" },
  { label: "3 – 6 Months", sub: "Upcoming tournament / launch" },
  { label: "Flexible", sub: "Quality and development priority" },
  { label: "Not Decided", sub: "Feasibility stage" },
];

const BUSINESS_TYPES = [
  "Apparel & Sportswear Brand",
  "Athletic Club / Sports Academy",
  "College / School Team",
  "Streetwear / Fashion Label",
  "Fitness Studio / Gym Chain",
  "Wholesaler / Distributor",
  "Startup / Independent Creator",
];

export default function MultiStepInquiryClient({
  categories,
  products,
}: MultiStepInquiryClientProps) {
  const searchParams = useSearchParams();

  // Wizard Step State (1 to 8)
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedProjectId, setGeneratedProjectId] = useState<string>("GS-100001");

  // Form State
  const [selectedCategory, setSelectedCategory] = useState<string>("Sportswear & Teamwear");
  const [selectedProduct, setSelectedProduct] = useState<string>("Pro Sublimated Team Kit");
  const [searchFilter, setSearchFilter] = useState("");

  // Customization Specs
  const [customSpecs, setCustomSpecs] = useState({
    material: "100% Combed Cotton French Terry (450 GSM)",
    colors: "Vintage Washed Black & Off-White",
    sizing: "XS, S, M, L, XL, 2XL",
    branding: "3D Puff Screen Print + Woven Damask Label",
    packaging: "Custom Matte Zip Polybag + Barcode Tag",
    notes: "",
  });

  // Uploaded Files
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);
  const [techPackLink, setTechPackLink] = useState("");

  // Quantity & Timeline
  const [quantity, setQuantity] = useState("50 – 100 Units");
  const [numericQuantity, setNumericQuantity] = useState(100);
  const [timeline, setTimeline] = useState("1 – 3 Months");

  // Brand Dossier
  const [brandInfo, setBrandInfo] = useState({
    brandName: "",
    website: "",
    instagram: "",
    businessType: "Apparel & Sportswear Brand",
    brandStory: "",
  });

  // Contact Information
  const [contactInfo, setContactInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "United States",
  });

  // File Input Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check for prefilled data from URL or Customizer Studio
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPayload = sessionStorage.getItem("gs_customization_payload");
      if (storedPayload) {
        try {
          const parsed = JSON.parse(storedPayload);
          if (parsed.productName) setSelectedProduct(parsed.productName);
          if (parsed.categoryName) setSelectedCategory(parsed.categoryName);
          setCustomSpecs((prev) => ({
            ...prev,
            material: parsed.materials || prev.material,
            colors: `${parsed.primaryColor} & ${parsed.secondaryColor}`,
            sizing: parsed.sizing?.join(", ") || prev.sizing,
            branding: parsed.brandingMethod || prev.branding,
            packaging: parsed.packaging || prev.packaging,
            notes: parsed.notes || prev.notes,
          }));
          if (parsed.bulkQuantity) {
            setNumericQuantity(parsed.bulkQuantity);
            setQuantity(`${parsed.bulkQuantity}+ Units`);
          }
          // Advance directly to review step or brand step if from customizer
          setCurrentStep(4);
        } catch {
          // ignore
        }
      } else {
        const prodParam = searchParams.get("product");
        if (prodParam) {
          const found = products.find((p) => p.slug === prodParam || p.id === prodParam);
          if (found) {
            setSelectedProduct(found.name);
            const cat = categories.find((c) => c.id === found.category_id);
            if (cat) setSelectedCategory(cat.name);
            setCurrentStep(3);
          }
        }
      }
    }
  }, [searchParams, products, categories]);

  // Handle Drag and Drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArr = Array.from(e.dataTransfer.files).map((f) => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      }));
      setUploadedFiles((prev) => [...prev, ...filesArr]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArr = Array.from(e.target.files).map((f) => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      }));
      setUploadedFiles((prev) => [...prev, ...filesArr]);
    }
  };

  // Step Validation Check
  const canProceed = () => {
    if (currentStep === 1) return Boolean(selectedCategory);
    if (currentStep === 2) return Boolean(selectedProduct);
    if (currentStep === 6) return Boolean(brandInfo.brandName.trim());
    if (currentStep === 7)
      return (
        Boolean(contactInfo.fullName.trim()) &&
        Boolean(contactInfo.email.trim()) &&
        Boolean(contactInfo.phone.trim())
      );
    return true;
  };

  // Final Submission Handler
  const handleSubmitProject = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const generatedId = `GS-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedProjectId(generatedId);

    try {
      await createInquiry({
        name: contactInfo.fullName,
        company: brandInfo.brandName || "Independent Label",
        email: contactInfo.email,
        phone: contactInfo.phone,
        country: contactInfo.country,
        product_category: selectedCategory,
        product_name: selectedProduct,
        estimated_quantity: numericQuantity,
        target_delivery_date: timeline,
        message: customSpecs.notes || `Direct Project Inquiry for ${selectedProduct}`,
        tech_pack_url: techPackLink || null,
        reference_files: uploadedFiles.map((f) => f.name),
        customization_details: customSpecs,
        brand_name: brandInfo.brandName,
        brand_website: brandInfo.website || null,
        brand_instagram: brandInfo.instagram || null,
        timeline: timeline,
        priority: true,
      });

      // Clear session storage payload
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("gs_customization_payload");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      setErrorMessage((err as Error).message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If already successfully submitted, show executive confirmation screen
  if (isSubmitted) {
    return (
      <InquirySuccessScreen
        customerName={contactInfo.fullName}
        projectId={generatedProjectId}
        email={contactInfo.email}
        productName={selectedProduct}
        onReset={() => {
          setIsSubmitted(false);
          setCurrentStep(1);
        }}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step Indicator Header */}
      <div className="mb-8 sm:mb-10 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mb-3">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-black font-bold">
            Step 0{currentStep} of 08
          </span>
          <span className="text-neutral-400 text-xs font-mono">•</span>
          <span className="text-[11px] sm:text-xs font-mono text-neutral-600 uppercase tracking-wider">
            {currentStep === 1 && "Division Selection"}
            {currentStep === 2 && "Product Model"}
            {currentStep === 3 && "Tailoring & Customization"}
            {currentStep === 4 && "Artwork & Tech Packs"}
            {currentStep === 5 && "Volume & Timeline"}
            {currentStep === 6 && "Brand Dossier"}
            {currentStep === 7 && "Direct Contact"}
            {currentStep === 8 && "Executive Review"}
          </span>
        </div>

        {/* Progress Bar Line */}
        <div className="w-full max-w-md mx-auto h-1.5 rounded-full bg-neutral-200 overflow-hidden">
          <div
            className="h-full bg-[#FFB900] transition-all duration-500"
            style={{ width: `${(currentStep / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP CONTAINER CARD */}
      <div className="p-4 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl bg-white border border-neutral-200 shadow-md relative">
        {/* STEP 01: DIVISION SELECTION */}
        {currentStep === 1 && (
          <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#0f172a] mb-1.5 sm:mb-2 leading-tight">
                What are you looking to manufacture?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                Select your primary manufacturing category. You can specify sub-styles in the next steps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
              {CATEGORY_CARDS.map((cat) => {
                const isSelected = selectedCategory.toLowerCase().includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`p-3.5 sm:p-4 md:p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between group ${isSelected
                        ? "border-black bg-white ring-2 ring-[#FFB900]"
                        : "border-neutral-200 bg-neutral-50/60 hover:border-neutral-300 hover:bg-neutral-100/60"
                      }`}
                  >
                    <div>
                      <span className="text-xl sm:text-2xl mb-2 sm:mb-3 block">{cat.icon}</span>
                      <h4 className="text-xs sm:text-sm font-bold uppercase text-[#0f172a] mb-1">
                        {cat.name}
                      </h4>
                      <p className="text-[11px] text-neutral-600 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="mt-3 sm:mt-4 flex items-center justify-end">
                      <span
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isSelected
                            ? "border-[#FFB900] bg-[#FFB900] text-black"
                            : "border-neutral-300 text-transparent"
                          }`}
                      >
                        <Check className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 02: PRODUCT MODEL */}
        {currentStep === 2 && (
          <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#0f172a] mb-1.5 sm:mb-2 leading-tight">
                Which product model are you manufacturing?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                Select from our catalog designs or specify a custom OEM prototype.
              </p>
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Filter products by name or feature..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-2xl px-4 py-3 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#FFB900] focus:ring-1 focus:ring-[#FFB900]/40"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[380px] overflow-y-auto pr-1">
              {products
                .filter((p) =>
                  searchFilter
                    ? p.name.toLowerCase().includes(searchFilter.toLowerCase())
                    : true
                )
                .map((prod) => {
                  const isSelected = selectedProduct === prod.name;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => setSelectedProduct(prod.name)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${isSelected
                          ? "border-black bg-white ring-2 ring-[#FFB900]"
                          : "border-neutral-200 bg-neutral-50/60 hover:border-neutral-300"
                        }`}
                    >
                      <div>
                        <span className="text-xs font-bold text-[#0f172a] block mb-0.5">
                          {prod.name}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500">
                          MOQ: {prod.moq} Units • {prod.lead_time || "2-4 Weeks"}
                        </span>
                      </div>
                      <span
                        className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center transition-all ${isSelected
                            ? "border-[#FFB900] bg-[#FFB900] text-black"
                            : "border-neutral-300"
                          }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </span>
                    </button>
                  );
                })}

              {/* Custom Model Option */}
              <button
                type="button"
                onClick={() => setSelectedProduct("Custom Bespoke Development (Original Design)")}
                className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${selectedProduct.includes("Custom Bespoke")
                    ? "border-black bg-white ring-2 ring-[#FFB900]"
                    : "border-neutral-200 bg-neutral-50/60 hover:border-neutral-300"
                  }`}
              >
                <div>
                  <span className="text-xs font-bold text-black block mb-0.5">
                    + Custom Prototype / New Cut
                  </span>
                  <span className="text-[10px] text-neutral-600">
                    Manufactured from your original physical sample or 3D mockups.
                  </span>
                </div>
                <span
                  className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center transition-all ${selectedProduct.includes("Custom Bespoke")
                      ? "border-[#FFB900] bg-[#FFB900] text-black"
                      : "border-neutral-300"
                    }`}
                >
                  {selectedProduct.includes("Custom Bespoke") && <Check className="w-3 h-3" />}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 03: CUSTOMIZE YOUR PRODUCT */}
        {currentStep === 3 && (
          <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#0f172a] mb-1.5 sm:mb-2 leading-tight">
                Specify Customization Details
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                Detail your materials, brand color codes, ounce weights, and printing methods.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-2 font-medium">
                  Material / Fabric Specification
                </label>
                <input
                  type="text"
                  value={customSpecs.material}
                  onChange={(e) => setCustomSpecs({ ...customSpecs, material: e.target.value })}
                  placeholder="e.g. 450 GSM French Terry, 280 GSM Recycled Nylon Spandex, Dry-Fit Poly"
                  className="w-full bg-white border border-neutral-300 rounded-2xl px-4 py-3 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#FFB900] focus:ring-1 focus:ring-[#FFB900]/40"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-2 font-medium">
                  Target Colors / PANTONE Codes
                </label>
                <input
                  type="text"
                  value={customSpecs.colors}
                  onChange={(e) => setCustomSpecs({ ...customSpecs, colors: e.target.value })}
                  placeholder="e.g. Matte Black / Metallic Gold / White Trim"
                  className="w-full bg-white border border-neutral-300 rounded-2xl px-4 py-3 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#FFB900] focus:ring-1 focus:ring-[#FFB900]/40"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-2 font-medium">
                  Sizing Breakdown & Dimensions
                </label>
                <input
                  type="text"
                  value={customSpecs.sizing}
                  onChange={(e) => setCustomSpecs({ ...customSpecs, sizing: e.target.value })}
                  placeholder="e.g. S, M, L, XL, 2XL (Custom Size Curves)"
                  className="w-full bg-white border border-neutral-300 rounded-2xl px-4 py-3 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#FFB900] focus:ring-1 focus:ring-[#FFB900]/40"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-2 font-medium">
                  Logo / Branding & Embellishment Method
                </label>
                <input
                  type="text"
                  value={customSpecs.branding}
                  onChange={(e) => setCustomSpecs({ ...customSpecs, branding: e.target.value })}
                  placeholder="e.g. 3D Puff Screen Print, Tajima Embroidery, Sublimation, Silicone Patch"
                  className="w-full bg-white border border-neutral-300 rounded-2xl px-4 py-3 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#FFB900] focus:ring-1 focus:ring-[#FFB900]/40"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-2 font-medium">
                Special Tailoring & Packaging Notes
              </label>
              <textarea
                rows={3}
                value={customSpecs.notes}
                onChange={(e) => setCustomSpecs({ ...customSpecs, notes: e.target.value })}
                placeholder="Include custom aglets, woven neck tags, bar-tacking, custom zip polybags, or unique technical requirements..."
                className="w-full bg-white border border-neutral-300 rounded-2xl p-4 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#FFB900] focus:ring-1 focus:ring-[#FFB900]/40 resize-none"
              />
            </div>
          </div>
        )}

        {/* STEP 04: UPLOAD FILES */}
        {currentStep === 4 && (
          <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#0f172a] mb-1.5 sm:mb-2 leading-tight">
                Upload Artwork, Logos & Tech Packs
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                Drag and drop your design files. All uploads are encrypted under our strict factory non-disclosure agreement.
              </p>
            </div>

            {/* Drag & Drop Box */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl border-2 border-dashed border-neutral-300 hover:border-[#FFB900] bg-neutral-50/60 text-center cursor-pointer transition-all hover:bg-neutral-100/60 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.svg,.ai,.psd,.zip"
                onChange={handleFileInput}
                className="hidden"
              />
              <div className="w-14 h-14 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-900 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#FFB900] group-hover:text-[#FFB900] transition-all">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold uppercase text-[#0f172a] mb-1">
                Drop your files here, or <span className="text-black underline group-hover:text-[#FFB900]">Browse Files</span>
              </h4>
              <p className="text-xs text-neutral-500">
                Supports PDF, AI, PSD, SVG, PNG, JPG, or ZIP archives (Up to 50MB per file)
              </p>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-neutral-600 block mb-1">
                  Attached Artwork ({uploadedFiles.length})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {uploadedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-black shrink-0" />
                        <span className="text-[#0f172a] truncate font-medium">{file.name}</span>
                        <span className="text-[10px] font-mono text-neutral-500">({file.size})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setUploadedFiles((prev) => prev.filter((_, i) => i !== idx))
                        }
                        className="text-neutral-400 hover:text-red-500 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Alternative Cloud Link Input */}
            <div className="pt-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-600 block mb-2 font-medium">
                Or share Google Drive / Dropbox / WeTransfer link:
              </label>
              <input
                type="url"
                value={techPackLink}
                onChange={(e) => setTechPackLink(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full bg-white border border-neutral-300 rounded-2xl px-4 py-3 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#FFB900] focus:ring-1 focus:ring-[#FFB900]/40"
              />
            </div>
          </div>
        )}

        {/* STEP 05: QUANTITY & TIMELINE */}
        {currentStep === 5 && (
          <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#0f172a] mb-1.5 sm:mb-2 leading-tight">
                Production Quantity & Timeline
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                Tell us your target volume so we can calculate tiered factory pricing and container freight terms.
              </p>
            </div>

            {/* Quantity Cards */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-3 font-medium">
                Select Expected Volume
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {QUANTITY_OPTIONS.map((q) => {
                  const isSelected = quantity === q.label;
                  return (
                    <button
                      key={q.label}
                      type="button"
                      onClick={() => {
                        setQuantity(q.label);
                        setNumericQuantity(q.val);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all ${isSelected
                          ? "border-black bg-white ring-2 ring-[#FFB900]"
                          : "border-neutral-200 bg-neutral-50/60 hover:border-neutral-300"
                        }`}
                    >
                      <span className="block text-xs font-bold text-[#0f172a] mb-0.5">
                        {q.label}
                      </span>
                      <span className="text-[10px] text-neutral-500 block">{q.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Timeline Cards */}
            <div className="pt-4 border-t border-neutral-200">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-3 font-medium">
                When do you need delivery?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TIMELINE_OPTIONS.map((t) => {
                  const isSelected = timeline === t.label;
                  return (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => setTimeline(t.label)}
                      className={`p-3 rounded-2xl border text-center transition-all ${isSelected
                          ? "border-black bg-white ring-2 ring-[#FFB900] font-bold text-black"
                          : "border-neutral-200 bg-neutral-50/60 text-neutral-600 hover:text-[#0f172a]"
                        }`}
                    >
                      <span className="block text-xs text-[#0f172a] font-medium">{t.label}</span>
                      <span className="text-[9px] text-neutral-500 block mt-0.5">{t.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 06: TELL US ABOUT YOUR BRAND */}
        {currentStep === 6 && (
          <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#0f172a] mb-1.5 sm:mb-2 leading-tight">
                Tell us about your brand
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                Help us understand your company positioning so we can match you with the right pattern masters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-2 font-medium">
                  Brand or Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={brandInfo.brandName}
                  onChange={(e) => setBrandInfo({ ...brandInfo, brandName: e.target.value })}
                  placeholder="e.g. Apex Combat Club or Sterling Athletics"
                  className="w-full bg-white border border-neutral-300 rounded-2xl px-4 py-3 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#FFB900] focus:ring-1 focus:ring-[#FFB900]/40"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-2 font-medium">
                  Website URL (Optional)
                </label>
                <input
                  type="url"
                  value={brandInfo.website}
                  onChange={(e) => setBrandInfo({ ...brandInfo, website: e.target.value })}
                  placeholder="https://yourbrand.com"
                  className="w-full bg-white border border-neutral-300 rounded-2xl px-4 py-3 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#FFB900] focus:ring-1 focus:ring-[#FFB900]/40"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-2 font-medium">
                  Instagram Handle (Optional)
                </label>
                <input
                  type="text"
                  value={brandInfo.instagram}
                  onChange={(e) => setBrandInfo({ ...brandInfo, instagram: e.target.value })}
                  placeholder="@yourbrand"
                  className="w-full bg-white border border-neutral-300 rounded-2xl px-4 py-3 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#FFB900] focus:ring-1 focus:ring-[#FFB900]/40"
                />
              </div>

              <div>
                <label htmlFor="business-entity-type-select" className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-2 font-medium">Business Entity Type</label>
                <select id="business-entity-type-select" aria-label="Business Entity Type" value={brandInfo.businessType}
                  onChange={(e) => setBrandInfo({ ...brandInfo, businessType: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded-2xl px-4 py-3 text-xs text-[#0f172a] focus:outline-none focus:border-[#FFB900]"
                >
                  {BUSINESS_TYPES.map((b) => (
                    <option key={b} value={b} className="bg-white text-[#0f172a]">
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-2 font-medium">
                Brand Vision / What are you trying to create?
              </label>
              <textarea
                rows={3}
                value={brandInfo.brandStory}
                onChange={(e) => setBrandInfo({ ...brandInfo, brandStory: e.target.value })}
                placeholder="Share your aesthetic inspirations, competitive targets, or retail plans..."
                className="w-full bg-white border border-neutral-300 rounded-2xl p-4 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#FFB900] focus:ring-1 focus:ring-[#FFB900]/40 resize-none"
              />
            </div>
          </div>
        )}

        {/* STEP 07: CONTACT INFORMATION */}
        {currentStep === 7 && (
          <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#0f172a] mb-1.5 sm:mb-2 leading-tight">
                Where should we send your quote?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                Direct factory communication. We never share contact credentials with third parties.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-2 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={contactInfo.fullName}
                  onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
                  placeholder="Alexander Sterling"
                  className="w-full bg-white border border-neutral-300 rounded-2xl px-4 py-3 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#FFB900] focus:ring-1 focus:ring-[#FFB900]/40"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-2 font-medium">
                  Corporate / Inquiries Email *
                </label>
                <input
                  type="email"
                  required
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  placeholder="alex@yourbrand.com"
                  className="w-full bg-white border border-neutral-300 rounded-2xl px-4 py-3 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#FFB900] focus:ring-1 focus:ring-[#FFB900]/40"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-2 font-medium">
                  Phone / WhatsApp (With Country Code) *
                </label>
                <input
                  type="tel"
                  required
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  placeholder="+1 (555) 234-5678"
                  className="w-full bg-white border border-neutral-300 rounded-2xl px-4 py-3 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#FFB900] focus:ring-1 focus:ring-[#FFB900]/40"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 block mb-2 font-medium">
                  Delivery Destination Country *
                </label>
                <input
                  type="text"
                  required
                  value={contactInfo.country}
                  onChange={(e) => setContactInfo({ ...contactInfo, country: e.target.value })}
                  placeholder="United States, United Kingdom, Australia, UAE..."
                  className="w-full bg-white border border-neutral-300 rounded-2xl px-4 py-3 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#FFB900] focus:ring-1 focus:ring-[#FFB900]/40"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 08: EXECUTIVE REVIEW & SUBMIT */}
        {currentStep === 8 && (
          <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#0f172a] mb-1.5 sm:mb-2 leading-tight">
                Review Your Project Dossier
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                Verify all technical specifications, volume, and branding requirements before final transmission to Sialkot.
              </p>
            </div>

            {/* Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {/* Product & Division */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 relative">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="absolute top-3 right-3 text-[10px] font-mono text-neutral-900 font-bold flex items-center gap-1 hover:text-[#FFB900] hover:underline"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                  Product Selection
                </span>
                <span className="text-sm font-bold text-[#0f172a] block mb-0.5">{selectedProduct}</span>
                <span className="text-xs text-neutral-600">{selectedCategory}</span>
              </div>

              {/* Customization Specs */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 relative">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="absolute top-3 right-3 text-[10px] font-mono text-neutral-900 font-bold flex items-center gap-1 hover:text-[#FFB900] hover:underline"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                  Customization Specs
                </span>
                <span className="text-xs text-[#0f172a] block">
                  <strong>Material:</strong> {customSpecs.material}
                </span>
                <span className="text-xs text-[#0f172a] block">
                  <strong>Colors:</strong> {customSpecs.colors}
                </span>
                <span className="text-xs text-[#0f172a] block">
                  <strong>Branding:</strong> {customSpecs.branding}
                </span>
              </div>

              {/* Volume & Schedule */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 relative">
                <button
                  onClick={() => setCurrentStep(5)}
                  className="absolute top-3 right-3 text-[10px] font-mono text-neutral-900 font-bold flex items-center gap-1 hover:text-[#FFB900] hover:underline"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                  Volume & Schedule
                </span>
                <span className="text-xs text-[#0f172a] block">
                  <strong>Volume:</strong> {quantity}
                </span>
                <span className="text-xs text-[#0f172a] block">
                  <strong>Required By:</strong> {timeline}
                </span>
                <span className="text-xs text-neutral-500 block">
                  Files: {uploadedFiles.length} attached {techPackLink ? "• Cloud link provided" : ""}
                </span>
              </div>

              {/* Brand & Contact */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 relative">
                <button
                  onClick={() => setCurrentStep(7)}
                  className="absolute top-3 right-3 text-[10px] font-mono text-neutral-900 font-bold flex items-center gap-1 hover:text-[#FFB900] hover:underline"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                  Brand & Contact
                </span>
                <span className="text-xs text-[#0f172a] block font-medium">
                  <strong>{brandInfo.brandName}</strong> ({contactInfo.country})
                </span>
                <span className="text-xs text-[#0f172a] block">{contactInfo.fullName}</span>
                <span className="text-xs text-neutral-600 block">{contactInfo.email} • {contactInfo.phone}</span>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                {errorMessage}
              </div>
            )}
          </div>
        )}

        {/* STEP CONTROLS FOOTER */}
        <div className="mt-10 pt-6 border-t border-neutral-200 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s - 1)}
              className="flex items-center gap-1 text-xs font-mono uppercase text-neutral-600 hover:text-[#0f172a] transition-colors font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 8 ? (
            <MagneticElement strength={0.25}>
              <GooeyButton
                onClick={() => {
                  if (canProceed()) setCurrentStep((s) => s + 1);
                }}
                disabled={!canProceed()}
                variant="gold-solid"
                size="md"
                className={!canProceed() ? "opacity-50 cursor-not-allowed" : ""}
              >
                <span>CONTINUE</span>
                <ChevronRight className="w-4 h-4" />
              </GooeyButton>
            </MagneticElement>
          ) : (
            <MagneticElement strength={0.3}>
              <GooeyButton
                onClick={handleSubmitProject}
                disabled={isSubmitting}
                variant="gold-solid"
                size="lg"
                className="shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>TRANSMITTING TO SIALKOT...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 text-black" />
                    <span>SUBMIT PROJECT</span>
                  </>
                )}
              </GooeyButton>
            </MagneticElement>
          )}
        </div>
      </div>
    </div>
  );
}

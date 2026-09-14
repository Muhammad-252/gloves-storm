"use client";

import { useState } from "react";
import { X, CheckCircle, ArrowRight, Shield, Loader2 } from "lucide-react";
import { createInquiry } from "@/lib/data/store";
import GooeyButton from "./GooeyButton";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProductName?: string;
  defaultCategory?: string;
  inquiryType?: "Quote" | "Sample";
}

export default function QuoteModal({
  isOpen,
  onClose,
  defaultProductName = "",
  defaultCategory = "General",
  inquiryType = "Quote",
}: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "United States",
    product_category: defaultCategory,
    product_name: defaultProductName,
    estimated_quantity: inquiryType === "Sample" ? 2 : 100,
    target_delivery_date: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createInquiry({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        product_category: formData.product_category || defaultCategory,
        product_name: formData.product_name || defaultProductName,
        estimated_quantity: Number(formData.estimated_quantity) || 50,
        target_delivery_date: formData.target_delivery_date || null,
        message: formData.message || "Requested direct factory quotation.",
        tech_pack_url: null,
        reference_files: [],
      });

      setSubmitted(true);
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 text-neutral-900 my-8 shadow-[0_25px_60px_rgba(0,0,0,0.15)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 p-2 transition-colors rounded-full hover:bg-neutral-100"
          aria-label="Close quote modal"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-amber-700 font-mono mb-2 font-semibold">
              Inquiry Confirmed
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-950 mb-4">
              THANK YOU. <br />
              YOUR PROJECT IS NOW IN REVIEW.
            </h3>
            <p className="text-sm text-neutral-600 max-w-md mb-8 leading-relaxed">
              Our engineering and production team in Sialkot will review your specifications, volume requirements, and timeline. You will receive a formal quotation within 12 business hours.
            </p>
            <GooeyButton
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              variant="gold-solid"
              size="md"
            >
              Done
            </GooeyButton>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-mono block mb-1 font-semibold">
                {inquiryType === "Sample" ? "Physical Sample Development" : "Direct Factory Production Inquiries"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-950">
                {inquiryType === "Sample" ? "Request a Sample" : "Request a Quote"}
              </h2>
              {defaultProductName && (
                <p className="text-xs text-neutral-500 mt-1">
                  Product: <span className="text-neutral-900 font-medium">{defaultProductName}</span>
                </p>
              )}
            </div>

            {error && (
              <div className="p-3 mb-6 bg-red-50 border border-red-200 text-xs text-red-600 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-amber-600 text-neutral-900 px-3.5 py-2.5 text-xs outline-none rounded-lg transition-colors"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-medium">
                    Company / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-amber-600 text-neutral-900 px-3.5 py-2.5 text-xs outline-none rounded-lg transition-colors"
                    placeholder="e.g. Apex Combat Athletics"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-medium">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-amber-600 text-neutral-900 px-3.5 py-2.5 text-xs outline-none rounded-lg transition-colors"
                    placeholder="name@brand.com"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-medium">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-amber-600 text-neutral-900 px-3.5 py-2.5 text-xs outline-none rounded-lg transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-medium">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-amber-600 text-neutral-900 px-3.5 py-2.5 text-xs outline-none rounded-lg transition-colors"
                    placeholder="e.g. USA, UK, UAE"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-medium">
                    Est. Quantity (Units)
                  </label>
                  <input
                    type="number"
                    min={20}
                    value={formData.estimated_quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, estimated_quantity: Number(e.target.value) })
                    }
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-amber-600 text-neutral-900 px-3.5 py-2.5 text-xs outline-none rounded-lg transition-colors"
                    placeholder="50"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-medium">
                    Target Delivery Date
                  </label>
                  <input
                    type="date"
                    value={formData.target_delivery_date}
                    onChange={(e) =>
                      setFormData({ ...formData, target_delivery_date: e.target.value })
                    }
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-amber-600 text-neutral-900 px-3.5 py-2.5 text-xs outline-none rounded-lg transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1 font-medium">
                  Project Details / Customization Notes *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-300 focus:border-amber-600 text-neutral-900 px-3.5 py-2.5 text-xs outline-none rounded-lg transition-colors"
                  placeholder="Detail your target materials, logo finishes, size curves, or paste links to tech pack files (Dropbox, WeTransfer, Google Drive)..."
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                  <Shield className="w-3.5 h-3.5 text-amber-600" />
                  <span>NDAs honored • Direct factory pricing</span>
                </div>

                <GooeyButton
                  type="submit"
                  disabled={loading}
                  variant="gold-solid"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </GooeyButton>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

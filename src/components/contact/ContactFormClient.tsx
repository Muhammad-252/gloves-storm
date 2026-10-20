"use client";

import { useState } from "react";
import { Category } from "@/types/database";
import { createInquiry } from "@/lib/data/clientStore";
import { CheckCircle, ArrowRight, Loader2, UploadCloud, Shield } from "lucide-react";
import GooeyButton from "../ui/GooeyButton";

interface ContactFormClientProps {
  categories: Category[];
}

export default function ContactFormClient({ categories }: ContactFormClientProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    product_category: categories[0]?.name || "Sportswear & Teamwear",
    product_name: "",
    estimated_quantity: 100,
    target_delivery_date: "",
    message: "",
    tech_pack_url: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        country: formData.country || "International",
        product_category: formData.product_category,
        product_name: formData.product_name || null,
        estimated_quantity: Number(formData.estimated_quantity) || 50,
        target_delivery_date: formData.target_delivery_date || null,
        message: formData.message,
        tech_pack_url: formData.tech_pack_url || null,
        reference_files: [],
      });

      setSubmitted(true);
    } catch (err: unknown) {
      setError((err as Error).message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-16 text-center flex flex-col items-center animate-in fade-in duration-500">
        <div className="w-20 h-20 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] mb-8">
          <CheckCircle className="w-10 h-10" />
        </div>
        <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-mono mb-3">
          Direct Factory Submission Received
        </span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-4">
          THANK YOU. <br />
          YOUR PROJECT IS NOW IN REVIEW.
        </h2>
        <p className="text-sm text-[#8e8e93] max-w-lg mb-8 leading-relaxed">
          Your inquiry has been assigned to our Sialkot production directors. We are analyzing your specifications, sizing, and quantity requirements. You will receive an official response and quotation within 12 business hours.
        </p>

        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              company: "",
              email: "",
              phone: "",
              country: "",
              product_category: categories[0]?.name || "Sportswear & Teamwear",
              product_name: "",
              estimated_quantity: 100,
              target_delivery_date: "",
              message: "",
              tech_pack_url: "",
            });
          }}
          className="bg-[#d4af37] hover:bg-[#e5c058] text-black px-8 py-3.5 font-bold text-xs uppercase tracking-wider transition-all"
        >
          Submit Another Project
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-1">
          Manufacturing Inquiry Form
        </h2>
        <p className="text-xs text-[#8e8e93]">
          Fill in the details below to receive an accurate factory quotation and production schedule.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-950/40 border border-red-500/30 text-xs text-red-400">
          {error}
        </div>
      )}

      {/* Row 1: Name & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#a1a1aa] mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Liam Henderson"
            className="w-full bg-[#181818] border border-white/[0.1] focus:border-[#d4af37] text-white px-4 py-3 text-xs outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#a1a1aa] mb-1.5">
            Company / Brand Name *
          </label>
          <input
            type="text"
            required
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="e.g. Apex Combat Athletics"
            className="w-full bg-[#181818] border border-white/[0.1] focus:border-[#d4af37] text-white px-4 py-3 text-xs outline-none transition-colors"
          />
        </div>
      </div>

      {/* Row 2: Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#a1a1aa] mb-1.5">
            Business Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="liam@apexathletics.com"
            className="w-full bg-[#181818] border border-white/[0.1] focus:border-[#d4af37] text-white px-4 py-3 text-xs outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#a1a1aa] mb-1.5">
            Phone / WhatsApp (With Country Code) *
          </label>
          <input
            type="text"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 555 123 4567"
            className="w-full bg-[#181818] border border-white/[0.1] focus:border-[#d4af37] text-white px-4 py-3 text-xs outline-none transition-colors"
          />
        </div>
      </div>

      {/* Row 3: Country & Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#a1a1aa] mb-1.5">
            Target Destination Country *
          </label>
          <input
            type="text"
            required
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            placeholder="e.g. United States, United Kingdom, UAE"
            className="w-full bg-[#181818] border border-white/[0.1] focus:border-[#d4af37] text-white px-4 py-3 text-xs outline-none transition-colors"
          />
        </div>
        <div>
          <label htmlFor="contact-category-select" className="block text-[11px] font-medium uppercase tracking-wider text-[#a1a1aa] mb-1.5">Product Category *</label>
          <select id="contact-category-select" aria-label="Product Category" value={formData.product_category}
            onChange={(e) => setFormData({ ...formData, product_category: e.target.value })}
            className="w-full bg-[#181818] border border-white/[0.1] focus:border-[#d4af37] text-white px-4 py-3 text-xs outline-none transition-colors"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 4: Product Name, Quantity, Delivery Date */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#a1a1aa] mb-1.5">
            Specific Item Name
          </label>
          <input
            type="text"
            value={formData.product_name}
            onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
            placeholder="e.g. 16oz Sparring Gloves"
            className="w-full bg-[#181818] border border-white/[0.1] focus:border-[#d4af37] text-white px-4 py-3 text-xs outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#a1a1aa] mb-1.5">
            Estimated Quantity (Units) *
          </label>
          <input
            type="number"
            min={20}
            required
            value={formData.estimated_quantity}
            onChange={(e) =>
              setFormData({ ...formData, estimated_quantity: Number(e.target.value) })
            }
            placeholder="100"
            className="w-full bg-[#181818] border border-white/[0.1] focus:border-[#d4af37] text-white px-4 py-3 text-xs outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#a1a1aa] mb-1.5">
            Target Delivery Date
          </label>
          <input
            type="date"
            value={formData.target_delivery_date}
            onChange={(e) => setFormData({ ...formData, target_delivery_date: e.target.value })}
            className="w-full bg-[#181818] border border-white/[0.1] focus:border-[#d4af37] text-white px-4 py-3 text-xs outline-none transition-colors"
          />
        </div>
      </div>

      {/* Row 5: Message */}
      <div>
        <label className="block text-[11px] font-medium uppercase tracking-wider text-[#a1a1aa] mb-1.5">
          Project Scope / Customization Requirements *
        </label>
        <textarea
          rows={4}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Describe target fabric weights (e.g. 450 GSM French Terry), leather grades (e.g. Full-grain Cowhide), logo techniques (embroidery, puff print), size curve breakdowns..."
          className="w-full bg-[#181818] border border-white/[0.1] focus:border-[#d4af37] text-white p-4 text-xs outline-none transition-colors"
        />
      </div>

      {/* Row 6: Tech Pack Link / File Link */}
      <div>
        <label className="block text-[11px] font-medium uppercase tracking-wider text-[#a1a1aa] mb-1.5 flex items-center gap-1.5">
          <UploadCloud className="w-4 h-4 text-[#d4af37]" />
          <span>Tech Pack / Artwork Link (Dropbox, Google Drive, WeTransfer)</span>
        </label>
        <input
          type="url"
          value={formData.tech_pack_url}
          onChange={(e) => setFormData({ ...formData, tech_pack_url: e.target.value })}
          placeholder="https://drive.google.com/your-tech-pack-or-spec-sheet"
          className="w-full bg-[#181818] border border-white/[0.1] rounded-xl focus:border-[#d4af37] text-white px-4 py-3 text-xs outline-none transition-colors"
        />
        <span className="text-[10px] text-[#71717a] mt-1 block">
          You can paste file sharing links or email them directly to glovesstorm@gmail.com after submission.
        </span>
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-[#71717a]">
          <Shield className="w-4 h-4 text-[#d4af37]" />
          <span>Strict Non-Disclosure Guarantee</span>
        </div>

        <GooeyButton
          type="submit"
          disabled={loading}
          variant="gold-solid"
          size="lg"
          className="w-full sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Inquiry...</span>
            </>
          ) : (
            <>
              <span>SUBMIT INQUIRY</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </GooeyButton>
      </div>
    </form>
  );
}

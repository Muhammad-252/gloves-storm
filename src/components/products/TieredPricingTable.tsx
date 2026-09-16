"use client";

import { useState, useMemo } from "react";
import { PriceTier } from "@/types/database";
import {
  DollarSign,
  Check,
  ShieldCheck,
  Award,
  Sparkles,
  Calculator,
  ArrowRight,
  Clock,
  Layers,
  ChevronRight,
  FileText,
  Building2,
  Star,
} from "lucide-react";

interface TieredPricingTableProps {
  productName: string;
  moq: number;
  pricingTiers?: PriceTier[] | null;
  samplePrice?: number | null;
  showPricing?: boolean;
  onRequestQuote: (quantity: number, tierLabel?: string) => void;
  onRequestSample?: () => void;
}

export default function TieredPricingTable({
  productName,
  moq = 50,
  pricingTiers,
  samplePrice,
  showPricing = true,
  onRequestQuote,
  onRequestSample,
}: TieredPricingTableProps) {
  // Compute default tiers if none provided
  const defaultTiers: PriceTier[] = useMemo(() => {
    const baseSample = samplePrice || 35.0;
    return [
      {
        min_quantity: 1,
        max_quantity: Math.max(1, moq - 1),
        unit_price: baseSample,
        currency: "$",
        label: "Sample",
      },
      {
        min_quantity: moq,
        max_quantity: Math.max(moq, 499),
        unit_price: Math.round(baseSample * 0.52 * 100) / 100,
        currency: "$",
        label: "10-49 pieces",
      },
      {
        min_quantity: 500,
        max_quantity: 999,
        unit_price: Math.round(baseSample * 0.4 * 100) / 100,
        currency: "$",
        label: "50-99 pieces",
      },
      {
        min_quantity: 1000,
        max_quantity: null,
        unit_price: Math.round(baseSample * 0.32 * 100) / 100,
        currency: "$",
        label: "≥100 pieces",
      },
    ];
  }, [moq, samplePrice]);

  const rawTiers = pricingTiers && pricingTiers.length > 0 ? pricingTiers : defaultTiers;

  // Format wholesale production tiers (excluding sample tier for clean Alibaba row if sample is separate)
  const wholesaleTiers = useMemo(() => {
    // If tiers contain a single sample tier (qty 1), keep bulk tiers prominent
    const bulkOnly = rawTiers.filter((t) => t.min_quantity > 1);
    return bulkOnly.length > 0 ? bulkOnly : rawTiers;
  }, [rawTiers]);

  const [quantity, setQuantity] = useState<number>(moq);

  // Active matching tier
  const activeTier = useMemo(() => {
    return (
      wholesaleTiers.find((tier) => {
        const meetsMin = quantity >= tier.min_quantity;
        const meetsMax =
          tier.max_quantity === null ||
          tier.max_quantity === undefined ||
          quantity <= tier.max_quantity;
        return meetsMin && meetsMax;
      }) || wholesaleTiers[wholesaleTiers.length - 1]
    );
  }, [quantity, wholesaleTiers]);

  const unitPrice = activeTier?.unit_price || wholesaleTiers[0]?.unit_price || 20;

  const totalCost = useMemo(() => {
    return (quantity * unitPrice).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [quantity, unitPrice]);

  if (!showPricing) {
    return (
      <div className="p-6 rounded-2xl bg-neutral-900 text-white border border-neutral-800 shadow-sm mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 block mb-1">
              Confidential OEM Specification
            </span>
            <h3 className="text-base font-bold uppercase text-white">
              Bespoke Factory Quotation Available
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Pricing depends on exact leather grade, embroidery, and packaging requirements.
            </p>
          </div>
          <button
            onClick={() => onRequestQuote(moq)}
            className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Request Factory Quotation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 space-y-6">
      {/* 1. Alibaba-Style Clean Pricing Tier Row (Exact design from user reference image) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-neutral-50/80 border border-neutral-200/90 shadow-2xs">
        {/* Tier Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 items-end pb-5 border-b border-neutral-200/80">
          {wholesaleTiers.map((tier, idx) => {
            const isSelected = activeTier === tier;
            const rangeLabel =
              tier.max_quantity === null || tier.max_quantity === undefined
                ? `≥${tier.min_quantity} pieces`
                : `${tier.min_quantity}-${tier.max_quantity} pieces`;

            return (
              <div
                key={idx}
                onClick={() => setQuantity(tier.min_quantity)}
                className={`cursor-pointer transition-all rounded-xl p-3 text-left ${
                  isSelected
                    ? "bg-white border-2 border-neutral-900 shadow-xs ring-2 ring-amber-500/20"
                    : "hover:bg-white/70 border border-transparent"
                }`}
              >
                <div className="flex items-baseline gap-0.5">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-black text-neutral-950 tracking-tight font-sans">
                    US${tier.unit_price.toFixed(0)}
                  </span>
                  {tier.unit_price % 1 !== 0 && (
                    <span className="text-xs font-bold text-neutral-600 font-sans">
                      .{(tier.unit_price % 1).toFixed(2).substring(2)}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-xs text-neutral-500 font-medium tracking-tight">
                  {tier.label && !tier.label.includes("Tier") ? tier.label : rangeLabel}
                </div>
                {isSelected && (
                  <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold font-mono text-amber-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    Selected Tier
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Interactive Volume & Instant Order Calculation Bar */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
              Quantity:
            </span>
            <div className="flex items-center border border-neutral-300 rounded-lg bg-white overflow-hidden shadow-2xs">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(moq, quantity - 25))}
                className="px-3 py-1.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                -
              </button>
              <input
                type="number"
                min={moq}
                step={5}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || moq))}
                className="w-20 text-center font-mono font-bold text-xs py-1.5 outline-none border-x border-neutral-200"
              />
              <button
                type="button"
                onClick={() => setQuantity(quantity + 25)}
                className="px-3 py-1.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                +
              </button>
            </div>
            <span className="text-xs text-neutral-500 font-mono">pieces</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                Est. Total (FOB)
              </span>
              <span className="text-base sm:text-lg font-black font-mono text-neutral-950">
                US${totalCost}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onRequestQuote(quantity, activeTier?.label)}
              className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Supplier's Customization Ability (Matches reference image) */}
      <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
        <div className="flex items-center gap-2 mb-3">
          <h4 className="text-sm font-bold text-neutral-900">
            Supplier&apos;s customization ability
          </h4>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified
          </span>
        </div>
        <ul className="space-y-1.5 text-xs text-neutral-600">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            <span>Minor customization (Logo embossing, private woven labeling, barcoding)</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            <span>Drawing-based customization (Tech pack conversion &amp; 2D/3D CAD vector patterns)</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            <span>Sample-based customization (Counter-sample reverse engineering within 3-5 days)</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            <span>Full customization (Custom hand-molds, bespoke leather tanning, padding densities)</span>
          </li>
        </ul>
      </div>

      {/* 3. Key Attributes Table (Matches reference image) */}
      <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
        <h4 className="text-sm font-bold text-neutral-900 mb-3">Key attributes</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
            <span className="block text-[11px] text-neutral-500">Material</span>
            <span className="block text-xs font-bold text-neutral-900 mt-0.5">
              100% Top-Grain Leather / Custom
            </span>
          </div>
          <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
            <span className="block text-[11px] text-neutral-500">Closure / Wrist</span>
            <span className="block text-xs font-bold text-neutral-900 mt-0.5">
              Hook &amp; Loop / Traditional Lace-Up
            </span>
          </div>
          <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
            <span className="block text-[11px] text-neutral-500">Padding Foam</span>
            <span className="block text-xs font-bold text-neutral-900 mt-0.5">
              Multi-Layer IMF &amp; Gel Foam
            </span>
          </div>
          <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
            <span className="block text-[11px] text-neutral-500">Size / Weight</span>
            <span className="block text-xs font-bold text-neutral-900 mt-0.5">
              8oz, 10oz, 12oz, 14oz, 16oz
            </span>
          </div>
          <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
            <span className="block text-[11px] text-neutral-500">Design &amp; Branding</span>
            <span className="block text-xs font-bold text-neutral-900 mt-0.5">
              Silkscreen, Embossed, Silicone
            </span>
          </div>
          <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
            <span className="block text-[11px] text-neutral-500">Production Lead Time</span>
            <span className="block text-xs font-bold text-neutral-900 mt-0.5">
              2-4 Weeks (Air / Ocean Cargo)
            </span>
          </div>
        </div>
      </div>

      {/* 4. Verified Supplier Profile Box (Matches bottom card in reference image) */}
      <div className="p-5 rounded-2xl bg-neutral-50 border border-blue-100/80 shadow-2xs">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 text-amber-400 font-extrabold flex items-center justify-center text-sm shadow-xs">
              GS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-neutral-950">
                  Gloves Storm Industrial Co., Ltd.
                </span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">
                  Verified
                </span>
              </div>
              <p className="text-xs text-neutral-500 flex items-center gap-1.5 mt-0.5">
                <span>🇵🇰 Sialkot, PK</span>
                <span>•</span>
                <span>15+ yrs OEM/ODM Factory</span>
                <span>•</span>
                <span className="font-medium text-neutral-700">Custom Manufacturer</span>
              </p>
            </div>
          </div>
        </div>

        {/* Performance Metric Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-neutral-200/70 text-center">
          <div className="p-2 rounded-lg bg-white border border-neutral-100">
            <div className="text-sm font-black text-neutral-900 flex items-center justify-center gap-1">
              <span>4.9/5</span>
              <span className="text-[10px] text-neutral-500 font-normal">(1,840)</span>
            </div>
            <span className="text-[10px] text-neutral-500 font-medium">Store rating</span>
          </div>
          <div className="p-2 rounded-lg bg-white border border-neutral-100">
            <div className="text-sm font-black text-neutral-900">≤3h</div>
            <span className="text-[10px] text-neutral-500 font-medium">Response Time</span>
          </div>
          <div className="p-2 rounded-lg bg-white border border-neutral-100">
            <div className="text-sm font-black text-neutral-900">≥98%</div>
            <span className="text-[10px] text-neutral-500 font-medium">On-time dispatch</span>
          </div>
          <div className="p-2 rounded-lg bg-white border border-neutral-100">
            <div className="text-sm font-black text-neutral-900">88%</div>
            <span className="text-[10px] text-neutral-500 font-medium">Reorder rate</span>
          </div>
        </div>
      </div>
    </div>
  );
}

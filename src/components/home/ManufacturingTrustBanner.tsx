"use client";

import { ShieldCheck, Cpu, Box, Clock, Truck, Award } from "lucide-react";

const credentials = [
  {
    icon: ShieldCheck,
    title: "Direct Apparel Mill",
    detail: "Zero middlemen • Mill-direct pricing",
  },
  {
    icon: Box,
    title: "Low MOQ: 35–50 Pcs",
    detail: "Scales from startups to 50k+ units",
  },
  {
    icon: Clock,
    title: "5–7 Days Prototyping",
    detail: "Door-to-door physical sample testing",
  },
  {
    icon: Cpu,
    title: "Tajima & Kiian Precision",
    detail: "3D puff embroidery & Italian sublimation",
  },
  {
    icon: Award,
    title: "AQL 2.5 Zero-Defect QC",
    detail: "Multi-point needle & seam stress audits",
  },
  {
    icon: Truck,
    title: "DDP Global Delivery",
    detail: "USA & UK express • 50+ countries",
  },
];

export default function ManufacturingTrustBanner() {
  return (
    <div className="bg-white/60 backdrop-blur-xl border-b border-black/[0.06] py-5 sm:py-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-4">
          {credentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2.5 p-2 rounded-2xl bg-white/50 backdrop-blur-md border border-white/80 shadow-xs group"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-800 shrink-0 group-hover:bg-[#111827] group-hover:text-amber-400 transition-all">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[11px] font-bold text-[#111827] uppercase tracking-wide truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-neutral-500 leading-tight truncate">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

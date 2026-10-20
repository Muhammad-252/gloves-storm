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
    <div className="bg-white/60 backdrop-blur-xl border-b border-black/[0.06] py-3.5 sm:py-5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3.5">
          {credentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/50 backdrop-blur-md border border-white/80 shadow-xs group"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FFB900]/15 border border-[#FFB900]/30 flex items-center justify-center text-black shrink-0 group-hover:bg-black group-hover:text-[#FFB900] transition-all">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-[11px] font-bold text-[#111827] uppercase tracking-wide truncate">
                    {item.title}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-neutral-500 leading-tight truncate">
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

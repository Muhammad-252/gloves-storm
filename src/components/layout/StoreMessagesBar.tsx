"use client";

import { Scissors, Plane, ShieldCheck, Award } from "lucide-react";

export default function StoreMessagesBar() {
  const messages = [
    {
      icon: Scissors,
      title: "Made-to-Measure & Custom Sizing",
      subtitle: "Custom fits & bespoke tech packs",
    },
    {
      icon: Plane,
      title: "Worldwide Express Air Shipping",
      subtitle: "Door-to-door DDP to USA, UK & EU",
    },
    {
      icon: ShieldCheck,
      title: "Direct Sialkot Factory Craftsmanship",
      subtitle: "No middlemen • Certified production",
    },
    {
      icon: Award,
      title: "100% Quality Inspected & NDA Backed",
      subtitle: "Pre-shipment inline audit guarantee",
    },
  ];

  return (
    <div className="w-full bg-white border-b border-neutral-200/90 text-neutral-900 py-2.5 sm:py-3 px-4 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Responsive message strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-8 items-center">
          {messages.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 justify-start"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 border border-neutral-200/60 text-neutral-900">
                  <Icon className="w-4 h-4 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-neutral-950 tracking-tight leading-snug">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-neutral-500 font-normal leading-tight">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

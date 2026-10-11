"use client";

import { Sparkles, ArrowRight, ShieldCheck, Ruler } from "lucide-react";

interface CustomBespokeGridTileProps {
  categoryName?: string;
  onOpenModal: () => void;
}

export default function CustomBespokeGridTile({
  categoryName = "Custom Apparel",
  onOpenModal,
}: CustomBespokeGridTileProps) {
  return (
    <div className="relative rounded-2xl bg-neutral-950 text-white p-6 flex flex-col justify-between overflow-hidden shadow-lg border border-neutral-800 min-h-[380px]">
      {/* Background subtle monochrome gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 to-black/80 pointer-events-none" />

      {/* Header Tag */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-[10px] font-mono uppercase tracking-widest font-bold mb-4 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-[#FFB900]" />
          <span>Bespoke &amp; OEM Studio</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-2 leading-tight">
          Design Your Own {categoryName}
        </h3>

        <p className="text-xs text-neutral-300 leading-relaxed mb-6">
          Bring your tech packs, mood boards, or custom sketches. We handle pattern grading, custom textile dyeing, luxury hardware, and rapid sample prototyping.
        </p>

        {/* Feature bullets */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-xs text-neutral-200">
            <Ruler className="w-3.5 h-3.5 text-white/80 shrink-0" />
            <span>Made-to-measure custom fit &amp; sizing blocks</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-200">
            <ShieldCheck className="w-3.5 h-3.5 text-white/80 shrink-0" />
            <span>Private-label neck tags, woven labels &amp; luxury packaging</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="relative z-10 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onOpenModal}
          className="w-full py-3.5 px-4 rounded-xl bg-[#FFB900] hover:bg-[#E5A700] text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,185,0,0.3)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer group"
        >
          <span>Start Custom Design</span>
          <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

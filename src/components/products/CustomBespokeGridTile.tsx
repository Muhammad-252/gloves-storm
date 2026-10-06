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
    <div className="relative rounded-2xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 text-white p-6 flex flex-col justify-between overflow-hidden shadow-lg border border-neutral-800 min-h-[380px]">
      {/* Background ambient subtle geometric glow */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-slate-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Tag */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-amber-400 text-[10px] font-mono uppercase tracking-widest font-bold mb-4 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Bespoke & OEM Studio</span>
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
            <Ruler className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Made-to-measure custom fit & sizing blocks</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-200">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Private-label neck tags, woven labels & luxury packaging</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="relative z-10 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onOpenModal}
          className="w-full py-3 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer group"
        >
          <span>Start Custom Design</span>
          <ArrowRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

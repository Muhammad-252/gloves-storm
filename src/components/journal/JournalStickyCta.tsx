"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, CheckCircle2, MessageCircle, Package, Clock, ShieldCheck, Plane } from "lucide-react";

export default function JournalStickyCta() {
  return (
    <aside className="sticky top-28 self-start w-full max-h-[calc(100vh-8.5rem)] overflow-y-auto scrollbar-none pl-1">
      <div className="bg-white/90 backdrop-blur-xl border border-neutral-200/90 rounded-3xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
        
        {/* Top Header Badge */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB900]/15 border border-[#FFB900]/40 text-black text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3 text-neutral-900" />
            <span>Direct Sialkot Factory</span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-neutral-900 tracking-tight leading-snug mb-2">
            Build Your Brand With Factory-Direct Low MOQ
          </h3>

          <p className="text-xs text-neutral-600 leading-relaxed mb-4">
            Custom sportswear, gym wear, and heavyweight streetwear manufactured to your exact tech pack specs.
          </p>

          {/* Quick Value Props */}
          <div className="space-y-2 mb-6 pt-3 border-t border-neutral-100">
            <div className="flex items-center gap-2 text-xs text-neutral-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB900] shrink-0" />
              <span><strong>30–50 pcs</strong> low starter MOQ</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#FFB900] shrink-0" />
              <span><strong>5–7 days</strong> prototype turnaround</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFB900] shrink-0" />
              <span><strong>AQL 2.5</strong> export quality standard</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 font-medium">
              <Plane className="w-3.5 h-3.5 text-[#FFB900] shrink-0" />
              <span><strong>DDP delivery</strong> to USA, UK &amp; EU</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2 border-t border-neutral-100">
          <Link
            href="/contact"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#FFB900] hover:bg-[#E5A700] text-black font-extrabold rounded-2xl py-3 px-4 text-xs uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(255,185,0,0.3)] hover:-translate-y-0.5"
          >
            <span>Request Factory Quote</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <a
            href="https://wa.me/923417146935?text=Hello%20Gloves%20Storm%2C%20I%20am%20interested%20in%20a%20custom%20manufacturing%20quote."
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-2xl py-3 px-4 text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#FFB900]" />
            <span>Chat on WhatsApp</span>
          </a>

          <Link
            href="/products"
            className="w-full inline-flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 hover:text-neutral-900 font-mono uppercase tracking-wider py-1.5 transition-colors"
          >
            <Package className="w-3 h-3" />
            <span>View Catalog &amp; Fabrics &rarr;</span>
          </Link>
        </div>

      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, FileCheck } from "lucide-react";
import GooeyButton from "../ui/GooeyButton";
import MagneticElement from "../ui/MagneticElement";

interface InquirySuccessScreenProps {
  customerName: string;
  projectId: string;
  email: string;
  productName: string;
  onReset?: () => void;
}

export default function InquirySuccessScreen({
  customerName,
  projectId,
  email,
  productName,
  onReset,
}: InquirySuccessScreenProps) {
  return (
    <div className="max-w-3xl mx-auto p-8 sm:p-14 rounded-3xl bg-white border border-neutral-200 shadow-xl text-center animate-in fade-in zoom-in-95 duration-500 relative overflow-hidden">
      {/* Success Badge */}
      <div className="w-16 h-16 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-900 mx-auto flex items-center justify-center mb-6 shadow-sm">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-900 font-bold block mb-2">
        Project Dossier Transmitted
      </span>

      <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0f172a] mb-3">
        PROJECT RECEIVED
      </h2>

      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl mx-auto mb-8">
        Thank you, <strong className="text-[#0f172a]">{customerName}</strong>. We have securely received your manufacturing specifications for <span className="text-black font-bold">{productName}</span>. A confirmation has been logged to our Sialkot production team.
      </p>

      {/* Project ID Box */}
      <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 mb-10">
        <span className="text-xs font-mono uppercase text-neutral-500">PROJECT REFERENCE ID</span>
        <span className="text-lg sm:text-xl font-mono font-bold tracking-widest text-[#0f172a]">
          {projectId}
        </span>
      </div>

      {/* What Happens Next 3-Stage Timeline */}
      <div className="mb-12 text-left">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-4 text-center">
          What Happens Next in Production
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center font-mono">
                01
              </span>
              <span className="text-xs font-bold text-[#0f172a] uppercase">Technical Review</span>
            </div>
            <p className="text-[11px] text-neutral-600 leading-relaxed">
              Our pattern masters review your tech pack, materials, and custom artwork for factory tolerances.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center font-mono">
                02
              </span>
              <span className="text-xs font-bold text-[#0f172a] uppercase">Formal Quotation</span>
            </div>
            <p className="text-[11px] text-neutral-600 leading-relaxed">
              Within 12 business hours, you receive an itemized factory quotation sent to <span className="text-[#0f172a] font-medium">{email}</span>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center font-mono">
                03
              </span>
              <span className="text-xs font-bold text-[#0f172a] uppercase">Sample Run</span>
            </div>
            <p className="text-[11px] text-neutral-600 leading-relaxed">
              Upon approval, we manufacture and air-courier physical prototypes with DHL Express tracking.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <MagneticElement strength={0.25}>
          <GooeyButton
            href="/products"
            variant="gold-solid"
            size="lg"
            className="w-full sm:w-auto"
          >
            <span>EXPLORE OTHER PRODUCTS</span>
            <ArrowRight className="w-4 h-4" />
          </GooeyButton>
        </MagneticElement>

        <GooeyButton
          href="/"
          variant="outline"
          size="lg"
          className="w-full sm:w-auto"
        >
          <span>BACK TO HOMEPAGE</span>
        </GooeyButton>
      </div>

      {/* NDA Notice */}
      <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-center gap-2 text-xs text-neutral-500">
        <ShieldCheck className="w-4 h-4 text-neutral-900" />
        <span>Strict Non-Disclosure Agreement (NDA) privacy binding all uploaded assets.</span>
      </div>
    </div>
  );
}

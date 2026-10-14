"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24 text-center">
      <div className="max-w-md p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white border border-neutral-200 shadow-sm w-full">
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-red-600 font-bold block mb-2 sm:mb-3">
          System Notice
        </span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0f172a] mb-3 sm:mb-4">
          TEMPORARY INTERRUPT
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mb-8 leading-relaxed">
          {error?.message || "An unexpected error occurred while communicating with the data service."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0f172a] hover:bg-neutral-800 text-white rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-[#0f172a] border border-neutral-200 rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

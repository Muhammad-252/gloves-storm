import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24 text-center">
      <div className="max-w-xl p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-white border border-neutral-200 shadow-sm w-full">
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-neutral-900 block mb-3 sm:mb-4 font-bold">
          404 Error • Specification Missing
        </span>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#0f172a] mb-4 sm:mb-6 leading-tight">
          THIS PAGE DOESN&apos;T EXIST. <br />
          <span className="text-neutral-400">BUT YOUR NEXT PRODUCT COULD.</span>
        </h1>
        <p className="text-sm text-neutral-600 mb-10 leading-relaxed">
          The link you followed may be broken or the product specification has been moved. Explore our manufacturing catalog or return home.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFB900] hover:bg-[#E5A700] text-black rounded-full px-8 py-3.5 font-extrabold text-xs uppercase tracking-[0.2em] transition-all shadow-[0_4px_16px_rgba(255,185,0,0.3)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-[#0f172a] border border-neutral-300 hover:border-[#FFB900] rounded-full px-8 py-3.5 font-bold text-xs uppercase tracking-[0.2em] transition-all"
          >
            <span>Explore Catalog</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

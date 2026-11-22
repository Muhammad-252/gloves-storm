import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock, PackageCheck } from "lucide-react";
import { SAMPLE_OFFER } from "@/lib/sampleOffer";

export default function SampleOfferSection() {
  return (
    <section aria-labelledby="sample-offer-heading" className="px-2 sm:px-3 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto rounded-[22px] sm:rounded-[28px] bg-[#FFF6DD] border border-[#FFB900]/40 overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#FFB900]/50 text-[11px] font-semibold text-neutral-900 mb-4">
              <PackageCheck className="w-3.5 h-3.5 text-[#B07F00]" />
              Sample offer
            </span>
            <h2
              id="sample-offer-heading"
              className="text-2xl sm:text-4xl font-semibold tracking-[-0.04em] text-ink leading-tight"
            >
              {SAMPLE_OFFER.headline}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-700 leading-relaxed max-w-xl">
              Sample made in <strong>{SAMPLE_OFFER.days}</strong>, from{" "}
              <strong>${SAMPLE_OFFER.fromPrice}</strong> all-in.{" "}
              <strong>{SAMPLE_OFFER.creditTerms}</strong>
            </p>
            <ul className="mt-6 space-y-2.5">
              {SAMPLE_OFFER.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-neutral-800">
                  <CheckCircle2 className="w-4 h-4 text-[#B07F00] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FFB900] hover:bg-[#E5A700] text-black font-medium text-sm transition-all shadow-sm"
              >
                Order a sample
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border border-neutral-300 hover:border-neutral-900 text-neutral-900 font-medium text-sm transition-all"
              >
                See all sample prices
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="rounded-2xl bg-white border border-neutral-200 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900 mb-4">
                <Clock className="w-4 h-4 text-[#B07F00]" />
                Example all-in sample prices
              </div>
              <dl className="divide-y divide-neutral-100">
                {SAMPLE_OFFER.examples.map((e) => (
                  <div key={e.label} className="flex items-center justify-between py-3 text-sm">
                    <dt className="text-neutral-700">{e.label}</dt>
                    <dd className="font-semibold text-neutral-950">${e.price}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[11px] text-neutral-500 leading-relaxed">
                Includes express courier. Prices from our 2026–27 price list.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

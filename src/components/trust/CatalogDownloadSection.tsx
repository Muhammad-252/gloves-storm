import { ArrowDown, FileText } from "lucide-react";
import { CATALOGS } from "@/lib/data/priceList";

interface CatalogDownloadSectionProps {
  /** "panel" for a full-width section, "compact" for sidebars and contact pages */
  variant?: "panel" | "compact";
}

export default function CatalogDownloadSection({ variant = "panel" }: CatalogDownloadSectionProps) {
  if (variant === "compact") {
    return (
      <div className="rounded-[22px] bg-white border border-line p-5 sm:p-6">
        <span className="block text-[15px] font-medium text-ink">Download our 2026–27 catalogs</span>
        <p className="mt-1 text-[13px] text-ink/60">Products, prices, add-ons and order terms in one PDF.</p>
        <div className="mt-4 space-y-2">
          {CATALOGS.map((catalog) => (
            <a
              key={catalog.href}
              href={catalog.href}
              download
              className="group flex items-center justify-between gap-3 rounded-2xl bg-bone hover:bg-stone px-4 py-3 transition-colors"
            >
              <span className="flex items-center gap-3 min-w-0">
                <FileText className="w-4 h-4 text-ink/60 shrink-0" />
                <span className="text-[14px] font-medium text-ink truncate">{catalog.title}</span>
              </span>
              <ArrowDown className="w-4 h-4 text-ink/60 group-hover:text-ink transition-colors shrink-0" />
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-14 sm:py-20" aria-labelledby="catalog-downloads-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8 lg:gap-14 items-end">
        <div className="lg:col-span-5">
          <span className="eyebrow mb-4">Catalogs 2026–27</span>
          <h2 id="catalog-downloads-heading" className="display-lg text-ink">
            Every product, <em className="accent-serif text-ink/70">every price.</em>
          </h2>
          <p className="mt-5 text-[15px] sm:text-base text-ink/65 leading-relaxed max-w-md">
            Download our catalogs with 2026–27 prices, decoration add-ons and order terms. Share them with your team or
            partners.
          </p>
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3 sm:gap-4">
          {CATALOGS.map((catalog, i) => (
            <a
              key={catalog.href}
              href={catalog.href}
              download
              className={`group relative overflow-hidden rounded-[24px] p-6 sm:p-7 min-h-[220px] flex flex-col justify-between transition-transform hover:-translate-y-1 ${
                i === 0 ? "bg-ink text-bone" : "bg-white border border-line text-ink"
              }`}
            >
              <div>
                <span className={`text-[12px] font-medium ${i === 0 ? "text-bone/60" : "text-ink/55"}`}>
                  PDF · {catalog.pages} pages
                </span>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{catalog.title}</h3>
                <p className={`mt-2 text-[14px] leading-relaxed ${i === 0 ? "text-bone/65" : "text-ink/60"}`}>
                  {catalog.description}
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium">
                <span className="w-9 h-9 rounded-full bg-[#FFB900] text-ink flex items-center justify-center transition-transform group-hover:translate-y-0.5">
                  <ArrowDown className="w-4 h-4" />
                </span>
                Download catalog
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

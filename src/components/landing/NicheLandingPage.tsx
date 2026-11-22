import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { getCategories, getProducts } from "@/lib/data/store";
import { SPORTSWEAR_PRICES, STREETWEAR_PRICES, PRICE_TIERS, unitLabel } from "@/lib/data/priceList";
import { BUSINESS_CONFIG } from "@/lib/business";
import SampleOfferSection from "@/components/home/SampleOfferSection";

export interface NicheLandingConfig {
  path: string;
  eyebrow: string;
  h1: string;
  intro: string;
  /** Short facts shown under the intro */
  highlights: string[];
  /** Product page slugs to show as cards, in order */
  productSlugs: string[];
  productsHeading: string;
  /** Price list rows to show, matched by product slug */
  priceSlugs: string[];
  sections: { heading: string; body: string; bullets?: string[] }[];
  faqs: { q: string; a: string }[];
  related: { label: string; href: string }[];
}

const SITE = "https://www.glovesstorm.com";
const allPriceItems = [...SPORTSWEAR_PRICES, ...STREETWEAR_PRICES].flatMap((g) => g.items);

export default async function NicheLandingPage({ config }: { config: NicheLandingConfig }) {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const categorySlugById = new Map(categories.map((c) => [c.id, c.slug]));

  const cards = config.productSlugs
    .map((slug) => products.find((p) => p.slug === slug && p.is_active))
    .filter((p): p is NonNullable<typeof p> => Boolean(p && categorySlugById.get(p.category_id)));

  const priceRows = allPriceItems.filter((item) =>
    item.slugs.some((s) => config.priceSlugs.includes(s))
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: config.h1, item: `${SITE}${config.path}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: config.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="pt-28 sm:pt-36 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-[11px] text-neutral-500 mb-5">
            <Link href="/" className="hover:text-neutral-900">Home</Link>
            <span className="mx-1.5">/</span>
            <span className="text-neutral-800">{config.eyebrow}</span>
          </nav>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-600 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB900]" />
            {config.eyebrow}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.045em] text-ink leading-[1.05]">
            {config.h1}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-neutral-700 leading-relaxed max-w-3xl">{config.intro}</p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-2.5 max-w-3xl">
            {config.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-neutral-800">
                <CheckCircle2 className="w-4 h-4 text-[#B07F00] shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FFB900] hover:bg-[#E5A700] text-black font-medium text-sm shadow-sm transition-all"
            >
              Get a quote
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href={BUSINESS_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border border-neutral-300 hover:border-neutral-900 text-neutral-900 font-medium text-sm transition-all"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Products */}
      {cards.length > 0 && (
        <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-t border-line">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.04em] text-ink mb-8">
              {config.productsHeading}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {cards.map((p) => {
                const img = p.images?.[0];
                return (
                  <Link
                    key={p.id}
                    href={`/products/${categorySlugById.get(p.category_id)}/${p.slug}`}
                    className="group rounded-2xl bg-white border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-[4/5] bg-neutral-100">
                      {img && (
                        <Image
                          src={img.image_url}
                          alt={img.alt_text || p.name}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 leading-snug">{p.name}</h3>
                      <span className="text-[11px] text-neutral-500">MOQ {p.moq || BUSINESS_CONFIG.moq} pcs</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Prices */}
      {priceRows.length > 0 && (
        <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-t border-line">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.04em] text-ink mb-2">Factory prices</h2>
            <p className="text-sm text-neutral-600 mb-6">
              Guide prices in USD, ex-factory Sialkot, from our 2026–27 price list. Final price depends on fabric, print and trims.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
              <table className="w-full text-left text-xs sm:text-sm min-w-[560px]">
                <thead className="bg-neutral-50 text-neutral-600">
                  <tr>
                    <th className="py-3 px-4 font-medium">Product</th>
                    {PRICE_TIERS.map((t) => (
                      <th key={t} className="py-3 px-4 font-medium">{t}</th>
                    ))}
                    <th className="py-3 px-4 font-medium">Sample</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {priceRows.map((row) => (
                    <tr key={row.product}>
                      <td className="py-3 px-4">
                        <span className="font-medium text-neutral-900 block">{row.product}</span>
                        <span className="text-[11px] text-neutral-500">{row.spec}</span>
                      </td>
                      {row.prices.map((price, i) => (
                        <td key={i} className="py-3 px-4 text-neutral-800 whitespace-nowrap">
                          ${price.toFixed(2)}/{unitLabel(row.unit)}
                        </td>
                      ))}
                      <td className="py-3 px-4 text-neutral-800">${row.sample}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href="/pricing" className="inline-block mt-4 text-xs font-medium underline underline-offset-4 text-neutral-700 hover:text-neutral-950">
              Full price list and order terms
            </Link>
          </div>
        </section>
      )}

      {/* Content sections */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-t border-line">
        <div className="max-w-3xl mx-auto space-y-10">
          {config.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-ink mb-3">{s.heading}</h2>
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">{s.body}</p>
              {s.bullets && (
                <ul className="mt-4 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-neutral-800">
                      <CheckCircle2 className="w-4 h-4 text-[#B07F00] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <SampleOfferSection />

      {/* FAQ */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-t border-line">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.04em] text-ink mb-6">Questions brands ask us</h2>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {config.faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base font-medium text-neutral-900">
                  {f.q}
                  <span className="text-neutral-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-t border-line">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-semibold text-ink mb-4">Related</h2>
          <div className="flex flex-wrap gap-2">
            {config.related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="px-4 py-2 rounded-full bg-white border border-neutral-200 hover:border-neutral-900 text-xs sm:text-sm text-neutral-800 transition-colors"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

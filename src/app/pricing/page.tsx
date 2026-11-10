import Link from "next/link";
import type { Metadata } from "next";
import {
  SPORTSWEAR_PRICES,
  STREETWEAR_PRICES,
  DECORATION_ADD_ONS,
  ORDER_TERMS,
  PRICE_TIERS,
  PriceListGroup,
  unitLabel,
} from "@/lib/data/priceList";
import CatalogDownloadSection from "@/components/trust/CatalogDownloadSection";

export const metadata: Metadata = {
  title: "Custom Apparel Prices & Order Terms 2026",
  description:
    "Factory prices for custom sportswear, teamwear and streetwear from 30 pieces: 30–99, 100–299 and 300+ tiers, all-in sample prices, add-ons and order terms.",
  alternates: { canonical: "https://www.glovesstorm.com/pricing" },
  openGraph: {
    title: "Custom Apparel Prices & Order Terms 2026 | Gloves Storm",
    description:
      "Factory prices for custom sportswear, teamwear and streetwear from 30 pieces, with sample prices, add-ons and order terms.",
    url: "https://www.glovesstorm.com/pricing",
    siteName: "Gloves Storm",
    type: "website",
  },
};

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

function PriceTable({ groups }: { groups: PriceListGroup[] }) {
  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <div key={group.group}>
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-ink">{group.group}</h3>
            {group.note && <span className="text-[13px] text-ink/55">{group.note}</span>}
          </div>
          <div className="overflow-x-auto rounded-[22px] border border-line bg-white">
            <table className="w-full min-w-[720px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-line text-[12px] text-ink/55">
                  <th scope="col" className="py-3 pl-5 pr-3 font-medium">Product</th>
                  {PRICE_TIERS.map((tier) => (
                    <th key={tier} scope="col" className="py-3 px-3 font-medium text-right whitespace-nowrap">{tier}</th>
                  ))}
                  <th scope="col" className="py-3 px-3 font-medium text-right whitespace-nowrap">Sample, all-in</th>
                  <th scope="col" className="py-3 pl-3 pr-5 font-medium whitespace-nowrap">Production</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {group.items.map((item) => (
                  <tr key={item.product} className="align-top">
                    <td className="py-4 pl-5 pr-3">
                      <span className="font-medium text-ink">{item.product}</span>
                      <span className="block text-[13px] text-ink/55 mt-0.5">
                        {item.spec} · {unitLabel(item.unit)}
                      </span>
                    </td>
                    {item.prices.map((price, i) => (
                      <td key={i} className={`py-4 px-3 text-right tabular-nums ${i === 0 ? "font-semibold text-ink" : "text-ink/75"}`}>
                        {formatPrice(price)}
                      </td>
                    ))}
                    <td className="py-4 px-3 text-right tabular-nums text-[#9A7000] font-medium">${item.sample}</td>
                    <td className="py-4 pl-3 pr-5 text-ink/70 whitespace-nowrap">{item.production}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PricingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ORDER_TERMS.map((term) => ({
      "@type": "Question",
      name:
        term.title === "Prices"
          ? "Are Gloves Storm prices ex-factory or delivered?"
          : term.title === "Minimum order"
          ? "What is the minimum order quantity?"
          : term.title === "Samples"
          ? "How much does a sample cost?"
          : term.title === "Payment"
          ? "What are the payment terms?"
          : term.title === "Production"
          ? "How long does production take?"
          : term.title === "Delivery"
          ? "How long does delivery take?"
          : term.title === "Design"
          ? "Do you offer free design mockups?"
          : "What is included in the price?",
      acceptedAnswer: { "@type": "Answer", text: term.body },
    })),
  };

  return (
    <div className="pt-28 sm:pt-32 pb-16 sm:pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="eyebrow mb-5">Price list 2026–27</span>
        <h1 className="display-xl text-ink max-w-4xl">
          Clear factory prices, <em className="accent-serif text-ink/70">from 30 pieces.</em>
        </h1>
        <p className="mt-6 text-[15px] sm:text-lg text-ink/65 leading-relaxed max-w-2xl">
          Guide prices in USD, ex-factory Sialkot, Pakistan. Every price includes fabric, pattern, making and one logo
          position. Sportswear prices include full sublimation. Sizes can be mixed within a style.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#sportswear" className="px-5 py-3 rounded-full bg-ink text-bone text-[14px] font-medium hover:bg-black transition-colors">
            Sportswear & teamwear
          </a>
          <a href="#streetwear" className="px-5 py-3 rounded-full border border-ink/20 hover:border-ink text-ink text-[14px] font-medium transition-colors">
            Streetwear & fashion
          </a>
          <a href="#add-ons" className="px-5 py-3 rounded-full border border-ink/20 hover:border-ink text-ink text-[14px] font-medium transition-colors">
            Add-ons
          </a>
          <a href="#terms" className="px-5 py-3 rounded-full border border-ink/20 hover:border-ink text-ink text-[14px] font-medium transition-colors">
            Order terms
          </a>
        </div>
      </div>

      {/* Sportswear */}
      <section id="sportswear" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 scroll-mt-28">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <h2 className="display-lg text-ink">Sportswear & teamwear</h2>
          <Link href="/products/sportswear-teamwear" className="text-[14px] font-medium text-ink border-b border-ink/30 hover:border-ink transition-colors">
            Browse sportswear
          </Link>
        </div>
        <PriceTable groups={SPORTSWEAR_PRICES} />
      </section>

      {/* Streetwear */}
      <section id="streetwear" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 scroll-mt-28">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <h2 className="display-lg text-ink">Streetwear & fashion</h2>
          <Link href="/products/clothing-streetwear" className="text-[14px] font-medium text-ink border-b border-ink/30 hover:border-ink transition-colors">
            Browse streetwear
          </Link>
        </div>
        <PriceTable groups={STREETWEAR_PRICES} />
      </section>

      {/* Add-ons and terms */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 grid lg:grid-cols-12 gap-10 lg:gap-14">
        <div id="add-ons" className="lg:col-span-5 scroll-mt-28">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-ink">Decoration add-ons</h2>
          <p className="mt-3 text-[15px] text-ink/60">Added per piece on top of the garment price.</p>
          <ul className="mt-6 rounded-[22px] border border-line bg-white divide-y divide-line">
            {DECORATION_ADD_ONS.map((addOn) => (
              <li key={addOn.name} className="flex items-center justify-between gap-4 px-5 py-3.5 text-[14px]">
                <span className="text-ink/75">{addOn.name}</span>
                <span className="font-medium text-ink tabular-nums">{addOn.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div id="terms" className="lg:col-span-7 scroll-mt-28">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-ink">Order terms</h2>
          <p className="mt-3 text-[15px] text-ink/60">Simple and the same for every order.</p>
          <dl className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-6">
            {ORDER_TERMS.map((term) => (
              <div key={term.title} className="border-t border-line pt-4">
                <dt className="text-[15px] font-medium text-ink">{term.title}</dt>
                <dd className="mt-1.5 text-[14px] text-ink/65 leading-relaxed">{term.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mt-10 sm:mt-16">
        <CatalogDownloadSection />
      </div>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] bg-ink text-bone px-6 sm:px-12 py-12 sm:py-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="display-lg">
              Get an exact quote <em className="accent-serif text-[#FFD466]">in 48 hours.</em>
            </h2>
            <p className="mt-4 text-[15px] sm:text-lg text-bone/65">
              Send your design, quantities and sizes. We&apos;ll reply with a free mockup and a confirmed price.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-[#FFB900] hover:bg-[#FFC633] text-ink font-semibold text-[15px] transition-colors shrink-0"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </div>
  );
}

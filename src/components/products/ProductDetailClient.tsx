"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, Category, PriceTier } from "@/types/database";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  Minus,
  Plus,
} from "lucide-react";
import QuoteModal from "../ui/QuoteModal";
import JacketMakerProductCard from "./JacketMakerProductCard";
import { BUSINESS_CONFIG } from "@/lib/business";
import { unitLabel, PriceUnit } from "@/lib/data/priceList";
import { PRODUCT_GUIDES, parseLinks } from "@/lib/data/productGuides";

/** Renders guide text with [label](/href) links; outside links are nofollow. */
function GuideText({ text }: { text: string }) {
  return (
    <>
      {parseLinks(text).map((part, i) =>
        "text" in part ? (
          <span key={i}>{part.text}</span>
        ) : part.href.startsWith("http") ? (
          <a key={i} href={part.href} target="_blank" rel="nofollow noopener noreferrer" className="text-ink font-medium underline decoration-[#FFB900] decoration-2 underline-offset-4 hover:text-[#B07F00]">
            {part.label}
          </a>
        ) : (
          <Link key={i} href={part.href} className="text-ink font-medium underline decoration-[#FFB900] decoration-2 underline-offset-4 hover:text-[#B07F00]">
            {part.label}
          </Link>
        )
      )}
    </>
  );
}

interface ProductDetailClientProps {
  product: Product;
  category: Category | null;
  relatedProducts: Product[];
}

// Normalizes the many shapes list fields come in (arrays, {list: []}, JSON strings, CSV)
function parseList(item: unknown): string[] {
  if (!item) return [];
  const clean = (arr: unknown[]) =>
    arr
      .map((x) => (typeof x === "string" ? x.trim() : typeof x === "number" ? String(x) : ""))
      .filter(Boolean);
  if (Array.isArray(item)) return clean(item);
  if (typeof item === "object") {
    const obj = item as Record<string, unknown>;
    for (const key of ["list", "options", "items", "features", "materials"]) {
      if (Array.isArray(obj[key])) return clean(obj[key] as unknown[]);
    }
    return [];
  }
  if (typeof item === "string") {
    const trimmed = item.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
      try {
        const result = parseList(JSON.parse(trimmed));
        if (result.length > 0) return result;
      } catch {
        // Fall back to comma split
      }
    }
    return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

function formatPrice(value: number) {
  return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ProductDetailClient({
  product,
  category,
  relatedProducts,
}: ProductDetailClientProps) {
  const guide = PRODUCT_GUIDES[product.slug];
  const images = useMemo(() => {
    if (product.images && product.images.length > 0) return product.images;
    return [
      {
        id: "default-img-1",
        product_id: product.id,
        image_url: "/images/products/hoodie-black.png",
        alt_text: product.name,
        sort_order: 1,
        is_primary: true,
        created_at: "",
      },
    ];
  }, [product]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = images[activeImageIndex] || images[0];

  // Price tiers are shown only when real prices were entered in the admin panel
  const tiers: PriceTier[] = useMemo(() => {
    const entered = product.pricing_tiers || [];
    const bulkOnly = entered.filter((t) => t.min_quantity > 1);
    return bulkOnly.length > 0 ? bulkOnly : entered;
  }, [product.pricing_tiers]);
  const showPricing = product.show_pricing !== false && tiers.length > 0;
  const priceUnit = ((product.customization_options as { price_unit?: PriceUnit } | null)?.price_unit || "pc") as PriceUnit;

  const moq = product.moq || BUSINESS_CONFIG.moq;
  const [quantity, setQuantity] = useState<number>(moq);

  const activeTier = useMemo(
    () =>
      tiers.find(
        (tier) =>
          quantity >= tier.min_quantity &&
          (tier.max_quantity === null || tier.max_quantity === undefined || quantity <= tier.max_quantity)
      ) || tiers[0],
    [quantity, tiers]
  );

  const sizeOptions: string[] = useMemo(() => {
    if (Array.isArray(product.available_sizes) && product.available_sizes.length > 0) {
      return product.available_sizes;
    }
    const customSizes = (product.customization_options as { available_sizes?: unknown } | null)?.available_sizes;
    if (Array.isArray(customSizes) && customSizes.length > 0) return customSizes as string[];
    return [];
  }, [product.available_sizes, product.customization_options]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<"Quote" | "Sample">("Quote");

  const materialsList = parseList(product.materials);
  const featuresList = parseList(product.features);
  const customList = parseList(product.customization_options);

  const specColumns = [
    { title: "Fabric & materials", items: materialsList },
    { title: "Construction", items: featuresList },
    { title: "Customization", items: customList },
  ].filter((col) => col.items.length > 0);

  const facts = [
    { label: "Minimum order", value: `${moq} pcs` },
    { label: "Sample", value: `Made in ${BUSINESS_CONFIG.samplingDaysShort}` },
    { label: "Production", value: product.lead_time || BUSINESS_CONFIG.bulkDaysShort },
    { label: "Shipping", value: "DHL / FedEx · DDP on request" },
  ];

  const openInquiry = (type: "Quote" | "Sample") => {
    setInquiryType(type);
    setModalOpen(true);
  };

  return (
    <div className="w-full pb-20">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink/55 mb-6 sm:mb-8">
        <Link href="/" className="hover:text-ink transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-ink transition-colors">Products</Link>
        {category && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/products/${category.slug}`} className="hover:text-ink transition-colors">
              {category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-ink truncate max-w-[16rem]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-20 sm:mb-28">
        {/* ─── Gallery ─── */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative aspect-[4/5] sm:aspect-square rounded-[24px] sm:rounded-[28px] bg-stone overflow-hidden group">
            <Image
              src={activeImage.image_url}
              alt={activeImage.alt_text || `Custom ${product.name} made by Gloves Storm in Sialkot, Pakistan`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />

            {/* Generated mockups live in /images/products/mockups/ and are labelled until real photos replace them */}
            {activeImage.image_url.includes("/mockups/") && (
              <span className="absolute top-4 left-4 text-[12px] font-medium text-ink bg-bone/90 px-3 py-1 rounded-full">
                Design mockup
              </span>
            )}

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveImageIndex((i) => (i > 0 ? i - 1 : images.length - 1))}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-bone/90 hover:bg-bone text-ink flex items-center justify-center shadow-sm transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageIndex((i) => (i < images.length - 1 ? i + 1 : 0))}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-bone/90 hover:bg-bone text-ink flex items-center justify-center shadow-sm transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="absolute bottom-4 right-4 text-[12px] font-medium text-ink bg-bone/90 px-3 py-1 rounded-full tabular-nums">
                  {activeImageIndex + 1} / {images.length}
                </span>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 sm:gap-3">
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`Show image ${idx + 1}`}
                  className={`relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-stone transition-all cursor-pointer ${
                    activeImageIndex === idx ? "ring-2 ring-ink ring-offset-2 ring-offset-bone" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.image_url}
                    alt={img.alt_text || `${product.name} view ${idx + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ─── Details ─── */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-7">
          <div>
            {category && <span className="eyebrow mb-4">{category.name}</span>}
            <h1 className="text-[2rem] sm:text-[2.6rem] font-semibold tracking-[-0.04em] leading-[1.05] text-ink">
              {product.name}
            </h1>
            {product.short_description && (
              <p className="mt-4 text-[15px] text-ink/65 leading-relaxed">{product.short_description}</p>
            )}
          </div>

          {/* Pricing (real admin prices only) or quote prompt */}
          {showPricing ? (
            <div className="rounded-[22px] bg-white border border-line p-5 sm:p-6 space-y-5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[15px] font-medium text-ink">Price {unitLabel(priceUnit)}</span>
                <span className="text-[12px] text-ink/55">USD · ex-factory Sialkot</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {tiers.map((tier, idx) => {
                  const isActive = activeTier === tier;
                  const range =
                    tier.max_quantity === null || tier.max_quantity === undefined
                      ? `${tier.min_quantity}+ pcs`
                      : `${tier.min_quantity}–${tier.max_quantity} pcs`;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQuantity(Math.max(tier.min_quantity, moq))}
                      className={`text-left rounded-2xl px-3 py-3 transition-colors cursor-pointer ${
                        isActive ? "bg-ink text-bone" : "bg-bone hover:bg-stone text-ink"
                      }`}
                    >
                      <span className="block text-lg sm:text-xl font-semibold tracking-[-0.03em] tabular-nums">
                        ${formatPrice(tier.unit_price)}
                      </span>
                      <span className={`block mt-0.5 text-[12px] ${isActive ? "text-bone/65" : "text-ink/55"}`}>
                        {range}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-4 pt-4 border-t border-line">
                <div className="flex items-center rounded-full border border-line bg-bone">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(moq, q - 10))}
                    className="w-10 h-10 flex items-center justify-center text-ink/70 hover:text-ink cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min={moq}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || moq))}
                    onBlur={() => setQuantity((q) => Math.max(moq, q))}
                    aria-label="Quantity in pieces"
                    className="w-16 bg-transparent text-center text-[15px] font-medium tabular-nums outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 10)}
                    className="w-10 h-10 flex items-center justify-center text-ink/70 hover:text-ink cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-right">
                  <span className="block text-[12px] text-ink/55">Estimated total</span>
                  <span className="text-xl font-semibold tracking-[-0.03em] tabular-nums">
                    ${formatPrice(quantity * (activeTier?.unit_price || 0))}
                  </span>
                </div>
              </div>

              {product.sample_price ? (
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-ink/60">Sample, all-in with express courier</span>
                  <span className="font-medium text-ink tabular-nums">${formatPrice(product.sample_price)}</span>
                </div>
              ) : null}

              <p className="text-[12px] text-ink/55 leading-relaxed">
                Includes fabric, making and one logo position. Extra branding is priced per piece. Bulk shipping is quoted
                with your order, and DDP door-to-door delivery is available on request.
              </p>
            </div>
          ) : (
            <div className="rounded-[22px] bg-white border border-line p-5 sm:p-6">
              <span className="block text-[15px] font-medium text-ink">Priced to your spec</span>
              <p className="mt-1.5 text-[14px] text-ink/60 leading-relaxed">
                Pricing depends on fabric, branding and quantity. Send your design and we&apos;ll quote within 24 hours.
              </p>
            </div>
          )}

          {/* Sizes */}
          {sizeOptions.length > 0 && (
            <div>
              <span className="block text-[13px] font-medium text-ink mb-2.5">Available sizes</span>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize((cur) => (cur === sz ? null : sz))}
                    className={`min-w-12 px-4 py-2 rounded-full text-[13px] font-medium border transition-colors cursor-pointer ${
                      selectedSize === sz ? "bg-ink text-bone border-ink" : "bg-white border-line text-ink hover:border-ink"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => openInquiry("Quote")}
              className="group w-full inline-flex items-center justify-between gap-3 pl-6 pr-2 py-2 rounded-full bg-[#FFB900] hover:bg-[#FFC633] text-ink font-semibold text-[15px] transition-colors cursor-pointer"
            >
              <span>Request a quote</span>
              <span className="w-11 h-11 rounded-full bg-ink flex items-center justify-center transition-transform group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4 text-[#FFB900]" />
              </span>
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => openInquiry("Sample")}
                className="py-3.5 rounded-full border border-ink/20 hover:border-ink text-ink font-medium text-[14px] transition-colors cursor-pointer"
              >
                Order a sample
              </button>
              <a
                href={BUSINESS_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3.5 rounded-full border border-ink/20 hover:border-ink text-ink font-medium text-[14px] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Production facts */}
          <dl className="grid grid-cols-2 border-t border-line">
            {facts.map((fact, i) => (
              <div key={fact.label} className={`py-4 ${i % 2 === 1 ? "pl-5 border-l border-line" : "pr-5"} ${i >= 2 ? "border-t border-line" : ""}`}>
                <dt className="text-[12px] text-ink/55">{fact.label}</dt>
                <dd className="mt-0.5 text-[15px] font-medium text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <p className="text-[13px] text-ink/55">
            Made in {BUSINESS_CONFIG.address.city}, {BUSINESS_CONFIG.address.countryName} · Exporting since 2019 · NDA on every project
          </p>
        </div>
      </div>

      {/* ─── Specifications ─── */}
      {specColumns.length > 0 && (
        <section className="border-t border-line pt-12 sm:pt-16 mb-16 sm:mb-24">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
            <div className="lg:col-span-4">
              <span className="eyebrow mb-4">Specifications</span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-ink leading-tight">
                Built to <em className="accent-serif text-ink/70">your standard.</em>
              </h2>
            </div>
            <div className={`lg:col-span-8 grid gap-8 ${specColumns.length > 1 ? "sm:grid-cols-2" : ""} ${specColumns.length > 2 ? "xl:grid-cols-3" : ""}`}>
              {specColumns.map((col) => (
                <div key={col.title}>
                  <h3 className="text-[15px] font-medium text-ink pb-3 mb-3 border-b border-line">{col.title}</h3>
                  <ul className="space-y-2.5">
                    {col.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[14px] text-ink/70 leading-relaxed">
                        <Check className="w-4 h-4 text-[#C99200] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Description ─── */}
      {product.description && (
        <section className="border-t border-line pt-12 sm:pt-16 mb-16 sm:mb-24">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
            <div className="lg:col-span-4">
              <span className="eyebrow mb-4">About this product</span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-ink leading-tight">
                Made in <em className="accent-serif text-ink/70">Sialkot.</em>
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-[16px] sm:text-[17px] text-ink/70 leading-[1.75] whitespace-pre-line max-w-3xl">
                {product.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ─── Buying guide (only for products listed in productGuides.ts) ─── */}
      {guide && (
        <section className="border-t border-line pt-12 sm:pt-16 mb-16 sm:mb-24">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
            <div className="lg:col-span-4">
              <span className="eyebrow mb-4">Buying guide</span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-ink leading-tight">
                {guide.heading}
              </h2>
            </div>
            <div className="lg:col-span-8 max-w-3xl space-y-10">
              {guide.sections.map((s) => (
                <div key={s.heading}>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-ink mb-3">{s.heading}</h3>
                  <p className="text-[16px] text-ink/70 leading-[1.75]">
                    <GuideText text={s.body} />
                  </p>
                  {s.bullets && (
                    <ul className="mt-4 space-y-2.5">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[15px] text-ink/80 leading-relaxed">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#FFB900] shrink-0" />
                          <span>
                            <GuideText text={b} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {guide.faqs.length > 0 && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-ink mb-3">Frequently asked questions</h3>
                  <div className="divide-y divide-line border-y border-line">
                    {guide.faqs.map((f) => (
                      <details key={f.question} className="group py-4">
                        <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-[15px] sm:text-base font-medium text-ink">
                          {f.question}
                          <span className="text-ink/40 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                        </summary>
                        <p className="mt-3 text-[15px] text-ink/70 leading-relaxed">
                          <GuideText text={f.answer} />
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── Related products ─── */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-line pt-12 sm:pt-16">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.04em] text-ink">
              More in {category?.name || "this collection"}
            </h2>
            <Link
              href={`/products/${category?.slug || ""}`}
              className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-ink shrink-0"
            >
              <span className="border-b border-ink/30 group-hover:border-ink transition-colors">View all</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.slice(0, 4).map((rel) => (
              <JacketMakerProductCard
                key={rel.id}
                product={rel}
                category={category || undefined}
                onInquire={() => openInquiry("Quote")}
              />
            ))}
          </div>
        </section>
      )}

      <QuoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        inquiryType={inquiryType}
        defaultProductName={`${inquiryType === "Sample" ? "[Sample] " : ""}${product.name}${selectedSize ? ` (Size: ${selectedSize})` : ""}`}
        defaultCategory={category?.name || "General"}
        defaultQuantity={inquiryType === "Sample" ? 1 : quantity}
      />
    </div>
  );
}

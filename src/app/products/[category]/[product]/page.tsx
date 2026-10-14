import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getCategoryBySlug,
  getProducts,
  getCategories,
} from "@/lib/data/store";
import ProductDetailClient from "@/components/products/ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ category: string; product: string }>;
}

const HIDDEN_CATEGORY_SLUGS = ["boxing-equipment", "swimwear-beachwear"];

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const visibleCategories = categories.filter((c) => !HIDDEN_CATEGORY_SLUGS.includes(c.slug));
  const visibleCatIds = new Set(visibleCategories.map((c) => c.id));

  return products
    .filter((prod) => prod.category_id && visibleCatIds.has(prod.category_id))
    .map((prod) => {
      const cat = visibleCategories.find((c) => c.id === prod.category_id);
      return {
        category: cat?.slug || "general",
        product: prod.slug,
      };
    });
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { category: categorySlug, product: slug } = await params;
  if (HIDDEN_CATEGORY_SLUGS.includes(categorySlug)) {
    return { title: "Product Not Found | Gloves Storm", robots: { index: false, follow: false } };
  }

  const [prod, cat] = await Promise.all([
    getProductBySlug(slug),
    getCategoryBySlug(categorySlug),
  ]);
  if (!prod) return { title: "Product Not Found | Gloves Storm", robots: { index: false, follow: false } };
  if (cat && HIDDEN_CATEGORY_SLUGS.includes(cat.slug)) {
    return { title: "Product Not Found | Gloves Storm", robots: { index: false, follow: false } };
  }

  const categoryName = cat?.name || "Custom Apparel";
  const primaryMaterial = prod.materials?.[0] || "premium technical fabric";

  // Prioritize the custom SEO title and description from admin/data
  const title =
    prod.seo_title ||
    `Custom ${prod.name} Manufacturer — OEM ${categoryName} | Gloves Storm`;

  const description =
    prod.seo_description ||
    `Custom OEM ${prod.name} from Sialkot, Pakistan. ${primaryMaterial}, private label branding. MOQ from ${prod.moq || 30} pcs. 5-7 day samples. Ships to USA, UK & worldwide. Free quote.`;

  const canonicalUrl =
    prod.canonical_url || `https://www.glovesstorm.com/products/${categorySlug}/${slug}`;

  const ogImage =
    prod.og_image ||
    prod.images?.[0]?.image_url ||
    "https://www.glovesstorm.com/images/og-default.jpg";

  const ogTitle = prod.og_title || title;
  const ogDescription = prod.og_description || description;

  const isNoIndex = Boolean(prod.noindex);

  return {
    title,
    description,
    robots: {
      index: !isNoIndex,
      follow: !isNoIndex,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      siteName: "Gloves Storm",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Custom ${prod.name} OEM manufacturer Sialkot Pakistan`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { category: categorySlug, product: productSlug } = await params;
  if (HIDDEN_CATEGORY_SLUGS.includes(categorySlug)) {
    notFound();
  }

  const [product, category, relatedProducts] = await Promise.all([
    getProductBySlug(productSlug),
    getCategoryBySlug(categorySlug),
    getProducts({ categorySlug }),
  ]);

  if (!product || (category && HIDDEN_CATEGORY_SLUGS.includes(category.slug))) {
    notFound();
  }

  // Filter out current product from related items
  const filteredRelated = relatedProducts.filter((p) => p.id !== product.id).slice(0, 4);

  const productImages = product.images?.length
    ? product.images.map((img) => img.image_url)
    : ["https://www.glovesstorm.com/images/og-default.jpg"];

  // Strictly respect real pricing: only render offer price if pricing_tiers or sample_price are provided
  const hasRealPricing =
    (product.pricing_tiers && product.pricing_tiers.length > 0) ||
    typeof product.sample_price === "number";

  const lowTierPrice = product.pricing_tiers?.length
    ? Math.min(...product.pricing_tiers.map((t) => t.unit_price))
    : typeof product.sample_price === "number"
    ? product.sample_price
    : null;

  const highTierPrice = product.pricing_tiers?.length
    ? Math.max(...product.pricing_tiers.map((t) => t.unit_price))
    : typeof product.sample_price === "number"
    ? product.sample_price
    : null;

  const productJsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.seo_description ||
      product.short_description ||
      product.description ||
      `Custom ${product.name} OEM manufacturer Sialkot Pakistan. High-precision manufacturing for USA, UK and worldwide brands.`,
    brand: {
      "@type": "Brand",
      name: "Gloves Storm",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Gloves Storm Industrial Co.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sialkot",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
    },
    image: productImages[0],
    material: Array.isArray(product.materials)
      ? product.materials.join(", ")
      : product.materials || "Premium Technical Fabric / Cut-and-Sew Construction",
    audience: {
      "@type": "Audience",
      audienceType: "B2B — Sports brands, athletic clubs, scholastic teams, and apparel distributors",
    },
  };

  // Only attach offers if real pricing exists (never fabricate prices or reviews)
  if (hasRealPricing && lowTierPrice !== null) {
    if (highTierPrice !== null && highTierPrice > lowTierPrice) {
      productJsonLd.offers = {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: lowTierPrice.toFixed(2),
        highPrice: highTierPrice.toFixed(2),
        offerCount: product.pricing_tiers?.length || 1,
        availability: "https://schema.org/InStock",
        url: `https://www.glovesstorm.com/products/${categorySlug}/${productSlug}`,
        seller: {
          "@type": "Organization",
          name: "Gloves Storm",
        },
      };
    } else {
      productJsonLd.offers = {
        "@type": "Offer",
        priceCurrency: "USD",
        price: lowTierPrice.toFixed(2),
        availability: "https://schema.org/InStock",
        url: `https://www.glovesstorm.com/products/${categorySlug}/${productSlug}`,
        seller: {
          "@type": "Organization",
          name: "Gloves Storm",
        },
      };
    }
  }

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.glovesstorm.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://www.glovesstorm.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category?.name || "Category",
        item: `https://www.glovesstorm.com/products/${categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `https://www.glovesstorm.com/products/${categorySlug}/${productSlug}`,
      },
    ],
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gloves Storm Industrial Co.",
    legalName: "Gloves Storm Private Limited",
    url: "https://www.glovesstorm.com",
    logo: "https://www.glovesstorm.com/images/logo.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sialkot",
      addressRegion: "Punjab",
      postalCode: "51310",
      addressCountry: "PK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+923417146935",
      contactType: "sales",
      availableLanguage: ["English", "Urdu"],
      areaServed: ["US", "GB", "AU", "DE", "FR", "CA"],
    },
  };

  // FAQ structured data if product has FAQs
  const faqJsonLd =
    product.faqs && product.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: product.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <div className="pt-28 pb-24 bg-transparent min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <ProductDetailClient
          product={product}
          category={category}
          relatedProducts={filteredRelated}
        />
      </div>
    </div>
  );
}

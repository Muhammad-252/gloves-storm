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
  const title = `Custom ${prod.name} Manufacturer — OEM ${categoryName} | Gloves Storm`;
  const description =
    prod.seo_description ||
    `Custom OEM ${prod.name} from Sialkot, Pakistan. ${primaryMaterial}, private label branding. MOQ ${prod.moq || 35}–50 pcs. 7-day samples. Ships worldwide. Get a free quote.`;
  const canonicalUrl = `https://www.glovesstorm.com/products/${categorySlug}/${slug}`;
  const ogImage = prod.images?.[0]?.image_url || "https://www.glovesstorm.com/images/og-default.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
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
      title,
      description,
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

  const lowTierPrice = product.pricing_tiers?.length
    ? Math.min(...product.pricing_tiers.map((t) => t.unit_price))
    : (product.sample_price ? product.sample_price * 0.4 : 15.0);
  const highTierPrice = product.sample_price || 35.0;

  const productImages = product.images?.length
    ? product.images.map((img) => img.image_url)
    : ["https://www.glovesstorm.com/images/og-default.jpg"];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.seo_description ||
      product.short_description ||
      product.description ||
      `Custom ${product.name} OEM manufacturer Sialkot Pakistan. High-precision manufacturing for USA and UK brands.`,
    brand: {
      "@type": "Brand",
      name: "Gloves Storm",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Gloves Storm",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sialkot",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `https://www.glovesstorm.com/products/${categorySlug}/${productSlug}`,
      priceCurrency: "USD",
      price: lowTierPrice.toFixed(2),
      seller: {
        "@type": "Organization",
        name: "Gloves Storm",
      },
    },
    image: productImages[0],
    material: Array.isArray(product.materials)
      ? product.materials.join(", ")
      : product.materials || "Premium Technical Fabric / Cut-and-Sew Construction",
    audience: {
      "@type": "Audience",
      audienceType: "B2B — Sports brands, athletic clubs, gyms, retailers, and distributors",
    },
  };

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

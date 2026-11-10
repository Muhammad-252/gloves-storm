import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getCategoryBySlug,
  getProducts,
  getCategories,
} from "@/lib/data/store";
import ProductDetailClient from "@/components/products/ProductDetailClient";
import { toTitleCase } from "@/lib/utils";
import { buildProductTitlePhrase, buildProductDescription, PRODUCT_TITLE_OVERRIDES } from "@/lib/seo";

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
    return { title: "Product Not Found", robots: { index: false, follow: false } };
  }

  const [prod, cat] = await Promise.all([
    getProductBySlug(slug),
    getCategoryBySlug(categorySlug),
  ]);
  // Hidden (draft) products are not public
  if (!prod || prod.is_active === false) return { title: "Product Not Found", robots: { index: false, follow: false } };
  if (cat && HIDDEN_CATEGORY_SLUGS.includes(cat.slug)) {
    return { title: "Product Not Found", robots: { index: false, follow: false } };
  }

  // Admin SEO fields win when they fit Google's limits; the layout template adds " | Gloves Storm"
  const adminTitle = (prod.seo_title || "").replace(/\s*[|—–-]\s*gloves\s*storm.*$/i, "").trim();
  const adminDescription = (prod.seo_description || "").trim();
  const titlePhrase =
    PRODUCT_TITLE_OVERRIDES[slug] ||
    (adminTitle && adminTitle.length <= 45 ? adminTitle : buildProductTitlePhrase(prod.name));
  const description =
    adminDescription.length >= 100 && adminDescription.length <= 160
      ? adminDescription
      : buildProductDescription(prod.name, prod.materials);
  const keywords = [prod.primary_keyword, ...(prod.secondary_keywords || "").split(",")]
    .map((k) => (k || "").trim())
    .filter(Boolean);
  const canonicalUrl = `https://www.glovesstorm.com/products/${categorySlug}/${slug}`;
  const ogImage = prod.images?.[0]?.image_url || "https://www.glovesstorm.com/images/og-default.jpg";

  return {
    title: titlePhrase,
    description,
    ...(keywords.length > 0 ? { keywords } : {}),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${titlePhrase} | Gloves Storm`,
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
      title: `${titlePhrase} | Gloves Storm`,
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

  if (!product || product.is_active === false || (category && HIDDEN_CATEGORY_SLUGS.includes(category.slug))) {
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
      : typeof product.materials === "string"
      ? product.materials
      : "Premium Technical Fabric / Cut-and-Sew Construction",
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductDetailClient
          product={product}
          category={category}
          relatedProducts={filteredRelated}
        />
      </div>
    </div>
  );
}

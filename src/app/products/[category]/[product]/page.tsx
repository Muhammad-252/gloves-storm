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

export async function generateStaticParams() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return products.map((prod) => {
    const cat = categories.find((c) => c.id === prod.category_id);
    return {
      category: cat?.slug || "general",
      product: prod.slug,
    };
  });
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { category: categorySlug, product: slug } = await params;
  const prod = await getProductBySlug(slug);
  if (!prod) return { title: "Product Not Found" };

  return {
    title: prod.seo_title || `${prod.name} | GLOVES STORM Manufacturing`,
    description:
      prod.seo_description ||
      prod.short_description ||
      `OEM and private label manufacturing for ${prod.name} in Sialkot, Pakistan.`,
    alternates: {
      canonical: `/products/${categorySlug}/${slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { category: categorySlug, product: productSlug } = await params;
  const [product, category, relatedProducts] = await Promise.all([
    getProductBySlug(productSlug),
    getCategoryBySlug(categorySlug),
    getProducts({ categorySlug }),
  ]);

  if (!product) {
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
    : ["https://glovesstorm.com/images/products/boxing-gloves-black.png"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.seo_description ||
      product.short_description ||
      product.description ||
      `Custom ${product.name} manufactured by GLOVES STORM in Sialkot, Pakistan.`,
    image: productImages,
    sku: product.id,
    mpn: product.slug,
    brand: {
      "@type": "Brand",
      name: "GLOVES STORM",
    },
    manufacturer: {
      "@type": "Organization",
      name: "GLOVES STORM",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sialkot",
        addressRegion: "Punjab",
        postalCode: "51310",
        addressCountry: "PK",
      },
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: lowTierPrice.toFixed(2),
      highPrice: highTierPrice.toFixed(2),
      offerCount: product.pricing_tiers?.length || 4,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: `https://glovesstorm.com/products/${categorySlug}/${productSlug}`,
      seller: {
        "@type": "Organization",
        name: "GLOVES STORM",
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 5,
            maxValue: 10,
            unitCode: "d",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 4,
            maxValue: 7,
            unitCode: "d",
          },
        },
      },
    },
  };

  return (
    <div className="pt-28 pb-24 bg-[#fafafa] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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

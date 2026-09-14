import { notFound } from "next/navigation";
import { getProductBySlug, getCategoryBySlug, getProducts } from "@/lib/data/store";
import ProductDetailClient from "@/components/products/ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ category: string; product: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { product: slug } = await params;
  const prod = await getProductBySlug(slug);
  if (!prod) return { title: "Product Not Found" };

  return {
    title: prod.seo_title || `${prod.name} | GLOVES STORM Manufacturing`,
    description:
      prod.seo_description ||
      prod.short_description ||
      `OEM and private label manufacturing for ${prod.name} in Sialkot, Pakistan.`,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.seo_description ||
      product.short_description ||
      product.description ||
      `Custom ${product.name} manufactured by GLOVES STORM in Sialkot, Pakistan.`,
    image: product.images?.map((img) => img.image_url) || [],
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

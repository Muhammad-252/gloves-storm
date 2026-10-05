import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getCategories,
  getProducts,
  getProjects,
} from "@/lib/data/store";
import CategoryLandingClient, {
  CATEGORY_INTEL,
} from "@/components/products/CategoryLandingClient";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) return { title: "Category Not Found | GLOVES STORM" };

  return {
    title: `Custom ${cat.name} Manufacturer & OEM Factory Sialkot | GLOVES STORM`,
    description:
      cat.description ||
      `Direct factory OEM manufacturing for custom ${cat.name} in Sialkot, Pakistan. Handcrafted equipment, custom sublimation teamwear, and private label apparel.`,
    alternates: {
      canonical: `https://www.glovesstorm.com/products/${slug}`,
    },
    openGraph: {
      title: `Custom ${cat.name} Manufacturer & OEM Factory Sialkot | Gloves Storm`,
      description:
        cat.description ||
        `Direct factory OEM manufacturing for custom ${cat.name} in Sialkot, Pakistan.`,
      url: `https://www.glovesstorm.com/products/${slug}`,
      siteName: "Gloves Storm",
      images: [
        {
          url: cat.image_url || "/images/products/boxing-gloves-black.png",
          width: 1200,
          height: 630,
          alt: `Custom ${cat.name} OEM Manufacturing Sialkot - GLOVES STORM`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Custom ${cat.name} Manufacturer | GLOVES STORM`,
      description: cat.description || `Custom ${cat.name} OEM manufacturing in Sialkot, Pakistan.`,
      images: [cat.image_url || "/images/products/boxing-gloves-black.png"],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const [category, allCategories, categoryProducts, projects] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
    getProducts({ categorySlug: slug }),
    getProjects(),
  ]);

  if (!category) {
    notFound();
  }

  const intel = CATEGORY_INTEL[category.slug];
  const faqSchema = intel?.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: intel.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://glovesstorm.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://glovesstorm.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `https://glovesstorm.com/products/${category.slug}`,
      },
    ],
  };

  const itemListSchema = categoryProducts.length
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `Custom ${category.name} Sialkot OEM Catalog`,
        description: `Direct factory OEM catalog for custom ${category.name} manufactured by GLOVES STORM.`,
        itemListElement: categoryProducts.slice(0, 30).map((prod, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: prod.name,
          url: `https://glovesstorm.com/products/${category.slug}/${prod.slug}`,
        })),
      }
    : null;

  return (
    <div className="pt-28 pb-24 bg-transparent min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <CategoryLandingClient
          category={category}
          products={categoryProducts}
          categories={allCategories}
          relatedProjects={projects}
        />
      </div>
    </div>
  );
}

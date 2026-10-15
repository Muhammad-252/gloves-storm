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

import { toTitleCase } from "@/lib/utils";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const HIDDEN_CATEGORY_SLUGS = ["boxing-equipment", "swimwear-beachwear"];

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories
    .filter((cat) => !HIDDEN_CATEGORY_SLUGS.includes(cat.slug))
    .map((cat) => ({
      category: cat.slug,
    }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  if (HIDDEN_CATEGORY_SLUGS.includes(slug)) {
    return {
      title: "Category Not Found | Gloves Storm",
      robots: { index: false, follow: false },
    };
  }

  const cat = await getCategoryBySlug(slug);
  if (!cat) {
    return {
      title: "Category Not Found | Gloves Storm",
      robots: { index: false, follow: false },
    };
  }

  const intel = CATEGORY_INTEL[slug];
  const title = toTitleCase(intel?.metaTitle || `Custom ${cat.name} Manufacturer & OEM Factory | Gloves Storm`);
  const description =
    intel?.metaDescription ||
    cat.description ||
    `Direct factory OEM manufacturing for custom ${cat.name} in Sialkot, Pakistan. Custom sublimation teamwear, activewear, and private label apparel.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.glovesstorm.com/products/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.glovesstorm.com/products/${slug}`,
      siteName: "Gloves Storm",
      images: [
        {
          url: cat.image_url || "/images/products/varsity-jacket.jpg",
          width: 1200,
          height: 630,
          alt: `Custom ${cat.name} OEM Manufacturing Sialkot - Gloves Storm`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cat.description || `Custom ${cat.name} OEM manufacturing in Sialkot, Pakistan.`,
      images: [cat.image_url || "/images/products/varsity-jacket.jpg"],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  if (HIDDEN_CATEGORY_SLUGS.includes(slug)) {
    notFound();
  }

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
        name: category.name,
        item: `https://www.glovesstorm.com/products/${category.slug}`,
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
          url: `https://www.glovesstorm.com/products/${category.slug}/${prod.slug}`,
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

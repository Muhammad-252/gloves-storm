import { Metadata } from "next";
import { getProjects, getCategories } from "@/lib/data/store";
import PreviousWorkClient from "@/components/previous-work/PreviousWorkClient";

export const metadata: Metadata = {
  title: "Custom Apparel Production Portfolio",
  description:
    "Browse real production runs from Gloves Storm: custom sportswear, gym wear, hoodies, and private label apparel made for international clothing brands.",
  alternates: {
    canonical: "https://www.glovesstorm.com/previous-work",
  },
  openGraph: {
    title: "Custom Apparel Production Portfolio | Gloves Storm",
    description:
      "Browse real production runs from Gloves Storm: custom sportswear, gym wear, hoodies, and private label apparel made for international clothing brands.",
    url: "https://www.glovesstorm.com/previous-work",
    siteName: "Gloves Storm",
    type: "website",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm Production Archive & Previous Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Apparel Production Portfolio | Gloves Storm",
    description:
      "Browse real production runs from Gloves Storm: custom sportswear, gym wear, hoodies, and private label apparel made for international clothing brands.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PreviousWorkPage() {
  const [allProjects, categories] = await Promise.all([
    getProjects(false),
    getCategories(),
  ]);

  const visibleCatIds = new Set(categories.map((c) => c.id));
  const projects = allProjects.filter((p) => !p.category_id || visibleCatIds.has(p.category_id));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
            name: "Previous Work",
            item: "https://www.glovesstorm.com/previous-work",
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Gloves Storm Production Archive",
        description:
          "Verified production gallery and case studies for custom clothing, athletic sportswear, activewear, and private label apparel.",
        url: "https://www.glovesstorm.com/previous-work",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PreviousWorkClient initialProjects={projects} categories={categories} />
    </>
  );
}

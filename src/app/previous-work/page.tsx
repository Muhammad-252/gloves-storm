import { Metadata } from "next";
import { getProjects, getCategories } from "@/lib/data/store";
import PreviousWorkClient from "@/components/previous-work/PreviousWorkClient";

export const metadata: Metadata = {
  title: "Previous Work & Production Archive | GLOVES STORM",
  description:
    "Explore our factory archive of custom boxing equipment, sublimated sportswear, combat gear, and luxury streetwear manufactured for international brands in Sialkot, Pakistan.",
  alternates: {
    canonical: "https://glovesstorm.com/previous-work",
  },
  openGraph: {
    title: "Previous Work & Production Archive | GLOVES STORM",
    description:
      "Inspect real factory production runs, precision stitching close-ups, and export dispatches direct from our Sialkot manufacturing plant.",
    url: "https://glovesstorm.com/previous-work",
    siteName: "GLOVES STORM Manufacturing",
    type: "website",
    images: [
      {
        url: "https://glovesstorm.com/images/products/boxing-gloves-black.png",
        width: 1200,
        height: 630,
        alt: "GLOVES STORM Production Archive & Previous Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Previous Work & Production Archive | GLOVES STORM",
    description:
      "Inspect real factory production runs, precision stitching close-ups, and export dispatches direct from our Sialkot manufacturing plant.",
    images: ["https://glovesstorm.com/images/products/boxing-gloves-black.png"],
  },
};

export const revalidate = 60; // ISR revalidation

export default async function PreviousWorkPage() {
  const [projects, categories] = await Promise.all([
    getProjects(false),
    getCategories(),
  ]);

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
            item: "https://glovesstorm.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Previous Work",
            item: "https://glovesstorm.com/previous-work",
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "GLOVES STORM Production Archive",
        description:
          "Verified production gallery and case studies for custom apparel, fight gear, and combat sports equipment.",
        url: "https://glovesstorm.com/previous-work",
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

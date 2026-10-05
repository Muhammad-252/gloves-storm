import { Metadata } from "next";
import { getProjects, getCategories } from "@/lib/data/store";
import PreviousWorkClient from "@/components/previous-work/PreviousWorkClient";

export const metadata: Metadata = {
  title: "Previous Work & Portfolio — Custom Boxing Gloves & Sportswear | Gloves Storm",
  description:
    "Browse completed orders from Gloves Storm — custom boxing gloves, fight gear, sportswear and activewear manufactured for USA and UK brands. Real production, real results.",
  alternates: {
    canonical: "https://www.glovesstorm.com/previous-work",
  },
  openGraph: {
    title: "Previous Work & Portfolio — Custom Boxing Gloves & Sportswear | Gloves Storm",
    description:
      "Browse completed orders from Gloves Storm — custom boxing gloves, fight gear, sportswear and activewear manufactured for USA and UK brands.",
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
    title: "Previous Work & Portfolio — Custom Boxing Gloves & Sportswear | Gloves Storm",
    description:
      "Inspect real factory production runs, precision stitching close-ups, and export dispatches direct from our Sialkot manufacturing plant.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
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

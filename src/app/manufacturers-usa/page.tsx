import { Metadata } from "next";
import ManufacturersUsaClient from "@/components/manufacturers/ManufacturersUsaClient";
import { usaFaqs } from "@/lib/data/exportFaqs";
import { BUSINESS_CONFIG } from "@/lib/business";
import DynamicProductGrid from "@/components/products/DynamicProductGrid";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Apparel Manufacturer For USA Brands",
  description:
    "Direct OEM apparel factory supplying USA sportswear brands, sports teams, and streetwear labels. Low MOQ 30 pcs, 5–7 day samples, and door-to-door DDP air.",
  alternates: {
    canonical: "https://www.glovesstorm.com/manufacturers-usa",
  },
  openGraph: {
    title: "Apparel Manufacturer For USA Brands | Gloves Storm",
    description:
      "Direct OEM apparel factory supplying USA sportswear brands, sports teams, and streetwear labels. Low MOQ 30 pcs, 5–7 day samples, and door-to-door DDP air.",
    url: "https://www.glovesstorm.com/manufacturers-usa",
    siteName: "Gloves Storm",
    type: "website",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm — Custom Clothing & Sportswear Manufacturer For USA Brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apparel Manufacturer For USA Brands | Gloves Storm",
    description:
      "Direct OEM apparel factory supplying USA sportswear brands, sports teams, and streetwear labels. Low MOQ 30 pcs, 5–7 day samples, and door-to-door DDP air.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  name: "Gloves Storm — USA Apparel OEM Manufacturer",
  description:
    "Direct OEM factory manufacturing custom clothing, team sportswear, gym activewear, and streetwear for American brands with DDP USA shipping.",
  url: "https://www.glovesstorm.com/manufacturers-usa",
  telephone: "+92-341-7146935",
  email: BUSINESS_CONFIG.email,
  areaServed: {
    "@type": "Country",
    name: "US",
  },
  currenciesAccepted: "USD",
  paymentAccepted: "Bank Wire Transfer, L/C, Western Union",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Industrial Estate",
    addressLocality: "Sialkot",
    addressRegion: "Punjab",
    postalCode: "51310",
    addressCountry: "PK",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: usaFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function ManufacturersUsaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ManufacturersUsaClient
        productSection={
          <DynamicProductGrid
            eyebrow="From our product catalog"
            heading="What we manufacture for USA clients"
            categorySlugs={["sportswear-teamwear","clothing-streetwear","gym-fitness-wear","custom-manufacturing-private-label"]}
            audience="USA brands"
            className="mb-12 sm:mb-20 lg:mb-24"
          />
        }
      />
    </>
  );
}

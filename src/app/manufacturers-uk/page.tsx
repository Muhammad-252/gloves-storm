import { Metadata } from "next";
import ManufacturersUkClient from "@/components/manufacturers/ManufacturersUkClient";
import { ukFaqs } from "@/lib/data/exportFaqs";

export const metadata: Metadata = {
  title: "Custom Boxing Gloves & Sportswear Manufacturer for UK Brands | Gloves Storm",
  description:
    "OEM boxing gloves and sportswear manufacturer supplying UK brands, boxing gyms and sports clubs. Custom private label, low MOQ from 25 pcs. DDP shipping to UK. 7-day samples. Free quote.",
  alternates: {
    canonical: "https://www.glovesstorm.com/manufacturers-uk",
  },
  openGraph: {
    title: "Custom Boxing Gloves & Sportswear Manufacturer for UK Brands | Gloves Storm",
    description:
      "OEM boxing gloves and sportswear manufacturer supplying UK brands, boxing gyms and sports clubs. Custom private label, low MOQ from 25 pcs. DDP shipping to UK.",
    url: "https://www.glovesstorm.com/manufacturers-uk",
    siteName: "Gloves Storm",
    type: "website",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm — Custom Boxing Gloves & Sportswear Manufacturer for UK Brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Boxing Gloves & Sportswear Manufacturer for UK Brands | Gloves Storm",
    description:
      "OEM boxing gloves and sportswear manufacturer supplying UK brands, gyms and clubs. DDP shipping, low MOQ, CE/UKCA compliant.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  name: "Gloves Storm — UK OEM Manufacturer",
  description:
    "Direct Sialkot OEM factory manufacturing custom boxing gloves, fight gear, sportswear, and activewear for British brands with DDP UK shipping.",
  url: "https://www.glovesstorm.com/manufacturers-uk",
  telephone: "+92-341-7146935",
  email: "glovesstorm@gmail.com",
  areaServed: {
    "@type": "Country",
    name: "GB",
  },
  currenciesAccepted: "GBP, USD",
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
  mainEntity: ukFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function ManufacturersUkPage() {
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
      <ManufacturersUkClient />
    </>
  );
}

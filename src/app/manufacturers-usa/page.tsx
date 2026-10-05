import { Metadata } from "next";
import ManufacturersUsaClient from "@/components/manufacturers/ManufacturersUsaClient";
import { usaFaqs } from "@/lib/data/exportFaqs";

export const metadata: Metadata = {
  title: "Custom Boxing Gloves & Sportswear Manufacturer for USA Brands | Gloves Storm",
  description:
    "Direct Sialkot OEM manufacturer supplying USA sports brands, boxing gyms and athletic labels. Custom private label boxing gloves, fight gear, sportswear. Low MOQ from 25 pcs. DDP air shipping to USA. 7-day samples. Free quote.",
  alternates: {
    canonical: "https://www.glovesstorm.com/manufacturers-usa",
  },
  openGraph: {
    title: "Custom Boxing Gloves & Sportswear Manufacturer for USA Brands | Gloves Storm",
    description:
      "Direct Sialkot OEM manufacturer supplying USA sports brands, boxing gyms and athletic labels. Custom private label boxing gloves, fight gear, sportswear. Low MOQ from 25 pcs. DDP air shipping to USA.",
    url: "https://www.glovesstorm.com/manufacturers-usa",
    siteName: "Gloves Storm",
    type: "website",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm — Custom Boxing Gloves & Sportswear Manufacturer for USA Brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Boxing Gloves & Sportswear Manufacturer for USA Brands | Gloves Storm",
    description:
      "Direct Sialkot OEM factory supplying USA sports brands, boxing gyms and athletic labels. Low MOQ from 25 pcs. DDP air shipping.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  name: "Gloves Storm — USA OEM Manufacturer",
  description:
    "Direct Sialkot OEM factory manufacturing custom boxing gloves, fight gear, sportswear, and activewear for American brands with DDP USA shipping.",
  url: "https://www.glovesstorm.com/manufacturers-usa",
  telephone: "+92-341-7146935",
  email: "glovesstorm@gmail.com",
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
      <ManufacturersUsaClient />
    </>
  );
}

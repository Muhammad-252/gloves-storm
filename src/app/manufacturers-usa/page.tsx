import { Metadata } from "next";
import ManufacturersUsaClient from "@/components/manufacturers/ManufacturersUsaClient";
import { usaFaqs } from "@/lib/data/exportFaqs";

export const metadata: Metadata = {
  title: "Custom Clothing & Sportswear Manufacturer For USA Brands | Gloves Storm",
  description:
    "Direct OEM apparel manufacturer supplying USA sportswear brands, athletic teams and streetwear labels. Custom private label apparel, jerseys, activewear, hoodies. Low MOQ from 35 pcs. DDP air shipping to USA. 5-7 day samples. Free quote.",
  alternates: {
    canonical: "https://www.glovesstorm.com/manufacturers-usa",
  },
  openGraph: {
    title: "Custom Clothing & Sportswear Manufacturer For USA Brands | Gloves Storm",
    description:
      "Direct OEM apparel manufacturer supplying USA sportswear brands, athletic teams and streetwear labels. Custom private label apparel, jerseys, activewear, hoodies. Low MOQ from 35 pcs. DDP air shipping to USA.",
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
    title: "Custom Clothing & Sportswear Manufacturer For USA Brands | Gloves Storm",
    description:
      "Direct OEM factory supplying USA sports apparel brands, athletic teams and streetwear labels. Low MOQ from 35 pcs. DDP air shipping.",
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

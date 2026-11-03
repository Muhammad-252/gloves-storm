import { Metadata } from "next";
import ManufacturersUkClient from "@/components/manufacturers/ManufacturersUkClient";
import { ukFaqs } from "@/lib/data/exportFaqs";

export const metadata: Metadata = {
  title: "Custom Apparel Manufacturer For UK Brands",
  description:
    "Direct OEM apparel factory supplying UK clothing brands, sports clubs, and labels. Low MOQ 30 pcs, 5–7 day sample dispatch, and door-to-door DDP delivery.",
  alternates: {
    canonical: "https://www.glovesstorm.com/manufacturers-uk",
  },
  openGraph: {
    title: "Custom Apparel Manufacturer For UK Brands | Gloves Storm",
    description:
      "Direct OEM apparel factory supplying UK clothing brands, sports clubs, and labels. Low MOQ 30 pcs, 5–7 day sample dispatch, and door-to-door DDP delivery.",
    url: "https://www.glovesstorm.com/manufacturers-uk",
    siteName: "Gloves Storm",
    type: "website",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm — Custom Clothing & Sportswear Manufacturer For UK Brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Apparel Manufacturer For UK Brands | Gloves Storm",
    description:
      "Direct OEM apparel factory supplying UK clothing brands, sports clubs, and labels. Low MOQ 30 pcs, 5–7 day sample dispatch, and door-to-door DDP delivery.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  name: "Gloves Storm — UK Apparel OEM Manufacturer",
  description:
    "Direct OEM factory manufacturing custom clothing, team sportswear, gym activewear, and streetwear for British brands with DDP UK shipping and GBP billing.",
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

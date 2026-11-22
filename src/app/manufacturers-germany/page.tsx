import { Metadata } from "next";
import EuropeCorridorClient, {
  EuropeCorridorConfig,
} from "@/components/manufacturers/EuropeCorridorClient";
import { germanyFaqs } from "@/lib/data/exportFaqs";
import { BUSINESS_CONFIG } from "@/lib/business";
import DynamicProductGrid from "@/components/products/DynamicProductGrid";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sportswear Manufacturer For German Brands",
  description:
    "Direct OEM apparel factory for German sports brands and gym labels. Metric EU sizing, fast DDP Frankfurt freight, VAT handling, and low MOQ 30 pieces.",
  alternates: {
    canonical: "https://www.glovesstorm.com/manufacturers-germany",
  },
  openGraph: {
    title: "Sportswear Manufacturer For German Brands | Gloves Storm",
    description:
      "Direct OEM apparel factory for German sports brands and gym labels. Metric EU sizing, fast DDP Frankfurt freight, VAT handling, and low MOQ 30 pieces.",
    url: "https://www.glovesstorm.com/manufacturers-germany",
    siteName: "Gloves Storm",
    type: "website",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm — Custom Sportswear Manufacturer For German Brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sportswear Manufacturer For German Brands | Gloves Storm",
    description:
      "Direct OEM apparel factory for German sports brands and gym labels. Metric EU sizing, fast DDP Frankfurt freight, VAT handling, and low MOQ 30 pieces.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
};

const config: EuropeCorridorConfig = {
  countrySlug: "germany",
  countryName: "Germany",
  flag: "🇩🇪",
  heroTag: "DIRECT SIALKOT TO GERMANY MANUFACTURING CORRIDOR",
  heroTitle: "Custom sportswear manufacturer for German brands",
  heroDescription:
    "Direct Sialkot OEM factory manufacturing technical sportswear, football & handball kits, gym activewear, and heavyweight streetwear for brands across Berlin, Munich, Hamburg, and Frankfurt.",
  currency: "EUR (€)",
  airHub: "Frankfurt Airport (FRA)",
  vatNotice:
    // TODO-CONFIRM: Owner to confirm German Einfuhrumsatzsteuer (import VAT) invoice declaration and EORI customs protocol
    "We provide turnkey DDP delivery straight to German commercial warehouses. Shipments clear customs and deliver via DHL Express or UPS.",
  sizingNotice:
    "German Konfektionsgrößen standards (46–58 / XS–3XL) with precise metric grading in centimeters. Custom technical cut-and-sew blocks provided on request.",
  productCategories: ["sportswear-teamwear","gym-fitness-wear","clothing-streetwear"],
  faqs: germanyFaqs,
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  name: "Gloves Storm — Germany Apparel OEM Manufacturer",
  description:
    "Direct OEM factory manufacturing custom clothing and sportswear for German brands with DDP Germany shipping.",
  url: "https://www.glovesstorm.com/manufacturers-germany",
  telephone: "+92-341-7146935",
  email: BUSINESS_CONFIG.email,
  areaServed: {
    "@type": "Country",
    name: "DE",
  },
  currenciesAccepted: "EUR, USD",
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
  mainEntity: germanyFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function ManufacturersGermanyPage() {
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
      <EuropeCorridorClient
        config={config}
        productSection={
          <DynamicProductGrid
            eyebrow="From our product catalog"
            heading={`What we manufacture for ${config.countryName} brands`}
            categorySlugs={config.productCategories}
            audience={`${config.countryName} brands`}
            className="mb-12 sm:mb-20"
          />
        }
      />
    </>
  );
}

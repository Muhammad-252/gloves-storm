import { Metadata } from "next";
import EuropeCorridorClient, {
  EuropeCorridorConfig,
} from "@/components/manufacturers/EuropeCorridorClient";
import { franceFaqs } from "@/lib/data/exportFaqs";
import { BUSINESS_CONFIG } from "@/lib/business";
import DynamicProductGrid from "@/components/products/DynamicProductGrid";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Apparel Manufacturer For French Brands",
  description:
    "Direct OEM factory producing custom sportswear, activewear, and streetwear for French brands. CDG Paris air shipping, EU sizing, and low MOQ 30 pcs.",
  alternates: {
    canonical: "https://www.glovesstorm.com/manufacturers-france",
  },
  openGraph: {
    title: "Apparel Manufacturer For French Brands | Gloves Storm",
    description:
      "Direct OEM factory producing custom sportswear, activewear, and streetwear for French brands. CDG Paris air shipping, EU sizing, and low MOQ 30 pcs.",
    url: "https://www.glovesstorm.com/manufacturers-france",
    siteName: "Gloves Storm",
    type: "website",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm — Custom Clothing Manufacturer For French Brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apparel Manufacturer For French Brands | Gloves Storm",
    description:
      "Direct OEM factory producing custom sportswear, activewear, and streetwear for French brands. CDG Paris air shipping, EU sizing, and low MOQ 30 pcs.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
};

const config: EuropeCorridorConfig = {
  countrySlug: "france",
  countryName: "France",
  flag: "🇫🇷",
  heroTag: "DIRECT SIALKOT TO FRANCE MANUFACTURING CORRIDOR",
  heroTitle: "Custom apparel manufacturer for French brands",
  heroDescription:
    "Direct Sialkot OEM factory manufacturing premium sportswear, fitness activewear, luxury heavyweight hoodies, and custom streetwear for independent brands across Paris, Lyon, and Marseille.",
  currency: "EUR (€)",
  airHub: "Paris Charles de Gaulle (CDG)",
  vatNotice:
    // TODO-CONFIRM: Owner to confirm French TVA clearance declaration and EORI customs protocol
    "We provide turnkey DDP delivery straight to French brand facilities. Shipments arrive via Colissimo, DPD, or DHL.",
  sizingNotice:
    "European metric grading (centimeters) matching standard French size scales (34–46 / XS–3XL) with slim and oversized fits developed to your tech packs.",
  productCategories: ["clothing-streetwear","gym-fitness-wear","sportswear-teamwear"],
  faqs: franceFaqs,
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  name: "Gloves Storm — France Apparel OEM Manufacturer",
  description:
    "Direct OEM factory manufacturing custom clothing and sportswear for French brands with DDP France shipping.",
  url: "https://www.glovesstorm.com/manufacturers-france",
  telephone: "+92-341-7146935",
  email: BUSINESS_CONFIG.email,
  areaServed: {
    "@type": "Country",
    name: "FR",
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
  mainEntity: franceFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function ManufacturersFrancePage() {
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

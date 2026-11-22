import { Metadata } from "next";
import EuropeCorridorClient, {
  EuropeCorridorConfig,
} from "@/components/manufacturers/EuropeCorridorClient";
import { nordicsFaqs } from "@/lib/data/exportFaqs";
import { BUSINESS_CONFIG } from "@/lib/business";
import DynamicProductGrid from "@/components/products/DynamicProductGrid";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Apparel Manufacturer For Nordic Brands",
  description:
    "Custom sportswear & outerwear manufacturer for Sweden, Norway, Denmark, and Finland. Thermal activewear, DDP Nordic air freight, and low MOQ 30 pcs.",
  alternates: {
    canonical: "https://www.glovesstorm.com/manufacturers-nordics",
  },
  openGraph: {
    title: "Apparel Manufacturer For Nordic Brands | Gloves Storm",
    description:
      "Custom sportswear & outerwear manufacturer for Sweden, Norway, Denmark, and Finland. Thermal activewear, DDP Nordic air freight, and low MOQ 30 pcs.",
    url: "https://www.glovesstorm.com/manufacturers-nordics",
    siteName: "Gloves Storm",
    type: "website",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm — Custom Sportswear Manufacturer For Nordic Brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apparel Manufacturer For Nordic Brands | Gloves Storm",
    description:
      "Custom sportswear & outerwear manufacturer for Sweden, Norway, Denmark, and Finland. Thermal activewear, DDP Nordic air freight, and low MOQ 30 pcs.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
};

const config: EuropeCorridorConfig = {
  countrySlug: "nordics",
  countryName: "the Nordic Region",
  flag: "🇸🇪 🇳🇴 🇩🇰 🇫🇮",
  heroTag: "DIRECT SIALKOT TO NORDIC EXPORT CORRIDOR",
  heroTitle: "Custom apparel manufacturer for Nordic brands",
  heroDescription:
    "Direct OEM manufacturer engineered for Scandinavian performance apparel standards. Producing outdoor activewear, thermal winter compression, technical running gear, and minimalist streetwear for Sweden, Norway, Denmark, and Finland.",
  currency: "EUR (€) / USD",
  airHub: "Stockholm Arlanda (ARN), Copenhagen (CPH), Oslo (OSL), Helsinki (HEL)",
  vatNotice:
    // TODO-CONFIRM: Norwegian VOEC / MVA registration and import VAT clearance procedure to be verified by owner
    "Turnkey DDP shipping covering EU Nordic members (Sweden, Denmark, Finland) and customs documentation for Norway. Final-mile delivery with PostNord, Bring, or DHL.",
  sizingNotice:
    "Tailored Scandinavian sizing curves with longer sleeves and torso lengths popular in Nordic markets. Complete metric grading from XS to 3XL.",
  productCategories: ["gym-fitness-wear","sportswear-teamwear","clothing-streetwear"],
  faqs: nordicsFaqs,
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  name: "Gloves Storm — Nordic Apparel OEM Manufacturer",
  description:
    "Direct OEM factory manufacturing custom clothing and sportswear for Nordic brands with DDP Nordic shipping.",
  url: "https://www.glovesstorm.com/manufacturers-nordics",
  telephone: "+92-341-7146935",
  email: BUSINESS_CONFIG.email,
  areaServed: [
    { "@type": "Country", name: "SE" },
    { "@type": "Country", name: "NO" },
    { "@type": "Country", name: "DK" },
    { "@type": "Country", name: "FI" },
  ],
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
  mainEntity: nordicsFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function ManufacturersNordicsPage() {
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

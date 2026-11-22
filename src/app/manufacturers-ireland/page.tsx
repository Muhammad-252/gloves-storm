import { Metadata } from "next";
import EuropeCorridorClient, {
  EuropeCorridorConfig,
} from "@/components/manufacturers/EuropeCorridorClient";
import { irelandFaqs } from "@/lib/data/exportFaqs";
import { BUSINESS_CONFIG } from "@/lib/business";
import DynamicProductGrid from "@/components/products/DynamicProductGrid";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Apparel Manufacturer For Irish Brands",
  description:
    "Direct OEM factory supplying Irish sportswear brands, GAA clubs, and gym labels. Dublin DDP air shipping, EUR invoicing, and low MOQ 30 pcs per style.",
  alternates: {
    canonical: "https://www.glovesstorm.com/manufacturers-ireland",
  },
  openGraph: {
    title: "Apparel Manufacturer For Irish Brands | Gloves Storm",
    description:
      "Direct OEM factory supplying Irish sportswear brands, GAA clubs, and gym labels. Dublin DDP air shipping, EUR invoicing, and low MOQ 30 pcs per style.",
    url: "https://www.glovesstorm.com/manufacturers-ireland",
    siteName: "Gloves Storm",
    type: "website",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm — Custom Sportswear Manufacturer For Irish Brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apparel Manufacturer For Irish Brands | Gloves Storm",
    description:
      "Direct OEM factory supplying Irish sportswear brands, GAA clubs, and gym labels. Dublin DDP air shipping, EUR invoicing, and low MOQ 30 pcs per style.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
};

const config: EuropeCorridorConfig = {
  countrySlug: "ireland",
  countryName: "Ireland",
  flag: "🇮🇪",
  heroTag: "DIRECT SIALKOT TO REPUBLIC OF IRELAND CORRIDOR",
  heroTitle: "Custom apparel manufacturer for Irish brands",
  heroDescription:
    "Direct Sialkot OEM factory manufacturing Gaelic football & hurling kits, rugby uniforms, gym activewear, and streetwear for independent Irish brands and athletic clubs across Dublin, Cork, and Galway.",
  currency: "EUR (€)",
  airHub: "Dublin Airport (DUB)",
  vatNotice:
    // TODO-CONFIRM: Owner to confirm Irish Revenue import VAT declaration and EORI accounting protocol
    "Turnkey DDP shipping straight to Irish warehouse addresses. Express clearance and doorstep delivery with DPD Ireland or DHL Express.",
  sizingNotice:
    "UK and Irish sizing curves with metric chest and waist specifications. Accurate grading across men's, women's, and juvenile club athletic cuts from XS to 3XL.",
  productCategories: ["sportswear-teamwear","gym-fitness-wear","clothing-streetwear"],
  faqs: irelandFaqs,
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  name: "Gloves Storm — Ireland Apparel OEM Manufacturer",
  description:
    "Direct OEM factory manufacturing custom clothing and sportswear for Irish brands with DDP Ireland shipping.",
  url: "https://www.glovesstorm.com/manufacturers-ireland",
  telephone: "+92-341-7146935",
  email: BUSINESS_CONFIG.email,
  areaServed: {
    "@type": "Country",
    name: "IE",
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
  mainEntity: irelandFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function ManufacturersIrelandPage() {
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

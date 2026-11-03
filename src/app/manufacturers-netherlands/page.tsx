import { Metadata } from "next";
import EuropeCorridorClient, {
  EuropeCorridorConfig,
} from "@/components/manufacturers/EuropeCorridorClient";
import { netherlandsFaqs } from "@/lib/data/exportFaqs";

export const metadata: Metadata = {
  title: "Apparel Manufacturer For Dutch Brands",
  description:
    "Custom clothing & sportswear OEM manufacturer for Dutch apparel brands. Amsterdam Schiphol air freight, EU VAT compliance, and low MOQ 30 pieces.",
  alternates: {
    canonical: "https://www.glovesstorm.com/manufacturers-netherlands",
  },
  openGraph: {
    title: "Apparel Manufacturer For Dutch Brands | Gloves Storm",
    description:
      "Custom clothing & sportswear OEM manufacturer for Dutch apparel brands. Amsterdam Schiphol air freight, EU VAT compliance, and low MOQ 30 pieces.",
    url: "https://www.glovesstorm.com/manufacturers-netherlands",
    siteName: "Gloves Storm",
    type: "website",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm — Custom Clothing Manufacturer For Dutch Brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apparel Manufacturer For Dutch Brands | Gloves Storm",
    description:
      "Custom clothing & sportswear OEM manufacturer for Dutch apparel brands. Amsterdam Schiphol air freight, EU VAT compliance, and low MOQ 30 pieces.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
};

const config: EuropeCorridorConfig = {
  countrySlug: "netherlands",
  countryName: "the Netherlands",
  flag: "🇳🇱",
  heroTag: "DIRECT SIALKOT TO NETHERLANDS EXPORT CORRIDOR",
  heroTitle: "Custom apparel manufacturer for Dutch brands",
  heroDescription:
    "Direct OEM clothing manufacturer supplying Amsterdam, Rotterdam, and Utrecht sportswear labels, cycling brands, and streetwear lines with fast air express via Schiphol and Rotterdam ocean logistics.",
  currency: "EUR (€)",
  airHub: "Amsterdam Airport Schiphol (AMS) & Port of Rotterdam",
  vatNotice:
    "We provide DDP shipping across the Netherlands. [TODO-CONFIRM: Owner to confirm Dutch Article 23 import VAT reverse-charge integration for registered Dutch B.V. importers]. Shipments clear customs and deliver via PostNL, DHL, or DPD.",
  sizingNotice:
    "Tailored European metric sizing with tall & athletic cut options popular with Dutch apparel demographics. Complete CAD grading from XS to 3XL.",
  popularCategories: [
    {
      title: "Cycling & Technical Sportswear",
      link: "/products/sportswear-teamwear",
      image: "/images/products/basketball-uniform.jpg",
      desc: "Aerodynamic dry-fit fabrics, reflective safety details, and Italian sublimated technical sports kits.",
      tag: "Dutch Cycling & Teams",
    },
    {
      title: "Gym & Athleisure Sets",
      link: "/products/gym-fitness-wear",
      image: "/images/products/gym-leggings.jpg",
      desc: "Squat-proof seamless activewear, performance compression tights, and sports bras for Dutch boutique fitness studios.",
      tag: "Dutch Athleisure",
    },
    {
      title: "Sustainable Streetwear Hoodies",
      link: "/products/clothing-streetwear",
      image: "/images/products/hoodie-black.png",
      desc: "Combed organic cotton and heavyweight French Terry hoodies (450+ GSM) with custom trims and branding.",
      tag: "Dutch Streetwear",
    },
  ],
  faqs: netherlandsFaqs,
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  name: "Gloves Storm — Netherlands Apparel OEM Manufacturer",
  description:
    "Direct OEM factory manufacturing custom clothing and sportswear for Dutch brands with DDP Netherlands shipping.",
  url: "https://www.glovesstorm.com/manufacturers-netherlands",
  telephone: "+92-341-7146935",
  email: "glovesstorm@gmail.com",
  areaServed: {
    "@type": "Country",
    name: "NL",
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
  mainEntity: netherlandsFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function ManufacturersNetherlandsPage() {
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
      <EuropeCorridorClient config={config} />
    </>
  );
}

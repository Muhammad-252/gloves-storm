import { Metadata } from "next";
import EuropeCorridorClient, {
  EuropeCorridorConfig,
} from "@/components/manufacturers/EuropeCorridorClient";
import { europeFaqs } from "@/lib/data/exportFaqs";
import { BUSINESS_CONFIG } from "@/lib/business";

export const metadata: Metadata = {
  title: "Apparel Manufacturer For European Brands",
  description:
    "Direct Sialkot OEM factory manufacturing sportswear, gym wear, and streetwear for European brands. DDP EU shipping, VAT handling, and low MOQ 30 pcs.",
  alternates: {
    canonical: "https://www.glovesstorm.com/manufacturers-europe",
  },
  openGraph: {
    title: "Apparel Manufacturer For European Brands | Gloves Storm",
    description:
      "Direct Sialkot OEM factory manufacturing sportswear, gym wear, and streetwear for European brands. DDP EU shipping, VAT handling, and low MOQ 30 pcs.",
    url: "https://www.glovesstorm.com/manufacturers-europe",
    siteName: "Gloves Storm",
    type: "website",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm — Custom Clothing & Sportswear Manufacturer For European Brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apparel Manufacturer For European Brands | Gloves Storm",
    description:
      "Direct Sialkot OEM factory manufacturing sportswear, gym wear, and streetwear for European brands. DDP EU shipping, VAT handling, and low MOQ 30 pcs.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
};

const config: EuropeCorridorConfig = {
  countrySlug: "europe",
  countryName: "European Brands",
  flag: "🇪🇺",
  heroTag: "DIRECT SIALKOT TO EUROPEAN UNION EXPORT CORRIDOR",
  heroTitle: "Custom apparel manufacturer for European brands",
  heroDescription:
    "Direct Sialkot factory supplying European athletic clubs, gym activewear labels, and premium streetwear brands. Complete turnkey OEM manufacturing with European metric sizing, DDP shipping, and low MOQ 30 pieces.",
  currency: "EUR (€)",
  airHub: "Frankfurt (FRA) & Amsterdam Schiphol (AMS)",
  vatNotice:
    // TODO-CONFIRM: Owner to confirm whether EU import VAT is collected upfront on invoice or cleared under recipient EORI registration
    "We provide turnkey DDP shipping across the European Union. All export declarations, EUR-1 certificates of origin, and European customs clearance are managed seamlessly.",
  sizingNotice:
    "All patterns and grading are produced in standard European metric measurements (centimeters), covering EU size curves from XS to 3XL for athletic and streetwear collections.",
  popularCategories: [
    {
      title: "Sublimated Sports & Match Kits",
      link: "/products/sportswear-teamwear",
      image: "/images/products/basketball-uniform.jpg",
      desc: "Vibrant Italian Kiian ink sublimation football, rugby, and basketball team kits engineered for European sports leagues.",
      tag: "EU Sports Clubs",
    },
    {
      title: "Seamless & Compression Activewear",
      link: "/products/gym-fitness-wear",
      image: "/images/products/gym-leggings.jpg",
      desc: "Squat-proof 4-way stretch leggings, compression bras, and athletic activewear sets for European fitness labels.",
      tag: "EU Gym Labels",
    },
    {
      title: "Heavyweight French Terry Hoodies",
      link: "/products/clothing-streetwear",
      image: "/images/products/hoodie-black.png",
      desc: "450–500 GSM luxury French Terry hoodies, oversized tees, and tailored loopback joggers for European streetwear brands.",
      tag: "EU Streetwear",
    },
  ],
  faqs: europeFaqs,
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  name: "Gloves Storm — Europe Apparel OEM Manufacturer",
  description:
    "Direct OEM factory manufacturing custom clothing, team sportswear, gym activewear, and streetwear for European brands with DDP EU shipping.",
  url: "https://www.glovesstorm.com/manufacturers-europe",
  telephone: "+92-341-7146935",
  email: BUSINESS_CONFIG.email,
  areaServed: {
    "@type": "AdministrativeArea",
    name: "European Union",
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
  mainEntity: europeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function ManufacturersEuropePage() {
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

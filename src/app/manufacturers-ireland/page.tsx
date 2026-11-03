import { Metadata } from "next";
import EuropeCorridorClient, {
  EuropeCorridorConfig,
} from "@/components/manufacturers/EuropeCorridorClient";
import { irelandFaqs } from "@/lib/data/exportFaqs";

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
    "Turnkey DDP shipping straight to Irish warehouse addresses. [TODO-CONFIRM: Owner to confirm Irish Revenue import VAT declaration and EORI accounting protocol]. Express clearance and doorstep delivery with DPD Ireland or DHL Express.",
  sizingNotice:
    "UK and Irish sizing curves with metric chest and waist specifications. Accurate grading across men's, women's, and juvenile club athletic cuts from XS to 3XL.",
  popularCategories: [
    {
      title: "GAA & Rugby Match Kits",
      link: "/products/sportswear-teamwear",
      image: "/images/products/basketball-uniform.jpg",
      desc: "Tear-resistant, high-tensile sublimated jerseys, shorts, and thermal tracksuits engineered for heavy contact sports.",
      tag: "Irish Athletic Clubs",
    },
    {
      title: "Gym & Performance Wear",
      link: "/products/gym-fitness-wear",
      image: "/images/products/gym-leggings.jpg",
      desc: "Squat-proof activewear, seamless leggings, and performance stringers for Irish fitness studios and gym brands.",
      tag: "Irish Fitness",
    },
    {
      title: "Heavyweight Streetwear Hoodies",
      link: "/products/clothing-streetwear",
      image: "/images/products/hoodie-black.png",
      desc: "450–500 GSM loopback French Terry hoodies and oversized tees with 3D embroidery and custom trims for Irish urban brands.",
      tag: "Irish Streetwear",
    },
  ],
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
  email: "glovesstorm@gmail.com",
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
      <EuropeCorridorClient config={config} />
    </>
  );
}

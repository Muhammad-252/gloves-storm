import { Metadata } from "next";
import EuropeCorridorClient, {
  EuropeCorridorConfig,
} from "@/components/manufacturers/EuropeCorridorClient";
import { nordicsFaqs } from "@/lib/data/exportFaqs";

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
    "Turnkey DDP shipping covering EU Nordic members (Sweden, Denmark, Finland) and customs documentation for Norway. [TODO-CONFIRM: Norwegian VOEC / MVA registration and import VAT clearance procedure to be verified by owner]. Final-mile delivery with PostNord, Bring, or DHL.",
  sizingNotice:
    "Tailored Scandinavian sizing curves with longer sleeves and torso lengths popular in Nordic markets. Complete metric grading from XS to 3XL.",
  popularCategories: [
    {
      title: "Thermal & Base Layer Activewear",
      link: "/products/gym-fitness-wear",
      image: "/images/products/rash-guard.jpg",
      desc: "Brushed thermal compression tops, insulated leggings, and wind-resistant athletic layers engineered for cold-weather Nordic climates.",
      tag: "Nordic Thermal Gear",
    },
    {
      title: "Technical Tracksuits & Shells",
      link: "/products/sportswear-teamwear",
      image: "/images/products/basketball-uniform.jpg",
      desc: "Bonded softshell jackets, water-resistant athletic tracksuits, and technical training gear for Scandinavian sports clubs.",
      tag: "Scandinavian Sports",
    },
    {
      title: "Minimalist Heavyweight Streetwear",
      link: "/products/clothing-streetwear",
      image: "/images/products/hoodie-black.png",
      desc: "Clean-line 450–500 GSM French Terry hoodies and heavyweight boxy tees with discreet tone-on-tone embroidery and custom hardware.",
      tag: "Nordic Streetwear",
    },
  ],
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
  email: "glovesstorm@gmail.com",
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
      <EuropeCorridorClient config={config} />
    </>
  );
}

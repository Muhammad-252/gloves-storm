import type { Metadata } from "next";
import NicheLandingPage, { type NicheLandingConfig } from "@/components/landing/NicheLandingPage";

export const revalidate = 3600;

const PATH = "/clothing-manufacturer-for-startups";
const TITLE = "Low MOQ Clothing Manufacturer for Startups";
const DESCRIPTION =
  "Low MOQ clothing manufacturer for startup brands. Heavyweight hoodies, tees and sweatsuits from 30 pieces per style, samples in 5–7 days, your own labels and packaging.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `https://www.glovesstorm.com${PATH}` },
  openGraph: {
    title: `${TITLE} | Gloves Storm`,
    description: DESCRIPTION,
    url: `https://www.glovesstorm.com${PATH}`,
    siteName: "Gloves Storm",
    type: "website",
    images: [{ url: "https://www.glovesstorm.com/images/og-default.jpg", width: 1200, height: 630, alt: "Gloves Storm low MOQ clothing manufacturing" }],
  },
  twitter: { card: "summary_large_image", title: `${TITLE} | Gloves Storm`, description: DESCRIPTION },
};

const config: NicheLandingConfig = {
  path: PATH,
  eyebrow: "For startup clothing brands",
  h1: "Low MOQ clothing manufacturer for startup brands",
  intro:
    "Starting a clothing brand shouldn't mean ordering 500 pieces you can't sell. We make heavyweight hoodies, tees, sweatpants and full sweatsuits from 30 pieces per style, with your own labels and packaging, so your first drop looks like an established brand.",
  highlights: [
    "MOQ 30 pieces per style, sizes split as you need",
    "Sample in 5–7 working days before you commit",
    "Woven labels, hang tags and branded packaging",
    "Help turning a sketch or reference photo into a tech pack",
  ],
  productsHeading: "What startups order first",
  productSlugs: [
    "custom-hoodies",
    "custom-heavyweight-t-shirts",
    "custom-oversized-t-shirts",
    "custom-zip-up-hoodies",
    "custom-sweatpants",
    "custom-sweatsuit-sets",
    "custom-labels-and-hang-tags",
    "tech-pack-manufacturing",
  ],
  priceSlugs: [
    "custom-hoodies",
    "custom-zip-up-hoodies",
    "custom-heavyweight-t-shirts",
    "custom-oversized-t-shirts",
    "custom-sweatpants",
    "custom-sweatsuit-sets",
  ],
  sections: [
    {
      heading: "Why a low minimum matters for a new brand",
      body:
        "Your first collection is a test. With a 30-piece minimum you can launch two or three styles instead of betting everything on one, find out what sells, and reorder the winners. Your cash stays in marketing instead of sitting in boxes.",
    },
    {
      heading: "How your first order works",
      body:
        "Send us what you have: a sketch, a reference photo or a tech pack. We confirm fabric weight, fit and decoration, then make your sample in 5–7 working days and courier it to you. After you approve it, bulk production usually takes 2–6 weeks depending on the product, then ships by DHL or FedEx in 4–7 working days. DDP door-to-door delivery can be quoted on request.",
      bullets: [
        "Step 1: send your design and quantities",
        "Step 2: approve a quote and pay for the sample",
        "Step 3: approve the sample (fee credited to your bulk order)",
        "Step 4: bulk production, quality check and shipping",
      ],
    },
    {
      heading: "Make it look like your brand, not ours",
      body:
        "Startups win on details. We add woven neck labels, printed care labels, hang tags and branded polybags, and offer embroidery, screen printing, puff print and DTF, so every piece arrives ready to sell under your name.",
    },
  ],
  faqs: [
    {
      q: "What is your minimum order quantity for a startup brand?",
      a: "30 pieces per style. You can split those 30 across sizes, for example 5 S, 10 M, 10 L and 5 XL.",
    },
    {
      q: "How much does a sample cost?",
      a: "Samples are priced all-in, including express courier: for example $80 for a heavyweight hoodie and $60 for a heavyweight T-shirt. The sample fee is credited against your first bulk order.",
    },
    {
      q: "I don't have a tech pack. Can you still help?",
      a: "Yes. Send a sketch or reference photos with the fabric weight and fit you want. We'll help turn it into a working spec before sampling.",
    },
    {
      q: "Can you add my own labels and packaging?",
      a: "Yes. Woven labels, care labels, hang tags and branded polybags are all available, so your product arrives retail-ready.",
    },
    {
      q: "Do you ship to the USA, UK and Europe?",
      a: "Yes. Orders ship by DHL or FedEx in 4–7 working days, and we can quote DDP delivery with duties handled.",
    },
  ],
  related: [
    { label: "Streetwear & clothing", href: "/products/clothing-streetwear" },
    { label: "Private label manufacturing", href: "/products/custom-manufacturing-private-label" },
    { label: "Low MOQ manufacturers guide", href: "/journal/low-moq-clothing-manufacturers-for-startups" },
    { label: "What a hoodie costs to make", href: "/journal/how-much-does-it-cost-to-make-a-hoodie" },
    { label: "Prices & order terms", href: "/pricing" },
  ],
};

export default function StartupClothingManufacturerPage() {
  return <NicheLandingPage config={config} />;
}

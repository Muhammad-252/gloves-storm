import type { Metadata } from "next";
import NicheLandingPage, { type NicheLandingConfig } from "@/components/landing/NicheLandingPage";

export const revalidate = 3600;

const PATH = "/fightwear-manufacturer";
const TITLE = "Fightwear Manufacturer: MMA Shorts & Rash Guards";
const DESCRIPTION =
  "Custom fightwear manufacturer in Sialkot. MMA fight shorts, BJJ rash guards, Muay Thai shorts and boxing trunks for brands and gyms. MOQ 30 pcs, samples in 5–7 days.";

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
    images: [{ url: "https://www.glovesstorm.com/images/og-default.jpg", width: 1200, height: 630, alt: "Gloves Storm fightwear manufacturing" }],
  },
  twitter: { card: "summary_large_image", title: `${TITLE} | Gloves Storm`, description: DESCRIPTION },
};

const config: NicheLandingConfig = {
  path: PATH,
  eyebrow: "Fightwear manufacturing",
  h1: "Custom fightwear manufacturer for MMA, BJJ and boxing brands",
  intro:
    "We cut, sublimate and sew fight shorts, rash guards, Muay Thai shorts and boxing trunks in Sialkot, Pakistan, for fightwear brands, gyms and fight teams. Send a design or a tech pack and we make it to your spec, under your label.",
  highlights: [
    "MOQ 30 pieces per style",
    "Samples made in 5–7 working days",
    "Full-colour sublimation, embroidery and printed waistbands",
    "Your own woven labels, hang tags and polybags",
  ],
  productsHeading: "Fightwear we make",
  productSlugs: [
    "custom-mma-fight-shorts",
    "custom-rash-guard-manufacturer",
    "custom-muay-thai-shorts",
    "custom-boxing-trunks",
    "custom-grappling-shorts",
    "custom-compression-base-layer-top-manufacturer",
  ],
  priceSlugs: [
    "custom-mma-fight-shorts",
    "custom-muay-thai-shorts",
    "custom-boxing-trunks",
    "custom-grappling-shorts",
    "custom-compression-base-layer-top-manufacturer",
  ],
  sections: [
    {
      heading: "Built for training, not just for the photo",
      body:
        "Fightwear gets pulled, gripped and washed far more than everyday sportswear. We build for that: four-way stretch fabric where you need movement, reinforced stress points on the crotch and side splits, and flatlock seams on rash guards so nothing rubs on the mats.",
      bullets: [
        "MMA shorts: 4-way stretch shell, velcro fly with drawcord, side splits",
        "Rash guards and compression: poly/spandex, sublimated edge to edge",
        "Muay Thai shorts and boxing trunks: satin, wide leg, embroidered or sublimated",
        "Vale tudo and grappling shorts: compression fit, sublimated",
      ],
    },
    {
      heading: "From design to your first delivery",
      body:
        "Send artwork, a reference photo or a full tech pack. We confirm fabric, sizes and decoration, make your sample in 5–7 working days and courier it to you. Once you approve fit and print, bulk production usually takes 2–3 weeks, then ships by DHL or FedEx in 4–7 working days. Door-to-door DDP delivery can be quoted on request.",
    },
    {
      heading: "Who we work with",
      body:
        "New fightwear labels testing their first drop, established brands adding a second factory, and gyms and fight teams that want their own kit. Because the minimum is 30 pieces per style, you can launch a small run, see what sells and reorder.",
    },
  ],
  faqs: [
    {
      q: "What is the minimum order for custom MMA shorts or rash guards?",
      a: "30 pieces per style. Sizes can be split across that quantity, so a run of 30 can cover several sizes.",
    },
    {
      q: "How much does a fightwear sample cost?",
      a: "Fight short and rash guard samples are $60–65 all-in, which covers pattern, fabric, making and express courier. The sample fee is credited against your first bulk order.",
    },
    {
      q: "Can you sublimate a full custom design on rash guards and fight shorts?",
      a: "Yes. Rash guards, compression tops and MMA shorts are fully sublimated, so your design can run edge to edge in any number of colours. Satin Muay Thai shorts and boxing trunks can be embroidered or sublimated.",
    },
    {
      q: "Can you add our own labels and packaging?",
      a: "Yes. We supply woven neck or waistband labels, care labels, hang tags and branded polybags, so the product arrives ready to sell under your brand.",
    },
    {
      q: "How long does a fightwear order take?",
      a: "Samples take 5–7 working days. After you approve the sample, bulk production usually takes 2–3 weeks, plus 4–7 working days by express courier.",
    },
  ],
  related: [
    { label: "Gym & fitness wear", href: "/products/gym-fitness-wear" },
    { label: "BJJ rash guard manufacturer guide", href: "/journal/bjj-rash-guard-manufacturer-guide" },
    { label: "Sublimated sportswear", href: "/products/sportswear-teamwear" },
    { label: "Prices & order terms", href: "/pricing" },
  ],
};

export default function FightwearManufacturerPage() {
  return <NicheLandingPage config={config} />;
}

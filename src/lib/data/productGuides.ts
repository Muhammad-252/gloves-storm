/**
 * Extra buying-guide content for product pages that need more than the short
 * description from admin: headed sections, internal links and FAQs.
 *
 * Links use the form [label](/path). Outside links (http...) are rendered nofollow.
 */
export interface ProductGuide {
  heading: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  faqs: { question: string; answer: string }[];
}

export const PRODUCT_GUIDES: Record<string, ProductGuide> = {
  "oem-sportswear-manufacturing": {
    heading: "How OEM sportswear manufacturing works",
    sections: [
      {
        heading: "Your design, made to your specification",
        body:
          "OEM means we manufacture sportswear to your design. You send a tech pack, a sample garment or a sketch with reference photos, and we turn it into a pattern, grade it across your size range, match your fabric and colors, and produce it under your brand. It suits established sportswear brands, teamwear companies and fight-wear labels that already know exactly what they want to sell. If you would rather start from one of our proven styles, see [private label sportswear](/products/custom-manufacturing-private-label/private-label-sportswear-manufacturing) instead.",
      },
      {
        heading: "From tech pack to bulk order",
        body: "Every OEM order follows the same five steps, so you always know what happens next.",
        bullets: [
          "Send your tech pack or references. We reply within 48 hours with questions, a free digital mockup and a quote.",
          "Pattern and sample. Your first sample is made in 5–7 days and couriered to you in 4–7 working days.",
          "Approve fit, fabric and print. Changes are made on a second sample if needed.",
          "Bulk production in 2–4 weeks after approval, with 50% paid to start and 50% before dispatch.",
          "Shipping by DHL or FedEx in 4–7 working days, or door-to-door DDP delivery on request.",
        ],
      },
      {
        heading: "What we manufacture",
        body:
          "Our Sialkot factory cuts, sublimates and sews the full range of performance sportswear: [soccer kits](/products/sportswear-teamwear/custom-soccer-kits), [basketball uniforms](/products/sportswear-teamwear/custom-basketball-uniforms), [baseball](/products/sportswear-teamwear/custom-baseball-uniforms) and [American football uniforms](/products/sportswear-teamwear/custom-american-football-uniforms), [compression base layers](/products/gym-fitness-wear/custom-compression-base-layer-top-manufacturer), [rash guards](/products/gym-fitness-wear/custom-rash-guard-manufacturer), [MMA fight shorts](/products/gym-fitness-wear/custom-mma-fight-shorts), [gym leggings](/products/gym-fitness-wear/custom-high-waist-seamless-gym-leggings) and [team tracksuits](/products/sportswear-teamwear/custom-tracksuits).",
      },
      {
        heading: "Minimums and prices",
        body:
          "The minimum is 30 pieces per style, and sizes can be mixed within those 30. As a guide, a sublimated soccer kit starts at $21 a set, a basketball uniform at $23, a compression top at $13 and MMA fight shorts at $17, with prices dropping at 100 and 300 pieces. Full sublimation is included on sportswear. See every price on our [price list](/pricing), or read [what custom team uniforms cost](/journal/how-much-do-custom-team-uniforms-cost).",
      },
      {
        heading: "OEM or private label?",
        body:
          "Choose OEM when you have your own designs and want them made exactly to spec. Choose [private label](/products/custom-manufacturing-private-label/private-label-sportswear-manufacturing) when you want to launch faster from styles we already make. Our guide to [OEM vs ODM vs private label](/journal/oem-vs-odm-vs-private-label-clothing-manufacturing-guide) explains the differences in detail.",
      },
    ],
    faqs: [
      {
        question: "What is OEM sportswear manufacturing?",
        answer:
          "It means a factory makes sportswear to your own design and specification and you sell it under your brand. You supply the design or tech pack; we handle patterns, grading, fabric, sampling and production.",
      },
      {
        question: "Do I need a tech pack?",
        answer:
          "A tech pack makes sampling faster, but it is not required. A sample garment, or a sketch with reference photos and your fabric and fit requirements, is enough to start. See our [tech pack service](/products/custom-manufacturing-private-label/tech-pack-manufacturing).",
      },
      {
        question: "What is the minimum order for OEM sportswear?",
        answer: "30 pieces per style. Sizes, and names and numbers on teamwear, can all be mixed within those 30.",
      },
      {
        question: "How long does OEM production take?",
        answer:
          "Samples take 5–7 days to make plus 4–7 working days by courier. Bulk production takes 2–4 weeks after you approve the sample.",
      },
    ],
  },

  "private-label-sportswear-manufacturing": {
    heading: "How private label sportswear works",
    sections: [
      {
        heading: "Our proven styles, your brand",
        body:
          "Private label means you choose from sportswear styles we already make, then we produce them in your colors and fabric choice with your logo, labels and packaging. Because the patterns and fit are already tested, you skip most of the development work and can launch a collection faster and with less risk. It suits new sportswear brands, gyms, fitness coaches and clubs selling their own merchandise. If you have your own designs, see [OEM sportswear manufacturing](/products/custom-manufacturing-private-label/oem-sportswear-manufacturing) instead.",
      },
      {
        heading: "What you can brand",
        body: "Every piece can carry your brand from the inside label to the bag it ships in.",
        bullets: [
          "Your logo printed, sublimated or embroidered in up to several positions",
          "Custom woven neck labels and printed care labels",
          "Hang tags with your brand, price or barcode",
          "Custom printed polybags for retail-ready delivery",
          "Your own colors, including fully sublimated all-over designs",
        ],
      },
      {
        heading: "Popular private label styles",
        body:
          "Brands most often start with [compression base layers](/products/gym-fitness-wear/custom-compression-base-layer-top-manufacturer), [rash guards](/products/gym-fitness-wear/custom-rash-guard-manufacturer), [men's training shorts](/products/gym-fitness-wear/custom-mens-training-shorts-manufacturer), [gym leggings](/products/gym-fitness-wear/custom-high-waist-seamless-gym-leggings), [MMA fight shorts](/products/gym-fitness-wear/custom-mma-fight-shorts), [training T-shirts](/products/sportswear-teamwear/custom-training-jerseys) and [team tracksuits](/products/sportswear-teamwear/custom-tracksuits). Browse the full [gym and fitness range](/products/gym-fitness-wear) and [teamwear range](/products/sportswear-teamwear).",
      },
      {
        heading: "Minimums and branding costs",
        body:
          "The minimum is 30 pieces per style with sizes mixed. One logo position is included in the garment price. A custom woven label and hang tag adds $0.50 per piece, a printed polybag $0.30, and extra embroidery $1.50 per position. See the full [price list](/pricing) for garment prices.",
      },
      {
        heading: "How to start",
        body:
          "Send us your logo and the styles you like. We reply within 48 hours with a free mockup and quote, make your sample in 5–7 days, and start bulk production after you approve it. Starting a brand from scratch? Our [startup manufacturing page](/clothing-manufacturer-for-startups) and [private label manufacturer guide](/journal/private-label-clothing-manufacturer-guide) walk you through it.",
      },
    ],
    faqs: [
      {
        question: "What is private label sportswear?",
        answer:
          "Sportswear made from a manufacturer's existing styles and sold under your brand, with your logo, labels and packaging. It is faster and cheaper to launch than developing every design from scratch.",
      },
      {
        question: "What is the minimum order for private label sportswear?",
        answer: "30 pieces per style, and sizes can be mixed within those 30.",
      },
      {
        question: "Can I change the fabric or colors of a private label style?",
        answer:
          "Yes. You can choose your colors and fabric weight, and sublimated styles can carry any all-over design. Bigger changes to the pattern or fit are handled as an OEM order.",
      },
      {
        question: "Do you add my own labels and packaging?",
        answer:
          "Yes. Custom woven labels and hang tags cost $0.50 per piece and printed polybags $0.30, so your products arrive ready to sell.",
      },
    ],
  },
};

/** Splits "text [label](/href) more" into text and link parts. */
export function parseLinks(text: string): ({ text: string } | { label: string; href: string })[] {
  const parts: ({ text: string } | { label: string; href: string })[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index! > last) parts.push({ text: text.slice(last, m.index) });
    parts.push({ label: m[1], href: m[2] });
    last = m.index! + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}

/** Plain text version (for JSON-LD). */
export const stripLinks = (text: string) => text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");

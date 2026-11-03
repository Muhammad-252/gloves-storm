import { BUSINESS_CONFIG } from "@/lib/business";

export interface ExportFaqItem {
  question: string;
  answer: string;
}

export const usaFaqs: ExportFaqItem[] = [
  {
    question: "Do you manufacture custom clothing and sportswear for USA brands?",
    answer:
      "Yes. The United States is Gloves Storm's primary export corridor. We manufacture custom apparel, athletic team uniforms, gym activewear, hoodies, tracksuits, and private label collections for independent apparel brands, athletic clubs, collegiate sports teams, and distributors throughout California, Texas, Florida, New York, and nationwide.",
  },
  {
    question: "How long does shipping take from Pakistan to the USA?",
    answer:
      "Express air freight typically delivers to any US address within 3 to 5 business days after dispatch via DHL Express or FedEx. For large commercial container orders, ocean freight to East or West Coast ports takes approximately 24 to 30 days. Pre-production master samples are couriered in 5 to 7 working days.",
  },
  {
    question: "What is the minimum order for a USA client?",
    answer:
      `Our minimum order quantity for American clients starts from just ${BUSINESS_CONFIG.moq} pieces per style/colorway. This low threshold enables startup brands, fitness studios, and athletic programs to produce fully custom apparel collections with custom grading without excessive upfront inventory capital.`,
  },
  {
    question: "Can you ship to Amazon FBA warehouses in the USA?",
    answer:
      "Yes. We frequently fulfill orders destined for Amazon FBA warehouses across the United States. We provide FBA-compliant master carton sizing, FNSKU item barcode labeling, polybag suffocation warnings, and prep requirements so your inventory checks into Amazon fulfillment centers seamlessly.",
  },
  {
    question: "Do you handle US customs clearance?",
    answer:
      "Yes. With our turnkey DDP (Delivered Duty Paid) shipping service, Gloves Storm handles all international export documentation in Pakistan, US Customs clearance, Harmonized Tariff System (HTS) classification, and import duties. Your shipment arrives directly at your facility door with zero surprise customs fees.",
  },
];

export const ukFaqs: ExportFaqItem[] = [
  {
    question: "Do you ship to the UK under DDP terms?",
    answer:
      "Yes, absolutely. Under our DDP (Delivered Duty Paid) shipping service, Gloves Storm manages the entire logistics chain: export customs clearance in Pakistan, international air freight, UK customs entry with HMRC, payment of UK import duty and VAT, and final doorstep delivery via DPD, DHL, or Parcelforce. There are no unexpected fees or administrative delays upon arrival.",
  },
  {
    question: "How does Brexit affect importing from Pakistan to the UK?",
    answer:
      "Post-Brexit, goods entering Great Britain require UK customs declarations and adherence to UK trade rules. Because Pakistan benefits from the UK's Developing Countries Trading Scheme (DCTS) — which succeeded the EU GSP+ — many manufactured sports goods and apparel items benefit from preferential tariff access into the UK. Gloves Storm provides all necessary export documentation, including Certificate of Origin, correct 8-digit UK Integrated Tariff commodity codes, and commercial invoices formatted for UK EORI holders.",
  },
  {
    question: "Can you invoice in British Pounds (GBP)?",
    answer:
      "Yes. While standard international export is often conducted in USD, we provide commercial invoicing and bank wire payment details in British Pounds Sterling (GBP) to simplify accounting for UK registered companies and eliminate currency exchange volatility.",
  },
  {
    question: "Do your custom garments and sportswear meet UK safety and textile standards?",
    answer:
      "Yes. All our performance garments, gym wear, and sportswear comply with UK textile safety requirements, OEKO-TEX Standard 100 fabric parameters, and REACH chemical standards. We use certified non-toxic European sublimation inks, nickel-free zippers, reinforced flatlock seams, and high-tensile polyester stitching suitable for professional athletic and commercial retail use across the UK.",
  },
  {
    question: "What is the delivery time to the UK from order confirmation?",
    answer:
      `Master prototype samples take ${BUSINESS_CONFIG.sampleLeadTime} to produce, followed by 3 to 5 business days for express air courier delivery to your UK address. Once you approve the sample, bulk manufacturing takes ${BUSINESS_CONFIG.bulkLeadTime} depending on order size. Shipping to the UK takes 3 to 5 days via air freight, or 20 to 24 days via ocean freight for large container volumes.`,
  },
];


export const europeFaqs: ExportFaqItem[] = [
  {
    question: "Do you offer DDP (Delivered Duty Paid) shipping to the European Union?",
    answer:
      "Yes. Under our DDP shipping agreement, Gloves Storm manages export customs in Pakistan, European air freight, and import clearance. [TODO-CONFIRM: Owner to confirm whether EU import VAT is collected upfront on invoice or cleared under the recipient's EU EORI number]. Goods arrive at your warehouse with zero unexpected port fees.",
  },
  {
    question: "How long does shipping take to European countries?",
    answer:
      `Master prototype samples take ${BUSINESS_CONFIG.sampleLeadTime} to produce, followed by 3 to 5 business days for express air courier delivery. Once the pre-production sample is approved, bulk manufacturing requires ${BUSINESS_CONFIG.bulkLeadTime}. [TODO-CONFIRM: European express air transit takes 3 to 5 business days; sea freight to Hamburg or Rotterdam takes 22 to 26 days].`,
  },
  {
    question: "Do you manufacture using European metric sizing standards?",
    answer:
      "Yes. We grade patterns strictly in metric centimeters according to European sizing curves (XS to 3XL). We also provide custom size blocks tailored to your brand's fit specifications.",
  },
  {
    question: "Can you invoice in Euros (EUR)?",
    answer:
      "Yes. We support commercial invoicing and international bank wire payments in Euros (EUR) to prevent currency conversion costs for EU registered businesses.",
  },
  {
    question: "Are your garments compliant with EU REACH and OEKO-TEX standards?",
    answer:
      "Yes. All textiles, sewing threads, zippers, and Italian sublimation inks meet EU REACH chemical safety regulations and OEKO-TEX Standard 100 environmental guidelines.",
  },
];

export const germanyFaqs: ExportFaqItem[] = [
  {
    question: "Do you ship custom apparel to Germany under DDP terms?",
    answer:
      "Yes. We ship directly to brands in Berlin, Munich, Hamburg, Frankfurt, and Cologne via DDP air freight. [TODO-CONFIRM: Customs duties and German import VAT (Einfuhrumsatzsteuer) handling procedure to be verified by owner]. Final delivery is handled by DHL Express or UPS.",
  },
  {
    question: "How long does sample and bulk delivery take to Germany?",
    answer:
      `Physical master samples are completed in ${BUSINESS_CONFIG.sampleLeadTime} and air-couriered to Germany in 3 to 5 business days. Bulk orders are produced in ${BUSINESS_CONFIG.bulkLeadTime} with [TODO-CONFIRM: 3 to 5 business days for express air cargo into Frankfurt Airport (FRA)].`,
  },
  {
    question: "Do you produce technical sportswear and compression wear for German clubs?",
    answer:
      "Yes. We manufacture technical football match kits, handball jerseys, tracksuits, and gym compression wear using Italian sublimation inks and reinforced flatlock stitching.",
  },
  {
    question: "What sizing standards are used for German brands?",
    answer:
      "We build to standard German and European metric sizing charts (Konfektionsgrößen 46–58 / XS–3XL) with precise chest, waist, and inseam measurements in centimeters.",
  },
];

export const netherlandsFaqs: ExportFaqItem[] = [
  {
    question: "How are shipments routed to Dutch brands and 3PL warehouses?",
    answer:
      "Shipments are flown into Amsterdam Schiphol Airport (AMS) or shipped via ocean container into the Port of Rotterdam. [TODO-CONFIRM: Dutch Article 23 VAT reverse-charge mechanism availability to be confirmed by owner].",
  },
  {
    question: "What is the lead time for orders delivered to the Netherlands?",
    answer:
      `Master samples are completed in ${BUSINESS_CONFIG.sampleLeadTime} plus 3 to 5 days air express. Bulk manufacturing requires ${BUSINESS_CONFIG.bulkLeadTime}, followed by [TODO-CONFIRM: 3 to 5 business days for air express delivery across Amsterdam, Rotterdam, and Eindhoven].`,
  },
  {
    question: "Do you produce sustainable or recycled fabrics for Dutch labels?",
    answer:
      "Yes. We offer GRS-certified recycled polyester, organic combed cotton, and low-impact dyed textiles to satisfy the strict sustainability guidelines of Dutch apparel brands.",
  },
  {
    question: "What is your MOQ for Netherlands startup brands?",
    answer:
      `Our minimum order quantity is ${BUSINESS_CONFIG.moq} pieces per style/colorway, allowing startup fashion and activewear brands in the Netherlands to launch without high capital risk.`,
  },
];

export const franceFaqs: ExportFaqItem[] = [
  {
    question: "Do you supply custom streetwear and activewear to French brands?",
    answer:
      "Yes. We manufacture luxury heavyweight French Terry hoodies (450–500 GSM), oversized graphic tees, and technical activewear sets for independent fashion and sports labels across Paris, Lyon, Marseille, and Bordeaux.",
  },
  {
    question: "How are customs and VAT handled for French deliveries?",
    answer:
      "We provide turnkey DDP shipping with air freight via Paris Charles de Gaulle (CDG). [TODO-CONFIRM: Owner to confirm French TVA clearance method and EORI declaration process]. Final delivery is completed by Colissimo, DPD France, or DHL.",
  },
  {
    question: "What are the sample and bulk production timelines for France?",
    answer:
      `Sample development takes ${BUSINESS_CONFIG.sampleLeadTime}. Bulk manufacturing takes ${BUSINESS_CONFIG.bulkLeadTime}, with [TODO-CONFIRM: 3 to 5 business days for express air courier delivery to French addresses].`,
  },
  {
    question: "Can we supply our own bespoke patterns and tech packs?",
    answer:
      "Yes. We specialize in OEM cut-and-sew manufacturing based strictly on your CAD patterns, size blocks, and technical design packages.",
  },
];

export const nordicsFaqs: ExportFaqItem[] = [
  {
    question: "Do you manufacture cold-weather and thermal sportswear for Nordic brands?",
    answer:
      "Yes. We specialize in thermal brushed fleece, windproof technical shells, water-resistant bonded softshells, and compression base layers engineered for outdoor athletic conditions in Sweden, Norway, Denmark, and Finland.",
  },
  {
    question: "How does DDP shipping work for Nordic countries (including non-EU Norway)?",
    answer:
      "We ship DDP to Sweden, Denmark, and Finland under EU trade rules. For Norway, we prepare complete Norwegian customs clearance documentation and export declarations. [TODO-CONFIRM: Norwegian VOEC/MVA handling procedure to be verified by owner].",
  },
  {
    question: "What are the shipping times to Stockholm, Copenhagen, Oslo, and Helsinki?",
    answer:
      `Samples take ${BUSINESS_CONFIG.sampleLeadTime} plus 4 to 6 business days for air courier. Bulk orders take ${BUSINESS_CONFIG.bulkLeadTime} plus [TODO-CONFIRM: 4 to 6 business days for express air freight].`,
  },
  {
    question: "What currencies are accepted for Nordic orders?",
    answer:
      "We accept commercial wire transfers in Euros (EUR) or US Dollars (USD), with transparent invoicing to eliminate conversion confusion.",
  },
];

export const irelandFaqs: ExportFaqItem[] = [
  {
    question: "Do you manufacture kits for Irish sports clubs and GAA teams?",
    answer:
      "Yes. We produce high-tensile sublimated Gaelic football and hurling jerseys, rugby kits, training tracksuits, and gym activewear built for Irish athletic club specifications.",
  },
  {
    question: "How is DDP shipping handled to the Republic of Ireland?",
    answer:
      "Shipments fly directly into Dublin Airport (DUB) with full DDP customs clearance and Irish VAT compliance. [TODO-CONFIRM: Owner to confirm Irish Revenue VAT accounting details]. Delivered via DPD Ireland or DHL Express.",
  },
  {
    question: "Can Irish companies pay in Euros (EUR)?",
    answer:
      "Yes. We invoice directly in Euros (EUR) via international SEPA / SWIFT bank wire transfer, avoiding FX transaction fees.",
  },
  {
    question: "What is the lead time to Dublin, Cork, or Galway?",
    answer:
      `Master prototype samples take ${BUSINESS_CONFIG.sampleLeadTime} to craft, followed by 3 to 5 business days air delivery. Bulk production takes ${BUSINESS_CONFIG.bulkLeadTime} followed by [TODO-CONFIRM: 3 to 5 business days air express freight].`,
  },
];

import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'journalFaqs.ts');
let code = fs.readFileSync(filePath, 'utf8');

const startIdx = code.indexOf('"private-label-activewear-manufacturer-guide": [');
const endIdx = code.indexOf('"custom-team-uniforms-manufacturer-usa-guide": [');

if (startIdx !== -1 && endIdx !== -1) {
  const replacement = `"private-label-activewear-manufacturer-guide": [
    {
      question: "What is a private label activewear manufacturer?",
      answer:
        "A factory that makes activewear such as leggings, sports bras, and gym tops and finishes it with your brand's labels, logos, and packaging, so you can sell it as your own.",
    },
    {
      question: "What is the MOQ for private label activewear at Gloves Storm?",
      answer:
        "30 to 50 pieces per style and colour. Confirm the exact number for your product in writing.",
    },
    {
      question: "How do you make sure leggings are squat-proof?",
      answer:
        "We make leggings at 240 to 280 GSM in a dense double-knit interlock and test every production lot with a 90-degree bend light-box opacity test before cut panels are approved.",
    },
    {
      question: "Why is flatlock stitching used in activewear?",
      answer:
        "Flatlock seams lie flat against the skin and stretch with the fabric, which reduces chafing during running, cycling, and heavy lifting.",
    },
    {
      question: "What is the difference between nylon and polyester blends for gym wear?",
      answer:
        "Nylon with elastane is softer and resists pilling, which suits premium leggings and bras. Polyester with elastane dries quickly and holds prints well, which suits printed and training pieces.",
    },
    {
      question: "Which branding methods work best on activewear?",
      answer:
        "Silicone heat transfers, tagless heat-sealed labels, and jacquard waistbands all stretch with the fabric. Woven labels suit hoodies and joggers.",
    },
    {
      question: "Can you make private label gym clothes and athleisure as well as leggings?",
      answer:
        "Yes. We make sports bras, tops, shorts, hoodies, joggers, and matching sets.",
    },
    {
      question: "Do you ship private label activewear to the UK?",
      answer:
        "Yes, DDP to the UK, with air freight taking about 3 to 5 days. Confirm current UK import VAT and duty for your product.",
    },
  ],

  // 9. Custom Team Uniforms Manufacturer USA Guide
  `;

  const updated = code.substring(0, startIdx) + replacement + code.substring(endIdx);
  fs.writeFileSync(filePath, updated, 'utf8');
  console.log("✅ Successfully updated journalFaqs.ts with all 8 activewear FAQs!");
} else {
  console.error("❌ Could not locate activewear FAQs in journalFaqs.ts");
}

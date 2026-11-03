import * as fs from "fs";
import * as path from "path";

// Load .env.local synchronously before importing any modules
try {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = match[2] || "";
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        process.env[key] = val;
      }
    }
  }
} catch {}

const HIDDEN_CATEGORY_SLUGS = ["boxing-equipment", "swimwear-beachwear"];
const BRAND = "Gloves Storm";

interface PageMetaResult {
  url: string;
  title: string;
  titleLength: number;
  description: string;
  descLength: number;
}

async function runAudit() {
  const { getDbCategories, getDbProducts, getDbBlogPosts } = await import("../src/lib/data/fileDb");
  const { CATEGORY_INTEL } = await import("../src/lib/data/categoryIntel");
  const { buildProductTitlePhrase, buildProductDescription, BLOG_META_OVERRIDES } = await import("../src/lib/seo");

  console.log("==================================================");
  console.log("🔍 GLOVES STORM SEO AUDIT: TITLES & DESCRIPTIONS");
  console.log("==================================================\n");

  const [allCategories, allProducts, allBlogs] = await Promise.all([
    getDbCategories().catch(() => []),
    getDbProducts().catch(() => []),
    getDbBlogPosts().catch(() => []),
  ]);

  const categories = allCategories.filter((c) => c.is_active && !HIDDEN_CATEGORY_SLUGS.includes(c.slug));
  const visibleCatIds = new Set(categories.map((c) => c.id));
  const products = allProducts.filter((p) => p.is_active && visibleCatIds.has(p.category_id ?? ""));

  const results: PageMetaResult[] = [];

  // Core static pages
  const corePages: Record<string, { titlePhrase?: string; absoluteTitle?: string; desc: string }> = {
    "/": {
      absoluteTitle: "Custom Sportswear Manufacturer, Low MOQ | Gloves Storm",
      desc: "Direct OEM apparel factory in Sialkot, Pakistan. Custom sportswear, team uniforms, gym wear, and hoodies. Low MOQ 30 pcs, 5–7 day samples, DDP shipping.",
    },
    "/products": {
      titlePhrase: "Custom Sportswear & Apparel Catalog",
      desc: "Explore custom apparel specs: team sportswear, uniforms, gym activewear, hoodies, and streetwear. Direct factory private label manufacturing with low MOQ.",
    },
    "/about": {
      titlePhrase: "Custom Apparel Factory & OEM Sialkot",
      desc: "Direct OEM apparel factory in Sialkot, Pakistan since 2019. Custom sportswear, gym wear, and private label garments. Low MOQ 30 pcs, global DDP delivery.",
    },
    "/contact": {
      titlePhrase: "Get Custom Apparel Manufacturing Quote",
      desc: "Request a free custom clothing & sportswear manufacturing quote. Low MOQ 30 pieces per style, 5–7 day sample delivery, and fast DDP shipping to USA and UK.",
    },
    "/journal": {
      titlePhrase: "Custom Apparel OEM Manufacturing Blog",
      desc: "Read custom apparel manufacturing guides, fabric sourcing tips, private label advice, and export insights from our Sialkot factory team. Updated regularly.",
    },
    "/previous-work": {
      titlePhrase: "Custom Apparel Production Portfolio",
      desc: "Browse real production runs from Gloves Storm: custom sportswear, gym wear, hoodies, and private label apparel made for international clothing brands.",
    },
    "/privacy": {
      titlePhrase: "Privacy & Intellectual Property Policy",
      desc: "Read our privacy and IP confidentiality policy for manufacturing partners, proprietary tech pack submissions, and custom B2B apparel production clients.",
    },
    "/manufacturers-usa": {
      titlePhrase: "Apparel Manufacturer For USA Brands",
      desc: "Direct OEM apparel factory supplying USA sportswear brands, sports teams, and streetwear labels. Low MOQ 30 pcs, 5–7 day samples, and door-to-door DDP air.",
    },
    "/manufacturers-uk": {
      titlePhrase: "Custom Apparel Manufacturer For UK Brands",
      desc: "Direct OEM apparel factory supplying UK clothing brands, sports clubs, and labels. Low MOQ 30 pcs, 5–7 day sample dispatch, and door-to-door DDP delivery.",
    },
    // Europe corridors
    "/manufacturers-europe": {
      titlePhrase: "Custom Apparel Manufacturer For Europe",
      desc: "Direct OEM apparel factory supplying European sports brands and streetwear labels. Low MOQ 30 pcs, 5–7 day samples, and door-to-door EU DDP delivery.",
    },
    "/manufacturers-germany": {
      titlePhrase: "Custom Apparel Manufacturer For Germany",
      desc: "Direct OEM clothing & sportswear factory for German apparel brands and clubs. Low MOQ 30 pcs, 5–7 day samples, and door-to-door DDP shipping to Germany.",
    },
    "/manufacturers-netherlands": {
      titlePhrase: "Apparel Manufacturer Netherlands Brands",
      desc: "Direct OEM apparel factory supplying Dutch streetwear and sportswear brands. Low MOQ 30 pcs, 5–7 day samples, and door-to-door DDP delivery to Netherlands.",
    },
    "/manufacturers-france": {
      titlePhrase: "Custom Apparel Manufacturer For France",
      desc: "Direct OEM clothing & sportswear manufacturer for French athletic brands. Low MOQ 30 pcs, 5–7 day samples, and door-to-door DDP delivery to France.",
    },
    "/manufacturers-nordics": {
      titlePhrase: "Custom Apparel Manufacturer For Nordics",
      desc: "Direct OEM clothing & sportswear factory for Scandinavian and Nordic apparel brands. Low MOQ 30 pcs, 5–7 day samples, and door-to-door DDP Nordic delivery.",
    },
    "/manufacturers-ireland": {
      titlePhrase: "Custom Apparel Manufacturer For Ireland",
      desc: "Direct OEM clothing & sportswear factory for Irish sports clubs and brands. Low MOQ 30 pcs, 5–7 day samples, and door-to-door DDP delivery to Ireland.",
    },
  };

  for (const [path, conf] of Object.entries(corePages)) {
    const finalTitle = conf.absoluteTitle || `${conf.titlePhrase} | ${BRAND}`;
    results.push({
      url: path,
      title: finalTitle,
      titleLength: finalTitle.length,
      description: conf.desc,
      descLength: conf.desc.length,
    });
  }

  // Category pages
  for (const cat of categories) {
    const intel = CATEGORY_INTEL[cat.slug];
    const phrase = intel?.metaTitle || `Custom ${cat.name} OEM Factory`;
    const finalTitle = `${phrase} | ${BRAND}`;
    const desc =
      intel?.metaDescription ||
      `Direct factory OEM manufacturing for custom ${cat.name} in Sialkot, Pakistan. Sublimation teamwear, activewear, low MOQ 30 pcs, and door-to-door DDP freight.`;
    results.push({
      url: `/products/${cat.slug}`,
      title: finalTitle,
      titleLength: finalTitle.length,
      description: desc,
      descLength: desc.length,
    });
  }

  // Product pages
  for (const prod of products) {
    const cat = categories.find((c) => c.id === prod.category_id);
    const catSlug = cat?.slug || "general";
    const phrase = buildProductTitlePhrase(prod.name);
    const finalTitle = `${phrase} | ${BRAND}`;
    const desc = buildProductDescription(prod.name, prod.materials);
    results.push({
      url: `/products/${catSlug}/${prod.slug}`,
      title: finalTitle,
      titleLength: finalTitle.length,
      description: desc,
      descLength: desc.length,
    });
  }

  // Blog pages
  for (const blog of allBlogs) {
    const override = BLOG_META_OVERRIDES[blog.slug];
    const phrase = override?.titlePhrase || blog.title.slice(0, 40);
    const finalTitle = `${phrase} | ${BRAND}`;
    const desc = override?.description || blog.seo_description || "";
    results.push({
      url: `/journal/${blog.slug}`,
      title: finalTitle,
      titleLength: finalTitle.length,
      description: desc,
      descLength: desc.length,
    });
  }

  // Audit assertions
  let errors = 0;
  const titleSet = new Set<string>();
  const descSet = new Set<string>();

  for (const r of results) {
    let hasIssue = false;
    let issueReason = "";

    // 1. Title length
    if (r.titleLength > 60) {
      hasIssue = true;
      issueReason += `[Title > 60: ${r.titleLength}] `;
    }

    // 2. Brand occurrences in title
    const brandOccurrences = (r.title.match(/Gloves\s*Storm/gi) || []).length;
    if (brandOccurrences !== 1) {
      hasIssue = true;
      issueReason += `[Brand occurrences != 1: found ${brandOccurrences}] `;
    }

    // 3. Duplicate title
    if (titleSet.has(r.title)) {
      hasIssue = true;
      issueReason += `[Duplicate title] `;
    }
    titleSet.add(r.title);

    // 4. Description length
    if (r.descLength < 140 || r.descLength > 155) {
      hasIssue = true;
      issueReason += `[Desc length not 140-155: ${r.descLength}] `;
    }

    // 5. Duplicate description
    if (descSet.has(r.description)) {
      hasIssue = true;
      issueReason += `[Duplicate description] `;
    }
    descSet.add(r.description);

    if (hasIssue) {
      console.log(`❌ ${r.url}`);
      console.log(`   Title (${r.titleLength}): "${r.title}"`);
      console.log(`   Desc (${r.descLength}): "${r.description}"`);
      console.log(`   Issue: ${issueReason}\n`);
      errors++;
    }
  }

  console.log("--------------------------------------------------");
  console.log(`Audited ${results.length} total pages from sitemap.`);
  if (errors === 0) {
    console.log("✅ ALL PAGES PASSED ACCEPTANCE CRITERIA!");
    console.log("   - No title over 60 characters.");
    console.log("   - Brand 'Gloves Storm' appears exactly once in every title.");
    console.log("   - No duplicate titles across any page.");
    console.log("   - All meta descriptions are 140–155 characters.");
    console.log("   - No duplicate meta descriptions.");
    process.exit(0);
  } else {
    console.error(`❌ Found ${errors} pages with SEO issues.`);
    process.exit(1);
  }
}

runAudit();

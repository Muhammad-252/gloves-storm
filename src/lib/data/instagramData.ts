export interface IgItem {
  id: string;
  type: "reel" | "post";
  category: "combat" | "streetwear" | "shipments" | "reels";
  client: string;
  clientHandle: string;
  clientCountry: string;
  mediaUrl: string;
  videoUrl?: string;
  carouselImages?: string[];
  views?: string;
  likes: number;
  comments: number;
  timestamp: string;
  audioTitle?: string;
  caption: string;
  hashtags: string[];
  specs: {
    materials: string;
    technique: string;
    batchSize: string;
    leadTime: string;
    destination: string;
  };
  featured?: boolean;
  permalink?: string;
}

export const STORY_HIGHLIGHTS = [
  { title: "Boxing OEM", icon: "🥊", posts: "420+" },
  { title: "Embroidery", icon: "🧵", posts: "180+" },
  { title: "Dispatches", icon: "📦", posts: "350+" },
  { title: "Fight Night", icon: "🏆", posts: "95+" },
  { title: "Factory Tour", icon: "🏭", posts: "60+" },
  { title: "MMA & BJJ", icon: "🥋", posts: "210+" },
  { title: "Fleece Sets", icon: "👕", posts: "290+" },
];

export const FALLBACK_INSTAGRAM_ITEMS: IgItem[] = [
  {
    id: "ig-01",
    type: "reel",
    category: "reels",
    client: "Apex Combat UK",
    clientHandle: "@apexcombat.uk",
    clientCountry: "🇬🇧 London, United Kingdom",
    mediaUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/varsity-jacket-hero.mp4",
    views: "54.8K",
    likes: 3120,
    comments: 142,
    timestamp: "2 days ago",
    audioTitle: "GLOVES STORM • Factory Sound FX",
    caption:
      "Batch delivery for @apexcombat.uk championship bout series. Custom 16oz metallic champagne gold sparring gloves crafted from 1.2mm AAA-grade full-grain cowhide leather. Engineered with our calibrated 4-layer EVA/latex knuckle matrix for professional hand security.",
    hashtags: ["#boxinggloves", "#fightgear", "#customgloves", "#sialkotmanufacturing", "#oemfactory", "#apexcombat"],
    specs: {
      materials: "1.2mm AAA Cowhide Leather + 4-Layer Latex/EVA Sandwich",
      technique: "Laser Cut Leather + Embossed Metallic Foil Patch",
      batchSize: "1,200 Pairs (14oz & 16oz)",
      leadTime: "16 Business Days",
      destination: "London, United Kingdom (DHL Air Express)",
    },
    featured: true,
    permalink: "https://www.instagram.com/glovesstorm/",
  },
  {
    id: "ig-02",
    type: "post",
    category: "streetwear",
    client: "Aura Apparel Los Angeles",
    clientHandle: "@aura.athletics",
    clientCountry: "🇺🇸 Los Angeles, USA",
    mediaUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    carouselImages: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    ],
    likes: 4210,
    comments: 189,
    timestamp: "4 days ago",
    caption:
      "Private-label tracksuit collection finished for @aura.athletics California drop. Custom milled 460 GSM combed cotton French Terry with vintage acid mineral enzyme wash, finished with 3D high-density silicone typography and double-stitched kangaroo pocket.",
    hashtags: ["#streetwearmanufacturing", "#heavyweightfleece", "#acidwash", "#cutandsew", "#privatelabel", "#losangeles"],
    specs: {
      materials: "460 GSM 100% Combed Cotton Heavyweight French Terry",
      technique: "Custom Pigment Enzyme Wash + 3D Puff Silicone Print",
      batchSize: "2,500 Units (Hoodies & Flared Sweatpants)",
      leadTime: "21 Business Days",
      destination: "Los Angeles, CA (Direct Sea Freight)",
    },
    featured: true,
    permalink: "https://www.instagram.com/glovesstorm/",
  },
  {
    id: "ig-03",
    type: "reel",
    category: "combat",
    client: "Vanquish Fight Club",
    clientHandle: "@vanquishfight",
    clientCountry: "🇦🇺 Melbourne, Australia",
    mediaUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    views: "92.4K",
    likes: 5890,
    comments: 267,
    timestamp: "6 days ago",
    audioTitle: "Tajima 12-Needle Industrial Embroidery Beat",
    caption:
      "Precision in motion on our Tajima 12-needle computerized embroidery machines. 22,000 stitches of metallic Japanese bullion thread stitched onto heavy satin fight trunks. No thread snaps, no distortion, zero puckering.",
    hashtags: ["#embroidery", "#tajima", "#fightshorts", "#customfightwear", "#muaythai", "#boxingtrunk"],
    specs: {
      materials: "Ultra-heavy Poly-Satin with stretch crotch panel",
      technique: "22K Stitches Gold Bullion Embroidery + Sublimated Trim",
      batchSize: "600 Pairs",
      leadTime: "12 Business Days",
      destination: "Melbourne, Australia (Air Cargo)",
    },
    permalink: "https://www.instagram.com/glovesstorm/",
  },
  {
    id: "ig-04",
    type: "post",
    category: "combat",
    client: "Championship Bout Manchester",
    clientHandle: "@probox.promotions",
    clientCountry: "🇬🇧 Manchester, UK",
    mediaUrl: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1200&auto=format&fit=crop",
    carouselImages: [
      "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
    ],
    likes: 2780,
    comments: 98,
    timestamp: "1 week ago",
    caption:
      "Official BBBofC certified 10oz horsehair & closed-cell foam fight gloves engineered for this Saturday's title match. Laser-calibrated weight balance accurate to within 1.5 grams per hand. Hand-stitched thumb-lock safety geometry.",
    hashtags: ["#championshipfight", "#proboxing", "#horsehairgloves", "#titlefight", "#glovesstorm"],
    specs: {
      materials: "Hand-Selected Premium Cowhide + Natural Horsehair / EVA",
      technique: "Anatomical Pre-curved Fist Mould + Silk Screen Foiling",
      batchSize: "50 Official Fight Pairs + 200 Custom Merch Pairs",
      leadTime: "10 Business Days",
      destination: "Manchester Arena, United Kingdom",
    },
    permalink: "https://www.instagram.com/glovesstorm/",
  },
  {
    id: "ig-05",
    type: "reel",
    category: "shipments",
    client: "Ironclad Gyms International",
    clientHandle: "@ironclad.gear",
    clientCountry: "🇺🇸 Miami, Florida, USA",
    mediaUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    views: "38.1K",
    likes: 2150,
    comments: 73,
    timestamp: "1 week ago",
    audioTitle: "GLOVES STORM Logistics Hub Sialkot",
    caption:
      "Friday export dispatch routine! 1,800 custom boxed boxing equipment sets palletized, wrapped, and loaded for direct air express dispatch to Miami. Every carton individually barcoded with client SKU and QC inspection stamp.",
    hashtags: ["#factorydispatch", "#exportshipping", "#sialkotexport", "#dhlfreight", "#bulkmanufacturing"],
    specs: {
      materials: "Export-grade double-corrugated cartons + shrink wrap pallets",
      technique: "Barcode tracking + Individual custom frosted slider packaging",
      batchSize: "1,800 Full Boxing Sets",
      leadTime: "Dispatched on schedule",
      destination: "Miami, Florida, USA",
    },
    permalink: "https://www.instagram.com/glovesstorm/",
  },
  {
    id: "ig-06",
    type: "post",
    category: "streetwear",
    client: "Syndicate 90 Berlin",
    clientHandle: "@syndicate.berlin",
    clientCountry: "🇩🇪 Berlin, Germany",
    mediaUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
    carouselImages: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
    ],
    likes: 3840,
    comments: 156,
    timestamp: "2 weeks ago",
    caption:
      "Ultra-heavy 320 GSM single jersey boxy streetwear tees with custom distressed collar distressing and rear plastisol discharge print. Built with wide dropped shoulders and high-ribbed tight collar as requested by Berlin label.",
    hashtags: ["#heavyweighttee", "#oversizedtee", "#berlinfashion", "#cutandsew", "#dischargeprint"],
    specs: {
      materials: "320 GSM 100% Combed Compact Ring-spun Cotton",
      technique: "Discharge Screen Print + Vintage Mineral Wash",
      batchSize: "3,000 Tees across 4 colorways",
      leadTime: "18 Business Days",
      destination: "Berlin, Germany (Air Cargo)",
    },
    permalink: "https://www.instagram.com/glovesstorm/",
  },
  {
    id: "ig-07",
    type: "reel",
    category: "combat",
    client: "Valkyrie Martial Arts",
    clientHandle: "@valkyrie.mma",
    clientCountry: "🇳🇴 Oslo, Norway",
    mediaUrl: "https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=1200&auto=format&fit=crop",
    views: "67.3K",
    likes: 4120,
    comments: 133,
    timestamp: "2 weeks ago",
    audioTitle: "GLOVES STORM • Leather Precision Studio",
    caption:
      "Full grain matte black buffalo leather sparring set: Headguard with cheek and ear protection, 16oz gloves, and contoured groin guard. Triple hand-stitched nylon thread that withstands heavy daily gym punishment.",
    hashtags: ["#headguard", "#sparringset", "#buffaloleather", "#custommma", "#fightwearoem"],
    specs: {
      materials: "Full Grain Buffalo Hide + High-Density Foam Laminate",
      technique: "Hand-Crafted Stitching + Embossed Leather Crest",
      batchSize: "450 Complete 3-Piece Sets",
      leadTime: "16 Business Days",
      destination: "Oslo, Norway",
    },
    permalink: "https://www.instagram.com/glovesstorm/",
  },
  {
    id: "ig-08",
    type: "post",
    category: "combat",
    client: "Apex Submission Academy",
    clientHandle: "@apex.jiujitsu",
    clientCountry: "🇨🇦 Vancouver, Canada",
    mediaUrl: "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?q=80&w=1200&auto=format&fit=crop",
    likes: 2940,
    comments: 87,
    timestamp: "3 weeks ago",
    caption:
      "No-Gi BJJ collection: Sublimated rashguards and 4-way stretch grappling shorts. Italian eco-solvent inks injected into 240 GSM anti-pilling spandex blend. Flatlock 6-needle seam construction prevents skin chafing.",
    hashtags: ["#bjjrashguard", "#nogi", "#jiujitsu", "#sublimation", "#custombjj", "#mmaapparel"],
    specs: {
      materials: "240 GSM 85% Polyester 15% Spandex Anti-Pilling Blend",
      technique: "Sublimation Heat Transfer (Zero Peeling) + 6-Needle Flatlock",
      batchSize: "800 Rashguards + 800 Grappling Shorts",
      leadTime: "14 Business Days",
      destination: "Vancouver, BC, Canada",
    },
    permalink: "https://www.instagram.com/glovesstorm/",
  },
  {
    id: "ig-09",
    type: "reel",
    category: "shipments",
    client: "Nordic Shield FC",
    clientHandle: "@nordicshield.fc",
    clientCountry: "🇸🇪 Stockholm, Sweden",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    views: "44.6K",
    likes: 2890,
    comments: 61,
    timestamp: "3 weeks ago",
    audioTitle: "GLOVES STORM Quality Control Check",
    caption:
      "Final QC inspection on 1,500 tournament match kits before export packing. Every seam inspected under 1,000-lumen inspection lamps. Heat-sealed silicone club crests tested under 5-bar pull resistance.",
    hashtags: ["#teamwear", "#soccerjersey", "#customkit", "#qualitycontrol", "#sialkotfactory"],
    specs: {
      materials: "160 GSM Jacquard Moisture-Wicking Aero-Poly",
      technique: "Laser Cut Ventilation + 3D Molded Silicone Crests",
      batchSize: "1,500 Match Kits",
      leadTime: "15 Business Days",
      destination: "Stockholm, Sweden",
    },
    permalink: "https://www.instagram.com/glovesstorm/",
  },
];

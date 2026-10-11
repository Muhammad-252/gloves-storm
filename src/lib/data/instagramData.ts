export interface IgItem {
  id: string;
  type: "reel" | "post";
  category: "teamwear" | "activewear" | "streetwear" | "shipments" | "reels";
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
  { title: "Teamwear OEM", icon: "⚽", posts: "420+" },
  { title: "Embroidery", icon: "🧵", posts: "180+" },
  { title: "Dispatches", icon: "📦", posts: "350+" },
  { title: "Activewear", icon: "🏃", posts: "310+" },
  { title: "Factory Tour", icon: "🏭", posts: "60+" },
  { title: "Sublimation", icon: "🎨", posts: "240+" },
  { title: "Fleece Sets", icon: "👕", posts: "290+" },
];

export const FALLBACK_INSTAGRAM_ITEMS: IgItem[] = [
  {
    id: "ig-01",
    type: "reel",
    category: "reels",
    client: "Thunderbirds Athletics USA",
    clientHandle: "@thunderbirds.athletics",
    clientCountry: "🇺🇸 Austin, Texas, USA",
    mediaUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "/videos/varsity-jacket-hero.mp4",
    views: "64.2K",
    likes: 3820,
    comments: 174,
    timestamp: "2 days ago",
    audioTitle: "GLOVES STORM • Factory Sound FX",
    caption:
      "Batch delivery for @thunderbirds.athletics championship season. Custom American football & basketball uniform capsules crafted with Italian dye sublimation and heavy Dazzle shoulder yokes. Engineered for collegiate durability.",
    hashtags: ["#teamuniforms", "#customsportswear", "#footballuniforms", "#sublimationjersey", "#sialkotmanufacturing", "#oemfactory"],
    specs: {
      materials: "280 GSM Dazzle Polyester + 4-Way Poly-Spandex Rib",
      technique: "Italian Dye Sublimation + Tackle Twill Embroidered Numbers",
      batchSize: "850 Complete Match Kits",
      leadTime: "14 Business Days",
      destination: "Austin, Texas, USA (FedEx DDP Air)",
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
    category: "activewear",
    client: "Elevate Active UK",
    clientHandle: "@elevateactive.uk",
    clientCountry: "🇬🇧 Manchester, United Kingdom",
    mediaUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    views: "78.4K",
    likes: 5120,
    comments: 214,
    timestamp: "5 days ago",
    audioTitle: "GLOVES STORM • 4-Needle Flatlock Assembly",
    caption:
      "Private-label activewear line for @elevateactive.uk. Zero-sheer 280 GSM nylon-spandex seamless leggings and high-impact sports bras. Custom dyed in custom Pantone shades with heat-sealed reflective silicone branding.",
    hashtags: ["#activewearmanufacturer", "#gymwearoem", "#privatelabelactivewear", "#leggingsfactory", "#squatproof"],
    specs: {
      materials: "280 GSM 75% Polyamide 25% Elastane 4-Way Stretch",
      technique: "6-Thread Flatlock Stitching + High-Density Silicone Transfer",
      batchSize: "1,400 Sets (Leggings + Sports Bras)",
      leadTime: "15 Business Days",
      destination: "Manchester, United Kingdom (DHL Air Express)",
    },
    permalink: "https://www.instagram.com/glovesstorm/",
  },
  {
    id: "ig-04",
    type: "post",
    category: "teamwear",
    client: "Midwest Premier Basketball League",
    clientHandle: "@midwest.hoops",
    clientCountry: "🇺🇸 Chicago, Illinois, USA",
    mediaUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
    carouselImages: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    ],
    likes: 3180,
    comments: 112,
    timestamp: "1 week ago",
    caption:
      "Full custom basketball jerseys and shorts for Chicago league tournament. 180 GSM Micro-Birdseye polyester with moisture-wicking and anti-static treatment. Laser-cut ventilation patterns with rib knit collar trims.",
    hashtags: ["#basketballuniforms", "#customjerseys", "#teamwearoem", "#sublimationsportswear", "#chicagosports"],
    specs: {
      materials: "180 GSM Micro-Birdseye Poly + Sublimated Striped Rib",
      technique: "Dye Sublimation + Double-Ply Reversible Construction",
      batchSize: "640 Reversible Basketball Kits",
      leadTime: "11 Business Days",
      destination: "Chicago, IL, USA",
    },
    permalink: "https://www.instagram.com/glovesstorm/",
  },
  {
    id: "ig-05",
    type: "reel",
    category: "shipments",
    client: "Empire Athletics Global",
    clientHandle: "@empire.apparel",
    clientCountry: "🇺🇸 Miami, Florida, USA",
    mediaUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    views: "42.1K",
    likes: 2450,
    comments: 86,
    timestamp: "1 week ago",
    audioTitle: "GLOVES STORM Logistics Hub Sialkot",
    caption:
      "Friday export dispatch routine! 2,200 custom boxed sportswear and streetwear sets palletized, wrapped, and loaded for direct air express dispatch to Miami. Every carton individually barcoded with client SKU and QC inspection stamp.",
    hashtags: ["#factorydispatch", "#exportshipping", "#sialkotexport", "#dhlfreight", "#bulkmanufacturing", "#customclothing"],
    specs: {
      materials: "Export-grade double-corrugated cartons + shrink wrap pallets",
      technique: "Barcode tracking + Individual custom frosted slider packaging",
      batchSize: "2,200 Custom Sets",
      leadTime: "Dispatched on schedule",
      destination: "Miami, Florida, USA (DDP Freight)",
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
    category: "activewear",
    client: "Velocity Gym Labs",
    clientHandle: "@velocity.gymlabs",
    clientCountry: "🇦🇺 Sydney, Australia",
    mediaUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    views: "53.8K",
    likes: 3740,
    comments: 122,
    timestamp: "2 weeks ago",
    audioTitle: "GLOVES STORM • Athletic Compression Lab",
    caption:
      "Performance compression wear line: Graduated compression tights and long-sleeve base layers with antibacterial silver-ion thread. Reinforced ergonomic seams and jacquard branded waistband.",
    hashtags: ["#compressionwear", "#gymwearmanufacturer", "#privatelabelgym", "#workoutclothes", "#sydneyfitness"],
    specs: {
      materials: "260 GSM Poly-Spandex with Micro-Fleece Brushed Backing",
      technique: "Ergonomic Flatlock Seams + Jacquard Woven Elastic",
      batchSize: "750 Compression Units",
      leadTime: "14 Business Days",
      destination: "Sydney, NSW, Australia",
    },
    permalink: "https://www.instagram.com/glovesstorm/",
  },
  {
    id: "ig-08",
    type: "post",
    category: "teamwear",
    client: "Pacific Athletic Club",
    clientHandle: "@pacific.athletic",
    clientCountry: "🇨🇦 Vancouver, Canada",
    mediaUrl: "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=1200&auto=format&fit=crop",
    likes: 2940,
    comments: 87,
    timestamp: "3 weeks ago",
    caption:
      "Custom soccer kits and track jackets: Full sublimation soccer jerseys paired with waterproof bonded ripstop travel tracksuits. Precision heat-sealed club crests and zip pockets.",
    hashtags: ["#teamwearmanufacturer", "#soccerkits", "#sublimationsportswear", "#customtracksuits", "#vancouver"],
    specs: {
      materials: "160 GSM Aero-Poly + 220 GSM Bonded Ripstop Poly",
      technique: "Sublimation Heat Transfer + Waterproof Bonded Zippers",
      batchSize: "900 Complete Club Kits",
      leadTime: "16 Business Days",
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

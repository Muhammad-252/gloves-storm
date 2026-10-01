import {
  Category,
  Product,
  Project,
  Testimonial,
  BlogPost,
  Inquiry,
  SiteSettings,
} from "@/types/database";

export const initialCategories: Category[] = [
  {
    "id": "a0000001-0000-0000-0000-000000000001",
    "name": "Boxing Equipment",
    "slug": "boxing-equipment",
    "description": "Handcrafted professional competition gloves, sparring gloves, MMA gear, headguards, and heavy punching bags manufactured in Sialkot, Pakistan.",
    "image_url": "/images/products/boxing-gloves-black.png",
    "parent_id": null,
    "sort_order": 1,
    "is_active": true,
    "featured_in_menu": true,
    "menu_badge": "Most Popular",
    "created_at": "2026-09-14T14:02:09.584Z",
    "updated_at": "2026-09-14T14:02:09.584Z"
  },
  {
    "id": "a0000001-0000-0000-0000-000000000002",
    "name": "Sportswear & Teamwear",
    "slug": "sportswear-teamwear",
    "description": "Custom basketball uniforms, American football jerseys, soccer kits, tracksuits, and high-performance athletic teamwear for clubs and brands worldwide.",
    "image_url": "/images/products/basketball-uniform.jpg",
    "parent_id": null,
    "sort_order": 2,
    "is_active": true,
    "featured_in_menu": true,
    "menu_badge": "OEM Leader",
    "created_at": "2026-09-14T14:02:09.584Z",
    "updated_at": "2026-09-14T14:02:09.584Z"
  },
  {
    "id": "a0000001-0000-0000-0000-000000000003",
    "name": "Gym & Fitness Wear",
    "slug": "gym-fitness-wear",
    "description": "High-tensile compression wear, moisture-wicking tees, sports bras, seamless gym leggings, and performance athleisure apparel engineered for training.",
    "image_url": "/images/products/gym-leggings.jpg",
    "parent_id": null,
    "sort_order": 3,
    "is_active": true,
    "featured_in_menu": true,
    "menu_badge": "High Demand",
    "created_at": "2026-09-14T14:02:09.584Z",
    "updated_at": "2026-09-14T14:02:09.584Z"
  },
  {
    "id": "a0000001-0000-0000-0000-000000000004",
    "name": "Clothing & Streetwear",
    "slug": "clothing-streetwear",
    "description": "Heavyweight 450+ GSM hoodies, boxy oversized tees, varsity jackets, cargo pants, and luxury streetwear cut-and-sew silhouettes.",
    "image_url": "/images/products/hoodie-black.png",
    "parent_id": null,
    "sort_order": 4,
    "is_active": true,
    "featured_in_menu": true,
    "menu_badge": "Luxury OEM",
    "created_at": "2026-09-14T14:02:09.584Z",
    "updated_at": "2026-09-14T14:02:09.584Z"
  },
  {
    "id": "a0000001-0000-0000-0000-000000000005",
    "name": "Custom Manufacturing & Private Label",
    "slug": "custom-manufacturing-private-label",
    "description": "Turnkey OEM and private label services: technical tech pack prototyping, Italian Kiian sublimation, Tajima embroidery, custom packaging, and low MOQ production.",
    "image_url": "/images/products/luxury-packaging.jpg",
    "parent_id": null,
    "sort_order": 5,
    "is_active": true,
    "created_at": "2026-09-14T14:02:09.584Z",
    "updated_at": "2026-09-14T14:02:09.584Z"
  },
  {
    "id": "a0000001-0000-0000-0000-000000000006",
    "name": "Swimwear & Beachwear",
    "slug": "swimwear-beachwear",
    "description": "Quick-drying board shorts, UPF 50+ rash guards, chlorine-resistant one-piece swimsuits, bikinis, and luxury resort apparel made for performance.",
    "image_url": "/images/products/board-shorts.jpg",
    "parent_id": null,
    "sort_order": 6,
    "is_active": true,
    "created_at": "2026-09-14T14:02:09.584Z",
    "updated_at": "2026-09-14T14:02:09.584Z"
  }
];

export const initialProducts: Product[] = [
  {
    "id": "b0000001-0000-0000-0000-000000000001",
    "name": "Custom Boxing Gloves",
    "slug": "custom-boxing-gloves",
    "category_id": "a0000001-0000-0000-0000-000000000001",
    "short_description": "Custom Boxing Gloves for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Boxing Gloves engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Full-Grain Cowhide Leather",
      "Reinforced Microfiber",
      "5-Ply Layered Latex Padding",
      "Satin Moisture-Wicking Lining"
    ],
    "features": [
      "IMF Injection Molded Core",
      "Dual-Channel Wrist Support",
      "Thumb-Lock Safety Feature",
      "Triple-Stitched Seams"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": true,
    "is_active": true,
    "sample_price": 45.00,
    "show_pricing": true,
    "pricing_tiers": [
      { "min_quantity": 1, "max_quantity": 49, "unit_price": 45.00, "label": "Sample (1 pc)" },
      { "min_quantity": 50, "max_quantity": 499, "unit_price": 22.50, "label": "MOQ Tier" },
      { "min_quantity": 500, "max_quantity": 999, "unit_price": 17.00, "label": "Volume Deal" },
      { "min_quantity": 1000, "max_quantity": null, "unit_price": 13.50, "label": "Enterprise Bulk" }
    ],
    "seo_title": "Custom Boxing Gloves | GLOVES STORM",
    "seo_description": "Custom Boxing Gloves for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.611Z",
    "updated_at": "2026-09-14T14:02:04.611Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000001",
      "name": "Boxing Equipment",
      "slug": "boxing-equipment",
      "description": "Handcrafted professional competition gloves, sparring gloves, MMA gear, headguards, and heavy punching bags manufactured in Sialkot, Pakistan.",
      "image_url": "/images/products/boxing-gloves-black.png",
      "parent_id": null,
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.611Z",
      "updated_at": "2026-09-14T14:02:04.611Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000010001",
        "product_id": "b0000001-0000-0000-0000-000000000001",
        "image_url": "/images/products/boxing-gloves-black.png",
        "alt_text": "Custom Boxing Gloves — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.610Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000010002",
        "product_id": "b0000001-0000-0000-0000-000000000001",
        "image_url": "/images/products/boxing-gloves-red.png",
        "alt_text": "Custom Boxing Gloves — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000010003",
        "product_id": "b0000001-0000-0000-0000-000000000001",
        "image_url": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Boxing Gloves — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000010004",
        "product_id": "b0000001-0000-0000-0000-000000000001",
        "image_url": "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Boxing Gloves — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000002",
    "name": "Custom Training Boxing Gloves",
    "slug": "custom-training-boxing-gloves",
    "category_id": "a0000001-0000-0000-0000-000000000001",
    "short_description": "Custom Training Boxing Gloves for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Training Boxing Gloves engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Engineered PU Leather",
      "Multi-Layered EVA Foam",
      "Breathable Palm Mesh",
      "Quick-Dry Anti-Bacterial Lining"
    ],
    "features": [
      "Hook-and-Loop Wrap Closure",
      "High Impact Shock Dispersion",
      "Ventilated Palm Holes",
      "Reinforced Thumb Webbing"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Custom Training Boxing Gloves | GLOVES STORM",
    "seo_description": "Custom Training Boxing Gloves for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.611Z",
    "updated_at": "2026-09-14T14:02:04.611Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000001",
      "name": "Boxing Equipment",
      "slug": "boxing-equipment",
      "description": "Handcrafted professional competition gloves, sparring gloves, MMA gear, headguards, and heavy punching bags manufactured in Sialkot, Pakistan.",
      "image_url": "/images/products/boxing-gloves-black.png",
      "parent_id": null,
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.611Z",
      "updated_at": "2026-09-14T14:02:04.611Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000020001",
        "product_id": "b0000001-0000-0000-0000-000000000002",
        "image_url": "/images/products/boxing-gloves-red.png",
        "alt_text": "Custom Training Boxing Gloves — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000020002",
        "product_id": "b0000001-0000-0000-0000-000000000002",
        "image_url": "/images/products/boxing-gloves-black.png",
        "alt_text": "Custom Training Boxing Gloves — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000020003",
        "product_id": "b0000001-0000-0000-0000-000000000002",
        "image_url": "/images/products/boxing-focuspads.jpg",
        "alt_text": "Custom Training Boxing Gloves — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000020004",
        "product_id": "b0000001-0000-0000-0000-000000000002",
        "image_url": "https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Training Boxing Gloves — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000003",
    "name": "Custom Sparring Gloves",
    "slug": "custom-sparring-gloves",
    "category_id": "a0000001-0000-0000-0000-000000000001",
    "short_description": "Custom Sparring Gloves for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Sparring Gloves engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Premium Matte Cowhide",
      "Quad-Layer Foam Matrix",
      "Orthopedic Sponge Foam",
      "Soft Nylon Taffeta Lining"
    ],
    "features": [
      "Extra Knuckle Protection",
      "Padded Wrist & Forearm Cuff",
      "Ergonomic Hand Contouring",
      "Reinforced Wrist Splints"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Sparring Gloves | GLOVES STORM",
    "seo_description": "Custom Sparring Gloves for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.611Z",
    "updated_at": "2026-09-14T14:02:04.611Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000001",
      "name": "Boxing Equipment",
      "slug": "boxing-equipment",
      "description": "Handcrafted professional competition gloves, sparring gloves, MMA gear, headguards, and heavy punching bags manufactured in Sialkot, Pakistan.",
      "image_url": "/images/products/boxing-gloves-black.png",
      "parent_id": null,
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.611Z",
      "updated_at": "2026-09-14T14:02:04.611Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000030001",
        "product_id": "b0000001-0000-0000-0000-000000000003",
        "image_url": "/images/products/boxing-gloves-black.png",
        "alt_text": "Custom Sparring Gloves — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000030002",
        "product_id": "b0000001-0000-0000-0000-000000000003",
        "image_url": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Sparring Gloves — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000030003",
        "product_id": "b0000001-0000-0000-0000-000000000003",
        "image_url": "/images/products/boxing-gloves-red.png",
        "alt_text": "Custom Sparring Gloves — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000030004",
        "product_id": "b0000001-0000-0000-0000-000000000003",
        "image_url": "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Sparring Gloves — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000004",
    "name": "Custom MMA Gloves",
    "slug": "custom-mma-gloves",
    "category_id": "a0000001-0000-0000-0000-000000000001",
    "short_description": "Custom MMA Gloves for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom MMA Gloves engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Full-Grain Leather or Synthetic Matte",
      "Contoured Gel Padding",
      "Pre-Curved Ergonomic Finger Loops",
      "D-Ring Hook & Loop Strap"
    ],
    "features": [
      "Open-Palm Grappling Dexterity",
      "Dual-Wrap Wrist Support",
      "Individual Segmented Knuckle Guards",
      "Reinforced Bar-Tack Stitching"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom MMA Gloves | GLOVES STORM",
    "seo_description": "Custom MMA Gloves for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.611Z",
    "updated_at": "2026-09-14T14:02:04.611Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000001",
      "name": "Boxing Equipment",
      "slug": "boxing-equipment",
      "description": "Handcrafted professional competition gloves, sparring gloves, MMA gear, headguards, and heavy punching bags manufactured in Sialkot, Pakistan.",
      "image_url": "/images/products/boxing-gloves-black.png",
      "parent_id": null,
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.611Z",
      "updated_at": "2026-09-14T14:02:04.611Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000040001",
        "product_id": "b0000001-0000-0000-0000-000000000004",
        "image_url": "/images/products/boxing-mma-gloves.jpg",
        "alt_text": "Custom MMA Gloves — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000040002",
        "product_id": "b0000001-0000-0000-0000-000000000004",
        "image_url": "/images/products/boxing-mma-gloves.jpg",
        "alt_text": "Custom MMA Gloves — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000040003",
        "product_id": "b0000001-0000-0000-0000-000000000004",
        "image_url": "/images/products/boxing-shinguards.jpg",
        "alt_text": "Custom MMA Gloves — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000040004",
        "product_id": "b0000001-0000-0000-0000-000000000004",
        "image_url": "/images/products/boxing-handwraps.jpg",
        "alt_text": "Custom MMA Gloves — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000005",
    "name": "Custom Kickboxing Gloves",
    "slug": "custom-kickboxing-gloves",
    "category_id": "a0000001-0000-0000-0000-000000000001",
    "short_description": "Custom Kickboxing Gloves for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Kickboxing Gloves engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Industrial Grade Microfiber",
      "High-Density Foam Core",
      "Satin Internal Lining",
      "Padded Edge Blockers"
    ],
    "features": [
      "Lateral Palm Padding for Kick Blocking",
      "Wide Elastic Wrist Strap",
      "Thumb Attachment Lock",
      "Sweat-Resistant Finish"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Kickboxing Gloves | GLOVES STORM",
    "seo_description": "Custom Kickboxing Gloves for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.611Z",
    "updated_at": "2026-09-14T14:02:04.611Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000001",
      "name": "Boxing Equipment",
      "slug": "boxing-equipment",
      "description": "Handcrafted professional competition gloves, sparring gloves, MMA gear, headguards, and heavy punching bags manufactured in Sialkot, Pakistan.",
      "image_url": "/images/products/boxing-gloves-black.png",
      "parent_id": null,
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.611Z",
      "updated_at": "2026-09-14T14:02:04.611Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000050001",
        "product_id": "b0000001-0000-0000-0000-000000000005",
        "image_url": "/images/products/boxing-gloves-red.png",
        "alt_text": "Custom Kickboxing Gloves — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000050002",
        "product_id": "b0000001-0000-0000-0000-000000000005",
        "image_url": "/images/products/boxing-gloves-black.png",
        "alt_text": "Custom Kickboxing Gloves — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000050003",
        "product_id": "b0000001-0000-0000-0000-000000000005",
        "image_url": "/images/products/boxing-shinguards.jpg",
        "alt_text": "Custom Kickboxing Gloves — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000050004",
        "product_id": "b0000001-0000-0000-0000-000000000005",
        "image_url": "https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Kickboxing Gloves — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000006",
    "name": "Custom Muay Thai Gloves",
    "slug": "custom-muay-thai-gloves",
    "category_id": "a0000001-0000-0000-0000-000000000001",
    "short_description": "Custom Muay Thai Gloves for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Muay Thai Gloves engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Top-Grade Cowhide Leather",
      "Multi-Layered Latex Core",
      "Reinforced Palm Slits",
      "Contoured Padded Cuff"
    ],
    "features": [
      "Shorter Cuff for Clinch Flexibility",
      "Reinforced Outer Fist Padding",
      "Moisture-Repellent Satin",
      "Authentic Thai Profile"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Muay Thai Gloves | GLOVES STORM",
    "seo_description": "Custom Muay Thai Gloves for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.611Z",
    "updated_at": "2026-09-14T14:02:04.611Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000001",
      "name": "Boxing Equipment",
      "slug": "boxing-equipment",
      "description": "Handcrafted professional competition gloves, sparring gloves, MMA gear, headguards, and heavy punching bags manufactured in Sialkot, Pakistan.",
      "image_url": "/images/products/boxing-gloves-black.png",
      "parent_id": null,
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.611Z",
      "updated_at": "2026-09-14T14:02:04.611Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000060001",
        "product_id": "b0000001-0000-0000-0000-000000000006",
        "image_url": "/images/products/boxing-gloves-black.png",
        "alt_text": "Custom Muay Thai Gloves — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000060002",
        "product_id": "b0000001-0000-0000-0000-000000000006",
        "image_url": "/images/products/boxing-gloves-red.png",
        "alt_text": "Custom Muay Thai Gloves — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000060003",
        "product_id": "b0000001-0000-0000-0000-000000000006",
        "image_url": "/images/products/boxing-shinguards.jpg",
        "alt_text": "Custom Muay Thai Gloves — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000060004",
        "product_id": "b0000001-0000-0000-0000-000000000006",
        "image_url": "/images/products/boxing-focuspads.jpg",
        "alt_text": "Custom Muay Thai Gloves — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000007",
    "name": "Custom Boxing Head Guards",
    "slug": "custom-boxing-head-guards",
    "category_id": "a0000001-0000-0000-0000-000000000001",
    "short_description": "Custom Boxing Head Guards for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Boxing Head Guards engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Premium Genuine Leather",
      "Multi-Layer EVA & Sponge Foam",
      "Non-Slip Microfiber Inner",
      "Reinforced Cheek Bumpers"
    ],
    "features": [
      "360-Degree Cranial Protection",
      "Lace-Up Crown Adjustment",
      "Padded Ear Openings",
      "Contoured Chin Strap"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Boxing Head Guards | GLOVES STORM",
    "seo_description": "Custom Boxing Head Guards for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.611Z",
    "updated_at": "2026-09-14T14:02:04.611Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000001",
      "name": "Boxing Equipment",
      "slug": "boxing-equipment",
      "description": "Handcrafted professional competition gloves, sparring gloves, MMA gear, headguards, and heavy punching bags manufactured in Sialkot, Pakistan.",
      "image_url": "/images/products/boxing-gloves-black.png",
      "parent_id": null,
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.611Z",
      "updated_at": "2026-09-14T14:02:04.611Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000070001",
        "product_id": "b0000001-0000-0000-0000-000000000007",
        "image_url": "/images/products/boxing-headguard.jpg",
        "alt_text": "Custom Boxing Head Guards — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000070002",
        "product_id": "b0000001-0000-0000-0000-000000000007",
        "image_url": "/images/products/boxing-headguard.jpg",
        "alt_text": "Custom Boxing Head Guards — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000070003",
        "product_id": "b0000001-0000-0000-0000-000000000007",
        "image_url": "/images/products/boxing-gloves-black.png",
        "alt_text": "Custom Boxing Head Guards — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000070004",
        "product_id": "b0000001-0000-0000-0000-000000000007",
        "image_url": "/images/products/boxing-shinguards.jpg",
        "alt_text": "Custom Boxing Head Guards — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000008",
    "name": "Custom Boxing Hand Wraps",
    "slug": "custom-boxing-hand-wraps",
    "category_id": "a0000001-0000-0000-0000-000000000001",
    "short_description": "Custom Boxing Hand Wraps for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Boxing Hand Wraps engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Semi-Elastic Mexican Style Cotton Blend",
      "Reinforced Thumb Loop",
      "Heavy-Duty Hook & Loop Closure",
      "Woven Brand Patch"
    ],
    "features": [
      "180-inch (4.5m) Professional Length",
      "Optimal Breathability & Stretch",
      "Colorfast Washable Dyes",
      "Anti-Fray Edges"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 100,
    "lead_time": "1-2 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Boxing Hand Wraps | GLOVES STORM",
    "seo_description": "Custom Boxing Hand Wraps for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.611Z",
    "updated_at": "2026-09-14T14:02:04.611Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000001",
      "name": "Boxing Equipment",
      "slug": "boxing-equipment",
      "description": "Handcrafted professional competition gloves, sparring gloves, MMA gear, headguards, and heavy punching bags manufactured in Sialkot, Pakistan.",
      "image_url": "/images/products/boxing-gloves-black.png",
      "parent_id": null,
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.611Z",
      "updated_at": "2026-09-14T14:02:04.611Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000080001",
        "product_id": "b0000001-0000-0000-0000-000000000008",
        "image_url": "/images/products/boxing-handwraps.jpg",
        "alt_text": "Custom Boxing Hand Wraps — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000080002",
        "product_id": "b0000001-0000-0000-0000-000000000008",
        "image_url": "/images/products/boxing-handwraps.jpg",
        "alt_text": "Custom Boxing Hand Wraps — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000080003",
        "product_id": "b0000001-0000-0000-0000-000000000008",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Custom Boxing Hand Wraps — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000080004",
        "product_id": "b0000001-0000-0000-0000-000000000008",
        "image_url": "/images/products/boxing-gloves-black.png",
        "alt_text": "Custom Boxing Hand Wraps — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000009",
    "name": "Custom Boxing Shin Guards",
    "slug": "custom-boxing-shin-guards",
    "category_id": "a0000001-0000-0000-0000-000000000001",
    "short_description": "Custom Boxing Shin Guards for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Boxing Shin Guards engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Matte Synthetic Leather",
      "Dual-Layer High Density Shock Foam",
      "Neoprene Foot Loop",
      "Dual Hook & Loop Calf Straps"
    ],
    "features": [
      "Instep Anatomic Contour",
      "Zero-Shift Anti-Slip Lining",
      "Dual Hook-and-Loop Shin Fit",
      "Reinforced Strike Ridge"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Boxing Shin Guards | GLOVES STORM",
    "seo_description": "Custom Boxing Shin Guards for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.611Z",
    "updated_at": "2026-09-14T14:02:04.611Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000001",
      "name": "Boxing Equipment",
      "slug": "boxing-equipment",
      "description": "Handcrafted professional competition gloves, sparring gloves, MMA gear, headguards, and heavy punching bags manufactured in Sialkot, Pakistan.",
      "image_url": "/images/products/boxing-gloves-black.png",
      "parent_id": null,
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.611Z",
      "updated_at": "2026-09-14T14:02:04.611Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000090001",
        "product_id": "b0000001-0000-0000-0000-000000000009",
        "image_url": "/images/products/boxing-shinguards.jpg",
        "alt_text": "Custom Boxing Shin Guards — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000090002",
        "product_id": "b0000001-0000-0000-0000-000000000009",
        "image_url": "/images/products/boxing-shinguards.jpg",
        "alt_text": "Custom Boxing Shin Guards — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000090003",
        "product_id": "b0000001-0000-0000-0000-000000000009",
        "image_url": "/images/products/boxing-headguard.jpg",
        "alt_text": "Custom Boxing Shin Guards — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000090004",
        "product_id": "b0000001-0000-0000-0000-000000000009",
        "image_url": "/images/products/boxing-mma-gloves.jpg",
        "alt_text": "Custom Boxing Shin Guards — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000010",
    "name": "Custom Focus Pads",
    "slug": "custom-focus-pads",
    "category_id": "a0000001-0000-0000-0000-000000000001",
    "short_description": "Custom Focus Pads for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Focus Pads engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Heavyweight Cowhide or Engineered PU",
      "Layered Gel & Micro-Foam",
      "Ball-Grip Palm Ergonomics",
      "Padded Wrist Wedge"
    ],
    "features": [
      "Curved Strike Target",
      "Finger Protection Hood",
      "Trainer Wrist Wedge",
      "Contrast Target Dot Printing"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Focus Pads | GLOVES STORM",
    "seo_description": "Custom Focus Pads for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.611Z",
    "updated_at": "2026-09-14T14:02:04.611Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000001",
      "name": "Boxing Equipment",
      "slug": "boxing-equipment",
      "description": "Handcrafted professional competition gloves, sparring gloves, MMA gear, headguards, and heavy punching bags manufactured in Sialkot, Pakistan.",
      "image_url": "/images/products/boxing-gloves-black.png",
      "parent_id": null,
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.611Z",
      "updated_at": "2026-09-14T14:02:04.611Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000100001",
        "product_id": "b0000001-0000-0000-0000-000000000010",
        "image_url": "/images/products/boxing-focuspads.jpg",
        "alt_text": "Custom Focus Pads — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000100002",
        "product_id": "b0000001-0000-0000-0000-000000000010",
        "image_url": "/images/products/boxing-focuspads.jpg",
        "alt_text": "Custom Focus Pads — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000100003",
        "product_id": "b0000001-0000-0000-0000-000000000010",
        "image_url": "/images/products/boxing-gloves-black.png",
        "alt_text": "Custom Focus Pads — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000100004",
        "product_id": "b0000001-0000-0000-0000-000000000010",
        "image_url": "/images/products/boxing-gloves-red.png",
        "alt_text": "Custom Focus Pads — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000011",
    "name": "Custom Kick Pads",
    "slug": "custom-kick-pads",
    "category_id": "a0000001-0000-0000-0000-000000000001",
    "short_description": "Custom Kick Pads for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Kick Pads engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Military-Grade Ripstop Vinyl or Leather",
      "Compressed Multi-Density Bonded Foam",
      "Riveted Handle System",
      "Reinforced Forearm Straps"
    ],
    "features": [
      "Impact-Absorbing Core",
      "Heavy-Duty Riveted Handles",
      "Buckle Locking Straps",
      "Twin Air Release Valves"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 30,
    "lead_time": "2-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Kick Pads | GLOVES STORM",
    "seo_description": "Custom Kick Pads for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.611Z",
    "updated_at": "2026-09-14T14:02:04.611Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000001",
      "name": "Boxing Equipment",
      "slug": "boxing-equipment",
      "description": "Handcrafted professional competition gloves, sparring gloves, MMA gear, headguards, and heavy punching bags manufactured in Sialkot, Pakistan.",
      "image_url": "/images/products/boxing-gloves-black.png",
      "parent_id": null,
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.611Z",
      "updated_at": "2026-09-14T14:02:04.611Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000110001",
        "product_id": "b0000001-0000-0000-0000-000000000011",
        "image_url": "/images/products/boxing-focuspads.jpg",
        "alt_text": "Custom Kick Pads — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000110002",
        "product_id": "b0000001-0000-0000-0000-000000000011",
        "image_url": "/images/products/boxing-shinguards.jpg",
        "alt_text": "Custom Kick Pads — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000110003",
        "product_id": "b0000001-0000-0000-0000-000000000011",
        "image_url": "/images/products/boxing-heavybag.jpg",
        "alt_text": "Custom Kick Pads — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000110004",
        "product_id": "b0000001-0000-0000-0000-000000000011",
        "image_url": "/images/products/boxing-gloves-black.png",
        "alt_text": "Custom Kick Pads — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000012",
    "name": "Custom Punching Bags",
    "slug": "custom-punching-bags",
    "category_id": "a0000001-0000-0000-0000-000000000001",
    "short_description": "Custom Punching Bags for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Punching Bags engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Heavy 1000D Vinyl / Genuine Leather",
      "High-Tensile Hanging Straps",
      "Industrial D-Rings",
      "Reinforced Base Cross-Stitching"
    ],
    "features": [
      "D-Ring Anchor Mounts",
      "Zippered Top Filling Access",
      "Heavy Duty Nylon Webbing",
      "Weather & Tear Proof"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 20,
    "lead_time": "3-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Punching Bags | GLOVES STORM",
    "seo_description": "Custom Punching Bags for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.611Z",
    "updated_at": "2026-09-14T14:02:04.611Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000001",
      "name": "Boxing Equipment",
      "slug": "boxing-equipment",
      "description": "Handcrafted professional competition gloves, sparring gloves, MMA gear, headguards, and heavy punching bags manufactured in Sialkot, Pakistan.",
      "image_url": "/images/products/boxing-gloves-black.png",
      "parent_id": null,
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.611Z",
      "updated_at": "2026-09-14T14:02:04.611Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000120001",
        "product_id": "b0000001-0000-0000-0000-000000000012",
        "image_url": "/images/products/boxing-heavybag.jpg",
        "alt_text": "Custom Punching Bags — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000120002",
        "product_id": "b0000001-0000-0000-0000-000000000012",
        "image_url": "/images/products/boxing-heavybag.jpg",
        "alt_text": "Custom Punching Bags — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000120003",
        "product_id": "b0000001-0000-0000-0000-000000000012",
        "image_url": "/images/products/boxing-gloves-black.png",
        "alt_text": "Custom Punching Bags — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000120004",
        "product_id": "b0000001-0000-0000-0000-000000000012",
        "image_url": "/images/products/boxing-handwraps.jpg",
        "alt_text": "Custom Punching Bags — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000013",
    "name": "Custom Heavy Bags",
    "slug": "custom-heavy-bags",
    "category_id": "a0000001-0000-0000-0000-000000000001",
    "short_description": "Custom Heavy Bags for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Heavy Bags engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Thick Cowhide Grain / Reinforced Tarpaulin",
      "Steel Riveted Chain Attachment",
      "Shock-Dispersing Foam Liner"
    ],
    "features": [
      "4-Way Swivel Chain Kit",
      "Tie-Down Floor Anchor Loop",
      "Balanced Centered Weighting",
      "Commercial Gym Grade"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 15,
    "lead_time": "3-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Heavy Bags | GLOVES STORM",
    "seo_description": "Custom Heavy Bags for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.611Z",
    "updated_at": "2026-09-14T14:02:04.611Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000001",
      "name": "Boxing Equipment",
      "slug": "boxing-equipment",
      "description": "Handcrafted professional competition gloves, sparring gloves, MMA gear, headguards, and heavy punching bags manufactured in Sialkot, Pakistan.",
      "image_url": "/images/products/boxing-gloves-black.png",
      "parent_id": null,
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.611Z",
      "updated_at": "2026-09-14T14:02:04.611Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000130001",
        "product_id": "b0000001-0000-0000-0000-000000000013",
        "image_url": "/images/products/boxing-heavybag.jpg",
        "alt_text": "Custom Heavy Bags — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000130002",
        "product_id": "b0000001-0000-0000-0000-000000000013",
        "image_url": "/images/products/boxing-heavybag.jpg",
        "alt_text": "Custom Heavy Bags — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000130003",
        "product_id": "b0000001-0000-0000-0000-000000000013",
        "image_url": "/images/products/boxing-focuspads.jpg",
        "alt_text": "Custom Heavy Bags — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000130004",
        "product_id": "b0000001-0000-0000-0000-000000000013",
        "image_url": "/images/products/boxing-gloves-red.png",
        "alt_text": "Custom Heavy Bags — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000014",
    "name": "Custom Boxing Equipment Sets",
    "slug": "custom-boxing-equipment-sets",
    "category_id": "a0000001-0000-0000-0000-000000000001",
    "short_description": "Custom Boxing Equipment Sets for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Boxing Equipment Sets engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Matching Cowhide Leather or PU",
      "Complete Gym Kit Packaging",
      "Full Cohesive Colorways"
    ],
    "features": [
      "Gloves + Headguard + Shin Guard Bundle",
      "Coordinated Branding & Colorway",
      "Custom Carry Duffle Bag Included",
      "Full Brand Kit"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 30,
    "lead_time": "3-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Boxing Equipment Sets | GLOVES STORM",
    "seo_description": "Custom Boxing Equipment Sets for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000001",
      "name": "Boxing Equipment",
      "slug": "boxing-equipment",
      "description": "Handcrafted professional competition gloves, sparring gloves, MMA gear, headguards, and heavy punching bags manufactured in Sialkot, Pakistan.",
      "image_url": "/images/products/boxing-gloves-black.png",
      "parent_id": null,
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000140001",
        "product_id": "b0000001-0000-0000-0000-000000000014",
        "image_url": "/images/products/boxing-gloves-black.png",
        "alt_text": "Custom Boxing Equipment Sets — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000140002",
        "product_id": "b0000001-0000-0000-0000-000000000014",
        "image_url": "/images/products/boxing-headguard.jpg",
        "alt_text": "Custom Boxing Equipment Sets — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.611Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000140003",
        "product_id": "b0000001-0000-0000-0000-000000000014",
        "image_url": "/images/products/boxing-shinguards.jpg",
        "alt_text": "Custom Boxing Equipment Sets — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000140004",
        "product_id": "b0000001-0000-0000-0000-000000000014",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Custom Boxing Equipment Sets — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000015",
    "name": "Private Label Boxing Equipment",
    "slug": "private-label-boxing-equipment",
    "category_id": "a0000001-0000-0000-0000-000000000001",
    "short_description": "Private Label Boxing Equipment for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Private Label Boxing Equipment engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Tailored Specification Leathers",
      "Custom Density Foams",
      "Bespoke Hardware & Tags"
    ],
    "features": [
      "End-to-End Prototyping",
      "Full Custom Tooling & Molds",
      "Custom Branded Retail Boxes",
      "Complete Brand Exclusivity"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "3-5 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Private Label Boxing Equipment | GLOVES STORM",
    "seo_description": "Private Label Boxing Equipment for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000001",
      "name": "Boxing Equipment",
      "slug": "boxing-equipment",
      "description": "Handcrafted professional competition gloves, sparring gloves, MMA gear, headguards, and heavy punching bags manufactured in Sialkot, Pakistan.",
      "image_url": "/images/products/boxing-gloves-black.png",
      "parent_id": null,
      "sort_order": 1,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000150001",
        "product_id": "b0000001-0000-0000-0000-000000000015",
        "image_url": "/images/products/boxing-gloves-black.png",
        "alt_text": "Private Label Boxing Equipment — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000150002",
        "product_id": "b0000001-0000-0000-0000-000000000015",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Private Label Boxing Equipment — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000150003",
        "product_id": "b0000001-0000-0000-0000-000000000015",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Private Label Boxing Equipment — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000150004",
        "product_id": "b0000001-0000-0000-0000-000000000015",
        "image_url": "/images/products/boxing-gloves-red.png",
        "alt_text": "Private Label Boxing Equipment — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000016",
    "name": "Custom Basketball Uniforms",
    "slug": "custom-basketball-uniforms",
    "category_id": "a0000001-0000-0000-0000-000000000002",
    "short_description": "Custom Basketball Uniforms for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Basketball Uniforms engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "100% Micro-Mesh Polyester (180 GSM)",
      "Dry-Fit Moisture Wicking Fiber",
      "Ribbed Collar & Armhole Trim"
    ],
    "features": [
      "Reversible or Single Layer Construction",
      "Italian Sublimation Color Infusion",
      "Deep-V or Round Neck Options",
      "Reinforced Overlock Stitching"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Custom Basketball Uniforms | GLOVES STORM",
    "seo_description": "Custom Basketball Uniforms for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000002",
      "name": "Sportswear & Teamwear",
      "slug": "sportswear-teamwear",
      "description": "Custom basketball uniforms, American football jerseys, soccer kits, tracksuits, and high-performance athletic teamwear for clubs and brands worldwide.",
      "image_url": "/images/products/basketball-uniform.jpg",
      "parent_id": null,
      "sort_order": 2,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000160001",
        "product_id": "b0000001-0000-0000-0000-000000000016",
        "image_url": "/images/products/basketball-uniform.jpg",
        "alt_text": "Custom Basketball Uniforms — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000160002",
        "product_id": "b0000001-0000-0000-0000-000000000016",
        "image_url": "/images/products/basketball-uniform.jpg",
        "alt_text": "Custom Basketball Uniforms — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000160003",
        "product_id": "b0000001-0000-0000-0000-000000000016",
        "image_url": "/images/products/football-jersey-black.jpg",
        "alt_text": "Custom Basketball Uniforms — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000160004",
        "product_id": "b0000001-0000-0000-0000-000000000016",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Basketball Uniforms — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000017",
    "name": "Custom American Football Uniforms",
    "slug": "custom-american-football-uniforms",
    "category_id": "a0000001-0000-0000-0000-000000000002",
    "short_description": "Custom American Football Uniforms for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom American Football Uniforms engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Heavy Spandex Body (300 GSM)",
      "Dazzle Cloth Shoulder Yoke",
      "Breathable Stretch Mesh Side Panels"
    ],
    "features": [
      "Pad-Lock Snug Fit Ergonomics",
      "Tackle Twill Number Applique",
      "Elasticized Sleeve Cuffs",
      "Reinforced Bar-Tack Stress Points"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "3-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom American Football Uniforms | GLOVES STORM",
    "seo_description": "Custom American Football Uniforms for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000002",
      "name": "Sportswear & Teamwear",
      "slug": "sportswear-teamwear",
      "description": "Custom basketball uniforms, American football jerseys, soccer kits, tracksuits, and high-performance athletic teamwear for clubs and brands worldwide.",
      "image_url": "/images/products/basketball-uniform.jpg",
      "parent_id": null,
      "sort_order": 2,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000170001",
        "product_id": "b0000001-0000-0000-0000-000000000017",
        "image_url": "/images/products/football-jersey-black.jpg",
        "alt_text": "Custom American Football Uniforms — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000170002",
        "product_id": "b0000001-0000-0000-0000-000000000017",
        "image_url": "/images/products/football-jersey-black.jpg",
        "alt_text": "Custom American Football Uniforms — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000170003",
        "product_id": "b0000001-0000-0000-0000-000000000017",
        "image_url": "/images/products/basketball-uniform.jpg",
        "alt_text": "Custom American Football Uniforms — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000170004",
        "product_id": "b0000001-0000-0000-0000-000000000017",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom American Football Uniforms — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000018",
    "name": "Custom Soccer Kits",
    "slug": "custom-soccer-kits",
    "category_id": "a0000001-0000-0000-0000-000000000002",
    "short_description": "Custom Soccer Kits for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Soccer Kits engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "150 GSM Engineered Jacquard Poly",
      "Aero-Mesh Ventilation Inserts",
      "Comfort Ribbed Crewneck"
    ],
    "features": [
      "Jersey + Shorts + Sock Matching Kit",
      "All-Over Sublimated Vector Graphics",
      "Silicone Club Crest Application",
      "Lightweight Dynamic Movement"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Custom Soccer Kits | GLOVES STORM",
    "seo_description": "Custom Soccer Kits for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000002",
      "name": "Sportswear & Teamwear",
      "slug": "sportswear-teamwear",
      "description": "Custom basketball uniforms, American football jerseys, soccer kits, tracksuits, and high-performance athletic teamwear for clubs and brands worldwide.",
      "image_url": "/images/products/basketball-uniform.jpg",
      "parent_id": null,
      "sort_order": 2,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000180001",
        "product_id": "b0000001-0000-0000-0000-000000000018",
        "image_url": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Soccer Kits — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000180002",
        "product_id": "b0000001-0000-0000-0000-000000000018",
        "image_url": "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Soccer Kits — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000180003",
        "product_id": "b0000001-0000-0000-0000-000000000018",
        "image_url": "/images/products/basketball-uniform.jpg",
        "alt_text": "Custom Soccer Kits — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000180004",
        "product_id": "b0000001-0000-0000-0000-000000000018",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Soccer Kits — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000019",
    "name": "Custom Baseball Uniforms",
    "slug": "custom-baseball-uniforms",
    "category_id": "a0000001-0000-0000-0000-000000000002",
    "short_description": "Custom Baseball Uniforms for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Baseball Uniforms engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "220 GSM Pro-Weight Poly Warp Knit",
      "Authentic Melamine Buttons",
      "Durable Double-Knit Pants Mesh"
    ],
    "features": [
      "Full-Button or 2-Button Placket",
      "Multi-Layer Tackle Twill Lettering",
      "Pro-Inseam Reinforced Knees",
      "Moisture Resistance"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Baseball Uniforms | GLOVES STORM",
    "seo_description": "Custom Baseball Uniforms for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000002",
      "name": "Sportswear & Teamwear",
      "slug": "sportswear-teamwear",
      "description": "Custom basketball uniforms, American football jerseys, soccer kits, tracksuits, and high-performance athletic teamwear for clubs and brands worldwide.",
      "image_url": "/images/products/basketball-uniform.jpg",
      "parent_id": null,
      "sort_order": 2,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000190001",
        "product_id": "b0000001-0000-0000-0000-000000000019",
        "image_url": "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Baseball Uniforms — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000190002",
        "product_id": "b0000001-0000-0000-0000-000000000019",
        "image_url": "/images/products/football-jersey-black.jpg",
        "alt_text": "Custom Baseball Uniforms — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000190003",
        "product_id": "b0000001-0000-0000-0000-000000000019",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Baseball Uniforms — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000190004",
        "product_id": "b0000001-0000-0000-0000-000000000019",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Baseball Uniforms — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000020",
    "name": "Custom Volleyball Uniforms",
    "slug": "custom-volleyball-uniforms",
    "category_id": "a0000001-0000-0000-0000-000000000002",
    "short_description": "Custom Volleyball Uniforms for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Volleyball Uniforms engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "88% Polyester / 12% Spandex Interlock",
      "4-Way High Elasticity Fabric",
      "Anti-Odor Bio-Wash"
    ],
    "features": [
      "Raglan Sleeve Athletic Mobility",
      "Sleeveless or Short-Sleeve Fit",
      "Flatlock Anti-Chafe Seaming",
      "Sublimated Numbers & Names"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Volleyball Uniforms | GLOVES STORM",
    "seo_description": "Custom Volleyball Uniforms for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000002",
      "name": "Sportswear & Teamwear",
      "slug": "sportswear-teamwear",
      "description": "Custom basketball uniforms, American football jerseys, soccer kits, tracksuits, and high-performance athletic teamwear for clubs and brands worldwide.",
      "image_url": "/images/products/basketball-uniform.jpg",
      "parent_id": null,
      "sort_order": 2,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000200001",
        "product_id": "b0000001-0000-0000-0000-000000000020",
        "image_url": "/images/products/basketball-uniform.jpg",
        "alt_text": "Custom Volleyball Uniforms — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000200002",
        "product_id": "b0000001-0000-0000-0000-000000000020",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Volleyball Uniforms — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000200003",
        "product_id": "b0000001-0000-0000-0000-000000000020",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Volleyball Uniforms — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000200004",
        "product_id": "b0000001-0000-0000-0000-000000000020",
        "image_url": "/images/products/football-jersey-black.jpg",
        "alt_text": "Custom Volleyball Uniforms — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000021",
    "name": "Custom Rugby Kits",
    "slug": "custom-rugby-kits",
    "category_id": "a0000001-0000-0000-0000-000000000002",
    "short_description": "Custom Rugby Kits for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Rugby Kits engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "280 GSM Heavy Pro-Lock Polyester",
      "Tear-Resistant Spandex Collar",
      "Reinforced Binding Tapes"
    ],
    "features": [
      "Scrum-Proof Gripper Collar",
      "Reinforced Taped Placket",
      "Anti-Grab Athletic Cut",
      "Sublimated Team Crests"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Rugby Kits | GLOVES STORM",
    "seo_description": "Custom Rugby Kits for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000002",
      "name": "Sportswear & Teamwear",
      "slug": "sportswear-teamwear",
      "description": "Custom basketball uniforms, American football jerseys, soccer kits, tracksuits, and high-performance athletic teamwear for clubs and brands worldwide.",
      "image_url": "/images/products/basketball-uniform.jpg",
      "parent_id": null,
      "sort_order": 2,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000210001",
        "product_id": "b0000001-0000-0000-0000-000000000021",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Rugby Kits — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000210002",
        "product_id": "b0000001-0000-0000-0000-000000000021",
        "image_url": "/images/products/football-jersey-black.jpg",
        "alt_text": "Custom Rugby Kits — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000210003",
        "product_id": "b0000001-0000-0000-0000-000000000021",
        "image_url": "/images/products/basketball-uniform.jpg",
        "alt_text": "Custom Rugby Kits — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000210004",
        "product_id": "b0000001-0000-0000-0000-000000000021",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Rugby Kits — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000022",
    "name": "Custom Cricket Uniforms",
    "slug": "custom-cricket-uniforms",
    "category_id": "a0000001-0000-0000-0000-000000000002",
    "short_description": "Custom Cricket Uniforms for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Cricket Uniforms engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "180 GSM Honeycomb Aerolite Mesh",
      "Polyester Pique Weave",
      "UV Protection Finish"
    ],
    "features": [
      "White Ball Colored T20 Kits",
      "Traditional Test White Polo & Trousers",
      "Ribbed Polo Collar with Placket",
      "Deep Slit Pockets"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Cricket Uniforms | GLOVES STORM",
    "seo_description": "Custom Cricket Uniforms for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000002",
      "name": "Sportswear & Teamwear",
      "slug": "sportswear-teamwear",
      "description": "Custom basketball uniforms, American football jerseys, soccer kits, tracksuits, and high-performance athletic teamwear for clubs and brands worldwide.",
      "image_url": "/images/products/basketball-uniform.jpg",
      "parent_id": null,
      "sort_order": 2,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000220001",
        "product_id": "b0000001-0000-0000-0000-000000000022",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Cricket Uniforms — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000220002",
        "product_id": "b0000001-0000-0000-0000-000000000022",
        "image_url": "/images/products/basketball-uniform.jpg",
        "alt_text": "Custom Cricket Uniforms — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000220003",
        "product_id": "b0000001-0000-0000-0000-000000000022",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Cricket Uniforms — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000220004",
        "product_id": "b0000001-0000-0000-0000-000000000022",
        "image_url": "/images/products/football-jersey-black.jpg",
        "alt_text": "Custom Cricket Uniforms — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000023",
    "name": "Custom Training Jerseys",
    "slug": "custom-training-jerseys",
    "category_id": "a0000001-0000-0000-0000-000000000002",
    "short_description": "Custom Training Jerseys for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Training Jerseys engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "140 GSM Featherweight Interlock Poly",
      "Micro-Laser Perforated Back",
      "Reflective Transfer Accents"
    ],
    "features": [
      "Drop-Tail Hem Cut",
      "Breathable Venting Zones",
      "High Stretch Athletic Recovery",
      "Screen Print or Sublimation Ready"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Training Jerseys | GLOVES STORM",
    "seo_description": "Custom Training Jerseys for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000002",
      "name": "Sportswear & Teamwear",
      "slug": "sportswear-teamwear",
      "description": "Custom basketball uniforms, American football jerseys, soccer kits, tracksuits, and high-performance athletic teamwear for clubs and brands worldwide.",
      "image_url": "/images/products/basketball-uniform.jpg",
      "parent_id": null,
      "sort_order": 2,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000230001",
        "product_id": "b0000001-0000-0000-0000-000000000023",
        "image_url": "/images/products/football-jersey-black.jpg",
        "alt_text": "Custom Training Jerseys — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000230002",
        "product_id": "b0000001-0000-0000-0000-000000000023",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Training Jerseys — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000230003",
        "product_id": "b0000001-0000-0000-0000-000000000023",
        "image_url": "/images/products/basketball-uniform.jpg",
        "alt_text": "Custom Training Jerseys — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000230004",
        "product_id": "b0000001-0000-0000-0000-000000000023",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Training Jerseys — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000024",
    "name": "Custom Sports Shorts",
    "slug": "custom-sports-shorts",
    "category_id": "a0000001-0000-0000-0000-000000000002",
    "short_description": "Custom Sports Shorts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Sports Shorts engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "4-Way Stretch Poly/Elastane (160 GSM)",
      "Internal Breathable Compression Liner",
      "Water-Repellent Coating"
    ],
    "features": [
      "Concealed Zipper Pockets",
      "Elastic Drawcord Waistband",
      "Side Split Mobility Hem",
      "Custom Embroidered or Printed Logo"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Sports Shorts | GLOVES STORM",
    "seo_description": "Custom Sports Shorts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000002",
      "name": "Sportswear & Teamwear",
      "slug": "sportswear-teamwear",
      "description": "Custom basketball uniforms, American football jerseys, soccer kits, tracksuits, and high-performance athletic teamwear for clubs and brands worldwide.",
      "image_url": "/images/products/basketball-uniform.jpg",
      "parent_id": null,
      "sort_order": 2,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000240001",
        "product_id": "b0000001-0000-0000-0000-000000000024",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Sports Shorts — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000240002",
        "product_id": "b0000001-0000-0000-0000-000000000024",
        "image_url": "/images/products/basketball-uniform.jpg",
        "alt_text": "Custom Sports Shorts — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000240003",
        "product_id": "b0000001-0000-0000-0000-000000000024",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Sports Shorts — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000240004",
        "product_id": "b0000001-0000-0000-0000-000000000024",
        "image_url": "/images/products/basketball-uniform.jpg",
        "alt_text": "Custom Sports Shorts — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000025",
    "name": "Custom Compression Wear",
    "slug": "custom-compression-wear",
    "category_id": "a0000001-0000-0000-0000-000000000002",
    "short_description": "Custom Compression Wear for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Compression Wear engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "82% High-Grade Nylon / 18% Elastane (240 GSM)",
      "Thermal Moisture Management Yarn"
    ],
    "features": [
      "Graduated Muscular Compression",
      "6-Needle Flatlock Stitching",
      "Anti-Chafe Ergonomic Panels",
      "Silicone Hem Grip Strip"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Compression Wear | GLOVES STORM",
    "seo_description": "Custom Compression Wear for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000002",
      "name": "Sportswear & Teamwear",
      "slug": "sportswear-teamwear",
      "description": "Custom basketball uniforms, American football jerseys, soccer kits, tracksuits, and high-performance athletic teamwear for clubs and brands worldwide.",
      "image_url": "/images/products/basketball-uniform.jpg",
      "parent_id": null,
      "sort_order": 2,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000250001",
        "product_id": "b0000001-0000-0000-0000-000000000025",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Compression Wear — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000250002",
        "product_id": "b0000001-0000-0000-0000-000000000025",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Compression Wear — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000250003",
        "product_id": "b0000001-0000-0000-0000-000000000025",
        "image_url": "/images/products/boxing-mma-gloves.jpg",
        "alt_text": "Custom Compression Wear — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000250004",
        "product_id": "b0000001-0000-0000-0000-000000000025",
        "image_url": "/images/products/basketball-uniform.jpg",
        "alt_text": "Custom Compression Wear — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000026",
    "name": "Custom Tracksuits",
    "slug": "custom-tracksuits",
    "category_id": "a0000001-0000-0000-0000-000000000002",
    "short_description": "Custom Tracksuits for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Tracksuits engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Polyester Tricot Matte or Shiny",
      "Cotton Poly French Terry",
      "Heavy-Duty YKK Full Zipper"
    ],
    "features": [
      "Ribbed Cuffs & Hem",
      "Matching Jacket and Slim Tapered Pants",
      "Custom Piping & Contrast Panels",
      "Zip Pockets on Jacket & Bottoms"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Custom Tracksuits | GLOVES STORM",
    "seo_description": "Custom Tracksuits for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000002",
      "name": "Sportswear & Teamwear",
      "slug": "sportswear-teamwear",
      "description": "Custom basketball uniforms, American football jerseys, soccer kits, tracksuits, and high-performance athletic teamwear for clubs and brands worldwide.",
      "image_url": "/images/products/basketball-uniform.jpg",
      "parent_id": null,
      "sort_order": 2,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000260001",
        "product_id": "b0000001-0000-0000-0000-000000000026",
        "image_url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Tracksuits — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000260002",
        "product_id": "b0000001-0000-0000-0000-000000000026",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Tracksuits — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000260003",
        "product_id": "b0000001-0000-0000-0000-000000000026",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Tracksuits — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000260004",
        "product_id": "b0000001-0000-0000-0000-000000000026",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Tracksuits — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000027",
    "name": "Custom Warm-Up Suits",
    "slug": "custom-warm-up-suits",
    "category_id": "a0000001-0000-0000-0000-000000000002",
    "short_description": "Custom Warm-Up Suits for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Warm-Up Suits engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Water-Resistant Ripstop Polyester Shell",
      "Lightweight Mesh Interior Lining",
      "Reflective 3M Piping"
    ],
    "features": [
      "Windproof & Water Repellent",
      "Ankle Zippers for Easy Shoe Removal",
      "High Stand-Up Wind Collar",
      "Elastic Cuffs"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Warm-Up Suits | GLOVES STORM",
    "seo_description": "Custom Warm-Up Suits for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000002",
      "name": "Sportswear & Teamwear",
      "slug": "sportswear-teamwear",
      "description": "Custom basketball uniforms, American football jerseys, soccer kits, tracksuits, and high-performance athletic teamwear for clubs and brands worldwide.",
      "image_url": "/images/products/basketball-uniform.jpg",
      "parent_id": null,
      "sort_order": 2,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000270001",
        "product_id": "b0000001-0000-0000-0000-000000000027",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Warm-Up Suits — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000270002",
        "product_id": "b0000001-0000-0000-0000-000000000027",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Warm-Up Suits — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000270003",
        "product_id": "b0000001-0000-0000-0000-000000000027",
        "image_url": "/images/products/football-jersey-black.jpg",
        "alt_text": "Custom Warm-Up Suits — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000270004",
        "product_id": "b0000001-0000-0000-0000-000000000027",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Warm-Up Suits — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000028",
    "name": "Custom Team Jackets",
    "slug": "custom-team-jackets",
    "category_id": "a0000001-0000-0000-0000-000000000002",
    "short_description": "Custom Team Jackets for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Team Jackets engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Softshell Poly with Bonded Polar Fleece",
      "Waterproof Breathable Membrane (8000mm)",
      "Gunmetal Metal Snaps / YKK Zippers"
    ],
    "features": [
      "Articulated Elbow Paneling",
      "Adjustable Drawcord Hem",
      "Interior Media Pocket",
      "Chest & Back Team Embroidery"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "3-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Team Jackets | GLOVES STORM",
    "seo_description": "Custom Team Jackets for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000002",
      "name": "Sportswear & Teamwear",
      "slug": "sportswear-teamwear",
      "description": "Custom basketball uniforms, American football jerseys, soccer kits, tracksuits, and high-performance athletic teamwear for clubs and brands worldwide.",
      "image_url": "/images/products/basketball-uniform.jpg",
      "parent_id": null,
      "sort_order": 2,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000280001",
        "product_id": "b0000001-0000-0000-0000-000000000028",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Team Jackets — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000280002",
        "product_id": "b0000001-0000-0000-0000-000000000028",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Team Jackets — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000280003",
        "product_id": "b0000001-0000-0000-0000-000000000028",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Custom Team Jackets — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000280004",
        "product_id": "b0000001-0000-0000-0000-000000000028",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Team Jackets — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000029",
    "name": "Custom Training Wear",
    "slug": "custom-training-wear",
    "category_id": "a0000001-0000-0000-0000-000000000002",
    "short_description": "Custom Training Wear for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Training Wear engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Blended Polyester Spandex Active Knit",
      "Silver Ion Anti-Microbial Finish",
      "Four-Way Flexibility"
    ],
    "features": [
      "Athletic Slim Cut",
      "Odor Resistant Technology",
      "Flatlock Seams for Friction Reduction",
      "Custom Heat Seal Branding"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Training Wear | GLOVES STORM",
    "seo_description": "Custom Training Wear for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000002",
      "name": "Sportswear & Teamwear",
      "slug": "sportswear-teamwear",
      "description": "Custom basketball uniforms, American football jerseys, soccer kits, tracksuits, and high-performance athletic teamwear for clubs and brands worldwide.",
      "image_url": "/images/products/basketball-uniform.jpg",
      "parent_id": null,
      "sort_order": 2,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000290001",
        "product_id": "b0000001-0000-0000-0000-000000000029",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Training Wear — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000290002",
        "product_id": "b0000001-0000-0000-0000-000000000029",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Training Wear — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000290003",
        "product_id": "b0000001-0000-0000-0000-000000000029",
        "image_url": "/images/products/basketball-uniform.jpg",
        "alt_text": "Custom Training Wear — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000290004",
        "product_id": "b0000001-0000-0000-0000-000000000029",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Training Wear — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000030",
    "name": "Private Label Teamwear",
    "slug": "private-label-teamwear",
    "category_id": "a0000001-0000-0000-0000-000000000002",
    "short_description": "Private Label Teamwear for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Private Label Teamwear engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Full Custom Fabric Milling",
      "Proprietary Blends & Colors",
      "Custom Neck Tapes & Poly Bags"
    ],
    "features": [
      "Bespoke Cut & Sew Patterns",
      "Exclusive Club Numbering Systems",
      "Custom Silicon & 3D Badges",
      "Global Distribution Packaging"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "3-5 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Private Label Teamwear | GLOVES STORM",
    "seo_description": "Private Label Teamwear for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000002",
      "name": "Sportswear & Teamwear",
      "slug": "sportswear-teamwear",
      "description": "Custom basketball uniforms, American football jerseys, soccer kits, tracksuits, and high-performance athletic teamwear for clubs and brands worldwide.",
      "image_url": "/images/products/basketball-uniform.jpg",
      "parent_id": null,
      "sort_order": 2,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000300001",
        "product_id": "b0000001-0000-0000-0000-000000000030",
        "image_url": "/images/products/basketball-uniform.jpg",
        "alt_text": "Private Label Teamwear — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000300002",
        "product_id": "b0000001-0000-0000-0000-000000000030",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Private Label Teamwear — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000300003",
        "product_id": "b0000001-0000-0000-0000-000000000030",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Private Label Teamwear — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000300004",
        "product_id": "b0000001-0000-0000-0000-000000000030",
        "image_url": "/images/products/football-jersey-black.jpg",
        "alt_text": "Private Label Teamwear — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000031",
    "name": "Custom Gym T-Shirts",
    "slug": "custom-gym-t-shirts",
    "category_id": "a0000001-0000-0000-0000-000000000003",
    "short_description": "Custom Gym T-Shirts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Gym T-Shirts engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "95% Combed Ringspun Cotton / 5% Spandex (190 GSM)",
      "Pre-Shrunk Enzyme Silicone Wash"
    ],
    "features": [
      "Fitted Upper Body with Tapered Waist",
      "Slight Scallop Scoop Hem",
      "Non-Chafe Heat Transfer Neck Tag",
      "Durable Screen Print or High Density Print"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Custom Gym T-Shirts | GLOVES STORM",
    "seo_description": "Custom Gym T-Shirts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000003",
      "name": "Gym & Fitness Wear",
      "slug": "gym-fitness-wear",
      "description": "High-tensile compression wear, moisture-wicking tees, sports bras, seamless gym leggings, and performance athleisure apparel engineered for training.",
      "image_url": "/images/products/gym-leggings.jpg",
      "parent_id": null,
      "sort_order": 3,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000310001",
        "product_id": "b0000001-0000-0000-0000-000000000031",
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Gym T-Shirts — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000310002",
        "product_id": "b0000001-0000-0000-0000-000000000031",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Gym T-Shirts — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000310003",
        "product_id": "b0000001-0000-0000-0000-000000000031",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Gym T-Shirts — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000310004",
        "product_id": "b0000001-0000-0000-0000-000000000031",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Gym T-Shirts — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000032",
    "name": "Custom Gym Shorts",
    "slug": "custom-gym-shorts",
    "category_id": "a0000001-0000-0000-0000-000000000003",
    "short_description": "Custom Gym Shorts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Gym Shorts engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "4-Way Stretch Poly Spandex (180 GSM)",
      "Soft Breathable Knit Inner Liner",
      "Matte Drawstring Eyelets"
    ],
    "features": [
      "5-inch or 7-inch Inseam Lengths",
      "Concealed Phone Zipper Pocket",
      "Towel Loop in Back Waistband",
      "Reflective Brand Accent"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Gym Shorts | GLOVES STORM",
    "seo_description": "Custom Gym Shorts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000003",
      "name": "Gym & Fitness Wear",
      "slug": "gym-fitness-wear",
      "description": "High-tensile compression wear, moisture-wicking tees, sports bras, seamless gym leggings, and performance athleisure apparel engineered for training.",
      "image_url": "/images/products/gym-leggings.jpg",
      "parent_id": null,
      "sort_order": 3,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000320001",
        "product_id": "b0000001-0000-0000-0000-000000000032",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Gym Shorts — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000320002",
        "product_id": "b0000001-0000-0000-0000-000000000032",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Gym Shorts — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000320003",
        "product_id": "b0000001-0000-0000-0000-000000000032",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Gym Shorts — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000320004",
        "product_id": "b0000001-0000-0000-0000-000000000032",
        "image_url": "/images/products/basketball-uniform.jpg",
        "alt_text": "Custom Gym Shorts — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000033",
    "name": "Custom Gym Leggings",
    "slug": "custom-gym-leggings",
    "category_id": "a0000001-0000-0000-0000-000000000003",
    "short_description": "Custom Gym Leggings for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Gym Leggings engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "75% Nylon / 25% Spandex (260 GSM)",
      "Ultra-Soft Butter Touch Fabric",
      "Interlock Squat-Proof Knitting"
    ],
    "features": [
      "High-Waisted Compressive Band",
      "Zero Front Center Seam (Anti-Camel)",
      "Reinforced Triangular Gusset",
      "Seamless Aesthetic"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Custom Gym Leggings | GLOVES STORM",
    "seo_description": "Custom Gym Leggings for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000003",
      "name": "Gym & Fitness Wear",
      "slug": "gym-fitness-wear",
      "description": "High-tensile compression wear, moisture-wicking tees, sports bras, seamless gym leggings, and performance athleisure apparel engineered for training.",
      "image_url": "/images/products/gym-leggings.jpg",
      "parent_id": null,
      "sort_order": 3,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000330001",
        "product_id": "b0000001-0000-0000-0000-000000000033",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Gym Leggings — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000330002",
        "product_id": "b0000001-0000-0000-0000-000000000033",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Gym Leggings — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000330003",
        "product_id": "b0000001-0000-0000-0000-000000000033",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Gym Leggings — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000330004",
        "product_id": "b0000001-0000-0000-0000-000000000033",
        "image_url": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Gym Leggings — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000034",
    "name": "Custom Sports Bras",
    "slug": "custom-sports-bras",
    "category_id": "a0000001-0000-0000-0000-000000000003",
    "short_description": "Custom Sports Bras for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Sports Bras engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "High-Impact Double Layer Nylon Elastane (280 GSM)",
      "Removable Molded Foam Cups",
      "Branded Jacquard Elastic Band"
    ],
    "features": [
      "Racerback or Cross-Strap Support",
      "Medium-to-High Support Level",
      "Chafe-Free Bonded Edge Seams",
      "Custom Silicone Branding"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Sports Bras | GLOVES STORM",
    "seo_description": "Custom Sports Bras for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000003",
      "name": "Gym & Fitness Wear",
      "slug": "gym-fitness-wear",
      "description": "High-tensile compression wear, moisture-wicking tees, sports bras, seamless gym leggings, and performance athleisure apparel engineered for training.",
      "image_url": "/images/products/gym-leggings.jpg",
      "parent_id": null,
      "sort_order": 3,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000340001",
        "product_id": "b0000001-0000-0000-0000-000000000034",
        "image_url": "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Sports Bras — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000340002",
        "product_id": "b0000001-0000-0000-0000-000000000034",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Sports Bras — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000340003",
        "product_id": "b0000001-0000-0000-0000-000000000034",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Sports Bras — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000340004",
        "product_id": "b0000001-0000-0000-0000-000000000034",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Sports Bras — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000035",
    "name": "Custom Tank Tops",
    "slug": "custom-tank-tops",
    "category_id": "a0000001-0000-0000-0000-000000000003",
    "short_description": "Custom Tank Tops for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Tank Tops engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Tri-Blend Cotton Poly Rayon (160 GSM)",
      "Ribbed Neck & Arm Binding",
      "Silky Lightweight Drape"
    ],
    "features": [
      "Stringer or Athletic Standard Cut",
      "Deep Drop Armholes for Lat Clearance",
      "Reinforced Seam Bindings",
      "Screen Print Ready"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Tank Tops | GLOVES STORM",
    "seo_description": "Custom Tank Tops for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000003",
      "name": "Gym & Fitness Wear",
      "slug": "gym-fitness-wear",
      "description": "High-tensile compression wear, moisture-wicking tees, sports bras, seamless gym leggings, and performance athleisure apparel engineered for training.",
      "image_url": "/images/products/gym-leggings.jpg",
      "parent_id": null,
      "sort_order": 3,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000350001",
        "product_id": "b0000001-0000-0000-0000-000000000035",
        "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Tank Tops — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000350002",
        "product_id": "b0000001-0000-0000-0000-000000000035",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Tank Tops — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000350003",
        "product_id": "b0000001-0000-0000-0000-000000000035",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Tank Tops — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000350004",
        "product_id": "b0000001-0000-0000-0000-000000000035",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Tank Tops — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000036",
    "name": "Custom Crop Tops",
    "slug": "custom-crop-tops",
    "category_id": "a0000001-0000-0000-0000-000000000003",
    "short_description": "Custom Crop Tops for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Crop Tops engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Soft Ribbed Cotton Spandex / Performance Nylon (220 GSM)",
      "Pre-Washed Anti-Shrink Treatment"
    ],
    "features": [
      "Form-Fitting Midriff Cut",
      "High Crew or Scoop Neck",
      "Thumbhole Long Sleeve Options",
      "Custom Rubber Label Hem"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Crop Tops | GLOVES STORM",
    "seo_description": "Custom Crop Tops for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000003",
      "name": "Gym & Fitness Wear",
      "slug": "gym-fitness-wear",
      "description": "High-tensile compression wear, moisture-wicking tees, sports bras, seamless gym leggings, and performance athleisure apparel engineered for training.",
      "image_url": "/images/products/gym-leggings.jpg",
      "parent_id": null,
      "sort_order": 3,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000360001",
        "product_id": "b0000001-0000-0000-0000-000000000036",
        "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Crop Tops — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000360002",
        "product_id": "b0000001-0000-0000-0000-000000000036",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Crop Tops — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000360003",
        "product_id": "b0000001-0000-0000-0000-000000000036",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Crop Tops — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000360004",
        "product_id": "b0000001-0000-0000-0000-000000000036",
        "image_url": "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Crop Tops — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000037",
    "name": "Custom Compression Shirts",
    "slug": "custom-compression-shirts",
    "category_id": "a0000001-0000-0000-0000-000000000003",
    "short_description": "Custom Compression Shirts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Compression Shirts engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "85% Poly / 15% Spandex (220 GSM)",
      "Aero-Mesh Underarm Panels",
      "4-Way High Tensile Knit"
    ],
    "features": [
      "Second-Skin Ergonomic Compressive Fit",
      "Targeted Blood Flow Support",
      "Flatlock Seam Stitching",
      "Sublimated or Heat Transfer Logos"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Compression Shirts | GLOVES STORM",
    "seo_description": "Custom Compression Shirts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000003",
      "name": "Gym & Fitness Wear",
      "slug": "gym-fitness-wear",
      "description": "High-tensile compression wear, moisture-wicking tees, sports bras, seamless gym leggings, and performance athleisure apparel engineered for training.",
      "image_url": "/images/products/gym-leggings.jpg",
      "parent_id": null,
      "sort_order": 3,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000370001",
        "product_id": "b0000001-0000-0000-0000-000000000037",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Compression Shirts — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000370002",
        "product_id": "b0000001-0000-0000-0000-000000000037",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Compression Shirts — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000370003",
        "product_id": "b0000001-0000-0000-0000-000000000037",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Compression Shirts — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000370004",
        "product_id": "b0000001-0000-0000-0000-000000000037",
        "image_url": "/images/products/football-jersey-black.jpg",
        "alt_text": "Custom Compression Shirts — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000038",
    "name": "Custom Compression Shorts",
    "slug": "custom-compression-shorts",
    "category_id": "a0000001-0000-0000-0000-000000000003",
    "short_description": "Custom Compression Shorts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Compression Shorts engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "High Elasticity Nylon Spandex (240 GSM)",
      "Jacquard Custom Branded Elastic Band"
    ],
    "features": [
      "Cup Pocket Insert Optional",
      "Thigh Phone Stash Pocket",
      "Reinforced Crotch Gusset",
      "Non-Rolling Silicone Leg Grips"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Compression Shorts | GLOVES STORM",
    "seo_description": "Custom Compression Shorts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000003",
      "name": "Gym & Fitness Wear",
      "slug": "gym-fitness-wear",
      "description": "High-tensile compression wear, moisture-wicking tees, sports bras, seamless gym leggings, and performance athleisure apparel engineered for training.",
      "image_url": "/images/products/gym-leggings.jpg",
      "parent_id": null,
      "sort_order": 3,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000380001",
        "product_id": "b0000001-0000-0000-0000-000000000038",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Compression Shorts — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000380002",
        "product_id": "b0000001-0000-0000-0000-000000000038",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Compression Shorts — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000380003",
        "product_id": "b0000001-0000-0000-0000-000000000038",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Compression Shorts — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000380004",
        "product_id": "b0000001-0000-0000-0000-000000000038",
        "image_url": "/images/products/basketball-uniform.jpg",
        "alt_text": "Custom Compression Shorts — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000039",
    "name": "Custom Joggers",
    "slug": "custom-joggers",
    "category_id": "a0000001-0000-0000-0000-000000000003",
    "short_description": "Custom Joggers for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Joggers engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "360 GSM Cotton / Polyester Performance Fleece",
      "Ribbed Ankle Cuffs",
      "Heavyweight Flat Drawstrings"
    ],
    "features": [
      "Slim Tapered Athletic Fit",
      "Waterproof Concealed Zip Pockets",
      "Reinforced Knee Panels",
      "High Density Logo Application"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Custom Joggers | GLOVES STORM",
    "seo_description": "Custom Joggers for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000003",
      "name": "Gym & Fitness Wear",
      "slug": "gym-fitness-wear",
      "description": "High-tensile compression wear, moisture-wicking tees, sports bras, seamless gym leggings, and performance athleisure apparel engineered for training.",
      "image_url": "/images/products/gym-leggings.jpg",
      "parent_id": null,
      "sort_order": 3,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000390001",
        "product_id": "b0000001-0000-0000-0000-000000000039",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Joggers — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000390002",
        "product_id": "b0000001-0000-0000-0000-000000000039",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Joggers — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000390003",
        "product_id": "b0000001-0000-0000-0000-000000000039",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Joggers — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000390004",
        "product_id": "b0000001-0000-0000-0000-000000000039",
        "image_url": "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Joggers — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000040",
    "name": "Custom Fitness Hoodies",
    "slug": "custom-fitness-hoodies",
    "category_id": "a0000001-0000-0000-0000-000000000003",
    "short_description": "Custom Fitness Hoodies for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Fitness Hoodies engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "380 GSM Cotton Poly Fleece with Loopback Terry",
      "Double-Layer Contoured Hood",
      "Custom Metal Aglets"
    ],
    "features": [
      "Sleeveless or Long Sleeve Athletic Cut",
      "Raglan Sleeve Construction",
      "Kangaroo Pocket with Secret Phone Stash",
      "Embroidered Brand Identity"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Fitness Hoodies | GLOVES STORM",
    "seo_description": "Custom Fitness Hoodies for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000003",
      "name": "Gym & Fitness Wear",
      "slug": "gym-fitness-wear",
      "description": "High-tensile compression wear, moisture-wicking tees, sports bras, seamless gym leggings, and performance athleisure apparel engineered for training.",
      "image_url": "/images/products/gym-leggings.jpg",
      "parent_id": null,
      "sort_order": 3,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000400001",
        "product_id": "b0000001-0000-0000-0000-000000000040",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Fitness Hoodies — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000400002",
        "product_id": "b0000001-0000-0000-0000-000000000040",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Fitness Hoodies — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000400003",
        "product_id": "b0000001-0000-0000-0000-000000000040",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Fitness Hoodies — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000400004",
        "product_id": "b0000001-0000-0000-0000-000000000040",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Fitness Hoodies — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000041",
    "name": "Custom Gym Tracksuits",
    "slug": "custom-gym-tracksuits",
    "category_id": "a0000001-0000-0000-0000-000000000003",
    "short_description": "Custom Gym Tracksuits for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Gym Tracksuits engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Scuba Interlock Tech Fabric (320 GSM)",
      "Matte Surface Finish",
      "Rubberized YKK Zippers"
    ],
    "features": [
      "Athletic Fitted Silhouette",
      "Matching Full-Zip Top & Cuffed Pants",
      "Ergonomic Articulated Paneling",
      "High-End Luxury Gym Look"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "3-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Gym Tracksuits | GLOVES STORM",
    "seo_description": "Custom Gym Tracksuits for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000003",
      "name": "Gym & Fitness Wear",
      "slug": "gym-fitness-wear",
      "description": "High-tensile compression wear, moisture-wicking tees, sports bras, seamless gym leggings, and performance athleisure apparel engineered for training.",
      "image_url": "/images/products/gym-leggings.jpg",
      "parent_id": null,
      "sort_order": 3,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000410001",
        "product_id": "b0000001-0000-0000-0000-000000000041",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Gym Tracksuits — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000410002",
        "product_id": "b0000001-0000-0000-0000-000000000041",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Gym Tracksuits — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000410003",
        "product_id": "b0000001-0000-0000-0000-000000000041",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Gym Tracksuits — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000410004",
        "product_id": "b0000001-0000-0000-0000-000000000041",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Gym Tracksuits — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000042",
    "name": "Custom Performance Tees",
    "slug": "custom-performance-tees",
    "category_id": "a0000001-0000-0000-0000-000000000003",
    "short_description": "Custom Performance Tees for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Performance Tees engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "100% Recycled Poly Yarn (150 GSM)",
      "Airflow Micro-Pique Knit",
      "Quick-Dry Moisture Transmit"
    ],
    "features": [
      "Anti-Chafe Forward Shoulder Seams",
      "Split Hem for Range of Motion",
      "Subtle Reflective Elements",
      "Silk Screen or Rubber Patch Branding"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Performance Tees | GLOVES STORM",
    "seo_description": "Custom Performance Tees for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000003",
      "name": "Gym & Fitness Wear",
      "slug": "gym-fitness-wear",
      "description": "High-tensile compression wear, moisture-wicking tees, sports bras, seamless gym leggings, and performance athleisure apparel engineered for training.",
      "image_url": "/images/products/gym-leggings.jpg",
      "parent_id": null,
      "sort_order": 3,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000420001",
        "product_id": "b0000001-0000-0000-0000-000000000042",
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Performance Tees — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000420002",
        "product_id": "b0000001-0000-0000-0000-000000000042",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Performance Tees — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000420003",
        "product_id": "b0000001-0000-0000-0000-000000000042",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Performance Tees — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000420004",
        "product_id": "b0000001-0000-0000-0000-000000000042",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Performance Tees — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000043",
    "name": "Custom Fitness Sets",
    "slug": "custom-fitness-sets",
    "category_id": "a0000001-0000-0000-0000-000000000003",
    "short_description": "Custom Fitness Sets for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Fitness Sets engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Seamless Circular Knit Nylon Elastane (280 GSM)",
      "High-Compression Ribbed Texturing"
    ],
    "features": [
      "Matching 2-Piece or 3-Piece Gym Sets",
      "Sports Bra + High Rise Leggings + Shrug",
      "Solid & Acid Wash Dye Options",
      "Bespoke Packaging"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "3-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Fitness Sets | GLOVES STORM",
    "seo_description": "Custom Fitness Sets for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000003",
      "name": "Gym & Fitness Wear",
      "slug": "gym-fitness-wear",
      "description": "High-tensile compression wear, moisture-wicking tees, sports bras, seamless gym leggings, and performance athleisure apparel engineered for training.",
      "image_url": "/images/products/gym-leggings.jpg",
      "parent_id": null,
      "sort_order": 3,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000430001",
        "product_id": "b0000001-0000-0000-0000-000000000043",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Fitness Sets — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000430002",
        "product_id": "b0000001-0000-0000-0000-000000000043",
        "image_url": "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Fitness Sets — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000430003",
        "product_id": "b0000001-0000-0000-0000-000000000043",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Custom Fitness Sets — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000430004",
        "product_id": "b0000001-0000-0000-0000-000000000043",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Fitness Sets — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000044",
    "name": "Custom Athleisure Wear",
    "slug": "custom-athleisure-wear",
    "category_id": "a0000001-0000-0000-0000-000000000003",
    "short_description": "Custom Athleisure Wear for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Athleisure Wear engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Modal Cotton Spandex Luxury Blend (260 GSM)",
      "Double Peached Ultra Soft Hand Feel"
    ],
    "features": [
      "Gym-to-Street Hybrid Silhouette",
      "Clean Minimalist Seaming",
      "Custom Tonal Branding",
      "Custom Silicone Wash Finished"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Athleisure Wear | GLOVES STORM",
    "seo_description": "Custom Athleisure Wear for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000003",
      "name": "Gym & Fitness Wear",
      "slug": "gym-fitness-wear",
      "description": "High-tensile compression wear, moisture-wicking tees, sports bras, seamless gym leggings, and performance athleisure apparel engineered for training.",
      "image_url": "/images/products/gym-leggings.jpg",
      "parent_id": null,
      "sort_order": 3,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000440001",
        "product_id": "b0000001-0000-0000-0000-000000000044",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Athleisure Wear — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000440002",
        "product_id": "b0000001-0000-0000-0000-000000000044",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Athleisure Wear — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000440003",
        "product_id": "b0000001-0000-0000-0000-000000000044",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Athleisure Wear — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000440004",
        "product_id": "b0000001-0000-0000-0000-000000000044",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Athleisure Wear — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000045",
    "name": "Private Label Gym Wear",
    "slug": "private-label-gym-wear",
    "category_id": "a0000001-0000-0000-0000-000000000003",
    "short_description": "Private Label Gym Wear for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Private Label Gym Wear engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Proprietary Mill Knitted Fabrics",
      "Custom Dye House Pantones",
      "Custom Hangtags & Bio-degradable Bags"
    ],
    "features": [
      "Full Brand Line Development",
      "Dedicated Production Lines",
      "Pre-Production Golden Sample Verification",
      "Barcode & Polybag Preparation"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "3-5 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Private Label Gym Wear | GLOVES STORM",
    "seo_description": "Private Label Gym Wear for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000003",
      "name": "Gym & Fitness Wear",
      "slug": "gym-fitness-wear",
      "description": "High-tensile compression wear, moisture-wicking tees, sports bras, seamless gym leggings, and performance athleisure apparel engineered for training.",
      "image_url": "/images/products/gym-leggings.jpg",
      "parent_id": null,
      "sort_order": 3,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000450001",
        "product_id": "b0000001-0000-0000-0000-000000000045",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Private Label Gym Wear — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000450002",
        "product_id": "b0000001-0000-0000-0000-000000000045",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Private Label Gym Wear — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000450003",
        "product_id": "b0000001-0000-0000-0000-000000000045",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Private Label Gym Wear — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000450004",
        "product_id": "b0000001-0000-0000-0000-000000000045",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Private Label Gym Wear — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000046",
    "name": "Custom Oversized T-Shirts",
    "slug": "custom-oversized-t-shirts",
    "category_id": "a0000001-0000-0000-0000-000000000004",
    "short_description": "Custom Oversized T-Shirts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Oversized T-Shirts engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "100% Organic Combed Cotton (240-280 GSM)",
      "1.25-inch Heavy Ribbed Collar",
      "Enzyme Vintage Wash"
    ],
    "features": [
      "Dropped Shoulder Silhouette",
      "Relaxed Boxy Body",
      "Twin-Needle Sleeve & Hem Stitches",
      "Screen, DTG, or Puff Print Friendly"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Custom Oversized T-Shirts | GLOVES STORM",
    "seo_description": "Custom Oversized T-Shirts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000004",
      "name": "Clothing & Streetwear",
      "slug": "clothing-streetwear",
      "description": "Heavyweight 450+ GSM hoodies, boxy oversized tees, varsity jackets, cargo pants, and luxury streetwear cut-and-sew silhouettes.",
      "image_url": "/images/products/hoodie-black.png",
      "parent_id": null,
      "sort_order": 4,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000460001",
        "product_id": "b0000001-0000-0000-0000-000000000046",
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Oversized T-Shirts — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000460002",
        "product_id": "b0000001-0000-0000-0000-000000000046",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Oversized T-Shirts — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000460003",
        "product_id": "b0000001-0000-0000-0000-000000000046",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Oversized T-Shirts — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000460004",
        "product_id": "b0000001-0000-0000-0000-000000000046",
        "image_url": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Oversized T-Shirts — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000047",
    "name": "Custom Boxy T-Shirts",
    "slug": "custom-boxy-t-shirts",
    "category_id": "a0000001-0000-0000-0000-000000000004",
    "short_description": "Custom Boxy T-Shirts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Boxy T-Shirts engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Heavyweight 260 GSM Carded Cotton",
      "Pre-Shrunk Compact Yarn",
      "Thick 32mm Neckband"
    ],
    "features": [
      "Wide Chest with Cropped Streetwear Length",
      "Structured Shoulder Fall",
      "Pre-Shrunk Fabric",
      "Custom Hem & Neck Labels"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Boxy T-Shirts | GLOVES STORM",
    "seo_description": "Custom Boxy T-Shirts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000004",
      "name": "Clothing & Streetwear",
      "slug": "clothing-streetwear",
      "description": "Heavyweight 450+ GSM hoodies, boxy oversized tees, varsity jackets, cargo pants, and luxury streetwear cut-and-sew silhouettes.",
      "image_url": "/images/products/hoodie-black.png",
      "parent_id": null,
      "sort_order": 4,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000470001",
        "product_id": "b0000001-0000-0000-0000-000000000047",
        "image_url": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Boxy T-Shirts — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000470002",
        "product_id": "b0000001-0000-0000-0000-000000000047",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Custom Boxy T-Shirts — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000470003",
        "product_id": "b0000001-0000-0000-0000-000000000047",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Boxy T-Shirts — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000470004",
        "product_id": "b0000001-0000-0000-0000-000000000047",
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Boxy T-Shirts — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000048",
    "name": "Custom Heavyweight T-Shirts",
    "slug": "custom-heavyweight-t-shirts",
    "category_id": "a0000001-0000-0000-0000-000000000004",
    "short_description": "Custom Heavyweight T-Shirts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Heavyweight T-Shirts engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Ultra-Heavy 300 GSM 16-Singles Cotton Jersey",
      "Reinforced Double Stitched Collar"
    ],
    "features": [
      "Substantial Structural Drape",
      "Fade-Resistant Reactive Dyes",
      "Shoulder-to-Shoulder Neck Taping",
      "High Durability"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Custom Heavyweight T-Shirts | GLOVES STORM",
    "seo_description": "Custom Heavyweight T-Shirts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000004",
      "name": "Clothing & Streetwear",
      "slug": "clothing-streetwear",
      "description": "Heavyweight 450+ GSM hoodies, boxy oversized tees, varsity jackets, cargo pants, and luxury streetwear cut-and-sew silhouettes.",
      "image_url": "/images/products/hoodie-black.png",
      "parent_id": null,
      "sort_order": 4,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000480001",
        "product_id": "b0000001-0000-0000-0000-000000000048",
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Heavyweight T-Shirts — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000480002",
        "product_id": "b0000001-0000-0000-0000-000000000048",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Heavyweight T-Shirts — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000480003",
        "product_id": "b0000001-0000-0000-0000-000000000048",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Custom Heavyweight T-Shirts — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000480004",
        "product_id": "b0000001-0000-0000-0000-000000000048",
        "image_url": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Heavyweight T-Shirts — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000049",
    "name": "Custom Hoodies",
    "slug": "custom-hoodies",
    "category_id": "a0000001-0000-0000-0000-000000000004",
    "short_description": "Custom Hoodies for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Hoodies engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "450 GSM Heavy French Terry (100% Cotton)",
      "Double-Layer 4-Piece Ergonomic Hood",
      "Heavy 2x2 Lycra Ribbing"
    ],
    "features": [
      "No Drawstring Minimalist Aesthetic or Heavy Flat Cords",
      "Kangaroo Pocket with Bar-Tack Reinforcement",
      "Seamless Sides / Tubeknit Available",
      "Custom Puff or Chenille Embroidery"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Custom Hoodies | GLOVES STORM",
    "seo_description": "Custom Hoodies for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000004",
      "name": "Clothing & Streetwear",
      "slug": "clothing-streetwear",
      "description": "Heavyweight 450+ GSM hoodies, boxy oversized tees, varsity jackets, cargo pants, and luxury streetwear cut-and-sew silhouettes.",
      "image_url": "/images/products/hoodie-black.png",
      "parent_id": null,
      "sort_order": 4,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000490001",
        "product_id": "b0000001-0000-0000-0000-000000000049",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Hoodies — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000490002",
        "product_id": "b0000001-0000-0000-0000-000000000049",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Hoodies — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000490003",
        "product_id": "b0000001-0000-0000-0000-000000000049",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Hoodies — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000490004",
        "product_id": "b0000001-0000-0000-0000-000000000049",
        "image_url": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Hoodies — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000050",
    "name": "Custom Sweatshirts",
    "slug": "custom-sweatshirts",
    "category_id": "a0000001-0000-0000-0000-000000000004",
    "short_description": "Custom Sweatshirts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Sweatshirts engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "420 GSM Brushed Fleece or Loopback Terry",
      "Chunky Ribbed Crew Collar",
      "Underarm V-Gussets"
    ],
    "features": [
      "Classic Streetwear Relaxed Fit",
      "Twin Needle Topstitching",
      "Custom Garment Wash or Pigment Dye",
      "Custom Woven Neck Labels"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Sweatshirts | GLOVES STORM",
    "seo_description": "Custom Sweatshirts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000004",
      "name": "Clothing & Streetwear",
      "slug": "clothing-streetwear",
      "description": "Heavyweight 450+ GSM hoodies, boxy oversized tees, varsity jackets, cargo pants, and luxury streetwear cut-and-sew silhouettes.",
      "image_url": "/images/products/hoodie-black.png",
      "parent_id": null,
      "sort_order": 4,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000500001",
        "product_id": "b0000001-0000-0000-0000-000000000050",
        "image_url": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Sweatshirts — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000500002",
        "product_id": "b0000001-0000-0000-0000-000000000050",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Sweatshirts — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000500003",
        "product_id": "b0000001-0000-0000-0000-000000000050",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Custom Sweatshirts — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000500004",
        "product_id": "b0000001-0000-0000-0000-000000000050",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Sweatshirts — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000051",
    "name": "Custom Zip-Up Hoodies",
    "slug": "custom-zip-up-hoodies",
    "category_id": "a0000001-0000-0000-0000-000000000004",
    "short_description": "Custom Zip-Up Hoodies for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Zip-Up Hoodies engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "450 GSM French Terry Cotton",
      "Heavy Antique Silver Two-Way YKK Metal Zipper",
      "Overlock Seams"
    ],
    "features": [
      "Two-Way Custom Zipper Puller",
      "Split Front Kangaroo Pockets",
      "Structured Double Lined Hood",
      "Heavy Ribbed Hem"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Zip-Up Hoodies | GLOVES STORM",
    "seo_description": "Custom Zip-Up Hoodies for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000004",
      "name": "Clothing & Streetwear",
      "slug": "clothing-streetwear",
      "description": "Heavyweight 450+ GSM hoodies, boxy oversized tees, varsity jackets, cargo pants, and luxury streetwear cut-and-sew silhouettes.",
      "image_url": "/images/products/hoodie-black.png",
      "parent_id": null,
      "sort_order": 4,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000510001",
        "product_id": "b0000001-0000-0000-0000-000000000051",
        "image_url": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Zip-Up Hoodies — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000510002",
        "product_id": "b0000001-0000-0000-0000-000000000051",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Zip-Up Hoodies — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000510003",
        "product_id": "b0000001-0000-0000-0000-000000000051",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Zip-Up Hoodies — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000510004",
        "product_id": "b0000001-0000-0000-0000-000000000051",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Zip-Up Hoodies — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000052",
    "name": "Custom Sweatpants",
    "slug": "custom-sweatpants",
    "category_id": "a0000001-0000-0000-0000-000000000004",
    "short_description": "Custom Sweatpants for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Sweatpants engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "420 GSM 100% Cotton Heavy Fleece",
      "Heavy Cotton Flat Drawcords",
      "Encased Elastic Waist"
    ],
    "features": [
      "Straight Leg or Elastic Cuffed Ankle",
      "Deep Hand Pockets with Jersey Lining",
      "Single Rear Patch Pocket",
      "Tonal or Contrast Puff Embroidery"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Sweatpants | GLOVES STORM",
    "seo_description": "Custom Sweatpants for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000004",
      "name": "Clothing & Streetwear",
      "slug": "clothing-streetwear",
      "description": "Heavyweight 450+ GSM hoodies, boxy oversized tees, varsity jackets, cargo pants, and luxury streetwear cut-and-sew silhouettes.",
      "image_url": "/images/products/hoodie-black.png",
      "parent_id": null,
      "sort_order": 4,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000520001",
        "product_id": "b0000001-0000-0000-0000-000000000052",
        "image_url": "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Sweatpants — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000520002",
        "product_id": "b0000001-0000-0000-0000-000000000052",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Sweatpants — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000520003",
        "product_id": "b0000001-0000-0000-0000-000000000052",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Sweatpants — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000520004",
        "product_id": "b0000001-0000-0000-0000-000000000052",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Sweatpants — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000053",
    "name": "Custom Cargo Pants",
    "slug": "custom-cargo-pants",
    "category_id": "a0000001-0000-0000-0000-000000000004",
    "short_description": "Custom Cargo Pants for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Cargo Pants engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Heavyweight 280 GSM Cotton Twill or Ripstop",
      "Snap Button Pocket Hardware",
      "Drawstring Hem Adjusters"
    ],
    "features": [
      "Multi-Bellows Cargo Pockets",
      "Articulated Pleated Knees",
      "Relaxed Skate/Streetwear Fit",
      "Reinforced Seat & Crotch"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "3-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Cargo Pants | GLOVES STORM",
    "seo_description": "Custom Cargo Pants for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000004",
      "name": "Clothing & Streetwear",
      "slug": "clothing-streetwear",
      "description": "Heavyweight 450+ GSM hoodies, boxy oversized tees, varsity jackets, cargo pants, and luxury streetwear cut-and-sew silhouettes.",
      "image_url": "/images/products/hoodie-black.png",
      "parent_id": null,
      "sort_order": 4,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000530001",
        "product_id": "b0000001-0000-0000-0000-000000000053",
        "image_url": "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Cargo Pants — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000530002",
        "product_id": "b0000001-0000-0000-0000-000000000053",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Cargo Pants — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000530003",
        "product_id": "b0000001-0000-0000-0000-000000000053",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Cargo Pants — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000530004",
        "product_id": "b0000001-0000-0000-0000-000000000053",
        "image_url": "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Cargo Pants — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000054",
    "name": "Custom Varsity Jackets",
    "slug": "custom-varsity-jackets",
    "category_id": "a0000001-0000-0000-0000-000000000004",
    "short_description": "Custom Varsity Jackets for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Varsity Jackets engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Melton Wool Body (700 GSM)",
      "Full-Grain Cowhide or Vegan Leather Sleeves",
      "Quilted Diamond Satin Interior",
      "Striped 2x2 Rib Trim"
    ],
    "features": [
      "Heavy Snap Button Closure",
      "Chenille Embroidered Chest & Back Badges",
      "Internal Leather-Trimmed Welt Pocket",
      "Authentic Heritage Feel"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 30,
    "lead_time": "3-5 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Custom Varsity Jackets | GLOVES STORM",
    "seo_description": "Custom Varsity Jackets for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000004",
      "name": "Clothing & Streetwear",
      "slug": "clothing-streetwear",
      "description": "Heavyweight 450+ GSM hoodies, boxy oversized tees, varsity jackets, cargo pants, and luxury streetwear cut-and-sew silhouettes.",
      "image_url": "/images/products/hoodie-black.png",
      "parent_id": null,
      "sort_order": 4,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000540001",
        "product_id": "b0000001-0000-0000-0000-000000000054",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Varsity Jackets — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000540002",
        "product_id": "b0000001-0000-0000-0000-000000000054",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Varsity Jackets — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000540003",
        "product_id": "b0000001-0000-0000-0000-000000000054",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Custom Varsity Jackets — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000540004",
        "product_id": "b0000001-0000-0000-0000-000000000054",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Varsity Jackets — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000055",
    "name": "Custom Bomber Jackets",
    "slug": "custom-bomber-jackets",
    "category_id": "a0000001-0000-0000-0000-000000000004",
    "short_description": "Custom Bomber Jackets for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Bomber Jackets engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "High-Density Flight Nylon Shell (Waterproof)",
      "Insulated Thermal Polyfill (150 GSM)",
      "Heavy Brass / Antique Silver Zippers"
    ],
    "features": [
      "Sleeve Utility Cigarette/Pen Pocket",
      "Classic Emergency Orange or Custom Color Satin Lining",
      "Ribbed MA-1 Collar",
      "Dual Flap Snap Pockets"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 40,
    "lead_time": "3-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Bomber Jackets | GLOVES STORM",
    "seo_description": "Custom Bomber Jackets for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000004",
      "name": "Clothing & Streetwear",
      "slug": "clothing-streetwear",
      "description": "Heavyweight 450+ GSM hoodies, boxy oversized tees, varsity jackets, cargo pants, and luxury streetwear cut-and-sew silhouettes.",
      "image_url": "/images/products/hoodie-black.png",
      "parent_id": null,
      "sort_order": 4,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000550001",
        "product_id": "b0000001-0000-0000-0000-000000000055",
        "image_url": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Bomber Jackets — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000550002",
        "product_id": "b0000001-0000-0000-0000-000000000055",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Bomber Jackets — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000550003",
        "product_id": "b0000001-0000-0000-0000-000000000055",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Bomber Jackets — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000550004",
        "product_id": "b0000001-0000-0000-0000-000000000055",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Bomber Jackets — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000056",
    "name": "Custom Windbreaker Jackets",
    "slug": "custom-windbreaker-jackets",
    "category_id": "a0000001-0000-0000-0000-000000000004",
    "short_description": "Custom Windbreaker Jackets for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Windbreaker Jackets engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "100% Lightweight Micro-Ripstop Nylon",
      "DWR Water-Repellent Treatment",
      "Soft Mesh Interior"
    ],
    "features": [
      "Packable into Pocket Design",
      "Half-Zip or Full-Zip Pullover Style",
      "Bungee Toggle Hem & Hood Cinch",
      "Screen or Reflective Print Ready"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Windbreaker Jackets | GLOVES STORM",
    "seo_description": "Custom Windbreaker Jackets for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000004",
      "name": "Clothing & Streetwear",
      "slug": "clothing-streetwear",
      "description": "Heavyweight 450+ GSM hoodies, boxy oversized tees, varsity jackets, cargo pants, and luxury streetwear cut-and-sew silhouettes.",
      "image_url": "/images/products/hoodie-black.png",
      "parent_id": null,
      "sort_order": 4,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000560001",
        "product_id": "b0000001-0000-0000-0000-000000000056",
        "image_url": "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Windbreaker Jackets — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000560002",
        "product_id": "b0000001-0000-0000-0000-000000000056",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Windbreaker Jackets — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000560003",
        "product_id": "b0000001-0000-0000-0000-000000000056",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Windbreaker Jackets — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000560004",
        "product_id": "b0000001-0000-0000-0000-000000000056",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Windbreaker Jackets — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000057",
    "name": "Custom Denim Jackets",
    "slug": "custom-denim-jackets",
    "category_id": "a0000001-0000-0000-0000-000000000004",
    "short_description": "Custom Denim Jackets for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Denim Jackets engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "14oz 100% Cotton Raw or Washed Rigid Denim",
      "Custom Engraved Copper / Pewter Tack Buttons"
    ],
    "features": [
      "Classic Type III Trucker Silhouette",
      "Enzyme Stonewash, Acid Wash, or Distressed Finishes",
      "Twin Chest Flap Pockets",
      "Custom Leather Back Waist Patch"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "3-5 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Denim Jackets | GLOVES STORM",
    "seo_description": "Custom Denim Jackets for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000004",
      "name": "Clothing & Streetwear",
      "slug": "clothing-streetwear",
      "description": "Heavyweight 450+ GSM hoodies, boxy oversized tees, varsity jackets, cargo pants, and luxury streetwear cut-and-sew silhouettes.",
      "image_url": "/images/products/hoodie-black.png",
      "parent_id": null,
      "sort_order": 4,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000570001",
        "product_id": "b0000001-0000-0000-0000-000000000057",
        "image_url": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Denim Jackets — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000570002",
        "product_id": "b0000001-0000-0000-0000-000000000057",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Denim Jackets — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000570003",
        "product_id": "b0000001-0000-0000-0000-000000000057",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Custom Denim Jackets — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000570004",
        "product_id": "b0000001-0000-0000-0000-000000000057",
        "image_url": "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Denim Jackets — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000058",
    "name": "Custom Polo Shirts",
    "slug": "custom-polo-shirts",
    "category_id": "a0000001-0000-0000-0000-000000000004",
    "short_description": "Custom Polo Shirts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Polo Shirts engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "220 GSM 100% Combed Pique Cotton or Mercerized Cotton",
      "Mother-of-Pearl or Horn Buttons"
    ],
    "features": [
      "Anti-Curl Ribbed Collar",
      "Tailored Side Vents with Contrast Tape",
      "Fine Gauge Embroidery on Chest",
      "Pre-Shrunk Bio-Polished Finish"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Polo Shirts | GLOVES STORM",
    "seo_description": "Custom Polo Shirts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.612Z",
    "updated_at": "2026-09-14T14:02:04.612Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000004",
      "name": "Clothing & Streetwear",
      "slug": "clothing-streetwear",
      "description": "Heavyweight 450+ GSM hoodies, boxy oversized tees, varsity jackets, cargo pants, and luxury streetwear cut-and-sew silhouettes.",
      "image_url": "/images/products/hoodie-black.png",
      "parent_id": null,
      "sort_order": 4,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.612Z",
      "updated_at": "2026-09-14T14:02:04.612Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000580001",
        "product_id": "b0000001-0000-0000-0000-000000000058",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Polo Shirts — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000580002",
        "product_id": "b0000001-0000-0000-0000-000000000058",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Polo Shirts — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000580003",
        "product_id": "b0000001-0000-0000-0000-000000000058",
        "image_url": "/images/products/football-jersey-black.jpg",
        "alt_text": "Custom Polo Shirts — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000580004",
        "product_id": "b0000001-0000-0000-0000-000000000058",
        "image_url": "https://images.unsplash.com/photo-1625910513413-56832dbca665?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Polo Shirts — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000059",
    "name": "Custom Long Sleeve Shirts",
    "slug": "custom-long-sleeve-shirts",
    "category_id": "a0000001-0000-0000-0000-000000000004",
    "short_description": "Custom Long Sleeve Shirts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Long Sleeve Shirts engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "220 GSM Ringspun Cotton Jersey",
      "Spandex Ribbed Cuffs for Retention"
    ],
    "features": [
      "Drop Shoulder or Regular Athletic Fit",
      "Sleeve Print Length Available",
      "Reinforced Taped Collar",
      "Custom Neck Printing"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Long Sleeve Shirts | GLOVES STORM",
    "seo_description": "Custom Long Sleeve Shirts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000004",
      "name": "Clothing & Streetwear",
      "slug": "clothing-streetwear",
      "description": "Heavyweight 450+ GSM hoodies, boxy oversized tees, varsity jackets, cargo pants, and luxury streetwear cut-and-sew silhouettes.",
      "image_url": "/images/products/hoodie-black.png",
      "parent_id": null,
      "sort_order": 4,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000590001",
        "product_id": "b0000001-0000-0000-0000-000000000059",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Long Sleeve Shirts — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000590002",
        "product_id": "b0000001-0000-0000-0000-000000000059",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Long Sleeve Shirts — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000590003",
        "product_id": "b0000001-0000-0000-0000-000000000059",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Long Sleeve Shirts — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000590004",
        "product_id": "b0000001-0000-0000-0000-000000000059",
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Long Sleeve Shirts — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.612Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000060",
    "name": "Private Label Streetwear",
    "slug": "private-label-streetwear",
    "category_id": "a0000001-0000-0000-0000-000000000004",
    "short_description": "Private Label Streetwear for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Private Label Streetwear engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Custom Milled Heavy Fabrics (Up to 600 GSM)",
      "Custom Metal Hardware & Finishes"
    ],
    "features": [
      "Full Collection Tech Pack Development",
      "Custom Woven Damask Labels, Hangtags, & Ziplock Bags",
      "Sample Prototyping in 7 Days",
      "End-to-End White Label Fulfilment"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "3-5 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Private Label Streetwear | GLOVES STORM",
    "seo_description": "Private Label Streetwear for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000004",
      "name": "Clothing & Streetwear",
      "slug": "clothing-streetwear",
      "description": "Heavyweight 450+ GSM hoodies, boxy oversized tees, varsity jackets, cargo pants, and luxury streetwear cut-and-sew silhouettes.",
      "image_url": "/images/products/hoodie-black.png",
      "parent_id": null,
      "sort_order": 4,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000600001",
        "product_id": "b0000001-0000-0000-0000-000000000060",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Private Label Streetwear — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000600002",
        "product_id": "b0000001-0000-0000-0000-000000000060",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Private Label Streetwear — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000600003",
        "product_id": "b0000001-0000-0000-0000-000000000060",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Private Label Streetwear — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000600004",
        "product_id": "b0000001-0000-0000-0000-000000000060",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Private Label Streetwear — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000061",
    "name": "Private Label Clothing Manufacturing",
    "slug": "private-label-clothing-manufacturing",
    "category_id": "a0000001-0000-0000-0000-000000000005",
    "short_description": "Private Label Clothing Manufacturing for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Private Label Clothing Manufacturing engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Full Fabric Library Sourcing (Organic Cottons, Bamboo, Synthetics)",
      "Custom Fabric Weights & Pantone Dyeing"
    ],
    "features": [
      "Complete Pattern Making & Grading",
      "Garment Cut-and-Sew Assembly",
      "Quality Control Inspection (AQL 2.5)",
      "Custom Packaging & Barcoding"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "3-4 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Private Label Clothing Manufacturing | GLOVES STORM",
    "seo_description": "Private Label Clothing Manufacturing for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000005",
      "name": "Custom Manufacturing & Private Label",
      "slug": "custom-manufacturing-private-label",
      "description": "Turnkey OEM and private label services: technical tech pack prototyping, Italian Kiian sublimation, Tajima embroidery, custom packaging, and low MOQ production.",
      "image_url": "/images/products/luxury-packaging.jpg",
      "parent_id": null,
      "sort_order": 5,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000610001",
        "product_id": "b0000001-0000-0000-0000-000000000061",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Private Label Clothing Manufacturing — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000610002",
        "product_id": "b0000001-0000-0000-0000-000000000061",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Private Label Clothing Manufacturing — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000610003",
        "product_id": "b0000001-0000-0000-0000-000000000061",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Private Label Clothing Manufacturing — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000610004",
        "product_id": "b0000001-0000-0000-0000-000000000061",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Private Label Clothing Manufacturing — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000062",
    "name": "Private Label Sportswear Manufacturing",
    "slug": "private-label-sportswear-manufacturing",
    "category_id": "a0000001-0000-0000-0000-000000000005",
    "short_description": "Private Label Sportswear Manufacturing for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Private Label Sportswear Manufacturing engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Technical Performance Synthetics",
      "Moisture-Wicking & Anti-Microbial Treatments"
    ],
    "features": [
      "Flatlock & Seamless Ultrasonic Welding",
      "Laser Cut Micro-Ventilation",
      "Sublimation & Silicone Printing",
      "Complete Sportswear Collections"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "3-4 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Private Label Sportswear Manufacturing | GLOVES STORM",
    "seo_description": "Private Label Sportswear Manufacturing for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000005",
      "name": "Custom Manufacturing & Private Label",
      "slug": "custom-manufacturing-private-label",
      "description": "Turnkey OEM and private label services: technical tech pack prototyping, Italian Kiian sublimation, Tajima embroidery, custom packaging, and low MOQ production.",
      "image_url": "/images/products/luxury-packaging.jpg",
      "parent_id": null,
      "sort_order": 5,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000620001",
        "product_id": "b0000001-0000-0000-0000-000000000062",
        "image_url": "/images/products/basketball-uniform.jpg",
        "alt_text": "Private Label Sportswear Manufacturing — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000620002",
        "product_id": "b0000001-0000-0000-0000-000000000062",
        "image_url": "/images/products/football-jersey-black.jpg",
        "alt_text": "Private Label Sportswear Manufacturing — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000620003",
        "product_id": "b0000001-0000-0000-0000-000000000062",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Private Label Sportswear Manufacturing — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000620004",
        "product_id": "b0000001-0000-0000-0000-000000000062",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Private Label Sportswear Manufacturing — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000063",
    "name": "OEM Clothing Manufacturing",
    "slug": "oem-clothing-manufacturing",
    "category_id": "a0000001-0000-0000-0000-000000000005",
    "short_description": "OEM Clothing Manufacturing for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "OEM Clothing Manufacturing engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Strict Adherence to Client Material Specifications",
      "Certificated Yarns & Dyes"
    ],
    "features": [
      "Precision Execution of Client Tech Packs",
      "Bulk Production Lines with Scale Capacity",
      "Direct Factory Sialkot Pricing",
      "Export Freight Management (Air/Sea)"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 100,
    "lead_time": "3-5 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "OEM Clothing Manufacturing | GLOVES STORM",
    "seo_description": "OEM Clothing Manufacturing for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000005",
      "name": "Custom Manufacturing & Private Label",
      "slug": "custom-manufacturing-private-label",
      "description": "Turnkey OEM and private label services: technical tech pack prototyping, Italian Kiian sublimation, Tajima embroidery, custom packaging, and low MOQ production.",
      "image_url": "/images/products/luxury-packaging.jpg",
      "parent_id": null,
      "sort_order": 5,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000630001",
        "product_id": "b0000001-0000-0000-0000-000000000063",
        "image_url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "OEM Clothing Manufacturing — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000630002",
        "product_id": "b0000001-0000-0000-0000-000000000063",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "OEM Clothing Manufacturing — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000630003",
        "product_id": "b0000001-0000-0000-0000-000000000063",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "OEM Clothing Manufacturing — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000630004",
        "product_id": "b0000001-0000-0000-0000-000000000063",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "OEM Clothing Manufacturing — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000064",
    "name": "OEM Sportswear Manufacturing",
    "slug": "oem-sportswear-manufacturing",
    "category_id": "a0000001-0000-0000-0000-000000000005",
    "short_description": "OEM Sportswear Manufacturing for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "OEM Sportswear Manufacturing engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Pro Athlete Spec Fabrics",
      "Compression & Aerodynamic Textiles"
    ],
    "features": [
      "Dedicated Teamwear Lines",
      "Match Kit & Training Range Production",
      "Uniformity & Exact Color Matching",
      "Strict QC Batch Testing"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 100,
    "lead_time": "3-5 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "OEM Sportswear Manufacturing | GLOVES STORM",
    "seo_description": "OEM Sportswear Manufacturing for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000005",
      "name": "Custom Manufacturing & Private Label",
      "slug": "custom-manufacturing-private-label",
      "description": "Turnkey OEM and private label services: technical tech pack prototyping, Italian Kiian sublimation, Tajima embroidery, custom packaging, and low MOQ production.",
      "image_url": "/images/products/luxury-packaging.jpg",
      "parent_id": null,
      "sort_order": 5,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000640001",
        "product_id": "b0000001-0000-0000-0000-000000000064",
        "image_url": "/images/products/football-jersey-black.jpg",
        "alt_text": "OEM Sportswear Manufacturing — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000640002",
        "product_id": "b0000001-0000-0000-0000-000000000064",
        "image_url": "/images/products/basketball-uniform.jpg",
        "alt_text": "OEM Sportswear Manufacturing — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000640003",
        "product_id": "b0000001-0000-0000-0000-000000000064",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "OEM Sportswear Manufacturing — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000640004",
        "product_id": "b0000001-0000-0000-0000-000000000064",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "OEM Sportswear Manufacturing — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000065",
    "name": "Custom Apparel Manufacturing",
    "slug": "custom-apparel-manufacturing",
    "category_id": "a0000001-0000-0000-0000-000000000005",
    "short_description": "Custom Apparel Manufacturing for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Apparel Manufacturing engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Knitwear, Woven, and Bonded Technical Textiles"
    ],
    "features": [
      "End-to-End Prototyping Service",
      "Fit Samples & Pre-Production Signoffs",
      "Complete Sizing Grading",
      "Global Door-to-Door Logistics"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "3-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Apparel Manufacturing | GLOVES STORM",
    "seo_description": "Custom Apparel Manufacturing for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000005",
      "name": "Custom Manufacturing & Private Label",
      "slug": "custom-manufacturing-private-label",
      "description": "Turnkey OEM and private label services: technical tech pack prototyping, Italian Kiian sublimation, Tajima embroidery, custom packaging, and low MOQ production.",
      "image_url": "/images/products/luxury-packaging.jpg",
      "parent_id": null,
      "sort_order": 5,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000650001",
        "product_id": "b0000001-0000-0000-0000-000000000065",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Apparel Manufacturing — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000650002",
        "product_id": "b0000001-0000-0000-0000-000000000065",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Apparel Manufacturing — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000650003",
        "product_id": "b0000001-0000-0000-0000-000000000065",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Custom Apparel Manufacturing — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000650004",
        "product_id": "b0000001-0000-0000-0000-000000000065",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Apparel Manufacturing — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000066",
    "name": "Custom Product Development",
    "slug": "custom-product-development",
    "category_id": "a0000001-0000-0000-0000-000000000005",
    "short_description": "Custom Product Development for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Product Development engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Prototype Fabrics & Experimental Composites",
      "Component Sourcing"
    ],
    "features": [
      "Idea to Production Consulting",
      "CAD 2D/3D Pattern Engineering",
      "Material Stress & Shrinkage Testing",
      "Golden Sample Approval Process"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 30,
    "lead_time": "2-4 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Custom Product Development | GLOVES STORM",
    "seo_description": "Custom Product Development for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000005",
      "name": "Custom Manufacturing & Private Label",
      "slug": "custom-manufacturing-private-label",
      "description": "Turnkey OEM and private label services: technical tech pack prototyping, Italian Kiian sublimation, Tajima embroidery, custom packaging, and low MOQ production.",
      "image_url": "/images/products/luxury-packaging.jpg",
      "parent_id": null,
      "sort_order": 5,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000660001",
        "product_id": "b0000001-0000-0000-0000-000000000066",
        "image_url": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Product Development — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000660002",
        "product_id": "b0000001-0000-0000-0000-000000000066",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Custom Product Development — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000660003",
        "product_id": "b0000001-0000-0000-0000-000000000066",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Product Development — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000660004",
        "product_id": "b0000001-0000-0000-0000-000000000066",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Custom Product Development — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000067",
    "name": "Tech Pack Manufacturing",
    "slug": "tech-pack-manufacturing",
    "category_id": "a0000001-0000-0000-0000-000000000005",
    "short_description": "Tech Pack Manufacturing for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Tech Pack Manufacturing engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Exact BOM (Bill of Materials) Sourcing"
    ],
    "features": [
      "Direct Translation of AI / PDF Tech Packs",
      "Point-to-Point Measurement Tolerance +/- 0.5cm",
      "Comprehensive Sample Review Reports",
      "Production Blueprint Execution"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Tech Pack Manufacturing | GLOVES STORM",
    "seo_description": "Tech Pack Manufacturing for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000005",
      "name": "Custom Manufacturing & Private Label",
      "slug": "custom-manufacturing-private-label",
      "description": "Turnkey OEM and private label services: technical tech pack prototyping, Italian Kiian sublimation, Tajima embroidery, custom packaging, and low MOQ production.",
      "image_url": "/images/products/luxury-packaging.jpg",
      "parent_id": null,
      "sort_order": 5,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000670001",
        "product_id": "b0000001-0000-0000-0000-000000000067",
        "image_url": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Tech Pack Manufacturing — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000670002",
        "product_id": "b0000001-0000-0000-0000-000000000067",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Tech Pack Manufacturing — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000670003",
        "product_id": "b0000001-0000-0000-0000-000000000067",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Tech Pack Manufacturing — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000670004",
        "product_id": "b0000001-0000-0000-0000-000000000067",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Tech Pack Manufacturing — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000068",
    "name": "Custom Packaging Manufacturing",
    "slug": "custom-packaging-manufacturing",
    "category_id": "a0000001-0000-0000-0000-000000000005",
    "short_description": "Custom Packaging Manufacturing for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Packaging Manufacturing engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Matte Laminated Rigid Gift Boxes",
      "Frosted Biodegradable Ziplock Polybags",
      "Custom Printed Tissue Paper"
    ],
    "features": [
      "Magnetic Flap Closures",
      "Foil Stamped & Embossed Logos",
      "Custom Barcode & Size Stickers",
      "Retail Shelf Ready Delivery"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 100,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Packaging Manufacturing | GLOVES STORM",
    "seo_description": "Custom Packaging Manufacturing for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000005",
      "name": "Custom Manufacturing & Private Label",
      "slug": "custom-manufacturing-private-label",
      "description": "Turnkey OEM and private label services: technical tech pack prototyping, Italian Kiian sublimation, Tajima embroidery, custom packaging, and low MOQ production.",
      "image_url": "/images/products/luxury-packaging.jpg",
      "parent_id": null,
      "sort_order": 5,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000680001",
        "product_id": "b0000001-0000-0000-0000-000000000068",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Custom Packaging Manufacturing — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000680002",
        "product_id": "b0000001-0000-0000-0000-000000000068",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Custom Packaging Manufacturing — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000680003",
        "product_id": "b0000001-0000-0000-0000-000000000068",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Custom Packaging Manufacturing — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000680004",
        "product_id": "b0000001-0000-0000-0000-000000000068",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Packaging Manufacturing — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000069",
    "name": "Custom Labels & Hang Tags",
    "slug": "custom-labels-and-hang-tags",
    "category_id": "a0000001-0000-0000-0000-000000000005",
    "short_description": "Custom Labels & Hang Tags for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Labels & Hang Tags engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "High-Definition Damask Woven Yarn",
      "Recycled Craft Paper Cardstock (600 GSM)",
      "Soft Cotton Printed Care Labels"
    ],
    "features": [
      "Laser Cut Soft Edges (Non-Itch)",
      "Embossed, Debossed, and Spot UV Tags",
      "Custom Wax Cord & Safety Pins",
      "Complete Trims Package"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 200,
    "lead_time": "1-2 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Labels & Hang Tags | GLOVES STORM",
    "seo_description": "Custom Labels & Hang Tags for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000005",
      "name": "Custom Manufacturing & Private Label",
      "slug": "custom-manufacturing-private-label",
      "description": "Turnkey OEM and private label services: technical tech pack prototyping, Italian Kiian sublimation, Tajima embroidery, custom packaging, and low MOQ production.",
      "image_url": "/images/products/luxury-packaging.jpg",
      "parent_id": null,
      "sort_order": 5,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000690001",
        "product_id": "b0000001-0000-0000-0000-000000000069",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Custom Labels & Hang Tags — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000690002",
        "product_id": "b0000001-0000-0000-0000-000000000069",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Custom Labels & Hang Tags — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000690003",
        "product_id": "b0000001-0000-0000-0000-000000000069",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Custom Labels & Hang Tags — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000690004",
        "product_id": "b0000001-0000-0000-0000-000000000069",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Labels & Hang Tags — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000070",
    "name": "Custom Embroidery Manufacturing",
    "slug": "custom-embroidery-manufacturing",
    "category_id": "a0000001-0000-0000-0000-000000000005",
    "short_description": "Custom Embroidery Manufacturing for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Embroidery Manufacturing engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "German Madeira Embroidery Threads",
      "3D Puff EVA Foam Underlays",
      "Chenille Loops"
    ],
    "features": [
      "High-Precision Tajima Multi-Head Machines",
      "3D Puff High Density Stitching",
      "Applique & Patch Creation",
      "Precision Digitizing Service"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Embroidery Manufacturing | GLOVES STORM",
    "seo_description": "Custom Embroidery Manufacturing for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000005",
      "name": "Custom Manufacturing & Private Label",
      "slug": "custom-manufacturing-private-label",
      "description": "Turnkey OEM and private label services: technical tech pack prototyping, Italian Kiian sublimation, Tajima embroidery, custom packaging, and low MOQ production.",
      "image_url": "/images/products/luxury-packaging.jpg",
      "parent_id": null,
      "sort_order": 5,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000700001",
        "product_id": "b0000001-0000-0000-0000-000000000070",
        "image_url": "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Embroidery Manufacturing — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000700002",
        "product_id": "b0000001-0000-0000-0000-000000000070",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Embroidery Manufacturing — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000700003",
        "product_id": "b0000001-0000-0000-0000-000000000070",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Custom Embroidery Manufacturing — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000700004",
        "product_id": "b0000001-0000-0000-0000-000000000070",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Embroidery Manufacturing — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000071",
    "name": "Custom Sublimation Apparel",
    "slug": "custom-sublimation-apparel",
    "category_id": "a0000001-0000-0000-0000-000000000005",
    "short_description": "Custom Sublimation Apparel for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Sublimation Apparel engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "100% Micro-Poly Sublimation Fabrics",
      "Italian Kiian Eco-Inks (Zero Fading)"
    ],
    "features": [
      "All-Over 360 Degree Printing",
      "Infinite Pantone Colors with No Setup Fees",
      "Never Cracks, Peels or Fades",
      "Breathable Ink Infusion into Yarn"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Sublimation Apparel | GLOVES STORM",
    "seo_description": "Custom Sublimation Apparel for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000005",
      "name": "Custom Manufacturing & Private Label",
      "slug": "custom-manufacturing-private-label",
      "description": "Turnkey OEM and private label services: technical tech pack prototyping, Italian Kiian sublimation, Tajima embroidery, custom packaging, and low MOQ production.",
      "image_url": "/images/products/luxury-packaging.jpg",
      "parent_id": null,
      "sort_order": 5,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000710001",
        "product_id": "b0000001-0000-0000-0000-000000000071",
        "image_url": "/images/products/basketball-uniform.jpg",
        "alt_text": "Custom Sublimation Apparel — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000710002",
        "product_id": "b0000001-0000-0000-0000-000000000071",
        "image_url": "/images/products/football-jersey-black.jpg",
        "alt_text": "Custom Sublimation Apparel — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000710003",
        "product_id": "b0000001-0000-0000-0000-000000000071",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Sublimation Apparel — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000710004",
        "product_id": "b0000001-0000-0000-0000-000000000071",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Sublimation Apparel — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000072",
    "name": "Custom Screen Printed Apparel",
    "slug": "custom-screen-printed-apparel",
    "category_id": "a0000001-0000-0000-0000-000000000005",
    "short_description": "Custom Screen Printed Apparel for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Screen Printed Apparel engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Water-Based Discharge Inks",
      "High-Elastic Plastisol Inks",
      "Metallic Inks"
    ],
    "features": [
      "Ultra Soft Hand Feel Discharge Printing",
      "High Density Silicone Rubber Inks",
      "Color Separation Printing",
      "Automatic High-Output Presses"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Screen Printed Apparel | GLOVES STORM",
    "seo_description": "Custom Screen Printed Apparel for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000005",
      "name": "Custom Manufacturing & Private Label",
      "slug": "custom-manufacturing-private-label",
      "description": "Turnkey OEM and private label services: technical tech pack prototyping, Italian Kiian sublimation, Tajima embroidery, custom packaging, and low MOQ production.",
      "image_url": "/images/products/luxury-packaging.jpg",
      "parent_id": null,
      "sort_order": 5,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000720001",
        "product_id": "b0000001-0000-0000-0000-000000000072",
        "image_url": "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Screen Printed Apparel — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000720002",
        "product_id": "b0000001-0000-0000-0000-000000000072",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Screen Printed Apparel — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000720003",
        "product_id": "b0000001-0000-0000-0000-000000000072",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Screen Printed Apparel — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000720004",
        "product_id": "b0000001-0000-0000-0000-000000000072",
        "image_url": "/images/products/football-jersey-black.jpg",
        "alt_text": "Custom Screen Printed Apparel — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000073",
    "name": "Custom DTF Printed Apparel",
    "slug": "custom-dtf-printed-apparel",
    "category_id": "a0000001-0000-0000-0000-000000000005",
    "short_description": "Custom DTF Printed Apparel for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom DTF Printed Apparel engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Premium Direct-to-Film Polyurethane Films",
      "Hot Melt Adhesive Powder"
    ],
    "features": [
      "Vibrant Full-Color Photographic Detail",
      "Sharp Micro-Text & Gradients",
      "Stretches Without Cracking",
      "Applicable on All Cotton & Synthetics"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom DTF Printed Apparel | GLOVES STORM",
    "seo_description": "Custom DTF Printed Apparel for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000005",
      "name": "Custom Manufacturing & Private Label",
      "slug": "custom-manufacturing-private-label",
      "description": "Turnkey OEM and private label services: technical tech pack prototyping, Italian Kiian sublimation, Tajima embroidery, custom packaging, and low MOQ production.",
      "image_url": "/images/products/luxury-packaging.jpg",
      "parent_id": null,
      "sort_order": 5,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000730001",
        "product_id": "b0000001-0000-0000-0000-000000000073",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom DTF Printed Apparel — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000730002",
        "product_id": "b0000001-0000-0000-0000-000000000073",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom DTF Printed Apparel — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000730003",
        "product_id": "b0000001-0000-0000-0000-000000000073",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Custom DTF Printed Apparel — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000730004",
        "product_id": "b0000001-0000-0000-0000-000000000073",
        "image_url": "/images/products/football-jersey-black.jpg",
        "alt_text": "Custom DTF Printed Apparel — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000074",
    "name": "Custom Puff Printed Apparel",
    "slug": "custom-puff-printed-apparel",
    "category_id": "a0000001-0000-0000-0000-000000000005",
    "short_description": "Custom Puff Printed Apparel for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Puff Printed Apparel engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Expanding Puff Ink Compounds",
      "3D Textured Plastisol Formulations"
    ],
    "features": [
      "Raised 3D Foam Tactile Texture",
      "Popular in Luxury Streetwear Brands",
      "Crisp Edges & High Definition",
      "Wash-Tested Durability"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Puff Printed Apparel | GLOVES STORM",
    "seo_description": "Custom Puff Printed Apparel for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000005",
      "name": "Custom Manufacturing & Private Label",
      "slug": "custom-manufacturing-private-label",
      "description": "Turnkey OEM and private label services: technical tech pack prototyping, Italian Kiian sublimation, Tajima embroidery, custom packaging, and low MOQ production.",
      "image_url": "/images/products/luxury-packaging.jpg",
      "parent_id": null,
      "sort_order": 5,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000740001",
        "product_id": "b0000001-0000-0000-0000-000000000074",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Puff Printed Apparel — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000740002",
        "product_id": "b0000001-0000-0000-0000-000000000074",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Custom Puff Printed Apparel — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000740003",
        "product_id": "b0000001-0000-0000-0000-000000000074",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Puff Printed Apparel — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000740004",
        "product_id": "b0000001-0000-0000-0000-000000000074",
        "image_url": "/images/products/varsity-jacket.jpg",
        "alt_text": "Custom Puff Printed Apparel — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000075",
    "name": "Low MOQ Custom Manufacturing",
    "slug": "low-moq-custom-manufacturing",
    "category_id": "a0000001-0000-0000-0000-000000000005",
    "short_description": "Low MOQ Custom Manufacturing for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Low MOQ Custom Manufacturing engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Stock High-Grade Fabrics & On-Demand Milled Textiles"
    ],
    "features": [
      "Accessible Minimums (From 30-50 units)",
      "Ideal for Startups & Boutique Drops",
      "Professional Production Quality",
      "Rapid Scaling Capability as You Grow"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 30,
    "lead_time": "2-3 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Low MOQ Custom Manufacturing | GLOVES STORM",
    "seo_description": "Low MOQ Custom Manufacturing for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000005",
      "name": "Custom Manufacturing & Private Label",
      "slug": "custom-manufacturing-private-label",
      "description": "Turnkey OEM and private label services: technical tech pack prototyping, Italian Kiian sublimation, Tajima embroidery, custom packaging, and low MOQ production.",
      "image_url": "/images/products/luxury-packaging.jpg",
      "parent_id": null,
      "sort_order": 5,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000750001",
        "product_id": "b0000001-0000-0000-0000-000000000075",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Low MOQ Custom Manufacturing — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000750002",
        "product_id": "b0000001-0000-0000-0000-000000000075",
        "image_url": "/images/products/boxing-gloves-black.png",
        "alt_text": "Low MOQ Custom Manufacturing — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000750003",
        "product_id": "b0000001-0000-0000-0000-000000000075",
        "image_url": "/images/products/hoodie-black.png",
        "alt_text": "Low MOQ Custom Manufacturing — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000750004",
        "product_id": "b0000001-0000-0000-0000-000000000075",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Low MOQ Custom Manufacturing — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000076",
    "name": "Custom Swim Shorts",
    "slug": "custom-swim-shorts",
    "category_id": "a0000001-0000-0000-0000-000000000006",
    "short_description": "Custom Swim Shorts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Swim Shorts engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "100% Quick-Dry Peach Microfiber Polyester",
      "Soft Anti-Chafe Mesh Lining",
      "Custom Branded Metal Drawstring Tips"
    ],
    "features": [
      "Rapid Hydrophobic Water-Repellent Finish",
      "Elastic Waistband with Full Cord",
      "Deep Side Slit Pockets & Velcro Back Pocket",
      "Drainage Eyelets in Rear Pocket"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Custom Swim Shorts | GLOVES STORM",
    "seo_description": "Custom Swim Shorts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000006",
      "name": "Swimwear & Beachwear",
      "slug": "swimwear-beachwear",
      "description": "Quick-drying board shorts, UPF 50+ rash guards, chlorine-resistant one-piece swimsuits, bikinis, and luxury resort apparel made for performance.",
      "image_url": "/images/products/board-shorts.jpg",
      "parent_id": null,
      "sort_order": 6,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000760001",
        "product_id": "b0000001-0000-0000-0000-000000000076",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Swim Shorts — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000760002",
        "product_id": "b0000001-0000-0000-0000-000000000076",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Swim Shorts — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000760003",
        "product_id": "b0000001-0000-0000-0000-000000000076",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Swim Shorts — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000760004",
        "product_id": "b0000001-0000-0000-0000-000000000076",
        "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Swim Shorts — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000077",
    "name": "Custom Board Shorts",
    "slug": "custom-board-shorts",
    "category_id": "a0000001-0000-0000-0000-000000000006",
    "short_description": "Custom Board Shorts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Board Shorts engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "4-Way Stretch Poly Spandex (160 GSM)",
      "Durable Triple Needle Rise Seams"
    ],
    "features": [
      "Fitted Fixed Waist with Neoprene Fly",
      "Drawstring Lace-Up Front",
      "Side Welded Waterproof Zip Pocket with Key Loop",
      "Zero Inner Mesh Liner for Surf Performance"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Board Shorts | GLOVES STORM",
    "seo_description": "Custom Board Shorts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000006",
      "name": "Swimwear & Beachwear",
      "slug": "swimwear-beachwear",
      "description": "Quick-drying board shorts, UPF 50+ rash guards, chlorine-resistant one-piece swimsuits, bikinis, and luxury resort apparel made for performance.",
      "image_url": "/images/products/board-shorts.jpg",
      "parent_id": null,
      "sort_order": 6,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000770001",
        "product_id": "b0000001-0000-0000-0000-000000000077",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Board Shorts — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000770002",
        "product_id": "b0000001-0000-0000-0000-000000000077",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Board Shorts — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000770003",
        "product_id": "b0000001-0000-0000-0000-000000000077",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Board Shorts — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000770004",
        "product_id": "b0000001-0000-0000-0000-000000000077",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Board Shorts — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000078",
    "name": "Custom Rash Guards",
    "slug": "custom-rash-guards",
    "category_id": "a0000001-0000-0000-0000-000000000006",
    "short_description": "Custom Rash Guards for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Rash Guards engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "85% Polyester / 15% Spandex (220 GSM)",
      "UPF 50+ Sun Blocking Membrane",
      "Chlorine & Saltwater Resistant"
    ],
    "features": [
      "Boardshort Loop Tie-Down Attachment",
      "Flatlock Anti-Abrasion Seaming",
      "Sublimated Vibrant Artwork",
      "Long or Short Sleeve Options"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Custom Rash Guards | GLOVES STORM",
    "seo_description": "Custom Rash Guards for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000006",
      "name": "Swimwear & Beachwear",
      "slug": "swimwear-beachwear",
      "description": "Quick-drying board shorts, UPF 50+ rash guards, chlorine-resistant one-piece swimsuits, bikinis, and luxury resort apparel made for performance.",
      "image_url": "/images/products/board-shorts.jpg",
      "parent_id": null,
      "sort_order": 6,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000780001",
        "product_id": "b0000001-0000-0000-0000-000000000078",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Rash Guards — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000780002",
        "product_id": "b0000001-0000-0000-0000-000000000078",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Rash Guards — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000780003",
        "product_id": "b0000001-0000-0000-0000-000000000078",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Rash Guards — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000780004",
        "product_id": "b0000001-0000-0000-0000-000000000078",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Rash Guards — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000079",
    "name": "Custom One-Piece Swimsuits",
    "slug": "custom-one-piece-swimsuits",
    "category_id": "a0000001-0000-0000-0000-000000000006",
    "short_description": "Custom One-Piece Swimsuits for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom One-Piece Swimsuits engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "82% Recycled Nylon / 18% High-Stretch Elastane (240 GSM)",
      "Full Front Soft Lining",
      "Chlorine-Proof Dyeing"
    ],
    "features": [
      "Classic Scoop Back or High-Neck Athletic Cut",
      "Removable Molded Breast Cups",
      "Double-Stitched Encased Elastic",
      "Custom Metallic Heat Seal Logo"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom One-Piece Swimsuits | GLOVES STORM",
    "seo_description": "Custom One-Piece Swimsuits for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000006",
      "name": "Swimwear & Beachwear",
      "slug": "swimwear-beachwear",
      "description": "Quick-drying board shorts, UPF 50+ rash guards, chlorine-resistant one-piece swimsuits, bikinis, and luxury resort apparel made for performance.",
      "image_url": "/images/products/board-shorts.jpg",
      "parent_id": null,
      "sort_order": 6,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000790001",
        "product_id": "b0000001-0000-0000-0000-000000000079",
        "image_url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom One-Piece Swimsuits — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000790002",
        "product_id": "b0000001-0000-0000-0000-000000000079",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom One-Piece Swimsuits — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000790003",
        "product_id": "b0000001-0000-0000-0000-000000000079",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Custom One-Piece Swimsuits — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000790004",
        "product_id": "b0000001-0000-0000-0000-000000000079",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom One-Piece Swimsuits — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000080",
    "name": "Custom Bikinis",
    "slug": "custom-bikinis",
    "category_id": "a0000001-0000-0000-0000-000000000006",
    "short_description": "Custom Bikinis for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Bikinis engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Textured Ribbed or Smooth Polyamide Spandex (230 GSM)",
      "Gold/Silver Metal Logo Hardware"
    ],
    "features": [
      "Triangle Top, Bandeau, or Underwire Top Options",
      "Tie-Side or High-Waist Cheeky Bottoms",
      "Chlorine and Sunscreen Resistant",
      "Fully Lined Construction"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Bikinis | GLOVES STORM",
    "seo_description": "Custom Bikinis for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000006",
      "name": "Swimwear & Beachwear",
      "slug": "swimwear-beachwear",
      "description": "Quick-drying board shorts, UPF 50+ rash guards, chlorine-resistant one-piece swimsuits, bikinis, and luxury resort apparel made for performance.",
      "image_url": "/images/products/board-shorts.jpg",
      "parent_id": null,
      "sort_order": 6,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000800001",
        "product_id": "b0000001-0000-0000-0000-000000000080",
        "image_url": "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Bikinis — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000800002",
        "product_id": "b0000001-0000-0000-0000-000000000080",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Custom Bikinis — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000800003",
        "product_id": "b0000001-0000-0000-0000-000000000080",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Custom Bikinis — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000800004",
        "product_id": "b0000001-0000-0000-0000-000000000080",
        "image_url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Bikinis — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000081",
    "name": "Custom Swim Tops",
    "slug": "custom-swim-tops",
    "category_id": "a0000001-0000-0000-0000-000000000006",
    "short_description": "Custom Swim Tops for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Swim Tops engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Matte Stretch Lycra (220 GSM)",
      "Quick-Dry Moisture Transmit",
      "Soft Cups"
    ],
    "features": [
      "Crop Tank or Halter Neck Silhouette",
      "Supportive Underbust Elastic",
      "Custom Print or Solid Dye",
      "Mix-and-Match Sizing Compatible"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Swim Tops | GLOVES STORM",
    "seo_description": "Custom Swim Tops for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000006",
      "name": "Swimwear & Beachwear",
      "slug": "swimwear-beachwear",
      "description": "Quick-drying board shorts, UPF 50+ rash guards, chlorine-resistant one-piece swimsuits, bikinis, and luxury resort apparel made for performance.",
      "image_url": "/images/products/board-shorts.jpg",
      "parent_id": null,
      "sort_order": 6,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000810001",
        "product_id": "b0000001-0000-0000-0000-000000000081",
        "image_url": "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Swim Tops — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000810002",
        "product_id": "b0000001-0000-0000-0000-000000000081",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Swim Tops — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000810003",
        "product_id": "b0000001-0000-0000-0000-000000000081",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Swim Tops — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000810004",
        "product_id": "b0000001-0000-0000-0000-000000000081",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Swim Tops — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000082",
    "name": "Custom Swim Bottoms",
    "slug": "custom-swim-bottoms",
    "category_id": "a0000001-0000-0000-0000-000000000006",
    "short_description": "Custom Swim Bottoms for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Swim Bottoms engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "4-Way Stretch Recycled Polyamide",
      "Antibacterial Hygiene Liner Strip"
    ],
    "features": [
      "High-Leg Brazilian, Cheeky, or Full Coverage",
      "Seamless Finished Edges",
      "Non-Pinch Waistline",
      "Fade Proof UV Inks"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Swim Bottoms | GLOVES STORM",
    "seo_description": "Custom Swim Bottoms for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000006",
      "name": "Swimwear & Beachwear",
      "slug": "swimwear-beachwear",
      "description": "Quick-drying board shorts, UPF 50+ rash guards, chlorine-resistant one-piece swimsuits, bikinis, and luxury resort apparel made for performance.",
      "image_url": "/images/products/board-shorts.jpg",
      "parent_id": null,
      "sort_order": 6,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000820001",
        "product_id": "b0000001-0000-0000-0000-000000000082",
        "image_url": "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Swim Bottoms — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000820002",
        "product_id": "b0000001-0000-0000-0000-000000000082",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Custom Swim Bottoms — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000820003",
        "product_id": "b0000001-0000-0000-0000-000000000082",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Swim Bottoms — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000820004",
        "product_id": "b0000001-0000-0000-0000-000000000082",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Swim Bottoms — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000083",
    "name": "Custom Beach Shorts",
    "slug": "custom-beach-shorts",
    "category_id": "a0000001-0000-0000-0000-000000000006",
    "short_description": "Custom Beach Shorts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Beach Shorts engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Lightweight Micro-Twill Polyester (130 GSM)",
      "Soft Cotton Hand Feel",
      "Water-Repellent DWR"
    ],
    "features": [
      "Casual Relaxed Summer Fit",
      "Contrast Drawcord with Metal Tips",
      "Mesh Drainage Pockets",
      "Custom Sublimated Tropics / Patterns"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Beach Shorts | GLOVES STORM",
    "seo_description": "Custom Beach Shorts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000006",
      "name": "Swimwear & Beachwear",
      "slug": "swimwear-beachwear",
      "description": "Quick-drying board shorts, UPF 50+ rash guards, chlorine-resistant one-piece swimsuits, bikinis, and luxury resort apparel made for performance.",
      "image_url": "/images/products/board-shorts.jpg",
      "parent_id": null,
      "sort_order": 6,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000830001",
        "product_id": "b0000001-0000-0000-0000-000000000083",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Beach Shorts — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000830002",
        "product_id": "b0000001-0000-0000-0000-000000000083",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Beach Shorts — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000830003",
        "product_id": "b0000001-0000-0000-0000-000000000083",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Beach Shorts — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000830004",
        "product_id": "b0000001-0000-0000-0000-000000000083",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Beach Shorts — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000084",
    "name": "Custom Beach Shirts",
    "slug": "custom-beach-shirts",
    "category_id": "a0000001-0000-0000-0000-000000000006",
    "short_description": "Custom Beach Shirts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Beach Shirts engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "100% Rayon / Viscose (120 GSM) or Cotton Linen Blend",
      "Real Coconut Shell Buttons"
    ],
    "features": [
      "Camp Collar (Cuban Collar) Relaxed Fit",
      "All-Over Resort Sublimation or Rotary Print",
      "Straight Hem with Side Splits",
      "Breezy Drape"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Custom Beach Shirts | GLOVES STORM",
    "seo_description": "Custom Beach Shirts for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000006",
      "name": "Swimwear & Beachwear",
      "slug": "swimwear-beachwear",
      "description": "Quick-drying board shorts, UPF 50+ rash guards, chlorine-resistant one-piece swimsuits, bikinis, and luxury resort apparel made for performance.",
      "image_url": "/images/products/board-shorts.jpg",
      "parent_id": null,
      "sort_order": 6,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000840001",
        "product_id": "b0000001-0000-0000-0000-000000000084",
        "image_url": "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Beach Shirts — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000840002",
        "product_id": "b0000001-0000-0000-0000-000000000084",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Beach Shirts — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000840003",
        "product_id": "b0000001-0000-0000-0000-000000000084",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Beach Shirts — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000840004",
        "product_id": "b0000001-0000-0000-0000-000000000084",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Beach Shirts — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000085",
    "name": "Custom Cover-Ups",
    "slug": "custom-cover-ups",
    "category_id": "a0000001-0000-0000-0000-000000000006",
    "short_description": "Custom Cover-Ups for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Cover-Ups engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Semi-Sheer Chiffon, Cotton Voile, or Crochet Knit",
      "Lightweight Flowy Hand"
    ],
    "features": [
      "Kimono, Kaftan, or Tunic Cut",
      "Belted Waist Tie or Open Front",
      "Delicate Edge Tassel / Hemming",
      "Custom Print Placement"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Cover-Ups | GLOVES STORM",
    "seo_description": "Custom Cover-Ups for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000006",
      "name": "Swimwear & Beachwear",
      "slug": "swimwear-beachwear",
      "description": "Quick-drying board shorts, UPF 50+ rash guards, chlorine-resistant one-piece swimsuits, bikinis, and luxury resort apparel made for performance.",
      "image_url": "/images/products/board-shorts.jpg",
      "parent_id": null,
      "sort_order": 6,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000850001",
        "product_id": "b0000001-0000-0000-0000-000000000085",
        "image_url": "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Cover-Ups — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000850002",
        "product_id": "b0000001-0000-0000-0000-000000000085",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Custom Cover-Ups — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000850003",
        "product_id": "b0000001-0000-0000-0000-000000000085",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Custom Cover-Ups — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000850004",
        "product_id": "b0000001-0000-0000-0000-000000000085",
        "image_url": "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Cover-Ups — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000086",
    "name": "Custom Rash Guard Sets",
    "slug": "custom-rash-guard-sets",
    "category_id": "a0000001-0000-0000-0000-000000000006",
    "short_description": "Custom Rash Guard Sets for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Rash Guard Sets engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Matching Rash Guard + Board Shorts / Leggings",
      "UPF 50+ Lycra Interlock (230 GSM)"
    ],
    "features": [
      "Full Coordinated Graphics & Branding",
      "High Durability Ocean & Pool Tested",
      "Comfort Flatlock Seams",
      "Individual Ziplock Packaging"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-3 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Rash Guard Sets | GLOVES STORM",
    "seo_description": "Custom Rash Guard Sets for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000006",
      "name": "Swimwear & Beachwear",
      "slug": "swimwear-beachwear",
      "description": "Quick-drying board shorts, UPF 50+ rash guards, chlorine-resistant one-piece swimsuits, bikinis, and luxury resort apparel made for performance.",
      "image_url": "/images/products/board-shorts.jpg",
      "parent_id": null,
      "sort_order": 6,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000860001",
        "product_id": "b0000001-0000-0000-0000-000000000086",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Rash Guard Sets — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000860002",
        "product_id": "b0000001-0000-0000-0000-000000000086",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Rash Guard Sets — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000860003",
        "product_id": "b0000001-0000-0000-0000-000000000086",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Custom Rash Guard Sets — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000860004",
        "product_id": "b0000001-0000-0000-0000-000000000086",
        "image_url": "/images/products/gym-leggings.jpg",
        "alt_text": "Custom Rash Guard Sets — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000087",
    "name": "Custom Surf Wear",
    "slug": "custom-surf-wear",
    "category_id": "a0000001-0000-0000-0000-000000000006",
    "short_description": "Custom Surf Wear for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Surf Wear engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Neoprene Laminated Lycra (1mm - 2mm)",
      "Reinforced Seamless Paddle Zones"
    ],
    "features": [
      "Wetsuit Tops, Spring Suits, and Surf Vests",
      "Heavy Duty Front/Back YKK Water Zipper",
      "High Flexibility Underarm Paneling",
      "Boardshort Loop Anchors"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 30,
    "lead_time": "3-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Surf Wear | GLOVES STORM",
    "seo_description": "Custom Surf Wear for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000006",
      "name": "Swimwear & Beachwear",
      "slug": "swimwear-beachwear",
      "description": "Quick-drying board shorts, UPF 50+ rash guards, chlorine-resistant one-piece swimsuits, bikinis, and luxury resort apparel made for performance.",
      "image_url": "/images/products/board-shorts.jpg",
      "parent_id": null,
      "sort_order": 6,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000870001",
        "product_id": "b0000001-0000-0000-0000-000000000087",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Surf Wear — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000870002",
        "product_id": "b0000001-0000-0000-0000-000000000087",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Surf Wear — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000870003",
        "product_id": "b0000001-0000-0000-0000-000000000087",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Surf Wear — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000870004",
        "product_id": "b0000001-0000-0000-0000-000000000087",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Custom Surf Wear — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000088",
    "name": "Custom Resort Wear",
    "slug": "custom-resort-wear",
    "category_id": "a0000001-0000-0000-0000-000000000006",
    "short_description": "Custom Resort Wear for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Resort Wear engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "100% Linen or Linen Cotton Blends (180 GSM)",
      "Real Shell or Horn Buttons"
    ],
    "features": [
      "Relaxed Luxury Resort Shirts & Trousers",
      "Pre-Washed for Effortless Texture",
      "Clean Tailored Finishing",
      "Custom Woven Neck & Size Labels"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "3-4 Weeks",
    "featured": false,
    "is_active": true,
    "seo_title": "Custom Resort Wear | GLOVES STORM",
    "seo_description": "Custom Resort Wear for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000006",
      "name": "Swimwear & Beachwear",
      "slug": "swimwear-beachwear",
      "description": "Quick-drying board shorts, UPF 50+ rash guards, chlorine-resistant one-piece swimsuits, bikinis, and luxury resort apparel made for performance.",
      "image_url": "/images/products/board-shorts.jpg",
      "parent_id": null,
      "sort_order": 6,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000880001",
        "product_id": "b0000001-0000-0000-0000-000000000088",
        "image_url": "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Resort Wear — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000880002",
        "product_id": "b0000001-0000-0000-0000-000000000088",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Resort Wear — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000880003",
        "product_id": "b0000001-0000-0000-0000-000000000088",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Custom Resort Wear — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000880004",
        "product_id": "b0000001-0000-0000-0000-000000000088",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Resort Wear — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000089",
    "name": "Custom Beachwear Sets",
    "slug": "custom-beachwear-sets",
    "category_id": "a0000001-0000-0000-0000-000000000006",
    "short_description": "Custom Beachwear Sets for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Custom Beachwear Sets engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Matching Shirt & Short Co-ord Fabric (Viscose / Poly Blend)",
      "Lightweight Breathable Knit"
    ],
    "features": [
      "Full Coordinated Summer Set",
      "All-Over Seamless Pattern Match Across Seams",
      "Elastic Drawcord Waistband on Shorts",
      "Camp Collar Button-Up Shirt"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "2-4 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Custom Beachwear Sets | GLOVES STORM",
    "seo_description": "Custom Beachwear Sets for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000006",
      "name": "Swimwear & Beachwear",
      "slug": "swimwear-beachwear",
      "description": "Quick-drying board shorts, UPF 50+ rash guards, chlorine-resistant one-piece swimsuits, bikinis, and luxury resort apparel made for performance.",
      "image_url": "/images/products/board-shorts.jpg",
      "parent_id": null,
      "sort_order": 6,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000890001",
        "product_id": "b0000001-0000-0000-0000-000000000089",
        "image_url": "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
        "alt_text": "Custom Beachwear Sets — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000890002",
        "product_id": "b0000001-0000-0000-0000-000000000089",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Custom Beachwear Sets — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000890003",
        "product_id": "b0000001-0000-0000-0000-000000000089",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Custom Beachwear Sets — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000890004",
        "product_id": "b0000001-0000-0000-0000-000000000089",
        "image_url": "/images/products/polo-jersey-set.png",
        "alt_text": "Custom Beachwear Sets — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  },
  {
    "id": "b0000001-0000-0000-0000-000000000090",
    "name": "Private Label Swimwear",
    "slug": "private-label-swimwear",
    "category_id": "a0000001-0000-0000-0000-000000000006",
    "short_description": "Private Label Swimwear for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "description": "Private Label Swimwear engineered and manufactured by GLOVES STORM in Sialkot, Pakistan. Designed for international brands, fight gyms, sports teams, and growing private labels requiring rigorous craftsmanship, consistent sizing, and premium materials. Fully customizable with your logo, brand colors, custom labeling, and retail-ready packaging.",
    "materials": [
      "Eco-Certified Recycled Ocean Polyamide",
      "Bespoke Metal Hardware Molds & Charms"
    ],
    "features": [
      "Full Custom Tech Pack Prototyping",
      "Bespoke Branded Matte Ziplock Pouches",
      "Hygiene Stickers & Branded Hang Tags",
      "Strict Chlorine & UV Testing Included"
    ],
    "customization_options": [
      "Logo",
      "colors",
      "materials",
      "sizing",
      "branding",
      "labels",
      "packaging",
      "printing and embroidery where applicable"
    ],
    "moq": 50,
    "lead_time": "3-5 Weeks",
    "featured": true,
    "is_active": true,
    "seo_title": "Private Label Swimwear | GLOVES STORM",
    "seo_description": "Private Label Swimwear for brands, gyms, teams and growing businesses. Customize materials, colors, sizing, branding and packaging with GLOVES STORM.",
    "created_at": "2026-09-14T14:02:04.613Z",
    "updated_at": "2026-09-14T14:02:04.613Z",
    "category": {
      "id": "a0000001-0000-0000-0000-000000000006",
      "name": "Swimwear & Beachwear",
      "slug": "swimwear-beachwear",
      "description": "Quick-drying board shorts, UPF 50+ rash guards, chlorine-resistant one-piece swimsuits, bikinis, and luxury resort apparel made for performance.",
      "image_url": "/images/products/board-shorts.jpg",
      "parent_id": null,
      "sort_order": 6,
      "is_active": true,
      "created_at": "2026-09-14T14:02:04.613Z",
      "updated_at": "2026-09-14T14:02:04.613Z"
    },
    "images": [
      {
        "id": "e0000001-0000-0000-0000-000000900001",
        "product_id": "b0000001-0000-0000-0000-000000000090",
        "image_url": "/images/products/board-shorts.jpg",
        "alt_text": "Private Label Swimwear — Image 01 Hero Product Presentation (GLOVES STORM OEM)",
        "sort_order": 1,
        "is_primary": true,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000900002",
        "product_id": "b0000001-0000-0000-0000-000000000090",
        "image_url": "/images/products/woven-labels.jpg",
        "alt_text": "Private Label Swimwear — Image 02 Material, Stitching & Craftsmanship Detail",
        "sort_order": 2,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000900003",
        "product_id": "b0000001-0000-0000-0000-000000000090",
        "image_url": "/images/products/luxury-packaging.jpg",
        "alt_text": "Private Label Swimwear — Image 03 GLOVES STORM Branding & Angle Presentation",
        "sort_order": 3,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      },
      {
        "id": "e0000001-0000-0000-0000-000000900004",
        "product_id": "b0000001-0000-0000-0000-000000000090",
        "image_url": "/images/products/rash-guard.jpg",
        "alt_text": "Private Label Swimwear — Image 04 Coordinated Variant & Colorway",
        "sort_order": 4,
        "is_primary": false,
        "created_at": "2026-09-14T14:02:04.613Z"
      }
    ]
  }
];

export const initialProjects: Project[] = [
  {
    id: "ab000001-0000-0000-0000-000000000001",
    title: "Championship 16oz Metallic Gold Sparring Gloves",
    slug: "championship-16oz-metallic-gold-sparring-gloves",
    industry: "Boxing Equipment",
    category_id: "a0000001-0000-0000-0000-000000000001",
    description: "1.2mm AAA full-grain cowhide leather with 4-layer EVA/latex knuckle matrix. Laser-cut leather and metallic foil wrist patch for professional gym sparring.",
    challenge: "Client required exact ounce weight calibration within +/- 3 grams and zero thumb puncture risk during heavy sparring.",
    approach: "Precision CNC cut dies with calibrated multi-density foam layering and dual-channel wrist support.",
    solution: "1,200 pairs delivered with custom gold foil debossed leather wrist tags.",
    outcome: "Selected as official sparring glove for national combat championships.",
    featured_image: "/images/products/boxing-gloves-black.png",
    featured: true,
    is_active: true,
    created_at: "2026-09-14T11:04:40.411Z",
    updated_at: "2026-09-14T11:04:40.411Z",
    images: [
      {
        id: "pi-01-1",
        project_id: "ab000001-0000-0000-0000-000000000001",
        image_url: "/images/products/boxing-gloves-black.png",
        alt_text: "Championship Sparring Gloves Front View",
        sort_order: 1,
      },
      {
        id: "pi-01-2",
        project_id: "ab000001-0000-0000-0000-000000000001",
        image_url: "/images/products/boxing-gloves-red.png",
        alt_text: "Sparring Gloves Red Variant",
        sort_order: 2,
      },
      {
        id: "pi-01-3",
        project_id: "ab000001-0000-0000-0000-000000000001",
        image_url: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
        alt_text: "Leather Punching Detail",
        sort_order: 3,
      },
      {
        id: "pi-01-4",
        project_id: "ab000001-0000-0000-0000-000000000001",
        image_url: "https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=1200&auto=format&fit=crop",
        alt_text: "Craftsmanship & Stitching Detail",
        sort_order: 4,
      },
    ],
  },
  {
    id: "ab000001-0000-0000-0000-000000000002",
    title: "460 GSM Heavyweight French Terry Luxury Hoodies",
    slug: "460-gsm-heavyweight-french-terry-luxury-hoodies",
    industry: "Clothing & Streetwear",
    category_id: "a0000001-0000-0000-0000-000000000004",
    description: "Bespoke acid mineral enzyme wash with 3D high-density silicone typography, custom dyed drawcords, and double-stitched kangaroo pocket.",
    challenge: "Standard blanks lacked the architectural drape demanded by luxury streetwear buyers.",
    approach: "Custom-milled 460 GSM combed cotton loopback fleece with zero-shrinkage enzyme washing.",
    solution: "Produced 2,500 units packed in custom branded biodegradable frosted slider bags.",
    outcome: "Sold out within 48 hours of brand drop in Los Angeles.",
    featured_image: "/images/products/hoodie-black.png",
    featured: true,
    is_active: true,
    created_at: "2026-09-14T11:04:40.411Z",
    updated_at: "2026-09-14T11:04:40.411Z",
    images: [
      {
        id: "pi-02-1",
        project_id: "ab000001-0000-0000-0000-000000000002",
        image_url: "/images/products/hoodie-black.png",
        alt_text: "Heavyweight French Terry Hoodie Front",
        sort_order: 1,
      },
      {
        id: "pi-02-2",
        project_id: "ab000001-0000-0000-0000-000000000002",
        image_url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
        alt_text: "Luxury Streetwear Drape",
        sort_order: 2,
      },
      {
        id: "pi-02-3",
        project_id: "ab000001-0000-0000-0000-000000000002",
        image_url: "/images/products/luxury-packaging.jpg",
        alt_text: "Custom Retail Packaging",
        sort_order: 3,
      },
    ],
  },
  {
    id: "ab000001-0000-0000-0000-000000000003",
    title: "Sublimated Championship Basketball Uniforms & Kits",
    slug: "sublimated-championship-basketball-uniforms",
    industry: "Sportswear & Teamwear",
    category_id: "a0000001-0000-0000-0000-000000000002",
    description: "Italian Kiian full-bleed dye sublimation kits on micro-mesh polyester. Ultra-lightweight, zero ink hand-feel, engineered for elite court mobility.",
    challenge: "Short turnaround of 3 weeks for international tournament squad roster.",
    approach: "Round-the-clock digital heat calenders and automated laser cutting.",
    solution: "450 team kits and warm-up shooting shirts delivered ahead of schedule.",
    outcome: "Extended as exclusive apparel supplier for 2 consecutive seasons.",
    featured_image: "/images/products/basketball-uniform.jpg",
    featured: true,
    is_active: true,
    created_at: "2026-09-14T11:04:40.411Z",
    updated_at: "2026-09-14T11:04:40.411Z",
    images: [
      {
        id: "pi-03-1",
        project_id: "ab000001-0000-0000-0000-000000000003",
        image_url: "/images/products/basketball-uniform.jpg",
        alt_text: "Sublimated Basketball Uniform Kit",
        sort_order: 1,
      },
      {
        id: "pi-03-2",
        project_id: "ab000001-0000-0000-0000-000000000003",
        image_url: "/images/products/polo-jersey-set.png",
        alt_text: "Team Travel Polo Kit",
        sort_order: 2,
      },
      {
        id: "pi-03-3",
        project_id: "ab000001-0000-0000-0000-000000000003",
        image_url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
        alt_text: "Teamwear Production Floor",
        sort_order: 3,
      },
    ],
  },
  {
    id: "ab000001-0000-0000-0000-000000000004",
    title: "Seamless High-Compression Leggings & Sports Bra Sets",
    slug: "seamless-high-compression-gym-sets",
    industry: "Gym & Fitness Wear",
    category_id: "a0000001-0000-0000-0000-000000000003",
    description: "300 GSM squat-proof circular knit with 4-way stretch, moisture-wicking capillary channels, and high-rise supportive waistband.",
    challenge: "Achieving 100% opacity during squat tests without sacrificing breathability.",
    approach: "Dual-knit interlock spinning machines utilizing recycled polyamide-spandex blends.",
    solution: "Supplied 3,000 sets across 5 signature seasonal Pantone colorways.",
    outcome: "Under 0.2% return rate across direct-to-consumer client channels.",
    featured_image: "/images/products/gym-leggings.jpg",
    featured: true,
    is_active: true,
    created_at: "2026-09-14T11:04:40.411Z",
    updated_at: "2026-09-14T11:04:40.411Z",
    images: [
      {
        id: "pi-04-1",
        project_id: "ab000001-0000-0000-0000-000000000004",
        image_url: "/images/products/gym-leggings.jpg",
        alt_text: "Seamless Gym Leggings Presentation",
        sort_order: 1,
      },
      {
        id: "pi-04-2",
        project_id: "ab000001-0000-0000-0000-000000000004",
        image_url: "/images/products/rash-guard.jpg",
        alt_text: "Compression Training Top",
        sort_order: 2,
      },
      {
        id: "pi-04-3",
        project_id: "ab000001-0000-0000-0000-000000000004",
        image_url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
        alt_text: "Activewear Athletic Testing",
        sort_order: 3,
      },
    ],
  },
  {
    id: "ab000001-0000-0000-0000-000000000005",
    title: "Tajima 12-Needle Gold Bullion Embroidery Trunks",
    slug: "tajima-12-needle-gold-bullion-embroidery-trunks",
    industry: "Custom Manufacturing & Private Label",
    category_id: "a0000001-0000-0000-0000-000000000005",
    description: "22,000 stitches of metallic Japanese bullion thread stitched onto heavy satin fight trunks. Zero puckering or thread breaks under physical strain.",
    challenge: "Puckering on lightweight satin fight trunks during high-density metallic crest embroidery.",
    approach: "Underlay backing stabilization with tension-calibrated computerized Tajima embroidery heads.",
    solution: "Flawless custom championship trunks with zero puckering.",
    outcome: "Worn by top 10 world contenders on televised international pay-per-view.",
    featured_image: "/images/products/boxing-focuspads.jpg",
    featured: true,
    is_active: true,
    created_at: "2026-09-14T11:04:40.411Z",
    updated_at: "2026-09-14T11:04:40.411Z",
    images: [
      {
        id: "pi-05-1",
        project_id: "ab000001-0000-0000-0000-000000000005",
        image_url: "/images/products/boxing-focuspads.jpg",
        alt_text: "Custom Bullion Embroidery Fight Equipment",
        sort_order: 1,
      },
      {
        id: "pi-05-2",
        project_id: "ab000001-0000-0000-0000-000000000005",
        image_url: "/images/products/woven-labels.jpg",
        alt_text: "Custom Woven Damask Labels",
        sort_order: 2,
      },
      {
        id: "pi-05-3",
        project_id: "ab000001-0000-0000-0000-000000000005",
        image_url: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop",
        alt_text: "Factory Precision Embroidery Floor",
        sort_order: 3,
      },
    ],
  },
  {
    id: "ab000001-0000-0000-0000-000000000006",
    title: "UPF 50+ Performance Compression Rash Guards & Board Shorts",
    slug: "upf-50-performance-rash-guards-board-shorts",
    industry: "Swimwear & Beachwear",
    category_id: "a0000001-0000-0000-0000-000000000006",
    description: "Quick-drying 4-way stretch polyester/spandex rash guards with silicone hem grip and chlorine-resistant microfiber board shorts.",
    challenge: "Saltwater and chlorine degradation on custom printed patterns.",
    approach: "High-fastness disperse dyes with UV-stabilized coating on hydrophobic microfiber.",
    solution: "Produced 1,800 units for coastal surf academies and combat fitness resorts.",
    outcome: "Zero fading after 100+ hours of continuous salt & chlorine testing.",
    featured_image: "/images/products/board-shorts.jpg",
    featured: true,
    is_active: true,
    created_at: "2026-09-14T11:04:40.411Z",
    updated_at: "2026-09-14T11:04:40.411Z",
    images: [
      {
        id: "pi-06-1",
        project_id: "ab000001-0000-0000-0000-000000000006",
        image_url: "/images/products/board-shorts.jpg",
        alt_text: "Performance Board Shorts",
        sort_order: 1,
      },
      {
        id: "pi-06-2",
        project_id: "ab000001-0000-0000-0000-000000000006",
        image_url: "/images/products/rash-guard.jpg",
        alt_text: "UPF 50+ Compression Rash Guard",
        sort_order: 2,
      },
      {
        id: "pi-06-3",
        project_id: "ab000001-0000-0000-0000-000000000006",
        image_url: "/images/products/luxury-packaging.jpg",
        alt_text: "Retail Ziplock Packaging",
        sort_order: 3,
      },
    ],
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    "id": "d0000001-0000-0000-0000-000000000001",
    "client_name": "Marcus Vance",
    "company": "Vance Fight Gear & Apparel",
    "country": "United Kingdom",
    "role": "Founder & Product Director",
    "testimonial": "Finding a manufacturer in Sialkot that understands luxury finishing, millimeter tolerances, and proactive communication is rare. GLOVES STORM engineered our 16oz lace-up gloves to a standard that rivals the most famous Mexican and Japanese fight brands. Our customer return rate dropped below 0.4%. They are truly our manufacturing backbone.",
    "photo_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    "rating": 5,
    "featured": true,
    "is_active": true,
    "created_at": "2026-09-14T11:04:40.411Z"
  },
  {
    "id": "d0000001-0000-0000-0000-000000000002",
    "client_name": "Elena Rostova",
    "company": "Kinetics Studio Brand",
    "country": "United States",
    "role": "Head of Supply Chain & Design",
    "testimonial": "Our streetwear hoodie drop required 450 GSM custom-knit loopback French Terry and very specific boxy measurements. GLOVES STORM turned our tech packs into flawless physical samples within 9 days. The stitch density, custom neck tagging, and packaging exceeded our expectations. Our community raves about the quality.",
    "photo_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    "rating": 5,
    "featured": true,
    "is_active": true,
    "created_at": "2026-09-14T11:04:40.411Z"
  },
  {
    "id": "d0000001-0000-0000-0000-000000000003",
    "client_name": "Christian Dubois",
    "company": "Athletica Pro Performance",
    "country": "France / Europe",
    "role": "Managing Director",
    "testimonial": "We have imported sports goods for over 14 years. What distinguishes GLOVES STORM is their engineering discipline and transparent production tracking. You receive video updates from the stitching floor, lab tests on fabrics, and punctual worldwide dispatch. An indispensable partner for any brand scaling seriously.",
    "photo_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    "rating": 5,
    "featured": true,
    "is_active": true,
    "created_at": "2026-09-14T11:04:40.411Z"
  },
  {
    "id": "d0000001-0000-0000-0000-000000000004",
    "client_name": "Tariq Al-Mansoor",
    "company": "Vortex MMA Gyms",
    "country": "United Arab Emirates",
    "role": "Operations Director",
    "testimonial": "We outfitted 8 commercial combat gyms across Dubai and Abu Dhabi with custom branded punching bags, sparring gloves, and coaching pads. The durability under daily heavy commercial use has been astonishing. Professional craftsmanship through and through.",
    "photo_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    "rating": 5,
    "featured": false,
    "is_active": true,
    "created_at": "2026-09-14T11:04:40.411Z"
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    "id": "b0000001-0000-0000-0000-000000000001",
    "title": "The Anatomy of a Championship Boxing Glove: Foam Density, Ergonomics & Leather Selection",
    "slug": "anatomy-of-championship-boxing-glove-foam-density-leather",
    "excerpt": "An in-depth technical analysis of multi-layer foam sandwich construction, hand compartment ergonomics, and why full-grain cowhide remains unmatched for elite combat sports manufacturing.",
    "content": "### Engineering Protection for the World’s Best Fighters\n\nIn professional combat sports manufacturing, a glove is never simply a piece of sewn leather. It is an intricate kinetic dampener engineered to protect the 27 small bones of the human hand while transferring maximum kinetic energy safely into a target.\n\nAt **GLOVES STORM**, our glove design process begins with anatomical mold sculpting. \n\n#### 1. The Foam Sandwich Architecture\nStandard mass-market gloves often rely on single-density injection-molded polyurethane (IMF). While cost-effective, IMF degrades rapidly under heavy impact and provides uneven shock attenuation.\n\nIn contrast, our championship series utilizes a 5-layer composite sandwich:\n* **Outer Layer (15mm)**: High-density EVA foam that absorbs the initial shockwave and prevents knuckle penetration.\n* **Core Layer (20mm)**: Natural open-cell latex rubber, which provides responsive tactile feedback and dynamic deceleration.\n* **Secondary Dampener (10mm)**: Orthopedic sponge foam for fist comfort.\n* **Under-Knuckle Shield (5mm)**: High-resilience closed-cell foam protecting the metacarpal joints.\n* **Palm Splinting**: Dual-layered EVA rods along the carpal tunnel to eliminate wrist hyperextension upon punch angle deflection.\n\n#### 2. Leather Selection: Full-Grain Cowhide vs. High-Tech Microfiber\nLeather quality dictates the longevity and memory of the glove. We source Grade-A full-grain cowhide from responsible tanneries, ensuring uniform 1.1mm to 1.2mm thickness. For vegan and cruelty-free technical lines, our microfiber synthetics deliver 300,000 cycles on Martindale abrasion tests—surpassing conventional PU leather by 400%.\n\n#### 3. Why Brands Partner with GLOVES STORM for Custom Gloves\nWhen brands partner with GLOVES STORM in Sialkot, they receive full control over every dimension: thumb curve angle, lace channel tension, custom foil debossing, and tailored weight calibrations down to the exact gram.",
    "featured_image": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
    "category": "Manufacturing",
    "author": "GLOVES STORM Engineering Team",
    "published_at": "2026-09-10T11:04:40.411Z",
    "is_published": true,
    "seo_title": "Technical Guide: How Championship Boxing Gloves Are Made | GLOVES STORM",
    "seo_description": "Learn the engineering behind multi-layer foam, leather selection, and wrist stabilization in custom boxing glove manufacturing.",
    "social_image": null,
    "created_at": "2026-09-14T11:04:40.411Z",
    "updated_at": "2026-09-14T11:04:40.411Z"
  },
  {
    "id": "b0000001-0000-0000-0000-000000000002",
    "title": "Mastering 450 GSM French Terry: Why Fabric Weight & Combing Define Luxury Streetwear",
    "slug": "mastering-450-gsm-french-terry-luxury-streetwear-guide",
    "excerpt": "Why modern luxury apparel brands are abandoning lightweight fleece in favor of heavyweight 400-500 GSM loopback French Terry, and how to structure a tech pack for zero shrinkage.",
    "content": "### The Rise of Structural Streetwear\n\nOver the past five years, the global luxury streetwear market has undergone a decisive transition. Modern consumers no longer tolerate thin, polyester-blend hoodies that pill after two washes. The standard has shifted toward architectural silhouettes—garments that hold their shape independently on the body.\n\nThe cornerstone of this movement is **450 GSM Combed Cotton French Terry**.\n\n#### What Exactly is Loopback French Terry?\nUnlike brushed fleece, which has a fuzzy nap created by mechanical wire brushes, loopback French Terry features tight circular loops on the interior and a smooth, dense jersey surface on the exterior. \n\nKey advantages for premium brands include:\n* **Breathability without bulk**: The cotton loops act as natural thermal ventilators, wicking moisture away while maintaining substantial physical weight.\n* **Crisp Embroidery Canvas**: High-density 450 GSM fabric will not pucker or warp under 15,000-stitch chenille or 3D puff embroidery.\n* **Crisp Boxy Silhouette**: The substantial drape allows dropped shoulders and wider sleeves to hang cleanly without sagging.\n\n#### The Importance of Enzyme Pre-Washing\nOne of the most common pitfalls for emerging brands manufacturing overseas is garment shrinkage. When unwashed French Terry hits a retail washing machine, it can lose up to 8% in body length.\n\nAt GLOVES STORM, every roll of custom-milled French Terry undergoes pre-shrinking and organic enzyme washing prior to precision laser cutting. This ensures that the size medium you approve in your prototype remains the exact size medium your customer wears for years.",
    "featured_image": "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    "category": "Streetwear",
    "author": "Apparel Design Division",
    "published_at": "2026-09-02T11:04:40.411Z",
    "is_published": true,
    "seo_title": "How to Manufacture 450 GSM Luxury Heavyweight Hoodies | GLOVES STORM",
    "seo_description": "Everything sports and streetwear brands need to know about French Terry fabric weights, enzyme washes, and tech packs.",
    "social_image": null,
    "created_at": "2026-09-14T11:04:40.411Z",
    "updated_at": "2026-09-14T11:04:40.411Z"
  },
  {
    "id": "b0000001-0000-0000-0000-000000000003",
    "title": "From Tech Pack to Bulk Production: A Step-by-Step OEM Manufacturing Blueprint",
    "slug": "from-tech-pack-to-bulk-production-oem-manufacturing-guide",
    "excerpt": "A clear, transparent walkthrough of the 6 core stages of custom sports apparel production for brand founders and supply chain directors.",
    "content": "### Navigating the Manufacturing Journey\n\nTransitioning an idea from an Adobe Illustrator mockup into thousands of retail-ready garments packed on a shipping pallet is one of the most critical steps in building a profitable brand.\n\nAt GLOVES STORM, we operate with complete transparency. Here is exactly how our production pipeline flows from day one.\n\n#### Step 1: Technical Review & Material Sourcing\nWhen you submit your tech pack or reference samples, our technical pattern makers review seam constructions, stitch types (such as flatlock or 4-needle overlock), fabric GSM, and accessory specifications. We match your target colors to universal Pantone TCX or TPX standards.\n\n#### Step 2: Digital Grading & Pattern CAD\nWe create precise digital pattern files graded across your requested size range (e.g. S through 3XL). This ensures that grading curves maintain proportion across all body types.\n\n#### Step 3: Prototyping & Sampling\nA physical master sample is constructed. We ship this sample directly to your studio via express courier, accompanied by a detailed swatch booklet showing optional print finishes and alternative fabric densities.\n\n#### Step 4: Bulk Cutting & Customization\nOnce your physical sample is signed off, bulk fabric is inspected for color consistency, tension-relaxed for 24 hours, and cut using computerized automated cutting tables. Customization processes—such as Italian dye sublimation, screen printing, embroidery, and silicone heat transfers—are applied at the flat panel stage for optimal sharpness.\n\n#### Step 5: Master Stitching & Assembly\nOur specialized production lines (combat gear, performance jerseys, seamless activewear, and cut & sew outerwear) assemble each garment using industrial machinery calibrated for each fabric type.\n\n#### Step 6: Multi-Stage Quality Control & Global Logistics\nEvery single item is hand-inspected for loose threads, dimensional measurements against specification sheets, and hardware durability. Finished goods are polybagged, tagged, barcoded, and packed into heavy 5-ply export cartons ready for air or ocean transit to your warehouse.",
    "featured_image": "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop",
    "category": "Product Development",
    "author": "GLOVES STORM Editorial",
    "published_at": "2026-08-20T11:04:40.411Z",
    "is_published": true,
    "seo_title": "How OEM Sports Manufacturing Works: Tech Pack to Delivery | GLOVES STORM",
    "seo_description": "Learn how custom sports apparel and fight gear moves from tech packs to bulk production with GLOVES STORM Sialkot.",
    "social_image": null,
    "created_at": "2026-09-14T11:04:40.411Z",
    "updated_at": "2026-09-14T11:04:40.411Z"
  },
  {
    "id": "b0000001-0000-0000-0000-000000000004",
    "title": "Custom Sublimation vs. Screen Printing: The Technical Sourcing Guide for Teamwear & Athletic Uniforms",
    "slug": "sublimation-vs-screen-printing-custom-teamwear-guide",
    "excerpt": "A complete chemical, thermodynamic, and commercial comparison between Italian dye sublimation and high-density plastisol screen printing for performance polyester athletic uniforms, soccer kits, and bulk jerseys.",
    "content": "### Sourcing the Right Print Technology for High-Performance Athletic Apparel\n\nWhen scaling an athletic brand or manufacturing custom teamwear for professional clubs, few technical decisions affect performance, unit economics, and garment longevity as heavily as the choice between **Full Dye Sublimation** and **Plastisol Screen Printing**.\n\nAt **GLOVES STORM**, our Sialkot manufacturing facility operates both high-capacity Italian sublimation heat calenders and automatic 12-color textile screen printing carousels. Below is our engineering breakdown of how these technologies perform under physical stress, washing fatigue, and commercial bulk production.\n\n#### 1. The Physics of Dye Sublimation: Molecular Bonding\nDye sublimation does not lay ink on top of the fabric. Instead, disperse dye inks printed on high-release transfer paper are heated to **205°C (401°F)** under 4.5 bar of hydraulic pressure. \n\nAt this temperature:\n* The polymer chains in the synthetic polyester fibers relax and expand.\n* The solid dye transitions directly into a gas without passing through a liquid phase.\n* The gaseous dye permeates the open polyester filament fibers and fuses permanently into the polymer matrix upon cooling.\n\n**Key Engineering Benefits:**\n* **Zero Hand Feel (Zero Ink Weight)**: Unlike rubberized inks, sublimated fabric retains 100% of its native airflow, moisture-wicking porosity, and hand feel.\n* **No Cracking or Peeling**: Because the color is inside the fiber, it cannot crack, flake, or peel—even after 200+ commercial wash cycles.\n* **Full-Bleed Seam-to-Seam Graphic Freedom**: Numbers, sponsor crests, complex gradients, and sleeve patterns are printed simultaneously at no additional setup cost per color.\n\nExplore our production options in the [Sportswear & Teamwear Catalog](/products/sportswear-teamwear) and check specifications on our [Sublimated Soccer Uniforms](/products/sportswear-teamwear/sublimated-soccer-uniforms).\n\n#### 2. Screen Printing: When High-Density Inks Win\nWhile sublimation is the undisputed champion for 100% polyester athletic kits, screen printing remains essential for natural fibers (cotton tees, heavyweight French Terry fleece) and specialized finishes:\n* **Puff & 3D High-Density Inks**: Creating tactile, elevated silicone or rubber logos (1mm to 3mm height) that stand out on luxury streetwear.\n* **Metallic & Reflective Accents**: High-visibility silver glass-bead reflective inks engineered for night runners and military training apparel.\n* **High-Volume Solid Color Runs**: When printing 5,000+ single-color cotton t-shirts, screen printing achieves unmatched economies of scale.\n\n#### 3. Breathability & Micro-Perforation Testing\nIn modern combat and football kits, athlete thermoregulation is non-negotiable. When large plastisol chest logos are screen-printed on lightweight 140 GSM interlock polyester, they create an impermeable \"sweat trap\" against the skin. Sublimation preserves the wicking capillary action of moisture-wicking fabrics like bird’s-eye mesh and micro-poly interlock.\n\n#### 4. Design Your Teamwear in Real-Time\nWant to test custom color blocking, sponsor crest placements, and typography before ordering production samples? Submit your tech pack or request physical fabric swatches through our [Direct Factory Inquiry](/contact) channel.",
    "featured_image": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    "category": "Sportswear",
    "author": "GLOVES STORM Textile Engineering",
    "published_at": "2026-08-15T10:00:00.000Z",
    "is_published": true,
    "seo_title": "Sublimation vs Screen Printing: Custom Teamwear Manufacturing Guide",
    "seo_description": "Compare dye sublimation vs screen printing for custom sports uniforms, soccer jerseys, and athletic teamwear with GLOVES STORM Sialkot OEM.",
    "social_image": null,
    "created_at": "2026-09-14T11:04:40.411Z",
    "updated_at": "2026-09-14T11:04:40.411Z"
  },
  {
    "id": "b0000001-0000-0000-0000-000000000005",
    "title": "Engineering Elite MMA Fight Shorts & Compression Rash Guards: 4-Way Stretch, Flatlock Stitching & Durability",
    "slug": "engineering-mma-fight-shorts-rash-guards-bjj-oem",
    "excerpt": "Why 250+ GSM poly-elastane blends, 4-needle 6-thread flatlock stitching, and anti-slip silicone waistbands are mandatory for championship combat sports fightwear and IBJJF tournament compliance.",
    "content": "### The Brutal Demands of Modern Combat Fightwear\n\nMixed Martial Arts and Brazilian Jiu-Jitsu subject athletic apparel to the highest shear forces, friction, and tensile strain of any sport on earth. A standard athletic shirt or gym short will tear at the seams within minutes of intense grappling on vinyl tatami mats.\n\nAt **GLOVES STORM**, our Combat Apparel Division engineers fightwear specifically calibrated to resist mat burn, finger snagging, and tensile seam blowout.\n\n#### 1. Rash Guard Fabric Architecture: 250 GSM vs. Standard 180 GSM\nMost off-the-shelf compression shirts use thin 160–180 GSM polyester-spandex blends. Under heavy sweating and friction against canvas rings or BJJ gis, these lightweight fabrics become translucent, pill excessively, and lose their elastic memory.\n\nOur custom competition rash guards utilize a specialized **250–260 GSM warp-knit 82% Polyester / 18% Spandex blend**:\n* **Multidirectional 4-Way Stretch**: Allows unrestricted shoulder mobility for grappling, guard retention, and submissions.\n* **Graduated Compression Profile**: Supports upper-body blood circulation and reduces muscle vibration during explosive striking.\n* **Anti-Chafing Flatlock Stitching**: Assembled using 4-needle 6-thread industrial flatlock seams that lie completely flush against the athlete's skin, eliminating mat burn and friction blisters.\n* **Anti-Slip Internal Silicone Hem**: A 25mm hypoallergenic silicone gel waistband lines the bottom hem, preventing the rash guard from riding up past the ribcage during grappling exchanges.\n\nExplore our battle-tested range in the [MMA & Fightwear Equipment Catalog](/products/mma-martial-arts).\n\n#### 2. Championship MMA Fight Shorts: Tear-Resistant Engineering\nChampionship MMA fight shorts require a hybrid construction that combines featherweight freedom of movement with bulletproof durability:\n* **Micro-Stretch Poly Body**: 160 GSM ripstop polyester fabric treated with hydrophobic Teflon DWR coating to repel sweat and mat moisture.\n* **High-Tensile Lycra Crotch Flex Panel**: 4-way stretch gusset inserted into the inseam allows full 180° high kicks and rubber guard flexibility without seam tension.\n* **Reinforced Side Slits**: 5-inch reinforced side vents bar-tacked with high-tensile bonded nylon thread.\n* **Dual-Closure Velcro & Internal Drawstring**: Interlocking hook-and-loop flap closure paired with an internal flat drawcord ensures zero slippage during takedowns.\n\n#### 3. Regulatory Compliance: IBJJF & Combat Promotions\nIf your brand supplies athletes competing in IBJJF, ADCC, or state athletic commissions, color ratios and safety standards must be met. We manufacture ranked rash guards with exact percentage color blocking (minimum 10% ranked color for IBJJF No-Gi).\n\nLearn more about our equipment manufacturing at our [Manufacturing Standards Guide](/manufacturing) or request sample swatches and custom combat apparel specs via our [Direct Factory Inquiry](/contact).",
    "featured_image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    "category": "Fightwear",
    "author": "GLOVES STORM Combat Division",
    "published_at": "2026-08-05T10:00:00.000Z",
    "is_published": true,
    "seo_title": "Custom MMA Shorts & Rash Guards Manufacturing: Technical OEM Guide",
    "seo_description": "Detailed manufacturing breakdown for custom MMA shorts, BJJ rash guards, compression spats, and combat apparel direct from Sialkot factory.",
    "social_image": null,
    "created_at": "2026-09-14T11:04:40.411Z",
    "updated_at": "2026-09-14T11:04:40.411Z"
  },
  {
    "id": "b0000001-0000-0000-0000-000000000006",
    "title": "Private Label Activewear & Seamless Gym Leggings: Sourcing Blueprint for Emerging Fitness Brands",
    "slug": "private-label-gym-leggings-activewear-sourcing-blueprint",
    "excerpt": "How to source squat-proof 280-320 GSM recycled nylon-spandex, eliminate camel-toe front seam friction, and calibrate compression recovery for commercial fitness and athleisure apparel lines.",
    "content": "### Building a High-Retention Fitness Apparel Brand\n\nIn the global direct-to-consumer fitness apparel industry, return rates are dominated by two customer complaints: **\"these leggings are see-through when I squat\"** and **\"the waistband rolls down during running.\"**\n\nFor emerging athleisure and activewear brands, solving these two technical challenges in your tech pack is the difference between achieving 40% repeat customer rates or burning cash on return logistics.\n\nAt **GLOVES STORM**, our activewear laboratory mills custom yarns and tests elongation recovery to ensure every pair of gym leggings meets rigorous commercial standards.\n\n#### 1. The Science of the \"Squat-Proof\" Interlock Knit\nOpacity during deep knee flexion is achieved through two variables: **Yarn Count (Denier)** and **Knit Gauge Structure**.\n* **Circular Interlock vs. Single Jersey**: Single jersey knits expose underlying yarn gaps when stretched over the glutes. In contrast, our high-performance leggings use dual-knit interlock machines where two sets of needles create interlocking front-and-back loops, ensuring zero light transmission under 100% elongation.\n* **Optimal GSM Range**: We recommend **280 GSM to 320 GSM** using a 75% Recycled Nylon (Polyamide 6.6) / 25% High-Recovery Elastane blend. Nylon delivers a cool-touch, buttery soft \"naked feel\" while retaining 96% of its shape memory after 1,000 stress cycles.\n\nBrowse our customizable fitness collection in the [Gym & Fitness Wear Catalog](/products/gym-fitness-wear).\n\n#### 2. Ergonomic Pattern Architecture & Front-Seam Elimination\nModern consumer preference has decisively moved toward clean, seamless front rises:\n* **Gusseted Diamond Crotch**: Eliminating the central 4-way cross seam in the crotch and replacing it with an anatomical diamond or teardrop gusset eliminates front bunching and distributes tensile load evenly across the pelvis.\n* **Contoured High-Rise Compression Waistbands**: Multi-panel waistbands featuring internal bonded power-mesh lining provide gentle abdominal compression and anchor the garment against the natural waistline without digging in or rolling down.\n* **Rear Booty-Contour Ruching (Scrunch Seams)**: Precision elastic micro-stitching along the gluteal fold creates subtle lift and definition without compromising fabric integrity.\n\n#### 3. Custom Branding & Private Label Finishes\nAt GLOVES STORM, your private label activewear can be fully customized with:\n* **Silicone High-Gloss Transfers**: Flexible, crack-free branding heat-applied at 160°C.\n* **Laser-Cut Perforations**: Functional ventilation patterns along calf and thigh panels.\n* **Woven or Eco-Friendly TPU Care Labels**: Tagless interior heat seals preventing skin irritation.\n* **Biodegradable Frost Polybags & Barcode Hangtags**: Retail-ready fulfillment packaging.\n\nStart prototyping your fitness collection with our [Factory Engineering Team](/contact) for fabric swatches and custom tech pack review.",
    "featured_image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    "category": "Activewear",
    "author": "GLOVES STORM Activewear Labs",
    "published_at": "2026-07-28T10:00:00.000Z",
    "is_published": true,
    "seo_title": "Private Label Activewear & Gym Leggings Manufacturing Blueprint",
    "seo_description": "Technical guide to custom seamless activewear, gym leggings, compression sports bras, and private label fitness apparel manufacturing with low MOQ.",
    "social_image": null,
    "created_at": "2026-09-14T11:04:40.411Z",
    "updated_at": "2026-09-14T11:04:40.411Z"
  },
  {
    "id": "b0000001-0000-0000-0000-000000000007",
    "title": "Custom Boxing Glove Weight Calibration (8oz to 16oz): Technical Specifications for Gym Owners & Fight Promotions",
    "slug": "boxing-glove-weight-calibration-8oz-to-16oz-specifications",
    "excerpt": "Exact gram-to-ounce distribution formulas, multi-layer foam core ratios, and sparring vs. professional fight glove engineering standards for private label combat sports brands.",
    "content": "### The Critical Math Behind Professional Boxing Glove Weights\n\nIn championship boxing, amateur bouts, and daily gym sparring, glove weight is not a cosmetic detail—it is a strict safety specification regulated by athletic commissions worldwide. If an OEM manufacturer ships a batch of \"10oz\" competition fight gloves that weigh 11.2oz due to inconsistent foam molding or moisture absorption, those gloves will be disqualified at the official fight-week weigh-in.\n\nAt **GLOVES STORM** in Sialkot—the historic epicenter of hand-stitched combat equipment—we calibrate our custom glove lines to within **±3 grams of target weight**.\n\n#### 1. Weight Breakdown: Ounces, Grams & Intended Combat Application\n* **8oz (226.8g)**: Welterweight & below professional championship fight gloves. Compact hand compartment, minimal knuckle padding, designed for maximum kinetic impact transfer and fight-ending speed.\n* **10oz (283.5g)**: Super welterweight & heavyweight professional competition bouts, plus international amateur boxing. Balanced between knuckle protection and hand velocity.\n* **12oz (340.2g)**: Heavy bag training, pad work, and technical drills. Ideal resistance training weight that builds shoulder stamina without overwhelming wrist joints.\n* **14oz (396.9g)**: All-around training and intermediate sparring. Increased foam density in the upper knuckle zone protects training partners during controlled rounds.\n* **16oz (453.6g)**: Heavy commercial gym sparring. Maximum shock absorption with multi-layered composite padding to prevent concussion risk and knuckle bruising.\n\nCheck out our flagship handcrafted equipment in our [Custom Boxing Gloves Specifications](/products/boxing-equipment/custom-boxing-gloves) or explore our complete [Boxing Equipment Division](/products/boxing-equipment).\n\n#### 2. How We Distribute Weight: Padding vs. Leather vs. Splinting\nA 16oz glove should never simply have 6oz of extra leather. The internal weight architecture must maintain fist balance so the fighter’s forearm does not experience torque strain:\n* **Knuckle Target Core (55% of Total Weight)**: 5-layer composite foam (EVA, shock-absorbing open-cell latex rubber, and orthopedic high-rebound sponge).\n* **Wrist Splint & Cuff (25% of Total Weight)**: Dual-density EVA splinting rods flanking the ulnar and radial wrist bones to prevent wrist flexion under off-center hook impacts.\n* **Leather Shell & Liner (20% of Total Weight)**: 1.1mm Grade-A full-grain cowhide leather backed with water-repellent taffeta lining that prevents sweat accumulation from adding post-round weight.\n\n#### 3. Sourcing Custom Fight Gear for Your Brand or Promotion\nWhether you are outfitting a global fight promotion with custom championship lace-up gloves or launching a premium retail fight brand, GLOVES STORM provides full OEM/ODM branding: embossed wrist patches, metallic leather finishes, custom lace channel tensions, and branded presentation boxes.\n\nTalk directly with our master pattern makers on our [Contact & Factory Inquiry Page](/contact) to configure your custom glove specs and weight calibration.",
    "featured_image": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
    "category": "Combat Equipment",
    "author": "Master Glove Craftsmen of Sialkot",
    "published_at": "2026-07-15T10:00:00.000Z",
    "is_published": true,
    "seo_title": "Boxing Glove Weight Calibration (8oz - 16oz): OEM Sourcing Guide",
    "seo_description": "Explore exact weight calibration, foam core density, and wrist splinting specs across 8oz, 10oz, 12oz, 14oz, and 16oz custom boxing gloves.",
    "social_image": null,
    "created_at": "2026-09-14T11:04:40.411Z",
    "updated_at": "2026-09-14T11:04:40.411Z"
  },
  {
    "id": "b0000001-0000-0000-0000-000000000008",
    "title": "B2B Sourcing from Sialkot: The Complete Buyer’s Playbook for MOQ, Customs, Freight & Quality Audits",
    "slug": "sialkot-oem-manufacturing-guide-moq-customs-quality-audits",
    "excerpt": "The definitive international buyer's playbook to navigating Sialkot export hubs: negotiating low MOQs, AQL 2.5 quality control audits, Incoterms (FOB vs DDP), and air vs sea freight logistics.",
    "content": "### Why Sialkot Produces Over 70% of the World's Hand-Stitched Sports Goods\n\nLocated in northeast Punjab, Pakistan, the industrial city of **Sialkot** is a global manufacturing anomaly. For over a century, Sialkot has dominated the world’s production of hand-stitched leather goods, soccer balls, boxing gloves, martial arts uniforms, and athletic teamwear. From FIFA World Cup official match balls to elite UFC and Olympic fight gear, Sialkot's specialized artisan ecosystem powers the world's most recognizable sports brands.\n\nHowever, for emerging brand founders and overseas supply chain directors, navigating overseas manufacturing can feel daunting. Below is our direct, transparent playbook for sourcing successfully from Sialkot.\n\n#### 1. Deciphering Minimum Order Quantities (MOQs)\nOne of the biggest misconceptions in apparel manufacturing is that factories demand 1,000 units per style from day one. At **GLOVES STORM**, we understand that high-growth brands need nimble cash flow.\n* **Our Standard MOQs**: We offer accessible starter production runs starting at **50 to 100 units per style**, allowing brands to test market demand, validate sizing curves, and generate early customer cash flow without warehouse dead-stock.\n* **Colorway Flexibility**: Within a 100-unit production order, we allow multiple sizes (e.g. S through 2XL) and split colorways, provided base fabric rolls match.\n\nReview our factory floor setup and precision equipment on our [Manufacturing Standards Page](/manufacturing).\n\n#### 2. Quality Control: The AQL 2.5 Standard\nNever partner with a factory that cannot clearly define its Quality Assurance inspection thresholds. At GLOVES STORM, all bulk export orders undergo **ISO 2859-1 (AQL 2.5) statistical sampling** across four sequential checkpoints:\n1. **Raw Material Quarantine**: Tensile pull testing on leather, Martindale abrasion checks on synthetics, and fabric roll shade-sorting under calibrated D65 light booths.\n2. **Flat Panel Quality Control**: Checking print alignment, embroidery stitch density, and laser cut dimensions before stitching commences.\n3. **Inline Assembly Audits**: Inspecting seam tension, needle punch alignment, and hardware durability during stitching.\n4. **Final Packaging Audit**: 100% inspection for loose thread trimming, barcode hangtag accuracy, and polybag desiccant placement.\n\n#### 3. Incoterms & International Logistics: FOB vs. DDP\nWhen shipping from Sialkot to your distribution center in North America, Europe, or Australia, choosing the right Incoterm protects your profit margin:\n* **FOB (Free on Board - Sialkot / Lahore)**: We handle all local factory transport, export customs clearance, and loading onto the international carrier. You manage air/sea freight and destination duties.\n* **DDP (Delivered Duty Paid)**: The turnkey option for emerging brands. GLOVES STORM coordinates international freight forwarding, customs clearance, import tariffs, and doorstep delivery directly to your warehouse with zero surprise fees.\n* **Air Courier (DHL / FedEx Express)**: 4 to 6 business days transit time. Best for master prototype samples and urgent seasonal drop restocks.\n* **Air Cargo / Ocean Freight**: 10–14 days (air) or 25–35 days (ocean). Best for bulk commercial container orders (500+ kg).\n\n#### 4. The 5-Step Sourcing Workflow\nReady to launch your product line? Here is the exact path forward:\n1. **Submit Tech Pack or Reference Garment**: Share your specs via our [Direct Factory Inquiry](/contact).\n2. **Commercial Quotation**: Receive tiered unit pricing, sample development fees, and production schedules within 24 hours.\n3. **Master Sample Creation**: We construct, photograph, and courier your physical prototype with fabric swatch rings.\n4. **Sample Sign-Off & Bulk Production**: Once approved, automated cutting and master stitching begin.\n5. **Factory Gate Quality Release & Doorstep Delivery**: Pre-shipment audit video is shared, followed by global tracking numbers.\n\nExplore our entire range of sports and combat gear across the [GLOVES STORM Wholesale Directory](/products) or submit your custom prototype specs via our [Direct Factory Inquiry](/contact).",
    "featured_image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    "category": "Supply Chain",
    "author": "GLOVES STORM Supply Chain Directors",
    "published_at": "2026-07-01T10:00:00.000Z",
    "is_published": true,
    "seo_title": "Sialkot OEM Sports Apparel Manufacturing: B2B Buyer's Playbook",
    "seo_description": "Everything global brand founders and sourcing managers need to know about manufacturing sports apparel and boxing gear in Sialkot, Pakistan.",
    "social_image": null,
    "created_at": "2026-09-14T11:04:40.411Z",
    "updated_at": "2026-09-14T11:04:40.411Z"
  }
];

export const initialSiteSettings: SiteSettings = {
  "id": "e0000001-0000-0000-0000-000000000001",
  "company_name": "GLOVES STORM",
  "email": "glovesstorm@gmail.com",
  "phone": "+923417146935",
  "whatsapp": "+923417146935",
  "address": "Industrial Estate, Sialkot 51310, Punjab, Pakistan",
  "instagram": "https://www.instagram.com/glovesstorm/",
  "facebook": "https://facebook.com/glovesstorm",
  "linkedin": "https://www.linkedin.com/company/gloves-storm/",
  "youtube": "https://youtube.com/@glovesstorm",
  "logo_url": null,
  "favicon_url": null,
  "hero_title": "BUILT FOR BRANDS. MADE TO PERFORM.",
  "hero_description": "Custom boxing gear, sportswear and apparel manufactured for brands worldwide.",
  "instagram_access_token": null,
  "instagram_feed_mode": "api",
  "instagram_widget_code": null,
  "updated_at": "2026-09-14T11:04:40.411Z"
};

export const initialInquiries: Inquiry[] = [
  {
    "id": "fc000001-0000-0000-0000-000000000001",
    "name": "Alexander Sterling",
    "company": "Sterling Fight Athletics",
    "email": "alex@sterlingfight.com",
    "phone": "+1 (555) 234-5678",
    "country": "United States",
    "product_category": "Boxing",
    "product_name": "Pro Apex Lace-Up Boxing Gloves",
    "estimated_quantity": 500,
    "target_delivery_date": "2026-11-15",
    "message": "We are launching a new championship combat line across 3 colorways (Matte Black, Vintage Oxblood, Desert Sand). Need custom gold foil debossed leather wrist tags and custom ounce weights (12oz, 14oz, 16oz). Looking forward to discussing sample terms.",
    "tech_pack_url": null,
    "reference_files": [],
    "status": "New",
    "internal_notes": "High potential client. Referred by UK distributor.",
    "created_at": "2026-09-14T09:04:40.411Z"
  },
  {
    "id": "fc000001-0000-0000-0000-000000000002",
    "name": "Sophia Martinez",
    "company": "Barre & Core Active",
    "email": "sophia@barrecore.co.uk",
    "phone": "+44 20 7946 0912",
    "country": "United Kingdom",
    "product_category": "Gym Wear",
    "product_name": "Seamless Sculpt Compression Gym Set",
    "estimated_quantity": 1200,
    "target_delivery_date": "2026-12-01",
    "message": "Looking for sample sets of your Santoni seamless knit leggings and ribbed crop tops in 4 Pantone colors. Tech pack ready.",
    "tech_pack_url": null,
    "reference_files": [],
    "status": "In Progress",
    "internal_notes": "Sample kit dispatched via DHL courier tracking #9823145.",
    "created_at": "2026-09-13T11:04:40.411Z"
  }
];

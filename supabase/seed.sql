-- =========================================================
-- GLOVES STORM — SUPABASE PRODUCTION SEED DATA
-- Comprehensive initial data for categories, products, projects,
-- testimonials, blog articles, and company settings.
-- =========================================================

-- Clear existing data safely if re-running
DELETE FROM site_settings;
DELETE FROM inquiries;
DELETE FROM blog_posts;
DELETE FROM testimonials;
DELETE FROM project_images;
DELETE FROM projects;
DELETE FROM product_videos;
DELETE FROM product_images;
DELETE FROM products;
DELETE FROM categories;

-- 1. INSERT CATEGORIES
-- Main Parent Categories
INSERT INTO categories (id, name, slug, description, image_url, parent_id, sort_order, is_active) VALUES
('c0000001-0000-0000-0000-000000000001', 'Boxing', 'boxing', 'Professional competition and sparring gloves, headguards, and protective fight gear handcrafted from premium cowhide and microfibers.', 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop', NULL, 1, TRUE),
('c0000001-0000-0000-0000-000000000002', 'American Football', 'american-football', 'Heavyweight game jerseys, compression practice gear, integrated football pants, and high-tack silicone palm receiver gloves.', 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=1200&auto=format&fit=crop', NULL, 2, TRUE),
('c0000001-0000-0000-0000-000000000003', 'Basketball', 'basketball', 'Sublimated reversible uniforms, moisture-wicking engineered mesh jerseys, warmup jackets, and shooting shirts.', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop', NULL, 3, TRUE),
('c0000001-0000-0000-0000-000000000004', 'Baseball', 'baseball', 'Full-button custom twill jerseys, double-knit reinforced baseball pants, cage jackets, and team warmups.', 'https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=1200&auto=format&fit=crop', NULL, 4, TRUE),
('c0000001-0000-0000-0000-000000000005', 'Soccer', 'soccer', 'Elite club match kits, aerodynamic fit jerseys, silicone waistband shorts, and padded goalkeeper armor.', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop', NULL, 5, TRUE),
('c0000001-0000-0000-0000-000000000006', 'Sportswear', 'sportswear', 'Custom tailored poly-spandex tracksuits, ripstop windbreakers, tapered joggers, and performance training hoodies.', 'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop', NULL, 6, TRUE),
('c0000001-0000-0000-0000-000000000007', 'Gym Wear', 'gym-wear', 'Seamless compression wear, drop-armhole stringers, 4-way stretch squattable leggings, and modal cotton tees.', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop', NULL, 7, TRUE),
('c0000001-0000-0000-0000-000000000008', 'Streetwear', 'streetwear', 'Ultra-heavyweight 300-450 GSM French Terry hoodies, drop-shoulder luxury boxy tees, cargo utility pants, and wool-leather varsity jackets.', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop', NULL, 8, TRUE),
('c0000001-0000-0000-0000-000000000009', 'Fashion', 'fashion', 'Architectural cut outerwear, tailored overshirts, technical bonded jackets, and luxury streetwear essentials.', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop', NULL, 9, TRUE),
('c0000001-0000-0000-0000-000000000010', 'Swimwear', 'swimwear', 'Quick-dry hydrophobic boardshorts, chlorine-resistant swim trunks, and UV50+ performance rash guards.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop', NULL, 10, TRUE),
('c0000001-0000-0000-0000-000000000011', 'Accessories', 'accessories', 'Durable waterproof gym duffels, athlete backpacks, 3D embroidered snapbacks, and compression athletic socks.', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop', NULL, 11, TRUE);

-- Nested Subcategories
INSERT INTO categories (id, name, slug, description, image_url, parent_id, sort_order, is_active) VALUES
('c0000002-0001-0000-0000-000000000001', 'Sparring Gloves', 'sparring-gloves', 'High-density multi-layered foam sparring gloves with ergonomic wrist support.', NULL, 'c0000001-0000-0000-0000-000000000001', 1, TRUE),
('c0000002-0001-0000-0000-000000000002', 'MMA & Grappling', 'mma-gloves', 'Open-palm 4oz competition and 7oz hybrid sparring fight gloves.', NULL, 'c0000001-0000-0000-0000-000000000001', 2, TRUE),
('c0000002-0006-0000-0000-000000000001', 'Tracksuits & Warmups', 'tracksuits', 'Custom woven and tricot track jackets with matched tailored joggers.', NULL, 'c0000001-0000-0000-0000-000000000006', 1, TRUE),
('c0000002-0008-0000-0000-000000000001', 'Heavyweight Hoodies', 'heavyweight-hoodies', 'Custom dyed 450 GSM French Terry brushed cotton luxury garments.', NULL, 'c0000001-0000-0000-0000-000000000008', 1, TRUE),
('c0000002-0008-0000-0000-000000000002', 'Boxy Cut T-Shirts', 'boxy-t-shirts', 'Vintage wash, 260 GSM single jersey cotton with custom neck ribbed collars.', NULL, 'c0000001-0000-0000-0000-000000000008', 2, TRUE);

-- 2. INSERT PRODUCTS
INSERT INTO products (id, name, slug, category_id, short_description, description, materials, features, customization_options, moq, lead_time, featured, is_active, seo_title, seo_description) VALUES
(
  'a0000001-0000-0000-0000-000000000001',
  'Pro Apex Lace-Up Boxing Gloves',
  'pro-apex-lace-up-boxing-gloves',
  'c0000001-0000-0000-0000-000000000001',
  'Championship-grade custom competition gloves constructed from 100% full-grain cowhide leather with 5-layer handmade latex and EVA sandwich padding.',
  'Engineered for elite combat brands, the Pro Apex Lace-Up represents the pinnacle of Sialkot glove making. Built with an anatomical hand compartment that naturally curves fingers into a compact fist, reducing hand fatigue during grueling 12-round bouts. High-tensile nylon stitching and dual-channel lace-up cuffs ensure maximum wrist stabilization and punch dispersal.',
  '["100% Genuine Full-Grain Cowhide Leather (1.1mm)", "5-Layer Handcrafted Latex & Orthopedic EVA Foam Core", "Water-Repellent Satin Silk Lining", "Heavy-Duty Bonded Nylon Thread Stitching"]'::jsonb,
  '["Anatomical thumb lock positioning to prevent dislocation", "Dual-contour wrist channel for precision lace tensioning", "Laser-cut ventilation perforations along inner palm", "Reinforced piped seam borders with zero raw edge exposure", "Pre-curved knuckle pocket optimized for heavy impact resistance"]'::jsonb,
  '["Custom brand leather debossing / foil hot stamping", "Screen printing, high-density 3D puff silicone ink", "Custom woven wrist tag and inner care labels", "Lace color matching with branded metal aglets", "Tailored ounce sizing: 8oz, 10oz, 12oz, 14oz, 16oz, 18oz", "Custom matte, metallic, cracked, or pebble-grain leather finishes"]'::jsonb,
  50,
  '3-4 Weeks',
  TRUE,
  TRUE,
  'Custom OEM Boxing Gloves Manufacturer | GLOVES STORM Sialkot',
  'Manufacture private-label championship boxing gloves. Full-grain cowhide, multi-layer foam, custom branding. Direct factory MOQ 50 pairs.'
),
(
  'a0000001-0000-0000-0000-000000000002',
  'Elite Pro Combat Hook-and-Loop Sparring Gloves',
  'elite-pro-combat-hook-loop-sparring-gloves',
  'c0000001-0000-0000-0000-000000000001',
  'Heavy-duty training glove with full wraparound Velcro strap, reinforced cuff splinting, and shock-absorbing gel injected knuckle cushion.',
  'Designed for gym chains, fight academies, and martial arts apparel lines, the Elite Pro Sparring Glove offers the ultimate balance of rapid on-and-off utility and pro-level joint protection. Featuring our proprietary wrist-lock splint system that prevents wrist flexion during heavy bag drills and hard sparring.',
  '["Premium Microfiber Synthetic Leather or Genuine Cowhide", "Injection Molded Quad-Density Shock Gel Foam", "Anti-Microbial Moisture-Wicking Mesh Palm", "Industrial-Grade Military Velcro Hook & Loop Closure"]'::jsonb,
  '["360-degree anatomical wrist wrap support", "Breathable ventilated mesh panel for accelerated sweat evaporation", "Ergonomic attached thumb system", "Triple-reinforced palm bar grip"]'::jsonb,
  '["Full surface sublimation or silk-screen branding", "Rubber molded PVC patch on wrist strap", "Contrast stitch coloring and metallic trim piping", "Branded magnetic gift box or ventilated mesh bag packaging"]'::jsonb,
  50,
  '2-3 Weeks',
  TRUE,
  TRUE,
  'Custom Sparring Gloves OEM Manufacturing | GLOVES STORM',
  'High-performance hook-and-loop sparring boxing gloves custom manufactured with your brand logos and colorways. Fast global delivery.'
),
(
  'a0000001-0000-0000-0000-000000000003',
  'Championship Gridiron American Football Uniform',
  'championship-gridiron-american-football-uniform',
  'c0000001-0000-0000-0000-000000000002',
  'Pro-cut custom sublimated football jersey with heavy 4-way stretch Cordura shoulder inserts, elasticated cuffs, and matched integrated pants.',
  'Engineered to withstand intense contact collisions. Crafted from high-tenacity polyester elastane warp knits that stretch over shoulder pads without tearing or restricting athlete mobility. Features bar-tacked stress points, embroidered team crests, and fully sublimated numbers.',
  '["280 GSM Heavy-Duty Poly-Spandex Body", "450 GSM Cordura Stretch Double-Layer Shoulders", "High-Elasticity Ribbed Collar with Custom V-Neck Insert", "Double-Needle Flatlock Reinforcement"]'::jsonb,
  '["Cap-sleeve or elasticated arm cuff construction", "Moisture-wicking yarn treatment for thermoregulation", "Fade-proof Italian dye sublimation technology", "Reinforced slotted belt tunnel on matched pants"]'::jsonb,
  '["Custom tackle twill embroidered numbers and nameplates", "Sublimated gradient textures and metallic foil accents", "Custom silicone rubber team patch on chest neck insert", "Player roster individual personalization"]'::jsonb,
  30,
  '3-4 Weeks',
  TRUE,
  TRUE,
  'Custom American Football Uniforms Manufacturer | GLOVES STORM',
  'Pro-level custom football jerseys and pants for teams and sports brands. Sublimation, tackle twill, and extreme-durability Cordura stretch.'
),
(
  'a0000001-0000-0000-0000-000000000004',
  'HyperVent Reversible Basketball Uniform Kit',
  'hypervent-reversible-basketball-uniform-kit',
  'c0000001-0000-0000-0000-000000000003',
  'Ultra-breathable 2-in-1 reversible game kit engineered with micro-mesh knit fabric, lightweight contrast arm ribbing, and deep basketball shorts.',
  'Designed for modern fast-break basketball programs and streetwear-inspired sportswear brands. Single-layer reversible technology keeps the jersey extraordinarily light while presenting two completely distinct full-color designs on inside and outside faces.',
  '["160 GSM Micro-Pore Aerodynamic Polyester Mesh", "Quick-Dry Moisture Management Infusion", "Engineered Striped Polyester Ribbed Collars", "Chafe-Free Flat-Seam Construction"]'::jsonb,
  '["Reversible dual-sided lightweight sublimation", "Deep side pockets on game shorts (optional)", "Concealed heavy-duty braided drawcord with silicone dipped tips", "Athletic drop-tail hemline for full tuck stability"]'::jsonb,
  '["Custom pantone color matching for home/away palettes", "Sublimated or silicone transfer team crests", "Custom branded inside hem labels and care tags", "Youth, Men, and Women custom athletic sizing blocks"]'::jsonb,
  25,
  '2-3 Weeks',
  FALSE,
  TRUE,
  'Custom Basketball Kits & Reversible Jerseys | GLOVES STORM',
  'Top-tier custom basketball uniforms for leagues, academies, and brands. Breathable micro-mesh, reversible prints, and tailored basketball cuts.'
),
(
  'a0000001-0000-0000-0000-000000000005',
  'Heavyweight 450 GSM French Terry Boxy Hoodie',
  'heavyweight-450-gsm-french-terry-boxy-hoodie',
  'c0000001-0000-0000-0000-000000000008',
  'Luxury streetwear silhouette featuring double-layered crossover hood, extreme drop shoulders, tight ribbed cuffs, and zero front drawstrings.',
  'The quintessential blank or fully customized hero piece for premier fashion and streetwear labels. Milled from 100% combed Aegean cotton loops, enzyme-washed for an exceptionally rich, structured drape that holds its boxy architectural shape over years of wear.',
  '["100% Organic Combed Aegean Cotton French Terry (450 GSM)", "Dense 2x2 Lycra-Infused Ribbed Hem & Cuffs (480 GSM)", "Pre-Shrunk and Enzyme Washed for Zero Shrinkage"]'::jsonb,
  '["Boxy oversized cut with dropped shoulders", "Double-layer crossover hood with hidden seam finishes", "Seamless clean pouch pocket with bar-tack anchors", "Reinforced twin-needle stitching throughout all seams"]'::jsonb,
  '["High-density 3D puff screen printing", "Chenille and felt collegiate embroidery", "Direct-to-Film (DTF) photographic art prints", "Distressed vintage mineral wash and pigment garment dye", "Custom woven damask neck labels and metal engraved logo plate"]'::jsonb,
  50,
  '3-4 Weeks',
  TRUE,
  TRUE,
  'Custom Heavyweight 450 GSM Streetwear Hoodies Manufacturer | GLOVES STORM',
  'Manufacture luxury oversized streetwear hoodies. 450 GSM French Terry, custom vintage dyes, embroidery, puff print. Direct Sialkot factory.'
),
(
  'a0000001-0000-0000-0000-000000000006',
  'AeroTech High-Performance Tracksuit Set',
  'aerotech-high-performance-tracksuit-set',
  'c0000001-0000-0000-0000-000000000006',
  'Technical warmup jacket and tapered pants engineered with water-repellent matte nylon taslan and breathable poly-spandex stretch panels.',
  'Built for professional clubs, gym wear lines, and lifestyle streetwear collections. Combines vintage track aesthetics with modern sports science: articulated knees, laser-cut underarm vents, and waterproof zippered storage.',
  '["Matte Nylon Taslan Outer Shell with DWR Coating", "4-Way Poly-Elastane Mobility Gussets", "Anti-Static Micro-Mesh Internal Lining", "YKK Waterproof Reverse-Coil Zippers"]'::jsonb,
  '["Funnel-neck protective collar with chin guard", "Ankle side-zippers for rapid boot clearance", "Ergonomic darting at knees and elbows", "Reflective 3M detailing for nighttime visibility"]'::jsonb,
  '["Embroidered brand logos or 3D reflective silicone transfers", "Custom zipper pulls with branded debossed typography", "Two-tone panel blocking and custom piping colors", "Tailored slim-tapered or relaxed lifestyle silhouettes"]'::jsonb,
  40,
  '3-4 Weeks',
  TRUE,
  TRUE,
  'Custom Tracksuits & Warmups Manufacturer | GLOVES STORM',
  'Custom athletic tracksuits manufactured for sports teams and streetwear brands. Premium waterproof nylon, tapered fits, YKK hardware.'
),
(
  'a0000001-0000-0000-0000-000000000007',
  'Seamless Sculpt Compression Gym Set',
  'seamless-sculpt-compression-gym-set',
  'c0000001-0000-0000-0000-000000000007',
  'Engineered high-waisted squat-proof leggings and matched sports bra crafted on Italian Santoni circular knitting machines.',
  'Targeted for activewear startups and established fitness brands. Features contour rib shading, zero front seam, moisture-wicking capillary yarns, and reinforced compression zones around core and glutes.',
  '["75% Micro-Polyamide, 25% High-Recovery Elastane", "High-Density 320 GSM Squat-Proof Knit", "Silver-Ion Anti-Odor Yarn Treatment"]'::jsonb,
  '["Graduated compression for enhanced muscular blood return", "Seamless tubular construction eliminating chaffing", "Double-layer compressive waistband with no slip guarantee", "Removable memory foam bra padding"]'::jsonb,
  '["Custom jacquard knitted logo band or silicone heat seal", "Over 80 custom pantone dyed heather and solid shades", "Custom hang tags, matte frosted zip pouch packaging"]'::jsonb,
  50,
  '3-4 Weeks',
  FALSE,
  TRUE,
  'Custom Seamless Activewear Manufacturer | GLOVES STORM',
  'High-end seamless activewear and compression sets for gym brands. Italian circular knitting, squat-proof, custom branding.'
),
(
  'a0000001-0000-0000-0000-000000000008',
  'Pro Match Elite Soccer Club Kit',
  'pro-match-elite-soccer-club-kit',
  'c0000001-0000-0000-0000-000000000005',
  'Aero-knit match jersey with laser-cut ventilation zones, silicone grip waistband shorts, and anti-slip compression crew match socks.',
  'Precision designed for professional soccer clubs, collegiate programs, and football lifestyle brands. Extremely lightweight, aerodynamic cut engineered for 90 minutes of high-speed sprinting and tactical gameplay.',
  '["150 GSM AeroWarp Recycled Poly-Spandex", "Micro-Jacquard Ribbed Crew or V-Neck Collars", "Silicone Gripper Elasticated Short Band"]'::jsonb,
  '["Ultrasonic welded bonded hem finishes", "Body-mapped heat dispersal zones", "Quick-evaporation capillary yarn technology", "Sublimated gradient crests and sponsors"]'::jsonb,
  '["Silicone 3D dimensional team crests", "Custom player number fonts and name typography", "Official match authenticity heat seals", "Full home, away, and third kit coordination"]'::jsonb,
  30,
  '2-3 Weeks',
  TRUE,
  TRUE,
  'Custom Soccer Uniforms & Match Kits Manufacturer | GLOVES STORM',
  'Professional custom soccer kits, sublimated jerseys, and shorts for teams and sportswear brands worldwide.'
);

-- 3. INSERT PRODUCT IMAGES
INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES
('f0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop', 'Pro Apex Lace-Up Boxing Gloves Matte Black Front Angle', 1, TRUE),
('f0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=1200&auto=format&fit=crop', 'Boxing Gloves Dual Channel Lace Wrist Detail', 2, FALSE),
('f0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1200&auto=format&fit=crop', 'Handmade Leather Boxing Gloves Craftsmanship', 3, FALSE),

('f0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1509255933664-539bb4c1a590?q=80&w=1200&auto=format&fit=crop', 'Elite Pro Hook and Loop Combat Sparring Gloves Front View', 1, TRUE),
('f0000001-0000-0000-0000-000000000005', 'a0000001-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=1200&auto=format&fit=crop', 'Hook and Loop Strap Close-up', 2, FALSE),

('f0000001-0000-0000-0000-000000000006', 'a0000001-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=1200&auto=format&fit=crop', 'Championship American Football Custom Uniform', 1, TRUE),
('f0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop', 'HyperVent Custom Basketball Uniform Kit', 1, TRUE),
('f0000001-0000-0000-0000-000000000008', 'a0000001-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop', 'Luxury 450 GSM French Terry Streetwear Hoodie', 1, TRUE),
('f0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop', 'AeroTech High Performance Tracksuit Set', 1, TRUE),
('f0000001-0000-0000-0000-000000000010', 'a0000001-0000-0000-0000-000000000007', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop', 'Seamless Activewear Leggings and Top Set', 1, TRUE),
('f0000001-0000-0000-0000-000000000011', 'a0000001-0000-0000-0000-000000000008', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop', 'Pro Match Elite Soccer Club Kit', 1, TRUE);

-- 4. INSERT PROJECTS / CASE STUDIES
INSERT INTO projects (id, title, slug, industry, category_id, description, challenge, approach, solution, outcome, featured_image, featured, is_active) VALUES
(
  'ab000001-0000-0000-0000-000000000001',
  'Apex Combat UK — Championship Fight Gear Collection',
  'apex-combat-uk-championship-gear',
  'Boxing & Combat Sports',
  'c0000001-0000-0000-0000-000000000001',
  'End-to-end OEM development of a custom British Boxing Board of Control (BBBofC) certified fight glove line, headguards, and corner accessories for an expanding UK combat label.',
  'The client was facing high defect rates and inconsistent foam weight tolerances from previous overseas suppliers, which risked compliance sanctions during sanctioned professional title bouts.',
  'GLOVES STORM engineering team built custom CNC-machined steel cutting dies and introduced a proprietary multi-layer foam sandwich tested on calibrated digital impact sensors at our Sialkot facility.',
  'We produced 3 pre-production sample batches in 14 days, achieved zero-defect certification, and finalized a production run of 1,200 competition pairs and 3,500 sparring pairs.',
  'Apex Combat UK successfully supplied two world-title fights broadcast live internationally, securing distribution contracts across 45 UK specialty gyms within 6 months.',
  'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop',
  TRUE,
  TRUE
),
(
  'ab000001-0000-0000-0000-000000000002',
  'Aura Athletics Los Angeles — Heavyweight Streetwear Drop',
  'aura-athletics-la-heavyweight-streetwear',
  'Streetwear & Luxury Fashion',
  'c0000001-0000-0000-0000-000000000008',
  'Full garment development for a high-end California streetwear label demanding custom 460 GSM combed cotton French Terry with bespoke vintage oil mineral wash and 3D puff silicone typography.',
  'Standard stock blanks failed to deliver the oversized structured drape the creative director demanded, and previous dye houses suffered from color bleeding across white embroidery.',
  'Our dye specialists formulated custom reactive pigment dye recipes with double garment enzymes, paired with precision computerized embroidery machines and heat-cured puff inks.',
  'Developed complete custom sizing blocks (XS to 3XL), produced matched boxy tees and hoodies, and packed every unit in custom branded biodegradable frosted slider bags.',
  'The collection sold out in 48 minutes upon online release (2,800 units), with Aura Athletics locking in annual recurring manufacturing contracts with GLOVES STORM.',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
  TRUE,
  TRUE
),
(
  'ab000001-0000-0000-0000-000000000003',
  'Nordic Shield FC — Match Uniforms & Team Travel Kit',
  'nordic-shield-fc-match-uniforms',
  'Soccer & Club Sportswear',
  'c0000001-0000-0000-0000-000000000005',
  'Complete custom kit production for an elite Scandinavian club network including home, away, goalkeeper jerseys, match shorts, tracksuits, and coaches sideline rain jackets.',
  'Tight 4-week delivery deadline ahead of the European summer tournament season, with strict FIFA equipment regulations on sponsor crest dimensions and thermal comfort.',
  'Deployed our Italian digital sublimation printers running around the clock with automated laser fabric cutting, paired with rapid courier dispatch via DHL Express Sialkot hub.',
  'Delivered 850 complete match kits and 400 travel tracksuits 6 days ahead of schedule, passing all textile elasticity and thermal breathability tests.',
  'Nordic Shield celebrated their league cup victory wearing the kits, extending their apparel partnership with GLOVES STORM for 3 consecutive seasons.',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop',
  TRUE,
  TRUE
);

-- 5. INSERT TESTIMONIALS
INSERT INTO testimonials (id, client_name, company, country, role, testimonial, photo_url, rating, featured, is_active) VALUES
(
  'd0000001-0000-0000-0000-000000000001',
  'Marcus Vance',
  'Vance Fight Gear & Apparel',
  'United Kingdom',
  'Founder & Product Director',
  'Finding a manufacturer in Sialkot that understands luxury finishing, millimeter tolerances, and proactive communication is rare. GLOVES STORM engineered our 16oz lace-up gloves to a standard that rivals the most famous Mexican and Japanese fight brands. Our customer return rate dropped below 0.4%. They are truly our manufacturing backbone.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
  5,
  TRUE,
  TRUE
),
(
  'd0000001-0000-0000-0000-000000000002',
  'Elena Rostova',
  'Kinetics Studio Brand',
  'United States',
  'Head of Supply Chain & Design',
  'Our streetwear hoodie drop required 450 GSM custom-knit loopback French Terry and very specific boxy measurements. GLOVES STORM turned our tech packs into flawless physical samples within 9 days. The stitch density, custom neck tagging, and packaging exceeded our expectations. Our community raves about the quality.',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  5,
  TRUE,
  TRUE
),
(
  'd0000001-0000-0000-0000-000000000003',
  'Christian Dubois',
  'Athletica Pro Performance',
  'France / Europe',
  'Managing Director',
  'We have imported sports goods for over 14 years. What distinguishes GLOVES STORM is their engineering discipline and transparent production tracking. You receive video updates from the stitching floor, lab tests on fabrics, and punctual worldwide dispatch. An indispensable partner for any brand scaling seriously.',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
  5,
  TRUE,
  TRUE
),
(
  'd0000001-0000-0000-0000-000000000004',
  'Tariq Al-Mansoor',
  'Vortex MMA Gyms',
  'United Arab Emirates',
  'Operations Director',
  'We outfitted 8 commercial combat gyms across Dubai and Abu Dhabi with custom branded punching bags, sparring gloves, and coaching pads. The durability under daily heavy commercial use has been astonishing. Professional craftsmanship through and through.',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
  5,
  FALSE,
  TRUE
);

-- 6. INSERT BLOG POSTS / JOURNAL
INSERT INTO blog_posts (id, title, slug, excerpt, content, featured_image, category, author, published_at, is_published, seo_title, seo_description) VALUES
(
  'b0000001-0000-0000-0000-000000000001',
  'The Anatomy of a Championship Boxing Glove: Foam Density, Ergonomics & Leather Selection',
  'anatomy-of-championship-boxing-glove-foam-density-leather',
  'An in-depth technical analysis of multi-layer foam sandwich construction, hand compartment ergonomics, and why full-grain cowhide remains unmatched for elite combat sports manufacturing.',
  '### Engineering Protection for the World’s Best Fighters

In professional combat sports manufacturing, a glove is never simply a piece of sewn leather. It is an intricate kinetic dampener engineered to protect the 27 small bones of the human hand while transferring maximum kinetic energy safely into a target.

At **GLOVES STORM**, our glove design process begins with anatomical mold sculpting. 

#### 1. The Foam Sandwich Architecture
Standard mass-market gloves often rely on single-density injection-molded polyurethane (IMF). While cost-effective, IMF degrades rapidly under heavy impact and provides uneven shock attenuation.

In contrast, our championship series utilizes a 5-layer composite sandwich:
* **Outer Layer (15mm)**: High-density EVA foam that absorbs the initial shockwave and prevents knuckle penetration.
* **Core Layer (20mm)**: Natural open-cell latex rubber, which provides responsive tactile feedback and dynamic deceleration.
* **Secondary Dampener (10mm)**: Orthopedic sponge foam for fist comfort.
* **Under-Knuckle Shield (5mm)**: High-resilience closed-cell foam protecting the metacarpal joints.
* **Palm Splinting**: Dual-layered EVA rods along the carpal tunnel to eliminate wrist hyperextension upon punch angle deflection.

#### 2. Leather Selection: Full-Grain Cowhide vs. High-Tech Microfiber
Leather quality dictates the longevity and memory of the glove. We source Grade-A full-grain cowhide from responsible tanneries, ensuring uniform 1.1mm to 1.2mm thickness. For vegan and cruelty-free technical lines, our microfiber synthetics deliver 300,000 cycles on Martindale abrasion tests—surpassing conventional PU leather by 400%.

#### 3. Why Brands Partner with GLOVES STORM for Custom Gloves
When brands partner with GLOVES STORM in Sialkot, they receive full control over every dimension: thumb curve angle, lace channel tension, custom foil debossing, and tailored weight calibrations down to the exact gram.',
  'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop',
  'Manufacturing',
  'GLOVES STORM Engineering Team',
  NOW() - INTERVAL '4 days',
  TRUE,
  'Technical Guide: How Championship Boxing Gloves Are Made | GLOVES STORM',
  'Learn the engineering behind multi-layer foam, leather selection, and wrist stabilization in custom boxing glove manufacturing.'
),
(
  'b0000001-0000-0000-0000-000000000002',
  'Mastering 450 GSM French Terry: Why Fabric Weight & Combing Define Luxury Streetwear',
  'mastering-450-gsm-french-terry-luxury-streetwear-guide',
  'Why modern luxury apparel brands are abandoning lightweight fleece in favor of heavyweight 400-500 GSM loopback French Terry, and how to structure a tech pack for zero shrinkage.',
  '### The Rise of Structural Streetwear

Over the past five years, the global luxury streetwear market has undergone a decisive transition. Modern consumers no longer tolerate thin, polyester-blend hoodies that pill after two washes. The standard has shifted toward architectural silhouettes—garments that hold their shape independently on the body.

The cornerstone of this movement is **450 GSM Combed Cotton French Terry**.

#### What Exactly is Loopback French Terry?
Unlike brushed fleece, which has a fuzzy nap created by mechanical wire brushes, loopback French Terry features tight circular loops on the interior and a smooth, dense jersey surface on the exterior. 

Key advantages for premium brands include:
* **Breathability without bulk**: The cotton loops act as natural thermal ventilators, wicking moisture away while maintaining substantial physical weight.
* **Crisp Embroidery Canvas**: High-density 450 GSM fabric will not pucker or warp under 15,000-stitch chenille or 3D puff embroidery.
* **Crisp Boxy Silhouette**: The substantial drape allows dropped shoulders and wider sleeves to hang cleanly without sagging.

#### The Importance of Enzyme Pre-Washing
One of the most common pitfalls for emerging brands manufacturing overseas is garment shrinkage. When unwashed French Terry hits a retail washing machine, it can lose up to 8% in body length.

At GLOVES STORM, every roll of custom-milled French Terry undergoes pre-shrinking and organic enzyme washing prior to precision laser cutting. This ensures that the size medium you approve in your prototype remains the exact size medium your customer wears for years.

#### Launch Your Custom Streetwear Collection
Whether you require custom pantone dyeing, vintage sun-faded washes, or distressed ribbing, GLOVES STORM provides end-to-end manufacturing with minimum order quantities as low as 50 units per colorway.',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
  'Streetwear',
  'Apparel Design Division',
  NOW() - INTERVAL '12 days',
  TRUE,
  'How to Manufacture 450 GSM Luxury Heavyweight Hoodies | GLOVES STORM',
  'Everything sports and streetwear brands need to know about French Terry fabric weights, enzyme washes, and tech packs.'
),
(
  'b0000001-0000-0000-0000-000000000003',
  'From Tech Pack to Bulk Production: A Step-by-Step OEM Manufacturing Blueprint',
  'from-tech-pack-to-bulk-production-oem-manufacturing-guide',
  'A clear, transparent walkthrough of the 6 core stages of custom sports apparel production for brand founders and supply chain directors.',
  '### Navigating the Manufacturing Journey

Transitioning an idea from an Adobe Illustrator mockup into thousands of retail-ready garments packed on a shipping pallet is one of the most critical steps in building a profitable brand.

At GLOVES STORM, we operate with complete transparency. Here is exactly how our production pipeline flows from day one.

#### Step 1: Technical Review & Material Sourcing
When you submit your tech pack or reference samples, our technical pattern makers review seam constructions, stitch types (such as flatlock or 4-needle overlock), fabric GSM, and accessory specifications. We match your target colors to universal Pantone TCX or TPX standards.

#### Step 2: Digital Grading & Pattern CAD
We create precise digital pattern files graded across your requested size range (e.g. S through 3XL). This ensures that grading curves maintain proportion across all body types.

#### Step 3: Prototyping & Sampling
A physical master sample is constructed. We ship this sample directly to your studio via express courier, accompanied by a detailed swatch booklet showing optional print finishes and alternative fabric densities.

#### Step 4: Bulk Cutting & Customization
Once your physical sample is signed off, bulk fabric is inspected for color consistency, tension-relaxed for 24 hours, and cut using computerized automated cutting tables. Customization processes—such as Italian dye sublimation, screen printing, embroidery, and silicone heat transfers—are applied at the flat panel stage for optimal sharpness.

#### Step 5: Master Stitching & Assembly
Our specialized production lines (combat gear, performance jerseys, seamless activewear, and cut & sew outerwear) assemble each garment using industrial machinery calibrated for each fabric type.

#### Step 6: Multi-Stage Quality Control & Global Logistics
Every single item is hand-inspected for loose threads, dimensional measurements against specification sheets, and hardware durability. Finished goods are polybagged, tagged, barcoded, and packed into heavy 5-ply export cartons ready for air or ocean transit to your warehouse.',
  'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop',
  'Product Development',
  'GLOVES STORM Editorial',
  NOW() - INTERVAL '25 days',
  TRUE,
  'How OEM Sports Manufacturing Works: Tech Pack to Delivery | GLOVES STORM',
  'Learn how custom sports apparel and fight gear moves from tech packs to bulk production with GLOVES STORM Sialkot.'
);

-- 7. INSERT DEFAULT SITE SETTINGS
INSERT INTO site_settings (id, company_name, email, phone, whatsapp, address, instagram, facebook, linkedin, youtube, logo_url, favicon_url, hero_title, hero_description) VALUES
(
  'e0000001-0000-0000-0000-000000000001',
  'GLOVES STORM',
  'glovesstorm@gmail.com',
  '+923417146935',
  '+923417146935',
  'Industrial Estate, Sialkot 51310, Punjab, Pakistan',
  'https://www.instagram.com/glovesstorm/',
  'https://facebook.com/glovesstorm',
  'https://www.linkedin.com/company/gloves-storm/',
  'https://youtube.com/@glovesstorm',
  NULL,
  NULL,
  'BUILT FOR BRANDS. MADE TO PERFORM.',
  'Custom boxing gear, sportswear and apparel manufactured for brands worldwide.'
);

-- 8. INSERT INITIAL SAMPLE INQUIRY
INSERT INTO inquiries (id, name, company, email, phone, country, product_category, product_name, estimated_quantity, target_delivery_date, message, status, created_at) VALUES
(
  'fc000001-0000-0000-0000-000000000001',
  'Alexander Sterling',
  'Sterling Fight Athletics',
  'alex@sterlingfight.com',
  '+1 (555) 234-5678',
  'United States',
  'Boxing',
  'Pro Apex Lace-Up Boxing Gloves',
  500,
  '2026-11-15',
  'We are launching a new championship combat line across 3 colorways (Matte Black, Vintage Oxblood, Desert Sand). Need custom gold foil debossed leather wrist tags and custom ounce weights (12oz, 14oz, 16oz). Looking forward to discussing sample terms.',
  'New',
  NOW() - INTERVAL '2 hours'
);

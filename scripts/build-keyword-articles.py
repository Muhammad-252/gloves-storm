"""Builds the HTML for the keyword journal articles in scripts/blog-drafts.

Run: python scripts/build-keyword-articles.py
Uses the same markup and classes as the existing journal drafts.
"""
from pathlib import Path

OUT = Path(__file__).parent / "blog-drafts"
LINK = 'class="text-neutral-900 font-bold underline decoration-[#FFB900] decoration-2 underline-offset-4 hover:text-[#FFB900] transition-colors"'
UPDATED = "November 4, 2026"


def a(href, text):
    return f'<a href="{href}" {LINK}>{text}</a>'


def quick_answer(text):
    return f"""  <div class="p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200/90 shadow-xs relative overflow-hidden">
    <div class="flex flex-wrap items-center gap-2 mb-3">
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB900] text-black text-xs font-mono font-bold uppercase tracking-wider">
        Quick Answer
      </span>
      <span class="text-xs font-mono text-neutral-500 font-medium">Last updated: {UPDATED}</span>
    </div>
    <p class="text-base sm:text-lg text-neutral-900 font-medium leading-relaxed mb-4">
      {text}
    </p>
    <div class="pt-3 border-t border-neutral-200/70 text-xs text-neutral-500 font-medium">
      Written by <span class="text-neutral-900 font-bold">Muhammad Arslan</span>, Founder &amp; Managing Director of <a href="https://www.glovesstorm.com" title="Gloves Storm" {LINK}>Gloves Storm</a>
    </div>
  </div>
"""


def h2(id_, text):
    return f"""
  <h2 id="{id_}" class="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 pt-4">
    {text}
  </h2>
"""


def p(text):
    return f"\n  <p>\n    {text}\n  </p>\n"


def ul(items):
    lis = "\n".join(f"    <li>{i}</li>" for i in items)
    return f'\n  <ul class="list-disc pl-6 space-y-2">\n{lis}\n  </ul>\n'


def image(src, alt):
    return f"""
  <div class="rounded-2xl overflow-hidden my-6 border border-neutral-200 shadow-sm bg-neutral-100">
    <img src="{src}" alt="{alt}" class="w-full h-auto object-cover" loading="lazy" />
  </div>
"""


def table(headers, rows, highlight=None):
    th = "\n".join(f'          <th class="py-3.5 px-4 font-bold">{h}</th>' for h in headers)
    body = []
    for i, row in enumerate(rows):
        if i == highlight:
            tr = '<tr class="bg-[#FFB900]/10 hover:bg-[#FFB900]/15 transition-colors border-l-4 border-l-[#FFB900]">'
        else:
            tr = '<tr class="hover:bg-neutral-50 transition-colors">'
        cells = [f'<td class="py-3.5 px-4 font-bold text-neutral-900">{row[0]}</td>'] + [
            f'<td class="py-3.5 px-4 text-neutral-700">{c}</td>' for c in row[1:]
        ]
        body.append(f"        {tr}\n          " + "\n          ".join(cells) + "\n        </tr>")
    return f"""
  <div class="overflow-x-auto my-6 rounded-2xl border border-neutral-200 shadow-xs">
    <table class="w-full text-left border-collapse text-xs sm:text-sm">
      <thead>
        <tr class="bg-neutral-900 text-white font-mono uppercase tracking-wider text-xs border-b-2 border-[#FFB900]">
{th}
        </tr>
      </thead>
      <tbody class="divide-y divide-neutral-100 bg-white">
{chr(10).join(body)}
      </tbody>
    </table>
  </div>
"""


def steps(items):
    out = ['\n  <div class="space-y-4 my-6">']
    for n, (title, text) in enumerate(items, 1):
        out.append(f"""    <div class="flex gap-4 p-5 rounded-2xl border border-neutral-200 bg-white">
      <div class="w-9 h-9 rounded-xl bg-neutral-900 text-[#FFB900] font-black flex items-center justify-center shrink-0">
        {n}
      </div>
      <div>
        <h3 class="text-base sm:text-lg font-bold text-neutral-900 mb-1">{title}</h3>
        <p class="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          {text}
        </p>
      </div>
    </div>""")
    out.append("  </div>\n")
    return "\n".join(out)


def author(bio):
    return f"""
  <!-- Author Bio Section -->
  <div class="p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200 my-8">
    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div class="w-14 h-14 rounded-2xl bg-neutral-900 text-[#FFB900] font-black text-xl flex items-center justify-center shrink-0 border border-neutral-700 shadow-sm">
        MA
      </div>
      <div>
        <h4 class="text-base font-bold text-neutral-900 mb-1">
          About the Author: Muhammad Arslan
        </h4>
        <p class="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          {bio}
        </p>
      </div>
    </div>
  </div>
"""


def page(parts):
    return '<div class="space-y-8">\n\n' + "".join(parts) + "\n</div>\n"


# ---------------------------------------------------------------------------
# Article 1: Pakistan vs China clothing manufacturer
# ---------------------------------------------------------------------------
pk_cn = page([
    quick_answer(
        "Choose a <strong>Pakistani clothing manufacturer</strong> for cotton-based streetwear, sublimated teamwear and "
        "gym wear in small runs, especially if you sell in the EU or UK. Choose <strong>China</strong> for complex "
        "synthetic garments, technical trims and very large volumes. At Gloves Storm in Sialkot, orders start at "
        "<strong>30 pieces per style</strong>, samples take 5 to 7 working days, and goods ship DDP to the USA, UK and EU."
    ),
    p(
        "Most brands sourcing apparel overseas end up comparing the same two countries. China has the largest garment "
        "supply chain in the world. Pakistan is smaller, but it has its own cotton, spinning and knitting base, and "
        "Sialkot has made sports goods and teamwear for international brands for generations. This guide compares the "
        "two on the things that decide a first order: minimums, fabric, cost, duties, lead times and communication."
    ),
    h2("side-by-side-comparison", "Pakistan vs China: side-by-side"),
    p("A quick view of where each country is usually strongest. Individual factories vary, so always confirm details in writing."),
    table(
        ["Factor", "Pakistan", "China"],
        [
            ["Typical MOQ for custom cut-and-sew", "Often 30–300 pieces per style", "Often 300–1,000+ for full custom; lower at trading companies"],
            ["Strongest categories", "Cotton fleece, heavyweight hoodies and tees, sublimated teamwear, gym wear", "Technical synthetics, outerwear, complex trims, very large volumes"],
            ["Raw material base", "Home-grown cotton, spinning and knitting", "Widest range of synthetic and specialty fabrics"],
            ["Access to the EU", "GSP+ preferences cover many textile lines", "Standard third-country duties"],
            ["Access to the USA", "Standard MFN duties", "Standard duties plus Section 301 tariffs on many apparel lines"],
            ["Working language", "English widely used in export business", "Often via agents or translators at smaller factories"],
        ],
    ),
    h2("minimum-order-quantities", "Minimum order quantities"),
    p(
        "MOQ is usually the first wall a new brand hits. Large Chinese mills are built for volume, so many quote several "
        "hundred pieces per color for full custom work. Smaller Chinese workshops and trading companies go lower, but "
        "you often lose direct contact with the people sewing your product."
    ),
    p(
        "Sialkot factories tend to run smaller batches because teamwear orders are naturally small: a club needs 20 to "
        "40 kits, not 2,000. That is why low-MOQ production is normal there. Gloves Storm starts at 30 pieces per "
        f"style. See our {a('/journal/low-moq-clothing-manufacturers-for-startups', 'low MOQ manufacturer guide')} for how to split an MOQ across sizes and colors."
    ),
    h2("fabric-and-product-strengths", "Fabric and product strengths"),
    p("Match the country to the product, not the other way round."),
    ul([
        f"<strong>Heavyweight cotton streetwear:</strong> Pakistan's cotton base suits 400–500 GSM French terry {a('/products/clothing-streetwear/custom-hoodies', 'hoodies')}, {a('/products/clothing-streetwear/custom-heavyweight-t-shirts', 'heavyweight tees')} and sweatpants.",
        f"<strong>Sublimated teamwear:</strong> Sialkot is a major source of {a('/products/sportswear-teamwear/custom-soccer-kits', 'soccer kits')}, {a('/products/sportswear-teamwear/custom-basketball-uniforms', 'basketball uniforms')} and {a('/products/sportswear-teamwear/custom-american-football-uniforms', 'American football uniforms')}.",
        f"<strong>Gym and activewear:</strong> both countries make nylon-spandex {a('/products/gym-fitness-wear', 'gym wear')}; China has more fabric choice, Pakistan more flexibility on small runs.",
        "<strong>Technical outerwear:</strong> bonded seams, waterproof membranes and specialty insulation are usually easier to source in China.",
    ]),
    image("/images/products/hoodie-black.png", "Heavyweight cotton hoodie made by a Pakistani clothing manufacturer"),
    h2("cost-and-duties", "Cost, duties and landed price"),
    p(
        "Compare <strong>landed cost</strong>, not the factory price. Landed cost is the unit price plus freight, import "
        "duty, customs fees and any rework. A cheaper unit price can lose its advantage once duties are added."
    ),
    ul([
        "<strong>Selling in the USA:</strong> many Chinese-made garments carry Section 301 tariffs on top of normal duty. Check the HTS code for your product before you compare quotes.",
        "<strong>Selling in the EU:</strong> Pakistan is a GSP+ beneficiary, which gives many textile and apparel lines reduced or zero EU import duty. Check that your product and its origin rules qualify.",
        "<strong>Selling in the UK:</strong> Pakistan is covered by the UK Developing Countries Trading Scheme. Check the current tariff for your commodity code.",
    ]),
    p(
        "Trade rules change, so confirm current duty rates with your customs broker or freight forwarder. With DDP "
        "shipping the factory quotes a delivered price that already includes duty, so there are no surprises at the port."
    ),
    h2("lead-times-and-shipping", "Lead times and shipping"),
    p(
        "China has the advantage on ocean freight routes and port capacity. For small orders, though, most brands ship "
        "by air, and the difference in transit time is small. What matters more is how fast a factory can sample."
    ),
    table(
        ["Stage", "Gloves Storm (Sialkot)"],
        [
            ["Sample", "5–7 working days"],
            ["Bulk production", "12–18 working days after sample approval"],
            ["Air freight", "DDP to the USA, UK and EU"],
        ],
    ),
    h2("communication-and-quality-control", "Communication and quality control"),
    p(
        "English is widely used in Pakistan's export business, which makes it easier to talk directly to the people who "
        "make your product instead of going through an agent. Whichever country you choose, ask for the same quality "
        "controls: a pre-production sample you approve, inline checks during sewing, and a final inspection against an "
        "AQL standard before shipping."
    ),
    h2("how-to-choose", "How to choose"),
    steps([
        ("List your products", "Cotton fleece, tees and teamwear point to Pakistan. Complex synthetic outerwear points to China. Many brands use both."),
        ("Price the landed cost", "Get delivered (DDP) quotes from both, with duty included for your market."),
        ("Order samples from two factories", "Judge fabric hand-feel, stitching and fit side by side before committing to bulk."),
        ("Start small, then scale", f"Place a first run at the factory's MOQ, check sell-through, then reorder. {a('/contact', 'Request a quote')} to start with Gloves Storm."),
    ]),
    author(
        "Muhammad Arslan is the founder of Gloves Storm, a Sialkot, Pakistan apparel factory producing custom sportswear, "
        "gym wear and heavyweight streetwear for brands in the USA, UK and Europe. He works directly with brand founders "
        "on fabric selection, sampling and low-MOQ production."
    ),
])

# ---------------------------------------------------------------------------
# Article 2: BJJ rash guard manufacturing
# ---------------------------------------------------------------------------
bjj = page([
    quick_answer(
        "A <strong>BJJ rash guard manufacturer</strong> makes compression tops in nylon-spandex with flatlock seams and "
        "full dye-sublimation, so your design never cracks or peels on the mat. Gloves Storm makes short and long sleeve "
        "rash guards in <strong>200 GSM nylon-spandex with UPF 50+</strong>, including ranked rash guards in belt colors, "
        "from <strong>30 pieces per design</strong>, with 5 to 7 day samples and DDP shipping to the USA, UK and EU."
    ),
    p(
        "Rash guards are one of the easiest products for a BJJ academy, MMA gym or combat sports brand to sell: every "
        "student needs one, and a well-designed academy rash guard doubles as advertising. This guide covers the "
        "fabric, construction and printing that separate a rash guard that lasts from one that pills after a month of rolling."
    ),
    image("/images/products/rash-guard.jpg", "Custom sublimated BJJ rash guard made in Sialkot"),
    h2("fabric-what-to-ask-for", "Fabric: what to ask for"),
    p("Rash guards live under constant friction and stretch, so fabric choice matters more than anything else."),
    table(
        ["Spec", "What to ask for", "Why it matters"],
        [
            ["Fiber", "Nylon-spandex (around 80/20)", "Nylon resists abrasion better than polyester and feels smoother on skin"],
            ["Weight", "About 200 GSM", "Enough compression and durability without overheating"],
            ["Stretch", "4-way stretch with good recovery", "Keeps its shape through guard work and scrambles"],
            ["Sun protection", "UPF 50+ rated", "Lets the same top work for surf and outdoor training"],
            ["Finish", "Chlorine-resistant treatment", "Survives frequent washing and pool use"],
        ],
        highlight=0,
    ),
    h2("construction-details", "Construction details that matter on the mat"),
    ul([
        "<strong>Flatlock seams throughout:</strong> no raised seam to rub skin raw during long sessions.",
        "<strong>Silicone gripper at the waist:</strong> stops the top riding up during guard play.",
        "<strong>Tagless heat-transfer label:</strong> no scratchy neck tag.",
        "<strong>Short or long sleeve on the same MOQ:</strong> offer both without doubling your minimum.",
        "<strong>Optional rear neck zip:</strong> easier on and off for tight compression fits.",
    ]),
    h2("printing-sublimation", "Printing: why sublimation wins"),
    p(
        "Screen-printed or heat-pressed logos sit on top of the fabric and crack once the top is stretched over and over. "
        "Dye-sublimation dyes the fibers themselves, so all-over artwork, gradients and academy crests stay sharp and "
        "never peel. Ask your manufacturer to print a test panel and stretch it hard: a good sublimation print keeps "
        "its color and opacity under full stretch."
    ),
    h2("ranked-rash-guards", "Ranked rash guards for competition"),
    p(
        "Many academies want ranked rash guards in white, blue, purple, brown and black for no-gi training and "
        "competition. We produce ranked designs with the rank color built into the sublimated pattern. Federations "
        "such as the IBJJF set rules for how much rank color a no-gi top must show, so share the current rule with "
        "your manufacturer and approve the color layout on the sample before bulk."
    ),
    h2("what-you-can-customize", "What you can customize"),
    table(
        ["Option", "Details"],
        [
            ["Design", "Full sublimation: any artwork, academy crest or brand identity"],
            ["Sleeve length", "Short or long sleeve at the same MOQ"],
            ["Stitch color", "Contrast flatlock stitching as a design element"],
            ["Branding", "Tagless neck print, woven hem label, custom packaging"],
            ["Sizing", "Men's, women's and kids' fits; size runs split within the MOQ"],
        ],
    ),
    p(
        f"Pair your rash guards with matching {a('/products/sportswear-teamwear/custom-compression-wear', 'compression spats and shorts')} "
        f"or {a('/products/gym-fitness-wear/custom-mens-training-shorts-manufacturer', 'training shorts')} to sell a full no-gi kit."
    ),
    h2("ordering-process", "How ordering works"),
    steps([
        ("Send your design", "Share artwork, sizes and sleeve options, or ask us to help turn a sketch into a print-ready design."),
        ("Approve a sample", "We make a physical sample in 5–7 working days and courier it to you to test on the mat."),
        ("Bulk production", "After approval, bulk takes 12–18 working days, with checks during sewing and a final inspection."),
        ("DDP delivery", "We ship to your academy or warehouse in the USA, UK or EU with duties handled."),
    ]),
    p(
        f"See the full specification on our {a('/products/gym-fitness-wear/custom-rash-guard-manufacturer', 'custom rash guard page')}, "
        f"or {a('/contact', 'request a quote')} with your design."
    ),
    author(
        "Muhammad Arslan is the founder of Gloves Storm in Sialkot, Pakistan, producing sublimated rash guards, "
        "compression wear and teamwear for academies and combat sports brands in the USA, UK and Europe."
    ),
])

OUT.mkdir(exist_ok=True)
(OUT / "blog-5-pakistan-vs-china.html").write_text(pk_cn, encoding="utf-8")
(OUT / "blog-6-bjj-rash-guard.html").write_text(bjj, encoding="utf-8")
print("wrote", OUT / "blog-5-pakistan-vs-china.html")
print("wrote", OUT / "blog-6-bjj-rash-guard.html")

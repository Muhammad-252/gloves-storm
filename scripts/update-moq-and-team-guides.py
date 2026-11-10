"""Updates two published journal posts with 2026-27 price list facts.

1. /journal/low-moq-clothing-manufacturers-for-startups
   - MOQ 30 for all apparel, real prices, courier times, DDP on request
   - New section with real low-MOQ prices and product links
2. /journal/custom-team-uniforms-manufacturer-guide
   - Targets "branded team uniforms", adds real team prices, DDP on request

Reads the current posts from scripts/backups/post-<slug>.json (export them first),
writes the updated HTML to scripts/blog-drafts/updated-<slug>.html.
Run scripts/republish-updated-guides.mjs to save them.
"""
import json
from pathlib import Path

ROOT = Path(__file__).parent
LINK = 'class="text-neutral-900 font-bold underline decoration-[#FFB900] decoration-2 underline-offset-4 hover:text-[#FFB900] transition-colors"'
TH = 'class="py-3.5 px-4 font-bold"'
TD_B = 'class="py-3.5 px-4 font-bold text-neutral-900"'
TD = 'class="py-3.5 px-4 text-neutral-700"'


def a(href, text):
    return f'<a href="{href}" {LINK}>{text}</a>'


def price_table(headers, rows):
    head = "".join(f"<th {TH}>{h}</th>" for h in headers)
    body = "".join(
        '<tr class="hover:bg-neutral-50 transition-colors">'
        + f"<td {TD_B}>{r[0]}</td>"
        + "".join(f"<td {TD}>{c}</td>" for c in r[1:])
        + "</tr>"
        for r in rows
    )
    return f"""
  <div class="overflow-x-auto my-8 rounded-2xl border border-neutral-200 shadow-xs">
    <table class="w-full text-left border-collapse text-xs sm:text-sm">
      <thead>
        <tr class="bg-neutral-900 text-white font-mono uppercase tracking-wider text-xs border-b-2 border-[#FFB900]">{head}</tr>
      </thead>
      <tbody class="divide-y divide-neutral-100 bg-white">{body}</tbody>
    </table>
  </div>
"""


def apply(html, pairs, slug):
    for old, new in pairs:
        if old not in html:
            raise SystemExit(f"{slug}: missing {old[:70]!r}")
        html = html.replace(old, new, 1)
    return html


# ---------------------------------------------------------------- low MOQ guide
slug = "low-moq-clothing-manufacturers-for-startups"
html = json.loads((ROOT / "backups" / f"post-{slug}.json").read_text(encoding="utf-8"))["content"]

moq_prices = f"""
  <!-- REAL LOW MOQ PRICES (2026-27 price list) -->
  <h3 id="real-low-moq-prices" class="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 mt-8 mb-4">
    What 30 pieces actually costs: real low MOQ prices
  </h3>
  <p>
    Industry ranges only go so far, so here are our own published 2026–27 prices at the lowest tier, 30–99 pieces per style.
    Each price includes fabric, making and one print or embroidery position, and every sample price is all-in, including express courier.
  </p>
{price_table(
    ["Product", "30–99 pcs", "Sample, all-in", "Production"],
    [
        [a("/products/clothing-streetwear/custom-heavyweight-t-shirts", "Heavyweight T-shirt, 220–260 gsm"), "$15.50 per piece", "$60", "2–3 weeks"],
        [a("/products/clothing-streetwear/custom-hoodies", "Heavyweight hoodie, 450–500 gsm"), "$35.00 per piece", "$80", "3–4 weeks"],
        [a("/products/clothing-streetwear/custom-sweatsuit-sets", "Sweatsuit set, hoodie + pants"), "$58.00 per set", "$100", "4 weeks"],
        [a("/products/clothing-streetwear/custom-baggy-denim-jeans", "Baggy denim jeans, 12–14 oz"), "$38.00 per piece", "$80", "4–5 weeks"],
        [a("/products/sportswear-teamwear/custom-soccer-kits", "Sublimated soccer kit"), "$21.00 per set", "$80", "2–3 weeks"],
        [a("/products/gym-fitness-wear/custom-high-waist-seamless-gym-leggings", "High-waist leggings"), "$17.00 per piece", "$65", "3 weeks"],
        [a("/products/gym-fitness-wear/custom-mma-fight-shorts", "MMA fight shorts"), "$17.00 per piece", "$65", "3 weeks"],
        [a("/products/clothing-streetwear/custom-embroidered-caps", "Embroidered cap"), "$11.00 per piece", "$50", "3 weeks"],
    ],
)}
  <p>
    So a first drop of 30 heavyweight hoodies costs about $1,050 in production plus an $80 sample, before shipping.
    Prices fall at 100 and 300 pieces; see the {a("/pricing", "full price list")} for every product, decoration add-ons and order terms,
    or read our breakdown of {a("/journal/how-much-does-it-cost-to-make-a-hoodie", "how much it costs to make a hoodie")}.
  </p>
"""

low_moq_pairs = [
    ("Last updated: October 2026", "Last updated: November 2026"),
    ('<td class="py-3.5 px-4 font-extrabold text-neutral-900">30–50 pcs/style*</td>',
     '<td class="py-3.5 px-4 font-extrabold text-neutral-900">30 pcs/style*</td>'),
    ("*Gloves Storm: 30 pcs on select custom development, 50 pcs on most apparel, 100+ on some OEM lines.",
     "*Gloves Storm: 30 pieces per style on all apparel, sizes mixed. Labels and packaging have their own minimums."),
    ("Sampling takes 5 to 7 days, quality control follows AQL 2.5, and air freight to the USA and UK takes 3 to 5 days under DDP terms.",
     f"Minimums start at 30 pieces per style with sizes mixed, and published prices start at $15.50 for a heavyweight tee and $35 for a 450–500 gsm hoodie (see the {a('/pricing', 'full price list')}). Samples are made in 5 to 7 days, quality control follows AQL 2.5, and courier delivery to the USA, UK and EU takes 4 to 7 working days, with DDP available on request."),
    ("3–6 days by air (DDP), 3–5 weeks by sea", "4–7 working days by air courier, 3–5 weeks by sea"),
    ("an export-certified OEM sportswear", "an export-focused OEM sportswear"),
    ("and international DDP logistics,", "and international export logistics,"),
    ("Gloves Storm suits sportswear, gym wear and streetwear from 30 to 50 pieces.",
     "Gloves Storm suits sportswear, gym wear and streetwear from 30 pieces per style."),
]
html = apply(html, low_moq_pairs, slug)

marker = "Plan for at least two sample revision rounds."
i = html.find(marker)
if i < 0:
    raise SystemExit("low MOQ: missing insertion marker")
end = html.find("</p>", i) + len("</p>")
html = html[:end] + "\n" + moq_prices + html[end:]
(ROOT / "blog-drafts" / f"updated-{slug}.html").write_text(html, encoding="utf-8")
print("updated", slug, len(html))

# ---------------------------------------------------------- team uniforms guide
slug = "custom-team-uniforms-manufacturer-guide"
html = json.loads((ROOT / "backups" / f"post-{slug}.json").read_text(encoding="utf-8"))["content"]

team_prices = f"""
  <!-- REAL BRANDED TEAM UNIFORM PRICES (2026-27 price list) -->
  <h2 id="branded-team-uniform-prices" class="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 pt-4">
    Branded team uniform prices
  </h2>
  <p>
    Our published 2026–27 prices for branded team uniforms at 30–99 pieces. Full sublimation, player names, numbers, crest and sponsors are included,
    and you can mix sizes within the 30-piece minimum.
  </p>
{price_table(
    ["Uniform", "30–99", "100–299", "300+", "Sample, all-in"],
    [
        [a("/products/sportswear-teamwear/custom-soccer-kits", "Soccer kit (jersey + shorts)"), "$21.00 / set", "$18.90", "$17.22", "$80"],
        [a("/products/sportswear-teamwear/custom-basketball-uniforms", "Basketball uniform"), "$23.00 / set", "$20.70", "$18.86", "$80"],
        [a("/products/sportswear-teamwear/custom-american-football-uniforms", "American football game jersey"), "$25.00 / pc", "$22.50", "$20.50", "$70"],
        [a("/products/sportswear-teamwear/custom-baseball-uniforms", "Baseball jersey, button front"), "$22.00 / pc", "$19.80", "$18.04", "$65"],
        [a("/products/sportswear-teamwear/custom-ice-hockey-jerseys", "Ice hockey jersey"), "$27.00 / pc", "$24.30", "$22.14", "$75"],
        [a("/products/sportswear-teamwear/custom-tracksuits", "Team tracksuit"), "$39.00 / set", "$35.10", "$31.98", "$100"],
    ],
)}
  <p>See every sport, add-on and order term on our {a("/pricing", "price list")}.</p>
"""

team_pairs = [
    ("Last updated: October 2026", "Last updated: November 2026"),
    ("Sourcing custom team uniforms requires", "Sourcing custom, branded team uniforms requires"),
    ("and DDP air delivery straight to your clubhouse", "and courier delivery to your clubhouse in 4–7 working days"),
    ("Player-Sorted Packing &amp; DDP Express Delivery", "Player-Sorted Packing &amp; Express Delivery"),
    ("We ship via DDP (Delivered Duty Paid) air freight through FedEx and DHL Express.",
     "We ship by FedEx and DHL Express in 4–7 working days, and can quote DDP (Delivered Duty Paid) delivery on request."),
]
html = apply(html, team_pairs, slug)
first_h2 = html.find("<h2")
if first_h2 < 0:
    raise SystemExit("team guide: no h2 found")
html = html[:first_h2] + team_prices + "\n  " + html[first_h2:]
(ROOT / "blog-drafts" / f"updated-{slug}.html").write_text(html, encoding="utf-8")
print("updated", slug, len(html))

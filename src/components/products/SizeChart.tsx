"use client";

import { useState } from "react";
import { SizeChartData } from "@/types/database";
import { SIZE_CHART_TEMPLATES } from "@/lib/data/sizeChartTemplates";
import { Ruler, Info, ChevronRight, Check } from "lucide-react";

interface SizeChartProps {
  productName: string;
  sizeChart?: SizeChartData | null;
}

export default function SizeChart({ productName, sizeChart: incomingChart }: SizeChartProps) {
  const sizeChart = incomingChart || SIZE_CHART_TEMPLATES.mens_top;
  const [unit, setUnit] = useState<"cm" | "in">(sizeChart.unit || "cm");

  const rows = unit === "cm" ? sizeChart.rows_cm : sizeChart.rows_in;
  const tolerance = unit === "cm" ? "+/- 0.5–1.0 cm" : "+/- 0.25–0.5 in";

  return (
    <section
      id="size-chart"
      aria-labelledby="size-chart-heading"
      className="p-5 sm:p-7 md:p-9 rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-md border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] my-10 sm:my-14"
    >
      {/* Header & Unit Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60 mb-2">
            <Ruler className="w-3 h-3 text-amber-600" />
            <span>Industrial Fit &amp; Grading Standards</span>
          </div>
          <h2
            id="size-chart-heading"
            className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-neutral-950"
          >
            Size Chart — {productName}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl">
            Pattern dimensions graded for athletic fit. Tolerance:{" "}
            <span className="font-semibold text-neutral-800">{tolerance}</span>.{" "}
            {sizeChart.note || "Starting values — verified against master industrial grading patterns."}
          </p>
        </div>

        {/* Unit Toggle Switcher */}
        <div className="flex items-center self-start sm:self-center gap-1 p-1 bg-neutral-100 rounded-xl border border-neutral-200/80 shrink-0">
          <button
            type="button"
            onClick={() => setUnit("cm")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              unit === "cm"
                ? "bg-white text-neutral-950 shadow-xs"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
            aria-pressed={unit === "cm"}
          >
            Metric (cm)
          </button>
          <button
            type="button"
            onClick={() => setUnit("in")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              unit === "in"
                ? "bg-white text-neutral-950 shadow-xs"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
            aria-pressed={unit === "in"}
          >
            Imperial (inches)
          </button>
        </div>
      </div>

      {/* Accessible, Responsive Crawlable HTML Table */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <caption className="sr-only">
            Size Chart measurements for {productName} in {unit === "cm" ? "centimeters" : "inches"}
          </caption>
          <thead>
            <tr className="bg-neutral-50/90 border-b border-neutral-200 text-neutral-900 font-bold uppercase tracking-wider text-[11px]">
              {sizeChart.columns.map((col, index) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`py-3.5 px-4 whitespace-nowrap ${
                    index === 0
                      ? "sticky left-0 bg-neutral-50 z-10 border-r border-neutral-200 font-black text-neutral-950 shadow-[2px_0_5px_rgba(0,0,0,0.02)]"
                      : ""
                  }`}
                >
                  {col.label} {index > 0 ? `(${unit})` : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 font-mono text-[11px] sm:text-xs">
            {rows.map((row, rIdx) => (
              <tr
                key={row.size || rIdx}
                className={`transition-colors hover:bg-amber-50/40 ${
                  rIdx % 2 === 1 ? "bg-neutral-50/40" : "bg-white"
                }`}
              >
                {sizeChart.columns.map((col, cIdx) => (
                  <td
                    key={col.key}
                    className={`py-3 px-4 whitespace-nowrap ${
                      cIdx === 0
                        ? "sticky left-0 font-bold font-sans text-neutral-950 bg-inherit border-r border-neutral-200 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]"
                        : "text-neutral-700"
                    }`}
                  >
                    {row[col.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* How To Measure Guide */}
      {sizeChart.how_to_measure && sizeChart.how_to_measure.length > 0 && (
        <div className="mt-8 pt-6 border-t border-neutral-200/80">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-950 mb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600" />
            <span>How to Measure For Custom Production</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs">
            {sizeChart.how_to_measure.map((guide, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-3.5 rounded-xl bg-neutral-50/80 border border-neutral-200/60 flex items-start gap-2.5"
              >
                <div className="w-5 h-5 rounded-full bg-neutral-900 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <span className="font-bold text-neutral-900 block mb-0.5">
                    {guide.point}
                  </span>
                  <p className="text-neutral-600 leading-relaxed text-[11px] sm:text-xs">
                    {guide.instruction}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-900 flex items-center gap-2">
            <Check className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Bespoke Sizing Available:</strong> If your brand uses proprietary measurement specs or regional grading curves (e.g. EU vs US sizing), send your tech pack during quotation and our pattern makers will grade to your exact CAD specs.
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

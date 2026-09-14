"use client";

import { useState } from "react";
import { Category, Product } from "@/types/database";
import {
  Sliders,
  Sparkles,
  Layers,
  Palette,
  Check,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Box,
} from "lucide-react";

interface AdminCustomizerClientProps {
  categories: Category[];
  products: Product[];
}

interface CustomFieldConfig {
  id: string;
  category: string;
  fieldName: string;
  fieldType: "select" | "multi-select" | "color" | "text" | "upload" | "size";
  options: string[];
  required: boolean;
}

const DEFAULT_CONFIGS: CustomFieldConfig[] = [
  {
    id: "f-1",
    category: "Boxing",
    fieldName: "Ounce Weight Breakdown",
    fieldType: "multi-select",
    options: ["8oz", "10oz", "12oz", "14oz", "16oz", "18oz"],
    required: true,
  },
  {
    id: "f-2",
    category: "Boxing",
    fieldName: "Outer Leather Finish",
    fieldType: "select",
    options: ["Full-Grain Cowhide (1.1mm)", "Microfiber Engineered Leather", "Metallic Mirror Leather", "Vintage Distressed Nappa"],
    required: true,
  },
  {
    id: "f-3",
    category: "Boxing",
    fieldName: "Cushion Padding Core",
    fieldType: "select",
    options: ["5-Layer Handcrafted Latex & EVA", "Injected Shock Absorption Gel", "Multi-Density Ergonomic Foam"],
    required: true,
  },
  {
    id: "f-4",
    category: "Boxing",
    fieldName: "Wrist Closure System",
    fieldType: "select",
    options: ["Dual-Channel Lace-Up", "360° Wraparound Military Hook & Loop", "Hybrid Quick-Lace Velcro"],
    required: true,
  },
  {
    id: "f-5",
    category: "Streetwear",
    fieldName: "Fabric Weight (GSM)",
    fieldType: "select",
    options: ["300 GSM Heavyweight French Terry", "400 GSM Compact Cotton", "450 GSM Double-Faced Loopback"],
    required: true,
  },
  {
    id: "f-6",
    category: "Streetwear",
    fieldName: "Garment Wash Process",
    fieldType: "select",
    options: ["Pre-Shrunk Silicon Wash", "Vintage Acid Mineral Wash", "Reactive Pigment Dye", "Raw Eco Unbleached"],
    required: false,
  },
  {
    id: "f-7",
    category: "Basketball",
    fieldName: "Jersey Knit Mesh",
    fieldType: "select",
    options: ["Engineered HyperVent Micro-Mesh", "Dri-Fit Interlock Knit", "Reversible Dual Layer Mesh"],
    required: true,
  },
];

export default function AdminCustomizerClient({
  categories,
  products,
}: AdminCustomizerClientProps) {
  const [configs, setConfigs] = useState<CustomFieldConfig[]>(DEFAULT_CONFIGS);
  const [selectedCategory, setSelectedCategory] = useState<string>("Boxing");
  const [notice, setNotice] = useState<string | null>(null);

  const [newField, setNewField] = useState<Partial<CustomFieldConfig>>({
    fieldName: "",
    fieldType: "select",
    options: [],
    required: false,
  });

  const [tempOptionInput, setTempOptionInput] = useState("");

  const filteredConfigs = configs.filter((c) => c.category === selectedCategory);

  const handleSaveConfigs = () => {
    setNotice("Customizer preset configuration updated successfully.");
    setTimeout(() => setNotice(null), 3000);
  };

  const handleAddField = () => {
    if (!newField.fieldName) return;
    const added: CustomFieldConfig = {
      id: `f-${Date.now()}`,
      category: selectedCategory,
      fieldName: newField.fieldName,
      fieldType: newField.fieldType || "select",
      options: newField.options || [],
      required: Boolean(newField.required),
    };
    setConfigs([...configs, added]);
    setNewField({ fieldName: "", fieldType: "select", options: [], required: false });
    setTempOptionInput("");
  };

  const handleDeleteField = (id: string) => {
    setConfigs(configs.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 block mb-1 font-semibold">
            Studio Configurator CMS
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0f172a] flex items-center gap-2">
            <span>Product Customizer Fields</span>
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Define dynamic tailoring options, weights, and finishes available for each manufacturing division.
          </p>
        </div>

        <button
          onClick={handleSaveConfigs}
          className="px-5 py-2.5 rounded-full bg-[#0f172a] text-white font-bold uppercase text-xs font-mono flex items-center gap-2 hover:bg-neutral-800 transition-all shadow-sm cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Studio Preset</span>
        </button>
      </div>

      {notice && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-amber-600" />
          <span>{notice}</span>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {["Boxing", "Streetwear", "Basketball", "American Football", "Sportswear", "Gym Wear"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#0f172a] text-white font-bold shadow-sm"
                  : "bg-white text-neutral-600 hover:text-[#0f172a] border border-neutral-200 hover:border-neutral-300 shadow-xs"
              }`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* Fields List for Selected Category */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0f172a]">
          Active Customizer Options for {selectedCategory}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredConfigs.map((cfg) => (
            <div
              key={cfg.id}
              className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-[#0f172a]">{cfg.fieldName}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600">
                      {cfg.fieldType}
                    </span>
                    {cfg.required && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-600 font-semibold">
                        Required
                      </span>
                    )}
                    <button
                      onClick={() => handleDeleteField(cfg.id)}
                      className="text-neutral-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {cfg.options.map((opt, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-neutral-50 border border-neutral-200 text-neutral-600"
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Customizer Field Box */}
      <div className="p-6 rounded-3xl bg-neutral-50/70 border border-dashed border-neutral-300 space-y-4">
        <h4 className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-amber-600" />
          <span>Add New Field to {selectedCategory} Customizer</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Field Label (e.g. Lining Material)"
            value={newField.fieldName}
            onChange={(e) => setNewField({ ...newField, fieldName: e.target.value })}
            className="bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500/20"
          />

          <select
            value={newField.fieldType}
            onChange={(e) => setNewField({ ...newField, fieldType: e.target.value as any })}
            className="bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-xs text-[#0f172a] focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500/20"
          >
            <option value="select">Dropdown Selection</option>
            <option value="multi-select">Multi-Select Pills</option>
            <option value="color">Color Swatch Palette</option>
            <option value="text">Custom Text / Spec</option>
            <option value="size">Size Range Curve</option>
            <option value="upload">Artwork Upload</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add options (comma-separated)"
              value={tempOptionInput}
              onChange={(e) => {
                setTempOptionInput(e.target.value);
                setNewField({
                  ...newField,
                  options: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                });
              }}
              className="flex-1 bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-xs text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500/20"
            />

            <button
              onClick={handleAddField}
              className="px-4 py-2 rounded-xl bg-[#0f172a] hover:bg-neutral-800 text-white font-bold text-xs font-mono shrink-0 shadow-sm transition-all cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

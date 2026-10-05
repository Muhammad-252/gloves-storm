"use client";

import React, { useState } from "react";
import { Plane, Ship, ShieldCheck, MapPin, CheckCircle2 } from "lucide-react";

interface RouteInfo {
  id: string;
  name: string;
  country: string;
  flag: string;
  air: string;
  sea: string;
  terms: string;
  x: number; // percentage
  y: number; // percentage
}

const DESTINATIONS: RouteInfo[] = [
  {
    id: "usa-ny",
    name: "New York / East Coast",
    country: "United States",
    flag: "🇺🇸",
    air: "3–5 Days (DHL / FedEx Express)",
    sea: "22–26 Days",
    terms: "DDP Air & Sea / Amazon FBA Ready",
    x: 24,
    y: 36,
  },
  {
    id: "usa-ca",
    name: "Los Angeles / West Coast",
    country: "United States",
    flag: "🇺🇸",
    air: "4–6 Days (Direct Air Corridor)",
    sea: "28–32 Days",
    terms: "Full US Customs Clearance Included",
    x: 16,
    y: 40,
  },
  {
    id: "uk",
    name: "London / Heathrow Hub",
    country: "United Kingdom",
    flag: "🇬🇧",
    air: "3–5 Days (DHL Express)",
    sea: "20–25 Days (Felixstowe / Southampton)",
    terms: "DDP Duty-Paid / EORI Compliant",
    x: 48,
    y: 28,
  },
  {
    id: "eu",
    name: "Frankfurt / Rotterdam Hub",
    country: "European Union",
    flag: "🇪🇺",
    air: "3–5 Days (Air Cargo)",
    sea: "22–28 Days (Rotterdam)",
    terms: "CE Certified / Duty Paid Delivery",
    x: 52,
    y: 31,
  },
  {
    id: "uae",
    name: "Dubai / Jebel Ali Hub",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    air: "2–3 Days (Emirates SkyCargo)",
    sea: "10–14 Days",
    terms: "GCC Fast-Track Clearance",
    x: 62,
    y: 46,
  },
  {
    id: "aus",
    name: "Sydney / Melbourne Hub",
    country: "Australia",
    flag: "🇦🇺",
    air: "5–7 Days (Air Freight)",
    sea: "28–34 Days",
    terms: "Door-to-Door Insured Delivery",
    x: 88,
    y: 78,
  },
];

// Sialkot coordinates on the map projection (percentage)
const SIALKOT = { x: 67, y: 41, name: "Sialkot Manufacturing HQ", flag: "🇵🇰" };

export default function StaticMapFallback() {
  const [selectedDest, setSelectedDest] = useState<RouteInfo>(DESTINATIONS[0]);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      {/* Interactive Map Visual Container */}
      <div className="relative w-full aspect-[16/10] bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* SVG Projection Canvas with Connecting Arcs */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Draw connecting flight arcs from Sialkot */}
          {DESTINATIONS.map((dest) => {
            const midX = (SIALKOT.x + dest.x) / 2;
            const midY = Math.min(SIALKOT.y, dest.y) - 14;
            const isSelected = selectedDest.id === dest.id;

            return (
              <g key={dest.id}>
                {/* Arc path */}
                <path
                  d={`M ${SIALKOT.x} ${SIALKOT.y} Q ${midX} ${midY} ${dest.x} ${dest.y}`}
                  fill="none"
                  stroke={isSelected ? "url(#routeGradient)" : "#475569"}
                  strokeWidth={isSelected ? "0.6" : "0.3"}
                  strokeDasharray={isSelected ? "1.5, 0.8" : "1, 1"}
                  className={isSelected ? "animate-pulse" : "opacity-40"}
                  filter={isSelected ? "url(#glow)" : undefined}
                />
              </g>
            );
          })}
        </svg>

        {/* Sialkot Origin Point */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto"
          style={{ left: `${SIALKOT.x}%`, top: `${SIALKOT.y}%` }}
        >
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-white shadow-lg shadow-amber-500/50" />
          </span>
          <span className="mt-1 px-2 py-0.5 rounded-md bg-amber-500/90 text-slate-950 font-mono text-[9px] font-bold whitespace-nowrap shadow-md">
            📍 Sialkot HQ (Origin)
          </span>
        </div>

        {/* Destination Nodes */}
        {DESTINATIONS.map((dest) => {
          const isSelected = selectedDest.id === dest.id;
          return (
            <button
              key={dest.id}
              onClick={() => setSelectedDest(dest)}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-transform hover:scale-110 focus:outline-none"
              style={{ left: `${dest.x}%`, top: `${dest.y}%` }}
              title={`${dest.name} (${dest.country})`}
            >
              <span
                className={`relative flex h-3.5 w-3.5 rounded-full border-2 transition-all ${
                  isSelected
                    ? "bg-emerald-400 border-white shadow-lg shadow-emerald-400/80 scale-125"
                    : "bg-slate-400 border-slate-700 group-hover:bg-amber-300"
                }`}
              />
              <span
                className={`mt-1 px-1.5 py-0.5 rounded font-mono text-[8px] sm:text-[9px] whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md"
                    : "bg-slate-800/80 text-slate-300 opacity-80 group-hover:opacity-100"
                }`}
              >
                {dest.flag} {dest.name.split(" /")[0]}
              </span>
            </button>
          );
        })}

        {/* Top Floating Badge */}
        <div className="absolute top-3 left-4 z-10 flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
            Active Global Export Corridors
          </span>
        </div>
      </div>

      {/* Selected Corridor Logistics Detail Card */}
      <div className="w-full mt-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm transition-all text-left">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xl">{selectedDest.flag}</span>
            <div>
              <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                {selectedDest.name}
              </h4>
              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                {selectedDest.country} · Direct Export Route
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
            <CheckCircle2 className="w-3.5 h-3.5" />
            100% Insured DDP
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 shrink-0">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                Air Express Freight
              </span>
              <span className="text-xs font-bold text-slate-800">
                {selectedDest.air}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">
              <Ship className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                Container Sea Freight
              </span>
              <span className="text-xs font-bold text-slate-800">
                {selectedDest.sea}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            {selectedDest.terms}
          </span>
          <span className="font-mono text-[10px] text-slate-400">
            Tap destination pins to switch
          </span>
        </div>
      </div>
    </div>
  );
}

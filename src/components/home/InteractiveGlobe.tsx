"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { MapPin, Compass, Sparkles } from "lucide-react";

export interface GlobeHub {
  id: string;
  name: string;
  country: string;
  coords: [number, number];
  phi: number;
  theta: number;
  transitAir: string;
  transitSea: string;
  popular: string;
}

export const HUBS: GlobeHub[] = [
  {
    id: "sialkot",
    name: "Sialkot Factory HQ",
    country: "Pakistan",
    coords: [32.4945, 74.5229],
    phi: 4.95,
    theta: 0.55,
    transitAir: "Origin Factory Port",
    transitSea: "Direct Export Terminal",
    popular: "Master Manufacturing Facility & QC Lab",
  },
  {
    id: "na",
    name: "North America",
    country: "USA & Canada",
    coords: [40.7128, -74.0060],
    phi: 2.35,
    theta: 0.65,
    transitAir: "4–6 Days (DHL Express)",
    transitSea: "28–35 Days (Maersk Ocean)",
    popular: "Varsity Jackets, Fight Gear, Streetwear",
  },
  {
    id: "eu",
    name: "UK & European Union",
    country: "UK, Germany, France",
    coords: [51.5074, -0.1278],
    phi: 0.05,
    theta: 0.85,
    transitAir: "3–5 Days (DHL / FedEx)",
    transitSea: "24–30 Days (Port of Felixstowe/Rotterdam)",
    popular: "Championship Boxing Gloves, Football Kits",
  },
  {
    id: "me",
    name: "Middle East & Gulf",
    country: "UAE, Saudi Arabia, Qatar",
    coords: [25.2048, 55.2708],
    phi: 4.65,
    theta: 0.45,
    transitAir: "2–4 Days (Emirates SkyCargo)",
    transitSea: "12–16 Days (Jebel Ali)",
    popular: "Combat Gyms, Luxury Athleisure, Custom Shorts",
  },
  {
    id: "oc",
    name: "Australia & Oceania",
    country: "Australia, New Zealand",
    coords: [-33.8688, 151.2093],
    phi: 3.65,
    theta: -0.55,
    transitAir: "5–7 Days (Air Freight)",
    transitSea: "30–38 Days (Sydney/Melbourne)",
    popular: "MMA Gloves, Rashguards, Gym Uniforms",
  },
  {
    id: "asia",
    name: "East Asia & Pacific",
    country: "Japan, South Korea",
    coords: [35.6762, 139.6503],
    phi: 3.9,
    theta: 0.6,
    transitAir: "3–5 Days (Air Express)",
    transitSea: "18–24 Days (Tokyo/Busan)",
    popular: "Leather Craftsmanship, Custom Team Caps",
  },
];

export default function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [activeHub, setActiveHub] = useState<GlobeHub>(HUBS[0]);
  const [isDragging, setIsDragging] = useState(false);

  // Globe state references for continuous animation
  const phiRef = useRef(4.95);
  const thetaRef = useRef(0.4);
  const targetPhiRef = useRef(4.95);
  const targetThetaRef = useRef(0.4);
  const autoRotateRef = useRef(true);

  useEffect(() => {
    let width = 0;
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;

    const onResize = () => {
      if (currentCanvas) {
        width = currentCanvas.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(currentCanvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: 0,
      diffuse: 1.25,
      mapSamples: 16000,
      mapBrightness: 5.5,
      baseColor: [0.93, 0.94, 0.96],
      markerColor: [0.85, 0.45, 0.05],
      glowColor: [0.98, 0.82, 0.45],
      markers: [
        { location: [32.4945, 74.5229], size: 0.12 }, // Sialkot HQ
        { location: [40.7128, -74.0060], size: 0.08 }, // New York
        { location: [34.0522, -118.2437], size: 0.07 }, // Los Angeles
        { location: [43.6532, -79.3832], size: 0.07 }, // Toronto
        { location: [51.5074, -0.1278], size: 0.08 }, // London
        { location: [52.5200, 13.4050], size: 0.07 }, // Berlin
        { location: [48.8566, 2.3522], size: 0.07 }, // Paris
        { location: [25.2048, 55.2708], size: 0.08 }, // Dubai
        { location: [24.7136, 46.6753], size: 0.07 }, // Riyadh
        { location: [-33.8688, 151.2093], size: 0.08 }, // Sydney
        { location: [-37.8136, 144.9631], size: 0.07 }, // Melbourne
        { location: [35.6762, 139.6503], size: 0.08 }, // Tokyo
      ],
      arcs: [
        // Direct trade corridors connecting Sialkot to the world
        { from: [32.4945, 74.5229], to: [40.7128, -74.0060], color: [0.85, 0.45, 0.05] },
        { from: [32.4945, 74.5229], to: [51.5074, -0.1278], color: [0.85, 0.45, 0.05] },
        { from: [32.4945, 74.5229], to: [25.2048, 55.2708], color: [0.85, 0.45, 0.05] },
        { from: [32.4945, 74.5229], to: [-33.8688, 151.2093], color: [0.85, 0.45, 0.05] },
        { from: [32.4945, 74.5229], to: [35.6762, 139.6503], color: [0.85, 0.45, 0.05] },
      ],
      arcColor: [0.85, 0.45, 0.05],
      arcWidth: 1.5,
      arcHeight: 0.4,
    });

    let animationFrameId: number;
    const isVisibleRef = { current: true };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting;
        if (!wasVisible && entry.isIntersecting) {
          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(currentCanvas);

    const animate = () => {
      if (!isVisibleRef.current) return;

      if (autoRotateRef.current && pointerInteracting.current === null) {
        targetPhiRef.current += 0.003;
      }

      phiRef.current += (targetPhiRef.current - phiRef.current) * 0.08;
      thetaRef.current += (targetThetaRef.current - thetaRef.current) * 0.08;

      globe.update({
        phi: phiRef.current,
        theta: thetaRef.current,
        width: width * 2,
        height: width * 2,
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const selectHub = (hub: GlobeHub) => {
    setActiveHub(hub);
    targetPhiRef.current = hub.phi;
    targetThetaRef.current = hub.theta;
    autoRotateRef.current = false;
    setTimeout(() => {
      autoRotateRef.current = true;
    }, 8000);
  };

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* 360-Degree Interactive Canvas Container */}
      <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center select-none">
        {/* Amber Halo Glow Layer behind the globe */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-amber-400/25 via-amber-200/30 to-amber-500/15 blur-3xl pointer-events-none" />

        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current =
              e.clientX - pointerInteractionMovement.current;
            setIsDragging(true);
            autoRotateRef.current = false;
            if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            setIsDragging(false);
            if (canvasRef.current) canvasRef.current.style.cursor = "grab";
            setTimeout(() => {
              autoRotateRef.current = true;
            }, 6000);
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            setIsDragging(false);
            if (canvasRef.current) canvasRef.current.style.cursor = "grab";
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              targetPhiRef.current += delta * 0.003;
            }
          }}
          className="w-full h-full cursor-grab opacity-95 transition-opacity active:cursor-grabbing touch-pan-y"
          style={{ width: "100%", height: "100%", contain: "layout paint size", touchAction: "pan-y" }}
        />

        {/* Drag Hint Pill */}
        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/95 border border-neutral-200/90 shadow-md backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-neutral-700 whitespace-nowrap">
            <Compass className={`w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-600 ${isDragging ? "animate-spin" : ""}`} />
            <span>360° Drag & Rotate</span>
          </div>
        </div>

        {/* Floating Origin Indicator (Sialkot Factory) */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 pointer-events-none max-w-[65%] sm:max-w-none">
          <div className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl bg-white/95 border border-amber-200/90 shadow-md backdrop-blur-md flex items-center gap-2">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-500 animate-ping shrink-0" />
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-amber-800 font-bold block leading-tight truncate">
                Origin Hub
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-neutral-900 leading-tight block truncate">
                Sialkot, Pakistan
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Corridor Quick Selector Buttons */}
      <div className="w-full mt-4">
        <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
          {HUBS.map((hub) => {
            const isActive = activeHub.id === hub.id;
            return (
              <button
                key={hub.id}
                onClick={() => selectHub(hub)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-[#0f172a] text-white font-bold shadow-sm"
                    : "bg-white text-neutral-600 hover:text-neutral-950 border border-neutral-200 hover:border-neutral-300 shadow-2xs"
                }`}
              >
                <MapPin className={`w-3 h-3 ${isActive ? "text-amber-400" : "text-amber-600"}`} />
                <span>{hub.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Hub Interactive Dossier */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm transition-all animate-in fade-in duration-300 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-bold">
                  Active Corridor
                </span>
              </div>
              <h4 className="text-base font-bold uppercase text-neutral-950">
                {activeHub.name} ({activeHub.country})
              </h4>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                Direct Route From Sialkot
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                Door-to-Door Delivery
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80">
              <span className="text-neutral-500 font-medium block text-[10px] uppercase font-mono mb-0.5">
                Air Express Courier
              </span>
              <span className="text-neutral-900 font-semibold">{activeHub.transitAir}</span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80">
              <span className="text-neutral-500 font-medium block text-[10px] uppercase font-mono mb-0.5">
                Bulk Cargo Transit
              </span>
              <span className="text-neutral-900 font-semibold">{activeHub.transitSea}</span>
            </div>
          </div>

          <p className="text-xs text-neutral-600 mt-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span><strong className="text-neutral-900">Key Exports:</strong> {activeHub.popular}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

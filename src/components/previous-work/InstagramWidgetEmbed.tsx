"use client";

import { useEffect, useRef, useState } from "react";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { ExternalLink, Sparkles, RefreshCw } from "lucide-react";

interface InstagramWidgetEmbedProps {
  code: string;
}

export default function InstagramWidgetEmbed({ code }: InstagramWidgetEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !code) return;

    // Reset container contents
    containerRef.current.innerHTML = "";

    // Create a temporary element to parse scripts and HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = code;

    // Separate script tags from non-script elements
    const scripts: HTMLScriptElement[] = [];
    const scriptElements = tempDiv.querySelectorAll("script");
    scriptElements.forEach((s) => {
      scripts.push(s);
      s.remove();
    });

    // Append non-script HTML into container
    containerRef.current.appendChild(tempDiv);

    // Execute scripts dynamically
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      if (oldScript.src) {
        newScript.src = oldScript.src;
        newScript.async = true;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      containerRef.current?.appendChild(newScript);
    });
  }, [code, key]);

  return (
    <div className="w-full bg-white rounded-3xl border border-black/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-6 sm:p-10 relative overflow-hidden">
      {/* Top bar with widget controls */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-neutral-950 flex items-center justify-center text-white shadow-sm">
            <InstagramIcon className="w-4 h-4 fill-current" />
          </span>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
              <span>Live Instagram Feed</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-[10px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse" />
                <span>Connected</span>
              </span>
            </h2>
            <p className="text-[11px] text-neutral-500">
              Streaming real-time posts &amp; reels from @glovesstorm
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setKey((k) => k + 1)}
            className="p-2 text-neutral-500 hover:text-[#1A1A1A] rounded-xl hover:bg-neutral-100 transition-colors"
            title="Reload widget"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <a
            href="https://www.instagram.com/glovesstorm/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-extrabold text-black px-3 py-1.5 rounded-xl bg-[#FFB900] hover:bg-[#E5A700] transition-colors shadow-xs"
          >
            <span>Follow</span>
            <ExternalLink className="w-3 h-3 text-black" />
          </a>
        </div>
      </div>

      {/* Embedded widget mount point */}
      <div
        ref={containerRef}
        className="w-full min-h-[400px] overflow-hidden rounded-2xl"
      />
    </div>
  );
}

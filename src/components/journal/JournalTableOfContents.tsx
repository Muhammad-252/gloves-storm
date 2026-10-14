"use client";

import React, { useEffect, useState } from "react";
import { AlignLeft, ChevronRight } from "lucide-react";

export interface TocHeading {
  id: string;
  text: string;
}

interface JournalTableOfContentsProps {
  headings: TocHeading[];
}

export default function JournalTableOfContents({ headings }: JournalTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -65% 0px",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  const scrollToHeading = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const navOffset = 110;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  return (
    <aside className="sticky top-28 self-start w-full max-h-[calc(100vh-8.5rem)] overflow-y-auto scrollbar-none pr-1">
      <div className="bg-white/85 backdrop-blur-xl border border-neutral-200/90 rounded-3xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-200/70">
          <div className="w-6 h-6 rounded-lg bg-neutral-900 flex items-center justify-center text-[#FFB900]">
            <AlignLeft className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900">
              Table of Contents
            </h3>
            <span className="text-[10px] text-neutral-500 font-medium">H2 Section Guide</span>
          </div>
        </div>

        <nav className="space-y-1">
          {headings.map((heading, idx) => {
            const isActive = activeId === heading.id || (!activeId && idx === 0);
            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => scrollToHeading(e, heading.id)}
                className={`group flex items-start gap-2.5 py-2 px-3 rounded-xl text-xs font-medium leading-relaxed transition-all duration-200 ${
                  isActive
                    ? "bg-neutral-900 text-white font-bold shadow-xs translate-x-1"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 transition-colors ${
                    isActive ? "bg-[#FFB900]" : "bg-neutral-300 group-hover:bg-neutral-500"
                  }`}
                />
                <span className="line-clamp-2">{heading.text}</span>
              </a>
            );
          })}
        </nav>

        <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
          <span>{headings.length} Topics</span>
          <span className="text-[#FFB900] font-bold">Gloves Storm Guide</span>
        </div>
      </div>
    </aside>
  );
}

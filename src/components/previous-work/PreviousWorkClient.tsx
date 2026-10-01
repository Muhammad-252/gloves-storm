"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Play,
  Volume2,
  VolumeX,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  Layers,
  ShieldCheck,
  Send,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Box,
  Truck,
  Flame,
  Award,
  Scissors,
  RefreshCw,
  Settings,
  HelpCircle,
  SlidersHorizontal,
} from "lucide-react";
import GooeyButton from "@/components/ui/GooeyButton";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import {
  IgItem,
  FALLBACK_INSTAGRAM_ITEMS,
  STORY_HIGHLIGHTS,
} from "@/lib/data/instagramData";
import InstagramWidgetEmbed from "./InstagramWidgetEmbed";

export type { IgItem };

export default function PreviousWorkClient() {
  const [items, setItems] = useState<IgItem[]>(FALLBACK_INSTAGRAM_ITEMS);
  const [activeTab, setActiveTab] = useState<"all" | "reels" | "combat" | "streetwear" | "shipments">("all");
  const [selectedItem, setSelectedItem] = useState<IgItem | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [activeCarouselIdx, setActiveCarouselIdx] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [isWidgetMode, setIsWidgetMode] = useState(false);
  const [widgetCode, setWidgetCode] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [username, setUsername] = useState("glovesstorm");

  useEffect(() => {
    async function loadInstagramFeed() {
      try {
        const res = await fetch("/api/instagram/feed");
        if (!res.ok) return;
        const data = await res.json();
        if (data.mode === "widget" && data.widgetCode) {
          setIsWidgetMode(true);
          setWidgetCode(data.widgetCode);
          setIsLiveConnected(true);
        } else if (data.items && Array.isArray(data.items)) {
          setItems(data.items);
          setIsLiveConnected(!!data.connected);
          if (data.username) setUsername(data.username);
        }
      } catch (err) {
        console.error("Failed to load Instagram feed:", err);
      }
    }
    loadInstagramFeed();
  }, []);

  const handleRefreshFeed = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/instagram/feed?refresh=true");
      if (res.ok) {
        const data = await res.json();
        if (data.mode === "widget" && data.widgetCode) {
          setIsWidgetMode(true);
          setWidgetCode(data.widgetCode);
          setIsLiveConnected(true);
        } else if (data.items && Array.isArray(data.items)) {
          setItems(data.items);
          setIsLiveConnected(!!data.connected);
          if (data.username) setUsername(data.username);
        }
      }
    } catch (err) {
      console.error("Failed to refresh feed:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeTab === "all") return items;
    if (activeTab === "reels") return items.filter((i) => i.type === "reel");
    return items.filter((i) => i.category === activeTab);
  }, [activeTab, items]);

  const handleToggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpenModal = (item: IgItem) => {
    setSelectedItem(item);
    setActiveCarouselIdx(0);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setActiveCarouselIdx(0);
  };

  const handleShare = async (item: IgItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(`https://www.instagram.com/glovesstorm/`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1A1A1A] pt-24 pb-28">
      {/* Subtle Verified Production Badge */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-6">
        <div className="bg-gradient-to-r from-amber-50/70 via-white to-amber-50/40 border border-amber-200/80 text-neutral-900 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between flex-wrap gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-black flex items-center justify-center font-bold shrink-0 shadow-xs">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs uppercase tracking-wider font-mono text-amber-900">
                  Verified Production Archive
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200/60 text-amber-900 font-mono font-semibold">
                  {items.length} Curated Factory Drops
                </span>
              </div>
              <span className="text-xs text-neutral-600 block mt-0.5">
                Authentic factory floor footage, client unboxings, Tajima embroidery close-ups, and global dispatches direct from Sialkot, Pakistan.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/glovesstorm/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-bold font-mono shadow-xs hover:opacity-90 transition-opacity"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Follow @glovesstorm</span>
            </a>
          </div>
        </div>
      </div>

      {/* 1. INSTAGRAM PROFILE HEADER BAR */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 mb-12">
        {/* Profile Card with elevated luxury styling */}
        <div className="bg-white rounded-3xl border border-black/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-6 sm:p-10 relative overflow-hidden">
          {/* Subtle ambient gold radial background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-10 relative z-10">
            {/* Profile Avatar with Instagram Animated Gradient Ring */}
            <div className="relative group shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-[3px] bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] via-[#d62976] to-[#962fbf] shadow-lg shadow-pink-500/15 transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full rounded-full bg-[#0f141c] p-1 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tighter block">
                      GS
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-300 font-bold block">
                      FACTORY
                    </span>
                  </div>
                </div>
              </div>
              {/* Live Reel Badge */}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-mono font-black text-[9px] uppercase px-2.5 py-0.5 rounded-full shadow-md border border-white">
                LIVE OEM
              </span>
            </div>

            {/* Profile Info & Stats */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
                <div className="flex flex-col md:items-start items-center gap-1">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-[#1A1A1A] uppercase">
                    Client Production Archive & Factory Samples
                  </h1>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-neutral-500 font-mono">@{username}</span>
                    {/* Verified Badge */}
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#0095F6] text-white" title="Verified Manufacturer">
                      <CheckCircle2 className="w-3 h-3 fill-current" />
                    </span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex items-center justify-center md:justify-start gap-2.5 flex-wrap">
                  <a
                    href="https://www.instagram.com/glovesstorm/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs font-bold shadow-sm hover:opacity-95 transition-all hover:scale-[1.02]"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>Follow on Instagram</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>

                  <a
                    href="https://wa.me/923417146935?text=Hello%20GLOVES%20STORM,%20I%20saw%20your%20previous%20work%20on%20Instagram%20and%20want%20to%20inquire%20about%20manufacturing."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-sm hover:opacity-95 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>DM on WhatsApp</span>
                  </a>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold border border-black/[0.08] transition-all"
                  >
                    <span>Request Quote</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="flex items-center justify-center md:justify-start gap-6 sm:gap-10 py-3 border-y border-black/[0.06] mb-4 text-xs sm:text-sm">
                <div>
                  <span className="font-extrabold text-[#1A1A1A]">1,280+</span>{" "}
                  <span className="text-neutral-500">custom drops</span>
                </div>
                <div>
                  <span className="font-extrabold text-[#1A1A1A]">45+</span>{" "}
                  <span className="text-neutral-500">global brands</span>
                </div>
                <div>
                  <span className="font-extrabold text-[#1A1A1A]">100%</span>{" "}
                  <span className="text-neutral-500">Sialkot in-house</span>
                </div>
              </div>

              {/* Bio Details */}
              <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed text-neutral-700">
                <p className="font-bold text-[#1A1A1A] flex items-center justify-center md:justify-start gap-1.5">
                  <span>🥊 GLOVES STORM — OEM Combat Sports & Streetwear Manufacturer</span>
                </p>
                <p className="text-neutral-600">
                  Documenting verified client production runs, fight night equipment, Tajima embroidery close-ups, and export dispatches from our factory in Sialkot, Pakistan.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 pt-1 text-xs text-amber-800 font-mono font-medium">
                  <span>📍 Sialkot, Pakistan</span>
                  <span>•</span>
                  <span>✈️ Worldwide Air & Sea Freight</span>
                  <span>•</span>
                  <a
                    href="https://www.instagram.com/glovesstorm/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 underline hover:text-amber-700"
                  >
                    @glovesstorm
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 2. STORY HIGHLIGHTS BUBBLES */}
          <div className="mt-8 pt-6 border-t border-black/[0.06]">
            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none">
              {STORY_HIGHLIGHTS.map((story) => (
                <div
                  key={story.title}
                  className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
                  onClick={() => {
                    if (story.title.includes("Boxing")) setActiveTab("combat");
                    else if (story.title.includes("Fleece")) setActiveTab("streetwear");
                    else if (story.title.includes("Dispatches")) setActiveTab("shipments");
                    else setActiveTab("all");
                  }}
                >
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-neutral-300 to-amber-600 transition-all duration-300 group-hover:scale-110 group-hover:from-[#feda75] group-hover:to-[#d62976]">
                    <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-xl sm:text-2xl border-2 border-white shadow-xs">
                      <span>{story.icon}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-neutral-800 tracking-tight text-center truncate max-w-[70px]">
                    {story.title}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-400 -mt-1">
                    {story.posts}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. WIDGET EMBED OR BESPOKE GRID */}
      {isWidgetMode && widgetCode ? (
        <section className="max-w-6xl mx-auto px-4 sm:px-8 mb-16">
          <InstagramWidgetEmbed code={widgetCode} />
        </section>
      ) : (
        <>
          {/* 3. CATEGORY FILTER TABS */}
          <section className="max-w-6xl mx-auto px-4 sm:px-8 mb-8">
        <div className="flex items-center justify-between border-b border-black/[0.08] pb-4 flex-wrap gap-4">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-1">
            {[
              { id: "all", label: "All Previous Work", count: items.length },
              { id: "reels", label: "🎥 Video Reels", count: items.filter((i) => i.type === "reel").length },
              { id: "combat", label: "🥊 Boxing & Combat", count: items.filter((i) => i.category === "combat" || i.category === "reels").length },
              { id: "streetwear", label: "👕 Streetwear & Sets", count: items.filter((i) => i.category === "streetwear").length },
              { id: "shipments", label: "📦 Client Dispatches", count: items.filter((i) => i.category === "shipments").length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 shrink-0 flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? "bg-[#0f141c] text-white font-bold shadow-sm"
                    : "bg-white text-neutral-600 hover:text-[#1A1A1A] hover:bg-neutral-100 border border-black/[0.06]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeTab === tab.id ? "bg-amber-400 text-black font-black" : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Quick Notice */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-neutral-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Tap any drop to inspect tech specs & order MOQ</span>
          </div>
        </div>
      </section>

      {/* 4. INSTAGRAM POSTS & REELS GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const isLiked = likedMap[item.id];
            const isReel = item.type === "reel";

            return (
              <div
                key={item.id}
                onClick={() => handleOpenModal(item)}
                className="group bg-white rounded-3xl border border-black/[0.08] shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:border-amber-500/40 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                {/* Post Header */}
                <div className="p-3.5 sm:p-4 flex items-center justify-between border-b border-black/[0.05]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-400 via-pink-500 to-amber-600">
                      <div className="w-full h-full rounded-full bg-[#0f141c] flex items-center justify-center text-[10px] font-bold text-white">
                        GS
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-[#1A1A1A] group-hover:text-amber-600 transition-colors">
                          glovesstorm
                        </span>
                        <CheckCircle2 className="w-3 h-3 text-[#0095F6] fill-current" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 block -mt-0.5">
                        {item.clientCountry}
                      </span>
                    </div>
                  </div>

                  {/* Badge */}
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold border ${
                      isReel
                        ? "bg-purple-50 text-purple-700 border-purple-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    {isReel ? "Reel" : "Drop"}
                  </span>
                </div>

                {/* Media Container (with aspect ratio) */}
                <div className="relative aspect-[4/5] bg-neutral-900 overflow-hidden">
                  <Image
                    src={item.mediaUrl}
                    alt={item.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Dark gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Multi-Photo Carousel Indicator */}
                  {item.carouselImages && item.carouselImages.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-lg text-[10px] font-mono flex items-center gap-1 border border-white/10">
                      <Layers className="w-3 h-3" />
                      <span>1/{item.carouselImages.length}</span>
                    </div>
                  )}

                  {/* Reel Indicator with Animated Play Icon */}
                  {isReel && (
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[10px] font-mono flex items-center gap-1.5 border border-white/10">
                      <Play className="w-3 h-3 fill-current text-amber-400" />
                      <span>{item.views} views</span>
                    </div>
                  )}

                  {/* Reel Big Center Play Button on Hover */}
                  {isReel && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 shadow-lg">
                        <Play className="w-6 h-6 fill-current text-white ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Overlay Client Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs font-mono font-bold bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 truncate max-w-[200px]">
                      Client: {item.client}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-300 bg-black/50 px-2 py-0.5 rounded">
                      {item.timestamp}
                    </span>
                  </div>
                </div>

                {/* Post Footer Actions & Caption */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Action Icons Bar */}
                    <div className="flex items-center justify-between mb-3 text-neutral-700">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => handleToggleLike(item.id, e)}
                          className="hover:scale-110 transition-transform"
                          aria-label="Like post"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              isLiked ? "fill-red-500 text-red-500 scale-110" : "hover:text-red-500"
                            } transition-colors`}
                          />
                        </button>
                        <button className="hover:scale-110 transition-transform" aria-label="Comment">
                          <MessageCircle className="w-5 h-5 hover:text-blue-500 transition-colors" />
                        </button>
                        <button
                          onClick={(e) => handleShare(item, e)}
                          className="hover:scale-110 transition-transform"
                          aria-label="Share post"
                        >
                          <Share2 className="w-5 h-5 hover:text-amber-500 transition-colors" />
                        </button>
                      </div>

                      <a
                        href="https://www.instagram.com/glovesstorm/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-neutral-400 hover:text-pink-600 transition-colors"
                        title="View on Instagram"
                      >
                        <InstagramIcon className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Likes count */}
                    <div className="text-xs font-extrabold text-[#1A1A1A] mb-1.5">
                      {(item.likes + (isLiked ? 1 : 0)).toLocaleString()} likes
                    </div>

                    {/* Caption snippet */}
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      <span className="font-bold text-[#1A1A1A] mr-1.5">glovesstorm</span>
                      {item.caption}
                    </p>
                  </div>

                  {/* Spec Highlight Pill & Inquire CTA */}
                  <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 truncate max-w-[170px]">
                      {item.specs.batchSize}
                    </span>

                    <span className="text-xs font-bold text-amber-700 group-hover:text-amber-900 group-hover:translate-x-0.5 transition-all inline-flex items-center gap-1">
                      <span>Inspect Spec</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
        </>
      )}

      {/* 5. INTERACTIVE POST & REEL LIGHTBOX MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div
            className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-white/20 grid grid-cols-1 lg:grid-cols-12 max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* LEFT COLUMN: Media Showcase (7 cols) */}
            <div className="lg:col-span-7 bg-[#0b0f15] relative flex items-center justify-center min-h-[360px] sm:min-h-[500px] overflow-hidden">
              {selectedItem.type === "reel" && selectedItem.videoUrl ? (
                <div className="relative w-full h-full aspect-[9/16] max-h-[600px] flex items-center justify-center">
                  <video
                    src={selectedItem.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-mono flex items-center gap-2 border border-white/20">
                    <Play className="w-3 h-3 fill-current text-amber-400" />
                    <span>Reel Player • {selectedItem.views} Views</span>
                  </div>
                </div>
              ) : selectedItem.carouselImages ? (
                <div className="relative w-full h-full aspect-[4/5] max-h-[600px]">
                  <Image
                    src={selectedItem.carouselImages[activeCarouselIdx]}
                    alt={selectedItem.caption}
                    fill
                    className="object-contain"
                  />
                  {/* Carousel Prev/Next Buttons */}
                  {selectedItem.carouselImages.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setActiveCarouselIdx((prev) =>
                            prev === 0 ? selectedItem.carouselImages!.length - 1 : prev - 1
                          )
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-all border border-white/20"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          setActiveCarouselIdx((prev) =>
                            prev === selectedItem.carouselImages!.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-all border border-white/20"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      {/* Dots indicator */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/50 px-3 py-1 rounded-full border border-white/10">
                        {selectedItem.carouselImages.map((_, idx) => (
                          <span
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full ${
                              activeCarouselIdx === idx ? "bg-amber-400 w-3" : "bg-white/50"
                            } transition-all`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="relative w-full h-full aspect-[4/5] max-h-[600px]">
                  <Image
                    src={selectedItem.mediaUrl}
                    alt={selectedItem.caption}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Details, Technical Specs & Order CTA (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-white overflow-y-auto max-h-[92vh]">
              <div>
                {/* Modal Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-black/[0.08] mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-400 via-pink-500 to-amber-600">
                      <div className="w-full h-full rounded-full bg-[#0f141c] flex items-center justify-center text-xs font-bold text-white">
                        GS
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-[#1A1A1A]">glovesstorm</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0095F6] fill-current" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 block">
                        {selectedItem.clientCountry}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCloseModal}
                    className="p-1.5 rounded-full text-neutral-400 hover:text-[#1A1A1A] hover:bg-neutral-100 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Client Reference Card */}
                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 mb-5 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Client Brand
                    </span>
                    <span className="text-xs font-bold text-[#1A1A1A]">
                      {selectedItem.client} ({selectedItem.clientHandle})
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    Verified Drop
                  </span>
                </div>

                {/* Full Caption */}
                <div className="mb-5 space-y-2">
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    {selectedItem.caption}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedItem.hashtags.map((tag) => (
                      <span key={tag} className="text-[11px] font-mono text-amber-700 hover:underline">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verified Manufacturing Specs Breakdown */}
                <div className="p-4 rounded-2xl bg-[#0f141c] text-white space-y-3 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                    Factory Technical Specs
                  </span>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-white/10 pb-1.5">
                      <span className="text-neutral-400 font-mono">Materials:</span>
                      <span className="font-bold text-right text-neutral-200 max-w-[200px] truncate">
                        {selectedItem.specs.materials}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-1.5">
                      <span className="text-neutral-400 font-mono">Technique:</span>
                      <span className="font-bold text-right text-neutral-200 max-w-[200px] truncate">
                        {selectedItem.specs.technique}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-1.5">
                      <span className="text-neutral-400 font-mono">Run Volume:</span>
                      <span className="font-bold text-right text-amber-400">
                        {selectedItem.specs.batchSize}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-1.5">
                      <span className="text-neutral-400 font-mono">Turnaround:</span>
                      <span className="font-bold text-right text-emerald-400">
                        {selectedItem.specs.leadTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400 font-mono">Destination:</span>
                      <span className="font-bold text-right text-neutral-200 max-w-[200px] truncate">
                        {selectedItem.specs.destination}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-black/[0.08] space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleLike(selectedItem.id)}
                      className="flex items-center gap-1 font-bold text-[#1A1A1A] hover:text-red-500 transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedMap[selectedItem.id] ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                      <span>
                        {(selectedItem.likes + (likedMap[selectedItem.id] ? 1 : 0)).toLocaleString()}
                      </span>
                    </button>
                    <span>•</span>
                    <span>{selectedItem.comments} comments</span>
                  </div>
                  <span className="font-mono text-[11px]">{selectedItem.timestamp}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Link
                    href={`/contact?prefill=instagram&dropId=${selectedItem.id}&client=${encodeURIComponent(
                      selectedItem.client
                    )}`}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#b45309] hover:bg-[#92400e] text-white text-xs font-bold text-center shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Order This Exact Spec</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={selectedItem.permalink || "https://www.instagram.com/glovesstorm/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-black/[0.1] hover:bg-neutral-100 text-neutral-700 transition-colors"
                    title="Open on Instagram"
                  >
                    <InstagramIcon className="w-4 h-4 text-pink-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. BOTTOM BANNER: REQUEST SIMILAR PRODUCTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 mt-16">
        <div className="bg-[#0f141c] rounded-3xl border border-amber-500/30 p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto relative z-10 space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-extrabold block">
              Want Your Brand Featured Next?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Manufacture With Gloves Storm
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Send us your tech pack, vector artwork, or a screenshot of any Instagram post above. We prepare sample prototypes in 7 to 10 days with factory-direct pricing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <a
                href="https://wa.me/923417146935?text=Hello%20GLOVES%20STORM,%20I%20want%20to%20send%20a%20tech%20pack%20for%20my%20brand."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:opacity-95 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Tech Pack on WhatsApp</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-bold hover:brightness-110 transition-all shadow-md shadow-amber-500/20"
              >
                <span>Request Custom Production</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* CONNECT INSTAGRAM GUIDANCE MODAL */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-black/[0.1] shadow-2xl max-w-xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowConnectModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf] text-white flex items-center justify-center shadow-md">
                <InstagramIcon className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight text-[#1A1A1A]">
                  Connect Your Instagram Feed
                </h3>
                <p className="text-xs text-neutral-500">
                  Two easy methods to stream your real posts automatically
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-neutral-700 leading-relaxed mb-6">
              {/* Option 1 */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50/80 to-purple-50/80 border border-pink-200/70">
                <span className="font-extrabold text-pink-950 uppercase tracking-wider block mb-1 font-mono text-[11px]">
                  Method 1: Free Embed Widget (Easiest — Just like WordPress)
                </span>
                <p className="mb-2 text-neutral-700">
                  Use a free Instagram widget provider (like <strong>Elfsight</strong> or <strong>Behold.so</strong> or <strong>SnapWidget</strong>) that connects to your account in 1 click and automatically updates forever:
                </p>
                <ol className="list-decimal list-inside space-y-1 pl-1 text-neutral-800">
                  <li>Create a free widget on <a href="https://elfsight.com/instagram-feed-widget/" target="_blank" rel="noopener noreferrer" className="text-pink-600 underline font-semibold">Elfsight.com</a> or <a href="https://behold.so" target="_blank" rel="noopener noreferrer" className="text-pink-600 underline font-semibold">Behold.so</a>.</li>
                  <li>Authorize your Instagram account (@glovesstorm).</li>
                  <li>Copy the widget script/embed code provided.</li>
                  <li>Go to <strong>Admin Settings</strong>, choose &ldquo;Embed Widget&rdquo;, and paste the code!</li>
                </ol>
              </div>

              {/* Option 2 */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <span className="font-extrabold text-neutral-900 uppercase tracking-wider block mb-1 font-mono text-[11px]">
                  Method 2: Official Instagram Graph API (Direct Token)
                </span>
                <p className="mb-2 text-neutral-700">
                  If you have a Meta / Facebook Developer account, generate a long-lived Instagram User Access Token:
                </p>
                <ol className="list-decimal list-inside space-y-1 pl-1 text-neutral-800">
                  <li>In Meta Developers, generate an Instagram User Access Token.</li>
                  <li>Paste the token into <strong>Admin Settings → Instagram Live Feed</strong> (or set <code className="bg-neutral-200 px-1 py-0.5 rounded font-mono">INSTAGRAM_ACCESS_TOKEN</code> in <code className="bg-neutral-200 px-1 py-0.5 rounded font-mono">.env.local</code>).</li>
                  <li>The site will fetch all your reels, posts, and captions directly into our high-speed custom UI.</li>
                </ol>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-100">
              <button
                onClick={() => setShowConnectModal(false)}
                className="px-5 py-2.5 rounded-xl bg-[#0f141c] text-white text-xs font-bold shadow-md hover:bg-neutral-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

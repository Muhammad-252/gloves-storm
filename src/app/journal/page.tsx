import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/data/store";
import { ArrowUpRight, Calendar, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manufacturing Journal — Custom Clothing, Sportswear & OEM Guides | Gloves Storm",
  description:
    "Manufacturing insights, OEM guides, private label tips and sportswear industry knowledge from Gloves Storm — Sialkot's direct custom apparel and sportswear factory.",
  alternates: {
    canonical: "https://www.glovesstorm.com/journal",
  },
  openGraph: {
    title: "Manufacturing Journal — Custom Clothing, Sportswear & OEM Guides | Gloves Storm",
    description:
      "Manufacturing insights, OEM guides, private label tips and sportswear industry knowledge from Gloves Storm — Sialkot's direct custom apparel and sportswear factory.",
    url: "https://www.glovesstorm.com/journal",
    siteName: "Gloves Storm",
    type: "website",
    images: [
      {
        url: "https://www.glovesstorm.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Gloves Storm Manufacturing Journal & Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manufacturing Journal — Custom Clothing, Sportswear & OEM Guides | Gloves Storm",
    description:
      "Manufacturing insights, OEM guides, private label tips and sportswear industry knowledge from Gloves Storm.",
    images: ["https://www.glovesstorm.com/images/og-default.jpg"],
  },
};

export default async function JournalPage() {
  const posts = await getBlogPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.glovesstorm.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Journal",
            item: "https://www.glovesstorm.com/journal",
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Gloves Storm Manufacturing Journal",
        description:
          "Technical guides, fabric specifications, OEM production knowledge, and pattern engineering articles from Sialkot master manufacturers.",
        url: "https://www.glovesstorm.com/journal",
      },
    ],
  };


  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 bg-transparent min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb - Aligned strictly with site max-w-7xl header and content */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-500 mb-6 sm:mb-8 font-medium overflow-x-auto whitespace-nowrap scrollbar-none py-1">
          <Link href="/" className="hover:text-slate-900 transition-colors shrink-0">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-900 truncate font-semibold">Journal</span>
        </nav>

        {/* Header with Rewritten SEO H1 and Intro */}
        <div className="max-w-4xl mb-10 sm:mb-16 pb-6 sm:pb-8 border-b border-slate-200/80">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200 text-slate-800 text-[10px] sm:text-[11px] font-mono font-medium shadow-xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB900] animate-pulse" />
            <span>SIALKOT TECHNICAL JOURNAL &amp; OEM GUIDES</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 mb-3 sm:mb-4">
            THE GLOVES STORM MANUFACTURING JOURNAL
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-700 max-w-3xl leading-relaxed">
            Guides, insights and technical production knowledge from our Sialkot factory — written for sports apparel brands, athletic teams, gym wear founders, streetwear labels and international distributors building their businesses with Gloves Storm as their direct OEM manufacturing partner.
          </p>
        </div>

        {/* Blog Posts Grid with Tactile Frosted Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/journal/${post.slug}`}
              className="rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 bg-white/75 backdrop-blur-md border border-neutral-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:border-[#FFB900] hover:-translate-y-1 flex flex-col justify-between overflow-hidden transition-all duration-300 group"
            >
              <div>
                {/* Cover image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100 mb-4">
                  <Image
                    src={
                      post.featured_image ||
                      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop"
                    }
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-0.5 text-[10px] font-mono uppercase tracking-wider text-slate-800 font-bold rounded-full border border-neutral-200 shadow-2xs">
                    {post.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {post.published_at ? formatDate(post.published_at) : "Recent"}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 mb-2 group-hover:text-black transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-900 group-hover:text-[#FFB900] transition-colors">
                <span>Read Technical Guide</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

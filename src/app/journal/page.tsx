import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/data/store";
import { ArrowUpRight, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manufacturing Journal & Technical Guides | GLOVES STORM",
  description:
    "Insights, material breakdowns, and tech pack advisory from the master glove makers and apparel engineers at GLOVES STORM Sialkot.",
  alternates: {
    canonical: "https://glovesstorm.com/journal",
  },
  openGraph: {
    title: "Manufacturing Journal & Technical Guides | GLOVES STORM",
    description:
      "Insights, material breakdowns, and tech pack advisory from the master glove makers and apparel engineers at GLOVES STORM Sialkot.",
    url: "https://glovesstorm.com/journal",
    siteName: "GLOVES STORM Manufacturing",
    type: "website",
    images: [
      {
        url: "https://glovesstorm.com/images/products/boxing-gloves-black.png",
        width: 1200,
        height: 630,
        alt: "GLOVES STORM Manufacturing Journal & Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manufacturing Journal & Technical Guides | GLOVES STORM",
    description:
      "Insights, material breakdowns, and tech pack advisory from the master glove makers and apparel engineers at GLOVES STORM Sialkot.",
    images: ["https://glovesstorm.com/images/products/boxing-gloves-black.png"],
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
            item: "https://glovesstorm.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Journal",
            item: "https://glovesstorm.com/journal",
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "GLOVES STORM Manufacturing Journal",
        description:
          "Technical guides, fabric specifications, and pattern engineering articles from Sialkot master manufacturers.",
        url: "https://glovesstorm.com/journal",
      },
    ],
  };

  return (
    <div className="pt-28 pb-24 bg-transparent min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 pb-8 border-b border-slate-200/80">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/90 text-slate-800 text-[11px] font-mono font-medium shadow-xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SIALKOT TECHNICAL JOURNAL &amp; OEM GUIDES</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-4">
            MANUFACTURING JOURNAL
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Technical guides, fabric analysis, and production strategies published by our Sialkot pattern masters and supply chain directors.
          </p>
        </div>

        {/* Blog Posts Grid with Tactile Frosted Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/journal/${post.slug}`}
              className="rounded-3xl p-4 bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:-translate-y-1 flex flex-col justify-between overflow-hidden transition-all duration-300 group"
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
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-0.5 text-[10px] font-mono uppercase tracking-wider text-slate-800 font-bold rounded-full border border-white/90 shadow-2xs">
                    {post.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {post.published_at ? formatDate(post.published_at) : "Recent"}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 mb-2 group-hover:text-slate-700 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-900">
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

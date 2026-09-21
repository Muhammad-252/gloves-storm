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
    canonical: "/journal",
  },
};

export default async function JournalPage() {
  const posts = await getBlogPosts();

  return (
    <div className="pt-28 pb-24 bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 pb-8 border-b border-neutral-200">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-600 font-mono block mb-2 font-bold">
            Industry Insights & Guides
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#0f172a] mb-4">
            MANUFACTURING JOURNAL
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Technical guides, fabric analysis, and production strategies published by our Sialkot pattern masters and supply chain directors.
          </p>
        </div>

        {/* Blog Posts Grid with Elevated Rounded Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/journal/${post.slug}`}
              className="group bg-white rounded-3xl border border-neutral-200 hover:border-amber-500/50 shadow-sm hover:shadow-md hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden transition-all duration-400"
            >
              {/* Cover image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={
                    post.featured_image ||
                    "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-white/90 px-3.5 py-1 text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold rounded-full border border-neutral-200 shadow-sm backdrop-blur-md">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      {post.published_at ? formatDate(post.published_at) : "Recent"}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#0f172a] mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-600">
                  <span>Read Technical Guide</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data/store";
import { ArrowUpRight, Calendar, User, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: post.seo_title || `${post.title} | GLOVES STORM Journal`,
    description: post.seo_description || post.excerpt || post.title,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPosts(),
  ]);

  if (!post) {
    notFound();
  }

  const related = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="pt-28 pb-24 bg-[#fafafa] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 mb-8 font-medium">
          <Link href="/" className="hover:text-[#0f172a] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <Link href="/journal" className="hover:text-[#0f172a] transition-colors">
            Journal
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-amber-600 truncate font-semibold">{post.title}</span>
        </nav>

        {/* Article Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 text-xs font-mono text-amber-600 mb-4">
            <span className="bg-amber-50 px-3 py-1 border border-amber-200 uppercase tracking-wider font-bold rounded-full">
              {post.category}
            </span>
            {post.published_at && (
              <span className="text-neutral-500 flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                {formatDate(post.published_at)}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0f172a] mb-6 leading-[1.05]">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed border-l-2 border-amber-500 pl-4">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-2 pt-6 text-xs text-neutral-500 font-medium">
            <User className="w-3.5 h-3.5 text-amber-600" />
            <span>Authored by {post.author}</span>
          </div>
        </div>

        {/* Hero Image */}
        {post.featured_image && (
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm mb-12">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.featured_image})` }}
            />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-neutral max-w-none mb-16 text-neutral-700 leading-relaxed space-y-6 text-sm sm:text-base border-b border-neutral-200 pb-16 whitespace-pre-line">
          {post.content}
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl font-bold uppercase tracking-tight text-[#0f172a] mb-8">
              More From The Journal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/journal/${rel.slug}`}
                  className="group bg-white rounded-2xl border border-neutral-200 hover:border-amber-500/50 p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <span className="text-[10px] font-mono text-amber-600 uppercase tracking-wider block mb-2 font-bold">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold uppercase text-[#0f172a] group-hover:text-amber-600 transition-colors line-clamp-2 mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-neutral-500 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 bg-white rounded-3xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-[#0f172a] mb-1">
              Have questions about material specifications?
            </h3>
            <p className="text-xs text-neutral-600">
              Speak directly with our technical textile team to get sample swatches and pricing.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#0f172a] text-white hover:bg-neutral-800 rounded-full px-8 py-3.5 font-bold text-xs uppercase tracking-wider shrink-0 transition-colors shadow-sm"
          >
            <span>Inquire Now</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

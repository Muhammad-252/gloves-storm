import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data/store";
import { ArrowUpRight, Calendar, User, ChevronRight, Sparkles, Box, Scissors } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  const title = post.seo_title || `${post.title} | Gloves Storm Journal`;
  const description = post.seo_description || post.excerpt || post.title;
  const canonicalUrl = `https://www.glovesstorm.com/journal/${slug}`;
  const ogImage = post.featured_image || "https://www.glovesstorm.com/images/og-default.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Gloves Storm Manufacturing Journal",
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
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
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `https://www.glovesstorm.com/journal/${post.slug}`,
          },
        ],
      },
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.seo_description || post.excerpt || post.title,
        image: post.featured_image
          ? [post.featured_image]
          : ["https://www.glovesstorm.com/images/og-default.jpg"],
        datePublished: post.published_at || post.created_at || "2026-03-01T00:00:00.000Z",
        dateModified: post.updated_at || post.created_at || "2026-03-01T00:00:00.000Z",
        author: {
          "@type": "Person",
          name: post.author || "Gloves Storm Engineering Team",
          worksFor: {
            "@type": "Organization",
            name: "Gloves Storm",
          },
        },
        publisher: {
          "@type": "Organization",
          name: "Gloves Storm",
          logo: {
            "@type": "ImageObject",
            url: "https://www.glovesstorm.com/images/logo.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://www.glovesstorm.com/journal/${post.slug}`,
        },
      },
    ],
  };

  return (
    <div className="pt-28 pb-24 bg-transparent min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-8 font-medium">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/journal" className="hover:text-slate-900 transition-colors">
            Journal
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 truncate font-semibold">{post.title}</span>
        </nav>

        {/* Article Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 text-xs font-mono text-slate-700 mb-4">
            <span className="bg-white/80 backdrop-blur-md px-3 py-1 border border-white/90 uppercase tracking-wider font-bold rounded-full shadow-2xs">
              {post.category}
            </span>
            {post.published_at && (
              <span className="text-slate-500 flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {formatDate(post.published_at)}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.08]">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed border-l-2 border-slate-900 pl-4">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-2 pt-6 text-xs text-slate-500 font-medium">
            <User className="w-3.5 h-3.5 text-slate-700" />
            <span>Authored by {post.author}</span>
          </div>
        </div>

        {/* Hero Image */}
        {post.featured_image && (
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-100 border border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-12">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        {post.content && post.content.includes("<") && post.content.includes(">") ? (
          <div
            className="prose prose-neutral max-w-none mb-16 text-slate-700 leading-relaxed space-y-6 text-sm sm:text-base border-b border-slate-200/80 pb-16
              prose-headings:text-black prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
              prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
              prose-p:leading-relaxed prose-p:mb-4
              prose-strong:text-black prose-strong:font-bold
              prose-a:text-black prose-a:font-bold prose-a:underline prose-a:decoration-[#FFB900] prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:text-[#FFB900]
              prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-li:my-1
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4 prose-li:my-1
              prose-hr:my-8 prose-hr:border-neutral-200
              prose-table:w-full prose-table:my-6 prose-table:border-collapse prose-table:overflow-x-auto
              prose-th:bg-neutral-100 prose-th:text-black prose-th:font-mono prose-th:uppercase prose-th:text-xs prose-th:p-3 prose-th:border prose-th:border-neutral-200
              prose-td:p-3 prose-td:text-xs sm:prose-td:text-sm prose-td:border prose-td:border-neutral-200"
            dangerouslySetInnerHTML={{
              __html: (() => {
                const raw = post.content;
                const siteUrl = "https://www.glovesstorm.com";
                const parts = raw.split(/(<a\b[^>]*>[\s\S]*?<\/a>)/gi);
                for (let i = 0; i < parts.length; i++) {
                  if (i % 2 === 0) {
                    parts[i] = parts[i].replace(
                      /\b(Gloves\s+Storm|GloveStorm|Glove\s+Storm)\b/gi,
                      (match) => `<a href="${siteUrl}" title="Gloves Storm" class="text-neutral-900 font-bold underline decoration-[#FFB900] decoration-2 underline-offset-4 hover:text-[#FFB900] transition-colors">${match}</a>`
                    );
                  }
                }
                return parts.join("");
              })(),
            }}
          />
        ) : (
          <div className="prose prose-neutral max-w-none mb-16 text-slate-700 leading-relaxed space-y-6 text-sm sm:text-base border-b border-slate-200/80 pb-16 whitespace-pre-line">
            {post.content}
          </div>
        )}

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 mb-6">
              More From The Journal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/journal/${rel.slug}`}
                  className="group bg-white/75 backdrop-blur-md rounded-3xl border border-white/90 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all"
                >
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2 font-bold">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2 mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Internal Hub Callout: Factory OEM Production & Wholesale Directory */}
        <div className="mb-16 p-8 sm:p-10 bg-white/85 backdrop-blur-xl text-slate-900 rounded-3xl border border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-900 text-[10px] font-mono uppercase tracking-wider font-bold mb-4 border border-slate-200/60">
              <Sparkles className="w-3 h-3 text-slate-900" />
              <span>Direct Factory OEM</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
              Prototype Your Custom Design
            </h3>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed mb-6">
              Test your branding, select leather or technical fabric densities, and request an instant manufacturing quote directly from our Sialkot factory team.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#FFB900] hover:bg-[#E5A700] text-black font-extrabold rounded-2xl px-6 py-3.5 text-xs uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(255,185,0,0.3)]"
              >
                <span>Request Factory Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-slate-100/90 hover:bg-slate-200/80 text-slate-900 rounded-2xl px-6 py-3.5 font-bold text-xs uppercase tracking-wider transition-all border border-slate-200/80"
              >
                <Box className="w-3.5 h-3.5 text-slate-900" />
                <span>Browse All Products &amp; MOQs</span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors ml-auto pt-2 sm:pt-0"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Our Factory Standards &amp; Equipment →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 mb-1">
              Have questions about material specifications?
            </h3>
            <p className="text-xs text-slate-600">
              Speak directly with our technical textile team to get sample swatches and pricing.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#FFB900] hover:bg-[#E5A700] text-black font-extrabold rounded-2xl px-8 py-3.5 text-xs uppercase tracking-wider shrink-0 transition-all shadow-[0_4px_16px_rgba(255,185,0,0.3)]"
          >
            <span>Inquire Now</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

import fs from 'fs';
import path from 'path';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ulamuliwbllkrrpdbdkn.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsYW11bGl3Ymxsa3JycGRiZGtuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODgzODE1MiwiZXhwIjoyMTA0NDE0MTUyfQ.iNZf1rLEDkk5THPjDGH8gZrEBl6gFV3K5han6VIg2nE";

const supabase = createClient(supabaseUrl, serviceRoleKey);

// 1. Clean visual labels from blog HTML
const draftPath = path.join(process.cwd(), 'scripts', 'blog-drafts', 'blog-4-private-label-activewear.html');
let html = fs.readFileSync(draftPath, 'utf8');

// Remove figcaptions completely
html = html.replace(/<figcaption[\s\S]*?<\/figcaption>/gi, '');

// Convert <figure ...> to <div class="rounded-2xl overflow-hidden my-6 border border-neutral-200 shadow-sm bg-neutral-100">
// and </figure> to </div>
html = html.replace(/<figure[^>]*>/gi, '<div class="rounded-2xl overflow-hidden my-6 border border-neutral-200 shadow-sm bg-neutral-100">');
html = html.replace(/<\/figure>/gi, '</div>');

fs.writeFileSync(draftPath, html, 'utf8');
console.log("✅ Successfully removed all visual labels (<figcaption>) from HTML draft");

// 2. Update Supabase with the clean HTML
async function updateSupabase() {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      content: html,
      updated_at: new Date().toISOString()
    })
    .eq('slug', 'private-label-activewear-manufacturer-guide')
    .select()
    .single();

  if (error) {
    console.error("❌ Failed to update Supabase blog post:", error);
  } else {
    console.log("✅ Successfully updated blog post in Supabase without captions/labels!");
    console.log("   Updated At:", data.updated_at);
  }
}

// 3. Update src/app/journal/[slug]/page.tsx with opposite-side layout
const slugPagePath = path.join(process.cwd(), 'src', 'app', 'journal', '[slug]', 'page.tsx');
let slugPage = fs.readFileSync(slugPagePath, 'utf8');

const oldHeaderBlockCRLF = `              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-slate-700 mb-3 sm:mb-4">
                <span className="bg-white/80 backdrop-blur-md px-3 py-1 border border-neutral-200 uppercase tracking-wider font-bold rounded-full shadow-2xs text-[10px] sm:text-xs">
                  {post.category}
                </span>
                {post.published_at && (
                  <span className="text-slate-500 flex items-center gap-1 font-medium text-[11px] sm:text-xs">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {formatDate(post.published_at)}
                  </span>
                )}
                {post.updated_at && (
                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-mono font-medium text-[10px] sm:text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Updated: {formatDate(post.updated_at)}
                  </span>
                )}
              </div>`.replace(/\n/g, '\r\n');

const newHeaderBlock = `              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-700 mb-3 sm:mb-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="bg-white/80 backdrop-blur-md px-3 py-1 border border-neutral-200 uppercase tracking-wider font-bold rounded-full shadow-2xs text-[10px] sm:text-xs">
                    {post.category}
                  </span>
                  {post.published_at && (
                    <span className="text-slate-500 flex items-center gap-1 font-medium text-[11px] sm:text-xs">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Published: {formatDate(post.published_at)}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-mono font-medium text-[10px] sm:text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Updated: {formatDate(post.updated_at || post.published_at)}
                  </span>
                </div>
              </div>`;

if (slugPage.includes(oldHeaderBlockCRLF)) {
  slugPage = slugPage.replace(oldHeaderBlockCRLF, newHeaderBlock.replace(/\n/g, '\r\n'));
  fs.writeFileSync(slugPagePath, slugPage, 'utf8');
  console.log("✅ Successfully updated page.tsx (CRLF) with opposite-side date layout!");
} else {
  // Try finding the div by substring
  const startTag = '<div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-slate-700 mb-3 sm:mb-4">';
  const endTag = '</h1>';
  const startIdx = slugPage.indexOf(startTag);
  const endIdx = slugPage.indexOf(endTag);
  if (startIdx !== -1 && endIdx !== -1) {
    const isCRLF = slugPage.includes('\r\n');
    const replacement = newHeaderBlock + (isCRLF ? '\r\n\r\n              <h1' : '\n\n              <h1');
    const before = slugPage.substring(0, startIdx);
    const after = slugPage.substring(slugPage.indexOf('<h1', startIdx) + 3);
    slugPage = before + replacement + after;
    fs.writeFileSync(slugPagePath, slugPage, 'utf8');
    console.log("✅ Successfully updated page.tsx using tag search!");
  } else {
    console.warn("⚠️ Could not match header block in page.tsx");
  }
}

// 4. Update src/app/journal/page.tsx (listing cards) to show updated date on opposite side
const journalPagePath = path.join(process.cwd(), 'src', 'app', 'journal', 'page.tsx');
let journalPage = fs.readFileSync(journalPagePath, 'utf8');

const oldJournalDate = `<div className="flex items-center gap-4 text-[11px] font-mono text-slate-500 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {post.published_at ? formatDate(post.published_at) : "Recent"}
                  </span>
                </div>`;

const newJournalDate = `<div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Published: {post.published_at ? formatDate(post.published_at) : "Recent"}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Updated: {formatDate(post.updated_at || post.published_at || new Date().toISOString())}
                  </span>
                </div>`;

if (journalPage.includes(oldJournalDate.replace(/\n/g, '\r\n'))) {
  journalPage = journalPage.replace(oldJournalDate.replace(/\n/g, '\r\n'), newJournalDate.replace(/\n/g, '\r\n'));
  fs.writeFileSync(journalPagePath, journalPage, 'utf8');
  console.log("✅ Successfully updated journal/page.tsx with opposite-side date layout!");
} else if (journalPage.includes(oldJournalDate)) {
  journalPage = journalPage.replace(oldJournalDate, newJournalDate);
  fs.writeFileSync(journalPagePath, journalPage, 'utf8');
  console.log("✅ Successfully updated journal/page.tsx (LF) with opposite-side date layout!");
} else {
  console.warn("⚠️ Could not match date block in journal/page.tsx");
}

updateSupabase();

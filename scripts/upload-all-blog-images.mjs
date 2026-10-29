import fs from 'fs';
import path from 'path';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ulamuliwbllkrrpdbdkn.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsYW11bGl3Ymxsa3JycGRiZGtuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODgzODE1MiwiZXhwIjoyMTA0NDE0MTUyfQ.iNZf1rLEDkk5THPjDGH8gZrEBl6gFV3K5han6VIg2nE";

const supabase = createClient(supabaseUrl, serviceRoleKey);

const imgDir = path.join(process.cwd(), 'public', 'images', 'journal', 'private-label-activewear-manufacturer-guide');

async function uploadAll() {
  console.log("Uploading all 8 images to Supabase storage 'blog' bucket...");
  const publicUrls = {};

  for (let i = 1; i <= 8; i++) {
    const fileName = `image-${i}.png`;
    const localFile = path.join(imgDir, fileName);
    const storagePath = `journal/private-label-activewear-manufacturer-guide/${fileName}`;

    if (!fs.existsSync(localFile)) {
      console.error(`❌ Local file not found: ${localFile}`);
      continue;
    }

    const fileBuf = fs.readFileSync(localFile);
    const { data, error } = await supabase.storage
      .from('blog')
      .upload(storagePath, fileBuf, {
        contentType: 'image/png',
        upsert: true
      });

    if (error) {
      console.error(`❌ Failed to upload ${fileName}:`, error);
    } else {
      const { data: pubData } = supabase.storage.from('blog').getPublicUrl(storagePath);
      publicUrls[i] = pubData.publicUrl;
      console.log(`✅ Uploaded ${fileName} -> ${pubData.publicUrl}`);
    }
  }

  // Now update the blog content in draft and database with the CDN URLs
  const draftPath = path.join(process.cwd(), 'scripts', 'blog-drafts', 'blog-4-private-label-activewear.html');
  let content = fs.readFileSync(draftPath, 'utf8');

  for (let i = 1; i <= 8; i++) {
    const localRel = `/images/journal/private-label-activewear-manufacturer-guide/image-${i}.png`;
    const cdnUrl = publicUrls[i];
    if (cdnUrl) {
      content = content.replaceAll(localRel, cdnUrl);
    }
  }

  fs.writeFileSync(draftPath, content, 'utf8');
  console.log("✅ Updated draft HTML with CDN URLs");

  // Update Supabase DB
  const { data: updated, error: updateError } = await supabase
    .from('blog_posts')
    .update({
      featured_image: publicUrls[1],
      content: content,
      updated_at: new Date().toISOString()
    })
    .eq('slug', 'private-label-activewear-manufacturer-guide')
    .select()
    .single();

  if (updateError) {
    console.error("❌ Failed to update Supabase blog post:", updateError);
  } else {
    console.log("✅ Successfully updated blog post in Supabase with live CDN images!");
    console.log("Featured image:", updated.featured_image);
  }
}

uploadAll();

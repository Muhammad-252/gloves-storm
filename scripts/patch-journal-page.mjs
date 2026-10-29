import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'app', 'journal', '[slug]', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Check if updated date badge is already present
if (!content.includes('Updated: {formatDate(post.updated_at)}')) {
  const target = '{formatDate(post.published_at)}\r\n                  </span>\r\n                )}';
  const targetLF = '{formatDate(post.published_at)}\n                  </span>\n                )}';

  const replacement = `{formatDate(post.published_at)}
                  </span>
                )}
                {post.updated_at && (
                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-mono font-medium text-[10px] sm:text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Updated: {formatDate(post.updated_at)}
                  </span>
                )}`;

  if (content.includes(target)) {
    content = content.replace(target, replacement.replace(/\n/g, '\r\n'));
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("✅ Patched page.tsx (CRLF)");
  } else if (content.includes(targetLF)) {
    content = content.replace(targetLF, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("✅ Patched page.tsx (LF)");
  } else {
    console.warn("⚠️ Could not find target in page.tsx");
  }
} else {
  console.log("ℹ️ Updated date badge already in page.tsx");
}

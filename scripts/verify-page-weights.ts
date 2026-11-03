/**
 * Measures uncompressed and gzipped HTML sizes for /, /products, and /contact
 */
import zlib from "zlib";

async function measurePage(url: string, name: string) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    const rawBytes = Buffer.byteLength(text, "utf8");
    const gzBytes = zlib.gzipSync(Buffer.from(text)).length;
    console.log(
      `${name.padEnd(12)} -> Raw: ${(rawBytes / 1024).toFixed(1).padStart(6)} KB (${rawBytes} bytes) | Gzip: ${(gzBytes / 1024).toFixed(1).padStart(5)} KB`
    );
    return { name, rawBytes, gzBytes };
  } catch (err: any) {
    console.error(`Error fetching ${name} at ${url}:`, err.message);
  }
}

async function run() {
  console.log("=== Page Weight Verification ===");
  await measurePage("http://localhost:3000/", "Homepage (/)");
  await measurePage("http://localhost:3000/products", "/products");
  await measurePage("http://localhost:3000/contact", "/contact");
}

run();

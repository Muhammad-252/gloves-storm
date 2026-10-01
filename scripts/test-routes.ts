async function testRoute(url: string) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log(`[STATUS ${res.status}] ${url} (${text.length} bytes)`);
    return res.status === 200;
  } catch (err: any) {
    console.error(`[ERROR] ${url}:`, err.message);
    return false;
  }
}

async function main() {
  const routes = [
    "http://localhost:3000/",
    "http://localhost:3000/products",
    "http://localhost:3000/products/boxing-equipment",
    "http://localhost:3000/products/boxing-equipment/custom-boxing-gloves",
    "http://localhost:3000/products/clothing-streetwear/custom-oversized-t-shirts",
    "http://localhost:3000/products/sportswear-teamwear/custom-basketball-uniforms",
    "http://localhost:3000/manufacturing",
    "http://localhost:3000/sitemap.xml",
  ];

  let allOk = true;
  for (const r of routes) {
    const ok = await testRoute(r);
    if (!ok) allOk = false;
  }

  if (allOk) {
    console.log("\n>>> ALL ROUTES RESPONDED WITH 200 OK! <<<");
  } else {
    console.error("\n>>> SOME ROUTES FAILED <<<");
    process.exit(1);
  }
}

main();

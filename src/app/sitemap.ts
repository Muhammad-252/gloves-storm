import { MetadataRoute } from "next";
import { getProducts, getBlogPosts } from "@/lib/data/store";
import { getDbCategories } from "@/lib/data/fileDb";

// Keep in sync with the same constant in /api/categories and /api/products
const HIDDEN_CATEGORY_SLUGS = ["boxing-equipment", "swimwear-beachwear"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.glovesstorm.com";

  const [allCategories, allProducts, blogPosts] = await Promise.all([
    getDbCategories().catch(() => []),
    getProducts().catch(() => []),
    getBlogPosts().catch(() => []),
  ]);

  // Only index visible, active categories
  const categories = allCategories.filter(
    (c) => c.is_active && !HIDDEN_CATEGORY_SLUGS.includes(c.slug)
  );

  const hiddenCatIds = new Set(
    allCategories.filter((c) => HIDDEN_CATEGORY_SLUGS.includes(c.slug)).map((c) => c.id)
  );

  // Only index published products from visible categories, excluding noindex items
  const products = allProducts.filter(
    (p) => p.is_active && !p.noindex && !hiddenCatIds.has(p.category_id ?? "")
  );

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/products/sportswear-teamwear`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/products/gym-fitness-wear`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/products/clothing-streetwear`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/products/custom-manufacturing-private-label`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/previous-work`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/journal`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // Location-targeted landing pages (high commercial value)
    { url: `${baseUrl}/manufacturers-usa`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.95 },
    { url: `${baseUrl}/manufacturers-uk`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.95 },
    // Legal / trust pages
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/products/${cat.slug}`,
    lastModified: cat.updated_at ? new Date(cat.updated_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.95,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((prod) => {
    const cat = categories.find((c) => c.id === prod.category_id);
    return {
      url: `${baseUrl}/products/${cat?.slug || "general"}/${prod.slug}`,
      lastModified: prod.updated_at ? new Date(prod.updated_at) : new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    };
  });

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((b) => ({
    url: `${baseUrl}/journal/${b.slug}`,
    lastModified: b.updated_at ? new Date(b.updated_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Combine and deduplicate by URL
  const allRoutes = [...coreRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes];
  const urlMap = new Map<string, (typeof allRoutes)[0]>();
  for (const item of allRoutes) {
    if (!urlMap.has(item.url)) {
      urlMap.set(item.url, item);
    }
  }

  return Array.from(urlMap.values());
}

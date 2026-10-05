import { MetadataRoute } from "next";
import { getCategories, getProducts, getBlogPosts } from "@/lib/data/store";
import { loadPersistedCategories } from "@/lib/data/categoryPersistence";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.glovesstorm.com";

  const [persistedCategories, defaultCategories, products, blogPosts] = await Promise.all([
    loadPersistedCategories().catch(() => []),
    getCategories().catch(() => []),
    getProducts().catch(() => []),
    getBlogPosts().catch(() => []),
  ]);

  const categories = persistedCategories.length > 0 ? persistedCategories : defaultCategories;

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/products/sportswear-teamwear`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/products/gym-fitness-wear`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/products/clothing-streetwear`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/products/custom-manufacturing-private-label`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/previous-work`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/journal`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // Location-targeted landing pages
    { url: `${baseUrl}/manufacturers-usa`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/manufacturers-uk`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/products/${cat.slug}`,
    lastModified: cat.updated_at ? new Date(cat.updated_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((prod) => {
    const cat = categories.find((c) => c.id === prod.category_id);
    return {
      url: `${baseUrl}/products/${cat?.slug || "general"}/${prod.slug}`,
      lastModified: prod.updated_at ? new Date(prod.updated_at) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
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

import { MetadataRoute } from "next";
import { getCategories, getProducts, getBlogPosts } from "@/lib/data/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://glovesstorm.com";

  const [categories, products, blogPosts] = await Promise.all([
    getCategories(),
    getProducts(),
    getBlogPosts(),
  ]);

  const latestProductUpdate = products.reduce((latest, p) => {
    const d = p.updated_at ? new Date(p.updated_at) : new Date(0);
    return d > latest ? d : latest;
  }, new Date(0));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: latestProductUpdate.getTime() > 0 ? latestProductUpdate : new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: latestProductUpdate.getTime() > 0 ? latestProductUpdate : new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/customize`, lastModified: new Date("2026-03-01"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/manufacturing`, lastModified: new Date("2026-03-01"), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/previous-work`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/journal`, lastModified: new Date("2026-03-01"), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: new Date("2026-03-01"), changeFrequency: "yearly", priority: 0.5 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/products/${cat.slug}`,
    lastModified: cat.updated_at ? new Date(cat.updated_at) : new Date("2026-03-01"),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((prod) => {
    const cat = categories.find((c) => c.id === prod.category_id);
    return {
      url: `${baseUrl}/products/${cat?.slug || "general"}/${prod.slug}`,
      lastModified: prod.updated_at ? new Date(prod.updated_at) : new Date("2026-03-01"),
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((b) => ({
    url: `${baseUrl}/journal/${b.slug}`,
    lastModified: b.updated_at ? new Date(b.updated_at) : b.published_at ? new Date(b.published_at) : new Date("2026-03-01"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...blogRoutes,
  ];
}

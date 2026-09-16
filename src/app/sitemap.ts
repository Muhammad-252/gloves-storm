import { MetadataRoute } from "next";
import { getCategories, getProducts, getProjects, getBlogPosts } from "@/lib/data/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://glovesstorm.com";

  const [categories, products, projects, blogPosts] = await Promise.all([
    getCategories(),
    getProducts(),
    getProjects(),
    getBlogPosts(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/manufacturing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/previous-work`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/journal`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/products/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((prod) => {
    const cat = categories.find((c) => c.id === prod.category_id);
    return {
      url: `${baseUrl}/products/${cat?.slug || "general"}/${prod.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((b) => ({
    url: `${baseUrl}/journal/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...projectRoutes,
    ...blogRoutes,
  ];
}

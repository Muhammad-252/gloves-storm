import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/"],
      disallow: [
        "/admin/",
        "/*?orderby=*",
        "/*?per_row=*",
        "/*?per_page=*",
        "/*?shop_view=*",
      ],
    },
    sitemap: "https://www.glovesstorm.com/sitemap.xml",
    host: "https://www.glovesstorm.com",
  };
}

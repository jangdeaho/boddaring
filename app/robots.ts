import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/learn"],
        disallow: ["/trial", "/apply", "/terms", "/terms/privacy"],
      },
    ],
    sitemap: "https://boddaring.com/sitemap.xml",
    host: "https://boddaring.com",
  };
}
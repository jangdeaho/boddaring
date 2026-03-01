import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/learn"],
        disallow: ["/trial", "/apply", "/terms", "/terms/privacy"], // 원하면 유지/삭제 가능
      },
    ],
    sitemap: "https://boddaring.com/sitemap.xml",
    host: "https://boddaring.com",
  };
}
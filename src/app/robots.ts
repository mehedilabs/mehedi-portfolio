import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mehedi.dev";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/en/", "/bn/", "/en/projects/", "/bn/projects/", "/en/blog/", "/bn/blog/"],
        disallow: ["/admin/", "/api/", "/_next/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}


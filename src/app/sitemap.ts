import { MetadataRoute } from "next";
import { PROJECTS_DATA, BLOG_POSTS_DATA } from "@/data/portfolio-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mehedi.dev";
  const currentDate = new Date();

  // Root & localized static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          bn: `${baseUrl}/bn`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          bn: `${baseUrl}/bn`,
        },
      },
    },
    {
      url: `${baseUrl}/bn`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          bn: `${baseUrl}/bn`,
        },
      },
    },
    {
      url: `${baseUrl}/en/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/projects`,
          bn: `${baseUrl}/bn/projects`,
        },
      },
    },
    {
      url: `${baseUrl}/bn/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/projects`,
          bn: `${baseUrl}/bn/projects`,
        },
      },
    },
  ];

  // Dynamic project detail routes with alternate language tags
  const projectRoutes: MetadataRoute.Sitemap = PROJECTS_DATA.flatMap((project) => {
    const slug = project.en.slug;
    return [
      {
        url: `${baseUrl}/en/projects/${slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en/projects/${slug}`,
            bn: `${baseUrl}/bn/projects/${slug}`,
          },
        },
      },
      {
        url: `${baseUrl}/bn/projects/${slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en/projects/${slug}`,
            bn: `${baseUrl}/bn/projects/${slug}`,
          },
        },
      },
    ];
  });

  // Dynamic blog detail routes with alternate language tags
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS_DATA.flatMap((post) => {
    const slug = post.slug;
    return [
      {
        url: `${baseUrl}/en/blog/${slug}`,
        lastModified: new Date(post.publishedAt || currentDate),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/${slug}`,
            bn: `${baseUrl}/bn/blog/${slug}`,
          },
        },
      },
      {
        url: `${baseUrl}/bn/blog/${slug}`,
        lastModified: new Date(post.publishedAt || currentDate),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/${slug}`,
            bn: `${baseUrl}/bn/blog/${slug}`,
          },
        },
      },
    ];
  });

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}


import { MetadataRoute } from "next";
import { materialCatalog } from "@/data/catalog";
import { processingServices } from "@/data/services";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "http://babalkhibrah.com";

  // Static routes
  const staticRoutes = ["", "/about", "/materials", "/processing", "/quality", "/resources", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? (1.0 as const) : (0.8 as const),
  }));

  // Dynamic material grade routes
  const gradeRoutes = materialCatalog.map((grade) => ({
    url: `${baseUrl}/materials/${encodeURIComponent(grade.grade)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.64 as const,
  }));

  // Dynamic service routes
  const serviceRoutes = processingServices.map((service) => ({
    url: `${baseUrl}/processing/${service.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.64 as const,
  }));

  return [...staticRoutes, ...gradeRoutes, ...serviceRoutes];
}

import type { MetadataRoute } from "next";
import { client } from "@/data/client";

// Statischer Export → statische robots.txt. Sitemap-Verweis nur bei gesetzter Domain.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = (client.website || "").replace(/\/+$/, "");
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(base ? { sitemap: `${base}/sitemap.xml` } : {}),
  };
}

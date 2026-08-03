import type { MetadataRoute } from "next";
import { client } from "@/data/client";

// Statischer Export (output: "export") → Next rendert daraus eine statische
// sitemap.xml. Basis-URL aus client.website; ohne Domain leere Sitemap.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (client.website || "").replace(/\/+$/, "");
  if (!base) return [];
  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
  ];
  if ((client as unknown as { newsEnabled?: boolean }).newsEnabled) {
    entries.push({ url: `${base}/aktuelles/`, changeFrequency: "weekly", priority: 0.6 });
  }
  return entries;
}

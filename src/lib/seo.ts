import { client } from "@/data/client";

/**
 * Baut das LocalBusiness/AutoRepair JSON-LD aus der zentralen client.ts.
 * Nur vorhandene Felder werden aufgenommen (kein leeres/ungültiges Markup).
 * geo (lat/lng) und JobPosting bewusst NICHT enthalten — dafür fehlen aktuell
 * die Daten in client.ts (siehe OFFEN-Liste).
 */
function parseOpeningHours(): Record<string, unknown>[] {
  const c = client as unknown as {
    oeffnungszeiten_tage?: Record<string, string>;
    oeffnungszeiten?: { mo_fr?: string; sa?: string; so?: string };
  };
  const specs: Record<string, unknown>[] = [];
  const add = (val: string | undefined, days: string[]) => {
    if (!val) return;
    const m = val.match(/(\d{1,2}:\d{2})\s*[–—-]\s*(\d{1,2}:\d{2})/);
    if (m) specs.push({ "@type": "OpeningHoursSpecification", dayOfWeek: days, opens: m[1], closes: m[2] });
  };
  // Bevorzugt effektive Tages-Zeiten (Werktage-Block + Ausnahmen); sonst Legacy.
  const DOW: Record<string, string> = {
    mo: "Monday", di: "Tuesday", mi: "Wednesday", do: "Thursday", fr: "Friday", sa: "Saturday", so: "Sunday",
  };
  const t = c.oeffnungszeiten_tage;
  if (t) {
    for (const d of ["mo", "di", "mi", "do", "fr", "sa", "so"]) add(t[d], [DOW[d]]);
    return specs;
  }
  const oz = c.oeffnungszeiten;
  if (!oz) return [];
  add(oz.mo_fr, ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
  add(oz.sa, ["Saturday"]);
  add(oz.so, ["Sunday"]);
  return specs;
}

export function buildBusinessJsonLd(): Record<string, unknown> {
  const c = client as unknown as {
    name?: string; branche?: string; ort?: string; adresse?: string;
    telefon?: string; email?: string; website?: string | null; logo?: string | null;
    social?: { facebook?: string | null; instagram?: string | null };
  };
  const isKfz = /kfz|werkstatt|auto/i.test(c.branche ?? "");
  const sameAs = [c.social?.facebook, c.social?.instagram].filter(Boolean) as string[];
  const oh = parseOpeningHours();
  return {
    "@context": "https://schema.org",
    "@type": isKfz ? "AutoRepair" : "LocalBusiness",
    name: c.name,
    ...(c.website ? { url: c.website } : {}),
    ...(c.telefon ? { telephone: c.telefon } : {}),
    ...(c.email ? { email: c.email } : {}),
    ...(c.adresse
      ? { address: { "@type": "PostalAddress", streetAddress: c.adresse, ...(c.ort ? { addressLocality: c.ort } : {}) } }
      : {}),
    ...(oh.length ? { openingHoursSpecification: oh } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    ...(c.logo ? { logo: c.logo } : {}),
  };
}

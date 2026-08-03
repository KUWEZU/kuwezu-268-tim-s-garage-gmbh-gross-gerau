// ── Öffentliche Kontaktdaten ──────────────────────────────────────────────────
// Reine, testbare Helfer (KEINE Imports). Von Footer/Kontakt/Impressum genutzt →
// in beide Sync-Pfade aufgenommen (sonst Build-Fehler im Kundenrepo).

/**
 * Öffentlich anzeigbare Kontakt-E-Mail. Gibt die Adresse zurück — AUSSER es ist die
 * Plattform-Adresse (info@kuwezu.de), die auf keiner Kundenseite als Werkstatt-Kontakt
 * erscheinen darf (§5 DDG verlangt die echten Anbieterdaten). Leer/fehlend → null.
 * String()-Weitung verhindert never-Narrowing bei client.ts mit email:"" (Literaltyp).
 */
export function publicEmail(raw: string | null | undefined): string | null {
  const e = String(raw ?? "").trim();
  return e && e.toLowerCase() !== "info@kuwezu.de" ? e : null;
}

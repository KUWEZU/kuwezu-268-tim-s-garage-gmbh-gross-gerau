import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { client } from "@/data/client";
import { publicEmail } from "@/lib/contact";

/**
 * Normalisiert eine Social-URL zu einer gültigen absoluten https-URL.
 * Repariert verstümmelte/fehlende Protokolle (z. B. "https/kuwezu.de",
 * "kuwezu.de", "www.…", "//…") → sonst interpretiert der Browser den Wert als
 * relativen Pfad und landet auf einer 404-Seite der eigenen Domain.
 */
function socialUrl(v: string | null | undefined): string | null {
  if (!v) return null;
  const s = v.trim().replace(/^https?\b[:/]*/i, "").replace(/^\/+/, "");
  return s ? `https://${s}` : null;
}

/** Adresse: „Straße Hausnr" in Zeile 1, „PLZ Ort" in Zeile 2 (Umbruch am ersten Komma). */
function formatAdresse(adr: string | null | undefined): string {
  if (!adr) return "";
  const i = adr.indexOf(",");
  return i < 0 ? adr.trim() : `${adr.slice(0, i).trim()}\n${adr.slice(i + 1).trim()}`;
}

export function Footer() {
  const year = new Date().getFullYear();
  const initials = client.name.slice(0, 2).toUpperCase();

  return (
    <footer
      className="border-t border-brand-border"
      style={{ backgroundColor: "var(--color-footer-bg)" }}
      aria-label="Seitenende"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            {/* A2/#7: Footer-Logo klickbar (→ Startseite/oben), analog zum Header-Logo. */}
            <a href="/" aria-label="Zur Startseite" className="flex items-center gap-3 mb-5 group hover:opacity-80 transition-opacity">
              {client.logo ? (
                <Image src={client.logo} alt={client.name} width={140} height={40}
                  className="h-10 w-auto object-contain" unoptimized />
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shrink-0">
                    <span className="text-on-primary font-black text-sm">{initials}</span>
                  </div>
                  <span className="text-brand-text font-bold text-lg">{client.name}</span>
                </>
              )}
            </a>
            <p className="text-base text-brand-muted leading-relaxed mb-6">
              Ihr {(client as { unternehmenszweck?: string | null }).unternehmenszweck ?? client.branche}-Betrieb in {client.ort}. Qualität, Transparenz
              und schneller Service.
            </p>
            {(client.social.facebook || client.social.instagram) && (
              <div className="flex items-center gap-3">
                {client.social.facebook && (
                  <a href={socialUrl(client.social.facebook) ?? "#"} target="_blank" rel="noopener noreferrer" aria-label="Facebook öffnen"
                    className="w-10 h-10 rounded-lg bg-brand-surface2 border border-brand-border flex items-center justify-center
                               text-brand-muted hover:text-brand-text hover:border-brand-border transition-all min-h-[44px]">
                    {/* Facebook "f" — stroke style, same format as lucide-react */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                )}
                {client.social.instagram && (
                  <a href={socialUrl(client.social.instagram) ?? "#"} target="_blank" rel="noopener noreferrer" aria-label="Instagram öffnen"
                    className="w-10 h-10 rounded-lg bg-brand-surface2 border border-brand-border flex items-center justify-center
                               text-brand-muted hover:text-brand-text hover:border-brand-border transition-all min-h-[44px]">
                    {/* Instagram camera — stroke style, same format as lucide-react */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Leistungen */}
          <div>
            <h3 className="text-base font-semibold text-brand-heading mb-5 uppercase tracking-wide text-sm">Leistungen</h3>
            <ul className="space-y-2.5" role="list">
              {client.leistungen.slice(0, 8).map((l) => (
                <li key={l.slug}>
                  <a href="#leistungen"
                    className="text-base text-brand-muted hover:text-brand-text transition-colors leading-relaxed">
                    {l.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Unternehmen */}
          <div>
            <h3 className="text-base font-semibold text-brand-heading mb-5 uppercase tracking-wide text-sm">Unternehmen</h3>
            <ul className="space-y-2.5" role="list">
              {[
                { label: "Über uns",         href: "#ueber-uns"        },
                ...(client.newsEnabled ? [{ label: "Aktuelles", href: "/aktuelles" }] : []),
                ...(client.karriere?.enabled === false ? [] : [{ label: "Karriere", href: "#karriere" }]),
                { label: "Kontakt",          href: "#kontakt"          },
                { label: "Impressum",        href: "/impressum"        },
                { label: "Datenschutz",      href: "/datenschutz"      },
                { label: "Barrierefreiheit", href: "/barrierefreiheit" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-base text-brand-muted hover:text-brand-text transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontaktdaten */}
          <div>
            <h3 className="text-base font-semibold text-brand-heading mb-5 uppercase tracking-wide text-sm">Kontakt</h3>
            <ul className="space-y-4" role="list">
              {client.telefon && (
                <li>
                  <a href={`tel:${client.telefon}`}
                    className="flex items-center gap-3 text-base text-brand-muted hover:text-brand-text transition-colors group min-h-[44px]">
                    <div className="w-8 h-8 rounded-lg bg-safe-icon/10 flex items-center justify-center shrink-0 group-hover:bg-safe-icon/20 transition-colors">
                      <Phone className="w-4 h-4 text-safe-icon" aria-hidden="true" />
                    </div>
                    {client.telefon}
                  </a>
                </li>
              )}
              {publicEmail(client.email) && (
                <li>
                  <a href={`mailto:${publicEmail(client.email)}`}
                    className="flex items-center gap-3 text-base text-brand-muted hover:text-brand-text transition-colors group min-h-[44px]">
                    <div className="w-8 h-8 rounded-lg bg-safe-icon/10 flex items-center justify-center shrink-0 group-hover:bg-safe-icon/20 transition-colors">
                      <Mail className="w-4 h-4 text-safe-icon" aria-hidden="true" />
                    </div>
                    {publicEmail(client.email)}
                  </a>
                </li>
              )}
              {client.adresse && (
                <li>
                  <address className="not-italic flex items-start gap-3 text-base text-brand-muted">
                    <div className="w-8 h-8 rounded-lg bg-safe-icon/10 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-safe-icon" aria-hidden="true" />
                    </div>
                    {client.maps_url ? (
                      <a
                        href={client.maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="leading-relaxed hover:text-brand-text transition-colors whitespace-pre-line"
                      >
                        {formatAdresse(client.adresse)}
                      </a>
                    ) : (
                      <span className="leading-relaxed whitespace-pre-line">{formatAdresse(client.adresse)}</span>
                    )}
                  </address>
                </li>
              )}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-24 sm:pb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-brand-muted">© {year} {client.name}. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-5">
            <a href="/impressum"        className="text-sm text-brand-muted hover:text-brand-text transition-colors">Impressum</a>
            <a href="/datenschutz"      className="text-sm text-brand-muted hover:text-brand-text transition-colors">Datenschutz</a>
            <a href="/barrierefreiheit" className="text-sm text-brand-muted hover:text-brand-text transition-colors">Barrierefreiheit</a>
          </div>
        </div>
      </div>

    </footer>
  );
}


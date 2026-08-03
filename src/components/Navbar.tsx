"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { client } from "@/data/client";

// Karriere-Eintrag nur, wenn die Section aktiv ist (client.karriere.enabled) —
// sonst wäre der Anker tot.
const NAV_ANCHORS = [
  { label: "Home",       anchor: ""           },
  { label: "Über uns",   anchor: "ueber-uns"  },
  { label: "Leistungen", anchor: "leistungen" },
  ...(client.karriere?.enabled === false ? [] : [{ label: "Karriere", anchor: "karriere" }]),
  { label: "Kontakt",    anchor: "kontakt"    },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // A1/#6: aktiver Menüpunkt. Onepager → Scroll-Spy (sichtbarer Abschnitt);
  // "" = Home (oben). Auf Unterseiten via pathname markiert.
  const [active, setActive] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 30); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A1/#6: Scroll-Spy — markiert den gerade sichtbaren Abschnitt (nur Onepager).
  useEffect(() => {
    if (pathname !== "/") { setActive(""); return; }
    const ids = NAV_ANCHORS.map((a) => a.anchor).filter(Boolean);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    // Ganz oben = Home
    const onTop = () => { if (window.scrollY < 120) setActive(""); };
    window.addEventListener("scroll", onTop, { passive: true });
    onTop();
    return () => { obs.disconnect(); window.removeEventListener("scroll", onTop); };
  }, [pathname]);

  const isAnchorActive = (anchor: string) => pathname === "/" && active === anchor;

  function navHref(anchor: string) {
    return pathname === "/" ? `#${anchor}` : `/#${anchor}`;
  }

  function handleNavClick(e: React.MouseEvent, anchor: string) {
    if (pathname !== "/") return;
    e.preventDefault();
    setOpen(false);
    if (anchor === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  const initials = client.name.slice(0, 2).toUpperCase();

  /** Format German phone numbers: 012345678901 → 0123 456 78901 */
  function formatPhone(raw: string): string {
    const digits = raw.replace(/\D/g, "");
    if (digits.length >= 10) {
      const areaLen = digits.startsWith("0800") || digits.startsWith("0900") ? 4
        : digits.startsWith("015") || digits.startsWith("016") || digits.startsWith("017") ? 4
        : digits.startsWith("0") ? Math.min(5, Math.floor(digits.length / 2))
        : 3;
      const area = digits.slice(0, areaLen);
      const rest = digits.slice(areaLen);
      const mid  = rest.slice(0, Math.ceil(rest.length / 2));
      const end  = rest.slice(Math.ceil(rest.length / 2));
      return end ? `${area} ${mid} ${end}` : `${area} ${mid}`;
    }
    return raw;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300${scrolled ? " border-b nav-scrolled" : ""}`}
      style={scrolled ? {
        backgroundColor: "var(--color-footer-bg)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottomColor: "var(--nav-scrolled-border)",
        boxShadow: "var(--nav-shadow)",
      } : {
        background: "var(--nav-hero-bg)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between" aria-label="Hauptnavigation">

        {/* Logo / Wordmark */}
        <a href={navHref("hero")} className="flex items-center gap-3 group" aria-label="Zur Startseite"
          onClick={(e) => handleNavClick(e, "hero")}>
          {client.logo ? (
            <img
              src={client.logo}
              alt={client.name}
              style={{ maxHeight: "56px", width: "auto", maxWidth: "200px", objectFit: "contain", display: "block" }}
            />
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shrink-0">
                <span className="text-on-primary font-black text-sm tracking-tight">{initials}</span>
              </div>
              <span
                className="font-bold text-lg tracking-tight transition-colors group-hover:opacity-80"
                style={{ color: scrolled ? "var(--text-on-footer)" : "var(--nav-hero-text)" }}>
                {client.name}
              </span>
            </>
          )}
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_ANCHORS.map(({ label, anchor }) => {
            const act = isAnchorActive(anchor);
            return (
            <li key={anchor}>
              <a href={navHref(anchor)} onClick={(e) => handleNavClick(e, anchor)}
                aria-current={act ? "true" : undefined}
                className={`nav-link relative px-4 py-2.5 text-base rounded-lg transition-all min-h-[44px] inline-flex items-center ${act ? "font-semibold" : "font-medium"}`}
                style={act ? { color: scrolled ? "var(--color-safe-primary)" : "var(--nav-hero-text)" } : undefined}>
                {label}
                {act && <span className="absolute left-4 right-4 -bottom-0.5 h-0.5 rounded-full" aria-hidden="true"
                  style={{ background: scrolled ? "var(--color-safe-primary)" : "var(--nav-hero-text)" }} />}
              </a>
            </li>
          ); })}
          {client.newsEnabled && (
            <li>
              <Link href="/aktuelles"
                aria-current={pathname === "/aktuelles" ? "page" : undefined}
                className={`nav-link relative px-4 py-2.5 text-base rounded-lg transition-all min-h-[44px] inline-flex items-center ${pathname === "/aktuelles" ? "font-semibold" : "font-medium"}`}
                style={pathname === "/aktuelles" ? { color: scrolled ? "var(--color-safe-primary)" : "var(--nav-hero-text)" } : undefined}>
                Aktuelles
                {pathname === "/aktuelles" && <span className="absolute left-4 right-4 -bottom-0.5 h-0.5 rounded-full" aria-hidden="true"
                  style={{ background: scrolled ? "var(--color-safe-primary)" : "var(--nav-hero-text)" }} />}
              </Link>
            </li>
          )}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {client.telefon && (
            <a
              href={`tel:${client.telefon}`}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border transition-all min-h-[44px]"
              style={scrolled ? {
                color: "var(--color-safe-primary)",
                borderColor: "var(--color-safe-primary)",
                backgroundColor: "transparent",
              } : {
                color: "var(--nav-hero-text)",
                borderColor: "rgba(255,255,255,0.35)",
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
              aria-label="Jetzt anrufen">
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              {formatPhone(client.telefon)}
            </a>
          )}
          <a href={navHref("kontakt")} onClick={(e) => handleNavClick(e, "kontakt")}
            className="px-5 py-2.5 text-sm font-semibold bg-brand-primary text-on-primary hover:bg-brand-primary-hover
                       rounded-xl transition-all min-h-[44px] inline-flex items-center shadow-md shadow-brand-primary/25">
            Termin buchen
          </a>
        </div>

        {/* Mobile burger */}
        <button type="button" onClick={() => setOpen(v => !v)}
          className="md:hidden p-3 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          style={{ color: scrolled ? "var(--text-on-footer)" : "var(--nav-hero-text)" }}
          aria-label={open ? "Menü schließen" : "Menü öffnen"} aria-expanded={open} aria-controls="mobile-menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" role="navigation" aria-label="Mobilmenü"
          className="md:hidden border-t px-4 pb-5 bg-[var(--color-footer-bg)] border-[var(--nav-scrolled-border)]">
          <ul className="space-y-1 pt-3" role="list">
            {NAV_ANCHORS.map(({ label, anchor }) => {
              const act = isAnchorActive(anchor);
              return (
              <li key={anchor}>
                <a href={navHref(anchor)} onClick={(e) => handleNavClick(e, anchor)}
                  aria-current={act ? "true" : undefined}
                  className={`flex items-center px-4 py-3 text-base rounded-lg transition-all min-h-[44px] hover:bg-[var(--nav-scrolled-hover-bg)] ${act ? "font-semibold text-on-footer border-l-2 border-[var(--color-safe-primary)]" : "font-medium text-on-footer/70 hover:text-on-footer"}`}>
                  {label}
                </a>
              </li>
            ); })}
            {client.newsEnabled && (
              <li>
                <Link href="/aktuelles" onClick={() => setOpen(false)}
                  aria-current={pathname === "/aktuelles" ? "page" : undefined}
                  className={`flex items-center px-4 py-3 text-base rounded-lg transition-all min-h-[44px] hover:bg-[var(--nav-scrolled-hover-bg)] ${pathname === "/aktuelles" ? "font-semibold text-on-footer border-l-2 border-[var(--color-safe-primary)]" : "font-medium text-on-footer/70 hover:text-on-footer"}`}>
                  Aktuelles
                </Link>
              </li>
            )}
          </ul>
          <div className="mt-4 pt-4 border-t border-[var(--nav-scrolled-border)] flex flex-col gap-3">
            {client.telefon && (
              <a href={`tel:${client.telefon}`}
                className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-safe-primary
                           border border-safe-primary/30 rounded-xl min-h-[44px] bg-safe-primary/5">
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                {formatPhone(client.telefon)}
              </a>
            )}
            <a href={navHref("kontakt")} onClick={(e) => handleNavClick(e, "kontakt")}
              className="w-full text-center px-4 py-3.5 text-base font-semibold bg-brand-primary text-on-primary
                         rounded-xl min-h-[44px] flex items-center justify-center hover:bg-brand-primary-hover transition-all">
              Termin buchen
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

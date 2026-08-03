"use client";
import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "kuwezu_cookie_consent";

type Consent = { necessary: true; maps: boolean; timestamp: number };

function loadConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Consent;
  } catch { return null; }
}

function saveConsent(maps: boolean) {
  const c: Consent = { necessary: true, maps, timestamp: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  // Notify Maps components that may be waiting for consent
  window.dispatchEvent(new CustomEvent("kuwezu:consent-update", { detail: c }));
  return c;
}

export function CookieBanner() {
  const [mounted,       setMounted]       = useState(false);
  const [visible,       setVisible]       = useState(false);
  const [closing,       setClosing]       = useState(false);
  const [settingsOpen,  setSettingsOpen]  = useState(false);
  const [mapsConsent,   setMapsConsent]   = useState(false);
  const [hadConsent,    setHadConsent]    = useState(false);

  useEffect(() => {
    setMounted(true);
    const existing = loadConsent();
    if (existing) {
      setHadConsent(true);
      setMapsConsent(existing.maps);
    } else {
      // Slight delay so layout paints first
      const t = setTimeout(() => setVisible(true), 120);
      return () => clearTimeout(t);
    }
  }, []);

  // Expose re-open hook for footer links: data-kuwezu-cookie-settings attribute
  useEffect(() => {
    if (!mounted) return;
    function handleClick(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest("[data-kuwezu-cookie-settings]");
      if (el) { e.preventDefault(); setClosing(false); setVisible(true); }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [mounted]);

  const dismiss = useCallback((animate = true) => {
    if (animate) {
      setClosing(true);
      setTimeout(() => { setVisible(false); setClosing(false); }, 200);
    } else {
      setVisible(false);
    }
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent(true);
    setHadConsent(true);
    dismiss();
  }, [dismiss]);

  const acceptNecessary = useCallback(() => {
    saveConsent(false);
    setHadConsent(true);
    dismiss();
  }, [dismiss]);

  const saveCustom = useCallback(() => {
    saveConsent(mapsConsent);
    setHadConsent(true);
    dismiss();
  }, [mapsConsent, dismiss]);

  if (!mounted || !visible) return null;

  return (
    <>
      {/* ── Slide-up bar ─────────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="false"
        aria-label="Cookie-Einstellungen"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e5e7eb",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.10)",
          animation: closing
            ? "kuwezu-slide-down 200ms ease-in forwards"
            : "kuwezu-slide-up 300ms ease-out forwards",
        }}
      >
        <style>{`
          @keyframes kuwezu-slide-up {
            from { transform: translateY(100%); }
            to   { transform: translateY(0); }
          }
          @keyframes kuwezu-slide-down {
            from { transform: translateY(0); }
            to   { transform: translateY(100%); }
          }
        `}</style>

        <div style={{ maxWidth: 960, margin: "0 auto", padding: "20px 24px 24px" }}>

          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 22 }} aria-hidden="true">🍪</span>
            <span style={{ fontWeight: 700, fontSize: 16, color: "#1a1a1a", flex: 1 }}>
              Wir verwenden Cookies
            </span>
            {hadConsent && (
              <button
                onClick={() => dismiss()}
                aria-label="Schließen"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "#6b7280", padding: 4, lineHeight: 1,
                  fontSize: 20, display: "flex", alignItems: "center",
                }}
              >×</button>
            )}
          </div>

          {/* Description */}
          <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.6, margin: "0 0 8px" }}>
            Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.
            Einige sind notwendig, andere helfen uns, diese Website und Ihre Erfahrung zu verbessern.
          </p>
          <a
            href="#datenschutz"
            style={{ fontSize: 13, color: "var(--brand-primary, #1d4ed8)", textDecoration: "underline" }}
          >
            Mehr erfahren / Datenschutz
          </a>

          {/* Expandable categories */}
          {settingsOpen && (
            <div style={{ marginTop: 16, borderTop: "1px solid #f3f4f6", paddingTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>

              {/* Necessary — always on */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  {/* Toggle: locked */}
                  <div style={{
                    width: 40, height: 22, borderRadius: 11,
                    backgroundColor: "var(--brand-primary, #1d4ed8)",
                    position: "relative", opacity: 0.6, cursor: "not-allowed",
                  }}>
                    <div style={{
                      position: "absolute", top: 3, right: 3,
                      width: 16, height: 16, borderRadius: "50%", backgroundColor: "#fff",
                    }} />
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#1a1a1a" }}>Notwendig</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                    Erforderlich für die grundlegende Funktionalität der Website. Können nicht deaktiviert werden.
                  </div>
                </div>
              </div>

              {/* Google Maps — toggleable */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  <button
                    role="switch"
                    aria-checked={mapsConsent}
                    onClick={() => setMapsConsent((v) => !v)}
                    style={{
                      width: 40, height: 22, borderRadius: 11,
                      backgroundColor: mapsConsent ? "var(--brand-primary, #1d4ed8)" : "#d1d5db",
                      border: "none", cursor: "pointer", position: "relative",
                      transition: "background-color 0.2s",
                    }}
                  >
                    <div style={{
                      position: "absolute", top: 3,
                      left: mapsConsent ? 21 : 3,
                      width: 16, height: 16, borderRadius: "50%", backgroundColor: "#fff",
                      transition: "left 0.2s",
                    }} />
                  </button>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#1a1a1a" }}>Google Maps</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                    Wird verwendet, um interaktive Karten anzuzeigen. Dabei werden Daten an Google übertragen.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Button row */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 10,
            marginTop: 18,
            justifyContent: "flex-end",
          }}>
            <button
              onClick={() => setSettingsOpen((v) => !v)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 13, color: "#6b7280", padding: "0 4px",
                textDecoration: "underline", marginRight: "auto",
              }}
            >
              {settingsOpen ? "Einstellungen einklappen" : "Einstellungen anpassen"}
            </button>

            {settingsOpen ? (
              <button
                onClick={saveCustom}
                style={{
                  padding: "9px 18px", fontSize: 13, fontWeight: 600,
                  borderRadius: 8, border: "1px solid #e5e7eb",
                  backgroundColor: "#f3f4f6", color: "#1a1a1a",
                  cursor: "pointer",
                }}
              >
                Auswahl speichern
              </button>
            ) : (
              <button
                onClick={acceptNecessary}
                style={{
                  padding: "9px 18px", fontSize: 13, fontWeight: 600,
                  borderRadius: 8, border: "1px solid #e5e7eb",
                  backgroundColor: "#f3f4f6", color: "#1a1a1a",
                  cursor: "pointer",
                }}
              >
                Nur Notwendige
              </button>
            )}

            <button
              onClick={acceptAll}
              style={{
                padding: "9px 22px", fontSize: 13, fontWeight: 700,
                borderRadius: 8, border: "none",
                backgroundColor: "var(--brand-primary, #1d4ed8)",
                color: "#ffffff", cursor: "pointer",
              }}
            >
              Alle akzeptieren
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

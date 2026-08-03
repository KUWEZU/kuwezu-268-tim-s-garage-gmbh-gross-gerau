"use client";

import { useEffect, useState } from "react";
import { Cookie, X, ChevronDown, ChevronUp } from "lucide-react";

const COOKIE_KEY = "template_cookie_consent";

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function save(c: ConsentState) {
    try { localStorage.setItem(COOKIE_KEY, JSON.stringify(c)); } catch { /* ignore */ }
    setVisible(false);
  }

  function acceptAll() {
    save({ necessary: true, analytics: true, marketing: true });
  }

  function acceptSelected() {
    save(consent);
  }

  function rejectAll() {
    save({ necessary: true, analytics: false, marketing: false });
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      aria-modal="true"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
    >
      <div className="max-w-3xl mx-auto bg-[var(--color-modal-bg)] border border-white/[0.12] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white leading-none mb-0.5">
                Datenschutz-Einstellungen
              </h2>
              <p className="text-xs text-white/50">
                Wir verwenden Cookies, um Ihnen die beste Erfahrung zu bieten.
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 pb-2">
          <p className="text-sm text-white/60 leading-relaxed">
            Diese Website verwendet Cookies und ähnliche Technologien. Notwendige Cookies sind für
            den Betrieb der Website erforderlich. Weitere Cookies helfen uns, die Website zu verbessern.
            Ihre Einwilligung können Sie jederzeit widerrufen.{" "}
            <a href="/datenschutz" className="text-brand-primary hover:underline">
              Datenschutzerklärung
            </a>
          </p>
        </div>

        {/* Expandable details */}
        <div className="px-5 pb-3">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mt-1"
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            Einstellungen anpassen
          </button>

          {expanded && (
            <div className="mt-3 space-y-2">
              {/* Necessary — always on */}
              <CookieRow
                title="Notwendig"
                description="Essenziell für die Website-Funktionalität. Kann nicht deaktiviert werden."
                checked={true}
                disabled
                onChange={() => {}}
              />
              <CookieRow
                title="Analyse"
                description="Helfen uns zu verstehen, wie Besucher die Website nutzen (z. B. Google Analytics)."
                checked={consent.analytics}
                onChange={(v) => setConsent((c) => ({ ...c, analytics: v }))}
              />
              <CookieRow
                title="Marketing"
                description="Werden verwendet, um Ihnen relevante Werbung anzuzeigen."
                checked={consent.marketing}
                onChange={(v) => setConsent((c) => ({ ...c, marketing: v }))}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 px-5 pb-5 pt-2 border-t border-white/[0.06] mt-2">
          <button
            type="button"
            onClick={rejectAll}
            className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-white/60 hover:text-white border border-white/[0.10] hover:border-white/[0.20] rounded-xl transition-all"
          >
            Nur notwendige
          </button>
          {expanded && (
            <button
              type="button"
              onClick={acceptSelected}
              className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-brand-primary border border-brand-primary/30 hover:border-brand-primary/60 rounded-xl transition-all"
            >
              Auswahl speichern
            </button>
          )}
          <button
            type="button"
            onClick={acceptAll}
            className="flex-1 sm:flex-[2] px-4 py-2.5 text-sm font-semibold bg-brand-primary text-[#0d0f1a] hover:bg-brand-primary-hover rounded-xl transition-all"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}

function CookieRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-lg">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white leading-none mb-0.5">{title}</p>
        <p className="text-xs text-white/40 mt-1">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`mt-0.5 w-9 h-5 rounded-full transition-colors shrink-0 relative ${
          checked ? "bg-brand-primary" : "bg-white/10"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

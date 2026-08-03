"use client";

import { useEffect, useRef, useState } from "react";
import { X, Minus, Plus, Eye, Zap, ZapOff, Link, Type, RotateCcw } from "lucide-react";

// ── Storage key ─────────────────────────────────────────────────────────────
const STORAGE_KEY = "template_a11y";

type A11ySettings = {
  fontSize: number;       // base modifier in px (0 = no change)
  contrast: boolean;
  noMotion: boolean;
  underlineLinks: boolean;
  readableFont: boolean;
};

const DEFAULT: A11ySettings = {
  fontSize: 0,
  contrast: false,
  noMotion: false,
  underlineLinks: false,
  readableFont: false,
};

function loadSettings(): A11ySettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

function saveSettings(s: A11ySettings) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch { /* ignore */ }
}

// ── Apply settings to <html> ─────────────────────────────────────────────────
function applySettings(s: A11ySettings) {
  const html = document.documentElement;
  html.style.fontSize = s.fontSize !== 0 ? `${16 + s.fontSize}px` : "";
  html.classList.toggle("a11y-contrast",       s.contrast);
  html.classList.toggle("a11y-no-motion",      s.noMotion);
  html.classList.toggle("a11y-underline-links", s.underlineLinks);
  html.classList.toggle("a11y-readable-font",  s.readableFont);
}

// ── Toggle Row ───────────────────────────────────────────────────────────────
function ToggleRow({
  icon: Icon,
  label,
  description,
  active,
  onToggle,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  active: boolean;
  onToggle: () => void;
}) {
  // Eigenständiges, fixes Hochkontrast-Schema (unabhängig von Marke/Seite/Modus).
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
        active
          ? "bg-[#12263f] border border-[#3b82f6]"
          : "bg-[#212737] border border-[#2e3546] hover:bg-[#262d40] hover:border-[#3a445a]"
      }`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
        active ? "bg-[#3b82f6] text-white" : "bg-[#2c3446] text-[#aab3c5]"
      }`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold leading-tight mb-0.5 ${active ? "text-white" : "text-[#eef1f6]"}`}>
          {label}
        </p>
        <p className="text-xs leading-snug text-[#aab3c5]">{description}</p>
      </div>
      {/* Pill toggle — Grau (aus) vs Blau (an) + Knopfposition = klar unterscheidbar */}
      <div className={`mt-0.5 w-9 h-5 rounded-full transition-colors shrink-0 relative ${
        active ? "bg-[#3b82f6]" : "bg-[#3a445a]"
      }`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
          active ? "translate-x-4" : "translate-x-0.5"
        }`} />
      </div>
    </button>
  );
}

// ── Wheelchair SVG icon ──────────────────────────────────────────────────────
function WheelchairIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="5" r="1.5" />
      <path d="M9 9h6l-1 5-2 5-2-5-1-5" />
      <path d="M9 12l-2 5" />
      <path d="M15 12l2 5" />
    </svg>
  );
}

// ── Main Widget ──────────────────────────────────────────────────────────────
export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULT);
  const panelRef = useRef<HTMLDivElement>(null);

  // Load on mount + apply
  useEffect(() => {
    const s = loadSettings();
    setSettings(s);
    applySettings(s);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handle(e: KeyboardEvent) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open]);

  function update(partial: Partial<A11ySettings>) {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      saveSettings(next);
      applySettings(next);
      return next;
    });
  }

  function changeFontSize(delta: number) {
    update({ fontSize: Math.max(-4, Math.min(12, settings.fontSize + delta)) });
  }

  function reset() { update(DEFAULT); }

  const isModified =
    settings.fontSize !== 0 ||
    settings.contrast ||
    settings.noMotion ||
    settings.underlineLinks ||
    settings.readableFont;

  const fontSizeLabel =
    settings.fontSize === 0
      ? "Normal (16px)"
      : settings.fontSize > 0
      ? `Größer (+${settings.fontSize}px)`
      : `Kleiner (${settings.fontSize}px)`;

  return (
    <div ref={panelRef} className="fixed bottom-6 left-6 z-50">
      {/* ── Panel ── */}
      {open && (
        <div
          className="absolute bottom-14 left-0 w-72 bg-[#171b26] border border-[#2e3546] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden text-[#eef1f6]"
          role="dialog"
          aria-label="Barrierefreiheits-Einstellungen"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#2e3546] bg-[#1c2130]">
            <div className="flex items-center gap-2">
              <WheelchairIcon className="w-4 h-4 text-[#60a5fa]" />
              <span className="text-sm font-semibold text-white">Barrierefreiheit</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 -mr-1 text-[#9aa4b8] hover:text-white transition-colors rounded"
              aria-label="Schließen"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 space-y-2">
            {/* Font Size */}
            <div className="bg-[#212737] border border-[#2e3546] rounded-lg px-3 py-2.5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#2c3446] flex items-center justify-center">
                  <Type className="w-4 h-4 text-[#aab3c5]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#eef1f6] leading-none mb-0.5">Schriftgröße</p>
                  <p className="text-xs text-[#aab3c5]">{fontSizeLabel}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => changeFontSize(-2)}
                  disabled={settings.fontSize <= -4}
                  aria-label="Schrift verkleinern"
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#2c3446] border border-[#3a445a] text-[#dfe4ee] hover:bg-[#333c50] hover:border-[#4a5570] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium"
                >
                  <Minus className="w-3.5 h-3.5" /> Kleiner
                </button>
                <button
                  type="button"
                  onClick={() => changeFontSize(2)}
                  disabled={settings.fontSize >= 12}
                  aria-label="Schrift vergrößern"
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#2c3446] border border-[#3a445a] text-[#dfe4ee] hover:bg-[#333c50] hover:border-[#4a5570] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium"
                >
                  <Plus className="w-3.5 h-3.5" /> Größer
                </button>
              </div>
            </div>

            {/* Toggles */}
            <ToggleRow
              icon={Eye}
              label="Hoher Kontrast"
              description="Farben invertieren für bessere Lesbarkeit"
              active={settings.contrast}
              onToggle={() => update({ contrast: !settings.contrast })}
            />
            <ToggleRow
              icon={settings.noMotion ? ZapOff : Zap}
              label="Animationen aus"
              description="Alle Bewegungen und Übergänge stoppen"
              active={settings.noMotion}
              onToggle={() => update({ noMotion: !settings.noMotion })}
            />
            <ToggleRow
              icon={Link}
              label="Links unterstreichen"
              description="Alle Links mit Unterstrich markieren"
              active={settings.underlineLinks}
              onToggle={() => update({ underlineLinks: !settings.underlineLinks })}
            />
            <ToggleRow
              icon={Type}
              label="Lesbare Schrift"
              description="Wechsel zu Arial für bessere Lesbarkeit"
              active={settings.readableFont}
              onToggle={() => update({ readableFont: !settings.readableFont })}
            />

            {/* Reset */}
            {isModified && (
              <button
                type="button"
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs text-[#aab3c5] hover:text-white transition-colors border border-[#2e3546] rounded-lg hover:border-[#3a445a]"
              >
                <RotateCcw className="w-3 h-3" />
                Einstellungen zurücksetzen
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-[#2e3546] bg-[#1c2130]">
            <p className="text-[10px] text-[#8a93a6] text-center">
              Einstellungen werden lokal gespeichert
            </p>
          </div>
        </div>
      )}

      {/* ── Trigger Button ── */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Barrierefreiheits-Einstellungen öffnen"
        aria-expanded={open}
        // Kontrast-adaptive Füllfarbe (WCAG Non-text ≥3:1 vs pageBg): Markenfarbe wenn
        // sichtbar, sonst neutrales Schwarz/Weiß — verhindert Verschmelzen mit dem
        // Seitenhintergrund (hell wie dunkel). Vars aus globals.css (buildGlobalsCss).
        style={{
          backgroundColor: "var(--color-a11y-trigger, var(--color-brand-primary))",
          color: "var(--color-a11y-trigger-text, var(--color-on-primary))",
        }}
        className={`relative w-11 h-11 rounded-full shadow-lg flex items-center justify-center transition-all
          ring-1 ring-black/10 hover:brightness-110 ${open ? "brightness-110" : ""}`}
      >
        <WheelchairIcon className="w-5 h-5" />
        {isModified && !open && (
          <span
            className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-white rounded-full border-2"
            style={{ borderColor: "var(--color-a11y-trigger, var(--color-brand-primary))" }}
          />
        )}
      </button>
    </div>
  );
}

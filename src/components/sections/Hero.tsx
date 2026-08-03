"use client";

import { SafeImage } from "@/components/SafeImage";
import { ArrowRight, Star, Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { client } from "@/data/client";
import reviewsRaw from "@/data/reviews.json";
import { nextTuevSlot, formatTuevSlot, type TuevSlot, type NextTuevSlot } from "@/lib/tuev";

type ReviewsJson = { averageRating: number | null; totalCount: number };
const reviewsData = reviewsRaw as ReviewsJson;

// ── Tageszeitliche Öffnungszeit ───────────────────────────────────────────────

type TageZeiten = { mo: string; di: string; mi: string; do: string; fr: string; sa: string; so: string };

// Effektive Zeiten je Wochentag: bevorzugt client.oeffnungszeiten_tage (Werktage-
// Block + Ausnahmen bereits aufgelöst); Fallback auf das alte {mo_fr, sa, so}-Feld.
function resolveTage(): TageZeiten {
  const c = client as unknown as {
    oeffnungszeiten_tage?: Partial<TageZeiten>;
    oeffnungszeiten?: { mo_fr?: string; sa?: string; so?: string };
  };
  const t = c.oeffnungszeiten_tage;
  if (t) {
    return {
      mo: t.mo ?? "", di: t.di ?? "", mi: t.mi ?? "", do: t.do ?? "",
      fr: t.fr ?? "", sa: t.sa ?? "", so: t.so ?? "",
    };
  }
  const oz = c.oeffnungszeiten ?? {};
  const wd = oz.mo_fr ?? "";
  return { mo: wd, di: wd, mi: wd, do: wd, fr: wd, sa: oz.sa ?? "", so: oz.so ?? "" };
}

function useTodaysHours(days: TageZeiten): string | null {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const map: Record<number, keyof TageZeiten> = { 1: "mo", 2: "di", 3: "mi", 4: "do", 5: "fr", 6: "sa", 0: "so" };
    const v = days[map[new Date().getDay()]];
    setText(v ? `Heute: ${v}` : "Heute geschlossen");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return text;
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export function Hero() {
  const { bild, untertext, ctaPrimary, ctaSecondary, overlayOpacity } = client.hero;

  // Öffnungszeiten je Wochentag (Werktage-Block + Ausnahmen), mit Legacy-Fallback.
  const todaysHours = useTodaysHours(resolveTage());

  // Google-Bewertung — #11 / A3: nur plausible Werte (Rating 1–5, Anzahl > 0).
  // Nie Fehl-/Default-Werte anzeigen.
  const rating    = reviewsData?.averageRating;
  const ratingCnt = reviewsData?.totalCount;
  const ratingOk  = typeof rating === "number" && rating >= 1 && rating <= 5 && (ratingCnt ?? 0) > 0;
  const googleText = ratingOk
    ? `${String(rating).replace(".", ",")} ★ bei Google (${ratingCnt})`
    : null;

  // TÜV Termine — Badge zeigt den nächsten konkreten Slot und ist klickbar
  // (Smooth-Scroll zum TÜV-Block im Kontaktbereich). Der konkrete Slot wird
  // client-seitig relativ zu "jetzt" bestimmt (statischer Export → new Date() im
  // Effect vermeidet Hydration-Mismatch + hält die Anzeige aktuell).
  const tuevTermine = (client as unknown as { tuev_termine?: boolean }).tuev_termine ?? false;
  const tuevSlots = (client as unknown as { tuev_slots?: TuevSlot[] | null }).tuev_slots ?? null;
  const [nextSlot, setNextSlot] = useState<NextTuevSlot | null>(null);
  useEffect(() => {
    setNextSlot(nextTuevSlot(tuevSlots, new Date()));
  }, [tuevSlots]);

  function scrollToTuev(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const el = document.getElementById("tuev-termine") ?? document.getElementById("kontakt");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const HERO_OVERLAY_MIN = 0.55;
  const base = Math.max(overlayOpacity ?? HERO_OVERLAY_MIN, HERO_OVERLAY_MIN);
  const top  = Math.min(base + 0.2, 1);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      aria-label="Startbereich"
    >
      {bild && (
        <div className="absolute inset-0" aria-hidden="true">
          <SafeImage
            src={bild}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            unoptimized={bild.endsWith(".svg")}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,${top}) 0%, rgba(0,0,0,${base}) 35%, rgba(0,0,0,${base}) 100%)`,
            }}
          />
        </div>
      )}

      {!bild && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-25"
            style={{ backgroundColor: "var(--color-brand-primary)" }}
          />
        </div>
      )}

      <div className="relative z-10 w-full min-w-0 max-w-6xl mx-auto px-4 sm:px-6 pt-36 pb-24 text-center">
        {/* Badge: Unternehmenszweck (falls ausgefüllt) sonst Branche + Ort.
            Leerer Zweck fällt auf die Branche zurück (|| statt ??); ohne beides
            nur der Ort — kein Kfz-spezifisches „Werkstatt"-Hardcode. */}
        {(() => {
          const zweck = ((client as { unternehmenszweck?: string | null }).unternehmenszweck ?? "").trim();
          const label = zweck || (client.branche ?? "").trim();
          const text = label ? `${label} in ${client.ort}` : client.ort;
          return text ? (
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-white/10 border border-white/25 mb-8 backdrop-blur-sm">
              <span className="text-white text-base font-medium">{text}</span>
            </div>
          ) : null;
        })()}

        {/* Headline = FIRMENNAME (H1) — immer. Zweck/Branche steht ausschließlich
            im Badge darüber (nicht zusätzlich unter dem Namen). */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6 hero-title-shadow text-balance hyphens-auto break-words">
          {client.name}
        </h1>

        {/* Untertext */}
        <p className="max-w-2xl mx-auto text-xl text-white/85 leading-relaxed mb-10 hero-text-shadow">
          {untertext}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href={ctaPrimary.href}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-on-primary font-semibold rounded-xl
                       hover:bg-brand-primary-hover transition-all shadow-2xl shadow-brand-primary/30
                       text-lg min-h-[52px]"
          >
            {ctaPrimary.text}
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
          <a
            href={ctaSecondary.href}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl
                       border border-white/30 hover:bg-white/20 hover:border-white/40 transition-all
                       backdrop-blur-sm text-lg min-h-[52px]"
          >
            {ctaSecondary.text}
          </a>
        </div>

        {/* Trust Badges */}
        <div
          className="flex flex-wrap items-center justify-center gap-8"
          role="list"
          aria-label="Vertrauensnachweise"
        >
          {/* TÜV Termine — nur wenn aktiviert; klickbar → Scroll zum TÜV-Block.
              Zeigt den nächsten konkreten Slot, sobald client-seitig bestimmt. */}
          {tuevTermine && (
            <a
              href="#tuev-termine"
              onClick={scrollToTuev}
              role="listitem"
              className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-md"
              aria-label={nextSlot ? `Nächster TÜV-Termin: ${formatTuevSlot(nextSlot)} — zum Terminbereich springen` : "TÜV-Termine — zum Terminbereich springen"}
            >
              <Calendar className="w-5 h-5 text-white/70 shrink-0" aria-hidden="true" />
              <span className="text-base font-medium">
                {nextSlot ? `Nächster TÜV-Termin: ${formatTuevSlot(nextSlot)}` : "TÜV-Termine verfügbar"}
              </span>
            </a>
          )}

          {/* Google Bewertung — nur wenn Rating vorhanden */}
          {googleText && (
            <div className="flex items-center gap-2.5 text-white/80" role="listitem">
              <Star className="w-5 h-5 text-white/70 shrink-0" aria-hidden="true" />
              <span className="text-base font-medium">{googleText}</span>
            </div>
          )}

          {/* Öffnungszeiten — erscheint nach Client-Hydration */}
          {todaysHours && (
            <div className="flex items-center gap-2.5 text-white/80" role="listitem">
              <Clock className="w-5 h-5 text-white/70 shrink-0" aria-hidden="true" />
              <span className="text-base font-medium">{todaysHours}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

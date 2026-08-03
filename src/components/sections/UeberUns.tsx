import { SafeImage } from "@/components/SafeImage";
import { Award, Users, Wrench, ThumbsUp, Star } from "lucide-react";
import { client } from "@/data/client";
import reviewsData from "@/data/reviews.json";

const STAT_ICONS = [Award, ThumbsUp, Users, Wrench];

// ── Bewertungs-Helfer ─────────────────────────────────────────────────────────

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  const cls = size === "lg" ? "w-6 h-6" : "w-4 h-4";
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} von 5 Sternen`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} className={`${cls} text-yellow-400 fill-yellow-400`} aria-hidden="true" />
      ))}
      {half && (
        <span className={`relative inline-block ${cls} shrink-0`} aria-hidden="true">
          <Star className={`${cls} text-yellow-400/30`} />
          <span className="absolute inset-0 overflow-hidden w-1/2">
            <Star className={`${cls} text-yellow-400 fill-yellow-400`} />
          </span>
        </span>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} className={`${cls} text-yellow-400/30`} aria-hidden="true" />
      ))}
    </span>
  );
}

function ReviewCard({ author, rating, text, date }: {
  author: string; rating: number; text: string; date?: string;
}) {
  return (
    <div
      className="flex flex-col gap-3 border border-brand-border rounded-2xl p-5"
      style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}
    >
      {/* Stars */}
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, Math.max(1, Math.round(rating))) }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
        ))}
      </div>

      {/* Text */}
      <p className="text-base text-brand-text/80 leading-relaxed flex-1 line-clamp-4">
        &ldquo;{text}&rdquo;
      </p>

      {/* Author + Date */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-brand-border">
        <p className="text-sm font-semibold text-brand-heading">{author}</p>
        {date && <p className="text-xs text-brand-muted">{date}</p>}
      </div>
    </div>
  );
}

// ── Hauptkomponente ───────────────────────────────────────────────────────────

export function UeberUns() {
  const { bild, ueberschrift, text1, text2, tags } = client.ueberUns;
  // stats: aus dem readonly-Tuple in ein generisches Array kopieren, damit die
  // längenabhängige Grid-Logik (0–4 Kacheln) typisiert funktioniert.
  const stats = [...client.ueberUns.stats] as { value: string; label: string }[];

  // Reviews aus statischer JSON-Datei (beim Generieren importiert)
  const reviews = reviewsData as {
    averageRating: number | null;
    totalCount: number;
    reviews: { author: string; rating: number; text: string; date?: string }[];
  };
  // #11 / A3: nur plausible, vollständige Werte anzeigen — nie Fehl-/Default-Werte.
  // (Rating 1–5, Anzahl > 0, mind. ein Review-Text.) Verhindert „1,2 / 10 / 1 Stern".
  const hasRating  =
    typeof reviews.averageRating === "number" &&
    reviews.averageRating >= 1 && reviews.averageRating <= 5 &&
    reviews.totalCount > 0 &&
    reviews.reviews.length > 0;
  const topReviews = reviews.reviews.slice(0, 3);

  return (
    <section
      id="ueber-uns"
      className="py-28"
      style={{ backgroundColor: "var(--color-page-bg)" }}
      aria-labelledby="ueber-uns-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Linke Spalte: Text ── */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-icon-surface border border-icon-ring mb-6">
              <span className="text-safe-primary text-sm font-semibold uppercase tracking-wider">Über uns</span>
            </div>

            <h2 id="ueber-uns-heading" className="text-4xl sm:text-5xl font-black text-brand-heading leading-tight mb-6">
              {(() => {
                // Trenne am ERSTEN Gedankenstrich-mit-Leerzeichen (Em-/En-Dash oder
                // Hyphen). KI liefert oft "–"/"-" statt "—"; ohne Trenner (oder mit
                // Bindestrich innerhalb eines Wortes) bleibt die Überschrift intakt —
                // kein angehängter Strich, kein leerer Highlight-Teil.
                const m = ueberschrift.match(/^(.+?)\s+[—–-]\s+(.+)$/);
                if (!m) return ueberschrift;
                return (
                  <>
                    <span>{m[1]}&nbsp;—<br /></span>
                    <span className="text-safe-primary">{m[2]}</span>
                  </>
                );
              })()}
            </h2>

            <p className="text-brand-text/70 text-lg leading-relaxed mb-5">{text1}</p>
            <p className="text-brand-muted text-lg leading-relaxed mb-10">{text2}</p>

            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span key={tag}
                  className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-safe-primary
                             bg-icon-surface border border-icon-ring rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Rechte Spalte: Bild + Stats ── */}
          <div className="flex flex-col gap-6">
            {/* Bild */}
            {bild ? (
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-brand-border"
                style={{ boxShadow: "var(--card-shadow), 0 20px 60px rgba(0,0,0,0.15)" }}>
                <SafeImage src={bild} alt="Unser Betrieb" fill
                  sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center"
                  unoptimized={bild.endsWith(".svg")} />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-brand-primary/15 pointer-events-none" />
              </div>
            ) : (
              <div className="w-full aspect-[4/3] rounded-2xl border border-brand-border flex items-center justify-center"
                style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}>
                <div className="text-center text-brand-text/20">
                  <Award className="w-12 h-12 mx-auto mb-3" aria-hidden="true" />
                  <p className="text-base">Kein Bild konfiguriert</p>
                </div>
              </div>
            )}

            {/* Stats-Grid — passt sich an die Kachelzahl an (0–4 echte Werte).
                Ohne Werte wird der Block komplett ausgeblendet (kein Platzhalter). */}
            {stats.length > 0 && (
            <div className={`grid gap-4 ${
              stats.length === 4 ? "grid-cols-2" :
              stats.length === 3 ? "grid-cols-3" :
              stats.length === 2 ? "grid-cols-2" :
              "grid-cols-1"
            }`}>
              {stats.map(({ value, label }, i) => {
                const Icon = STAT_ICONS[i] ?? Award;
                return (
                  <div key={label}
                    className="border border-brand-border rounded-2xl p-5
                               hover:border-icon-ring transition-all group"
                    style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}>
                    <div className="w-9 h-9 rounded-xl bg-icon-surface border border-icon-ring flex items-center justify-center mb-3
                                    group-hover:bg-icon-ring transition-colors">
                      <Icon className="w-5 h-5 text-safe-icon" aria-hidden="true" />
                    </div>
                    <p className="text-2xl font-black text-brand-heading">{value}</p>
                    <p className="text-sm text-brand-muted mt-1 leading-relaxed">{label}</p>
                  </div>
                );
              })}
            </div>
            )}
          </div>

        </div>

        {/* ── Bewertungen (nur wenn Daten vorhanden) ── */}
        {hasRating && (
          <div className="mt-20 pt-16 border-t border-brand-border" aria-labelledby="bewertungen-heading">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {/* Google-Logo SVG (inline, kein externes Asset nötig) */}
                  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span id="bewertungen-heading" className="text-sm font-semibold text-brand-muted uppercase tracking-wider">
                    Google Bewertungen
                  </span>
                </div>
                <p className="text-2xl font-bold text-brand-heading">Das sagen unsere Kunden</p>
              </div>

              {/* Durchschnitt */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-center">
                  <p className="text-5xl font-black text-brand-heading leading-none mb-1">
                    {reviews.averageRating!.toFixed(1).replace(".", ",")}
                  </p>
                  <div className="text-yellow-400 text-xl leading-none mb-1" aria-hidden="true">
                    <Stars rating={reviews.averageRating!} size="lg" />
                  </div>
                  {reviews.totalCount > 0 && (
                    <p className="text-xs text-brand-muted">
                      basierend auf {reviews.totalCount.toLocaleString("de-DE")} Bewertungen
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Review-Cards */}
            {topReviews.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" role="list" aria-label="Kundenbewertungen">
                {topReviews.map((review, i) => (
                  <div key={i} role="listitem">
                    <ReviewCard
                      author={review.author}
                      rating={review.rating}
                      text={review.text}
                      date={review.date}
                    />
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}

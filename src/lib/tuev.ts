// ── TÜV-/HU-Slot-Logik ────────────────────────────────────────────────────────
// Reine, testbare Helfer (KEINE Imports) — von Hero (Badge "Nächster TÜV-Termin")
// und potenziell Kontakt genutzt. Wird in beide Sync-Pfade aufgenommen, weil Hero
// (gesyncte Komponente) daraus importiert.

export type TuevSlot = { day: string; from: string; to: string };

export type NextTuevSlot = TuevSlot & {
  /** "Di" — Kurzlabel des Wochentags. */
  dayLabel: string;
  /** Tage bis zum nächsten Auftreten (0 = heute noch, 1 = morgen …). */
  daysUntil: number;
};

const DAY_LABELS: Record<string, string> = {
  mo: "Mo", di: "Di", mi: "Mi", do: "Do", fr: "Fr", sa: "Sa", so: "So",
};

// Slot-Tag → JS getDay()-Index (So=0 … Sa=6).
const DAY_INDEX: Record<string, number> = {
  so: 0, mo: 1, di: 2, mi: 3, do: 4, fr: 5, sa: 6,
};

/** "08:00" → 480 (Minuten seit Mitternacht); ungültig → null. */
function toMinutes(hhmm: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

/**
 * Bestimmt aus wiederkehrenden Wochen-Slots den nächsten anstehenden Termin relativ
 * zu `now`. Ein Slot, dessen Endzeit heute bereits verstrichen ist, zählt erst in der
 * nächsten Woche. Bei Gleichstand (mehrere Slots am selben nächstmöglichen Tag)
 * gewinnt der mit der früheren Startzeit. Gibt null zurück, wenn keine gültigen Slots
 * vorliegen.
 */
export function nextTuevSlot(slots: TuevSlot[] | null | undefined, now: Date): NextTuevSlot | null {
  if (!slots || slots.length === 0) return null;
  const nowDay = now.getDay();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  let best: NextTuevSlot | null = null;
  for (const s of slots) {
    if (!s) continue;
    const label = DAY_LABELS[s.day];
    const idx = DAY_INDEX[s.day];
    const start = toMinutes(s.from);
    const end = toMinutes(s.to);
    if (label === undefined || idx === undefined || start === null || end === null) continue;

    let daysUntil = (idx - nowDay + 7) % 7;
    // Heutiger Slot, dessen Ende schon vorbei ist → erst nächste Woche.
    if (daysUntil === 0 && nowMin >= end) daysUntil = 7;

    if (
      best === null ||
      daysUntil < best.daysUntil ||
      (daysUntil === best.daysUntil && start < (toMinutes(best.from) ?? Infinity))
    ) {
      best = { ...s, dayLabel: label, daysUntil };
    }
  }
  return best;
}

/** "Di 08:00–16:00 Uhr" — einheitliche Anzeige eines Slots. */
export function formatTuevSlot(slot: NextTuevSlot | TuevSlot & { dayLabel?: string }): string {
  const label = "dayLabel" in slot && slot.dayLabel ? slot.dayLabel : (DAY_LABELS[slot.day] ?? slot.day);
  return `${label} ${slot.from}–${slot.to} Uhr`;
}

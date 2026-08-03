/**
 * client.ts — Automatisch generiert von KUWEZU
 * Erstellt: 2026-08-03T10:52:24.675Z
 * Kundennummer: 268
 *
 * Alle Texte, Bilder und Einstellungen werden hier gepflegt.
 */

export const client = {
  // ── Allgemein ──────────────────────────────────────────────────────────────
  name: "Tim's Garage GmbH",
  branche: "Autowerkstatt",
  unternehmenszweck: null,
  ort: "Groß-Gerau",
  slogan: "& zuverlässig",
  adresse: "St.-Florian-Straße 4a, 64521 Groß-Gerau",
  maps_url: "https://www.google.com/maps/place/?q=place_id:ChIJfcbIK0KdvUcRT8c4xfjx9Cg",
  // Geokoordinaten → cookie-freie OSM-Karte im Kontakt; null = Adress-Box.
  // Aus kunden.lat/lng (persistiert) → überlebt jeden Redeploy (kein stiller Verlust).
  geo: { lat: 49.9292685, lon: 8.4845234 } as { lat: number; lon: number } | null,
  telefon: "06152 800190",
  email: "",
  website: "",
  logo: "https://r2.kuwezu.de/cdn-cgi/image/width=320,fit=contain,quality=78,format=auto/konzepte/autofit/autofit_logo.webp",
  standort_bild: "https://r2.kuwezu.de/cdn-cgi/image/width=1024,fit=cover,quality=78,format=auto/kunden/268/stock-1fm9tjt.jpg",
  // Foto-Attribution (Unsplash/Pexels) → Footer-Hinweis „Fotos: …". Leer = kein Hinweis.
  bildAttributionen: {"hero":{"autor":"Winston Chen","autorUrl":"https://unsplash.com/@winstonchen","quelle":"unsplash"},"ueberUns":{"autor":"serjan midili","autorUrl":"https://unsplash.com/@s_midili","quelle":"unsplash"},"standort":{"autor":"Tim Mossholder","autorUrl":"https://unsplash.com/@timmossholder","quelle":"unsplash"},"karriere":{"autor":"BHARAT VISHAWAKARMA","autorUrl":"https://unsplash.com/@bharat05","quelle":"unsplash"}} as {
    hero?: { autor: string; autorUrl: string; quelle: string };
    ueberUns?: { autor: string; autorUrl: string; quelle: string };
    standort?: { autor: string; autorUrl: string; quelle: string };
    karriere?: { autor: string; autorUrl: string; quelle: string };
    leistungen?: Record<string, { autor: string; autorUrl: string; quelle: string }>;
  },

  // ── Branding ───────────────────────────────────────────────────────────────
  farben: {
    primary: "#e30613",
    secondary: "#000000",
    accent: "#b1b2b3",
  },
  // ── Hero ───────────────────────────────────────────────────────────────────
  hero: {
    bild: "https://r2.kuwezu.de/cdn-cgi/image/width=1600,fit=cover,quality=78,format=auto/kunden/268/stock-s15i4k.jpg",
    bildSrcset: "https://r2.kuwezu.de/cdn-cgi/image/width=768,fit=cover,quality=78,format=auto/kunden/268/stock-s15i4k.jpg 768w, https://r2.kuwezu.de/cdn-cgi/image/width=1280,fit=cover,quality=78,format=auto/kunden/268/stock-s15i4k.jpg 1280w, https://r2.kuwezu.de/cdn-cgi/image/width=1920,fit=cover,quality=78,format=auto/kunden/268/stock-s15i4k.jpg 1920w",
    bildSizes: "100vw",
    overlayOpacity: 0.55, /* fix — nie schwächer, nie überschreibbar */
    ueberschrift: "Autowerkstatt — professionell & zuverlässig",
    ueberschriftHighlight: "& zuverlässig",
    ueberschriftLines: ["Autowerkstatt — professionell", "& zuverlässig"],
    untertext: "Ihr Partner für alle Belange rund um Autowerkstatt in Groß-Gerau und Umgebung.",
    ctaPrimary: { text: "Termin vereinbaren", href: "#kontakt" },
    ctaSecondary: { text: "Leistungen ansehen", href: "#leistungen" },
  },

  // ── Über uns ───────────────────────────────────────────────────────────────
  ueberUns: {
    bild: "https://r2.kuwezu.de/cdn-cgi/image/width=1280,fit=cover,quality=78,format=auto/kunden/268/stock-1e8xg8n.jpg",
    bildSrcset: "https://r2.kuwezu.de/cdn-cgi/image/width=640,fit=cover,quality=78,format=auto/kunden/268/stock-1e8xg8n.jpg 640w, https://r2.kuwezu.de/cdn-cgi/image/width=1024,fit=cover,quality=78,format=auto/kunden/268/stock-1e8xg8n.jpg 1024w, https://r2.kuwezu.de/cdn-cgi/image/width=1536,fit=cover,quality=78,format=auto/kunden/268/stock-1e8xg8n.jpg 1536w",
    bildSizes: "(max-width: 1024px) 100vw, 50vw",
    ueberschrift: "Tim's Garage GmbH — Ihr Partner in Groß-Gerau",
    text1: "Als erfahrener Autowerkstatt-Betrieb in Groß-Gerau bieten wir unseren Kunden seit Jahren zuverlässigen Service und kompetente Beratung. Mit Fachkompetenz und modernen Methoden lösen wir Ihre Anliegen effizient und zuverlässig.",
    text2: "Wir setzen auf höchste Qualität, transparente Preise und persönlichen Service — damit Sie rundum zufrieden sind.",
    tags: ["Qualität", "Zuverlässigkeit", "Faire Preise", "Erfahrung"],
    stats: [],
  },

  // ── Leistungen ─────────────────────────────────────────────────────────────
  leistungen: [
    {
      slug: "autoglas",
      title: "Autoglas",
      bild: "https://r2.kuwezu.de/cdn-cgi/image/width=800,fit=cover,quality=78,format=auto/bibliothek/Autoglas/1777829664081-autoglas_reparatur.webp",
      bildSrcset: "https://r2.kuwezu.de/cdn-cgi/image/width=400,fit=cover,quality=78,format=auto/bibliothek/Autoglas/1777829664081-autoglas_reparatur.webp 400w, https://r2.kuwezu.de/cdn-cgi/image/width=800,fit=cover,quality=78,format=auto/bibliothek/Autoglas/1777829664081-autoglas_reparatur.webp 800w",
      description: "Professionelle Autoglas — schnell, zuverlässig und zu fairen Preisen.",
      highlights: ["Qualität", "Zuverlässigkeit", "Faire Preise"],
    },
    {
      slug: "achsvermessung",
      title: "Achsvermessung",
      bild: "https://r2.kuwezu.de/cdn-cgi/image/width=800,fit=cover,quality=78,format=auto/bibliothek/Achsvermessung/1777878369186-leistung_achsvermessung.webp",
      bildSrcset: "https://r2.kuwezu.de/cdn-cgi/image/width=400,fit=cover,quality=78,format=auto/bibliothek/Achsvermessung/1777878369186-leistung_achsvermessung.webp 400w, https://r2.kuwezu.de/cdn-cgi/image/width=800,fit=cover,quality=78,format=auto/bibliothek/Achsvermessung/1777878369186-leistung_achsvermessung.webp 800w",
      description: "Professionelle Achsvermessung — schnell, zuverlässig und zu fairen Preisen.",
      highlights: ["Qualität", "Zuverlässigkeit", "Faire Preise"],
    },
    {
      slug: "elektroautos",
      title: "Elektroautos",
      bild: "https://r2.kuwezu.de/cdn-cgi/image/width=800,fit=cover,quality=78,format=auto/bibliothek/Elektroautos/1777878408924-leistung_elektroautos.webp",
      bildSrcset: "https://r2.kuwezu.de/cdn-cgi/image/width=400,fit=cover,quality=78,format=auto/bibliothek/Elektroautos/1777878408924-leistung_elektroautos.webp 400w, https://r2.kuwezu.de/cdn-cgi/image/width=800,fit=cover,quality=78,format=auto/bibliothek/Elektroautos/1777878408924-leistung_elektroautos.webp 800w",
      description: "Professionelle Elektroautos — schnell, zuverlässig und zu fairen Preisen.",
      highlights: ["Qualität", "Zuverlässigkeit", "Faire Preise"],
    },
    {
      slug: "karosserie",
      title: "Karosserie",
      bild: "https://r2.kuwezu.de/cdn-cgi/image/width=800,fit=cover,quality=78,format=auto/bibliothek/Karosserie/1777878013146-leistung_karosserie.webp",
      bildSrcset: "https://r2.kuwezu.de/cdn-cgi/image/width=400,fit=cover,quality=78,format=auto/bibliothek/Karosserie/1777878013146-leistung_karosserie.webp 400w, https://r2.kuwezu.de/cdn-cgi/image/width=800,fit=cover,quality=78,format=auto/bibliothek/Karosserie/1777878013146-leistung_karosserie.webp 800w",
      description: "Professionelle Karosserie — schnell, zuverlässig und zu fairen Preisen.",
      highlights: ["Qualität", "Zuverlässigkeit", "Faire Preise"],
    }
  ] as { slug: string; title: string; bild: string; bildSrcset: string; description: string; highlights: string[] }[],

  // ── Karriere ───────────────────────────────────────────────────────────────
  // Kundenpflegbar (Stammdaten) bzw. künftig autoservice.jobs-Feed — keine
  // erfundenen Platzhalter-Stellen mehr. jobs: [] → Template blendet
  // "Offene Stellen" aus; enabled: false → ganze Section entfällt.
  karriere: {
    enabled: true as boolean,
    jobs: [

    ] as { title: string; type: string; experience: string }[],
    benefits: null as { title: string; text: string }[] | null,
    // null = In-Page-Anker #kontakt; http(s)-URL öffnet im neuen Tab
    buttonUrl: null as string | null,
    // Öffentlicher autoservice.jobs-Profil-Link (aus Slug) → „Offene Stellen ansehen"
    autoserviceUrl: null as string | null,
    // Karriere-/Team-Bild (Bild-Slot typ="karriere"); null = kein Bild.
    bild: "https://r2.kuwezu.de/cdn-cgi/image/width=1280,fit=cover,quality=78,format=auto/kunden/268/stock-21aaji.jpg" as string | null,
  },

  // ── Öffnungszeiten & Services ──────────────────────────────────────────────
  tuev_termine: false as boolean,
  // Wiederkehrende TÜV-/HU-Termine — leer/null: kein Infoblock auf der Seite
  tuev_slots: null as { day: string; from: string; to: string }[] | null,
  tuev_hinweis: null as string | null,
  oeffnungszeiten: {
    mo_fr: "13:00 – 17:30" as string,
    sa:    "" as string,
    so:    "" as string,
  },
  // Effektive Zeiten je Wochentag (Mo–Fr-Block + Ausnahmen bereits aufgelöst) —
  // Quelle für den "heute geöffnet"-Hinweis im Hero. "" = an dem Tag geschlossen.
  oeffnungszeiten_tage: {
    mo: "13:00 – 17:30", di: "13:00 – 17:30", mi: "13:00 – 17:30", do: "13:00 – 17:30",
    fr: "13:00 – 17:30", sa: "", so: "",
  } as Record<"mo" | "di" | "mi" | "do" | "fr" | "sa" | "so", string>,

  // ── Kontakt ────────────────────────────────────────────────────────────────
  kontakt: {
    oeffnungszeiten: ["Mo–Fr: 13:00 – 17:30"],
  },

  // ── Social Media ───────────────────────────────────────────────────────────
  social: {
    facebook:  null as string | null,
    instagram: null as string | null,
  },

  // ── WhatsApp ───────────────────────────────────────────────────────────────
  whatsapp: "" as string,

  // ── Features ───────────────────────────────────────────────────────────────
  newsEnabled: false as boolean,

  // ── Impressum / Rechtsangaben (Migration 095) ───────────────────────────────
  impressum: {} as {
    inhaber?: string; rechtsform?: string; ust_id?: string; handelsregister?: string;
    registergericht?: string; aufsichtsbehoerde?: string; verantwortlicher?: string;
  },
} as const;

export type LeistungConfig = (typeof client.leistungen)[number];

/**
 * client.ts — Zentrale Konfiguration für das Kundenprojekt.
 *
 * Alle Texte, Bilder und Einstellungen werden hier gepflegt.
 *
 * Bilder-Strategie:
 *   - Echte Bilder kommen direkt von R2 (https://r2.kuwezu.de/bibliothek/...)
 *   - SVG-Platzhalter (lokales /images/...) für Kategorien ohne Foto in R2
 *   - Sobald ein neues Bild hochgeladen ist: URL hier eintragen und fertig.
 */

const R2 = "https://r2.kuwezu.de";

export const client = {
  // ── Allgemein ──────────────────────────────────────────────────────────────
  name: "KUWEZU",
  branche: "Kfz-Werkstatt" as string,
  // #8 — optionaler Freitext-Unternehmenszweck; ersetzt kundenseitig die Branche
  // in Hero-Badge/Footer/Aktuelles. null = Fallback auf branche.
  unternehmenszweck: null as string | null,
  ort: "Warendorf" as string,
  slogan: "Professionelle Kfz-Werkstatt die Sie verdienen",
  adresse: "Bernhardstraße 4c, 48231 Warendorf",
  // Google-Maps-Link für die Footer-Adresse. Wird beim Generieren zentral gesetzt
  // (kunde.maps_url oder Google-Maps-Suche aus der Adresse); null = kein Link.
  maps_url: "https://www.google.com/maps/search/?api=1&query=Bernhardstra%C3%9Fe%204c%2C%2048231%20Warendorf" as string | null,
  telefon: "0176 21575303",
  // Platzhalter — wird beim Generieren durch die echten Werkstattdaten ersetzt.
  // NIE die Plattform-Adresse (info@kuwezu.de) als Default: sie darf auf keiner
  // Kundenseite (v.a. im Impressum) auftauchen.
  email: "info@musterwerkstatt.de",
  website: "https://www.kuwezu.de",
  logo: null,
  standort_bild: null,
  // Foto-Attribution (Unsplash/Pexels) → Footer-Hinweis. Vom Generator befüllt.
  bildAttributionen: {},

  // ── Öffnungszeiten & Services ──────────────────────────────────────────────
  tuev_termine: true as boolean,
  // Wiederkehrende TÜV-/HU-Termine — leer/null: kein Infoblock im Kontaktbereich
  tuev_slots: [
    { day: "di", from: "08:00", to: "16:00" },
    { day: "do", from: "08:00", to: "12:00" },
  ] as { day: string; from: string; to: string }[] | null,
  tuev_hinweis: "Nur nach Terminvereinbarung." as string | null,
  oeffnungszeiten: {
    mo_fr: "08:00 – 18:00" as string,
    sa:    "09:00 – 13:00" as string,
    so:    "" as string,
  },

  // ── Hero ───────────────────────────────────────────────────────────────────
  hero: {
    bild: "/images/hero.svg",
    overlayOpacity: 0.55,
    ueberschrift: "Professionelle Kfz-Reparatur",
    ueberschriftHighlight: "die Sie verdienen",
    ueberschriftLines: ["Professionelle Kfz-Reparatur", "die Sie verdienen"],
    untertext:
      "Von der Inspektion bis zur Unfallreparatur — wir kümmern uns um Ihr Fahrzeug mit modernster Technik und über 20 Jahren Erfahrung.",
    ctaPrimary: { text: "Termin vereinbaren", href: "#kontakt" },
    ctaSecondary: { text: "Leistungen ansehen", href: "#leistungen" },
  },

  // ── Über uns ───────────────────────────────────────────────────────────────
  ueberUns: {
    bild: "/images/ueber-uns.svg",
    ueberschrift: "Ihre Werkstatt — Ihr Vertrauen",
    text1:
      "Seit über 20 Jahren sind wir Ihr zuverlässiger Partner rund ums Fahrzeug. Unser Team aus ausgebildeten Kfz-Meistern und Fachkräften arbeitet täglich daran, Ihnen den besten Service zu bieten.",
    text2:
      "Wir setzen auf modernste Diagnosetechnik, hochwertige Markenteile und transparente Kostenvoranschläge — damit Sie immer wissen, was Sie erwartet.",
    tags: ["Meisterbetrieb", "Alle Marken", "Kostenloser Kostenvoranschlag", "Hol- & Bringservice"],
    stats: [
      { value: "20+",    label: "Jahre Erfahrung"      },
      { value: "5.000+", label: "Zufriedene Kunden"    },
      { value: "12",     label: "Fachkräfte"            },
      { value: "15.000+",label: "Reparaturen/Jahr"     },
    ],
  },

  // ── Leistungen ─────────────────────────────────────────────────────────────
  leistungen: [
    {
      slug: "lackierung",
      title: "Lackierung",
      bild: `${R2}/bibliothek/Lackierung/1777808096660-leistung_lackierung.png`,
      description:
        "Professionelle Fahrzeuglackierungen in Originallack-Qualität — vom Spot-Repair bis zur Komplett-Lackierung.",
      highlights: ["Originallack-Farbanpassung", "Klarlack-Versiegelung", "Spot-Repair möglich"],
    },
    {
      slug: "karosserie",
      title: "Karosserie",
      bild: `${R2}/bibliothek/Karosserie/1777808101772-leistung_karosserie.jpeg`,
      description:
        "Richtraumarbeiten, Blechreparaturen und Karosseriearbeiten nach Unfall oder Hagelschaden.",
      highlights: ["Richtrahmen-Technologie", "Schweißarbeiten", "Kotflügel & Türen"],
    },
    {
      slug: "reifenwechsel",
      title: "Reifenwechsel",
      bild: `${R2}/bibliothek/Reifenwechsel/1777808539901-auto_reifen_wechsel_15_11zon.webp`,
      description:
        "Sommer-, Winter- und Ganzjahresreifen — inklusive Einlagerung und RDKS-Programmierung.",
      highlights: ["Alle Reifengrößen", "RDKS-Service", "Reifeneinlagerung"],
    },
    {
      slug: "inspektion",
      title: "Inspektion",
      bild: `${R2}/bibliothek/Inspektion/1777808114491-leistung_inspektion.jpg`,
      description:
        "Herstellerkonforme Inspektionen für alle Fabrikate — ohne Garantieverlust.",
      highlights: ["Alle Marken", "Originalteile", "Digitales Serviceheft"],
    },
    {
      slug: "hu-au",
      title: "HU / AU",
      bild: `${R2}/bibliothek/HU/AU/1777808071378-leistung_tu_v.png`,
      description:
        "Hauptuntersuchung und Abgasuntersuchung direkt bei uns — schnell und ohne lange Wartezeit.",
      highlights: ["TÜV & DEKRA Partner", "Mängelbeseitigung", "Express-Termin"],
    },
    {
      slug: "autoglas",
      title: "Autoglas",
      bild: `${R2}/bibliothek/Autoglas/1777808080567-autoglas_reparatur.png`,
      description:
        "Steinschlagreparatur, Windschutzscheibenwechsel und Kalibrierung von Fahrerassistenzsystemen.",
      highlights: ["Steinschlagreparatur", "ADAS-Kalibrierung", "Versicherungsabrechnung"],
    },
    {
      slug: "smart-repair",
      title: "Smart Repair",
      bild: "/images/leistungen/smart-repair.svg",
      description:
        "Kleine Dellen, Kratzer und Lackschäden wirtschaftlich und schnell reparieren.",
      highlights: ["Delle ohne Lackierung", "Lackkratzer-Politur", "Felgenaufbereitung"],
    },
    {
      slug: "klimaservice",
      title: "Klimaservice",
      bild: `${R2}/bibliothek/Klimaservice/1777808061957-leistung_klimaanlage.png`,
      description:
        "Klimaanlagen-Wartung, Desinfektion und Kältemittel-Befüllung nach aktuellen Standards.",
      highlights: ["R134a & R1234yf", "Desinfektion", "Lecksuche"],
    },
    {
      slug: "leasingrueckgabe",
      title: "Leasingrückgabe",
      bild: "/images/leistungen/leasingrueckgabe.svg",
      description:
        "Professionelle Aufbereitung und Reparatur vor der Fahrzeugrückgabe — stressfrei und transparent.",
      highlights: ["Zustandsbericht", "Vollaufbereitung", "Rückgabe-Begleitung"],
    },
    {
      slug: "hagelschaden",
      title: "Hagelschaden",
      bild: "/images/leistungen/hagelschaden.svg",
      description:
        "Schnelle und spurslose Hagelschadenreparatur durch PDR-Technologie ohne Lackierung.",
      highlights: ["PDR-Technik", "Versicherungsservice", "Leifahrzeug möglich"],
    },
    {
      slug: "unfallreparatur",
      title: "Unfallreparatur",
      bild: `${R2}/bibliothek/Unfallreparatur/1777808421144-leistungen_unfallinstandsetzung.webp`,
      description:
        "Komplette Unfallabwicklung — von der Schadensbegutachtung bis zur Fahrzeugabholung.",
      highlights: ["Direktabrechnung", "Mietwagen-Service", "Wertgutachten"],
    },
  ],

  // ── Karriere ───────────────────────────────────────────────────────────────
  // enabled: false blendet die ganze Section (inkl. Nav-/Footer-Link) aus;
  // jobs: [] blendet nur "Offene Stellen" aus; benefits: null = neutrale
  // Default-Kacheln (überschreibbar mit [{title, text}]).
  karriere: {
    enabled: true as boolean,
    benefits: null as { title: string; text: string }[] | null,
    // null = In-Page-Anker #kontakt; http(s)-URL öffnet im neuen Tab
    buttonUrl: null as string | null,
    // Öffentliches autoservice.jobs-Profil (aus Slug) → „Offene Stellen ansehen"
    autoserviceUrl: null as string | null,
    // Optionales Karriere-/Team-Bild (Bild-Slot typ="karriere"); null = kein Bild.
    bild: null as string | null,
    jobs: [
      { title: "Kfz-Mechatroniker / -in",              type: "Vollzeit",            experience: "Berufserfahrung erwünscht"  },
      { title: "Kfz-Lackierer / -in",                  type: "Vollzeit",            experience: "Berufseinsteiger willkommen" },
      { title: "Karosseriebauer / -in",                 type: "Vollzeit / Teilzeit", experience: "Berufserfahrung erwünscht"  },
      { title: "Auszubildende / -r Kfz-Mechatronik",   type: "Ausbildung",          experience: "Schulabschluss erforderlich" },
    ],
  },

  // Geokoordinaten (optional) → cookie-freie OSM-Karte im Kontakt; null = Adress-Box.
  geo: null as { lat: number; lon: number } | null,

  // ── Kontakt ────────────────────────────────────────────────────────────────
  kontakt: {
    oeffnungszeiten: ["Mo–Fr: 08:00 – 18:00", "Sa: 09:00 – 13:00"],
  },

  // ── Social Media ───────────────────────────────────────────────────────────
  social: {
    facebook:  null as string | null,
    instagram: null as string | null,
  },

  // ── WhatsApp ───────────────────────────────────────────────────────────────
  whatsapp: "" as string,

  // ── Features ───────────────────────────────────────────────────────────────
  newsEnabled: true as boolean,

  // ── Impressum / Rechtsangaben (Migration 095; leere Felder = weglassen) ──────
  // Beispieldaten = KUWEZU Werbeagentur GbR (Betreiber des Templates).
  impressum: {
    inhaber: "Sven Sickmann & David Aundrup",
    rechtsform: "Gesellschaft bürgerlichen Rechts (GbR)",
    ust_id: "DE456178409",
    verantwortlicher: "Sven Sickmann, Bernhardstraße 4c, 48231 Warendorf",
  } as {
    inhaber?: string; rechtsform?: string; ust_id?: string; handelsregister?: string;
    registergericht?: string; aufsichtsbehoerde?: string; verantwortlicher?: string;
  },
} as const;

export type LeistungConfig = (typeof client.leistungen)[number];

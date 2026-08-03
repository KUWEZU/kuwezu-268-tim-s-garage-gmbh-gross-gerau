import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { CookieBanner } from "@/components/CookieBanner";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Cookie-Consent-Banner standardmäßig AUS (§ 25 TDDDG greift nicht: keine
// nicht-notwendigen Cookies, kein Dritt-Tracking, lokale Schriften, keine Cookie-Embeds).
// REAKTIVIEREN, sobald ein einwilligungspflichtiges Feature eingebaut wird (echtes
// Google-Maps-iframe, Analytics, Meta-Pixel, reCAPTCHA): auf true setzen — Banner
// erscheint wieder und das Feature MUSS bis zur Einwilligung geblockt bleiben (Opt-in).
const COOKIE_CONSENT_REQUIRED: boolean = false;

export const metadata: Metadata = {
  title: "KUWEZU | Professionelle Kfz-Werkstatt",
  description: "Ihre Kfz-Werkstatt für alle Leistungen. Qualität und Transparenz.",
  openGraph: {
    title: "KUWEZU | Professionelle Kfz-Werkstatt",
    description: "Ihre zuverlässige Kfz-Werkstatt.",
    type: "website",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "KUWEZU | Professionelle Kfz-Werkstatt",
    description: "Ihre zuverlässige Kfz-Werkstatt.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${geistSans.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-brand-bg text-brand-text antialiased">
        <a href="#main-content" className="skip-link">
          Zum Hauptinhalt springen
        </a>
        {children}
        <AccessibilityWidget />
        {COOKIE_CONSENT_REQUIRED && <CookieBanner />}
        <WhatsAppButton />
      </body>
    </html>
  );
}

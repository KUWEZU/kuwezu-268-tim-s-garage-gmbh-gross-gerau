import type { Metadata } from "next";
import { client } from "@/data/client";
import { LegalShell, LegalSection } from "@/components/LegalShell";

export const metadata: Metadata = { title: `Barrierefreiheit | ${client.name}`, robots: { index: false } };

// HINWEIS: Recherchierter Standard-Entwurf zum Barrierefreiheitsstärkungsgesetz
// (BFSG, in Kraft seit 28.06.2025). MUSS vor dem Live-Gang geprüft und an den
// tatsächlichen Konformitätsstand angepasst werden. Prüfen Sie insbesondere, ob
// Ihr Unternehmen unter die Kleinunternehmen-Ausnahme (< 10 Beschäftigte bzw.
// ≤ 2 Mio. € Jahresumsatz/Bilanzsumme) fällt und die Pflicht ggf. entfällt.
export default function BarrierefreiheitPage() {
  return (
    <LegalShell title="Erklärung zur Barrierefreiheit">
      <p className="text-brand-muted">
        Diese Erklärung bezieht sich auf die unter {client.website || "dieser Adresse"} erreichbare
        Website und erfolgt im Hinblick auf das Barrierefreiheitsstärkungsgesetz (BFSG), das die
        EU-Richtlinie 2019/882 umsetzt und seit dem 28. Juni 2025 gilt.
      </p>

      <LegalSection heading="Unser Anspruch">
        <p>
          Wir sind bemüht, unsere Website im Einklang mit den geltenden Vorgaben zur digitalen
          Barrierefreiheit zugänglich zu gestalten. Als Maßstab dienen die Norm EN 301 549 sowie
          die Web Content Accessibility Guidelines (WCAG) 2.1 auf Konformitätsstufe AA.
        </p>
      </LegalSection>

      <LegalSection heading="Stand der Vereinbarkeit">
        <p>
          Diese Website wurde mit Blick auf Barrierefreiheit erstellt – u. a. semantische
          Dokumentstruktur, Tastaturbedienbarkeit, sichtbarer Fokus, Alternativtexte für Bilder
          und ausreichende Farbkontraste. Einzelne Inhalte oder eingebundene Drittinhalte können
          derzeit noch nicht vollständig barrierefrei sein; wir arbeiten kontinuierlich an
          Verbesserungen.
        </p>
      </LegalSection>

      <LegalSection heading="Barrieren melden / Feedback">
        <p className="whitespace-pre-line">
          Sind Ihnen Barrieren aufgefallen, oder benötigen Sie Informationen bzw. Funktionen in
          einer zugänglichen Form? Bitte kontaktieren Sie uns – wir helfen weiter und nehmen Ihr
          Feedback zur Verbesserung auf:
          {client.email ? `\nE-Mail: ${client.email}` : ""}
          {client.telefon ? `\nTelefon: ${client.telefon}` : ""}
        </p>
      </LegalSection>

      <LegalSection heading="Durchsetzungsverfahren">
        <p>
          Sollten wir auf Ihre Rückmeldung nicht zufriedenstellend reagieren, können Sie sich an
          die zuständige Marktüberwachungsbehörde bzw. Schlichtungsstelle nach dem BFSG wenden.
          Informationen hierzu stellt die für Barrierefreiheit zuständige Landes-/Bundesstelle
          bereit.
        </p>
      </LegalSection>
    </LegalShell>
  );
}

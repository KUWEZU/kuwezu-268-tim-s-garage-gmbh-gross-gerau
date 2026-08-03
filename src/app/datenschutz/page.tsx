import type { Metadata } from "next";
import { client } from "@/data/client";
import { LegalShell, LegalSection } from "@/components/LegalShell";

export const metadata: Metadata = { title: `Datenschutzerklärung | ${client.name}`, robots: { index: false } };

// HINWEIS: Sorgfältig recherchierter Standard-Entwurf nach DSGVO Art. 13/14.
// MUSS vor dem Live-Gang juristisch geprüft und an die TATSÄCHLICH eingesetzten
// Dienste (Hosting, Analyse, Karten, Bewertungen, Fonts …) angepasst werden.
export default function DatenschutzPage() {
  const kontakt = [
    client.name,
    client.adresse,
    client.telefon ? `Telefon: ${client.telefon}` : "",
    client.email ? `E-Mail: ${client.email}` : "",
  ].filter(Boolean).join("\n");

  return (
    <LegalShell title="Datenschutzerklärung">
      <p className="text-brand-muted">
        Wir freuen uns über Ihr Interesse. Der Schutz Ihrer personenbezogenen Daten ist uns
        wichtig. Nachfolgend informieren wir Sie gemäß Art. 13 und 14 DSGVO über die Verarbeitung
        personenbezogener Daten bei der Nutzung dieser Website.
      </p>

      <LegalSection heading="1. Verantwortlicher">
        <p className="whitespace-pre-line">{kontakt}</p>
      </LegalSection>

      <LegalSection heading="2. Allgemeines zur Datenverarbeitung">
        <p>
          Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer
          funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist.
          Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. a (Einwilligung), lit. b
          (Vertrag/vorvertragliche Maßnahmen) und lit. f (berechtigtes Interesse) DSGVO.
        </p>
      </LegalSection>

      <LegalSection heading="3. Hosting (Cloudflare)">
        <p>
          Diese Website wird bei der Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107,
          USA) als Auftragsverarbeiter gehostet und über deren globales Netzwerk (Content Delivery
          Network) ausgeliefert. Dabei können technisch notwendige Daten (z. B. IP-Adresse,
          Zugriffszeitpunkt, angeforderte Inhalte) verarbeitet werden, um die sichere und stabile
          Bereitstellung zu gewährleisten (Art. 6 Abs. 1 lit. f DSGVO). Eine Übermittlung in die
          USA erfolgt auf Grundlage der EU-Standardvertragsklauseln bzw. des EU-US Data Privacy
          Framework. Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung (Art. 28 DSGVO).
        </p>
      </LegalSection>

      <LegalSection heading="4. Server-Logfiles">
        <p>
          Beim Aufruf der Website werden automatisch Informationen in Server-Logfiles erfasst
          (Browsertyp/-version, Betriebssystem, Referrer-URL, Zugriffszeitpunkt, IP-Adresse). Diese
          Daten sind technisch erforderlich und dienen der Auslieferung, Stabilität und Sicherheit
          der Website (Art. 6 Abs. 1 lit. f DSGVO). Eine Zusammenführung mit anderen Datenquellen
          erfolgt nicht.
        </p>
      </LegalSection>

      <LegalSection heading="5. Kontaktaufnahme / Kontaktformular">
        <p>
          Bei Kontaktaufnahme per Formular, E-Mail oder Telefon verarbeiten wir Ihre Angaben zur
          Bearbeitung der Anfrage und für Anschlussfragen (Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO).
          Diese Daten werden gelöscht, sobald sie für die Zweckerreichung nicht mehr erforderlich
          sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
        <p>
          Über das Kontaktformular übermittelte Angaben (Name, E-Mail-Adresse, ggf. Telefonnummer
          und Ihre Nachricht) speichern wir zur Bearbeitung und Nachverfolgung zusätzlich in unserem
          Kunden- bzw. Kontaktverwaltungssystem (CRM). Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw.
          lit. f DSGVO (Bearbeitung Ihrer Anfrage bzw. berechtigtes Interesse an einer geordneten
          Kundenkommunikation). Diese Daten löschen wir, sobald sie für die Zweckerreichung nicht mehr
          erforderlich sind – regelmäßig spätestens nach Ablauf etwaiger gesetzlicher Aufbewahrungs-
          fristen. Sie können jederzeit Auskunft, Berichtigung oder Löschung verlangen.
        </p>
      </LegalSection>

      <LegalSection heading="6. Cookies & Einwilligung">
        <p>
          Wir setzen technisch notwendige Cookies ein. Für nicht notwendige Cookies bzw. Dienste
          holen wir Ihre Einwilligung über den Cookie-Hinweis ein (Art. 6 Abs. 1 lit. a DSGVO). Sie
          können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.
        </p>
      </LegalSection>

      <LegalSection heading="7. Google-Bewertungen / Kartendarstellung">
        <p>
          Soweit auf der Website Bewertungen bzw. ein Link zum Google-Unternehmensprofil dargestellt
          werden, erfolgt dies zur Information der Nutzer. Beim Aufruf externer Google-Dienste (z. B.
          Google Maps) kann Google personenbezogene Daten verarbeiten; es gelten die
          Datenschutzhinweise der Google Ireland Ltd. Bitte an die tatsächlich eingebundenen Dienste
          anpassen.
        </p>
      </LegalSection>

      <LegalSection heading="8. SSL-/TLS-Verschlüsselung">
        <p>
          Diese Website nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Eine
          verschlüsselte Verbindung erkennen Sie am „https://" in der Adresszeile Ihres Browsers.
        </p>
      </LegalSection>

      <LegalSection heading="9. Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
          Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch
          gegen die Verarbeitung (Art. 21 DSGVO). Eine erteilte Einwilligung können Sie jederzeit
          widerrufen (Art. 7 Abs. 3 DSGVO). Zur Ausübung wenden Sie sich an die oben genannten
          Kontaktdaten.
        </p>
      </LegalSection>

      <LegalSection heading="10. Beschwerderecht bei der Aufsichtsbehörde">
        <p>
          Unbeschadet anderweitiger Rechtsbehelfe steht Ihnen ein Beschwerderecht bei einer
          Datenschutz-Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts,
          Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes (Art. 77 DSGVO).
        </p>
      </LegalSection>
    </LegalShell>
  );
}

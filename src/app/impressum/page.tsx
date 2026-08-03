import type { Metadata } from "next";
import { client } from "@/data/client";
import { LegalShell, LegalSection } from "@/components/LegalShell";
import { publicEmail } from "@/lib/contact";

export const metadata: Metadata = { title: `Impressum | ${client.name}`, robots: { index: false } };

// ── Bildnachweis (Unsplash/Pexels verlangen eine Herkunftsangabe) ──────────────
type FotoAttr = { autor: string; autorUrl: string; quelle: string };
const QUELLE_META: Record<string, { label: string; href: string }> = {
  unsplash: { label: "Unsplash", href: "https://unsplash.com" },
  pexels:   { label: "Pexels",   href: "https://www.pexels.com" },
};

// HINWEIS: Diese Angaben sind ein Startpunkt und MÜSSEN vor dem Live-Gang
// juristisch geprüft werden (Pflichtangaben §5 DDG, §18 Abs.2 MStV).
export default function ImpressumPage() {
  const imp = (client as unknown as { impressum?: Record<string, string | undefined> }).impressum ?? {};
  const verantwortlicher = imp.verantwortlicher || `${client.name}, ${client.adresse}`;
  // Die Plattform-Adresse darf NIE als Werkstatt-Kontakt im Impressum stehen
  // (§5 DDG verlangt die echten Kontaktdaten des Anbieters). Zentral in publicEmail().
  const kontaktEmail = publicEmail(client.email);
  // Rechtsform NICHT doppelt ausgeben, wenn der Firmenname sie bereits enthält
  // (z.B. Name "… GmbH" + separate Rechtsform-Zeile "GmbH").
  const showRechtsform =
    !!imp.rechtsform && !client.name.toLowerCase().includes(imp.rechtsform.toLowerCase());

  // Genutzte Stock-Foto-Quellen aus den Bild-Metadaten aggregieren.
  const attributionen = (client as { bildAttributionen?: {
    hero?: FotoAttr; ueberUns?: FotoAttr; standort?: FotoAttr; karriere?: FotoAttr;
    leistungen?: Record<string, FotoAttr>;
  } }).bildAttributionen ?? {};
  const fotoQuellen = new Set<string>();
  for (const a of [attributionen.hero, attributionen.ueberUns, attributionen.standort, attributionen.karriere]) {
    if (a?.quelle) fotoQuellen.add(a.quelle);
  }
  for (const a of Object.values(attributionen.leistungen ?? {})) {
    if (a?.quelle) fotoQuellen.add(a.quelle);
  }

  return (
    <LegalShell title="Impressum">
      <LegalSection heading="Angaben gemäß § 5 DDG">
        <p className="whitespace-pre-line">
          {client.name}
          {showRechtsform ? `\n${imp.rechtsform}` : ""}
          {client.adresse ? `\n${client.adresse}` : ""}
        </p>
        {imp.inhaber && <p className="mt-2">Vertreten durch: {imp.inhaber}</p>}
      </LegalSection>

      <LegalSection heading="Kontakt">
        <p>
          {client.telefon && <>Telefon: {client.telefon}<br /></>}
          {kontaktEmail && <>E-Mail: {kontaktEmail}</>}
        </p>
      </LegalSection>

      {(imp.ust_id || imp.w_idnr || imp.handelsregister || imp.aufsichtsbehoerde) && (
        <LegalSection heading="Weitere Angaben">
          {imp.handelsregister && (
            <p>Registereintrag: {imp.handelsregister}{imp.registergericht ? `, ${imp.registergericht}` : ""}</p>
          )}
          {imp.ust_id && (
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: {imp.ust_id}</p>
          )}
          {imp.w_idnr && (
            <p>Wirtschafts-Identifikationsnummer gemäß § 139c AO: {imp.w_idnr}</p>
          )}
          {imp.aufsichtsbehoerde && <p>Zuständige Aufsichtsbehörde: {imp.aufsichtsbehoerde}</p>}
        </LegalSection>
      )}

      <LegalSection heading="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p className="whitespace-pre-line">{verantwortlicher}</p>
      </LegalSection>

      <LegalSection heading="Verbraucherstreitbeilegung">
        <p>
          Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </LegalSection>

      <LegalSection heading="Haftung für Inhalte">
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
          nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
          Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        </p>
      </LegalSection>

      <LegalSection heading="Haftung für Links">
        <p>
          Unser Angebot enthält ggf. Links zu externen Websites Dritter, auf deren Inhalte wir
          keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
          übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
          Betreiber der Seiten verantwortlich.
        </p>
      </LegalSection>

      <LegalSection heading="Urheberrecht">
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
          dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die
          Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
          bzw. Erstellers.
        </p>
      </LegalSection>

      {fotoQuellen.size > 0 && (
        <LegalSection heading="Bildnachweis">
          <p>
            Verwendete Stockfotos stammen von{" "}
            {[...fotoQuellen].map((q, i) => {
              const m = QUELLE_META[q] ?? { label: q, href: "#" };
              return (
                <span key={q}>
                  {i > 0 && ", "}
                  <a href={m.href} target="_blank" rel="noopener noreferrer nofollow" className="underline">
                    {m.label}
                  </a>
                </span>
              );
            })}
            .
          </p>
        </LegalSection>
      )}
    </LegalShell>
  );
}

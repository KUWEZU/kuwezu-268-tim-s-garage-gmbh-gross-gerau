import { SafeImage } from "@/components/SafeImage";
import { client, type LeistungConfig } from "@/data/client";

export function Leistungen() {
  // Keine Leistungen ausgewählt → Sektion komplett ausblenden (statt leerer
  // "LEISTUNGEN"-Überschrift ohne Inhalt). Cast auf Array, weil TS aus dem
  // Literal-Array der Default-client.ts sonst eine feste Tuple-Länge ableitet
  // und `.length === 0` als „no overlap" ablehnt.
  if ((client.leistungen as readonly unknown[]).length === 0) return null;
  return (
    <section
      id="leistungen"
      className="py-28"
      style={{ backgroundColor: "var(--color-section-alt)" }}
      aria-labelledby="leistungen-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-icon-surface border border-icon-ring mb-6">
            <span className="text-safe-primary text-sm font-semibold uppercase tracking-wider">Leistungen</span>
          </div>
          <h2 id="leistungen-heading" className="text-4xl sm:text-5xl font-black text-brand-heading mb-5">
            Alles aus einer Hand
          </h2>
          <p className="max-w-2xl mx-auto text-brand-muted text-lg leading-relaxed">
            Wir bieten das komplette Spektrum — professionell, transparent und zu fairen Preisen.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Leistungsübersicht">
          {client.leistungen.map((leistung) => (
            <li key={leistung.slug}>
              <LeistungCard leistung={leistung} />
            </li>
          ))}
        </ul>

        <div className="text-center mt-14">
          <p className="text-brand-muted text-lg mb-5">Ihr Anliegen ist nicht dabei?</p>
          <a href="#kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-on-primary font-semibold
                       rounded-xl hover:bg-brand-primary-hover transition-all text-lg min-h-[52px]
                       shadow-xl shadow-brand-primary/20">
            Sprechen Sie uns an
          </a>
        </div>
      </div>
    </section>
  );
}

function LeistungCard({ leistung }: { leistung: LeistungConfig }) {
  return (
    <article
      className="h-full flex flex-col border border-brand-border rounded-2xl overflow-hidden
                 transition-all duration-200 hover:-translate-y-1 hover:border-icon-ring group"
      style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}
    >
      {leistung.bild ? (
        <div className="relative w-full aspect-video overflow-hidden">
          <SafeImage src={leistung.bild} alt={leistung.title} fill
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            unoptimized={leistung.bild.endsWith(".svg")} />
        </div>
      ) : (
        // Ohne Bild: dezente Farbfläche als Platzhalter — bewusst OHNE Icon.
        <div className="w-full aspect-video border-b border-brand-border relative overflow-hidden"
          style={{ backgroundColor: "var(--color-section-alt)" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-primary/5 pointer-events-none" />
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-lg font-bold text-brand-heading mb-4">{leistung.title}</h3>

        <p className="text-base text-brand-muted leading-relaxed mb-5 flex-1">{leistung.description}</p>

        <ul className="space-y-2" aria-label={`Highlights ${leistung.title}`}>
          {leistung.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2.5 text-base text-brand-text/60">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

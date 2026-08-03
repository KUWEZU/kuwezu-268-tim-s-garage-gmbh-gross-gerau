import fs from "fs";
import path from "path";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { client } from "@/data/client";

type NewsItem = {
  slug: string;
  titel: string;
  intro: string;
  text: string;
  datum: string;
};

function getNewsItems(): NewsItem[] {
  const newsDir = path.join(process.cwd(), "content/news");
  if (!fs.existsSync(newsDir)) return [];
  return fs
    .readdirSync(newsDir)
    .filter((f) => f.endsWith(".json"))
    .flatMap((f) => {
      try {
        const raw = fs.readFileSync(path.join(newsDir, f), "utf-8").trim();
        if (!raw) return [];
        return [JSON.parse(raw) as NewsItem];
      } catch {
        return []; // leere oder ungültige JSON-Datei überspringen
      }
    })
    .sort((a, b) => b.datum.localeCompare(a.datum)); // newest first
}

export default function AktuellesPage() {
  const items = getNewsItems();
  const empty = !client.newsEnabled || items.length === 0;

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>

        <section
          className="py-28 pt-48"
          style={{ backgroundColor: "var(--color-page-bg)" }}
          aria-labelledby="aktuelles-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            {/* Section badge + heading */}
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/25 mb-6">
                <span className="text-safe-primary text-sm font-semibold uppercase tracking-wider">Aktuelles</span>
              </div>
              <h1
                id="aktuelles-heading"
                className="text-4xl sm:text-5xl font-black text-brand-heading mb-5"
              >
                Neuigkeiten & Tipps
              </h1>
              <p className="text-brand-muted text-lg leading-relaxed max-w-2xl">
                Aktuelles rund um {(client as { unternehmenszweck?: string | null }).unternehmenszweck ?? client.branche} in {client.ort} — Tipps, Termine und Neuigkeiten aus unserem Betrieb.
              </p>
            </div>

            {/* Articles */}
            {empty ? (
              <div
                className="border border-brand-border rounded-2xl p-10 text-center"
                style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}
              >
                <p className="text-brand-muted text-lg">Aktuell sind keine Beiträge vorhanden.</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-6" role="list">
                {items.map((item) => (
                  <li key={item.slug}>
                    <article
                      id={`artikel-${item.slug}`}
                      className="border border-brand-border rounded-2xl overflow-hidden transition-colors hover:border-brand-primary/40"
                      style={{ backgroundColor: "var(--color-card-bg)", boxShadow: "var(--card-shadow)" }}
                    >
                      <div className="p-6 sm:p-8">
                        <time
                          dateTime={item.datum}
                          className="text-xs font-semibold text-safe-secondary uppercase tracking-wider mb-3 block"
                        >
                          {new Date(item.datum).toLocaleDateString("de-DE", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                        <h2 className="text-2xl font-bold text-brand-heading mb-3 leading-snug">
                          {item.titel}
                        </h2>
                        <p className="text-brand-muted leading-relaxed mb-4">
                          {item.intro}
                        </p>
                        {/* Full article text — expandable via native <details>, no JS required */}
                        <details className="group">
                          <summary className="inline-flex items-center gap-1.5 text-sm font-semibold text-safe-primary cursor-pointer list-none select-none hover:opacity-75 transition-opacity [&::-webkit-details-marker]:hidden">
                            <span className="group-open:hidden">Weiterlesen →</span>
                            <span className="hidden group-open:inline">Weniger anzeigen ↑</span>
                          </summary>
                          <div className="mt-5 pt-5 border-t border-brand-border text-brand-text leading-relaxed whitespace-pre-wrap">
                            {item.text}
                          </div>
                        </details>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

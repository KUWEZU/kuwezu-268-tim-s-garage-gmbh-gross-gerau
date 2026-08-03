import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/** Gemeinsames Layout für die Rechtsseiten (Impressum/Datenschutz/Barrierefreiheit). */
export function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="pt-32 pb-24 min-h-screen"
        style={{ backgroundColor: "var(--color-section-alt)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-black text-brand-heading mb-8">{title}</h1>
          <div className="space-y-5 text-[15px] leading-relaxed text-brand-text/85">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/** Abschnittsüberschrift innerhalb einer Rechtsseite. */
export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="pt-4">
      <h2 className="text-lg font-bold text-brand-heading mb-2">{heading}</h2>
      {children}
    </section>
  );
}

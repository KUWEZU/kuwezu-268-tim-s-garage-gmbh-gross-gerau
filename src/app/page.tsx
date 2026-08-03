import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { UeberUns } from "@/components/sections/UeberUns";
import { Leistungen } from "@/components/sections/Leistungen";
import { Karriere } from "@/components/sections/Karriere";
import { Kontakt } from "@/components/sections/Kontakt";
import { Footer } from "@/components/Footer";
import { buildBusinessJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      {/* Strukturierte Daten (LocalBusiness/AutoRepair) für Suchmaschinen */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBusinessJsonLd()) }}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <UeberUns />
        <Leistungen />
        <Karriere />
        <Kontakt />
      </main>
      <Footer />
    </>
  );
}

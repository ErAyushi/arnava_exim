import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  FileCheck2,
  FileText,
  Inbox,
  PackageCheck,
  Ship,
  SlidersHorizontal,
} from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { Eyebrow, Reveal } from "@/components/Reveal";
import { IMAGES } from "@/data/site";

const STEPS = [
  { icon: Inbox, title: "Buyer Inquiry", text: "Send your requirement through the inquiry form, email or WhatsApp — product, quantity, destination and timeline." },
  { icon: SlidersHorizontal, title: "Requirement & Specification Confirmation", text: "We confirm purity, mesh, packaging, documentation and any destination-specific requirements with you." },
  { icon: FileText, title: "Quotation", text: "You receive a clear quotation against your confirmed specification — price, quantity, incoterm and validity." },
  { icon: FileCheck2, title: "Sample / Documentation Coordination", text: "Samples and documentation are coordinated as required before order confirmation." },
  { icon: PackageCheck, title: "Order & Production / Sourcing", text: "Your order is confirmed and product is sourced and prepared against the agreed specification." },
  { icon: Ship, title: "Shipment & Export Documentation", text: "Cargo is dispatched with export documentation coordinated for your destination country." },
];

export default function ExportProcess() {
  return (
    <>
      <Seo
        title="Export Process | Arnava Exim — Psyllium Husk Exporter India"
        description="How exporting with Arnava Exim works: buyer inquiry, specification confirmation, quotation, sample and documentation coordination, order, shipment and export documentation."
      />
      <PageHero
        eyebrow="Export Process"
        title="From inquiry to shipment, in six clear steps."
        description="A transparent export process designed for international B2B buyers — no surprises, no guesswork."
        image={IMAGES.vessel}
      />

      <section className="bg-white py-24" data-testid="export-process-section">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <Eyebrow>How It Works</Eyebrow>
            <h2 className="mt-4 max-w-2xl font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
              A process your procurement team will appreciate.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div
                  data-testid={`export-step-${i + 1}`}
                  className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-navy/5"
                >
                  <span className="pointer-events-none absolute -right-3 -top-6 font-mono text-[88px] font-semibold leading-none text-navy/[0.05] transition-colors duration-300 group-hover:text-emerald-500/10">
                    0{i + 1}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-emerald-400 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="mt-5 block font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-600">
                    Step 0{i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-16 flex flex-col items-start justify-between gap-8 rounded-2xl bg-navy p-10 grain relative overflow-hidden sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  Step one takes two minutes.
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-300">
                  Send your inquiry with product, quantity and destination — our
                  export team will take it from there.
                </p>
              </div>
              <Link
                to="/contact"
                data-testid="export-cta-inquiry-button"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-navy-950 transition-colors duration-300 hover:bg-white"
              >
                Send an Inquiry
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

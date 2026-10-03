import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ClipboardList,
  FileSearch,
  Microscope,
  Package,
  Search,
  Ship,
} from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { Eyebrow, Reveal } from "@/components/Reveal";
import { IMAGES } from "@/data/site";

const STEPS = [
  { icon: ClipboardList, title: "Buyer Requirement", text: "Everything starts with your specification — product, purity, mesh, quantity, packaging and documentation needs." },
  { icon: Search, title: "Product Sourcing", text: "We source from trusted supply partners in India's psyllium region, matched to your requirement." },
  { icon: FileSearch, title: "Specification Confirmation", text: "The specification sheet is shared and confirmed with you before anything moves forward." },
  { icon: Microscope, title: "Quality / Documentation Review", text: "Product quality and documentation are reviewed against the agreed specification and destination requirements." },
  { icon: Package, title: "Packaging & Shipment Coordination", text: "Packaging as per buyer requirement, with shipment and logistics coordinated end to end." },
  { icon: Ship, title: "International Delivery", text: "Export documentation finalized and cargo dispatched to your destination port." },
];

export default function Quality() {
  return (
    <>
      <Seo
        title="Quality & Sourcing | Arnava Exim — Indian Psyllium Supplier"
        description="Arnava Exim's quality-focused sourcing approach: from buyer requirement and product sourcing to specification confirmation, documentation review and international delivery."
      />
      <PageHero
        eyebrow="Quality & Sourcing"
        title="Sourcing with discipline, not slogans."
        description="A clear, buyer-first sourcing process — so you always know what you are getting before it ships."
        image={IMAGES.microscope}
      />

      <section className="bg-white py-24" data-testid="quality-process-section">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div>
              <Reveal>
                <Eyebrow>Our Approach</Eyebrow>
                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
                  Six steps from requirement to delivery.
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600">
                  Documentation and certifications are provided according to the
                  product, supplier, destination country and buyer requirements —
                  and confirmed with you before order finalization.
                </p>
              </Reveal>
              <div className="mt-12">
                {STEPS.map((s, i) => (
                  <Reveal key={s.title} delay={i * 0.05}>
                    <div data-testid={`quality-timeline-step-${i + 1}`} className="group relative flex gap-6 pb-10 last:pb-0">
                      {i < STEPS.length - 1 && (
                        <span className="absolute left-[26px] top-14 h-[calc(100%-3.5rem)] w-px bg-slate-200" />
                      )}
                      <span className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white transition-colors duration-300 group-hover:border-emerald-500 group-hover:bg-emerald-50">
                        <s.icon className="h-5 w-5 text-navy transition-colors duration-300 group-hover:text-emerald-600" />
                      </span>
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-600">
                          Step 0{i + 1}
                        </span>
                        <h3 className="mt-1 font-display text-lg font-bold text-navy">{s.title}</h3>
                        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-slate-600">{s.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="space-y-4 lg:sticky lg:top-28">
              <Reveal delay={0.1}>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={IMAGES.lab}
                    alt="Laboratory quality inspection of food-grade agricultural products"
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={IMAGES.qualityControl}
                    alt="Quality control review before export shipment"
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                  <h3 className="font-display text-base font-bold text-emerald-900">
                    An honest note on documentation
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-900/80">
                    We do not list certifications we cannot provide for the relevant
                    product. Tell us your destination country and documentation
                    requirements, and we will confirm exactly what is available
                    before you commit.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-navy p-10 grain relative overflow-hidden sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  Have a specification sheet ready?
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-300">
                  Send it with your inquiry — we will confirm availability and a
                  quotation against your exact requirement.
                </p>
              </div>
              <Link
                to="/contact"
                data-testid="quality-cta-inquiry-button"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-navy-950 transition-colors duration-300 hover:bg-white"
              >
                Share Your Requirement
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

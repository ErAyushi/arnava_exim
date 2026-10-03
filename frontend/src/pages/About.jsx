import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BadgeCheck,
  ClipboardList,
  FileCheck2,
  Globe2,
  MessagesSquare,
  PackageCheck,
  Search,
} from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { Eyebrow, Reveal } from "@/components/Reveal";
import { IMAGES, SITE } from "@/data/site";

const FOCUS = [
  { icon: Search, title: "Professional Sourcing", text: "Products sourced through trusted supply partners, matched to buyer requirements." },
  { icon: ClipboardList, title: "Buyer-Specific Requirements", text: "Purity, mesh, packaging and documentation shaped around your specification." },
  { icon: PackageCheck, title: "Quality-Focused Supply", text: "Product and documentation review before dispatch, on every order." },
  { icon: FileCheck2, title: "Export Documentation Coordination", text: "Documentation coordinated per product, supplier and destination country." },
  { icon: MessagesSquare, title: "International Communication", text: "Clear, structured communication with buyers across time zones." },
  { icon: Globe2, title: "Reliable Shipment Coordination", text: "Shipment and logistics coordination through to international delivery." },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Us | Arnava Exim — Psyllium Husk Exporter, Ahmedabad India"
        description="Arnava Exim is an India-based import-export company from Ahmedabad, Gujarat, specializing in psyllium husk and related psyllium products for international B2B buyers. IEC PLHPS3426M, MSME Registered."
      />
      <PageHero
        eyebrow="About Us"
        title="An India-based export partner for psyllium products."
        description="Arnava Exim connects quality Indian products with international markets — with a focus on professional sourcing, documentation and dependable trade support."
        image={IMAGES.port}
      />

      <section className="bg-white py-24" data-testid="about-story-section">
        <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <Eyebrow>Company Profile</Eyebrow>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Who we are
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-600">
              <p>
                Arnava Exim is an India-based import-export company focused on
                connecting quality Indian products with international markets. We
                specialize in psyllium husk and related psyllium products and work
                with trusted sourcing partners to serve B2B buyers according to
                their product and documentation requirements.
              </p>
              <p>
                Based in Ahmedabad, Gujarat — at the heart of India's psyllium
                growing and processing region — we work with importers,
                distributors, wholesalers and manufacturers who value clear
                communication, honest specifications and professional coordination.
              </p>
              <p>
                We present only what we can stand behind: no inflated claims, no
                invented credentials. Specifications, documentation and
                certifications are shared transparently, as available for the
                relevant product and destination.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={IMAGES.port}
                  alt="Container port — export logistics coordinated by Arnava Exim from India"
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <div className="rounded-2xl bg-navy p-7 grain relative overflow-hidden">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400">
                  Company Information
                </h3>
                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <dt className="text-slate-400">Company</dt>
                    <dd className="font-semibold text-white" data-testid="about-company-name">{SITE.name}</dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <dt className="text-slate-400">Location</dt>
                    <dd className="font-semibold text-white" data-testid="about-company-location">{SITE.location}</dd>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <dt className="text-slate-400">IEC</dt>
                    <dd className="font-mono tracking-widest text-white" data-testid="about-company-iec">{SITE.iec}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-slate-400">Registration</dt>
                    <dd className="flex items-center gap-1.5 font-semibold text-white" data-testid="about-company-msme">
                      <BadgeCheck className="h-4 w-4 text-emerald-400" /> {SITE.msme}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-24" data-testid="about-focus-section">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <Eyebrow>What We Focus On</Eyebrow>
            <h2 className="mt-4 max-w-xl font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
              Six disciplines behind every shipment.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FOCUS.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <div
                  data-testid={`focus-card-${i + 1}`}
                  className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-navy/5"
                >
                  <f.icon className="h-6 w-6 text-emerald-600" />
                  <h3 className="mt-4 font-display text-lg font-bold text-navy">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20" data-testid="about-cta-section">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-navy p-10 grain relative overflow-hidden sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  Work with an export partner that keeps it honest.
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-300">
                  Share your requirement and we will respond with availability,
                  specifications and a quotation.
                </p>
              </div>
              <Link
                to="/contact"
                data-testid="about-cta-inquiry-button"
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

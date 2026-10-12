import { Link } from "react-router-dom";
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Crosshair,
  FileCheck2,
  Globe2,
  Handshake,
  MapPin,
  MessagesSquare,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import Seo from "@/components/Seo";
import Marquee from "@/components/Marquee";
import MapVisual from "@/components/MapVisual";
import ProductCard from "@/components/ProductCard";
import InquiryForm from "@/components/InquiryForm";
import { Eyebrow, MaskedLine, Reveal } from "@/components/Reveal";
import { useProducts } from "@/hooks/useProducts";
import { IMAGES, SITE } from "@/data/site";

const TRUST = [
  { icon: MapPin, label: "India-based Exporter" },
  { icon: Boxes, label: "B2B Supply" },
  { icon: Globe2, label: "International Trade" },
  { icon: BadgeCheck, label: "Quality-Focused Sourcing" },
];

const QUALITY_STEPS = [
  "Buyer Requirement",
  "Product Sourcing",
  "Specification Confirmation",
  "Quality / Documentation Review",
  "Packaging & Shipment Coordination",
  "International Delivery",
];

const WHY = [
  { icon: Crosshair, title: "Buyer-Focused Sourcing", text: "Every order starts from your specification — we source against your requirement, not the other way around." },
  { icon: SlidersHorizontal, title: "Flexible Specifications", text: "Purity, mesh, packaging and documentation are adapted to what your market and application demand." },
  { icon: ShieldCheck, title: "Quality-Conscious Supply", text: "We work with trusted sourcing partners and review product and documentation quality before dispatch." },
  { icon: MessagesSquare, title: "Professional Communication", text: "Clear, prompt and structured communication across time zones — from first inquiry to final delivery." },
  { icon: FileCheck2, title: "Export Documentation Coordination", text: "Documentation and certifications coordinated per product, supplier, destination country and buyer requirements." },
  { icon: Handshake, title: "Long-Term B2B Relationships", text: "We build for repeat business — consistent specifications, reliable coordination and transparent dealing." },
];

const REGIONS = ["Europe", "Middle East", "Asia-Pacific", "North America"];

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={ref} data-testid="hero-section" className="grain relative flex min-h-screen flex-col overflow-hidden bg-navy">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <motion.img
          src={IMAGES.hero}
          alt="Container cargo ship at an international port — global export logistics from India"
          className="h-full w-full object-cover"
          initial={{ scale: 1.18, opacity: 0.6 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-16 pt-40 lg:px-8">
        <MaskedLine>
          <Eyebrow light>Arnava Exim · Ahmedabad · Gujarat · India</Eyebrow>
        </MaskedLine>
        <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          <MaskedLine delay={0.15}>Connecting Quality</MaskedLine>
          <MaskedLine delay={0.3}>Products with</MaskedLine>
          <MaskedLine delay={0.45}>
            <span className="italic text-emerald-400">Global Markets</span>
          </MaskedLine>
        </h1>
        <MaskedLine delay={0.65}>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
            Arnava Exim is an India-based import-export company specializing in
            global sourcing and the supply of diverse products. We serve
            international B2B markets with a focus on quality and reliable supply.
            Our goal is to build long-term global partnerships through professional
            trade support.
          </p>
        </MaskedLine>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            to="/products"
            data-testid="hero-explore-products-button"
            className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-navy-950 transition-all duration-300 hover:bg-white"
          >
            Explore Products
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/contact"
            data-testid="hero-send-inquiry-button"
            className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:border-emerald-400 hover:text-emerald-400"
          >
            Send an Inquiry
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative border-t border-white/10"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px lg:grid-cols-4">
          {TRUST.map((t) => (
            <div
              key={t.label}
              data-testid={`trust-item-${t.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              className="flex items-center gap-3 px-5 py-5 lg:px-8"
            >
              <t.icon className="h-5 w-5 shrink-0 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Bento() {
  return (
    <section className="bg-[#F8FAFC] py-24" data-testid="company-snapshot-section">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <Eyebrow>Who We Are</Eyebrow>
          <h2 className="mt-4 max-w-xl font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
            An export partner built on clarity, not claims.
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[190px]">
          <Reveal className="md:col-span-2 lg:row-span-2">
            <Link
              to="/about"
              data-testid="bento-about-card"
              className="group relative flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl bg-navy"
            >
              <img
                src={IMAGES.vessel}
                alt="Aerial view of a cargo vessel — Arnava Exim international trade"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
              <div className="relative p-7">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400">About Arnava Exim</span>
                <p className="mt-3 max-w-md font-display text-xl font-bold leading-snug text-white">
                  India-based import-export company connecting quality Indian psyllium and moringa products with international markets.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400">
                  Our story <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <div data-testid="bento-iec-card" className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">Import Export Code</span>
              <div>
                <p className="font-mono text-xl font-semibold tracking-[0.12em] text-navy">{SITE.iec}</p>
                <p className="mt-1 text-xs text-slate-500">IEC registered exporter, India</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div data-testid="bento-msme-card" className="flex h-full flex-col justify-between rounded-2xl bg-emerald-600 p-6">
              <BadgeCheck className="h-6 w-6 text-white/80" />
              <div>
                <p className="font-display text-lg font-bold text-white">MSME Registered</p>
                <p className="mt-1 text-xs text-emerald-100">Registered with MSME, Government of India</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div data-testid="bento-sourcing-card" className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
              <div>
                <p className="font-display text-lg font-bold text-navy">Quality-Focused Sourcing</p>
                <p className="mt-1 text-xs text-slate-500">Trusted sourcing partners for psyllium and moringa across India</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div data-testid="bento-location-card" className="flex h-full flex-col justify-between rounded-2xl bg-navy p-6">
              <MapPin className="h-6 w-6 text-emerald-400" />
              <div>
                <p className="font-display text-lg font-bold text-white">Ahmedabad, Gujarat</p>
                <p className="mt-1 text-xs text-slate-400">Western India's agricultural trade corridor</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProductsPreview() {
  const { products } = useProducts();

  const preview = useMemo(() => {
    const byCat = new Map();
    products.forEach((p) => {
      const c = (p.category || "Other").trim();
      if (!byCat.has(c)) byCat.set(c, []);
      byCat.get(c).push(p);
    });
    const buckets = [...byCat.values()].map((arr) => [...arr]);
    const picks = [];
    let i = 0;
    while (picks.length < 5 && buckets.some((b) => b.length)) {
      const b = buckets[i % buckets.length];
      if (b.length) picks.push(b.shift());
      i += 1;
    }
    return picks;
  }, [products]);

  return (
    <section className="bg-white py-24" data-testid="featured-products-section">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>The Collection</Eyebrow>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
              Psyllium and moringa, specified your way.
            </h2>
          </div>
          <Link
            to="/products"
            data-testid="view-all-products-link"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-emerald-600"
          >
            View full catalogue
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
          <Reveal delay={0.3} className="h-full">
            <div className="flex h-full flex-col justify-between rounded-2xl bg-navy p-7 grain relative overflow-hidden">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400">Custom Grade</span>
                <h3 className="mt-3 font-display text-xl font-bold text-white">
                  Need a different grade or specification?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Share your specification sheet and target quantity — we will source to match your requirement.
                </p>
              </div>
              <Link
                to="/contact"
                data-testid="custom-grade-inquiry-button"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors duration-300 hover:bg-white"
              >
                Tell Us Your Requirement <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function QualityStrip() {
  return (
    <section className="bg-[#F8FAFC] py-24" data-testid="quality-overview-section">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <Eyebrow>Quality & Sourcing</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
            From your requirement to international delivery — one coordinated chain.
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {QUALITY_STEPS.map((step, i) => (
            <Reveal key={step} delay={i * 0.07}>
              <div data-testid={`quality-step-${i + 1}`} className="group relative">
                <span className="font-mono text-3xl font-semibold text-navy/15 transition-colors duration-300 group-hover:text-emerald-500">
                  0{i + 1}
                </span>
                <div className="mt-3 h-px w-full bg-slate-200">
                  <div className="h-px w-6 bg-emerald-500 transition-all duration-500 group-hover:w-full" />
                </div>
                <p className="mt-3 text-sm font-semibold leading-snug text-navy">{step}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <Link
            to="/quality-sourcing"
            data-testid="quality-approach-link"
            className="group mt-12 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-emerald-600"
          >
            Explore our sourcing approach
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function GlobalMarkets() {
  return (
    <section className="bg-white py-24" data-testid="global-markets-section">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <Eyebrow>Global Markets</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
            Serving Global B2B Markets
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600">
            From Ahmedabad, Gujarat, Arnava Exim is focused on developing
            international B2B relationships — working with importers, distributors,
            wholesalers and manufacturers across Europe, the Middle East, Asia and
            other global markets.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {REGIONS.map((r) => (
              <span
                key={r}
                data-testid={`region-chip-${r.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className="rounded-full border border-slate-200 bg-[#F8FAFC] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-navy"
              >
                {r}
              </span>
            ))}
          </div>
          <Link
            to="/contact"
            data-testid="markets-inquiry-button"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-emerald-600"
          >
            Discuss Your Market <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-navy/5">
            <MapVisual />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="grain relative bg-navy py-24" data-testid="why-arnava-section">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <Eyebrow light>Why Arnava Exim</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Built for buyers who value straight answers.
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06}>
              <div
                data-testid={`why-card-${i + 1}`}
                className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors duration-300 hover:border-emerald-400/40 hover:bg-white/10"
              >
                <w.icon className="h-6 w-6 text-emerald-400" />
                <h3 className="mt-4 font-display text-lg font-bold text-white">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function InquirySection() {
  return (
    <section id="inquiry" className="bg-[#F8FAFC] py-24" data-testid="home-inquiry-section">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <Eyebrow>Start a Conversation</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
            Tell us what you need. We will source it.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">
            Share your product, purity and destination requirements and our export
            team will respond with availability, specifications and a quotation.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-emerald-400">
                <MessagesSquare className="h-4 w-4" />
              </span>
              <a href={`mailto:${SITE.email}`} data-testid="home-email-link" className="font-semibold text-navy transition-colors hover:text-emerald-600">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-emerald-400">
                <MapPin className="h-4 w-4" />
              </span>
              <span className="font-semibold text-navy">{SITE.location}</span>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-navy/5 sm:p-8">
            <InquiryForm idPrefix="home-inquiry" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="Psyllium Husk & Moringa Powder Exporter India | Arnava Exim — Ahmedabad, Gujarat"
        description="Arnava Exim is an India-based import-export company specializing in psyllium husk and moringa powder products for international B2B buyers. Quality-focused sourcing and professional export support."
      />
      <Hero />
      <Marquee />
      <Bento />
      <ProductsPreview />
      <QualityStrip />
      <GlobalMarkets />
      <WhySection />
      <InquirySection />
    </>
  );
}

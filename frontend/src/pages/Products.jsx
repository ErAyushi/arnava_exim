import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { useProducts } from "@/hooks/useProducts";

const tabSlug = (c) => c.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function Products() {
  const { products } = useProducts();
  const [active, setActive] = useState("all");

  const categories = useMemo(() => {
    const seen = [];
    products.forEach((p) => {
      const c = (p.category || "Other").trim();
      if (!seen.includes(c)) seen.push(c);
    });
    return seen;
  }, [products]);

  const filtered =
    active === "all"
      ? products
      : products.filter((p) => (p.category || "Other").trim() === active);

  return (
    <>
      <Seo
        title="Psyllium & Moringa Products | Psyllium Husk, Moringa Powder Exporter India — Arnava Exim"
        description="Psyllium husk, psyllium husk powder, moringa leaf powder and more — exported from India by Arnava Exim. 95% and 99% purity grades. Specifications as per buyer requirement."
      />
      <PageHero
        eyebrow="Products"
        title="The Collection"
        description="Psyllium husk and moringa products in commercial and high-purity grades — sourced and supplied according to buyer requirements."
      />

      <section className="bg-[#F8FAFC] py-20" data-testid="products-catalogue-section">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div
              data-testid="spec-note-banner"
              className="mb-10 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
            >
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <p className="text-sm leading-relaxed text-emerald-900">
                Product specifications vary by buyer requirement. Purity, mesh,
                moisture, packaging and documentation are confirmed against your
                specification before order finalization — request the current
                specification sheet for any product below.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mb-10 flex flex-wrap gap-2" data-testid="category-filter-tabs" role="tablist" aria-label="Filter products by family">
              <button
                role="tab"
                aria-selected={active === "all"}
                onClick={() => setActive("all")}
                data-testid="filter-tab-all"
                className={`rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-300 ${
                  active === "all"
                    ? "bg-navy text-white shadow-md shadow-navy/20"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-navy hover:text-navy"
                }`}
              >
                All Products
                <span className={`ml-2 font-mono text-[10px] ${active === "all" ? "text-emerald-400" : "text-slate-400"}`}>
                  {products.length}
                </span>
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={active === c}
                  onClick={() => setActive(c)}
                  data-testid={`filter-tab-${tabSlug(c)}`}
                  className={`rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-300 ${
                    active === c
                      ? "bg-navy text-white shadow-md shadow-navy/20"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-navy hover:text-navy"
                  }`}
                >
                  {c}
                  <span className={`ml-2 font-mono text-[10px] ${active === c ? "text-emerald-400" : "text-slate-400"}`}>
                    {products.filter((p) => (p.category || "Other").trim() === c).length}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard product={p} index={0} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
